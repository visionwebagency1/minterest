import { Link } from 'react-router-dom'
import { Reveal } from '@/components/Reveal'
import { Accent } from '@/components/Accent'
import { PageHero } from '@/components/PageHero'
import { BorderBeam } from '@/components/BorderBeam'
import { Footer } from '@/sections/Footer'
import { SERVICES, img } from './servicesData'
import { EXTRAS } from './serviceExtras'

const STEPS = [
  { no: '01', title: 'Kennismaken', desc: 'We brengen je doel en markt scherp in beeld.' },
  { no: '02', title: 'Ontwerp', desc: 'Richting, design en prototype, samen aangescherpt.' },
  { no: '03', title: 'Bouwen', desc: 'Schoon gebouwd op een moderne, snelle stack.' },
  { no: '04', title: 'Groeien', desc: 'Live, meten en blijven verbeteren.' },
]

/** Shared, light, extensive template for the four service pages. */
export function ServicePage({ slug }: { slug: keyof typeof SERVICES }) {
  const s = SERVICES[slug]
  const x = EXTRAS[slug]

  return (
    <>
      <PageHero
        kicker={s.kicker}
        title={s.label}
        tagline={s.tagline}
        primary={{ label: 'Start jouw project', to: '/start' }}
        secondary={{ label: 'Bekijk werk', to: '/work' }}
      />

      <div className="bg-cream text-near-black">
        {/* intro statement */}
        <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32 lg:px-16">
          <Reveal>
            <p className="max-w-3xl text-balance font-display text-[clamp(1.6rem,3.4vw,2.6rem)] font-medium leading-[1.2] tracking-tight text-near-black">
              {s.intro}
            </p>
          </Reveal>
        </section>

        {/* audit callout (websites only) */}
        {slug === 'websites' && (
          <section className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
            <Reveal>
              <div className="flex flex-col items-start gap-5 rounded-3xl border border-emerald/30 bg-white p-8 shadow-[0_18px_50px_rgba(15,92,77,0.1)] md:flex-row md:items-center md:justify-between md:p-10">
                <div>
                  <h3 className="font-display text-xl font-semibold md:text-2xl">Benieuwd hoe jouw site nu scoort?</h3>
                  <p className="mt-2 font-sans text-near-black/60">Ontvang gratis een audit met concrete groeikansen, binnen 24 uur.</p>
                </div>
                <Link
                  to="/website-audit"
                  className="group relative inline-flex shrink-0 items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-emerald to-mint px-7 py-3.5 font-sans text-sm font-semibold text-near-black shadow-lg shadow-emerald/25 transition-transform duration-300 hover:scale-[1.03]"
                >
                  <BorderBeam rx={12} />
                  <span className="relative z-10">Gratis website-audit</span>
                  <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
                  <span className="pointer-events-none absolute inset-0 z-10 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                </Link>
              </div>
            </Reveal>
          </section>
        )}

        {/* features with photos, alternating */}
        <section className="bg-[#EEF1E7] py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
            <Reveal className="flex items-center gap-3">
              <span className="h-px w-10 bg-emerald/50" />
              <span className="font-sans text-xs uppercase tracking-[0.28em] text-emerald-deep/60">
                Wat we doen
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-8 max-w-2xl text-balance font-display text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.04] tracking-tight">
                Alles wat <Accent>{s.label.toLowerCase()}</Accent> sterk maakt.
              </h2>
            </Reveal>

            <div className="mt-20 flex flex-col gap-20 md:gap-28">
              {s.features.map((f, i) => (
                <div
                  key={f.title}
                  className={`grid items-center gap-8 md:grid-cols-2 md:gap-16 ${
                    i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
                  }`}
                >
                  <Reveal>
                    <div className="relative aspect-[5/4] overflow-hidden rounded-3xl shadow-[0_30px_70px_rgba(15,92,77,0.18)]">
                      <img
                        src={img(f.img)}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-emerald-deep/25 mix-blend-multiply" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-deep/40 via-transparent to-mint/10" />
                    </div>
                  </Reveal>
                  <Reveal delay={0.08}>
                    <span className="font-accent text-3xl italic text-emerald">0{i + 1}</span>
                    <h3 className="mt-3 font-display text-3xl font-semibold leading-tight md:text-4xl">
                      {f.title}
                    </h3>
                    <p className="mt-4 max-w-md font-sans text-lg leading-relaxed text-near-black/65">
                      {f.desc}
                    </p>
                  </Reveal>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* what's included */}
        <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-28 lg:px-16">
          <Reveal delay={0.05}>
            <h2 className="font-display text-2xl font-semibold md:text-3xl">Wat zit erin</h2>
          </Reveal>
          <div className="mt-10 flex flex-wrap gap-3">
            {s.deliverables.map((d, i) => (
              <Reveal key={d} delay={i * 0.04}>
                <span className="inline-flex items-center gap-2.5 rounded-full border border-emerald/30 bg-white px-5 py-2.5 font-sans text-sm font-medium text-emerald-deep shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
                  {d}
                </span>
              </Reveal>
            ))}
          </div>
        </section>

        {/* how we work */}
        <section className="bg-[#EEF1E7] py-24 md:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
            <Reveal delay={0.05}>
              <h2 className="font-display text-2xl font-semibold md:text-3xl">Zo werken we</h2>
            </Reveal>
            <div className="mt-12 grid grid-cols-2 gap-8 lg:grid-cols-4">
              {STEPS.map((st, i) => (
                <Reveal key={st.no} delay={i * 0.06}>
                  <span className="font-accent text-3xl italic text-emerald/70">{st.no}</span>
                  <h3 className="mt-3 font-display text-lg font-semibold">{st.title}</h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-near-black/55">{st.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* how we approach it (per service) */}
        <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-28 lg:px-16">
          <Reveal delay={0.05}>
            <h2 className="font-display text-2xl font-semibold md:text-3xl">Zo pakken wij dit aan</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
            {x.why.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.08}>
                <span className="font-accent text-3xl italic text-emerald">{`0${i + 1}`}</span>
                <h3 className="mt-3 font-display text-xl font-semibold">{w.title}</h3>
                <p className="mt-3 font-sans text-base leading-relaxed text-near-black/60">{w.desc}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* per-service review (green) */}
        <section
          className="relative overflow-hidden py-24 text-cream md:py-32"
          style={{
            backgroundImage:
              'radial-gradient(60% 60% at 25% 0%, rgba(79,216,155,0.25), transparent 60%), linear-gradient(160deg, #0F5C4D 0%, #08120F 100%)',
          }}
        >
          <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
            <div className="mb-7 flex justify-center gap-1 text-lime-bright">
              {[0, 1, 2, 3, 4].map((st) => (
                <svg key={st} viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M12 2l2.9 6.3 6.8.6-5.1 4.5 1.5 6.7L12 17.8 5.9 20.6l1.5-6.7L2.3 8.9l6.8-.6L12 2Z" />
                </svg>
              ))}
            </div>
            <Reveal>
              <blockquote className="text-balance font-display text-[clamp(1.6rem,4vw,3rem)] font-semibold leading-[1.15] text-cream">
                {x.review.quote}
              </blockquote>
            </Reveal>
            <div className="mt-8 flex items-center justify-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-mint/20 font-display text-lg font-semibold text-lime-bright ring-1 ring-mint/30">
                {x.review.initials}
              </span>
              <div className="text-left">
                <div className="font-sans font-semibold text-cream">{x.review.name}</div>
                <div className="font-sans text-sm text-cream/55">{x.review.role}</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA: centred, gradient, animated button */}
        <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:px-16">
          <Reveal>
            <div
              className="flex flex-col items-center gap-7 rounded-3xl p-10 text-center text-cream md:p-16"
              style={{
                backgroundImage:
                  'radial-gradient(70% 90% at 50% 0%, rgba(79,216,155,0.32), transparent 60%), linear-gradient(160deg, #0F5C4D 0%, #0A3329 100%)',
              }}
            >
              <h2 className="max-w-xl text-balance font-display text-[clamp(1.75rem,4vw,3rem)] font-semibold">
                Klaar om hiermee te <Accent>klimmen</Accent>?
              </h2>
              <Link
                to="/start"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-mint to-lime-bright px-8 py-4 font-sans text-base font-semibold text-emerald-deep shadow-lg shadow-mint/30 transition-transform duration-300 hover:scale-[1.03]"
              >
                <BorderBeam rx={12} />
                <span className="relative z-10">Start jouw project</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
                <span className="pointer-events-none absolute inset-0 z-10 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
              </Link>
            </div>
          </Reveal>
        </section>
      </div>

      <Footer />
    </>
  )
}
