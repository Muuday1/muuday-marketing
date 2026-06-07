# Podcast de Histórias — Playbook de Produção

> **Última atualização:** 2026-06-07
> **Status:** ✅ Abertura oficial aprovada · Pipeline validado · Pronto para produção
> **Dono:** Content Engine / Studio

---

## 🎯 Visão do Produto

**Formato:** Podcast de histórias curtas (10–15 min) sobre a experiência de brasileiros no exterior.

**Tom:** Íntimo, acolhedor, inspirador — como uma conversa de café com uma amiga que entende o que você passou.

**Público:** Brazucas entre 25–45 anos, vivendo ou planejando viver fora do Brasil.

**Frequência:** 1 episódio por semana (quarta-feira)

---

## ✅ Decisões Tomadas

### 1. Abertura Oficial (v7)

**Arquivo:** `public/audio/podcast/abertura/abertura-oficial.mp3` (17.4s)

Aprovada após 7 iterações. Características:

- **3 frases** — curta, direta, sem enrolação
- **17.4 segundos** — ideal para não cansar ouvintes recorrentes
- **Tags variadas** — emoção crescente: `[smiling]` → `[excited]` → `[narrating]`
- **Mais ágil** — `atempo=1.01` evita o efeito "arrastado"
- **Mais natural** — `stability=0.45` tira o ar "forçado/teatral"

**Roteiro:**

```
[smiling]  Se tem uma coisa que eu aprendi com milhares de brazucas pelo mundo...
            é que a gente nunca desiste.

[excited]  Eu sou a Jessica, e esse é o Muuday!

[narrating] Hoje a gente vai falar sobre a história de quem deu o passo
            de deixar o Brasil pra trás... e descobriu que "mudar"
            pode ser mais que um verbo.
```

### 2. Fechamento Oficial

**Arquivo:** `public/audio/podcast/abertura/fechamento-oficial.mp3` (15.0s)

Mesmo pipeline da abertura. Tom acolhedor, com CTA para Instagram.

**Roteiro:**

```
[warm]    Obrigada por ficar comigo até aqui.
[smiling] Me conta o que achou lá no Instagram, arroba use mudei.
[warm]    E não esquece de seguir a gente pra não perder a próxima história.
```

**Diretrizes:**

- Pronunciar "@usemuuday" como "arroba use mudei" (trocadilho da marca)
- CTA suave, não agressivo — combina com o tom acolhedor do podcast
- Mesma música da abertura para consistência sonora

### 3. Identidade Sonora Completa

**Pasta:** `public/audio/podcast/efeitos/` (33 efeitos, ~2.9MB)

Gerada com Python + numpy — síntese de áudio broadcast-quality. Todos os efeitos são royalty-free e exclusivos da marca.

#### Stingers / Transições (6 efeitos)

| Efeito                   | Duração | Uso                      |
| ------------------------ | ------- | ------------------------ |
| `stinger-sweep-up`       | 2.5s    | Entrada de seção         |
| `stinger-sweep-down`     | 2.0s    | Saída de seção           |
| `stinger-whoosh`         | 1.5s    | Corte rápido             |
| `stinger-reverse-cymbal` | 2.0s    | Build antes de revelação |
| `stinger-glitch`         | 0.5s    | Transição moderna        |
| `stinger-transition`     | 2.0s    | Versão alternativa       |

#### Impacts / Hits (7 efeitos)

| Efeito            | Duração | Uso                 |
| ----------------- | ------- | ------------------- |
| `impact-thud`     | 1.5s    | Momento emocional   |
| `impact-sub-drop` | 2.0s    | Transição dramática |
| `impact-hit`      | 0.8s    | Marca tópico        |
| `impact-boom`     | 1.2s    | Climax              |
| `impact-rim`      | 0.4s    | ênfase rápida       |
| `impact-metallic` | 1.0s    | Revelação           |

#### Ambient Beds (6 efeitos)

| Efeito             | Duração | Uso                  |
| ------------------ | ------- | -------------------- |
| `bed-suspense`     | 15s     | Tensão, mistério     |
| `bed-warm`         | 15s     | Momentos emotivos    |
| `bed-uplifting`    | 15s     | Esperança, superação |
| `bed-neutral`      | 15s     | Narração pura        |
| `bed-dark-tension` | 12s     | Suspense intenso     |
| `bed-hopeful`      | 15s     | Momento de virada    |

#### UI / CTA Sounds (7 efeitos)

| Efeito       | Duração | Uso              |
| ------------ | ------- | ---------------- |
| `ui-pop`     | 0.4s    | Alerta CTA       |
| `ui-chime`   | 0.6s    | Dica/destaque    |
| `ui-click`   | 0.15s   | Transição rápida |
| `ui-success` | 0.8s    | Confirmação      |
| `ui-error`   | 0.3s    | Correção         |
| `ui-bell`    | 0.7s    | Intro de dica    |

#### Identidade Sonora Exclusiva (5 efeitos)

