import type { Citation, DocumentType, SSEEvent, SSEEventType } from '../types'

export interface ApiChatRequest {
  message: string
  session_id?: string
  history?: Array<{ role: string; content: string }>
}

/**
 * Open a streaming SSE connection to POST /api/chat and dispatch events to
 * the provided callbacks as they arrive.
 */
export async function streamChat(
  request: ApiChatRequest,
  onToken: (token: string) => void,
  onDomain: (domain: string) => void,
  onCitations: (citations: Citation[]) => void,
  onDone: (sessionId: string) => void,
  onError: (error: string) => void,
  signal?: AbortSignal,
): Promise<void> {
  let response: Response
  try {
    response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
      signal,
    })
  } catch (err) {
    if ((err as Error).name === 'AbortError') return
    onError((err as Error).message)
    return
  }

  if (!response.ok) {
    onError(`Server error ${response.status}: ${await response.text()}`)
    return
  }

  const reader = response.body?.getReader()
  if (!reader) {
    onError('Response has no body')
    return
  }

  const decoder = new TextDecoder()
  let buffer = ''

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() ?? ''

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue
        const jsonStr = line.slice(6).trim()
        if (!jsonStr) continue

        try {
          const event: SSEEvent = JSON.parse(jsonStr)
          switch (event.type as SSEEventType) {
            case 'domain':
              onDomain(event.content as string)
              break
            case 'token':
              onToken(event.content as string)
              break
            case 'citations':
              onCitations(event.content as Citation[])
              break
            case 'done':
              onDone(event.content as string)
              break
            case 'error':
              onError(event.content as string)
              break
          }
        } catch {
          // Silently skip malformed JSON lines
        }
      }
    }
  } finally {
    reader.releaseLock()
  }
}

export async function getCollections(): Promise<Record<string, number>> {
  const res = await fetch('/api/collections')
  if (!res.ok) throw new Error(`Failed to fetch collections: ${res.status}`)
  const data = await res.json()
  return data.collections as Record<string, number>
}

// ─── Document Drafting ───────────────────────────────────────────────────────

export async function getDocumentTypes(): Promise<DocumentType[]> {
  const res = await fetch('/api/document-types')
  if (!res.ok) throw new Error(`Failed to fetch document types: ${res.status}`)
  return res.json()
}

export async function streamDraft(
  request: { doc_type_id: string; fields: Record<string, string> },
  onToken: (token: string) => void,
  onError: (error: string) => void,
  signal?: AbortSignal,
): Promise<void> {
  let response: Response
  try {
    response = await fetch('/api/draft', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
      signal,
    })
  } catch (err) {
    if ((err as Error).name === 'AbortError') return
    onError((err as Error).message)
    return
  }

  if (!response.ok) {
    onError(`Server error ${response.status}: ${await response.text()}`)
    return
  }

  const reader = response.body?.getReader()
  if (!reader) {
    onError('Response has no body')
    return
  }

  const decoder = new TextDecoder()
  let buffer = ''

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() ?? ''

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue
        const jsonStr = line.slice(6).trim()
        if (!jsonStr) continue
        try {
          const event = JSON.parse(jsonStr) as { type: string; content: string }
          if (event.type === 'token') onToken(event.content)
          else if (event.type === 'error') onError(event.content)
        } catch {
          // skip malformed
        }
      }
    }
  } finally {
    reader.releaseLock()
  }
}
