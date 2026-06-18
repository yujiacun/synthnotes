# Survival Analysis — guide

Personal learning notebook on survival / time-to-event analysis, with the
destination of deep working knowledge of **`PROC LIFETEST`** and
**`PROC PHREG`** in SAS.

## This session's scope: CONTENT ONLY

Sessions opened in `docs/survival-analysis/` write content for this guide.

**Do NOT edit the shell** — `docs/style.css`, `docs/main.js`,
`docs/sidebar.js`, or `docs/index.html`. The shell is managed by a
separate shell session opened at the project root. If styling needs to
change, surface the request — don't fix it.

You may edit:

- `chapters/*.html` — chapter content
- `sidebar-data.js` — chapter list (flip `pending` → `done` as chapters land)
- `index.html` — the guide landing page

## Goal

Ground-up understanding of survival analysis: censoring, survival and hazard
functions, non-parametric estimation (Kaplan-Meier, log-rank), Cox
proportional hazards, and the SAS implementations (`PROC LIFETEST`,
`PROC PHREG`).

James is a SAS programmer — connect theory to SAS syntax and output where
relevant.

## How to add a chapter

1. Copy `../mixed-models/chapters/01-introduction.html` as a skeleton (no
   chapter exists in this guide yet — the mixed-models one is the
   reference template). Save into `chapters/` here.
2. Rename to match the slug (e.g. `01-introduction.html`).
3. Update the `<title>` to `Chapter N: … — Survival Analysis`.
4. The body opens straight on the first `<h2>` — no chapter `<h1>` or
   chapter-tag; the sidebar handles all navigation.
5. Write content as `<h2 id="sec-...">` sections. Section numbers (1.1, 1.2…)
   are auto-prepended by `sidebar.js`. Prefer tables over prose where
   possible — see the chapter-style memory.
6. In `sidebar-data.js`, flip `status: "pending"` → `"done"`.

## Road map

### Stage 1 — Foundations
1. Introduction & Censoring
2. The Survival Function $S(t)$
3. The Hazard Function $h(t)$
4. Survival, Hazard, Density — Relationships

### Stage 2 — Non-Parametric Methods (`PROC LIFETEST`)
5. Kaplan-Meier Estimation
6. The Log-Rank Test
7. Stratified Analysis
8. `PROC LIFETEST` — statement by statement

### Stage 3 — Parametric Models
9. Exponential & Weibull Distributions
10. Parametric Regression

### Stage 4 — Cox Proportional Hazards (`PROC PHREG`)
11. The Cox Proportional Hazards Model
12. Hazard Ratios & Inference
13. PH Assumption & Diagnostics
14. `PROC PHREG` — statement by statement

### Stage 5 — Extensions
15. Time-Varying Covariates
16. Competing Risks
17. Frailty Models

## Topics covered

*(none yet)*

## Workflow rules

- Search the web (WebSearch, WebFetch) for SAS documentation and survival
  analysis references.
- Never move on to a new topic until James explicitly says he's ready.
- Answer questions conversationally first, then ask whether to add the
  answer to the site.
- Keep the **Topics covered** section above updated as each chapter lands.
