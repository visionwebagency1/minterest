import { Reveal } from '@/components/Reveal'
import { Accent } from '@/components/Accent'

/**
 * Conversion section — the closing call to climb. The website-audit tool
 * (Fase 4) plugs in here later; for now it points to contact.
 */
export function CTA() {
  return (
    <section id="contact" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
        <Reveal>
          <span className="font-sans text-xs uppercase tracking-[0.28em] text-mint">
            Klaar voor de klim?
          </span>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mx-auto mt-6 max-w-3xl text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tight text-cream md:text-6xl">
            Laat ons jouw merk <Accent>omhoog</Accent> brengen.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-7 max-w-xl font-sans text-base leading-relaxed text-white/60 md:text-lg">
            Vertel ons waar je nu staat en waar je heen wil. We sturen je een
            gratis website-audit met concrete groeikansen.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-row flex-wrap justify-center gap-3">
            <a
              href="mailto:hello@minterest.nl"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-emerald to-mint px-8 py-4 font-sans text-sm font-medium text-near-black shadow-lg shadow-emerald/25 transition-transform duration-300 hover:scale-[1.03] md:text-base"
            >
              <span className="relative z-10">Start jouw project</span>
              <svg
                className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M7 17 L17 7" />
                <path d="M8 7 H17 V16" />
              </svg>
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
            </a>
            <a
              href="#work"
              className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-white/15 bg-white/5 px-8 py-4 font-sans text-sm font-medium text-white backdrop-blur-md transition-colors duration-300 hover:border-mint/40 md:text-base"
            >
              <span className="h-1.5 w-1.5 bg-lime-accent" />
              Bekijk ons werk
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
