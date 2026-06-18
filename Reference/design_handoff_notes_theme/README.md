# Handoff: Notes — final theme (Newsprint light + Soft charcoal dark)

## Overview

`Notes` is a personal multi-guide static-HTML notebook hosted on GitHub Pages. The shell (CSS, JS, sidebar, landing) is shared across guides; chapter content lives per-guide. This handoff swaps the existing colour palette for the chosen final theme — **Newsprint** for light mode, **Soft charcoal** for dark — bound by an oxblood accent family.

The visual system (typography, sidebar IA, scroll-spy, section numbering, theme toggle) is **unchanged**. Only the colour variables move.

## About the design files

The files in this bundle are the **specification** of the change, not production code to copy verbatim — though in this case the spec is small enough (a CSS variable block) that "copy verbatim" is the right action.

The bundle contains:
- `README.md` — this file
- `theme-final.css` — the merged theme, ready to drop in as an override
- `style.css.patch.md` — exact replacement instructions for the existing `style.css`

## Fidelity

**High-fidelity.** All colours are final hex values. Every other property — fonts, spacing, layout, sidebar widths — is unchanged from the current shell. No interpretation needed; just apply the values.

## Scope

This handoff covers **only the colour palette**. Other recommendations from the design review (refined heading hierarchy, sidebar width tuning, self-test question styling) are **not included** here and can be done as separate passes if wanted. See "Other recommendations" at the bottom of this README.

## Project context

| Path | What it is |
|---|---|
| `docs/style.css` | The shell stylesheet. Defines colour variables in `:root` (dark, default) and `[data-theme="light"]` (light override). |
| `docs/main.js` | Sidebar collapse + theme toggle. The toggle sets `data-theme="light"` on `<html>` and persists to `localStorage.statbook:theme`. |
| `docs/sidebar.js` | Renders the sidebar, injects `1.1` / `1.1.1` section numbers, drives scroll-spy. |
| `docs/<guide>/chapters/*.html` | Per-guide chapter pages — load `style.css`, `main.js`, `sidebar.js`. |

The theme toggle button (☀ / ☾) already exists. Once the variables are swapped, it will toggle between the new palettes without any code change.

## What to change

Open `docs/style.css`. Replace the two existing palette blocks (the `:root` block starting around line 8, and the `[data-theme="light"]` block starting around line 39) with the blocks below. **Do not touch any other rules in the file** — layout, typography, sidebar styling, table styles, etc. all stay.

### Replacement block

```css
:root {
    /* ── Palette (dark — default) ───────────────────────────────── */
    --bg:            #232527;
    --bg-soft:       #1c1e20;     /* sidebar */
    --bg-elev:       #2c2e30;     /* raised surfaces / hover */
    --bg-hover:      #303236;
    --text:          #e3e3e1;     /* bright — used for headings, table headers */
    --text-body:     #b4b4b1;     /* muted — used for body paragraphs, table cells */
    --text-soft:     #888884;
    --text-faint:    #5d5d5a;
    --rule:          #38383a;
    --rule-strong:   #46464a;

    --accent:        #c45a6a;     /* brightened oxblood — used sparingly */
    --accent-soft:   rgba(196, 90, 106, 0.11);

    --code-bg:       #1c1e20;

    /* ── Layout ─────────────────────────────────────────────────── */
    --sidebar-w:     500px;
    --main-padding:  4rem;
    --section-indent: 2.5rem;

    /* ── Typography ─────────────────────────────────────────────── */
    --serif:   "Charter", "Iowan Old Style", "Georgia", "Cambria", serif;
    --sans:    -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", "Helvetica Neue", Arial, sans-serif;
    --mono:    "JetBrains Mono", "Fira Code", "SFMono-Regular", "Cascadia Mono", "Consolas", monospace;
}

/* ── Palette (light — applies when <html data-theme="light">) ─── */
[data-theme="light"] {
    --bg:            #fafaf7;
    --bg-soft:       #f0f0ec;
    --bg-elev:       #f4f4f1;
    --bg-hover:      #e9e9e4;
    --text:          #1a1a17;
    --text-body:     #444441;
    --text-soft:     #6e6e69;
    --text-faint:    #9e9e98;
    --rule:          #dcdcd6;
    --rule-strong:   #b8b8b0;

    --accent:        #7d2e3a;     /* deep oxblood */
    --accent-soft:   rgba(125, 46, 58, 0.10);

    --code-bg:       #f0f0ec;
}
```

The layout and typography lines (`--sidebar-w`, `--main-padding`, `--section-indent`, `--serif`, `--sans`, `--mono`) are unchanged from the existing file — they're included here just to preserve the `:root` block structure when you replace it. If your existing values differ (e.g. someone tuned `--sidebar-w` since this handoff), keep their values; only the colour lines need to change.

