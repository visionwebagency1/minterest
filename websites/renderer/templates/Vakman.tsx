import type { SiteContent, TemplateTheme } from './types'
import { Icon } from './components/Icons'
import { Button, Container, Footer, Header, Heading, Kicker, Quote, Shell } from './components/Kit'

/**
 * Vakman — landscaping.
 *
 * Green work is judged on what it looks like, so photography carries this one:
 * a hero the full width of the screen, a gallery band of finished work and a
 * numbers strip laid over an image. Services are a two-column list with rules,
 * not cards, so the page stays quiet between the pictures.
 */

export const vakmanTheme: TemplateTheme = {
  bg: '#FBFAF6',
  ink: '#1F2A1C',
  muted: '#5F6B58',
  accent: '#4A7A2C',
  onAccent: '#FFFFFF',
  surface: '#EFF2E8',
  line: '#DDE3D3',
  dark: '#1F2A1C',
  onDark: '#EEF2E7',
  headingFont: "'Fraunces', Georgia, serif",
  bodyFont: "'Inter', system-ui, sans-serif",
  radius: '8px',
}

export function Vakman({ content }: { content: SiteContent }) {
  const { business, nav, hero, intro, services, feature, stats, testimonials, cta } = content
  const tel = business.phone.replace(/\s/g, '')

  return (
    <Shell theme={vakmanTheme}>
      <Header business={business} nav={nav} tone="over-image" cta="Offerte aanvragen" />

      <section id="top" className="relative min-h-[85vh] overflow-hidden">
        <img src={hero.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
        {/* Op mobiel loopt de overlay van onder naar boven, op breed van links naar
            rechts. Anders staat de tekst op een telefoon op een lichte plek. */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/30 lg:bg-gradient-to-r lg:from-black/75 lg:via-black/45 lg:to-transparent" />
        <Container className="relative flex min-h-[85vh] flex-col justify-center py-32 text-white">
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
            {hero.kicker}
          </span>
          <Heading level={1} className="mt-6 max-w-2xl text-balance">
            {hero.title}
          </Heading>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/80">{hero.text}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href={hero.primary.href}>{hero.primary.label}</Button>
            {hero.secondary && (
              <Button href={hero.secondary.href} variant="outline" className="text-white">
                {hero.secondary.label}
              </Button>
            )}
          </div>
          <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/75">
            {hero.badges.map((b) => (
              <li key={b} className="flex items-center gap-2">
                <Icon name="leaf" className="h-4 w-4" />
                {b}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* How we work. */}
      <section className="py-24 lg:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <div>
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
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
                    {p}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <img src={intro.image} alt="" className="aspect-[4/3] w-full rounded-[var(--radius)] object-cover" />
        </Container>
      </section>

      {/* Services as a list with rules. */}
      <section id="diensten" className="bg-[var(--surface)] py-24 lg:py-28">
        <Container>
          <div className="max-w-2xl">
            <Kicker>{services.kicker}</Kicker>
            <Heading className="mt-5">{services.title}</Heading>
            <p className="mt-5 leading-relaxed text-[var(--muted)]">{services.intro}</p>
          </div>

          <div className="mt-12 grid gap-x-14 md:grid-cols-2">
            {services.items.map((item) => (
              <div key={item.title} className="flex gap-5 border-t border-[var(--line)] py-7">
                <span className="mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/10 text-[var(--accent)]">
                  <Icon name={item.icon} className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Work: three photographs, no captions needed. */}
      <section id="werk" className="py-24 lg:py-28">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <Kicker>Ons werk</Kicker>
              <Heading className="mt-5">Tuinen die we hebben aangelegd</Heading>
            </div>
            {business.area && (
              <p className="flex items-center gap-2 text-sm text-[var(--muted)]">
                <Icon name="pin" className="h-4 w-4 text-[var(--accent)]" />
                {business.area}
              </p>
            )}
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <img src={hero.image} alt="" className="aspect-[3/4] w-full rounded-[var(--radius)] object-cover" />
            <img src={feature.image} alt="" className="aspect-[3/4] w-full rounded-[var(--radius)] object-cover" />
            <img src={intro.image} alt="" className="aspect-[3/4] w-full rounded-[var(--radius)] object-cover" />
          </div>
        </Container>
      </section>

      {/* Numbers over a dark band. */}
      {stats && (
        <section className="bg-[var(--dark)] py-16 text-[var(--on-dark)]">
          <Container className="grid grid-cols-2 gap-10 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-[family-name:var(--font-heading)] text-3xl font-semibold lg:text-4xl">
                  {s.value}
                </p>
                <p className="mt-1 text-sm opacity-65">{s.label}</p>
              </div>
            ))}
          </Container>
        </section>
      )}

      {/* Maintenance. */}
      <section id="werkgebied" className="py-24 lg:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <img
            src={feature.image}
            alt=""
            className="order-1 aspect-[4/3] w-full rounded-[var(--radius)] object-cover lg:order-2"
          />
          <div className="order-2 lg:order-1">
            <Kicker>{feature.kicker}</Kicker>
            <Heading className="mt-5">{feature.title}</Heading>
            {feature.body.map((p) => (
              <p key={p} className="mt-5 leading-relaxed text-[var(--muted)]">
                {p}
              </p>
            ))}
            {feature.points && (
              <ul className="mt-8 flex flex-col gap-3">
                {feature.points.map((p) => (
                  <li key={p} className="flex gap-3 text-sm">
                    <Icon name="leaf" className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
                    {p}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Container>
      </section>

      <section className="bg-[var(--surface)] py-24 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-2">
          {testimonials.map((t) => (
            <Quote key={t.name} item={t} />
          ))}
        </Container>
      </section>

      <section className="bg-[var(--accent)] py-20 text-white">
        <Container className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div className="max-w-xl">
            <Heading className="text-white">{cta.title}</Heading>
            <p className="mt-4 leading-relaxed text-white/80">{cta.text}</p>
          </div>
          <Button href={`tel:${tel}`} variant="light" className="shrink-0">
            {cta.button}
          </Button>
        </Container>
      </section>

      <Footer business={business} nav={nav} tone="dark" />
    </Shell>
  )
}
