// ─────────────────────────────────────────────────────────────────────────────
//  Lightweight i18n — no dependencies.
//
//  - `useI18n()` → { lang, setLang, t } anywhere under <LanguageProvider>.
//  - t(key, vars?) looks up the active language and falls back to English,
//    so partially translated languages are safe to ship.
//  - Localized intake categories and guides merge translator overlay files
//    (i18n/intake.<lang>.ts, i18n/guides.<lang>.ts) over the canonical
//    English data. Adding a language = adding overlay files + LANGUAGES entry.
// ─────────────────────────────────────────────────────────────────────────────

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { UI_STRINGS, type Lang } from './ui'
import { INTAKE_CATEGORIES, type IntakeCategory } from '../data/intake'
import { GUIDES, type Guide } from '../data/guides'
import { INTAKE_AF, type IntakeOverlay } from './intake.af'
import { GUIDES_AF, type GuideOverlay } from './guides.af'

const STORAGE_KEY = 'swifty-lang'

const INTAKE_OVERLAYS: Partial<Record<Lang, IntakeOverlay>> = { af: INTAKE_AF }
const GUIDE_OVERLAYS: Partial<Record<Lang, GuideOverlay>> = { af: GUIDES_AF }

interface I18nValue {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: string, vars?: Record<string, string | number>) => string
  categories: IntakeCategory[]
  guides: Guide[]
}

const I18nContext = createContext<I18nValue | null>(null)

export function getStoredLang(): Lang {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored === 'af' ? 'af' : 'en'
}

function localizeCategories(lang: Lang): IntakeCategory[] {
  const overlay = INTAKE_OVERLAYS[lang]
  if (!overlay) return INTAKE_CATEGORIES

  return INTAKE_CATEGORIES.map((cat) => {
    const o = overlay[cat.id]
    if (!o) return cat
    return {
      ...cat,
      label: o.label ?? cat.label,
      description: o.description ?? cat.description,
      crisis:
        cat.crisis === undefined
          ? undefined
          : {
              message: o.crisis?.message ?? cat.crisis.message,
              lines: cat.crisis.lines.map((line, i) => ({
                ...line,
                label: o.crisis?.lineLabels?.[i] ?? line.label,
              })),
            },
      questions: cat.questions.map((q) => {
        const qo = o.questions?.[q.id]
        if (!qo) return q
        return {
          ...q,
          question: qo.question ?? q.question,
          summaryLabel: qo.summaryLabel ?? q.summaryLabel,
          hint: qo.hint ?? q.hint,
          options: q.options.map((opt) => ({
            ...opt,
            label: qo.options?.[opt.id] ?? opt.label,
          })),
        }
      }),
    }
  })
}

function localizeGuides(lang: Lang): Guide[] {
  const overlay = GUIDE_OVERLAYS[lang]
  if (!overlay) return GUIDES
  return GUIDES.map((g) => {
    const o = overlay[g.id]
    if (!o) return g
    return {
      ...g,
      title: o.title ?? g.title,
      summary: o.summary ?? g.summary,
      content: o.content ?? g.content,
    }
  })
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getStoredLang)

  const setLang = useCallback((l: Lang) => {
    localStorage.setItem(STORAGE_KEY, l)
    setLangState(l)
  }, [])

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      let s = UI_STRINGS[lang][key] ?? UI_STRINGS.en[key] ?? key
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          s = s.split(`{${k}}`).join(String(v))
        }
      }
      return s
    },
    [lang],
  )

  const value = useMemo<I18nValue>(
    () => ({
      lang,
      setLang,
      t,
      categories: localizeCategories(lang),
      guides: localizeGuides(lang),
    }),
    [lang, setLang, t],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within LanguageProvider')
  return ctx
}
