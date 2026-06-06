# Model Router

> Unified interface for all AI providers. Never call an API directly — always route through here.

## Why

- **No vendor lock-in**: Switch providers without changing business logic
- **Cost optimization**: Route cheap tasks to cheap models, quality tasks to premium models
- **Automatic fallback**: If Claude fails, automatically try GPT-4.1, then DeepSeek
- **Cost tracking**: Every call is tracked and alerted
- **Rate limiting**: Prevents API quota exhaustion

## Providers

| Tier | Provider | Models | Use Case | Cost |
|------|----------|--------|----------|------|
| Premium | Anthropic | Claude 3.7 Sonnet | Brand voice, long-form, strategy | $3/$15 per M |
| Standard | OpenAI | GPT-4.1 | Structured output, JSON, code | $2/$8 per M |
| Budget | DeepSeek | DeepSeek V3 | Volume, brainstorming, tagging | ~$0.30 per M |
| Local | Ollama | Llama 4, Qwen 3 | Classification, privacy, offline | $0 |

## Usage

```typescript
import { modelRouter } from '@/shared/model-router'

// Route by quality tier
const copy = await modelRouter.generate('premium', {
  prompt: 'Write an Instagram carousel about...',
  system: 'You are a Brazilian copywriter...',
})

// Route by task type (auto-selects best model)
const json = await modelRouter.generate('structured', {
  prompt: 'Extract these fields...',
  schema: z.object({ ... }),
})

// Image generation
const image = await modelRouter.generateImage('flux-2', {
  prompt: 'Brazilian woman in London...',
  style: 'photographic',
})

// With fallback chain
const result = await modelRouter.withFallback([
  { provider: 'claude', model: 'claude-3-7-sonnet' },
  { provider: 'openai', model: 'gpt-4.1' },
  { provider: 'deepseek', model: 'deepseek-v3' },
], {
  prompt: '...',
})
```

## Files

- `index.ts` — Main router API
- `providers/` — Individual provider clients
- `cost-tracker.ts` — Cost tracking and alerts
- `rate-limiter.ts` — Rate limiting per provider
- `fallback.ts` — Fallback chain logic
- `types.ts` — Shared types
