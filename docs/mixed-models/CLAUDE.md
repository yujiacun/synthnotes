# Mixed Models — guide

Personal learning notebook with the destination of a deep working knowledge
of **`PROC MIXED` in SAS**. Stages 1-3 are scaffolding (descriptive stats,
the linear model, ANOVA) leading to Stage 4 where mixed models are built up
properly.

Survival analysis is now its own guide — see `docs/survival-analysis/`.

## This session's scope: CONTENT ONLY

Sessions opened in `docs/mixed-models/` write content for this guide.

**Do NOT edit the shell** — `docs/style.css`, `docs/main.js`,
`docs/sidebar.js`, or `docs/index.html`. The shell is managed by a
separate shell session opened at the project root. If styling needs to
change, surface the request — don't fix it.

You may edit:

- `chapters/*.html` — chapter content
- `sidebar-data.js` — chapter list (flip `pending` → `done` as chapters land)
- `index.html` — the guide landing page

## Goal

Ground-up understanding of mixed models, culminating in `PROC MIXED` in SAS
— statement by statement, option by option.

James is a SAS programmer — connect theory to SAS syntax and output where
relevant.

## How to add a chapter

1. Copy `chapters/01-introduction.html` as a skeleton. It includes the
   inline theme-init script in `<head>` — keep it; it prevents the
   light/dark flash on initial load.
2. Rename to match the slug (e.g. `02-descriptive-stats.html`).
3. Update the `<title>`. The body opens straight on the first `<h2>` — no
   chapter `<h1>` or chapter-tag; the sidebar handles all navigation.
4. Write content as `<h2 id="sec-...">` sections. Section numbers (1.1, 1.2…)
   are auto-prepended by `sidebar.js` based on the chapter's position in
   `sidebar-data.js`. Prefer tables over prose where possible — see the
   chapter-style memory.
5. In `sidebar-data.js`, flip `status: "pending"` → `"done"` for the new
   chapter.

## Road map

### Stage 1 — Foundations
1. Introduction: What Is Statistics?
2. Descriptive Statistics (centre, spread, shape)
3. Probability & Distributions (normal, $t$, $F$, $\chi^2$)
4. Linear Algebra Basics (matrices/vectors — needed for mixed model notation)

### Stage 2 — The Linear Model
5. Simple Linear Regression
6. Multiple Regression (OLS, model fit, residuals)
7. Matrix Form of the Linear Model: $y = X\beta + \varepsilon$

### Stage 3 — ANOVA & Experimental Design
8. One-Way ANOVA
9. Two-Way / Factorial ANOVA
10. Repeated Measures ANOVA
11. Fixed vs Random Effects (the conceptual turning point)

### Stage 4 — Mixed Models
12. The Mixed Model Equation: $y = X\beta + Zu + \varepsilon$
13. Variance Components
14. REML vs ML Estimation
15. Covariance Structures (`TYPE=` in `PROC MIXED`)
16. `PROC MIXED` — statement by statement, option by option

## Topics covered

1. **Introduction: What Is Statistics?** — Descriptive vs inferential,
   population vs sample, parameter vs statistic, data types (nominal,
   ordinal, discrete, continuous). *(Chapter 1)*

## Workflow rules

- Search the web (WebSearch, WebFetch) for SAS documentation and
  statistical references.
- Never move on to a new topic until James explicitly says he's ready.
- Answer questions conversationally first, then ask whether to add the
  answer to the site.
- Keep the **Topics covered** section above updated as each chapter lands.
