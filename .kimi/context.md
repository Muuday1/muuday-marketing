# Contexto Atual — Podcast Muuday

> **Última sessão:** 2026-06-07
> **Status:** ✅ Abertura oficial v7 aprovada · Pipeline congelado · Playbook escrito

---

## 🏆 Abertura Oficial v7

**Arquivo:** `public/audio/podcast/abertura/abertura-oficial.mp3`
**Duração:** 17.4s · **Aprovada para todos os episódios**

```
[smiling]  Se tem uma coisa que eu aprendi com milhares de brazucas pelo mundo...
           é que a gente nunca desiste.
[excited]  Eu sou a Jessica, e esse é o Muuday!
[narrating] Hoje a gente vai falar sobre a história de quem deu o passo
           de deixar o Brasil pra trás... e descobriu que "mudar" pode ser mais que um verbo.
```

### Configuração congelada

```
ElevenLabs:
  voice: Jessica (voice_id: cgSgspJ2msm6clMCkdW9)
  model: eleven_flash_v2_5  ← OBRIGATÓRIO
  stability: 0.45
  style: 0.80
  speed: 1.0

Pipeline ffmpeg:
  atempo=1.01              # Padrão para aberturas/narrativas
  asetrate=43700           # Pitch drift fixo
  roomtone volume=0.025    # Pink noise ambiente
  loudnorm=I=-16:TP=-1.5:LRA=11

Mix música:
  música: Mixkit Track 34
  delay: 2s
  gain: 0.8
  mix tool: Python manual (ffmpeg 8.1.1 bugado)
```

---

## 📁 Estrutura de Arquivos

```
public/audio/podcast/
├── abertura/
│   ├── abertura-oficial.mp3      ← ✅ Versão aprovada
│   ├── musica-bed-oficial.mp3    ← Música isolada
│   ├── voz-oficial.mp3           ← Voz sem música
│   └── README.md                 ← Metadados
├── estudos/                       ← Testes e versões antigas
└── episodios/                     ← [futuro]

public/test-audio/abertura/
├── abertura-muuday-v7-final.mp3   ← Cópia de trabalho
├── index.html                     ← Player de teste
├── opcoes-texto-v6.md             ← Registro de roteiros
└── estudos/                       ← 168 arquivos de teste
```

---

## 📚 Documentação

| Documento                                     | Descrição                                             |
| --------------------------------------------- | ----------------------------------------------------- |
| `docs/strategy/podcast-historias-playbook.md` | **Playbook completo** — decisões, pipeline, checklist |
| `docs/operations/podcast-tts-pipeline.md`     | Pipeline técnico detalhado                            |
| `docs/operations/elevenlabs-tags-guide.md`    | 35+ tags expressivas                                  |

---

## ⚠️ Aprendizados Críticos

1. **ElevenLabs modelo:** Só `eleven_flash_v2_5` interpreta tags. Turbo/multilingual falam as tags.
2. **ffmpeg 8.1.1 bugs:** `afade` cria silêncio; `amix` trunca. Usar Python para mix.
3. **Stability 0.45** é o sweet spot: expressivo mas não teatral.
4. **atempo 1.01** é o padrão para aberturas: ágil sem parecer acelerado.
5. **Uma tag por segmento:** Nunca misturar tags no mesmo texto.
6. **Silence detection:** ~30% das gerações pronunciam a tag. Cortar automaticamente.

---

## 🎯 Próximos Passos (Ordenados)

1. [ ] **Fechamento/encerramento** — Produzir outro com mesma música, tom de despedida
2. [ ] **Script de segmentação automática** — Split por tag + pipeline em um comando
3. [ ] **Episódio piloto** — End-to-end com história real, testar todo o fluxo
4. [ ] **Transições e stingers** — Identidade sonora entre seções
5. [ ] **Template de roteiro no Sanity** — Estrutura padrão para escritores

---

## 🔗 Links

- Player: `file:///Users/igorpinto/social-media-machine/public/test-audio/abertura/index.html`
- Playbook: `docs/strategy/podcast-historias-playbook.md`
- Pipeline: `docs/operations/podcast-tts-pipeline.md`

## 📝 Session 2026-06-07

- Podcast abertura v7 aprovada como oficial. Estrutura limpa criada em public/audio/podcast/. Playbook escrito em docs/strategy/podcast-historias-playbook.md
- Quality gates: TS ✓ Tests ✗