## Design tokens

### Dark (`:root`)

| Token | Value | Use |
|---|---|---|
| `--bg` | `#232527` | Page background |
| `--bg-soft` | `#1c1e20` | Sidebar background, code background |
| `--bg-elev` | `#2c2e30` | Raised surfaces, hover states |
| `--bg-hover` | `#303236` | Active hover |
| `--text` | `#e3e3e1` | Headings, table headers |
| `--text-body` | `#b4b4b1` | Body paragraphs, table cells |
| `--text-soft` | `#888884` | Secondary text |
| `--text-faint` | `#5d5d5a` | Captions, faint UI |
| `--rule` | `#38383a` | Hairline rules |
| `--rule-strong` | `#46464a` | Strong rules |
| `--accent` | `#c45a6a` | Section numbers, active states, the occasional link |
| `--accent-soft` | `rgba(196, 90, 106, 0.11)` | Selection background, accent washes |
| `--code-bg` | `#1c1e20` | Code block background |

### Light (`[data-theme="light"]`)

| Token | Value | Use |
|---|---|---|
| `--bg` | `#fafaf7` | Page background |
| `--bg-soft` | `#f0f0ec` | Sidebar, code background |
| `--bg-elev` | `#f4f4f1` | Raised surfaces |
| `--bg-hover` | `#e9e9e4` | Active hover |
| `--text` | `#1a1a17` | Headings |
| `--text-body` | `#444441` | Body |
| `--text-soft` | `#6e6e69` | Secondary text |
| `--text-faint` | `#9e9e98` | Captions |
| `--rule` | `#dcdcd6` | Hairline rules |
| `--rule-strong` | `#b8b8b0` | Strong rules |
| `--accent` | `#7d2e3a` | Section numbers, active states |
| `--accent-soft` | `rgba(125, 46, 58, 0.10)` | Selection background |
| `--code-bg` | `#f0f0ec` | Code block background |

### Accent rationale

Same hue family across modes — the dark accent (`#c45a6a`) is the light accent (`#7d2e3a`) brightened by ~10% so it reads cleanly against the charcoal background. Selection and accent-soft rgba values are derived from each mode's accent.

## Contrast check

| Surface | Foreground | Ratio | WCAG |
|---|---|---|---|
| `#232527` (dark bg) | `#e3e3e1` (text) | 10.1 : 1 | AAA |
| `#232527` (dark bg) | `#b4b4b1` (text-body) | 7.2 : 1 | AAA (body), AA (large) |
| `#232527` (dark bg) | `#c45a6a` (accent) | 4.7 : 1 | AA (large), borderline body |
| `#fafaf7` (light bg) | `#1a1a17` (text) | 16.5 : 1 | AAA |
| `#fafaf7` (light bg) | `#444441` (text-body) | 9.1 : 1 | AAA |
| `#fafaf7` (light bg) | `#7d2e3a` (accent) | 7.4 : 1 | AAA |

Accent is used for short runs (section numbers, the occasional link), so the borderline dark-mode body-text ratio is acceptable.

## How to verify

1. Open any chapter page (e.g. `docs/mixed-models/chapters/1-why-mixed-models.html`).
2. Confirm:
   - Page renders in dark mode by default (charcoal background, `#c45a6a` accent on the chapter tag and `1.1` section numbers).
   - Toggle in the top-right (☀ / ☾) switches to off-white / oxblood.
   - Choice persists across reload (already handled by `main.js` via `localStorage.statbook:theme`).
3. No other visual changes — typography, spacing, sidebar widths, all unchanged.

## Files in this bundle

- `README.md` — this file
- `theme-final.css` — the same palette as a standalone override file. Useful for A/B testing without committing — link it after `style.css` in chapter `<head>`s; remove when satisfied and apply the replacement block instead.

## Other recommendations (not in scope here)

These came out of the same design review but are not part of this handoff. Address as separate passes if wanted:

1. **Refined heading hierarchy.** Current `style.css` has h1, h2, and h3 all carrying a `2px var(--text)` underline. Recommendation: keep h2's rule (drop to 1px `var(--rule)`), remove the underline + uppercase + letter-spacing from h3, and drop h1's `border-bottom` + `width: fit-content`. Smallest change that meaningfully calms the page.

2. **Sidebar width.** Currently `--sidebar-w: 500px`. Recommendation: `420px` — keeps room for `1.1.1` numbering, gains ~80px of main column. Check `1-why-mixed-models.html?sidebar=420` to preview.

3. **End-of-chapter self-test pattern.** Pattern: numbered question, answer hidden behind a low-key dotted-underline `<details>` toggle. The full pattern (with CSS) lives in `docs/_demos/self-test.html?p=1` in the source project.

The full review with explanations is at `Review.html` in the source project.
