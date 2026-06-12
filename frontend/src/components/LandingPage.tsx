import { useI18n } from '../i18n'
import { LanguageSwitcher } from './Header'
import {
  ScaleIcon,
  ShieldIcon,
  FileTextIcon,
  ChatBubbleIcon,
  ChevronRightIcon,
  CheckIcon,
  NamibiaFlag,
} from './icons'

interface LandingPageProps {
  onStart: (mode: 'chat' | 'draft') => void
  onOpenGuides: () => void
}

const FEATURE_ICONS = [ChatBubbleIcon, ShieldIcon, FileTextIcon]

export function LandingPage({ onStart, onOpenGuides }: LandingPageProps) {
  const { lang, setLang, t } = useI18n()

  const features = [1, 2, 3].map((i) => ({
    icon: FEATURE_ICONS[i - 1],
    title: t(`landing.feature${i}.title`),
    text: t(`landing.feature${i}.text`),
  }))
  const coverage = [1, 2, 3, 4, 5, 6, 7, 8].map((i) => t(`landing.coverage.${i}`))

  return (
    <div className="min-h-screen bg-legal-bg text-legal-text overflow-y-auto">
      {/* ── Nav ─────────────────────────────────────────────────────────── */}
      <nav className="max-w-5xl mx-auto flex items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gold-100 flex items-center justify-center text-gold-400">
            <ScaleIcon className="w-5 h-5" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg font-bold tracking-wide">Swifty</span>
            <NamibiaFlag className="w-6 h-auto" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSwitcher lang={lang} onChange={setLang} />
          <button
            onClick={onOpenGuides}
            className="hidden sm:block text-sm font-medium text-legal-muted hover:text-legal-text transition-colors cursor-pointer"
          >
            {t('landing.nav.guides')}
          </button>
          <button
            onClick={() => onStart('chat')}
            className="text-sm font-bold bg-accent-600 hover:bg-accent-500 text-white px-5 py-2 rounded-xl transition-colors cursor-pointer"
          >
            {t('landing.nav.start')}
          </button>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 pt-16 pb-14 text-center animate-slide-up">
        <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-legal-muted border border-navy-700 rounded-full px-4 py-1.5 mb-6">
          {t('landing.badge')}
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold leading-tight mb-5">
          {t('landing.heroTitle1')}
          <br />
          {t('landing.heroTitle2')}
        </h1>
        <p className="text-legal-muted text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-9">
          {t('landing.heroSub')}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => onStart('chat')}
            className="flex items-center gap-2 bg-accent-600 hover:bg-accent-500 text-white text-sm font-bold px-7 py-3.5 rounded-xl shadow-sm transition-all hover:-translate-y-0.5 w-full sm:w-auto justify-center cursor-pointer"
          >
            {t('landing.cta.guidance')}
            <ChevronRightIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => onStart('draft')}
            className="flex items-center gap-2 bg-white border border-navy-600 hover:border-gold-400 text-gold-400 text-sm font-semibold px-7 py-3.5 rounded-xl transition-all hover:-translate-y-0.5 w-full sm:w-auto justify-center cursor-pointer"
          >
            <FileTextIcon className="w-4 h-4" />
            {t('landing.cta.draft')}
          </button>
        </div>
        <p className="text-legal-muted text-xs mt-5">{t('landing.trustLine')}</p>
      </section>

      {/* ── Features ────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="grid sm:grid-cols-3 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white border border-navy-700 rounded-2xl p-6 text-left shadow-sm"
            >
              <span className="w-10 h-10 rounded-xl bg-gold-100 text-gold-400 flex items-center justify-center mb-4">
                <f.icon className="w-5 h-5" />
              </span>
              <h3 className="font-serif text-lg font-bold mb-1.5">{f.title}</h3>
              <p className="text-legal-muted text-sm leading-relaxed">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Coverage ────────────────────────────────────────────────────── */}
      <section className="border-t border-navy-700 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <h2 className="font-serif text-2xl font-bold text-center mb-2">
            {t('landing.coverage.title')}
          </h2>
          <p className="text-legal-muted text-sm text-center mb-8 max-w-lg mx-auto">
            {t('landing.coverage.sub')}
          </p>
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-3 max-w-2xl mx-auto">
            {coverage.map((item) => (
              <div key={item} className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-gold-400/10 border border-gold-500/40 text-gold-400 flex items-center justify-center flex-shrink-0">
                  <CheckIcon className="w-3 h-3" />
                </span>
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button
              onClick={() => onStart('chat')}
              className="inline-flex items-center gap-2 bg-accent-600 hover:bg-accent-500 text-white text-sm font-bold px-7 py-3.5 rounded-xl shadow-sm transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              {t('landing.cta.startFree')}
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="border-t border-navy-700">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-serif font-bold">
            <ScaleIcon className="w-4 h-4 text-gold-400" />
            Swifty
            <span className="font-sans font-normal text-legal-muted text-xs">
              · {t('header.subtitle')}
            </span>
          </div>
          <p className="text-legal-muted text-[11px] text-center sm:text-right leading-relaxed max-w-md">
            {t('landing.footer.disclaimer')}
          </p>
        </div>
      </footer>
    </div>
  )
}
