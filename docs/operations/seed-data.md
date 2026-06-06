# Seed Data

> Initial data for development and staging environments.
> NEVER run in production without review.

---

## Content Pieces (Drafts)

```sql
insert into marketing_content_pieces (type, status, title, content, metadata, brand_voice_score, cultural_check_passed)
values
  ('carousel', 'draft', '5 Coisas Que Ninguém Te Conta Sobre Morar Fora', '', '{"platform":"instagram","pillar":"immigration","hashtags":["#BrasilGlobal","#VidaNoExterior"],"mentions":[],"mediaUrls":[],"caption":"Você sabia que a saudade bate diferente depois do primeiro ano?","altText":"Brasileiro olhando pela janela em cidade estrangeira"}'::jsonb, 8.5, true),
  ('reel', 'draft', 'Como Falar Sobre Dinheiro Sem Vergonha', '', '{"platform":"instagram","pillar":"finance","hashtags":["#BrasilGlobal","#FinancasPessoais"],"mentions":[],"mediaUrls":[],"caption":"A gente precisa normalizar essa conversa.","altText":"Calculadora e passaporte sobre mesa"}'::jsonb, 9.0, true),
  ('blog', 'draft', 'Guia Completo: Imposto de Renda para Brasileiros no Exterior', '...', '{"platform":"website","pillar":"finance","hashtags":[],"mentions":[],"mediaUrls":[],"seoTitle":"Imposto de Renda Brasileiros no Exterior 2026","seoDescription":"Guia completo sobre como declarar imposto de renda morando fora do Brasil.","canonicalUrl":"https://brasilglobal.com/blog/imposto-de-renda-exterior"}'::jsonb, 8.0, true),
  ('podcast', 'draft', 'Ep. 42 — A Identidade Brasileira em Terras Estrangeiras', '...', '{"platform":"spotify","pillar":"culture","hashtags":["#BrasilGlobalPodcast"],"mentions":[],"mediaUrls":[],"caption":"Conversa com brasileiros de 5 países diferentes sobre o que significa ser brasileiro hoje."}'::jsonb, 9.2, true),
  ('newsletter', 'draft', 'Newsletter #15 — O Que Mudou na Lei de Imigração', '...', '{"platform":"website","pillar":"immigration","hashtags":[],"mentions":[],"mediaUrls":[],"caption":"Resumo das mudanças que vão afetar milhares de brasileiros."}'::jsonb, 7.5, true);
```

---

## Community Members

```sql
insert into marketing_community_members (name, email, country, city, interests, engagement_score, is_ambassador, referral_count)
values
  ('Ana Silva', 'ana.silva@example.com', 'Portugal', 'Lisboa', '{"imigração","carreira","cultura"}', 8.5, true, 12),
  ('Carlos Mendes', 'carlos.m@example.com', 'Estados Unidos', 'Nova York', '{"finanças","empreendedorismo"}', 7.2, false, 3),
  ('Julia Costa', 'julia.costa@example.com', 'Alemanha', 'Berlim', '{"cultura","arte","linguagem"}', 9.1, true, 8),
  ('Roberto Lima', 'roberto.lima@example.com', 'Reino Unido', 'Londres', '{"carreira","tecnologia"}', 6.8, false, 1),
  ('Fernanda Oliveira', 'fernanda.o@example.com', 'Canadá', 'Toronto', '{"saúde mental","comunidade"}', 8.0, true, 5);
```

---

## Meta Campaigns (Example)

```sql
insert into marketing_meta_campaigns (id, name, objective, status, daily_budget, spend, impressions, clicks, conversions, ctr, cpc, cpm, roas, start_date)
values
  ('camp_12345', 'Verão Brasileiro no Exterior', 'ENGAGEMENT', 'ACTIVE', 20.00, 156.40, 45200, 890, 45, 0.0197, 0.1757, 3.46, 2.3, '2026-05-01'),
  ('camp_12346', 'Podcast Launch — Ep. 42', 'AWARENESS', 'PAUSED', 15.00, 89.20, 23400, 340, 12, 0.0145, 0.2623, 3.81, 0.8, '2026-05-15');
```

---

## Templates

```sql
insert into marketing_templates (name, category, component_path, config_schema, is_active)
values
  ('Carousel Standard', 'carousel', 'src/canvas/templates/CarouselStandard.tsx', '{"slots":5,"aspectRatio":"1:1","background":"gradient"}'::jsonb, true),
  ('Reel Cover Bold', 'reel_cover', 'src/canvas/templates/ReelCoverBold.tsx', '{"aspectRatio":"9:16","titleFont":"Bold","subtitleFont":"Regular"}'::jsonb, true),
  ('Blog Header Minimal', 'blog_header', 'src/canvas/templates/BlogHeaderMinimal.tsx', '{"aspectRatio":"16:9","overlay":"dark","textPosition":"bottom-left"}'::jsonb, true),
  ('Podcast Cover Art', 'podcast_cover', 'src/canvas/templates/PodcastCoverArt.tsx', '{"aspectRatio":"1:1","episodeNumber":true,"guestPhoto":true}'::jsonb, true);
```

---

## Cost Log (Example)

```sql
insert into marketing_cost_log (provider, model, operation, cost_usd, tokens_input, tokens_output)
values
  ('openai', 'gpt-4o-mini', 'generate_copy', 0.0021, 450, 280),
  ('anthropic', 'claude-3-7-sonnet', 'generate_blog', 0.1540, 3200, 1800),
  ('fal', 'flux-2', 'generate_image', 0.0320, null, null),
  ('elevenlabs', 'eleven_multilingual_v2', 'generate_voice', 0.0850, null, null);
```

---

## How to Seed

```bash
# Via Supabase SQL Editor (recommended for first time)
# Copy-paste sections above into Supabase Dashboard → SQL Editor → New Query

# Via psql (if you have direct DB access)
psql $DATABASE_URL -f docs/operations/seed-data.sql

# Via Supabase CLI
supabase db reset  # Applies migrations + seed
```

---

## ⚠️ Important

- **NEVER commit real emails or PII** — use `@example.com` addresses
- Seed data is for **dev/staging only**
- Production data starts empty and grows organically
- Update seed data when schema changes
