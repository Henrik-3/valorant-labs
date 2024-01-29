use serde::{Deserialize, Serialize};
use serenity::all::{CurrentUser, EmbedField, User};

#[derive(Serialize, Deserialize, Debug)]
pub struct EmbedBuilderStruct {
    pub title: Option<String>,
    pub description: Option<String>,
    pub url: Option<String>,
    pub color: Option<String>,
    pub author: Option<User>,
    pub fields: Option<EmbedField>,
    pub thumbnail: Option<String>,
    pub image: Option<String>,
    pub client: CurrentUser,
}

impl Default for EmbedBuilderStruct {
    fn default() -> Self {
        Self {
            title: None,
            description: None,
            url: None,
            color: None,
            author: None,
            fields: None,
            thumbnail: None,
            image: None,
            client: CurrentUser::default(),
        }
    }
}
