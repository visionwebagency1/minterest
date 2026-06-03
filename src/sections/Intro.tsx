import { Reveal } from '@/components/Reveal'
import { Accent } from '@/components/Accent'

/**
 * Manifesto intro — the first beat after the hero. States the "upward climb"
 * idea in one editorial statement before the services unfold as steps.
 */
export function Intro() {
  return (
    <section className="relative py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <Reveal className="flex items-center gap-3">
          <span className="h-px w-10 bg-mint/50" />
          <span className="font-sans text-xs uppercase tracking-[0.28em] text-white/55">
            [02] De opwaartse klim
          </span>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-8 max-w-4xl text-balance font-display text-3xl font-semibold leading-[1.1] tracking-tight text-cream md:text-5xl lg:text-6xl">
            Aandacht is vluchtig. <Accent>Groei</Accent> is een keuze:
            opgebouwd, stap voor stap, altijd <Accent>omhoog</Accent>.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-9 max-w-xl font-sans text-base leading-relaxed text-white/60 md:text-lg">
            Minterest is een digitaal groeibureau dat interesse omzet in
            momentum. We bundelen website, merk, video en influence tot één
            bewuste klim. Elke beweging leunt naar rechtsboven.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
