# E-Commerce Frontend

<div align="center">

[![Angular](https://img.shields.io/badge/Angular-20.3.9-DD0031?logo=angular)](https://angular.io/)
[![SASS](https://img.shields.io/badge/SASS-1.65.1-CC6699?logo=sass)](https://sass-lang.com/)
[![RxJS](https://img.shields.io/badge/RxJS-7-7B1FA2?logo=rxjs)](https://rxjs.dev/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3?logo=bootstrap)](https://getbootstrap.com/)

</div>

This repository contains the frontend application for the E-Commerce project. It's a modern Angular SPA built with SASS for styles, RxJS for reactive data flows, and Bootstrap for quick, responsive UI layout.

This README mirrors the information and developer experience of the backend project while focusing on how to run and develop the Angular frontend.

## Table of Contents

-   Overview
-   Features
-   Tech Stack
-   Quick Start
    -   Prerequisites
    -   Local Development
    -   Build & Production
-   Project Structure
-   Configuration
-   Testing
-   Contributing
-   License

## Overview

The frontend is a Single Page Application (SPA) that consumes the E-Commerce Backend API. It provides user-facing features such as product listing, search, cart management, checkout flows, and user account pages. The app uses reactive patterns (RxJS) and a component-driven architecture.

## Features

-   Product listing, filtering and search
-   Product detail and SKU selection
-   Shopping cart with local persistence (and optional server-side sync)
-   Checkout UI wired to backend endpoints
-   User sign-in / sign-up and profile pages
-   Responsive layout using Bootstrap and mobile-first SASS organization
-   Client-side validation and accessible components

## Tech Stack

-   Angular (v20+)
-   TypeScript
-   SASS (SCSS syntax)
-   RxJS for reactive streams
-   Bootstrap 5 for responsive UI primitives
-   Optional utilities: Angular Router, Angular Forms, HttpClient

## Quick start

### Prerequisites

-   Node.js (LTS) installed — recommended 18.x or 20.x
-   npm (comes with Node) or pnpm/yarn if you prefer
-   Angular CLI (optional, for generating scaffolding):

```powershell
npm install -g @angular/cli
```

### Local development

1. Install dependencies

```powershell
npm install
```

2. Configure the backend API URL

Open `src/app/app.config.ts` (or `src/environments/*.ts` if present) and update the API base URL to point to your backend instance. Example:

```ts
export const APP_CONFIG = {
    apiBaseUrl: "https://localhost:5049/api/v1",
};
```

3. Start the dev server

```powershell
npm run start
```

The app will be available at http://localhost:4200/ by default. The development server supports hot-reload.

Notes:

-   If your backend is running on a different port or host, update `apiBaseUrl` accordingly.
-   For cross-origin development, ensure the backend allows CORS from the frontend origin.

### Build & Production

Create an optimized production build:

```powershell
npm run build
```

The output will be in the `dist/` directory and can be served by any static server or integrated into a CDN / web host.

## Project structure (important files)

-   `src/app/` — main application source
    -   `app.routes.ts` — routing configuration
    -   `app.config.ts` — runtime configuration (API base URL, feature flags)
    -   `app.ts`, `app.html`, `app.scss` — root app bootstrapping and global styles
-   `src/styles.scss` — global SASS entry
-   `src/assets/` — images and static files
-   `package.json` — npm scripts and dependencies

Use idiomatic Angular folder patterns (components, services, models, pages) and keep components small and focused.

## Configuration

-   Environment/runtime configuration is stored in `src/app/app.config.ts`. For CI/CD and production deploys, prefer environment variables or a build-time replacement strategy.
-   To point the frontend to the backend running in Docker (dev): set `apiBaseUrl` to `http://localhost:5049/api/v1`.

## Development guidelines

-   Prefer small, testable components.
-   Use RxJS best practices: avoid nested subscriptions; favor pipeable operators and the `async` pipe in templates.
-   Keep styles in SASS partials and use BEM or a consistent naming strategy for class names.
-   Use Bootstrap utilities for layout and spacing, but keep component styles encapsulated when needed.

## Testing

Run unit tests:

```powershell
npm run test
```

If E2E tests are set up, run:

```powershell
npm run e2e
```

## Accessibility and Performance

-   Aim for semantic HTML and proper ARIA attributes where necessary.
-   Use lazy loading for feature routes to reduce initial bundle size.
-   Use Angular built-in optimizations (production builds, differential loading, and bundle budgets) to keep the app performant.

## Contributing

Please follow the same contribution flow as the backend:

1. Fork the repo
2. Create a feature branch
3. Commit changes with clear messages
4. Open a Pull Request

Add or update unit tests for new behavior and keep changes small and reviewable.

## Troubleshooting

-   If the app can't reach the backend, verify `apiBaseUrl` and CORS settings on the backend.
-   If types or linting fail, run `npm install` and ensure your Node.js version matches the project's engine policy.

## License

This project follows the same license as the backend. See the repository `LICENSE` file for details.

## Author

Miguel Nischor — see the backend repository for more information and full project documentation.
