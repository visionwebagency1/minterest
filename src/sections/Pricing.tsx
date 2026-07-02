import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Reveal } from '@/components/Reveal'
import { Accent } from '@/components/Accent'

/**
 * Tabbed pricing: one tab per discipline, each with a few realistic options
 * (one-pager / per maand / maatwerk). Light and premium.
 */

const EASE = [0.22, 1, 0.36, 1] as const

type Plan = {
  name: string
  price: string
  unit: string
  tagline: string
  features: string[]
  popular?: boolean
}

const CATEGORIES: { key: string; plans: Plan[] }[] = [
  {
    key: 'Websites',
    plans: [
      { name: 'One-pager', price: '€ 750', unit: 'eenmalig', tagline: 'Eén strakke pagina die overtuigt.', features: ['1 pagina op maat', 'Mobiel-first', 'Basis-SEO', 'Live binnen 2 weken'] },
      { name: 'Groei', price: '€ 99', unit: 'p/m', tagline: 'Volledige site, zonder grote investering vooraf.', features: ['Meerdere pagina’s', 'Hosting & onderhoud', 'Updates inbegrepen', 'Maandelijks opzegbaar'], popular: true },
      { name: 'Maatwerk', price: 'va. € 1.500', unit: 'eenmalig', tagline: 'Volledig op maat ontworpen en gebouwd.', features: ['Maatwerk design', 'Next.js & React', 'SEO & performance', 'Uitbreidbaar platform'] },
    ],
  },
  {
    key: 'Webshops',
    plans: [
      { name: 'Starter', price: '€ 1.500', unit: 'eenmalig', tagline: 'Een complete webshop om mee te starten.', features: ['Shopify of WooCommerce', 'Tot 50 producten', 'Betaal & verzend', 'Basis-SEO'] },
      { name: 'Groei', price: '€ 149', unit: 'p/m', tagline: 'Webshop plus doorlopende optimalisatie.', features: ['Volledige webshop', 'Onderhoud & updates', 'Conversie-optimalisatie', 'Maandelijks opzegbaar'], popular: true },
      { name: 'Maatwerk', price: 'va. € 3.000', unit: 'eenmalig', tagline: 'Schaalbare commerce op maat.', features: ['Maatwerk shop', 'Koppelingen & API’s', 'Performance-first', 'Onbeperkt schaalbaar'] },
    ],
  },
  {
    key: 'Design & branding',
    plans: [
      { name: 'Logo & basis', price: '€ 750', unit: 'eenmalig', tagline: 'Een sterk logo en kernidentiteit.', features: ['Logo & wordmark', 'Kleur & typografie', 'Basis-richtlijnen', '2 revisierondes'] },
      { name: 'Huisstijl', price: '€ 1.500', unit: 'eenmalig', tagline: 'Een compleet merk dat overal klopt.', features: ['Volledige identiteit', 'Designsysteem', 'Merkrichtlijnen', 'Toepassingen'], popular: true },
      { name: 'Maatwerk', price: 'va. € 2.500', unit: 'eenmalig', tagline: 'Branding van strategie tot uitvoering.', features: ['Merkstrategie', 'Art direction', 'Volledig systeem', 'Begeleiding'] },
    ],
  },
  {
    key: 'Short video',
    plans: [
      { name: 'Per video', price: '€ 350', unit: 'per clip', tagline: 'Eén scroll-stoppende clip.', features: ['Concept & script', 'Opname of montage', '1 platform-format', '1 revisieronde'] },
      { name: 'Maandpakket', price: '€ 750', unit: 'p/m', tagline: 'Vier video’s per maand, consistent.', features: ['4 video’s per maand', 'Concept t/m montage', 'Meerdere formats', 'Contentkalender'], popular: true },
      { name: 'Maatwerk', price: 'op aanvraag', unit: '', tagline: 'Volledige videoproductie.', features: ['Volledige productie', 'Regie & set', 'Motion graphics', 'Campagne-afstemming'] },
    ],
  },
]

export function Pricing() {
  const [tab, setTab] = useState(0)
  const plans = CATEGORIES[tab].plans

  return (
    <section className="relative bg-[#EAF4EC] py-28 text-near-black md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <Reveal className="flex items-center justify-center gap-3 text-center md:justify-start md:text-left">
          <span className="font-sans text-xs uppercase tracking-[0.28em] text-emerald-deep/60">
            Pakketten
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-8 max-w-3xl text-balance text-center font-display text-[clamp(2.25rem,5.5vw,4.5rem)] font-semibold leading-[1.03] tracking-tight md:text-left">
            Een plek om te <Accent>beginnen</Accent>.
          </h2>
        </Reveal>

        {/* tabs */}
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap justify-center gap-2 md:justify-start">
            {CATEGORIES.map((c, i) => (
              <button
                key={c.key}
                onClick={() => setTab(i)}
                className={`rounded-full px-5 py-2.5 font-sans text-sm font-semibold transition-colors duration-300 ${
                  i === tab
                    ? 'bg-emerald-deep text-cream'
                    : 'border border-emerald-deep/15 text-near-black/70 hover:border-emerald/50'
                }`}
              >
                {c.key}
              </button>
            ))}
          </div>
        </Reveal>

        {/* plans */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {plans.map((p) => (
              <div
                key={p.name}
                className={`relative flex flex-col rounded-3xl border p-8 transition-transform duration-300 hover:-translate-y-1 md:p-9 ${
                  p.popular
                    ? 'border-emerald bg-emerald-deep text-cream shadow-[0_30px_80px_rgba(1,63,64,0.3)]'
                    : 'border-emerald-deep/10 bg-white text-near-black shadow-[0_18px_50px_rgba(1,63,64,0.08)]'
                }`}
              >
                {p.popular && (
                  <span className="absolute -top-3 left-8 rounded-full bg-lime-bright px-3 py-1 font-sans text-xs font-semibold text-emerald-deep">
                    Populair
                  </span>
                )}
                <h3 className="font-display text-2xl font-semibold">{p.name}</h3>
                <p className={`mt-2 font-sans text-sm ${p.popular ? 'text-cream/70' : 'text-near-black/55'}`}>
                  {p.tagline}
                </p>
                <div className="mt-6 flex items-baseline gap-1.5">
                  <span className="font-display text-4xl font-semibold">{p.price}</span>
                  {p.unit && (
                    <span className={`font-sans text-sm ${p.popular ? 'text-cream/60' : 'text-near-black/50'}`}>
                      {p.unit}
                    </span>
                  )}
                </div>
                <ul className="mt-8 flex flex-1 flex-col gap-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 font-sans text-sm">
                      <svg className={`mt-0.5 h-4 w-4 shrink-0 ${p.popular ? 'text-lime-bright' : 'text-emerald'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12.5 10 17 19 7" />
                      </svg>
                      <span className={p.popular ? 'text-cream/85' : 'text-near-black/70'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/start"
                  className={`mt-9 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-sans text-sm font-semibold transition-transform duration-300 hover:scale-[1.02] ${
                    p.popular
                      ? 'bg-gradient-to-r from-emerald to-emerald-deep text-cream ring-1 ring-mint/40'
                      : 'bg-emerald-deep text-cream'
                  }`}
                >
                  Kies {p.name}
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
