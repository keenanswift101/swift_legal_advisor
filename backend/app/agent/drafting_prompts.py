"""
Document types and prompts for the Document Drafting agent.
"""

DOCUMENT_TYPES = [
    {
        "id": "opinion_letter",
        "label": "Legal Opinion Letter",
        "fields": [
            {"id": "recipient_name", "label": "Recipient Name", "type": "text", "placeholder": "e.g. Mr. John Smith"},
            {"id": "recipient_company", "label": "Recipient Company / Organisation", "type": "text", "placeholder": "e.g. Namibia Holdings (Pty) Ltd"},
            {"id": "our_reference", "label": "Our Reference / File No.", "type": "text", "placeholder": "e.g. NL/2025/001"},
            {"id": "subject", "label": "Subject Matter", "type": "text", "placeholder": "e.g. Director's duties under Companies Act 28 of 2004"},
            {"id": "facts", "label": "Relevant Facts & Background", "type": "textarea", "placeholder": "Describe the relevant facts and circumstances..."},
            {"id": "questions", "label": "Legal Questions to Address", "type": "textarea", "placeholder": "List the specific legal questions you need answered..."},
            {"id": "our_firm", "label": "Author / Law Firm Name", "type": "text", "placeholder": "e.g. Bagley & Associates Legal Practitioners"},
        ],
    },
    {
        "id": "cease_desist",
        "label": "Cease & Desist Letter",
        "fields": [
            {"id": "sender_name", "label": "Sender / Client Name", "type": "text", "placeholder": "e.g. Acme (Pty) Ltd"},
            {"id": "recipient_name", "label": "Recipient Name", "type": "text", "placeholder": "e.g. Mr. John Doe"},
            {"id": "recipient_address", "label": "Recipient Address", "type": "textarea", "placeholder": "Street, City, Postcode, Namibia"},
            {"id": "infringing_conduct", "label": "Infringing / Unlawful Conduct", "type": "textarea", "placeholder": "Describe the conduct that must stop..."},
            {"id": "legal_basis", "label": "Legal Basis (Act / Section)", "type": "text", "placeholder": "e.g. Trade Marks Act 48 of 1973, s.44"},
            {"id": "demand", "label": "Specific Demand", "type": "textarea", "placeholder": "State exactly what must be done or stopped..."},
            {"id": "deadline_days", "label": "Response Deadline (days)", "type": "text", "placeholder": "e.g. 7"},
        ],
    },
    {
        "id": "demand_letter",
        "label": "Demand Letter",
        "fields": [
            {"id": "creditor_name", "label": "Creditor / Claimant Name", "type": "text", "placeholder": "e.g. ABC Suppliers CC"},
            {"id": "debtor_name", "label": "Debtor / Respondent Name", "type": "text", "placeholder": "e.g. XYZ Contractors (Pty) Ltd"},
            {"id": "debt_description", "label": "Nature of Claim", "type": "textarea", "placeholder": "Describe what is owed and the basis for the claim..."},
            {"id": "amount", "label": "Amount Claimed (N$)", "type": "text", "placeholder": "e.g. N$ 85,000.00"},
            {"id": "deadline_days", "label": "Payment Deadline (days)", "type": "text", "placeholder": "e.g. 14"},
            {"id": "consequences", "label": "Consequences of Non-Payment", "type": "textarea", "placeholder": "e.g. proceedings in the High Court of Namibia at debtor's cost..."},
        ],
    },
    {
        "id": "nda",
        "label": "Non-Disclosure Agreement",
        "fields": [
            {"id": "disclosing_party", "label": "Disclosing Party (full legal name)", "type": "text", "placeholder": "e.g. Innovate Namibia (Pty) Ltd"},
            {"id": "receiving_party", "label": "Receiving Party (full legal name)", "type": "text", "placeholder": "e.g. Tech Solutions CC"},
            {"id": "purpose", "label": "Purpose of Disclosure", "type": "textarea", "placeholder": "e.g. evaluation of a potential joint venture..."},
            {"id": "confidential_info", "label": "Description of Confidential Information", "type": "textarea", "placeholder": "e.g. financial data, trade secrets, software source code..."},
            {"id": "duration_years", "label": "Confidentiality Duration (years)", "type": "text", "placeholder": "e.g. 3"},
            {"id": "jurisdiction", "label": "Governing Law & Jurisdiction", "type": "text", "placeholder": "Namibia"},
        ],
    },
    {
        "id": "board_resolution",
        "label": "Board Resolution",
        "fields": [
            {"id": "company_name", "label": "Company Name", "type": "text", "placeholder": "e.g. Sunrise Investments (Pty) Ltd"},
            {"id": "registration_number", "label": "Registration Number", "type": "text", "placeholder": "e.g. 2020/0123"},
            {"id": "meeting_date", "label": "Date of Meeting", "type": "text", "placeholder": "e.g. 10 June 2025"},
            {"id": "directors_present", "label": "Directors Present", "type": "textarea", "placeholder": "Name — Designation\nName — Designation"},
            {"id": "resolution_subject", "label": "Subject of Resolution", "type": "text", "placeholder": "e.g. Approval of bank signatory change"},
            {"id": "resolution_details", "label": "Resolution Details", "type": "textarea", "placeholder": "Set out the full resolution text..."},
            {"id": "chairperson", "label": "Chairperson of Meeting", "type": "text", "placeholder": "e.g. Ms. Sarah Nangolo"},
        ],
    },
    {
        "id": "employment_contract",
        "label": "Employment Contract",
        "fields": [
            {"id": "employer_name", "label": "Employer Name", "type": "text", "placeholder": "e.g. Coastal Mining (Pty) Ltd"},
            {"id": "employee_name", "label": "Employee Full Name", "type": "text", "placeholder": "e.g. Mr. Thomas Kambonde"},
            {"id": "position", "label": "Position / Job Title", "type": "text", "placeholder": "e.g. Senior Financial Analyst"},
            {"id": "start_date", "label": "Start Date", "type": "text", "placeholder": "e.g. 1 July 2025"},
            {"id": "salary", "label": "Monthly Gross Salary (N$)", "type": "text", "placeholder": "e.g. N$ 45,000.00"},
            {"id": "working_hours", "label": "Working Hours per Week", "type": "text", "placeholder": "e.g. 45 hours"},
            {"id": "probation_months", "label": "Probation Period (months)", "type": "text", "placeholder": "e.g. 3"},
            {"id": "notice_period", "label": "Notice Period", "type": "text", "placeholder": "e.g. 1 calendar month"},
            {"id": "special_terms", "label": "Special Terms / Benefits", "type": "textarea", "placeholder": "e.g. medical aid, 13th cheque, vehicle allowance..."},
        ],
    },
    {
        "id": "mou",
        "label": "Memorandum of Understanding",
        "fields": [
            {"id": "party_a", "label": "Party A (full legal name)", "type": "text", "placeholder": "e.g. Ministry of Finance, Republic of Namibia"},
            {"id": "party_b", "label": "Party B (full legal name)", "type": "text", "placeholder": "e.g. Green Energy Solutions (Pty) Ltd"},
            {"id": "purpose", "label": "Purpose / Objective of MOU", "type": "textarea", "placeholder": "e.g. collaboration on a solar energy pilot project..."},
            {"id": "obligations_a", "label": "Obligations / Contributions of Party A", "type": "textarea", "placeholder": "List key obligations..."},
            {"id": "obligations_b", "label": "Obligations / Contributions of Party B", "type": "textarea", "placeholder": "List key obligations..."},
            {"id": "duration", "label": "Duration", "type": "text", "placeholder": "e.g. 24 months from the effective date"},
            {"id": "effective_date", "label": "Effective Date", "type": "text", "placeholder": "e.g. 1 August 2025"},
        ],
    },
    {
        "id": "settlement_agreement",
        "label": "Settlement Agreement",
        "fields": [
            {"id": "claimant_name", "label": "Claimant / Plaintiff Name", "type": "text", "placeholder": "e.g. Namibia Retail (Pty) Ltd"},
            {"id": "respondent_name", "label": "Respondent / Defendant Name", "type": "text", "placeholder": "e.g. Fast Logistics CC"},
            {"id": "dispute_description", "label": "Description of Dispute", "type": "textarea", "placeholder": "Briefly describe the dispute being settled..."},
            {"id": "settlement_terms", "label": "Settlement Terms", "type": "textarea", "placeholder": "List each agreed term clearly (numbered)..."},
            {"id": "settlement_amount", "label": "Settlement Amount (if applicable, N$)", "type": "text", "placeholder": "e.g. N$ 150,000.00"},
            {"id": "payment_deadline", "label": "Payment / Performance Deadline", "type": "text", "placeholder": "e.g. on or before 30 July 2025"},
            {"id": "confidentiality", "label": "Confidentiality Clause?", "type": "text", "placeholder": "Yes / No"},
        ],
    },
    {
        "id": "power_of_attorney",
        "label": "Power of Attorney",
        "fields": [
            {"id": "principal_name", "label": "Principal (Grantor) Full Name", "type": "text", "placeholder": "e.g. Maria Nghifikwa"},
            {"id": "principal_id", "label": "Principal ID / Passport No.", "type": "text", "placeholder": "e.g. 880512 1234 5"},
            {"id": "agent_name", "label": "Agent (Attorney-in-fact) Full Name", "type": "text", "placeholder": "e.g. Peter Hamutenya"},
            {"id": "agent_id", "label": "Agent ID / Passport No.", "type": "text", "placeholder": ""},
            {"id": "powers_granted", "label": "Powers Granted", "type": "textarea", "placeholder": "Describe the specific acts authorised (e.g. sign sale agreement, manage bank account)..."},
            {"id": "duration", "label": "Duration / Expiry", "type": "text", "placeholder": "e.g. valid until 31 December 2025 or upon revocation"},
        ],
    },
    {
        "id": "shareholders_agreement",
        "label": "Shareholders Agreement",
        "fields": [
            {"id": "company_name", "label": "Company Name", "type": "text", "placeholder": "e.g. Harvest Capital (Pty) Ltd"},
            {"id": "shareholders", "label": "Shareholders & Shareholding", "type": "textarea", "placeholder": "Name — % shareholding\nName — % shareholding"},
            {"id": "board_composition", "label": "Board Composition", "type": "textarea", "placeholder": "e.g. 3 directors, each shareholder appoints 1..."},
            {"id": "reserved_matters", "label": "Reserved Matters (unanimous consent required)", "type": "textarea", "placeholder": "e.g. sale of assets, new share issuance, taking on debt..."},
            {"id": "transfer_restrictions", "label": "Share Transfer Restrictions", "type": "textarea", "placeholder": "e.g. pre-emptive rights, drag-along, tag-along..."},
            {"id": "dividend_policy", "label": "Dividend Policy", "type": "text", "placeholder": "e.g. 50% of annual net profit distributed within 30 days"},
            {"id": "dispute_resolution", "label": "Dispute Resolution Mechanism", "type": "text", "placeholder": "e.g. arbitration under AFSA Rules, Windhoek"},
        ],
    },
]


