# Podcast TTS Pipeline — Configuração Final

> **Última atualização:** 2026-06-07  
> **Status:** ✅ Pipeline validado e pronto para produção  
> **Última versão:** v6 — Abertura segmentada com tags + Mixkit Track 34

---

## 🏆 Configuração Vencedora

| Parâmetro     | Valor               | Notas                                                     |
| ------------- | ------------------- | --------------------------------------------------------- |
| **Provedor**  | ElevenLabs          | Creator plan ($22/mo)                                     |
| **Voz**       | `Jessica`           | Melhor para português brasileiro                          |
| **Modelo**    | `eleven_flash_v2_5` | **Obrigatório** — único que interpreta tags como prosódia |
| **Stability** | `0.35`              | Baixo = mais expressivo, menos robótico                   |
| **Style**     | `0.85`              | Alto = mais entonação natural                             |
| **Speed**     | `1.0`               | Deixar no padrão; vari-speed é pós-processado no ffmpeg   |

> ⚠️ **NUNCA usar `eleven_turbo_v2_5` ou `eleven_multilingual_v2`** — eles **falam as tags como palavras** (ex: diz "sarcastic" em vez de interpretar como sarcasmo).

---

## 🎭 Tags Expressivas Suportadas (v3+)

O `eleven_flash_v2_5` interpreta estas tags como **direções de performance**, não como texto:

| Tag            | Efeito                   | Quando usar                    |
| -------------- | ------------------------ | ------------------------------ |
| `[narrating]`  | Tom neutro, informativo  | Abertura, transições           |
| `[sarcastic]`  | Tom irônico, seco        | Piadas, críticas leves         |
| `[whispering]` | Sussurro, íntimo         | Suspense, confidências         |
| `[laughs]`     | Risada natural           | Final de piada, momentos leves |
| `[smiling]`    | Tom levemente sorridente | Boas-vindas, notícias boas     |

