import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { registerRoute, initRouter, navigate } from '../router.ts';
import { ROUTES } from '../config';

describe('Router', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app-root"></div>';
    window.location.hash = '';
    vi.useFakeTimers();
    
    // Mock APIs not present in jsdom
    class MockIntersectionObserver {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
    }
    window.IntersectionObserver = MockIntersectionObserver as any;
    
    window.scrollTo = vi.fn();
    
    // Mock View Transitions
    (document as any).startViewTransition = (cb: () => void) => {
      cb();
      return { 
        finished: Promise.resolve(), 
        ready: Promise.resolve(), 
        updateCallbackDone: Promise.resolve() 
      };
    };
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('registers routes and renders correct handler on initialization', async () => {
    // @ts-ignore - using test route
    registerRoute('/test-route', () => '<h1>Test Page</h1>');
    window.location.hash = '#/test-route';
    
    initRouter('app-root');
    
    // Use waitFor for async DOM updates
    await vi.waitFor(() => {
      const root = document.getElementById('app-root');
      if (!root?.innerHTML.includes('Test Page</h1>')) {
        throw new Error('Not rendered yet');
      }
    });
    
    const root = document.getElementById('app-root');
    expect(root?.querySelector('h1')?.getAttribute('tabindex')).toBe('-1');
  });

  it('falls back to / when route is not found', async () => {
    registerRoute(ROUTES.HOME, () => '<h1>Home Page</h1>');
    window.location.hash = '#/invalid';
    
    initRouter('app-root');
    
    expect(window.location.hash).toBe('#/');
    
    // In jsdom changing the hash doesnt process the hashchange event synchronously
    window.dispatchEvent(new Event('hashchange'));

    await vi.waitFor(() => {
      const root = document.getElementById('app-root');
      if (!root?.innerHTML.includes('Home Page</h1>')) {
        throw new Error('Not rendered yet');
      }
    });

    const root = document.getElementById('app-root');
    expect(root?.querySelector('h1')?.getAttribute('tabindex')).toBe('-1');
  });

  it('updates the hash correctly using navigate', () => {
    navigate(ROUTES.ABOUT);
    expect(window.location.hash).toBe('#' + ROUTES.ABOUT);
  });
});
