import type { SiteContent, TemplateTheme } from './types'
import { Icon } from './components/Icons'
import { Button, Container, Footer, Header, Heading, Kicker, Quote, Shell } from './components/Kit'

/**
 * Atelier — hair and beauty.
 *
 * Editorial layout: a full-bleed hero photograph with the claim sitting low on
 * it, an overlapping image in the introduction, and the treatments as a printed
 * price list with dotted leaders instead of cards. Salons sell calm and craft,
 * so there is a lot of air and the type does the work.
 */

export const atelierTheme: TemplateTheme = {
  bg: '#FBF8F4',
  ink: '#241F1B',
  muted: '#7A6F66',
  accent: '#9A6B4F',
  onAccent: '#FFFFFF',
  surface: '#F2EBE2',
  line: '#E4DACE',
  dark: '#241F1B',
  onDark: '#F5EFE8',
  headingFont: "'Cormorant Garamond', Georgia, serif",
  bodyFont: "'Inter Tight', system-ui, sans-serif",
  radius: '999px',
}

export function Atelier({ content }: { content: SiteContent }) {
  const { business, nav, hero, intro, services, feature, testimonials, cta } = content

  return (
    <Shell theme={atelierTheme}>
      <Header business={business} nav={nav} tone="over-image" cta="Afspraak maken" />

      {/* Hero: photograph first, words second. */}
      <section id="top" className="relative min-h-[88vh] w-full overflow-hidden">
        <img src={hero.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/35" />
        <Container className="relative flex min-h-[88vh] flex-col justify-end pb-16 pt-32 text-white">
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
            {hero.kicker}
          </span>
          <Heading level={1} className="mt-6 max-w-3xl text-balance">
            {hero.title}
          </Heading>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">{hero.text}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href={hero.primary.href} variant="light">
              {hero.primary.label}
            </Button>
            {hero.secondary && (
              <Button href={hero.secondary.href} variant="outline" className="text-white">
                {hero.secondary.label}
              </Button>
            )}
          </div>
          <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/20 pt-6 text-sm text-white/75">
            {hero.badges.map((b) => (
              <li key={b} className="flex items-center gap-2">
                <Icon name="check" className="h-4 w-4" />
                {b}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Intro: the photograph steps over the text column. */}
      <section id="studio" className="py-24 lg:py-32">
        <Container className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <img
              src={intro.image}
              alt=""
              className="aspect-[4/5] w-full rounded-[2rem] object-cover lg:aspect-[4/3]"
            />
          </div>
          <div className="lg:col-span-6 lg:-ml-16 lg:rounded-[2rem] lg:bg-[var(--bg)] lg:p-12">
            <Kicker>{intro.kicker}</Kicker>
            <Heading className="mt-5">{intro.title}</Heading>
            {intro.body.map((p) => (
              <p key={p} className="mt-5 leading-relaxed text-[var(--muted)]">
                {p}
              </p>
            ))}
            {intro.points && (
              <ul className="mt-8 flex flex-col gap-3">
                {intro.points.map((p) => (
                  <li key={p} className="flex gap-3 text-sm">
                    <Icon name="sparkle" className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
                    {p}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Container>
      </section>

      {/* Treatments as a price list, the way a salon writes it down. */}
      <section id="behandelingen" className="bg-[var(--surface)] py-24 lg:py-32">
        <Container>
          <div className="max-w-2xl">
            <Kicker>{services.kicker}</Kicker>
            <Heading className="mt-5">{services.title}</Heading>
            <p className="mt-5 leading-relaxed text-[var(--muted)]">{services.intro}</p>
          </div>

          <div className="mt-14 grid gap-x-16 gap-y-10 md:grid-cols-2">
            {services.items.map((item) => (
              <div key={item.title} className="border-b border-[var(--line)] pb-8">
                <div className="flex items-baseline gap-4">
                  <Icon name={item.icon} className="h-5 w-5 shrink-0 translate-y-1 text-[var(--accent)]" />
                  <h3 className="font-[family-name:var(--font-heading)] text-2xl font-semibold">
                    {item.title}
                  </h3>
                  <span className="mx-2 hidden flex-1 translate-y-[-0.35rem] border-b border-dotted border-[var(--line)] sm:block" />
                  {item.price && <span className="whitespace-nowrap font-semibold">{item.price}</span>}
                </div>
                <p className="mt-3 pl-9 text-sm leading-relaxed text-[var(--muted)]">{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Products. */}
      <section className="py-24 lg:py-32">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <Kicker>{feature.kicker}</Kicker>
            <Heading className="mt-5">{feature.title}</Heading>
            {feature.body.map((p) => (
              <p key={p} className="mt-5 leading-relaxed text-[var(--muted)]">
                {p}
              </p>
            ))}
            {feature.points && (
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {feature.points.map((p) => (
                  <li key={p} className="flex gap-2.5 text-sm">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
                    {p}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <img
            src={feature.image}
            alt=""
            className="order-1 aspect-[4/3] w-full rounded-[2rem] object-cover lg:order-2"
          />
        </Container>
      </section>

      {/* One quote, given room. */}
      <section className="bg-[var(--dark)] py-24 text-[var(--on-dark)] lg:py-28">
        <Container className="max-w-3xl text-center">
          <Quote item={testimonials[0]} />
        </Container>
      </section>

      <section className="py-24 lg:py-28">
        <Container className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div className="max-w-xl">
            <Heading>{cta.title}</Heading>
            <p className="mt-4 leading-relaxed text-[var(--muted)]">{cta.text}</p>
          </div>
          <Button href={`tel:${business.phone.replace(/\s/g, '')}`}>{cta.button}</Button>
        </Container>
      </section>

      <Footer business={business} nav={nav} tone="dark" />
    </Shell>
  )
}
