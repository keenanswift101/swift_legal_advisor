import { useEffect, useRef } from 'react'
import { useDraftingContext } from '../context/DraftingContext'
import { FolderIcon, SparklesIcon, LoaderIcon, PrinterIcon, DownloadIcon, FileTextIcon } from './icons'

export function DraftingPanel() {
  const {
    documentTypes,
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
  } = useDraftingContext()

  const outputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [output])

  const selectedType = documentTypes.find(d => d.id === selectedTypeId)

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
  }

  const handlePrint = () => {
    const w = window.open('', '_blank')
    if (!w) return
    const escaped = output.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    w.document.write(`<!DOCTYPE html>
<html>
  <head>
    <title>${selectedType?.label ?? 'Legal Document'}</title>
    <style>
      body {
        font-family: "Times New Roman", Times, serif;
        font-size: 12pt;
        line-height: 1.7;
        margin: 2.5cm 3cm;
        color: #000;
      }
      pre {
        font-family: inherit;
        white-space: pre-wrap;
        word-break: break-word;
        font-size: 12pt;
        margin: 0;
      }
    </style>
  </head>
  <body><pre>${escaped}</pre></body>
</html>`)
    w.document.close()
    w.focus()
    w.print()
  }

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${selectedTypeId ?? 'document'}_${new Date().toISOString().slice(0, 10)}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-col h-full overflow-hidden bg-navy-900">

      {/* ── Top bar: document type selector ── */}
      <div className="flex-shrink-0 px-6 py-4 bg-navy-950 border-b border-navy-700 flex items-end gap-4 flex-wrap">
        <div className="flex-1 min-w-[220px] max-w-sm">
          <label className="block text-[11px] text-legal-muted uppercase tracking-widest mb-1.5 font-medium">
            Document Type
          </label>
          <select
            value={selectedTypeId ?? ''}
            onChange={e => setSelectedTypeId(e.target.value)}
            className="w-full bg-navy-800 border border-navy-600 text-legal-text rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold-400 cursor-pointer"
          >
            <option value="" disabled>Select a document type…</option>
            {documentTypes.map(d => (
              <option key={d.id} value={d.id}>{d.label}</option>
            ))}
          </select>
        </div>
        {selectedType && (
          <p className="text-[11px] text-legal-muted pb-2">
            Fill in the fields on the left, then click <strong className="text-gold-400">Generate Document</strong>.
          </p>
        )}
      </div>

      {/* ── Main two-column body ── */}
      <div className="flex-1 flex min-h-0 overflow-hidden">

        {/* Left column: form */}
        <div className="w-[42%] flex-shrink-0 border-r border-navy-700 overflow-y-auto bg-navy-900">
          {!selectedType ? (
            <div className="flex flex-col items-center justify-center h-full text-legal-muted text-sm p-10 text-center gap-4">
              <FolderIcon className="w-12 h-12 opacity-30" />
              <p className="opacity-70">Select a document type from the dropdown above to begin.</p>
            </div>
          ) : (
            <div className="p-6 flex flex-col gap-4 animate-fade-in">
              <h2 className="text-gold-400 font-serif text-base font-semibold flex items-center gap-2">
                <FileTextIcon className="w-4 h-4 opacity-70" />
                <span>{selectedType.label}</span>
              </h2>

              {selectedType.fields.map(field => (
                <div key={field.id}>
                  <label className="block text-[11px] text-legal-muted uppercase tracking-wide mb-1.5 font-medium">
                    {field.label}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      value={fields[field.id] ?? ''}
                      onChange={e => setField(field.id, e.target.value)}
                      placeholder={field.placeholder ?? ''}
                      rows={3}
                      className="w-full bg-navy-800 border border-navy-600 text-legal-text rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold-400 resize-y placeholder:text-legal-muted/40"
                    />
                  ) : (
                    <input
                      type="text"
                      value={fields[field.id] ?? ''}
                      onChange={e => setField(field.id, e.target.value)}
                      placeholder={field.placeholder ?? ''}
                      className="w-full bg-navy-800 border border-navy-600 text-legal-text rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold-400 placeholder:text-legal-muted/40"
                    />
                  )}
                </div>
              ))}

              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={generateDocument}
                  disabled={isGenerating}
                  className="w-full bg-gold-400 hover:bg-gold-300 active:bg-gold-500 disabled:opacity-50 disabled:cursor-not-allowed text-navy-950 font-semibold rounded-lg px-4 py-2.5 text-sm transition-colors flex items-center justify-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <LoaderIcon className="w-4 h-4 animate-spin" />
                      Generating…
                    </>
                  ) : (
                    <>
                      <SparklesIcon className="w-4 h-4" />
                      Generate Document
                    </>
                  )}
                </button>
                {isGenerating && (
                  <button
                    onClick={stopGeneration}
                    className="w-full text-xs text-legal-muted hover:text-red-600 py-1.5 border border-navy-700 hover:border-red-400 rounded-lg transition-colors"
                  >
                    Stop
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right column: output */}
        <div className="flex-1 flex flex-col overflow-hidden bg-navy-950">

          {/* Output toolbar */}
          {output && (
            <div className="flex-shrink-0 flex items-center gap-2 px-4 py-2 border-b border-navy-700 bg-navy-900 flex-wrap">
              <span className="flex-1 text-[11px] text-gold-400 font-medium truncate">
                {selectedType?.label}
              </span>
              <button
                onClick={handleCopy}
                className="text-[11px] text-legal-muted hover:text-gold-400 px-2.5 py-1 border border-navy-700 rounded hover:border-gold-500/60 transition-colors"
              >
                Copy
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center gap-1 text-[11px] text-legal-muted hover:text-gold-400 px-2.5 py-1 border border-navy-700 rounded hover:border-gold-500/60 transition-colors"
              >
                <PrinterIcon className="w-3.5 h-3.5" />
                Print
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-1 text-[11px] text-legal-muted hover:text-gold-400 px-2.5 py-1 border border-navy-700 rounded hover:border-gold-500/60 transition-colors"
              >
                <DownloadIcon className="w-3.5 h-3.5" />
                Download
              </button>
              <button
                onClick={clearOutput}
                className="text-[11px] text-legal-muted hover:text-red-600 px-2.5 py-1 border border-navy-700 rounded hover:border-red-400 transition-colors"
              >
                Clear
              </button>
            </div>
          )}

          {/* Error banner */}
          {error && (
            <div className="flex-shrink-0 mx-4 mt-4 p-3 bg-red-50 border border-red-300 rounded-lg text-red-800 text-sm">
              {error}
            </div>
          )}

          {/* Document content */}
          {!output && !isGenerating ? (
            <div className="flex-1 flex flex-col items-center justify-center text-legal-muted text-sm p-10 text-center gap-3">
              <FileTextIcon className="w-12 h-12 opacity-20" />
              <p className="opacity-70">Your generated document will appear here.</p>
              <p className="text-xs opacity-40">Supports Copy, Print (letter format), and Download.</p>
            </div>
          ) : (
            <div ref={outputRef} className="flex-1 overflow-y-auto p-6">
              <pre className="font-serif text-sm text-legal-text whitespace-pre-wrap leading-relaxed">
                {output}
                {isGenerating && <span className="inline-block animate-pulse text-gold-400 ml-0.5">|</span>}
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 border-t border-navy-700 px-6 py-2 bg-navy-950">
        <p className="text-[10px] text-legal-muted/50 text-center">
          Drafts are AI-generated and require review by a qualified Namibian legal practitioner before use.
        </p>
      </div>
    </div>
  )
}
