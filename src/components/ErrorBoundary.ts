/**
 * Error Boundary component for catching and handling errors in the component tree
 * Prevents entire app crashes from component errors
 */

export class ErrorBoundary extends HTMLElement {
  private hasError: boolean = false;
  private error: Error | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['fallback-message'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'fallback-message' && oldValue !== newValue) {
      this.render();
    }
  }

  private render() {
    if (this.hasError && this.error) {
      const fallbackMessage =
        this.getAttribute('fallback-message') || 'Something went wrong. Please try again.';

      this.shadowRoot!.innerHTML = `
        <div class="error-boundary">
          <div class="error-icon">⚠️</div>
          <h3 class="error-title">Error</h3>
          <p class="error-message">${fallbackMessage}</p>
          <p class="error-detail">${this.error.message}</p>
          <button class="retry-button">Try Again</button>
        </div>
      `;

      this.shadowRoot?.querySelector('.retry-button')?.addEventListener('click', () => {
        this.resetError();
      });
    } else {
      // Render children
      this.shadowRoot!.innerHTML = '<slot></slot>';
    }
  }

  // Method to manually trigger error handling
  handleError(error: Error) {
    this.hasError = true;
    this.error = error;
    console.error('ErrorBoundary caught error:', error);
    this.render();
  }

  // Method to reset error state
  resetError() {
    this.hasError = false;
    this.error = null;
    this.render();
  }

  // Check if boundary has error
  hasCaughtError() {
    return this.hasError;
  }
}

// Register the custom element
declare global {
  interface HTMLElementTagNameMap {
    'error-boundary': ErrorBoundary;
  }
}

if (!customElements.get('error-boundary')) {
  customElements.define('error-boundary', ErrorBoundary);
}
