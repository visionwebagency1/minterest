import { Reveal } from '@/components/Reveal'

/**
 * The Minterest way of working — four ascending stages, shown as a connected
 * row on desktop and a stacked list on mobile.
 */

const STEPS = [
  { no: '01', title: 'Ontdekken', desc: 'We duiken in je markt, doel en publiek. Geen aannames, eerst inzicht.' },
  { no: '02', title: 'Strategie', desc: 'We bepalen de route omhoog: positionering, prioriteiten en kanalen.' },
  { no: '03', title: 'Bouwen', desc: 'Design, development, video en content, ambachtelijk en op tempo.' },
  { no: '04', title: 'Laten groeien', desc: 'Meten, bijsturen, opschalen. Momentum dat blijft klimmen.' },
]

export function Process() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <Reveal className="flex items-center gap-3">
          <span className="h-px w-10 bg-mint/50" />
          <span className="font-sans text-xs uppercase tracking-[0.28em] text-white/55">
            [05] Onze aanpak
          </span>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-8 max-w-2xl text-balance font-display text-3xl font-semibold leading-[1.1] tracking-tight text-cream md:text-5xl">
            Van inzicht naar momentum.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal
              key={s.no}
              delay={i * 0.08}
              className="group relative bg-near-black/40 p-8 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <span className="font-accent text-3xl italic text-mint/80">{s.no}</span>
              <h3 className="mt-5 font-display text-xl font-semibold text-cream">
                {s.title}
              </h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-white/55">
                {s.desc}
              </p>
              {/* subtle upward tick on hover */}
              <span className="absolute right-6 top-8 text-mint opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                &#8599;
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
