import type { ContentField, PageContent } from './types'

/**
 * Registry of every editable page. Fields are added per section as each part of
 * the public site is wired to the content system (homepage first, hero
 * excluded). Until a field is listed here and published, the relevant component
 * keeps showing this default text, so the live site is unaffected.
 *
 * IMPORTANT: each `default` is the exact text currently on the site. Multi-line
 * paragraphs are stored as a single line because the browser collapses the
 * original markup's whitespace to single spaces anyway, so the rendered result
 * is identical.
 */

const t = (key: string, group: string, label: string, def: string): ContentField => ({
  key,
  group,
  label,
  kind: 'text',
  default: def,
})
const m = (key: string, group: string, label: string, def: string): ContentField => ({
  key,
  group,
  label,
  kind: 'multiline',
  default: def,
})

const HOME_FIELDS: ContentField[] = [
  // ── Marquee (lopende balk onder de hero) ───────────────────────────────────
  t('marquee.0', 'Marquee', 'Woord 1', 'ONLINE GROEI'),
  t('marquee.1', 'Marquee', 'Woord 2', 'MEER ZICHTBAARHEID'),
  t('marquee.2', 'Marquee', 'Woord 3', 'STERKER MERK'),
  t('marquee.3', 'Marquee', 'Woord 4', 'MEER AANVRAGEN'),
  t('marquee.4', 'Marquee', 'Woord 5', 'BETERE CONVERSIE'),
  t('marquee.5', 'Marquee', 'Woord 6', 'GROEI DIE BLIJFT'),

  // ── Diensten-intro ─────────────────────────────────────────────────────────
  t('servicesIntro.eyebrow', 'Diensten-intro', 'Eyebrow', 'Meer voor je bedrijf'),
  t('servicesIntro.heading', 'Diensten-intro', 'Titel', 'Alles wat je bedrijf nodig heeft om te groeien,'),
  t('servicesIntro.headingAccent', 'Diensten-intro', 'Titel (accent)', 'onder één dak.'),

  // ── FAQ ──────────────────────────────────────────────────────────────────
  t('faq.eyebrow', 'FAQ', 'Eyebrow', 'Veelgestelde vragen'),
  t('faq.heading', 'FAQ', 'Titel', 'Goed om te weten.'),
  t('faq.item.0.q', 'FAQ', 'Vraag 1', 'Wat doet Minterest precies?'),
  m('faq.item.0.a', 'FAQ', 'Antwoord 1', 'Minterest helpt ondernemers met branding, websites, content, social media, vindbaarheid en slimme groeiondersteuning. We leveren geen losse diensten, maar bouwen complete oplossingen die bijdragen aan een professionele uitstraling, meer vertrouwen en betere commerciële kansen.'),
  t('faq.item.1.q', 'FAQ', 'Vraag 2', 'Hoe weet ik welke dienst ik nodig heb?'),
  m('faq.item.1.a', 'FAQ', 'Antwoord 2', 'Dat hoef je niet vooraf exact te weten. Tijdens een kennismaking kijken we naar je bedrijf, doelen en huidige situatie. Daarna adviseren we welke oplossing op dat moment het meeste waarde toevoegt, van branding of website tot content, marketing of een compleet groeitraject.'),
  t('faq.item.2.q', 'FAQ', 'Vraag 3', 'Kunnen jullie meerdere diensten combineren?'),
  m('faq.item.2.a', 'FAQ', 'Antwoord 3', 'Ja. Juist de combinatie maakt Minterest sterk. Een duidelijk merk, een converterende website, sterke content en betere vindbaarheid versterken elkaar. Daarom stellen we trajecten samen waarin meerdere onderdelen slim op elkaar aansluiten.'),
  t('faq.item.3.q', 'FAQ', 'Vraag 4', 'Werken jullie ook met bestaande websites of merken?'),
  m('faq.item.3.a', 'FAQ', 'Antwoord 4', 'Ja. We bouwen niet alleen vanaf nul, maar verbeteren ook bestaande websites, merken en campagnes. We kijken eerst wat al goed is, waar de grootste winst zit en of optimaliseren slimmer is dan volledig opnieuw beginnen.'),
  t('faq.item.4.q', 'FAQ', 'Vraag 5', 'Wat zijn extra groeidiensten?'),
  m('faq.item.4.a', 'FAQ', 'Antwoord 5', 'Extra groeidiensten zijn aanvullende oplossingen die ondernemers helpen slimmer, efficiënter en schaalbaarder te werken. Denk aan AI-oplossingen, automatisering, operationele ondersteuning, sourcing of administratieve processen. We zetten deze diensten alleen in wanneer ze direct bijdragen aan structuur, efficiëntie of groei.'),
  t('faq.item.5.q', 'FAQ', 'Vraag 6', 'Hoe ziet de samenwerking eruit?'),
  m('faq.item.5.a', 'FAQ', 'Antwoord 6', 'We starten met een kennismaking waarin we jouw bedrijf, doelen en uitdagingen bespreken. Daarna werken we een duidelijke aanpak, scope en planning uit. Vervolgens bouwen we de oplossing, leveren we professioneel op en denken we mee over de volgende stap wanneer verdere groei of optimalisatie nodig is.'),

  // ── Aanpak (Jouw groeiplan) ────────────────────────────────────────────────
  t('approach.eyebrow', 'Aanpak', 'Eyebrow', 'Jouw groeiplan'),
  t('approach.headingPre', 'Aanpak', 'Titel', 'Van idee naar '),
  t('approach.headingAccent', 'Aanpak', 'Titel (accent)', 'groei'),
  t('approach.headingPost', 'Aanpak', 'Titel (slot)', ', in vier stappen.'),
  m('approach.intro', 'Aanpak', 'Intro', 'Geen losse opdrachten, maar een plan dat opbouwt. Elke stap koppelt de juiste diensten aan jouw doel, zodat groei een route wordt in plaats van toeval.'),
  t('approach.step.0.title', 'Aanpak', 'Stap 1 titel', 'Kennismaking'),
  m('approach.step.0.desc', 'Aanpak', 'Stap 1 tekst', 'We ontdekken waar jouw bedrijf nu staat en waar de grootste kansen liggen.'),
  t('approach.step.1.title', 'Aanpak', 'Stap 2 titel', 'Strategie'),
  m('approach.step.1.desc', 'Aanpak', 'Stap 2 tekst', 'We kiezen de juiste oplossing voor jouw doel: branding, website, content, marketing of extra ondersteuning.'),
  t('approach.step.2.title', 'Aanpak', 'Stap 3 titel', 'Creatie'),
  m('approach.step.2.desc', 'Aanpak', 'Stap 3 tekst', 'We bouwen alles wat nodig is om jouw bedrijf sterker zichtbaar en professioneler te maken.'),
  t('approach.step.3.title', 'Aanpak', 'Stap 4 titel', 'Lancering & groei'),
  m('approach.step.3.desc', 'Aanpak', 'Stap 4 tekst', 'We leveren op, optimaliseren waar nodig en helpen je verder bouwen aan resultaat.'),
  t('approach.cta', 'Aanpak', 'Knop', 'Ontdek jouw groeikansen'),

  // ── Reviews ────────────────────────────────────────────────────────────────
  t('testimonials.eyebrow', 'Reviews', 'Eyebrow', 'Wat ondernemers over ons zeggen'),
  m('testimonials.intro', 'Reviews', 'Intro', "We leveren geen losse websites, video's of campagnes. We denken mee over wat jouw bedrijf nodig heeft om sterker zichtbaar te worden, vertrouwen op te bouwen en meer aanvragen te krijgen."),
  t('testimonials.quote.0.quote', 'Reviews', 'Review 1 titel', 'Ze keken verder dan alleen de website.'),
  m('testimonials.quote.0.detail', 'Reviews', 'Review 1 tekst', 'Minterest dacht mee over onze uitstraling, doelgroep en hoe we online meer vertrouwen konden opbouwen. Het resultaat voelt professioneel, duidelijk en veel sterker dan wat we eerst hadden.'),
  t('testimonials.quote.0.tag', 'Reviews', 'Review 1 label', 'Branding & website'),
  t('testimonials.quote.1.quote', 'Reviews', 'Review 2 titel', 'Alles voelt nu veel consistenter.'),
  m('testimonials.quote.1.detail', 'Reviews', 'Review 2 tekst', 'Van content tot uitstraling: alles sluit beter op elkaar aan. We zijn professioneler zichtbaar en krijgen vaker reacties van mensen die ons online hebben gezien.'),
  t('testimonials.quote.1.tag', 'Reviews', 'Review 2 label', 'Social media & content'),
  t('testimonials.quote.2.quote', 'Reviews', 'Review 3 titel', 'Fijn dat alles onder een dak zit.'),
  m('testimonials.quote.2.detail', 'Reviews', 'Review 3 tekst', 'We hoefden niet met vijf verschillende partijen te schakelen. Minterest dacht mee over de juiste oplossing en hielp ons stap voor stap om ons bedrijf beter neer te zetten.'),
  t('testimonials.quote.2.tag', 'Reviews', 'Review 3 label', 'Strategie, website & marketing'),
  t('testimonials.cta', 'Reviews', 'Knop', 'Start jouw groeigesprek'),

  // ── Slot-CTA ───────────────────────────────────────────────────────────────
  t('cta.eyebrow', 'Slot-CTA', 'Eyebrow', 'Waar interesse verandert in groei'),
  t('cta.headingPre', 'Slot-CTA', 'Titel', 'Klaar voor je volgende '),
  t('cta.headingAccent', 'Slot-CTA', 'Titel (accent)', 'groeistap?'),
  m('cta.paragraph', 'Slot-CTA', 'Tekst', 'Vertel ons waar je bedrijf nu staat. Wij kijken mee welke oplossing past om meer zichtbaarheid, vertrouwen en aanvragen te creeren.'),
  t('cta.primary', 'Slot-CTA', 'Knop 1', 'Plan een groeigesprek'),
  t('cta.secondary', 'Slot-CTA', 'Knop 2', 'Gratis website-audit'),
]

export const CONTENT_PAGES: PageContent[] = [
  {
    page: 'home',
    title: 'Homepage',
    fields: HOME_FIELDS,
  },
]

export function getPage(page: string): PageContent | undefined {
  return CONTENT_PAGES.find((p) => p.page === page)
}

export function getField(page: string, key: string): ContentField | undefined {
  return getPage(page)?.fields.find((f) => f.key === key)
}

/** Map of key -> default value for a page (the current live texts/photos). */
export function defaultsFor(page: string): Record<string, string> {
  const out: Record<string, string> = {}
  for (const f of getPage(page)?.fields ?? []) out[f.key] = f.default
  return out
}
