import { Link } from 'react-router-dom'
import { Reveal } from '@/components/Reveal'
import { Accent } from '@/components/Accent'
import { PageHero } from '@/components/PageHero'
import { Footer } from '@/sections/Footer'
import { SERVICES, img } from './servicesData'

const STEPS = [
  { no: '01', title: 'Kennismaken', desc: 'We brengen je doel en markt scherp in beeld.' },
  { no: '02', title: 'Ontwerp', desc: 'Richting, design en prototype, samen aangescherpt.' },
  { no: '03', title: 'Bouwen', desc: 'Schoon gebouwd op een moderne, snelle stack.' },
  { no: '04', title: 'Groeien', desc: 'Live, meten en blijven verbeteren.' },
]

/** Shared, light, extensive template for the four service pages. */
export function ServicePage({ slug }: { slug: keyof typeof SERVICES }) {
  const s = SERVICES[slug]

  return (
    <>
      <PageHero
        kicker={s.kicker}
        title={s.label}
        tagline={s.tagline}
        primary={{ label: 'Start jouw project', to: '/contact' }}
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

        {/* CTA */}
        <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:px-16">
          <Reveal>
            <div className="flex flex-col items-start gap-6 rounded-3xl bg-emerald-deep p-10 text-cream md:flex-row md:items-center md:justify-between md:p-14">
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
        </section>
      </div>

      <Footer />
    </>
  )
}
