export { getOpenRouter, isOpenRouterConfigured } from "./client";

export interface CompleteInput {
  model?: string;
  messages: Array<{ role: "system" | "user" | "assistant"; content: string }>;
  temperature?: number;
  maxTokens?: number;
}

export async function complete(input: CompleteInput): Promise<{
  text: string;
  usage: { promptTokens: number; completionTokens: number; totalTokens: number };
}> {
  const { getOpenRouter } = await import("./client");
  const model = input.model ?? process.env.OPENROUTER_DEFAULT_MODEL ?? "anthropic/claude-3.5-sonnet";
  const client = getOpenRouter();
  const completion = await client.chat.completions.create({
    model,
    messages: input.messages,
    temperature: input.temperature,
    max_tokens: input.maxTokens,
  });
  const text = completion.choices[0]?.message?.content ?? "";
  const usage = completion.usage ?? { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 };
  return {
    text,
    usage: {
      promptTokens: usage.prompt_tokens,
      completionTokens: usage.completion_tokens,
      totalTokens: usage.total_tokens,
    },
  };
}
