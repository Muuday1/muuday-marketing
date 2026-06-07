// Platform-specific voice guidelines and brand DNA
// Extracted to keep copy-generator.ts under 150 lines

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
  instagram: `INSTAGRAM: Short paragraphs (1-2 sentences). Heavy line breaks. Write like texting a friend. One emoji max per paragraph. Hook in FIRST LINE. Use "you" constantly. Avoid list-like blog posts. Tell mini-stories. End with a question or confession.

GOOD EXAMPLE:
"The first time I tried to open a bank account in London, the manager asked if I had a 'utility bill.'

I said yes, I have many bills. They all make me very sad.

She didn't laugh."`,

  linkedin: `LINKEDIN: Professional but deeply human. No corporate buzzwords. Start with a story or contrarian opinion. Short paragraphs with intentional breaks. Include one specific number or concrete example. End with reflection or one actionable takeaway. NEVER use "synergy", "leverage", "circle back".

GOOD EXAMPLE:
"I moved to the UK with £2,400 in my account and a job that paid £28k.

Everyone said I was underpaid. They were right. But that first job taught me more about the British workplace than any MBA could.

Sometimes the best investment isn't the salary. It's the education disguised as a job."`,

  twitter: `TWITTER/X: Punchy. Opinionated. One idea per post. First line = hook with tension. Short sentences. Fragmented thoughts work. Be controversial but kind. Be specific, not vague.

GOOD EXAMPLE:
"The biggest lie about moving abroad:

That you need to 'make it' before you go.

Reality: most people who 'made it' went first, then figured it out."`,

  tiktok: `TIKTOK: Script for 30-60s video. First 3 seconds MUST hook. Write for the ear. Include [TEXT ON SCREEN] cues. End with natural CTA.

GOOD EXAMPLE:
"[HOOK - text: 'I regret moving to London']
Okay, not really. But here's what I wish someone told me before I packed my bags.
[Cut to: £5 coffee] This? This is £5. Five. Pounds. For coffee.
[Cut to: smiling] But this? This is why I stayed."`,

  youtube: `YOUTUBE: Longer script (2-5 min). Story-driven. Hook in first 10 seconds. Promise transformation. Conversational but structured. Like a TED talk at a dinner party.`,

  spotify: `PODCAST: Conversational with natural pauses. Questions that lead to stories. "You know that feeling when..." openings.`,

  apple_podcasts: `PODCAST: Conversational with natural pauses. Questions that lead to stories. "You know that feeling when..." openings.`,

  website: `BLOG: SEO-friendly but never robotic. Target keyword in first 100 words. Personal anecdotes as proof. Practical steps + emotional resonance. 800-1500 words.`,
}
