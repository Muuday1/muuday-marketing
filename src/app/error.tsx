'use client'

import { Button } from '@/components/ui/Button'
import { useEffect } from 'react'

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // TODO: Log to Sentry
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-brand-light flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">😵</div>
        <h1 className="text-2xl font-bold text-brand-dark mb-2">
          Algo deu errado
        </h1>
        <p className="text-brand-slate mb-6">
          Desculpe, ocorreu um erro inesperado. Nossa equipe foi notificada.
        </p>
        <div className="flex gap-3 justify-center">
          <Button onClick={reset}>Tentar novamente</Button>
          <Button variant="outline" onClick={() => window.location.href = '/'}>
            Voltar ao início
          </Button>
        </div>
      </div>
    </div>
  )
}
