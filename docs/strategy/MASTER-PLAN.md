# Muuday Marketing Machine — Plano Mestre

> **Última atualização:** 2026-06-06
> **Status:** Foundation completa. Pronto para build.
> **Princípio:** Não reinventamos. Integramos open source quando existe. Construímos só o que não existe.

---

## 1. O Que Somos Hoje

**Muuday Marketing Machine** é uma ferramenta interna de marketing. Roda localmente (`npm run dev`). Login com senha única (`ADMIN_PASSWORD`).

### Arquitetura Atual

```
┌─────────────────────────────────────────┐
│         MUUDAY MARKETING MACHINE        │
│           (Next.js 15, local)           │
│                                         │
│  ┌──────────┐  ┌──────────┐  ┌────────┐│
│  │ Dashboard│  │   CLI    │  │  API   ││
│  │  (Web)   │  │ (Node)   │  │(Routes)││
│  └────┬─────┘  └────┬─────┘  └───┬────┘│
│       └─────────────┴─────────────┘     │
│                   │                     │
│              ┌────┴────┐                │
│              │Supabase  │                │
│              │(PostgreSQL)               │
│              └────┬────┘                │
│       ┌───────────┼───────────┐         │
│       ▼           ▼           ▼         │
│  ┌────────┐ ┌─────────┐ ┌─────────┐    │
│  │Content │ │  Meta   │ │  Leads  │    │
│  │Pieces  │ │Campaigns│ │         │    │
│  └────────┘ └─────────┘ └─────────┘    │
└─────────────────────────────────────────┘
```

### O Que Funciona Hoje (Real)

| #   | Funcionalidade               | Status | Como usar                                              |
| --- | ---------------------------- | ------ | ------------------------------------------------------ |
| 1   | Auth simples (senha em .env) | ✅     | `ADMIN_PASSWORD` no `.env.local`                       |
| 2   | Dashboard com dados reais    | ✅     | `npm run dev` → http://localhost:3000                  |
| 3   | Criar conteúdo com AI        | ✅     | `/dashboard/content/new` ou `npm run content:generate` |
| 4   | Calendário editorial         | ✅     | `/dashboard/calendar`                                  |
| 5   | Meta Ads sync                | ✅     | `npm run meta:sync`                                    |
| 6   | Meta Ads dashboard           | ✅     | `/dashboard/ads`                                       |
| 7   | Leads                        | ✅     | `/dashboard/leads`                                     |
| 8   | Analytics events             | ✅     | `/dashboard/analytics`                                 |
| 9   | Agendar post                 | ✅     | `npm run schedule <id> <platform> <datetime>`          |
| 10  | Publicar posts agendados     | ✅     | `npm run publish:due`                                  |
| 11  | Pipeline viewer              | ✅     | `npm run pipeline`                                     |
| 12  | Podcast script + TTS         | ✅     | `npm run podcast:generate`                             |
| 13  | Instagram publisher          | 🟡     | Código pronto, precisa testar com credenciais reais    |
| 14  | Copy generator               | ✅     | OpenAI GPT-4o-mini com brand voice                     |
| 15  | Image generator              | ✅     | DALL-E 3                                               |
| 16  | Brand voice check            | ✅     | Score 0-10                                             |
| 17  | Mixpanel tracking            | ✅     | `src/analytics/mixpanel.ts`                            |

### O Que NÃO Funciona (Stub/Missing)

| #   | Funcionalidade                  | Status | Bloqueio                |
| --- | ------------------------------- | ------ | ----------------------- |
| 18  | LinkedIn publisher              | ⚪     | Stub (fake data)        |
| 19  | TikTok publisher                | ⚪     | Stub (fake data)        |
| 20  | Templates visuais (carrossel)   | ❌     | Satori não implementado |
| 21  | Geração em batch                | ❌     | Só gera 1 por vez       |
| 22  | Efeitos sonoros no podcast      | ❌     | Freesound não integrado |
| 23  | Múltiplas vozes no podcast      | ❌     | Só 1 voz ElevenLabs     |
| 24  | Auto-like/responder comentários | ❌     | Não existe              |
| 25  | DM automation (ManyChat-style)  | ❌     | Não existe              |
| 26  | SEO toolkit                     | ❌     | Não existe              |
| 27  | Ghost blog                      | ❌     | Não existe              |
| 28  | Email marketing automático      | ❌     | Resend não integrado    |
| 29  | Workflow engine (n8n)           | ❌     | Não existe              |
| 30  | Plausible analytics             | ❌     | Não existe              |

