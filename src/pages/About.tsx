import { Link } from 'react-router-dom'
import { Reveal } from '@/components/Reveal'
import { Accent } from '@/components/Accent'
import { PageHero } from '@/components/PageHero'
import { Footer } from '@/sections/Footer'
import { MAIN_SERVICES } from '@/data/services'

const BRANCHES = MAIN_SERVICES.map((s) => ({
  title: s.label,
  desc: s.cardDesc,
  to: `/diensten/${s.slug}`,
}))

const SUPPORT = [
  { title: 'Administratie', desc: 'We ontzorgen partners op de achtergrond, zodat de focus op groei blijft.' },
  { title: 'Sourcing & inkoop', desc: 'De juiste mensen en middelen, slim ingekocht en geregeld.' },
]

const VALUES = [
  { title: 'Eén team, geen overdrachten', desc: 'Strategie, design, build en groei zitten aan dezelfde tafel.' },
  { title: 'Resultaat boven ruis', desc: 'We maken keuzes die je merk laten groeien, niet alleen mooi ogen.' },
  { title: 'Altijd omhoog', desc: 'We blijven meten en verbeteren, lang nadat het live staat.' },
]

/** About / studio page: dark hero + light story (values, branches, support). */
export function About() {
  return (
    <>
      <PageHero
        kicker="De studio"
        title={
          <>
            Eén partner voor de hele <Accent>klim.</Accent>
          </>
        }
        tagline="Bij Minterest wordt interesse je groei. Zes diensten onder één dak, van merk en website tot social en vindbaarheid, plus alles eromheen geregeld."
        primary={{ label: 'Werk met ons', to: '/start' }}
        secondary={{ label: 'Bekijk werk', to: '/work' }}
      />

      <div className="bg-cream text-near-black">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32 lg:px-16">
          {/* values */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <span className="font-accent text-3xl italic text-emerald">{`0${i + 1}`}</span>
                <h3 className="mt-3 font-display text-2xl font-semibold">{v.title}</h3>
                <p className="mt-3 font-sans text-base leading-relaxed text-near-black/60">{v.desc}</p>
              </Reveal>
            ))}
          </div>

          {/* the six services */}
          <Reveal delay={0.05}>
            <h2 className="mt-28 font-display text-2xl font-semibold md:text-3xl">De zes diensten</h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {BRANCHES.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.06}>
                <Link
                  to={b.to}
                  className="group flex h-full flex-col rounded-2xl border border-emerald-deep/10 bg-white p-8 shadow-[0_18px_50px_rgba(15,92,77,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald/40 md:p-10"
                >
                  <span className="font-accent text-2xl italic text-emerald">0{i + 1}</span>
                  <h3 className="mt-3 font-display text-xl font-semibold md:text-2xl">{b.title}</h3>
                  <p className="mt-3 font-sans text-base leading-relaxed text-near-black/60">{b.desc}</p>
                  <span className="mt-5 inline-flex items-center gap-2 font-sans text-sm font-semibold text-emerald-deep">
                    Ontdek
                    <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">&rarr;</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* support */}
          <Reveal delay={0.05}>
            <h2 className="mt-24 font-display text-2xl font-semibold md:text-3xl">Op de achtergrond</h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {SUPPORT.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.06} className="rounded-2xl border border-emerald-deep/10 bg-[#EEF1E7] p-8 md:p-10">
                <h3 className="font-display text-xl font-semibold md:text-2xl">{b.title}</h3>
                <p className="mt-3 font-sans text-base leading-relaxed text-near-black/60">{b.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
