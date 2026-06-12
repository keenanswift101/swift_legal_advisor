# DESIGN.md — Swifty design system

The visual and interaction language of Swifty. Read before touching any UI.
**Methodology: "Calm Trust"** (adopted 12 Jun 2026) — soft off-white surfaces,
deep navy ink, one warm amber accent reserved for conversion moments. Calm,
human, classic legal trust; never stark, never loud.

## Brand

- **Name:** Swifty · Paralegal Assistant · Namibia
- **Mark:** scales-of-justice icon (`ScaleIcon`) + Namibian flag (`NamibiaFlag`)
- **Voice:** plain language, warm, non-judgmental, never condescending.
  Write for someone stressed, on a phone, who has never spoken to a lawyer.
- **No emojis. Anywhere.** Icons are inline SVG components
  (`frontend/src/components/icons.tsx`, Heroicons-style strokes).

## Colour — Calm Trust

Three ingredients, strictly rationed:

1. **Navy ink** (`#1e3a8a`) — headings, primary buttons, icons, links
2. **Warm amber** (`#b45309`) — ONLY the main conversion CTAs ("Get legal
   guidance", wizard submit, "Start now"). Never more than one amber element
   visible per screen region.
3. **Cool greys/off-white** — everything else. Plus the Namibian flag (never
   recolour) and crisis/error red tints (danger banners and failures only).

### Token table (Tailwind, `frontend/tailwind.config.js`)

Legacy token *names* are kept (`navy`, `gold`) but remapped:
**`navy-*` = surfaces, `gold-*` = navy ink, `accent-*` = amber CTA.**

| Token | Hex | Use |
|---|---|---|
| `navy-950` | `#ffffff` | white cards, text on navy buttons |
| `navy-900` | `#f8fafc` | page background (slate-50) |
| `navy-800` | `#f1f5f9` | tinted surfaces, input container |
| `navy-700` | `#e2e8f0` | borders |
| `navy-600` | `#cbd5e1` | strong borders, stop button |
| `navy-500` | `#94a3b8` | disabled ink |
| `gold-400` | `#1e3a8a` | **primary** — navy buttons, active tab, headings, icons |
| `gold-300` | `#2d4da8` | primary hover |
| `gold-500` | `#2c4a9e` | secondary navy ink (§ marks, markers) |
| `gold-600` | `#16306e` | darkest navy |
| `gold-100` | `#e0e7ff` | navy tint — icon chips, user bubble |
| `accent-600` | `#b45309` | **amber CTA** |
| `accent-500` | `#d97706` | amber hover |
| `legal.bg` | `#f8fafc` | page background |
| `legal.text` | `#0f172a` | body text (slate-900) |
| `legal.muted` | `#475569` | secondary text (slate-600, ≥7:1 on white) |

Button patterns:
- Primary (navy): `bg-gold-400 hover:bg-gold-300 text-navy-950`
- Conversion CTA (amber): `bg-accent-600 hover:bg-accent-500 text-white shadow-sm`
- Disabled: `disabled:bg-navy-700 disabled:text-navy-500`
- Cards: `bg-white border border-navy-700 shadow-sm` + hover lift; icon chips
  `bg-gold-100 text-gold-400`

## Typography

- **Headings:** EB Garamond (`font-serif`, weights 400–700) — warm, bookish,
  legal gravitas without stiffness
- **Body/UI:** Lato (`font-sans`, 300/400/700)
- Both loaded from Google Fonts in `index.html`
- Markdown answers use `prose prose-sm`; headings render navy EB Garamond via
  overrides in `frontend/src/index.css`

## Motion

Defined in `tailwind.config.js`; all enter-animations use the spring curve
`cubic-bezier(0.16, 1, 0.3, 1)`:

- `animate-fade-in` (0.25s) — bubbles, panels
- `animate-slide-up` (0.35s) — page/section entrances
- `animate-step-in` (0.3s, slides from right) — wizard steps
- `animate-scale-in` (0.25s) — selections
- Streaming cursor: 2px black bar, `blink` keyframe
- Activity dots: Tailwind `animate-ping`/`animate-pulse`

## Core surfaces & components

| Surface | Component | Notes |
|---|---|---|
| Landing page | `LandingPage` | Hero "Know your rights. In plain language.", feature cards, coverage checklist, footer disclaimer |
| App header | `Header` | Brand (click = back to landing), mode tabs, "New Chat" pill |
| Welcome | `ChatWindow → WelcomeScreen` | 8 category cards, "or type below", Legal Info Library link, trust pills |
| Intake wizard | `IntakeWizard` | Progress bar, Step n of N, auto-advance on select (~240 ms), Back keeps selections, review screen with tap-to-edit, crisis banner (escalates red on danger answers) |
| Chat | `MessageBubble` | User: grey bubble, `whitespace-pre-line`. Assistant: avatar + domain badge + prose + citations button + timestamp |
| Agent activity | `AgentActivity` | 4-stage vertical timeline driven by real SSE state; hidden once streaming ends |
| Chat input | `ChatWindow → ChatInputBar` | **Always visible** — its own component; typing mid-wizard closes the wizard and sends |
| Citations | `CitationPanel` | Slide-in right panel (24rem), mobile scrim |
| Guides | `GuidePage` | Full-screen overlay (z-50): library grid + article view, sticky top bar, disclaimer card |
| Drafter | `DraftingPanel` | Two-pane: form left, streamed document right with Copy/Print/Download |

## UX rules

1. **The chat input never disappears.** Wizard, welcome, conversation — it stays.
2. **Always a way back:** wizard Back/X · "Start a new case" after every answer ·
   brand click → landing. No dead ends.
3. **Crisis first:** safety flows show Police **10111** / GBV Helpline **106**
   (tap-to-call) from the first question; red escalation when danger is flagged.
4. **Show the work:** activity timeline while thinking; citations on every answer.
5. **Errors are human:** friendly sentence + link to the matching static guide —
   never codes, request IDs or JSON (enforced in `backend/app/api/errors.py` and
   `useChat.friendlyError`).
6. **Single-select questions auto-advance** after a visible selection beat;
   multi-step forms show progress and step count.
7. Hover affordances: cards lift (`hover:-translate-y-0.5`) + border sharpens to
   `gold-500/50`.

## Accessibility

- Flag SVG has `role="img"` + `aria-label`; icon-only buttons carry `title`
- Focus: inputs use `focus-within:border-gold-500/60`
- Contrast: body text #0a0a0a on #ffffff; muted #262626 — AAA on white
- Crisis numbers are real `tel:` links
