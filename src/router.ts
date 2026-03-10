import { ROUTES } from './config';
import { html } from './utils';

/**
 * Valid route paths based on the app configuration.
 */
export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];

/**
 * Route handler can return a string or a promise that resolves to a string (for dynamic imports).
 */
export type RouteHandler = () => string | Promise<string>;

interface Route {
  path: RoutePath;
  handler: RouteHandler;
}

const routes: Route[] = [];
const cache = new Map<string, string>();
const scrollPositions = new Map<string, number>();

// Cleanup function references
let cleanupPageInteractions: (() => void) | null = null;
let heroScrollHandler: (() => void) | null = null;

let contentEl: HTMLElement | null = null;
let currentPath: string = '';

/**
 * Registers a new route and its associated render handler.
 * @param path The URL hash path (e.g., '/')
 * @param handler Function that returns the HTML string for the page
 */
export function registerRoute(path: RoutePath, handler: RouteHandler) {
  routes.push({ path, handler });
}

/**
 * Navigates to a specific path by changing the window hash.
 * @param path The path to navigate to
 */
export function navigate(path: RoutePath) {
  window.location.hash = path;
}

/**
 * Initializes the router, setting up event listeners for navigation.
 * @param targetId The ID of the DOM element where pages render
 */
export function initRouter(targetId: string) {
  try {
    contentEl = document.getElementById(targetId);
    if (!contentEl) throw new Error(`Target element #${targetId} not found`);

    // Add progress bar
    const pb = document.createElement('div');
    pb.id = 'route-progress';
    pb.className = 'route-progress-bar';
    document.body.prepend(pb);

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('load', () => render(true));
    render(true);
  } catch (err) {
    console.error('Router initialization failed:', err);
  }
}

/**
 * Handles hash change events with proper cleanup
 */
function handleHashChange() {
  // Cleanup previous page listeners before rendering new page
  if (cleanupPageInteractions) {
    cleanupPageInteractions();
    cleanupPageInteractions = null;
  }
  // Remove hero scroll listener
  if (heroScrollHandler) {
    document.removeEventListener('scroll', heroScrollHandler);
    heroScrollHandler = null;
  }
  render();
}

/**
 * Core render function. Handles view switching, caching, and scroll restoration.
 */
async function render(isInitialLoad = false) {
  try {
    if (!contentEl) return;
    const hash = (window.location.hash.slice(1) || '/') as RoutePath;

    // Fire fake progress bar
    const pb = document.getElementById('route-progress');
    if (pb && !isInitialLoad) {
      pb.style.transition = 'none';
      pb.style.width = '0%';
      pb.style.opacity = '1';
      void pb.offsetHeight; // force reflow
      pb.style.transition = 'width 0.3s ease-out';
      pb.style.width = '70%';
    }

    // Save scroll position of outgoing page (unless initial load)
    if (!isInitialLoad && currentPath) {
      scrollPositions.set(currentPath, window.scrollY);
    }

    currentPath = hash;
    const route = routes.find(r => r.path === hash);

    if (route) {
      const performRender = async () => {
        if (!contentEl) return;
        
        // Use cache if available, otherwise generate and cache
        let htmlContent: string;
        if (cache.has(hash)) {
          htmlContent = cache.get(hash)!;
        } else {
          // Resolve handler (could be a promise for code splitting)
          const result = route.handler();
          htmlContent = typeof result === 'string' ? result : await result;
          cache.set(hash, htmlContent);
        }

        contentEl.innerHTML = htmlContent;

        if (pb && !isInitialLoad) {
          pb.style.width = '100%';
          setTimeout(() => {
            pb.style.transition = 'opacity 0.2s ease-out';
            pb.style.opacity = '0';
          }, 200);
        }

        // Accessibility: Focus management
        const heading = contentEl.querySelector('h1');
        if (heading) {
          heading.setAttribute('tabindex', '-1');
          heading.focus();
        } else {
          contentEl.setAttribute('tabindex', '-1');
          contentEl.focus();
        }

        // Restore scroll position or scroll to top
        const savedScroll = scrollPositions.get(hash) || 0;
        window.scrollTo({ top: savedScroll, behavior: 'instant' as ScrollBehavior });

        updateActiveNav(hash);
        announceRouteChange(hash);
        cleanupPageInteractions = initPageInteractions();
      };

      // Support View Transitions API if available
      // @ts-ignore - document.startViewTransition is experimental
      if (document.startViewTransition) {
        // @ts-ignore
        document.startViewTransition(performRender);
      } else {
        await performRender();
      }
    } else {
      // Fallback to home if route not found
      window.location.hash = ROUTES.HOME;
    }
  } catch (err) {
    console.error('Error rendering route:', err);
    if (contentEl) {
      contentEl.innerHTML =
        '<div style="padding: 4rem 2rem; text-align: center;"><h2>An error occurred loading this page.</h2></div>';
    }
  }
}

