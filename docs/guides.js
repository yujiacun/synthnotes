/* Master guides list — consumed by the home page (docs/index.html, via
   home.js) and the top-bar guide-switcher dropdown (sidebar.js).

   Field semantics:
     id       — slug matching the guide folder
     title    — display name
     status   — short status string; maintainer note only (not displayed)
     href     — relative-to-docs/ path the home index / guide-switcher links
                to. Points straight at the guide's Chapter 1 — the per-guide
                landing page is bypassed. null = no Chapter 1 written yet, so
                the guide is shown dim and non-clickable until one lands.
     dim      — render with reduced opacity (e.g. no chapters yet)
     category — group label in the dropdown ("Statistics", "AI", "Golf",
                "Music", "Other"). Omit or set "Other" for ungrouped.
                New categories also need adding to the presetOrder list in
                groupGuides() below, or they sort after "Other".

   Add or remove entries here when guides change — that's shell-session
   work (content sessions: surface the request instead of editing this
   file). When a guide's Chapter 1 lands, the shell session points its
   href at that chapter (e.g. "<slug>/chapters/<id>.html") and drops
   its `dim`. */

window.GUIDES = [
    {
        id: "mixed-models",
        title: "Mixed Models",
        category: "Statistics",
        status: "In progress — Chapter 1 done",
        href: "mixed-models/chapters/01-introduction.html"
    },
    {
        id: "survival-analysis",
        title: "Survival Analysis",
        category: "Statistics",
        status: "Road map drafted — no chapters yet",
        href: null,
        dim: true
    },
    {
        id: "sample-size",
        title: "Sample Size",
        category: "Statistics",
        status: "Folder created — road map pending",
        href: null,
        dim: true
    },
    {
        id: "golf-swing",
        title: "The Golf Swing",
        category: "Golf",
        status: "Folder created — road map pending",
        href: null,
        dim: true
    },
    {
        id: "golf-course-architecture",
        title: "Golf Course Architecture",
        category: "Golf",
        status: "Folder created — road map pending",
        href: null,
        dim: true
    },
    {
        id: "modular-synthesis",
        title: "Modular Synthesis",
        category: "Music",
        status: "Road map drafted — no chapters yet",
        href: null,
        dim: true
    },
    {
        id: "training-llms",
        title: "Training LLMs",
        category: "AI",
        status: "Folder created — road map pending",
        href: null,
        dim: true
    }
];

/* Groups a guides array by category for display: preset categories first,
   unknown categories after in first-appearance order, no category → "Other".
   Returns [{ category, guides }, …]. Shared by home.js (home index) and
   sidebar.js (guide-switcher dropdown) so the two renderings can't drift. */
window.groupGuides = function (guides) {
    const presetOrder = ["Statistics", "AI", "Golf", "Music", "Other"];
    const groups = {};
    guides.forEach(g => {
        const cat = g.category || "Other";
        (groups[cat] = groups[cat] || []).push(g);
    });
    const extras = Object.keys(groups).filter(c => !presetOrder.includes(c));
    return [...presetOrder.filter(c => groups[c]), ...extras]
        .map(cat => ({ category: cat, guides: groups[cat] }));
};
