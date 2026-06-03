import { Link } from 'react-router-dom'
import { Reveal } from '@/components/Reveal'
import { Accent } from '@/components/Accent'
import { PageShell } from './PageShell'
import { SERVICES } from './servicesData'

const STEPS = [
  { no: '01', title: 'Kennismaken', desc: 'We brengen je doel en markt scherp in beeld.' },
  { no: '02', title: 'Ontwerp', desc: 'Richting, design en prototype, samen aangescherpt.' },
  { no: '03', title: 'Bouwen', desc: 'Schoon gebouwd op een moderne, snelle stack.' },
  { no: '04', title: 'Groeien', desc: 'Live, meten en blijven verbeteren.' },
]

/** Shared, light template for the four service pages (content from servicesData). */
export function ServicePage({ slug }: { slug: keyof typeof SERVICES }) {
  const s = SERVICES[slug]

  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        {/* kicker, not a breadcrumb */}
        <Reveal className="flex items-center gap-3">
          <span className="h-px w-10 bg-emerald/50" />
          <span className="font-sans text-xs uppercase tracking-[0.28em] text-emerald-deep/60">
            {s.kicker}
          </span>
        </Reveal>

        {/* hero */}
        <Reveal delay={0.05}>
          <h1 className="mt-8 max-w-4xl text-balance font-display text-[clamp(2.5rem,7vw,6rem)] font-semibold leading-[1.0] tracking-tight">
            {s.label}
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl font-accent text-xl italic text-emerald md:text-2xl">
            {s.tagline}
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-8 max-w-2xl font-sans text-base leading-relaxed text-near-black/65 md:text-lg">
            {s.intro}
          </p>
        </Reveal>

        {/* what we do */}
        <Reveal delay={0.05}>
          <h2 className="mt-24 font-display text-2xl font-semibold md:text-3xl">Wat we doen</h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {s.deliverables.map((d, i) => (
            <Reveal
              key={d.title}
              delay={i * 0.06}
              className="rounded-2xl border border-emerald-deep/10 bg-white p-8 shadow-[0_18px_50px_rgba(15,92,77,0.08)] md:p-10"
            >
              <span className="font-accent text-2xl italic text-emerald">0{i + 1}</span>
              <h3 className="mt-3 font-display text-xl font-semibold md:text-2xl">{d.title}</h3>
              <p className="mt-3 font-sans text-base leading-relaxed text-near-black/60">{d.desc}</p>
            </Reveal>
          ))}
        </div>

        {/* mini process */}
        <Reveal delay={0.05}>
          <h2 className="mt-24 font-display text-2xl font-semibold md:text-3xl">Zo werken we</h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {STEPS.map((st, i) => (
            <Reveal key={st.no} delay={i * 0.06}>
              <span className="font-accent text-3xl italic text-emerald/70">{st.no}</span>
              <h3 className="mt-3 font-display text-lg font-semibold">{st.title}</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-near-black/55">{st.desc}</p>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal delay={0.1}>
          <div className="mt-24 flex flex-col items-start gap-6 rounded-3xl bg-emerald-deep p-10 text-cream md:flex-row md:items-center md:justify-between md:p-12">
            <h2 className="max-w-xl text-balance font-display text-2xl font-semibold md:text-4xl">
              Klaar om hiermee te <Accent>klimmen</Accent>?
            </h2>
            <Link
              to="/contact"
              className="group inline-flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-mint to-lime-bright px-8 py-4 font-sans text-base font-semibold text-emerald-deep transition-transform duration-300 hover:scale-[1.03]"
            >
              Start jouw project
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </PageShell>
  )
}
