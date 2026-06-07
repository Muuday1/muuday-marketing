# Changelog

All notable changes to the Muuday Marketing Machine project.

## [0.6.0] - 2026-06-06

### 5 Novos Templates de Carrossel — Identidade Muuday

**Status:** ✅ Deployed em https://marketing.muuday.com

Todos os templates novos usam **exclusivamente** a identidade visual Muuday:

- **Cores**: Lime `#9FE870`, Dark `#0F172A`, Slate `#64748B`, Light `#F8FAFC`, White `#FFFFFF`
- **Tipografia**: Inter (sans), DM Serif Display (display), JetBrains Mono (mono)
- **Design system** centralizado em `design-system.tsx`

| Template          | Estilo     | Características                             |
| ----------------- | ---------- | ------------------------------------------- |
| **Lime** (padrão) | Oficial    | Lime vibrante, dark bg, clean moderno       |
| **Dark**          | Premium    | Grid tech, glow lime, sophisticated         |
| **Editorial**     | Magazine   | DM Serif headlines, rose accent, elegante   |
| **Minimal**       | Whitespace | Tipografia fina, lime único, breathing room |
| **Bold**          | Impacto    | Alto contraste, bordas grossas, neon feel   |

- 3 slides por template: Cover, Tip, CTA
- 9 temas no total (5 novos + 4 legados marcados)
- Tema padrão: **Lime** (oficial Muuday)
- Templates legados (classic, warm, craft, calm) mantidos para compatibilidade

---

## [0.5.0] - 2026-06-07

### Podcast de Histórias — Identidade Sonora e Produção Completas

**Status:** ✅ Pipeline congelado · Playbook escrito · Pronto para produção

#### Abertura Oficial v7

- **Arquivo:** `public/audio/podcast/abertura/abertura-oficial.mp3` (17.4s, 192kbps)
- **Texto:** 3 frases com tags `[smiling]` → `[excited]` → `[narrating]`
- **Tom:** Mais ágil, menos arrastado, mais natural que a v6

#### Mudanças v6 → v7

| Parâmetro   | v6                                | v7                               |
| ----------- | --------------------------------- | -------------------------------- |
| `atempo`    | 0.99                              | **1.01** (mais ágil)             |
| `stability` | 0.35                              | **0.45** (menos teatral)         |
| `style`     | 0.85                              | **0.80** (entonação equilibrada) |
| Tags        | 4 segmentos, `[excited]` repetido | **3 segmentos, variados**        |
| Texto       | 4 frases                          | **3 frases** (mais direto)       |
| Duração     | 20.3s                             | **17.4s**                        |

#### Fechamento Oficial

- **Arquivo:** `public/audio/podcast/abertura/fechamento-oficial.mp3` (15.0s)
- **Tom:** Acolhedor, CTA suave para Instagram
- **Tags:** `[warm]` → `[smiling]` → `[warm]`
- **Pronúncia:** "@usemuuday" como "arroba use mudei"
- **Roteiro:**
  ```
  [warm]    Obrigada por ficar comigo até aqui.
  [smiling] Me conta o que achou lá no Instagram, arroba use mudei.
  [warm]    E não esquece de seguir a gente pra não perder a próxima história.
  ```

#### Identidade Sonora Completa

- **Pasta:** `public/audio/podcast/efeitos/` (33 efeitos, ~2.9MB)
- **Ferramenta:** Python + numpy (síntese de áudio broadcast-quality)
- **Formato:** MP3 192kbps, 44.1kHz, Mono

**Categorias:**

- **Stingers / Transições** (6): sweep-up, sweep-down, whoosh, reverse-cymbal, glitch
- **Impacts / Hits** (7): thud, sub-drop, hit, boom, rim, metallic
- **Ambient Beds** (6): suspense, warm, uplifting, neutral, dark-tension, hopeful
- **UI / CTA Sounds** (7): pop, chime, click, success, error, bell
- **Identidade Exclusiva** (5): logo-sting, logo-ident, signature-tone, countdown, watermark

#### Manual de Produção de Episódios

- **Documento:** `docs/strategy/podcast-producao-episodio.md` (600+ linhas)
- **Conteúdo:** Fluxo completo de produção, busca de histórias em Reddit/Instagram/Facebook, framework de roteirização 5-10min, uso de efeitos sonoros, checklist passo a passo, templates, aspectos legais/éticos, cross-posting
- **Foco:** Histórias reais, curtas (5-10 min), envolventes, com anonimização

#### Estrutura de Arquivos

```
public/audio/podcast/
├── abertura/
│   ├── abertura-oficial.mp3
│   ├── fechamento-oficial.mp3
│   ├── musica-bed-oficial.mp3
│   ├── voz-oficial.mp3
│   ├── voz-fechamento.mp3
│   └── README.md
├── efeitos/
│   ├── 33 efeitos MP3
│   ├── index.html
│   └── README.md
└── estudos/
```

#### Documentação

- `docs/strategy/podcast-producao-episodio.md` — Manual completo de produção
- `docs/strategy/podcast-historias-playbook.md` — Playbook de decisões
- `docs/operations/podcast-tts-pipeline.md` — Pipeline técnico
- `docs/operations/elevenlabs-tags-guide.md` — Guia de 35+ tags

---

## [0.4.0] - 2026-06-06

### Content Creation Wizard — Estratégia por Plataforma e Formato

**Status:** ✅ Deployed em https://marketing.muuday.com

#### Novo Wizard de 5 Passos (`/dashboard/content/create`)

1. **Plataforma** — 8 plataformas com cards visuais
2. **Formato** — 40+ formatos filtrados por plataforma
3. **Estratégia** — Propósito, pilar, tema, tom de voz
4. **Revisar** — Resumo + guia estratégica completa
5. **Resultado** — Copy gerado + agendamento

#### Matriz de Conteúdo (`content-matrix.ts`)

- **Plataformas**: 8 com audience, melhores dias/horários
- **Formatos**: 40+ com aspect ratio, esforço, engajamento
- **Propósitos**: 9 com descrição e ícone

#### Guias Estratégicas por Formato (`format-guides.ts`)

Cada formato tem estrutura, hooks, CTAs, regras e exemplos.

---
