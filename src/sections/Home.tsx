import { Hero } from './Hero'
import { LogoMarquee } from './LogoMarquee'
import { IntroStatement } from './IntroStatement'
import { ServicesIntro } from './ServicesIntro'
import { ServicesPinned } from './ServicesPinned'
import { Showcase } from './Showcase'
import { Approach } from './Approach'
import { Stats } from './Stats'
import { Testimonials } from './Testimonials'
import { Pricing } from './Pricing'
import { Faq } from './Faq'
import { CtaBand } from './CtaBand'
import { Footer } from './Footer'

/**
 * Homepage — "The Climb": from the dark hero up through a bright, fresh middle
 * (cream sections with green accents) to the dark audit climax and footer.
 */
export function Home() {
  return (
    <main className="relative w-full">
      <Hero />
      <LogoMarquee />
      <IntroStatement />
      <ServicesIntro />
      <ServicesPinned />
      <Showcase />
      <Approach />
      <Stats />
      <Testimonials />
      <Pricing />
      <Faq />
      <CtaBand />
      <Footer />
    </main>
  )
}
