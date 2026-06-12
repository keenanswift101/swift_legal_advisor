import { useMemo, useRef, useState } from 'react'
import {
  INTAKE_CATEGORIES,
  composeIntakeMessage,
  getCategory,
  type IntakeCategory,
  type IntakeQuestion,
} from '../data/intake'
import {
  ArrowLeftIcon,
  CheckIcon,
  ChevronRightIcon,
  PencilIcon,
  PhoneIcon,
  SparklesIcon,
  XIcon,
} from './icons'

interface IntakeWizardProps {
  initialCategoryId?: string | null
  onSubmit: (message: string) => void
  onCancel: () => void
}

type StepKind =
  | { kind: 'category' }
  | { kind: 'question'; question: IntakeQuestion }
  | { kind: 'ownWords' }
  | { kind: 'review' }

export function IntakeWizard({
  initialCategoryId,
  onSubmit,
  onCancel,
}: IntakeWizardProps) {
  const [categoryId, setCategoryId] = useState<string | null>(
    initialCategoryId ?? null,
  )
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [ownWords, setOwnWords] = useState('')
  // When a category is pre-selected from the welcome screen, skip the category step
  const [stepIndex, setStepIndex] = useState(initialCategoryId ? 1 : 0)
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const category = categoryId ? getCategory(categoryId) : undefined

  const steps: StepKind[] = useMemo(() => {
    const qs: StepKind[] = (category?.questions ?? []).map((question) => ({
      kind: 'question' as const,
      question,
    }))
    return [{ kind: 'category' }, ...qs, { kind: 'ownWords' }, { kind: 'review' }]
  }, [category])

  const step = steps[Math.min(stepIndex, steps.length - 1)]
  const progress = stepIndex / (steps.length - 1)
  const dangerFlagged = category?.questions.some((q) => {
    const a = answers[q.id]
    return a && q.options.find((o) => o.id === a)?.danger
  })

  const goTo = (i: number) => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current)
    setStepIndex(Math.max(0, Math.min(i, steps.length - 1)))
  }

  const selectCategory = (cat: IntakeCategory) => {
    setCategoryId(cat.id)
    setAnswers({})
    advanceTimer.current = setTimeout(() => setStepIndex(1), 200)
  }

  const selectAnswer = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }))
    // Brief pause so the selection state is visible before the next step slides in
    advanceTimer.current = setTimeout(() => {
      setStepIndex((i) => Math.min(i + 1, steps.length - 1))
    }, 240)
  }

  const handleSubmit = () => {
    if (!category) return
    onSubmit(composeIntakeMessage(category, answers, ownWords))
  }

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      {/* Progress bar */}
      <div className="flex-shrink-0 h-0.5 bg-navy-800">
        <div
          className="h-full bg-gold-400 transition-all duration-500 ease-out"
          style={{ width: `${Math.max(progress * 100, 4)}%` }}
        />
      </div>

      {/* Top bar */}
      <div className="flex-shrink-0 flex items-center justify-between px-5 py-3">
        {stepIndex > 0 ? (
          <button
            onClick={() => goTo(stepIndex - 1)}
            className="flex items-center gap-1.5 text-xs text-legal-muted hover:text-legal-text transition-colors px-2 py-1.5 -ml-2 rounded-lg hover:bg-navy-800"
          >
            <ArrowLeftIcon className="w-3.5 h-3.5" />
            Back
          </button>
        ) : (
          <span />
        )}
        <span className="text-[11px] text-legal-muted tracking-wide">
          Step {stepIndex + 1} of {steps.length}
        </span>
        <button
          onClick={onCancel}
          title="Close guided help"
          className="text-legal-muted hover:text-legal-text transition-colors p-1.5 -mr-1 rounded-lg hover:bg-navy-800"
        >
          <XIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Crisis banner — escalates if a danger answer was chosen */}
      {category?.crisis && stepIndex > 0 && (
        <div className="flex-shrink-0 px-5 pb-1 max-w-2xl mx-auto w-full">
          <div
            className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-xs leading-relaxed ${
              dangerFlagged
                ? 'bg-red-50 border-red-300 text-red-800'
                : 'bg-navy-800/70 border-navy-700 text-legal-muted'
            }`}
          >
            <PhoneIcon
              className={`w-4 h-4 mt-0.5 flex-shrink-0 ${dangerFlagged ? 'text-red-700' : 'text-gold-500'}`}
            />
            <div>
              <p className={dangerFlagged ? 'font-medium text-red-900' : ''}>
                {category.crisis.message}
              </p>
              <p className="mt-1 flex flex-wrap gap-x-4 gap-y-0.5">
                {category.crisis.lines.map((l) => (
                  <span key={l.number}>
                    {l.label}:{' '}
                    <a
                      href={`tel:${l.number}`}
                      className={`font-semibold underline underline-offset-2 ${
                        dangerFlagged ? 'text-red-900' : 'text-legal-text'
                      }`}
                    >
                      {l.number}
                    </a>
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Step content */}
      <div className="flex-1 overflow-y-auto px-5 py-6">
        <div className="max-w-2xl mx-auto" key={stepIndex}>
          {step.kind === 'category' && (
            <CategoryStep selected={categoryId} onSelect={selectCategory} />
          )}

          {step.kind === 'question' && (
            <QuestionStep
              question={step.question}
              selected={answers[step.question.id]}
              onSelect={(optionId) => selectAnswer(step.question.id, optionId)}
            />
          )}

          {step.kind === 'ownWords' && (
            <OwnWordsStep
              value={ownWords}
              required={(category?.questions.length ?? 0) === 0}
              onChange={setOwnWords}
              onContinue={() => goTo(stepIndex + 1)}
            />
          )}

          {step.kind === 'review' && category && (
            <ReviewStep
              category={category}
              answers={answers}
              ownWords={ownWords}
              onEditQuestion={(questionId) => {
                const qi = category.questions.findIndex((q) => q.id === questionId)
                if (qi >= 0) goTo(qi + 1)
              }}
              onEditOwnWords={() => goTo(steps.length - 2)}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    </div>
  )
}

// ── Step 1: category picker ─────────────────────────────────────────────────

function CategoryStep({
  selected,
  onSelect,
}: {
  selected: string | null
  onSelect: (cat: IntakeCategory) => void
}) {
  return (
    <div className="animate-step-in">
      <h2 className="font-serif text-2xl text-legal-text font-bold mb-1.5">
        What&rsquo;s going on?
      </h2>
      <p className="text-legal-muted text-sm mb-6 leading-relaxed">
        Choose the situation closest to yours. I&rsquo;ll ask a few quick
        questions so I properly understand your case before giving guidance.
      </p>

      <div className="grid sm:grid-cols-2 gap-2.5">
        {INTAKE_CATEGORIES.map((cat) => {
          const Icon = cat.icon
          const isSelected = selected === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => onSelect(cat)}
              className={`flex items-start gap-3 text-left px-4 py-3.5 rounded-xl border transition-all duration-150 group ${
                isSelected
                  ? 'bg-gold-400 border-gold-400 text-navy-950'
                  : 'bg-navy-800 border-navy-700 hover:border-gold-500/50 hover:bg-navy-700 hover:-translate-y-0.5'
              }`}
            >
              <span
                className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-navy-950/10 text-navy-950'
                    : 'bg-navy-900 text-gold-400 group-hover:text-gold-300'
                }`}
              >
                <Icon className="w-5 h-5" />
              </span>
              <span className="min-w-0">
                <span
                  className={`block text-sm font-semibold leading-snug ${
                    isSelected ? 'text-navy-950' : 'text-legal-text'
                  }`}
                >
                  {cat.label}
                </span>
                <span
                  className={`block text-xs mt-0.5 leading-snug ${
                    isSelected ? 'text-navy-950/70' : 'text-legal-muted'
                  }`}
                >
                  {cat.description}
                </span>
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Question step ───────────────────────────────────────────────────────────

function QuestionStep({
  question,
  selected,
  onSelect,
}: {
  question: IntakeQuestion
  selected: string | undefined
  onSelect: (optionId: string) => void
}) {
  return (
    <div className="animate-step-in">
      <h2 className="font-serif text-2xl text-legal-text font-bold mb-1.5">
        {question.question}
      </h2>
      <p className="text-legal-muted text-sm mb-6 leading-relaxed">
        {question.hint ?? 'Tap the answer that fits best — you can go back anytime.'}
      </p>

      <div className="grid gap-2">
        {question.options.map((opt) => {
          const isSelected = selected === opt.id
          return (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              className={`flex items-center gap-3 text-left px-4 py-3.5 rounded-xl border transition-all duration-150 ${
                isSelected
                  ? 'bg-gold-400 border-gold-400 text-navy-950'
                  : 'bg-navy-800 border-navy-700 hover:border-gold-500/50 hover:bg-navy-700'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-navy-950 border-navy-950 text-gold-400'
                    : 'border-navy-500'
                }`}
              >
                {isSelected && <CheckIcon className="w-3 h-3" />}
              </span>
              <span
                className={`text-sm leading-snug ${
                  isSelected ? 'font-semibold text-navy-950' : 'text-legal-text'
                }`}
              >
                {opt.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Own words step ──────────────────────────────────────────────────────────

function OwnWordsStep({
  value,
  required,
  onChange,
  onContinue,
}: {
  value: string
  required: boolean
  onChange: (v: string) => void
  onContinue: () => void
}) {
  const canContinue = !required || value.trim().length > 0
  return (
    <div className="animate-step-in">
      <h2 className="font-serif text-2xl text-legal-text font-bold mb-1.5">
        {required ? 'Tell me what happened' : 'Anything else I should know?'}
      </h2>
      <p className="text-legal-muted text-sm mb-6 leading-relaxed">
        {required
          ? 'Describe your situation in your own words — there are no wrong answers.'
          : 'Add any detail in your own words, or skip this step. Dates, amounts and names of documents all help.'}
      </p>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={6}
        autoFocus
        placeholder="For example: It started three months ago when…"
        className="w-full bg-navy-800 border border-navy-700 focus:border-gold-500/60 rounded-xl px-4 py-3.5 text-sm text-legal-text placeholder-legal-muted/40 outline-none resize-none leading-relaxed transition-colors"
      />

      <div className="flex items-center justify-between mt-5">
        <p className="text-[11px] text-legal-muted">
          Private — nothing is stored under your name.
        </p>
        <button
          onClick={onContinue}
          disabled={!canContinue}
          className="flex items-center gap-1.5 bg-gold-400 hover:bg-gold-300 disabled:bg-navy-700 disabled:text-legal-muted disabled:cursor-not-allowed text-navy-950 text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
        >
          {value.trim() || required ? 'Continue' : 'Skip this step'}
          <ChevronRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

// ── Review step ─────────────────────────────────────────────────────────────

function ReviewStep({
  category,
  answers,
  ownWords,
  onEditQuestion,
  onEditOwnWords,
  onSubmit,
}: {
  category: IntakeCategory
  answers: Record<string, string>
  ownWords: string
  onEditQuestion: (questionId: string) => void
  onEditOwnWords: () => void
  onSubmit: () => void
}) {
  const answered = category.questions.filter((q) => answers[q.id])

  return (
    <div className="animate-step-in">
      <h2 className="font-serif text-2xl text-legal-text font-bold mb-1.5">
        Here&rsquo;s what I understand
      </h2>
      <p className="text-legal-muted text-sm mb-6 leading-relaxed">
        Check that this is right — tap any answer to change it.
      </p>

      <div className="bg-navy-800 border border-navy-700 rounded-xl divide-y divide-navy-700 mb-6 overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3.5">
          <span className="w-8 h-8 rounded-lg bg-navy-900 text-gold-400 flex items-center justify-center flex-shrink-0">
            <category.icon className="w-5 h-5" />
          </span>
          <div>
            <p className="text-[11px] text-legal-muted uppercase tracking-wide">
              Situation
            </p>
            <p className="text-sm text-legal-text font-semibold">{category.label}</p>
          </div>
        </div>

        {answered.map((q) => {
          const opt = q.options.find((o) => o.id === answers[q.id])
          return (
            <button
              key={q.id}
              onClick={() => onEditQuestion(q.id)}
              className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-navy-700/60 transition-colors group"
            >
              <div className="min-w-0">
                <p className="text-[11px] text-legal-muted uppercase tracking-wide">
                  {q.summaryLabel}
                </p>
                <p className="text-sm text-legal-text truncate">{opt?.label}</p>
              </div>
              <PencilIcon className="w-3.5 h-3.5 text-legal-muted/40 group-hover:text-gold-400 flex-shrink-0 transition-colors" />
            </button>
          )
        })}

        {ownWords.trim() && (
          <button
            onClick={onEditOwnWords}
            className="w-full flex items-start justify-between gap-3 px-4 py-3 text-left hover:bg-navy-700/60 transition-colors group"
          >
            <div className="min-w-0">
              <p className="text-[11px] text-legal-muted uppercase tracking-wide">
                In your own words
              </p>
              <p className="text-sm text-legal-text leading-relaxed line-clamp-3">
                {ownWords.trim()}
              </p>
            </div>
            <PencilIcon className="w-3.5 h-3.5 text-legal-muted/40 group-hover:text-gold-400 flex-shrink-0 mt-1 transition-colors" />
          </button>
        )}
      </div>

      <button
        onClick={onSubmit}
        className="w-full flex items-center justify-center gap-2 bg-gold-400 hover:bg-gold-300 text-navy-950 text-sm font-bold px-5 py-3.5 rounded-xl transition-all hover:-translate-y-0.5"
      >
        <SparklesIcon className="w-4 h-4" />
        Get my legal guidance
      </button>
      <p className="text-[11px] text-legal-muted text-center mt-3 leading-relaxed">
        Swifty will research Namibian law for your situation. General information
        only — not formal legal advice.
      </p>
    </div>
  )
}
