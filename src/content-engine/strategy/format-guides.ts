// Strategic guides for every content format
// Used to build AI prompts and UI suggestions

import { ContentFormat, ContentPlatform, ContentPurpose } from './content-matrix'

export interface FormatGuide {
  format: ContentFormat
  platform: ContentPlatform
  structure: string[] // Step-by-step structure
  hookTemplates: string[] // Suggested hooks
  ctaTemplates: string[] // Suggested CTAs
  visualGuidelines: string
  copyRules: string[]
  lengthGuide: string
  bestPractices: string[]
  commonMistakes: string[]
  examples: { good: string; bad: string }[]
}

export const FORMAT_GUIDES: Record<ContentFormat, FormatGuide> = {
  // === INSTAGRAM ===
  feed_photo: {
    format: 'feed_photo',
    platform: 'instagram',
    structure: ['Hook visual', 'Legenda com story', 'CTA simples'],
    hookTemplates: [
      'Ninguém me avisou que...',
      'Dia 1 no exterior vs. dia 365',
      'A verdade que ninguém conta sobre...',
      'Eu pensei que seria fácil. Não foi.',
    ],
    ctaTemplates: [
      'Comenta se você já passou por isso',
      'Salva para depois',
      'Marca alguém que precisa ver',
    ],
    visualGuidelines: 'Imagem 1080x1350 (4:5). Pessoas reais > stock. Cores quentes.',
    copyRules: [
      'Primeira linha = hook emocional',
      'Máximo 125 chars antes do "...mais"',
      'Use quebras de linha a cada 1-2 frases',
      'Um emoji a cada parágrafo',
    ],
    lengthGuide: 'Legenda: 100-300 palavras. Hook: 5-8 palavras.',
    bestPractices: [
      'Postar em horários de almoço (12h) ou noite (18-20h)',
      'Usar 3-5 hashtags em português',
      'Responder comentários nos primeiros 30 min',
      'Tag location da cidade',
    ],
    commonMistakes: [
      'Legenda muito longa sem quebras',
      'Hashtags genéricas (#love #life)',
      'Imagem genérica de stock',
      'Sem CTA',
    ],
    examples: [
      {
        good: 'Ninguém me avisou que abrir conta no banco no UK levaria 3 semanas. 🏦\n\nCheguei com todo o papel em dia. Passei vergonha. Aprendi na marra.\n\nSalva essa dica pra não passar pelo mesmo.',
        bad: 'Hoje vamos falar sobre como abrir uma conta bancária no Reino Unido. É um processo importante que requer diversos documentos.',
      },
    ],
  },

  carousel: {
    format: 'carousel',
    platform: 'instagram',
    structure: [
      'Slide 1: Hook visual + título',
      'Slide 2: Contexto/problema',
      'Slide 3-5: Dicas/conteúdo (1 por slide)',
      'Slide 6: Exemplo real',
      'Slide 7: CTA',
    ],
    hookTemplates: [
      '5 coisas que eu desejaria saber antes de...',
      'O guia que ninguém me deu',
      'Salva isso antes que apaguem',
      'Thread de ouro sobre...',
    ],
    ctaTemplates: [
      'Qual dessas você não sabia? Comenta!',
      'Salva e compartilha no story',
      'Segue pra mais dicas assim',
    ],
    visualGuidelines:
      'Slides 1080x1080. Tipografia bold. Cores consistentes. Máximo 20 palavras por slide.',
    copyRules: [
      'Slide 1: Título em 6 palavras ou menos',
      'Cada slide = uma ideia só',
      'Números grandes e visíveis',
      'Último slide sempre com CTA',
    ],
    lengthGuide: '7-10 slides. Máx 15 palavras por slide. Legenda: 50-100 palavras.',
    bestPractices: [
      'Primeiro slide com contraste alto',
      'Usar setas ou números para guiar leitura',
      'Manter mesma fonte em todos os slides',
      'Testar salvar o próprio post',
    ],
    commonMistakes: [
      'Texto muito pequeno nos slides',
      'Mais de uma ideia por slide',
      'Cores que não contrastam',
      'Sem CTA no final',
    ],
    examples: [
      {
        good: '[Slide 1] 5 ERROS no primeiro mês no UK\n[Slide 2] ❌ Não abrir conta bancária no dia 1\n[Slide 3] ❌ Comprar tudo na Amazon\n[Slide 4] ❌ Ignorar o NHS\n[Slide 5] ❌ Não fazer networking\n[Slide 6] ❌ Trazer pouco dinheiro vivo\n[Slide 7] Qual desses você cometeu? Comenta 👇',
        bad: 'Bem-vindos ao meu carrossel sobre como se mudar para o Reino Unido. Vou cobrir diversos tópicos importantes.',
      },
    ],
  },

  reels: {
    format: 'reels',
    platform: 'instagram',
    structure: [
      '0-3s: Hook visual + texto na tela',
      '3-15s: Problema ou setup',
      '15-45s: Conteúdo principal',
      '45-60s: Payoff + CTA',
    ],
    hookTemplates: [
      'POV: Você chegou no UK ontem',
      '3 coisas que ninguém te conta sobre...',
      'Eu fiz X e aconteceu Y',
      'Stop doing this if you live in the UK',
    ],
    ctaTemplates: [
      'Segue pra parte 2',
      'Comenta se quer o template',
      'Salva essa dica',
      'Qual o próximo tema?',
    ],
    visualGuidelines:
      '1080x1920. Texto grande na tela (mín 40pt). Transições rápidas. Sound-on ou legenda.',
    copyRules: [
      'Primeiros 3 segundos decidem tudo',
      'Fale como se estivesse contando para um amigo',
      'Use cortes a cada 2-3 segundos',
      'Sempre tenha legenda burned-in',
    ],
    lengthGuide: '15-60s ideal. Máx 90s. 150-200 palavras de roteiro.',
    bestPractices: [
      'Gravar em locais com boa luz',
      'Usar trends de áudio quando relevante',
      'Primeiro frame = frame mais chamativo',
      'Postar 4-7 reels por semana',
    ],
    commonMistakes: [
      'Início lento sem hook',
      'Texto pequeno demais na tela',
      'Sem legenda',
      'Mais de 90 segundos',
    ],
    examples: [
      {
        good: '[0-3s] TEXTO: "£847 em 1 mês" + cara de choque\n[3-10s] "Cheguei no UK achando que estava preparado. Não estava."\n[10-30s] Lista rápida de gastos inesperados com cortes\n[30-45s] "Mas aprendi 3 hacks que economizaram £200/mês"\n[45-60s] Mostra os hacks + CTA: "Qual você quer primeiro?"',
        bad: 'Olá pessoal, hoje vou falar sobre o custo de vida no Reino Unido. É um tema muito importante para quem está pensando em se mudar...',
      },
    ],
  },

  story: {
    format: 'story',
    platform: 'instagram',
    structure: [
      'Hook visual',
      '1-3 frames de conteúdo',
      'Interação (enquete/caixa)',
      'CTA swipe up/link',
    ],
    hookTemplates: ['URGENTE: ...', 'Plot twist: ...', 'Você sabia que...', 'Adivinha quanto...'],
    ctaTemplates: [
      'Responde no quiz acima',
      'Manda pergunta no caixa',
      'Desliza pro link',
      'Reage com emoji',
    ],
    visualGuidelines: '1080x1920. Texto no centro (evitar cantos). Fundo sólido ou foto.',
    copyRules: [
      'Máximo 2 linhas de texto por frame',
      'Use enquetes e caixas de pergunta',
      'Mantenha conversacional',
      'Emoji a cada frame',
    ],
    lengthGuide: '3-7 frames por story. Máx 15 palavras por frame.',
    bestPractices: [
      'Postar 3-7 stories por dia',
      'Usar stickers de interação',
      'Destacar stories importantes',
      'Criar sequências que contam história',
    ],
    commonMistakes: [
      'Texto muito longo',
      'Sem interação',
      'Frames muito parecidos',
      'Postar tudo de uma vez',
    ],
    examples: [
      {
        good: '[Frame 1] "Adivinha quanto paguei de conta de luz?" + enquete £50/£150\n[Frame 2] "£147 😭" + cara de choque\n[Frame 3] "3 hacks que uso agora" + swipe\n[Frame 4] Dica 1\n[Frame 5] Dica 2\n[Frame 6] Dica 3 + "Salva essa"',
        bad: 'Hoje vou falar sobre contas de luz no Reino Unido. Elas são bem caras e é importante economizar.',
      },
    ],
  },

  story_highlight: {
    format: 'story_highlight',
    platform: 'instagram',
    structure: ['Capa icônica', '5-15 stories organizados por tema', 'Índice no primeiro frame'],
    hookTemplates: ['GUIA COMPLETO', 'ANTES E DEPOIS', 'PERGUNTAS FREQUENTES', 'PASSO A PASSO'],
    ctaTemplates: ['Salva esse destaque', 'Volta aqui quando precisar'],
    visualGuidelines:
      'Capa 1080x1920 com ícone e texto central. Estilo consistente entre destaques.',
    copyRules: [
      'Organizar por tema claro',
      'Primeiro frame = índice',
      'Último frame = CTA para seguir',
      'Manter atualizado mensalmente',
    ],
    lengthGuide: '5-15 stories por destaque.',
    bestPractices: [
      'Criar capas personalizadas',
      'Nomear de forma clara',
      'Atualizar conteúdo antigo',
      'Linkar destaques nos posts',
    ],
    commonMistakes: [
      'Destaques sem organização',
      'Conteúdo desatualizado',
      'Sem capa personalizada',
      'Temas muito genéricos',
    ],
    examples: [
      {
        good: '[Destaque: UK 101]\n[Capa] Ícone de maleta + "UK 101"\n[Story 1] Índice: 1. Banco 2. NHS 3. Aluguel 4. Impostos\n[Story 2-5] Cada tópico com dica rápida\n[Story 6] CTA: Segue pra mais',
        bad: 'Destaque chamado "Vida" com fotos aleatórias sem organização.',
      },
    ],
  },

  live: {
    format: 'live',
    platform: 'instagram',
    structure: [
      'Introdução (2min)',
      'Conteúdo principal (15-30min)',
      'Q&A (10-15min)',
      'CTA final (2min)',
    ],
    hookTemplates: [
      'Hoje vou responder TUDO sobre...',
      'Live especial com @convidado',
      'Desafio: responder 50 perguntas em 30 min',
    ],
    ctaTemplates: [
      'Salva essa live no story',
      'Link na bio pra aprofundar',
      'Próxima live: dia X às Y',
    ],
    visualGuidelines: 'Boa iluminação. Fundo limpo. Telefone na horizontal.',
    copyRules: [
      'Começar no horário marcado',
      'Repetir perguntas antes de responder',
      'Chamar seguidores pelo nome',
      'Ter roteiro mas ser flexível',
    ],
    lengthGuide: '20-45 minutos. Mínimo 15 min para algoritmo.',
    bestPractices: [
      'Anunciar com 24h de antecedência',
      'Usar contagem regressiva nos stories',
      'Salvar no IGTV/destaques depois',
      'Ter moderação nos comentários',
    ],
    commonMistakes: ['Começar atrasado', 'Sem roteiro', 'Ignorar comentários', 'Acabar sem CTA'],
    examples: [
      {
        good: '"Hoje vou responder TUDO sobre visto de trabalho no UK. Já mandou sua pergunta?" → Q&A ao vivo → "Salva essa live, vai ajudar alguém" → Link do guia na bio.',
        bad: 'Começa sem aviso, fala sozinho por 10 min sem interação, acaba sem aviso.',
      },
    ],
  },

  ugc: {
    format: 'ugc',
    platform: 'instagram',
    structure: [
      'Crédito ao criador',
      'Contexto do conteúdo',
      'Reação/comentário',
      'CTA para criar também',
    ],
    hookTemplates: [
      '@usuario contou algo incrível',
      'Essa história de @usuario me emocionou',
      '@usuario resumiu perfeitamente',
    ],
    ctaTemplates: [
      'Marca a gente pra aparecer aqui',
      'Manda sua história no DM',
      'Qual história te identificou?',
    ],
    visualGuidelines: "Manter estética do criador original. Adicionar apenas marca d'água leve.",
    copyRules: [
      'Sempre pedir permissão antes',
      'Dar crédito claro e visível',
      'Adicionar comentário de valor',
      'Não editar mensagem do criador',
    ],
    lengthGuide: 'Legenda: 50-150 palavras. Crédito no início.',
    bestPractices: [
      'Criar hashtag própria para UGC',
      'Destacar 1 UGC por semana',
      'Responder DM do criador',
      'Pedir autorização por escrito',
    ],
    commonMistakes: [
      'Repostar sem permissão',
      'Cortar crédito do criador',
      'Editar o conteúdo sem avisar',
      'Não responder o criador',
    ],
    examples: [
      {
        good: '"@maria.uk contou no story dela sobre o primeiro dia no NHS e eu precisei compartilhar. 🏥💚\n\nMaria, obrigado por ser tão transparente. A comunidade precisa de mais vozes assim.\n\nManda sua história com #MinhaHistoriaMuuday"',
        bad: 'Repost de story sem permissão, sem crédito, sem comentário.',
      },
    ],
  },

  meme: {
    format: 'meme',
    platform: 'instagram',
    structure: ['Setup visual', 'Punchline', 'Contexto opcional'],
    hookTemplates: [
      'Só brasileiro no exterior entende',
      'Eu tentando explicar para o britânico',
      'Ninguém:\nEu no primeiro mercado do UK:',
    ],
    ctaTemplates: [
      'Marca alguém que vive isso',
      'Comenta se você já passou',
      'Manda no grupo dos brasileiros',
    ],
    visualGuidelines: 'Formato meme clássico ou template atual. Texto legível. Compartilhável.',
    copyRules: [
      'Referência cultural brasileira clara',
      'Setup curto, punchline rápida',
      'Nada ofensivo ou estereotipado',
      'Deve ser compartilhável no WhatsApp',
    ],
    lengthGuide: 'Máximo 20 palavras no meme. Legenda: 1-2 linhas.',
    bestPractices: [
      'Usar templates atuais',
      'Focar em situações universais',
      'Testar com amigos antes',
      'Evitar política ou religião',
    ],
    commonMistakes: [
      'Meme muito complexo',
      'Texto pequeno demais',
      'Humor que não traduz',
      'Ofensivo ou insensível',
    ],
    examples: [
      {
        good: '[Imagem: Drake rejeitando/apontando]\nDrake rejeita: "Ir ao pub depois do trabalho"\nDrake aponta: "Fazer feijoada no sábado com os brasileiros"\n\nLegenda: "Prioridades ✨"',
        bad: 'Meme genérico sobre imigração sem contexto brasileiro específico.',
      },
    ],
  },

  // === TIKTOK ===
  short_video: {
    format: 'short_video',
    platform: 'tiktok',
    structure: [
      '0-1s: Hook visual/texto',
      '1-3s: Problema/promise',
      '3-20s: Conteúdo principal',
      '20-30s: Payoff',
      '30-60s: CTA',
    ],
    hookTemplates: [
      'POV: seu primeiro dia no UK',
      '3 hacks que economizam £200/mês',
      'Eu fiz isso e todo mundo ficou chocado',
      'Conteúdo que você não pediu mas precisa',
    ],
    ctaTemplates: [
      'Parte 2? Comenta!',
      'Segue pra mais dicas',
      'Salva esse vídeo',
      'Qual o próximo tema?',
    ],
    visualGuidelines:
      '1080x1920. Texto burned-in grande. Cortes rápidos. Áudio trending quando possível.',
    copyRules: [
      'Primeiro segundo = decisivo',
      'Falar rápido mas claro',
      'Texto na tela = essencial',
      'Roteiro = 150-200 palavras para 60s',
    ],
    lengthGuide: '15-60s ideal. Roteiro: 2-3 palavras por segundo.',
    bestPractices: [
      'Postar 1-3x por dia',
      'Responder comentários nos primeiros 60 min',
      'Usar hashtags de nicho (#brasileirosnouk)',
      'Criar séries com numeração',
    ],
    commonMistakes: [
      'Início lento',
      'Sem texto na tela',
      'Roteiro muito longo',
      'Não responder comentários',
    ],
    examples: [
      {
        good: '[0-1s] TEXTO: "£200 ECONOMIZADOS"\n[1-3s] "3 hacks que uso todo mês no UK"\n[3-15s] Hack 1, 2, 3 rápidos com cortes\n[15-20s] "E você, qual usa?" + aponta comentários\n[20-30s] "Segue pra parte 2"',
        bad: 'Vídeo de 2 minutos explicando burocracia sem cortes ou texto na tela.',
      },
    ],
  },

  duet: {
    format: 'duet',
    platform: 'tiktok',
    structure: [
      'Reação ao vídeo original',
      'Comentário de valor',
      'Adicionar perspectiva nova',
      'CTA',
    ],
    hookTemplates: [
      'Esse vídeo tem uma coisa que ninguém notou',
      'Deixa eu adicionar uma coisa',
      'Como brasileiro no exterior, eu vejo diferente',
    ],
    ctaTemplates: ['Concorda? Comenta', 'Versão completa no perfil', 'Qual sua opinião?'],
    visualGuidelines: 'Metade da tela = vídeo original. Metade = sua reação. Boa iluminação.',
    copyRules: [
      'Sempre agregar valor, não só reagir',
      'Ser respeitoso com o criador original',
      'Adicionar perspectiva brasileira/exterior',
      'Manter curto (15-30s)',
    ],
    lengthGuide: '15-45s. Roteiro: 50-100 palavras.',
    bestPractices: [
      'Escolher vídeos com boa base de views',
      'Reagir a trends atuais',
      'Usar hashtags do criador original',
      'Mencionar o criador na legenda',
    ],
    commonMistakes: [
      'Reagir sem adicionar valor',
      'Ser negativo ou tóxico',
      'Vídeo muito longo',
      'Não creditar o criador',
    ],
    examples: [
      {
        good: '"Esse vídeo sobre aluguel em Londres tá certo, mas tem um detalhe que ninguém fala..." → explica o detalhe → "Segue pra mais hacks de moradia"',
        bad: 'Duet só fazendo cara de surpresa sem dizer nada.',
      },
    ],
  },

  stitch: {
    format: 'stitch',
    platform: 'tiktok',
    structure: ['Primeiros 5s do vídeo original', 'Sua continuação/resposta', 'Payoff', 'CTA'],
    hookTemplates: [
      'A minha versão dessa história...',
      'Isso me lembra quando...',
      'Update: aconteceu algo pior',
    ],
    ctaTemplates: ['Quer a história completa?', 'Já teve algo assim?', 'Segue pra parte 2'],
    visualGuidelines: 'Primeiros 5s = vídeo original. Depois = seu conteúdo. Transição clara.',
    copyRules: [
      'Começar com o clipe original',
      'Fazer transição natural',
      'Contar uma história conectada',
      'Manter o mesmo tom',
    ],
    lengthGuide: '15-60s total.',
    bestPractices: [
      'Escolher clipes que geram curiosidade',
      'História deve ser conectada mas diferente',
      'Usar mesma energia do original',
      'Responder comentários rapidamente',
    ],
    commonMistakes: [
      'História desconectada do original',
      'Transição confusa',
      'Não creditar o criador',
      'Vídeo muito longo',
    ],
    examples: [
      {
        good: '[Stitch com vídeo "Cheguei no UK"] → "Isso me lembra quando eu cheguei. Só que eu trouxe 3 malas e o guarda do aeroporto achou que eu tava fugindo do país." → conta a história → CTA',
        bad: 'Stitch com vídeo sobre comida e resposta sobre visto — completamente desconectado.',
      },
    ],
  },

  photo_carousel: {
    format: 'photo_carousel',
    platform: 'tiktok',
    structure: ['Imagem 1: Hook', 'Imagens 2-4: Conteúdo', 'Última: CTA'],
    hookTemplates: [
      'Fotos que não postei no Instagram',
      'Meu primeiro mês no UK em fotos',
      'Antes e depois de 1 ano no exterior',
    ],
    ctaTemplates: ['Qual foto foi sua favorita?', 'Ano que vem tem mais', 'Segue pra acompanhar'],
    visualGuidelines:
      '1080x1920. Fotos reais, não stock. Texto opcional em cada foto. Música trending.',
    copyRules: [
      'Primeira foto = mais chamativa',
      'Contar história visual',
      'Máximo 5-8 fotos',
      'Legenda curta e direta',
    ],
    lengthGuide: '2-8 fotos. Legenda: 50-100 palavras.',
    bestPractices: [
      'Usar fotos de boa qualidade',
      'Escolher música que combina',
      'Primeira foto com contraste alto',
      'Criar sequência com narrativa',
    ],
    commonMistakes: [
      'Fotos de baixa qualidade',
      'Muitas fotos sem narrativa',
      'Música não relacionada',
      'Sem CTA',
    ],
    examples: [
      {
        good: '[Foto 1] Mala aberta no aeroporto\n[Foto 2] Primeiro apartamento vazio\n[Foto 3] Primeira compra no mercado\n[Foto 4] Primeiro encontro com brasileiros\n[Foto 5] Vista da janela hoje\n\nLegenda: "1 ano. 5 fotos. Mil histórias."',
        bad: 'Carrossel de 20 fotos aleatórias sem história, com música genérica.',
      },
    ],
  },

  tiktok_live: {
    format: 'tiktok_live',
    platform: 'tiktok',
    structure: ['Intro (2min)', 'Conteúdo/Q&A (20-40min)', 'CTA (2min)'],
    hookTemplates: [
      'Live Q&A: mande sua pergunta',
      'Hoje vou contar tudo sobre...',
      'Live com @convidado especial',
    ],
    ctaTemplates: [
      'Segue pra não perder a próxima',
      'Link na bio pra aprofundar',
      'Salva essa live',
    ],
    visualGuidelines: 'Boa iluminação. Fundo interessante. Telefone na vertical.',
    copyRules: [
      'Anunciar com antecedência',
      'Ter tema claro',
      'Interagir com gifts e comentários',
      'Ter moderador',
    ],
    lengthGuide: '30-60 minutos.',
    bestPractices: [
      'Fazer lives em horários fixos',
      'Criar série de lives semanais',
      'Colaborar com outros creators',
      'Salvar highlights depois',
    ],
    commonMistakes: [
      'Sem tema definido',
      'Ignorar comentários',
      'Acabar sem aviso',
      'Sem iluminação',
    ],
    examples: [
      {
        good: '"Live toda terça 20h: perguntas sobre vida no UK. Manda sua dúvida!" → Q&A organizado → "Próxima terça: impostos" → Segue.',
        bad: 'Live sem aviso, sem tema, respondendo apenas 2 pessoas.',
      },
    ],
  },

  tiktok_ugc: {
    format: 'tiktok_ugc',
    platform: 'tiktok',
    structure: ['Crédito', 'Repost com comentário', 'CTA para participar'],
    hookTemplates: [
      '@usuario disse tudo',
      'Esse vídeo de @usuario é ouro',
      'A comunidade mandou bem demais',
    ],
    ctaTemplates: [
      'Usa #MinhaHistoriaMuuday pra aparecer',
      'Manda seu vídeo no DM',
      'Qual o próximo tema?',
    ],
    visualGuidelines: 'Manter formato original. Adicionar reação ou comentário em tela.',
    copyRules: [
      'Sempre pedir permissão',
      'Dar crédito completo',
      'Adicionar valor na reação',
      'Manter o espírito do original',
    ],
    lengthGuide: 'Mesmo do vídeo original. Legenda: 30-80 palavras.',
    bestPractices: [
      'Criar desafios para comunidade',
      'Repostar o melhor conteúdo',
      'Dar crédito visível',
      'Criar trend própria',
    ],
    commonMistakes: [
      'Repost sem permissão',
      'Cortar crédito',
      'Não adicionar valor',
      'Repostar conteúdo antigo',
    ],
    examples: [
      {
        good: '"@pedro.uk resumiu em 30s o que eu levei 3 meses pra aprender. Isso é ouro puro. 🏆\n\nManda seu vídeo com #MinhaHistoriaMuuday"',
        bad: 'Repost de vídeo sem permissão, sem crédito, sem comentário.',
      },
    ],
  },

  // === YOUTUBE ===
  long_video: {
    format: 'long_video',
    platform: 'youtube',
    structure: [
      'Hook (0-30s)',
      'Intro/ canal (30-60s)',
      'Conteúdo principal (5-15min)',
      'Exemplos/caso real (3-5min)',
      'CTA (30-60s)',
    ],
    hookTemplates: [
      'Se você está pensando em se mudar pro UK, essa informação pode te economizar £5000',
      'Eu cometi 7 erros no meu primeiro ano. Esse é o 1º.',
      'Ninguém fala sobre isso. Mas deveria.',
    ],
    ctaTemplates: [
      'Se inscreve e ativa o sininho',
      'Comenta se quer parte 2',
      'Link na descrição pra aprofundar',
    ],
    visualGuidelines:
      '1920x1080 ou 4K. Thumbnail chamativa. Capítulos no vídeo. Cards e end screens.',
    copyRules: [
      'Hook nos primeiros 30 segundos',
      'Promise + delivery clara',
      'Storytelling com dados concretos',
      'Criar cliffhangers naturais',
    ],
    lengthGuide: '8-15 minutos ideal. Mínimo 8 min para mid-rolls.',
    bestPractices: [
      'Upload em horários fixos (ex: quintas 14h)',
      'Thumbnail com face expressiva + texto grande',
      'Título com número ou questão',
      'SEO: keyword nos primeiros 100 chars da descrição',
    ],
    commonMistakes: [
      'Intro muito longa',
      'Thumbnail genérica',
      'Título clickbait sem delivery',
      'Sem capítulos',
    ],
    examples: [
      {
        good: 'Thumbnail: cara de choque + texto "£5000 ECONOMIZADOS"\nTítulo: "7 Erros Que Custaram £5000 no Meu 1º Ano no UK"\nHook: "Erro número 1: eu trouxe DÓLAR. No UK."\n→ Storytelling com cada erro → CTA no final',
        bad: 'Vídeo de 40 minutos sem edição, thumbnail com screenshot aleatório, título "Vlog no UK".',
      },
    ],
  },

  youtube_shorts: {
    format: 'youtube_shorts',
    platform: 'youtube',
    structure: ['Hook (0-3s)', 'Conteúdo (10-50s)', 'CTA (2-5s)'],
    hookTemplates: [
      'Esse hack economizou £200/mês',
      'POV: seu primeiro mercado no UK',
      'Ninguém me avisou sobre isso',
    ],
    ctaTemplates: ['Vídeo completo no canal', 'Inscreve pra mais dicas', 'Comenta se quer parte 2'],
    visualGuidelines: '1080x1920. Texto grande na tela. Edição rápida. Legenda burned-in.',
    copyRules: [
      'Mesmas regras do Reels/TikTok',
      'Loop perfeito quando possível',
      'Título = hook na tela',
      'CTA curto no final',
    ],
    lengthGuide: '30-60s. Roteiro: 100-150 palavras.',
    bestPractices: [
      'Postar 1-2 shorts por dia',
      'Usar como funnel para vídeos longos',
      'Título curto e direto',
      '#Shorts na descrição',
    ],
    commonMistakes: [
      'Short muito longo (>60s)',
      'Sem texto na tela',
      'Sem hook nos primeiros 3s',
      'Não linkar para conteúdo longo',
    ],
    examples: [
      {
        good: '[0-3s] TEXTO: "£200/mês economizados" + cara de choque\n[3-30s] 3 hacks rápidos com cortes\n[30-60s] "Vídeo completo no canal" + seta para inscrever',
        bad: 'Short de 3 minutos explicando burocracia sem edição.',
      },
    ],
  },

  community_post: {
    format: 'community_post',
    platform: 'youtube',
    structure: ['Pergunta ou enquete', 'Contexto breve', 'CTA para comentar'],
    hookTemplates: [
      'Próximo vídeo: você escolhe o tema',
      'Enquete: qual é a maior dificuldade?',
      'SPOILER do vídeo de amanhã',
    ],
    ctaTemplates: ['Comenta aqui embaixo', 'Vota na enquete', 'Manda no story do Instagram'],
    visualGuidelines: 'Imagem 1:1. Texto legível. Cores da marca.',
    copyRules: [
      'Manter curto (1-2 parágrafos)',
      'Pergunta direta',
      'Usar enquetes quando possível',
      'Responder comentários',
    ],
    lengthGuide: '100-300 caracteres.',
    bestPractices: [
      'Postar entre uploads de vídeo',
      'Usar para pesquisa de conteúdo',
      'Agradecer participação',
      'Criar antecipação',
    ],
    commonMistakes: ['Postar e sumir', 'Sem interação', 'Pergunta muito aberta', 'Muito texto'],
    examples: [
      {
        good: '"Qual próximo tema? 🗳️\n\n1. Como encontrar emprego no UK\n2. Entendendo o NHS\n3. Aluguel: guia completo\n\nVota e comenta qual você precisa AGORA."',
        bad: 'Post genérico "Oi pessoal, tudo bem?" sem pergunta ou CTA.',
      },
    ],
  },

  podcast_video: {
    format: 'podcast_video',
    platform: 'youtube',
    structure: [
      'Intro musical (15-30s)',
      'Apresentação do episódio (1-2min)',
      'Conversa principal (20-50min)',
      'Takeaways (2-3min)',
      'CTA + outro (1-2min)',
    ],
    hookTemplates: [
      'No episódio de hoje, @convidado conta como foi deixar tudo para trás',
      'A história que você vai ouvir hoje mudou minha perspectiva',
      'Tema polêmico: vamos falar sobre...',
    ],
    ctaTemplates: [
      'Se inscreve no canal e no podcast',
      'Comenta sua opinião',
      'Indica para um amigo',
    ],
    visualGuidelines: '1920x1080. Dois ângulos de câmera. Lower thirds. Capítulos na descrição.',
    copyRules: [
      'Conversação natural, não entrevista rígida',
      'Perguntas abertas',
      'Deixar silêncios acontecerem',
      'Storytelling antes de dados',
    ],
    lengthGuide: '30-60 minutos.',
    bestPractices: [
      'Ter convidado com história real',
      'Criar lista de perguntas mas ser flexível',
      'Editar para remover dead air',
      'Criar clipes para Shorts/Reels',
    ],
    commonMistakes: ['Perguntas fechadas', 'Interromper o convidado', 'Som ruim', 'Sem edição'],
    examples: [
      {
        good: '"Hoje eu converso com Maria, que deixou São Paulo em 2020 com £200 no bolso e hoje é diretora em Londres. Essa história é INCRÍVEL." → conversa fluida → takeaways no final.',
        bad: 'Podcast de 2 horas sem edição, som ruim, perguntas genéricas.',
      },
    ],
  },

  // === LINKEDIN ===
  text_post: {
    format: 'text_post',
    platform: 'linkedin',
    structure: [
      'Hook (1-2 linhas)',
      'Story/contexto (3-5 parágrafos)',
      'Insight/takeaway (1-2 parágrafos)',
      'CTA (1 linha)',
    ],
    hookTemplates: [
      'Acabei de receber uma mensagem que me fez repensar tudo.',
      '3 anos atrás eu estava quebrado no UK. Hoje eu quero contar o que aprendi.',
      'A maioria das pessoas comete esse erro nos primeiros 6 meses.',
    ],
    ctaTemplates: [
      'Qual foi sua experiência? Comenta abaixo.',
      'Se isso te ajudou, compartilha com alguém que precisa.',
      'Conecta comigo pra mais conteúdo assim.',
    ],
    visualGuidelines: 'Sem visual. Formatação com quebras de linha e bullets.',
    copyRules: [
      'Primeiras 2 linhas = hook (antes do "...ver mais")',
      'Parágrafos curtos (1-2 frases)',
      'Story pessoal + insight',
      'Sem jargão corporativo',
    ],
    lengthGuide: '150-300 palavras ideal. Máx 500.',
    bestPractices: [
      'Postar 8-10h da manhã (horário de trabalho UK)',
      'Responder TODOS os comentários nos primeiros 2h',
      'Usar 3-5 hashtags específicas',
      'Tag pessoas mencionadas',
    ],
    commonMistakes: [
      'Post genérico sem story',
      'Parágrafos muito longos',
      'Jargão corporativo',
      'Não responder comentários',
    ],
    examples: [
      {
        good: '"O recrutador riu do meu CV brasileiro.\n\nNão foi malícia. Meu CV tinha foto, data de nascimento, e estado civil.\n\nNo UK, isso é ilegal.\n\nEm 6 meses eu aprendi o que ninguém me ensinou.\n\nAqui estão 5 mudanças que triplicaram minhas entrevistas:"\n\n→ 5 bullets curtos\n\n"Qual dessas você não sabia?"',
        bad: 'Post sobre "5 dicas de carreira no exterior" sem story pessoal, com jargão e parágrafos longos.',
      },
    ],
  },

  single_image: {
    format: 'single_image',
    platform: 'linkedin',
    structure: ['Imagem com insight visual', 'Legenda curta com contexto', 'CTA'],
    hookTemplates: [
      'Um gráfico vale mais que mil palavras.',
      'Converti minha jornada em uma imagem.',
      'Isso mudou como eu vejo...',
    ],
    ctaTemplates: [
      'O que você acha? Comenta.',
      'Salva para referência futura.',
      'Compartilha com seu time.',
    ],
    visualGuidelines: '1200x627. Tipografia clara. Dados visuais. Cores profissionais.',
    copyRules: [
      'Imagem deve ser compreensível sozinha',
      'Legenda complementa, não repete',
      'Usar dados reais',
      'Manter profissional mas humano',
    ],
    lengthGuide: 'Legenda: 100-200 palavras.',
    bestPractices: [
      'Criar infográficos com dados próprios',
      'Usar quotes de membros da comunidade',
      'Manter identidade visual consistente',
      'Otimizar para mobile (texto grande)',
    ],
    commonMistakes: [
      'Texto pequeno na imagem',
      'Imagem genérica de stock',
      'Legenda redundante',
      'Sem CTA',
    ],
    examples: [
      {
        good: '[Imagem: timeline visual da jornada de imigração com milestones e números]\n\n"5 anos. 3 países. 1 aprendizado: a jornada não é linear.\n\nO que você adicionaria nessa timeline?"',
        bad: 'Imagem de stock de pessoas em reunião com legenda genérica sobre networking.',
      },
    ],
  },

  document_carousel: {
    format: 'document_carousel',
    platform: 'linkedin',
    structure: ['Slide 1: Título + hook', 'Slides 2-5: Conteúdo', 'Último slide: CTA + perfil'],
    hookTemplates: [
      'Salve esse guia. Vai te poupar meses de dor de cabeça.',
      'Transformei 3 anos de experiência em 5 slides.',
      'O guia que eu desejaria ter recebido.',
    ],
    ctaTemplates: [
      'Salva para depois.',
      'Compartilha com alguém que precisa.',
      'Me segue pra mais guias assim.',
    ],
    visualGuidelines: 'PDF 1080x1080. Cada slide = uma ideia. Tipografia grande. Design limpo.',
    copyRules: [
      'Máximo 20 palavras por slide',
      'Usar bullets e números',
      'Primeiro slide = hook visual',
      'Último slide = CTA claro',
    ],
    lengthGuide: '5-10 slides. Legenda: 100-200 palavras.',
    bestPractices: [
      'Criar séries numeradas',
      'Salvar como PDF de alta qualidade',
      'Primeiro slide com contraste alto',
      'Responder comentários com link para recursos',
    ],
    commonMistakes: [
      'Texto pequeno nos slides',
      'Mais de uma ideia por slide',
      'Sem CTA no final',
      'Design amador',
    ],
    examples: [
      {
        good: '[Slide 1] "5 erros no CV britânico"\n[Slide 2] "Erro 1: Foto no CV"\n[Slide 3] "Erro 2: Data de nascimento"\n[Slide 4] "Erro 3: Objetivo genérico"\n[Slide 5] "Erro 4: 3 páginas"\n[Slide 6] "Erro 5: Sem LinkedIn"\n[Slide 7] "Template grátis → link na bio"',
        bad: 'PDF de 20 páginas com texto corrido, sem formatação.',
      },
    ],
  },

  video_post: {
    format: 'video_post',
    platform: 'linkedin',
    structure: ['Hook nos primeiros 3s', 'Conteúdo (30s-3min)', 'CTA'],
    hookTemplates: [
      'Deixe-me contar o que ninguém te conta sobre...',
      '3 minutos que podem mudar sua carreira no exterior.',
      'A pergunta que mais recebo: aqui está a resposta.',
    ],
    ctaTemplates: [
      'Qual sua experiência? Comenta.',
      'Compartilha com quem precisa.',
      'Conecta comigo pra mais.',
    ],
    visualGuidelines: '1080x1080 ou 1920x1080. Legendas automáticas. Boa iluminação.',
    copyRules: [
      'Hook nos primeiros 3 segundos',
      'Falar devagar e claro',
      'Legendas essenciais (80% assiste sem som)',
      'CTA específico no final',
    ],
    lengthGuide: '30s-3min. Ideal: 60-90s.',
    bestPractices: [
      'Subir vídeo nativo (não link do YouTube)',
      'Primeiro frame = thumbnail',
      'Texto na tela para pontos-chave',
      'Responder comentários com timestamp',
    ],
    commonMistakes: [
      'Link do YouTube (LinkedIn suprime)',
      'Sem legendas',
      'Vídeo muito longo',
      'Início lento',
    ],
    examples: [
      {
        good: '[0-3s] "O erro que custou minha primeira entrevista no UK"\n[3-60s] Story + dica + takeaway\n[60-90s] CTA: "Compartilha com quem está aplicando"',
        bad: 'Vídeo de 10 minutos sem edição, legendas automáticas do LinkedIn com erros.',
      },
    ],
  },

  linkedin_newsletter: {
    format: 'linkedin_newsletter',
    platform: 'linkedin',
    structure: [
      'Título chamativo',
      'Intro pessoal',
      'Conteúdo aprofundado (5-10 parágrafos)',
      'Takeaways',
      'CTA',
    ],
    hookTemplates: [
      'A Newsletter Muuday: o que ninguém te conta sobre viver no exterior',
      'Edição #12: 5 lições de 3 anos no UK',
      'Exclusivo: entrevista com @especialista',
    ],
    ctaTemplates: [
      'Se inscreve na newsletter pra receber toda semana.',
      'Comenta qual tema você quer no próximo.',
      'Compartilha com alguém que precisa.',
    ],
    visualGuidelines: 'Imagem de capa 1280x720. Formatação rica (bullets, quotes, dividers).',
    copyRules: [
      'Título claro e específico',
      'Intro pessoal e contextual',
      'Conteúdo profundo e acionável',
      'Takeaways no final',
    ],
    lengthGuide: '800-2000 palavras.',
    bestPractices: [
      'Publicar em dia fixo (ex: terças 8h)',
      'Criar edições numeradas',
      'Incluir recursos para download',
      'Responder comentários no artigo',
    ],
    commonMistakes: ['Título genérico', 'Conteúdo raso', 'Sem formatação', 'Sem CTA'],
    examples: [
      {
        good: '"Edição #15: O Verdadeiro Custo de Vida no UK (Dados Reais)\n\nQuando eu cheguei em Londres em 2021, achei que £1500/mês seriam suficientes.\n\nEstava errado.\n\n[... conteúdo profundo com números reais ...]\n\nTakeaways:\n• Item 1\n• Item 2\n• Item 3\n\nPróxima edição: como negociar salário no UK. Se inscreve pra não perder."',
        bad: 'Newsletter de 300 palavras genéricas sem dados ou story pessoal.',
      },
    ],
  },

  poll: {
    format: 'poll',
    platform: 'linkedin',
    structure: ['Pergunta clara', '2-4 opções', 'Contexto breve', 'CTA para comentar o porquê'],
    hookTemplates: [
      'Pesquisa rápida para a comunidade:',
      'Quero saber de você:',
      'Dados que estamos coletando:',
    ],
    ctaTemplates: [
      'Comenta o porquê da sua escolha.',
      'Vou compartilhar os resultados na sexta.',
      'Marca alguém que precisa votar.',
    ],
    visualGuidelines: 'Sem visual. Formatação clara. Pergunta em negrito.',
    copyRules: [
      'Pergunta específica e direta',
      'Opções balanceadas',
      'Contexto de por que pergunta',
      'Prometer compartilhar resultados',
    ],
    lengthGuide: 'Pergunta: 1-2 frases. Contexto: 1 parágrafo.',
    bestPractices: [
      'Fazer enquetes semanais',
      'Usar resultados para criar conteúdo',
      'Responder quem comenta',
      'Criar série "Resultados da enquete"',
    ],
    commonMistakes: [
      'Pergunta tendenciosa',
      'Opções muito parecidas',
      'Sem contexto',
      'Não compartilhar resultados',
    ],
    examples: [
      {
        good: '"Qual foi sua maior dificuldade nos primeiros 3 meses no UK?\n\n🏦 Burocracia bancária\n🏠 Encontrar aluguel\n💼 Primeiro emprego\n😔 Solidão\n\nComenta o porquê da sua resposta. Vou compartilhar os resultados + dicas na sexta."',
        bad: 'Enquete genérica "Qual sua cor favorita?" sem contexto ou relevância.',
      },
    ],
  },

  article: {
    format: 'article',
    platform: 'linkedin',
    structure: [
      'Título SEO',
      'Intro com hook',
      'Conteúdo profundo (10+ parágrafos)',
      'Conclusão',
      'CTA',
    ],
    hookTemplates: [
      'O guia definitivo sobre...',
      'Tudo que aprendi em X anos sobre...',
      'Por que ninguém fala sobre...',
    ],
    ctaTemplates: [
      'Salva esse artigo para referência.',
      'Compartilha com quem precisa.',
      'Me segue pra mais conteúdo profundo.',
    ],
    visualGuidelines: 'Imagem de capa. Subtítulos (H2, H3). Bullets. Quotes. Dividers.',
    copyRules: [
      'Título com keyword principal',
      'Primeiros 100 chars = hook',
      'Subtítulos claros',
      'Dados e exemplos concretos',
    ],
    lengthGuide: '1500-3000 palavras.',
    bestPractices: [
      'Otimizar para SEO no LinkedIn',
      'Incluir links para recursos',
      'Criar sumário com links',
      'Republicar a cada 6 meses atualizado',
    ],
    commonMistakes: ['Artigo muito curto', 'Sem estrutura', 'Sem dados', 'Título genérico'],
    examples: [
      {
        good: '"Como Encontrar Emprego no UK: Guia Completo 2025\n\n[Imagem de capa profissional]\n\nIntro pessoal + stats do mercado\n\n## 1. O CV Britânico\n[...]\n\n## 2. Onde Procurar\n[...]\n\n## 3. A Entrevista\n[...]\n\n## 4. Negociação de Salário\n[...]\n\nConclusão + CTA + recursos para download"',
        bad: 'Artigo de 300 palavras sem estrutura, sem dados, com jargão corporativo.',
      },
    ],
  },

  // === TWITTER/X ===
  text_tweet: {
    format: 'text_tweet',
    platform: 'twitter',
    structure: ['Hook em 1 linha', 'Insight/conteúdo', 'CTA ou pergunta'],
    hookTemplates: [
      'Ninguém fala sobre isso:',
      'Plot twist:',
      '3 anos no UK me ensinaram que...',
      'Hot take:',
    ],
    ctaTemplates: ['Concorda?', 'O que você acrescentaria?', 'RT se te ajudou.'],
    visualGuidelines: 'Sem visual. Formatação com quebras de linha.',
    copyRules: [
      'Uma ideia por tweet',
      'Linha em branco entre parágrafos',
      'Números ou dados específicos',
      'Opinião clara',
    ],
    lengthGuide: 'Máximo 280 chars. Ideal: 100-200.',
    bestPractices: [
      'Tweetar 1-3x por dia',
      'Responder tweets virais da comunidade',
      'Usar threads para conteúdo longo',
      'Engajar com outros creators',
    ],
    commonMistakes: [
      'Tweet muito longo (vai ser cortado)',
      'Sem opinião própria',
      'Genérico',
      'Sem CTA',
    ],
    examples: [
      {
        good: '"Hot take: seu CV brasileiro está te prejudicando no UK.\n\nFoto? Fora.\nIdade? Ilegal.\n3 páginas? Ninguém lê.\n\nMenos é mais."',
        bad: '"Dicas de carreira para brasileiros no exterior. #career #job"',
      },
    ],
  },

  thread: {
    format: 'thread',
    platform: 'twitter',
    structure: [
      'Tweet 1: Hook + promise',
      'Tweets 2-5: Conteúdo principal',
      'Tweet 6-8: Exemplos/prova',
      'Tweet 9-10: Takeaway + CTA',
    ],
    hookTemplates: [
      '🧵 Sobre viver no UK: o que ninguém te conta\n\n1/10',
      'Thread: como eu economizei £10k no primeiro ano no exterior\n\n1/',
      'Vou contar a história de como passei de [X] para [Y] em 2 anos\n\n1/',
    ],
    ctaTemplates: [
      'RT o primeiro tweet pra ajudar alguém.',
      'Me segue pra mais threads assim.',
      'Qual o próximo tema? Comenta.',
    ],
    visualGuidelines: 'Tweet 1: sem visual ou com imagem impactante. Demais: texto puro.',
    copyRules: [
      'Tweet 1 = hook matador',
      'Cada tweet = uma ideia completa',
      'Números nos tweets (2/10, 3/10)',
      'Último tweet = CTA claro',
    ],
    lengthGuide: '5-15 tweets. Cada tweet: 1-2 frases.',
    bestPractices: [
      'Primeiro tweet deve funcionar sozinho',
      'Postar todos de uma vez (não programar)',
      'Responder comentários no tweet 1',
      'Criar threads semanais fixas',
    ],
    commonMistakes: [
      'Thread muito longa (>20 tweets)',
      'Tweet 1 fraco',
      'Sem numeração',
      'Ideias espalhadas por múltiplos tweets',
    ],
    examples: [
      {
        good: '1/ "Cheguei no UK com £2000. Em 3 meses estava com £200.\n\nAqui estão os 5 erros que quase me mandaram de volta pro Brasil:\n\n🧵"\n\n2/ "Erro 1: Não entendi o sistema de impostos"\n[...]\n\n6/ "Erro 5: Subestimei o custo de vida"\n\n7/ "O que me salvou:\n• Orçamento semanal\n• Conta compartilhada\n• Side hustle\n\n8/ "Hoje economizo £500/mês. Se eu soubesse isso antes..."\n\n9/ "RT se isso te ajudou. Me segue pra mais."',
        bad: 'Thread de 30 tweets sem numeração, com parágrafos longos em cada tweet.',
      },
    ],
  },

  image_tweet: {
    format: 'image_tweet',
    platform: 'twitter',
    structure: ['Imagem com insight', 'Tweet com contexto', 'CTA'],
    hookTemplates: [
      'Converti isso em uma imagem:',
      'Um gráfico que resume tudo:',
      'Se você entender isso, vai economizar £1000s:',
    ],
    ctaTemplates: [
      'Salva essa imagem.',
      'Marca alguém que precisa ver.',
      'Thread completa abaixo 👇',
    ],
    visualGuidelines: '1200x675. Texto legível. Dados visuais. Compartilhável.',
    copyRules: [
      'Imagem deve ser compreensível sozinha',
      'Tweet complementa, não repete',
      'Usar dados ou frameworks',
      'CTA claro',
    ],
    lengthGuide: 'Tweet: 50-150 chars.',
    bestPractices: [
      'Criar infográficos compartilháveis',
      'Usar cores da marca',
      'Texto grande para mobile',
      'Testar como fica no feed',
    ],
    commonMistakes: ['Texto pequeno na imagem', 'Imagem genérica', 'Tweet redundante', 'Sem CTA'],
    examples: [
      {
        good: '[Imagem: comparação custo de vida Brasil vs UK com números reais]\n\n"A realidade do custo de vida em Londres vs. São Paulo.\n\nOs números não mentem.\n\nSalva essa."',
        bad: 'Foto de paisagem com tweet genérico sobre "viver no exterior".',
      },
    ],
  },

  video_tweet: {
    format: 'video_tweet',
    platform: 'twitter',
    structure: ['Vídeo curto', 'Tweet com contexto', 'CTA'],
    hookTemplates: [
      'Explicação rápida em 60 segundos:',
      'Se eu tivesse 1 minuto para te ensinar isso:',
      'Vídeo curto, lição grande:',
    ],
    ctaTemplates: [
      'Quer a versão completa?',
      'Segue pra mais dicas rápidas.',
      'Comenta se quer parte 2.',
    ],
    visualGuidelines: '1200x675 ou 1080x1920. Legendas burned-in. Primeiro frame = thumbnail.',
    copyRules: [
      'Hook nos primeiros 3s',
      'Vídeo curto (15-60s)',
      'Legendas essenciais',
      'CTA no final do vídeo',
    ],
    lengthGuide: '15-60s. Tweet: 50-150 chars.',
    bestPractices: [
      'Vídeo nativo (não link do YouTube)',
      'Primeiro frame impactante',
      'Texto na tela para pontos-chave',
      'Postar em horários de pico',
    ],
    commonMistakes: ['Vídeo muito longo', 'Sem legendas', 'Link do YouTube', 'Início lento'],
    examples: [
      {
        good: '[Vídeo 45s: 3 dicas rápidas de networking no UK com texto na tela]\n\n"3 dicas de networking que ninguém te conta.\n\nQual você vai usar primeiro?"',
        bad: 'Link do YouTube com tweet genérico.',
      },
    ],
  },

  spaces: {
    format: 'spaces',
    platform: 'twitter',
    structure: ['Intro (2min)', 'Conversa (30-60min)', 'Takeaways (5min)', 'CTA'],
    hookTemplates: [
      'Hoje às 20h: vamos falar sobre...',
      'Spaces especial com @convidado',
      'Pergunte o que quiser sobre...',
    ],
    ctaTemplates: [
      'Salva esse tweet pra não esquecer.',
      'Manda sua pergunta nos comentários.',
      'Segue pra saber dos próximos.',
    ],
    visualGuidelines: 'Sem visual. Anúncio com data e hora. Host + co-hosts.',
    copyRules: [
      'Anunciar com 24h de antecedência',
      'Tema claro e específico',
      'Ter co-hosts especialistas',
      'Criar agenda informal',
    ],
    lengthGuide: '30-90 minutos.',
    bestPractices: [
      'Fixar tweet com tema no perfil',
      'Criar threads com takeaways depois',
      'Gravar para postar depois',
      'Convidar audiência para falar',
    ],
    commonMistakes: [
      'Sem tema definido',
      'Sem anúncio prévio',
      'Muito longo (>90min)',
      'Sem estrutura',
    ],
    examples: [
      {
        good: '"HOJE 20h: Spaces - Tudo sobre visto de trabalho no UK\n\nCom @advogado.uk e @maria.imigrante\n\nManda sua pergunta 👇\n\nAtive o lembrete!"',
        bad: 'Spaces sem aviso, sem tema, sem convidados.',
      },
    ],
  },

  // === FACEBOOK ===
  fb_post: {
    format: 'fb_post',
    platform: 'facebook',
    structure: ['Hook', 'Conteúdo com parágrafos curtos', 'CTA'],
    hookTemplates: [
      'Para quem está planejando se mudar...',
      'Compartilhando porque sei que ajuda:',
      'A realidade que ninguém posta:',
    ],
    ctaTemplates: [
      'Compartilha com quem precisa.',
      'Comenta sua experiência.',
      'Marca alguém nessa situação.',
    ],
    visualGuidelines: 'Imagem 1200x630. Vídeo nativo. Texto grande.',
    copyRules: [
      'Parágrafos curtos (2-3 frases)',
      'Emoji a cada parágrafo',
      'Pergunta no meio ou no final',
      'Compartilhável (não muito pessoal)',
    ],
    lengthGuide: '100-300 palavras.',
    bestPractices: [
      'Postar em grupos relevantes',
      'Responder comentários rapidamente',
      'Usar enquetes nativas',
      'Compartilhar posts de outros membros',
    ],
    commonMistakes: [
      'Texto muito longo',
      'Sem pergunta',
      'Link externo (Facebook suprime)',
      'Postar e nunca voltar',
    ],
    examples: [
      {
        good: '"Para quem está chegando no UK esse mês:\n\n🏦 Abra conta no banco no DIA 1\n🏠 Não alugue sem ver o imóvel\n💳 Tenha £3000 de reserva\n\nParece óbvio. Mas eu errei 2 desses.\n\nQual foi seu maior erro nos primeiros meses? Comenta 👇"',
        bad: 'Post longo e acadêmico sobre burocracia de imigração sem pergunta ou CTA.',
      },
    ],
  },

  fb_reels: {
    format: 'fb_reels',
    platform: 'facebook',
    structure: ['Hook (0-3s)', 'Conteúdo (10-50s)', 'CTA'],
    hookTemplates: [
      'Dica rápida para brasileiros no UK:',
      'O que eu aprendi na marra:',
      'Se eu soubesse isso antes...',
    ],
    ctaTemplates: ['Compartilha nos stories.', 'Salva essa dica.', 'Segue a página pra mais.'],
    visualGuidelines: '1080x1920. Mesmas regras do IG Reels.',
    copyRules: [
      'Mesmas regras do IG Reels',
      'Texto burned-in essencial',
      'Hook nos primeiros 3s',
      'CTA claro',
    ],
    lengthGuide: '15-60s.',
    bestPractices: [
      'Cross-post do IG Reels',
      'Usar captions automáticas',
      'Primeiro frame = thumbnail',
      'Postar em horários de pico',
    ],
    commonMistakes: ['Vídeo sem edição', 'Sem texto na tela', 'Muito longo', 'Sem CTA'],
    examples: [
      {
        good: '[0-3s] TEXTO: "£200 economizados"\n[3-30s] 3 hacks rápidos\n[30-60s] "Compartilha com quem precisa"',
        bad: 'Vídeo de 3 minutos sem edição sobre burocracia.',
      },
    ],
  },

  fb_story: {
    format: 'fb_story',
    platform: 'facebook',
    structure: ['Conteúdo rápido', 'Interação', 'CTA'],
    hookTemplates: ['Adivinha?', 'Spoiler:', 'Você sabia que...'],
    ctaTemplates: ['Responde no quiz!', 'Desliza pro link', 'Reage com emoji'],
    visualGuidelines: '1080x1920. Cross-post do IG Story.',
    copyRules: ['Mesmas regras do IG Story', 'Curto e direto', 'Interação essencial', 'CTA claro'],
    lengthGuide: '3-7 frames.',
    bestPractices: [
      'Cross-post do IG Story',
      'Usar enquetes e caixas',
      'Postar 3-5x por dia',
      'Responder mensagens',
    ],
    commonMistakes: [
      'Sem interação',
      'Muito texto',
      'Frames muito parecidos',
      'Postar tudo de uma vez',
    ],
    examples: [
      {
        good: '[Frame 1] "Adivinha quanto é o aluguel médio em Londres?" + enquete\n[Frame 2] "£1800 😱"\n[Frame 3] "Mas tem hack pra isso" + swipe\n[Frame 4-6] 3 hacks\n[Frame 7] "Salva essa"',
        bad: 'Story de 20 frames com texto corrido.',
      },
    ],
  },

  event: {
    format: 'event',
    platform: 'facebook',
    structure: ['Título claro', 'Data/hora/local', 'Descrição com valor', 'CTA para confirmar'],
    hookTemplates: [
      'Encontro de brasileiros em [cidade]',
      'Workshop gratuito: [tema]',
      'Live presencial: [tema]',
    ],
    ctaTemplates: ['Confirma presença!', 'Marca quem vai com você.', 'Compartilha no story.'],
    visualGuidelines: 'Capa 1920x1080. Informações claras. Cores vibrantes.',
    copyRules: [
      'Título com cidade e tema',
      'Data e hora no início',
      'O que a pessoa vai levar de valor',
      'CTA claro para confirmar',
    ],
    lengthGuide: 'Descrição: 100-200 palavras.',
    bestPractices: [
      'Criar com 2-4 semanas de antecedência',
      'Lembrar 1 semana, 1 dia e 1h antes',
      'Postar updates no evento',
      'Compartilhar fotos depois',
    ],
    commonMistakes: [
      'Informações incompletas',
      'Sem local exato',
      'Sem descrição de valor',
      'Criar em cima da hora',
    ],
    examples: [
      {
        good: '"Encontro de Brasileiros em Londres 🇧🇷\n\n📅 Sábado, 15 de junho, 14h\n📍 Hyde Park, entrada Marble Arch\n\nO que vai rolar:\n• Networking descontraído\n• Dicas de quem já tá aqui\n• Sorteio de 1 consultoria gratuita\n\nConfirma presença e marca quem vai!"',
        bad: 'Evento chamado "Encontro" sem data, local ou descrição.',
      },
    ],
  },

  group_post: {
    format: 'group_post',
    platform: 'facebook',
    structure: ['Contexto da comunidade', 'Conteúdo de valor', 'Pergunta para engajar', 'CTA'],
    hookTemplates: [
      'Dica da comunidade:',
      'Alguém mais passou por isso?',
      'Compartilhando porque ajudou demais:',
    ],
    ctaTemplates: ['Comenta sua experiência!', 'Marca alguém do grupo.', 'Salva pra referência.'],
    visualGuidelines: 'Imagem ou vídeo relevante. Formato nativo.',
    copyRules: [
      'Tom comunitário e acolhedor',
      'Evitar spam ou autopromoção',
      'Perguntar opinião do grupo',
      'Responder comentários',
    ],
    lengthGuide: '100-250 palavras.',
    bestPractices: [
      'Postar em horários de pico do grupo',
      'Criar enquetes semanais',
      'Destacar membros da comunidade',
      'Moderar comentários',
    ],
    commonMistakes: [
      'Autopromoção excessiva',
      'Postar e sumir',
      'Sem pergunta',
      'Link externo sem contexto',
    ],
    examples: [
      {
        good: '"Gente, descobri um app que economiza £30/mês em mercado no UK! 🛒\n\nChama Too Good To Go. Restaurantes e mercados vendem comida próxima do vencimento por £3-5.\n\nAlguém mais usa? Comenta outros apps que ajudam!"',
        bad: 'Post vendendo curso sem contexto ou valor para o grupo.',
      },
    ],
  },

  fb_live: {
    format: 'fb_live',
    platform: 'facebook',
    structure: ['Intro (2min)', 'Conteúdo/Q&A (20-40min)', 'CTA'],
    hookTemplates: [
      'Live Q&A: mande sua pergunta!',
      'Hoje vou contar tudo sobre...',
      'Live especial com @convidado',
    ],
    ctaTemplates: [
      'Compartilha essa live!',
      'Segue a página pra mais.',
      'Link na descrição pra aprofundar.',
    ],
    visualGuidelines: 'Boa iluminação. Fundo limpo. Som claro.',
    copyRules: [
      'Anunciar com antecedência',
      'Tema claro',
      'Interagir com comentários',
      'Ter moderador',
    ],
    lengthGuide: '20-45 minutos.',
    bestPractices: [
      'Anunciar no grupo e na página',
      'Salvar no vídeos depois',
      'Criar posts com takeaways',
      'Fazer lives semanais fixas',
    ],
    commonMistakes: ['Sem aviso prévio', 'Sem tema', 'Ignorar comentários', 'Acabar sem CTA'],
    examples: [
      {
        good: '"Live hoje 20h: Tudo sobre impostos para brasileiros no UK!\n\nMande sua pergunta nos comentários. Vou responder AO VIVO.\n\nAtive o lembrete! 🔔"',
        bad: 'Live sem aviso, sem tema, falando sozinho por 5 min.',
      },
    ],
  },

  // === WHATSAPP ===
  status_text: {
    format: 'status_text',
    platform: 'whatsapp',
    structure: ['Frase curta', 'Emoji', 'Opcional: link ou menção'],
    hookTemplates: ['"Ninguém fala sobre isso, mas..."', 'Dica do dia:', 'Pensamento de terça:'],
    ctaTemplates: ['Manda no chat se quiser saber mais', 'Responde esse status', 'Link na bio'],
    visualGuidelines: 'Fundo colorido ou imagem. Texto centralizado. Fonte grande.',
    copyRules: [
      'Máximo 2 linhas',
      'Uma ideia por status',
      'Emoji opcional',
      'Conversacional e pessoal',
    ],
    lengthGuide: 'Máximo 20 palavras.',
    bestPractices: [
      'Postar 2-3x por dia',
      'Alternar entre dicas e inspiração',
      'Usar status para pesquisa ("A ou B?")',
      'Responder quem reage',
    ],
    commonMistakes: ['Texto muito longo', 'Muitos emojis', 'Sem contexto', 'Spam de links'],
    examples: [
      {
        good: '"O primeiro mês é o mais difícil. E o mais importante. 💪\n\nVocê consegue."',
        bad: '"Promoção imperdível! 50% off! Compre agora! Link na bio!"',
      },
    ],
  },

  status_image: {
    format: 'status_image',
    platform: 'whatsapp',
    structure: ['Imagem com texto', 'Legenda curta opcional'],
    hookTemplates: ['Quote do dia:', 'Dica visual:', 'Lembrete importante:'],
    ctaTemplates: ['Salva essa', 'Manda pra alguém que precisa', 'Responde se concorda'],
    visualGuidelines: '1080x1920. Texto grande e central. Fundo sólido ou textura.',
    copyRules: [
      'Texto na imagem = essencial',
      'Máximo 15 palavras na imagem',
      'Legenda opcional e curta',
      'Compartilhável',
    ],
    lengthGuide: 'Imagem: máx 15 palavras. Legenda: máx 10 palavras.',
    bestPractices: [
      'Criar templates reutilizáveis',
      'Usar cores da marca',
      'Postar em horários de pico',
      'Criar séries ("Dica #1", "Dica #2")',
    ],
    commonMistakes: [
      'Texto pequeno ou ilegível',
      'Imagem genérica',
      'Muita informação',
      'Sem contexto',
    ],
    examples: [
      {
        good: '[Imagem: fundo verde escuro, texto branco grande]\n"3 apps que todo brasileiro no UK deveria ter"\n\nLegenda: "Salva essa 👆"',
        bad: 'Imagem de stock com texto pequeno e genérico.',
      },
    ],
  },

  status_video: {
    format: 'status_video',
    platform: 'whatsapp',
    structure: ['Hook (0-2s)', 'Conteúdo (10-30s)', 'CTA'],
    hookTemplates: [
      'Dica rápida em 15 segundos:',
      'Você tem 20 segundos?',
      'Atenção, brasileiro no UK:',
    ],
    ctaTemplates: ['Quer mais? Manda mensagem.', 'Salva esse status', 'Manda pra alguém'],
    visualGuidelines: '1080x1920. Texto burned-in. Cortes rápidos.',
    copyRules: ['Ultra curto (15-30s)', 'Hook imediato', 'Uma dica por vídeo', 'CTA simples'],
    lengthGuide: '15-30s.',
    bestPractices: [
      'Criar série de dicas rápidas',
      'Usar mesmo formato visual',
      'Postar em horários de pico',
      'Responder quem reage',
    ],
    commonMistakes: ['Vídeo muito longo', 'Sem texto na tela', 'Mais de uma dica', 'Sem CTA'],
    examples: [
      {
        good: '[0-2s] "Hack do mercado UK"\n[2-20s] Mostra app + economia\n[20-30s] "Salva essa dica"',
        bad: 'Vídeo de 2 minutos explicando burocracia.',
      },
    ],
  },

  community_announcement: {
    format: 'community_announcement',
    platform: 'whatsapp',
    structure: ['Título claro', 'Detalhes importantes', 'CTA específica'],
    hookTemplates: [
      '📢 Anúncio importante da comunidade:',
      'Novidade para membros Muuday:',
      'ATENÇÃO - atualização importante:',
    ],
    ctaTemplates: [
      'Confirma que leu reagindo 👍',
      'Manda dúvida no chat',
      'Marca quem precisa saber',
    ],
    visualGuidelines: 'Imagem de capa opcional. Formatação com emojis. Destaque importante.',
    copyRules: [
      'Título em destaque no início',
      'Informações essenciais primeiro',
      'Tom oficial mas amigável',
      'CTA clara',
    ],
    lengthGuide: '100-300 palavras.',
    bestPractices: [
      'Usar anúncios com moderação',
      'Destacar data e prazos',
      'Criar enquetes para decisões',
      'Agradecer participação',
    ],
    commonMistakes: [
      'Anúncios muito frequentes',
      'Informação confusa',
      'Sem CTA',
      'Tom muito corporativo',
    ],
    examples: [
      {
        good: '📢 NOVO RECURSO: Guia de Impostos 2025\n\nMembros da comunidade Muuday agora têm acesso ao guia completo de impostos para brasileiros no UK.\n\n📎 Link: [link]\n⏰ Disponível até: 31/12\n\nReage com 👍 quando baixar!',
        bad: 'Mensagem longa e confusa sem destaque do que é importante.',
      },
    ],
  },

  broadcast: {
    format: 'broadcast',
    platform: 'whatsapp',
    structure: ['Saudação pessoal', 'Conteúdo de valor', 'CTA', 'Despedida'],
    hookTemplates: [
      'Oi! Tô passando pra contar uma coisa...',
      'Dica exclusiva pra você:',
      'Update rápido da semana:',
    ],
    ctaTemplates: [
      'Responde se quiser saber mais',
      'Clica no link abaixo',
      'Manda essa mensagem pra alguém',
    ],
    visualGuidelines: 'Sem visual ou imagem simples. Formatação com quebras.',
    copyRules: [
      'Tom pessoal e direto',
      'Uma ideia principal',
      'CTA única e clara',
      'Não parecer spam',
    ],
    lengthGuide: '100-200 palavras.',
    bestPractices: [
      'Enviar no máximo 1x por semana',
      'Segmentar lista quando possível',
      'Usar nome quando possível',
      'Oferecer valor antes de vender',
    ],
    commonMistakes: [
      'Mensagens muito frequentes',
      'Várias CTAs',
      'Sem personalização',
      'Parecer spam/marketing',
    ],
    examples: [
      {
        good: '"Oi! 👋\n\nPassando rapidinho pra contar que descobri um app que economiza £30/mês em mercado no UK.\n\nChama Too Good To Go.\n\nSe quiser mais dicas assim, responde ESSA mensagem com "QUERO".\n\nAbraço!"',
        bad: '"PROMOÇÃO IMPERDÍVEL!!! 50% OFF!!! COMPRE AGORA!!! CLIQUE AQUI!!!"',
      },
    ],
  },

  // === NEWSLETTER ===
  solo: {
    format: 'solo',
    platform: 'newsletter',
    structure: [
      'Assunto chamativo',
      'Saudação pessoal',
      'Story/intro',
      'Conteúdo principal',
      'Takeaways',
      'CTA',
      'PS',
    ],
    hookTemplates: [
      'O que ninguém me contou sobre [tema]',
      'Minha história com [tema]',
      '5 lições de [experiência]',
    ],
    ctaTemplates: [
      'Responde esse email com sua opinião.',
      'Compartilha com alguém que precisa.',
      'Clica aqui pra aprofundar.',
    ],
    visualGuidelines: 'Template limpo. Uma imagem de capa. Cores da marca. Mobile-friendly.',
    copyRules: [
      'Assunto: curto, específico, sem spam words',
      'Primeiro parágrafo = hook pessoal',
      'Parágrafos curtos (2-3 frases)',
      'PS no final com CTA',
    ],
    lengthGuide: '800-1500 palavras.',
    bestPractices: [
      'Enviar em dia e hora fixos',
      'Usar nome do assinante na saudação',
      'Incluir 1 imagem relevante',
      'PS sempre com CTA ou pergunta',
    ],
    commonMistakes: ['Assunto genérico', 'Email muito longo', 'Sem personalização', 'Várias CTAs'],
    examples: [
      {
        good: 'Assunto: "O dia que eu quase desisti do UK"\n\nOi [Nome],\n\nFevereiro de 2022.\n\nEu estava sentado no quarto de um apartamento compartilhado em Zone 3, olhando para uma conta de luz de £147.\n\n[... conteúdo emocional e prático ...]\n\nTakeaways:\n• Item 1\n• Item 2\n\nP.S. Qual foi o momento mais difícil da sua jornada? Responde aqui, leio todas.',
        bad: 'Assunto: "Newsletter Muuday #12"\nEmail genérico sem story pessoal, com parágrafos longos e 5 CTAs diferentes.',
      },
    ],
  },

  digest: {
    format: 'digest',
    platform: 'newsletter',
    structure: [
      'Assunto: "Resumo semanal"',
      'Intro curta',
      '3-5 links comentados',
      'Destaque da comunidade',
      'CTA',
    ],
    hookTemplates: [
      'O que você perdeu essa semana',
      'Resumo Muuday: [semana]',
      '5 coisas que você precisa saber',
    ],
    ctaTemplates: [
      'Qual link você mais curtiu? Responde.',
      'Manda pra alguém que precisa.',
      'Próxima semana tem mais.',
    ],
    visualGuidelines: 'Template de lista. Links destacados. Cores consistentes.',
    copyRules: [
      'Intro: 2-3 frases no máximo',
      'Cada item: título + 1-2 frases de comentário',
      'Link claro e visível',
      'Destaque da comunidade no final',
    ],
    lengthGuide: '500-800 palavras.',
    bestPractices: [
      'Enviar toda sexta de manhã',
      'Incluir 1 link próprio + 2-4 externos',
      'Destacar membro da comunidade',
      'Criar tema fixo (ex: "Dica da semana")',
    ],
    commonMistakes: [
      'Muitos links sem comentário',
      'Intro muito longa',
      'Links quebrados',
      'Sem destaque pessoal',
    ],
    examples: [
      {
        good: 'Assunto: "Resumo Muuday: vistos, empregos e saudade"\n\nOi [Nome],\n\nEssa semana foi intensa. Separei o que você não pode perder:\n\n1. 🗞️ Mudanças nos vistos de trabalho UK\n[Nosso comentário + link]\n\n2. 💼 3 empresas contratando brasileiros agora\n[Nosso comentário + link]\n\n3. 🎙️ Podcast: a história de Maria no NHS\n[Nosso comentário + link]\n\nDestaque da comunidade:\n"[Quote de membro]" — @usuario\n\nBom fim de semana!',
        bad: 'Email com 15 links sem comentários, sem contexto, sem personalização.',
      },
    ],
  },

  sequence: {
    format: 'sequence',
    platform: 'newsletter',
    structure: [
      'Email 1: Boas-vindas',
      'Email 2: Story + valor',
      'Email 3: Dica prática',
      'Email 4: Comunidade',
      'Email 5: CTA final',
    ],
    hookTemplates: [
      'Bem-vindo à jornada...',
      'Vamos começar do começo...',
      'O que ninguém me contou...',
    ],
    ctaTemplates: [
      'Responde com sua história.',
      'Clica aqui para o próximo passo.',
      'Entra na comunidade.',
    ],
    visualGuidelines: 'Template consistente entre emails. Progresso visual (1/5, 2/5).',
    copyRules: [
      'Cada email = um passo da jornada',
      'Story pessoal em cada um',
      'CTA clara e única',
      'Conectar emails entre si',
    ],
    lengthGuide: '500-1000 palavras por email.',
    bestPractices: [
      'Intervalo de 1-2 dias entre emails',
      'Referenciar email anterior',
      'Antecipar próximo email',
      'Testar e otimizar open rates',
    ],
    commonMistakes: ['Emails desconectados', 'Intervalo muito longo', 'CTA fraca', 'Sem story'],
    examples: [
      {
        good: 'Email 1/5: "Bem-vindo! Aqui está o que você vai aprender..."\nEmail 2/5: "O erro que quase me mandou de volta..."\nEmail 3/5: "O sistema que mudou tudo..."\nEmail 4/5: "Como encontrei minha comunidade..."\nEmail 5/5: "Seu próximo passo: [CTA]"',
        bad: '5 emails genéricos sobre "como viver no exterior" sem story ou conexão.',
      },
    ],
  },

  welcome: {
    format: 'welcome',
    platform: 'newsletter',
    structure: ['Saudação calorosa', 'O que esperar', 'Primeiro valor (gift)', 'CTA para engajar'],
    hookTemplates: [
      'Bem-vindo à família Muuday!',
      'Você acabou de fazer a melhor escolha...',
      'A partir de agora, você não está sozinho...',
    ],
    ctaTemplates: [
      'Responde esse email com sua história.',
      'Entra na comunidade do WhatsApp.',
      'Baixa seu primeiro recurso gratuito.',
    ],
    visualGuidelines: 'Template especial de boas-vindas. GIF ou imagem calorosa. Cores da marca.',
    copyRules: [
      'Tom acolhedor e pessoal',
      'Dizer exatamente o que vai receber',
      'Entregar valor imediato (download, dica)',
      'CTA para próximo passo',
    ],
    lengthGuide: '300-600 palavras.',
    bestPractices: [
      'Enviar imediatamente após inscrição',
      'Incluir presente (lead magnet)',
      'Pedir resposta ao email',
      'Link para comunidade',
    ],
    commonMistakes: [
      'Email genérico de "obrigado por se inscrever"',
      'Sem valor imediato',
      'Sem CTA',
      'Tom corporativo',
    ],
    examples: [
      {
        good: 'Assunto: "Bem-vindo! Aqui está seu guia 👋"\n\nOi [Nome],\n\nBem-vindo à comunidade Muuday!\n\nVocê agora faz parte de [N] brasileiros no exterior que recebem nossos conteúdos toda semana.\n\nAqui está o que você vai receber:\n• Dicas práticas toda terça\n• Resumo semanal toda sexta\n• Conteúdo exclusivo da comunidade\n\nE como presente de boas-vindas, aqui está seu Guia dos Primeiros 30 Dias no UK:\n\n[LINK DE DOWNLOAD]\n\nP.S. Responde esse email me contando de qual cidade do Brasil você veio. Leio TODAS as respostas!',
        bad: '"Obrigado por se inscrever. Em breve você receberá nossos emails."',
      },
    ],
  },
  tutorial: {
    format: 'tutorial',
    platform: 'blog',
    structure: [
      'Introdução com problema',
      'Passo 1',
      'Passo 2',
      'Passo 3',
      'Dica bônus',
      'Conclusão',
    ],
    hookTemplates: ['Como fazer X em 3 passos simples', 'O guia completo de Y'],
    ctaTemplates: ['Baixe o checklist', 'Assine a newsletter'],
    visualGuidelines: 'Screenshots e diagramas.',
    copyRules: ['Passo a passo claro', 'Screenshots quando relevante'],
    lengthGuide: '1500-3000 palavras',
    bestPractices: ['Use subtítulos', 'Inclua screenshots'],
    commonMistakes: ['Sem exemplos práticos', 'Passos confusos'],
    examples: [{ good: 'Passo 1: Faça X\nPasso 2: Faça Y', bad: 'Faça X e Y.' }],
  },
  listicle: {
    format: 'listicle',
    platform: 'blog',
    structure: ['Introdução', 'Item 1', 'Item 2', 'Item 3', 'Conclusão'],
    hookTemplates: ['7 coisas que ninguém te conta sobre X', '5 erros que todo brasileiro comete'],
    ctaTemplates: ['Qual você já fez? Comenta!', 'Salva pra depois'],
    visualGuidelines: 'Lista com bullets ou números.',
    copyRules: ['Cada item com contexto', 'Números no título'],
    lengthGuide: '800-1500 palavras',
    bestPractices: ['Use números ímpares', 'Exemplos reais'],
    commonMistakes: ['Lista genérica', 'Sem exemplos'],
    examples: [{ good: '1. Erro X: porque acontece', bad: '1. Erro X' }],
  },
  guide: {
    format: 'guide',
    platform: 'blog',
    structure: ['Introdução', 'Contexto', 'Passos detalhados', 'Erros comuns', 'Conclusão'],
    hookTemplates: ['O guia definitivo de X', 'Tudo sobre Y em um só lugar'],
    ctaTemplates: ['Baixe o template', 'Entre na comunidade'],
    visualGuidelines: 'Diagramas e infográficos.',
    copyRules: ['Profundidade técnica', 'Exemplos práticos'],
    lengthGuide: '3000-8000 palavras',
    bestPractices: ['Índice navegável', 'Atualizações periódicas'],
    commonMistakes: ['Superficial', 'Desatualizado'],
    examples: [{ good: 'Guia completo com exemplos.', bad: 'Resumo rápido.' }],
  },
  episode: {
    format: 'episode',
    platform: 'podcast',
    structure: [
      'Hook inicial',
      'Introdução da história',
      'Desenvolvimento',
      'Clímax',
      'Reflexão',
      'CTA',
    ],
    hookTemplates: ['A história de quem...', 'Você não vai acreditar no que aconteceu com...'],
    ctaTemplates: ['Segue a gente no Instagram', 'Compartilha essa história'],
    visualGuidelines: 'Capa do episódio 1:1.',
    copyRules: ['Tom conversacional', 'Emoção na narração'],
    lengthGuide: '5-15 minutos',
    bestPractices: ['Abertura forte', 'Edição dinâmica'],
    commonMistakes: ['Começo lento', 'Sem emoção'],
    examples: [{ good: 'Hook forte + história envolvente.', bad: 'Introdução longa e chata.' }],
  },
  interview: {
    format: 'interview',
    platform: 'podcast',
    structure: ['Apresentação do convidado', 'Pergunta 1', 'Pergunta 2', 'Pergunta 3', 'Conclusão'],
    hookTemplates: ['Conversamos com quem...', 'A verdade sobre X com Y'],
    ctaTemplates: ['Siga o convidado', 'Assine o podcast'],
    visualGuidelines: 'Foto do convidado.',
    copyRules: ['Perguntas abertas', 'Escuta ativa'],
    lengthGuide: '30-60 minutos',
    bestPractices: ['Pesquisa prévia', 'Perguntas difíceis'],
    commonMistakes: ['Interromper', 'Perguntas fechadas'],
    examples: [{ good: 'Pergunta profunda + resposta honesta.', bad: 'Pergunta genérica.' }],
  },
  story_audio: {
    format: 'story_audio',
    platform: 'podcast',
    structure: ['Setup', 'Conflito', 'Desenvolvimento', 'Resolução', 'Moral'],
    hookTemplates: ['Era uma vez...', 'A história de como...'],
    ctaTemplates: ['Compartilhe', 'Deixe seu comentário'],
    visualGuidelines: 'Capa ilustrativa.',
    copyRules: ['Narração envolvente', 'Personagens reais'],
    lengthGuide: '10-20 minutos',
    bestPractices: ['Som ambiente', 'Música adequada'],
    commonMistakes: ['Narração monótona', 'Sem conflito'],
    examples: [{ good: 'História com reviravolta.', bad: 'História previsível.' }],
  },
}

