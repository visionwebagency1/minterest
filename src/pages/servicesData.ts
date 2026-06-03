/** Content for the four service pages, rendered through ServicePage. */

export type Service = {
  no: string
  kicker: string
  label: string
  tagline: string
  intro: string
  deliverables: { title: string; desc: string }[]
}

export const SERVICES: Record<string, Service> = {
  websites: {
    no: '01',
    kicker: 'Web & commerce',
    label: 'Website & Webshops',
    tagline: 'Snelle, schaalbare sites die converteren.',
    intro:
      'Van portfolio tot volwaardige webshop. We bouwen digitale producten die laden in een oogwenk, fijn werken op elk scherm en meegroeien met je ambitie.',
    deliverables: [
      { title: 'Maatwerk websites', desc: 'Ontworpen en gebouwd rond jouw merk en doelen, geen template-gevoel.' },
      { title: 'Webshops', desc: 'Conversiegerichte e-commerce die schaalt met je omzet.' },
      { title: 'Web-apps', desc: 'Interactieve producten en portals die het verschil maken.' },
      { title: 'Performance & SEO', desc: 'Topsnelheid en vindbaarheid als fundament, niet als bijzaak.' },
    ],
  },
  branding: {
    no: '02',
    kicker: 'Merk & identiteit',
    label: 'Design & branding',
    tagline: 'Een identiteit die blijft hangen en groeit.',
    intro:
      'We bouwen merken met karakter. Een visuele taal die vertrouwen wekt, herkenbaar is en consistent meebeweegt over elk kanaal.',
    deliverables: [
      { title: 'Logo & identiteit', desc: 'Een merkteken en systeem dat klopt, van visitekaartje tot billboard.' },
      { title: 'Design system', desc: 'Herbruikbare bouwstenen voor een consistente uitstraling.' },
      { title: 'Art direction', desc: 'De toon en richting die je merk onmiskenbaar maken.' },
      { title: 'Merkstrategie', desc: 'Positionering die je onderscheidt en laat groeien.' },
    ],
  },
  video: {
    no: '03',
    kicker: 'Bewegend beeld',
    label: 'Short video content',
    tagline: 'Scroll-stoppende video die merken laat bewegen.',
    intro:
      'Korte, krachtige video gemaakt voor de feed. Concept, productie en montage die aandacht vangen en vasthouden.',
    deliverables: [
      { title: 'Concept & scripting', desc: 'Ideeën die blijven hangen, afgestemd op je publiek.' },
      { title: 'Productie', desc: 'Van shoot tot set, strak geregeld, hoge kwaliteit.' },
      { title: 'Editing & motion', desc: 'Montage en motion graphics die het ritme bepalen.' },
      { title: 'Platform-optimalisatie', desc: 'Per kanaal op maat: Reels, TikTok, Shorts.' },
    ],
  },
  influencer: {
    no: '04',
    kicker: 'Bereik & creators',
    label: 'Influencer marketing',
    tagline: 'Bereik via stemmen die jouw publiek vertrouwt.',
    intro:
      'We koppelen je merk aan de juiste makers en sturen op resultaat. Authentiek bereik dat zich vertaalt in groei.',
    deliverables: [
      { title: 'Strategie', desc: 'De juiste boodschap, kanalen en doelen vooraf scherp.' },
      { title: 'Creator matching', desc: 'Makers die écht bij je merk en publiek passen.' },
      { title: 'Campagnemanagement', desc: 'Van briefing tot oplevering, wij regelen het.' },
      { title: 'Meten & schalen', desc: 'Heldere rapportage en opschalen wat werkt.' },
    ],
  },
}
