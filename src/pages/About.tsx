import { Reveal } from '@/components/Reveal'
import { Accent } from '@/components/Accent'
import { PageShell } from './PageShell'

const BRANCHES = [
  { title: 'Website & Webshops', desc: 'Digitale producten die laden, converteren en meegroeien.' },
  { title: 'Design & branding', desc: 'Identiteiten met karakter die vertrouwen wekken.' },
  { title: 'Short video content', desc: 'Scroll-stoppende video voor elk platform.' },
  { title: 'Influencer marketing', desc: 'Authentiek bereik via stemmen die je publiek vertrouwt.' },
]

const SUPPORT = [
  { title: 'Administratie', desc: 'We ontzorgen partners op de achtergrond, zodat de focus op groei blijft.' },
  { title: 'Sourcing & inkoop', desc: 'De juiste mensen en middelen, slim ingekocht en geregeld.' },
]

/** About page — who Minterest is, the four branches, and the support work. */
export function About() {
  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <Reveal className="flex items-center gap-3">
          <span className="h-px w-10 bg-mint/50" />
          <span className="font-sans text-xs uppercase tracking-[0.28em] text-white/55">
            Over Minterest
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-8 max-w-4xl text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tight text-cream md:text-6xl">
            Eén partner voor de hele <Accent>klim</Accent>.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl font-sans text-base leading-relaxed text-white/60 md:text-lg">
            Minterest is een digitaal groeibureau waar interesse je groei wordt.
            We brengen vier disciplines onder één dak samen, en regelen op de
            achtergrond alles wat een merk laat doorgroeien.
          </p>
        </Reveal>

        {/* Four branches */}
        <Reveal delay={0.05}>
          <h2 className="mt-24 font-display text-2xl font-semibold text-cream md:text-3xl">
            De vier takken
          </h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-2">
          {BRANCHES.map((b, i) => (
            <Reveal
              key={b.title}
              delay={i * 0.06}
              className="bg-near-black/40 p-8 md:p-10"
            >
              <span className="font-accent text-2xl italic text-mint/70">
                0{i + 1}
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-cream md:text-2xl">
                {b.title}
              </h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-white/55 md:text-base">
                {b.desc}
              </p>
            </Reveal>
          ))}
        </div>

        {/* Support work */}
        <Reveal delay={0.05}>
          <h2 className="mt-24 font-display text-2xl font-semibold text-cream md:text-3xl">
            Op de achtergrond
          </h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {SUPPORT.map((b, i) => (
            <Reveal
              key={b.title}
              delay={i * 0.06}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 md:p-10"
            >
              <h3 className="font-display text-xl font-semibold text-cream md:text-2xl">
                {b.title}
              </h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-white/55 md:text-base">
                {b.desc}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </PageShell>
  )
}
