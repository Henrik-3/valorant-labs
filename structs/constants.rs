// VALORANT rank constants for autorole setup
// These are now fetched dynamically from the Valorant API
// See structs::valorant_api for the dynamic implementation

/// Default role colors for each rank (fallback values)
pub const DEFAULT_RANK_COLORS: &[u32] = &[
    0x808080, // Iron - Gray
    0x8B4513, // Bronze - SaddleBrown
    0xC0C0C0, // Silver - Silver
    0xFFD700, // Gold - Gold
    0xE5E4E2, // Platinum - Platinum
    0xB9F2FF, // Diamond - Diamond
    0x32CD32, // Ascendant - LimeGreen
    0xFF0000, // Immortal - Red
    0xFFFF00, // Radiant - Yellow
];
