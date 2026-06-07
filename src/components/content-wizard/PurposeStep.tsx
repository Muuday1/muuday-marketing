'use client'

import { useMemo } from 'react'
import {
  PURPOSES,
  PLATFORMS,
  getDefaultTopic,
  type ContentPlatform,
  type ContentFormat,
  type ContentPurpose,
} from '@/content-engine/strategy/content-matrix'
import { FORMATS } from '@/content-engine/strategy/content-matrix'
import { CAROUSEL_THEMES } from '@/content-engine/templates/themes/const'

interface PurposeStepProps {
  platform: ContentPlatform
  format: ContentFormat
  purpose: ContentPurpose | null
  pillar: string
  topic: string
  tone: 'warm' | 'informative' | 'motivational' | 'fun'
  theme: import('@/content-engine/templates/themes/const').CarouselTheme
  generateCoverImage: boolean
  onPurposeChange: (purpose: ContentPurpose) => void
  onPillarChange: (pillar: string) => void
  onTopicChange: (topic: string) => void
  onToneChange: (tone: 'warm' | 'informative' | 'motivational' | 'fun') => void
  onThemeChange: (theme: import('@/content-engine/templates/themes/const').CarouselTheme) => void
  onGenerateCoverChange: (v: boolean) => void
}

const PURPOSE_ICONS: Record<ContentPurpose, string> = {
  educate: '🎓',
  entertain: '😄',
  inspire: '✨',
  sell: '🛍️',
  engage: '💬',
  convert: '🎯',
  authority: '🏆',
  community: '👥',
  culture: '❤️',
}

const PILLARS = [
  { id: 'finance', label: 'Finanças', icon: '💰' },
  { id: 'career', label: 'Carreira', icon: '💼' },
  { id: 'immigration', label: 'Imigração', icon: '🛂' },
  { id: 'lifestyle', label: 'Lifestyle', icon: '🏠' },
  { id: 'community', label: 'Comunidade', icon: '🤝' },
  { id: 'culture', label: 'Cultura', icon: '🇧🇷' },
]

