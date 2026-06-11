import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Message } from '../types'

interface MessageBubbleProps {
  message: Message
  onViewCitations: (msg: Message) => void
}

const DOMAIN_LABELS: Record<string, string> = {
  constitutional: 'Constitutional Law',
  corporate: 'Corporate Law',
  labour: 'Labour Law',
  tax: 'Tax Law',
  banking: 'Banking & Finance',
  general: 'General Law',
}

const DOMAIN_COLORS: Record<string, string> = {
  constitutional:
    'bg-blue-950/60 text-blue-300 border-blue-800/60',
  corporate:
    'bg-purple-950/60 text-purple-300 border-purple-800/60',
  labour:
    'bg-emerald-950/60 text-emerald-300 border-emerald-800/60',
  tax:
    'bg-yellow-950/60 text-yellow-300 border-yellow-800/60',
  banking:
    'bg-cyan-950/60 text-cyan-300 border-cyan-800/60',
  general:
    'bg-navy-800/60 text-legal-muted border-navy-700/60',
}

export function MessageBubble({ message, onViewCitations }: MessageBubbleProps) {
  const isUser = message.role === 'user'

  if (isUser) {
    return (
      <div className="flex justify-end mb-4 animate-fade-in">
        <div className="max-w-[78%] bg-navy-600 rounded-2xl rounded-tr-sm px-4 py-3 text-legal-text text-sm leading-relaxed">
          {message.content}
        </div>
      </div>
    )
  }

  // ── Assistant message ───────────────────────────────────────────────────────
  return (
    <div className="flex gap-3 mb-6 animate-fade-in">
      {/* Avatar */}
      <div className="w-8 h-8 rounded-full bg-gold-500 flex-shrink-0 flex items-center justify-center text-navy-950 font-bold text-sm font-serif mt-1 select-none">
        ⚖
      </div>

      <div className="flex-1 min-w-0">
        {/* Domain badge */}
        {message.legal_domain && (
          <span
            className={`inline-flex items-center text-[11px] px-2.5 py-0.5 rounded-full border mb-2 font-medium ${
              DOMAIN_COLORS[message.legal_domain] ?? DOMAIN_COLORS.general
            }`}
          >
            {DOMAIN_LABELS[message.legal_domain] ?? message.legal_domain}
          </span>
        )}

        {/* Answer bubble */}
        <div className="bg-navy-800 rounded-2xl rounded-tl-sm px-5 py-4">
          <div
            className="prose prose-invert prose-sm max-w-none
              prose-headings:font-serif prose-headings:text-gold-400
              prose-strong:text-legal-text
              prose-code:text-gold-300 prose-code:bg-navy-950
              prose-a:text-gold-400
              prose-blockquote:border-l-gold-500/50 prose-blockquote:text-legal-muted
              prose-hr:border-navy-700
              prose-li:marker:text-gold-500
              prose-table:text-sm"
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
            {message.isStreaming && <span className="streaming-cursor" />}
          </div>
        </div>

        {/* Footer: citations button + timestamp */}
        <div className="flex items-center justify-between mt-1.5 px-1">
          {message.citations && message.citations.length > 0 && !message.isStreaming ? (
            <button
              onClick={() => onViewCitations(message)}
              className="flex items-center gap-1.5 text-xs text-gold-500 hover:text-gold-300 transition-colors group"
            >
              <span className="w-5 h-5 rounded bg-gold-500/15 group-hover:bg-gold-500/25 flex items-center justify-center text-xs transition-colors">
                §
              </span>
              {message.citations.length} citation
              {message.citations.length !== 1 ? 's' : ''} — view sources
            </button>
          ) : (
            <span />
          )}
          <span className="text-[11px] text-legal-muted/40">
            {message.timestamp.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>
      </div>
    </div>
  )
}
