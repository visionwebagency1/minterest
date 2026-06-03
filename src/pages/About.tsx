import { Reveal } from '@/components/Reveal'
import { Accent } from '@/components/Accent'
import { PageShell } from './PageShell'

const BRANCHES = [
  { title: 'Website & webshops', desc: 'Digitale producten die laden, converteren en meegroeien.' },
  { title: 'Design & branding', desc: 'Identiteiten met karakter die vertrouwen wekken.' },
  { title: 'Short video content', desc: 'Scroll-stoppende video voor elk platform.' },
  { title: 'Influencer marketing', desc: 'Authentiek bereik via stemmen die je publiek vertrouwt.' },
]

const SUPPORT = [
  { title: 'Administratie', desc: 'We ontzorgen partners op de achtergrond, zodat de focus op groei blijft.' },
  { title: 'Sourcing & inkoop', desc: 'De juiste mensen en middelen, slim ingekocht en geregeld.' },
]

const VALUES = [
  { title: 'Eén team, geen overdrachten', desc: 'Strategie, design, build en groei zitten aan dezelfde tafel.' },
  { title: 'Resultaat boven ruis', desc: 'We maken keuzes die je merk laten groeien, niet alleen mooi ogen.' },
  { title: 'Altijd omhoog', desc: 'We blijven meten en verbeteren, lang nadat het live staat.' },
]

/** About / studio page (light): the story, the four branches, support, values. */
export function About() {
  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <Reveal className="flex items-center gap-3">
          <span className="h-px w-10 bg-emerald/50" />
          <span className="font-sans text-xs uppercase tracking-[0.28em] text-emerald-deep/60">
            De studio
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-8 max-w-4xl text-balance font-display text-[clamp(2.5rem,7vw,6rem)] font-semibold leading-[1.0] tracking-tight">
            Eén partner voor de hele <Accent>klim.</Accent>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl font-sans text-lg leading-relaxed text-near-black/65">
            Minterest is een digitaal groeibureau waar interesse je groei wordt.
            We brengen vier disciplines onder één dak samen, en regelen op de
            achtergrond alles wat een merk laat doorgroeien.
          </p>
        </Reveal>

        {/* values — big, airy */}
        <div className="mt-24 grid grid-cols-1 gap-10 md:grid-cols-3">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <span className="font-accent text-3xl italic text-emerald">{`0${i + 1}`}</span>
              <h3 className="mt-3 font-display text-2xl font-semibold">{v.title}</h3>
              <p className="mt-3 font-sans text-base leading-relaxed text-near-black/60">{v.desc}</p>
            </Reveal>
          ))}
        </div>

        {/* four branches */}
        <Reveal delay={0.05}>
          <h2 className="mt-28 font-display text-2xl font-semibold md:text-3xl">De vier takken</h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {BRANCHES.map((b, i) => (
            <Reveal
              key={b.title}
              delay={i * 0.06}
              className="rounded-2xl border border-emerald-deep/10 bg-white p-8 shadow-[0_18px_50px_rgba(15,92,77,0.08)] md:p-10"
            >
              <span className="font-accent text-2xl italic text-emerald">0{i + 1}</span>
              <h3 className="mt-3 font-display text-xl font-semibold md:text-2xl">{b.title}</h3>
              <p className="mt-3 font-sans text-base leading-relaxed text-near-black/60">{b.desc}</p>
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
    </PageShell>
  )
}
