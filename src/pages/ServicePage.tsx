import { Link } from 'react-router-dom'
import { Reveal } from '@/components/Reveal'
import { Accent } from '@/components/Accent'
import { PageShell } from './PageShell'
import { SERVICES } from './servicesData'

/**
 * Shared template for the four service pages. Each route passes a slug; the
 * content comes from servicesData.
 */
export function ServicePage({ slug }: { slug: keyof typeof SERVICES }) {
  const s = SERVICES[slug]

  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        {/* Breadcrumb */}
        <Reveal className="flex items-center gap-3">
          <Link
            to="/"
            className="font-sans text-xs uppercase tracking-[0.22em] text-white/40 transition-colors hover:text-white/70"
          >
            Home
          </Link>
          <span className="text-white/25">/</span>
          <span className="font-sans text-xs uppercase tracking-[0.22em] text-mint/80">
            Dienst {s.no}
          </span>
        </Reveal>

        {/* Hero */}
        <Reveal delay={0.05}>
          <h1 className="mt-8 max-w-4xl text-balance font-display text-4xl font-semibold leading-[1.04] tracking-tight text-cream md:text-6xl lg:text-7xl">
            {s.label}
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl font-accent text-xl italic text-mint md:text-2xl">
            {s.tagline}
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-8 max-w-2xl font-sans text-base leading-relaxed text-white/60 md:text-lg">
            {s.intro}
          </p>
        </Reveal>

        {/* Deliverables */}
        <div className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-2">
          {s.deliverables.map((d, i) => (
            <Reveal
              key={d.title}
              delay={i * 0.06}
              className="group bg-near-black/40 p-8 transition-colors duration-300 hover:bg-white/[0.04] md:p-10"
            >
              <span className="font-accent text-2xl italic text-mint/70">
                0{i + 1}
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-cream md:text-2xl">
                {d.title}
              </h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-white/55 md:text-base">
                {d.desc}
              </p>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal delay={0.1}>
          <div className="mt-20 flex flex-col items-start gap-6 rounded-2xl border border-white/10 bg-white/[0.03] p-10 md:flex-row md:items-center md:justify-between">
            <h2 className="max-w-xl text-balance font-display text-2xl font-semibold text-cream md:text-3xl">
              Klaar om hiermee te <Accent>klimmen</Accent>?
            </h2>
            <Link
              to="/contact"
              className="group inline-flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-emerald to-mint px-7 py-4 font-sans text-sm font-medium text-near-black shadow-lg shadow-emerald/25 transition-transform duration-300 hover:scale-[1.03] md:text-base"
            >
              Start jouw project
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                &rarr;
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </PageShell>
  )
}
