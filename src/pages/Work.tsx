import { Reveal } from '@/components/Reveal'
import { Accent } from '@/components/Accent'
import { Showcase } from '@/sections/Showcase'
import { PageShell } from './PageShell'

const CATS = ['Alles', 'Websites', 'Webshops', 'Branding', 'Video']

/** Portfolio overview (light). Hero + category chips + the showcase grid. */
export function Work() {
  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <Reveal className="flex items-center gap-3">
          <span className="h-px w-10 bg-emerald/50" />
          <span className="font-sans text-xs uppercase tracking-[0.28em] text-emerald-deep/60">
            Geselecteerd werk
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-8 max-w-4xl text-balance font-display text-[clamp(2.5rem,7vw,6rem)] font-semibold leading-[1.0] tracking-tight">
            Merken die zijn gaan <Accent>klimmen.</Accent>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-near-black/65 md:text-lg">
            Een greep uit het werk waarmee we interesse in groei veranderden.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap gap-2.5">
            {CATS.map((c, i) => (
              <span
                key={c}
                className={`cursor-default rounded-full border px-5 py-2 font-sans text-sm font-medium transition-colors ${
                  i === 0
                    ? 'border-emerald-deep bg-emerald-deep text-cream'
                    : 'border-emerald-deep/15 text-near-black/70 hover:border-emerald/50'
                }`}
              >
                {c}
              </span>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="-mt-10">
        <Showcase />
      </div>
    </PageShell>
  )
}
