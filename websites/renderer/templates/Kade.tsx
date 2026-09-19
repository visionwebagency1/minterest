import type { SiteContent, TemplateTheme } from './types'
import { Icon } from './components/Icons'
import { Button, Container, Footer, Header, Heading, Kicker, Quote, Shell } from './components/Kit'

/**
 * Kade — installation and heating.
 *
 * A trade site has to look solid and answer fast. So: a split hero with the
 * phone number in reach, a band of hard numbers directly under it, and services
 * in a sharp-cornered grid. No rounded softness anywhere; the radius is almost
 * zero on purpose.
 */

export const kadeTheme: TemplateTheme = {
  bg: '#FFFFFF',
  ink: '#101820',
  muted: '#5B6875',
  accent: '#0A6BB8',
  onAccent: '#FFFFFF',
  surface: '#F2F5F8',
  line: '#DCE3EA',
  dark: '#101820',
  onDark: '#E8EEF4',
  headingFont: "'Barlow Condensed', 'Arial Narrow', sans-serif",
  bodyFont: "'Barlow', system-ui, sans-serif",
  radius: '2px',
}

export function Kade({ content }: { content: SiteContent }) {
  const { business, nav, hero, intro, services, feature, stats, testimonials, cta } = content
  const tel = business.phone.replace(/\s/g, '')

  return (
    <Shell theme={kadeTheme}>
      <Header business={business} nav={nav} tone="dark" />

      {/* Split hero: claim on the dark side, the work on the photo side. */}
      <section id="top" className="grid lg:grid-cols-2">
        <div className="bg-[var(--dark)] px-5 py-20 text-[var(--on-dark)] sm:px-8 lg:py-28 lg:pl-[max(2rem,calc((100vw-72rem)/2))] lg:pr-16">
          <div className="mx-auto max-w-xl lg:mx-0">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
              {hero.kicker}
            </span>
            <Heading level={1} className="mt-6 text-balance uppercase">
              {hero.title}
            </Heading>
            <p className="mt-6 text-lg leading-relaxed text-[var(--on-dark)]/70">{hero.text}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href={`tel:${tel}`}>
                <Icon name="phone" className="h-4 w-4" />
                {business.phone}
              </Button>
              {hero.secondary && (
                <Button href={hero.secondary.href} variant="outline">
                  {hero.secondary.label}
                </Button>
              )}
            </div>
            <ul className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-8 text-sm text-[var(--on-dark)]/75">
              {hero.badges.map((b) => (
                <li key={b} className="flex items-center gap-3">
                  <Icon name="check" className="h-4 w-4 shrink-0 text-[var(--accent)]" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <img src={hero.image} alt="" className="h-64 w-full object-cover sm:h-96 lg:h-full" />
      </section>

      {/* Hard numbers, straight under the fold. */}
      {stats && (
        <section className="bg-[var(--accent)] text-white">
          <Container className="grid grid-cols-2 divide-x divide-white/15 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="px-4 py-8 text-center first:pl-0 last:pr-0">
                <p className="font-[family-name:var(--font-heading)] text-3xl font-semibold lg:text-4xl">
                  {s.value}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-white/75">{s.label}</p>
              </div>
            ))}
          </Container>
        </section>
      )}

      {/* Services in a sharp grid. */}
      <section id="diensten" className="py-24 lg:py-28">
        <Container>
          <div className="max-w-2xl">
            <Kicker>{services.kicker}</Kicker>
            <Heading className="mt-4 uppercase">{services.title}</Heading>
            <p className="mt-5 leading-relaxed text-[var(--muted)]">{services.intro}</p>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-3">
            {services.items.map((item) => (
              <div key={item.title} className="group bg-white p-8 transition hover:bg-[var(--surface)]">
                <span className="inline-flex h-12 w-12 items-center justify-center bg-[var(--accent)]/10 text-[var(--accent)]">
                  <Icon name={item.icon} />
                </span>
                <h3 className="mt-6 font-[family-name:var(--font-heading)] text-xl font-semibold uppercase tracking-wide">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* About, with the photo taking the left half. */}
      <section id="over" className="bg-[var(--surface)] py-24 lg:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <img src={intro.image} alt="" className="aspect-[4/3] w-full object-cover" />
          <div>
            <Kicker>{intro.kicker}</Kicker>
            <Heading className="mt-4 uppercase">{intro.title}</Heading>
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
        </Container>
      </section>

      {/* Sustainability, the other way around. */}
      <section id="werkgebied" className="py-24 lg:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <Kicker>{feature.kicker}</Kicker>
            <Heading className="mt-4 uppercase">{feature.title}</Heading>
            {feature.body.map((p) => (
              <p key={p} className="mt-5 leading-relaxed text-[var(--muted)]">
                {p}
              </p>
            ))}
            {feature.points && (
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {feature.points.map((p) => (
                  <li key={p} className="flex gap-2.5 text-sm">
                    <Icon name="bolt" className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
                    {p}
                  </li>
                ))}
              </ul>
            )}
            {business.area && (
              <p className="mt-8 flex items-center gap-2 text-sm font-semibold">
                <Icon name="pin" className="h-4 w-4 text-[var(--accent)]" />
                {business.area}
              </p>
            )}
          </div>
          <img src={feature.image} alt="" className="order-1 aspect-[4/3] w-full object-cover lg:order-2" />
        </Container>
      </section>

      {/* Two quotes side by side on dark. */}
      <section className="bg-[var(--dark)] py-24 text-[var(--on-dark)] lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-2">
          {testimonials.map((t) => (
            <Quote key={t.name} item={t} />
          ))}
        </Container>
      </section>

      {/* Call bar. */}
      <section className="bg-[var(--accent)] py-14 text-white">
        <Container className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <Heading level={3} className="text-2xl uppercase">
              {cta.title}
            </Heading>
            <p className="mt-2 text-white/80">{cta.text}</p>
          </div>
          <Button href={`tel:${tel}`} variant="light" className="shrink-0">
            <Icon name="phone" className="h-4 w-4" />
            {cta.button}
          </Button>
        </Container>
      </section>

      <Footer business={business} nav={nav} tone="dark" />
    </Shell>
  )
}
