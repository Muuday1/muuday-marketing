export function Footer() {
  return (
    <footer className="bg-brand-dark text-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-brand-lime flex items-center justify-center">
                <span className="text-brand-dark font-bold text-sm">BG</span>
              </div>
              <span className="font-display text-xl">Brasil Global</span>
            </div>
            <p className="text-brand-slate text-sm">
              A comunidade definitiva para brasileiros que conquistam o mundo.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Conteúdo</h4>
            <ul className="space-y-2 text-sm text-brand-slate">
              <li><a href="#" className="hover:text-white transition-colors">Artigos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Podcast</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Guias</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Newsletter</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Comunidade</h4>
            <ul className="space-y-2 text-sm text-brand-slate">
              <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Eventos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Ambassadors</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Parcerias</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-brand-slate">
              <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Termos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-brand-slate">
            &copy; {new Date().getFullYear()} Brasil Global. Todos os direitos reservados.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-brand-slate hover:text-white transition-colors">Instagram</a>
            <a href="#" className="text-brand-slate hover:text-white transition-colors">TikTok</a>
            <a href="#" className="text-brand-slate hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="text-brand-slate hover:text-white transition-colors">Spotify</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
