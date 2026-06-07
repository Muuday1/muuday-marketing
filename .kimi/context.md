# Contexto Atual — Podcast TTS Pipeline

> **Última sessão:** 2026-06-07
> **Status:** ✅ Abertura v6 produzida e validada

## 🏆 Abertura Muuday v6 — FINAL

Arquivo: `public/test-audio/abertura/abertura-muuday-v6-final.mp3`

- **Duração:** 20.34s
- **Voz:** Jessica (eleven_flash_v2_5), 4 segmentos com tags expressivas
- **Música:** Mixkit Track 34 (royalty-free)
- **Mix:** Delay 2s, gain música 0.8, fade in/out

### Tags utilizadas na abertura

| Segmento | Tag         | Texto                                        |
| -------- | ----------- | -------------------------------------------- |
| 1        | `[smiling]` | "Se tem uma coisa que eu aprendi..."         |
| 2        | `[excited]` | "Eu sou a Jessica, e esse é o Muuday!"       |
| 3        | `[excited]` | "Hoje a gente vai falar sobre a história..." |
| 4        | `[smiling]` | "Fica comigo. Vai ser bom demais."           |

### Pipeline v6 aplicado

1. Geração segmentada (1 tag por segmento)
2. Corte de tags via `silencedetect`
3. Vari-speed (`atempo=0.99`) + pitch drift (`asetrate=43700`)
4. Room tone + loudnorm (`I=-16`, `TP=-1.5`, `LRA=11`)
5. Mix manual Python (workaround ffmpeg 8.1.1 bug)

### Níveis de volume validados

- Intro (0-2s): -28.2 dB
- Voz+música (4-6s): -13.8 dB
- Fade out (12-14s): -13.5 dB
- Só voz (16-18s): -17.7 dB

---

## ✅ Configuração Final Validada

```
ElevenLabs:
  model: eleven_flash_v2_5  ← ÚNICO que funciona
  voice: Jessica
  stability: 0.35
  style: 0.85

Pipeline ffmpeg:
  atempo=0.99              ← Único parâmetro a ajustar por conteúdo
  asetrate=43700           ← Pitch drift fixo
  roomtone volume=0.025    ← Pink noise ambiente
  loudnorm=I=-16:TP=-1.5:LRA=11
```

---

## 📁 Arquivos de Referência

| Arquivo                                    | Descrição                         |
| ------------------------------------------ | --------------------------------- |
| `docs/operations/podcast-tts-pipeline.md`  | Documentação completa do pipeline |
| `docs/operations/elevenlabs-tags-guide.md` | Guia de tags expressivas (35+)    |
| `public/test-audio/abertura/`              | Abertura v6 + todos os testes     |
| `public/test-audio/story-demo/`            | Testes comparativos (v2 vs v3)    |

---

## ⚠️ Bugs Descobertos (ffmpeg 8.1.1)

1. `afade=t=out` → cria silêncio total após ~2s
2. `amix` → trunca quando input mais curto termina
3. **Workaround:** Mix manual sample-by-sample em Python

---

## 🎯 Próximos Passos

1. [ ] Produzir fechamento/encerramento do podcast
2. [ ] Criar script de segmentação automática (split por tag)
3. [ ] Testar pipeline end-to-end com episódio completo
4. [ ] Calibrar `atempo` por tipo de conteúdo (narrativa, notícia, entrevista)
5. [ ] Decidir: Auphonic é necessário? (teste A/B pendente)

---

## 🔗 Links Úteis

- Player de testes: `file:///Users/igorpinto/social-media-machine/public/test-audio/abertura/index.html`
- Documentação: `docs/operations/podcast-tts-pipeline.md`
- Tags: `docs/operations/elevenlabs-tags-guide.md`

## 📝 Session 2026-06-07

- Podcast abertura v6 finalizada: 4 segmentos com tags expressivas + Mixkit Track 34, mix manual Python workaround ffmpeg bug
- Quality gates: TS ✗ Tests ✗
