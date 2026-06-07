# Pipeline TTS para Podcast Muuday

> **Status**: Pipeline validado — melhor resultado: `combined-pipeline-auphonic-final.mp3`
> **Voz**: Jessica (Playful, Bright, Warm) — ID: `cgSgspJ2msm6clMCkdW9`
> **Última atualização**: 2026-06-07

---

## 🎯 Visão Geral

Pipeline completo para transformar texto em narração de podcast ultra-natural usando ElevenLabs + pós-produção automática. Elimina o efeito "robô" do TTS através de vari-speed, room tone e processamento profissional via Auphonic.

---

## 🛠️ Etapas do Pipeline

### 1. Gerar áudio com ElevenLabs (com tag de emoção)

```bash
# Modelo: eleven_multilingual_v2
# Voz: Jessica (cgSgspJ2msm6clMCkdW9)
# Settings otimizados:
#   stability: 0.3
#   similarity_boost: 0.5
#   style: 0.75
#   use_speaker_boost: true
```

**Regra de ouro**: Usar **uma única tag** no início (`[narrating]`) para induzir entonação storyteller. Nunca múltiplas tags — ficam cheesy.

**Estratégia de partes**: Gerar em **2 partes separadas** para facilitar o corte da tag:

- Parte 1: `[narrating] <primeira metade do roteiro>`
- Parte 2: `<segunda metade do roteiro>` (sem tag)

Isso evita que a tag do meio do texto seja falada no áudio final.

---

### 2. Detectar silêncios (para localizar a tag)

```bash
ffmpeg -i part1-raw.mp3 -af silencedetect=noise=-40dB:d=0.15 -f null - 2>&1 | grep -E "silence_start|silence_end"
```

**Exemplo de saída:**

```
silence_start: 0.838776
silence_end: 2.198662 | silence_duration: 1.359887
```

A tag `[narrating]` termina em ~0.84s. O silêncio vai até ~2.20s. O conteúdo real começa em **2.20s**.

---

### 3. Cortar a tag

```bash
ffmpeg -y -i part1-raw.mp3 -ss 2.20 -c copy part1-clean.mp3
```

A Parte 2 não precisa de corte (gerada sem tag).

---

### 4. Concatenar as partes

```bash
ffmpeg -y -i part1-clean.mp3 -i part2.mp3 \
  -filter_complex "[0:a][1:a]concat=n=2:v=0:a=1[out]" -map "[out]" combined-clean.mp3
```

---

### 5. Aplicar vari-speed + pitch drift

Humanos não falam com velocidade constante. O TTS sim. Vari-speed de 1% quebra o padrão mecânico.

```bash
ffmpeg -y -i combined-clean.mp3 \
  -af "atempo=0.99,asetrate=43700,highpass=f=60,lowpass=f=10000" \
  -ar 44100 combined-step1.mp3
```

| Parâmetro         | Valor                    | Efeito           |
| ----------------- | ------------------------ | ---------------- |
| `atempo=0.99`     | 1% mais lento            | Menos robótico   |
| `asetrate=43700`  | Pitch levemente abaixado | Menos "perfeito" |
| `highpass=f=60`   | Remove sub-graves        | Mais limpo       |
| `lowpass=f=10000` | Suaviza agudos           | Menos estridente |

---

### 6. Adicionar room tone

Ruído de ambiente sutil para criar sensação de espaço real.

```bash
ffmpeg -y -f lavfi -i "anoisesrc=color=pink:r=44100:duration=15" \
  -af "lowpass=f=4000,highpass=f=80,volume=0.025" \
  -ar 44100 roomtone.mp3
```

---

### 7. Mixar voz + room tone + normalizar

```bash
ffmpeg -y -i combined-step1.mp3 -i roomtone.mp3 \
  -filter_complex "
    [0:a]volume=1.0[voice];
    [1:a]volume=1.0[rt];
    [voice][rt]amix=inputs=2:duration=first:dropout_transition=1[mixed];
    [mixed]loudnorm=I=-16:TP=-1.5:LRA=11[out]
  " -map "[out]" -ar 44100 -b:a 192k combined-pipeline.mp3
```

| Parâmetro        | Valor             | Efeito           |
| ---------------- | ----------------- | ---------------- |
| `loudnorm=I=-16` | Loudness -16 LUFS | Padrão podcast   |
| `TP=-1.5`        | True Peak -1.5dB  | Sem distorção    |
| `LRA=11`         | Loudness Range 11 | Dinâmica natural |

---

### 8. Enviar para Auphonic (pós-produção profissional)

```bash
npx tsx scripts/test-auphonic-standalone.ts combined-pipeline.mp3
```

**O que o Auphonic faz automaticamente:**

- 🎯 Adaptive Leveler — equaliza volume entre frases
- 🔇 Dynamic Denoiser — remove ruído residual
- ✨ Voice AutoEQ — realça frequências da voz
- 📐 True Peak Limiter — protege contra distorção
- 🎚️ Loudness normalization — confirma -16 LUFS

---

## 📊 Resultado Final

| Arquivo                                | Tamanho | Estado                           |
| -------------------------------------- | ------- | -------------------------------- |
| `combined-clean.mp3`                   | ~53 KB  | Após corte da tag + concatenação |
| `combined-pipeline.mp3`                | ~161 KB | Após vari-speed + room tone      |
| `combined-pipeline-auphonic-final.mp3` | ~208 KB | **RESULTADO FINAL**              |

---

## ⚡ Resumo em uma linha

```
ElevenLabs ([narrating] tag) → cortar tag → concatenar → vari-speed 0.99x → room tone → Auphonic
```

---

## 📝 Variáveis de ambiente necessárias

```bash
ELEVENLABS_API_KEY=sk_...
AUPHONIC_API_KEY=...
```

---

## 🚫 O que NÃO funciona

| Técnica                          | Por que falhou                        |
| -------------------------------- | ------------------------------------- |
| Múltiplas tags no texto          | Ficam cheesy/forçadas                 |
| Tags no meio do texto            | São faladas no áudio (difícil cortar) |
| Gírias excessivas ("cara", "pá") | Ficam artificiais                     |
| Compressão agressiva ffmpeg      | Destrói a naturalidade                |
| Reverb excessivo                 | Fica com "eco de banheiro"            |

---

## ✅ O que FUNCIONA

| Técnica                       | Impacto                            |
| ----------------------------- | ---------------------------------- |
| **Tag única no início**       | Induz entonação sem poluir o áudio |
| **Gerar em partes separadas** | Permite corte preciso da tag       |
| **Vari-speed 0.99x**          | Quebra a perfeição mecânica do TTS |
| **Pitch drift sutil**         | Torna a voz menos "plástica"       |
| **Room tone**                 | Cria sensação de espaço real       |
| **Auphonic**                  | Polimento profissional automático  |