| Efeito            | Duração | Uso                 |
| ----------------- | ------- | ------------------- |
| `logo-sting`      | 4.0s    | Reels/shorts        |
| `logo-ident`      | 2.5s    | Logos               |
| `signature-tone`  | 2.0s    | Tom de assinatura   |
| `build-countdown` | 3.0s    | Contagem regressiva |
| `watermark`       | 1.0s    | Proteção            |

#### Níveis de Volume Recomendados

| Tipo         | Volume relativo à voz |
| ------------ | --------------------- |
| Stingers     | -6dB (60%)            |
| Impacts      | -8dB (40%)            |
| Ambient Beds | -20dB (10%)           |
| UI Sounds    | -10dB (30%)           |
| Logo/Ident   | -4dB (63%)            |

---

### 4. Pipeline de Áudio — Configuração Final

#### ElevenLabs

| Parâmetro | Valor               | Por quê                                                   |
| --------- | ------------------- | --------------------------------------------------------- |
| Voz       | `Jessica`           | Melhor PT-BR natural                                      |
| Modelo    | `eleven_flash_v2_5` | **Obrigatório** — único que interpreta tags como prosódia |
| Stability | `0.45`              | Equilíbrio: expressivo mas não teatral                    |
| Style     | `0.80`              | Entonação presente, não exagerada                         |
| Speed     | `1.0`               | Vari-speed é pós-processado no ffmpeg                     |

> ⚠️ **NUNCA** usar `eleven_turbo_v2_5` ou `eleven_multilingual_v2` — eles falam as tags em voz alta.

#### Pós-Processamento FFmpeg

```bash
# Step 1: Vari-speed + pitch drift
ffmpeg -i input.mp3 \
  -af "atempo=1.01,asetrate=43700,highpass=f=60,lowpass=f=10000" \
  -ar 44100 step1.mp3

# Step 2: Room tone
ffmpeg -f lavfi -i "anoisesrc=color=pink:r=44100:duration=60" \
  -af "lowpass=f=4000,highpass=f=80,volume=0.025" \
  -ar 44100 roomtone.mp3

# Step 3: Mix + loudnorm
ffmpeg -i step1.mp3 -i roomtone.mp3 \
  -filter_complex "
    [0:a]volume=1.0[voice];
    [1:a]volume=1.0[rt];
    [voice][rt]amix=inputs=2:duration=first[mixed];
    [mixed]loudnorm=I=-16:TP=-1.5:LRA=11[out]
  " -map "[out]" -ar 44100 -b:a 192k final.mp3
```

#### Mix com Música de Fundo

| Parâmetro   | Valor                                           |
| ----------- | ----------------------------------------------- |
| Música      | Mixkit Track 34 (royalty-free)                  |
| Delay voz   | 2s (música sozinha no início)                   |
| Gain música | 0.8 (80% do volume da voz)                      |
| Fade in     | 1s                                              |
| Fade out    | 3s                                              |
| Ferramenta  | **Python manual** (workaround ffmpeg 8.1.1 bug) |

#### Estrutura Temporal da Abertura

```
0-2s   → Música sozinha (intro suave, -28 dB)
2-15s  → Voz + música (corpo narrativo, -13 dB)
15-17s → Só voz (conclusão, -19 dB)
```

### 3. Estratégia de Tags Expressivas

Aprendizado principal: **uma tag por segmento de geração**.

| Tag            | Uso no podcast               | Intensidade |
| -------------- | ---------------------------- | ----------- |
| `[smiling]`    | Abertura, boas-vindas        | Suave       |
| `[excited]`    | Apresentação, chamadas       | Média       |
| `[narrating]`  | Corpo da história            | Neutra      |
| `[whispering]` | Segredos, revelações íntimas | Baixa       |
| `[sighs]`      | Momentos de cansaço, saudade | Baixa       |
| `[warm]`       | Conselhos, encerramentos     | Suave       |

**Regra de ouro:** Nunca misturar múltiplas tags no mesmo texto. Segmentar e concatenar.

### 4. Corte de Tags Faladas

Em ~30% das gerações, o ElevenLabs pronuncia a tag em vez de interpretá-la. Solução:

```bash
# Detectar silêncio inicial (onde a tag falada termina)
ffmpeg -i raw.mp3 -af silencedetect=noise=-30dB:d=0.1 -f null - 2>&1 | \
  grep -E "silence_start|silence_end"

# Cortar a partir do silence_end
ffmpeg -ss [silence_end] -i raw.mp3 -c:a copy limpo.mp3
```

Padrão típico: `0.00s` → `silence_start: 0` → `silence_end: 0.7s` → conteúdo real.

### 5. Arquitetura de Arquivos

