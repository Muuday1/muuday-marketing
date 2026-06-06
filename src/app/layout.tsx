import type { Metadata } from 'next'
import './globals.css'
import { AnalyticsInit } from '@/components/AnalyticsInit'

export const metadata: Metadata = {
  title: 'Brasil Global — Comunidade de Brasileiros no Exterior',
  description:
    'Conteúdo, dicas e comunidade para brasileiros que vivem fora do Brasil. Podcast, newsletter, eventos e muito mais.',
  keywords: [
    'brasileiros no exterior',
    'imigração',
    'comunidade brasileira',
    'vida no UK',
    'vida na Europa',
  ],
  openGraph: {
    title: 'Brasil Global',
    description: 'Comunidade de Brasileiros no Exterior',
    type: 'website',
    locale: 'pt_BR',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <AnalyticsInit />
        {children}
      </body>
    </html>
  )
}
