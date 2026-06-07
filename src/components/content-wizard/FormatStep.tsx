'use client'

import {
  FORMATS,
  getFormatsForPlatform,
  type ContentPlatform,
  type ContentFormat,
} from '@/content-engine/strategy/content-matrix'

interface FormatStepProps {
  platform: ContentPlatform
  selected: ContentFormat | null
  onSelect: (format: ContentFormat) => void
}

const VISUAL_BADGE = {
  image: '🖼️',
  video: '🎬',
  text: '📝',
  mixed: '✨',
  audio: '🎙️',
}

const EFFORT_LABEL = {
  low: '⚡ Fácil',
  medium: '⚡⚡ Médio',
  high: '⚡⚡⚡ Complexo',
}

export function FormatStep({ platform, selected, onSelect }: FormatStepProps) {
  const formats = getFormatsForPlatform(platform)

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-brand-dark text-xl font-semibold">Escolha o formato</h2>
        <p className="text-brand-slate mt-1 text-sm">
          Cada formato tem uma estratégia diferente de engajamento
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {formats.map((formatId) => {
          const format = FORMATS[formatId]
          return (
            <button
              key={formatId}
              onClick={() => onSelect(formatId)}
              className={`rounded-xl border-2 p-4 text-left transition-all ${
                selected === formatId
                  ? 'border-brand-lime bg-brand-lime/10 ring-brand-lime/30 ring-2'
                  : 'border-brand-slate/10 hover:border-brand-lime/50 bg-white hover:shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-brand-dark font-semibold">{format.label}</h3>
                  <p className="text-brand-slate mt-1 text-xs leading-relaxed">
                    {format.description}
                  </p>
                </div>
                <span className="text-lg">{VISUAL_BADGE[format.visualType]}</span>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <span className="bg-brand-slate/5 text-brand-slate rounded-full px-2 py-0.5 text-[10px]">
                  {format.aspectRatio}
                </span>
                <span className="bg-brand-slate/5 text-brand-slate rounded-full px-2 py-0.5 text-[10px]">
                  {EFFORT_LABEL[format.productionEffort]}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] ${
                    format.engagementLevel === 'high'
                      ? 'bg-green-50 text-green-700'
                      : format.engagementLevel === 'medium'
                        ? 'bg-yellow-50 text-yellow-700'
                        : 'bg-gray-50 text-gray-600'
                  }`}
                >
                  {format.engagementLevel === 'high'
                    ? '🔥 Alto engajamento'
                    : format.engagementLevel === 'medium'
                      ? '👍 Médio'
                      : '📊 Baixo'}
                </span>
              </div>

              <div className="text-brand-slate/70 mt-2 text-[10px]">
                📅 {format.suggestedCadence} • 🕐 {format.bestTimeToPost}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
