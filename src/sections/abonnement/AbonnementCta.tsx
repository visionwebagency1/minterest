import { Reveal } from '@/components/Reveal'
import { LogoMark } from '@/components/Logo'
import { WEBSITE_SUBSCRIPTION } from '@/data/websitePlans'

/**
 * Closing call to action: the dark contrast moment with the brand M, right
 * before the footer.
 */
export function AbonnementCta({ onStart }: { onStart: () => void }) {
  return (
    <section
      className="relative overflow-hidden py-28 text-cream md:py-36"
      style={{
        backgroundImage:
          'radial-gradient(70% 80% at 80% 0%, rgba(66,194,140,0.3), transparent 60%), linear-gradient(160deg, #013F40 0%, #071311 100%)',
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-1/2 -translate-y-1/2 md:-right-10"
      >
        <LogoMark className="h-[clamp(16rem,44vw,30rem)] w-auto opacity-[0.07]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <Reveal>
          <span className="font-sans text-xs uppercase tracking-[0.28em] text-mint/80">
            {WEBSITE_SUBSCRIPTION.name}
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-8 max-w-3xl text-balance font-display text-[clamp(2.25rem,5.5vw,4.5rem)] font-semibold leading-[1.03] tracking-tight">
            Volgende maand staat jouw site online.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-7 max-w-xl font-sans text-lg leading-relaxed text-cream/65">
            Kies een plan, kies je template en vul je gegevens in. Wij doen de rest.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <button
            type="button"
            onClick={onStart}
            className="group relative mt-10 inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-mint to-lime-accent px-8 py-4 font-sans text-base font-semibold text-emerald-deep shadow-lg shadow-emerald/25 transition-transform duration-300 hover:scale-[1.03]"
          >
            <span className="relative z-10">Bekijk de plannen</span>
            <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">
              &rarr;
            </span>
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
          </button>
        </Reveal>
      </div>
    </section>
  )
}
