'use client'

import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils/cn'
import { useState } from 'react'
import Link from 'next/link'

const navLinks = [
  { label: 'Início', href: '/' },
  { label: 'Conteúdo', href: '/conteudo' },
  { label: 'Podcast', href: '/podcast' },
  { label: 'Comunidade', href: '/comunidade' },
  { label: 'Dashboard', href: '/dashboard' },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-brand-slate/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-brand-lime flex items-center justify-center">
              <span className="text-brand-dark font-bold text-sm">BG</span>
            </div>
            <span className="font-display text-xl text-brand-dark">Brasil Global</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-brand-slate hover:text-brand-dark transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm">Entrar</Button>
            <Button size="sm">Junte-se</Button>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div className={cn('md:hidden', mobileOpen ? 'block' : 'hidden')}>
        <div className="px-4 pb-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2 text-sm font-medium text-brand-slate hover:text-brand-dark"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 flex gap-2">
            <Button variant="ghost" size="sm" className="flex-1">Entrar</Button>
            <Button size="sm" className="flex-1">Junte-se</Button>
          </div>
        </div>
      </div>
    </header>
  )
}
