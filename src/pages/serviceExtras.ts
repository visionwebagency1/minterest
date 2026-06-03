/** Per-service "how we approach it" points + a specific client review. */

export type Extra = {
  why: { title: string; desc: string }[]
  review: { quote: string; name: string; role: string; initials: string }
}

export const EXTRAS: Record<string, Extra> = {
  websites: {
    why: [
      { title: 'Performance-first', desc: 'Snelheid en stabiliteit zitten in het fundament, niet als bijzaak achteraf.' },
      { title: 'Gericht op actie', desc: 'Elke pagina leidt naar één duidelijke volgende stap.' },
      { title: 'Jij blijft eigenaar', desc: 'Je site, content en domein zijn van jou. Geen lock-in.' },
    ],
    review: { quote: 'Onze site laadt nu in een seconde en de aanvragen zijn verdubbeld.', name: 'Tom Bakker', role: 'Eigenaar, NorthPeak', initials: 'TB' },
  },
  branding: {
    why: [
      { title: 'Strategie eerst', desc: 'We ontwerpen vanuit je positionering, niet vanuit smaak alleen.' },
      { title: 'Consistent systeem', desc: 'Eén visuele taal die overal klopt, van post tot pand.' },
      { title: 'Klaar voor groei', desc: 'Een identiteit die meeschaalt met je ambitie.' },
    ],
    review: { quote: 'Ons nieuwe merk voelt eindelijk als wie we zijn. Klanten merken het verschil.', name: 'Nina de Wit', role: 'Founder, Lumio', initials: 'NW' },
  },
  video: {
    why: [
      { title: 'Haak in 3 seconden', desc: 'We bouwen elke clip rond die eerste paar seconden.' },
      { title: 'Gemaakt per platform', desc: 'Format en ritme afgestemd op waar het wordt gezien.' },
      { title: 'Consistent leveren', desc: 'Een ritme van content dat je kanaal laat groeien.' },
    ],
    review: { quote: 'De reels die ze maakten haalden meer bereik dan al onze ads samen.', name: 'Sven Mol', role: 'Marketing, FreshLabel', initials: 'SM' },
  },
  influencer: {
    why: [
      { title: 'Echte fit', desc: 'We kiezen creators op betrokkenheid, niet op volgers alleen.' },
      { title: 'Sturen op resultaat', desc: 'Doelen en KPI’s staan vooraf scherp.' },
      { title: 'Opschalen wat werkt', desc: 'We verdubbelen wat presteert en laten de rest los.' },
    ],
    review: { quote: 'Eindelijk influencer-marketing met cijfers die kloppen. Echt bereik, echte sales.', name: 'Eva Roos', role: 'Brand lead, Bloom', initials: 'ER' },
  },
}
