import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Muuday Marketing',
  description: 'Ferramenta interna de marketing da Muuday',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  )
}
