use poise::{CreateReply, serenity_prelude::{CreateActionRow, CreateButton, ButtonStyle, Permissions}};
use crate::{get_translation, methods::embed_builder::embed_builder, structs::methods::EmbedBuilderStruct, Context, Error, InvocationData};

#[poise::command(slash_command, rename = "autoroles")]
pub async fn execute(
    ctx: Context<'_>,
) -> Result<(), Error> {
    // Guild settings and language
    let guild_data = &ctx.invocation_data::<InvocationData>().await.unwrap().guild_data;
    let c_user = ctx.cache().current_user().clone();

    // Permissions: require MANAGE_GUILD similar to JS command
    if let Some(member) = ctx.author_member().await {
        let perms = member.permissions(ctx.serenity_context()).unwrap();
        if !perms.contains(Permissions::MANAGE_GUILD) {
            let embed = embed_builder(EmbedBuilderStruct {
                title: Some(get_translation("settings.perms_title", &guild_data.language).await),
                description: Some(get_translation("settings.perms_desc", &guild_data.language).await),
                client: c_user,
                ..Default::default()
            });
            let support_row = CreateActionRow::Buttons(vec![
                CreateButton::new_link("https://discord.gg/X3GaVkX2YN")
                    .label(get_translation("support", &guild_data.language).await),
            ]);
            let _ = ctx
                .send(
                    CreateReply::default()
                        .embed(embed)
                        .components(vec![support_row])
                        .ephemeral(true),
                )
                .await;
            return Ok(());
        }
    }

    // Overview embed
    let embed = embed_builder(EmbedBuilderStruct {
        title: Some(get_translation("autorole.overview_title", &guild_data.language).await),
        description: Some(get_translation("autorole.overview_desc", &guild_data.language).await),
        client: c_user,
        ..Default::default()
    });

    // Buttons: Settings and Create Message
    let row = CreateActionRow::Buttons(vec![
        CreateButton::new("autoroles;settings")
            .label(get_translation("autorole.overview_button_settings", &guild_data.language).await)
            .style(ButtonStyle::Danger),
        CreateButton::new("autoroles;message")
            .label(get_translation("autorole.overview_button_message", &guild_data.language).await)
            .style(ButtonStyle::Danger),
    ]);

    let _ = ctx
        .send(
            CreateReply::default()
                .embed(embed)
                .components(vec![row])
                .ephemeral(true),
        )
        .await;

    Ok(())
}
