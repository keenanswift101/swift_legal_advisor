import { useState } from 'react'
import { ChatProvider } from './context/ChatContext'
import { DraftingProvider } from './context/DraftingContext'
import { Header } from './components/Header'
import { ChatWindow } from './components/ChatWindow'
import { DraftingPanel } from './components/DraftingPanel'

type AppMode = 'chat' | 'draft'

export default function App() {
  const [mode, setMode] = useState<AppMode>('chat')

  return (
    <ChatProvider>
      <DraftingProvider>
        <div className="h-screen flex flex-col bg-navy-900 text-legal-text overflow-hidden">
          <Header mode={mode} onModeChange={setMode} />
          <main className="flex-1 flex min-h-0 overflow-hidden">
            {mode === 'chat' ? <ChatWindow /> : <DraftingPanel />}
          </main>
        </div>
      </DraftingProvider>
    </ChatProvider>
  )
}