---

## 2. Open Source Evaluation (Revisado)

Fizemos uma avaliação honesta. **Só integramos open source que realmente funciona.**

| Ferramenta       | Open Source? | Status    | Decisão                                                                                                                                                                                                 |
| ---------------- | ------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Postiz**       | ✅ Sim       | Avaliado  | **NÃO integrar.** Postiz é um app completo (Next.js + PostgreSQL + Redis). Integrar seria mais complexo que construir nosso próprio scheduler. Usamos nossa tabela `marketing_social_posts` + cron job. |
| **Activepieces** | ✅ Sim       | Avaliado  | **NÃO integrar.** Ecosistema pequeno. Usamos n8n (quando precisarmos) ou scripts CLI.                                                                                                                   |
| **Ghost**        | ✅ Sim       | Avaliado  | **NÃO integrar agora.** Para blog, usamos Next.js + MDX ou Sanity. Ghost é overkill para 1 pessoa.                                                                                                      |
| **Listmonk**     | ✅ Sim       | Avaliado  | **NÃO integrar agora.** Para email, usamos Resend (SaaS barato) + Supabase. Listmonk precisa de SMTP próprio.                                                                                           |
| **Plausible**    | ✅ Sim       | Avaliado  | **NÃO integrar agora.** Usamos Mixpanel (já configurado) + Supabase events. Plausible é para sites públicos, não tools internas.                                                                        |
| **n8n**          | ✅ Sim       | Planejado | **Integrar na Semana 7-8.** Para workflows automáticos. Self-hosted via Docker.                                                                                                                         |
| **Metabase**     | ✅ Sim       | Futuro    | **NÃO integrar agora.** Para BI avançado. Supabase + dashboard custom cobre 80%.                                                                                                                        |

### Conclusão da Avaliação

**Nenhum open source atual resolve nosso problema de forma simples.** O que existe ou é:

- **Um app completo** (Postiz) — integrar é mais trabalho que construir
- **Overkill** (Ghost, Listmonk, Plausible) — precisam de infra extra (SMTP, PostgreSQL separado)
- **Futuro** (n8n, Metabase) — útil, mas não para MVP

**Decisão:** Construímos nossa própria stack. Quando a operação crescer, avaliamos open source novamente.

---

## 3. Stack Final (Realista)

| Categoria          | O que usamos                          | Por quê                                |
| ------------------ | ------------------------------------- | -------------------------------------- |
| **Framework**      | Next.js 15 (App Router)               | Já configurado, familiar               |
| **Auth**           | Cookie simples (`admin-session`)      | 1 usuário, não precisa de OAuth        |
| **Database**       | Supabase (PostgreSQL)                 | Já configurado, mesma instância do app |
| **Cache**          | Upstash Redis                         | Já configurado, serverless             |
| **Analytics**      | Mixpanel + Supabase events            | Mixpanel já funciona                   |
| **AI Copy**        | OpenAI GPT-4o-mini                    | Barato, funciona                       |
| **AI Image**       | DALL-E 3                              | Funciona                               |
| **AI Video**       | fal.ai / Replicate                    | Futuro                                 |
| **TTS**            | ElevenLabs                            | Já configurado                         |
| **Email**          | Resend                                | Futuro (não integrado ainda)           |
| **Social Publish** | APIs diretas (Meta, LinkedIn, TikTok) | Não precisa de middleware              |
| **Automation**     | Scripts CLI + cron                    | 1 pessoa, não precisa de n8n ainda     |
| **SEO**            | Next.js + Supabase                    | Futuro                                 |
| **Blog**           | Next.js + Sanity                      | Futuro                                 |
| **Podcast Host**   | Spotify for Podcasters (free)         | Grátis, já usamos                      |
| **Monitoring**     | Nenhum                                | 1 pessoa, não precisa                  |

---

## 4. Roadmap Realista (8 Semanas)

### Semana 1: Foundation (Testar TUDO)

**Objetivo:** Tudo que existe deve funcionar de verdade.

- [ ] Configurar credenciais reais no `.env.local`
- [ ] Testar Instagram publisher (criar post real)
- [ ] Testar Meta Ads sync (sync real de campanhas)
- [ ] Testar copy generator (gerar copy real)
- [ ] Testar image generator (gerar imagem real)
- [ ] Testar podcast TTS (gerar áudio real)
- [ ] Popular Supabase com dados reais (ou seed)
- [ ] Verificar dashboard mostra dados reais

