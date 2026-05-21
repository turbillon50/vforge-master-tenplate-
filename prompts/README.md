# Prompts

Reusable prompts for AI codegen and assistants. Keep them framework-agnostic
so any client (OpenRouter, Anthropic, OpenAI) can use them.

## File layout

- `prompts/codegen/<name>.md` — code generation prompts
- `prompts/assistants/<name>.md` — runtime assistant personas
- `prompts/bootstrapping/<name>.md` — prompts that generate a new app from
  this template (Idea → Module Selection → Branding → Deploy)

## Convention

Each prompt file should start with a YAML front-matter block:

```md
---
id: generate-new-module
inputs:
  - moduleName
  - description
outputs:
  - files
model: anthropic/claude-3.5-sonnet
---

You are a senior TypeScript engineer. Given …
```

Loaders live under `lib/prompts/` (planned).
