# DESIGN.md — Swifty design system

The visual and interaction language of Swifty. Read before touching any UI.

## Brand

- **Name:** Swifty · Paralegal Assistant · Namibia
- **Mark:** scales-of-justice icon (`ScaleIcon`) + Namibian flag (`NamibiaFlag`)
- **Voice:** plain language, warm, non-judgmental, never condescending.
  Write for someone stressed, on a phone, who has never spoken to a lawyer.
- **No emojis. Anywhere.** Icons are inline SVG components
  (`frontend/src/components/icons.tsx`, Heroicons-style strokes).

## Colour — strict monochrome

White background, black text. The **only** colours allowed:

1. The Namibian flag (brand mark — never recolour it)
2. Crisis/error red (`red-50/300/700/800/900` light-theme tints) — reserved for
   danger banners and failure states

### Token table (Tailwind, `frontend/tailwind.config.js`)

The palette keeps legacy token *names* (`navy`, `gold`) but maps them to a light
greyscale. **`navy-*` = surfaces, `gold-*` = ink.**

| Token | Hex | Use |
|---|---|---|
| `navy-950` | `#ffffff` | page background, text on black buttons |
| `navy-900` | `#fafafa` | section tint |
| `navy-800` | `#f5f5f5` | cards, bubbles, input container |
| `navy-700` | `#e5e5e5` | borders |
| `navy-600` | `#d4d4d4` | user bubble, strong borders |
| `navy-500` | `#a3a3a3` | disabled ink |
| `gold-400` | `#171717` | **primary action** (black buttons, active tab) |
| `gold-300` | `#2e2e2e` | primary hover |
| `gold-500` | `#404040` | secondary ink, icon accents |
| `gold-600` | `#525252` | tertiary ink |
| `legal.text` | `#0a0a0a` | body text |
| `legal.muted` | `#262626` | secondary text (kept near-black on purpose) |

Pattern for primary buttons: `bg-gold-400 hover:bg-gold-300 text-navy-950`
(black button, white label). Disabled: `disabled:bg-navy-700 disabled:text-navy-500`.

## Typography

- **Headings:** Georgia / Times New Roman (`font-serif`) — bold, legal gravitas
- **Body/UI:** Inter (`font-sans`), loaded from Google Fonts in `index.html`
- Markdown answers use `prose prose-sm` with serif headings via overrides in
  `frontend/src/index.css`

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
