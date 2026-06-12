import { useEffect, useState } from 'react'
import type { Message } from '../types'
import { CheckIcon } from './icons'

const DOMAIN_LABELS: Record<string, string> = {
  constitutional: 'Constitutional Law',
  corporate: 'Corporate Law',
  labour: 'Labour Law',
  tax: 'Tax Law',
  banking: 'Banking & Finance',
  criminal: 'Criminal Law',
  family: 'Family Law',
  property: 'Property Law',
  general: 'General Law',
}

type StageState = 'pending' | 'active' | 'done'

interface Stage {
  label: string
  state: StageState
}

/**
 * Live view of the agent pipeline while a response streams.
 * Stages are derived from real signals: elapsed time, the SSE `domain`
 * event, and the first content token — not a fake animation.
 */
export function AgentActivity({ message }: { message: Message }) {
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setElapsed((e) => e + 0.4), 400)
    return () => clearInterval(t)
  }, [])

  const domain = message.legal_domain
  const hasContent = message.content.length > 0
  const streaming = message.isStreaming === true

  const readDone = elapsed > 1.2 || !!domain || hasContent
  const domainDone = !!domain || hasContent
  const searchDone = hasContent

  const stages: Stage[] = [
    {
      label: 'Reading your situation',
      state: readDone ? 'done' : 'active',
    },
    {
      label: domain
        ? `Area of law identified: ${DOMAIN_LABELS[domain] ?? domain}`
        : 'Identifying the area of law',
      state: domainDone ? 'done' : readDone ? 'active' : 'pending',
    },
    {
      label: 'Searching Namibian statutes & case law',
      state: searchDone ? 'done' : domainDone ? 'active' : 'pending',
    },
    {
      label: 'Writing your guidance',
      state: hasContent ? (streaming ? 'active' : 'done') : 'pending',
    },
  ]

  return (
    <div className="bg-navy-900/80 border border-navy-700 rounded-xl px-4 py-3 mb-3 animate-fade-in">
      <p className="text-[10px] uppercase tracking-widest text-legal-muted mb-2.5 font-medium">
        Swifty is working on your case
      </p>
      <ol className="space-y-1.5">
        {stages.map((stage) => (
          <li key={stage.label} className="flex items-center gap-2.5">
            <StageDot state={stage.state} />
            <span
              className={`text-xs transition-colors duration-300 ${
                stage.state === 'done'
                  ? 'text-legal-muted'
                  : stage.state === 'active'
                    ? 'text-legal-text font-medium'
                    : 'text-legal-muted/40'
              }`}
            >
              {stage.label}
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}

function StageDot({ state }: { state: StageState }) {
  if (state === 'done') {
    return (
      <span className="w-4 h-4 rounded-full bg-gold-400/15 border border-gold-500/40 flex items-center justify-center flex-shrink-0">
        <CheckIcon className="w-2.5 h-2.5 text-gold-400" />
      </span>
    )
  }
  if (state === 'active') {
    return (
      <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 relative">
        <span className="absolute inset-0 rounded-full border border-gold-400/50 animate-ping" />
        <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
      </span>
    )
  }
  return (
    <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0">
      <span className="w-2 h-2 rounded-full bg-navy-600" />
    </span>
  )
}
