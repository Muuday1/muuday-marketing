import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-brand-light flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Dashboard Brasil Global</CardTitle>
          <p className="text-sm text-brand-slate mt-1">
            Faça login para acessar o painel de controle
          </p>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-brand-dark mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full rounded-lg border border-brand-slate/20 bg-white px-4 py-2 text-brand-dark focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
                placeholder="admin@brasilglobal.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-dark mb-1">
                Senha
              </label>
              <input
                type="password"
                className="w-full rounded-lg border border-brand-slate/20 bg-white px-4 py-2 text-brand-dark focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
                placeholder="••••••••"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </form>
          <p className="text-xs text-brand-slate text-center mt-4">
            Acesso restrito à equipe Brasil Global.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
