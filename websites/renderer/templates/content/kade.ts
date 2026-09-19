import type { SiteContent } from '../types'

/**
 * Demo content for Kade: an installation and heating company. A trade site has
 * a different job from a salon site: it has to answer "kom je bij mij in de
 * buurt, kun je dit, en hoe snel", so the copy leads with region, certification
 * and response time.
 */
export const kade: SiteContent = {
  business: {
    name: 'Kade Installatietechniek',
    claim: 'Verwarming, water en duurzaam wonen',
    phone: '075 614 22 80',
    email: 'planning@kade-installatie.nl',
    street: 'Havenstraat 17',
    postcode: '1506 PH',
    city: 'Zaandam',
    kvk: '61240385',
    area: 'Zaanstreek, Waterland en Amsterdam-Noord',
    hours: [
      { days: 'Maandag t/m vrijdag', time: '07:30 - 17:00' },
      { days: 'Zaterdag', time: 'Op afspraak' },
      { days: 'Storingsdienst', time: '24 uur per dag' },
    ],
  },
  nav: [
    { label: 'Diensten', href: '#diensten' },
    { label: 'Werkgebied', href: '#werkgebied' },
    { label: 'Over ons', href: '#over' },
    { label: 'Contact', href: '#contact' },
  ],
  hero: {
    kicker: 'Installatiebedrijf in Zaandam',
    title: 'Storing vandaag gemeld, vandaag iemand langs',
    accent: 'vandaag',
    text: 'Cv, warmtepompen, leidingwerk en sanitair. Voor particulieren en voor beheerders, in de hele Zaanstreek en Amsterdam-Noord.',
    primary: { label: 'Storing melden', href: '#contact' },
    secondary: { label: 'Bekijk onze diensten', href: '#diensten' },
    image: '/templates/kade/hero.jpg',
    badges: ['Storingsdienst 24 uur', 'Gecertificeerd volgens BRL 6000', 'Vaste prijs vooraf'],
  },
  intro: {
    kicker: 'Over ons',
    title: 'Vier monteurs, geen callcenter',
    body: [
      'Kade is een klein installatiebedrijf. Je belt met de planning, niet met een centrale, en de monteur die langskomt kent je installatie de volgende keer nog.',
      'We werken sinds 2009 in de Zaanstreek, veel voor vaste klanten en voor vier verenigingen van eigenaren.',
    ],
    image: '/templates/kade/a.jpg',
    points: [
      'Altijd een prijsopgave voordat we beginnen',
      'Materiaal op voorraad in de bus, meestal in een bezoek klaar',
      'Twee jaar garantie op ons werk',
    ],
  },
  services: {
    kicker: 'Diensten',
    title: 'Waar we voor komen',
    intro: 'Van een lekkende kraan tot een complete overstap naar een warmtepomp.',
    items: [
      { icon: 'flame', title: 'Cv-ketel en onderhoud', text: 'Plaatsen, vervangen en jaarlijks onderhoud. Ook storingen buiten kantooruren.' },
      { icon: 'bolt', title: 'Warmtepompen', text: 'Advies, plaatsing en inregeling. We rekenen vooraf door of je woning geschikt is.' },
      { icon: 'droplet', title: 'Loodgieterswerk', text: 'Lekkages, leidingwerk, afvoeren en waterdruk. Snel opgelost, netjes achtergelaten.' },
      { icon: 'wrench', title: 'Badkamer en toilet', text: 'Complete installatie van sanitair, in overleg met je tegelzetter of aannemer.' },
      { icon: 'shield', title: 'Onderhoudscontract', text: 'Jaarlijkse beurt, voorrang bij storing en korting op het uurtarief.' },
      { icon: 'check', title: 'Keuring en rapportage', text: 'Inspectie en rapport voor verkoop, verhuur of een vereniging van eigenaren.' },
    ],
  },
  feature: {
    kicker: 'Duurzaam',
    title: 'Eerst rekenen, dan pas een warmtepomp',
    body: [
      'Een warmtepomp is niet in elke woning een goed idee. We kijken naar isolatie, radiatoren en je huidige verbruik voordat we iets aanraden.',
      'Past het niet, dan zeggen we dat. Past het wel, dan krijg je een berekening met de verwachte besparing en de subsidie die je kunt aanvragen.',
    ],
    image: '/templates/kade/b.jpg',
    points: ['Berekening van je werkelijke besparing', 'Hulp bij de ISDE-subsidie', 'Ook hybride oplossingen'],
  },
  stats: [
    { value: '16 jaar', label: 'in de Zaanstreek' },
    { value: '24 uur', label: 'storingsdienst' },
    { value: '2 jaar', label: 'garantie op ons werk' },
    { value: '4.8', label: 'gemiddelde beoordeling' },
  ],
  testimonials: [
    {
      quote: 'Op zondagavond gebeld met een lekkage, maandagochtend om half acht stond er iemand. Prijs was precies wat aan de telefoon was gezegd.',
      name: 'Jeroen Kramer',
      role: 'Particulier, Wormerveer',
    },
    {
      quote: 'Ze doen het onderhoud van 48 woningen voor ons. Afspraken worden nagekomen en de rapportage is op orde.',
      name: 'Sandra Wolters',
      role: 'Beheerder VvE, Zaandam',
    },
  ],
  cta: {
    title: 'Storing of een vraag over je installatie?',
    text: 'Bel ons of laat je nummer achter. Bij een storing bellen we binnen het uur terug.',
    button: 'Bel 075 614 22 80',
  },
}
