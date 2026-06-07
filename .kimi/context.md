# Contexto Atual — Podcast TTS Pipeline

> **Última sessão:** 2026-06-07  
> **Status:** 🎯 Pipeline validado, próximo ao ideal

## 🏆 Descoberta Principal

**ElevenLabs `eleven_flash_v2_5` + Jessica interpreta tags como prosódia real!**

As tags `[sarcastic]`, `[whispering]`, `[laughs]`, `[smiling]` não são faladas como palavras — são interpretadas como direções de performance. Isso muda tudo.

## ✅ Configuração Final Validada

```
ElevenLabs:
  model: eleven_flash_v2_5  ← ÚNICO que funciona
  voice: Jessica
  stability: 0.30
  style: 0.75

Pipeline ffmpeg:
  atempo=0.99              ← Único parâmetro a ajustar por conteúdo
  asetrate=43700           ← Pitch drift fixo
  roomtone volume=0.025    ← Pink noise ambiente
  loudnorm=I=-16:TP=-1.5:LRA=11
```

## 📁 Arquivos de Referência

| Arquivo                                   | Descrição                         |
| ----------------------------------------- | --------------------------------- |
| `docs/operations/podcast-tts-pipeline.md` | Documentação completa do pipeline |
| `public/test-audio/story-demo/`           | Testes comparativos (v2 vs v3)    |
| `src/audio/auphonic-client.ts`            | Cliente Auphonic (opcional)       |

## 🎚️ Ajuste Pendente

**Fine-tuning do `atempo`** (vari-speed):

- `0.98` = mais lento, reflexivo
- `0.99` = equilíbrio (atual)
- `1.0` = velocidade natural, conversação

Testar amostras de 10s com cada valor para calibrar por tipo de conteúdo.

## ⚠️ O que NÃO funciona

- `eleven_turbo_v2_5` → fala tags como palavras ❌
- `eleven_multilingual_v2` → fala tags como palavras ❌
- Múltiplas tags no mesmo texto → resultados imprevisíveis ❌

## 🎯 Próximos Passos

1. [ ] Calibrar `atempo` por tipo de conteúdo (narrativa, notícia, entrevista)
2. [ ] Criar script de segmentação automática (split por tag)
3. [ ] Testar pipeline end-to-end com episódio completo
4. [ ] Decidir: Auphonic é necessário? (teste A/B pendente)

## 🔗 Links Úteis

- Player de testes: http://localhost:3000/test-audio/story-demo/
- Documentação: `docs/operations/podcast-tts-pipeline.md`
