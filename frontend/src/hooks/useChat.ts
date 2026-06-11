import { useCallback, useRef, useState } from 'react'
import type { Citation, ChatState, Message } from '../types'
import { streamChat } from '../services/api'

function generateId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export interface UseChatReturn extends ChatState {
  sendMessage: (text: string) => Promise<void>
  stopGeneration: () => void
  clearChat: () => void
}

export function useChat(): UseChatReturn {
  const [state, setState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null,
    sessionId: null,
  })

  const abortRef = useRef<AbortController | null>(null)

  const sendMessage = useCallback(
    async (userInput: string) => {
      const text = userInput.trim()
      if (!text || state.isLoading) return

      const userMsg: Message = {
        id: generateId(),
        role: 'user',
        content: text,
        timestamp: new Date(),
      }
      const assistantMsgId = generateId()
      const assistantMsg: Message = {
        id: assistantMsgId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        isStreaming: true,
      }

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, userMsg, assistantMsg],
        isLoading: true,
        error: null,
      }))

      abortRef.current = new AbortController()

      // Snapshot the message history for the request (last 12 turns)
      const history = state.messages.slice(-12).map((m) => ({
        role: m.role,
        content: m.content,
      }))

      const patch = (updates: Partial<Message>) =>
        setState((prev) => ({
          ...prev,
          messages: prev.messages.map((m) =>
            m.id === assistantMsgId ? { ...m, ...updates } : m,
          ),
        }))

      try {
        await streamChat(
          {
            message: text,
            session_id: state.sessionId ?? undefined,
            history,
          },
          // onToken
          (token) => {
            setState((prev) => ({
              ...prev,
              messages: prev.messages.map((m) =>
                m.id === assistantMsgId
                  ? { ...m, content: m.content + token }
                  : m,
              ),
            }))
          },
          // onDomain
          (domain) => patch({ legal_domain: domain }),
          // onCitations
          (citations: Citation[]) => patch({ citations }),
          // onDone
          (sessionId) => {
            setState((prev) => ({
              ...prev,
              isLoading: false,
              sessionId,
              messages: prev.messages.map((m) =>
                m.id === assistantMsgId ? { ...m, isStreaming: false } : m,
              ),
            }))
          },
          // onError
          (error) => {
            setState((prev) => ({
              ...prev,
              isLoading: false,
              error,
              messages: prev.messages.map((m) =>
                m.id === assistantMsgId
                  ? { ...m, content: `⚠ ${error}`, isStreaming: false }
                  : m,
              ),
            }))
          },
          abortRef.current.signal,
        )
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          const msg = (err as Error).message
          patch({ content: `⚠ ${msg}`, isStreaming: false })
          setState((prev) => ({ ...prev, isLoading: false, error: msg }))
        }
      }
    },
    [state.isLoading, state.messages, state.sessionId],
  )

  const stopGeneration = useCallback(() => {
    abortRef.current?.abort()
    setState((prev) => ({
      ...prev,
      isLoading: false,
      messages: prev.messages.map((m) =>
        m.isStreaming ? { ...m, isStreaming: false } : m,
      ),
    }))
  }, [])

  const clearChat = useCallback(() => {
    abortRef.current?.abort()
    setState({ messages: [], isLoading: false, error: null, sessionId: null })
  }, [])

  return { ...state, sendMessage, stopGeneration, clearChat }
}
