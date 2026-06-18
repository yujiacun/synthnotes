/* =================================================================
   Home page — renders the guides index (a TOC of the notebooks) into
   <main>, grouped by category. Reads window.GUIDES (docs/guides.js).

   Loaded ONLY by docs/index.html. The home page intentionally has no
   guide-switcher dropdown — this index replaces it.
   ================================================================= */

(function () {
    const mount = document.getElementById('home-guides');
    if (!mount) return;

    function render() {
        if (!Array.isArray(window.GUIDES) || window.GUIDES.length === 0) {
            mount.innerHTML = '<p class="home-hint">No guides yet.</p>';
            return;
        }

        // Category grouping lives in guides.js (window.groupGuides),
        // shared with sidebar.js so the two renderings can't drift.
        mount.innerHTML = window.groupGuides(window.GUIDES).map(({ category, guides }) => {
            const items = guides.map(g => {
                const cls = 'home-guide' + (g.dim ? ' dim' : '');
                return g.href
                    ? `<li class="${cls}"><a href="${g.href}">${g.title}</a></li>`
                    : `<li class="${cls} disabled"><span>${g.title}</span></li>`;
            }).join('');
            return '<section class="home-cat">' +
                       `<h2 class="home-cat-title">${category}</h2>` +
                       `<ul class="home-guide-list">${items}</ul>` +
                   '</section>';
        }).join('');
    }

    // index.html preloads guides.js, so GUIDES is normally present already.
    // Fall back to loading it on demand if not (mirrors sidebar.js).
    if (window.GUIDES) {
        render();
    } else {
        const script = document.createElement('script');
        script.src = 'guides.js';
        script.onload = render;
        script.onerror = () => {
            mount.innerHTML = '<p class="home-hint">Could not load guides.js.</p>';
        };
        document.head.appendChild(script);
    }
})();
