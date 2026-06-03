import { Hero } from './Hero'
import { LogoMarquee } from './LogoMarquee'
import { IntroStatement } from './IntroStatement'
import { ServicesPinned } from './ServicesPinned'
import { Showcase } from './Showcase'
import { Process } from './Process'
import { Stats } from './Stats'
import { CTA } from './CTA'
import { Footer } from './Footer'

/**
 * Homepage. Fase 2 rebuild — "The Climb": the page rises from the dark hero
 * through a transition (marquee + statement) into the light services section.
 * Sections below ServicesPinned are still the previous versions and get rebuilt
 * next (showcase mockups, climbing process line, impact, one-team, audit CTA).
 */
export function Home() {
  return (
    <main className="relative w-full">
      <Hero />
      <LogoMarquee />
      <IntroStatement />
      <ServicesPinned />

      {/* TODO Fase 2 (vervolg): showcase-mockups · proceslijn · impact · team · audit */}
      <div
        className="relative"
        style={{
          backgroundImage:
            'linear-gradient(180deg, #EFF1E7 0%, #0B241F 12%, #0F3E35 55%, #0A1512 100%)',
        }}
      >
        <Showcase />
        <Process />
        <Stats />
        <CTA />
      </div>

      <Footer />
    </main>
  )
}