/**
 * Announces route change to screen readers for accessibility
 */
function announceRouteChange(path: RoutePath) {
  let announcer = document.getElementById('route-announcer');
  if (!announcer) {
    announcer = document.createElement('div');
    announcer.id = 'route-announcer';
    announcer.setAttribute('role', 'status');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.style.cssText = 'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;';
    document.body.appendChild(announcer);
  }
  
  const announcement = `Navigated to ${path === '/' ? 'Home' : path.slice(1)} page`;
  announcer.textContent = '';
  setTimeout(() => {
    announcer.textContent = announcement;
  }, 100);
}

/**
 * Updates the 'active' class on matching navigation links.
 */
function updateActiveNav(path: RoutePath) {
  document.querySelectorAll('.navbar-links a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('data-route');
    a.classList.toggle('active', href === path);
  });
}

/**
 * Initializes page-specific event listeners and observers.
 * Returns a cleanup function to remove all listeners.
 */
function initPageInteractions(): () => void {
  const observers: IntersectionObserver[] = [];
  const cleanupFns: Array<() => void> = [];

  try {
    // 1. Scroll animations
    const scrollObserver = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
    );
    observers.push(scrollObserver);
    document.querySelectorAll('.animate-on-scroll').forEach(el => scrollObserver.observe(el));

    // 1.5 Parallax Hero Effect
    const heroContent = document.querySelector('.hero-content') as HTMLElement;
    const heroBlob = document.querySelector('.hero-blob') as HTMLElement;
    if (heroContent || heroBlob) {
      heroScrollHandler = () => {
        const scrolled = window.scrollY;
        if (scrolled > 800) return; // Exit early if past hero
        if (heroContent) heroContent.style.transform = `translateY(${scrolled * 0.25}px)`;
        if (heroBlob) heroBlob.style.transform = `translate(-50%, calc(-50% + ${scrolled * 0.4}px))`;
      };
      document.addEventListener('scroll', heroScrollHandler, { passive: true });
    }

    // 2. Accordions
    const accordionHandler = (e: Event) => {
      const btn = (e.target as HTMLElement).closest('.accordion-trigger');
      if (!btn) return;
      const item = btn.closest('.accordion-item');
      if (!item) return;
      const isOpen = item.classList.contains('open');

      // Close siblings
      item.parentElement?.querySelectorAll('.accordion-item').forEach(s => {
        s.classList.remove('open');
        const c = s.querySelector('.accordion-content') as HTMLElement;
        if (c) c.style.maxHeight = '0';
        const trigger = s.querySelector('.accordion-trigger');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        const content = item.querySelector('.accordion-content') as HTMLElement;
        if (content) content.style.maxHeight = content.scrollHeight + 'px';
      }
    };
    document.querySelectorAll('.accordion-trigger').forEach(btn => {
      btn.addEventListener('click', accordionHandler);
    });
    cleanupFns.push(() => {
      document.querySelectorAll('.accordion-trigger').forEach(btn => {
        btn.removeEventListener('click', accordionHandler);
      });
    });

    // 3. Tabs
    const tabHandler = (e: Event) => {
      const btn = (e.target as HTMLElement).closest('.tab-btn');
      if (!btn) return;
      const tabGroup = btn.closest('.tabs-container');
      if (!tabGroup) return;
      const target = btn.getAttribute('data-tab');

      tabGroup.querySelectorAll('.tab-btn').forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tabGroup.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const panel = tabGroup.querySelector(`#${target}`);
      if (panel) panel.classList.add('active');
    };
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', tabHandler);
    });
    cleanupFns.push(() => {
      document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.removeEventListener('click', tabHandler);
      });
    });

    // 4. Animated counters
    const counterObserver = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          const el = e.target as HTMLElement;
          if (e.isIntersecting && !el.hasAttribute('data-animated')) {
            const target = parseInt(el.getAttribute('data-target') || '0');
            const suffix = el.getAttribute('data-suffix') || '';
            animateCounter(el, target, suffix);
            el.setAttribute('data-animated', 'true');
            counterObserver.unobserve(e.target);
          }
        });
      },
      { threshold: 0.5 },
    );
    observers.push(counterObserver);
    document.querySelectorAll('.counter-value').forEach(el => counterObserver.observe(el));

    // 5. Donation calculator (Get Involved Page)
    const slider = document.getElementById('donation-slider') as HTMLInputElement;
    if (slider) {
      const updateCalc = () => {
        const val = parseInt(slider.value);
        const amtEl = document.getElementById('calc-amount');
        const rtiEl = document.getElementById('calc-rti');
        const wardEl = document.getElementById('calc-wards');
        const caseEl = document.getElementById('calc-cases');
        if (amtEl) amtEl.textContent = `₹${val.toLocaleString('en-IN')}`;
        if (rtiEl) rtiEl.textContent = `${Math.floor(val / 100)}`;
        if (wardEl) wardEl.textContent = `${Math.max(1, Math.floor(val / 2000))}`;
        if (caseEl) caseEl.textContent = `${Math.floor(val / 500)}`;
      };
      slider.addEventListener('input', updateCalc);
      updateCalc();
      cleanupFns.push(() => {
        slider.removeEventListener('input', updateCalc);
      });
    }

    // 6. Search filter (Resources Page)
    const searchInput = document.getElementById('resource-search') as HTMLInputElement;
    if (searchInput) {
      const handleSearch = () => {
        const query = searchInput.value.toLowerCase();
        document.querySelectorAll('.resource-card').forEach(card => {
          const text = card.textContent?.toLowerCase() || '';
          (card as HTMLElement).style.display = text.includes(query) ? '' : 'none';
        });
      };
      searchInput.addEventListener('input', handleSearch);
      cleanupFns.push(() => {
        searchInput.removeEventListener('input', handleSearch);
      });
    }

    // 7. Testimonial auto-scroll (Home Page)
    const track = document.querySelector('.testimonials-track') as HTMLElement;
    if (track && !track.hasAttribute('data-scrolling')) {
      track.setAttribute('data-scrolling', 'true');
      let isPaused = false;

      const onMouseEnter = () => (isPaused = true);
      const onMouseLeave = () => (isPaused = false);
      const onTouchStart = () => (isPaused = true);
      const onTouchEnd = () => (isPaused = false);

      track.addEventListener('mouseenter', onMouseEnter);
      track.addEventListener('mouseleave', onMouseLeave);
      track.addEventListener('touchstart', onTouchStart, { passive: true });
      track.addEventListener('touchend', onTouchEnd, { passive: true });

      const testimonialInterval = window.setInterval(() => {
        if (!document.contains(track)) return;
        if (isPaused) return;

        const maxScroll = track.scrollWidth - track.clientWidth;
        const cardWidth = track.querySelector('.testimonial-card')?.clientWidth || 300;
        const gap = 32; // roughly var(--space-xl)
        const scrollAmount = cardWidth + gap;

        if (track.scrollLeft >= maxScroll - 10) {
          track.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }, 3500);

      cleanupFns.push(() => {
        track.removeEventListener('mouseenter', onMouseEnter);
        track.removeEventListener('mouseleave', onMouseLeave);
        track.removeEventListener('touchstart', onTouchStart);
        track.removeEventListener('touchend', onTouchEnd);
        window.clearInterval(testimonialInterval);
      });
    }
  } catch (err) {
    console.warn('Non-fatal error initializing page interactions:', err);
  }

  return () => {
    observers.forEach(obs => obs.disconnect());
    cleanupFns.forEach(fn => fn());
  };
}

function animateCounter(el: HTMLElement, target: number, suffix: string) {
  const duration = 2000;
  const start = performance.now();
  const step = (timestamp: number) => {
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    el.textContent = current.toLocaleString('en-IN') + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
