# Comparação de Variáveis de Ambiente — Muuday App vs Marketing Machine

> Análise do `.env.local` do `Muuday-app` vs o `.env.local` do `social-media-machine`.
> Conclusão: são o **mesmo projeto**, mesma infraestrutura, mesma base de usuários.
> A marketing machine é uma **camada a mais** sobre a mesma stack.
>
> ⚠️ **NUNCA commitar chaves reais neste arquivo.**
> Copie as chaves reais do muuday-app para seu `.env.local` local.

---

## ✅ Devem ser as MESMAS credenciais (copiar do muuday-app)

| Variável                        | Valor no Muuday-app                        | Onde usar na Marketing Machine                                      |
| ------------------------------- | ------------------------------------------ | ------------------------------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | `https://jbbnbbrroifghrshplsq.supabase.co` | Mesmo Supabase, tabelas com prefixo `marketing_`                    |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | (copiar do muuday-app)                     | Mesmo                                                               |
| `SUPABASE_SERVICE_ROLE_KEY`     | (copiar do muuday-app)                     | Mesmo                                                               |
| `RESEND_API_KEY`                | (copiar do muuday-app)                     | Mesma conta Resend. Criar audience separado para leads de marketing |
| `UPSTASH_REDIS_REST_URL`        | (copiar do muuday-app)                     | Mesma instância. Use prefixo `marketing:` nas chaves                |
| `UPSTASH_REDIS_REST_TOKEN`      | (copiar do muuday-app)                     | Mesmo                                                               |

| `|`NEXT_PUBLIC_POSTHOG_HOST`| (copiar do muuday-app) | Mesmo |
|`SANITY_PROJECT_ID`/`NEXT_PUBLIC_SANITY_PROJECT_ID`|`xb1066mj`| Mesmo projeto Sanity. Crie dataset separado:`marketing`|
|`SANITY_API_TOKEN`| (copiar do muuday-app) | Mesmo token |
|`OPENAI_API_KEY`| (copiar do muuday-app) | Mesma chave. Ou usar`OPENAI_API_KEY_SERVICE`para jobs |
|`MAKE_WEBHOOK_URL`| (copiar do muuday-app) | Mesma conta, scenarios separados |
|`CLOUDFLARE_API_TOKEN`| (copiar do muuday-app) | Mesmo. CDN de assets gerados |
|`VERCEL_API_TOKEN`| (copiar do muuday-app) | Mesmo. Deploy do projeto`muuday-marketing`|
|`GITHUB_TOKEN` | (copiar do muuday-app) | Mesmo token para automação |

---

## 🔀 Devem ser DIFERENTES (marketing machine tem suas próprias)

| Variável              | Por que separar?                                                    |
| --------------------- | ------------------------------------------------------------------- |
| `NEXT_PUBLIC_APP_URL` | App = `app.muuday.com`, Marketing = `brasilglobal.com`              |
| `APP_SECRET`          | JWT/webhook secrets diferentes. Se vazar um, não compromete o outro |
| `META_*` (todas)      | App de ads separado no Meta Business Manager                        |
| `KIMI_API_KEY`        | Chave separada para controle de custo                               |
| `ANTHROPIC_API_KEY`   | Chave separada (billing isolado)                                    |
| `DEEPSEEK_API_KEY`    | Chave separada                                                      |
| `FAL_KEY`             | Chave separada (rastrear custo de marketing)                        |
| `REPLICATE_API_TOKEN` | Chave separada                                                      |
| `ELEVENLABS_API_KEY`  | Chave separada                                                      |
| `SENTRY_DSN`          | Projeto separado no Sentry: `muuday-marketing`                      |
| `CHECKLY_API_KEY`     | Monitors separados                                                  |

---

## 📋 Checklist de Ação

### Copiar do Muuday-app para `.env.local`:

- [ ] Supabase (URL, anon key, service role)
- [ ] Resend API key
- [ ] Upstash Redis (URL, token)
- [ ]
- [ ] Sanity (project ID, API key)
- [ ] OpenAI API key
- [ ] Make webhook URL
- [ ] Cloudflare API token
- [ ] Vercel API token
- [ ] GitHub token

### Criar novos (diferentes do Muuday-app):

- [ ] `APP_SECRET` — gerar novo de 64 chars
- [ ] `KIMI_API_KEY` — criar na console da Moonshot AI
- [ ] `SENTRY_DSN` — criar projeto `muuday-marketing` no Sentry
- [ ] `META_*` — novo app no Meta Business Manager

### Não precisa:

- [ ] Stripe, Trolley, Revolut, PayPal, Wise (pagamentos do app)
- [ ] Agora (video calls do app)
- [ ] Google/Outlook Calendar OAuth (app principal)
