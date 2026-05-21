/**
 * OpenRouter client — OpenAI-compatible. Routes to Claude, GPT, Gemini, etc.
 */

import OpenAI from "openai";

let _client: OpenAI | null = null;

export function getOpenRouter(): OpenAI {
  if (_client) return _client;
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) {
    throw new Error("[openrouter] OPENROUTER_API_KEY is not set");
  }
  _client = new OpenAI({
    apiKey: key,
    baseURL: process.env.OPENROUTER_BASE_URL ?? "https://openrouter.ai/api/v1",
    defaultHeaders: {
      "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
      "X-Title": process.env.NEXT_PUBLIC_APP_NAME ?? "VForge",
    },
  });
  return _client;
}

export const isOpenRouterConfigured = (): boolean => Boolean(process.env.OPENROUTER_API_KEY);
