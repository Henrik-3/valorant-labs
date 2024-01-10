use crate::get_translation;
use log::{debug, warn};
use serenity::all::CommandInteraction;

pub async fn execute(command: CommandInteraction) {
    let translation = get_translation("agent.unknown.title", "en");
    warn!("Interaction: {}", translation);
}
