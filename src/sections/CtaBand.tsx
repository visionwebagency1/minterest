import { Link } from 'react-router-dom'
import { Reveal } from '@/components/Reveal'
import { Accent } from '@/components/Accent'
import { BorderBeam } from '@/components/BorderBeam'

/**
 * Closing climax: full-bleed, dark, strong typography. Drives to the project
 * intake, with the free audit as a secondary path.
 */
export function CtaBand() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-ink py-28 text-cream md:py-40"
      style={{
        backgroundImage:
          'radial-gradient(60% 60% at 50% 0%, rgba(31,166,122,0.28), transparent 60%), radial-gradient(50% 50% at 85% 100%, rgba(79,216,155,0.18), transparent 60%)',
      }}
    >
      <div className="mx-auto max-w-5xl px-6 text-center md:px-10">
        <Reveal>
          <span className="font-sans text-xs uppercase tracking-[0.3em] text-mint">
            Waar interesse je groei wordt
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mx-auto mt-6 max-w-4xl text-balance font-display text-[clamp(2.5rem,8vw,7rem)] font-semibold leading-[0.98] tracking-tight">
            Klaar om te <Accent>klimmen?</Accent>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-7 max-w-xl font-sans text-base leading-relaxed text-cream/60 md:text-lg">
            Vertel ons over je project, of laat ons eerst gratis naar je huidige
            site kijken. De eerste stap omhoog is zo gezet.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-row flex-wrap justify-center gap-3">
            <Link
              to="/start"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-emerald to-mint px-8 py-4 font-sans text-base font-semibold text-near-black shadow-lg shadow-emerald/30 transition-transform duration-300 hover:scale-[1.03]"
            >
              <BorderBeam rx={12} />
              <span className="relative z-10">Start jouw project</span>
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
              <span className="pointer-events-none absolute inset-0 z-10 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
            </Link>
            <Link
              to="/website-audit"
              className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-white/15 bg-white/5 px-8 py-4 font-sans text-base font-medium text-cream backdrop-blur-md transition-colors duration-300 hover:border-mint/40"
            >
              <span className="h-1.5 w-1.5 bg-lime-accent" />
              Gratis website-audit
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
