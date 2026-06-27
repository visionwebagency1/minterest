import { Reveal } from '@/components/Reveal'

/**
 * Intro header right before the services section. Light & premium (matches the
 * brand reference): a centred teal eyebrow and a bold, centred heading with the
 * gradient phrase "onder één dak" on its own line. This is the #diensten scroll
 * target from the hero.
 */

export function ServicesIntro() {
  return (
    <section
      id="diensten"
      className="relative overflow-hidden bg-cream pb-8 pt-24 md:pb-12 md:pt-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <Reveal className="flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-emerald/40" />
          <span className="font-sans text-xs uppercase tracking-[0.28em] text-emerald">
            Meer voor je bedrijf
          </span>
          <span className="h-px w-10 bg-emerald/40" />
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mx-auto mt-8 max-w-4xl text-balance text-center font-display text-[clamp(2rem,5.5vw,4.25rem)] font-semibold leading-[1.04] tracking-tight text-near-black">
            Alles wat je bedrijf nodig heeft om te groeien,{' '}
            <span className="block bg-gradient-to-r from-emerald via-mint to-lime-accent bg-clip-text text-transparent">
              onder één dak.
            </span>
          </h2>
        </Reveal>
      </div>
    </section>
  )
}
