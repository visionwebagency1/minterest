import { Reveal } from '@/components/Reveal'
import { Accent } from '@/components/Accent'
import { Showcase } from '@/sections/Showcase'
import { PageShell } from './PageShell'

/** Portfolio overview. Reuses the homepage showcase grid below an intro. */
export function Work() {
  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <Reveal className="flex items-center gap-3">
          <span className="h-px w-10 bg-mint/50" />
          <span className="font-sans text-xs uppercase tracking-[0.28em] text-white/55">
            Werk
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-8 max-w-4xl text-balance font-display text-4xl font-semibold leading-[1.04] tracking-tight text-cream md:text-6xl lg:text-7xl">
            Merken die zijn gaan <Accent>klimmen</Accent>.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/60 md:text-lg">
            Een greep uit het werk waarmee we interesse in groei veranderden.
          </p>
        </Reveal>
      </div>

      <div className="-mt-8">
        <Showcase />
      </div>
    </PageShell>
  )
}
