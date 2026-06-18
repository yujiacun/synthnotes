/* Guide data for the Survival Analysis notebook.
   Loaded BEFORE the shared sidebar.js, which reads window.SIDEBAR_DATA.
   To add a chapter: drop it into the right stage with status 'done' or 'pending'. */

window.SIDEBAR_DATA = {
    title: "Survival Analysis",
    stages: [
        {
            title: "Stage 1 — Foundations",
            chapters: [
                { id: "01-introduction",       title: "Introduction & Censoring",                  status: "pending" },
                { id: "02-survival-function",  title: "The Survival Function",                     status: "pending" },
                { id: "03-hazard-function",    title: "The Hazard Function",                       status: "pending" },
                { id: "04-relationships",      title: "Survival, Hazard, Density — Relationships", status: "pending" },
            ]
        },
        {
            title: "Stage 2 — Non-Parametric (PROC LIFETEST)",
            chapters: [
                { id: "05-kaplan-meier",       title: "Kaplan-Meier Estimation",                   status: "pending" },
                { id: "06-log-rank",           title: "The Log-Rank Test",                         status: "pending" },
                { id: "07-stratified",         title: "Stratified Analysis",                       status: "pending" },
                { id: "08-proc-lifetest",      title: "PROC LIFETEST in SAS",                      status: "pending" },
            ]
        },
        {
            title: "Stage 3 — Parametric Models",
            chapters: [
                { id: "09-exponential-weibull",title: "Exponential & Weibull Distributions",       status: "pending" },
                { id: "10-parametric-regression", title: "Parametric Regression",                  status: "pending" },
            ]
        },
        {
            title: "Stage 4 — Cox PH (PROC PHREG)",
            chapters: [
                { id: "11-cox-model",          title: "The Cox Proportional Hazards Model",        status: "pending" },
                { id: "12-hazard-ratios",      title: "Hazard Ratios & Inference",                 status: "pending" },
                { id: "13-ph-assumption",      title: "PH Assumption & Diagnostics",               status: "pending" },
                { id: "14-proc-phreg",         title: "PROC PHREG in SAS",                         status: "pending" },
            ]
        },
        {
            title: "Stage 5 — Extensions",
            chapters: [
                { id: "15-time-varying",       title: "Time-Varying Covariates",                   status: "pending" },
                { id: "16-competing-risks",    title: "Competing Risks",                           status: "pending" },
                { id: "17-frailty",            title: "Frailty Models",                            status: "pending" },
            ]
        },
    ]
};
