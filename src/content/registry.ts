import type { ContentField, PageContent } from './types'
import { MAIN_SERVICES } from '@/data/services'

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

const GLOBAL_FIELDS: ContentField[] = [
  t('footer.tagline', 'Footer', 'Slogan', 'Waar aandacht verandert in groei.'),
  m('footer.description', 'Footer', 'Omschrijving', 'Merk, website, video, social en vindbaarheid, gebouwd om je groei te laten klimmen.'),
  t('footer.copyright', 'Footer', 'Copyright', '© 2026 Minterest. Alle rechten voorbehouden.'),
]

const ABOUT_FIELDS: ContentField[] = [
  // hero
  t('hero.kicker', 'Hero', 'Eyebrow', 'Over Minterest'),
  t('hero.titlePre', 'Hero', 'Titel', 'Een partner voor je volgende '),
  t('hero.titleAccent', 'Hero', 'Titel (accent)', 'groeistap.'),
  m('hero.tagline', 'Hero', 'Tagline', 'Bij Minterest starten we niet bij een losse dienst, maar bij wat jouw bedrijf nodig heeft om sterker zichtbaar te worden, vertrouwen op te bouwen en meer resultaat te halen. Van branding en websites tot content, vindbaarheid en extra ondersteuning: we bouwen oplossingen die met je bedrijf meegroeien.'),
  t('hero.primary', 'Hero', 'Knop 1', 'Werk met ons'),
  t('hero.secondary', 'Hero', 'Knop 2', 'Bekijk ons werk'),
  // values
  t('value.0.title', 'Waarden', 'Waarde 1 titel', 'Een team, geen losse schakels'),
  m('value.0.desc', 'Waarden', 'Waarde 1 tekst', 'Strategie, design, development, content en marketing komen samen in een duidelijke aanpak.'),
  t('value.1.title', 'Waarden', 'Waarde 2 titel', 'Oplossing boven uitvoering'),
  m('value.1.desc', 'Waarden', 'Waarde 2 tekst', 'We leveren niet zomaar een website, video of campagne. We kijken eerst wat jouw bedrijf nodig heeft.'),
  t('value.2.title', 'Waarden', 'Waarde 3 titel', 'Gebouwd om door te groeien'),
  m('value.2.desc', 'Waarden', 'Waarde 3 tekst', 'Alles wat we maken moet professioneel staan, praktisch werken en klaar zijn voor de volgende stap.'),
  // headings + support
  t('servicesHeading', 'Secties', 'Kop diensten', 'Onze zes diensten'),
  t('supportHeading', 'Secties', 'Kop ondersteuning', 'Achter de schermen'),
  t('support.0.title', 'Achter de schermen', 'Blok 1 titel', 'Administratie'),
  m('support.0.desc', 'Achter de schermen', 'Blok 1 tekst', 'We koppelen ondernemers aan overzichtelijke administratieve ondersteuning, zodat er meer rust en structuur ontstaat.'),
  t('support.1.title', 'Achter de schermen', 'Blok 2 titel', 'Sourcing & inkoop'),
  m('support.1.desc', 'Achter de schermen', 'Blok 2 tekst', 'We helpen met het vinden en vergelijken van producten, leveranciers en inkoopmogelijkheden.'),
]

const CONTACT_FIELDS: ContentField[] = [
  t('hero.kicker', 'Hero', 'Eyebrow', 'Contact'),
  t('hero.titlePre', 'Hero', 'Titel', 'Even '),
  t('hero.titleAccent', 'Hero', 'Titel (accent)', 'kennismaken?'),
  m('hero.tagline', 'Hero', 'Tagline', 'Vertel ons waar je nu staat en waar je naartoe wilt. We kijken graag mee welke oplossing past om jouw bedrijf sterker zichtbaar te maken, meer vertrouwen op te bouwen en verder te groeien.'),
  t('directHeading', 'Direct contact', 'Kop', 'Liever direct contact?'),
  m('directText', 'Direct contact', 'Tekst', 'Stuur ons een bericht via WhatsApp of mail. We reageren snel en denken direct met je mee.'),
  t('hours', 'Direct contact', 'Bereikbaarheid', 'Nederland · ma t/m vr, 09:00 tot 18:00'),
  t('form.interestLabel', 'Formulier', 'Interesse-label', 'Waar ben je in geinteresseerd?'),
  t('form.submit', 'Formulier', 'Verzendknop', 'Verstuur je groeivraag'),
  t('form.successTitle', 'Formulier', 'Bedankt-titel', 'Dank je!'),
  m('form.successText', 'Formulier', 'Bedankt-tekst', 'We hebben je bericht ontvangen en nemen snel contact op.'),
]