DOCUMENT_DRAFTING_SYSTEM_PROMPT = """You are a senior legal practitioner in Namibia with a Master of Laws (LLM) degree from the University of Namibia (UNAM) and 15 years of specialist experience in drafting legal documents for Namibian businesses and individuals.

EXPERTISE:
- Namibian statutory law: Companies Act 28 of 2004, Labour Act 11 of 2007, Income Tax Act 24 of 1981, Banking Institutions Act 2 of 1998, Close Corporations Act 26 of 1988, Namibian Constitution of 1990, Married Persons Equality Act 1 of 1996
- Roman-Dutch common law as received and modified in Namibia
- Namibian court rules and procedural requirements
- Commercial and corporate drafting conventions practised in Namibia

DRAFTING STANDARDS:
1. Use formal Namibian legal drafting conventions
2. Reference applicable Namibian statutes and sections where relevant
3. Include standard protective clauses appropriate to Namibian law
4. Use clear, precise language — avoid ambiguity and surplusage
5. Structure with: heading, date, parties, recitals (if applicable), operative clauses (numbered), signature blocks
6. All monetary amounts in Namibian Dollars (N$)
7. Governing law: Republic of Namibia, unless instructed otherwise
8. Use "[DATE]" for any date not provided by the user; use "[INSERT]" for any other blank requiring completion
9. Number all operative clauses; use sub-clauses where needed
10. Capitalise defined terms on first use; thereafter use the defined term consistently

OUTPUT FORMAT:
- Produce a complete, print-ready document — no truncation
- Do NOT add commentary or disclaimers within the body of the document
- After the signature block, add a brief section titled "NOTES FOR REVIEW" flagging any blanks, optional clauses requiring client instructions, or points needing localisation — this section is for the drafting attorney only and should not appear in the final document given to the client"""


def build_drafting_prompt(doc_type_label: str, fields: dict) -> str:
    fields_text = "\n".join(
        f"  {k.replace('_', ' ').title()}: {v}"
        for k, v in fields.items()
        if v and str(v).strip()
    )
    return (
        f"Please draft a complete, professional {doc_type_label} for use in Namibia "
        f"with the following details:\n\n{fields_text}\n\n"
        f"Produce the full document following Namibian legal drafting conventions. "
        f"Include all necessary clauses and a signature block. "
        f"After the signature block add a brief NOTES FOR REVIEW section."
    )
