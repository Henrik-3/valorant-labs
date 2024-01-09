use clap::Parser;
use dotenv::dotenv;
use lazy_static::lazy_static;
use log::{error, info};
use mongodb::{bson::doc, Client as MongoClient};
use serde::de::DeserializeOwned;
use serenity::{
    all::{CommandOptionType, Interaction},
    async_trait,
    builder::{CreateCommand, CreateCommandOption},
    futures::StreamExt,
    model::{application::Command, Permissions},
    prelude::*,
};
use std::env;
use structs::database::CommandEntry;

mod structs;

lazy_static! {
    static ref ENVIRONMENT: String = {
        let cli = Cli::parse();
        match cli.environment {
            Some(v) => v,
            None => {
                if cfg!(debug_assertions) {
                    "CANARY".to_string()
                } else {
                    "PROD".to_string()
                }
            }
        }
    };
}

#[derive(Parser)]
#[command(author, version, about, long_about = None)]
struct Cli {
    #[arg(long)]
    environment: Option<String>,
    #[arg(short)]
    deploy: Option<bool>,
}
struct Handler;
#[async_trait]
impl EventHandler for Handler {
    async fn ready(&self, ctx: Context, ready: serenity::all::Ready) {
        println!(
            "Shard {}/{} is ready!",
            match ready.shard {
                Some(v) => v.id.0,
                None => 0,
            },
            ready.shard.unwrap().total - 1,
        );
    }
    async fn interaction_create(&self, _ctx: Context, interaction: serenity::all::Interaction) {
        println!("Interaction: {:?}", &interaction);
        if let Interaction::Command(command) = interaction {
            match command.data.name.as_str() {
                "shard-restart" => {
                    let options = command.data.options();
                    let shard_id = options.iter().find(|x| x.name == "shard_id");
                    info!("[SHARD-RESTART] Shard ID: {:?}", shard_id);
                }
                _ => {
                    error!("[INVALID COMMAND] {:?}", command.data.name.as_str())
                }
            }
        }
    }
}

pub fn get_db<T: DeserializeOwned>(
    client: &MongoClient,
    collection: &str,
    db: Option<&str>,
) -> mongodb::Collection<T> {
    let db = match db {
        Some(v) => v,
        None => {
            if cfg!(debug_assertions) {
                "ValorantLabsDev"
            } else {
                "ValorantLabsRust"
            }
        }
    };
    client.database(db).collection::<T>(collection)
}

#[tokio::main]
async fn main() {
    dotenv().ok();
    // Login with a bot token from the environment
    let token = env::var("CANARY").expect("token");
    let intents = GatewayIntents::non_privileged() | GatewayIntents::MESSAGE_CONTENT;
    let mut client = Client::builder(token, intents)
        .event_handler(Handler)
        .await
        .expect("Error creating client");

    // start listening for events by starting a single shard
    if let Err(why) = client.start_autosharded().await {
        println!("An error occurred while running the client: {:?}", why);
    }
    info!("[MONGO_DB] Init MongoDB",);
    let mongo_client = MongoClient::with_uri_str(env::var("MONGO_DB").unwrap())
        .await
        .expect("failed to connect");

    let cli = Cli::parse();
    if cli.deploy.is_some() {
        info!("[DEPLOY] Deploying");
        let db = get_db::<CommandEntry>(&mongo_client, "commands", None)
            .find(
                doc! {
                    "enabled_for.builds": {"$in": ENVIRONMENT.as_str()}
                },
                None,
            )
            .await;
        let collected = match db {
            Ok(v) => {
                v.map(|x| {
                    let command: structs::database::CommandEntry = x.unwrap();
                    let mut command_builder = CreateCommand::new(command.command.name);
                    command_builder = command_builder.description(command.command.description);
                    if command.command.default_member_permissions.is_some() {
                        let permissions = Permissions::from_bits(
                            command
                                .command
                                .default_member_permissions
                                .unwrap()
                                .parse()
                                .unwrap(),
                        )
                        .expect("Invalid permissions");
                        command_builder = command_builder.default_member_permissions(permissions);
                    }
                    command_builder = command_builder.set_options(
                        command
                            .command
                            .options
                            .iter()
                            .map(|y| {
                                let mut option_builder = CreateCommandOption::new(
                                    match y.type_ {
                                        1 => CommandOptionType::SubCommand,
                                        2 => CommandOptionType::SubCommandGroup,
                                        3 => CommandOptionType::String,
                                        4 => CommandOptionType::Integer,
                                        5 => CommandOptionType::Boolean,
                                        6 => CommandOptionType::User,
                                        7 => CommandOptionType::Channel,
                                        8 => CommandOptionType::Role,
                                        9 => CommandOptionType::Mentionable,
                                        _ => CommandOptionType::Role,
                                    },
                                    y.name.clone(),
                                    y.description.clone(),
                                );
                                option_builder = option_builder.required(y.required);
                                if y.choices.is_some() {
                                    y.choices.as_ref().unwrap().iter().for_each(|f| {
                                        option_builder = option_builder
                                            .clone()
                                            .add_string_choice(f.name.clone(), f.value.clone());
                                    });
                                }
                                option_builder
                            })
                            .collect::<Vec<_>>(),
                    );
                    command_builder
                })
                .collect::<Vec<_>>()
                .await
            }
            Err(e) => {
                error!("[DEPLOY] Error: {:?}", e);
                vec![]
            }
        };
        Command::set_global_commands(client.http, collected)
            .await
            .unwrap();
        info!("[DEPLOY] Deployed");
    };
}
