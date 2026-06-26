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
  /** "Wat het is" section heading. Falls back to a generic heading. */
  whatTitle?: string
  /** "In actie" section heading. Falls back to a generic heading. */
  actionTitle?: string
  /** "In actie" supporting line. Falls back to the hero tagline. */
  actionText?: string
  /** "Hoe we het aanpakken" section heading. Falls back to a generic heading. */
  approachTitle?: string
  /** Closing-CTA heading. */
  ctaTitle?: string
  /** Closing-CTA paragraph. */
  ctaText?: string
  /** Primary CTA button label (hero + closing CTA). Falls back to the parent traject. */
  ctaButton?: string
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
      'Een herkenbare stijl die jouw merk in een oogopslag professioneel, consistent en sterk maakt.',
    whatTitle: 'Visuele identiteit die klopt.',
    story: [
      'Een visuele identiteit is meer dan een mooi logo. Het is de basis van hoe jouw merk eruitziet, voelt en herkend wordt op elk kanaal. Wij zorgen voor een stijl die past bij je bedrijf, je doelgroep en je ambities. Van logo en kleuren tot typografie en gebruiksregels: alles wordt zo ontworpen dat je merk professioneel, herkenbaar en consistent naar buiten komt.',
    ],
    actionTitle: 'Zo ziet herkenbaarheid eruit.',
    actionText:
      'Een visuele stijl die jouw merk direct herkenbaar maakt en op elk kanaal sterk blijft.',
    deliverables: [
      { title: 'Logo en woordmerk', desc: 'Een herkenbaar logo dat past bij je merk en professioneel inzetbaar is.' },
      { title: 'Kleurpalet', desc: 'Kleuren die je uitstraling versterken en zorgen voor herkenning.' },
      { title: 'Typografie', desc: 'Lettertypes die passen bij de uitstraling en leesbaarheid van je merk.' },
      { title: 'Merk-gebruiksboek', desc: 'Heldere richtlijnen voor logo, kleur, typografie en visuele toepassing.' },
    ],
    audience:
      'Voor ondernemers en bedrijven die professioneler willen overkomen, consistenter zichtbaar willen zijn en een merk willen bouwen dat vertrouwen wekt. Ideaal als je huidige uitstraling niet meer past bij waar je bedrijf naartoe groeit.',
    why: [
      { title: 'Strategisch gestart', desc: 'We kijken eerst naar je bedrijf, doelgroep en positionering voordat we ontwerpen.' },
      { title: 'Toepasbaar op elk kanaal', desc: 'Je stijl werkt op je website, social media, drukwerk en andere uitingen.' },
      { title: 'Klaar voor de toekomst', desc: 'We bouwen een merkbasis die meegroeit met je bedrijf.' },
    ],
    approachTitle: 'Van uitstraling naar herkenning.',
    approach: [
      { title: 'Kennismaken', desc: 'We begrijpen je bedrijf, doelgroep en gewenste uitstraling.' },
      { title: 'Richting bepalen', desc: 'We bepalen de stijl, sfeer en visuele basis van je merk.' },
      { title: 'Ontwerpen', desc: 'We werken logo, kleuren, typografie en visuele elementen uit.' },
      { title: 'Opleveren', desc: 'Je ontvangt een duidelijke merkbasis die je direct kunt gebruiken.' },
    ],
    case: {
      name: 'Nordveld',
      sector: 'Duurzame interieurmerk',
      summary:
        'Een herkenbare merkbasis ontwikkeld voor een bedrijf dat professioneler en consistenter zichtbaar wilde worden.',
      outcome:
        'Met een duidelijke stijl, sterke kleuren en praktische richtlijnen staat het merk nu sterker op elk kanaal.',
    },
    faq: [
      { q: 'Krijg ik ook de bronbestanden?', a: 'Ja, je ontvangt de belangrijkste bestanden die nodig zijn om je merk professioneel te gebruiken.' },
      { q: 'Kan mijn bestaande logo blijven?', a: 'Ja, als het logo sterk genoeg is kunnen we daarop voortbouwen en de stijl verder professionaliseren.' },
    ],
    ctaTitle: 'Klaar voor een merk dat blijft hangen?',
    ctaText:
      'Vertel ons waar je nu staat. Wij helpen je met een visuele identiteit die vertrouwen wekt en meegroeit met je bedrijf.',
  }),
  S('design-branding', 'Packaging', {
    tagline:
      'Verpakking die jouw product laat opvallen, professioneel presenteert en klaar maakt voor verkoop.',
    whatTitle: 'Packaging die opvalt.',
    story: [
      'Goede packaging doet meer dan je product verpakken. Het is vaak het eerste contactmoment met je klant. Wij ontwerpen verpakkingen die passen bij je merk, doelgroep en verkoopkanaal. Van concept tot drukklare bestanden: alles wordt ontworpen om je product sterker, professioneler en herkenbaarder neer te zetten.',
    ],
    actionTitle: 'Zo ziet sterke packaging eruit.',
    actionText:
      'Verpakkingsontwerp dat je product zichtbaar maakt, vertrouwen wekt en klaar is voor presentatie of verkoop.',
    deliverables: [
      { title: 'Design', desc: 'Een sterk verpakkingsontwerp dat past bij je merk en product.' },
      { title: 'Verpakkingsontwerp', desc: 'Het complete ontwerp voor doos, label, wikkel of andere verpakking.' },
      { title: 'Drukklare bestanden', desc: 'Bestanden die technisch klaar zijn voor productie bij de drukker.' },
      { title: 'Mockups', desc: 'Realistische presentaties om je verpakking professioneel te tonen.' },
    ],
    audience:
      'Voor merken en ondernemers die hun product sterker willen presenteren en professioneler willen verkopen. Ideaal voor food, cosmetics, e-commerce en merken waarbij uitstraling en unboxing belangrijk zijn.',
    why: [
      { title: 'Schapklaar denken', desc: 'We ontwerpen niet alleen mooi, maar ook praktisch en verkoopgericht.' },
      { title: 'Drukklaar opgeleverd', desc: 'Je ontvangt bestanden die klaar zijn voor productie.' },
      { title: 'Merk voelbaar', desc: 'Je verpakking sluit aan op je identiteit en versterkt je merkbeleving.' },
    ],
    approachTitle: 'Van concept naar verpakking.',
    approach: [
      { title: 'Kennismaken', desc: 'We begrijpen je product, doelgroep en verkoopkanaal.' },
      { title: 'Concept', desc: 'We bepalen de visuele richting en uitstraling van de verpakking.' },
      { title: 'Uitwerken', desc: 'We werken het ontwerp uit tot een professioneel eindresultaat.' },
      { title: 'Productie', desc: 'We leveren alles drukklaar aan voor productie.' },
    ],
    case: {
      name: 'Botanic Brew',
      sector: 'Dranken',
      summary:
        'Een nieuwe lijn koud-thee producten die fris, natuurlijk en professioneel moest aanvoelen.',
      outcome:
        'We ontwikkelden een verpakking die opvalt, past bij het merk en makkelijk uitbreidbaar is naar nieuwe smaken.',
    },
    faq: [
      { q: 'Werken jullie samen met onze drukker?', a: 'Ja, we stemmen waar nodig af met de drukker zodat de bestanden goed aangeleverd worden.' },
      { q: 'Kunnen jullie meerdere varianten leveren?', a: 'Ja, we kunnen een systeem ontwikkelen waarmee smaken of varianten makkelijk toegevoegd kunnen worden.' },
    ],
    ctaTitle: 'Klaar voor packaging die opvalt?',
    ctaText:
      'Vertel ons over je product. Wij helpen je met verpakking die professioneel oogt, vertrouwen wekt en klaar is voor verkoop.',
    ctaButton: 'Start jouw packagingtraject',
  }),
  S('design-branding', 'Social Media Visual System', {
    tagline:
      'Een herkenbaar social media systeem waarmee je merk consistent zichtbaar blijft, zonder elke post opnieuw vanaf nul te ontwerpen.',
    whatTitle: 'Social media stijl die klopt.',
    story: [
      'Een sterke feed ontstaat niet door losse posts, maar door een herkenbaar systeem. Wij ontwikkelen templates, formats en richtlijnen waarmee je content professioneel, consistent en herkenbaar blijft. Zo wordt social media makkelijker te beheren en sterker voor je merk.',
    ],
    actionTitle: 'Zo ziet een consistente feed eruit.',
    actionText:
      'Een social media systeem dat je merk herkenbaar maakt en zorgt voor rust, structuur en vertrouwen in je uitstraling.',
    deliverables: [
      { title: 'Templates', desc: 'Herbruikbare ontwerpen voor terugkerende posts.' },
      { title: 'Post-formats', desc: 'Vaste formats die passen bij je merk en content.' },
      { title: 'Story-formats', desc: 'Story- en reel-covers die je kanaal herkenbaar maken.' },
      { title: 'Richtlijnen', desc: 'Duidelijke afspraken voor kleur, typografie en gebruik.' },
    ],
    audience:
      'Voor merken die structureel posten en willen dat hun feed professioneel, herkenbaar en consistent aanvoelt. Ideaal als je content maakt, maar nog geen duidelijke visuele lijn hebt.',
    why: [
      { title: 'Herkenbaar zonder logo', desc: 'Je content voelt als je merk, nog voordat iemand je naam ziet.' },
      { title: 'Sneller content maken', desc: 'Met vaste formats werk je sneller en consistenter.' },
      { title: 'Houdbaar systeem', desc: 'Richtlijnen zorgen dat je stijl blijft kloppen, ook als meerdere mensen eraan werken.' },
    ],
    approachTitle: 'Van losse posts naar een herkenbaar systeem.',
    approach: [
      { title: 'Kennismaken', desc: 'We bekijken je merk, doelgroep en huidige content.' },
      { title: 'Systeem bepalen', desc: 'We bepalen welke formats en templates je nodig hebt.' },
      { title: 'Uitwerken', desc: 'We ontwerpen de templates en visuele richtlijnen.' },
      { title: 'Overdragen', desc: 'Je ontvangt een bruikbaar systeem waarmee je team direct verder kan.' },
    ],
    case: {
      name: 'Studio Vesper',
      sector: 'Lifestyle',
      summary:
        'Een lifestylemerk waarvan de feed rommelig oogde door wisselende stijlen.',
      outcome:
        'We ontwikkelden een visueel systeem met vaste formats, waardoor de content direct herkenbaarder, rustiger en professioneler werd.',
    },
    faq: [
      { q: 'In welk programma leveren jullie de templates?', a: 'We leveren de templates in een programma dat past bij jouw werkwijze, zoals Canva, Figma of Adobe.' },
      { q: 'Maken jullie ook de content zelf?', a: 'Ja, dat kan. We kunnen het systeem opleveren, maar ook helpen met contentcreatie en beheer.' },
    ],
    ctaTitle: 'Klaar voor een feed die klopt?',
    ctaText:
      'Vertel ons waar je nu staat. Wij helpen je met een social media systeem dat herkenbaar, professioneel en makkelijk toepasbaar is.',
  }),
  S('design-branding', 'Complete Branding', {
    tagline:
      'Een volledig merktraject waarin strategie, uitstraling en toepassing samenkomen tot een sterk geheel.',
    whatTitle: 'Branding van strategie tot uitvoering.',
    story: [
      'Complete branding is voor bedrijven die hun merk professioneel willen neerzetten of opnieuw willen opbouwen. We starten bij de basis: wie je bent, voor wie je er bent en hoe je herkend wilt worden. Daarna vertalen we dit naar een sterke visuele identiteit, duidelijke richtlijnen en toepassingen die je merk overal consistent maken. Zo ontstaat geen losse huisstijl, maar een merk dat klopt in uitstraling, verhaal en uitvoering.',
    ],
    actionTitle: 'Zo ziet complete branding eruit.',
    actionText:
      'Een complete merkbasis waarin strategie, identiteit en visuele stijl samenkomen tot een herkenbaar geheel.',
    deliverables: [
      { title: 'Merkstrategie', desc: 'Een duidelijke basis voor je positionering, doelgroep en merkverhaal.' },
      { title: 'Identiteit', desc: 'Logo, kleuren, typografie en visuele richting die je merk herkenbaar maken.' },
      { title: 'Designsysteem', desc: 'Een schaalbaar systeem met onderdelen en richtlijnen voor elk kanaal.' },
      { title: 'Uitrol', desc: 'Toepassing van je merkstijl op de belangrijkste touchpoints.' },
    ],
    audience:
      'Voor ondernemers en bedrijven die serieus willen bouwen aan een merk dat professioneel, herkenbaar en toekomstbestendig is. Ideaal bij een herpositionering, nieuwe fase of wanneer je huidige uitstraling niet meer past bij je ambities.',
    why: [
      { title: 'Een geheel', desc: 'Strategie, uitstraling en uitvoering sluiten op elkaar aan.' },
      { title: 'Strategisch fundament', desc: 'Elke keuze komt voort uit je positionering, doelgroep en groeirichting.' },
      { title: 'Klaar om door te groeien', desc: 'Je krijgt een merkbasis die je kunt gebruiken voor websites, content, campagnes en verdere uitbreiding.' },
    ],
    approachTitle: 'Van strategie naar een merk dat klopt.',
    approach: [
      { title: 'Strategie', desc: 'We bepalen je positionering, doelgroep en merkverhaal.' },
      { title: 'Identiteit', desc: 'We ontwikkelen de visuele richting van je merk.' },
      { title: 'Systeem', desc: 'We bouwen een herkenbaar designsysteem met duidelijke richtlijnen.' },
      { title: 'Uitrol', desc: 'We passen je merk toe op de belangrijkste kanalen en middelen.' },
    ],
    case: {
      name: 'Kessler & Co',
      sector: 'Zakelijke dienstverlening',
      summary:
        'Een zakelijk dienstverlener waarvan de uitstraling niet meer paste bij de kwaliteit van het werk.',
      outcome:
        'We herpositioneerden het merk en ontwikkelden een compleet identiteitssysteem dat zorgt voor meer vertrouwen, consistentie en professionele herkenbaarheid.',
    },
    faq: [
      { q: 'Hoe lang duurt een compleet traject?', a: 'Dat hangt af van de scope. Meestal duurt een compleet brandingtraject enkele weken tot enkele maanden.' },
      { q: 'Kunnen we gefaseerd starten?', a: 'Ja. We kunnen starten met strategie en identiteit, en daarna uitbreiden naar website, content of andere toepassingen.' },
    ],
    ctaTitle: 'Klaar voor een merk dat klopt?',
    ctaText:
      'Vertel ons waar je nu staat. Wij helpen je met een complete merkbasis die vertrouwen wekt, herkenbaar is en klaarstaat voor de volgende stap.',
  }),

  /* ───────────────────────── Web Development ───────────────────────── */
  S('web-development', 'Websites', {
    tagline:
      'Een website die niet alleen mooi oogt, maar duidelijk uitlegt wat je doet, vertrouwen wekt en bezoekers omzet in aanvragen.',
    whatTitle: 'Websites die converteren.',
    story: [
      'Je website is vaak het eerste moment waarop iemand beslist of jouw bedrijf professioneel en betrouwbaar voelt. Daarom bouwen wij geen losse pagina\'s, maar een digitale basis die past bij je aanbod, doelgroep en doelen. We zorgen voor een website die snel, duidelijk en professioneel is ingericht. Van structuur en design tot techniek en vindbaarheid: alles werkt samen om bezoekers richting actie te bewegen.',
    ],
    actionTitle: 'Zo ziet een website die werkt eruit.',
    actionText:
      'Een professionele website die overzicht geeft, vertrouwen opbouwt en bezoekers helpt de juiste stap te zetten.',
    deliverables: [
      { title: 'Maatwerk ontwerp', desc: 'Een uniek ontwerp dat past bij je merk, doelgroep en gewenste uitstraling.' },
      { title: 'Responsive build', desc: 'Een website die goed werkt op mobiel, tablet en desktop.' },
      { title: 'CMS', desc: 'Een eenvoudig systeem waarmee je zelf teksten en afbeeldingen kunt aanpassen.' },
      { title: 'SEO-basis', desc: 'Een technische basis die helpt om beter gevonden te worden in Google.' },
    ],
    audience:
      'Voor ondernemers en merken die hun website serieus nemen als commerciele basis. Ideaal als je huidige website verouderd is, niet genoeg vertrouwen wekt of te weinig aanvragen oplevert.',
    why: [
      { title: 'Gebouwd op resultaat', desc: 'We ontwerpen niet alleen mooi, maar denken na over vertrouwen, structuur en conversie.' },
      { title: 'Conversiegericht', desc: 'Elke pagina heeft een doel: informeren, overtuigen en bezoekers richting actie sturen.' },
      { title: 'Zelf te beheren', desc: 'Je krijgt een website die professioneel staat en praktisch te gebruiken blijft.' },
    ],
    approachTitle: 'Van idee naar website die werkt.',
    approach: [
      { title: 'Kennismaken', desc: 'We begrijpen je bedrijf, doelgroep en doelen.' },
      { title: 'Ontwerp', desc: 'We maken een duidelijke structuur en visuele richting.' },
      { title: 'Bouwen', desc: 'We bouwen een snelle, professionele en gebruiksvriendelijke website.' },
      { title: 'Live', desc: 'We zetten alles live en zorgen dat je website klaar is om resultaat te leveren.' },
    ],
    case: {
      name: 'Atelier Mauve',
      sector: 'Interieurontwerp',
      summary:
        'Een interieurstudio met prachtig werk, maar een website die onvoldoende vertrouwen en overzicht gaf. We bouwden een rustige, professionele website met een heldere structuur en duidelijke presentatie van het aanbod.',
      outcome:
        'Een website die sterker aanvoelt, beter aansluit bij de kwaliteit van het merk en bezoekers makkelijker richting aanvraag brengt.',
    },
    faq: [
      { q: 'Kan ik de site zelf aanpassen?', a: 'Ja. We bouwen met een gebruiksvriendelijk CMS, zodat je zelf teksten en afbeeldingen kunt aanpassen.' },
      { q: 'Verzorgen jullie ook hosting?', a: 'Ja. We kunnen hosting en onderhoud verzorgen, zodat je website veilig, snel en up-to-date blijft.' },
    ],
    ctaTitle: 'Klaar voor een website die aanvragen oplevert?',
    ctaText:
      'Vertel ons waar je nu staat. Wij helpen je met een website die professioneel oogt, vertrouwen wekt en gericht is op resultaat.',
    ctaButton: 'Start jouw webtraject',
  }),
  S('web-development', 'Webshops', {
    tagline:
      'Een webshop die niet alleen mooi oogt, maar vertrouwen wekt, overzicht creeert en bezoekers soepel laat bestellen.',
    whatTitle: 'Webshops die verkopen.',
    story: [
      'Een webshop is meer dan een online winkel. Het is een verkoopomgeving die duidelijk moet zijn, professioneel moet aanvoelen en klanten zonder twijfel naar aankoop moet begeleiden. Wij bouwen webshops die passen bij je merk, producten en groeiplannen. Van structuur en design tot checkout, betaalmethodes en productpagina\'s: alles wordt ingericht om vertrouwen te wekken en verkoop makkelijker te maken.',
    ],
    actionTitle: 'Zo ziet een webshop die werkt eruit.',
    actionText:
      'Een webshop die overzicht geeft, vertrouwen opbouwt en klanten soepel door het aankoopproces begeleidt.',
    deliverables: [
      { title: 'Shop-inrichting', desc: 'Een complete webshopstructuur ingericht voor jouw producten en categorieen.' },
      { title: "Productpagina's", desc: "Duidelijke productpagina's die jouw aanbod professioneel presenteren." },
      { title: 'Checkout', desc: 'Een soepel aankoopproces dat klanten helpt sneller af te rekenen.' },
      { title: 'Betaalmethodes', desc: 'Betalingsopties die passen bij jouw klant en verkoopproces.' },
    ],
    audience:
      'Voor merken en ondernemers die online willen verkopen en hun webshop serieus willen laten bijdragen aan omzet. Ideaal als je huidige shop traag, rommelig of beperkt is.',
    why: [
      { title: 'Gebouwd op verkoop', desc: 'We richten je webshop in met focus op vertrouwen, overzicht en conversie.' },
      { title: 'Klaar om te beheren', desc: 'Je krijgt een webshop die praktisch werkt en eenvoudig aan te passen is.' },
      { title: 'Meegroeibaar', desc: 'Je webshop wordt gebouwd met ruimte voor nieuwe producten, acties en uitbreiding.' },
    ],
    approachTitle: 'Van product naar verkoopomgeving.',
    approach: [
      { title: 'Kennismaken', desc: 'We begrijpen je producten, doelgroep en verkoopdoelen.' },
      { title: 'Inrichten', desc: 'We bepalen de structuur, categorieen en klantreis.' },
      { title: 'Koppelen', desc: 'We zetten producten, betalingen en belangrijke koppelingen goed klaar.' },
      { title: 'Live', desc: 'We testen alles en zetten je webshop klaar voor verkoop.' },
    ],
    case: {
      name: 'Forma Goods',
      sector: 'Design accessoires',
      summary:
        'Een merk met sterke producten, maar een webshop die te weinig overzicht en vertrouwen gaf. We bouwden een duidelijke shopstructuur met heldere productpagina\'s en een soepeler bestelproces.',
      outcome:
        'Een webshop die professioneler aanvoelt en klanten makkelijker van interesse naar aankoop begeleidt.',
    },
    faq: [
      { q: 'Shopify of WooCommerce?', a: 'Dat hangt af van je producten, wensen en toekomstplannen. We adviseren wat het beste past bij jouw situatie.' },
      { q: 'Kunnen jullie ook bestaande shops verbeteren?', a: 'Ja. We kunnen een bestaande webshop optimaliseren of volledig opnieuw inrichten.' },
    ],
    ctaTitle: 'Klaar voor een webshop die verkoopt?',
    ctaText:
      'Vertel ons waar je nu staat. Wij helpen je met een webshop die vertrouwen wekt, overzicht biedt en gericht is op verkoop.',
    ctaButton: 'Start jouw webshoptraject',
  }),
  S('web-development', 'Applicaties', {
    tagline:
      'Webapplicaties en portals die processen eenvoudiger maken, tijd besparen en je bedrijf schaalbaar laten werken.',
    whatTitle: 'Applicaties die processen versnellen.',
    story: [
      'Soms groeit je bedrijf sneller dan je systemen. Je werkt met losse spreadsheets, handmatige stappen of tools die niet goed op elkaar aansluiten. Wij bouwen webapplicaties, portals en dashboards die jouw processen slimmer maken. Van klantportalen en interne systemen tot planningen, formulieren en koppelingen: alles wordt gebouwd rondom hoe jouw bedrijf echt werkt.',
    ],
    actionTitle: 'Zo ziet een slimme applicatie eruit.',
    actionText:
      'Een digitale oplossing die overzicht geeft, handwerk vermindert en processen makkelijker maakt.',
    deliverables: [
      { title: 'UX', desc: 'Een duidelijke structuur die logisch werkt voor jouw gebruikers.' },
      { title: 'Frontend', desc: 'Een moderne interface die professioneel oogt en prettig werkt.' },
      { title: 'Backend', desc: 'Een stabiele technische basis achter je applicatie.' },
      { title: 'Integraties', desc: "Koppelingen met systemen zoals CRM, formulieren, agenda's of andere tools." },
    ],
    audience:
      'Voor bedrijven die een proces willen digitaliseren of een tool nodig hebben die niet standaard bestaat. Ideaal als je nu vastloopt in losse spreadsheets, handwerk of onduidelijke workflows.',
    why: [
      { title: 'Procesgericht', desc: 'We bouwen rondom je werkwijze, niet rondom losse functies.' },
      { title: 'Stabiel en veilig', desc: 'Je applicatie wordt gebouwd met oog voor betrouwbaarheid en gebruiksgemak.' },
      { title: 'Klaar om uit te breiden', desc: 'We zorgen dat je applicatie kan meegroeien met je bedrijf.' },
    ],
    approachTitle: 'Van proces naar slimme oplossing.',
    approach: [
      { title: 'Kennismaken', desc: 'We begrijpen je proces, knelpunten en doelen.' },
      { title: 'Ontwerpen', desc: 'We maken een duidelijke structuur en gebruikersflow.' },
      { title: 'Bouwen', desc: 'We ontwikkelen de applicatie en testen de belangrijkste functies.' },
      { title: 'Doorontwikkelen', desc: 'We verbeteren en breiden uit wanneer je bedrijf verder groeit.' },
    ],
    case: {
      name: 'Logiflow',
      sector: 'Logistiek',
      summary:
        'Een logistiek bedrijf dat planning en orders beheerde via losse spreadsheets. We bouwden een overzichtelijk portaal waarin planning, orders en statusupdates op een plek samenkomen.',
      outcome:
        'Minder handwerk, meer overzicht en een proces dat makkelijker schaalbaar is.',
    },
    faq: [
      { q: 'Kunnen jullie koppelen met bestaande systemen?', a: "Ja. We kunnen koppelingen maken met bijvoorbeeld CRM-systemen, formulieren, agenda's of andere tools." },
      { q: 'Verzorgen jullie ook onderhoud?', a: 'Ja. We kunnen onderhoud en doorontwikkeling verzorgen zodat de applicatie veilig en up-to-date blijft.' },
    ],
    ctaTitle: 'Klaar voor een applicatie die tijd bespaart?',
    ctaText:
      'Vertel ons welk proces slimmer kan. Wij helpen je met een applicatie die overzicht geeft, handwerk vermindert en meegroeit met je bedrijf.',
    ctaButton: 'Start jouw applicatietraject',
  }),
  S('web-development', 'Software', {
    tagline:
      'Maatwerk software die jouw proces slimmer maakt, losse systemen koppelt en meegroeit met je bedrijf.',
    whatTitle: 'Software die processen versterkt.',
    story: [
      'Standaardtools passen niet altijd bij hoe je bedrijf echt werkt. Soms heb je software nodig die aansluit op jouw proces, jouw team en jouw manier van werken. Wij bouwen maatwerk software die handwerk vermindert, systemen koppelt en je bedrijf overzichtelijker laat draaien.',
    ],
    actionTitle: 'Zo ziet slimme software eruit.',
    actionText:
      'Software die processen verbindt, werk versnelt en klaar is om mee te groeien.',
    deliverables: [
      { title: 'Technische structuur', desc: 'Een duidelijke basis waarop je software stabiel gebouwd wordt.' },
      { title: 'Ontwikkeling', desc: 'Maatwerk functies die aansluiten op jouw proces.' },
      { title: 'Koppelingen', desc: 'Integraties met systemen, tools of databronnen.' },
      { title: 'Onderhoud', desc: 'Doorontwikkeling en support zodat je software blijft werken.' },
    ],
    audience:
      'Voor bedrijven met een specifiek proces dat niet goed wordt ondersteund door standaardsoftware. Ideaal als je huidige systeem te veel handwerk vraagt, beperkt meegroeit of niet aansluit op je workflow.',
    why: [
      { title: 'Procesgericht gebouwd', desc: 'We bouwen rondom hoe je bedrijf werkt, niet rondom losse functies.' },
      { title: 'Schaalbaar opgezet', desc: 'Je software kan meegroeien met nieuwe wensen, gebruikers en processen.' },
      { title: 'Voor de lange termijn', desc: 'We denken mee over stabiliteit, onderhoud en doorontwikkeling.' },
    ],
    approachTitle: 'Van proces naar maatwerk software.',
    approach: [
      { title: 'Kennismaken', desc: 'We begrijpen je proces, knelpunten en doelen.' },
      { title: 'Ontwerp', desc: 'We bepalen de structuur, functies en technische richting.' },
      { title: 'Bouwen', desc: 'We ontwikkelen de software en testen de belangrijkste onderdelen.' },
      { title: 'Onderhouden', desc: 'We blijven verbeteren, uitbreiden en optimaliseren waar nodig.' },
    ],
    case: {
      name: 'Verdi Systems',
      sector: 'Productie',
      summary:
        'Een productiebedrijf werkte met losse tools en veel handmatige stappen. We bouwden maatwerk software die planning, data en processen beter met elkaar verbindt.',
      outcome:
        'Meer overzicht, minder handwerk en een systeem dat beter aansluit op de dagelijkse operatie.',
    },
    faq: [
      { q: 'Wat is maatwerk software?', a: 'Software die speciaal wordt gebouwd voor jouw proces, in plaats van een standaardtool die je moet aanpassen aan je werkwijze.' },
      { q: 'Van wie is de software?', a: 'Dat spreken we vooraf duidelijk af. Je weet altijd wat van jou is en hoe het beheer geregeld wordt.' },
    ],
    ctaTitle: 'Klaar voor software die je proces versterkt?',
    ctaText:
      'Vertel ons waar je nu tegenaan loopt. Wij helpen je met software die overzicht geeft, werk versnelt en meegroeit met je bedrijf.',
    ctaButton: 'Start jouw softwaretraject',
  }),

  /* ───────────────────────── Video & Fotografie ───────────────────────── */
  S('video-fotografie', 'Short video content', {
    tagline:
      "Korte video's die aandacht pakken, je boodschap snel overbrengen en jouw merk zichtbaar maken op social media.",
    whatTitle: "Short video's die blijven hangen.",
    story: [
      "Korte video's zijn vaak het eerste contactmoment met je doelgroep. Daarom maken wij geen losse clips zonder richting, maar content die past bij je merk, platform en doel. Van concept en script tot opname en montage: alles wordt gemaakt om snel aandacht te trekken en je merk professioneel neer te zetten.",
    ],
    actionTitle: 'Zo ziet short video content eruit.',
    actionText:
      "Korte video's die kijkers vasthouden, je boodschap duidelijk maken en geschikt zijn voor social media.",
    deliverables: [
      { title: 'Concept', desc: 'Een duidelijke invalshoek die past bij je merk en doelgroep.' },
      { title: 'Scenario', desc: 'Een korte structuur voor de video, zodat de boodschap helder overkomt.' },
      { title: 'Opname', desc: 'Professionele opname van de beelden die nodig zijn.' },
      { title: 'Montage', desc: 'Een strakke edit met ondertiteling, muziek en platformgerichte afwerking.' },
    ],
    audience:
      "Voor merken die zichtbaar willen zijn op social media en content nodig hebben die snel aandacht trekt. Ideaal als je consistent wilt posten, maar geen losse video's zonder strategie wilt maken.",
    why: [
      { title: 'Hook-gedreven', desc: 'We denken eerst na over hoe je de aandacht van je doelgroep pakt.' },
      { title: 'Platform-klaar', desc: "Video's worden afgestemd op TikTok, Instagram Reels, YouTube Shorts of advertenties." },
      { title: 'Gericht op resultaat', desc: 'We maken content die niet alleen mooi is, maar ook duidelijk communiceert.' },
    ],
    approachTitle: 'Van idee naar video die werkt.',
    approach: [
      { title: 'Concept', desc: 'We bepalen de invalshoek en boodschap.' },
      { title: 'Voorbereiden', desc: 'We werken het script, shotlist en format uit.' },
      { title: 'Opnemen', desc: 'We filmen de beelden die nodig zijn.' },
      { title: 'Monteren', desc: 'We leveren een strakke video op die klaar is om te plaatsen.' },
    ],
    case: {
      name: 'Pulse Athletics',
      sector: 'Sport en lifestyle',
      summary:
        "Een sportmerk dat meer zichtbaarheid wilde op social media. We ontwikkelden korte video's met sterke hooks, snelle montage en een duidelijke merkuitstraling.",
      outcome:
        'Content die sneller aandacht trekt en het merk professioneler zichtbaar maakt.',
    },
    faq: [
      { q: 'Leveren jullie ook losse clips uit draaidagen?', a: "Ja, we kunnen uit een draaidag meerdere korte video's halen voor social media." },
      { q: 'Schrijven jullie ook de captions?', a: 'Ja, we kunnen ook captions, hooks en tekstvoorstellen meeleveren.' },
    ],
    ctaTitle: "Klaar voor short video's die aandacht pakken?",
    ctaText:
      "Vertel ons waar je nu staat. Wij helpen je met korte video's die jouw merk zichtbaar maken en geschikt zijn voor social media.",
  }),
  S('video-fotografie', 'AI Video content', {
    tagline:
      "AI-video's waarmee je sneller content maakt, varianten test en jouw merk professioneel zichtbaar houdt.",
    whatTitle: "AI-video's die content versnellen.",
    story: [
      'AI-video maakt het mogelijk om sneller visuele content te ontwikkelen zonder volledige productiedagen. Ideaal voor concepten, advertenties, varianten en social content. Wij combineren AI met strategie, merkgevoel en montage. Zo ontstaat content die niet alleen snel gemaakt is, maar ook past bij je uitstraling en doel.',
    ],
    actionTitle: 'Zo ziet AI-video content eruit.',
    actionText:
      'Schaalbare videocontent waarmee je snel ideeen, advertenties en varianten kunt testen.',
    deliverables: [
      { title: 'AI-concept', desc: 'Een creatief concept dat past bij je merk, doelgroep en campagne.' },
      { title: 'Generatie', desc: "AI-beelden of video's die worden gegenereerd op basis van duidelijke prompts." },
      { title: 'Montage', desc: 'Een strakke montage met geluid, tekst en ritme.' },
      { title: 'Varianten', desc: 'Meerdere versies om te testen voor social media of advertenties.' },
    ],
    audience:
      'Voor merken die veel content nodig hebben zonder telkens grote productiebudgetten. Ideaal voor advertenties, social media, productconcepten en campagnes waarbij snelheid en variatie belangrijk zijn.',
    why: [
      { title: 'Snel en schaalbaar', desc: 'We creeren sneller meerdere contentvarianten zonder zware draaidagen.' },
      { title: 'Test-gedreven', desc: 'Ideaal om hooks, beelden en invalshoeken te testen in campagnes.' },
      { title: 'Op merk', desc: 'AI-content wordt afgestemd op je uitstraling, boodschap en doelgroep.' },
    ],
    approachTitle: 'Van idee naar schaalbare content.',
    approach: [
      { title: 'Concept', desc: 'We bepalen het idee, de boodschap en de visuele richting.' },
      { title: 'Genereren', desc: "We maken AI-beelden of video's op basis van duidelijke prompts." },
      { title: 'Monteren', desc: 'We werken de content af met tekst, geluid en ritme.' },
      { title: 'Opschalen', desc: 'We maken varianten om te testen op social media of advertenties.' },
    ],
    case: {
      name: 'Nova Skincare',
      sector: 'Beauty',
      summary:
        'Een skincare-merk wilde snel meerdere advertentievarianten testen zonder telkens nieuwe shoots te plannen. We ontwikkelden AI-content waarmee verschillende hooks, beelden en invalshoeken getest konden worden.',
      outcome:
        'Sneller varianten testen, minder productiekosten en meer ruimte om campagnes door te ontwikkelen.',
    },
    faq: [
      { q: 'Ziet AI-video er niet goedkoop uit?', a: 'Niet als het goed wordt ingezet. Wij combineren AI met concept, merkgevoel en montage zodat het professioneel blijft.' },
      { q: 'Kunnen we AI-video echt toepassen in campagnes?', a: 'Ja. AI-video is vooral sterk voor advertenties, social content en het testen van verschillende invalshoeken.' },
    ],
    ctaTitle: 'Klaar voor AI-video content die sneller werkt?',
    ctaText:
      "Vertel ons wat je wilt testen of zichtbaar maken. Wij helpen je met AI-video's die snel, professioneel en schaalbaar inzetbaar zijn.",
  }),
  S('video-fotografie', 'Fotoshoots', {
    tagline:
      'Professionele fotografie die jouw merk betrouwbaar, herkenbaar en sterk zichtbaar maakt.',
    whatTitle: 'Fotografie die vertrouwen opbouwt.',
    story: [
      "Goede foto's bepalen in een paar seconden hoe professioneel je merk overkomt. Daarom maken wij geen losse beelden zonder richting, maar fotografie die past bij je merk, doelgroep en kanalen. Van websitebeelden en social content tot productfoto's en campagnebeelden: alles wordt gemaakt om je uitstraling te versterken en je merk consistenter zichtbaar te maken.",
    ],
    actionTitle: 'Zo ziet sterke fotografie eruit.',
    actionText:
      'Beeldmateriaal dat jouw merk professioneel neerzet en geschikt is voor website, social media en campagnes.',
    deliverables: [
      { title: 'Shoot', desc: 'Een professionele fotoshoot afgestemd op je merk, doel en gebruik.' },
      { title: 'Selectie', desc: 'Een sterke selectie beelden die passen bij je uitstraling.' },
      { title: 'Retouche', desc: 'Nabewerking voor een professionele en consistente look.' },
      { title: 'Levering', desc: 'Bestanden in de juiste formaten voor website, social media en campagnes.' },
    ],
    audience:
      'Voor merken en bedrijven die professioneel willen overkomen en sterke beelden nodig hebben voor hun website, social media, advertenties of campagnes. Ideaal als je huidige beelden verouderd zijn, niet consistent voelen of niet meer passen bij je merk.',
    why: [
      { title: 'Vooraf doordacht', desc: 'We bepalen eerst welke beelden je nodig hebt en waar ze gebruikt worden.' },
      { title: 'Consistente uitstraling', desc: 'Je beelden sluiten aan op je merk, website en contentstijl.' },
      { title: 'Klaar voor gebruik', desc: 'Je ontvangt beelden die direct inzetbaar zijn op de juiste kanalen.' },
    ],
    approachTitle: 'Van beeldidee naar professionele uitstraling.',
    approach: [
      { title: 'Kennismaken', desc: 'We begrijpen je merk, doelgroep en gewenste uitstraling.' },
      { title: 'Voorbereiden', desc: 'We bepalen shotlist, locaties, stijl en benodigde beelden.' },
      { title: 'Fotograferen', desc: 'We maken beelden die passen bij je merk en doel.' },
      { title: 'Opleveren', desc: 'Je ontvangt bewerkte beelden die klaar zijn voor gebruik.' },
    ],
    case: {
      name: 'Greenhouse Co',
      sector: 'Productmerk',
      summary:
        'Een bedrijf met sterke producten, maar verouderde beelden die niet meer pasten bij de kwaliteit van het merk. We ontwikkelden een nieuwe beeldstijl en maakten fotografie voor website, social media en campagnes.',
      outcome:
        'Een professionele beeldbank die direct inzetbaar is en zorgt voor een sterkere eerste indruk.',
    },
    faq: [
      { q: 'Komen jullie op locatie?', a: 'Ja, we kunnen op locatie fotograferen of meedenken over een geschikte setting.' },
      { q: "Hoeveel foto's krijg ik?", a: 'Dat hangt af van de shoot. Vooraf spreken we duidelijk af hoeveel beelden je ontvangt en waarvoor ze gebruikt worden.' },
    ],
    ctaTitle: 'Klaar voor fotografie die je merk versterkt?',
    ctaText:
      'Vertel ons waar je beelden voor nodig hebt. Wij helpen je met fotografie die professioneel oogt en direct inzetbaar is.',
  }),

  /* ───────────────────────── Social Media Beheer ───────────────────────── */
  S('social-media', 'Influencer Marketing', {
    tagline:
      'Samenwerkingen met de juiste creators om vertrouwen op te bouwen, bereik te vergroten en je merk geloofwaardig onder de aandacht te brengen.',
    whatTitle: 'Influencer marketing die vertrouwen opbouwt.',
    story: [
      'Mensen vertrouwen mensen. Daarom draait influencer marketing niet om zomaar bereik inkopen, maar om de juiste match tussen merk, creator en doelgroep. Wij helpen met creatorselectie, strategie, briefing en begeleiding, zodat samenwerkingen geloofwaardig voelen en bijdragen aan zichtbaarheid, vertrouwen en resultaat.',
    ],
    actionTitle: 'Zo ziet influencer marketing eruit.',
    actionText:
      'De juiste creators brengen je merk onder de aandacht bij een doelgroep die past bij jouw product of dienst.',
    deliverables: [
      { title: 'Creator-matching', desc: 'We zoeken creators die passen bij je merk, doelgroep en campagne.' },
      { title: 'Strategie', desc: 'We bepalen de juiste aanpak, boodschap en kanalen.' },
      { title: 'Content', desc: 'Creators maken content die natuurlijk voelt en aansluit bij je merk.' },
      { title: 'Rapportage', desc: 'Je krijgt inzicht in bereik, prestaties en resultaten.' },
    ],
    audience:
      'Voor merken die geloofwaardig bereik willen opbouwen bij een specifieke doelgroep. Ideaal als je product of dienst beter verkoopt wanneer mensen het via vertrouwen, ervaring of aanbeveling leren kennen.',
    why: [
      { title: 'Netwerk boven volgers', desc: 'We kijken niet alleen naar aantallen, maar naar doelgroep, vertrouwen en relevantie.' },
      { title: 'Volledig begeleid', desc: 'Van selectie en briefing tot afstemming, plaatsing en opvolging.' },
      { title: 'Meetbaar', desc: 'We maken resultaten inzichtelijk zodat je weet wat de samenwerking oplevert.' },
    ],
    approachTitle: 'Van match naar meetbaar resultaat.',
    approach: [
      { title: 'Kennismaken', desc: 'We begrijpen je merk, doelgroep en campagne.' },
      { title: 'Selecteren', desc: 'We zoeken creators die passen bij je merk en doel.' },
      { title: 'Uitvoeren', desc: 'We begeleiden briefing, content en samenwerking.' },
      { title: 'Meten', desc: 'We bekijken de resultaten en sturen bij waar nodig.' },
    ],
    case: {
      name: 'Wildroot',
      sector: 'Verzorging',
      summary:
        'Een verzorgingsmerk dat moeilijk doordrong tot een jongere doelgroep. We koppelden het merk aan creators met een betrokken publiek en geloofwaardige contentstijl.',
      outcome:
        'Meer zichtbaarheid bij de juiste doelgroep en content die betrouwbaarder voelde dan standaard advertenties.',
    },
    faq: [
      { q: 'Werken jullie met micro-influencers?', a: 'Ja. Vaak zijn micro-influencers juist sterk, omdat ze dichter bij hun doelgroep staan en geloofwaardig overkomen.' },
      { q: 'Regelen jullie de afspraken met creators?', a: 'Ja. We begeleiden selectie, briefing en afstemming, zodat de samenwerking professioneel verloopt.' },
    ],
    ctaTitle: 'Klaar voor influencer marketing die vertrouwen opbouwt?',
    ctaText:
      'Vertel ons wie je wilt bereiken. Wij helpen je met creators die passen bij je merk, doelgroep en doelen.',
  }),
  S('social-media', 'Meta Ads', {
    tagline:
      'Advertenties op Facebook en Instagram die de juiste mensen bereiken en gericht zijn op aanvragen, verkoop of groei.',
    whatTitle: 'Meta Ads die resultaat opleveren.',
    story: [
      'Meta Ads zijn krachtig wanneer strategie, targeting en creatie goed samenkomen. Daarom zetten wij geen losse advertenties live, maar bouwen we campagnes met een duidelijk doel. We richten campagnes in voor bereik, leads, aanvragen of verkoop. Van campagne-opzet en targeting tot creatives en optimalisatie: alles wordt ingericht om je budget slimmer te gebruiken.',
    ],
    actionTitle: 'Zo zien Meta Ads eruit.',
    actionText:
      'Advertenties op Facebook en Instagram die opvallen, vertrouwen wekken en gericht zijn op conversie.',
    deliverables: [
      { title: 'Campagne-opzet', desc: 'Een duidelijke campagnestructuur gericht op jouw doel.' },
      { title: 'Targeting', desc: 'Doelgroepen ingesteld op basis van locatie, interesse, gedrag of remarketing.' },
      { title: 'Creatives', desc: 'Advertentiebeelden en teksten die passen bij je merk en aanbod.' },
      { title: 'Optimalisatie', desc: 'We meten prestaties en sturen bij op resultaat.' },
    ],
    audience:
      'Voor merken en bedrijven die willen groeien met betaalde zichtbaarheid en hun advertentiebudget slimmer willen inzetten. Ideaal als je meer aanvragen, leads of verkopen wilt halen uit Facebook en Instagram.',
    why: [
      { title: 'Resultaatgericht', desc: 'We sturen niet alleen op bereik, maar op aanvragen, leads en verkoop.' },
      { title: 'Sterkere creatives', desc: 'Goede advertenties beginnen bij beelden en teksten die opvallen en vertrouwen wekken.' },
      { title: 'Continu optimaliseren', desc: 'We blijven testen, meten en verbeteren zodat campagnes beter presteren.' },
    ],
    approachTitle: 'Van campagne naar resultaat.',
    approach: [
      { title: 'Kennismaken', desc: 'We begrijpen je aanbod, doelgroep en doelen.' },
      { title: 'Opzetten', desc: 'We bouwen de campagnestructuur, targeting en creatives.' },
      { title: 'Lanceren', desc: 'We zetten de campagnes live en zorgen dat alles goed meetbaar is.' },
      { title: 'Optimaliseren', desc: 'We analyseren de resultaten en sturen bij waar nodig.' },
    ],
    case: {
      name: 'Lumen Home',
      sector: 'Woonaccessoires',
      summary:
        'Een webshop die meer grip wilde op het advertentierendement. We herstructureerden de campagnes en verbeterden de creatives, targeting en meetbaarheid.',
      outcome:
        'Een duidelijkere campagnestructuur en beter inzicht in welke advertenties aanvragen en verkoop opleveren.',
    },
    faq: [
      { q: 'Wat is een goed startbudget?', a: 'Dat hangt af van je doel, doelgroep en markt. We adviseren een budget dat past bij je fase en groeidoel.' },
      { q: 'Maken jullie ook de advertentiebeelden?', a: 'Ja. We kunnen visuals, teksten en varianten maken die passen bij je merk en campagne.' },
    ],
    ctaTitle: 'Klaar voor Meta Ads die resultaat opleveren?',
    ctaText:
      'Vertel ons wat je wilt bereiken. Wij helpen je met campagnes die gericht zijn op bereik, aanvragen en verkoop.',
  }),
  S('social-media', 'TikTok Ads', {
    tagline:
      'Advertenties die snel aandacht pakken, native aanvoelen en jouw merk zichtbaar maken bij de juiste doelgroep.',
    whatTitle: 'TikTok Ads die aandacht vasthouden.',
    story: [
      'Op TikTok win je niet met standaard advertenties. Je wint met content die direct opvalt, natuurlijk aanvoelt en past bij hoe mensen het platform gebruiken. Wij maken en beheren TikTok-campagnes met sterke hooks, passende creatives en duidelijke targeting. Zo wordt je advertentie geen storende onderbreking, maar content die mensen willen bekijken.',
    ],
    actionTitle: 'Zo zien TikTok Ads eruit.',
    actionText:
      'Advertenties die voelen als TikTok-content, snel aandacht pakken en geschikt zijn voor bereik, verkeer of conversie.',
    deliverables: [
      { title: 'Campagne-opzet', desc: 'Een duidelijke campagnestructuur gericht op jouw doel.' },
      { title: 'Creatives', desc: 'Advertenties die passen bij TikTok en je doelgroep.' },
      { title: 'Targeting', desc: 'Doelgroepen ingesteld op basis van interesse, gedrag en campagnefase.' },
      { title: 'Optimalisatie', desc: 'We testen, meten en verbeteren op basis van resultaat.' },
    ],
    audience:
      'Voor merken die een jongere of trendgevoelige doelgroep willen bereiken met content die beweegt. Ideaal als je product of dienst visueel sterk is en past bij korte, snelle advertentieformats.',
    why: [
      { title: 'Native content', desc: 'We maken advertenties die passen bij het platform, niet voelen als standaard reclame.' },
      { title: 'Hook-gedreven', desc: 'De eerste seconden zijn bepalend. Daarom starten we met sterke invalshoeken.' },
      { title: 'Doorlopend scherper', desc: 'We testen verschillende hooks, visuals en doelgroepen om campagnes te verbeteren.' },
    ],
    approachTitle: 'Van idee naar TikTok-campagne die werkt.',
    approach: [
      { title: 'Kennismaken', desc: 'We begrijpen je merk, doelgroep en aanbod.' },
      { title: 'Concept', desc: 'We bepalen hooks, formats en creatieve invalshoeken.' },
      { title: 'Lanceren', desc: 'We zetten de campagne live en zorgen dat alles goed staat.' },
      { title: 'Optimaliseren', desc: 'We analyseren prestaties en sturen bij waar nodig.' },
    ],
    case: {
      name: 'Drift Apparel',
      sector: 'Streetwear',
      summary:
        'Een streetwear-merk dat op TikTok wilde groeien met content die niet voelde als standaard reclame. We ontwikkelden TikTok-creatives met snelle hooks, native formats en duidelijke productfocus.',
      outcome:
        'Advertenties die natuurlijker aanvoelen op het platform en zorgen voor meer zichtbaarheid bij de juiste doelgroep.',
    },
    faq: [
      { q: 'Hebben we al een TikTok-account nodig?', a: 'Niet per se. We kunnen adviseren wat nodig is en helpen met de juiste opzet.' },
      { q: 'Werkt TikTok voor mijn doelgroep?', a: 'Dat hangt af van je aanbod en doelgroep. We kijken eerst of TikTok past bij je merk, product en groeidoel.' },
    ],
    ctaTitle: 'Klaar voor TikTok Ads die aandacht pakken?',
    ctaText:
      'Vertel ons wie je wilt bereiken. Wij helpen je met TikTok-campagnes die opvallen, natuurlijk aanvoelen en gericht zijn op resultaat.',
  }),

  /* ───────────────────────── SEO & SEA ───────────────────────── */
  S('seo-sea', 'SEO', {
    tagline:
      'Duurzaam beter gevonden worden door mensen die actief zoeken naar jouw product, dienst of oplossing.',
    whatTitle: 'SEO die vindbaarheid opbouwt.',
    story: [
      'SEO is geen snelle truc, maar een duurzame manier om zichtbaar te worden in Google. Wij verbeteren je website technisch, inhoudelijk en strategisch, zodat zoekmachines en bezoekers beter begrijpen wat je aanbiedt. Zo bouw je aan meer relevant verkeer, vertrouwen en aanvragen op de lange termijn.',
    ],
    actionTitle: 'Zo ziet SEO eruit.',
    actionText:
      'Structureel beter zichtbaar worden in Google met techniek, content en optimalisatie die samenwerken.',
    deliverables: [
      { title: 'Techniek', desc: 'We verbeteren de technische basis van je website.' },
      { title: 'Content', desc: "We optimaliseren pagina's en teksten voor relevante zoekwoorden." },
      { title: 'Linkbuilding', desc: 'We versterken je autoriteit met relevante verwijzingen.' },
      { title: 'Lokale vindbaarheid', desc: 'We helpen je beter zichtbaar worden in je regio.' },
    ],
    audience:
      'Voor bedrijven die op de lange termijn beter gevonden willen worden zonder volledig afhankelijk te zijn van advertenties. Ideaal als je klanten actief zoeken naar jouw dienst, product of expertise.',
    why: [
      { title: 'Altijd passend', desc: 'We richten SEO in op jouw markt, doelgroep en aanbod.' },
      { title: 'Blijvend resultaat', desc: 'We bouwen aan vindbaarheid die op lange termijn waarde blijft leveren.' },
      { title: 'Transparant', desc: 'Je krijgt inzicht in wat we doen en waar de kansen liggen.' },
    ],
    approachTitle: 'Van zoekvraag naar zichtbaarheid.',
    approach: [
      { title: 'Analyse', desc: 'We bekijken je website, zoekmarkt en kansen.' },
      { title: 'Techniek', desc: 'We verbeteren de technische basis van je website.' },
      { title: 'Content', desc: 'We optimaliseren bestaande pagina\'s en creeren waar nodig nieuwe content.' },
      { title: 'Groeien', desc: 'We meten, verbeteren en bouwen verder aan je online vindbaarheid.' },
    ],
    case: {
      name: 'Brightwork',
      sector: 'Zakelijke dienstverlening',
      summary:
        'Een dienstverlener die online nauwelijks zichtbaar was voor relevante zoekopdrachten. We verbeterden de website, structuur en content zodat Google en bezoekers beter begrepen wat het bedrijf aanbiedt.',
      outcome:
        'Een sterkere online basis en betere vindbaarheid op zoektermen die aansluiten bij hun aanbod.',
    },
    faq: [
      { q: 'Hoe snel zie ik resultaat met SEO?', a: 'SEO kost tijd. Vaak zie je de eerste verbeteringen na enkele maanden, afhankelijk van je markt en concurrentie.' },
      { q: 'Schrijven jullie ook de content?', a: 'Ja. We kunnen bestaande teksten optimaliseren of nieuwe SEO-content schrijven voor je website.' },
    ],
    ctaTitle: 'Klaar voor SEO die blijft werken?',
    ctaText:
      'Vertel ons waar je nu staat. Wij helpen je met duurzame vindbaarheid die zorgt voor meer relevant verkeer en aanvragen.',
  }),
  S('seo-sea', 'Google Ads', {
    tagline:
      'Direct zichtbaar worden bij mensen die zoeken naar jouw product, dienst of oplossing.',
    whatTitle: 'Google Ads die aanvragen opleveren.',
    story: [
      'Met Google Ads sta je direct bovenaan op zoekmomenten die ertoe doen. Ideaal wanneer je snel zichtbaar wilt worden en gericht aanvragen, leads of verkopen wilt binnenhalen. Wij richten campagnes in rondom je aanbod, doelgroep en zoekwoorden. Zo wordt je advertentiebudget ingezet op mensen die actief zoeken naar wat jij biedt.',
    ],
    actionTitle: 'Zo ziet Google Ads eruit.',
    actionText:
      'Gerichte advertenties in Google die zichtbaar zijn op het moment dat klanten zoeken.',
    deliverables: [
      { title: 'Campagne-opzet', desc: 'Een duidelijke campagnestructuur rondom je doelen en aanbod.' },
      { title: 'Zoekwoorden', desc: 'Zoekwoorden gekozen op basis van relevantie en koopintentie.' },
      { title: 'Advertenties', desc: 'Sterke advertentieteksten die aansluiten op je doelgroep.' },
      { title: 'Optimalisatie', desc: 'We meten, verbeteren en sturen bij op resultaat.' },
    ],
    audience:
      'Voor bedrijven die snel zichtbaar willen zijn bij zoekende klanten. Ideaal als je direct aanvragen of verkopen wilt binnenhalen en gericht wilt sturen op rendement.',
    why: [
      { title: 'Direct zichtbaar', desc: 'Je advertenties verschijnen op het moment dat klanten actief zoeken.' },
      { title: 'Geen budgetlek', desc: 'We richten campagnes slim in, zodat je budget niet verdwijnt aan irrelevante klikken.' },
      { title: 'Gestuurd op aanvragen', desc: 'We sturen niet alleen op klikken, maar op aanvragen, leads of verkoop.' },
    ],
    approachTitle: 'Van zoekwoord naar aanvraag.',
    approach: [
      { title: 'Kennismaken', desc: 'We begrijpen je aanbod, doelgroep en doelen.' },
      { title: 'Opzetten', desc: 'We bouwen campagnes, zoekwoorden en advertenties.' },
      { title: 'Lanceren', desc: 'We zetten alles live en zorgen dat de metingen goed staan.' },
      { title: 'Optimaliseren', desc: 'We verbeteren campagnes op basis van prestaties.' },
    ],
    case: {
      name: 'Vesta Klimaat',
      sector: 'Installatietechniek',
      summary:
        'Een installatiebedrijf wilde meer aanvragen uit Google halen zonder budget te verspillen. We herstructureerden de campagnes en richtten advertenties scherper in op relevante zoekopdrachten.',
      outcome:
        'Een duidelijkere campagnestructuur en beter inzicht in welke zoekwoorden aanvragen opleveren.',
    },
    faq: [
      { q: 'Werkt Google Ads naast SEO?', a: 'Ja. SEO bouwt aan duurzame vindbaarheid, terwijl Google Ads zorgt voor directe zichtbaarheid.' },
      { q: 'Kan ik klein starten met budget?', a: 'Ja. We adviseren een passend startbudget en sturen bij op basis van prestaties.' },
    ],
    ctaTitle: 'Klaar voor Google Ads die aanvragen opleveren?',
    ctaText:
      'Vertel ons waar je nu staat. Wij helpen je met campagnes die gericht zijn op zichtbaarheid, relevante klikken en resultaat.',
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
