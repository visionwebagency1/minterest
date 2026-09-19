import type { SiteContent } from '../types'

/**
 * Demo content for Noord: a small business advisory firm. A professional
 * services site sells judgement, so the copy is sober, names what they actually
 * deliver and what it costs, and avoids the language every consultancy uses.
 */
export const noord: SiteContent = {
  business: {
    name: 'Noord Advies',
    claim: 'Financieel inzicht voor het mkb',
    phone: '050 851 30 22',
    email: 'contact@noordadvies.nl',
    street: 'Ubbo Emmiussingel 41',
    postcode: '9711 BC',
    city: 'Groningen',
    kvk: '58920144',
    hours: [
      { days: 'Maandag t/m donderdag', time: '08:30 - 17:30' },
      { days: 'Vrijdag', time: '08:30 - 15:00' },
      { days: 'Buiten kantooruren', time: 'Op afspraak' },
    ],
  },
  nav: [
    { label: 'Diensten', href: '#diensten' },
    { label: 'Werkwijze', href: '#werkwijze' },
    { label: 'Over ons', href: '#over' },
    { label: 'Contact', href: '#contact' },
  ],
  hero: {
    kicker: 'Advies voor het mkb in Noord-Nederland',
    title: 'Weten waar je staat, voordat je moet kiezen',
    accent: 'waar je staat',
    text: 'Administratie, jaarrekening en advies voor ondernemers met vijf tot vijftig medewerkers. Geen kwartaalrapport dat niemand leest, maar cijfers waar je een beslissing op kunt nemen.',
    primary: { label: 'Plan een kennismaking', href: '#contact' },
    secondary: { label: 'Bekijk onze diensten', href: '#diensten' },
    image: '/templates/noord/hero.jpg',
    badges: ['Vast maandtarief, geen nacalculatie', 'Vaste adviseur per klant', 'Gemiddeld binnen 48 uur antwoord'],
  },
  intro: {
    kicker: 'Over ons',
    title: 'Zes adviseurs, geen tussenlagen',
    body: [
      'Noord Advies is opgericht in 2014 door twee accountants die genoeg hadden van het uurtje-factuurtje-model. We werken met vaste tarieven en een vaste adviseur per klant.',
      'Onze klanten zitten in de bouw, de zorg en de technische groothandel, vooral in Groningen, Friesland en Drenthe.',
    ],
    image: '/templates/noord/a.jpg',
    points: [
      'Je spreekt altijd dezelfde adviseur, niet de assistent van de assistent',
      'Vast maandbedrag, ook als je tussendoor belt',
      'Rapportage in gewone taal, met een advies erbij',
    ],
  },
  services: {
    kicker: 'Diensten',
    title: 'Wat we voor ondernemers doen',
    intro: 'Losse opdrachten kunnen, maar de meeste klanten nemen het hele pakket af tegen een vast bedrag per maand.',
    items: [
      { icon: 'calculator', title: 'Administratie en btw', text: 'Boekhouding, btw-aangifte en loonadministratie. Digitaal aangeleverd, maandelijks bijgewerkt.' },
      { icon: 'briefcase', title: 'Jaarrekening en aangifte', text: 'Jaarrekening, vennootschapsbelasting en inkomstenbelasting, op tijd ingediend.' },
      { icon: 'chart', title: 'Stuurcijfers', text: 'Elke maand een overzicht van marge, kosten en liquiditeit, met wat eruit opvalt.' },
      { icon: 'compass', title: 'Financieringsaanvraag', text: 'Onderbouwing en prognose voor bank, investeerder of een kredietaanvraag.' },
      { icon: 'shield', title: 'Bedrijfsovername', text: 'Waardebepaling, boekenonderzoek en begeleiding bij koop of verkoop.' },
      { icon: 'clock', title: 'Interim controller', text: 'Tijdelijk een financieel geweten op locatie, een of twee dagen per week.' },
    ],
  },
  feature: {
    kicker: 'Werkwijze',
    title: 'Vier keer per jaar aan tafel, de rest gaat vanzelf',
    body: [
      'Je administratie loopt digitaal en grotendeels automatisch. Wat wij toevoegen zit in de vier gesprekken per jaar waarin we de cijfers naast je plannen leggen.',
      'Daar komt geen presentatie uit van veertig pagina’s, maar een lijstje met wat je kunt doen en wat dat oplevert.',
    ],
    image: '/templates/noord/b.jpg',
    points: ['Koppeling met je bank en je facturatiepakket', 'Vier kwartaalgesprekken inbegrepen', 'Tussendoor bellen kost niets extra'],
  },
  stats: [
    { value: '2014', label: 'opgericht in Groningen' },
    { value: '180+', label: 'ondernemers als klant' },
    { value: '48 uur', label: 'gemiddelde reactietijd' },
    { value: 'Vast', label: 'maandtarief, geen uurtjes' },
  ],
  testimonials: [
    {
      quote: 'Voor het eerst snap ik mijn eigen cijfers. Niet omdat ik slimmer ben geworden, maar omdat ze het uitleggen in taal die ik gebruik.',
      name: 'Rik Hoekstra',
      role: 'Directeur, technische groothandel',
    },
    {
      quote: 'Ze hebben onze financiering rondgekregen toen de bank in eerste instantie nee zei. De onderbouwing maakte het verschil.',
      name: 'Miriam Postma',
      role: 'Eigenaar, zorgorganisatie',
    },
  ],
  cta: {
    title: 'Benieuwd of het bij je past?',
    text: 'Een kennismaking duurt een uur en kost niets. Daarna weet je wat we zouden doen en wat het per maand kost.',
    button: 'Plan een kennismaking',
  },
}
