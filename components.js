(() => {
  const LANG_KEY = 'lang'

  function getLang() {
    const stored = (() => {
      try {
        return localStorage.getItem(LANG_KEY)
      } catch {
        return null
      }
    })()

    if (stored === 'fr' || stored === 'en') return stored
    return 'fr'
  }

  function setLang(lang) {
    const safe = lang === 'fr' ? 'fr' : 'en'
    document.documentElement.lang = safe
    document.body.classList.toggle('lang-fr', safe === 'fr')
    document.body.classList.toggle('lang-en', safe === 'en')

    document.querySelectorAll('[data-lang-btn]').forEach((btn) => {
      const active = btn.getAttribute('data-lang-btn') === safe
      btn.setAttribute('aria-pressed', active ? 'true' : 'false')
    })

    try {
      localStorage.setItem(LANG_KEY, safe)
    } catch {
      // ignore
    }
  }

  function injectLayout() {
    const headerHost = document.querySelector('[data-component="header"]')
    const footerHost = document.querySelector('[data-component="footer"]')

    if (headerHost) {
      headerHost.innerHTML = `
        <header class="site-header">
          <div class="container header-inner">
            <a class="brand" href="./index.html" aria-label="Open Science (home)">
              <span class="brand-mark" aria-hidden="true">OS</span>
              <div class="brand-text">
                <div class="brand-title">Open Science</div>

              </div>
            </a>

            <nav class="lang-switch" aria-label="Language selector">
              <button class="lang-btn" type="button" data-lang-btn="en" aria-pressed="false">
                English
              </button>
              <button class="lang-btn" type="button" data-lang-btn="fr" aria-pressed="false">
                Français
              </button>
            </nav>
          </div>
        </header>
      `
    }

    if (footerHost) {
      footerHost.innerHTML = `
        <footer class="site-footer">
          <div class="container footer-inner">
            <p class="fineprint">
              <span class="i18n en">Xiaoou WANG · Digital Humanities Engineer · 2026</span>
              <span class="i18n fr">Xiaoou WANG · Ingénieur Humanités Numériques · 2026</span>
            </p>
          </div>
        </footer>
      `
    }
  }

  document.addEventListener('click', (e) => {
    const target = e.target && e.target.closest ? e.target.closest('[data-lang-btn]') : null
    if (!target) return
    setLang(target.getAttribute('data-lang-btn'))
  })

  injectLayout()
  setLang(getLang())
})()

