import type { SiteContent } from '../types'

/**
 * Demo content for Bloem: a neighbourhood bistro. Hospitality visitors want
 * three things fast: is it open, what do they serve, and can I reserve. The
 * copy and the layout put those first.
 */
export const bloem: SiteContent = {
  business: {
    name: 'Bistro Bloem',
    claim: 'Seizoenskeuken aan de Oudegracht',
    phone: '030 227 41 63',
    email: 'reserveren@bistrobloem.nl',
    street: 'Oudegracht 213',
    postcode: '3511 NH',
    city: 'Utrecht',
    hours: [
      { days: 'Woensdag t/m zaterdag', time: '17:00 - 23:00' },
      { days: 'Zondag', time: '12:00 - 21:00' },
      { days: 'Maandag en dinsdag', time: 'Gesloten' },
      { days: 'Keuken sluit', time: '21:30' },
    ],
  },
  nav: [
    { label: 'De kaart', href: '#kaart' },
    { label: 'Het huis', href: '#huis' },
    { label: 'Openingstijden', href: '#contact' },
    { label: 'Reserveren', href: '#contact' },
  ],
  hero: {
    kicker: 'Bistro aan de Oudegracht',
    title: 'Een kaart die meebeweegt met het seizoen',
    accent: 'het seizoen',
    text: 'Elke zes weken een nieuwe kaart, gemaakt met wat de telers in de buurt op dat moment hebben. Klein, vers en zonder poespas.',
    primary: { label: 'Reserveer een tafel', href: '#contact' },
    secondary: { label: 'Bekijk de kaart', href: '#kaart' },
    image: '/templates/bloem/hero.jpg',
    badges: ['Vanavond nog plek voor twee', 'Ook vegetarisch en veganistisch', 'Terras aan het water'],
  },
  intro: {
    kicker: 'Het huis',
    title: 'Dertig stoelen, een open keuken',
    body: [
      'Bistro Bloem is klein gehouden met opzet. Dertig stoelen, een open keuken en een kaart die iedereen in de keuken uit zijn hoofd kent.',
      'We werken met groente van de Utrechtse Heuvelrug, vlees van een slager uit Wijk bij Duurstede en vis die dezelfde ochtend binnenkomt.',
    ],
    image: '/templates/bloem/a.jpg',
    points: [
      'Wisselend driegangenmenu voor 37,50 per persoon',
      'Wijnen per glas, ook alcoholvrij goed geregeld',
      'Groepen tot twaalf personen in overleg',
    ],
  },
  services: {
    kicker: 'De kaart',
    title: 'Waar we nu mee werken',
    intro: 'Een greep uit de kaart van dit seizoen. De volledige kaart staat op tafel en wisselt om de zes weken.',
    items: [
      { icon: 'plate', title: 'Gerookte forel', text: 'Uit eigen rokerij, met venkel, appel en mierikswortel.', price: '€ 14,50' },
      { icon: 'chef', title: 'Hertenstoof', text: 'Langzaam gegaard in rode wijn, met knolselderij en tijm.', price: '€ 26,00' },
      { icon: 'leaf', title: 'Pompoen uit de oven', text: 'Met hazelnoot, salie en oude kaas. Ook veganistisch te maken.', price: '€ 21,50' },
      { icon: 'wine', title: 'Wijnarrangement', text: 'Drie glazen, gekozen bij jouw menu door onze gastvrouw.', price: '€ 19,50' },
      { icon: 'coffee', title: 'Zondagse lunch', text: 'Soep, brood en een hoofdgerecht, elke zondag vanaf twaalf uur.', price: '€ 24,50' },
      { icon: 'star', title: 'Chefs menu', text: 'Vijf gangen, wij kiezen. Alleen op woensdag en donderdag.', price: '€ 52,50' },
    ],
  },
  feature: {
    kicker: 'Koffie en taart',
    title: 'Op zondag gaan we om twaalf uur open',
    body: [
      'Zondag is onze rustigste en misschien wel mooiste dag. Koffie, zelfgebakken taart en een lunchkaart die de hele middag doorloopt.',
      'Reserveren hoeft niet, maar met mooi weer is het terras aan het water snel vol.',
    ],
    image: '/templates/bloem/b.jpg',
    points: ['Terras aan de werf', 'Honden zijn welkom', 'Geen minimale besteding'],
  },
  testimonials: [
    {
      quote: 'Elke keer een andere kaart en elke keer klopt het. De bediening weet precies wat er in de gerechten zit, ook bij allergieen.',
      name: 'Anneke Mulder',
      role: 'Vaste gast',
    },
    {
      quote: 'Met acht collega’s gegeten. Alles tegelijk op tafel, niemand hoefde te wachten, en de rekening klopte tot op de cent.',
      name: 'Tim de Rooij',
      role: 'Utrecht',
    },
  ],
  cta: {
    title: 'Vanavond een tafel?',
    text: 'Bel ons of reserveer online. Voor vanavond kun je het beste even bellen, dan weten we het meteen.',
    button: 'Bel 030 227 41 63',
  },
}
