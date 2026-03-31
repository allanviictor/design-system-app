# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AVM Slides — a React app for generating LinkedIn carousel slides as PNG exports. Built around a design system with 5 slide templates (Cover, Content, Code, Comparison, Closing) in two formats (1080×1350 vertical, 1080×1080 square).

## Commands

```bash
npm run dev          # Start dev server (localhost:5173)
npm run build        # tsc --noEmit + vite build
npm run lint         # ESLint
npm run format       # Prettier on src/**/*.{ts,tsx}
npm run typecheck    # tsc --noEmit only
npm run preview      # Preview production build
```

## Architecture

Feature-based. Each feature is self-contained; `shared/` holds what's reused across features.

```
src/
├── features/
│   └── slides/                        # slide rendering feature
│       ├── components/
│       │   ├── canvas/SlideCanvas.tsx
│       │   └── templates/             # CoverSlide, ContentSlide, CodeSlide, ComparisonSlide, ClosingSlide
│       └── types/index.ts             # Slide, Carousel, SlideFormat, ComparisonCard…
├── shared/
│   ├── components/
│   │   ├── ui/                        # shadcn/ui components (CLI-generated)
│   │   ├── theme-provider.tsx
│   │   └── (AccentBar, BgShape, CodeBlock, Overline, Pagination, SlideFooter, Tag)
│   └── lib/
│       ├── avm-theme.ts               # Shiki theme with brand colors
│       ├── shiki.ts                   # highlighter singleton
│       └── highlight.tsx              # word-highlight helper
├── lib/
│   └── utils.ts                       # cn() — stays here for shadcn compatibility
├── posts/
│   └── <slug>/index.ts                # carousel data (title + slides[])
├── App.tsx
└── index.css                          # all design tokens + Shiki CSS reset
```

**Data model:** Each post is a `Carousel` — a typed array of slides, each with a `type` discriminant that selects which template to render. Slide index and navigation live in `App.tsx` state.

**Export pipeline:** `html-to-image` will render `SlideCanvas` to PNG at `pixelRatio: 2`. The canvas renders at real size (1080px) and is scaled via `transform: scale()` for preview only.

**Slide canvas is always dark** — brand tokens (`--bg-primary`, `--text-primary`, etc.) are defined in `:root` (not `.dark`) because the canvas never changes theme.

## Key Files

- [src/index.css](src/index.css) — Single source of truth for all design tokens: brand colors, typography scale, spacing, gradients, shadows, syntax highlight colors, and Shiki `<pre>` reset.
- [src/shared/components/theme-provider.tsx](src/shared/components/theme-provider.tsx) — Context-based light/dark/system theme. Press `d` to toggle.
- [src/lib/utils.ts](src/lib/utils.ts) — `cn()` helper (clsx + tailwind-merge).
- [docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md) — Canonical design tokens, color palette, typography scale. Consult before adding new UI.
- [docs/SLIDE-TEMPLATES.md](docs/SLIDE-TEMPLATES.md) — Layout specs for all 5 templates (props, visual hierarchy, rules).
- [docs/TECH-SPEC.md](docs/TECH-SPEC.md) — Stack rationale, project structure, import rules, known limitations.

## Design Tokens (Key Values)

All defined as CSS custom properties in `index.css`. The slide canvas always uses these regardless of app theme.

- Primary accent: `#FF6B00` (orange — headlines, CTAs, keywords)
- Secondary accent: `#00F0E0` (cyan — functions, types, tags)
- Backgrounds: `#141414` (primary), `#1C1C1C` (secondary), `#111111` (code blocks)
- Typography: Space Grotesk 700 (headlines), Inter 400 (body), JetBrains Mono (code) — loaded via Google Fonts in `index.css`
- Slide canvas: `1080×1350` (vertical) or `1080×1080` (square)

## Conventions

- Path alias `@/` maps to `src/` — use it for all cross-feature and cross-layer imports.
- Within `features/slides`: use relative imports.
- No barrel files (`index.ts` re-exports) — import directly from the source file.
- New shadcn/ui components: `npx shadcn@latest add <component>` — they generate into `@/shared/components/ui/` (configured in `components.json`).
- Tailwind classes: merge with `cn()` from `@/lib/utils`.
- Slide templates use **inline styles** (not Tailwind classes) — required for `html-to-image` export compatibility.
- Prettier: no semicolons, double quotes, 2-space indent, trailing commas (ES5).
- TypeScript strict mode — no unused locals/params.
- New posts go in `src/posts/<slug>/index.ts` and export a `Carousel` typed object.
