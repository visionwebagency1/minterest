/** Content for the four service pages, rendered through ServicePage. */

export type Feature = { title: string; desc: string; img: string }
export type Deliverable = { title: string; desc: string }

export type Service = {
  no: string
  kicker: string
  label: string
  tagline: string
  intro: string
  features: Feature[]
  deliverables: Deliverable[]
}

// Stock photos via Lorem Picsum (reliable). Swap the seeds for real project /
// brand photography when available.
export const img = (seed: string) =>
  `https://picsum.photos/seed/${seed}/1000/720`

export const SERVICES: Record<string, Service> = {
  websites: {
    no: '01',
    kicker: 'Web & commerce',
    label: 'Websites & webshops',
    tagline:
      'Snelle, converterende websites en webshops die er strak uitzien en verkopen. Van landingspagina tot complete Shopify of WooCommerce shop.',
    intro:
      'Je website is je hardst werkende *verkoper*. Wij bouwen digitale producten die laden in een *oogwenk*, fijn werken op elk scherm en meegroeien met je *ambitie*, van eerste bezoeker tot *duizenden orders*.',
    features: [
      { title: 'Gebouwd op snelheid', desc: 'Elke milliseconde telt. We bouwen op een moderne stack zoals Next.js en React, zodat je site al staat voordat bezoekers afhaken. Een 100 op PageSpeed is geen toeval, maar het uitgangspunt.', img: 'mint-speed-web' },
      { title: 'Gemaakt om te verkopen', desc: 'Van productpagina tot afrekenen: elke stap is ontworpen op conversie. Shopify of WooCommerce, volledig op maat ingericht rond hoe jouw klanten kopen.', img: 'mint-shop-cart' },
      { title: 'Vindbaar en schaalbaar', desc: 'Technische SEO, schone code en een fundament dat meegroeit. Vandaag een strakke site, morgen een platform dat duizenden bezoekers moeiteloos aankan.', img: 'mint-seo-growth' },
    ],
    deliverables: [
      { title: 'Shopify & WooCommerce', desc: 'De juiste webshop-basis voor jouw producten, volledig op maat ingericht.' },
      { title: 'Maatwerk in Next.js & React', desc: 'Een razendsnelle, moderne stack die jaren probleemloos meegaat.' },
      { title: 'Technische SEO', desc: 'Schone structuur en code, zodat Google je site begrijpt en toont.' },
      { title: 'Conversie-optimalisatie', desc: 'Elke pagina stuurt bezoekers naar één duidelijke volgende stap.' },
      { title: 'Hosting & onderhoud', desc: 'We houden alles snel, veilig en up-to-date. Jij hebt er geen omkijken naar.' },
      { title: 'Analytics & tracking', desc: 'Inzicht in wat werkt, zodat groei geen toeval is maar een keuze.' },
    ],
  },
  branding: {
    no: '02',
    kicker: 'Merk & identiteit',
    label: 'Design & branding',
    tagline:
      'Een merk dat blijft hangen. Van logo en huisstijl tot een compleet designsysteem dat overal consistent werkt.',
    intro:
      'Een sterk *merk* is herkenbaar in een oogopslag en consistent over elk kanaal. We bouwen een visuele taal met *karakter*, die *vertrouwen* wekt en met je meegroeit.',
    features: [
      { title: 'Een merk met karakter', desc: 'Logo, wordmark en kernidentiteit die kloppen, van visitekaartje tot billboard. Onderscheidend, tijdloos en helemaal van jou.', img: 'mint-brand-logo' },
      { title: 'Consistent op elk kanaal', desc: 'Een designsysteem met herbruikbare bouwstenen: kleuren, typografie en componenten. Zo ziet alles er overal even scherp uit.', img: 'mint-design-system' },
      { title: 'Richtlijnen die houvast geven', desc: 'Heldere merkrichtlijnen zodat iedereen, intern en extern, je merk juist inzet. Geen ruis, wel consistentie.', img: 'mint-brand-guidelines' },
    ],
    deliverables: [
      { title: 'Logo & wordmark', desc: 'Een herkenbaar merkteken dat in elke maat en context blijft kloppen.' },
      { title: 'Visuele identiteit', desc: 'Kleur, typografie en beeld die samen één onmiskenbaar geheel vormen.' },
      { title: 'Designsysteem', desc: 'Herbruikbare bouwstenen voor een consistente uitstraling overal.' },
      { title: 'Merkrichtlijnen', desc: 'Heldere regels zodat iedereen je merk juist en sterk inzet.' },
      { title: 'Art direction', desc: 'De toon en richting die je merk onmiskenbaar en eigen maken.' },
      { title: 'Merkstrategie', desc: 'Positionering die je onderscheidt en ruimte geeft om te groeien.' },
    ],
  },
  video: {
    no: '03',
    kicker: 'Bewegend beeld',
    label: 'Short video content',
    tagline:
      'Video die kijkers vasthoudt en aanzet tot actie. Wij bedenken, draaien en monteren content die het goed doet op social.',
    intro:
      'Korte video is het snelste pad naar *aandacht*. We maken *scroll-stoppende* content die past bij je merk en werkt op de feed, van concept tot kant-en-klare *clip*.',
    features: [
      { title: 'Concept dat blijft hangen', desc: 'Ideeën en scenario afgestemd op je publiek en platform. Eerst de haak, dan de boodschap, altijd in jouw merkstijl.', img: 'mint-video-concept' },
      { title: 'Productie van A tot Z', desc: 'Van shoot tot set, strak geregeld en in hoge kwaliteit. Wij regelen de regie, jij ziet het resultaat.', img: 'mint-video-production' },
      { title: 'Klaar voor elk platform', desc: 'Montage en motion die het ritme bepalen, geoptimaliseerd voor Reels, TikTok en Shorts. Direct te plaatsen.', img: 'mint-video-edit' },
    ],
    deliverables: [
      { title: 'Concept & scenario', desc: 'Ideeën met een sterke haak, afgestemd op je publiek en doel.' },
      { title: 'Draaiboek', desc: 'Alles vooraf uitgedacht, zodat de opnamedag soepel verloopt.' },
      { title: 'Opname & regie', desc: 'Strak geregeld op de set, in hoge en consistente kwaliteit.' },
      { title: 'Montage & motion', desc: 'Ritme, tekst en effecten die de aandacht vasthouden tot het eind.' },
      { title: 'Social-ready exports', desc: 'Elk formaat kant-en-klaar voor Reels, TikTok en Shorts.' },
      { title: 'Contentkalender', desc: 'Een vast ritme van content dat je kanaal laat groeien.' },
    ],
  },
  influencer: {
    no: '04',
    kicker: 'Bereik & creators',
    label: 'Influencer marketing',
    tagline:
      'De juiste makers aan jouw merk koppelen. Wij regelen matching, strategie en content die echt resultaat oplevert.',
    intro:
      'Mensen *vertrouwen* mensen. We koppelen je merk aan *creators* die jouw publiek echt bereiken en sturen op *resultaat*, niet op ijdele cijfers.',
    features: [
      { title: 'De juiste creators', desc: 'We selecteren makers die passen bij je merk en publiek, op basis van echte betrokkenheid in plaats van alleen volgers.', img: 'mint-creator-match' },
      { title: 'Strategie op resultaat', desc: 'Heldere doelen, boodschap en kanalen vooraf scherp. Elke campagne is gebouwd om iets te bereiken.', img: 'mint-influencer-strategy' },
      { title: 'Meten en opschalen', desc: 'Transparante rapportage en bijsturen op wat werkt. We schalen op wat presteert en laten de rest los.', img: 'mint-analytics-report' },
    ],
    deliverables: [
      { title: 'Creator-matching', desc: 'Makers die echt bij je merk en publiek passen, niet alleen op volgers.' },
      { title: 'Campagnestrategie', desc: 'Doelen, boodschap en kanalen staan vooraf helder op papier.' },
      { title: 'Content & video', desc: 'Materiaal dat aanslaat én herkenbaar bij je merk blijft.' },
      { title: 'Briefing & coördinatie', desc: 'Wij regelen de afstemming met creators, jij ziet het resultaat.' },
      { title: 'Heldere rapportage', desc: 'Transparante cijfers die er echt toe doen, geen vanity metrics.' },
      { title: 'Opschalen wat werkt', desc: 'We verdubbelen wat presteert en laten de rest meteen los.' },
    ],
  },
}
