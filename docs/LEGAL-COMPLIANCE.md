# LEGAL-COMPLIANCE.md — Legal status of operating Swifty in Namibia

Review date: 12 June 2026 · Status: pre-launch internal assessment
**Internal working analysis — have it confirmed by a Namibian admitted legal
practitioner before public launch. This document itself is not legal advice.**

## Bottom line

Operating Swifty as a **legal information** service in Namibia is lawful today,
provided it (a) never holds itself out as a legal practitioner or law firm,
(b) keeps clear AI and "not legal advice" disclosures, and (c) treats the
document-drafting feature carefully (it sits closest to reserved legal work).
There is currently **no AI-specific regulation and no enacted general data
protection statute** in Namibia, so the governing frameworks are the Legal
Practitioners Act, general law of delict/contract, and Anthropic's usage terms.

## 1. Unauthorised practice of law — the core question

**Framework:** Legal Practitioners Act 15 of 1995. Only enrolled legal
practitioners may *practise law*, appear for others in court, or perform
reserved work for reward; holding oneself out as a practitioner is an offence.

**Analysis:**
- Providing **general legal information** (what a statute says, how a process
  works, where to get help) is **not** the practice of law. Swifty's answers,
  the intake wizard and the static guides fall in this category.
- The line is **applied advice for a specific matter for reward** and
  **drafting instruments for reward**. Swifty mitigates today by: explicit
  "general information only, not formal legal advice" disclaimers on every
  surface (input bar, answers, review screen, guides, landing footer); routing
  users to the Law Society, Legal Aid and the LAC; being free to use.
- **Document Drafter is the highest-risk feature.** Generated letters of
  demand/affidavits/agreements for a *fee* could be argued to be reserved work.
  Pre-launch requirements: keep drafting free or clearly "template/self-help";
  label outputs "DRAFT — review before use, consider a legal practitioner";
  avoid documents squarely in reserved territory (e.g. **wills, deeds, court
  process documents**) until a practitioner signs off the catalogue.

**Verdict:** information service = lawful; never use "lawyer", "attorney",
"legal practitioner", "law firm" or "advice" in marketing. "AI Paralegal
Assistant" is acceptable but always pair with the disclaimer (current UI does).

## 2. AI-specific regulation

None in force in Namibia (no equivalent of the EU AI Act). No licensing or
registration requirement to operate an AI assistant. Watch: SADC/AU model
frameworks and Namibia's digital-policy developments.

## 3. Data protection & privacy

- Namibia has **no enacted general data protection act** (a Data Protection
  Bill has circulated; not law as at this review). Constitutional privacy
  (Article 13) and common law apply.
- The **Electronic Transactions Act 4 of 2019** governs electronic
  transactions/evidence and contains consumer-protection provisions for
  e-commerce; relevant once accounts/payments exist.
- **Swifty's current architecture is privacy-strong by design:** no accounts,
  no server-side storage of conversations or names ("Private — nothing is
  stored under your name" must remain true — if matter-saving ships, add a
  privacy policy and consent at that moment).
- GBV/criminal disclosures by users are sensitive; do not log message content
  beyond operational needs, and document a retention position.

## 4. Liability exposure (delict / contract)

- Risk: a user acts on wrong output and suffers loss → negligent misstatement
  claim. Mitigations in place: prominent disclaimers, citations to sources,
  referral pathways, no fee (no contract for advice).
- **Before launch:** publish Terms of Use (limitation of liability, no
  attorney-client relationship, information-only purpose) and surface them at
  first use, not just the footer.
- Crisis content (10111/106) is good practice; keep numbers verified and
  current — a wrong emergency number is itself a liability and harm risk.

## 5. Anthropic usage-policy compliance (contractual layer)

Legal services are a **high-stakes use case** under Anthropic's Usage Policy.
Requirements and Swifty's status:
- **Disclose AI involvement** → ✓ "AI Paralegal · Namibian Law" badges,
  disclaimers throughout
- **Human oversight pathway for consequential decisions** → ✓ every answer/guide
  refers to practitioners, Legal Aid, LAC; drafter outputs say review first
- **No representation as a licensed professional** → ✓ maintained; keep it that
  way in marketing copy too

## 6. Sector items to monitor

- **Law Society of Namibia** position statements on legal-tech / unauthorised
  practice (engage them early — a pilot with a firm largely de-risks this)
- Financial-advice boundary: tax/banking answers must stay informational
  (NAMFISA regulates financial *advisory* services)
- If revenue starts: BIPA business registration, tax registration (NamRA), and
  ETA e-commerce consumer provisions

## 7. Pre-launch compliance checklist

- [ ] Namibian legal practitioner reviews this assessment + the drafter catalogue
- [ ] Terms of Use + Privacy page in-app (first-use acknowledgement)
- [ ] Marketing audit: no "advice/lawyer/firm" language anywhere public
- [ ] Drafter outputs watermarked "DRAFT — self-help template"; wills/court
      process documents excluded
- [ ] Verify 10111 / 106 / LAC / Law Society numbers quarterly
- [ ] Incident process for harmful-output reports (contact + takedown/correction)
- [ ] Engage Law Society / Legal Aid Directorate about the pilot
- [ ] Re-check Data Protection Bill status before storing any user data
