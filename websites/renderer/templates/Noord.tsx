import type { SiteContent, TemplateTheme } from './types'
import { Icon } from './components/Icons'
import { Button, Container, Footer, Header, Heading, Kicker, Quote, Shell } from './components/Kit'

/**
 * Noord — professional services.
 *
 * Sells judgement, not looks, so this one is the quietest of the six. The
 * headline stands alone on white and the photograph comes underneath it, full
 * width, the way an annual report opens. Services are a numbered list with
 * hairlines; nothing is in a box.
 */

export const noordTheme: TemplateTheme = {
  bg: '#FFFFFF',
  ink: '#16181C',
  muted: '#61676F',
  accent: '#1C4E8A',
  onAccent: '#FFFFFF',
  surface: '#F4F5F7',
  line: '#E2E5E9',
  dark: '#16181C',
  onDark: '#EDEFF2',
  headingFont: "'Instrument Sans', system-ui, sans-serif",
  bodyFont: "'Instrument Sans', system-ui, sans-serif",
  radius: '6px',
}

export function Noord({ content }: { content: SiteContent }) {
  const { business, nav, hero, intro, services, feature, stats, testimonials, cta } = content
  const tel = business.phone.replace(/\s/g, '')

  return (
    <Shell theme={noordTheme}>
      <Header business={business} nav={nav} tone="light" cta="Kennismaken" />

      {/* Editorial opening: claim on white, photograph underneath. */}
      <section id="top" className="pt-16 lg:pt-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Kicker>{hero.kicker}</Kicker>
              <Heading level={1} className="mt-6 text-balance">
                {hero.title}
              </Heading>
            </div>
            <div className="lg:col-span-5 lg:pt-16">
              <p className="text-lg leading-relaxed text-[var(--muted)]">{hero.text}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={hero.primary.href}>{hero.primary.label}</Button>
                {hero.secondary && (
                  <Button href={hero.secondary.href} variant="outline" className="text-[var(--accent)]">
                    {hero.secondary.label}
                  </Button>
                )}
              </div>
            </div>
          </div>

          <img
            src={hero.image}
            alt=""
            className="mt-14 aspect-[21/9] w-full rounded-[var(--radius)] object-cover"
          />

          <ul className="mt-10 grid gap-6 border-t border-[var(--line)] pt-8 sm:grid-cols-3">
            {hero.badges.map((b) => (
              <li key={b} className="flex gap-3 text-sm">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
                {b}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Numbers, plainly. */}
      {stats && (
        <section className="py-20 lg:py-24">
          <Container className="grid grid-cols-2 gap-10 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="border-l border-[var(--line)] pl-5">
                <p className="text-3xl font-semibold lg:text-4xl">{s.value}</p>
                <p className="mt-1.5 text-sm text-[var(--muted)]">{s.label}</p>
              </div>
            ))}
          </Container>
        </section>
      )}

      {/* Services as a numbered list. */}
      <section id="diensten" className="border-t border-[var(--line)] py-24 lg:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Kicker>{services.kicker}</Kicker>
              <Heading className="mt-5">{services.title}</Heading>
              <p className="mt-5 leading-relaxed text-[var(--muted)]">{services.intro}</p>
            </div>
            <div className="lg:col-span-7">
              {services.items.map((item, i) => (
                <div
                  key={item.title}
                  className="flex gap-6 border-b border-[var(--line)] py-6 first:border-t"
                >
                  <span className="w-8 shrink-0 pt-1 text-sm font-semibold tabular-nums text-[var(--accent)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="mt-0.5 shrink-0 text-[var(--accent)]">
                    <Icon name={item.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[var(--muted)]">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* About. */}
      <section id="over" className="bg-[var(--surface)] py-24 lg:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <img src={intro.image} alt="" className="aspect-[4/3] w-full rounded-[var(--radius)] object-cover" />
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
        </Container>
      </section>

      {/* Method. */}
      <section id="werkwijze" className="py-24 lg:py-28">
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
              <ul className="mt-8 flex flex-col gap-3">
                {feature.points.map((p) => (
                  <li key={p} className="flex gap-3 text-sm">
                    <Icon name="chart" className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
                    {p}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <img
            src={feature.image}
            alt=""
            className="order-1 aspect-[4/3] w-full rounded-[var(--radius)] object-cover lg:order-2"
          />
        </Container>
      </section>

      <section className="bg-[var(--dark)] py-24 text-[var(--on-dark)] lg:py-28">
        <Container className="max-w-3xl">
          <Quote item={testimonials[0]} />
          {testimonials[1] && (
            <div className="mt-12 border-t border-white/10 pt-12">
              <Quote item={testimonials[1]} />
            </div>
          )}
        </Container>
      </section>

      <section className="py-24 lg:py-28">
        <Container className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div className="max-w-xl">
            <Heading>{cta.title}</Heading>
            <p className="mt-4 leading-relaxed text-[var(--muted)]">{cta.text}</p>
          </div>
          <Button href={`tel:${tel}`} className="shrink-0">
            {cta.button}
          </Button>
        </Container>
      </section>

      <Footer business={business} nav={nav} tone="dark" />
    </Shell>
  )
}
