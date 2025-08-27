// AI integration for autorole features using OpenRouter

use openrouter_api::{OpenRouterClient, Result as OpenRouterResult, Ready};
use openrouter_api::types::chat::{ChatCompletionRequest, Message};
use serde::{Deserialize, Serialize};
use std::env;

/// AI client for multilingual role naming and fuzzy matching
pub struct AIClient {
    client: OpenRouterClient<Ready>,
    /// Default model to use for chat completions (can be overridden per request)
    default_model: String,
}

/// Local builder with defaults to construct `ChatCompletionRequest` without boilerplate.
/// This enables usage like:
///
/// ```rust
/// let req = AiChatRequest {
///     model: "openai/gpt-4o".into(),
///     messages,
///     ..Default::default()
/// }.build();
/// ```
#[derive(Default, Serialize, Deserialize, Clone)]
pub struct AiChatRequest {
    pub model: String,
    pub messages: Vec<Message>,
    pub stream: Option<bool>,
    pub response_format: Option<String>,
}

impl AiChatRequest {
    pub fn build(self) -> ChatCompletionRequest {
        ChatCompletionRequest {
            model: self.model,
            messages: self.messages,
            stream: self.stream,
            response_format: self.response_format,
            // Keep the rest at None unless explicitly needed in the future
            tools: None,
            provider: None,
            models: None,
            transforms: None,
        }
    }
}

impl AIClient {
    /// Create a new AI client from environment variables
    pub fn new() -> OpenRouterResult<Self> {
        let client = OpenRouterClient::from_env()?;
        let default_model = env::var("OPENROUTER_MODEL").unwrap_or_else(|_| "openai/gpt-4o".to_string());
        Ok(AIClient { client, default_model })
    }
    
    /// Override the default model to use for subsequent requests
    pub fn with_default_model(mut self, model: impl Into<String>) -> Self {
        self.default_model = model.into();
        self
    }

    /// Get the currently configured default model
    pub fn default_model(&self) -> &str {
        &self.default_model
    }
    
    /// Generate localized role names for a specific rank and language
    pub async fn generate_role_names(
        &self,
        rank: &str,
        language: &str,
        count: usize,
    ) -> OpenRouterResult<Vec<String>> {
        let prompt = format!(
            "Generate {} role names for VALORANT rank '{}' in language '{}'. \
            Return only the names as a JSON array.",
            count, rank, language
        );
        
        let request = AiChatRequest {
            model: self.default_model.clone(),
            messages: vec![Message {
                role: "user".to_string(),
                content: prompt,
                name: None,
                tool_calls: None,
            }],
            response_format: Some(serde_json::json!({"type": "json_object"}).to_string()),
            ..Default::default()
        }.build();
        
        let response = self.client.chat()?.chat_completion(request).await?;
        
        if let Some(choice) = response.choices.first() {
            let content = &choice.message.content;
            match serde_json::from_str::<Vec<String>>(content) {
                Ok(names) => Ok(names),
                Err(_) => Ok(vec![content.clone()]), // Fallback to raw content
            }
        } else {
            Ok(vec![rank.to_string()]) // Fallback to rank name
        }
    }
    
    /// Fuzzy match existing role names to VALORANT ranks
    pub async fn fuzzy_match_roles(
        &self,
        role_names: Vec<String>,
        ranks: Vec<String>,
    ) -> OpenRouterResult<Vec<(String, String, f32)>> {
        let prompt = format!(
            "Match these Discord role names to VALORANT ranks. \
            Role names: {:?}. \
            Possible ranks: {:?}. \
            Return a JSON array of [role_name, matched_rank, confidence] where confidence is 0.0-1.0.",
            role_names, ranks
        );
        
        let request = AiChatRequest {
            model: self.default_model.clone(),
            messages: vec![Message {
                role: "user".to_string(),
                content: prompt,
                name: None,
                tool_calls: None,
            }],
            response_format: Some(serde_json::json!({"type": "json_object"}).to_string()),
            ..Default::default()
        }.build();
        
        let response = self.client.chat()?.chat_completion(request).await?;
        
        if let Some(choice) = response.choices.first() {
            let content = &choice.message.content;
            match serde_json::from_str::<Vec<(String, String, f32)>>(content) {
                Ok(matches) => Ok(matches),
                Err(_) => Ok(vec![]), // Return empty on parse error
            }
        } else {
            Ok(vec![]) // Return empty if no response
        }
    }
}
