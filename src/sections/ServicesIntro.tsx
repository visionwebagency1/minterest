import { Reveal } from '@/components/Reveal'
import { Accent } from '@/components/Accent'
import { MAIN_SERVICES } from '@/data/services'

/**
 * Intro header right before the services section: a clear, premium text box
 * (kicker + heading + short subline + a preview list of the six main services)
 * that sets up what's coming. Dark, so it flows into the top of the services
 * section. This is the #diensten scroll target from the hero.
 */

const SERVICES = MAIN_SERVICES.map((s) => s.label)

export function ServicesIntro() {
  return (
    <section
      id="diensten"
      className="relative overflow-hidden bg-ink py-24 md:py-32"
      style={{
        backgroundImage:
          'radial-gradient(110% 80% at 50% 0%, rgba(31,166,122,0.16), transparent 60%), linear-gradient(180deg, #08120F 0%, #0A1B16 100%)',
      }}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <Reveal className="flex items-center gap-3">
          <span className="h-px w-10 bg-mint/50" />
          <span className="font-sans text-xs uppercase tracking-[0.28em] text-mint/80">
            Onze diensten
          </span>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-8 max-w-3xl text-balance font-display text-[clamp(2rem,5.5vw,4.25rem)] font-semibold leading-[1.04] tracking-tight text-cream">
            Zes diensten, één <Accent>opwaartse</Accent> beweging.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-7 max-w-2xl font-sans text-lg leading-relaxed text-cream/65 md:text-xl">
            Van een razendsnelle website tot scroll-stoppende video, sterke
            branding en vindbaarheid die klanten oplevert. Elke dienst haakt in op
            de volgende, samen tillen ze je merk stap voor stap hoger.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2.5 font-sans text-sm text-cream/45 md:mt-12 md:text-base">
            {SERVICES.map((s) => (
              <li key={s} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-mint/60" aria-hidden="true" />
                {s}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
