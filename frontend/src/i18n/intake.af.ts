// ─────────────────────────────────────────────────────────────────────────────
//  Afrikaans overlay for the intake wizard.
//
//  Keys mirror data/intake.ts ids — only translated TEXT lives here.
//  This file is the template translators receive for Oshiwambo, Otjiherero
//  and Khoekhoegowab: copy as intake.<lang>.ts, translate values only.
//  Untranslated entries automatically fall back to English.
// ─────────────────────────────────────────────────────────────────────────────

export interface IntakeOverlay {
  [categoryId: string]: {
    label?: string
    description?: string
    crisis?: { message?: string; lineLabels?: string[] }
    questions?: {
      [questionId: string]: {
        question?: string
        summaryLabel?: string
        hint?: string
        options?: { [optionId: string]: string }
      }
    }
  }
}

export const INTAKE_AF: IntakeOverlay = {
  safety: {
    label: 'Veiligheid & huishoudelike geweld',
    description: 'Mishandeling, dreigemente, GGW, beskermingsbevele',
    crisis: {
      message: 'As jy in onmiddellike gevaar is, bel asseblief nou dadelik vir hulp.',
      lineLabels: ['Polisie-noodlyn', 'GGW-hulplyn (gratis)'],
    },
    questions: {
      who: {
        question: 'Wie is die persoon wat jou seermaak of dreig?',
        summaryLabel: 'Die persoon betrokke',
        options: {
          partner: 'My man, vrou of lewensmaat',
          ex: '’n Gewese maat',
          family: '’n Familielid',
          known: 'Iemand anders wat ek ken',
          stranger: '’n Vreemdeling',
        },
      },
      danger: {
        question: 'Is jy of jou kinders nou in gevaar?',
        summaryLabel: 'Huidige gevaar',
        options: {
          now: 'Ja — ek is nou in gevaar',
          recurring: 'Ek is op die oomblik veilig, maar dit hou aan gebeur',
          past: 'Dit het voorheen gebeur en ek is bang dit gebeur weer',
          'other-person': 'Ek vra vir iemand anders',
        },
      },
      children: {
        question: 'Is daar kinders betrokke of geraak?',
        summaryLabel: 'Kinders betrokke',
        options: {
          'live-with': 'Ja — hulle woon by ons',
          elsewhere: 'Ja — maar hulle woon elders',
          none: 'Geen kinders betrokke nie',
        },
      },
      goal: {
        question: 'Wat het jy nou die nodigste?',
        summaryLabel: 'Wat ek nodig het',
        options: {
          'protection-order': '’n Beskermingsbevel om hulle weg te hou',
          report: 'Om te weet hoe om dit by die polisie aan te meld',
          leave: 'Om veilig saam met my kinders weg te kom',
          rights: 'Om eers my regte te verstaan',
        },
      },
    },
  },

  housing: {
    label: 'Behuising & uitsetting',
    description: 'Uitsetting, deposito’s, huurgeskille, uitsluiting',
    questions: {
      issue: {
        question: 'Wat gebeur met jou woonplek?',
        summaryLabel: 'Die probleem',
        options: {
          eviction: 'Ek word uitgesit of aangesê om te trek',
          deposit: 'My deposito word van my weerhou',
          rent: 'Onbillike huurverhoging of heffings',
          conditions: 'Probleme met herstelwerk of woontoestande',
          lockout: 'Die verhuurder het my uitgesluit of my goed gevat',
        },
      },
      writing: {
        question: 'Het jy enigiets op skrif gekry?',
        summaryLabel: 'Papierwerk',
        options: {
          notice: 'Ja — ’n geskrewe kennisgewing of brief',
          verbal: 'Net mondelings of SMS/WhatsApp',
          nothing: 'Glad niks nie',
          lease: 'Ek het ’n geskrewe huurkontrak',
        },
      },
      urgency: {
        question: 'Hoe dringend is jou situasie?',
        summaryLabel: 'Dringendheid',
        options: {
          days: 'Ek moet binne dae trek',
          month: 'Binne hierdie maand',
          ongoing: 'Geen sperdatum nie, maar die geskil duur voort',
        },
      },
      goal: {
        question: 'Watter uitkoms wil jy hê?',
        summaryLabel: 'Wat ek wil hê',
        options: {
          stay: 'Om in my woonplek te bly',
          'money-back': 'Om my deposito of geld terug te kry',
          'fair-exit': 'Om te trek, maar op billike voorwaardes',
          legality: 'Om te weet of wat hulle gedoen het wettig is',
        },
      },
    },
  },

  work: {
    label: 'Werk & ontslag',
    description: 'Onbillike ontslag, onbetaalde lone, verhore',
    questions: {
      issue: {
        question: 'Wat het by die werk gebeur?',
        summaryLabel: 'Wat gebeur het',
        options: {
          dismissed: 'Ek is ontslaan of afgedank',
          'forced-resign': 'Ek is gedwing om te bedank',
          unpaid: 'My lone of oortyd is nie betaal nie',
          hearing: 'Ek het ’n dissiplinêre verhoor wat voorlê',
          treatment: 'Teistering of onbillike behandeling',
        },
      },
      process: {
        question: 'Was daar ’n verhoor of geskrewe kennisgewing?',
        summaryLabel: 'Proses gevolg',
        options: {
          'hearing-held': 'Ja — ’n verhoor is gehou',
          'notice-only': 'Geskrewe kennisgewing, maar geen verhoor nie',
          nothing: 'Niks — alles was mondelings',
        },
      },
      when: {
        question: 'Hoe lank gelede het dit gebeur?',
        summaryLabel: 'Wanneer dit gebeur het',
        hint: 'Arbeidsgeskille het tydsbeperkings, daarom is dit belangrik.',
        options: {
          recent: 'Binne die laaste 30 dae',
          months: '1 tot 6 maande gelede',
          older: 'Langer as 6 maande gelede',
        },
      },
      goal: {
        question: 'Watter uitkoms wil jy hê?',
        summaryLabel: 'Wat ek wil hê',
        options: {
          'job-back': 'Om my werk terug te kry',
          compensation: 'Vergoeding of my onbetaalde lone',
          'file-case': '’n Saak by die Arbeidskommissaris aanhangig maak',
          rights: 'Om eers my regte te verstaan',
        },
      },
    },
  },

  family: {
    label: 'Familie & kinders',
    description: 'Onderhoud, toesig, egskeiding, huweliksregte',
    questions: {
      issue: {
        question: 'Waaroor gaan die situasie?',
        summaryLabel: 'Die situasie',
        options: {
          maintenance: 'Kinderonderhoud word nie betaal nie',
          custody: 'Toesig oor of toegang tot my kind',
          divorce: 'Egskeiding of skeiding',
          marriage: 'Huweliksregte (binne/buite gemeenskap van goedere)',
        },
      },
      order: {
        question: 'Is daar ’n bestaande hofbevel?',
        summaryLabel: 'Hofbevel',
        options: {
          ignored: 'Ja — maar dit word nie nagekom nie',
          none: 'Nog geen bevel nie',
          unsure: 'Ek is nie seker nie',
        },
      },
      goal: {
        question: 'Wat wil jy graag bereik?',
        summaryLabel: 'Wat ek wil hê',
        options: {
          'maintenance-paid': 'Dat onderhoud betaal word',
          children: 'Om my kinders te sien of by my te hou',
          'start-divorce': 'Om ’n egskeiding te begin',
          rights: 'Om eers my regte te verstaan',
        },
      },
    },
  },

  money: {
    label: 'Geld & skuld',
    description: 'Geld verskuldig, skuldinvorderaars, bedrog',
    questions: {
      issue: {
        question: 'Wat is die geldprobleem?',
        summaryLabel: 'Die probleem',
        options: {
          owed: 'Iemand skuld my geld en wil nie betaal nie',
          debt: 'Ek skuld geld en word gedreig',
          goods: '’n Geskil oor goedere wat ek gekoop of verkoop het',
          scam: 'Ek is bedrieg of geswendel',
        },
      },
      amount: {
        question: 'Min of meer hoeveel geld is betrokke?',
        summaryLabel: 'Bedrag betrokke',
        hint: 'Dit bepaal watter hof jou saak kan hanteer.',
        options: {
          small: 'Minder as N$25,000',
          medium: 'N$25,000 tot N$100,000',
          large: 'Meer as N$100,000',
          unsure: 'Ek is nie seker nie',
        },
      },
      goal: {
        question: 'Wat wil jy hê moet gebeur?',
        summaryLabel: 'Wat ek wil hê',
        options: {
          'money-back': 'Om my geld terug te kry',
          'stop-harassment': 'Dat die teistering deur invorderaars ophou',
          court: 'Om hulle hof toe te vat',
          options: 'Om eers my opsies te verstaan',
        },
      },
    },
  },

  defamation: {
    label: 'Reputasie & laster',
    description: 'Leuens, skinderstories, sosialemedia-aanvalle',
    questions: {
      where: {
        question: 'Waar gebeur dit?',
        summaryLabel: 'Waar dit gebeur',
        options: {
          social: 'Sosiale media (Facebook, WhatsApp, TikTok)',
          spoken: 'Mondelings — in my gemeenskap of by die werk',
          media: 'Koerant, radio of ander media',
          messages: 'Privaat boodskappe wat aan ander mense gestuur word',
        },
      },
      what: {
        question: 'Wat word oor jou gesê?',
        summaryLabel: 'Wat gesê word',
        options: {
          crime: 'Vals beskuldigings van ’n misdaad',
          'private-life': 'Leuens oor my privaat lewe',
          business: 'Vals stellings wat my besigheid of werk skaad',
          other: 'Iets anders wat skade aanrig',
        },
      },
      goal: {
        question: 'Wat wil jy hê moet gebeur?',
        summaryLabel: 'Wat ek wil hê',
        options: {
          stop: 'Dat dit ophou, met ’n terugtrekking of verskoning',
          damages: 'Om vir skadevergoeding te dagvaar',
          criminal: 'Om dit as ’n kriminele saak aan te meld',
          'case-check': 'Om te weet of ek hoegenaamd ’n saak het',
        },
      },
    },
  },

  crime: {
    label: 'Misdaad & polisie',
    description: 'Diefstal, aanranding, arrestasies, polisie wat nie optree nie',
    questions: {
      situation: {
        question: 'Wat is jou situasie?',
        summaryLabel: 'My situasie',
        options: {
          'theft-victim': 'Ek is ’n slagoffer van diefstal of roof',
          assaulted: 'Ek is aangerand of aangeval',
          accused: 'Ek is aangekla of gearresteer',
          'police-inaction': 'Die polisie wil nie met my saak help nie',
        },
      },
      reported: {
        question: 'Is dit by die polisie aangemeld?',
        summaryLabel: 'Polisieverslag',
        options: {
          'case-open': 'Ja — ’n saak is geopen',
          'no-progress': 'Aangemeld, maar niks gebeur nie',
          'not-yet': 'Nog nie',
        },
      },
      goal: {
        question: 'Wat het jy die nodigste?',
        summaryLabel: 'Wat ek nodig het',
        options: {
          'open-case': 'Om my saak te open of vorentoe te stoot',
          'bail-help': 'Borgtog of regshulp vir iemand wat aangekla is',
          protection: 'Beskerming teen die persoon betrokke',
          process: 'Om die proses te verstaan',
        },
      },
    },
  },

  other: {
    label: 'Iets anders',
    description: 'Beskryf jou situasie in jou eie woorde',
  },
}
