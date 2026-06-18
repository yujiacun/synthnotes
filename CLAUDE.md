# Notes — multi-guide site

A personal collection of static-HTML learning notebooks. Each guide is a
self-contained folder under `docs/`; they all draw from **the shell** —
a shared stylesheet and JS runtime — so updates to the shell propagate
everywhere.

## Vocabulary

- **The shell** — the shared platform layer: `docs/style.css`,
  `docs/main.js`, `docs/sidebar.js`, `docs/guides.js`, `docs/home.js`,
  and `docs/index.html` (the home page). One copy, used by every guide.
- **A guide** — a topic notebook in its own subfolder under `docs/`
  (e.g. `docs/mixed-models/`). Has its own `index.html`,
  `sidebar-data.js`, `chapters/`, and `CLAUDE.md`.
- **The shell session** — a Claude Code session opened at the project
  root, for editing the shell.
- **A content session** — a Claude Code session opened inside a guide's
  folder, for writing chapters and adjusting that guide's data.

## This session's scope: THE SHELL ONLY

Sessions opened at the project root edit **the shell** — the files listed
above. Nothing else.

**Creating a new guide folder IS shell work.** When a guide is added to
`guides.js`, the shell session creates the corresponding sibling folder
under `docs/` by copying `template/guide/` (at the project root) and
substituting the `{{TITLE}}` and `{{SLUG}}` placeholders. The template
holds three files: `CLAUDE.md` (content-session instructions), `index.html`
(landing stub — placeholder until a chapter lands, then it auto-forwards to
the first written chapter), and `sidebar-data.js` (`stages: []`). See
`template/README.md` for the substitution details.

**Do NOT edit content files that already exist** — chapter HTML, populated
`index.html`, or `sidebar-data.js` with chapters in it. Those are managed
by content sessions opened inside each guide. Filling in the road map,
writing chapters, and updating chapter status are content-session work.

If you spot a content issue while working on the shell, surface it —
don't fix it. The author will switch sessions.

## Project structure

```
docs/                            ← GitHub Pages source
├── index.html                   ← home page (renders the guides index)
├── style.css                    ← THIS session edits
├── main.js                      ← THIS session edits
├── sidebar.js                   ← THIS session edits (despite the name,
│                                  it now drives the top-bar dropdowns)
├── home.js                      ← builds the home-page guides index
├── guides.js                    ← master guides list (THIS session edits)
│
├── mixed-models/                ← a guide — separate content session
│   ├── CLAUDE.md
│   ├── index.html
│   ├── sidebar-data.js
│   └── chapters/
│       ├── 01-introduction.html
│       └── 02-descriptive-stats.html
│
└── … one folder per guide, same shape — guides.js is the canonical
    list (chapters/ is created when the first chapter is written)
```

Adding another guide later: add it to `guides.js` (shell), then create
the sibling folder under `docs/` with the same shape — also shell work,
as described in *This session's scope* above. The shared assets are
picked up automatically — no platform changes needed unless a new pattern
requires it.

## How the shell works

| File         | Purpose |
| ------------ | ------- |
| `style.css`  | All styling. CSS variables under `:root` for dark, `[data-theme="light"]` for light. |
| `main.js`    | Theme toggle (appended into the top bar at runtime). |
| `sidebar.js` | Despite the name, this drives the **top bar**: builds the fixed top-bar element, renders the guide-switcher and chapter-switcher dropdowns (suppressed on the home page, which shows the guides index instead), numbers the active chapter's h2/h3 sections and assigns their anchor ids, and wires keyboard navigation — Ctrl/Cmd + ←/→ between chapters, PageUp/PageDown between sections. Reads `window.SIDEBAR_DATA` (guide-local) and `window.GUIDES` (shell-global; auto-loads if not preloaded). |
| `guides.js`  | Master guides list. `window.GUIDES = [{ id, title, status, href, dim?, category? }, …]` — `href` points straight at the guide's Chapter 1 (null until one exists). Also defines `window.groupGuides()`, the category-grouping helper shared by `home.js` and `sidebar.js`. Edit when adding/removing/promoting guides. |
| `home.js`    | Builds the home-page guides index (a TOC of notebooks) from `window.GUIDES`, grouped by category. Loaded only by `docs/index.html`. |

The chapter HTML still includes `<aside id="sidebar"></aside>` and
`<button id="menu-toggle">` elements; both are inert (hidden via CSS).
Leave them in place for now — content sessions can prune them when
chapters are next touched.

The light/dark theme is applied before paint via a tiny inline `<script>` in
each guide's HTML `<head>` (it reads `localStorage` and sets
`document.documentElement.dataset.theme`). When adding new chapter HTML
files in a content session, that script must be present — flag if a new
file is missing it.

## Authoring conventions the styling supports

Content sessions write HTML against these patterns. If a new pattern is
needed, add styling for it here.

**Math** — KaTeX, with these delimiters:
- inline: `$x = 1$` or `\(x = 1\)`
- display: `$$ x = 1 $$` or `\[ x = 1 \]`

**Code** — `<pre><code class="language-sas">…</code></pre>` (Prism handles
highlighting when wired up).

## Workflow rules

- Search the web freely (WebSearch, WebFetch) for CSS techniques or browser
  behaviour.
- No build step — edit files in `docs/` and reload the browser.
- Never move on to a new task until the user explicitly says they're ready.
- Answer questions conversationally first, then ask whether the change
  should be applied.
