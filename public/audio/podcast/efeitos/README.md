# Biblioteca de Efeitos Sonoros — Podcast Muuday

> **Gerado:** 2026-06-07
> **Ferramenta:** Python + numpy (síntese de áudio)
> **Formato:** MP3, 192kbps, 44.1kHz, Mono
> **Tamanho total:** ~2.9MB

---

## 🎵 Stingers / Transições

| Arquivo                      | Duração | Descrição                           | Quando usar        |
| ---------------------------- | ------- | ----------------------------------- | ------------------ |
| `stinger-sweep-up.mp3`       | 2.5s    | Sweep ascendente com harmônicas     | Entrada de seção   |
| `stinger-sweep-down.mp3`     | 2.0s    | Sweep descendente elegante          | Saída de seção     |
| `stinger-whoosh.mp3`         | 1.5s    | Whoosh de ar com filtro móvel       | Corte rápido       |
| `stinger-reverse-cymbal.mp3` | 2.0s    | Build de tensão tipo reverse cymbal | Antes de revelação |
| `stinger-glitch.mp3`         | 0.5s    | Glitch curto e moderno              | Transição tech     |
| `stinger-transition.mp3`     | 2.0s    | Versão alternativa do sweep         | Backup             |

## 💥 Impacts / Hits

| Arquivo               | Duração | Descrição                | Quando usar         |
| --------------------- | ------- | ------------------------ | ------------------- |
| `impact-thud.mp3`     | 1.5s    | Impacto grave sutil      | Momento emocional   |
| `impact-sub-drop.mp3` | 2.0s    | Sub bass drop            | Transição dramática |
| `impact-hit.mp3`      | 0.8s    | Hit percussivo curto     | Marca tópico        |
| `impact-boom.mp3`     | 1.2s    | Boom cinematográfico     | Climax              |
| `impact-rim.mp3`      | 0.4s    | Rim shot seco            | ênfase rápida       |
| `impact-metallic.mp3` | 1.0s    | Hit metálico com sustain | Revelação           |
| `impact-suave.mp3`    | 1.5s    | Versão alternativa sutil | Backup              |

## 🌊 Ambient Beds

| Arquivo                | Duração | Descrição                      | Quando usar          |
| ---------------------- | ------- | ------------------------------ | -------------------- |
| `bed-suspense.mp3`     | 15s     | Drone sombrio com beating      | Tensão, mistério     |
| `bed-warm.mp3`         | 15s     | Pad acolhedor (acorde E maior) | Momentos emotivos    |
| `bed-uplifting.mp3`    | 15s     | Pad leve com tremolo           | Esperança, superação |
| `bed-neutral.mp3`      | 15s     | Fundo neutro e discreto        | Narração pura        |
| `bed-dark-tension.mp3` | 12s     | Drone grave com LFO            | Suspense intenso     |
| `bed-hopeful.mp3`      | 15s     | Pad com sweep de filtro        | Momento de virada    |

## 🔔 UI / CTA Sounds

| Arquivo          | Duração | Descrição                 | Quando usar      |
| ---------------- | ------- | ------------------------- | ---------------- |
| `ui-pop.mp3`     | 0.4s    | Pop de notificação suave  | Alerta CTA       |
| `ui-chime.mp3`   | 0.6s    | Chime em triade (C-E-G)   | Dica/destaque    |
| `ui-click.mp3`   | 0.15s   | Click seco e curto        | Transição rápida |
| `ui-success.mp3` | 0.8s    | Acorde maior de resolução | Confirmação      |
| `ui-error.mp3`   | 0.3s    | Buzz grave curto          | Correção         |
| `ui-bell.mp3`    | 0.7s    | Sino cristalino (F-A-C)   | Intro de dica    |
| `cta-bip.mp3`    | 0.5s    | Bip simples alternativo   | Backup           |

## 🎼 Identidade Sonora Exclusiva

| Arquivo               | Duração | Descrição               | Quando usar         |
| --------------------- | ------- | ----------------------- | ------------------- |
| `logo-sting.mp3`      | 4.0s    | Sting completo da marca | Reels/shorts        |
| `logo-ident.mp3`      | 2.5s    | Ident curto e brilhante | Logos               |
| `signature-tone.mp3`  | 2.0s    | Nota E4 com vibrato     | Assinatura          |
| `build-countdown.mp3` | 3.0s    | 3 ticks de build        | Contagem regressiva |
| `watermark.mp3`       | 1.0s    | Marca sutil em 3kHz     | Proteção            |

---

## 🎚️ Níveis de Volume Recomendados

| Tipo de Efeito | Volume relativo à voz        |
| -------------- | ---------------------------- |
| Stingers       | -6dB (60% do volume da voz)  |
| Impacts        | -8dB (40% do volume da voz)  |
| Ambient Beds   | -20dB (10% do volume da voz) |
| UI Sounds      | -10dB (30% do volume da voz) |
| Logo/Ident     | -4dB (63% do volume da voz)  |

---

## 📝 Como Usar no Pipeline

```python
# Exemplo: adicionar stinger antes de uma seção
import subprocess

# Mixar stinger com a voz (stinger em volume menor)
stinger_vol = 0.6  # -6dB relativo

# Usar ffmpeg amix ou Python manual para mixar
```

---

_Gerado com Python + numpy. Todos os efeitos são royalty-free e exclusivos da marca Muuday._
