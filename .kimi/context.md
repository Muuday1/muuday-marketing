# Contexto Atual — Podcast Muuday

> **Última sessão:** 2026-06-07
> **Status:** ✅ Abertura, fechamento, identidade sonora e manual de produção completos
> **Próximo passo:** Episódio piloto

---

## 🏆 Produtos Entregues

| #   | Entrega              | Status | Arquivo/Local                                                  |
| --- | -------------------- | ------ | -------------------------------------------------------------- |
| 1   | Abertura oficial v7  | ✅     | `public/audio/podcast/abertura/abertura-oficial.mp3` (17.4s)   |
| 2   | Fechamento com CTA   | ✅     | `public/audio/podcast/abertura/fechamento-oficial.mp3` (15.0s) |
| 3   | Identidade sonora    | ✅     | `public/audio/podcast/efeitos/` (33 efeitos, ~2.9MB)           |
| 4   | Manual de produção   | ✅     | `docs/strategy/podcast-producao-episodio.md` (600+ linhas)     |
| 5   | Playbook de decisões | ✅     | `docs/strategy/podcast-historias-playbook.md`                  |

---

## 🎙️ Arquivos de Áudio Oficiais

```
public/audio/podcast/
├── abertura/
│   ├── abertura-oficial.mp3      ← 17.4s
│   ├── fechamento-oficial.mp3    ← 15.0s
│   ├── musica-bed-oficial.mp3    ← Mixkit Track 34
│   ├── voz-oficial.mp3
│   ├── voz-fechamento.mp3
│   └── README.md
├── efeitos/
│   ├── 33 efeitos MP3            ← Stingers, impacts, beds, UI, logo
│   ├── index.html                ← Player de teste
│   └── README.md                 ← Catálogo completo
└── estudos/
```

---

## 📝 Roteiros Oficiais

**Abertura:**

```
[smiling]  Se tem uma coisa que eu aprendi com milhares de brazucas pelo mundo...
           é que a gente nunca desiste.
[excited]  Eu sou a Jessica, e esse é o Muuday!
[narrating] Hoje a gente vai falar sobre a história de quem deu o passo
           de deixar o Brasil pra trás... e descobriu que "mudar" pode ser mais que um verbo.
```

**Fechamento:**

```
[warm]    Obrigada por ficar comigo até aqui.
[smiling] Me conta o que achou lá no Instagram, arroba use mudei.
[warm]    E não esquece de seguir a gente pra não perder a próxima história.
```

---

## ⚙️ Configuração Congelada

```
ElevenLabs:
  voice: Jessica (voice_id: cgSgspJ2msm6clMCkdW9)
  model: eleven_flash_v2_5
  stability: 0.45
  style: 0.80
  speed: 1.0

Pipeline ffmpeg:
  atempo=1.01
  asetrate=43700
  roomtone volume=0.025
  loudnorm=I=-16:TP=-1.5:LRA=11

Mix música:
  música: Mixkit Track 34
  delay: 2s
  gain: 0.8
  mix tool: Python manual
```

---

## 📚 Documentação Completa

| Documento                                     | Descrição                                                                                                                                    |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/strategy/podcast-producao-episodio.md`  | **Manual completo** — fluxo de produção, busca de histórias, framework de roteirização, checklist, templates, aspectos legais, cross-posting |
| `docs/strategy/podcast-historias-playbook.md` | Playbook de decisões e configurações                                                                                                         |
| `docs/operations/podcast-tts-pipeline.md`     | Pipeline técnico de áudio                                                                                                                    |
| `docs/operations/elevenlabs-tags-guide.md`    | 35+ tags expressivas                                                                                                                         |

---

## 🎯 Próximos Passos

| #   | Tarefa                           | Status         |
| --- | -------------------------------- | -------------- |
| 1   | Abertura oficial v7              | ✅ Concluído   |
| 2   | Fechamento com CTA               | ✅ Concluído   |
| 3   | Identidade sonora (33 efeitos)   | ✅ Concluído   |
| 4   | Manual de produção               | ✅ Concluído   |
| 5   | **Episódio piloto**              | 🔥 **Próximo** |
| 6   | Script de segmentação automática | Pendente       |
| 7   | Template de roteiro no Sanity    | Pendente       |

---

## 🔗 Links

- Player abertura/fechamento: `file:///Users/igorpinto/social-media-machine/public/test-audio/abertura/index.html`
- Player efeitos: `file:///Users/igorpinto/social-media-machine/public/audio/podcast/efeitos/index.html`
- Manual: `docs/strategy/podcast-producao-episodio.md`

## 📝 Session 2026-06-07

- Manual completo de producao de episodios criado. Podcast: abertura + fechamento + 33 efeitos + manual 600+ linhas. Tudo pronto para episodio piloto.
- Quality gates: TS ✓ Tests ✗
