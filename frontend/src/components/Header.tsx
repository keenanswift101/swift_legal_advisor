import { useChatContext } from '../context/ChatContext'
import { useI18n } from '../i18n'
import { LANGUAGES, type Lang } from '../i18n/ui'
import { ScaleIcon, ChatIcon, FileTextIcon, NamibiaFlag } from './icons'

type AppMode = 'chat' | 'draft'

interface HeaderProps {
  mode: AppMode
  onModeChange: (mode: AppMode) => void
  onHome: () => void
}

export function Header({ mode, onModeChange, onHome }: HeaderProps) {
  const { clearChat, messages } = useChatContext()
  const { lang, setLang, t } = useI18n()

  return (
    <header className="flex-shrink-0 bg-navy-950 border-b border-navy-700 px-6 py-3 flex items-center justify-between gap-4">
      {/* Brand — click to return to the landing page */}
      <button
        onClick={onHome}
        title={t('header.home')}
        className="flex items-center gap-3 flex-shrink-0 text-left group cursor-pointer"
      >
        <div className="w-9 h-9 rounded-full bg-gold-100 group-hover:bg-gold-200 flex items-center justify-center text-gold-400 flex-shrink-0 transition-colors">
          <ScaleIcon className="w-5 h-5" />
        </div>
        <div className="flex items-center gap-2">
          <div>
            <h1 className="text-gold-400 font-serif text-lg font-bold tracking-wide leading-none">
              Swifty
            </h1>
            <p className="text-legal-muted text-[11px] leading-none mt-0.5">
              {t('header.subtitle')}
            </p>
          </div>
          <NamibiaFlag className="w-7 h-auto opacity-90 ml-1" />
        </div>
      </button>

      {/* Mode tabs */}
      <div className="flex items-center gap-1 bg-navy-800 border border-navy-700 rounded-lg p-0.5">
        <button
          onClick={() => onModeChange('chat')}
          className={`flex items-center gap-1.5 text-xs px-4 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
            mode === 'chat'
              ? 'bg-gold-400 text-navy-950'
              : 'text-legal-muted hover:text-gold-400'
          }`}
        >
          <ChatIcon className="w-3.5 h-3.5" />
          {t('header.tab.advisor')}
        </button>
        <button
          onClick={() => onModeChange('draft')}
          className={`flex items-center gap-1.5 text-xs px-4 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
            mode === 'draft'
              ? 'bg-gold-400 text-navy-950'
              : 'text-legal-muted hover:text-gold-400'
          }`}
        >
          <FileTextIcon className="w-3.5 h-3.5" />
          {t('header.tab.drafter')}
        </button>
      </div>

      {/* Right: language switcher + badges */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <LanguageSwitcher lang={lang} onChange={setLang} />
        <span className="hidden lg:inline text-[11px] text-legal-muted bg-navy-800 px-3 py-1 rounded-full border border-navy-700">
          {t('header.badge')}
        </span>
        {mode === 'chat' && messages.length > 0 && (
          <button
            onClick={clearChat}
            className="text-xs text-legal-muted hover:text-gold-400 transition-colors px-3 py-1 rounded-full border border-navy-700 hover:border-gold-400/60 cursor-pointer"
          >
            {t('header.newChat')}
          </button>
        )}
      </div>
    </header>
  )
}

export function LanguageSwitcher({
  lang,
  onChange,
}: {
  lang: Lang
  onChange: (l: Lang) => void
}) {
  return (
    <div className="flex items-center bg-navy-800 border border-navy-700 rounded-lg p-0.5">
      {LANGUAGES.map((l) => (
        <button
          key={l.id}
          onClick={() => onChange(l.id)}
          title={l.native}
          className={`text-[11px] font-bold px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
            lang === l.id
              ? 'bg-gold-400 text-navy-950'
              : 'text-legal-muted hover:text-gold-400'
          }`}
        >
          {l.id.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