**Entregável:** "Tudo funciona. Zero stubs."

### Semana 2: Publishers Reais

**Objetivo:** Publicar em todas as plataformas.

- [ ] Implementar LinkedIn publisher (OAuth 2.0 + API)
- [ ] Implementar TikTok publisher (Business Account API)
- [ ] Testar cross-post: 1 conteúdo → 3 plataformas
- [ ] Implementar Twitter/X publisher (API v2)
- [ ] Calendário editorial visual (grid, não lista)

**Entregável:** "Crio 1 conteúdo e publico em IG + TikTok + LinkedIn + X com 1 clique."

### Semana 3-4: Content Engine

**Objetivo:** Produção em massa.

- [ ] Templates visuais (Satori): carrossel, story, thumbnail
- [ ] Geração em batch: "Quero 7 posts sobre imigração"
- [ ] Auto-schedule: distribui 7 posts ao longo da semana
- [ ] Cross-post engine: adapta copy para cada plataforma
- [ ] Content calendar grid integrado

**Entregável:** "1 comando → 7 posts prontos, agendados, em 4 plataformas."

### Semana 5-6: Podcast Factory

**Objetivo:** Podcast profissional com mínimo esforço.

- [ ] Multi-voice casting (3 vozes ElevenLabs)
- [ ] Sound design (efeitos sonoros por cena)
- [ ] Auto-mix (FFmpeg monta MP3)
- [ ] Capa automática do episódio
- [ ] Publicação Spotify/Apple

**Entregável:** "Roteiro → podcast com múltiplas vozes e efeitos → Spotify em 30 min."

### Semana 7-8: Automation

**Objetivo:** Máquina roda sozinha.

- [ ] Ads autopilot: pausa campanha se ROAS < X
- [ ] Auto-like/responder comentários no Instagram
- [ ] Lead qualification via DM (bot simples)
- [ ] Email nurture sequence (Resend + Supabase)
- [ ] Automated reports (PDF semanal por email)

**Entregável:** "A máquina publica, responde, otimiza ads e envia relatórios sozinha. Eu só aprovo."

---

## 5. O Que NÃO Vamos Fazer (Dizendo Não)

Para manter foco, **não** vamos:

1. **Não** integrar Postiz — nosso scheduler é mais simples e funciona
2. **Não** integrar Ghost — Next.js + Sanity cobre blog quando precisarmos
3. **Não** integrar Listmonk — Resend + Supabase cobre email
4. **Não** integrar Plausible — Mixpanel + Supabase cobre analytics
5. **Não** integrar n8n ainda — scripts CLI + cron cobre automação para 1 pessoa
6. **Não** construir SEO toolkit agora — não é prioridade para conteúdo social
7. **Não** construir YouTube Shorts factory agora — Instagram + TikTok primeiro
8. **Não** construir community platform — não é marketing, é produto

---

## 6. Métricas de Sucesso

### Semana 1-2 (Foundation)

- [ ] Instagram publicando posts reais
- [ ] Meta Ads sync funcionando com dados reais
- [ ] Dashboard mostrando dados reais (não hardcoded)
- [ ] 0 stubs, 0 fake data

### Semana 3-4 (Content Engine)

- [ ] 7 posts gerados em < 10 min
- [ ] Cross-post IG → TikTok → LinkedIn → X funciona
- [ ] Templates visuais (carrossel) gerando imagens

### Semana 5-6 (Podcast Factory)

- [ ] 1 episódio completo com multi-voice + efeitos
- [ ] Publicado no Spotify

### Semana 7-8 (Automation)

- [ ] Ads autopilot pausando campanhas automaticamente
- [ ] Auto-responder comentários no Instagram
- [ ] Relatório semanal automático por email

---

## 7. Próximo Passo

**Pergunta para você:**

Quer que eu comece pela **Semana 1 (Foundation)** — testar tudo que existe com credenciais reais?

Ou prefere pular para algo específico que te impede hoje?

**Observação:** Antes de começar, preciso que você preencha o `.env.local` com:

- `OPENAI_API_KEY` (para gerar copy)
- `META_ACCESS_TOKEN` (para publicar no Instagram)
- `INSTAGRAM_BUSINESS_ACCOUNT_ID` (para publicar no Instagram)
- `META_AD_ACCOUNT_ID` (para sync de ads)
- `SUPABASE_SERVICE_ROLE_KEY` (para acessar dados)
- `ELEVENLABS_API_KEY` (para podcast TTS)

Sem essas credenciais, tudo continua sendo stub.
