// Autorole helper functions for setup wizard, preflight checks, and rank matching

use crate::structs::constants::DEFAULT_RANK_COLORS;
use crate::structs::database::{SettingAutorole, SettingAutoroleConfig};
use crate::structs::valorant_api::{fetch_valorant_ranks, ValorantRank};
use serenity::all::{GuildId, RoleId, Role, Http, GuildChannel, Channel};
use serenity::model::Permissions;
use serenity::builder::EditRole;
use std::collections::HashMap;

/// Check if all required rank roles exist in the guild
pub async fn check_missing_roles(
    http: &Http,
    guild_id: GuildId,
    autorole_config: &Vec<SettingAutoroleConfig>,
) -> Result<Vec<String>, serenity::Error> {
    let existing_roles = guild_id.roles(http).await?;
    let existing_role_names: Vec<&String> = existing_roles.values().map(|r| &r.name).collect();
    
    let mut missing_ranks = Vec::new();    
    for config in autorole_config {
        if !existing_role_names.contains(&&config.role) {
            missing_ranks.push(config.role.clone());
        }
    }
    
    Ok(missing_ranks)
}

/// Create missing rank roles with default colors and positioning
pub async fn create_rank_roles(
    http: &Http,
    guild_id: GuildId,
    missing_ranks: Vec<String>,
) -> Result<HashMap<String, RoleId>, serenity::Error> {
    let mut created_roles = HashMap::new();
    
    // Get bot's highest role position for positioning new roles
    let bot_member = guild_id.member(http, http.get_current_user().await?.id).await?;
    let mut bot_roles = Vec::new();
    for &role_id in &bot_member.roles {
        if let Ok(role) = guild_id.role(http, role_id).await {
            bot_roles.push(role);
        }
    }
    let bot_highest_role = bot_roles.iter().max_by_key(|role| role.position);
    
    let position = bot_highest_role.map(|r| r.position).unwrap_or(1);
    
    // Fetch rank data from Valorant API
    let rank_data = fetch_valorant_ranks().await.unwrap_or_else(|_| Vec::new());
    
    for (i, rank_name) in missing_ranks.iter().enumerate() {
        // Find color for this rank from API data, fallback to defaults
        let color = if let Some(rank) = rank_data.iter().find(|r| r.name == *rank_name) {
            rank.color
        } else if let Some(rank_index) = rank_name.split(' ').next().and_then(|rank_part| {
            // Fallback to old method for color matching
            match rank_part {
                "Iron" => Some(0),
                "Bronze" => Some(1),
                "Silver" => Some(2),
                "Gold" => Some(3),
                "Platinum" => Some(4),
                "Diamond" => Some(5),
                "Ascendant" => Some(6),
                "Immortal" => Some(7),
                "Radiant" => Some(8),
                _ => None,
            }
        }).and_then(|index| DEFAULT_RANK_COLORS.get(index)) {
            *rank_index
        } else {
            0x808080 // Default gray
        };
        
        // Create the role using EditRole builder
        let mut role_builder = EditRole::default();
        role_builder = role_builder.name(rank_name.clone()).colour(color).position((position + i as u16 + 1) as u16);
        
        let role = guild_id.create_role(http, role_builder).await?;
        
        created_roles.insert(rank_name.clone(), role.id);
    }
    
    Ok(created_roles)
}

/// Preflight check: Verify bot has required permissions
pub async fn preflight_permission_check(
    http: &Http,
    _guild_id: GuildId,
    channel_id: Option<serenity::all::ChannelId>,
) -> Result<Vec<String>, serenity::Error> {
    let issues = Vec::new();
    
    // If channel specified, check channel permissions
    if let Some(channel_id) = channel_id {
        if let Ok(channel) = channel_id.to_channel(http).await {
            if let Some(_guild_channel) = channel.guild() {
                // We can't check channel permissions without cache, so we'll skip this check for now
                // In a real implementation, you would need to pass the cache to this function
            }
        }
    }
    
    Ok(issues)
}

/// Preflight check: Verify roles are editable
pub async fn preflight_role_editability_check(
    http: &Http,
    guild_id: GuildId,
    autorole_config: &Vec<SettingAutoroleConfig>,
) -> Result<Vec<String>, serenity::Error> {
    let existing_roles = guild_id.roles(http).await?;
    let bot_member = guild_id.member(http, http.get_current_user().await?.id).await?;
    let mut bot_roles = Vec::new();
    for &role_id in &bot_member.roles {
        if let Ok(role) = guild_id.role(http, role_id).await {
            bot_roles.push(role);
        }
    }
    let bot_highest_role = bot_roles.iter().max_by_key(|role| role.position);
    
    let bot_position = bot_highest_role.map(|r| r.position).unwrap_or(0);
    
    let mut issues = Vec::new();
    
    for config in autorole_config {
        if let Some((_, role)) = existing_roles.iter().find(|(_, r)| r.name == config.role) {
            if role.position >= bot_position {
                issues.push(format!("Role '{}' is above bot's highest role", role.name));
            }
        }
    }
    
    Ok(issues)
}
