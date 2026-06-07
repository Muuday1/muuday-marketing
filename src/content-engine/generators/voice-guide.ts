// Platform-specific voice guidelines and brand DNA
// Keep it SHORT — kimi-k2.6 is slow with long system prompts

import type { ContentPillar, Platform } from '@/types'

export const BRAND_DNA = `BRAND DNA — Muuday:
- Audience: Brazilians living abroad (UK, US, Portugal, Ireland)
- Tone: Warm, informed, aspirational. Like a smart older sibling.
- NEVER say: "imigrante" → say "brasileiro no exterior"
- NEVER say: "é fácil", "só fazer X", "basta" → validate difficulty
- NEVER use: "in today's world", "in conclusion", "it's important to note"
- ALWAYS Brazilian Portuguese (not Portugal)
- Emotional truth: moving abroad is hard AND worth it. No toxic positivity.`

export const PILLAR_ANGLES: Record<ContentPillar, string> = {
  culture: 'Cultural identity, saudade, adapting without losing yourself',
  career: 'Job market, interviews, CV adaptation, workplace culture',
  finance: 'Banking, taxes, cost of living, saving, sending money to Brazil',
  immigration: 'Visas, documents, bureaucracy, legal rights, residency',
  community: 'Making friends, Brazilian communities, loneliness',
  lifestyle: 'Housing, food, weather, daily life, habits',
}

export const PLATFORM_VOICE: Record<Platform, string> = {
  instagram: `INSTAGRAM VOICE:
- Short paragraphs (1-2 sentences). Heavy line breaks.
- Write like texting a friend. One emoji max per paragraph.
- Hook in the FIRST LINE. Use "you" constantly.
- Tell mini-stories, not listicles. End with a question or confession.
- Example hook: "The first time I tried to open a bank account in London..."`,

  linkedin: `LINKEDIN VOICE:
- Professional but deeply human. No corporate buzzwords.
- Start with a story or contrarian opinion. Short paragraphs.
- Include one specific number or concrete example.
- End with reflection or one actionable takeaway.
- NEVER: synergy, leverage, circle back, moving the needle.`,

  twitter: `TWITTER/X VOICE:
- Punchy. Opinionated. One idea per post.
- First line = hook with tension. Short sentences.
- Be controversial but kind. Be specific, not vague.`,

  tiktok: `TIKTOK VOICE:
- Script for 30-60s video. First 3 seconds MUST hook.
- Write for the ear, not the eye. Include [TEXT ON SCREEN] cues.
- End with natural CTA.`,

  youtube: `YOUTUBE VOICE:
- Script 2-5 min. Story-driven. Hook in first 10 seconds.
- Promise a transformation. Conversational but structured.`,

  spotify: `PODCAST VOICE:
- Conversational with natural pauses. Questions lead to stories.
- "You know that feeling when..." openings.`,

  apple_podcasts: `PODCAST VOICE:
- Conversational with natural pauses. Questions lead to stories.
- "You know that feeling when..." openings.`,

  website: `BLOG VOICE:
- SEO-friendly but never robotic. Target keyword in first 100 words.
- Personal anecdotes as proof. Practical steps + emotional resonance.
- 800-1500 words.`,
}
