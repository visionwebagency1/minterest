import { ScrollGradient } from '@/components/ScrollGradient'
import { SiteContentProvider } from '@/content/SiteContent'
import { Hero } from './Hero'
import { LogoMarquee } from './LogoMarquee'
import { ServicesIntro } from './ServicesIntro'
import { ServicesShowcase } from './ServicesShowcase'
import { AbonnementBand } from './abonnement/AbonnementBand'
import { Showcase } from './Showcase'
import { Approach } from './Approach'
import { Testimonials } from './Testimonials'
import { Faq } from './Faq'
import { CtaBand } from './CtaBand'
import { Footer } from './Footer'

/**
 * Homepage — "The Climb": from the dark hero up through a bright, fresh middle
 * (cream sections with green accents) to the dark audit climax and footer.
 */
export function Home() {
  return (
    <SiteContentProvider page="home">
      <main className="relative w-full bg-near-black">
        <ScrollGradient />
        <Hero />
        <LogoMarquee />
        <ServicesIntro />
        <ServicesShowcase />
        {/* Meteen onder de diensten: de kortere route voor wie geen maatwerk zoekt. */}
        <AbonnementBand />
        <Showcase />
        <Approach />
        <Testimonials />
        <Faq />
        <CtaBand />
        <Footer />
      </main>
    </SiteContentProvider>
  )
}
