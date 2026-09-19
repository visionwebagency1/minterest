import type { SiteContent } from '../types'

/**
 * Demo content for Atelier: a hair and beauty salon. Written as a real salon
 * would write it, with named treatments, real prices and real opening hours,
 * because that is what a visitor is looking for and what a customer has to be
 * able to recognise as their own site.
 */
export const atelier: SiteContent = {
  business: {
    name: 'Studio Atelier',
    claim: 'Haar en huid, met aandacht',
    phone: '023 842 19 05',
    email: 'hallo@studioatelier.nl',
    street: 'Gedempte Oude Gracht 84',
    postcode: '2011 GT',
    city: 'Haarlem',
    hours: [
      { days: 'Dinsdag en woensdag', time: '09:00 - 18:00' },
      { days: 'Donderdag', time: '09:00 - 21:00' },
      { days: 'Vrijdag en zaterdag', time: '09:00 - 17:00' },
      { days: 'Zondag en maandag', time: 'Gesloten' },
    ],
  },
  nav: [
    { label: 'Behandelingen', href: '#behandelingen' },
    { label: 'De studio', href: '#studio' },
    { label: 'Prijzen', href: '#behandelingen' },
    { label: 'Contact', href: '#contact' },
  ],
  hero: {
    kicker: 'Kapsalon in hartje Haarlem',
    title: 'Een coupe die bij jouw haar past',
    accent: 'jouw haar',
    text: 'Wij nemen de tijd. Eerst kijken en luisteren, dan pas knippen. Zo loop je naar buiten met haar dat thuis net zo goed zit als hier.',
    primary: { label: 'Maak een afspraak', href: '#contact' },
    secondary: { label: 'Bekijk de prijzen', href: '#behandelingen' },
    image: '/templates/atelier/hero.jpg',
    badges: ['Vandaag nog een plek vrij', 'Werkt met natuurlijke producten', 'Ook zonder afspraak mogelijk'],
  },
  intro: {
    kicker: 'De studio',
    title: 'Rust, ruimte en iemand die luistert',
    body: [
      'Studio Atelier is een kleine salon aan de Gedempte Oude Gracht. Twee stoelen, geen wachtrij en alle tijd voor het gesprek dat aan een goede coupe voorafgaat.',
      'We werken met producten op natuurlijke basis, ook voor kleur. Beter voor je haar, en je ruikt het niet de hele week nog.',
    ],
    image: '/templates/atelier/a.jpg',
    points: [
      'Altijd dezelfde kapper, je hoeft je verhaal niet opnieuw te doen',
      'Advies over onderhoud thuis, zonder dat je de halve schap mee moet',
      'Rolstoeltoegankelijk en met een kinderstoel',
    ],
  },
  services: {
    kicker: 'Behandelingen',
    title: 'Wat we doen, en wat het kost',
    intro: 'Prijzen zijn inclusief wassen, drogen en stylen. Kleurbehandelingen bespreken we altijd eerst.',
    items: [
      { icon: 'scissors', title: 'Knippen dames', text: 'Wassen, knippen, drogen en stylen. Inclusief advies voor thuis.', price: '€ 42,50' },
      { icon: 'scissors', title: 'Knippen heren', text: 'Strak knippen met schaar of tondeuse, baard bijwerken kan erbij.', price: '€ 29,50' },
      { icon: 'brush', title: 'Kleuren en highlights', text: 'Uitgroei, volledige kleur of highlights met folie, altijd na een kleurtest.', price: 'vanaf € 65' },
      { icon: 'droplet', title: 'Keratine behandeling', text: 'Voor pluizig of beschadigd haar. Resultaat houdt drie tot vier maanden aan.', price: 'vanaf € 120' },
      { icon: 'sparkle', title: 'Bruidskapsel', text: 'Proefkapsel, de dag zelf aan huis of in de studio. In overleg samengesteld.', price: 'op aanvraag' },
      { icon: 'heart', title: 'Kinderen tot 12 jaar', text: 'Rustig knippen, in hun eigen tempo, met een eigen spiegel.', price: '€ 19,50' },
    ],
  },
  feature: {
    kicker: 'Producten',
    title: 'Wat we gebruiken, kun je meenemen',
    body: [
      'We werken met een kleine, zorgvuldig gekozen lijn: shampoo, conditioner en styling zonder siliconen en sulfaten.',
      'Je bent niet verplicht iets te kopen. Maar als je thuis hetzelfde resultaat wilt, weet je in elk geval waarmee.',
    ],
    image: '/templates/atelier/b.jpg',
    points: ['Vegan en niet op dieren getest', 'Navulverpakking beschikbaar', 'Advies op jouw haartype'],
  },
  testimonials: [
    {
      quote: 'Voor het eerst een kapper die vraagt hoeveel tijd ik s ochtends aan mijn haar wil besteden. Het antwoord was vijf minuten, en het lukt.',
      name: 'Marije de Bruin',
      role: 'Klant sinds 2022',
    },
    {
      quote: 'Rustige plek, geen harde muziek, en ze doen precies wat je vraagt. Mijn dochter durft er nu ook.',
      name: 'Erik Havenaar',
      role: 'Haarlem',
    },
  ],
  cta: {
    title: 'Even bellen is vaak het snelst',
    text: 'Bel of app ons voor een afspraak. Losse plekken vallen regelmatig vrij, ook op korte termijn.',
    button: 'Bel 023 842 19 05',
  },
}
