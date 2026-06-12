import type { Citation, Message } from '../types'
import { XIcon } from './icons'

interface CitationPanelProps {
  selectedMessage: Message | null
  onClose: () => void
}

export function CitationPanel({ selectedMessage, onClose }: CitationPanelProps) {
  const citations = selectedMessage?.citations ?? []
  const isOpen = selectedMessage !== null

  return (
    <>
      {/* Backdrop (mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-10 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <aside
        className={`
          fixed top-0 right-0 h-full w-80 lg:w-96
          bg-navy-950 border-l border-navy-700
          flex flex-col z-20 transition-transform duration-300 ease-out
          ${isOpen ? 'translate-x-0 shadow-2xl' : 'translate-x-full'}
        `}
        aria-label="Legal Citations"
      >
        {/* Header */}
        <div className="flex-shrink-0 px-5 py-4 border-b border-navy-700 flex items-center justify-between">
          <div>
            <h2 className="text-gold-400 font-serif font-semibold text-base">
              Legal Citations
            </h2>
            <p className="text-legal-muted text-xs mt-0.5">
              {citations.length} source{citations.length !== 1 ? 's' : ''} cited
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-legal-muted hover:text-legal-text transition-colors w-7 h-7 flex items-center justify-center rounded-full hover:bg-navy-800"
            aria-label="Close citations panel"
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Citations list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {citations.length === 0 ? (
            <p className="text-legal-muted text-sm text-center py-12">
              No citations found
            </p>
          ) : (
            citations.map((cit, i) => (
              <CitationCard key={`${cit.act_name}-${i}`} citation={cit} index={i + 1} />
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 px-5 py-3 border-t border-navy-700">
          <p className="text-legal-muted/50 text-[11px] text-center leading-snug">
            Namibian Statutes sourced from the{' '}
            <a
              href="https://www.lac.org.na/laws/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-600 hover:text-gold-400 transition-colors"
            >
              Legal Assistance Centre
            </a>
          </p>
        </div>
      </aside>
    </>
  )
}

function CitationCard({
  citation,
  index,
}: {
  citation: Citation
  index: number
}) {
  return (
    <div className="bg-navy-800 rounded-xl border border-navy-700 p-4 hover:border-navy-600 transition-colors">
      <div className="flex items-start gap-3">
        {/* Index badge */}
        <span className="w-6 h-6 rounded-full bg-gold-500/15 border border-gold-500/40 flex items-center justify-center text-gold-400 text-xs font-bold flex-shrink-0 mt-0.5">
          {index}
        </span>

        <div className="flex-1 min-w-0">
          <h3 className="text-gold-300 font-serif font-semibold text-sm leading-snug">
            {citation.act_name}
          </h3>
          <p className="text-legal-muted text-xs mt-1">
            Section / Article:{' '}
            <span className="text-gold-400 font-mono font-medium">
              {citation.section}
            </span>
          </p>

          {citation.excerpt && (
            <blockquote className="mt-2 pl-3 border-l-2 border-gold-500/30 text-legal-muted/70 text-xs italic leading-relaxed">
              …{citation.excerpt.slice(0, 280).trim()}…
            </blockquote>
          )}
        </div>
      </div>
    </div>
  )
}
