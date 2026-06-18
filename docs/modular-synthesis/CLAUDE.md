# Modular Synthesis — guide

Personal learning notebook on modular synthesis: the modules, the signal
types, the patching conventions, and the underlying electronics and signal
flow.

## This session's scope: CONTENT ONLY

Sessions opened in `docs/modular-synthesis/` write content for this guide.

**Do NOT edit the shell** — `docs/style.css`, `docs/main.js`,
`docs/sidebar.js`, or `docs/index.html`. The shell is managed by a
separate shell session opened at the project root. If styling needs to
change, surface the request — don't fix it.

You may edit:

- `chapters/*.html` — chapter content
- `sidebar-data.js` — chapter list (flip `pending` → `done` as chapters land)
- `index.html` — the guide landing page

## Goal

Ground-up understanding of how modular synthesizers work. Cover the physics
and signal flow first, then the canonical module categories (oscillators,
filters, envelopes, VCAs, LFOs), then sequencing and performance patching.

The road map in `sidebar-data.js` is a starting draft — adjust freely as
the guide takes shape.

## How to add a chapter

1. Copy `../mixed-models/chapters/01-introduction.html` as a skeleton (no
   chapter exists in this guide yet — the mixed-models one is the
   reference template). Save into `chapters/` here.
2. Rename to match the slug (e.g. `01-introduction.html`).
3. Update the `<title>` to `Chapter N: … — Modular Synthesis`.
4. The body opens straight on the first `<h2>` — no chapter `<h1>` or
   chapter-tag; the sidebar handles all navigation.
5. Write content as `<h2 id="sec-...">` sections. Section numbers (1.1, 1.2…)
   are auto-prepended by `sidebar.js`. Prefer tables over prose where
   possible — see the chapter-style memory.
6. In `sidebar-data.js`, flip `status: "pending"` → `"done"`.

## Road map (draft)

### Stage 1 — Foundations
1. What Is Modular Synthesis?
2. Signal Types: Audio, CV, Gate, Trigger
3. Voltage Standards (1V/oct, Hz/V, gate levels)
4. Modules & Patching Basics

### Stage 2 — Sound Generation
5. Oscillators (VCO)
6. Waveforms & Wavetables
7. Tuning & Pitch
8. Noise Sources

### Stage 3 — Signal Shaping
9. Filters (VCF)
10. Envelopes (ADSR)
11. Amplifiers (VCA)
12. Distortion & Wavefolding

### Stage 4 — Modulation
13. LFOs
14. Sample & Hold
15. Modulation Routing
16. Function Generators

### Stage 5 — Sequencing & Performance
17. Step Sequencers
18. Clocking & Sync
19. Quantizers
20. Performance Patches

## Topics covered

*(none yet)*

## Workflow rules

- Search the web (WebSearch, WebFetch) for module datasheets, synth wikis,
  electronics references.
- Never move on to a new topic until James explicitly says he's ready.
- Answer questions conversationally first, then ask whether to add the
  answer to the site.
- Keep the **Topics covered** section above updated as each chapter lands.
