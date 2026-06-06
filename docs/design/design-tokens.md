# Design Tokens — Muuday

## Brand Foundation

### Name

**Muuday** — Warm, inclusive, expansive.

### Tagline

"A sua jornada no exterior, com quem entende."

## Color System

### Primary Palette

| Token           | Hex       | RGB           | Usage                            |
| --------------- | --------- | ------------- | -------------------------------- |
| `--brand-lime`  | `#9FE870` | 159, 232, 112 | Primary CTA, accents, highlights |
| `--brand-dark`  | `#0F172A` | 15, 23, 42    | Text, headers, dark mode bg      |
| `--brand-slate` | `#64748B` | 100, 116, 139 | Secondary text, borders          |
| `--brand-light` | `#F8FAFC` | 248, 250, 252 | Page backgrounds                 |
| `--brand-white` | `#FFFFFF` | 255, 255, 255 | Cards, surfaces                  |

### Accent Palette

| Token             | Hex       | Usage                               |
| ----------------- | --------- | ----------------------------------- |
| `--accent-orange` | `#F97316` | Warm accents, alerts, Brazil warmth |
| `--accent-blue`   | `#3B82F6` | Links, info, trust                  |
| `--accent-purple` | `#8B5CF6` | Premium, special features           |
| `--accent-rose`   | `#F43F5E` | Love, community, heart              |

### Semantic Colors

| Token       | Hex       | Usage                           |
| ----------- | --------- | ------------------------------- |
| `--success` | `#22C55E` | Positive actions, confirmations |
| `--warning` | `#EAB308` | Caution, pending                |
| `--error`   | `#EF4444` | Errors, critical alerts         |
| `--info`    | `#3B82F6` | Information, tips               |

### Dark Mode

| Token              | Light     | Dark      |
| ------------------ | --------- | --------- |
| `--bg-page`        | `#F8FAFC` | `#0F172A` |
| `--bg-surface`     | `#FFFFFF` | `#1E293B` |
| `--bg-elevated`    | `#F1F5F9` | `#334155` |
| `--text-primary`   | `#0F172A` | `#F8FAFC` |
| `--text-secondary` | `#64748B` | `#94A3B8` |
| `--text-muted`     | `#94A3B8` | `#64748B` |
| `--border`         | `#E2E8F0` | `#334155` |

## Typography

### Font Family

- **Primary**: `Inter` or `Geist` (clean, modern, excellent for screens)
- **Display**: `Playfair Display` or `DM Serif Display` (for headlines, editorial feel)
- **Mono**: `JetBrains Mono` or `Geist Mono` (for code, data)

### Type Scale

| Token         | Size | Weight | Line Height | Letter Spacing | Usage                 |
| ------------- | ---- | ------ | ----------- | -------------- | --------------------- |
| `--text-xs`   | 12px | 400    | 16px        | 0              | Captions, labels      |
| `--text-sm`   | 14px | 400    | 20px        | 0              | Body small, secondary |
| `--text-base` | 16px | 400    | 24px        | 0              | Body default          |
| `--text-lg`   | 18px | 400    | 28px        | -0.01em        | Lead paragraphs       |
| `--text-xl`   | 20px | 500    | 30px        | -0.02em        | Subheadings           |
| `--text-2xl`  | 24px | 600    | 32px        | -0.02em        | H3                    |
| `--text-3xl`  | 30px | 600    | 36px        | -0.02em        | H2                    |
| `--text-4xl`  | 36px | 700    | 40px        | -0.03em        | H1 mobile             |
| `--text-5xl`  | 48px | 700    | 52px        | -0.03em        | H1 desktop            |
| `--text-6xl`  | 60px | 800    | 64px        | -0.04em        | Hero display          |

## Spacing

### Base Unit

Base unit: `4px`

| Token        | Value | Usage           |
| ------------ | ----- | --------------- |
| `--space-1`  | 4px   | Tight gaps      |
| `--space-2`  | 8px   | Icon gaps       |
| `--space-3`  | 12px  | Small padding   |
| `--space-4`  | 16px  | Default padding |
| `--space-5`  | 20px  | Card padding    |
| `--space-6`  | 24px  | Section gaps    |
| `--space-8`  | 32px  | Large gaps      |
| `--space-10` | 40px  | Section padding |
| `--space-12` | 48px  | Hero padding    |
| `--space-16` | 64px  | Page sections   |
| `--space-20` | 80px  | Major sections  |

## Border Radius

| Token           | Value  | Usage           |
| --------------- | ------ | --------------- |
| `--radius-sm`   | 4px    | Buttons, inputs |
| `--radius-md`   | 8px    | Cards           |
| `--radius-lg`   | 12px   | Modals, panels  |
| `--radius-xl`   | 16px   | Feature cards   |
| `--radius-2xl`  | 24px   | Hero sections   |
| `--radius-full` | 9999px | Pills, avatars  |

## Shadows

| Token         | Value                         | Usage            |
| ------------- | ----------------------------- | ---------------- |
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)`  | Subtle elevation |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.07)`  | Cards            |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modals           |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.1)` | Hero cards       |

## Breakpoints

| Token      | Width  | Usage            |
| ---------- | ------ | ---------------- |
| `--bp-sm`  | 640px  | Mobile landscape |
| `--bp-md`  | 768px  | Tablet           |
| `--bp-lg`  | 1024px | Desktop          |
| `--bp-xl`  | 1280px | Large desktop    |
| `--bp-2xl` | 1536px | Ultra-wide       |

## Z-Index Scale

| Token          | Value | Usage          |
| -------------- | ----- | -------------- |
| `--z-base`     | 0     | Default        |
| `--z-dropdown` | 10    | Dropdowns      |
| `--z-sticky`   | 20    | Sticky headers |
| `--z-modal`    | 30    | Modals         |
| `--z-popover`  | 40    | Popovers       |
| `--z-toast`    | 50    | Notifications  |
| `--z-tooltip`  | 60    | Tooltips       |
