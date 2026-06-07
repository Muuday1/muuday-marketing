'use client'

import {
  PLATFORMS,
  FORMATS,
  PURPOSES,
  type ContentPlatform,
  type ContentFormat,
  type ContentPurpose,
} from '@/content-engine/strategy/content-matrix'
import { getFormatGuide } from '@/content-engine/strategy/format-guides'

interface ReviewStepProps {
  platform: ContentPlatform
  format: ContentFormat
  purpose: ContentPurpose
  pillar: string
  topic: string
  tone: string
  theme: string
  generateCoverImage: boolean
}

const PILLAR_LABELS: Record<string, string> = {
  finance: 'Finanças',
  career: 'Carreira',
  immigration: 'Imigração',
  lifestyle: 'Lifestyle',
  community: 'Comunidade',
  culture: 'Cultura',
}

const TONE_LABELS: Record<string, string> = {
  warm: 'Acolhedor',
  informative: 'Informativo',
  motivational: 'Motivacional',
  fun: 'Divertido',
}

export function ReviewStep({
  platform,
  format,
  purpose,
  pillar,
  topic,
  tone,
  theme,
  generateCoverImage,
}: ReviewStepProps) {
  const platformConfig = PLATFORMS[platform]
  const formatConfig = FORMATS[format]
  const purposeConfig = PURPOSES[purpose]
  const guide = getFormatGuide(format)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-brand-dark text-xl font-semibold">Revisar e gerar</h2>
        <p className="text-brand-slate mt-1 text-sm">
          Confira as configurações antes de gerar o conteúdo
        </p>
      </div>

      {/* Summary card */}
      <div className="bg-brand-dark rounded-xl p-5 text-white">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs tracking-wide text-white/50 uppercase">Plataforma</div>
            <div className="mt-1 text-lg font-semibold">{platformConfig.label}</div>
          </div>
          <div>
            <div className="text-xs tracking-wide text-white/50 uppercase">Formato</div>
            <div className="mt-1 text-lg font-semibold">{formatConfig.label}</div>
          </div>
          <div>
            <div className="text-xs tracking-wide text-white/50 uppercase">Propósito</div>
            <div className="mt-1 font-medium">
              {purposeConfig.icon} {purposeConfig.label}
            </div>
          </div>
          <div>
            <div className="text-xs tracking-wide text-white/50 uppercase">Pilar</div>
            <div className="mt-1 font-medium">{PILLAR_LABELS[pillar] || pillar}</div>
          </div>
        </div>
        <div className="mt-4 border-t border-white/10 pt-4">
          <div className="text-xs tracking-wide text-white/50 uppercase">Tema</div>
          <div className="mt-1 font-medium">{topic}</div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs">
            Tom: {TONE_LABELS[tone] || tone}
          </span>
          <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs">Tema visual: {theme}</span>
          {generateCoverImage && (
            <span className="bg-brand-lime/20 text-brand-lime rounded-full px-2.5 py-1 text-xs">
              🎨 Capa FLUX
            </span>
          )}
        </div>
      </div>

      {/* Strategy guide */}
      {guide && (
        <div className="space-y-3">
          <h3 className="text-brand-dark font-semibold">📋 Estratégia recomendada</h3>

          <div className="border-brand-slate/10 rounded-xl border bg-white p-4">
            <h4 className="text-brand-dark text-sm font-medium">Estrutura</h4>
            <ol className="text-brand-slate mt-2 list-decimal space-y-1 pl-4 text-sm">
              {guide.structure.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
          </div>

          <div className="border-brand-slate/10 rounded-xl border bg-white p-4">
            <h4 className="text-brand-dark text-sm font-medium">Hooks sugeridos</h4>
            <ul className="text-brand-slate mt-2 list-disc space-y-1 pl-4 text-sm">
              {guide.hookTemplates.slice(0, 3).map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>

          <div className="border-brand-slate/10 rounded-xl border bg-white p-4">
            <h4 className="text-brand-dark text-sm font-medium">CTAs sugeridos</h4>
            <ul className="text-brand-slate mt-2 list-disc space-y-1 pl-4 text-sm">
              {guide.ctaTemplates.slice(0, 3).map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>

          <div className="border-brand-slate/10 rounded-xl border bg-white p-4">
            <h4 className="text-brand-dark text-sm font-medium">Regras de cópia</h4>
            <ul className="text-brand-slate mt-2 list-disc space-y-1 pl-4 text-sm">
              {guide.copyRules.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