```
public/audio/podcast/
├── abertura/
│   ├── abertura-oficial.mp3      ← ✅ Versão aprovada
│   ├── musica-bed-oficial.mp3    ← Música isolada
│   ├── voz-oficial.mp3           ← Voz sem música
│   └── README.md                 ← Metadados completos
├── estudos/
│   └── ...                       ← Testes e versões antigas
└── episodios/
    └── [YYYY-MM]_[titulo]/
        ├── episodio-final.mp3
        ├── voz-processada.mp3
        └── roteiro.md
```

---

## 🔧 Aprendizados Técnicos

### ffmpeg 8.1.1 — Bugs Críticos Descobertos

1. **`afade=t=out`** → Cria silêncio total após ~2s, independente dos parâmetros
2. **`amix`** → Trunca o output quando o input mais curto termina
3. **Workaround:** Mix manual em Python, sample-by-sample com clamping:

```python
import wave, array

# ... carregar voz e música como array.array('h') ...

mix = array.array('h')
for i in range(max_len):
    s = int(voz[i] + musica[i] * gain)
    mix.append(min(32767, max(-32768, s)))
```

### Pronúncia de "Muuday"

O ElevenLabs pronuncia "Muuday" de forma aceitável (algo como "Mu-dêi"). Não é necessário alterar a grafia.

### Velocidade da Voz (atempo)

| Valor    | Sensação            | Quando usar                            |
| -------- | ------------------- | -------------------------------------- |
| 0.98     | Lento, reflexivo    | Momentos de saudade, introspecção      |
| 0.99     | Levemente ponderado | Notícias, informação                   |
| **1.01** | **Ágil, natural**   | **Padrão para aberturas e narrativas** |
| 1.02     | Dinâmico, rápido    | Chamadas de ação, energia alta         |

### Música — Seleção e Mix

- **Mixkit** é suficiente para beds de podcast (royalty-free, qualidade boa)
- Track 34 foi aprovada: instrumental suave, não compete com voz
- **Regra:** Música nunca deve estar acima de -20 dB quando a voz está presente

---

## 📋 Checklist de Produção por Episódio

### Pré-Produção

- [ ] Definir tema e ângulo da história
- [ ] Escrever roteiro com marcações de tags
- [ ] Quebrar roteiro em segmentos (1 tag por segmento)
- [ ] Revisar culturalmente com brasileiro (regra Muuday)

### Produção

- [ ] Gerar segmentos no ElevenLabs (Jessica, flash_v2_5, stability=0.45, style=0.80)
- [ ] Verificar cada segmento: tag foi interpretada ou falada?
- [ ] Cortar tags faladas via silencedetect
- [ ] Aplicar pipeline ffmpeg (atempo=1.01, asetrate=43700, roomtone, loudnorm)
- [ ] Concatenar segmentos
- [ ] Mixar com música (delay 2s, gain 0.8, fade in/out)
- [ ] Verificar loudness em 3 trechos (intro, corpo, fade)

### Pós-Produção

- [ ] Ouvir episódio completo
- [ ] Verificar se abertura oficial está no início
- [ ] Adicionar fechamento/encerramento (a definir)
- [ ] Exportar em 192kbps, 44.1kHz, mono
- [ ] Fazer upload para plataforma de hospedagem
- [ ] Escrever show notes e descrição

---

## 🎯 Próximos Passos

| Prioridade | Tarefa                                           | Status        | Responsável |
| ---------- | ------------------------------------------------ | ------------- | ----------- |
| ✅         | Abertura oficial v7                              | **Concluído** | Studio      |
| ✅         | Fechamento com CTA @usemuuday                    | **Concluído** | Studio      |
| ✅         | Identidade sonora completa (33 efeitos)          | **Concluído** | Studio      |
| ✅         | Manual de produção de episódios                  | **Concluído** | Content     |
| 🔥         | **Produzir episódio piloto**                     | **Próximo**   | Content     |
| Alta       | Script de segmentação automática (split por tag) | Pendente      | Dev         |
| Média      | Template de roteiro no Sanity CMS                | Pendente      | Dev         |
| Média      | Avaliar Auphonic vs pipeline ffmpeg puro         | Pendente      | Studio      |

---

## 🔗 Referências

| Documento                                    | Descrição                                                                                                    |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `docs/strategy/podcast-producao-episodio.md` | **Manual completo** — fluxo de produção, busca de histórias, framework de roteirização, checklist, templates |
| `docs/operations/podcast-tts-pipeline.md`    | Pipeline técnico de áudio                                                                                    |
| `docs/operations/elevenlabs-tags-guide.md`   | Guia de 35+ tags expressivas                                                                                 |
| `public/audio/podcast/abertura/README.md`    | Metadados da abertura e fechamento                                                                           |
| `public/audio/podcast/efeitos/README.md`     | Catálogo da biblioteca de efeitos                                                                            |
| `public/test-audio/abertura/index.html`      | Player de teste (abertura + fechamento)                                                                      |
| `public/audio/podcast/efeitos/index.html`    | Player de teste (efeitos sonoros)                                                                            |

---

_Documento vivo. Atualizar conforme novos episódios forem produzidos._
