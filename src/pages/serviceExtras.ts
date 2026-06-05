/**
 * Per-service narrative spine (Probleem → Aanpak → Resultaat):
 *  - problem: the pain a client feels before working with us
 *  - stats:   measurable outcomes (count-up numbers)
 *  - steps:   how we work, specific to this service
 *  - why:     the approach pillars
 *  - review:  a specific client quote
 */

export type Stat = { num: number; prefix?: string; suffix?: string; label: string }

export type Extra = {
  problem: {
    heading: string
    points: { title: string; desc: string }[]
  }
  stats: Stat[]
  steps: { no: string; title: string; desc: string }[]
  why: { title: string; desc: string }[]
  review: { quote: string; name: string; role: string; initials: string }
}

export const EXTRAS: Record<string, Extra> = {
  websites: {
    problem: {
      heading: 'Een trage, verouderde site kost je elke dag klanten.',
      points: [
        { title: 'Bezoekers haken af', desc: 'Laadt je site te traag, dan is de helft alweer weg voor je pagina überhaupt verschijnt.' },
        { title: 'Mooi, maar verkoopt niet', desc: 'Een site die er goed uitziet maar nergens naartoe stuurt, levert je geen enkele aanvraag op.' },
        { title: 'Vastgelopen op groei', desc: 'Een wankel platform dat piekdrukte of nieuwe wensen simpelweg niet aankan.' },
      ],
    },
    stats: [
      { num: 100, suffix: '/100', label: 'PageSpeed-score als uitgangspunt' },
      { num: 2, prefix: '×', label: 'zoveel aanvragen na livegang' },
      { num: 0.8, suffix: 's', label: 'gemiddelde laadtijd' },
    ],
    steps: [
      { no: '01', title: 'Kennismaken', desc: 'We brengen je doel, doelgroep en concurrentie scherp in beeld.' },
      { no: '02', title: 'Ontwerp', desc: 'Wireframe en design, volledig gebouwd rond conversie.' },
      { no: '03', title: 'Bouwen', desc: 'Schoon gebouwd in Next.js of Shopify: razendsnel en schaalbaar.' },
      { no: '04', title: 'Live & groeien', desc: 'Online, meten met analytics en blijven optimaliseren.' },
    ],
    why: [
      { title: 'Performance-first', desc: 'Snelheid en stabiliteit zitten in het fundament, niet als bijzaak achteraf.' },
      { title: 'Gericht op actie', desc: 'Elke pagina leidt naar één duidelijke volgende stap.' },
      { title: 'Jij blijft eigenaar', desc: 'Je site, content en domein zijn van jou. Geen lock-in.' },
    ],
    review: { quote: 'Onze site laadt nu in een seconde en de aanvragen zijn verdubbeld.', name: 'Tom Bakker', role: 'Eigenaar, NorthPeak', initials: 'TB' },
  },
  branding: {
    problem: {
      heading: 'Een vaag merk wordt niet onthouden — en niet vertrouwd.',
      points: [
        { title: 'Onherkenbaar', desc: 'Overal nét even anders, dus blijft er bij niemand iets hangen.' },
        { title: 'Geen gevoel', desc: 'Een logo zonder verhaal of richting raakt je publiek niet.' },
        { title: 'Inconsistent', desc: 'Elke post, flyer en pagina oogt los van elkaar in plaats van als één merk.' },
      ],
    },
    stats: [
      { num: 38, prefix: '+', suffix: '%', label: 'sterkere merkherkenning' },
      { num: 3, prefix: '×', label: 'sneller herkend in de feed' },
      { num: 100, suffix: '%', label: 'van jou, geen lock-in' },
    ],
    steps: [
      { no: '01', title: 'Positioneren', desc: 'Eerst scherp wie je bent en waar je voor staat.' },
      { no: '02', title: 'Ontwerpen', desc: 'Logo, kleur en typografie tot een eigen visuele taal.' },
      { no: '03', title: 'Systeem bouwen', desc: 'Herbruikbare bouwstenen die overal consistent werken.' },
      { no: '04', title: 'Uitrollen', desc: 'Richtlijnen zodat je merk overal even sterk staat.' },
    ],
    why: [
      { title: 'Strategie eerst', desc: 'We ontwerpen vanuit je positionering, niet vanuit smaak alleen.' },
      { title: 'Consistent systeem', desc: 'Eén visuele taal die overal klopt, van post tot pand.' },
      { title: 'Klaar voor groei', desc: 'Een identiteit die meeschaalt met je ambitie.' },
    ],
    review: { quote: 'Ons nieuwe merk voelt eindelijk als wie we zijn. Klanten merken het verschil.', name: 'Nina de Wit', role: 'Founder, Lumio', initials: 'NW' },
  },
  video: {
    problem: {
      heading: 'Zonder scroll-stoppende content scrollt je publiek voorbij.',
      points: [
        { title: 'Voorbij gescrold', desc: 'Pak je niet binnen drie seconden de aandacht, dan ben je weg.' },
        { title: 'Geen ritme', desc: 'Eén video per maand bouwt geen publiek en geen momentum op.' },
        { title: 'Past niet op de feed', desc: 'Content die niet voor het platform gemaakt is, presteert simpelweg niet.' },
      ],
    },
    stats: [
      { num: 3, suffix: 's', label: 'haak in de eerste seconden' },
      { num: 210, prefix: '+', suffix: '%', label: 'meer bereik dan met ads' },
      { num: 12, suffix: '+', label: 'clips per maand mogelijk' },
    ],
    steps: [
      { no: '01', title: 'Concept', desc: 'De haak en boodschap, afgestemd op publiek en platform.' },
      { no: '02', title: 'Draaiboek', desc: 'Alles vooraf uitgedacht voor een soepele opnamedag.' },
      { no: '03', title: 'Draaien', desc: 'Strak geregisseerd, in hoge en consistente kwaliteit.' },
      { no: '04', title: 'Monteren', desc: 'Ritme, tekst en motion, kant-en-klaar per platform.' },
    ],
    why: [
      { title: 'Haak in 3 seconden', desc: 'We bouwen elke clip rond die eerste paar seconden.' },
      { title: 'Gemaakt per platform', desc: 'Format en ritme afgestemd op waar het wordt gezien.' },
      { title: 'Consistent leveren', desc: 'Een ritme van content dat je kanaal laat groeien.' },
    ],
    review: { quote: 'De reels die ze maakten haalden meer bereik dan al onze ads samen.', name: 'Sven Mol', role: 'Marketing, FreshLabel', initials: 'SM' },
  },
  aivideo: {
    problem: {
      heading: 'Klassieke videoproductie is traag, duur en niet te schalen.',
      points: [
        { title: 'Te duur', desc: 'Een cameraploeg, studio en montage lopen voor één video snel op.' },
        { title: 'Te traag', desc: 'Weken doorlooptijd terwijl je campagne nú live moet.' },
        { title: 'Niet te testen', desc: 'Eén dure video kun je niet in tien varianten uitproberen.' },
      ],
    },
    stats: [
      { num: 10, suffix: '×', label: 'sneller geproduceerd' },
      { num: 50, prefix: '-', suffix: '%', label: 'lagere productiekosten' },
      { num: 30, suffix: '+', label: 'varianten per campagne' },
    ],
    steps: [
      { no: '01', title: 'Script', desc: 'Eerst de boodschap scherp, dan pas genereren.' },
      { no: '02', title: 'Genereren', desc: 'Avatars, productshots en scènes met generatieve tools.' },
      { no: '03', title: 'Regisseren', desc: 'Wij bewaken stijl, merk en kwaliteit op elk frame.' },
      { no: '04', title: 'Testen & schalen', desc: 'Tientallen varianten live, opschalen wat werkt.' },
    ],
    why: [
      { title: 'Snelheid én stijl', desc: 'AI-snel geproduceerd, maar streng bewaakt op merk en kwaliteit.' },
      { title: 'Test en schaal', desc: 'Veel varianten, zodat je op data kiest wat werkt en de rest loslaat.' },
      { title: 'Betaalbaar bereik', desc: 'Premium video zonder het prijskaartje van een volledige productie.' },
    ],
    review: { quote: 'In één week tientallen advertentievarianten getest. Onze kosten per aanvraag halveerden.', name: 'Daan Vos', role: 'Growth, Veld', initials: 'DV' },
  },
  seo: {
    problem: {
      heading: 'Sta je niet op pagina 1, dan vindt je klant je concurrent.',
      points: [
        { title: 'Onvindbaar', desc: 'Wie op pagina twee van Google staat, wordt simpelweg niet gevonden.' },
        { title: 'Verkeer zonder klanten', desc: 'Bezoekers die nooit kopen, kosten je alleen maar tijd en geld.' },
        { title: 'Bang voor updates', desc: 'Trucjes die bij elke Google-update weer instorten.' },
      ],
    },
    stats: [
      { num: 1, label: 'plek in Google als doel', prefix: '#' },
      { num: 320, prefix: '+', suffix: '%', label: 'meer organisch verkeer' },
      { num: 4, label: 'maanden tot de top 3' },
    ],
    steps: [
      { no: '01', title: 'Audit', desc: 'We brengen in kaart waar je nu staat en waar de groei zit.' },
      { no: '02', title: 'Strategie', desc: 'Zoekwoorden en plan op basis van echte intentie.' },
      { no: '03', title: 'Optimaliseren', desc: 'Techniek, content en autoriteit tot in de puntjes.' },
      { no: '04', title: 'Rapporteren', desc: 'Maandelijks inzicht in posities, verkeer en groei.' },
    ],
    why: [
      { title: 'Geen trucjes', desc: 'Duurzame SEO die blijft staan na elke Google-update.' },
      { title: 'Sturen op omzet', desc: 'We mikken op zoekwoorden die klanten opleveren, niet alleen verkeer.' },
      { title: 'Volledig transparant', desc: 'Je ziet maandelijks precies wat we doen en wat het oplevert.' },
    ],
    review: { quote: 'Binnen vier maanden van pagina drie naar plek één. De telefoon staat roodgloeiend.', name: 'Imke Sars', role: 'Eigenaar, Dauw', initials: 'IS' },
  },
  influencer: {
    problem: {
      heading: 'De verkeerde creator verbrandt je budget zonder resultaat.',
      points: [
        { title: 'Vanity metrics', desc: 'Veel volgers, maar nauwelijks echte betrokkenheid.' },
        { title: 'Geen fit', desc: 'Een maker die niet bij je merk past, overtuigt niemand.' },
        { title: 'Niet meetbaar', desc: 'Campagnes zonder cijfers waar je nergens op kunt sturen.' },
      ],
    },
    stats: [
      { num: 5, suffix: '×', label: 'hogere engagement' },
      { num: 40, prefix: '+', suffix: '%', label: 'meer bereik per euro' },
      { num: 100, suffix: '%', label: 'transparante rapportage' },
    ],
    steps: [
      { no: '01', title: 'Matchen', desc: 'We selecteren creators op echte betrokkenheid, niet op volgers.' },
      { no: '02', title: 'Strategie', desc: 'Doelen, boodschap en kanalen vooraf scherp op papier.' },
      { no: '03', title: 'Produceren', desc: 'Content die aanslaat én herkenbaar bij je merk blijft.' },
      { no: '04', title: 'Opschalen', desc: 'We verdubbelen wat presteert en laten de rest los.' },
    ],
    why: [
      { title: 'Echte fit', desc: 'We kiezen creators op betrokkenheid, niet op volgers alleen.' },
      { title: 'Sturen op resultaat', desc: 'Doelen en KPI’s staan vooraf scherp.' },
      { title: 'Opschalen wat werkt', desc: 'We verdubbelen wat presteert en laten de rest los.' },
    ],
    review: { quote: 'Eindelijk influencer-marketing met cijfers die kloppen. Echt bereik, echte sales.', name: 'Eva Roos', role: 'Brand lead, Bloom', initials: 'ER' },
  },
}
