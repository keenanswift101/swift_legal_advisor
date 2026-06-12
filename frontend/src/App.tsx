import { useState } from 'react'
import { LanguageProvider } from './i18n'
import { ChatProvider } from './context/ChatContext'
import { DraftingProvider } from './context/DraftingContext'
import { Header } from './components/Header'
import { ChatWindow } from './components/ChatWindow'
import { DraftingPanel } from './components/DraftingPanel'
import { LandingPage } from './components/LandingPage'
import { GuidePage } from './components/GuidePage'

type AppMode = 'landing' | 'chat' | 'draft'

export default function App() {
  const [mode, setMode] = useState<AppMode>('landing')
  // null = closed · 'library' = guide list · otherwise a guide id
  const [guide, setGuide] = useState<string | null>(null)

  return (
    <LanguageProvider>
    <ChatProvider>
      <DraftingProvider>
        {mode === 'landing' ? (
          <LandingPage onStart={setMode} onOpenGuides={() => setGuide('library')} />
        ) : (
          <div className="h-screen flex flex-col bg-navy-900 text-legal-text overflow-hidden">
            <Header
              mode={mode}
              onModeChange={setMode}
              onHome={() => setMode('landing')}
            />
            <main className="flex-1 flex min-h-0 overflow-hidden">
              {mode === 'chat' ? (
                <ChatWindow onOpenGuide={setGuide} />
              ) : (
                <DraftingPanel />
              )}
            </main>
          </div>
        )}

        {guide && (
          <GuidePage
            selected={guide === 'library' ? null : guide}
            onSelect={(id) => setGuide(id || 'library')}
            onClose={() => setGuide(null)}
          />
        )}
      </DraftingProvider>
    </ChatProvider>
    </LanguageProvider>
  )
}
