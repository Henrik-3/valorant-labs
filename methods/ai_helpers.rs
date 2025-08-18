// AI helper functions for autorole features

use crate::structs::ai::AIClient;
use crate::structs::valorant_api::{fetch_valorant_ranks, ValorantRank};
use serenity::all::{GuildId, Http};
use std::collections::HashMap;

/// Use AI to fuzzy match existing guild roles to VALORANT ranks
pub async fn fuzzy_match_existing_roles(
    ai_client: &AIClient,
    http: &Http,
    guild_id: GuildId,
) -> Result<Vec<(String, String, f32)>, Box<dyn std::error::Error>> {
    // Get all existing roles in the guild
    let roles = guild_id.roles(http).await?;
    let role_names: Vec<String> = roles.values().map(|r| r.name.clone()).collect();
    
    // Fetch ranks from Valorant API
    let rank_data = fetch_valorant_ranks().await?;
    let ranks: Vec<String> = rank_data.iter().map(|r| r.name.clone()).collect();
    
    // Use AI to fuzzy match
    let matches = ai_client.fuzzy_match_roles(role_names, ranks).await?;
    
    Ok(matches)
}

/// Generate localized role names for all ranks in a specific language
pub async fn generate_localized_role_names(
    ai_client: &AIClient,
    language: &str,
) -> Result<HashMap<String, Vec<String>>, Box<dyn std::error::Error>> {
    let mut localized_names = HashMap::new();
    
    // Fetch ranks from Valorant API
    let rank_data = fetch_valorant_ranks().await?;
    
    for rank in &rank_data {
        let names = ai_client.generate_role_names(&rank.name, language, 3).await?;
        localized_names.insert(rank.name.clone(), names);
    }
    
    Ok(localized_names)
}
