# Fase 0: Preparação — Checklist Completo

> Sem esta fase, TUDO é stub. Nenhuma fase seguinte funciona.

---

## 1. Credenciais Necessárias

### TIER 1 — Obrigatórias (sem isso, nada funciona)

| #   | Variável                        | Serviço        | Para quê                          | Onde conseguir          | Custo                | Status |
| --- | ------------------------------- | -------------- | --------------------------------- | ----------------------- | -------------------- | ------ |
| 1   | `OPENAI_API_KEY`                | OpenAI         | Gerar copy, imagens, SEO, scripts | platform.openai.com     | $0.15-0.50/1M tokens | ❌     |
| 2   | `META_ACCESS_TOKEN`             | Meta Graph API | Publicar no Instagram, sync ads   | developers.facebook.com | Grátis               | ❌     |
| 3   | `INSTAGRAM_BUSINESS_ACCOUNT_ID` | Instagram      | Identificar conta de negócio      | Meta Business Manager   | Grátis               | ❌     |
| 4   | `META_AD_ACCOUNT_ID`            | Meta Ads       | Sync campanhas                    | Meta Ads Manager        | Grátis               | ❌     |
| 5   | `SUPABASE_SERVICE_ROLE_KEY`     | Supabase       | Acesso a dados (tabelas)          | Supabase Dashboard      | $0-25/mês            | ❌     |
| 6   | `NEXT_PUBLIC_SUPABASE_URL`      | Supabase       | URL do projeto                    | Supabase Dashboard      | $0-25/mês            | ❌     |
| 7   | `ADMIN_PASSWORD`                | Você           | Login na ferramenta               | Você define             | Grátis               | ❌     |

### TIER 2 — Necessárias nas primeiras 4 semanas

| #   | Variável              | Serviço    | Para quê                        | Onde conseguir | Custo           | Status |
| --- | --------------------- | ---------- | ------------------------------- | -------------- | --------------- | ------ |
| 8   | `ELEVENLABS_API_KEY`  | ElevenLabs | TTS podcast                     | elevenlabs.io  | $5-22/mês       | ❌     |
| 9   | `REPLICATE_API_TOKEN` | Replicate  | Vídeo/image generation          | replicate.com  | ~$0.01-0.05/seg | ❌     |
| 10  | `FAL_KEY`             | fal.ai     | Vídeo/image generation (futuro) | fal.ai         | ~$0.01-0.05/seg | ❌     |
| 11  | `RESEND_API_KEY`      | Resend     | Email marketing                 | resend.com     | $0-20/mês       | ❌     |

### TIER 3 — Futuro (semanas 8+)

