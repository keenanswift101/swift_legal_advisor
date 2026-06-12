import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { INTAKE_CATEGORIES } from '../data/intake'
import { useI18n } from '../i18n'
import { ArrowLeftIcon, ScaleIcon, XIcon, ChevronRightIcon } from './icons'

interface GuidePageProps {
  /** Guide id to show, or null for the library list */
  selected: string | null
  onSelect: (id: string) => void
  onClose: () => void
}

/**
 * Static legal info library — always available, even when the AI
 * assistant is down. Rendered as a full-screen overlay so it can be
 * opened from anywhere without losing chat state.
 */
export function GuidePage({ selected, onSelect, onClose }: GuidePageProps) {
  const { t, guides } = useI18n()
  const guide = selected ? guides.find((g) => g.id === selected) : undefined

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto animate-fade-in">
      {/* Top bar */}
      <div className="sticky top-0 bg-white/95 backdrop-blur border-b border-navy-700 z-10">
        <div className="max-w-3xl mx-auto px-5 py-3 flex items-center justify-between">
          {guide ? (
            <button
              onClick={() => onSelect('')}
              className="flex items-center gap-1.5 text-xs font-medium text-legal-muted hover:text-legal-text transition-colors px-2 py-1.5 -ml-2 rounded-lg hover:bg-navy-800"
            >
              <ArrowLeftIcon className="w-3.5 h-3.5" />
              {t('guides.all')}
            </button>
          ) : (
            <div className="flex items-center gap-2 text-sm font-serif font-bold">
              <ScaleIcon className="w-4 h-4 text-gold-400" />
              {t('guides.library')}
            </div>
          )}
          <button
            onClick={onClose}
            title={t('guides.close')}
            className="text-legal-muted hover:text-legal-text transition-colors p-1.5 -mr-1 rounded-lg hover:bg-navy-800"
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-5 py-8">
        {guide ? (
          <article className="animate-slide-up">
            <p className="text-[11px] uppercase tracking-widest text-legal-muted mb-2">
              {t('guides.tagline')}
            </p>
            <h1 className="font-serif text-3xl font-bold text-legal-text mb-6">
              {guide.title}
            </h1>
            <div
              className="prose prose-sm max-w-none
                prose-headings:font-serif prose-headings:text-gold-400
                prose-p:text-legal-text prose-li:text-legal-text
                prose-strong:text-legal-text
                prose-li:marker:text-gold-500"
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {guide.content}
              </ReactMarkdown>
            </div>

            <div className="mt-10 bg-navy-900 border border-navy-700 rounded-xl px-5 py-4">
              <p className="text-legal-muted text-xs leading-relaxed">
                {t('guides.disclaimer')}
              </p>
            </div>
          </article>
        ) : (
          <div className="animate-slide-up">
            <h1 className="font-serif text-3xl font-bold text-legal-text mb-2">
              {t('guides.library')}
            </h1>
            <p className="text-legal-muted text-sm mb-8 leading-relaxed max-w-xl">
              {t('guides.librarySub')}
            </p>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {guides.map((g) => {
                const cat = INTAKE_CATEGORIES.find((c) => c.id === g.id)
                const Icon = cat?.icon ?? ScaleIcon
                return (
                  <button
                    key={g.id}
                    onClick={() => onSelect(g.id)}
                    className="flex items-center gap-3 text-left px-4 py-3.5 rounded-xl bg-navy-800 border border-navy-700 hover:border-gold-500/50 hover:bg-navy-700 hover:-translate-y-0.5 transition-all duration-150 group"
                  >
                    <span className="w-9 h-9 rounded-lg bg-navy-900 text-gold-400 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-legal-text leading-snug">
                        {g.title}
                      </span>
                      <span className="block text-xs text-legal-muted mt-0.5 leading-snug">
                        {g.summary}
                      </span>
                    </span>
                    <ChevronRightIcon className="w-4 h-4 text-legal-muted/30 group-hover:text-gold-400 flex-shrink-0 transition-colors" />
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
