import { Link } from 'react-router-dom'
import { Reveal } from '@/components/Reveal'
import { Accent } from '@/components/Accent'

/**
 * Three pricing tiers, light and premium. The middle tier ("Grow") is
 * highlighted as most popular. Indicative pricing — fits the new model.
 */

const TIERS = [
  {
    name: 'Start',
    price: '€ 295',
    unit: 'p/m',
    tagline: 'Voor ZZP en starters die online willen.',
    features: ['Strakke onepager of starterssite', 'Hosting en onderhoud', 'Basis-SEO', 'Maandelijks opzegbaar'],
    popular: false,
  },
  {
    name: 'Grow',
    price: '€ 695',
    unit: 'p/m',
    tagline: 'Voor merken die echt willen groeien.',
    features: ['Volledige website of webshop', 'SEO en contentplan', 'Short video per maand', 'Doorlopende optimalisatie'],
    popular: true,
  },
  {
    name: 'Pro',
    price: 'Op maat',
    unit: '',
    tagline: 'Premium maatwerk, flexibele betaling.',
    features: ['Maatwerk design en development', 'Branding, video en influence', 'Dedicated team', 'Flexibele afspraken'],
    popular: false,
  },
]

export function Pricing() {
  return (
    <section className="relative bg-[#EEF1E7] py-28 text-near-black md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <Reveal className="flex items-center gap-3">
          <span className="h-px w-10 bg-emerald/50" />
          <span className="font-sans text-xs uppercase tracking-[0.28em] text-emerald-deep/60">
            Pakketten
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-8 max-w-3xl text-balance font-display text-[clamp(2.25rem,5.5vw,4.5rem)] font-semibold leading-[1.03] tracking-tight">
            Een plek om te <Accent>beginnen</Accent>.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TIERS.map((t, i) => (
            <Reveal
              key={t.name}
              delay={i * 0.08}
              className={`relative flex flex-col rounded-3xl border p-8 transition-transform duration-300 hover:-translate-y-1 md:p-9 ${
                t.popular
                  ? 'border-emerald bg-emerald-deep text-cream shadow-[0_30px_80px_rgba(15,92,77,0.3)]'
                  : 'border-emerald-deep/10 bg-white text-near-black shadow-[0_18px_50px_rgba(15,92,77,0.08)]'
              }`}
            >
              {t.popular && (
                <span className="absolute -top-3 left-8 rounded-full bg-lime-bright px-3 py-1 font-sans text-xs font-semibold text-emerald-deep">
                  Populair
                </span>
              )}
              <h3 className="font-display text-2xl font-semibold">{t.name}</h3>
              <p className={`mt-2 font-sans text-sm ${t.popular ? 'text-cream/70' : 'text-near-black/55'}`}>
                {t.tagline}
              </p>
              <div className="mt-6 flex items-baseline gap-1.5">
                <span className="font-display text-4xl font-semibold">{t.price}</span>
                {t.unit && (
                  <span className={`font-sans text-sm ${t.popular ? 'text-cream/60' : 'text-near-black/50'}`}>
                    {t.unit}
                  </span>
                )}
              </div>
              <ul className="mt-8 flex flex-1 flex-col gap-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 font-sans text-sm">
                    <svg className={`mt-0.5 h-4 w-4 shrink-0 ${t.popular ? 'text-lime-bright' : 'text-emerald'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12.5 10 17 19 7" />
                    </svg>
                    <span className={t.popular ? 'text-cream/85' : 'text-near-black/70'}>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className={`mt-9 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-sans text-sm font-semibold transition-transform duration-300 hover:scale-[1.02] ${
                  t.popular
                    ? 'bg-gradient-to-r from-mint to-lime-bright text-emerald-deep'
                    : 'bg-emerald-deep text-cream'
                }`}
              >
                Kies {t.name}
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
