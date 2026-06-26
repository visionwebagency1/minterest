import { Link } from 'react-router-dom'
import { Reveal } from '@/components/Reveal'

/**
 * Intro header right before the services section. Light & premium (matches the
 * brand reference): a teal kicker, a bold heading with one gradient word, and a
 * "Bekijk alle diensten" link. This is the #diensten scroll target from the hero.
 */

export function ServicesIntro() {
  return (
    <section
      id="diensten"
      className="relative overflow-hidden bg-cream pb-8 pt-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <Reveal className="flex items-center gap-3">
          <span className="h-px w-10 bg-emerald/40" />
          <span className="font-sans text-xs uppercase tracking-[0.28em] text-emerald">
            Meer voor je bedrijf
          </span>
        </Reveal>

        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal delay={0.05}>
            <h2 className="max-w-3xl text-balance font-display text-[clamp(2rem,5.5vw,4.25rem)] font-semibold leading-[1.04] tracking-tight text-near-black">
              Alles wat je bedrijf nodig heeft om te groeien,{' '}
              <span className="bg-gradient-to-r from-emerald via-mint to-lime-accent bg-clip-text text-transparent">
                onder een dak
              </span>
              .
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="shrink-0">
            <Link
              to="/diensten"
              className="group inline-flex items-center gap-2 font-sans text-sm font-semibold text-near-black transition-colors duration-300 hover:text-emerald"
            >
              Ontdek onze groeidiensten
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
