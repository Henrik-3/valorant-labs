use crate::structs::base::{DiscordCommand, EnabledFor};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct CommandEntry {
    pub command: DiscordCommand,
    pub enabled_for: EnabledFor,
}
