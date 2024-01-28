use crate::{get_translation, get_valo_papi_language, structs::database::Settings};
use log::{debug, warn};
use serenity::all::CommandInteraction;
use valorant_assets_api::agents::get_agents;

pub async fn execute(command: CommandInteraction, guild_data: Settings) {
    let client = reqwest::Client::new();
    let agents = get_agents(
        &client,
        Some(get_valo_papi_language(&guild_data.language)),
        Some(true),
    )
    .await;
    
    let translation = get_translation("agent.unknown.title", "en");
}
