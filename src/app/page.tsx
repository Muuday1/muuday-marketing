import { HeroSection } from '@/components/sections/HeroSection'
import { ContentPillars } from '@/components/sections/ContentPillars'
import { LatestContent } from '@/components/sections/LatestContent'
import { CommunityCTA } from '@/components/sections/CommunityCTA'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ContentPillars />
        <LatestContent />
        <CommunityCTA />
      </main>
      <Footer />
    </div>
  )
}
