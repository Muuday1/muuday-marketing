'use client'

import { PLATFORMS, type ContentPlatform } from '@/content-engine/strategy/content-matrix'

interface PlatformStepProps {
  selected: ContentPlatform | null
  onSelect: (platform: ContentPlatform) => void
}

const PLATFORM_ICONS: Record<ContentPlatform, string> = {
  instagram: '📸',
  tiktok: '🎵',
  youtube: '▶️',
  linkedin: '💼',
  twitter: '🐦',
  facebook: '📘',
  whatsapp: '💬',
  newsletter: '📧',
}

export function PlatformStep({ selected, onSelect }: PlatformStepProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-brand-dark text-xl font-semibold">Escolha a plataforma</h2>
        <p className="text-brand-slate mt-1 text-sm">
          Cada plataforma tem formatos e estratégias diferentes
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {Object.values(PLATFORMS).map((platform) => (
          <button
            key={platform.id}
            onClick={() => onSelect(platform.id)}
            className={`rounded-xl border-2 p-4 text-left transition-all ${
              selected === platform.id
                ? 'border-brand-lime bg-brand-lime/10 ring-brand-lime/30 ring-2'
                : 'border-brand-slate/10 hover:border-brand-lime/50 bg-white hover:shadow-sm'
            }`}
          >
            <div className="text-2xl">{PLATFORM_ICONS[platform.id]}</div>
            <h3 className="text-brand-dark mt-2 font-semibold">{platform.label}</h3>
            <p className="text-brand-slate mt-1 text-xs leading-relaxed">{platform.description}</p>
            <div className="mt-3 flex flex-wrap gap-1">
              {platform.bestTimes.slice(0, 2).map((time) => (
                <span
                  key={time}
                  className="bg-brand-slate/5 text-brand-slate rounded-full px-2 py-0.5 text-[10px]"
                >
                  🕐 {time}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
