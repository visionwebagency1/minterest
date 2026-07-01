import { Link } from 'react-router-dom'
import { Reveal } from '@/components/Reveal'
import { Accent } from '@/components/Accent'
import { PageHero } from '@/components/PageHero'
import { Footer } from '@/sections/Footer'
import { MAIN_SERVICES } from '@/data/services'
import { SiteContentProvider, useContent } from '@/content/SiteContent'

/** About-page omschrijving per hoofddienst (uit het contentbestand). */
const ABOUT_DESC: Record<string, string> = {
  'design-branding':
    'Een sterke merkbasis die vertrouwen opbouwt, herkenning vergroot en jouw bedrijf professioneel neerzet.',
  'web-development':
    'Websites en webshops die duidelijk communiceren, vertrouwen wekken en bezoekers omzetten in klanten.',
  'video-fotografie':
    'Beeldmateriaal dat aandacht pakt, vertrouwen opbouwt en jouw merk professioneel zichtbaar maakt.',
  'social-media':
    'Content, influencers en advertenties die bereik omzetten in zichtbaarheid, vertrouwen en nieuwe aanvragen.',
  'seo-sea':
    'Beter gevonden worden door de juiste doelgroep en meer gerichte bezoekers omzetten in aanvragen.',
  extra:
    'Aanvullende oplossingen zoals AI-agents, administratie, sourcing en detachering om slimmer en schaalbaarder te werken.',
}

const BRANCHES = MAIN_SERVICES.map((s) => ({
  title: s.label,
  desc: ABOUT_DESC[s.slug] ?? s.cardDesc,
  to: `/diensten/${s.slug}`,
}))

const VALUE_ICONS = [TeamIcon, SolutionIcon, GrowIcon]

function TeamIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3 2.7-5 6-5s6 2 6 5" />
      <path d="M16 5.5a3 3 0 0 1 0 5.5M18 20c0-2.4-1-4.2-2.6-5" />
    </svg>
  )
}
function SolutionIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.5 10.9c.5.4.8 1 .8 1.6v.5h5.4v-.5c0-.6.3-1.2.8-1.6A6 6 0 0 0 12 3Z" />
    </svg>
  )
}
function GrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 18 10 12l3.5 3.5L20 8" />
      <path d="M15 8h5v5" />
    </svg>
  )
}

/** About / studio page: dark hero + light story (values, branches, support). */
export function About() {
  return (
    <SiteContentProvider page="about">
      <AboutInner />
    </SiteContentProvider>
  )
}

function AboutInner() {
  const c = useContent()
  const values = VALUE_ICONS.map((Icon, i) => ({
    title: c(`value.${i}.title`),
    desc: c(`value.${i}.desc`),
    Icon,
  }))
  const support = [0, 1].map((i) => ({
    title: c(`support.${i}.title`),
    desc: c(`support.${i}.desc`),
  }))

  return (
    <>
      <PageHero
        kicker={c('hero.kicker')}
        title={
          <>
            {c('hero.titlePre')}<Accent>{c('hero.titleAccent')}</Accent>
          </>
        }
        tagline={c('hero.tagline')}
        primary={{ label: c('hero.primary'), to: '/start' }}
        secondary={{ label: c('hero.secondary'), to: '/work' }}
      />

      <div className="bg-cream text-near-black">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32 lg:px-16">
          {/* values */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-emerald/10 text-emerald ring-1 ring-emerald/15">
                  <v.Icon />
                </span>
                <h3 className="mt-4 font-display text-2xl font-semibold">{v.title}</h3>
                <p className="mt-3 font-sans text-base leading-relaxed text-near-black/60">{v.desc}</p>
              </Reveal>
            ))}
          </div>

          {/* the six services */}
          <Reveal delay={0.05}>
            <h2 className="mt-28 font-display text-2xl font-semibold md:text-3xl">{c('servicesHeading')}</h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {BRANCHES.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.06}>
                <Link
                  to={b.to}
                  className="group flex h-full flex-col rounded-2xl border border-emerald-deep/10 bg-white p-8 shadow-[0_18px_50px_rgba(1,63,64,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald/40 md:p-10"
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
            <h2 className="mt-24 font-display text-2xl font-semibold md:text-3xl">{c('supportHeading')}</h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {support.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.06} className="rounded-2xl border border-emerald-deep/10 bg-[#EAF4EC] p-8 md:p-10">
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
