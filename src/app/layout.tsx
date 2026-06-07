import type { Metadata } from 'next'
import { AuthProvider } from '@/components/auth/AuthProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Muuday Marketing',
  description: 'Ferramenta interna de marketing da Muuday',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
