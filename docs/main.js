/* =================================================================
   Theme toggle + transition-flash guard
   ================================================================= */

(function () {
    /* Suppress CSS transitions while the first styles land, so the theme
       doesn't visibly "animate in" on load (style.css: body.no-transition). */
    document.body.classList.add('no-transition');
    requestAnimationFrame(() => {
        requestAnimationFrame(() => document.body.classList.remove('no-transition'));
    });

    /* ── Theme toggle ─────────────────────────────────────────── */
    const THEME_KEY = 'statbook:theme';
    const getTheme = () =>
        document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';

    const setTheme = (theme) => {
        if (theme === 'light') {
            document.documentElement.dataset.theme = 'light';
        } else {
            delete document.documentElement.dataset.theme;
        }
        try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
    };

    const themeBtn = document.createElement('button');
    themeBtn.id = 'theme-toggle';
    themeBtn.type = 'button';
    themeBtn.setAttribute('aria-label', 'Toggle light/dark theme');
    const topBar = document.getElementById('top-bar');
    if (topBar) {
        topBar.appendChild(themeBtn);
    } else {
        document.body.appendChild(themeBtn);
    }

    const updateThemeIcon = () => {
        themeBtn.textContent = getTheme() === 'light' ? '☾' : '☀';
    };

    themeBtn.addEventListener('click', () => {
        setTheme(getTheme() === 'light' ? 'dark' : 'light');
        updateThemeIcon();
    });

    updateThemeIcon();
})();
