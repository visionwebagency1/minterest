import { SERVICE_BY_SLUG, slugifySub } from './services'

/**
 * Rich content for every sub-service landing page (/diensten/:slug/:subslug).
 * The main services + their short chip copy live in services.ts; this file holds
 * the full, written-out story, deliverables, approach, case and FAQ that make
 * each sub-page a real, informative landing page.
 *
 * Keyed by `${serviceSlug}/${subSlug}` (subSlug = slugifySub(name)).
 */

export type Deliverable = { title: string; desc: string }
export type ApproachStep = { title: string; desc: string }
export type WhyPoint = { title: string; desc: string }
export type CaseStudy = {
  name: string
  sector: string
  summary: string
  outcome: string
}
export type Faq = { q: string; a: string }

export type SubService = {
  /** Parent main-service slug (design-branding, web-development, ...). */
  serviceSlug: string
  /** Sub slug (slugifySub of the name). */
  slug: string
  name: string
  /** Pakkende hero-zin. */
  tagline: string
  /** Uitgeschreven verhaal, meerdere alinea's. */
  story: string[]
  /** Wat je krijgt. */
  deliverables: Deliverable[]
  /** Voor wie deze dienst is. */
  audience: string
  /** Waarom Minterest. */
  why: WhyPoint[]
  /** Hoe we het aanpakken (stappen, iconen i.p.v. nummers). */
  approach: ApproachStep[]
  case: CaseStudy
  faq: Faq[]
}

const S = (serviceSlug: string, name: string, rest: Omit<SubService, 'serviceSlug' | 'slug' | 'name'>): SubService => ({
  serviceSlug,
  slug: slugifySub(name),
  name,
  ...rest,
})

