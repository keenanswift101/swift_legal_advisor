// ─────────────────────────────────────────────────────────────────────────────
//  Guided Case Intake — flow definition
//
//  Each category models an everyday legal situation in plain language.
//  Questions are tap-to-answer; the wizard composes a structured first-person
//  summary that is sent to the agent as the opening message.
// ─────────────────────────────────────────────────────────────────────────────

import type { ComponentType } from 'react'
import {
  ShieldIcon,
  HomeIcon,
  BriefcaseIcon,
  UsersIcon,
  BanknotesIcon,
  MegaphoneIcon,
  ExclamationIcon,
  ChatBubbleIcon,
} from '../components/icons'

export interface IntakeOption {
  id: string
  label: string
  /** Marks an answer that signals immediate danger — escalates the crisis banner */
  danger?: boolean
}

export interface IntakeQuestion {
  id: string
  /** The question shown on the step screen */
  question: string
  /** Short label used on the review screen and in the composed message */
  summaryLabel: string
  hint?: string
  options: IntakeOption[]
}

export interface CrisisInfo {
  message: string
  lines: { label: string; number: string }[]
}

export interface IntakeCategory {
  id: string
  label: string
  description: string
  icon: ComponentType<{ className?: string }>
  crisis?: CrisisInfo
  questions: IntakeQuestion[]
}

