# Contexto Atual — Muuday Marketing Machine

> **Última sessão:** 2026-06-08
> **Status:** ✅ Content generation pipeline funcional
> **Próximo passo:** Templates LinkedIn + Story, fontes customizadas

---

## 🏆 Produtos Entregues

| #   | Entrega                           | Status | Arquivo/Local                                        |
| --- | --------------------------------- | ------ | ---------------------------------------------------- |
| 1   | Copy generator (moonshot-v1-8k)   | ✅     | `src/content-engine/generators/copy-generator.ts`    |
| 2   | Hard length validation            | ✅     | `truncateToLimit()` + `validateAndFixCopy()`         |
| 3   | Canvas + FLUX hybrid carousel     | ✅     | `src/content-engine/templates/`                      |
| 4   | 5 professional themes             | ✅     | `src/content-engine/templates/themes-bundle.ts`      |
| 5   | Theme bundling (tree-shaking fix) | ✅     | Single-file bundle approach                          |
| 6   | Background image generation       | ✅     | `generateImagesForContent()` via `after()`           |
| 7   | Brand voice checker               | ✅     | `src/content-engine/validators/brand-voice-check.ts` |

---

## 🎨 Sistema de Templates (Canvas + FLUX)

```
src/content-engine/templates/
├── composer.ts          # FLUX bg + Canvas text overlay
├── themes-bundle.ts     # 5 themes inline (editorial, minimal, bold, dark, warm)
├── index.tsx            # Carousel/LinkedIn/Story generation
└── themes/              # Source files (kept for reference)
```

**Otimização de velocidade:**

- Cover: FLUX background (~5-8s) + Canvas text overlay
- Tips/CTA: Canvas puro com gradients (~0.5s cada)
- Total: ~15-20s para 3-5 slides

---

## ⚙️ Configuração Congelada

```
AI Text: moonshot-v1-8k (Kimi API)
  - Timeout: 45s
  - Max tokens: 1280
  - Temperature: 0.7

AI Image: FLUX via fal.ai
  - Cover only (optimization)
  - Fallback: solid canvas background

Canvas: @napi-rs/canvas
  - 1080x1080 (Instagram)
  - Serverless-safe (no system deps)
```

---

## 📊 Limites de Copy por Plataforma

| Plataforma | Body | Headline | CTA |
| ---------- | ---- | -------- | --- |
| Instagram  | 350  | 80       | 60  |
| TikTok     | 150  | 60       | 40  |
| Twitter    | 250  | 80       | 50  |
| LinkedIn   | 1200 | 100      | 80  |
| YouTube    | 500  | 80       | 60  |
| Blog       | 2500 | 100      | 80  |
| Newsletter | 2000 | 100      | 80  |
| Podcast    | 800  | 100      | 60  |

---

## 🎯 Próximos Passos

| #   | Tarefa                                | Status         |
| --- | ------------------------------------- | -------------- |
| 1   | LinkedIn card template (1200x627)     | 🔥 **Próximo** |
| 2   | Instagram Story template (1080x1920)  | Pendente       |
| 3   | Fontes customizadas (Inter) no canvas | Pendente       |
| 4   | FLUX background para todos os slides  | Avaliar        |
| 5   | Testes end-to-end do wizard           | Pendente       |

---

## 📝 Session 2026-06-08

- Switch de kimi-k2.5 para moonshot-v1-8k (rápido, confiável, ~5s)
- Simplificação do prompt para evitar reasoning-only output
- Bundle de temas em único arquivo para evitar tree-shaking no Vercel
- Remoção de `output: 'standalone'` do next.config.ts
- Copy generation: 5s, brand voice 9.5-10/10, dentro dos limites
- Carousel generation: 3 slides gerados e uploadados com sucesso

## 📝 Session 2026-06-08

- Fix copy generation (switch to moonshot-v1-8k), bundle themes into single file to avoid Vercel tree-shaking, remove output:standalone
- Quality gates: TS ✓ Tests ✗
