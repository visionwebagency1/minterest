import { Accent } from '@/components/Accent'
import { Reveal } from '@/components/Reveal'
import { PageHero } from '@/components/PageHero'
import { Showcase } from '@/sections/Showcase'
import { Footer } from '@/sections/Footer'

const CATS = ['Alle', 'Websites', 'Webshops', 'Branding', 'Video & Fotografie', 'Social Media', 'SEO & SEA']

/** Portfolio overview: dark hero + category chips + the showcase grid. */
export function Work() {
  return (
    <>
      <PageHero
        kicker="Uitgelicht werk"
        title={
          <>
            Werk dat bedrijven <Accent>vooruitbrengt.</Accent>
          </>
        }
        tagline="Een selectie van websites, branding, content en campagnes die bedrijven sterker zichtbaar maken, vertrouwen opbouwen en meer resultaat opleveren."
        primary={{ label: 'Start jouw groeitraject', to: '/start' }}
        secondary={{ label: 'Bekijk diensten', to: '/diensten' }}
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
