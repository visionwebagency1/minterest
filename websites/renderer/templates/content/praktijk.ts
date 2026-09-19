import type { SiteContent } from '../types'

/**
 * Demo content for Praktijk: a physiotherapy practice. Care sites are read by
 * someone in pain or in doubt, so the copy is calm, concrete about waiting
 * times and insurance, and never shouts.
 */
export const praktijk: SiteContent = {
  business: {
    name: 'Praktijk Verhoeven',
    claim: 'Fysiotherapie en manuele therapie',
    phone: '033 495 12 40',
    email: 'afspraak@praktijkverhoeven.nl',
    street: 'Utrechtseweg 118',
    postcode: '3818 EV',
    city: 'Amersfoort',
    hours: [
      { days: 'Maandag t/m donderdag', time: '07:30 - 20:00' },
      { days: 'Vrijdag', time: '07:30 - 17:00' },
      { days: 'Zaterdag', time: '09:00 - 13:00' },
      { days: 'Zondag', time: 'Gesloten' },
    ],
  },
  nav: [
    { label: 'Behandelingen', href: '#behandelingen' },
    { label: 'De praktijk', href: '#praktijk' },
    { label: 'Vergoeding', href: '#vergoeding' },
    { label: 'Afspraak', href: '#contact' },
  ],
  hero: {
    kicker: 'Fysiotherapie in Amersfoort',
    title: 'Binnen twee werkdagen terecht, zonder verwijzing',
    accent: 'twee werkdagen',
    text: 'Klachten aan rug, nek, schouder of knie. We kijken waar het vandaan komt en werken toe naar iets wat je zelf kunt volhouden.',
    primary: { label: 'Maak een afspraak', href: '#contact' },
    secondary: { label: 'Bekijk de behandelingen', href: '#behandelingen' },
    image: '/templates/praktijk/hero.jpg',
    badges: ['Meestal binnen 2 werkdagen', 'Contract met alle zorgverzekeraars', 'Geen verwijzing nodig'],
  },
  intro: {
    kicker: 'De praktijk',
    title: 'Een half uur per behandeling, en die is van jou',
    body: [
      'Bij ons duurt een behandeling een half uur en zit er niemand anders in de ruimte. Geen groepsoefeningen aan de zijkant, geen therapeut die tussendoor naar de volgende loopt.',
      'De praktijk zit op de begane grond aan de Utrechtseweg, met eigen parkeerplaatsen voor de deur.',
    ],
    image: '/templates/praktijk/a.jpg',
    points: [
      'Altijd dezelfde therapeut gedurende je traject',
      'Oefeningen die je thuis in tien minuten doet',
      'Rapportage naar je huisarts als je dat wilt',
    ],
  },
  services: {
    kicker: 'Behandelingen',
    title: 'Waarvoor je bij ons terecht kunt',
    intro: 'Twijfel je of wij de juiste plek zijn? Bel gerust, we zeggen het eerlijk als je bij iemand anders beter zit.',
    items: [
      { icon: 'activity', title: 'Algemene fysiotherapie', text: 'Klachten aan spieren en gewrichten, na blessure, overbelasting of operatie.' },
      { icon: 'hand', title: 'Manuele therapie', text: 'Voor nek, rug en bekken. Gericht op gewrichten die niet goed meebewegen.' },
      { icon: 'heart', title: 'Revalidatie na operatie', text: 'Opbouwschema na knie-, heup- of schouderoperatie, in overleg met je specialist.' },
      { icon: 'stethoscope', title: 'Dry needling', text: 'Bij hardnekkige spierknopen, als aanvulling binnen de behandeling.' },
      { icon: 'shield', title: 'Arbeidsfysiotherapie', text: 'Klachten door je werkhouding. We kijken mee naar je werkplek.' },
      { icon: 'compass', title: 'Beweegadvies 65-plus', text: 'Balans, kracht en vertrouwen in bewegen, om vallen te voorkomen.' },
    ],
  },
  feature: {
    kicker: 'Vergoeding',
    title: 'Wat je zelf betaalt, en wat je verzekering doet',
    body: [
      'Wij hebben een contract met alle zorgverzekeraars. Heb je een aanvullende verzekering, dan declareren wij rechtstreeks en zie je er niets van.',
      'Zonder aanvullende verzekering betaal je 38,50 per behandeling. Bij chronische klachten vergoedt de basisverzekering vanaf de 21e behandeling.',
    ],
    image: '/templates/praktijk/b.jpg',
    points: ['Directe declaratie bij je verzekeraar', 'Geen eigen risico bij aanvullende dekking', 'Duidelijk tarief als je niet verzekerd bent'],
  },
  stats: [
    { value: '2 dagen', label: 'gemiddelde wachttijd' },
    { value: '30 min', label: 'per behandeling' },
    { value: '4 therapeuten', label: 'in de praktijk' },
    { value: '9.1', label: 'patientwaardering' },
  ],
  testimonials: [
    {
      quote: 'Na mijn knieoperatie hier gerevalideerd. Elke week een duidelijk doel, en uitleg waarom we iets deden. Dat hielp enorm.',
      name: 'Willem Broekhuis',
      role: 'Amersfoort',
    },
    {
      quote: 'Ik kon de volgende dag terecht met mijn nek. Geen wachtlijst, geen gedoe met een verwijzing.',
      name: 'Fatima el Idrissi',
      role: 'Leusden',
    },
  ],
  cta: {
    title: 'Liever eerst even overleggen?',
    text: 'Bel ons en vertel kort wat er speelt. We zeggen eerlijk of wij kunnen helpen en wanneer je terecht kunt.',
    button: 'Bel 033 495 12 40',
  },
}
