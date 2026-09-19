import { Link } from 'react-router-dom'
import { Reveal } from '@/components/Reveal'
import { BrowserFrame, TemplatePreview } from '@/components/abonnement/TemplatePreview'
import { WEBSITE_SUBSCRIPTION } from '@/data/websitePlans'
import { WEBSITE_TEMPLATES } from '@/data/websiteTemplates'

/**
 * The subscription, offered where someone is browsing services: on the homepage
 * under the services and at the end of the services overview.
 *
 * A dark card on a light section, the same shape the service pages use for their
 * call to action, so it reads as part of the site instead of a banner dropped on
 * top of it. It says what it is and what it costs, and then gets out of the way.
 */

/** Two templates, enough to show these are finished websites. */
const SHOWN = ['praktijk', 'kade'] as const

export function AbonnementBand({ className = '' }: { className?: string }) {
  const [front, back] = SHOWN.map((slug) => WEBSITE_TEMPLATES.find((t) => t.slug === slug)!)

  return (
    <section className={`bg-cream pb-28 text-near-black md:pb-36 ${className}`}>
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-3xl px-8 py-12 text-cream md:px-14 md:py-16"
            style={{
              backgroundImage:
                'radial-gradient(70% 90% at 85% 10%, rgba(66,194,140,0.32), transparent 62%), linear-gradient(155deg, #008081 0%, #013F40 52%, #06140F 100%)',
            }}
          >
            <div className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <span className="font-sans text-xs uppercase tracking-[0.28em] text-mint/80">
                  Ook zonder maatwerkproject
                </span>
                <h2 className="mt-5 max-w-xl text-balance font-display text-[clamp(1.85rem,4vw,3rem)] font-semibold leading-[1.05] tracking-tight">
                  {WEBSITE_SUBSCRIPTION.navLabel} vanaf{' '}
                  <span className="whitespace-nowrap text-lime-accent">
                    &euro; {WEBSITE_SUBSCRIPTION.priceFrom} per maand
                  </span>
                  .
                </h2>
                <p className="mt-5 max-w-lg font-sans text-base leading-relaxed text-cream/70 md:text-lg">
                  Een kant-en-klare website in plaats van een project: je kiest een template, wij
                  zetten hem live en houden hem bij. Ontwerp, domein, hosting en onderhoud zitten
                  erbij.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <Link
                    to={WEBSITE_SUBSCRIPTION.path}
                    className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-mint to-lime-accent px-7 py-3.5 font-sans text-sm font-semibold text-emerald-deep transition-transform duration-300 hover:scale-[1.03]"
                  >
                    <span className="relative z-10">Bekijk het abonnement</span>
                    <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">
                      &rarr;
                    </span>
                    <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                  </Link>
                  <span className="font-sans text-sm text-cream/55">
                    Geen opstartkosten, maandelijks opzegbaar
                  </span>
                </div>
              </div>

              {/* Two templates, so it is clear what you get for that price. */}
              <div className="relative hidden sm:block">
                <div
                  aria-hidden="true"
                  className="absolute -top-8 right-0 w-[78%] rotate-[5deg] opacity-45"
                >
                  <BrowserFrame domain="">
                    <TemplatePreview
                      layout={back.layout}
                      palette={back.palette}
                      className="block aspect-[4/3] w-full"
                    />
                  </BrowserFrame>
                </div>
                <div className="relative w-[86%]">
                  <BrowserFrame domain={`${front.slug}.nl`} className="ring-1 ring-mint/15">
                    <TemplatePreview
                      layout={front.layout}
                      palette={front.palette}
                      className="block aspect-[4/3] w-full"
                      title={`Voorbeeld van template ${front.name}`}
                    />
                  </BrowserFrame>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
