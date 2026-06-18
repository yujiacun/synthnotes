/* Renders the top bar (guide switcher + chapter switcher), numbers the
   active chapter's h2/h3 sections (and assigns their anchor ids), and
   wires keyboard navigation: Ctrl/Cmd + ←/→ between chapters,
   PageUp/PageDown between sections.

   Reads:
     window.SIDEBAR_DATA  — guide-local; defines stages and chapters.
     window.GUIDES        — shell-global; defined in docs/guides.js.

   No longer renders into the <aside id="sidebar"> element; that's left
   in the DOM for backward compatibility and hidden via CSS. */

const SIDEBAR = (typeof window !== 'undefined' && window.SIDEBAR_DATA) || { title: "", stages: [] };

(function () {
    const isHomePage = !window.SIDEBAR_DATA;
    const inChaptersDir = window.location.pathname.includes('/chapters/');
    const prefix = inChaptersDir ? '' : 'chapters/';
    const rootPrefix = isHomePage ? '' : (inChaptersDir ? '../../' : '../');

    const currentId = (() => {
        const p = window.location.pathname.split('/').pop() || '';
        return p.replace(/\.html$/, '');
    })();

    /* ── Top bar ──────────────────────────────────────────────── */
    let topBar = document.getElementById('top-bar');
    if (!topBar) {
        topBar = document.createElement('div');
        topBar.id = 'top-bar';
        document.body.insertBefore(topBar, document.body.firstChild);
    }
    // Home page has no switchers — it shows the guides index in <main>
    // (built by home.js) instead of the dropdown. Other pages get both.
    topBar.innerHTML =
        '<div class="top-bar-inner">' +
            (isHomePage ? '' : renderGuideSwitcher() + renderChapterSwitcher()) +
        '</div>';

    if (!isHomePage) {
        installSwitcherClosers();
        wireSwitcher('.guide-switcher');
        wireSwitcher('.chapter-switcher');
    }

    /* ── Dynamic guides.js load (if not preloaded) ───────────── */
    if (!isHomePage && !window.GUIDES) {
        const script = document.createElement('script');
        script.src = rootPrefix + 'guides.js';
        script.onload = () => {
            const el = topBar.querySelector('.guide-switcher');
            if (!el) return;
            const tmp = document.createElement('div');
            tmp.innerHTML = renderGuideSwitcher();
            el.replaceWith(tmp.firstElementChild);
            wireSwitcher('.guide-switcher');
        };
        script.onerror = () => {
            console.warn('sidebar.js: failed to load', script.src,
                '— guide-switcher popover will stay empty.');
        };
        document.head.appendChild(script);
    }

    /* ── Inject section anchors into chapter popover ─────────── */
    if (inChaptersDir) injectSectionAnchors();

    /* ── Keyboard shortcuts (chapter pages only) ──────────────── */
    if (inChaptersDir) {
        document.addEventListener('keydown', (e) => {
            // Don't intercept when typing in a field
            if (e.target.matches && e.target.matches('input, textarea, [contenteditable]')) return;

            // Ctrl/Cmd + ←/→ → previous / next chapter
            if ((e.ctrlKey || e.metaKey) && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
                // Locate the current chapter in the FULL list (it may itself
                // still be marked 'pending' mid-edit), then step to the
                // nearest chapter explicitly marked 'done' in that direction.
                const chapters = [];
                SIDEBAR.stages.forEach(stage => {
                    stage.chapters.forEach(ch => chapters.push(ch));
                });
                const idx = chapters.findIndex(ch => ch.id === currentId);
                if (idx === -1) return;

                const dir = e.key === 'ArrowLeft' ? -1 : 1;
                let target = null;
                for (let i = idx + dir; i >= 0 && i < chapters.length; i += dir) {
                    if (chapters[i].status === 'done') { target = chapters[i]; break; }
                }

                if (target) {
                    e.preventDefault();
                    window.location.href = `${target.id}.html`;
                }
                return;
            }

            // PageDown / PageUp → next / previous h2 section
            if (e.key === 'PageDown' || e.key === 'PageUp') {
                const h2s = Array.from(document.querySelectorAll('main h2'));
                if (h2s.length === 0) return;

                // A heading we just jumped to rests ~72px down (56px top bar
                // + 1rem scroll-margin). Treat anything at or above that
                // line as the current section, so PageDown advances to the
                // NEXT heading instead of re-selecting the resting one.
                const restBand = 80;
                let target = null;

                if (e.key === 'PageDown') {
                    // First h2 below the resting band
                    target = h2s.find(h2 => h2.getBoundingClientRect().top > restBand);
                } else {
                    // Last h2 scrolled above the viewport top (small forgiveness)
                    for (let i = h2s.length - 1; i >= 0; i--) {
                        if (h2s[i].getBoundingClientRect().top < -4) {
                            target = h2s[i];
                            break;
                        }
                    }
                }

                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    }

    /* ────────────────── Helper functions ────────────────────── */

    function renderGuideSwitcher() {
        const title = SIDEBAR.title || 'Choose';
        let items;
        if (window.GUIDES) {
            const pathParts = window.location.pathname.split('/').filter(s => s.length > 0);
            const currentGuideId = pathParts.find(p => window.GUIDES.some(g => g.id === p)) || null;

            // Category grouping lives in guides.js (window.groupGuides),
            // shared with home.js so the two renderings can't drift.
            items = window.groupGuides(window.GUIDES).map(({ category, guides }) => {
                const header = `<li class="category-header"><span>${category}</span></li>`;
                const entries = guides.map(g => {
                    const isCurrent = g.id === currentGuideId;
                    const classes = [
                        isCurrent ? 'current' : '',
                        g.dim ? 'dim' : ''
                    ].filter(Boolean).join(' ');
                    if (g.href && !isCurrent) {
                        return `<li class="${classes}"><a href="${rootPrefix}${g.href}">${g.title}</a></li>`;
                    }
                    return `<li class="${classes} disabled"><span>${g.title}</span></li>`;
                }).join('');
                return header + entries;
            }).join('');
        } else {
            items = `<li class="loading"><span>Loading…</span></li>`;
        }

        return `
            <div class="switcher guide-switcher" data-open="false">
                <button class="switcher-trigger" type="button" aria-haspopup="true" aria-expanded="false">
                    <span class="switcher-label">${title}</span>
                    <span class="switcher-chev" aria-hidden="true">▾</span>
                </button>
                <ul class="switcher-popover guide-popover" role="menu">${items}</ul>
            </div>
        `;
    }

    function getCurrentChapterTitle() {
        for (const stage of SIDEBAR.stages) {
            for (const ch of stage.chapters) {
                if (ch.id === currentId) return ch.title;
            }
        }
        return 'Chapters';
    }

    function renderChapterSwitcher() {
        if (SIDEBAR.stages.length === 0) return '';

        const title = getCurrentChapterTitle();

        let items = '';
        SIDEBAR.stages.forEach(stage => {
            items += `<li class="stage-header"><span>${stage.title}</span></li>`;
            stage.chapters.forEach(ch => {
                const isCurrent = ch.id === currentId;
                // Only an explicit 'done' gets a link — a typo'd or invented
                // status must not produce a link to a missing file.
                const isDone = ch.status === 'done';
                const classes = [
                    'chapter-item',
                    isCurrent ? 'current' : '',
                    isDone ? '' : 'pending dim'
                ].filter(Boolean).join(' ');
                if (!isDone) {
                    items += `<li class="${classes} disabled"><span>${ch.title}</span></li>`;
                } else {
                    const href = `${prefix}${ch.id}.html`;
                    items += `<li class="${classes}"><a href="${href}">${ch.title}</a></li>`;
                }
            });
        });

        return `
            <div class="switcher chapter-switcher" data-open="false">
                <button class="switcher-trigger" type="button" aria-haspopup="true" aria-expanded="false">
                    <span class="switcher-label">${title}</span>
                    <span class="switcher-chev" aria-hidden="true">▾</span>
                </button>
                <ul class="switcher-popover chapter-popover" role="menu">${items}</ul>
            </div>
        `;
    }

    function closeSwitcher(switcher) {
        switcher.dataset.open = 'false';
        const t = switcher.querySelector('.switcher-trigger');
        if (t) t.setAttribute('aria-expanded', 'false');
    }

    /* One document-level pair for ALL switchers, installed once: a click
       outside an open switcher (or Escape) closes it. wireSwitcher then
       only wires the trigger, so re-wiring after the dynamic guides.js
       re-render adds no document listeners and leaves no stale closures. */
    function installSwitcherClosers() {
        document.addEventListener('click', (e) => {
            document.querySelectorAll('.switcher[data-open="true"]').forEach(s => {
                if (!s.contains(e.target)) closeSwitcher(s);
            });
        });
        document.addEventListener('keydown', (e) => {
            if (e.key !== 'Escape') return;
            document.querySelectorAll('.switcher[data-open="true"]').forEach(closeSwitcher);
        });
    }

    function wireSwitcher(selector) {
        const switcher = document.querySelector(selector);
        if (!switcher) return;
        const trigger = switcher.querySelector('.switcher-trigger');
        if (!trigger) return;
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const wasOpen = switcher.dataset.open === 'true';
            // Close everything (incl. this one), then reopen if it was closed
            document.querySelectorAll('.switcher[data-open="true"]').forEach(closeSwitcher);
            if (!wasOpen) {
                switcher.dataset.open = 'true';
                trigger.setAttribute('aria-expanded', 'true');
            }
        });
    }
})();

function getChapterNumber(id) {
    let i = 0;
    for (const stage of SIDEBAR.stages) {
        for (const ch of stage.chapters) {
            i++;
            if (ch.id === id) return i;
        }
    }
    return null;
}

/* Walks the main content and prepends chapter.section / chapter.section.sub
   numbers to h2 / h3 headings. Assigns slug ids so in-page anchor links
   still work. No nav injection — the chapter popover lists chapters only. */
function injectSectionAnchors() {
    const main = document.querySelector('main');
    if (!main) return;

    const h2s = Array.from(main.querySelectorAll('h2'));
    if (h2s.length === 0) return;

    const currentId = (window.location.pathname.split('/').pop() || '').replace(/\.html$/, '');
    const chapterNum = getChapterNumber(currentId);

    const slug = (text) =>
        'sec-' + text.trim().toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');

    h2s.forEach((h2, idx) => {
        if (!h2.id) h2.id = slug(h2.textContent);

        if (chapterNum && !h2.querySelector('.section-num')) {
            const span = document.createElement('span');
            span.className = 'section-num';
            span.textContent = `${chapterNum}.${idx + 1}`;
            h2.prepend(span);
        }

        // Walk h3s for in-body numbering
        let subIdx = 0;
        let el = h2.nextElementSibling;
        while (el && el.tagName !== 'H2') {
            if (el.tagName === 'H3') {
                subIdx++;
                if (!el.id) el.id = slug(el.textContent);
                if (chapterNum && !el.querySelector('.section-num')) {
                    const span = document.createElement('span');
                    span.className = 'section-num';
                    span.textContent = `${chapterNum}.${idx + 1}.${subIdx}`;
                    el.prepend(span);
                }
            }
            el = el.nextElementSibling;
        }
    });

    /* Handle initial hash navigation (ids didn't exist until now).
       getElementById instead of querySelector: an arbitrary hash from an
       old or external link (e.g. "#2") is not a valid CSS selector and
       would throw. The try/catch covers malformed percent-encoding. */
    if (window.location.hash) {
        try {
            const target = document.getElementById(
                decodeURIComponent(window.location.hash.slice(1)));
            if (target) target.scrollIntoView();
        } catch (e) { /* malformed hash — ignore */ }
    }
}
