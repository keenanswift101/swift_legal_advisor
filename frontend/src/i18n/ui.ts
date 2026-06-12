// ─────────────────────────────────────────────────────────────────────────────
//  UI strings — one flat dictionary per language.
//
//  Translator notes:
//  - Keys are stable ids; never translate the keys.
//  - Keep {placeholders} exactly as written.
//  - Register: warm, plain, respectful — write for a stressed person on a
//    phone, not for a lawyer. Avoid formal/legalistic words where a everyday
//    word exists.
//  - Missing keys fall back to English automatically, so partial translations
//    are safe to ship.
// ─────────────────────────────────────────────────────────────────────────────

export type Lang = 'en' | 'af'

export const LANGUAGES: { id: Lang; label: string; native: string }[] = [
  { id: 'en', label: 'English', native: 'English' },
  { id: 'af', label: 'Afrikaans', native: 'Afrikaans' },
  // Coming once human translations are reviewed:
  // { id: 'ng', label: 'Oshiwambo', native: 'Oshiwambo' },
  // { id: 'hz', label: 'Otjiherero', native: 'Otjiherero' },
  // { id: 'naq', label: 'Khoekhoegowab', native: 'Khoekhoegowab' },
]

const en: Record<string, string> = {
  // Header
  'header.subtitle': 'Paralegal Assistant · Namibia',
  'header.tab.advisor': 'Legal Advisor',
  'header.tab.drafter': 'Document Drafter',
  'header.badge': 'AI Paralegal · Namibian Law',
  'header.newChat': 'New Chat',
  'header.home': 'Back to home',

  // Landing
  'landing.nav.guides': 'Legal guides',
  'landing.nav.start': 'Get started',
  'landing.badge': 'AI Paralegal Assistant · Namibia',
  'landing.heroTitle1': 'Know your rights.',
  'landing.heroTitle2': 'In plain language.',
  'landing.heroSub':
    'Swifty helps everyday Namibians understand the law — from eviction and unfair dismissal to domestic violence and maintenance — without the cost of a lawyer for a first answer.',
  'landing.cta.guidance': 'Get legal guidance',
  'landing.cta.draft': 'Draft a document',
  'landing.trustLine': 'Free to use · Private — no account needed · Sources cited in every answer',
  'landing.feature1.title': 'Guided, step by step',
  'landing.feature1.text':
    'Answer a few simple questions about your situation — no legal jargon, no forms. Swifty listens first, then advises.',
  'landing.feature2.title': 'Real Namibian law',
  'landing.feature2.text':
    'Every answer is grounded in the Constitution, Acts of Parliament, Government Gazettes and case law — with sources cited.',
  'landing.feature3.title': 'Documents drafted for you',
  'landing.feature3.text':
    'Letters of demand, affidavits, agreements and more — generated in minutes, ready to print or download.',
  'landing.coverage.title': 'Help with everyday legal problems',
  'landing.coverage.sub':
    'Built for the situations Namibians face most — at home, at work and in the community.',
  'landing.coverage.1': 'Domestic violence & protection orders',
  'landing.coverage.2': 'Eviction & tenant rights',
  'landing.coverage.3': 'Unfair dismissal & unpaid wages',
  'landing.coverage.4': 'Child maintenance & custody',
  'landing.coverage.5': 'Debt, scams & money disputes',
  'landing.coverage.6': 'Defamation & reputation',
  'landing.coverage.7': 'Theft, assault & police matters',
  'landing.coverage.8': 'Contracts & everyday agreements',
  'landing.cta.startFree': 'Start now — it’s free',
  'landing.footer.disclaimer':
    'Swifty provides general legal information, not formal legal advice. For binding advice consult a legal practitioner registered with the Law Society of Namibia.',

  // Welcome screen
  'welcome.title': 'Legal help, step by step',
  'welcome.sub':
    'Pick your situation below and Swifty will ask a few quick questions to understand your case — then explain your rights and next steps under Namibian law, in plain language.',
  'welcome.orType': 'Or just type your situation in the box below — Swifty understands plain language.',
  'welcome.browseGuides': 'Browse the free Legal Info Library',
  'welcome.trust.1': 'Private — no account needed',
  'welcome.trust.2': 'Based on Namibian law',
  'welcome.trust.3': 'Sources cited in every answer',
  'welcome.trust.4': 'Free to use',

  // Chat
  'chat.placeholder': 'Describe your legal situation or ask a question…',
  'chat.disclaimer':
    'Enter to send · Shift+Enter for new line · Swifty provides general information only, not formal legal advice.',
  'chat.stop': 'Stop generation',
  'chat.send': 'Send (Enter)',
  'chat.startNewCase': 'Start a new case',
  'chat.citations': '{n} citation{s} — view sources',
  'chat.errorGuideLink': 'In the meantime, read our free guide on this topic',

  // Agent activity
  'activity.header': 'Swifty is working on your case',
  'activity.reading': 'Reading your situation',
  'activity.identifying': 'Identifying the area of law',
  'activity.identified': 'Area of law identified: {domain}',
  'activity.searching': 'Searching Namibian statutes & case law',
  'activity.writing': 'Writing your guidance',

  // Domains
  'domain.constitutional': 'Constitutional Law',
  'domain.corporate': 'Corporate Law',
  'domain.labour': 'Labour Law',
  'domain.tax': 'Tax Law',
  'domain.banking': 'Banking & Finance',
  'domain.criminal': 'Criminal Law',
  'domain.family': 'Family Law',
  'domain.property': 'Property Law',
  'domain.general': 'General Law',

  // Wizard chrome
  'wizard.back': 'Back',
  'wizard.step': 'Step {n} of {total}',
  'wizard.close': 'Close guided help',
  'wizard.categoryTitle': 'What’s going on?',
  'wizard.categorySub':
    'Choose the situation closest to yours. I’ll ask a few quick questions so I properly understand your case before giving guidance.',
  'wizard.questionHint': 'Tap the answer that fits best — you can go back anytime.',
  'wizard.ownWords.title.required': 'Tell me what happened',
  'wizard.ownWords.title.optional': 'Anything else I should know?',
  'wizard.ownWords.sub.required':
    'Describe your situation in your own words — there are no wrong answers.',
  'wizard.ownWords.sub.optional':
    'Add any detail in your own words, or skip this step. Dates, amounts and names of documents all help.',
  'wizard.ownWords.placeholder': 'For example: It started three months ago when…',
  'wizard.ownWords.privacy': 'Private — nothing is stored under your name.',
  'wizard.continue': 'Continue',
  'wizard.skip': 'Skip this step',
  'wizard.review.title': 'Here’s what I understand',
  'wizard.review.sub': 'Check that this is right — tap any answer to change it.',
  'wizard.review.situation': 'Situation',
  'wizard.review.ownWords': 'In your own words',
  'wizard.review.submit': 'Get my legal guidance',
  'wizard.review.note':
    'Swifty will research Namibian law for your situation. General information only — not formal legal advice.',

  // Guides
  'guides.library': 'Legal Info Library',
  'guides.all': 'All guides',
  'guides.close': 'Close',
  'guides.tagline': 'Free legal information · Namibia',
  'guides.librarySub':
    'Free, plain-language guides to common legal problems in Namibia — drawn from the Constitution, Acts of Parliament and the courts. Always available, even when the assistant is busy.',
  'guides.disclaimer':
    'This page gives general legal information for Namibia, not formal legal advice. Laws change and every situation is different — for advice on your specific case, ask Swifty or consult a legal practitioner.',

  // Language switcher
  'lang.label': 'Language',
}

