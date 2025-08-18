use poise::{CreateReply, serenity_prelude::{CreateActionRow, CreateButton}};
use crate::{get_translation, methods::{embed_builder::embed_builder}, structs::{methods::EmbedBuilderStruct}, Context, Error, InvocationData};

#[poise::command(slash_command, rename = "api")]
pub async fn execute(
    ctx: Context<'_>,
    agent: String,
) -> Result<(), Error> {
    let guild_data = &ctx.invocation_data::<InvocationData>().await.unwrap().guild_data;
    let embed = embed_builder(EmbedBuilderStruct {
        title: Some(get_translation("api.title", &guild_data.language).await),
        description: Some(get_translation("api.description", &guild_data.language).await),
        image: Some("https://opengraph.githubassets.com/3bbac063af945bc9eed6be07446a8760a5b892eea59e7d1e515b7770ef13b6/Henrik-3/unofficial-valorant-api".to_string()),
        ..Default::default()
    });
    let new_row = CreateActionRow::Buttons(vec![CreateButton::new_link("https://github.com/Henrik-3/unofficial-valorant-api").label("GitHub")]);
    let _ = ctx.send(CreateReply::default().embed(embed).components(vec![new_row])).await;
    Ok(())
}
