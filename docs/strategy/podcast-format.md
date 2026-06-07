# Formato do Podcast: Muuday

> **Status**: Definição completa — aguardando decisão sobre engine de voz  
> **Última atualização**: 2026-06-07

---

## 🎙️ Estrutura do Episódio

| Bloco                        | Duração   | Conteúdo                                                                                                    | Voz               | Música                               |
| ---------------------------- | --------- | ----------------------------------------------------------------------------------------------------------- | ----------------- | ------------------------------------ |
| **Intro / Jingle**           | 0:00-0:05 | Identidade sonora + nome do podcast                                                                         | ElevenLabs (over) | Royalty-free (Uppbeat/YouTube Audio) |
| **Saudação + Hook**          | 0:05-0:30 | "E aí, brasileiro pelo mundo..." + chamada para história                                                    | Narrador          | Nenhuma                              |
| **Conteúdo Principal**       | 0:30-8:00 | Histórias de brasileiros no exterior, formatadas com narrativa divertida, efeitos especiais sonoros, emoção | Narrador          | Nenhuma (apenas SFX pontuais)        |
| **Comentários dos Ouvintes** | 8:00-8:30 | Resposta a comentários do Instagram, feedback, perguntas                                                    | Narrador          | Nenhuma                              |
| **Outro / CTA**              | 8:30-9:00 | "Se inscreve no podcast, segue a gente no Instagram"                                                        | Narrador          | Fade do jingle                       |

**Duração total alvo**: 5-9 minutos (começar curto, crescer com audiência)

---

## 📚 Fonte de Conteúdo

1. **Instagram**: Comentários em posts, stories respondidos, DMs com histórias
2. **Reddit**: r/brasil, r/foradecasa, r/BrasildoB — histórias reais de imigrantes
3. **Prompt de formatação**: A história bruta é "romantizada" com:
   - Extrapolação emocional (o que a pessoa sentiu)
   - Efeitos sonoros de ambiente (aeroporto, mercado, metrô)
   - Narração em primeira ou terceira pessoa
   - Gancho dramático no início

---

## 🎧 Identidade Sonora

- **Jingle**: 5 segundos, royalty-free (Uppbeat/YouTube Audio Library) + voz ElevenLabs falando "Muuday — Conectando brasileiros pelo mundo"
- **Tom**: Fun, leve, descontraído — **nunca** travado ou robótico
- **Efeitos sonoros**: ElevenLabs Sound Effects API para ambientação (aeroporto, chuva, cidade, etc)
- **Mixagem**: Audacity (gratuito) para combinar faixas de voz + música + SFX

---

## ⚠️ Bloqueio Atual: Engine de Voz

O ElevenLabs **não possui vozes brasileiras nativas**. Todas as 21 vozes disponíveis são em inglês (americano, britânico, australiano).

### Opções:

| Opção                            | Voz                                              | Custo             | Qualidade do PT-BR                       | Notas                                                |
| -------------------------------- | ------------------------------------------------ | ----------------- | ---------------------------------------- | ---------------------------------------------------- |
| **A — ElevenLabs Multilingual**  | Voz americana/britânica falando PT               | $22/mês (Creator) | ⚠️ Sotaque estrangeiro                   | Rápido de implementar; já conectado                  |
| **B — Play.ht**                  | Vozes brasileiras nativas (ex: Fernanda, Carlos) | $39/mês           | ⭐⭐⭐ Nativo                            | Excelente para podcast; requer nova integração       |
| **C — LOVO AI**                  | Vozes brasileiras (ex: Camila, Rafael)           | $25/mês           | ⭐⭐⭐ Nativo                            | Bom custo-benefício; requer nova integração          |
| **D — ElevenLabs Voice Cloning** | Clonar voz de alguém da equipe                   | $22/mês + amostra | ⭐⭐⭐ Nativo (se clonado de brasileiro) | Requer áudio de referência de boa qualidade          |
| **E — Google Cloud TTS**         | Vozes WaveNet brasileiras                        | ~$4/1M chars      | ⭐⭐ Bom, mas robótico                   | Mais barato; qualidade inferior a ElevenLabs/Play.ht |

**Recomendação**: Opção **B (Play.ht)** ou **D (Voice Cloning)** para podcast profissional em PT-BR. ElevenLabs multilíngue fica com sotaque americano/britânico — funciona, mas não passa autenticidade brasileira.

---

## 📋 Próximos Passos

1. [ ] **Decisão do usuário**: Qual engine de voz usar?
2. [ ] Conectar engine escolhido e testar vozes brasileiras
3. [ ] Gerar episódio piloto completo (intro + história + outro)
4. [ ] Criar pipeline: buscar história → formatar com AI → gerar narração → mixar → publicar
5. [ ] Configurar feed RSS para Spotify/Apple Podcasts