| #   | Variável                        | Serviço     | Para quê                | Onde conseguir          | Custo                | Status |
| --- | ------------------------------- | ----------- | ----------------------- | ----------------------- | -------------------- | ------ |
| 12  | `KIMI_API_KEY`                  | Moonshot AI | Copy em chinês/fallback | platform.moonshot.cn    | $0.50-2/1M tokens    | ❌     |
| 13  | `ANTHROPIC_API_KEY`             | Anthropic   | Fallback AI             | console.anthropic.com   | $3-15/1M tokens      | ❌     |
| 14  | `DEEPSEEK_API_KEY`              | DeepSeek    | Fallback barato         | platform.deepseek.com   | $0.14-0.28/1M tokens | ❌     |
| 15  | `META_APP_ID`                   | Meta        | App OAuth               | developers.facebook.com | Grátis               | ❌     |
| 16  | `META_APP_SECRET`               | Meta        | App OAuth               | developers.facebook.com | Grátis               | ❌     |
| 17  | `META_VERIFY_TOKEN`             | Meta        | Webhook verification    | Você define             | Grátis               | ❌     |
| 18  | `SANITY_API_TOKEN`              | Sanity      | CMS (blog futuro)       | sanity.io               | $0-99/mês            | ❌     |
| 19  | `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity      | CMS (blog futuro)       | sanity.io               | $0-99/mês            | ❌     |
| 20  | `UPSTASH_REDIS_REST_URL`        | Upstash     | Cache/rate limit        | upstash.com             | $0-10/mês            | ❌     |
| 21  | `UPSTASH_REDIS_REST_TOKEN`      | Upstash     | Cache/rate limit        | upstash.com             | $0-10/mês            | ❌     |

---

## 2. Tabelas no Supabase (criar ANTES de começar)

### Já documentadas em `docs/operations/database-schema.md`

Precisa criar estas tabelas no Supabase SQL Editor:

```sql
-- 1. marketing_content_pieces
-- 2. marketing_social_posts
-- 3. marketing_meta_campaigns
-- 4. marketing_community_members
-- 5. marketing_analytics_events
-- 6. marketing_cost_log
-- 7. marketing_templates
-- 8. marketing_leads
```

**Instruções:**

1. Vá em https://supabase.com/dashboard/project/_/sql/new
2. Cole o conteúdo de `docs/operations/database-schema.md`
3. Clique "Run"

---

## 3. Scripts de Teste

Criaremos scripts que testam cada API. Se o script passar, a credencial funciona.

### Teste 1: OpenAI

```bash
npx tsx scripts/test-openai.ts
```

### Teste 2: Instagram

```bash
npx tsx scripts/test-instagram.ts
```

### Teste 3: Meta Ads

```bash
npx tsx scripts/test-meta-ads.ts
```

### Teste 4: ElevenLabs

```bash
npx tsx scripts/test-elevenlabs.ts
```

### Teste 5: Supabase

```bash
npx tsx scripts/test-supabase.ts
```

---

## 4. Ordem de Configuração

**NÃO configure tudo de uma vez. Siga esta ordem:**

### Dia 1 (30 min)

- [ ] Criar tabelas no Supabase
- [ ] Preencher `SUPABASE_SERVICE_ROLE_KEY` e `NEXT_PUBLIC_SUPABASE_URL`
- [ ] Rodar `npx tsx scripts/test-supabase.ts`

### Dia 2 (30 min)

- [ ] Criar conta OpenAI (platform.openai.com)
- [ ] Gerar API key
- [ ] Preencher `OPENAI_API_KEY`
- [ ] Rodar `npx tsx scripts/test-openai.ts`

### Dia 3 (1 hora)

- [ ] Criar app no Meta Developers (developers.facebook.com)
- [ ] Gerar `META_ACCESS_TOKEN`
- [ ] Conectar Instagram Business Account
- [ ] Pegar `INSTAGRAM_BUSINESS_ACCOUNT_ID`
- [ ] Rodar `npx tsx scripts/test-instagram.ts`

### Dia 4 (30 min)

- [ ] Pegar `META_AD_ACCOUNT_ID` no Meta Ads Manager
- [ ] Rodar `npx tsx scripts/test-meta-ads.ts`

### Dia 5 (30 min)

- [ ] Criar conta ElevenLabs
- [ ] Gerar API key
- [ ] Preencher `ELEVENLABS_API_KEY`
- [ ] Rodar `npx tsx scripts/test-elevenlabs.ts`

### Dia 6 (opcional)

- [ ] Configurar Tier 2 e 3 conforme necessidade

---

## 5. Custo Mensal Estimado

| Serviço            | Uso estimado    | Custo/mês      |
| ------------------ | --------------- | -------------- |
| OpenAI GPT-4o-mini | 500K tokens/mês | $0.75          |
| OpenAI DALL-E 3    | 50 imagens/mês  | $5.00          |
| ElevenLabs         | 2h áudio/mês    | $5.00          |
| Supabase           | 1 projeto       | $0 (free tier) |
| Resend             | 1K emails/mês   | $0 (free tier) |
| Upstash Redis      | 1 DB            | $0 (free tier) |
| Meta API           | Uso normal      | $0             |
| **TOTAL**          |                 | **~$11/mês**   |

---

## 6. Próximo Passo

1. Eu crio os scripts de teste
2. Você configura as credenciais Tier 1
3. Rodamos os testes juntos
4. Quando todos passarem, começamos Fase 1
