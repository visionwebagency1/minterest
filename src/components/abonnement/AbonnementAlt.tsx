import { Link } from 'react-router-dom'
import { Reveal } from '@/components/Reveal'
import { WEBSITE_SUBSCRIPTION } from '@/data/websitePlans'

/**
 * The bridge between the two routes to a website, shown on both sides.
 *
 * Web Development is custom work: own design, own functionality, quoted per
 * project. The Website Abonnement is a finished template site on a fixed
 * monthly price. They are not variants of one service, so every page that sells
 * one of them points at the other in one sentence. That keeps the visitor who
 * landed on the wrong route from leaving, and keeps the two propositions apart.
 */

type Variant = 'naar-abonnement' | 'naar-maatwerk'

const CONTENT: Record<
  Variant,
  { kicker: string; title: string; text: string; cta: string; to: string }
> = {
  'naar-abonnement': {
    kicker: 'De andere route',
    title: 'Zoek je geen maatwerk?',
    text: `Een website op maat is een project: eigen ontwerp, eigen functionaliteit, een offerte vooraf. Wil je vooral snel en netjes online, dan is het ${WEBSITE_SUBSCRIPTION.name} de kortere weg. Je kiest een template, wij zetten hem live en houden hem bij, voor een vast bedrag per maand.`,
    cta: `Bekijk het ${WEBSITE_SUBSCRIPTION.name}`,
    to: WEBSITE_SUBSCRIPTION.path,
  },
  'naar-maatwerk': {
    kicker: 'De andere route',
    title: 'Wil je juist iets eigens?',
    text: 'Een abonnement gaat uit van een bestaand template. Heb je een eigen ontwerp voor ogen, een koppeling met je systemen of een webshop met echte eisen, dan bouwen we dat als maatwerkproject, met een offerte vooraf.',
    cta: 'Bekijk Web Development',
    to: '/diensten/web-development',
  },
}

export function AbonnementAlt({ variant }: { variant: Variant }) {
  const c = CONTENT[variant]
  const price =
    variant === 'naar-abonnement' ? `vanaf € ${WEBSITE_SUBSCRIPTION.priceFrom} per maand` : 'op offerte'

  return (
    <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10 lg:px-16">
      <Reveal>
        <div className="flex flex-col gap-7 rounded-3xl border border-emerald-deep/10 bg-white p-8 shadow-[0_18px_50px_rgba(1,63,64,0.07)] md:flex-row md:items-center md:justify-between md:p-12">
          <div className="max-w-2xl">
            <span className="font-sans text-xs uppercase tracking-[0.28em] text-emerald">
              {c.kicker}
            </span>
            <h2 className="mt-3 font-display text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-tight text-near-black">
              {c.title}
            </h2>
            <p className="mt-4 font-sans text-base leading-relaxed text-near-black/60">{c.text}</p>
          </div>

          <div className="flex shrink-0 flex-col items-start gap-3 md:items-end">
            <span className="font-sans text-sm text-near-black/45">{price}</span>
            <Link
              to={c.to}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-deep px-7 py-3.5 font-sans text-sm font-semibold text-cream transition-transform duration-300 hover:scale-[1.02]"
            >
              {c.cta}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
