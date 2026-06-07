# Fase 0: Preparação — Checklist Completo

> Sem esta fase, TUDO é stub. Nenhuma fase seguinte funciona.

**Última atualização:** 2026-06-06

---

## 1. Credenciais — Estado Atual

### ✅ PRONTAS (reais, testadas)

| Variável                        | Serviço     | Status | Observação                       |
| ------------------------------- | ----------- | ------ | -------------------------------- |
| `KIMI_API_KEY`                  | Moonshot AI | ✅     | $20 crédito, modelo `kimi-k2.6`  |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase    | ✅     | jbbnbbrroifghrshplsq.supabase.co |
| `SUPABASE_SERVICE_ROLE_KEY`     | Supabase    | ✅     | Acesso total                     |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase    | ✅     | Acesso anon                      |
| `SUPABASE_ACCESS_TOKEN`         | Supabase    | ✅     | Management API                   |
| `RESEND_API_KEY`                | Resend      | ✅     | Email real                       |
| `UPSTASH_REDIS_REST_URL`        | Upstash     | ✅     | Cache real                       |
| `UPSTASH_REDIS_REST_TOKEN`      | Upstash     | ✅     | Cache real                       |
| `SANITY_PROJECT_ID`             | Sanity      | ✅     | CMS real                         |
| `SANITY_API_KEY`                | Sanity      | ✅     | CMS real                         |
| `MAKE_WEBHOOK_URL`              | Make.com    | ✅     | Webhook real                     |
| `MAKE_WEBHOOK_SECRET`           | Make.com    | ✅     | Webhook real                     |
| `MAKE_API_TOKEN`                | Make.com    | ✅     | API real                         |
| `SENTRY_DSN`                    | Sentry      | ✅     | Observability                    |
| `ADMIN_PASSWORD`                | Local       | ✅     | Definido no .env.local           |

### ❌ BLOQUEADAS (só precisam nas fases seguintes)

| Variável                        | Serviço    | Problema       | Quando precisa      |
| ------------------------------- | ---------- | -------------- | ------------------- |
| `OPENAI_API_KEY`                | OpenAI     | Quota excedida | Fase 7+ (fallback)  |
| `OPENROUTER_API_KEY`            | OpenRouter | Sem créditos   | Fase 7+ (fallback)  |
| `DEEPSEEK_API_KEY`              | DeepSeek   | Dummy          | Opcional            |
| `META_ACCESS_TOKEN`             | Meta       | Dummy          | Fase 2 (publicação) |
| `META_APP_ID`                   | Meta       | Dummy          | Fase 2 (publicação) |
| `META_APP_SECRET`               | Meta       | Dummy          | Fase 2 (publicação) |
| `META_AD_ACCOUNT_ID`            | Meta       | Dummy          | Fase 8 (ads)        |
| `INSTAGRAM_BUSINESS_ACCOUNT_ID` | Instagram  | Dummy          | Fase 2 (publicação) |
| `ELEVENLABS_API_KEY`            | ElevenLabs | Dummy          | Fase 5 (podcast)    |
| `REPLICATE_API_TOKEN`           | Replicate  | Dummy          | Fase 6 (vídeo)      |
| `FAL_KEY`                       | fal.ai     | Dummy          | Fase 6 (vídeo)      |
| `NEXT_PUBLIC_MIXPANEL_TOKEN`    | Mixpanel   | Dummy          | Fase 9 (analytics)  |

---

## 2. Tabelas no Supabase

### ✅ CRIADAS (25/25 comandos OK)

```
marketing_content_pieces     ✅
marketing_social_posts       ✅
marketing_meta_campaigns     ✅
marketing_community_members  ✅
marketing_analytics_events   ✅
marketing_cost_log           ✅
marketing_templates          ✅
marketing_leads              ✅
```

**Teste:**

```bash
npm run test:supabase
# PASS: Supabase connected, Tables found, Write test row succeeded
```

---

## 3. Scripts de Teste

```bash
# Testar TUDO (Supabase + AI)
npm run test:all          # ✅ PASS

# Testar individualmente
npm run test:supabase     # ✅
npm run test:kimi         # ✅
npm run test:ai           # ✅ (1/4: Kimi working)
```

---

## 4. Quality Gates

```bash
npm run typecheck   # ✅ 0 errors
npm run lint        # ✅ 0 warnings
npm run test:all    # ✅ PASS
```

---

## 5. Custo Mensal Estimado (atualizado)

| Serviço          | Uso estimado    | Custo/mês      |
| ---------------- | --------------- | -------------- |
| Kimi (principal) | 500K tokens/mês | ~$1.00         |
| Supabase         | 1 projeto       | $0 (free tier) |
| Resend           | 1K emails/mês   | $0 (free tier) |
| Upstash Redis    | 1 DB            | $0 (free tier) |
| Meta API         | Uso normal      | $0             |
| **TOTAL**        |                 | **~$1/mês**    |

---

## 6. ✅ FASE 0 COMPLETA

**Próximo passo:** Começar **Fase 1 — Content Engine**

Componentes a construir:

1. Brand Voice Engine (tom de voz "Brasil Global")
2. Copy Generator (legendas, headlines, CTAs)
3. Content Pipeline (ideia → draft → aprovação → agendamento)
4. Dashboard integration (visualizar pipeline no /dashboard)
