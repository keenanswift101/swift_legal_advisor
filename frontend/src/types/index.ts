// ─────────────────────────────────────────────────────────────────────────────
//  Shared TypeScript interfaces
// ─────────────────────────────────────────────────────────────────────────────

export interface Citation {
  act_name: string
  section: string
  excerpt: string
  source?: string
}

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  citations?: Citation[]
  legal_domain?: string
  timestamp: Date
  isStreaming?: boolean
  isError?: boolean
}

export interface ChatState {
  messages: Message[]
  isLoading: boolean
  error: string | null
  sessionId: string | null
}

export type SSEEventType = 'domain' | 'token' | 'citations' | 'done' | 'error'

export interface SSEEvent {
  type: SSEEventType
  content?: string | Citation[]
}

// ─── Document Drafting ───────────────────────────────────────────────────────

export interface DocumentField {
  id: string
  label: string
  type: 'text' | 'textarea'
  placeholder?: string
}

export interface DocumentType {
  id: string
  label: string
  fields: DocumentField[]
}

export interface DraftingState {
  documentTypes: DocumentType[]
  selectedTypeId: string | null
  fields: Record<string, string>
  isGenerating: boolean
  output: string
  error: string | null
}
