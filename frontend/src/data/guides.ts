// ─────────────────────────────────────────────────────────────────────────────
//  Static legal info guides — cached, public, always available.
//
//  Content is distilled from the project corpus (NamibLII statute texts,
//  Constitution, case law digest) at build time. One page per topic,
//  deliberately high-level: enough to orient someone, never a substitute
//  for tailored guidance.
//
//  Guide ids match the intake category ids so a user's case links directly
//  to the right guide.
// ─────────────────────────────────────────────────────────────────────────────

export interface Guide {
  id: string
  title: string
  summary: string
  content: string
}

export const GUIDES: Guide[] = [
  {
    id: 'safety',
    title: 'Domestic violence & protection orders',
    summary: 'Your safety, protection orders, and how to report abuse',
    content: `
## The basics

Domestic violence is a crime in Namibia. The **Combating of Domestic Violence Act 4 of 2003** protects people in a "domestic relationship" — spouses, partners, ex-partners, family members, and people who share a home or have a child together. It covers physical, sexual, economic, verbal and psychological abuse, intimidation and harassment.

## Key protections

- **Protection order** — any magistrates' court can order an abuser to stop the abuse, stay away from you, your home or work, and even leave a shared home. An **interim protection order** can be granted quickly, before the abuser is even heard, if you are at risk.
- Breaking a protection order is a **criminal offence** — the police can arrest the person.
- The **Combating of Rape Act 8 of 2000** sets strong minimum sentences and makes clear that marriage is no defence to rape.

## What you can do now

1. If you are in immediate danger, call the **Police on 10111** or the free **GBV Helpline on 106**.
2. Report at any police station — ask for the **GBV Protection Unit**. You can ask for a female officer.
3. Apply for a protection order at your nearest **magistrates' court**. No lawyer is needed and there is no fee.
4. Keep evidence where safe to do so: photos of injuries, threatening messages, names of witnesses, dates.
5. A doctor or clinic can document injuries — ask for the medical report.

## Where to get help

- Police emergency: **10111**
- GBV Helpline (free, 24h): **106**
- Legal Assistance Centre (LAC), Windhoek: **+264 61 223 356**
- Directorate of Legal Aid — free legal representation if you qualify
`,
  },
  {
    id: 'housing',
    title: 'Eviction & tenant rights',
    summary: 'Evictions, notice, deposits and lockouts',
    content: `
## The basics

A landlord **cannot evict you without a court order**. Even if your lease has ended or rent is unpaid, the landlord must go to court — usually the **magistrates' court** — and you have the right to oppose the application and be heard.

## Key protections

- **Self-help eviction is unlawful.** Changing the locks, removing your belongings, or cutting water and electricity to force you out is illegal. The courts can order your possession restored immediately (a *spoliation order*), often within days.
- **Notice** — for a month-to-month tenancy, the common law generally requires at least **one calendar month's notice**, and the lease may require more.
- **Deposits** — your deposit remains your money. The landlord may only deduct fair amounts for actual damage or unpaid rent, and should account for what was deducted.
- The **Namibian Constitution (Article 16)** protects property rights — including a tenant's right not to be arbitrarily deprived of possession.

## What you can do now

1. Ask for everything **in writing** — notice, reasons, amounts claimed.
2. Don't leave just because you were told to verbally. Wait for proper notice; only a court can order eviction.
3. If you were locked out or your things were removed, go to the magistrates' court (or get help) about an urgent **spoliation order**.
4. Keep proof of rent payments, your lease, photos of the property's condition, and all messages.
5. If the deposit is withheld unfairly, send a written demand; the next step is a claim in the magistrates' court.

## Where to get help

- Magistrates' court (clerk of the civil court) in your district
- Legal Assistance Centre (LAC): **+264 61 223 356**
- Directorate of Legal Aid — free legal help if you qualify
`,
  },
  {
    id: 'work',
    title: 'Unfair dismissal & worker rights',
    summary: 'Dismissal, hearings, wages, overtime and the Labour Commissioner',
    content: `
## The basics

The **Labour Act 11 of 2007** protects every employee in Namibia. A dismissal must be both **substantively fair** (a valid reason) and **procedurally fair** (a proper hearing where you could state your case). A dismissal without a valid reason **and** a fair procedure is unfair — and the Labour Commissioner can order reinstatement or compensation.

## Key protections

- **Hearing first** — you are entitled to know the allegations against you and to respond before being dismissed.
- **Working hours** — ordinarily a maximum of **45 hours per week**; overtime only by agreement, capped at 10 hours a week, paid at **1.5× your basic wage** (double on Sundays and public holidays).
- **Leave** — 4 consecutive weeks of annual leave per cycle; paid sick leave; maternity protections.
- **No discrimination** — dismissal or unequal treatment based on sex, pregnancy, HIV status, race, religion or union membership is prohibited (s 5).
- Resigning because of sexual harassment can count as **constructive dismissal**.

## What you can do now

1. **Act quickly — labour disputes have strict time limits** (generally six months from dismissal).
2. Write down what happened with dates; keep your contract, payslips and any written warnings.
3. Ask the employer for written reasons for the dismissal.
4. Refer a dispute to the **Office of the Labour Commissioner** — conciliation and arbitration are free and no lawyer is required.
5. For unpaid wages or overtime, the labour inspectorate at the **Ministry of Labour** can also assist.

## Where to get help

- Office of the Labour Commissioner (district labour offices)
- Ministry of Industrialisation, Trade and Employment Creation — labour inspectors
- Your trade union, if you belong to one
- Legal Assistance Centre (LAC): **+264 61 223 356**
`,
  },
  {
    id: 'family',
    title: 'Maintenance, custody & family law',
    summary: 'Child maintenance, custody, divorce and marriage rights',
    content: `
## The basics

**Both parents must support their children** — married or not. The **Maintenance Act 9 of 2003** lets any parent or caregiver apply at the **maintenance court** (in every magistrates' court) for a maintenance order. It is free and you do not need a lawyer.

## Key protections

- **Maintenance orders** — the court can order monthly payments, and can order an employer to deduct maintenance straight from the other parent's salary.
- **Not paying a maintenance order is a criminal offence** — report non-payment to the maintenance officer.
- The **Child Care and Protection Act 3 of 2015** puts the **best interests of the child** first in custody and access decisions, and children's courts can intervene where a child needs protection.
- The **Married Persons Equality Act 1 of 1996** gives spouses equal power in a civil marriage — including over joint property.

## What you can do now

1. For unpaid maintenance: go to the **maintenance court** at your magistrates' court with the child's birth certificate, your expenses (receipts) and what you know of the other parent's income and workplace.
2. If an order exists and isn't being paid, ask the maintenance officer to **enforce** it — the court can attach wages or property.
3. For custody or access problems, the clerk of the children's court or a social worker can assist.
4. Keep records of payments, expenses and communication.

## Where to get help

- Maintenance officer at your nearest magistrates' court (free)
- Ministry of Gender Equality and Child Welfare — social workers
- Legal Assistance Centre (LAC): **+264 61 223 356**
- Directorate of Legal Aid for divorce or custody disputes if you qualify
`,
  },
  {
    id: 'money',
    title: 'Debt, money claims & scams',
    summary: 'Money owed to you, debt collectors and fraud',
    content: `
## The basics

Most money disputes are decided in the **magistrates' courts** — they handle the bulk of civil claims in Namibia. Bigger claims go to the **High Court**. Court is the last step: a clear written demand resolves many disputes.

## Key protections

- **Letter of demand** — a written demand stating what is owed, why, and a deadline (commonly 7–14 days) is usually the first formal step, and is often required before summons.
- **Prescription** — most ordinary debts **expire after three years** if the creditor takes no legal action (Prescription Act 68 of 1969). Don't sit on a claim.
- **Debt collectors may not harass you** — threats, intimidation or seizing property without a court order are unlawful. Only a court (through the messenger of court) can attach property.
- **Fraud and scams are crimes** — report them to the police; you can also sue to recover your money.

## What you can do now

1. Put the debt in writing: who, what amount, when it was due, and proof (messages, receipts, agreements).
2. Send a **letter of demand** with a clear deadline. Keep proof that it was delivered.
3. If unpaid, ask the **clerk of the magistrates' court** about issuing a summons — for straightforward claims you can do much of this without a lawyer.
4. Being harassed over a debt you owe? Ask for a written statement of account, and report threats to the police.
5. For scams, open a criminal case at the police and notify your bank immediately — speed matters.

## Where to get help

- Clerk of the civil court at your magistrates' court
- Namibian Police (fraud) and your bank's fraud line
- Legal Assistance Centre (LAC): **+264 61 223 356**
`,
  },
  {
    id: 'defamation',
    title: 'Defamation & your reputation',
    summary: 'False statements, social media attacks and your remedies',
    content: `
## The basics

Defamation is the **unlawful publication of a statement that damages someone's reputation**. "Publication" includes WhatsApp messages, Facebook posts, and words spoken to even one other person. Namibian courts apply the common law of defamation, and the **Constitution (Article 8)** protects human dignity.

## Key points

- You generally need to show the statement was **published**, referred to **you**, and was **defamatory** (lowered your standing in the eyes of others).
- The other side may raise defences: that the statement was **true and in the public interest**, **fair comment** on facts, or made on a **privileged occasion**.
- Remedies include **damages** (money), an **interdict** (court order to stop or remove the statements), and a **retraction or apology**.
- Insulting or degrading someone can also be the crime of *crimen injuria*, which you can report to the police.

## What you can do now

1. **Preserve the evidence** — take screenshots showing the post, the author, the date and who could see it. Do this before it is deleted.
2. Identify witnesses who saw or heard the statements.
3. Send a **written demand** that the person remove the statements, stop, and apologise — often this alone works.
4. If it continues, get legal advice on a damages claim or an urgent interdict; serious cases of harassment may also support a protection order.
5. Avoid replying with insults of your own — it weakens your case.

## Where to get help

- Legal Assistance Centre (LAC): **+264 61 223 356**
- A legal practitioner (Law Society of Namibia can refer: **+264 61 218 202**)
- Police, for *crimen injuria* or harassment
`,
  },
  {
    id: 'crime',
    title: 'Crime, police & your rights',
    summary: 'Reporting crime, arrests, bail and police inaction',
    content: `
## The basics

Criminal cases in Namibia are prosecuted by the **Prosecutor-General's office** under the **Criminal Procedure Act 51 of 1977**. Whether you are a **victim** or an **accused**, the Constitution gives you rights the police must respect.

## If you are a victim

- Report at any police station. You are entitled to a **case (CR) number** — keep it and use it to follow up.
- Ask for the investigating officer's name and contact details.
- If nothing happens, escalate in writing to the **station commander**, then the regional commander; the **Ombudsman** investigates police failures and abuse of power.

## If you are arrested or accused

- You have the right to **remain silent**, to be told the reason for your arrest, and to a **lawyer** — through the **Directorate of Legal Aid** if you cannot afford one (Constitution, Article 12 — fair trial).
- You must be brought before a magistrate **within 48 hours** of arrest.
- You may apply for **bail**; conditions depend on the offence and your circumstances.
- Do not sign statements you do not understand or that are not in your words.

## What you can do now

1. Victims: keep your CR number, a copy of your statement, and a record of every follow-up.
2. Accused or their family: contact the **Directorate of Legal Aid** at the nearest magistrates' court as soon as possible.
3. Complaints about police conduct can go to the station commander, the Police Professional Standards unit, or the **Ombudsman**.

## Where to get help

- Police emergency: **10111**
- Directorate of Legal Aid — at magistrates' courts, free if you qualify
- Office of the Ombudsman, Windhoek
- Legal Assistance Centre (LAC): **+264 61 223 356**
`,
  },
  {
    id: 'other',
    title: 'Courts, legal aid & where to start',
    summary: 'How the Namibian legal system works and where to get free help',
    content: `
## The court system, in one minute

- **Magistrates' courts** — in every district; handle most criminal cases and most everyday civil disputes, plus maintenance and protection orders. This is where most people start.
- **High Court** (Windhoek and Oshakati) — bigger civil claims, serious crimes, appeals from magistrates' courts, divorce.
- **Supreme Court** — the highest court; its decisions bind all other courts.
- **Labour Court** — employment disputes, after the Labour Commissioner process.
- **Community courts** — customary law disputes within traditional communities.

The **Namibian Constitution is the supreme law** — every law and every official action must comply with it, and **Article 25** lets you approach a court directly when your fundamental rights are violated.

## Free and low-cost help

- **Directorate of Legal Aid** (Ministry of Justice) — free legal representation in criminal and some civil matters if your income is below the threshold. Apply at any magistrates' court.
- **Legal Assistance Centre (LAC)** — public-interest law centre in Windhoek: **+264 61 223 356**, lac.org.na
- **Office of the Ombudsman** — free investigation of rights violations and government maladministration.
- **Law Society of Namibia** — referrals to private legal practitioners: **+264 61 218 202**.
- **Clerks of the court** — at every magistrates' court; they help the public complete maintenance, protection-order and small civil claim forms for free.

## Practical tips for any legal problem

1. **Write everything down** early — dates, names, what was said.
2. **Keep documents** — contracts, receipts, messages, photos.
3. **Mind the deadlines** — labour disputes (6 months) and debt claims (3 years) expire.
4. Put requests and demands **in writing** and keep proof of delivery.
`,
  },
]

export function getGuide(id: string): Guide | undefined {
  return GUIDES.find((g) => g.id === id)
}

/** Map the agent's legal domain classification to the closest guide. */
export const DOMAIN_TO_GUIDE: Record<string, string> = {
  criminal: 'crime',
  family: 'family',
  property: 'housing',
  labour: 'work',
  banking: 'money',
  tax: 'money',
  corporate: 'money',
  constitutional: 'other',
  general: 'other',
}
