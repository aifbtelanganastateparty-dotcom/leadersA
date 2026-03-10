/**
 * Router cache management.
 * Handles HTML caching and scroll position restoration.
 */

const cache = new Map<string, string>();
const scrollPositions = new Map<string, number>();

/**
 * Get cached HTML for a route.
 */
export function getCachedHTML(path: string): string | undefined {
  return cache.get(path);
}

/**
 * Set cached HTML for a route.
 */
export function setCachedHTML(path: string, html: string): void {
  cache.set(path, html);
}

/**
 * Save scroll position for a route.
 */
export function saveScrollPosition(path: string, position: number): void {
  scrollPositions.set(path, position);
}

/**
 * Get saved scroll position for a route.
 */
export function getScrollPosition(path: string): number {
  return scrollPositions.get(path) || 0;
}

/**
 * Clear cache for a specific route or all routes.
 */
export function clearCache(path?: string): void {
  if (path) {
    cache.delete(path);
    scrollPositions.delete(path);
  } else {
    cache.clear();
    scrollPositions.clear();
  }
}

/**
 * Export cache and scroll positions for debugging purposes.
 */
export function getCacheStats() {
  return {
    cachedRoutes: cache.size,
    scrollPositions: scrollPositions.size,
  };
}
