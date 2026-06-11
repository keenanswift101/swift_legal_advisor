import { useChatContext } from '../context/ChatContext'

type AppMode = 'chat' | 'draft'

interface HeaderProps {
  mode: AppMode
  onModeChange: (mode: AppMode) => void
}

export function Header({ mode, onModeChange }: HeaderProps) {
  const { clearChat, messages } = useChatContext()

  return (
    <header className="flex-shrink-0 bg-navy-950 border-b border-navy-700 px-6 py-3 flex items-center justify-between gap-4">
      {/* Brand */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <div className="w-9 h-9 rounded-full bg-gold-500 flex items-center justify-center text-navy-950 font-bold text-base font-serif select-none">
          ⚖
        </div>
        <div>
          <h1 className="text-gold-400 font-serif text-lg font-bold tracking-wide leading-none">
            NamibiaLex
          </h1>
          <p className="text-legal-muted text-[11px] leading-none mt-0.5">
            AI Legal Advisor · Namibian Business Law
          </p>
        </div>
      </div>

      {/* Mode tabs */}
      <div className="flex items-center gap-1 bg-navy-800 border border-navy-700 rounded-lg p-0.5">
        <button
          onClick={() => onModeChange('chat')}
          className={`text-xs px-4 py-1.5 rounded-md font-medium transition-colors ${
            mode === 'chat'
              ? 'bg-gold-500 text-navy-950'
              : 'text-legal-muted hover:text-gold-400'
          }`}
        >
          💬 Legal Advisor
        </button>
        <button
          onClick={() => onModeChange('draft')}
          className={`text-xs px-4 py-1.5 rounded-md font-medium transition-colors ${
            mode === 'draft'
              ? 'bg-gold-500 text-navy-950'
              : 'text-legal-muted hover:text-gold-400'
          }`}
        >
          📄 Document Drafter
        </button>
      </div>

      {/* Right badges */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="hidden sm:inline text-[11px] text-legal-muted bg-navy-800 px-3 py-1 rounded-full border border-navy-700">
          UNAM LLM · Masters Level
        </span>
        {mode === 'chat' && messages.length > 0 && (
          <button
            onClick={clearChat}
            className="text-xs text-legal-muted hover:text-gold-400 transition-colors px-3 py-1 rounded-full border border-navy-700 hover:border-gold-500/60"
          >
            New Chat
          </button>
        )}
      </div>
    </header>
  )
}
