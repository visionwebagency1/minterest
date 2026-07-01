import { Accent } from '@/components/Accent'
import { Reveal } from '@/components/Reveal'
import { PageHero } from '@/components/PageHero'
import { Showcase } from '@/sections/Showcase'
import { Footer } from '@/sections/Footer'
import { SiteContentProvider, useContent } from '@/content/SiteContent'

/** Portfolio overview: dark hero + category chips + the showcase grid. */
export function Work() {
  return (
    <SiteContentProvider page="work">
      <WorkInner />
    </SiteContentProvider>
  )
}

function WorkInner() {
  const c = useContent()
  const CATS = Array.from({ length: 7 }, (_, i) => c(`cat.${i}`))
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
        secondary={{ label: c('hero.secondary'), to: '/diensten' }}
      />

      <div className="bg-cream text-near-black">
        <section className="mx-auto max-w-7xl px-6 pt-20 md:px-10 lg:px-16">
          <Reveal>
            <div className="flex flex-wrap gap-2.5">
              {CATS.map((cat, i) => (
                <span
                  key={cat}
                  className={`cursor-default rounded-full border px-5 py-2 font-sans text-sm font-medium transition-colors ${
                    i === 0
                      ? 'border-emerald-deep bg-emerald-deep text-cream'
                      : 'border-emerald-deep/15 text-near-black/70 hover:border-emerald/50'
                  }`}
                >
                  {cat}
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