const WORK_FIELDS: ContentField[] = [
  t('hero.kicker', 'Hero', 'Eyebrow', 'Uitgelicht werk'),
  t('hero.titlePre', 'Hero', 'Titel', 'Werk dat bedrijven '),
  t('hero.titleAccent', 'Hero', 'Titel (accent)', 'vooruitbrengt.'),
  m('hero.tagline', 'Hero', 'Tagline', 'Een selectie van websites, branding, content en campagnes die bedrijven sterker zichtbaar maken, vertrouwen opbouwen en meer resultaat opleveren.'),
  t('hero.primary', 'Hero', 'Knop 1', 'Start jouw groeitraject'),
  t('hero.secondary', 'Hero', 'Knop 2', 'Bekijk diensten'),
  t('cat.0', 'Categorieën', 'Categorie 1', 'Alle'),
  t('cat.1', 'Categorieën', 'Categorie 2', 'Websites'),
  t('cat.2', 'Categorieën', 'Categorie 3', 'Webshops'),
  t('cat.3', 'Categorieën', 'Categorie 4', 'Branding'),
  t('cat.4', 'Categorieën', 'Categorie 5', 'Video & Fotografie'),
  t('cat.5', 'Categorieën', 'Categorie 6', 'Social Media'),
  t('cat.6', 'Categorieën', 'Categorie 7', 'SEO & SEA'),
]

const AUDIT_FIELDS: ContentField[] = [
  t('hero.kicker', 'Hero', 'Eyebrow', 'Gratis website-audit'),
  t('hero.titlePre', 'Hero', 'Titel', 'Hoe scoort '),
  t('hero.titleAccent', 'Hero', 'Titel (accent)', 'jouw site?'),
  m('hero.tagline', 'Hero', 'Tagline', 'Plak je link en je krijgt binnen 24 uur een eerlijke analyse met concrete groeikansen. Gratis en zonder verplichtingen.'),
  t('form.label', 'Formulier', 'Kop', 'Vraag je gratis audit aan'),
  t('form.submit', 'Formulier', 'Knop', 'Audit aanvragen'),
  t('form.fineprint', 'Formulier', 'Kleine tekst', 'Binnen 24 uur · gratis · geen verplichtingen'),
  t('form.successTitle', 'Formulier', 'Bedankt-titel', 'Onderweg!'),
  m('form.successText', 'Formulier', 'Bedankt-tekst', 'We analyseren je site en sturen je rapport binnen 24 uur. Houd je inbox in de gaten.'),
  t('get.eyebrow', 'Wat je krijgt', 'Eyebrow', 'Wat je krijgt'),
  t('get.headingPre', 'Wat je krijgt', 'Titel', 'Zes punten die je '),
  t('get.headingAccent', 'Wat je krijgt', 'Titel (accent)', 'groei'),
  t('get.headingPost', 'Wat je krijgt', 'Titel (slot)', ' bepalen.'),
  t('check.0.title', 'Wat je krijgt', 'Punt 1 titel', 'Snelheid'),
  m('check.0.desc', 'Wat je krijgt', 'Punt 1 tekst', 'Laadtijd en Core Web Vitals, waar je bezoekers afhaken.'),
  t('check.1.title', 'Wat je krijgt', 'Punt 2 titel', 'SEO & vindbaarheid'),
  m('check.1.desc', 'Wat je krijgt', 'Punt 2 tekst', 'Hoe goed Google je site begrijpt en toont.'),
  t('check.2.title', 'Wat je krijgt', 'Punt 3 titel', 'Conversie'),
  m('check.2.desc', 'Wat je krijgt', 'Punt 3 tekst', 'Of bezoekers ook echt klant worden.'),
  t('check.3.title', 'Wat je krijgt', 'Punt 4 titel', 'Design & uitstraling'),
  m('check.3.desc', 'Wat je krijgt', 'Punt 4 tekst', 'De eerste indruk en het vertrouwen dat je wekt.'),
  t('check.4.title', 'Wat je krijgt', 'Punt 5 titel', 'Mobiele ervaring'),
  m('check.4.desc', 'Wat je krijgt', 'Punt 5 tekst', 'Hoe je site werkt op de telefoon, waar de meesten kijken.'),
  t('check.5.title', 'Wat je krijgt', 'Punt 6 titel', 'Techniek & security'),
  m('check.5.desc', 'Wat je krijgt', 'Punt 6 tekst', 'Schone code, veilige verbinding, geen losse eindjes.'),
  t('how.heading', 'Hoe het werkt', 'Kop', 'Hoe het werkt'),
  t('step.0.title', 'Hoe het werkt', 'Stap 1 titel', 'Plak je link'),
  m('step.0.desc', 'Hoe het werkt', 'Stap 1 tekst', 'Dertig seconden werk. Meer hebben we niet nodig om te starten.'),
  t('step.1.title', 'Hoe het werkt', 'Stap 2 titel', 'Wij duiken erin'),
  m('step.1.desc', 'Hoe het werkt', 'Stap 2 tekst', 'Een mens kijkt mee, geen automatische bot-score.'),
  t('step.2.title', 'Hoe het werkt', 'Stap 3 titel', 'Rapport binnen 24 uur'),
  m('step.2.desc', 'Hoe het werkt', 'Stap 3 tekst', 'Concrete punten en quick wins die je direct kunt oppakken.'),
  t('finalCta.headingPre', 'Slot-CTA', 'Titel', 'Klaar voor de '),
  t('finalCta.headingAccent', 'Slot-CTA', 'Titel (accent)', 'klim?'),
  t('finalCta.button', 'Slot-CTA', 'Knop', 'Vraag je audit aan'),
]