export const SUB_SERVICES: SubService[] = [
  /* ───────────────────────── Design & Branding ───────────────────────── */
  S('design-branding', 'Visuele identiteit', {
    tagline:
      'Een visuele taal die je merk in één oogopslag herkenbaar maakt, op elk kanaal even sterk.',
    story: [
      'Een visuele identiteit is veel meer dan een mooi logo. Het is het complete systeem waarmee jouw merk er overal hetzelfde, doordacht en betrouwbaar uitziet, van je website en social media tot je facturen en je gevelbord. Wij bouwen dat systeem van de grond af op, gebaseerd op wie je bent, wat je belooft en aan wie je het vertelt.',
      'We beginnen bij de kern: waar staat je merk voor en wat moet iemand voelen bij het eerste contact. Vanuit die strategische basis ontwerpen we een logo en woordmerk, kiezen we een kleurpalet met betekenis, stellen we een typografisch systeem samen en leggen we vast hoe alles samenwerkt. Het resultaat is geen losse verzameling bestanden, maar een levend systeem dat met je meegroeit.',
      'Consistentie is waar het verschil zit. Een merk dat overal klopt voelt groter, professioneler en betrouwbaarder dan een merk dat per kanaal anders oogt. Daarom leveren we niet alleen het ontwerp, maar ook de richtlijnen zodat iedereen, intern en extern, je merk correct toepast.',
    ],
    deliverables: [
      { title: 'Logo en woordmerk', desc: 'Een primair logo plus varianten voor elk formaat en elke achtergrond, scherp op print en scherm.' },
      { title: 'Kleurpalet', desc: 'Een doordacht palet met primaire en secundaire kleuren, inclusief codes voor web, druk en RGB.' },
      { title: 'Typografie', desc: 'Een typografisch systeem met koppen, body en accenten dat overal leesbaar en herkenbaar blijft.' },
      { title: 'Merk-gebruiksboek', desc: 'Heldere richtlijnen voor logo-gebruik, kleur, type en toepassingen zodat het merk consistent blijft.' },
    ],
    audience:
      'Voor merken die er nu inconsistent uitzien of die net starten en meteen serieus genomen willen worden. Of je nu herpositioneert of voor het eerst echt vorm geeft aan je merk, je krijgt een fundament dat jaren meegaat.',
    why: [
      { title: 'Strategie eerst', desc: 'We ontwerpen niet zomaar mooi, maar vanuit positionering en doel zodat elke keuze klopt.' },
      { title: 'Een systeem, geen plaatje', desc: 'Je krijgt een schaalbaar systeem dat op elk kanaal werkt, niet alleen een logo.' },
      { title: 'Klaar voor uitrol', desc: 'Compleet met richtlijnen en bestanden zodat je merk meteen overal correct staat.' },
    ],
    approach: [
      { title: 'Kennismaken', desc: 'We duiken in je merk, je markt en je doelgroep om de kern scherp te krijgen.' },
      { title: 'Richting', desc: 'We verkennen visuele routes en kiezen samen een richting met karakter.' },
      { title: 'Ontwerp', desc: 'We werken de identiteit volledig uit, van logo tot het complete systeem.' },
      { title: 'Uitrol', desc: 'We leveren bestanden en richtlijnen en helpen je merk live te brengen.' },
    ],
    case: {
      name: 'Nordveld',
      sector: 'Duurzame interieurmerk',
      summary:
        'Een ambitieus interieurmerk zonder samenhang: het logo, de socials en de verpakking leken van drie verschillende bedrijven. We bouwden één visuele taal met een rustig, natuurlijk karakter.',
      outcome:
        'Een herkenbaar merk dat op elk kanaal hetzelfde voelt, van de webshop tot de winkelpui, en een team dat eindelijk weet hoe het merk toegepast hoort te worden.',
    },
    faq: [
      { q: 'Krijg ik ook de bronbestanden?', a: 'Ja. Je ontvangt alle bronbestanden en exports zodat je merk van jou is en je er overal mee verder kunt.' },
      { q: 'Kan een bestaand logo blijven?', a: 'Zeker. Als je logo nog sterk staat bouwen we het systeem daaromheen en frissen we alleen op waar nodig.' },
    ],
  }),
  S('design-branding', 'Packaging', {
    tagline:
      'Verpakkingsontwerp dat opvalt in het schap en je merk voelbaar maakt, van eerste concept tot drukklaar.',
    story: [
      'Verpakking is het moment waarop je merk fysiek wordt. Het is vaak het eerste echte contact tussen je product en je klant, en die paar seconden in het schap of bij het uitpakken bepalen of iemand je onthoudt. Goede packaging verkoopt niet alleen, het maakt je merk tastbaar.',
      'Wij ontwerpen verpakkingen die opvallen tussen de concurrentie en kloppen met je identiteit. We werken vanuit de dieline, denken mee over materiaal en afwerking, en leveren bestanden die zonder gedoe door de drukker gaan. Van het concept tot de mockup waarmee je het kunt presenteren, alles is doordacht.',
      'We houden rekening met de praktijk: hoe het product in de hand ligt, hoe het opvalt op een schap, hoe het overkomt op een productfoto en hoe het de unboxing-ervaring versterkt. Mooi én productieklaar, dat is het uitgangspunt.',
    ],
    deliverables: [
      { title: 'Dieline', desc: 'Een technisch correcte stansvorm op maat van je product en je drukker.' },
      { title: 'Verpakkingsontwerp', desc: 'Het complete ontwerp dat opvalt en klopt met je merk, klaar voor alle zijdes.' },
      { title: 'Drukklare bestanden', desc: 'Productieklare bestanden met de juiste kleuren, marges en afwerkingen.' },
      { title: 'Mockups', desc: 'Realistische mockups om je verpakking te presenteren en te testen voor productie.' },
    ],
    audience:
      'Voor merken met een fysiek product die willen opvallen: van food en cosmetica tot e-commerce die de unboxing serieus neemt. Ideaal als je opschaalt en je verpakking mee moet groeien met je ambitie.',
    why: [
      { title: 'Schapklaar denken', desc: 'We ontwerpen voor de werkelijkheid van het schap en de online productfoto, niet alleen voor het scherm.' },
      { title: 'Drukklaar opgeleverd', desc: 'Geen verrassingen bij de drukker: bestanden kloppen technisch tot in de details.' },
      { title: 'Merk voelbaar', desc: 'De verpakking versterkt je identiteit en maakt de unboxing onderdeel van je merk.' },
    ],
    approach: [
      { title: 'Kennismaken', desc: 'We brengen product, doelgroep en schapcontext in beeld.' },
      { title: 'Concept', desc: 'We ontwikkelen een verpakkingsconcept met karakter en onderscheid.' },
      { title: 'Uitwerken', desc: 'We werken de dieline en het ontwerp drukklaar uit.' },
      { title: 'Productie', desc: 'We begeleiden de overdracht naar de drukker tot het in productie gaat.' },
    ],
    case: {
      name: 'Botanic Brew',
      sector: 'Dranken',
      summary:
        'Een nieuwe lijn koude thee die tussen grote merken moest opvallen. We ontwierpen een verpakking met een eigen, natuurlijk handschrift en een herkenbaar kleurensysteem per smaak.',
      outcome:
        'Een lijn die als familie aanvoelt, direct opvalt in het schap en moeiteloos uitbreidbaar is naar nieuwe smaken.',
    },
    faq: [
      { q: 'Werken jullie samen met onze drukker?', a: 'Ja, we stemmen graag direct af met je drukker zodat de specificaties van het begin af aan kloppen.' },
      { q: 'Kunnen jullie meerdere varianten leveren?', a: 'Zeker. We bouwen een systeem zodat nieuwe smaken of varianten later eenvoudig toe te voegen zijn.' },
    ],
  }),
  S('design-branding', 'Social Media Visual System', {
    tagline:
      'Een vast visueel systeem voor social content die altijd consistent en direct herkenbaar is.',
    story: [
      'De meeste merken posten content die los zand is: elke post ziet er net even anders uit, en daardoor blijft niets hangen. Een social media visual system lost dat op. Het is een vast ritme van formats, kleuren en typografie waarmee elke post vanzelf klopt en je merk meteen herkenbaar is, ook zonder logo.',
      'We ontwerpen een set templates en richtlijnen die afgestemd zijn op hoe jij content maakt. Van feed-posts en carrousels tot stories en reels-covers, alles past binnen één visueel systeem maar blijft genoeg variëren om vers te blijven. Of je nu zelf post of een team hebt, iedereen kan ermee uit de voeten.',
      'Het resultaat is consistentie zonder dat het saai wordt, en snelheid omdat je niet meer per post hoeft na te denken over vormgeving. Je merk wordt herkenbaar in de feed, en dat bouwt vertrouwen op.',
    ],
    deliverables: [
      { title: 'Templates', desc: 'Bewerkbare sjablonen voor je terugkerende post-types, klaar voor dagelijks gebruik.' },
      { title: 'Post-formats', desc: 'Een set feed-formats die varieert maar altijd binnen je merk blijft.' },
      { title: 'Story-formats', desc: 'Story- en reels-covers die je content herkenbaar en samenhangend maken.' },
      { title: 'Richtlijnen', desc: 'Duidelijke afspraken over kleur, type en gebruik zodat het systeem houdbaar blijft.' },
    ],
    audience:
      'Voor merken die structureel posten en willen dat hun feed als een geheel voelt. Perfect als je content uit handen geeft of opschaalt en grip wilt houden op de uitstraling.',
    why: [
      { title: 'Herkenbaar zonder logo', desc: 'Je content valt op in de feed omdat de stijl direct als die van jou leest.' },
      { title: 'Sneller posten', desc: 'Met vaste formats maak je content in een fractie van de tijd, zonder kwaliteitsverlies.' },
      { title: 'Houdbaar systeem', desc: 'Richtlijnen zorgen dat het consistent blijft, ook als er meerdere mensen aan werken.' },
    ],
    approach: [
      { title: 'Kennismaken', desc: 'We bekijken je huidige content en je manier van werken.' },
      { title: 'Systeem', desc: 'We ontwerpen het visuele systeem en de eerste templates.' },
      { title: 'Uitwerken', desc: 'We bouwen alle formats uit en testen ze op echte content.' },
      { title: 'Overdragen', desc: 'We leveren templates en richtlijnen en zetten je team op weg.' },
    ],
    case: {
      name: 'Studio Vesper',
      sector: 'Lifestyle',
      summary:
        'Een groeiend lifestyle-merk waarvan de feed rommelig oogde door wisselende stijlen. We bouwden een visueel systeem met vaste formats en een rustig kleurritme.',
      outcome:
        'Een feed die als één verhaal voelt, content die sneller te maken is en een merk dat direct herkenbaar werd in de tijdlijn.',
    },
    faq: [
      { q: 'In welk programma lever je de templates?', a: 'We leveren bewerkbare templates in de tool die jij gebruikt, van Canva tot Figma of Adobe.' },
      { q: 'Maken jullie ook de content zelf?', a: 'Dat kan. Wil je het beheer uit handen geven, dan pakt ons social-team het volledig op.' },
    ],
  }),
  S('design-branding', 'Complete Branding', {
    tagline:
      'Het hele merk van strategie tot uitrol, alles in een keer goed en overal even sterk.',
    story: [
      'Complete branding is het volledige traject: van de strategische basis tot een uitgerold merk dat overal klopt. In plaats van losse stukken bouwen we het geheel, zodat elke keuze in lijn is met je positionering en je merk als een eenheid voelt.',
      'We starten bij de strategie: waar sta je voor, wat onderscheidt je, en welke belofte maak je. Vanuit daar ontwerpen we de volledige identiteit en bouwen we een designsysteem dat schaalt. Daarna helpen we met de uitrol, zodat je merk niet alleen op papier mooi is maar ook in de praktijk consistent landt.',
      'Dit is de keuze voor merken die het in één keer goed willen doen. Je krijgt een fundament dat houvast geeft bij elke toekomstige beslissing, van een nieuwe campagne tot een nieuwe productlijn.',
    ],
    deliverables: [
      { title: 'Merkstrategie', desc: 'Positionering, kernwaarden en merkbelofte als fundament voor alle keuzes.' },
      { title: 'Identiteit', desc: 'Logo, kleur en typografie die je strategie visueel maken.' },
      { title: 'Designsysteem', desc: 'Een schaalbaar systeem met componenten en regels voor elk kanaal.' },
      { title: 'Uitrol', desc: 'Begeleiding bij het toepassen van je merk over je belangrijkste touchpoints.' },
    ],
    audience:
      'Voor ondernemers die serieus willen bouwen en hun merk als strategisch kapitaal zien. Ideaal bij een herpositionering, een fusie of een nieuwe fase waarin alles op orde moet.',
    why: [
      { title: 'Eén partner', desc: 'Strategie, ontwerp en uitrol uit één hand, zonder gaten tussen de stappen.' },
      { title: 'Strategisch fundament', desc: 'Elke keuze is terug te voeren op je positionering, zodat het merk klopt en standhoudt.' },
      { title: 'Klaar om te groeien', desc: 'Een systeem dat meebeweegt met nieuwe producten, kanalen en campagnes.' },
    ],
    approach: [
      { title: 'Strategie', desc: 'We leggen positionering, waarden en belofte vast.' },
      { title: 'Identiteit', desc: 'We ontwerpen de volledige visuele identiteit.' },
      { title: 'Systeem', desc: 'We bouwen het designsysteem en de richtlijnen.' },
      { title: 'Uitrol', desc: 'We brengen het merk live over je belangrijkste kanalen.' },
    ],
    case: {
      name: 'Kessler & Co',
      sector: 'Zakelijke dienstverlening',
      summary:
        'Een gevestigd kantoor dat verouderd oogde en jong talent niet meer aansprak. We herpositioneerden het merk en bouwden een complete identiteit met designsysteem.',
      outcome:
        'Een merk dat weer past bij de kwaliteit van het werk, intern gedragen wordt en consistent uitgerold is over elk contactmoment.',
    },
    faq: [
      { q: 'Hoe lang duurt een compleet traject?', a: 'Dat hangt af van de scope, maar reken op een traject van enkele weken tot maanden, in heldere fases met vaste momenten.' },
      { q: 'Kunnen we gefaseerd starten?', a: 'Ja. We kunnen beginnen bij strategie en identiteit en de uitrol later oppakken wanneer jij er klaar voor bent.' },
    ],
  }),

  /* ───────────────────────── Web Development ───────────────────────── */
  S('web-development', 'Websites', {
    tagline:
      'Snelle, converterende websites die er strak uitzien en gebouwd zijn om te verkopen.',
    story: [
      'Je website is je hardst werkende verkoper: hij staat dag en nacht aan en is vaak het eerste echte beeld dat iemand van je krijgt. Toch laten veel sites kansen liggen, omdat ze traag zijn, onduidelijk of niet gebouwd op conversie. Wij maken websites die er niet alleen strak uitzien, maar ook echt werken.',
      'We ontwerpen op maat, gebouwd rond jouw doel en je bezoeker. Snelheid staat voorop, want elke seconde laadtijd kost bezoekers. We bouwen op een moderne, schaalbare stack, richten een CMS in zodat je zelf kunt bijwerken, en leggen een stevige SEO-basis zodat je gevonden wordt.',
      'Het resultaat is een site die laadt in een oogwenk, soepel werkt op elk scherm en bezoekers omzet in klanten. En omdat alles netjes is opgebouwd, kun je makkelijk uitbreiden als je groeit.',
    ],
    deliverables: [
      { title: 'Maatwerk ontwerp', desc: 'Een uniek ontwerp afgestemd op je merk en je doel, geen template-gevoel.' },
      { title: 'Responsive build', desc: 'Een snelle, soepele site die perfect werkt op mobiel, tablet en desktop.' },
      { title: 'CMS', desc: 'Een eenvoudig content-systeem zodat je zelf teksten en pagina’s beheert.' },
      { title: 'SEO-basis', desc: 'Een technische SEO-basis zodat je vindbaar bent vanaf de lancering.' },
    ],
    audience:
      'Voor ondernemers en merken die hun website serieus nemen als groeikanaal. Of je nu een verouderde site vervangt of voor het eerst echt online gaat, je krijgt een fundament dat presteert.',
    why: [
      { title: 'Gebouwd op snelheid', desc: 'We optimaliseren tot in de details, want snelheid bepaalt conversie en vindbaarheid.' },
      { title: 'Conversiegericht', desc: 'Elke pagina is opgebouwd rond een doel, niet alleen rond mooie plaatjes.' },
      { title: 'Zelf te beheren', desc: 'Met een helder CMS houd je zelf grip op je content, zonder ons nodig te hebben.' },
    ],
    approach: [
      { title: 'Kennismaken', desc: 'We brengen doel, doelgroep en wensen scherp in beeld.' },
      { title: 'Ontwerp', desc: 'We ontwerpen de structuur en de pagina’s op maat.' },
      { title: 'Bouwen', desc: 'We bouwen snel, schoon en volledig responsive.' },
      { title: 'Live', desc: 'We lanceren, meten en optimaliseren waar nodig.' },
    ],
    case: {
      name: 'Atelier Mauve',
      sector: 'Interieurontwerp',
      summary:
        'Een interieurstudio met prachtig werk maar een trage, gedateerde site die bezoekers liet afhaken. We bouwden een snelle, beeldende website met een helder contactpad.',
      outcome:
        'Een site die het werk recht doet, vliegensvlug laadt en bezoekers veel makkelijker naar een aanvraag leidt.',
    },
    faq: [
      { q: 'Kan ik de site zelf aanpassen?', a: 'Ja. We richten een gebruiksvriendelijk CMS in en leggen kort uit hoe je teksten en pagina’s beheert.' },
      { q: 'Verzorgen jullie ook hosting?', a: 'Dat kan. We adviseren of regelen snelle, betrouwbare hosting en onderhoud zodat je nergens omkijken naar hebt.' },
    ],
  }),
  S('web-development', 'Webshops', {
    tagline:
      'Webshops in Shopify of WooCommerce, volledig op maat gebouwd rond hoe jouw klanten kopen.',
    story: [
      'Een webshop is meer dan een catalogus met een afrekenknop. Het is een verkoopmachine die alleen werkt als elk detail klopt: van een productpagina die overtuigt tot een checkout die niemand laat afhaken. Wij bouwen shops die gericht zijn op verkopen, niet alleen op tonen.',
      'We werken met Shopify of WooCommerce, afhankelijk van wat bij jou past, en richten alles in rond hoe jouw klanten kopen. Snelle productpagina’s, een soepele checkout, de juiste betaalmethodes en koppelingen met je voorraad of boekhouding. Alles wat de verkoop in de weg zit, halen we weg.',
      'Het resultaat is een shop die converteert, makkelijk te beheren is en meegroeit met je assortiment. Of je nu tien producten verkoopt of duizend, de basis is gebouwd om op te schalen.',
    ],
    deliverables: [
      { title: 'Shop-inrichting', desc: 'Een complete inrichting in Shopify of WooCommerce, afgestemd op jouw assortiment.' },
      { title: 'Productpagina’s', desc: 'Overtuigende productpagina’s die twijfel wegnemen en aanzetten tot kopen.' },
      { title: 'Checkout', desc: 'Een soepele, vertrouwde checkout die het aantal afhakers minimaliseert.' },
      { title: 'Betaalmethodes', desc: 'De juiste betaalmethodes voor jouw markt, veilig en compleet ingericht.' },
    ],
    audience:
      'Voor merken die online verkopen en hun shop willen laten presteren. Ideaal als je start met e-commerce of als je huidige shop te traag, te rommelig of te beperkt is.',
    why: [
      { title: 'Gebouwd op conversie', desc: 'Elke stap, van productpagina tot checkout, is ingericht om de verkoop af te ronden.' },
      { title: 'Klaar om te schalen', desc: 'Een opzet die meegroeit met je assortiment, je verkeer en je ambitie.' },
      { title: 'Koppelingen die kloppen', desc: 'We verbinden je shop met voorraad, betaling en boekhouding zodat alles soepel loopt.' },
    ],
    approach: [
      { title: 'Kennismaken', desc: 'We bekijken je producten, je klant en je verkoopproces.' },
      { title: 'Inrichten', desc: 'We bouwen de shop en de productstructuur op maat.' },
      { title: 'Koppelen', desc: 'We verbinden betaling, voorraad en verzending.' },
      { title: 'Live', desc: 'We lanceren en optimaliseren op conversie.' },
    ],
    case: {
      name: 'Forma Goods',
      sector: 'Design accessoires',
      summary:
        'Een merk met sterke producten maar een verwarrende shop waar veel klanten afhaakten in de checkout. We herbouwden de shop met heldere productpagina’s en een vlotte checkout.',
      outcome:
        'Een shop die rust en vertrouwen uitstraalt, waarin klanten makkelijker hun aankoop afronden en het team eenvoudig producten beheert.',
    },
    faq: [
      { q: 'Shopify of WooCommerce?', a: 'We adviseren op basis van jouw situatie. Shopify is sneller op te zetten, WooCommerce geeft meer maatwerk binnen WordPress.' },
      { q: 'Kunnen jullie een bestaande shop overzetten?', a: 'Ja. We migreren je producten en data zorgvuldig zodat je niets verliest bij de overstap.' },
    ],
  }),
  S('web-development', 'Applicaties', {
    tagline:
      'Web-applicaties en portals die je proces slimmer en sneller maken, op maat van je workflow.',
    story: [
      'Soms is een website niet genoeg en heb je echt gereedschap nodig: een portal, een dashboard of een interne tool die je werk vereenvoudigt. Web-applicaties draaien om functie. Ze nemen handwerk weg, geven overzicht en maken processen die nu in spreadsheets leven eindelijk schaalbaar.',
      'Wij bouwen applicaties op maat van jouw workflow. We beginnen bij wat je gebruikers echt nodig hebben, ontwerpen een interface die intuïtief werkt, en bouwen een stabiele frontend en backend eronder. Waar het kan koppelen we met systemen die je al gebruikt, zodat alles op één plek samenkomt.',
      'Het resultaat is een applicatie die je team dagelijks gebruikt omdat hij het werk echt makkelijker maakt. Snel, betrouwbaar en gebouwd om uit te breiden naarmate je behoeften groeien.',
    ],
    deliverables: [
      { title: 'UX', desc: 'Een doordacht interface-ontwerp dat aansluit op hoe je gebruikers werken.' },
      { title: 'Frontend', desc: 'Een snelle, prettige frontend die soepel werkt op elk apparaat.' },
      { title: 'Backend', desc: 'Een stabiele, veilige backend die je data en logica betrouwbaar verwerkt.' },
      { title: 'Integraties', desc: 'Koppelingen met de systemen en API’s die je al gebruikt.' },
    ],
    audience:
      'Voor bedrijven die een proces willen digitaliseren of een tool nodig hebben die niet als standaardpakket bestaat. Ideaal als je nu vastloopt in losse spreadsheets en handwerk.',
    why: [
      { title: 'Rond je workflow', desc: 'We bouwen rond hoe jij werkt, niet andersom, zodat de tool echt past.' },
      { title: 'Stabiel en veilig', desc: 'Een solide technische basis die betrouwbaar draait en je data beschermt.' },
      { title: 'Klaar om uit te breiden', desc: 'Een schone architectuur waarop je later eenvoudig kunt doorbouwen.' },
    ],
    approach: [
      { title: 'Kennismaken', desc: 'We brengen je proces en je gebruikers in kaart.' },
      { title: 'Ontwerp', desc: 'We ontwerpen de flows en de interface.' },
      { title: 'Bouwen', desc: 'We bouwen frontend, backend en koppelingen.' },
      { title: 'Doorontwikkelen', desc: 'We lanceren en bouwen door op basis van gebruik.' },
    ],
    case: {
      name: 'Logiflow',
      sector: 'Logistiek',
      summary:
        'Een logistiek bedrijf dat planning en orders bijhield in een wirwar van spreadsheets. We bouwden een overzichtelijk portal waarin planning, orders en status op één plek samenkomen.',
      outcome:
        'Veel minder handwerk en fouten, een team dat in één oogopslag overzicht heeft en een systeem dat meegroeit met het bedrijf.',
    },
    faq: [
      { q: 'Kunnen jullie koppelen met ons huidige systeem?', a: 'Vrijwel altijd. Als er een API of export beschikbaar is, bouwen we de koppeling die je nodig hebt.' },
      { q: 'Verzorgen jullie ook onderhoud?', a: 'Ja. We bieden onderhoud en doorontwikkeling zodat de applicatie up-to-date en veilig blijft.' },
    ],
  }),
  S('web-development', 'Software', {
    tagline:
      'Maatwerk software die met je bedrijf meegroeit, stabiel en gebouwd om jaren mee te gaan.',
    story: [
      'Als standaardpakketten niet meer passen, wordt maatwerk software de slimste investering. Het is software die exact doet wat jouw bedrijf nodig heeft, zonder de ballast van functies die je nooit gebruikt en zonder de beperkingen van een one-size-fits-all systeem.',
      'Wij bouwen software vanuit een helder technisch ontwerp, met een architectuur die schaalt en onderhoudbaar blijft. We denken in modules, zodat het systeem kan meegroeien en je later onderdelen kunt toevoegen zonder alles om te gooien. Koppelingen met bestaande systemen horen er vanzelfsprekend bij.',
      'Het resultaat is een stabiel systeem dat je processen ondersteunt en jaren meegaat. En omdat we onderhoud en doorontwikkeling erbij leveren, blijft het meebewegen met je bedrijf.',
    ],
    deliverables: [
      { title: 'Technisch ontwerp', desc: 'Een doordachte architectuur die schaalbaar en onderhoudbaar is.' },
      { title: 'Ontwikkeling', desc: 'Schone, geteste ontwikkeling van het complete systeem.' },
      { title: 'Koppelingen', desc: 'Integraties met je bestaande systemen en data.' },
      { title: 'Onderhoud', desc: 'Doorlopend onderhoud en doorontwikkeling zodat het systeem actueel blijft.' },
    ],
    audience:
      'Voor bedrijven met een specifiek proces dat geen standaardpakket goed bedient. Ideaal als je uit je huidige systeem groeit of een uniek aanbod hebt dat eigen software vraagt.',
    why: [
      { title: 'Precies wat je nodig hebt', desc: 'Geen overbodige functies of beperkingen, alleen wat jouw proces echt vraagt.' },
      { title: 'Schaalbaar gebouwd', desc: 'Een modulaire architectuur die meegroeit zonder dat je opnieuw moet beginnen.' },
      { title: 'Voor de lange termijn', desc: 'Stabiel, onderhouden en doorontwikkeld zodat het jaren meegaat.' },
    ],
    approach: [
      { title: 'Kennismaken', desc: 'We doorgronden je proces en je technische context.' },
      { title: 'Ontwerp', desc: 'We maken het technisch ontwerp en de architectuur.' },
      { title: 'Bouwen', desc: 'We ontwikkelen in modules met vaste oplevermomenten.' },
      { title: 'Onderhouden', desc: 'We beheren en bouwen door op basis van je behoeften.' },
    ],
    case: {
      name: 'Verdi Systems',
      sector: 'Productie',
      summary:
        'Een producent die zijn unieke productieproces niet in een standaardpakket gepropt kreeg. We bouwden maatwerk software die het proces van order tot oplevering ondersteunt.',
      outcome:
        'Een systeem dat naadloos op het proces aansluit, fouten terugdringt en moeiteloos meegroeit met nieuwe productlijnen.',
    },
    faq: [
      { q: 'Wat als onze behoeften veranderen?', a: 'Daar is de modulaire opzet op gebouwd. We breiden uit of passen aan zonder het hele systeem om te gooien.' },
      { q: 'Van wie is de software?', a: 'Van jou. Je krijgt de code en eigenaarschap zodat je nooit vastzit aan één leverancier.' },
    ],
  }),

  /* ───────────────────────── Video & Fotografie ───────────────────────── */
  S('video-fotografie', 'Short video content', {
    tagline:
      'Scroll-stoppende korte video die kijkers vasthoudt en aanzet tot actie, klaar voor elk platform.',
    story: [
      'Korte video is het snelste pad naar aandacht. In een feed vol prikkels heb je een paar seconden om iemand te pakken, en goede short video doet precies dat: een sterke hook, een duidelijk verhaal en een ritme dat blijft boeien tot het einde.',
      'Wij maken video van concept tot oplevering. We bedenken het idee, schrijven het draaiboek, filmen en monteren strak, en leveren versies aan die passen bij elk platform. Verticaal voor Reels en TikTok, of breder waar nodig, altijd afgestemd op waar je doelgroep kijkt.',
      'Het draait niet om mooie beelden alleen, maar om beelden die werken: die kijkers vasthouden, je merk versterken en aanzetten tot een volgende stap. Of dat nu een volger, een klik of een aankoop is.',
    ],
    deliverables: [
      { title: 'Concept', desc: 'Een sterk videoconcept met een hook die in de feed werkt.' },
      { title: 'Scenario', desc: 'Een uitgewerkt draaiboek zodat de opname soepel en doelgericht verloopt.' },
      { title: 'Opname', desc: 'Professionele opname met aandacht voor beeld, licht en geluid.' },
      { title: 'Montage', desc: 'Strakke montage met de juiste versies en formats per platform.' },
    ],
    audience:
      'Voor merken die zichtbaar willen zijn op social en weten dat video het bereik bepaalt. Ideaal als je consistent content nodig hebt die opvalt en converteert.',
    why: [
      { title: 'Hook-gedreven', desc: 'We bouwen elke video rond de eerste seconden, want daar wordt aandacht gewonnen of verloren.' },
      { title: 'Platform-klaar', desc: 'Je krijgt versies die passen bij elk kanaal, niet één video die overal half werkt.' },
      { title: 'Gericht op actie', desc: 'Mooi is niet genoeg: elke video heeft een doel en stuurt naar de volgende stap.' },
    ],
    approach: [
      { title: 'Concept', desc: 'We bedenken het idee en de hook.' },
      { title: 'Voorbereiden', desc: 'We schrijven het draaiboek en plannen de opname.' },
      { title: 'Opnemen', desc: 'We filmen efficiënt en doelgericht.' },
      { title: 'Monteren', desc: 'We monteren en leveren per platform op.' },
    ],
    case: {
      name: 'Pulse Athletics',
      sector: 'Sport en lifestyle',
      summary:
        'Een sportmerk dat veel postte maar weinig bleef hangen. We ontwikkelden een serie korte video’s met sterke hooks en een herkenbaar ritme.',
      outcome:
        'Content die kijkers langer vasthoudt, het merk een eigen toon geeft en veel makkelijker doorklikt naar de webshop.',
    },
    faq: [
      { q: 'Leveren jullie ook losse clips uit één shoot?', a: 'Ja. Uit één opnamedag halen we vaak meerdere video’s, zodat je langer vooruit kunt.' },
      { q: 'Schrijven jullie ook de captions?', a: 'Dat kan. We leveren passende captions en on-screen tekst die de boodschap versterken.' },
    ],
  }),
  S('video-fotografie', 'AI Video content', {
    tagline:
      'Schaalbare videocontent met AI, snel en betaalbaar, ideaal om veel varianten te testen.',
    story: [
      'AI maakt video toegankelijk op een schaal die met traditionele productie niet haalbaar is. Geen grote crew of dure opnamedag, maar beeld dat je snel kunt genereren, aanpassen en in tientallen varianten kunt uitrollen. Perfect om te testen wat werkt en daarna op te schalen.',
      'Wij combineren AI-tools met een scherp creatief oog. We bedenken het concept, genereren beeld dat past bij je merk, en monteren het tot afgewerkte video. Omdat varianten goedkoop zijn, kun je verschillende hooks, stijlen en boodschappen naast elkaar testen en doorgaan met wat het beste presteert.',
      'Het resultaat is een snelle, betaalbare contentstroom die je social en advertenties blijft voeden, zonder dat de kwaliteit of je merkgevoel eronder lijdt.',
    ],
    deliverables: [
      { title: 'AI-concept', desc: 'Een creatief concept dat de kracht van AI-beeld benut binnen je merk.' },
      { title: 'Generatie', desc: 'Het genereren van beeld en scènes, afgestemd op je stijl.' },
      { title: 'Montage', desc: 'Afgewerkte montage met geluid, tekst en ritme.' },
      { title: 'Varianten', desc: 'Meerdere versies om te testen en op te schalen wat werkt.' },
    ],
    audience:
      'Voor merken die veel content nodig hebben en willen testen zonder grote productiebudgetten. Ideaal voor advertenties waar volume en variatie het verschil maken.',
    why: [
      { title: 'Snel en schaalbaar', desc: 'Veel content en varianten in korte tijd, zonder een hele productie op te tuigen.' },
      { title: 'Test-gedreven', desc: 'Goedkope varianten betekenen dat je echt kunt testen wat het beste presteert.' },
      { title: 'Op merk', desc: 'AI met een creatief oog, zodat het beeld bij je merk past en niet generiek oogt.' },
    ],
    approach: [
      { title: 'Concept', desc: 'We bepalen het idee en de varianten die we willen testen.' },
      { title: 'Genereren', desc: 'We genereren beeld dat past bij je merk.' },
      { title: 'Monteren', desc: 'We werken de video’s af met geluid en tekst.' },
      { title: 'Opschalen', desc: 'We testen, meten en schalen op wat werkt.' },
    ],
    case: {
      name: 'Nova Skincare',
      sector: 'Beauty',
      summary:
        'Een skincare-merk dat snel veel advertentievarianten wilde testen zonder telkens een shoot te plannen. We bouwden een AI-contentstroom met tientallen varianten.',
      outcome:
        'Een continue toevoer van advertentievideo’s, de ruimte om snel te testen en een veel lagere productiedrempel per variant.',
    },
    faq: [
      { q: 'Ziet AI-video er niet goedkoop uit?', a: 'Niet bij ons. We combineren AI met een creatieve regie en nabewerking zodat het beeld bij je merk past.' },
      { q: 'Kunnen we AI en echte opnames mixen?', a: 'Zeker. Vaak is een mix het sterkst: echte beelden waar het telt, AI voor schaal en variatie.' },
    ],
  }),
  S('video-fotografie', 'Fotoshoots', {
    tagline:
      'Bedrijfs- en websitefoto’s die je merk professioneel neerzetten, een consistente beeldbank om mee te bouwen.',
    story: [
      'Foto’s bepalen in een fractie van een seconde hoe professioneel je overkomt. Een sterke beeldbank tilt je website, je socials en je presentaties op, terwijl losse, ongelijke foto’s juist afbreuk doen aan een verder sterk merk.',
      'Wij verzorgen fotoshoots van begin tot eind: we bedenken vooraf welke beelden je nodig hebt, fotograferen met aandacht voor licht en compositie, maken een scherpe selectie en retoucheren tot een consistente set. Of het nu gaat om je team, je product, je werkplek of sfeerbeeld, alles past binnen één visuele lijn.',
      'Het resultaat is een beeldbank die je merk versterkt en waarmee je overal sterk voor de dag komt, online en offline, nu en in de maanden daarna.',
    ],
    deliverables: [
      { title: 'Shoot', desc: 'Een professionele shoot, voorbereid op de beelden die je echt nodig hebt.' },
      { title: 'Selectie', desc: 'Een zorgvuldige selectie van de sterkste beelden.' },
      { title: 'Retouche', desc: 'Nabewerking tot een consistente, verzorgde set.' },
      { title: 'Levering', desc: 'Aangeleverde beelden in de juiste formaten voor web en print.' },
    ],
    audience:
      'Voor merken en bedrijven die professioneel willen ogen met eigen beeld in plaats van stockfoto’s. Ideaal bij een nieuwe website, een rebrand of gewoon een verouderde beeldbank.',
    why: [
      { title: 'Vooraf doordacht', desc: 'We bepalen samen welke beelden je nodig hebt zodat de shoot gericht is.' },
      { title: 'Consistente set', desc: 'Alle beelden passen binnen één lijn, klaar om overal in te zetten.' },
      { title: 'Klaar voor gebruik', desc: 'Geleverd in de juiste formaten zodat je meteen aan de slag kunt.' },
    ],
    approach: [
      { title: 'Kennismaken', desc: 'We bepalen de beeldbehoefte en de stijl.' },
      { title: 'Voorbereiden', desc: 'We plannen de shoot en de shotlist.' },
      { title: 'Fotograferen', desc: 'We fotograferen met oog voor licht en compositie.' },
      { title: 'Opleveren', desc: 'We selecteren, retoucheren en leveren aan.' },
    ],
    case: {
      name: 'Greenhouse Co',
      sector: 'Horeca',
      summary:
        'Een horecazaak met sfeer die online niet tot zijn recht kwam door wisselende telefoonfoto’s. We schoten een consistente beeldbank van interieur, gerechten en team.',
      outcome:
        'Een verzorgde set beeld die de sfeer eindelijk overbrengt en overal inzetbaar is, van website tot socials en menukaart.',
    },
    faq: [
      { q: 'Komen jullie op locatie?', a: 'Ja. We fotograferen op jouw locatie of in een studio, afhankelijk van wat het beste bij de beelden past.' },
      { q: 'Hoeveel foto’s krijg ik?', a: 'Dat stemmen we vooraf af op je behoefte. We leveren een scherpe selectie, geen eindeloze map om zelf door te ploegen.' },
    ],
  }),

  /* ───────────────────────── Social Media Beheer ───────────────────────── */
  S('social-media', 'Influencer Marketing', {
    tagline:
      'De juiste creators aan je merk koppelen voor echt bereik, van selectie tot meetbare resultaten.',
    story: [
      'Mensen vertrouwen mensen. Een aanbeveling van een creator die je doelgroep volgt, doet vaak meer dan welke advertentie ook. Maar influencer marketing werkt alleen als de match klopt: de juiste creator, de juiste boodschap en een aanpak die op echt bereik stuurt in plaats van op holle volgersaantallen.',
      'Wij koppelen je merk aan creators die echt passen, op basis van hun publiek en hun toon. We verzorgen de strategie, de briefing en de samenwerking, en houden bij wat het oplevert. Zo weet je niet alleen dat je gezien bent, maar ook wat het heeft gedaan.',
      'Het resultaat is geloofwaardig bereik bij de mensen die ertoe doen, en samenwerkingen die je merk versterken in plaats van alleen even zichtbaar maken.',
    ],
    deliverables: [
      { title: 'Creator-matching', desc: 'Een selectie van creators die echt bij je merk en doelgroep passen.' },
      { title: 'Strategie', desc: 'Een heldere aanpak met doelen, boodschap en kanalen.' },
      { title: 'Content', desc: 'Begeleiding van de content zodat hij klopt met je merk en werkt op het platform.' },
      { title: 'Rapportage', desc: 'Inzicht in bereik en resultaat zodat je weet wat de samenwerking deed.' },
    ],
    audience:
      'Voor merken die geloofwaardig bereik willen opbouwen bij een specifieke doelgroep. Ideaal als je producten of diensten verkoopt waar aanbeveling en vertrouwen het verschil maken.',
    why: [
      { title: 'Match boven volgers', desc: 'We kiezen op aansluiting en echt publiek, niet op opgeblazen volgersaantallen.' },
      { title: 'Volledig begeleid', desc: 'Van selectie en briefing tot uitvoering, wij regelen de samenwerking.' },
      { title: 'Meetbaar', desc: 'We rapporteren op resultaat zodat je weet wat het heeft opgeleverd.' },
    ],
    approach: [
      { title: 'Kennismaken', desc: 'We bepalen je doel en je doelgroep.' },
      { title: 'Selecteren', desc: 'We matchen de creators die echt passen.' },
      { title: 'Uitvoeren', desc: 'We briefen, begeleiden en lanceren de samenwerking.' },
      { title: 'Meten', desc: 'We rapporteren en sturen bij voor de volgende ronde.' },
    ],
    case: {
      name: 'Wildroot',
      sector: 'Natuurlijke voeding',
      summary:
        'Een voedingsmerk dat moeilijk doordrong tot een jongere doelgroep. We koppelden het aan creators met een betrokken, passend publiek en begeleidden de content.',
      outcome:
        'Geloofwaardige zichtbaarheid bij precies de juiste mensen en samenwerkingen die het merk een gezicht gaven in plaats van alleen een advertentie.',
    },
    faq: [
      { q: 'Werken jullie met micro-influencers?', a: 'Vaak juist wel. Micro-creators hebben doorgaans een betrokken publiek en leveren geloofwaardiger bereik per euro.' },
      { q: 'Regelen jullie de afspraken met creators?', a: 'Ja. We verzorgen de selectie, de briefing en de afstemming zodat jij er geen omkijken naar hebt.' },
    ],
  }),
  S('social-media', 'Meta Ads', {
    tagline:
      'Advertenties op Facebook en Instagram die converteren, scherp ingericht en doorlopend geoptimaliseerd.',
    story: [
      'Meta blijft een van de krachtigste kanalen om de juiste mensen te bereiken, mits je weet wat je doet. Het verschil tussen geld verbranden en winstgevend adverteren zit in de targeting, de creatives en de optimalisatie. Wij richten campagnes in die renderen en blijven sturen op resultaat.',
      'We beginnen bij een heldere campagnestructuur en scherpe targeting, gevoed door creatives die opvallen in de feed en aanzetten tot actie. Daarna is het werk niet klaar: we meten, testen en optimaliseren continu, zodat je budget steeds efficiënter wordt ingezet.',
      'Het resultaat is een advertentiekanaal dat voorspelbaar bijdraagt aan je groei, met grip op je kosten per resultaat en ruimte om op te schalen wat werkt.',
    ],
    deliverables: [
      { title: 'Campagne-opzet', desc: 'Een doordachte campagnestructuur die past bij je doel en je budget.' },
      { title: 'Targeting', desc: 'Scherpe doelgroepen die je advertenties bij de juiste mensen brengen.' },
      { title: 'Creatives', desc: 'Advertenties die opvallen in de feed en aanzetten tot actie.' },
      { title: 'Optimalisatie', desc: 'Doorlopend testen en bijsturen op kosten per resultaat.' },
    ],
    audience:
      'Voor merken die met advertenties willen groeien en hun budget rendabel willen inzetten. Ideaal voor webshops en dienstverleners die meer aanvragen of verkopen willen.',
    why: [
      { title: 'Resultaatgericht', desc: 'We sturen op kosten per klant en rendement, niet op vanity-cijfers.' },
      { title: 'Sterke creatives', desc: 'Goede targeting werkt alleen met advertenties die opvallen en overtuigen.' },
      { title: 'Continu optimaliseren', desc: 'We blijven testen en bijsturen zodat je budget steeds beter werkt.' },
    ],
    approach: [
      { title: 'Kennismaken', desc: 'We bepalen je doel, doelgroep en budget.' },
      { title: 'Opzetten', desc: 'We bouwen de campagnestructuur en creatives.' },
      { title: 'Lanceren', desc: 'We zetten de campagnes live en meten vanaf dag één.' },
      { title: 'Optimaliseren', desc: 'We testen en sturen door op resultaat.' },
    ],
    case: {
      name: 'Lumen Home',
      sector: 'Woonaccessoires',
      summary:
        'Een webshop die wel adverteerde maar zonder grip op het rendement. We herstructureerden de campagnes en vernieuwden de creatives met een duidelijke testaanpak.',
      outcome:
        'Een advertentiekanaal met grip en richting, waarin duidelijk werd wat werkt en het budget gericht naar de winnende campagnes ging.',
    },
    faq: [
      { q: 'Wat is een goed startbudget?', a: 'Dat hangt af van je doel en marge. We adviseren een realistisch budget waarmee we kunnen testen en leren voordat we opschalen.' },
      { q: 'Maken jullie ook de advertentiebeelden?', a: 'Ja. We maken creatives die werken op het platform, of het nu beeld of video is.' },
    ],
  }),
  S('social-media', 'TikTok Ads', {
    tagline:
      'Advertenties op TikTok die aansluiten bij de feed, native content die voelt als TikTok, niet als reclame.',
    story: [
      'Op TikTok werkt reclame die niet als reclame voelt. De gebruiker scrollt door een stroom native content, en advertenties die daar tussen passen presteren, terwijl klassieke commercials worden weggeswipet. Het draait om het juiste ritme, de juiste toon en een hook die meteen pakt.',
      'Wij maken TikTok-campagnes met creatives die thuishoren in de feed. We bedenken concepten die native aanvoelen, richten de campagne en targeting scherp in, en optimaliseren op wat aanslaat bij jouw doelgroep. Zo zet je het bereik van TikTok om in resultaat.',
      'Het resultaat zijn advertenties die opvallen zonder te storen, een merk dat geloofwaardig overkomt op het platform, en een kanaal dat bijdraagt aan je groei.',
    ],
    deliverables: [
      { title: 'Campagne-opzet', desc: 'Een campagnestructuur afgestemd op hoe TikTok werkt.' },
      { title: 'Creatives', desc: 'Native content die aanvoelt als TikTok en meteen pakt.' },
      { title: 'Targeting', desc: 'Scherpe targeting die je advertenties bij de juiste kijkers brengt.' },
      { title: 'Optimalisatie', desc: 'Doorlopend testen en bijsturen op wat aanslaat.' },
    ],
    audience:
      'Voor merken die een jongere of trend-gevoelige doelgroep willen bereiken. Ideaal als je product of dienst zich leent voor beeld en beweging.',
    why: [
      { title: 'Native eerst', desc: 'We maken content die in de feed past, want dat is wat op TikTok werkt.' },
      { title: 'Hook-gedreven', desc: 'De eerste seconde bepaalt alles, daar bouwen we de creatives omheen.' },
      { title: 'Doorlopend scherp', desc: 'We testen en optimaliseren continu op wat aanslaat bij je doelgroep.' },
    ],
    approach: [
      { title: 'Kennismaken', desc: 'We bepalen je doel en doelgroep op TikTok.' },
      { title: 'Concept', desc: 'We bedenken native creatives die pakken.' },
      { title: 'Lanceren', desc: 'We zetten de campagne op en live.' },
      { title: 'Optimaliseren', desc: 'We sturen door op de best presterende content.' },
    ],
    case: {
      name: 'Drift Apparel',
      sector: 'Streetwear',
      summary:
        'Een streetwear-merk dat op TikTok wilde groeien maar met te gelikte advertenties bleef hangen. We ontwikkelden native creatives die in de feed thuishoorden.',
      outcome:
        'Advertenties die niet weggeswipet werden, een merk dat geloofwaardig op het platform stond en zichtbaar meer betrokkenheid kreeg.',
    },
    faq: [
      { q: 'Hebben we al een TikTok-account nodig?', a: 'Handig, maar niet verplicht. We helpen je op weg en kunnen ook adverteren met content die los van een groot account werkt.' },
      { q: 'Werkt TikTok voor mijn doelgroep?', a: 'TikTok bereikt allang niet meer alleen tieners. We bekijken samen of jouw doelgroep er actief is voordat we starten.' },
    ],
  }),

  /* ───────────────────────── SEO & SEA ───────────────────────── */
  S('seo-sea', 'SEO', {
    tagline:
      'Structureel bovenaan in Google met techniek, content en autoriteit, vindbaarheid die blijft staan.',
    story: [
      'SEO is geen trucje maar een doorlopende investering die zich blijft uitbetalen. Wie structureel bovenaan staat voor de zoektermen die ertoe doen, krijgt een stroom bezoekers die actief op zoek zijn naar wat jij biedt, zonder dat je per klik betaalt. Maar bovenaan komen en blijven vraagt een aanpak op meerdere fronten.',
      'Wij werken aan de drie pijlers tegelijk: een technisch gezonde website die snel en vindbaar is, content die antwoord geeft op wat je doelgroep zoekt, en autoriteit die je gezag opbouwt in de ogen van Google. Voor lokale bedrijven zorgen we bovendien dat je goed gevonden wordt in je eigen regio.',
      'Het resultaat is vindbaarheid die blijft staan en klanten blijft opleveren, ook als je niet betaalt voor advertenties. Het is werk van de lange adem, maar het bouwt een fundament dat steeds meer waard wordt.',
    ],
    deliverables: [
      { title: 'Techniek', desc: 'Een technisch gezonde, snelle site die Google moeiteloos kan lezen.' },
      { title: 'Content', desc: 'Content die aansluit op wat je doelgroep zoekt en waarde toevoegt.' },
      { title: 'Linkbuilding', desc: 'Het opbouwen van autoriteit met relevante, betrouwbare verwijzingen.' },
      { title: 'Lokale vindbaarheid', desc: 'Optimalisatie zodat je gevonden wordt door zoekers in je regio.' },
    ],
    audience:
      'Voor bedrijven die op de lange termijn willen groeien zonder afhankelijk te zijn van betaalde advertenties. Ideaal als je een markt bedient waarin mensen actief zoeken naar je aanbod.',
    why: [
      { title: 'Alle pijlers samen', desc: 'Techniek, content en autoriteit in samenhang, want los werkt het maar half.' },
      { title: 'Blijvend resultaat', desc: 'Vindbaarheid die standhoudt en klanten blijft opleveren, ook zonder advertentiebudget.' },
      { title: 'Transparant', desc: 'Heldere rapportage zodat je ziet hoe je posities en verkeer zich ontwikkelen.' },
    ],
    approach: [
      { title: 'Analyse', desc: 'We brengen je site, je markt en je zoektermen in kaart.' },
      { title: 'Techniek', desc: 'We maken de technische basis gezond.' },
      { title: 'Content', desc: 'We bouwen content rond wat je doelgroep zoekt.' },
      { title: 'Groeien', desc: 'We bouwen autoriteit op en blijven optimaliseren.' },
    ],
    case: {
      name: 'Brightwork',
      sector: 'Zakelijke dienstverlening',
      summary:
        'Een dienstverlener die nauwelijks organisch gevonden werd en volledig leunde op advertenties. We pakten techniek, content en autoriteit gestructureerd aan.',
      outcome:
        'Een groeiende stroom organische bezoekers die actief zoeken, en steeds minder afhankelijkheid van betaald verkeer.',
    },
    faq: [
      { q: 'Hoe snel zie ik resultaat?', a: 'SEO is werk van de lange adem. De eerste verschuivingen zie je vaak binnen enkele maanden, het echte fundament bouwt zich daarna verder op.' },
      { q: 'Schrijven jullie ook de content?', a: 'Ja. We kunnen de volledige content verzorgen of samenwerken met jouw team, afhankelijk van wat past.' },
    ],
  }),
  S('seo-sea', 'Google Ads', {
    tagline:
      'Direct zichtbaar bovenaan voor wie nu zoekt naar wat jij biedt, strak gestuurd op rendement.',
    story: [
      'Waar SEO de lange termijn bouwt, levert Google Ads direct resultaat. Je verschijnt bovenaan op het moment dat iemand actief zoekt naar wat jij aanbiedt, precies wanneer de koopintentie het hoogst is. Mits goed ingericht, is dat een van de meest directe manieren om klanten binnen te halen.',
      'Wij richten campagnes in rond de zoekwoorden die er voor jou toe doen, schrijven advertenties die opvallen en aanzetten tot klikken, en sturen strak op de kosten per klant. We voorkomen dat budget weglekt naar verkeer dat niet converteert, en blijven optimaliseren tot de campagne efficiënt draait.',
      'Het resultaat is een kanaal dat snel zichtbaar maakt wat werkt, voorspelbaar leads of verkopen oplevert, en zich laat opschalen zodra het rendeert.',
    ],
    deliverables: [
      { title: 'Campagne-opzet', desc: 'Een heldere campagnestructuur gericht op koopintentie.' },
      { title: 'Zoekwoorden', desc: 'De juiste zoekwoorden, met uitsluiting van wat alleen budget kost.' },
      { title: 'Advertenties', desc: 'Advertenties die opvallen en de klik waard zijn.' },
      { title: 'Optimalisatie', desc: 'Doorlopend sturen op kosten per klant en rendement.' },
    ],
    audience:
      'Voor bedrijven die snel zichtbaar willen zijn bij zoekers met koopintentie. Ideaal als je direct aanvragen of verkopen wilt en bereid bent te sturen op rendement.',
    why: [
      { title: 'Direct zichtbaar', desc: 'Je staat bovenaan op het moment dat iemand zoekt naar jouw aanbod.' },
      { title: 'Geen budgetlek', desc: 'We sluiten irrelevant verkeer uit zodat je budget naar echte kansen gaat.' },
      { title: 'Gestuurd op rendement', desc: 'We optimaliseren op kosten per klant, niet op kliks alleen.' },
    ],
    approach: [
      { title: 'Kennismaken', desc: 'We bepalen je doel, markt en budget.' },
      { title: 'Opzetten', desc: 'We bouwen de campagnes en zoekwoorden.' },
      { title: 'Lanceren', desc: 'We gaan live en meten vanaf de eerste klik.' },
      { title: 'Optimaliseren', desc: 'We sturen door op kosten per klant.' },
    ],
    case: {
      name: 'Vesta Klimaat',
      sector: 'Installatietechniek',
      summary:
        'Een installatiebedrijf dat advertenties draaide maar veel budget verloor aan irrelevante kliks. We herstructureerden de campagnes en scherpten zoekwoorden en advertenties aan.',
      outcome:
        'Een campagne die gericht zoekers met echte intentie binnenhaalt en het budget veel efficiënter omzet in aanvragen.',
    },
    faq: [
      { q: 'Werkt Google Ads naast SEO?', a: 'Juist samen sterk. Ads leveren direct resultaat terwijl SEO de lange termijn bouwt, en ze versterken elkaar.' },
      { q: 'Kan ik snel stoppen of bijsturen?', a: 'Ja. Het mooie van Ads is de flexibiliteit: we kunnen budget en richting snel aanpassen op basis van resultaat.' },
    ],
  }),

  /* ───────────────────────── Extra diensten ───────────────────────── */
  S('extra', 'AI Agents', {
    tagline:
      'Slimme AI-assistenten die werk uit handen nemen, dag en nacht, van klantvragen tot terugkerende taken.',
    story: [
      'AI-agents zijn slimme assistenten die zelfstandig taken uitvoeren. Geen simpele chatbot met standaardantwoorden, maar een assistent die je klanten te woord staat, terugkerend werk afhandelt en draait op het moment dat jij dat niet kunt. Het is alsof je team groeit zonder dat je hoeft op te schalen.',
      'Wij bepalen samen welke use-case het meest oplevert, bouwen de agent op maat en koppelen hem aan de systemen en kennis die hij nodig heeft. Of het nu gaat om klantvragen beantwoorden, leads kwalificeren of interne processen automatiseren, we zorgen dat de agent betrouwbaar werkt en bij je merk past.',
      'Het resultaat is meer gedaan met minder handwerk, snellere reacties voor je klanten en ruimte voor je team om te focussen op wat er echt toe doet.',
    ],
    deliverables: [
      { title: 'Use-case', desc: 'We bepalen waar een AI-agent het meeste oplevert voor jouw situatie.' },
      { title: 'Bouw', desc: 'Een op maat gebouwde agent, afgestemd op je merk en je taal.' },
      { title: 'Integratie', desc: 'Koppeling met je kanalen, systemen en kennisbronnen.' },
      { title: 'Onderhoud', desc: 'Doorlopend bijsturen en verbeteren op basis van gebruik.' },
    ],
    audience:
      'Voor bedrijven die veel terugkerend werk of klantvragen hebben en willen opschalen zonder evenredig meer mensen. Ideaal als reactiesnelheid en beschikbaarheid belangrijk zijn.',
    why: [
      { title: 'Dag en nacht', desc: 'Een agent die altijd aanstaat en niet wacht op kantoortijden.' },
      { title: 'Op maat', desc: 'Gebouwd rond jouw use-case en gekoppeld aan jouw kennis, niet generiek.' },
      { title: 'Betrouwbaar', desc: 'We bewaken kwaliteit en sturen bij zodat de agent klopt en bij je merk past.' },
    ],
    approach: [
      { title: 'Kennismaken', desc: 'We bepalen de meest waardevolle use-case.' },
      { title: 'Bouwen', desc: 'We bouwen de agent en voeden hem met je kennis.' },
      { title: 'Koppelen', desc: 'We integreren met je kanalen en systemen.' },
      { title: 'Verbeteren', desc: 'We meten, onderhouden en bouwen door.' },
    ],
    case: {
      name: 'Helder Support',
      sector: 'Dienstverlening',
      summary:
        'Een dienstverlener die werd bedolven onder dezelfde klantvragen. We bouwden een AI-agent die de meest voorkomende vragen direct beantwoordt en complexe gevallen netjes doorzet.',
      outcome:
        'Snellere antwoorden voor klanten, een team dat zich op het echte werk kan richten en bereikbaarheid die niet meer aan kantoortijden gebonden is.',
    },
    faq: [
      { q: 'Vervangt een AI-agent mijn team?', a: 'Nee, hij ontlast het. De agent neemt herhaalwerk over zodat je team tijd houdt voor wat aandacht vraagt.' },
      { q: 'Praat de agent in onze eigen toon?', a: 'Ja. We stemmen taal en toon af op je merk en voeden de agent met jouw kennis.' },
    ],
  }),
  S('extra', 'Administratie', {
    tagline:
      'De zakelijke afhandeling op de achtergrond geregeld, zodat jij rust en overzicht houdt.',
    story: [
      'Administratie is zelden waar je ondernemen voor begon, maar wel iets dat moet kloppen. Slordige of achterstallige administratie kost rust, overzicht en uiteindelijk geld. Wij nemen het werk uit handen zodat jij je kunt richten op ondernemen, met de zekerheid dat de basis op orde is.',
      'We richten je administratie helder in, verwerken de lopende zaken nauwkeurig en zorgen voor rapportage waarmee je grip houdt op je cijfers. Waar gespecialiseerd financieel advies nodig is, werken we samen met onze partner WRBC, zodat je altijd bij de juiste expertise terechtkomt.',
      'Het resultaat is overzicht en rust: je weet waar je staat, je administratie loopt zonder dat je er constant naar hoeft om te kijken, en je hebt een vast aanspreekpunt als er vragen zijn.',
    ],
    deliverables: [
      { title: 'Inrichting', desc: 'Een heldere administratieve opzet die past bij je bedrijf.' },
      { title: 'Verwerking', desc: 'Nauwkeurige verwerking van je lopende administratie.' },
      { title: 'Rapportage', desc: 'Inzichtelijke rapportages zodat je grip houdt op je cijfers.' },
      { title: 'Advies', desc: 'Financieel advies waar nodig, in samenwerking met WRBC.' },
    ],
    audience:
      'Voor ondernemers die hun administratie willen uitbesteden om tijd en rust terug te krijgen. Ideaal als je groeit en je financiële afhandeling professioneler moet worden.',
    why: [
      { title: 'Rust en overzicht', desc: 'Je administratie loopt, en je weet altijd waar je staat.' },
      { title: 'Een aanspreekpunt', desc: 'Een vast contact voor je vragen, geen telkens wisselend loket.' },
      { title: 'Expertise binnen handbereik', desc: 'Voor specialistisch advies schakelen we onze partner WRBC in.' },
    ],
    approach: [
      { title: 'Kennismaken', desc: 'We brengen je situatie en wensen in beeld.' },
      { title: 'Inrichten', desc: 'We zetten je administratie helder op.' },
      { title: 'Verwerken', desc: 'We houden de lopende administratie bij.' },
      { title: 'Adviseren', desc: 'We rapporteren en adviseren waar nodig.' },
    ],
    case: {
      name: 'Maasveld Ondernemers',
      sector: 'MKB',
      summary:
        'Een groeiend bedrijf waar de administratie achterliep en het overzicht zoek was. We richtten de administratie opnieuw in en namen de verwerking over, met WRBC voor het advies.',
      outcome:
        'Een bijgewerkte administratie, helder inzicht in de cijfers en een ondernemer die weer kon ondernemen in plaats van bonnetjes sorteren.',
    },
    faq: [
      { q: 'Wat is de rol van WRBC?', a: 'WRBC is onze partner voor financieel en fiscaal advies. Waar specialistische kennis nodig is, schakelen we hen in zodat je altijd goed zit.' },
      { q: 'Werken jullie met ons huidige boekhoudpakket?', a: 'Doorgaans wel. We sluiten aan op wat je gebruikt of adviseren een pakket dat beter past.' },
    ],
  }),
  S('extra', 'Sourcing', {
    tagline:
      'Producten en middelen inkopen en regelen voor merken die opschalen, scherp en betrouwbaar.',
    story: [
      'Als je opschaalt, wordt inkoop een vak apart. De juiste producten vinden, betrouwbare leveranciers selecteren, op kwaliteit controleren en de logistiek regelen, het bepaalt je marge en je betrouwbaarheid naar klanten. Wij nemen die keten uit handen zodat jij je kunt richten op verkopen en groeien.',
      'We zoeken en selecteren leveranciers, onderhandelen op scherpe voorwaarden en bewaken de kwaliteit zodat je krijgt wat je verwacht. Van eerste sample tot betrouwbare aanlevering regelen we het proces, met oog voor zowel kosten als kwaliteit.',
      'Het resultaat is een inkoopketen waar je op kunt bouwen: de juiste producten, scherp ingekocht, op kwaliteit gecontroleerd en op tijd geleverd, zodat je kunt opschalen zonder dat de basis wankelt.',
    ],
    deliverables: [
      { title: 'Leveranciers', desc: 'Het vinden en selecteren van betrouwbare leveranciers.' },
      { title: 'Inkoop', desc: 'Onderhandeling en inkoop op scherpe voorwaarden.' },
      { title: 'Kwaliteitscheck', desc: 'Controle op kwaliteit zodat je krijgt wat je verwacht.' },
      { title: 'Logistiek', desc: 'Het regelen van de aanvoer tot betrouwbare aanlevering.' },
    ],
    audience:
      'Voor merken en ondernemers die fysieke producten verkopen en willen opschalen zonder verzanden in inkoop en logistiek. Ideaal als marge en betrouwbaarheid cruciaal zijn.',
    why: [
      { title: 'Scherp ingekocht', desc: 'We onderhandelen op voorwaarden die je marge en kwaliteit beschermen.' },
      { title: 'Kwaliteit bewaakt', desc: 'We controleren zodat je niet voor verrassingen komt te staan.' },
      { title: 'Hele keten geregeld', desc: 'Van leverancier tot levering, jij houdt overzicht zonder het zelf te doen.' },
    ],
    approach: [
      { title: 'Kennismaken', desc: 'We bepalen wat je nodig hebt en je eisen.' },
      { title: 'Zoeken', desc: 'We vinden en selecteren de juiste leveranciers.' },
      { title: 'Inkopen', desc: 'We onderhandelen en kopen scherp in.' },
      { title: 'Leveren', desc: 'We bewaken kwaliteit en regelen de logistiek.' },
    ],
    case: {
      name: 'Coast Supply',
      sector: 'Consumentenproducten',
      summary:
        'Een opschalend merk dat vastliep op onbetrouwbare leveranciers en wisselende kwaliteit. We herzagen de inkoopketen en selecteerden vaste, gecontroleerde leveranciers.',
      outcome:
        'Een stabiele inkoopketen met voorspelbare kwaliteit en levering, zodat het merk kon opschalen zonder zorgen over de basis.',
    },
    faq: [
      { q: 'Werken jullie ook met buitenlandse leveranciers?', a: 'Ja. We zoeken waar de beste combinatie van prijs, kwaliteit en betrouwbaarheid zit, in binnen- en buitenland.' },
      { q: 'Controleren jullie de kwaliteit echt?', a: 'Ja. Kwaliteitscontrole is onderdeel van het proces, van sample tot aanlevering, zodat je niet voor verrassingen staat.' },
    ],
  }),
  S('extra', 'Detachering', {
    tagline:
      'Het juiste talent op de juiste plek, tijdelijk of structureel, flexibel opschalen zonder gedoe.',
    story: [
      'Soms heb je gewoon de juiste mensen nodig, snel en zonder een lang wervingstraject. Detachering geeft je flexibiliteit: talent dat aan de slag gaat wanneer jij het nodig hebt, voor een project of voor de lange termijn, zonder de vaste lasten en risico’s van zelf werven.',
      'Wij matchen op meer dan een cv. We kijken naar de plek die je wilt invullen, naar je team en je manier van werken, en zoeken talent dat echt past. Daarna verzorgen we de plaatsing en blijven we betrokken met begeleiding en opvolging, zodat het ook op de lange termijn goed loopt.',
      'Het resultaat is de juiste persoon op de juiste plek, flexibel inzetbaar, met een partner die meedenkt in plaats van alleen een naam aanleveren.',
    ],
    deliverables: [
      { title: 'Matching', desc: 'Een zorgvuldige match op vaardigheden én aansluiting bij je team.' },
      { title: 'Plaatsing', desc: 'De afhandeling van de plaatsing, zodat iemand soepel kan starten.' },
      { title: 'Begeleiding', desc: 'Begeleiding tijdens de inzet zodat het werk goed verloopt.' },
      { title: 'Opvolging', desc: 'Opvolging en bijsturing zodat de samenwerking blijft kloppen.' },
    ],
    audience:
      'Voor bedrijven die flexibel willen opschalen of een specifieke rol tijdelijk willen invullen. Ideaal bij piekdrukte, projecten of als je talent zoekt zonder direct vast in dienst.',
    why: [
      { title: 'Match die past', desc: 'We kijken verder dan het cv naar aansluiting bij je team en werkwijze.' },
      { title: 'Flexibel', desc: 'Opschalen wanneer je het nodig hebt, zonder de lasten van vast werven.' },
      { title: 'Betrokken', desc: 'We blijven meedenken met begeleiding en opvolging, niet alleen plaatsen.' },
    ],
    approach: [
      { title: 'Kennismaken', desc: 'We bepalen de rol en wat echt past bij je team.' },
      { title: 'Matchen', desc: 'We zoeken en selecteren het juiste talent.' },
      { title: 'Plaatsen', desc: 'We regelen de plaatsing en de start.' },
      { title: 'Opvolgen', desc: 'We begeleiden en sturen bij waar nodig.' },
    ],
    case: {
      name: 'Norterm Bouw',
      sector: 'Bouw en techniek',
      summary:
        'Een bedrijf met een plotselinge piek aan projecten en te weinig handen. We plaatsten op korte termijn passend talent en begeleidden de inzet.',
      outcome:
        'De juiste mensen op de juiste plek precies toen het nodig was, zonder een langdurig wervingstraject en met begeleiding die de inzet liet slagen.',
    },
    faq: [
      { q: 'Tijdelijk of vast?', a: 'Allebei mogelijk. We detacheren voor een project of langere periode, en denken mee als een rol structureel blijkt te worden.' },
      { q: 'Hoe snel kan iemand starten?', a: 'Afhankelijk van de rol vaak op korte termijn. We bewegen snel zodat je niet onnodig met onderbezetting zit.' },
    ],
  }),
]

/** Lookup by `${serviceSlug}/${subSlug}`. */
export const SUB_BY_KEY: Record<string, SubService> = Object.fromEntries(
  SUB_SERVICES.map((s) => [`${s.serviceSlug}/${s.slug}`, s]),
)

/** All sub-services that belong to a given main service, in order. */
export function subsForService(serviceSlug: string): SubService[] {
  return SUB_SERVICES.filter((s) => s.serviceSlug === serviceSlug)
}

/** The parent main service for a sub (label, accent, icon, etc.). */
export function parentService(sub: SubService) {
  return SERVICE_BY_SLUG[sub.serviceSlug]
}
