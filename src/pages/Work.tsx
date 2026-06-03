import { Accent } from '@/components/Accent'
import { Reveal } from '@/components/Reveal'
import { PageHero } from '@/components/PageHero'
import { Showcase } from '@/sections/Showcase'
import { Footer } from '@/sections/Footer'

const CATS = ['Alles', 'Websites', 'Webshops', 'Branding', 'Video']

/** Portfolio overview: dark hero + category chips + the showcase grid. */
export function Work() {
  return (
    <>
      <PageHero
        kicker="Geselecteerd werk"
        title={
          <>
            Merken die zijn gaan <Accent>klimmen.</Accent>
          </>
        }
        tagline="Een greep uit het werk waarmee we interesse in groei veranderden, van strakke webshops tot complete merken."
        primary={{ label: 'Start jouw project', to: '/start' }}
        secondary={{ label: 'Onze diensten', to: '/websites' }}
      />

      <div className="bg-cream text-near-black">
        <section className="mx-auto max-w-7xl px-6 pt-20 md:px-10 lg:px-16">
          <Reveal>
            <div className="flex flex-wrap gap-2.5">
              {CATS.map((c, i) => (
                <span
                  key={c}
                  className={`cursor-default rounded-full border px-5 py-2 font-sans text-sm font-medium transition-colors ${
                    i === 0
                      ? 'border-emerald-deep bg-emerald-deep text-cream'
                      : 'border-emerald-deep/15 text-near-black/70 hover:border-emerald/50'
                  }`}
                >
                  {c}
                </span>
              ))}
            </div>
          </Reveal>
        </section>

        <Showcase />
      </div>

      <Footer />
    </>
  )
}