const START_FIELDS: ContentField[] = [
  t('hero.kicker', 'Hero', 'Eyebrow', 'Start jouw project'),
  t('hero.titlePre', 'Hero', 'Titel', 'Laten we iets '),
  t('hero.titleAccent', 'Hero', 'Titel (accent)', 'moois'),
  t('hero.titlePost', 'Hero', 'Titel (slot)', ' bouwen.'),
  m('hero.tagline', 'Hero', 'Tagline', 'Vertel ons waar je staat en waar je heen wil. Binnen twee werkdagen plannen we een vrijblijvend gesprek met een eerste plan.'),
  t('form.pickLabel', 'Formulier', 'Kop', 'Waar kunnen we mee helpen?'),
  t('form.pickHint', 'Formulier', 'Subkop', 'Kies één of meer diensten.'),
  t('form.budgetLabel', 'Formulier', 'Budget-placeholder', 'Budget'),
  t('form.timelineLabel', 'Formulier', 'Tijdlijn-placeholder', 'Tijdlijn'),
  t('form.submit', 'Formulier', 'Knop', 'Verstuur aanvraag'),
  t('form.successTitle', 'Formulier', 'Bedankt-titel', 'Top, bedankt!'),
  m('form.successText', 'Formulier', 'Bedankt-tekst', 'We hebben je aanvraag binnen. Je hoort binnen twee werkdagen van ons met een eerste plan.'),
  t('budget.0', 'Budgetopties', 'Optie 1', 'Nog niet zeker'),
  t('budget.1', 'Budgetopties', 'Optie 2', 'Tot € 1.000'),
  t('budget.2', 'Budgetopties', 'Optie 3', '€ 1.000 tot € 5.000'),
  t('budget.3', 'Budgetopties', 'Optie 4', '€ 5.000 tot € 15.000'),
  t('budget.4', 'Budgetopties', 'Optie 5', '€ 15.000+'),
  t('timeline.0', 'Tijdlijnopties', 'Optie 1', 'Zo snel mogelijk'),
  t('timeline.1', 'Tijdlijnopties', 'Optie 2', 'Binnen 1 maand'),
  t('timeline.2', 'Tijdlijnopties', 'Optie 3', '1 tot 3 maanden'),
  t('timeline.3', 'Tijdlijnopties', 'Optie 4', 'Later dit jaar'),
  t('trust.headingPre', 'Waarom starten', 'Titel', 'Waarom met ons '),
  t('trust.headingAccent', 'Waarom starten', 'Titel (accent)', 'starten'),
  t('trust.headingPost', 'Waarom starten', 'Titel (slot)', '.'),
  t('why.0.title', 'Waarom starten', 'Reden 1 titel', 'Eén team, geen overdrachten'),
  m('why.0.desc', 'Waarom starten', 'Reden 1 tekst', 'Strategie, design, build en groei aan dezelfde tafel.'),
  t('why.1.title', 'Waarom starten', 'Reden 2 titel', 'Heldere prijzen'),
  m('why.1.desc', 'Waarom starten', 'Reden 2 tekst', 'Vooraf weten waar je aan toe bent. Geen verrassingen.'),
  t('why.2.title', 'Waarom starten', 'Reden 3 titel', 'Snel van start'),
  m('why.2.desc', 'Waarom starten', 'Reden 3 tekst', 'Binnen een week na de kennismaking liggen de eerste plannen er.'),
  m('review.quote', 'Review', 'Quote', 'Van eerste mail tot live in vier weken. Strak geregeld en het resultaat overtrof de verwachting.'),
  t('review.name', 'Review', 'Naam', 'Mark Jansen'),
  t('review.company', 'Review', 'Bedrijf', 'Ascend Labs'),
]

