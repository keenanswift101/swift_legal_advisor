import {
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useChatContext } from '../context/ChatContext'
import { useI18n } from '../i18n'
import { CitationPanel } from './CitationPanel'
import { IntakeWizard } from './IntakeWizard'
import { MessageBubble } from './MessageBubble'
import { DOMAIN_TO_GUIDE } from '../data/guides'
import {
  ArrowLeftIcon,
  ScaleIcon,
  SendIcon,
  StopIcon,
  ChevronRightIcon,
} from './icons'
import type { Message } from '../types'

interface ChatWindowProps {
  onOpenGuide: (id: string) => void
}

export function ChatWindow({ onOpenGuide }: ChatWindowProps) {
  const { messages, isLoading, error, sendMessage, stopGeneration, clearChat } =
    useChatContext()
  const { t } = useI18n()

  const [selectedMsg, setSelectedMsg] = useState<Message | null>(null)
  const [wizardCategory, setWizardCategory] = useState<string | null>(null)
  const [wizardOpen, setWizardOpen] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const openWizard = (categoryId: string | null) => {
    setWizardCategory(categoryId)
    setWizardOpen(true)
  }

  const handleWizardSubmit = (message: string) => {
    setWizardOpen(false)
    sendMessage(message)
  }

  // Typing in the chat box always works — it closes the wizard if open
  const handleSend = (text: string) => {
    setWizardOpen(false)
    sendMessage(text)
  }

  const panelOpen = selectedMsg !== null
  const showWizard = wizardOpen && messages.length === 0

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      {/* ── Main area: wizard OR messages/welcome ─────────────────────────── */}
      {showWizard ? (
        <IntakeWizard
          initialCategoryId={wizardCategory}
          onSubmit={handleWizardSubmit}
          onCancel={() => setWizardOpen(false)}
        />
      ) : (
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div
            className={`max-w-3xl mx-auto transition-all duration-300 ${panelOpen ? 'lg:mr-[24rem]' : ''}`}
          >
            {messages.length === 0 ? (
              <WelcomeScreen
                onPickCategory={openWizard}
                onOpenGuides={() => onOpenGuide('library')}
              />
            ) : (
              <>
                {messages.map((msg) => (
                  <MessageBubble
                    key={msg.id}
                    message={msg}
                    onViewCitations={setSelectedMsg}
                    onOpenGuide={onOpenGuide}
                    errorGuideId={
                      (msg.legal_domain && DOMAIN_TO_GUIDE[msg.legal_domain]) ||
                      wizardCategory ||
                      null
                    }
                  />
                ))}

                {error && (
                  <div className="bg-red-50 border border-red-300 rounded-xl px-4 py-3 text-red-800 text-sm mb-4">
                    {error}
                  </div>
                )}

                {/* Back to start — appears once the answer is finished */}
                {!isLoading && (
                  <div className="flex justify-center gap-2 mt-2 mb-4 animate-fade-in">
                    <button
                      onClick={clearChat}
                      className="flex items-center gap-2 text-xs font-semibold text-legal-text bg-navy-800 hover:bg-navy-700 border border-navy-700 hover:border-gold-500/50 px-4 py-2.5 rounded-xl transition-all"
                    >
                      <ArrowLeftIcon className="w-3.5 h-3.5" />
                      {t('chat.startNewCase')}
                    </button>
                  </div>
                )}

                <div ref={bottomRef} />
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Chat input — its own entity, always visible ───────────────────── */}
      <ChatInputBar
        isLoading={isLoading}
        onSend={handleSend}
        onStop={stopGeneration}
        shifted={panelOpen}
      />

      {/* ── Citation Panel (slide in from right) ─────────────────────────── */}
      <CitationPanel
        selectedMessage={selectedMsg}
        onClose={() => setSelectedMsg(null)}
      />
    </div>
  )
}

// ── Chat input bar — standalone, persistent ────────────────────────────────────

interface ChatInputBarProps {
  isLoading: boolean
  onSend: (text: string) => void
  onStop: () => void
  shifted: boolean
}

function ChatInputBar({ isLoading, onSend, onStop, shifted }: ChatInputBarProps) {
  const { t } = useI18n()
  const [input, setInput] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSend = () => {
    const text = input.trim()
    if (!text || isLoading) return
    onSend(text)
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

  return (
    <div className="flex-shrink-0 border-t border-navy-700 bg-white px-4 py-4">
      <div
        className={`max-w-3xl mx-auto transition-all duration-300 ${shifted ? 'lg:mr-[24rem]' : ''}`}
      >
        <div className="bg-navy-800 rounded-2xl border border-navy-700 focus-within:border-gold-500/60 transition-colors p-3 flex gap-3 items-end">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={t('chat.placeholder')}
            rows={1}
            disabled={isLoading}
            className="flex-1 bg-transparent text-legal-text text-sm resize-none outline-none placeholder-legal-muted/70 leading-relaxed"
          />

          {isLoading ? (
            <button
              onClick={onStop}
              title={t('chat.stop')}
              className="w-9 h-9 flex-shrink-0 rounded-xl bg-navy-600 hover:bg-navy-500 flex items-center justify-center text-legal-text transition-colors"
            >
              <StopIcon className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              title={t('chat.send')}
              className="w-9 h-9 flex-shrink-0 rounded-xl bg-gold-400 hover:bg-gold-300 disabled:bg-navy-700 disabled:text-navy-500 disabled:cursor-not-allowed flex items-center justify-center text-navy-950 transition-colors"
            >
              <SendIcon className="w-4 h-4" />
            </button>
          )}
        </div>

        <p className="text-legal-muted text-[11px] text-center mt-2">
          {t('chat.disclaimer')}
        </p>
      </div>
    </div>
  )
}

// ── Welcome / empty state ──────────────────────────────────────────────────────

function WelcomeScreen({
  onPickCategory,
  onOpenGuides,
}: {
  onPickCategory: (categoryId: string | null) => void
  onOpenGuides: () => void
}) {
  const { t, categories } = useI18n()
  return (
    <div className="flex flex-col items-center pt-10 pb-6 px-2 animate-slide-up">
      {/* Brand mark */}
      <div className="w-14 h-14 rounded-2xl bg-gold-100 flex items-center justify-center text-gold-400 mb-5">
        <ScaleIcon className="w-7 h-7" />
      </div>

      <h2 className="text-legal-text font-serif text-3xl font-bold mb-2 text-center">
        {t('welcome.title')}
      </h2>
      <p className="text-legal-muted text-sm text-center max-w-md mb-8 leading-relaxed">
        {t('welcome.sub')}
      </p>

      {/* Category cards */}
      <div className="w-full max-w-2xl grid sm:grid-cols-2 gap-2.5 mb-6">
        {categories.map((cat) => {
          const Icon = cat.icon
          return (
            <button
              key={cat.id}
              onClick={() => onPickCategory(cat.id)}
              className="flex items-center gap-3 text-left px-4 py-3.5 rounded-xl bg-white border border-navy-700 shadow-sm hover:border-gold-400/50 hover:shadow hover:-translate-y-0.5 transition-all duration-150 group cursor-pointer"
            >
              <span className="w-9 h-9 rounded-lg bg-gold-100 text-gold-400 group-hover:text-gold-300 flex items-center justify-center flex-shrink-0 transition-colors">
                <Icon className="w-5 h-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-legal-text leading-snug">
                  {cat.label}
                </span>
                <span className="block text-xs text-legal-muted mt-0.5 leading-snug">
                  {cat.description}
                </span>
              </span>
              <ChevronRightIcon className="w-4 h-4 text-legal-muted/30 group-hover:text-gold-400 flex-shrink-0 transition-colors" />
            </button>
          )
        })}
      </div>

      <p className="text-legal-muted text-xs mb-3">{t('welcome.orType')}</p>

      <button
        onClick={onOpenGuides}
        className="text-xs font-semibold text-legal-text underline underline-offset-4 decoration-navy-500 hover:decoration-gold-400 transition-colors mb-8 cursor-pointer"
      >
        {t('welcome.browseGuides')}
      </button>

      {/* Trust strip */}
      <div className="flex gap-2 text-[11px] text-legal-muted flex-wrap justify-center">
        {[
          t('welcome.trust.1'),
          t('welcome.trust.2'),
          t('welcome.trust.3'),
          t('welcome.trust.4'),
        ].map((item) => (
          <span
            key={item}
            className="px-3 py-1 rounded-full bg-white border border-navy-700"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
