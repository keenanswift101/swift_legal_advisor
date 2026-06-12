import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Message } from '../types'
import { useI18n } from '../i18n'
import { AgentActivity } from './AgentActivity'
import { ScaleIcon } from './icons'

interface MessageBubbleProps {
  message: Message
  onViewCitations: (msg: Message) => void
  /** Guide id to suggest when this message is an error (null = library) */
  errorGuideId?: string | null
  onOpenGuide?: (id: string) => void
}

const DOMAIN_COLORS: Record<string, string> = {
  constitutional: 'bg-navy-800/80 text-gold-400 border-navy-600/60',
  corporate:      'bg-navy-800/80 text-gold-400 border-navy-600/60',
  labour:         'bg-navy-800/80 text-gold-400 border-navy-600/60',
  tax:            'bg-navy-800/80 text-gold-400 border-navy-600/60',
  banking:        'bg-navy-800/80 text-gold-400 border-navy-600/60',
  criminal:       'bg-navy-800/80 text-gold-400 border-navy-600/60',
  family:         'bg-navy-800/80 text-gold-400 border-navy-600/60',
  property:       'bg-navy-800/80 text-gold-400 border-navy-600/60',
  general:        'bg-navy-800/60 text-legal-muted border-navy-700/60',
}

export function MessageBubble({
  message,
  onViewCitations,
  errorGuideId,
  onOpenGuide,
}: MessageBubbleProps) {
  const { t } = useI18n()
  const isUser = message.role === 'user'

  if (isUser) {
    return (
      <div className="flex justify-end mb-4 animate-fade-in">
        <div className="max-w-[78%] bg-gold-100 rounded-2xl rounded-tr-sm px-4 py-3 text-legal-text text-sm leading-relaxed whitespace-pre-line">
          {message.content}
        </div>
      </div>
    )
  }

  // ── Assistant message ───────────────────────────────────────────────────────
  return (
    <div className="flex gap-3 mb-6 animate-fade-in">
      {/* Avatar */}
      <div className="w-8 h-8 rounded-full bg-gold-100 flex-shrink-0 flex items-center justify-center text-gold-400 mt-1">
        <ScaleIcon className="w-4 h-4" />
      </div>

      <div className="flex-1 min-w-0">
        {/* Live agent pipeline while the response streams */}
        {message.isStreaming && <AgentActivity message={message} />}

        {/* Domain badge */}
        {message.legal_domain && (
          <span
            className={`inline-flex items-center text-[11px] px-2.5 py-0.5 rounded-full border mb-2 font-medium ${
              DOMAIN_COLORS[message.legal_domain] ?? DOMAIN_COLORS.general
            }`}
          >
            {t(`domain.${message.legal_domain}`)}
          </span>
        )}

        {/* Answer bubble — hidden until the first token arrives */}
        <div
          className={`bg-white border border-navy-700 shadow-sm rounded-2xl rounded-tl-sm px-5 py-4 ${
            message.content.length === 0 ? 'hidden' : ''
          }`}
        >
          <div
            className="prose prose-sm max-w-none
              prose-headings:font-serif prose-headings:text-gold-400
              prose-p:text-legal-text prose-li:text-legal-text
              prose-strong:text-legal-text
              prose-code:text-gold-300
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

          {/* Offline fallback: link to the static guide for this topic */}
          {message.isError && onOpenGuide && (
            <button
              onClick={() => onOpenGuide(errorGuideId ?? 'library')}
              className="mt-3 flex items-center gap-2 text-xs font-semibold text-legal-text bg-navy-900 hover:bg-navy-700 border border-navy-600 hover:border-gold-500/50 px-4 py-2.5 rounded-xl transition-all"
            >
              <span className="font-serif text-gold-500">§</span>
              {t('chat.errorGuideLink')}
            </button>
          )}
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
              {t('chat.citations', {
                n: message.citations.length,
                s: message.citations.length !== 1 ? 's' : '',
              })}
            </button>
          ) : (
            <span />
          )}
          <span className="text-[11px] text-legal-muted/70">
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
