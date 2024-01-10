use crate::structs::base::{DiscordCommand, EnabledFor};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct CommandEntry {
    pub command: DiscordCommand,
    pub enabled_for: EnabledFor,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct TranslationEntry {
    #[serde(rename = "type")]
    pub type_: String,
    pub language: String,
    pub bot: TranslationBotLanguages,
}
#[derive(Serialize, Deserialize, Debug)]
pub struct TranslationBotLanguages {
    en: TranslationBot,
}
#[derive(Serialize, Deserialize, Debug)]
pub struct TranslationBot {
    base: TranslationBotBase,
    agent: TranslationBotAgent,
}
#[derive(Serialize, Deserialize, Debug)]
pub struct TranslationBotBase {
    role: String,
}
#[derive(Serialize, Deserialize, Debug)]
pub struct TranslationBotAgent {
    unknown: TranslationBotTitleDesc,
}
#[derive(Serialize, Deserialize, Debug)]
pub struct TranslationBotTitleDesc {
    title: String,
    description: String,
}
