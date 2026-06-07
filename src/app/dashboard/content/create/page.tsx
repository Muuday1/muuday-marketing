'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { PlatformStep } from '@/components/content-wizard/PlatformStep'
import { FormatStep } from '@/components/content-wizard/FormatStep'
import { PurposeStep } from '@/components/content-wizard/PurposeStep'
import { ReviewStep } from '@/components/content-wizard/ReviewStep'
import { ResultStep } from '@/components/content-wizard/ResultStep'
import { INITIAL_STATE, type WizardState, type WizardStep } from '@/components/content-wizard/types'
import { getDefaultTopic } from '@/content-engine/strategy/content-matrix'

const STEPS: { id: WizardStep; label: string }[] = [
  { id: 'platform', label: 'Plataforma' },
  { id: 'format', label: 'Formato' },
  { id: 'purpose', label: 'Estratégia' },
  { id: 'review', label: 'Revisar' },
  { id: 'result', label: 'Resultado' },
]

export default function CreateContentPage() {
  const router = useRouter()
  const [state, setState] = useState<WizardState>(INITIAL_STATE)

  const updateState = useCallback((updates: Partial<WizardState>) => {
    setState((prev) => ({ ...prev, ...updates }))
  }, [])

  const goToStep = useCallback((step: WizardStep) => {
    setState((prev) => ({ ...prev, step }))
  }, [])

  const currentStepIndex = STEPS.findIndex((s) => s.id === state.step)

  function canProceed(): boolean {
    switch (state.step) {
      case 'platform':
        return !!state.platform
      case 'format':
        return !!state.format
      case 'purpose':
        return !!state.purpose && !!state.topic
      case 'review':
        return true
      default:
        return false
    }
  }

  function handleNext() {
    if (state.step === 'review') {
      handleGenerate()
      return
    }
    const nextIndex = currentStepIndex + 1
    if (nextIndex < STEPS.length) {
      goToStep(STEPS[nextIndex].id)
    }
  }

  function handleBack() {
    const prevIndex = currentStepIndex - 1
    if (prevIndex >= 0) {
      goToStep(STEPS[prevIndex].id)
    }
  }

  async function handleGenerate() {
    if (!state.platform || !state.format || !state.purpose) return

    updateState({ loading: true, error: null })

    try {
      const res = await fetch('/api/content/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: state.topic,
          type: state.format,
          platform: state.platform,
          pillar: state.pillar,
          purpose: state.purpose,
          tone: state.tone,
          theme: state.theme,
          generateCoverImage: state.generateCoverImage,
        }),
      })

      const data = await res.json()

      if (data.success && data.data) {
        updateState({
          step: 'result',
          generatedContent: {
            headline: data.data.headline || '',
            body: data.data.body || '',
            cta: data.data.cta || '',
            hashtags: data.data.hashtags || [],
            altText: data.data.altText || '',
          },
          contentPieceId: data.data.id || null,
          loading: false,
        })
      } else {
        updateState({
          error: data.error || 'Erro ao gerar conteúdo',
          loading: false,
        })
      }
    } catch {
      updateState({ error: 'Erro ao gerar conteúdo', loading: false })
    }
  }

  function handlePurposeChange(purpose: WizardState['purpose']) {
    const topic = state.topic || getDefaultTopic(state.pillar, purpose!)
    updateState({ purpose, topic })
  }

  return (
    <div className="bg-brand-light min-h-screen">
      <Header />
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-brand-dark text-3xl font-bold">Criar conteúdo</h1>
          <Button variant="ghost" size="sm" onClick={() => router.push('/dashboard/content')}>
            ← Voltar
          </Button>
        </div>

        {/* Step indicator */}
        <div className="mb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {STEPS.map((step, index) => {
              const isActive = index === currentStepIndex
              const isCompleted = index < currentStepIndex
              return (
                <div key={step.id} className="flex shrink-0 items-center gap-2">
                  <button
                    onClick={() => {
                      if (isCompleted) goToStep(step.id)
                    }}
                    disabled={!isCompleted && !isActive}
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-brand-lime text-brand-dark'
                        : isCompleted
                          ? 'bg-brand-dark text-white'
                          : 'bg-brand-slate/10 text-brand-slate'
                    }`}
                  >
                    <span>{isCompleted ? '✓' : index + 1}</span>
                    {step.label}
                  </button>
                  {index < STEPS.length - 1 && <span className="text-brand-slate/30">→</span>}
                </div>
              )
            })}
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="min-h-[400px]">
              {state.step === 'platform' && (
                <PlatformStep
                  selected={state.platform}
                  onSelect={(platform) => updateState({ platform, format: null })}
                />
              )}

              {state.step === 'format' && state.platform && (
                <FormatStep
                  platform={state.platform}
                  selected={state.format}
                  onSelect={(format) => updateState({ format })}
                />
              )}

              {state.step === 'purpose' && state.platform && state.format && (
                <PurposeStep
                  platform={state.platform}
                  format={state.format}
                  purpose={state.purpose}
                  pillar={state.pillar}
                  topic={state.topic}
                  tone={state.tone}
                  theme={state.theme}
                  generateCoverImage={state.generateCoverImage}
                  onPurposeChange={handlePurposeChange}
                  onPillarChange={(pillar) => updateState({ pillar })}
                  onTopicChange={(topic) => updateState({ topic })}
                  onToneChange={(tone) => updateState({ tone })}
                  onThemeChange={(theme) => updateState({ theme })}
                  onGenerateCoverChange={(v) => updateState({ generateCoverImage: v })}
                />
              )}

              {state.step === 'review' && state.platform && state.format && state.purpose && (
                <ReviewStep
                  platform={state.platform}
                  format={state.format}
                  purpose={state.purpose}
                  pillar={state.pillar}
                  topic={state.topic}
                  tone={state.tone}
                  theme={state.theme}
                  generateCoverImage={state.generateCoverImage}
                />
              )}

              {state.step === 'result' &&
                state.generatedContent &&
                state.platform &&
                state.format &&
                state.purpose && (
                  <ResultStep
                    platform={state.platform}
                    format={state.format}
                    purpose={state.purpose}
                    content={state.generatedContent}
                    contentPieceId={state.contentPieceId}
                    imageUrls={[]}
                    scheduleDate={state.scheduleDate}
                    scheduleTime={state.scheduleTime}
                    onScheduleDateChange={(date) => updateState({ scheduleDate: date })}
                    onScheduleTimeChange={(time) => updateState({ scheduleTime: time })}
                  />
                )}
            </div>

            {state.error && (
              <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {state.error}
              </div>
            )}

            {state.step !== 'result' && (
              <div className="border-brand-slate/10 mt-6 flex items-center justify-between border-t pt-6">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStepIndex === 0 || state.loading}
                >
                  Voltar
                </Button>
                <Button onClick={handleNext} disabled={!canProceed() || state.loading}>
                  {state.loading
                    ? 'Gerando...'
                    : state.step === 'review'
                      ? 'Gerar conteúdo'
                      : 'Continuar'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
