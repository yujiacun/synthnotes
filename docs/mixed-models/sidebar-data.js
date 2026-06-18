/* Guide data for the Mixed Models notebook.
   Loaded BEFORE the shared sidebar.js, which reads window.SIDEBAR_DATA.
   To add a chapter: drop it into the right stage with status 'done' or 'pending'. */

window.SIDEBAR_DATA = {
    title: "Mixed Models",
    stages: [
        {
            title: "Stage 1 — Foundations",
            chapters: [
                { id: "01-introduction",       title: "Introduction: What Is Statistics?",         status: "done"    },
                { id: "02-descriptive-stats",  title: "Descriptive Statistics",                    status: "done"    },
                { id: "03-probability",        title: "Probability & Distributions",               status: "pending" },
                { id: "04-linear-algebra",     title: "Linear Algebra Basics",                     status: "pending" },
            ]
        },
        {
            title: "Stage 2 — The Linear Model",
            chapters: [
                { id: "05-simple-regression",  title: "Simple Linear Regression",                  status: "pending" },
                { id: "06-multiple-regression",title: "Multiple Regression",                       status: "pending" },
                { id: "07-matrix-form",        title: "Matrix Form of the Linear Model",           status: "pending" },
            ]
        },
        {
            title: "Stage 3 — ANOVA & Design",
            chapters: [
                { id: "08-one-way-anova",      title: "One-Way ANOVA",                             status: "pending" },
                { id: "09-factorial-anova",    title: "Two-Way / Factorial ANOVA",                 status: "pending" },
                { id: "10-repeated-measures",  title: "Repeated Measures ANOVA",                   status: "pending" },
                { id: "11-fixed-vs-random",    title: "Fixed vs. Random Effects",                  status: "pending" },
            ]
        },
        {
            title: "Stage 4 — Mixed Models",
            chapters: [
                { id: "12-mixed-equation",     title: "The Mixed Model Equation",                  status: "pending" },
                { id: "13-variance-components",title: "Variance Components",                       status: "pending" },
                { id: "14-reml-vs-ml",         title: "REML vs. ML Estimation",                    status: "pending" },
                { id: "15-covariance-structs", title: "Covariance Structures (TYPE=)",             status: "pending" },
                { id: "16-proc-mixed",         title: "PROC MIXED in SAS",                         status: "pending" },
            ]
        },
    ]
};