const SERVICES_FIELDS: ContentField[] = [
  t('hero.eyebrow', 'Hero', 'Eyebrow', 'Onze diensten'),
  t('hero.headingPre', 'Hero', 'Titel', 'Zes diensten, één '),
  t('hero.headingAccent', 'Hero', 'Titel (accent)', 'opwaartse'),
  t('hero.headingPost', 'Hero', 'Titel (slot)', ' beweging.'),
  m('hero.intro', 'Hero', 'Intro', 'Van merk en website tot video, social, vindbaarheid en alles eromheen. Elke dienst haakt in op de volgende en tilt je merk stap voor stap hoger.'),
]

const TERMS_FIELDS: ContentField[] = [
  t('hero.kicker', 'Hero', 'Eyebrow', 'Juridisch'),
  t('hero.title', 'Hero', 'Titel', 'Algemene Voorwaarden'),
  m('hero.tagline', 'Hero', 'Tagline', 'De afspraken die onze samenwerking helder, professioneel en eerlijk houden. Lees ze rustig door, of vraag ons gerust om toelichting.'),
]

// One editor page per service landing page. Defaults come straight from the
// service data, so no text is duplicated by hand. Only the two big prose blocks
// (tagline + intro) are editable here; labels, sub-services and steps stay in
// code because they are tied to routing and computed layouts.
const SERVICE_PAGES: PageContent[] = MAIN_SERVICES.map((s) => ({
  page: `dienst-${s.slug}`,
  title: `Dienst: ${s.label}`,
  fields: [
    m('tagline', 'Hero', 'Tagline', s.tagline),
    m('intro', 'De oplossing', 'Introtekst (*woord* = accent)', s.intro),
  ],
}))

export const CONTENT_PAGES: PageContent[] = [
  { page: 'home', title: 'Homepage', fields: HOME_FIELDS },
  { page: 'services', title: 'Diensten-overzicht', fields: SERVICES_FIELDS },
  ...SERVICE_PAGES,
  { page: 'about', title: 'Over ons', fields: ABOUT_FIELDS },
  { page: 'work', title: 'Portfolio', fields: WORK_FIELDS },
  { page: 'contact', title: 'Contact', fields: CONTACT_FIELDS },
  { page: 'start', title: 'Start jouw project', fields: START_FIELDS },
  { page: 'website-audit', title: 'Website-audit', fields: AUDIT_FIELDS },
  { page: 'terms', title: 'Algemene Voorwaarden', fields: TERMS_FIELDS },
  { page: 'global', title: 'Footer (alle pagina\'s)', fields: GLOBAL_FIELDS },
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
