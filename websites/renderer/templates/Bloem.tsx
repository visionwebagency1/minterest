import type { SiteContent, TemplateTheme } from './types'
import { Icon } from './components/Icons'
import { Button, Container, Footer, Header, Heading, Kicker, Quote, Shell } from './components/Kit'

/**
 * Bloem — hospitality.
 *
 * A guest wants to know three things within seconds: is it open, what do they
 * serve, can I book. So the hero fills the screen with the room itself, the
 * opening hours sit in a strip right under it, and the menu is a real menu with
 * prices rather than a grid of cards.
 */

export const bloemTheme: TemplateTheme = {
  bg: '#FFFCF6',
  ink: '#1E1A14',
  muted: '#6E6255',
  accent: '#B4471F',
  onAccent: '#FFFFFF',
  surface: '#F6EFE3',
  line: '#E6DACA',
  dark: '#1B241D',
  onDark: '#F3EDE3',
  headingFont: "'Playfair Display', Georgia, serif",
  bodyFont: "'Karla', system-ui, sans-serif",
  radius: '4px',
}

export function Bloem({ content }: { content: SiteContent }) {
  const { business, nav, hero, intro, services, feature, testimonials, cta } = content
  const tel = business.phone.replace(/\s/g, '')

  return (
    <Shell theme={bloemTheme}>
      <Header business={business} nav={nav} tone="over-image" cta="Reserveren" />

      {/* Full-screen room, claim centred. */}
      <section id="top" className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <img src={hero.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/55" />
        <Container className="relative py-32 text-center text-white">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/75">
            {hero.kicker}
          </span>
          <Heading level={1} className="mx-auto mt-7 max-w-4xl text-balance">
            {hero.title}
          </Heading>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-white/80">{hero.text}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button href={`tel:${tel}`} variant="light">
              {hero.primary.label}
            </Button>
            {hero.secondary && (
              <Button href={hero.secondary.href} variant="outline" className="text-white">
                {hero.secondary.label}
              </Button>
            )}
          </div>
        </Container>
      </section>

      {/* Opening hours as a strip: the question every guest has. */}
      <section className="bg-[var(--dark)] text-[var(--on-dark)]">
        <Container className="grid gap-x-10 gap-y-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {business.hours.map((h) => (
            <div key={h.days} className="flex items-baseline justify-between gap-4 text-sm">
              <span className="opacity-60">{h.days}</span>
              <span className="whitespace-nowrap font-semibold">{h.time}</span>
            </div>
          ))}
        </Container>
      </section>

      {/* The house. */}
      <section id="huis" className="py-24 lg:py-32">
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
                    <Icon name="plate" className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
                    {p}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <img src={intro.image} alt="" className="aspect-[4/5] w-full object-cover sm:aspect-[4/3]" />
        </Container>
      </section>

      {/* The menu, printed. */}
      <section id="kaart" className="bg-[var(--surface)] py-24 lg:py-32">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Kicker>{services.kicker}</Kicker>
            <Heading className="mt-5">{services.title}</Heading>
            <p className="mt-5 leading-relaxed text-[var(--muted)]">{services.intro}</p>
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl gap-x-16 gap-y-9 md:grid-cols-2">
            {services.items.map((item) => (
              <div key={item.title}>
                <div className="flex items-baseline gap-3">
                  <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold">
                    {item.title}
                  </h3>
                  <span className="mx-1 flex-1 translate-y-[-0.3rem] border-b border-dotted border-[var(--line)]" />
                  {item.price && (
                    <span className="whitespace-nowrap font-semibold text-[var(--accent)]">
                      {item.price}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{item.text}</p>
              </div>
            ))}
          </div>

          <p className="mt-14 text-center text-sm text-[var(--muted)]">
            Allergie of dieetwens? Zeg het bij het reserveren, dan houden we er rekening mee.
          </p>
        </Container>
      </section>

      {/* Wide image band with an overlapping card. */}
      <section className="relative">
        <img src={feature.image} alt="" className="h-[28rem] w-full object-cover lg:h-[34rem]" />
        <Container className="relative -mt-24 pb-24 lg:-mt-32">
          <div className="max-w-2xl bg-[var(--bg)] p-10 shadow-xl lg:p-14">
            <Kicker>{feature.kicker}</Kicker>
            <Heading className="mt-5">{feature.title}</Heading>
            {feature.body.map((p) => (
              <p key={p} className="mt-5 leading-relaxed text-[var(--muted)]">
                {p}
              </p>
            ))}
            {feature.points && (
              <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm">
                {feature.points.map((p) => (
                  <li key={p} className="flex items-center gap-2">
                    <Icon name="check" className="h-4 w-4 text-[var(--accent)]" />
                    {p}
                  </li>
                ))}
              </ul>
            )}
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

      <section className="py-24 text-center lg:py-28">
        <Container className="max-w-2xl">
          <Heading>{cta.title}</Heading>
          <p className="mt-5 leading-relaxed text-[var(--muted)]">{cta.text}</p>
          <Button href={`tel:${tel}`} className="mt-9">
            {cta.button}
          </Button>
        </Container>
      </section>

      <Footer business={business} nav={nav} tone="dark" />
    </Shell>
  )
}
