'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export function Header() {
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
    router.refresh()
  }

  return (
    <header className="border-brand-slate/10 border-b bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="text-brand-dark font-bold">
              Muuday Marketing
            </Link>
            <nav className="hidden items-center gap-4 text-sm sm:flex">
              <Link href="/dashboard" className="text-brand-slate hover:text-brand-dark">
                Dashboard
              </Link>
              <Link href="/dashboard/content" className="text-brand-slate hover:text-brand-dark">
                Conteúdo
              </Link>
              <Link
                href="/dashboard/content/create"
                className="bg-brand-lime text-brand-dark hover:bg-brand-lime/90 rounded-full px-3 py-1 text-xs font-semibold"
              >
                + Criar
              </Link>
              <Link href="/dashboard/calendar" className="text-brand-slate hover:text-brand-dark">
                Calendário
              </Link>
              <Link href="/dashboard/campaigns" className="text-brand-slate hover:text-brand-dark">
                Campanhas
              </Link>
              <Link href="/dashboard/alerts" className="text-brand-slate hover:text-brand-dark">
                Alertas
              </Link>
              <Link href="/dashboard/reports" className="text-brand-slate hover:text-brand-dark">
                Relatórios
              </Link>
              <Link href="/dashboard/leads" className="text-brand-slate hover:text-brand-dark">
                Leads
              </Link>
            </nav>
          </div>
          <button onClick={handleLogout} className="text-brand-slate hover:text-brand-dark text-sm">
            Sair
          </button>
        </div>
      </div>
    </header>
  )
}
