import { createContext, useContext, useEffect, type ReactNode } from 'react'
import { useDrafting } from '../hooks/useDrafting'

type DraftingContextType = ReturnType<typeof useDrafting>

const DraftingContext = createContext<DraftingContextType | null>(null)

export function DraftingProvider({ children }: { children: ReactNode }) {
  const drafting = useDrafting()

  useEffect(() => {
    drafting.loadDocumentTypes()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <DraftingContext.Provider value={drafting}>
      {children}
    </DraftingContext.Provider>
  )
}

export function useDraftingContext() {
  const ctx = useContext(DraftingContext)
  if (!ctx) throw new Error('useDraftingContext must be used inside DraftingProvider')
  return ctx
}
