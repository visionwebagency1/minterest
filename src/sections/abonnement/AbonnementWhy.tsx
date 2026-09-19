import { Reveal } from '@/components/Reveal'
import { Accent } from '@/components/Accent'

/** Why this, and why with us. Four short blocks, no sales talk. */

const POINTS = [
  {
    title: 'Alles onder een dak',
    text: 'Ontwerp, domein, hosting, SSL en onderhoud. Een partij, een factuur, geen losse rekeningen.',
    Icon: RoofIcon,
  },
  {
    title: 'Geen technisch gedoe',
    text: 'Je hoeft niets te installeren, bij te werken of te beveiligen. Wij houden je site draaiend.',
    Icon: ShieldIcon,
  },
  {
    title: 'Vaste lage kosten',
    text: 'Een bedrag per maand, geen investering vooraf en geen verrassingen achteraf.',
    Icon: EuroIcon,
  },
  {
    title: 'Gebouwd door een bureau',
    text: 'Dezelfde mensen die merken en maatwerksites maken, bouwen ook deze templates.',
    Icon: StudioIcon,
  },
]

function RoofIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 10 9-6 9 6" />
      <path d="M5.5 9.5V20h13V9.5" />
      <path d="M10 20v-5h4v5" />
    </svg>
  )
}
function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 5 6v6c0 4.2 2.9 7.6 7 9 4.1-1.4 7-4.8 7-9V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}
function EuroIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16.5 6.5A6 6 0 0 0 7 11.2a6 6 0 0 0 9.5 5.6" />
      <path d="M4.5 10.5h8M4.5 13.5h8" />
    </svg>
  )
}
function StudioIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20V8l5-4 5 4v12" />
      <path d="M14 20V11l6 3v6" />
      <path d="M8 20v-4h3v4" />
    </svg>
  )
}

export function AbonnementWhy() {
  return (
    <section className="bg-cream py-28 text-near-black md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <Reveal>
          <span className="font-sans text-xs uppercase tracking-[0.28em] text-emerald-deep/60">
            Waarom Minterest
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-8 max-w-3xl text-balance font-display text-[clamp(2.25rem,5.5vw,4.25rem)] font-semibold leading-[1.03] tracking-tight">
            Jij runt je bedrijf, wij je <Accent>website</Accent>.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {POINTS.map((p, i) => (
            <Reveal key={p.title} delay={0.07 * i}>
              <div className="flex h-full flex-col rounded-3xl border border-emerald-deep/10 bg-white p-7 shadow-[0_14px_40px_rgba(1,63,64,0.05)]">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-emerald/10 text-emerald">
                  <p.Icon />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold">{p.title}</h3>
                <p className="mt-3 font-sans text-base leading-relaxed text-near-black/60">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
