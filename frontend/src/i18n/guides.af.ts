// ─────────────────────────────────────────────────────────────────────────────
//  Afrikaans translations of the Legal Info Library guides.
//
//  Template for translators (Oshiwambo, Otjiherero, Khoekhoegowab): copy as
//  guides.<lang>.ts and translate the VALUES only. Keep markdown structure,
//  act names with their official English titles, and all phone numbers.
//  AI-drafted Afrikaans — flag for native-speaker review before launch.
// ─────────────────────────────────────────────────────────────────────────────

export interface GuideOverlay {
  [guideId: string]: { title?: string; summary?: string; content?: string }
}

export const GUIDES_AF: GuideOverlay = {
  safety: {
    title: 'Huishoudelike geweld & beskermingsbevele',
    summary: 'Jou veiligheid, beskermingsbevele, en hoe om mishandeling aan te meld',
    content: `
## Die basiese feite

Huishoudelike geweld is ’n misdaad in Namibië. Die **Combating of Domestic Violence Act 4 van 2003** beskerm mense in ’n "huishoudelike verhouding" — gades, lewensmaats, gewese maats, familielede, en mense wat ’n huis deel of saam ’n kind het. Dit dek fisiese, seksuele, ekonomiese, verbale en sielkundige mishandeling, intimidasie en teistering.

## Belangrike beskermings

- **Beskermingsbevel** — enige landdroshof kan ’n mishandelaar beveel om die mishandeling te staak, weg te bly van jou, jou huis of werk, en selfs ’n gedeelde huis te verlaat. ’n **Tussentydse beskermingsbevel** kan vinnig toegestaan word, nog voordat die mishandelaar aangehoor word, as jy in gevaar is.
- Om ’n beskermingsbevel te verbreek is ’n **kriminele oortreding** — die polisie kan die persoon arresteer.
- Die **Combating of Rape Act 8 van 2000** stel streng minimum vonnisse en maak dit duidelik dat die huwelik geen verweer teen verkragting is nie.

## Wat jy nou kan doen

1. As jy in onmiddellike gevaar is, bel die **Polisie by 10111** of die gratis **GGW-hulplyn by 106**.
2. Meld aan by enige polisiestasie — vra vir die **GBV Protection Unit**. Jy kan vir ’n vroulike beampte vra.
3. Doen aansoek om ’n beskermingsbevel by jou naaste **landdroshof**. Geen prokureur is nodig nie en daar is geen fooi nie.
4. Bewaar bewyse waar dit veilig is om te doen: foto’s van beserings, dreigende boodskappe, name van getuies, datums.
5. ’n Dokter of kliniek kan beserings dokumenteer — vra vir die mediese verslag.

## Waar om hulp te kry

- Polisie-noodlyn: **10111**
- GGW-hulplyn (gratis, 24 uur): **106**
- Legal Assistance Centre (LAC), Windhoek: **+264 61 223 356**
- Direktoraat Regshulp — gratis regsverteenwoordiging as jy kwalifiseer
`,
  },

  housing: {
    title: 'Uitsetting & huurderregte',
    summary: 'Uitsettings, kennisgewing, deposito’s en uitsluitings',
    content: `
## Die basiese feite

’n Verhuurder **kan jou nie sonder ’n hofbevel uitsit nie**. Selfs as jou huurkontrak verstryk het of huur agterstallig is, moet die verhuurder hof toe gaan — gewoonlik die **landdroshof** — en jy het die reg om die aansoek teen te staan en aangehoor te word.

## Belangrike beskermings

- **Eiehandige uitsetting is onwettig.** Om die slotte te verander, jou besittings te verwyder, of water en elektrisiteit af te sny om jou uit te dwing, is onwettig. Die howe kan beveel dat jou besit onmiddellik herstel word (’n *spoliasiebevel*), dikwels binne dae.
- **Kennisgewing** — vir ’n maand-tot-maand-huur vereis die gemenereg gewoonlik minstens **een kalendermaand se kennisgewing**, en die huurkontrak kan meer vereis.
- **Deposito’s** — jou deposito bly jou geld. Die verhuurder mag slegs billike bedrae aftrek vir werklike skade of agterstallige huur, en moet verantwoording doen oor wat afgetrek is.
- Die **Namibiese Grondwet (Artikel 16)** beskerm eiendomsregte — insluitend ’n huurder se reg om nie arbitrêr van besit ontneem te word nie.

## Wat jy nou kan doen

1. Vra dat alles **op skrif** gestel word — kennisgewing, redes, bedrae geëis.
2. Moenie trek net omdat jy mondelings aangesê is nie. Wag vir behoorlike kennisgewing; slegs ’n hof kan uitsetting beveel.
3. As jy uitgesluit is of jou goed verwyder is, gaan na die landdroshof (of kry hulp) oor ’n dringende **spoliasiebevel**.
4. Hou bewys van huurbetalings, jou huurkontrak, foto’s van die eiendom se toestand, en alle boodskappe.
5. As die deposito onbillik weerhou word, stuur ’n geskrewe aanmaning; die volgende stap is ’n eis in die landdroshof.

## Waar om hulp te kry

- Landdroshof (klerk van die siviele hof) in jou distrik
- Legal Assistance Centre (LAC): **+264 61 223 356**
- Direktoraat Regshulp — gratis regshulp as jy kwalifiseer
`,
  },

  work: {
    title: 'Onbillike ontslag & werkersregte',
    summary: 'Ontslag, verhore, lone, oortyd en die Arbeidskommissaris',
    content: `
## Die basiese feite

Die **Labour Act 11 van 2007** beskerm elke werknemer in Namibië. ’n Ontslag moet sowel **substantief billik** (’n geldige rede) as **prosedureel billik** (’n behoorlike verhoor waar jy jou kant kon stel) wees. ’n Ontslag sonder ’n geldige rede **én** ’n billike prosedure is onbillik — en die Arbeidskommissaris kan herindiensstelling of vergoeding beveel.

## Belangrike beskermings

- **Eers ’n verhoor** — jy is geregtig daarop om die bewerings teen jou te ken en daarop te antwoord voordat jy ontslaan word.
- **Werksure** — gewoonlik ’n maksimum van **45 uur per week**; oortyd slegs per ooreenkoms, beperk tot 10 uur per week, betaal teen **1,5× jou basiese loon** (dubbel op Sondae en openbare vakansiedae).
- **Verlof** — 4 agtereenvolgende weke jaarlikse verlof per siklus; betaalde siekteverlof; kraambeskerming.
- **Geen diskriminasie** — ontslag of ongelyke behandeling op grond van geslag, swangerskap, MIV-status, ras, geloof of vakbondlidmaatskap is verbode (art. 5).
- Om te bedank weens seksuele teistering kan as **konstruktiewe ontslag** tel.

## Wat jy nou kan doen

1. **Tree vinnig op — arbeidsgeskille het streng tydsbeperkings** (gewoonlik ses maande vanaf ontslag).
2. Skryf neer wat gebeur het, met datums; hou jou kontrak, loonstrokies en enige geskrewe waarskuwings.
3. Vra die werkgewer vir geskrewe redes vir die ontslag.
4. Verwys ’n geskil na die **Kantoor van die Arbeidskommissaris** — versoening en arbitrasie is gratis en geen prokureur is nodig nie.
5. Vir onbetaalde lone of oortyd kan die arbeidsinspektoraat by die **Ministerie van Arbeid** ook help.

## Waar om hulp te kry

- Kantoor van die Arbeidskommissaris (distriks-arbeidskantore)
- Ministerie van Industrialisering, Handel en Werkskepping — arbeidsinspekteurs
- Jou vakbond, as jy aan een behoort
- Legal Assistance Centre (LAC): **+264 61 223 356**
`,
  },

  family: {
    title: 'Onderhoud, toesig & familiereg',
    summary: 'Kinderonderhoud, toesig, egskeiding en huweliksregte',
    content: `
## Die basiese feite

**Albei ouers moet hul kinders onderhou** — getroud of nie. Die **Maintenance Act 9 van 2003** laat enige ouer of versorger toe om by die **onderhoudshof** (in elke landdroshof) aansoek te doen om ’n onderhoudsbevel. Dit is gratis en jy het nie ’n prokureur nodig nie.

## Belangrike beskermings

- **Onderhoudsbevele** — die hof kan maandelikse betalings beveel, en kan ’n werkgewer beveel om onderhoud direk van die ander ouer se salaris af te trek.
- **Om ’n onderhoudsbevel nie te betaal nie is ’n kriminele oortreding** — meld nie-betaling by die onderhoudsbeampte aan.
- Die **Child Care and Protection Act 3 van 2015** stel die **beste belang van die kind** voorop in toesig- en toegangsbesluite, en kinderhowe kan ingryp waar ’n kind beskerming nodig het.
- Die **Married Persons Equality Act 1 van 1996** gee gades gelyke seggenskap in ’n siviele huwelik — ook oor gesamentlike eiendom.

## Wat jy nou kan doen

1. Vir onbetaalde onderhoud: gaan na die **onderhoudshof** by jou landdroshof met die kind se geboortesertifikaat, jou uitgawes (kwitansies) en wat jy weet van die ander ouer se inkomste en werkplek.
2. As ’n bevel bestaan en nie betaal word nie, vra die onderhoudsbeampte om dit **af te dwing** — die hof kan lone of eiendom beslag lê.
3. Vir toesig- of toegangsprobleme kan die klerk van die kinderhof of ’n maatskaplike werker help.
4. Hou rekord van betalings, uitgawes en kommunikasie.

## Waar om hulp te kry

- Onderhoudsbeampte by jou naaste landdroshof (gratis)
- Ministerie van Geslagsgelykheid en Kinderwelsyn — maatskaplike werkers
- Legal Assistance Centre (LAC): **+264 61 223 356**
- Direktoraat Regshulp vir egskeidings- of toesiggeskille as jy kwalifiseer
`,
  },

  money: {
    title: 'Skuld, geldeise & bedrog',
    summary: 'Geld wat aan jou verskuldig is, skuldinvorderaars en bedrog',
    content: `
## Die basiese feite

Die meeste geldgeskille word in die **landdroshowe** beslis — hulle hanteer die grootste deel van siviele eise in Namibië. Groter eise gaan na die **Hooggeregshof**. Die hof is die laaste stap: ’n duidelike geskrewe aanmaning los baie geskille op.

## Belangrike beskermings

- **Aanmaningsbrief** — ’n geskrewe aanmaning wat sê wat verskuldig is, hoekom, en ’n sperdatum (gewoonlik 7–14 dae) is meestal die eerste formele stap, en word dikwels vereis voor dagvaarding.
- **Verjaring** — die meeste gewone skulde **verval ná drie jaar** as die skuldeiser geen regstappe neem nie (Prescription Act 68 van 1969). Moenie op ’n eis sit nie.
- **Skuldinvorderaars mag jou nie teister nie** — dreigemente, intimidasie of die vat van eiendom sonder ’n hofbevel is onwettig. Slegs ’n hof (deur die geregsbode) kan eiendom beslag lê.
- **Bedrog en swendelary is misdade** — meld dit by die polisie aan; jy kan ook dagvaar om jou geld terug te kry.

## Wat jy nou kan doen

1. Sit die skuld op skrif: wie, watter bedrag, wanneer dit verskuldig was, en bewyse (boodskappe, kwitansies, ooreenkomste).
2. Stuur ’n **aanmaningsbrief** met ’n duidelike sperdatum. Hou bewys dat dit afgelewer is.
3. As dit onbetaal bly, vra die **klerk van die landdroshof** oor die uitreik van ’n dagvaarding — vir eenvoudige eise kan jy baie hiervan sonder ’n prokureur doen.
4. Word jy geteister oor ’n skuld wat jy skuld? Vra vir ’n geskrewe staat van rekening, en meld dreigemente by die polisie aan.
5. Vir bedrog, open ’n kriminele saak by die polisie en stel jou bank dadelik in kennis — spoed maak saak.

## Waar om hulp te kry

- Klerk van die siviele hof by jou landdroshof
- Namibiese Polisie (bedrog) en jou bank se bedroglyn
- Legal Assistance Centre (LAC): **+264 61 223 356**
`,
  },

  defamation: {
    title: 'Laster & jou reputasie',
    summary: 'Vals stellings, sosialemedia-aanvalle en jou remedies',
    content: `
## Die basiese feite

Laster is die **onregmatige publikasie van ’n stelling wat iemand se reputasie skaad**. "Publikasie" sluit WhatsApp-boodskappe, Facebook-plasings, en woorde wat selfs aan net een ander persoon gesê word, in. Namibiese howe pas die gemenereg oor laster toe, en die **Grondwet (Artikel 8)** beskerm menswaardigheid.

## Belangrike punte

- Jy moet gewoonlik bewys dat die stelling **gepubliseer** is, na **jou** verwys het, en **lasterlik** was (jou aansien in ander se oë verlaag het).
- Die ander kant kan verwere opper: dat die stelling **waar en in die openbare belang** was, **billike kommentaar** op feite, of by ’n **bevoorregte geleentheid** gemaak is.
- Remedies sluit in **skadevergoeding** (geld), ’n **interdik** (hofbevel om die stellings te staak of te verwyder), en ’n **terugtrekking of verskoning**.
- Om iemand te beledig of te verneder kan ook die misdaad *crimen injuria* wees, wat jy by die polisie kan aanmeld.

## Wat jy nou kan doen

1. **Bewaar die bewyse** — neem skermkiekies wat die plasing, die outeur, die datum en wie dit kon sien, wys. Doen dit voordat dit uitgevee word.
2. Identifiseer getuies wat die stellings gesien of gehoor het.
3. Stuur ’n **geskrewe aanmaning** dat die persoon die stellings verwyder, ophou, en verskoning vra — dikwels werk dit alleen reeds.
4. As dit voortduur, kry regsadvies oor ’n eis om skadevergoeding of ’n dringende interdik; ernstige teistering kan ook ’n beskermingsbevel regverdig.
5. Moenie met jou eie beledigings terugkap nie — dit verswak jou saak.

## Waar om hulp te kry

- Legal Assistance Centre (LAC): **+264 61 223 356**
- ’n Regspraktisyn (die Prokureursorde van Namibië kan verwys: **+264 61 218 202**)
- Polisie, vir *crimen injuria* of teistering
`,
  },

  crime: {
    title: 'Misdaad, polisie & jou regte',
    summary: 'Misdaad aanmeld, arrestasies, borgtog en polisie wat nie optree nie',
    content: `
## Die basiese feite

Kriminele sake in Namibië word deur die **Prokureur-Generaal se kantoor** vervolg kragtens die **Criminal Procedure Act 51 van 1977**. Of jy ’n **slagoffer** of ’n **beskuldigde** is, gee die Grondwet jou regte wat die polisie moet eerbiedig.

## As jy ’n slagoffer is

- Meld aan by enige polisiestasie. Jy is geregtig op ’n **saaknommer (CR-nommer)** — hou dit en gebruik dit om op te volg.
- Vra die ondersoekbeampte se naam en kontakbesonderhede.
- As niks gebeur nie, eskaleer skriftelik na die **stasiebevelvoerder**, dan die streeksbevelvoerder; die **Ombudsman** ondersoek polisieversuim en magsmisbruik.

## As jy gearresteer of aangekla word

- Jy het die reg om te **swyg**, om die rede vir jou arrestasie te verneem, en op ’n **prokureur** — deur die **Direktoraat Regshulp** as jy nie een kan bekostig nie (Grondwet, Artikel 12 — billike verhoor).
- Jy moet binne **48 uur** ná arrestasie voor ’n landdros gebring word.
- Jy kan om **borgtog** aansoek doen; voorwaardes hang af van die oortreding en jou omstandighede.
- Moenie verklarings teken wat jy nie verstaan nie of wat nie in jou eie woorde is nie.

## Wat jy nou kan doen

1. Slagoffers: hou jou CR-nommer, ’n afskrif van jou verklaring, en ’n rekord van elke opvolg.
2. Beskuldigdes of hul familie: kontak die **Direktoraat Regshulp** by die naaste landdroshof so gou moontlik.
3. Klagtes oor polisie-optrede kan gaan na die stasiebevelvoerder, die polisie se professionelestandaarde-eenheid, of die **Ombudsman**.

## Waar om hulp te kry

- Polisie-noodlyn: **10111**
- Direktoraat Regshulp — by landdroshowe, gratis as jy kwalifiseer
- Kantoor van die Ombudsman, Windhoek
- Legal Assistance Centre (LAC): **+264 61 223 356**
`,
  },

  other: {
    title: 'Howe, regshulp & waar om te begin',
    summary: 'Hoe die Namibiese regstelsel werk en waar om gratis hulp te kry',
    content: `
## Die hofstelsel, in een minuut

- **Landdroshowe** — in elke distrik; hanteer die meeste kriminele sake en die meeste alledaagse siviele geskille, plus onderhoud en beskermingsbevele. Dít is waar die meeste mense begin.
- **Hooggeregshof** (Windhoek en Oshakati) — groter siviele eise, ernstige misdade, appèlle vanaf landdroshowe, egskeidings.
- **Hoogste Hof van Appèl (Supreme Court)** — die hoogste hof; sy beslissings bind alle ander howe.
- **Arbeidshof** — arbeidsgeskille, ná die Arbeidskommissaris-proses.
- **Gemeenskapshowe** — gewoonteregtelike geskille binne tradisionele gemeenskappe.

Die **Namibiese Grondwet is die hoogste reg** — elke wet en elke amptelike optrede moet daaraan voldoen, en **Artikel 25** laat jou toe om ’n hof direk te nader wanneer jou fundamentele regte geskend word.

## Gratis en bekostigbare hulp

- **Direktoraat Regshulp** (Ministerie van Justisie) — gratis regsverteenwoordiging in kriminele en sommige siviele sake as jou inkomste onder die drempel is. Doen aansoek by enige landdroshof.
- **Legal Assistance Centre (LAC)** — openbarebelang-regsentrum in Windhoek: **+264 61 223 356**, lac.org.na
- **Kantoor van die Ombudsman** — gratis ondersoek van regskendings en wanadministrasie deur die regering.
- **Prokureursorde van Namibië** — verwysings na private regspraktisyns: **+264 61 218 202**.
- **Klerke van die hof** — by elke landdroshof; hulle help die publiek gratis om vorms vir onderhoud, beskermingsbevele en klein siviele eise in te vul.

## Praktiese wenke vir enige regsprobleem

1. **Skryf alles vroeg neer** — datums, name, wat gesê is.
2. **Hou dokumente** — kontrakte, kwitansies, boodskappe, foto’s.
3. **Let op die sperdatums** — arbeidsgeskille (6 maande) en skuldeise (3 jaar) verval.
4. Stel versoeke en aanmanings **op skrif** en hou bewys van aflewering.
`,
  },
}
