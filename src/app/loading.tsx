export default function Loading() {
  return (
    <div className="min-h-screen bg-brand-light flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin mx-auto mb-4" />
        <p className="text-brand-slate">Carregando...</p>
      </div>
    </div>
  )
}