export function PurposeStep({
  platform,
  format,
  purpose,
  pillar,
  topic,
  tone,
  theme,
  generateCoverImage,
  onPurposeChange,
  onPillarChange,
  onTopicChange,
  onToneChange,
  onThemeChange,
  onGenerateCoverChange,
}: PurposeStepProps) {
  const platformConfig = PLATFORMS[platform]
  const formatConfig = FORMATS[format]

  const suggestedPurposes = useMemo(() => {
    return Object.entries(platformConfig.contentRatio)
      .sort((a, b) => b[1] - a[1])
      .map(([p]) => p as ContentPurpose)
  }, [platformConfig])

  const suggestedTopic = useMemo(() => {
    if (purpose && !topic) {
      return getDefaultTopic(pillar, purpose)
    }
    return topic
  }, [purpose, pillar, topic])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-brand-dark text-xl font-semibold">Estratégia do conteúdo</h2>
        <p className="text-brand-slate mt-1 text-sm">
          Defina o propósito, pilar e tema do seu conteúdo
        </p>
      </div>

      {/* Purpose */}
      <div className="space-y-2">
        <label className="text-brand-dark block text-sm font-medium">Propósito</label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {suggestedPurposes.map((p) => {
            const config = PURPOSES[p]
            return (
              <button
                key={p}
                onClick={() => onPurposeChange(p)}
                className={`rounded-xl border-2 p-3 text-left transition-all ${
                  purpose === p
                    ? 'border-brand-lime bg-brand-lime/10 ring-brand-lime/30 ring-2'
                    : 'border-brand-slate/10 hover:border-brand-lime/50 bg-white'
                }`}
              >
                <div className="text-xl">{PURPOSE_ICONS[p]}</div>
                <div className="text-brand-dark mt-1 text-sm font-medium">{config.label}</div>
                <div className="text-brand-slate mt-0.5 text-[10px] leading-tight">
                  {config.description.slice(0, 50)}...
                </div>
                <div className="text-brand-lime mt-1 text-[10px] font-medium">
                  {platformConfig.contentRatio[p]}% sugerido
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Pillar */}
      <div className="space-y-2">
        <label className="text-brand-dark block text-sm font-medium">Pilar de conteúdo</label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {PILLARS.map((p) => (
            <button
              key={p.id}
              onClick={() => onPillarChange(p.id)}
              className={`rounded-xl border-2 p-3 text-left transition-all ${
                pillar === p.id
                  ? 'border-brand-lime bg-brand-lime/10 ring-brand-lime/30 ring-2'
                  : 'border-brand-slate/10 hover:border-brand-lime/50 bg-white'
              }`}
            >
              <span className="text-lg">{p.icon}</span>
              <span className="text-brand-dark ml-2 text-sm font-medium">{p.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Topic */}
      <div className="space-y-2">
        <label className="text-brand-dark block text-sm font-medium">Tema / Tópico</label>
        <input
          type="text"
          value={topic || suggestedTopic}
          onChange={(e) => onTopicChange(e.target.value)}
          className="border-brand-slate/20 text-brand-dark focus:border-brand-primary focus:ring-brand-primary/20 w-full rounded-lg border bg-white px-4 py-2.5 text-sm focus:ring-2"
          placeholder="Ex: Como economizar nos primeiros 6 meses no UK"
        />
        {purpose && (
          <p className="text-brand-slate text-xs">
            💡 Sugestão para {PURPOSES[purpose].label.toLowerCase()}:{' '}
            {getDefaultTopic(pillar, purpose)}
          </p>
        )}
      </div>

      {/* Tone */}
      <div className="space-y-2">
        <label className="text-brand-dark block text-sm font-medium">Tom de voz</label>
        <div className="flex gap-2">
          {[
            { id: 'warm' as const, label: 'Acolhedor', emoji: '🤗' },
            { id: 'informative' as const, label: 'Informativo', emoji: '📚' },
            { id: 'motivational' as const, label: 'Motivacional', emoji: '🔥' },
            { id: 'fun' as const, label: 'Divertido', emoji: '😄' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => onToneChange(t.id)}
              className={`flex-1 rounded-xl border-2 p-2 text-center text-sm transition-all ${
                tone === t.id
                  ? 'border-brand-lime bg-brand-lime/10 ring-brand-lime/30 ring-2'
                  : 'border-brand-slate/10 hover:border-brand-lime/50 bg-white'
              }`}
            >
              <span className="text-lg">{t.emoji}</span>
              <div className="text-brand-dark mt-1 text-xs font-medium">{t.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Visual theme (if applicable) */}
      {formatConfig.requiresVisual && formatConfig.aiGeneratesVisual && (
        <div className="space-y-2">
          <label className="text-brand-dark block text-sm font-medium">Tema visual</label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {CAROUSEL_THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => onThemeChange(t.id)}
                className={`rounded-xl border-2 p-2 text-center text-sm transition-all ${
                  theme === t.id
                    ? 'border-brand-lime bg-brand-lime/10 ring-brand-lime/30 ring-2'
                    : 'border-brand-slate/10 hover:border-brand-lime/50 bg-white'
                }`}
              >
                <div className="text-brand-dark text-xs font-medium">{t.label}</div>
                <div className="text-brand-slate text-[10px]">{t.description}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Cover image option */}
      {formatConfig.requiresVisual && (
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="generateCover"
            checked={generateCoverImage}
            onChange={(e) => onGenerateCoverChange(e.target.checked)}
            className="border-brand-slate/20 rounded"
          />
          <label htmlFor="generateCover" className="text-brand-dark text-sm">
            Gerar imagem de capa com FLUX (custo extra)
          </label>
        </div>
      )}
    </div>
  )
}
