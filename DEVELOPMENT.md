# 🏗️ Leaders for India - Development Guide

Welcome to the **Leaders for India** codebase! This project is a high-performance Single Page Application (SPA) built with **Vanilla TypeScript** and **Vite**.

## 🚀 Architecture Overview

We intentionally avoid heavy frameworks (React/Angular/Vue) to ensure the fastest possible performance and smallest bundle size.

### Core Systems:
1. **Router (`src/router.ts`)**: A custom hash-based router that handles:
   - Dynamic page loading (Code Splitting).
   - View Transitions API support.
   - Accessibility (Focus management & Screen reader announcements).
   - SEO Meta tag updates.
2. **Templating (`src/utils.ts`)**: We use the `html` tagged template for rendering.
   - **XSS Protection**: All dynamic values are escaped by default.
   - **Raw HTML**: Use the `raw()` helper only when you explicitly need to inject HTML (e.g., from constants).
3. **Components (`src/components/ui.ts`)**: Functional components that return HTML strings.

---

## 🛠️ Adding a New Page

1. Create a new file in `src/pages/your-page.ts`.
2. Define a render function:
   ```typescript
   import { html } from '../utils';
   export function renderYourPage(): string {
     return html`<h1>Your Page</h1>`;
   }
   ```
3. Register the route in `src/config.ts`:
   ```typescript
   export const ROUTES = {
     // ...
     YOUR_PAGE: '/your-path'
   } as const;
   ```
4. Add metadata for SEO in `ROUTE_META` within `src/config.ts`.
5. Register the route in `src/main.ts` using dynamic imports:
   ```typescript
   registerRoute(ROUTES.YOUR_PAGE, () => import('./pages/your-page').then(m => m.renderYourPage()));
   ```

---

## 🔒 Security Best Practices

### XSS Prevention
Always use the `html` tag for templates. Never use `innerHTML` directly with user-provided strings.
```typescript
// ✅ SAFE (Escaped automatically)
html`<div>${userInput}</div>`

// ❌ UNSAFE (Vulnerable to XSS)
`<div>${userInput}</div>`
```

---

## 🧪 Testing

We use **Vitest** for unit testing.
- Run tests: `npm test`
- Run with UI: `npx vitest --ui`

Ensure all new routing or component logic includes a corresponding test in `src/__tests__/`.

---

## 💅 Styling

- **CSS Variables**: Global variables are defined in `src/style.css`.
- **Animations**: Use the `animate-on-scroll` class to trigger entry animations.
- **Utility Classes**: We use a mobile-first grid system (`grid-3`, `grid-4`, `container`).

---

## 📝 Form Handling

Use the `createFormHandler` from `src/forms.ts` for consistent validation:
```typescript
import { createFormHandler, RULES } from '../forms';

const handler = createFormHandler({
  email: [RULES.required(), RULES.email()],
}, async (values) => {
  // Handle submission
});

handler.init('my-form-id');
```
