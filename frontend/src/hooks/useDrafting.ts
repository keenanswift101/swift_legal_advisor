import { useState, useCallback, useRef } from 'react'
import type { DocumentType } from '../types'
import { getDocumentTypes, streamDraft } from '../services/api'

export function useDrafting() {
  const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([])
  const [selectedTypeId, setSelectedTypeIdRaw] = useState<string | null>(null)
  const [fields, setFields] = useState<Record<string, string>>({})
  const [isGenerating, setIsGenerating] = useState(false)
  const [output, setOutput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const loadDocumentTypes = useCallback(async () => {
    try {
      const types = await getDocumentTypes()
      setDocumentTypes(types)
    } catch (err) {
      setError((err as Error).message)
    }
  }, [])

  const setField = useCallback((id: string, value: string) => {
    setFields(prev => ({ ...prev, [id]: value }))
  }, [])

  const setSelectedTypeId = useCallback((id: string) => {
    setSelectedTypeIdRaw(id)
    setFields({})
    setOutput('')
    setError(null)
  }, [])

  const clearOutput = useCallback(() => {
    setOutput('')
    setError(null)
  }, [])

  const stopGeneration = useCallback(() => {
    abortRef.current?.abort()
    setIsGenerating(false)
  }, [])

  const generateDocument = useCallback(async () => {
    if (!selectedTypeId) return
    setIsGenerating(true)
    setOutput('')
    setError(null)

    const ctrl = new AbortController()
    abortRef.current = ctrl

    await streamDraft(
      { doc_type_id: selectedTypeId, fields },
      (token) => setOutput(prev => prev + token),
      (err) => { setError(err); setIsGenerating(false) },
      ctrl.signal,
    )

    setIsGenerating(false)
  }, [selectedTypeId, fields])

  return {
    documentTypes,
    loadDocumentTypes,
    selectedTypeId,
    setSelectedTypeId,
    fields,
    setField,
    isGenerating,
    output,
    error,
    generateDocument,
    stopGeneration,
    clearOutput,
  }
}
