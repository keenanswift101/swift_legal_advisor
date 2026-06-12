import {
  ScaleIcon,
  ShieldIcon,
  FileTextIcon,
  ChatBubbleIcon,
  ChevronRightIcon,
  CheckIcon,
  NamibiaFlag,
} from './icons'

interface LandingPageProps {
  onStart: (mode: 'chat' | 'draft') => void
  onOpenGuides: () => void
}

const FEATURES = [
  {
    icon: ChatBubbleIcon,
    title: 'Guided, step by step',
    text: 'Answer a few simple questions about your situation — no legal jargon, no forms. Swifty listens first, then advises.',
  },
  {
    icon: ShieldIcon,
    title: 'Real Namibian law',
    text: 'Every answer is grounded in the Constitution, Acts of Parliament, Government Gazettes and case law — with sources cited.',
  },
  {
    icon: FileTextIcon,
    title: 'Documents drafted for you',
    text: 'Letters of demand, affidavits, agreements and more — generated in minutes, ready to print or download.',
  },
]

const COVERAGE = [
  'Domestic violence & protection orders',
  'Eviction & tenant rights',
  'Unfair dismissal & unpaid wages',
  'Child maintenance & custody',
  'Debt, scams & money disputes',
  'Defamation & reputation',
  'Theft, assault & police matters',
  'Contracts & everyday agreements',
]

export function LandingPage({ onStart, onOpenGuides }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white text-legal-text overflow-y-auto">
      {/* ── Nav ─────────────────────────────────────────────────────────── */}
      <nav className="max-w-5xl mx-auto flex items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-navy-800 border border-navy-700 flex items-center justify-center text-gold-400">
            <ScaleIcon className="w-5 h-5" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg font-bold tracking-wide">Swifty</span>
            <NamibiaFlag className="w-6 h-auto" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenGuides}
            className="text-sm font-medium text-legal-muted hover:text-legal-text transition-colors"
          >
            Legal guides
          </button>
          <button
            onClick={() => onStart('chat')}
            className="text-sm font-semibold bg-gold-400 hover:bg-gold-300 text-navy-950 px-5 py-2 rounded-xl transition-colors"
          >
            Get started
          </button>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 pt-16 pb-14 text-center animate-slide-up">
        <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-legal-muted border border-navy-700 rounded-full px-4 py-1.5 mb-6">
          AI Paralegal Assistant · Namibia
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold leading-tight mb-5">
          Know your rights.
          <br />
          In plain language.
        </h1>
        <p className="text-legal-muted text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-9">
          Swifty helps everyday Namibians understand the law — from eviction and
          unfair dismissal to domestic violence and maintenance — without the cost
          of a lawyer for a first answer.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => onStart('chat')}
            className="flex items-center gap-2 bg-gold-400 hover:bg-gold-300 text-navy-950 text-sm font-bold px-7 py-3.5 rounded-xl transition-all hover:-translate-y-0.5 w-full sm:w-auto justify-center"
          >
            Get legal guidance
            <ChevronRightIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => onStart('draft')}
            className="flex items-center gap-2 bg-white border border-navy-600 hover:border-gold-400 text-legal-text text-sm font-semibold px-7 py-3.5 rounded-xl transition-all hover:-translate-y-0.5 w-full sm:w-auto justify-center"
          >
            <FileTextIcon className="w-4 h-4" />
            Draft a document
          </button>
        </div>
        <p className="text-legal-muted text-xs mt-5">
          Free to use · Private — no account needed · Sources cited in every answer
        </p>
      </section>

      {/* ── Features ────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="grid sm:grid-cols-3 gap-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="bg-navy-900 border border-navy-700 rounded-2xl p-6 text-left"
            >
              <span className="w-10 h-10 rounded-xl bg-white border border-navy-700 text-gold-400 flex items-center justify-center mb-4">
                <f.icon className="w-5 h-5" />
              </span>
              <h3 className="font-serif text-lg font-bold mb-1.5">{f.title}</h3>
              <p className="text-legal-muted text-sm leading-relaxed">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Coverage ────────────────────────────────────────────────────── */}
      <section className="border-t border-navy-700 bg-navy-900">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <h2 className="font-serif text-2xl font-bold text-center mb-2">
            Help with everyday legal problems
          </h2>
          <p className="text-legal-muted text-sm text-center mb-8 max-w-lg mx-auto">
            Built for the situations Namibians face most — at home, at work and in
            the community.
          </p>
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-3 max-w-2xl mx-auto">
            {COVERAGE.map((item) => (
              <div key={item} className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-gold-400/10 border border-gold-500/40 text-gold-400 flex items-center justify-center flex-shrink-0">
                  <CheckIcon className="w-3 h-3" />
                </span>
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button
              onClick={() => onStart('chat')}
              className="inline-flex items-center gap-2 bg-gold-400 hover:bg-gold-300 text-navy-950 text-sm font-bold px-7 py-3.5 rounded-xl transition-all hover:-translate-y-0.5"
            >
              Start now — it&rsquo;s free
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="border-t border-navy-700">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-serif font-bold">
            <ScaleIcon className="w-4 h-4 text-gold-400" />
            Swifty
            <span className="font-sans font-normal text-legal-muted text-xs">
              · Paralegal Assistant · Namibia
            </span>
          </div>
          <p className="text-legal-muted text-[11px] text-center sm:text-right leading-relaxed max-w-md">
            Swifty provides general legal information, not formal legal advice. For
            binding advice consult a legal practitioner registered with the Law
            Society of Namibia.
          </p>
        </div>
      </footer>
    </div>
  )
}