export const INTAKE_CATEGORIES: IntakeCategory[] = [
  {
    id: 'safety',
    label: 'Safety & domestic violence',
    description: 'Abuse, threats, GBV, protection orders',
    icon: ShieldIcon,
    crisis: {
      message: 'If you are in immediate danger, please call for help right now.',
      lines: [
        { label: 'Police emergency', number: '10111' },
        { label: 'GBV Helpline (free)', number: '106' },
      ],
    },
    questions: [
      {
        id: 'who',
        question: 'Who is the person hurting or threatening you?',
        summaryLabel: 'The person involved',
        options: [
          { id: 'partner', label: 'My husband, wife or partner' },
          { id: 'ex', label: 'An ex-partner' },
          { id: 'family', label: 'A family member' },
          { id: 'known', label: 'Someone else I know' },
          { id: 'stranger', label: 'A stranger' },
        ],
      },
      {
        id: 'danger',
        question: 'Are you or your children in danger right now?',
        summaryLabel: 'Current danger',
        options: [
          { id: 'now', label: 'Yes — I am in danger right now', danger: true },
          { id: 'recurring', label: "I'm safe at the moment, but it keeps happening" },
          { id: 'past', label: "It happened before and I'm afraid it will again" },
          { id: 'other-person', label: "I'm asking for someone else" },
        ],
      },
      {
        id: 'children',
        question: 'Are children involved or affected?',
        summaryLabel: 'Children involved',
        options: [
          { id: 'live-with', label: 'Yes — they live with us' },
          { id: 'elsewhere', label: 'Yes — but they live elsewhere' },
          { id: 'none', label: 'No children involved' },
        ],
      },
      {
        id: 'goal',
        question: 'What do you most need right now?',
        summaryLabel: 'What I need',
        options: [
          { id: 'protection-order', label: 'A protection order to keep them away' },
          { id: 'report', label: 'To know how to report this to the police' },
          { id: 'leave', label: 'To leave safely with my children' },
          { id: 'rights', label: 'To understand my rights first' },
        ],
      },
    ],
  },
  {
    id: 'housing',
    label: 'Housing & eviction',
    description: 'Eviction, deposits, rent disputes, lockouts',
    icon: HomeIcon,
    questions: [
      {
        id: 'issue',
        question: 'What is happening with your home?',
        summaryLabel: 'The problem',
        options: [
          { id: 'eviction', label: "I'm being evicted or told to leave" },
          { id: 'deposit', label: 'My deposit is being kept from me' },
          { id: 'rent', label: 'Unfair rent increase or charges' },
          { id: 'conditions', label: 'Repairs or living conditions problems' },
          { id: 'lockout', label: 'Landlord locked me out or took my things' },
        ],
      },
      {
        id: 'writing',
        question: 'Did you get anything in writing?',
        summaryLabel: 'Paperwork',
        options: [
          { id: 'notice', label: 'Yes — a written notice or letter' },
          { id: 'verbal', label: 'Only verbal or SMS/WhatsApp' },
          { id: 'nothing', label: 'Nothing at all' },
          { id: 'lease', label: 'I have a written lease agreement' },
        ],
      },
      {
        id: 'urgency',
        question: 'How urgent is your situation?',
        summaryLabel: 'Urgency',
        options: [
          { id: 'days', label: 'I must leave within days', danger: true },
          { id: 'month', label: 'Within this month' },
          { id: 'ongoing', label: 'No deadline, but the dispute is ongoing' },
        ],
      },
      {
        id: 'goal',
        question: 'What outcome do you want?',
        summaryLabel: 'What I want',
        options: [
          { id: 'stay', label: 'To stay in my home' },
          { id: 'money-back', label: 'To get my deposit or money back' },
          { id: 'fair-exit', label: 'To leave, but on fair terms' },
          { id: 'legality', label: 'To know if what they did is legal' },
        ],
      },
    ],
  },
  {
    id: 'work',
    label: 'Work & dismissal',
    description: 'Unfair dismissal, unpaid wages, hearings',
    icon: BriefcaseIcon,
    questions: [
      {
        id: 'issue',
        question: 'What happened at work?',
        summaryLabel: 'What happened',
        options: [
          { id: 'dismissed', label: 'I was dismissed or fired' },
          { id: 'forced-resign', label: 'I was forced to resign' },
          { id: 'unpaid', label: 'Not paid my wages or overtime' },
          { id: 'hearing', label: 'I have a disciplinary hearing coming' },
          { id: 'treatment', label: 'Harassment or unfair treatment' },
        ],
      },
      {
        id: 'process',
        question: 'Was there a hearing or written notice?',
        summaryLabel: 'Process followed',
        options: [
          { id: 'hearing-held', label: 'Yes — a hearing was held' },
          { id: 'notice-only', label: 'Written notice, but no hearing' },
          { id: 'nothing', label: 'Nothing — it was all verbal' },
        ],
      },
      {
        id: 'when',
        question: 'How long ago did this happen?',
        summaryLabel: 'When it happened',
        hint: 'Labour disputes have time limits, so this matters.',
        options: [
          { id: 'recent', label: 'Within the last 30 days' },
          { id: 'months', label: '1 to 6 months ago' },
          { id: 'older', label: 'Longer than 6 months ago' },
        ],
      },
      {
        id: 'goal',
        question: 'What outcome do you want?',
        summaryLabel: 'What I want',
        options: [
          { id: 'job-back', label: 'To get my job back' },
          { id: 'compensation', label: 'Compensation or my unpaid wages' },
          { id: 'file-case', label: 'To file a case with the Labour Commissioner' },
          { id: 'rights', label: 'To understand my rights first' },
        ],
      },
    ],
  },
  {
    id: 'family',
    label: 'Family & children',
    description: 'Maintenance, custody, divorce, marriage rights',
    icon: UsersIcon,
    questions: [
      {
        id: 'issue',
        question: 'What is the situation about?',
        summaryLabel: 'The situation',
        options: [
          { id: 'maintenance', label: 'Child maintenance is not being paid' },
          { id: 'custody', label: 'Custody of or access to my child' },
          { id: 'divorce', label: 'Divorce or separation' },
          { id: 'marriage', label: 'Marriage rights (in/out of community of property)' },
        ],
      },
      {
        id: 'order',
        question: 'Is there an existing court order?',
        summaryLabel: 'Court order',
        options: [
          { id: 'ignored', label: 'Yes — but it is not being followed' },
          { id: 'none', label: 'No order yet' },
          { id: 'unsure', label: "I'm not sure" },
        ],
      },
      {
        id: 'goal',
        question: 'What do you most want to achieve?',
        summaryLabel: 'What I want',
        options: [
          { id: 'maintenance-paid', label: 'To get maintenance paid' },
          { id: 'children', label: 'To see or keep my children' },
          { id: 'start-divorce', label: 'To start a divorce' },
          { id: 'rights', label: 'To understand my rights first' },
        ],
      },
    ],
  },
  {
    id: 'money',
    label: 'Money & debt',
    description: 'Money owed, debt collectors, scams',
    icon: BanknotesIcon,
    questions: [
      {
        id: 'issue',
        question: "What's the money problem?",
        summaryLabel: 'The problem',
        options: [
          { id: 'owed', label: 'Someone owes me money and won’t pay' },
          { id: 'debt', label: 'I owe money and I’m being threatened' },
          { id: 'goods', label: 'A dispute over goods I bought or sold' },
          { id: 'scam', label: 'I was scammed or defrauded' },
        ],
      },
      {
        id: 'amount',
        question: 'Roughly how much money is involved?',
        summaryLabel: 'Amount involved',
        hint: 'This decides which court can handle your case.',
        options: [
          { id: 'small', label: 'Under N$25,000' },
          { id: 'medium', label: 'N$25,000 to N$100,000' },
          { id: 'large', label: 'More than N$100,000' },
          { id: 'unsure', label: "I'm not sure" },
        ],
      },
      {
        id: 'goal',
        question: 'What do you want to happen?',
        summaryLabel: 'What I want',
        options: [
          { id: 'money-back', label: 'To get my money back' },
          { id: 'stop-harassment', label: 'To stop harassment from collectors' },
          { id: 'court', label: 'To take them to court' },
          { id: 'options', label: 'To understand my options first' },
        ],
      },
    ],
  },
  {
    id: 'defamation',
    label: 'Reputation & defamation',
    description: 'Lies, rumours, social media attacks',
    icon: MegaphoneIcon,
    questions: [
      {
        id: 'where',
        question: 'Where is it happening?',
        summaryLabel: 'Where it happens',
        options: [
          { id: 'social', label: 'Social media (Facebook, WhatsApp, TikTok)' },
          { id: 'spoken', label: 'Spoken — in my community or workplace' },
          { id: 'media', label: 'Newspaper, radio or other media' },
          { id: 'messages', label: 'Private messages sent to other people' },
        ],
      },
      {
        id: 'what',
        question: 'What is being said about you?',
        summaryLabel: 'What is being said',
        options: [
          { id: 'crime', label: 'False accusations of a crime' },
          { id: 'private-life', label: 'Lies about my private life' },
          { id: 'business', label: 'False statements hurting my business or job' },
          { id: 'other', label: 'Something else damaging' },
        ],
      },
      {
        id: 'goal',
        question: 'What do you want to happen?',
        summaryLabel: 'What I want',
        options: [
          { id: 'stop', label: 'Make it stop and get a retraction or apology' },
          { id: 'damages', label: 'Sue for damages' },
          { id: 'criminal', label: 'Report it as a criminal matter' },
          { id: 'case-check', label: 'To know if I even have a case' },
        ],
      },
    ],
  },
  {
    id: 'crime',
    label: 'Crime & police',
    description: 'Theft, assault, arrests, police inaction',
    icon: ExclamationIcon,
    questions: [
      {
        id: 'situation',
        question: 'What is your situation?',
        summaryLabel: 'My situation',
        options: [
          { id: 'theft-victim', label: "I'm a victim of theft or robbery" },
          { id: 'assaulted', label: 'I was assaulted or attacked' },
          { id: 'accused', label: "I've been accused or arrested" },
          { id: 'police-inaction', label: "Police won't help with my case" },
        ],
      },
      {
        id: 'reported',
        question: 'Has it been reported to the police?',
        summaryLabel: 'Police report',
        options: [
          { id: 'case-open', label: 'Yes — a case was opened' },
          { id: 'no-progress', label: 'Reported, but nothing is happening' },
          { id: 'not-yet', label: 'Not yet' },
        ],
      },
      {
        id: 'goal',
        question: 'What do you need most?',
        summaryLabel: 'What I need',
        options: [
          { id: 'open-case', label: 'To open or push my case forward' },
          { id: 'bail-help', label: 'Bail or legal help for someone accused' },
          { id: 'protection', label: 'Protection from the person involved' },
          { id: 'process', label: 'To understand the process' },
        ],
      },
    ],
  },
  {
    id: 'other',
    label: 'Something else',
    description: 'Describe your situation in your own words',
    icon: ChatBubbleIcon,
    questions: [],
  },
]

export function getCategory(id: string): IntakeCategory | undefined {
  return INTAKE_CATEGORIES.find((c) => c.id === id)
}

/**
 * Compose the structured first-person message the agent receives.
 * Reads naturally in the chat while carrying the keywords the
 * domain classifier and retriever need.
 */
export function composeIntakeMessage(
  category: IntakeCategory,
  answers: Record<string, string>,
  ownWords: string,
): string {
  const lines: string[] = [`I need help with: ${category.label}.`]

  for (const q of category.questions) {
    const optionId = answers[q.id]
    if (!optionId) continue
    const option = q.options.find((o) => o.id === optionId)
    if (option) lines.push(`${q.summaryLabel}: ${option.label}.`)
  }

  const detail = ownWords.trim()
  if (detail) {
    lines.push('')
    lines.push(`In my own words: ${detail}`)
  }

  lines.push('')
  lines.push(
    'Please explain my rights and the practical steps I should take under Namibian law, in plain language.',
  )

  return lines.join('\n')
}
