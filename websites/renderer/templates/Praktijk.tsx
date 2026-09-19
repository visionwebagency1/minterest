import type { SiteContent, TemplateTheme } from './types'
import { Icon } from './components/Icons'
import { Button, Container, Footer, Header, Heading, Kicker, Quote, Shell } from './components/Kit'

/**
 * Praktijk — healthcare.
 *
 * Read by someone in pain or in doubt, so nothing shouts. Light background,
 * generous rounding, a split hero where the waiting time and the insurance
 * question are answered immediately, and treatments in soft cards that are easy
 * to scan.
 */

export const praktijkTheme: TemplateTheme = {
  bg: '#FFFFFF',
  ink: '#123029',
  muted: '#5E7A72',
  accent: '#1E8E6A',
  onAccent: '#FFFFFF',
  surface: '#F1F8F5',
  line: '#DCEBE4',
  dark: '#123029',
  onDark: '#EAF5F0',
  headingFont: "'DM Sans', system-ui, sans-serif",
  bodyFont: "'DM Sans', system-ui, sans-serif",
  radius: '14px',
}

export function Praktijk({ content }: { content: SiteContent }) {
  const { business, nav, hero, intro, services, feature, stats, testimonials, cta } = content
  const tel = business.phone.replace(/\s/g, '')

  return (
    <Shell theme={praktijkTheme}>
      <Header business={business} nav={nav} tone="light" cta="Afspraak maken" />

      {/* Split hero: the answer on the left, the room on the right. */}
      <section id="top" className="bg-[var(--surface)] py-16 lg:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Kicker>{hero.kicker}</Kicker>
            <Heading level={1} className="mt-5 text-balance">
              {hero.title}
            </Heading>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--muted)]">{hero.text}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href={`tel:${tel}`}>{hero.primary.label}</Button>
              {hero.secondary && (
                <Button href={hero.secondary.href} variant="outline" className="text-[var(--accent)]">
                  {hero.secondary.label}
                </Button>
              )}
            </div>
          </div>
          <img
            src={hero.image}
            alt=""
            className="aspect-[4/3] w-full rounded-[28px] object-cover shadow-[0_30px_70px_rgba(18,48,41,0.14)]"
          />
        </Container>
      </section>

      {/* Trust bar: waiting time, insurance, referral. */}
      <section className="border-b border-[var(--line)] bg-white">
        <Container className="grid gap-6 py-7 sm:grid-cols-3">
          {hero.badges.map((b) => (
            <div key={b} className="flex items-center gap-3 text-sm font-medium">
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--surface)] text-[var(--accent)]">
                <Icon name="check" className="h-4 w-4" />
              </span>
              {b}
            </div>
          ))}
        </Container>
      </section>

      {/* The practice. */}
      <section id="praktijk" className="py-24 lg:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <img src={intro.image} alt="" className="aspect-[4/3] w-full rounded-[28px] object-cover" />
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
                    <Icon name="heart" className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
                    {p}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Container>
      </section>

      {/* Treatments in soft cards. */}
      <section id="behandelingen" className="bg-[var(--surface)] py-24 lg:py-28">
        <Container>
          <div className="max-w-2xl">
            <Kicker>{services.kicker}</Kicker>
            <Heading className="mt-5">{services.title}</Heading>
            <p className="mt-5 leading-relaxed text-[var(--muted)]">{services.intro}</p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.items.map((item) => (
              <div
                key={item.title}
                className="rounded-[20px] bg-white p-7 transition hover:shadow-[0_18px_44px_rgba(18,48,41,0.08)]"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--surface)] text-[var(--accent)]">
                  <Icon name={item.icon} />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[var(--muted)]">{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Numbers. */}
      {stats && (
        <section className="py-16">
          <Container className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-semibold text-[var(--accent)] lg:text-4xl">{s.value}</p>
                <p className="mt-1 text-sm text-[var(--muted)]">{s.label}</p>
              </div>
            ))}
          </Container>
        </section>
      )}

      {/* Insurance, the awkward question answered plainly. */}
      <section id="vergoeding" className="pb-24 lg:pb-28">
        <Container>
          <div className="grid items-center gap-12 rounded-[28px] bg-[var(--surface)] p-8 lg:grid-cols-2 lg:p-14">
            <div>
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
                      <Icon name="shield" className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
                      {p}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <img src={feature.image} alt="" className="aspect-[4/3] w-full rounded-[20px] object-cover" />
          </div>
        </Container>
      </section>

      <section className="bg-[var(--dark)] py-24 text-[var(--on-dark)] lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-2">
          {testimonials.map((t) => (
            <Quote key={t.name} item={t} />
          ))}
        </Container>
      </section>

      <section className="py-24 lg:py-28">
        <Container className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div className="max-w-xl">
            <Heading>{cta.title}</Heading>
            <p className="mt-4 leading-relaxed text-[var(--muted)]">{cta.text}</p>
          </div>
          <Button href={`tel:${tel}`} className="shrink-0">
            <Icon name="phone" className="h-4 w-4" />
            {cta.button}
          </Button>
        </Container>
      </section>

      <Footer business={business} nav={nav} tone="light" />
    </Shell>
  )
}
