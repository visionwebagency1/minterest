import type { SiteContent } from '../types'

/**
 * Demo content for Vakman: a landscaping company. The question a visitor has is
 * "kun je dit ook bij mij, wat kost het ongeveer en hoe lang duurt het", so the
 * copy talks about the work and the planning, not about passion for green.
 */
export const vakman: SiteContent = {
  business: {
    name: 'Vakman Hoveniers',
    claim: 'Tuinen aanleggen en onderhouden',
    phone: '055 303 88 17',
    email: 'info@vakmanhoveniers.nl',
    street: 'Deventerstraat 240',
    postcode: '7322 JL',
    city: 'Apeldoorn',
    kvk: '74119622',
    area: 'Apeldoorn, Deventer, Zutphen en omstreken',
    hours: [
      { days: 'Maandag t/m vrijdag', time: '07:00 - 16:30' },
      { days: 'Zaterdag', time: 'Op afspraak' },
      { days: 'Zondag', time: 'Gesloten' },
    ],
  },
  nav: [
    { label: 'Ons werk', href: '#werk' },
    { label: 'Diensten', href: '#diensten' },
    { label: 'Werkgebied', href: '#werkgebied' },
    { label: 'Offerte', href: '#contact' },
  ],
  hero: {
    kicker: 'Hovenier in Apeldoorn en omstreken',
    title: 'Een tuin die na vijf jaar nog steeds klopt',
    accent: 'vijf jaar',
    text: 'Aanleg, bestrating en onderhoud. We kiezen beplanting die past bij de grond en het licht, zodat je tuin met de jaren beter wordt in plaats van voller.',
    primary: { label: 'Vraag een offerte aan', href: '#contact' },
    secondary: { label: 'Bekijk ons werk', href: '#werk' },
    image: '/templates/vakman/hero.jpg',
    badges: ['Gratis ontwerp bij aanleg', 'Vaste ploeg, geen onderaannemers', 'Groenkeur gecertificeerd'],
  },
  intro: {
    kicker: 'Hoe we werken',
    title: 'Eerst de grond, dan pas het plan',
    body: [
      'We beginnen altijd met een bezoek. Hoe valt het licht, wat voor grond ligt er en wat wil je er eigenlijk doen. Daarna pas tekenen we.',
      'Je krijgt een ontwerp met een beplantingsplan en een prijs per onderdeel, zodat je kunt kiezen wat dit jaar gebeurt en wat later.',
    ],
    image: '/templates/vakman/a.jpg',
    points: [
      'Ontwerp en beplantingsplan inbegrepen bij aanleg',
      'Prijs per onderdeel, je kunt in fases werken',
      'Afvoer van oud materiaal en bestrating geregeld',
    ],
  },
  services: {
    kicker: 'Diensten',
    title: 'Wat we voor je doen',
    intro: 'Van een complete aanleg tot vier keer per jaar onderhoud. Ook alleen snoeien of bestraten kan.',
    items: [
      { icon: 'tree', title: 'Tuinaanleg', text: 'Ontwerp, grondwerk, beplanting en afwerking. Van schets tot opgeleverde tuin.' },
      { icon: 'shovel', title: 'Bestrating en terras', text: 'Natuursteen, gebakken klinkers of beton. Goed afgewaterd en strak gelegd.' },
      { icon: 'leaf', title: 'Onderhoud', text: 'Snoeien, wieden, bemesten en gazon. In een contract of per beurt.' },
      { icon: 'fence', title: 'Schuttingen en pergolas', text: 'Hardhout of douglas, op maat gemaakt en geplaatst op betonpoeren.' },
      { icon: 'droplet', title: 'Beregening en verlichting', text: 'Automatische besproeiing en tuinverlichting, aangelegd voordat de tuin dicht gaat.' },
      { icon: 'compass', title: 'Tuinontwerp los', text: 'Alleen een plan, om zelf mee verder te gaan of door een ander te laten uitvoeren.' },
    ],
  },
  feature: {
    kicker: 'Onderhoud',
    title: 'Vier beurten per jaar, dan blijft het mooi',
    body: [
      'De meeste tuinen die we aanleggen, houden we daarna bij. Vier beurten per jaar: voorjaar, twee keer in het seizoen en een winterbeurt.',
      'Je hoeft er niet voor thuis te zijn. Na elke beurt krijg je een bericht met wat we gedaan hebben en wat er de volgende keer aan de beurt is.',
    ],
    image: '/templates/vakman/b.jpg',
    points: ['Vanaf 340 euro per jaar voor een gemiddelde tuin', 'Afval voeren wij af', 'Opzegbaar per seizoen'],
  },
  stats: [
    { value: '400+', label: 'tuinen aangelegd' },
    { value: '12 jaar', label: 'vaste ploeg' },
    { value: 'Groenkeur', label: 'gecertificeerd' },
    { value: '30 km', label: 'werkgebied rond Apeldoorn' },
  ],
  testimonials: [
    {
      quote: 'Ze hebben onze achtertuin in twee weken omgetoverd en precies opgeleverd zoals op de tekening. Het terras ligt na drie winters nog kaarsrecht.',
      name: 'Hans en Ria Vermeer',
      role: 'Apeldoorn',
    },
    {
      quote: 'Duidelijke offerte per onderdeel, zodat we het in twee jaar konden doen. Geen nacalculatie achteraf.',
      name: 'Bianca Stoffels',
      role: 'Twello',
    },
  ],
  cta: {
    title: 'Benieuwd wat jouw tuin kost?',
    text: 'We komen vrijblijvend langs, kijken rond en sturen daarna een offerte met een tekening erbij.',
    button: 'Plan een bezoek',
  },
}
