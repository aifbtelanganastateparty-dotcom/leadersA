/**
 * Application entry point.
 * Initializes the application shell, routing, and global effects.
 */

import './style.css';
import { registerRoute, initRouter, navigate } from './router';
import { renderNavbar, initNavbar } from './components/navbar';
import { renderFooter } from './components/footer';
import { ROUTES, ROUTE_META, type RoutePath } from './config';

try {
  // Set up application shell with safe null assertion
  const app = document.getElementById('app');
  if (!app) {
    throw new Error('Critical error: "app" root element not found in the DOM.');
  }

  app.innerHTML = `
    ${renderNavbar()}
    <div id="global-particles" aria-hidden="true" style="position:absolute;top:0;left:0;width:100%;height:100vh;pointer-events:none;z-index:0;overflow:hidden;display:none;"></div>
    <main id="page-content" style="position:relative;z-index:1;"></main>
    ${renderFooter()}
  `;

  // Register routes with lazy-loaded page modules
  registerRoute(ROUTES.HOME, () => {
    const mod = window.__pageCache?.home;
    if (mod) return mod.renderHome();
    throw new Error('Home page not loaded');
  });
  registerRoute(ROUTES.ABOUT, () => {
    const mod = window.__pageCache?.about;
    if (mod) return mod.renderAbout();
    throw new Error('About page not loaded');
  });
  registerRoute(ROUTES.GET_INVOLVED, () => {
    const mod = window.__pageCache?.getInvolved;
    if (mod) return mod.renderGetInvolved();
    throw new Error('Get Involved page not loaded');
  });
  registerRoute(ROUTES.TRANSPARENCY, () => {
    const mod = window.__pageCache?.transparency;
    if (mod) return mod.renderTransparency();
    throw new Error('Transparency page not loaded');
  });
  registerRoute(ROUTES.RESOURCES, () => {
    const mod = window.__pageCache?.resources;
    if (mod) return mod.renderResources();
    throw new Error('Resources page not loaded');
  });

  // Initialize router and navbar
  initRouter('page-content');
  initNavbar();

  // Initialize persistent particles once
  initParticles();

  // Lazy load page modules after initial render
  loadPageModules();
} catch (error) {
  console.error('Failed to initialize the application:', error);
  document.body.innerHTML =
    '<div style="padding: 2rem; text-align: center; color: red;">Failed to load application. Please refresh the page.</div>';
}

/**
 * Lazy loads all page modules and caches them
 */
async function loadPageModules() {
  try {
    // Load pages in parallel
    const [home, about, getInvolved, transparency, resources] = await Promise.all([
      import('./pages/home'),
      import('./pages/about'),
      import('./pages/get-involved'),
      import('./pages/transparency'),
      import('./pages/resources'),
    ]);

    // Cache loaded modules
    window.__pageCache = {
      home,
      about,
      getInvolved,
      transparency,
      resources,
    };

    // Re-render current route if it was waiting for module
    const currentHash = (window.location.hash.slice(1) || '/') as RoutePath;
    const currentRouteMeta = ROUTE_META[currentHash];
    if (currentRouteMeta) {
      // Trigger a silent re-render by navigating to current hash
      navigate(currentHash);
    }
  } catch (error) {
    console.error('Failed to load page modules:', error);
    document.getElementById('page-content')!.innerHTML =
      '<div style="padding: 4rem 2rem; text-align: center;"><h2>Failed to load page content.</h2><p>Please refresh the page or try again later.</p></div>';
  }
}

/**
 * Creates particles once in the global container
 */
function initParticles() {
  const container = document.getElementById('global-particles');
  if (!container) return;

  let html = '';
  for (let i = 0; i < 30; i++) {
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const delay = Math.random() * 6;
    const duration = 4 + Math.random() * 4;
    const opacity = 0.1 + Math.random() * 0.3;
    const size = 2 + Math.random() * 3;
    const colors = ['#FF9933', '#FFFFFF', '#138808'];
    const color = colors[i % colors.length];

    html += `<div class="hero-particle" style="left:${left}%;top:${top}%;animation-delay:${delay}s;animation-duration:${duration}s;opacity:${opacity};width:${size}px;height:${size}px;background:${color}"></div>`;
  }
  container.innerHTML = html;
  toggleParticles();
}

/**
 * Toggles visibility of global particles based on current route
 */
function toggleParticles() {
  const container = document.getElementById('global-particles');
  if (!container) return;

  const hash = window.location.hash.slice(1) || '/';
  // Only show on home page
  if (hash === ROUTES.HOME) {
    container.style.display = 'block';
  } else {
    container.style.display = 'none';
  }
}

window.addEventListener('hashchange', toggleParticles);

// Declare global page cache type
declare global {
  interface Window {
    __pageCache?: {
      home: typeof import('./pages/home');
      about: typeof import('./pages/about');
      getInvolved: typeof import('./pages/get-involved');
      transparency: typeof import('./pages/transparency');
      resources: typeof import('./pages/resources');
    };
  }
}
