import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-light flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-4xl font-bold text-brand-dark mb-2">404</h1>
        <p className="text-lg text-brand-slate mb-6">
          Página não encontrada. O conteúdo pode ter sido movido ou não existe.
        </p>
        <Button onClick={() => window.location.href = '/'}>
          Voltar ao início
        </Button>
      </div>
    </div>
  )
}
