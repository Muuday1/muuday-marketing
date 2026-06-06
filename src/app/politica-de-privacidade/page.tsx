import { Card, CardContent } from '@/components/ui/Card'

export default function PoliticaPrivacidadePage() {
  return (
    <div className="min-h-screen bg-brand-light">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-brand-dark mb-4">
            Política de Privacidade
          </h1>
          <p className="text-lg text-brand-slate">
            Como coletamos, usamos e protegemos seus dados.
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-xl font-bold text-brand-dark mb-3">
                1. Informações que coletamos
              </h2>
              <p className="text-brand-slate leading-relaxed">
                Coletamos informações que você nos fornece diretamente, como nome, email,
                cidade e país quando se inscreve na newsletter ou entra na comunidade.
                Também coletamos dados de uso anonimizados para melhorar nossa plataforma.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-xl font-bold text-brand-dark mb-3">
                2. Como usamos suas informações
              </h2>
              <ul className="space-y-2 text-brand-slate">
                <li>• Enviar newsletters e atualizações que você solicitou</li>
                <li>• Conectar você com outros membros da comunidade</li>
                <li>• Melhorar nosso conteúdo e serviços</li>
                <li>• Analisar tendências de forma agregada e anônima</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-xl font-bold text-brand-dark mb-3">
                3. Compartilhamento de dados
              </h2>
              <p className="text-brand-slate leading-relaxed">
                Não vendemos seus dados pessoais. Compartilhamos informações apenas com
                prestadores de serviço essenciais (como serviços de email) e sempre com
                proteções contratuais adequadas.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-xl font-bold text-brand-dark mb-3">
                4. Seus direitos
              </h2>
              <p className="text-brand-slate leading-relaxed">
                Você tem o direito de acessar, corrigir ou excluir seus dados pessoais.
                Para exercer esses direitos, entre em contato conosco pelo email
                privacidade@brasilglobal.com.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-xl font-bold text-brand-dark mb-3">
                5. Cookies e tecnologias similares
              </h2>
              <p className="text-brand-slate leading-relaxed">
                Usamos cookies essenciais para o funcionamento do site e cookies analíticos
                para entender como nossos visitantes interagem com a plataforma. Você pode
                gerenciar suas preferências de cookies a qualquer momento.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-xl font-bold text-brand-dark mb-3">
                6. Alterações nesta política
              </h2>
              <p className="text-brand-slate leading-relaxed">
                Podemos atualizar esta política periodicamente. Notificaremos você sobre
                mudanças significativas por email ou através de um aviso em nosso site.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