> 💡 **Não use múltiplas tags no mesmo texto** — o modelo funciona melhor com **uma tag por geração**. Para narração longa com emoções variadas, use a estratégia de [segmentação](#-estratégia-de-segmentação).

---

## 🔧 Pipeline FFmpeg (Pós-Processamento)

### Step 1: Vari-Speed + Pitch Drift

```bash
ffmpeg -y -i input.mp3 \
  -af "atempo=0.99,asetrate=43700,highpass=f=60,lowpass=f=10000" \
  -ar 44100 step1.mp3
```

| Parâmetro         | Valor         | O que faz                                                          |
| ----------------- | ------------- | ------------------------------------------------------------------ |
| `atempo=0.99`     | **Ajustável** | Desacelera 1% para sofrer menos "robotizado". Teste `0.98` a `1.0` |
| `asetrate=43700`  | Fixo          | Aumenta pitch sutilmente (~7 cent) para soar mais humano           |
| `highpass=f=60`   | Fixo          | Remove subgraves indesejados                                       |
| `lowpass=f=10000` | Fixo          | Suaviza agudos excessivos do TTS                                   |

> 🎚️ **Ajuste fino do atempo:** Valores menores = mais lento/"ponderado". Valores maiores = mais rápido/"dinâmico". O ideal está entre `0.98` e `1.0` — **testar por voz e por conteúdo**.

### Step 2: Room Tone (Ambiente)

```bash
ffmpeg -y -f lavfi -i "anoisesrc=color=pink:r=44100:duration=60" \
  -af "lowpass=f=4000,highpass=f=80,volume=0.025" \
  -ar 44100 roomtone.mp3
```

| Parâmetro        | Valor         | O que faz                                                         |
| ---------------- | ------------- | ----------------------------------------------------------------- |
| `color=pink`     | Fixo          | Pink noise = mais natural que white noise                         |
| `volume=0.025`   | **Ajustável** | Quase inaudível, mas tira o "vácuo" do TTS. Teste `0.02` a `0.04` |
| `lowpass=f=4000` | Fixo          | Mantém apenas frequências de ambiente                             |

### Step 3: Mix + Loudness Normalization

```bash
ffmpeg -y -i step1.mp3 -i roomtone.mp3 \
  -filter_complex "
    [0:a]volume=1.0[voice];
    [1:a]volume=1.0[rt];
    [voice][rt]amix=inputs=2:duration=first:dropout_transition=1[mixed];
    [mixed]loudnorm=I=-16:TP=-1.5:LRA=11[out]
  " \
  -map "[out]" -ar 44100 -b:a 192k final.mp3
```

| Parâmetro   | Valor | O que faz                                   |
| ----------- | ----- | ------------------------------------------- |
| `I=-16`     | Fixo  | Loudness target (-16 LUFS = padrão podcast) |
| `TP=-1.5`   | Fixo  | True Peak limit (evita distorção)           |
| `LRA=11`    | Fixo  | Loudness Range (dinâmica natural)           |
| `-b:a 192k` | Fixo  | Qualidade MP3 broadcast                     |

---

## 🧩 Estratégia de Segmentação

Para narrações longas com múltiplas emoções, **não gere tudo de uma vez**. Segmentar garante que cada tag seja interpretada corretamente.

### Exemplo: Texto com 3 emoções

```
[narrating] A imigração é um tema complexo.
[sarcastic] Claro, porque é tão fácil deixar tudo para trás.
[whispering] Mas tem um segredo que ninguém conta...
```

### Fluxo de Segmentação

```
Segmento 1: [narrating] "A imigração é um tema complexo."
   ↓
  Eleven v3 → raw_1.mp3
   ↓
  Detectar silêncio inicial → cortar tag falada (se houver)
   ↓
  Pipeline ffmpeg → seg_1.mp3

Segmento 2: [sarcastic] "Claro, porque é tão fácil deixar tudo para trás."
   ↓
  Eleven v3 → raw_2.mp3
   ↓
  Cortar tag → Pipeline → seg_2.mp3

Segmento 3: [whispering] "Mas tem um segredo que ninguém conta..."
   ↓
  Eleven v3 → raw_3.mp3
   ↓
  Cortar tag → Pipeline → seg_3.mp3

Concatenação final:
  ffmpeg -f concat -i list.txt -c copy episodio.mp3
```

> No Eleven v3, tags iniciais (`[narrating]`, `[sarcastic]`) **podem** ser faladas como palavras. Use `silencedetect` para identificar e cortar.

---

## 📏 Corte de Tag Falada (Silence Detection)

```bash
# Detectar onde a tag falada termina
ffmpeg -i raw.mp3 -af silencedetect=noise=-30dB:d=0.1 -f null - 2>&1 | \
  grep -E "silence_start|silence_end"

# Cortar a partir do fim do primeiro silêncio
ffmpeg -y -ss [silence_end] -i raw.mp3 -c:a copy limpo.mp3
```

**Padrão típico:**

- `0.00s` → `silence_start: 0`
- `0.72s` → `silence_end` ← **cortar aqui**
- `0.72s` em diante → conteúdo real

---

## 🎚️ Auphonic: Opcional

Para **voz pura sem música de fundo**, o pipeline ffmpeg é **suficiente**.

Use Auphonic apenas se:

- Há música de fundo junto com voz (Adaptive Leveler)
- A gravação tem ruído de ambiente significativo (Denoiser)
- Há múltiplos locutores com volumes diferentes
- Precisa de True Peak mais seguro (streaming)

**Latência:** +30-60s por upload/processamento/download  
**Custo:** 2h/mês grátis, depois €9/mês

---

## 🔄 Script de Pipeline Completo

```typescript
// src/audio/podcast-pipeline.ts

const ELEVENLABS_CONFIG = {
  voiceId: 'Jessica',
  modelId: 'eleven_flash_v2_5',
  stability: 0.35,
  style: 0.85,
  speed: 1.0,
} as const

const PIPELINE_CONFIG = {
  atempo: 0.99, // ⭐ Ajustável: 0.98 - 1.0
  roomtoneVolume: 0.025, // ⭐ Ajustável: 0.02 - 0.04
  loudnessTarget: -16, // LUFS
  truePeak: -1.5, // dB
  loudnessRange: 11, // LRA
} as const
```

---

## 📋 Checklist de Produção

- [ ] Usar `eleven_flash_v2_5` (nunca turbo/multilingual)
- [ ] Voz = Jessica
- [ ] Stability = 0.30, Style = 0.75
- [ ] Uma tag por geração (segmentar se necessário)
- [ ] Aplicar vari-speed (`atempo=0.99`)
- [ ] Aplicar pitch drift (`asetrate=43700`)
- [ ] Mix com room tone (`volume=0.025`)
- [ ] Normalizar loudness (`-16 LUFS`)
- [ ] Verificar se tags foram faladas → cortar se necessário
- [ ] Exportar em 192kbps, 44.1kHz

---

## 🎵 Mix com Música de Fundo

Para adicionar música de fundo (bed) à narração:

### Parâmetros da Abertura v6 (Referência)

| Parâmetro       | Valor           | Descrição                     |
| --------------- | --------------- | ----------------------------- |
| **Música**      | Mixkit Track 34 | Royalty-free, 15s clip        |
| **Delay voz**   | 2s              | Música sozinha no início      |
| **Gain música** | 0.8             | Música a 80% do volume da voz |
| **Fade in**     | 1s              | Suaviza entrada da música     |
| **Fade out**    | 3s              | Suaviza saída da música       |
| **Duração**     | 20.3s           | Voz 18.3s + delay 2s          |

### Workaround: Bug do ffmpeg 8.1.1

O `afade` e `amix` do ffmpeg 8.1.1 têm bugs críticos:

- `afade=t=out` → cria silêncio total após ~2s
- `amix` → trunca quando o input mais curto termina

**Solução:** Mix manual em Python (sample-by-sample):

```python
import wave, array

with wave.open("voz.wav", "rb") as w:
    voz = array.array('h', w.readframes(w.getnframes()))
with wave.open("musica.wav", "rb") as w:
    mus = array.array('h', w.readframes(w.getnframes()))

delay = 2 * 44100  # 2 segundos
gain = 0.8

# Aplicar delay na voz
voz_delayed = array.array('h', [0] * delay)
voz_delayed.extend(voz)

# Ajustar tamanhos
max_len = max(len(mus), len(voz_delayed))
mus.extend([0] * (max_len - len(mus)))
voz_delayed.extend([0] * (max_len - len(voz_delayed)))

# Mix com clamping
mix = array.array('h')
for i in range(max_len):
    s = int(voz_delayed[i] + mus[i] * gain)
    mix.append(min(32767, max(-32768, s)))

with wave.open("mix.wav", "wb") as w:
    w.setnchannels(1)
    w.setsampwidth(2)
    w.setframerate(44100)
    w.writeframes(mix.tobytes())
```

### Níveis de Volume Validados

| Trecho | mean_volume | Contexto               |
| ------ | ----------- | ---------------------- |
| 0-2s   | -28.2 dB    | Música sozinha (intro) |
| 4-6s   | -13.8 dB    | Voz + música (corpo)   |
| 12-14s | -13.5 dB    | Fade out da música     |
| 16-18s | -17.7 dB    | Só voz (conclusão)     |

---

## 🎯 Próximo Ajuste: Fine-Tuning do Vari-Speed

O parâmetro `atempo` é o único que ainda precisa de calibração por conteúdo:

| Conteúdo                 | atempo recomendado | Por quê                   |
| ------------------------ | ------------------ | ------------------------- |
| Narração calma/reflexiva | `0.98`             | Mais lento = mais peso    |
| Notícias/informativo     | `0.99`             | Equilíbrio natural        |
| Entrevista/conversação   | `1.0`              | Velocidade realista       |
| Suspense/tensão          | `0.97`             | Mais pausa entre palavras |

**Testar sempre:** Gerar 10s de amostra com 3 valores (`0.98`, `0.99`, `1.0`), ouvir e comparar.

---

_Documento vivo — atualizar conforme novos testes e ajustes._
