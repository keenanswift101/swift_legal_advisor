import {
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useChatContext } from '../context/ChatContext'
import { CitationPanel } from './CitationPanel'
import { MessageBubble } from './MessageBubble'
import type { Message } from '../types'

const SUGGESTED: string[] = [
  "What are a director's fiduciary duties under the Companies Act 28 of 2004?",
  'What constitutes unfair dismissal under the Labour Act 11 of 2007?',
  'Explain the right to a fair trial under the Namibian Constitution.',
  'How is business income taxed under the Income Tax Act 24 of 1981?',
  'What are the capital requirements for banking institutions in Namibia?',
  'What are the merger notification thresholds under the Competition Act?',
]

export function ChatWindow() {
  const { messages, isLoading, error, sendMessage, stopGeneration } =
    useChatContext()

  const [input, setInput] = useState('')
  const [selectedMsg, setSelectedMsg] = useState<Message | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-scroll to bottom on new messages / streaming tokens
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    const text = input.trim()
    if (!text || isLoading) return
    sendMessage(text)
    setInput('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    const ta = e.target
    ta.style.height = 'auto'
    ta.style.height = Math.min(ta.scrollHeight, 200) + 'px'
  }

  const panelOpen = selectedMsg !== null

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      {/* ── Messages area ─────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className={`max-w-3xl mx-auto transition-all duration-300 ${panelOpen ? 'lg:mr-[24rem]' : ''}`}>
          {messages.length === 0 ? (
            <WelcomeScreen onSuggest={(q) => sendMessage(q)} />
          ) : (
            <>
              {messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  onViewCitations={setSelectedMsg}
                />
              ))}

              {error && (
                <div className="bg-red-950/50 border border-red-800 rounded-xl px-4 py-3 text-red-300 text-sm mb-4">
                  {error}
                </div>
              )}

              <div ref={bottomRef} />
            </>
          )}
        </div>
      </div>

      {/* ── Input bar ────────────────────────────────────────────────────── */}
      <div className="flex-shrink-0 border-t border-navy-700 bg-navy-900 px-4 py-4">
        <div
          className={`max-w-3xl mx-auto transition-all duration-300 ${panelOpen ? 'lg:mr-[24rem]' : ''}`}
        >
          <div className="bg-navy-800 rounded-2xl border border-navy-700 focus-within:border-gold-500/60 transition-colors p-3 flex gap-3 items-end">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask a Namibian business law question…"
              rows={1}
              disabled={isLoading}
              className="flex-1 bg-transparent text-legal-text text-sm resize-none outline-none placeholder-legal-muted/40 leading-relaxed"
            />

            {isLoading ? (
              <button
                onClick={stopGeneration}
                title="Stop generation"
                className="w-9 h-9 flex-shrink-0 rounded-xl bg-red-700 hover:bg-red-600 flex items-center justify-center text-white transition-colors text-sm font-bold"
              >
                ■
              </button>
            ) : (
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                title="Send (Enter)"
                className="w-9 h-9 flex-shrink-0 rounded-xl bg-gold-500 hover:bg-gold-400 disabled:bg-navy-700 disabled:cursor-not-allowed flex items-center justify-center text-navy-950 font-bold transition-colors text-base"
              >
                ➤
              </button>
            )}
          </div>

          <p className="text-legal-muted/35 text-[11px] text-center mt-2">
            Enter to send · Shift+Enter for new line · NamibiaLex provides information
            only, not formal legal advice.
          </p>
        </div>
      </div>

      {/* ── Citation Panel (slide in from right) ─────────────────────────── */}
      <CitationPanel
        selectedMessage={selectedMsg}
        onClose={() => setSelectedMsg(null)}
      />
    </div>
  )
}

// ── Welcome / empty state ──────────────────────────────────────────────────────

function WelcomeScreen({ onSuggest }: { onSuggest: (q: string) => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-10 px-2">
      {/* Icon */}
      <div className="w-16 h-16 rounded-full bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-4xl mb-6 select-none">
        ⚖️
      </div>

      <h2 className="text-gold-400 font-serif text-2xl font-bold mb-2 text-center">
        NamibiaLex Legal Advisor
      </h2>
      <p className="text-legal-muted text-sm text-center max-w-lg mb-2 leading-relaxed">
        Postgraduate-level advice on Namibian business law, grounded in the{' '}
        <span className="text-legal-text">UNAM School of Law</span> LLB/LLM curriculum
        and the <span className="text-legal-text">Namibia Business School (NBS)</span>{' '}
        executive programme.
      </p>
      <p className="text-legal-muted/55 text-xs text-center max-w-md mb-10 leading-relaxed">
        Companies Act · Labour Act · Income Tax Act · Banking Institutions Act ·
        Namibian Constitution · Competition Act · NamCode Corporate Governance
      </p>

      {/* Suggested prompts */}
      <div className="w-full max-w-2xl">
        <p className="text-legal-muted/60 text-xs text-center uppercase tracking-widest mb-3">
          Suggested questions
        </p>
        <div className="grid gap-2">
          {SUGGESTED.map((q) => (
            <button
              key={q}
              onClick={() => onSuggest(q)}
              className="text-left px-4 py-3 rounded-xl bg-navy-800 hover:bg-navy-700 border border-navy-700 hover:border-gold-500/40 text-legal-text text-sm transition-all group"
            >
              <span className="text-gold-500/60 group-hover:text-gold-400 mr-2 transition-colors font-serif">
                §
              </span>
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* IRAC badge */}
      <div className="mt-8 flex gap-2 text-[11px] text-legal-muted/60 flex-wrap justify-center">
        {['Issue', 'Rule', 'Application', 'Conclusion'].map((step, i) => (
          <span
            key={step}
            className="px-2.5 py-1 rounded-full bg-navy-800 border border-navy-700"
          >
            {i + 1}. {step}
          </span>
        ))}
        <span className="px-2.5 py-1 rounded-full bg-navy-800 border border-navy-700">
          IRAC Reasoning
        </span>
      </div>
    </div>
  )
}
