import { Reveal } from '@/components/Reveal'
import { PageHero } from '@/components/PageHero'
import { Footer } from '@/sections/Footer'
import { SiteContentProvider, useContent } from '@/content/SiteContent'

/**
 * Algemene Voorwaarden — a clean, readable legal page. The content lives in the
 * ARTICLES data below; the renderer handles plain numbered lists, definition
 * lists and lettered sub-lists. Linked from the footer ("Voorwaarden").
 */

type ListItem = string | { text: string; sub: string[] }
type Block =
  | { kind: 'list'; items: ListItem[] }
  | { kind: 'defs'; lead: string; defs: { term: string; text: string }[] }

type Article = { title: string; blocks: Block[] }

const ARTICLES: Article[] = [
  {
    title: 'Artikel 1 - Definities',
    blocks: [
      {
        kind: 'defs',
        lead: 'In deze algemene voorwaarden wordt verstaan onder:',
        defs: [
          { term: 'Minterest:', text: 'de onderneming Minterest, gevestigd te [plaats], ingeschreven bij de Kamer van Koophandel onder nummer [KvK-nummer], handelend onder de naam Minterest.' },
          { term: 'Opdrachtgever:', text: 'iedere natuurlijke persoon of rechtspersoon die met Minterest een overeenkomst sluit of aan wie Minterest een offerte uitbrengt.' },
          { term: 'Overeenkomst:', text: 'iedere afspraak tussen Minterest en Opdrachtgever over het leveren van diensten, producten, abonnementen, advies, marketing, branding, websites, content, automatisering of andere werkzaamheden.' },
          { term: 'Diensten:', text: 'alle werkzaamheden die Minterest uitvoert, waaronder maar niet beperkt tot branding, strategie, websites, webshops, webapplicaties, social media, content, marketing, advertenties, SEO, automatisering, AI-oplossingen, onderhoud, hostingbegeleiding, consultancy en groeiondersteuning.' },
          { term: 'Materialen:', text: 'alle door Minterest of Opdrachtgever aangeleverde of ontwikkelde teksten, beelden, video’s, logo’s, huisstijlen, designs, websites, campagnes, strategieën, data, documenten, software, accounts en overige content.' },
          { term: 'Meerwerk:', text: 'alle werkzaamheden die buiten de schriftelijk overeengekomen scope vallen.' },
        ],
      },
    ],
  },
  {
    title: 'Artikel 2 - Toepasselijkheid',
    blocks: [
      {
        kind: 'list',
        items: [
          'Deze algemene voorwaarden zijn van toepassing op alle offertes, overeenkomsten, werkzaamheden, leveringen, abonnementen en aanvullende diensten van Minterest.',
          'Afwijkingen van deze algemene voorwaarden zijn alleen geldig als deze schriftelijk door Minterest zijn bevestigd.',
          'De algemene voorwaarden van Opdrachtgever zijn niet van toepassing, tenzij Minterest deze uitdrukkelijk en schriftelijk heeft aanvaard.',
          'Als één of meerdere bepalingen in deze algemene voorwaarden ongeldig of vernietigbaar blijken te zijn, blijven de overige bepalingen volledig van kracht. Partijen zullen dan een vervangende bepaling afspreken die zoveel mogelijk aansluit bij het doel van de oorspronkelijke bepaling.',
          'Indien Opdrachtgever een consument is, gelden deze voorwaarden slechts voor zover zij niet in strijd zijn met dwingend consumentenrecht.',
        ],
      },
    ],
  },
  {
    title: 'Artikel 3 - Offertes en totstandkoming van de overeenkomst',
    blocks: [
      {
        kind: 'list',
        items: [
          'Alle offertes van Minterest zijn vrijblijvend, tenzij schriftelijk anders is aangegeven.',
          'Een offerte is geldig gedurende 14 dagen na offertedatum, tenzij in de offerte een andere termijn is genoemd.',
          'Een overeenkomst komt tot stand zodra Opdrachtgever de offerte schriftelijk, mondeling, digitaal of per e-mail accepteert, of zodra Minterest op verzoek van Opdrachtgever met de werkzaamheden begint.',
          'Mondelinge afspraken zijn pas bindend nadat deze schriftelijk of per e-mail door Minterest zijn bevestigd.',
          'Minterest mag een opdracht weigeren als de opdracht niet past bij de werkwijze, capaciteit, waarden, planning of commerciële belangen van Minterest.',
        ],
      },
    ],
  },
  {
    title: 'Artikel 4 - Uitvoering van de opdracht',
    blocks: [
      {
        kind: 'list',
        items: [
          'Minterest voert de opdracht naar beste inzicht, kennis en vermogen uit.',
          'Minterest heeft bij alle diensten een inspanningsverplichting en geen resultaatsverplichting, tenzij schriftelijk uitdrukkelijk anders is overeengekomen.',
          'Minterest bepaalt de wijze waarop de opdracht wordt uitgevoerd, tenzij partijen schriftelijk specifieke afspraken hebben gemaakt.',
          'Opgegeven termijnen zijn indicatief en gelden niet als fatale termijnen, tenzij schriftelijk uitdrukkelijk anders is overeengekomen.',
          'Vertraging door te late aanlevering, gebrekkige feedback, ontbrekende toegang, late goedkeuring of wijzigingen vanuit Opdrachtgever komt voor rekening en risico van Opdrachtgever.',
          'Minterest mag derden inschakelen voor de uitvoering van de opdracht, zoals designers, developers, fotografen, videografen, marketeers, tekstschrijvers, hostingpartijen, softwareleveranciers of andere specialisten.',
        ],
      },
    ],
  },
  {
    title: 'Artikel 5 - Verplichtingen van Opdrachtgever',
    blocks: [
      {
        kind: 'list',
        items: [
          'Opdrachtgever zorgt ervoor dat alle informatie, materialen, teksten, afbeeldingen, logo’s, huisstijlen, inloggegevens, feedback en goedkeuringen tijdig en volledig worden aangeleverd.',
          'Opdrachtgever staat ervoor in dat alle aangeleverde materialen juist, volledig, rechtmatig en vrij van rechten van derden zijn.',
          'Opdrachtgever is verantwoordelijk voor de inhoudelijke juistheid van claims, aanbiedingen, prijzen, acties, productinformatie, bedrijfsinformatie, certificeringen, keurmerken, juridische teksten, privacyteksten en overige informatie die namens Opdrachtgever wordt gepubliceerd.',
          'Opdrachtgever is verantwoordelijk voor het tijdig controleren en goedkeuren van ontwerpen, teksten, websites, campagnes, advertenties, content en andere materialen vóór publicatie of oplevering.',
          'Als Opdrachtgever goedkeuring geeft, mag Minterest ervan uitgaan dat de materialen inhoudelijk juist, volledig en akkoord zijn.',
          'Schade, vertraging of extra kosten door onjuiste, onvolledige of te late informatie van Opdrachtgever komen voor rekening van Opdrachtgever.',
        ],
      },
    ],
  },
  {
    title: 'Artikel 6 - Scope, revisies en meerwerk',
    blocks: [
      {
        kind: 'list',
        items: [
          'De inhoud en omvang van de opdracht worden bepaald door de offerte, overeenkomst of schriftelijke opdrachtbevestiging.',
          'Werkzaamheden die niet expliciet in de offerte of overeenkomst zijn opgenomen, vallen buiten de scope.',
          'Revisies zijn alleen inbegrepen voor zover dit schriftelijk is afgesproken.',
          'Extra revisies, nieuwe wensen, functiewijzigingen, extra pagina’s, extra content, spoedwerk, strategiewijzigingen, nieuwe campagnes, extra meetings of aanvullende werkzaamheden worden beschouwd als meerwerk.',
          'Meerwerk wordt gefactureerd tegen het overeengekomen uurtarief of, als geen tarief is afgesproken, tegen het standaardtarief van Minterest.',
          'Minterest is niet verplicht meerwerk uit te voeren voordat prijs, planning en scope zijn bevestigd.',
        ],
      },
    ],
  },
  {
    title: 'Artikel 7 - Prijzen en betaling',
    blocks: [
      {
        kind: 'list',
        items: [
          'Alle prijzen zijn exclusief btw, tenzij uitdrukkelijk anders vermeld.',
          'Minterest mag vooruitbetaling, aanbetaling of betaling in termijnen verlangen.',
          'Facturen dienen binnen 14 dagen na factuurdatum te worden betaald, tenzij schriftelijk anders is overeengekomen.',
          'Bij niet-tijdige betaling is Opdrachtgever van rechtswege in verzuim, zonder dat een nadere ingebrekestelling nodig is.',
          'Bij te late betaling mag Minterest de werkzaamheden opschorten totdat volledige betaling is ontvangen.',
          'Alle redelijke buitengerechtelijke incassokosten, wettelijke rente en eventuele proceskosten komen voor rekening van Opdrachtgever.',
          'Bezwaar tegen een factuur schort de betalingsverplichting niet op.',
          'Abonnementen, onderhoud, hosting, social media beheer, marketingbegeleiding en andere terugkerende diensten worden vooraf gefactureerd, tenzij schriftelijk anders is afgesproken.',
        ],
      },
    ],
  },
  {
    title: 'Artikel 8 - Abonnementen en terugkerende diensten',
    blocks: [
      {
        kind: 'list',
        items: [
          'Abonnementen worden aangegaan voor de duur zoals vermeld in de offerte of overeenkomst.',
          'Als geen duur is afgesproken, geldt een minimumduur van 12 maanden voor terugkerende diensten, tenzij schriftelijk anders is overeengekomen.',
          'Na afloop van de initiële looptijd wordt het abonnement stilzwijgend verlengd met telkens één maand, tenzij schriftelijk anders is overeengekomen.',
          'Opzegging dient schriftelijk of per e-mail te gebeuren met een opzegtermijn van één maand.',
          'Minterest mag abonnementskosten jaarlijks indexeren of aanpassen bij stijgende kosten van software, hosting, personeel, licenties, tools of externe leveranciers.',
          'Bij achterstallige betaling mag Minterest abonnementen, onderhoud, support, hostingbegeleiding, campagnes of toegang tot diensten tijdelijk opschorten.',
        ],
      },
    ],
  },
  {
    title: 'Artikel 9 - Marketing, advertenties en groeiverwachtingen',
    blocks: [
      {
        kind: 'list',
        items: [
          'Minterest garandeert geen specifieke resultaten zoals omzetgroei, winstgroei, leadgroei, bereik, volgers, conversies, posities in Google, advertentieresultaten, verkoopcijfers of nieuwe klanten.',
          'Marketing, branding, websites, content, advertenties, SEO en strategie zijn afhankelijk van meerdere factoren buiten de invloed van Minterest, waaronder marktontwikkelingen, concurrentie, budget, aanbod, prijsstelling, klantopvolging, algoritmes, platformbeleid, reputatie, timing, doelgroepgedrag en beslissingen van Opdrachtgever.',
          'Minterest is niet verantwoordelijk voor tegenvallende commerciële resultaten, omzetverlies, gemiste leads, dalende conversie, lagere zichtbaarheid, reputatieschade of verlies van klanten als gevolg van marketingactiviteiten, campagnes, content, advertenties, strategisch advies of wijzigingen in platformen, voor zover wettelijk toegestaan.',
          'Adviezen en strategieën van Minterest zijn bedoeld als professionele aanbevelingen. Opdrachtgever blijft zelf verantwoordelijk voor zakelijke beslissingen, investeringen, campagnes, aanbiedingen, prijsbeleid, opvolging van leads en commerciële uitvoering.',
          'Advertentiebudgetten, mediabudgetten, softwarekosten, licentiekosten en kosten van derden zijn voor rekening van Opdrachtgever, tenzij schriftelijk anders is afgesproken.',
          'Minterest is niet aansprakelijk voor besluiten van advertentieplatforms, socialmediaplatforms, zoekmachines, hostingpartijen, betalingsproviders of andere derde partijen, waaronder blokkades, afkeuringen, accountbeperkingen, prijswijzigingen, algoritmewijzigingen of storingen.',
        ],
      },
    ],
  },
  {
    title: 'Artikel 10 - Websites, hosting, domeinen en technische diensten',
    blocks: [
      {
        kind: 'list',
        items: [
          'Minterest kan websites, webshops, webapplicaties en technische oplossingen ontwikkelen, onderhouden of begeleiden.',
          'Opdrachtgever is verantwoordelijk voor de juistheid van alle content, juridische teksten, privacyverklaringen, algemene voorwaarden, cookiemeldingen, productinformatie, prijzen en bedrijfsgegevens op de website, tenzij schriftelijk anders is afgesproken.',
          'Minterest is niet aansprakelijk voor storingen, hacks, dataverlies, downtime, beveiligingsproblemen, updates, fouten of schade veroorzaakt door hostingpartijen, plug-ins, externe software, thema’s, API’s, betaalproviders of andere derde partijen, voor zover wettelijk toegestaan.',
          'Indien Minterest hosting of onderhoud faciliteert, geldt dit als inspanningsverplichting. Minterest garandeert geen foutloze, ononderbroken of permanent beschikbare werking van websites, webshops, applicaties of servers.',
          'Opdrachtgever is verantwoordelijk voor het veilig bewaren van inloggegevens en voor het niet delen van toegang met onbevoegde derden.',
          'Wijzigingen door Opdrachtgever of derden aan websites, code, hosting, plug-ins, instellingen of accounts kunnen gevolgen hebben voor werking, veiligheid en prestaties. Minterest is niet aansprakelijk voor schade die hierdoor ontstaat.',
        ],
      },
    ],
  },
  {
    title: 'Artikel 11 - Oplevering en acceptatie',
    blocks: [
      {
        kind: 'list',
        items: [
          'Minterest levert werkzaamheden op via e-mail, digitaal bestand, previewlink, websiteomgeving, cloudomgeving of andere passende wijze.',
          'Opdrachtgever dient het opgeleverde werk binnen 7 dagen na oplevering te controleren.',
          'Als Opdrachtgever binnen 7 dagen geen schriftelijke opmerkingen doorgeeft, wordt het werk geacht te zijn goedgekeurd.',
          'Kleine fouten of verbeterpunten die het normale gebruik niet wezenlijk belemmeren, zijn geen reden om betaling op te schorten of oplevering te weigeren.',
          'Na goedkeuring of ingebruikname van het werk worden latere wijzigingen, aanvullingen of correcties beschouwd als meerwerk, tenzij sprake is van een aantoonbare fout van Minterest binnen de overeengekomen scope.',
        ],
      },
    ],
  },
  {
    title: 'Artikel 12 - Intellectuele eigendom',
    blocks: [
      {
        kind: 'list',
        items: [
          'Alle intellectuele eigendomsrechten op door Minterest ontwikkelde concepten, strategieën, ontwerpen, teksten, websites, code, templates, structuren, systemen, campagnes, documenten, formats, werkwijzen en overige materialen blijven eigendom van Minterest, tenzij schriftelijk anders is overeengekomen.',
          'Na volledige betaling krijgt Opdrachtgever een gebruiksrecht op het eindproduct voor het doel waarvoor het is geleverd.',
          'Opdrachtgever mag materialen van Minterest niet zonder schriftelijke toestemming doorverkopen, kopiëren, openbaar maken, bewerken, aan derden verstrekken of gebruiken voor andere doeleinden dan waarvoor ze zijn geleverd.',
          'Bronbestanden, ruwe bestanden, strategiedocumenten, templates, codebestanden, projectbestanden en interne werkdocumenten worden alleen overgedragen als dit schriftelijk is afgesproken.',
          'Minterest mag ontwikkeld werk gebruiken voor portfolio, social media, website, presentaties, acquisitie en marketing, tenzij Opdrachtgever vooraf schriftelijk gemotiveerd bezwaar maakt.',
          'Opdrachtgever garandeert dat door hem aangeleverde materialen geen inbreuk maken op rechten van derden. Opdrachtgever vrijwaart Minterest voor aanspraken van derden wegens gebruik van door Opdrachtgever aangeleverde materialen.',
        ],
      },
    ],
  },
  {
    title: 'Artikel 13 - Licenties, tools en accounts',
    blocks: [
      {
        kind: 'list',
        items: [
          'Kosten voor externe tools, software, plug-ins, hosting, domeinen, lettertypes, stockbeelden, advertenties, licenties en abonnementen zijn voor rekening van Opdrachtgever, tenzij schriftelijk anders is afgesproken.',
          'Opdrachtgever is zelf verantwoordelijk voor naleving van licentievoorwaarden van derde partijen.',
          'Minterest is niet aansprakelijk voor prijswijzigingen, beperkingen, storingen, beëindiging of beleidswijzigingen van externe tools of softwareleveranciers.',
          'Accounts die eigendom zijn van Opdrachtgever blijven eigendom van Opdrachtgever. Accounts die door Minterest intern worden gebruikt voor uitvoering van diensten blijven eigendom van Minterest, tenzij schriftelijk anders is afgesproken.',
        ],
      },
    ],
  },
  {
    title: 'Artikel 14 - Aansprakelijkheid',
    blocks: [
      {
        kind: 'list',
        items: [
          'De aansprakelijkheid van Minterest is beperkt tot directe schade die het rechtstreekse gevolg is van een toerekenbare tekortkoming van Minterest.',
          'Minterest is niet aansprakelijk voor indirecte schade, gevolgschade, omzetverlies, winstderving, gemiste besparingen, gemiste leads, verlies van klanten, reputatieschade, bedrijfsschade, dataverlies, boetes, claims van derden of schade door bedrijfsstagnatie, voor zover wettelijk toegestaan.',
          'De totale aansprakelijkheid van Minterest is beperkt tot het bedrag dat Opdrachtgever voor de betreffende opdracht in de laatste drie maanden voorafgaand aan de schadeveroorzakende gebeurtenis aan Minterest heeft betaald, met een maximum van €2.500, tenzij schriftelijk anders is overeengekomen.',
          'Indien de aansprakelijkheidsverzekering van Minterest in een specifiek geval uitkeert, is de aansprakelijkheid beperkt tot het bedrag dat door de verzekeraar wordt uitgekeerd.',
          'De beperkingen van aansprakelijkheid gelden niet voor zover schade het gevolg is van opzet of bewuste roekeloosheid van Minterest of voor zover beperking wettelijk niet is toegestaan.',
          'Opdrachtgever dient schade zo snel mogelijk, maar uiterlijk binnen 14 dagen na ontdekking, schriftelijk aan Minterest te melden. Schade die later wordt gemeld, komt niet voor vergoeding in aanmerking, tenzij Opdrachtgever aantoont dat eerdere melding redelijkerwijs niet mogelijk was.',
          'Iedere vordering tot schadevergoeding vervalt 12 maanden na het moment waarop Opdrachtgever bekend werd of redelijkerwijs bekend had kunnen zijn met de schade en de daarvoor aansprakelijke partij, tenzij de wet een langere dwingende termijn voorschrijft.',
        ],
      },
    ],
  },
  {
    title: 'Artikel 15 - Vrijwaring',
    blocks: [
      {
        kind: 'list',
        items: [
          {
            text: 'Opdrachtgever vrijwaart Minterest tegen alle aanspraken, claims, boetes, schade, kosten en procedures van derden die voortvloeien uit:',
            sub: [
              'door Opdrachtgever aangeleverde informatie, materialen, claims, beelden, teksten, data of instructies;',
              'onjuiste, misleidende of onrechtmatige informatie van Opdrachtgever;',
              'inbreuk op intellectuele eigendomsrechten van derden;',
              'schending van privacywetgeving door Opdrachtgever;',
              'producten, diensten, aanbiedingen of bedrijfsvoering van Opdrachtgever;',
              'door Opdrachtgever goedgekeurde of gepubliceerde content, campagnes, websites of advertenties;',
              'wijzigingen die Opdrachtgever of derden na oplevering hebben aangebracht.',
            ],
          },
          'Opdrachtgever zal Minterest alle schade, kosten en redelijke juridische kosten vergoeden die voortvloeien uit dergelijke aanspraken.',
        ],
      },
    ],
  },
  {
    title: 'Artikel 16 - Geheimhouding',
    blocks: [
      {
        kind: 'list',
        items: [
          'Partijen zijn verplicht vertrouwelijke informatie geheim te houden.',
          'Vertrouwelijke informatie mag alleen worden gebruikt voor de uitvoering van de overeenkomst.',
          'Deze verplichting geldt niet voor informatie die algemeen bekend is, al rechtmatig bekend was bij de ontvangende partij of openbaar moet worden gemaakt op grond van wet- of regelgeving.',
          'De geheimhoudingsverplichting blijft ook na beëindiging van de overeenkomst bestaan.',
        ],
      },
    ],
  },
  {
    title: 'Artikel 17 - Privacy en persoonsgegevens',
    blocks: [
      {
        kind: 'list',
        items: [
          'Partijen zullen zich houden aan de geldende privacywetgeving, waaronder de Algemene Verordening Gegevensbescherming.',
          'Indien Minterest persoonsgegevens verwerkt in opdracht van Opdrachtgever en daarbij als verwerker optreedt, sluiten partijen indien nodig een aparte verwerkersovereenkomst.',
          'Opdrachtgever blijft verantwoordelijk voor de rechtmatigheid van de persoonsgegevens, marketinglijsten, klantdata, e-mailbestanden, tracking, cookies en overige data die aan Minterest worden verstrekt of via campagnes worden gebruikt.',
          'Minterest is niet aansprakelijk voor schade of boetes als gevolg van onrechtmatige verwerking van persoonsgegevens door Opdrachtgever of door instructies van Opdrachtgever.',
        ],
      },
    ],
  },
  {
    title: 'Artikel 18 - Annulering, pauzering en beëindiging',
    blocks: [
      {
        kind: 'list',
        items: [
          'Annulering van een opdracht door Opdrachtgever dient schriftelijk te gebeuren.',
          'Bij annulering blijft Opdrachtgever verplicht de reeds uitgevoerde werkzaamheden, gemaakte kosten, ingeplande capaciteit en eventueel overeengekomen annuleringskosten te betalen.',
          'Minterest mag de overeenkomst beëindigen of opschorten indien Opdrachtgever zijn verplichtingen niet nakomt, facturen niet tijdig betaalt, noodzakelijke informatie niet aanlevert, onredelijke eisen stelt of de samenwerking ernstig verstoort.',
          'Bij beëindiging blijven reeds verschuldigde bedragen direct opeisbaar.',
          'Minterest is bij beëindiging niet verplicht reeds betaalde bedragen terug te betalen, tenzij schriftelijk anders is overeengekomen of de wet anders bepaalt.',
        ],
      },
    ],
  },
  {
    title: 'Artikel 19 - Overmacht',
    blocks: [
      {
        kind: 'list',
        items: [
          'Minterest is niet verplicht verplichtingen na te komen indien sprake is van overmacht.',
          'Onder overmacht wordt onder meer verstaan: ziekte, personeelstekort, storingen, internetproblemen, hostingproblemen, stroomstoringen, cyberaanvallen, brand, pandemieën, overheidsmaatregelen, stakingen, oorlog, leveranciersproblemen, vertraging bij derden, platformstoringen, technische problemen of andere omstandigheden buiten de redelijke invloed van Minterest.',
          'Tijdens overmacht worden verplichtingen van Minterest opgeschort.',
          'Indien de overmacht langer dan 60 dagen duurt, mogen beide partijen de overeenkomst schriftelijk beëindigen voor het deel dat nog niet is uitgevoerd.',
        ],
      },
    ],
  },
  {
    title: 'Artikel 20 - Klachten',
    blocks: [
      {
        kind: 'list',
        items: [
          'Klachten over werkzaamheden of facturen dienen binnen 7 dagen na ontdekking schriftelijk en duidelijk omschreven aan Minterest te worden gemeld.',
          'Klachten schorten de betalingsverplichting van Opdrachtgever niet op.',
          'Minterest krijgt altijd een redelijke termijn om een klacht te onderzoeken en, indien nodig, te herstellen.',
          'Indien Opdrachtgever Minterest geen mogelijkheid geeft om een gebrek te herstellen, vervalt het recht op herstel, korting of schadevergoeding voor zover wettelijk toegestaan.',
        ],
      },
    ],
  },
  {
    title: 'Artikel 21 - Niet-overname personeel en partners',
    blocks: [
      {
        kind: 'list',
        items: [
          'Opdrachtgever mag gedurende de overeenkomst en 12 maanden na beëindiging geen medewerkers, freelancers, partners of ingeschakelde derden van Minterest direct benaderen, inhuren of contracteren voor vergelijkbare werkzaamheden, tenzij Minterest vooraf schriftelijk toestemming geeft.',
          'Bij overtreding van dit artikel is Opdrachtgever een direct opeisbare boete verschuldigd van €5.000 per overtreding, vermeerderd met €500 per dag dat de overtreding voortduurt, onverminderd het recht van Minterest om volledige schadevergoeding te vorderen.',
        ],
      },
    ],
  },
  {
    title: 'Artikel 22 - Wijziging van voorwaarden',
    blocks: [
      {
        kind: 'list',
        items: [
          'Minterest mag deze algemene voorwaarden wijzigen.',
          'Gewijzigde voorwaarden gelden voor nieuwe overeenkomsten en voor lopende abonnementen vanaf 30 dagen nadat Opdrachtgever hierover is geïnformeerd.',
          'Indien Opdrachtgever niet akkoord gaat met een wezenlijke wijziging bij een lopend abonnement, mag Opdrachtgever het abonnement beëindigen per de datum waarop de wijziging ingaat, tenzij de wijziging noodzakelijk is door wetgeving, veiligheidsredenen of wijzigingen bij derde partijen.',
        ],
      },
    ],
  },
  {
    title: 'Artikel 23 - Toepasselijk recht en bevoegde rechter',
    blocks: [
      {
        kind: 'list',
        items: [
          'Op alle offertes, overeenkomsten, werkzaamheden en geschillen met Minterest is uitsluitend Nederlands recht van toepassing.',
          'Geschillen worden bij voorkeur eerst in onderling overleg opgelost.',
          'Indien overleg niet tot een oplossing leidt, worden geschillen voorgelegd aan de bevoegde rechter in het arrondissement waar Minterest is gevestigd, tenzij de wet dwingend een andere rechter aanwijst.',
        ],
      },
    ],
  },
  {
    title: 'Artikel 24 - Slotbepaling',
    blocks: [
      {
        kind: 'list',
        items: [
          'Deze algemene voorwaarden zijn opgesteld om duidelijke afspraken te maken, de samenwerking professioneel te laten verlopen en misverstanden over scope, aansprakelijkheid, betaling, eigendom en resultaten te voorkomen.',
          'Door akkoord te gaan met een offerte, overeenkomst of opdrachtbevestiging van Minterest verklaart Opdrachtgever kennis te hebben genomen van deze algemene voorwaarden en daarmee akkoord te gaan.',
        ],
      },
    ],
  },
]

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        if (b.kind === 'defs') {
          return (
            <div key={i} className="space-y-4">
              <p className="font-sans leading-relaxed text-near-black/70">{b.lead}</p>
              <dl className="space-y-3">
                {b.defs.map((d) => (
                  <div key={d.term} className="font-sans leading-relaxed text-near-black/70">
                    <dt className="inline font-semibold text-near-black">{d.term} </dt>
                    <dd className="inline">{d.text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )
        }
        return (
          <ol key={i} className="list-decimal space-y-3 pl-5 font-sans leading-relaxed text-near-black/70 marker:font-semibold marker:text-emerald">
            {b.items.map((item, j) =>
              typeof item === 'string' ? (
                <li key={j}>{item}</li>
              ) : (
                <li key={j}>
                  {item.text}
                  <ol className="mt-3 list-[lower-alpha] space-y-2 pl-5 marker:font-normal marker:text-emerald/70">
                    {item.sub.map((s, k) => (
                      <li key={k}>{s}</li>
                    ))}
                  </ol>
                </li>
              ),
            )}
          </ol>
        )
      })}
    </>
  )
}

export function Terms() {
  return (
    <SiteContentProvider page="terms">
      <TermsInner />
    </SiteContentProvider>
  )
}

function TermsInner() {
  const c = useContent()
  return (
    <>
      <PageHero
        kicker={c('hero.kicker')}
        title={c('hero.title')}
        tagline={c('hero.tagline')}
      />

      <div className="bg-cream text-near-black">
        <div className="mx-auto max-w-3xl px-6 py-20 md:px-10 md:py-28">
          <div className="space-y-12 md:space-y-16">
            {ARTICLES.map((a) => (
              <Reveal key={a.title}>
                <section>
                  <h2 className="font-display text-2xl font-semibold tracking-tight text-near-black md:text-[1.75rem]">
                    {a.title}
                  </h2>
                  <div className="mt-5 space-y-4">
                    <Blocks blocks={a.blocks} />
                  </div>
                </section>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
