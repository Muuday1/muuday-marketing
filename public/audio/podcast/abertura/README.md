# Áudios Oficiais — Podcast Muuday

> **Status:** ✅ Abertura e fechamento aprovados para todos os episódios
> **Data:** 2026-06-07

---

## Abertura

**Arquivo:** `abertura-oficial.mp3`
**Duração:** 17.4s

### Texto

```
[smiling]  Se tem uma coisa que eu aprendi com milhares de brazucas pelo mundo...
           é que a gente nunca desiste.
[excited]  Eu sou a Jessica, e esse é o Muuday!
[narrating] Hoje a gente vai falar sobre a história de quem deu o passo
           de deixar o Brasil pra trás... e descobriu que "mudar" pode ser mais que um verbo.
```

---

## Fechamento

**Arquivo:** `fechamento-oficial.mp3`
**Duração:** 15.0s

### Texto

```
[warm]    Obrigada por ficar comigo até aqui.
[smiling] Me conta o que achou lá no Instagram, arroba use mudei.
[warm]    E não esquece de seguir a gente pra não perder a próxima história.
```

---

## Estrutura Temporal (ambos)

| Trecho     | Duração | Conteúdo                     |
| ---------- | ------- | ---------------------------- |
| 0-2s       | 2s      | Música sozinha (intro suave) |
| 2–fim      | voz     | Voz + música (narrativa)     |
| fade final | 3s      | Música fade out              |

## Configuração ElevenLabs

| Parâmetro | Valor                                    |
| --------- | ---------------------------------------- |
| Voz       | Jessica (voice_id: cgSgspJ2msm6clMCkdW9) |
| Modelo    | eleven_flash_v2_5                        |
| Stability | 0.45                                     |
| Style     | 0.80                                     |
| Speed     | 1.0                                      |

## Pipeline FFmpeg

```
atempo=1.01       # Mais ágil, menos arrastado
asetrate=43700    # Pitch drift sutil
highpass=f=60
lowpass=f=10000
roomtone volume=0.025
loudnorm=I=-16:TP=-1.5:LRA=11
```

## Mix

| Parâmetro   | Valor                                       |
| ----------- | ------------------------------------------- |
| Música      | Mixkit Track 34 (royalty-free)              |
| Delay voz   | 2s                                          |
| Gain música | 0.8                                         |
| Fade in     | 1s                                          |
| Fade out    | 3s                                          |
| Mix tool    | Python manual (workaround ffmpeg 8.1.1 bug) |

## Arquivos Relacionados

- `musica-bed-oficial.mp3` — Música de fundo isolada
- `voz-oficial.mp3` — Voz da abertura sem música
- `voz-fechamento.mp3` — Voz do fechamento sem música
