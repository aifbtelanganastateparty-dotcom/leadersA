# Leaders for India

A high-performance, resilient Single Page Application (SPA) built with Vite and TypeScript for a decentralized civic governance platform.

## Architecture

This project adopts a zero-framework, dependency-lite architecture for optimal performance:
- **Build Tooling:** Vite + TypeScript
- **Routing:** Custom hash-based router (`src/router.ts`) with HTML string caching and scroll state restoration.
- **Styling:** Vanilla CSS design system (`src/style.css`) utilizing extensively scoped utility classes.
- **Data Layer:** Centralized static data constants (`src/data/constants.ts`).
- **Templating:** Template literals with shared UI functional components (`src/components/ui.ts`).

## Recent Refactoring & Code Quality Improvements

- Extracted all inline styles to CSS utility classes.
- Optimized particle animations by generating them into a persistent global container.
- Added exhaustive error handling and null-safety across the application lifecycle.
- Implemented view caching.
- Resolved DOM global pollution and accessibility gaps (WCAG/ARIA support).
- Integrated Vitest, ESLint, and Prettier for code quality enforcement.

## Commands

- \`npm run dev\` - Start the local development server
- \`npm run build\` - Typecheck and bundle for production
- \`npm run preview\` - Preview the production build
- \`npm run test\` - Run the Vitest unit test suite
- \`npm run lint\` - Run ESLint over the \`src\` directory
- \`npm run lint:fix\` - Automatically fix ESLint rules
- \`npm run format\` - Run Prettier to format source files

## Testing
The application employs **Vitest** for testing:
- **UI Components:** Validating generated HTML strings (`src/__tests__/components.test.ts`).
- **Data Integrity:** Ensuring stat totals, object lengths, and field schemas in `src/data/constants.ts`.
- **Router Logic:** Verifying path matching, fallbacks, and rendering (`src/__tests__/router.test.ts`).
