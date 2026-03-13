/**
 * Navbar component.
 * Renders the responsive navigation bar and handles mobile menu toggling.
 */

// TODO: Implement proper state management

export function renderNavbar(): string {
  // Get current theme from localStorage or system preference
  const currentTheme =
    typeof window !== 'undefined'
      ? localStorage.getItem('theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : 'light';

  return `
    <nav class="navbar" id="main-navbar" aria-label="Main Navigation">
      <div class="navbar-inner">
        <a href="#/" class="navbar-logo" aria-label="Leaders for India Home">
          <div class="navbar-logo-icon">L</div>
          <span>Leaders for India</span>
        </a>
        <div class="navbar-links" role="menubar">
          <a href="#/" data-route="/" role="menuitem">Home</a>
          <a href="#/about" data-route="/about" role="menuitem">About Us</a>
          <a href="#/get-involved" data-route="/get-involved" role="menuitem">Get Involved</a>
          <a href="#/transparency" data-route="/transparency" role="menuitem">Transparency</a>
          <a href="#/resources" data-route="/resources" role="menuitem">Resources</a>
          <button class="theme-toggle" id="theme-toggle-desktop" aria-label="Toggle Dark Mode" aria-pressed="${currentTheme === 'dark'}">
            <span class="icon-sun">☀️</span>
            <span class="icon-moon">🌙</span>
          </button>
          <a href="#/get-involved" class="btn btn-primary navbar-cta" role="menuitem">Join Us</a>
        </div>
        <button class="navbar-toggle" id="nav-toggle" aria-expanded="false" aria-controls="mobile-nav" aria-label="Open navigation menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
    <div class="mobile-nav" id="mobile-nav" role="menu" aria-hidden="true">
      <a href="#/" data-route="/" role="menuitem">Home</a>
      <a href="#/about" data-route="/about" role="menuitem">About Us</a>
      <a href="#/get-involved" data-route="/get-involved" role="menuitem">Get Involved</a>
      <a href="#/transparency" data-route="/transparency" role="menuitem">Transparency</a>
      <a href="#/resources" data-route="/resources" role="menuitem">Resources</a>
      <button class="theme-toggle mobile-theme-toggle" id="theme-toggle-mobile" aria-label="Toggle Dark Mode" aria-pressed="${currentTheme === 'dark'}">
        <span class="icon-sun">☀️ Light Mode</span>
        <span class="icon-moon">🌙 Dark Mode</span>
      </button>
      <a href="#/get-involved" class="btn btn-primary mobile-nav-cta" role="menuitem">Join Us</a>
    </div>
  `;
}

export function initNavbar() {
  const navbar = document.getElementById('main-navbar');
  const toggle = document.getElementById('nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  // Scroll effect
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // Mobile toggle functionality
  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.contains('open');
      mobileNav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', (!isOpen).toString());
      mobileNav.setAttribute('aria-hidden', isOpen.toString());
    });

    // Event delegation for mobile nav links to close the menu
    mobileNav.addEventListener('click', e => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.closest('a')) {
        mobileNav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // Theme Toggles
  const deskToggle = document.getElementById('theme-toggle-desktop');
  const mobToggle = document.getElementById('theme-toggle-mobile');

  const toggleTheme = () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  deskToggle?.addEventListener('click', toggleTheme);
  mobToggle?.addEventListener('click', toggleTheme);
}