const af: Record<string, string> = {
  // Header
  'header.subtitle': 'Regsassistent · Namibië',
  'header.tab.advisor': 'Regsadviseur',
  'header.tab.drafter': 'Dokument-opsteller',
  'header.badge': 'KI-Regsassistent · Namibiese Reg',
  'header.newChat': 'Nuwe gesprek',
  'header.home': 'Terug na tuisblad',

  // Landing
  'landing.nav.guides': 'Regsgidse',
  'landing.nav.start': 'Begin nou',
  'landing.badge': 'KI-Regsassistent · Namibië',
  'landing.heroTitle1': 'Ken jou regte.',
  'landing.heroTitle2': 'In gewone taal.',
  'landing.heroSub':
    'Swifty help gewone Namibiërs om die reg te verstaan — van uitsetting en onbillike ontslag tot huishoudelike geweld en onderhoud — sonder die koste van ’n prokureur vir ’n eerste antwoord.',
  'landing.cta.guidance': 'Kry regsleiding',
  'landing.cta.draft': 'Stel ’n dokument op',
  'landing.trustLine': 'Gratis · Privaat — geen rekening nodig nie · Bronne word in elke antwoord aangehaal',
  'landing.feature1.title': 'Stap vir stap gelei',
  'landing.feature1.text':
    'Beantwoord ’n paar eenvoudige vrae oor jou situasie — geen regstaal, geen vorms nie. Swifty luister eers, en gee dan leiding.',
  'landing.feature2.title': 'Werklike Namibiese reg',
  'landing.feature2.text':
    'Elke antwoord is gegrond op die Grondwet, Parlementswette, Staatskoerante en regspraak — met bronne aangehaal.',
  'landing.feature3.title': 'Dokumente vir jou opgestel',
  'landing.feature3.text':
    'Aanmaningsbriewe, beëdigde verklarings, ooreenkomste en meer — binne minute opgestel, gereed om te druk of af te laai.',
  'landing.coverage.title': 'Hulp met alledaagse regsprobleme',
  'landing.coverage.sub':
    'Gebou vir die situasies wat Namibiërs die meeste raak — by die huis, by die werk en in die gemeenskap.',
  'landing.coverage.1': 'Huishoudelike geweld & beskermingsbevele',
  'landing.coverage.2': 'Uitsetting & huurderregte',
  'landing.coverage.3': 'Onbillike ontslag & onbetaalde lone',
  'landing.coverage.4': 'Kinderonderhoud & toesig',
  'landing.coverage.5': 'Skuld, bedrog & geldgeskille',
  'landing.coverage.6': 'Laster & reputasie',
  'landing.coverage.7': 'Diefstal, aanranding & polisiesake',
  'landing.coverage.8': 'Kontrakte & alledaagse ooreenkomste',
  'landing.cta.startFree': 'Begin nou — dis gratis',
  'landing.footer.disclaimer':
    'Swifty verskaf algemene regsinligting, nie formele regsadvies nie. Vir bindende advies, raadpleeg ’n regspraktisyn wat by die Prokureursorde van Namibië geregistreer is.',

  // Welcome screen
  'welcome.title': 'Regshulp, stap vir stap',
  'welcome.sub':
    'Kies jou situasie hieronder en Swifty sal ’n paar vinnige vrae vra om jou saak te verstaan — en dan jou regte en volgende stappe onder Namibiese reg in gewone taal verduidelik.',
  'welcome.orType': 'Of tik net jou situasie in die blokkie hieronder — Swifty verstaan gewone taal.',
  'welcome.browseGuides': 'Blaai deur die gratis Regsinligting-biblioteek',
  'welcome.trust.1': 'Privaat — geen rekening nodig nie',
  'welcome.trust.2': 'Gegrond op Namibiese reg',
  'welcome.trust.3': 'Bronne in elke antwoord',
  'welcome.trust.4': 'Gratis om te gebruik',

  // Chat
  'chat.placeholder': 'Beskryf jou regsituasie of vra ’n vraag…',
  'chat.disclaimer':
    'Enter om te stuur · Shift+Enter vir ’n nuwe reël · Swifty verskaf slegs algemene inligting, nie formele regsadvies nie.',
  'chat.stop': 'Stop generering',
  'chat.send': 'Stuur (Enter)',
  'chat.startNewCase': 'Begin ’n nuwe saak',
  'chat.citations': '{n} verwysing{s} — sien bronne',
  'chat.errorGuideLink': 'Lees intussen ons gratis gids oor hierdie onderwerp',

  // Agent activity
  'activity.header': 'Swifty werk aan jou saak',
  'activity.reading': 'Lees jou situasie',
  'activity.identifying': 'Identifiseer die regsgebied',
  'activity.identified': 'Regsgebied geïdentifiseer: {domain}',
  'activity.searching': 'Deursoek Namibiese wette en regspraak',
  'activity.writing': 'Skryf jou leiding',

  // Domains
  'domain.constitutional': 'Grondwetlike Reg',
  'domain.corporate': 'Maatskappyereg',
  'domain.labour': 'Arbeidsreg',
  'domain.tax': 'Belastingreg',
  'domain.banking': 'Bank- en Finansiesreg',
  'domain.criminal': 'Strafreg',
  'domain.family': 'Familiereg',
  'domain.property': 'Eiendomsreg',
  'domain.general': 'Algemene Reg',

  // Wizard chrome
  'wizard.back': 'Terug',
  'wizard.step': 'Stap {n} van {total}',
  'wizard.close': 'Maak begeleide hulp toe',
  'wizard.categoryTitle': 'Wat gaan aan?',
  'wizard.categorySub':
    'Kies die situasie naaste aan joune. Ek sal ’n paar vinnige vrae vra sodat ek jou saak behoorlik verstaan voordat ek leiding gee.',
  'wizard.questionHint': 'Tik op die antwoord wat die beste pas — jy kan enige tyd teruggaan.',
  'wizard.ownWords.title.required': 'Vertel my wat gebeur het',
  'wizard.ownWords.title.optional': 'Enigiets anders wat ek moet weet?',
  'wizard.ownWords.sub.required':
    'Beskryf jou situasie in jou eie woorde — daar is geen verkeerde antwoorde nie.',
  'wizard.ownWords.sub.optional':
    'Voeg enige besonderhede in jou eie woorde by, of slaan hierdie stap oor. Datums, bedrae en name van dokumente help alles.',
  'wizard.ownWords.placeholder': 'Byvoorbeeld: Dit het drie maande gelede begin toe…',
  'wizard.ownWords.privacy': 'Privaat — niks word onder jou naam gestoor nie.',
  'wizard.continue': 'Gaan voort',
  'wizard.skip': 'Slaan hierdie stap oor',
  'wizard.review.title': 'Dít is wat ek verstaan',
  'wizard.review.sub': 'Maak seker dit is reg — tik op enige antwoord om dit te verander.',
  'wizard.review.situation': 'Situasie',
  'wizard.review.ownWords': 'In jou eie woorde',
  'wizard.review.submit': 'Kry my regsleiding',
  'wizard.review.note':
    'Swifty sal Namibiese reg vir jou situasie navors. Slegs algemene inligting — nie formele regsadvies nie.',

  // Guides
  'guides.library': 'Regsinligting-biblioteek',
  'guides.all': 'Alle gidse',
  'guides.close': 'Maak toe',
  'guides.tagline': 'Gratis regsinligting · Namibië',
  'guides.librarySub':
    'Gratis gidse in gewone taal oor algemene regsprobleme in Namibië — gegrond op die Grondwet, Parlementswette en die howe. Altyd beskikbaar, selfs wanneer die assistent besig is.',
  'guides.disclaimer':
    'Hierdie bladsy gee algemene regsinligting vir Namibië, nie formele regsadvies nie. Wette verander en elke situasie is anders — vir advies oor jou spesifieke saak, vra Swifty of raadpleeg ’n regspraktisyn.',

  // Language switcher
  'lang.label': 'Taal',
}

export const UI_STRINGS: Record<Lang, Record<string, string>> = { en, af }