export function getFormatGuide(format: ContentFormat): FormatGuide | undefined {
  return FORMAT_GUIDES[format]
}

export function buildPromptForFormat(
  format: ContentFormat,
  purpose: ContentPurpose,
  topic: string,
  pillar: string
): string {
  const guide = FORMAT_GUIDES[format]
  if (!guide) return `Escreva conteúdo sobre ${topic} para ${format}`

  return `FORMATO: ${guide.format} (${guide.platform})
PROPÓSITO: ${purpose}
PILAR: ${pillar}
TEMA: ${topic}

ESTRUTURA:
${guide.structure.map((s, i) => `${i + 1}. ${s}`).join('\n')}

REGRAS DE CÓPIA:
${guide.copyRules.map((r) => `- ${r}`).join('\n')}

DIRETRIZES VISUAIS:
${guide.visualGuidelines}

GUIA DE COMPRIMENTO:
${guide.lengthGuide}

MELHORES PRÁTICAS:
${guide.bestPractices.map((b) => `- ${b}`).join('\n')}

HOOKS SUGERIDOS:
${guide.hookTemplates.map((h) => `- ${h}`).join('\n')}

CTAs SUGERIDOS:
${guide.ctaTemplates.map((c) => `- ${c}`).join('\n')}

EVITE:
${guide.commonMistakes.map((m) => `- ${m}`).join('\n')}`
}
