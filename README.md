# E-Commerce Frontend

<div align="center">

[![Angular](https://img.shields.io/badge/Angular-20.3.9-DD0031?logo=angular)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![SASS](https://img.shields.io/badge/SASS-1.65.1-CC6699?logo=sass)](https://sass-lang.com/)
[![RxJS](https://img.shields.io/badge/RxJS-7.8-7B1FA2?logo=rxjs)](https://rxjs.dev/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.8-7952B3?logo=bootstrap)](https://getbootstrap.com/)
[![License](https://img.shields.io/badge/License-GPL--3.0-blue.svg)](LICENSE.md)

A modern, production-ready e-commerce frontend application built with Angular 20, featuring standalone components, signals-based state management, and enterprise-grade architecture.

[Features](#-features) • [Quick Start](#-quick-start) • [Architecture](#-architecture) • [Documentation](#-documentation) • [Backend API](#-backend-integration)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Development Server](#development-server)
    - [Production Build](#production-build)
- [Project Structure](#-project-structure)
- [Configuration](#-configuration)
- [Development Guidelines](#-development-guidelines)
- [Testing](#-testing)
- [Backend Integration](#-backend-integration)
- [Performance & Optimization](#-performance--optimization)
- [Accessibility](#-accessibility)
- [Contributing](#-contributing)
- [Troubleshooting](#-troubleshooting)
- [License](#-license)

---

## 🎯 Overview

The **E-Commerce Frontend** is a Single Page Application (SPA) that provides a modern, responsive user interface for the E-Commerce platform. Built with Angular 20's latest features including standalone components, signals, and control flow syntax, it delivers a seamless shopping experience across all devices.

### Key Highlights

✅ **Modern Angular 20** - Latest features with standalone components and signals  
✅ **Clean Architecture** - Domain-driven design with clear separation of concerns  
✅ **Type-Safe** - Full TypeScript coverage with strict type checking  
✅ **Reactive Patterns** - RxJS for complex data flows and async operations  
✅ **Performance Optimized** - Lazy loading, bundle budgets, and OnPush change detection  
✅ **Responsive Design** - Mobile-first approach with Bootstrap 5  
✅ **Code Quality** - ESLint, Prettier, and automated formatting  
✅ **Production Ready** - Optimized builds with subresource integrity

---

## ✨ Features

### User Experience

- **Product Management**
    - Browse products with advanced filtering and search
    - View detailed product information with image galleries
    - SKU-based product variations
    - Featured products and sales sections
    - Category-based navigation

- **Shopping Cart**
    - Add/remove items with quantity management
    - Local storage persistence
    - Real-time price calculations
    - Cart synchronization with backend (planned)

- **User Authentication**
    - Sign up with email validation
    - Login with JWT token management
    - Password recovery (planned)
    - User profile management

- **Checkout Process**
    - Multi-step checkout flow
    - Address management
    - Payment integration (planned)
    - Order confirmation and tracking

- **User Account**
    - Order history
    - Profile settings
    - Wishlist (planned)
    - Address book

### Technical Features

- **Standalone Components** - No NgModules, better tree-shaking
- **Signals API** - Modern reactive state management
- **Control Flow Syntax** - Native `@if`, `@for`, `@switch` instead of structural directives
- **Reactive Forms** - Type-safe form validation
- **Lazy Loading** - Route-based code splitting
- **OnPush Change Detection** - Optimal performance
- **SCSS Architecture** - Component-scoped styles with global utilities
- **Bootstrap Integration** - Responsive grid and components via ng-bootstrap

---

## 🏗️ Architecture

The application follows **Clean Architecture** principles with clear separation between presentation, application, domain, and infrastructure layers:

```
src/
├── app/
│   ├── application/          # Application Layer
│   │   └── app.routes.ts     # Route configuration
│   │
│   ├── domain/               # Domain Layer
│   │   ├── models/           # Domain entities & value objects
│   │   ├── services/         # Domain services & business logic
│   │   └── interfaces/       # Domain contracts
│   │
│   ├── infrastructure/       # Infrastructure Layer
│   │   ├── app.config.ts     # App configuration & DI providers
│   │   ├── services/         # HTTP services & external integrations
│   │   ├── interceptors/     # HTTP interceptors (auth, errors)
│   │   └── guards/           # Route guards
│   │
│   └── presentation/         # Presentation Layer
│       ├── app.ts            # Root component
│       ├── components/       # Shared components
│       │   ├── layout/       # Layout wrapper
│       │   ├── header/       # Header navigation
│       │   ├── footer/       # Footer
│       │   └── sidebar/      # Sidebar navigation
│       │
│       └── pages/            # Feature pages (routed components)
│           ├── home/         # Homepage
│           ├── product-list/ # Product catalog
│           ├── product-detail/ # Product details
│           ├── cart/         # Shopping cart
│           ├── checkout/     # Checkout flow
│           ├── login/        # Login page
│           ├── register/     # Registration
│           ├── account/      # User account
│           ├── orders/       # Order history
│           └── not-found/    # 404 page
│
├── index.html                # HTML entry point
├── main.ts                   # Bootstrap application
└── styles.scss               # Global styles
```

### Dependency Flow

- **Presentation** → Application → Domain ← Infrastructure
- Dependencies flow inward toward the domain
- Infrastructure implements interfaces defined in domain/application

### Design Patterns

- **Smart/Dumb Components** - Container and presentation components
- **Signals** - Reactive state management
- **RxJS** - Async data streams and operators
- **Service Layer** - Business logic separation
- **Dependency Injection** - Using Angular's `inject()` function
- **Route Guards** - Authentication and authorization

---

## 🛠️ Tech Stack

### Frontend Framework

- **Angular 20.3.9** - Modern web framework with signals and standalone components
- **TypeScript 5.9.2** - Type-safe JavaScript with latest features

### UI & Styling

- **Bootstrap 5.3.8** - Responsive CSS framework
- **ng-bootstrap 19.0.1** - Angular-powered Bootstrap widgets
- **SASS 1.65.1** - CSS preprocessor with SCSS syntax
- **@popperjs/core 2.11.8** - Tooltip and popover positioning

### State Management & Async

- **RxJS 7.8** - Reactive programming library
- **Angular Signals** - Built-in reactive primitives
- **Angular Forms** - Reactive forms with validation

### Development Tools

- **Angular CLI 20.3.9** - Project scaffolding and build tools
- **ESLint 9.39.1** - Code linting with Angular ESLint rules
- **Prettier 3.6.2** - Code formatting
- **Jasmine 5.9.0** - Testing framework
- **Karma 6.4.0** - Test runner

### Package Manager

- **pnpm** - Fast, disk space efficient package manager

---

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed:

- **Node.js 18.x or 20.x (LTS)** - [Download](https://nodejs.org/)
- **pnpm** - Fast package manager (recommended)
    ```powershell
    npm install -g pnpm
    ```
- **Angular CLI** (optional, for scaffolding)
    ```powershell
    npm install -g @angular/cli
    ```

### Installation

#### 1. Clone the Repository

```powershell
git clone https://github.com/mgnischor/ecommerce-frontend.git
cd ecommerce-frontend
```

#### 2. Install Dependencies

```powershell
pnpm install
```

> **Note**: You can also use `npm install` or `yarn install` if you prefer.

### Development Server

#### Start the Development Server

```powershell
pnpm start
```

**Access the application:**

- **URL**: `http://localhost:4200`
- **Hot Reload**: Enabled by default

**Features:**

- Live reload on file changes
- Source maps for debugging
- Detailed error messages
- Angular DevTools support

### Production Build

#### Build for Production

```powershell
pnpm run build:production
```

**Output:**

- Location: `dist/ecommerce-frontend/browser/`
- Optimizations: Minification, tree-shaking, dead code elimination
- Subresource Integrity: Enabled for security
- Output Hashing: Cache-busting enabled

#### Build for Development

```powershell
pnpm run build:development
```

**Features:**

- Source maps enabled
- No optimization for faster builds
- Useful for debugging production builds locally

#### Serve Production Build Locally

```powershell
# Using any static server
npx serve dist/ecommerce-frontend/browser
```

---

## 📁 Project Structure

### Core Files

```
ecommerce-frontend/
├── src/
│   ├── app/
│   │   ├── application/
│   │   │   └── app.routes.ts                 # Route definitions
│   │   │
│   │   ├── domain/                           # Domain layer (planned)
│   │   │   ├── models/                       # Entity models
│   │   │   ├── services/                     # Domain services
│   │   │   └── interfaces/                   # Contracts
│   │   │
│   │   ├── infrastructure/
│   │   │   └── app.config.ts                 # App configuration
│   │   │
│   │   └── presentation/
│   │       ├── app.ts                        # Root component
│   │       ├── app.html                      # Root template
│   │       ├── app.scss                      # Root styles
│   │       ├── components/                   # Shared components
│   │       └── pages/                        # Feature pages
│   │
│   ├── index.html                            # HTML entry point
│   ├── main.ts                               # Bootstrap
│   └── styles.scss                           # Global styles
│
├── public/                                   # Static assets
├── angular.json                              # Angular CLI configuration
├── tsconfig.json                             # TypeScript configuration
├── tsconfig.app.json                         # App TypeScript config
├── package.json                              # Dependencies and scripts
└── README.md                                 # This file
```

### Key Directories

- **`src/app/presentation/components/`** - Reusable UI components (header, footer, layout, sidebar)
- **`src/app/presentation/pages/`** - Routed feature pages (home, products, cart, checkout, etc.)
- **`src/app/infrastructure/`** - Configuration, services, interceptors, guards
- **`src/app/domain/`** - Business logic and domain models (planned)
- **`public/`** - Static assets (images, fonts, favicons)

---

## ⚙️ Configuration

### Application Configuration

Configuration is stored in `src/app/infrastructure/app.config.ts`:

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './application/app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        // Add more providers here
    ],
};
```

### Backend API Configuration

Create an environment configuration file (planned):

```typescript
// src/app/infrastructure/config/environment.ts
export const environment = {
    production: false,
    apiBaseUrl: 'https://localhost:5049/api/v1',
};
```

### Angular Configuration

Key settings in `angular.json`:

- **Build Budgets** - Warns when bundles exceed 500KB, errors at 1MB
- **Style Budgets** - Component styles limited to 4KB warning, 8KB error
- **Source Maps** - Enabled in development, disabled in production
- **Optimization** - Minification, tree-shaking, dead code elimination (production only)

### TypeScript Configuration

Strict mode enabled in `tsconfig.json`:

```json
{
    "compilerOptions": {
        "strict": true,
        "noImplicitAny": true,
        "strictNullChecks": true,
        "strictFunctionTypes": true,
        "strictBindCallApply": true,
        "strictPropertyInitialization": true,
        "noImplicitThis": true,
        "alwaysStrict": true
    }
}
```

---

## 💻 Development Guidelines

### Angular Best Practices

- **Use Standalone Components** - No NgModules
- **Prefer Signals** - Use `signal()`, `computed()`, `effect()` for reactive state
- **Control Flow Syntax** - Use `@if`, `@for`, `@switch` instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- **OnPush Change Detection** - Set `changeDetection: ChangeDetectionStrategy.OnPush`
- **Function-based APIs** - Use `input()`, `output()`, `inject()` instead of decorators
- **Lazy Loading** - Load feature routes on demand
- **NgOptimizedImage** - Use for static images (not inline base64)

### TypeScript Best Practices

- **Strict Type Checking** - Enabled by default
- **Type Inference** - Let TypeScript infer when obvious
- **Avoid `any`** - Use `unknown` when type is uncertain
- **Interfaces** - Define contracts for data structures

### RxJS Best Practices

- **Avoid Nested Subscriptions** - Use operators like `switchMap`, `mergeMap`, `concatMap`
- **Async Pipe** - Prefer `| async` in templates to auto-unsubscribe
- **Pipeable Operators** - Chain operators for readability
- **Error Handling** - Use `catchError` for graceful degradation

### SCSS Best Practices

- **Component Styles** - Keep styles scoped to components
- **Global Utilities** - Use `src/styles.scss` for global styles
- **Bootstrap Classes** - Use utility classes for spacing and layout
- **BEM Naming** - Use consistent class naming conventions
- **SCSS Variables** - Define colors, spacing, breakpoints in variables

### Code Quality

#### Format Code

```powershell
pnpm run format
```

#### Check Formatting

```powershell
pnpm run format:check
```

#### Lint Code

```powershell
pnpm run lint
```

#### Fix Linting Issues

```powershell
pnpm run lint:fix
```

---

## 🧪 Testing

### Unit Tests

Run all unit tests with Karma:

```powershell
pnpm run test:development
```

**Features:**

- **Jasmine** - Testing framework
- **Karma** - Test runner
- **Code Coverage** - Reports generated in `coverage/`

### Production Test Build

```powershell
pnpm run test:production
```

### Continuous Testing (Watch Mode)

```powershell
pnpm run watch
```

Rebuilds on file changes for rapid development.

### End-to-End Tests

> ⚠️ **Note**: E2E tests are not yet configured. Recommended tools: **Playwright** or **Cypress**.

---

## 🔗 Backend Integration

### Backend API Repository

This frontend consumes the **E-Commerce Backend API**:

- **Repository**: [ecommerce-backend](https://github.com/mgnischor/ecommerce-backend)
- **Tech Stack**: ASP.NET Core 9, PostgreSQL, JWT Authentication
- **API Docs**: `https://localhost:5049/docs` (when running locally)

### Connecting to Backend

#### Local Backend (Development)

1. Start the backend server:

    ```powershell
    cd ecommerce-backend
    dotnet run
    ```

2. Update frontend configuration:

    ```typescript
    // src/app/infrastructure/config/environment.ts
    export const environment = {
        apiBaseUrl: 'https://localhost:5049/api/v1',
    };
    ```

3. Ensure CORS is enabled in backend `Program.cs`:

    ```csharp
    builder.Services.AddCors(options =>
    {
        options.AddDefaultPolicy(policy =>
        {
            policy.WithOrigins("http://localhost:4200")
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
        });
    });
    ```

#### Docker Backend

```powershell
# In backend repository
docker-compose up -d
```

Update frontend:

```typescript
export const environment = {
    apiBaseUrl: 'http://localhost:5049/api/v1',
};
```

### Authentication Flow

1. **Login** - `POST /api/v1/login` returns JWT token
2. **Store Token** - Save in localStorage or sessionStorage
3. **HTTP Interceptor** - Attach token to all requests in `Authorization: Bearer <token>` header
4. **Token Refresh** - Implement refresh logic (planned)
5. **Logout** - Clear token and redirect

### API Endpoints

#### Authentication

- `POST /api/v1/login` - User login
- `POST /api/v1/users` - User registration

#### Products

- `GET /api/v1/products` - List products (paginated)
- `GET /api/v1/products/{id}` - Get product by ID
- `GET /api/v1/products/sku/{sku}` - Get product by SKU
- `GET /api/v1/products/featured` - Get featured products
- `GET /api/v1/products/on-sale` - Get products on sale
- `GET /api/v1/products/search?searchTerm={term}` - Search products

#### Orders (Planned)

- `GET /api/v1/orders` - Get user orders
- `POST /api/v1/orders` - Create order
- `GET /api/v1/orders/{id}` - Get order details

---

## ⚡ Performance & Optimization

### Build Optimizations

- **Tree Shaking** - Remove unused code
- **Minification** - Reduce bundle size
- **Code Splitting** - Lazy load routes
- **Subresource Integrity** - Verify resource integrity
- **Output Hashing** - Cache-busting file names

### Runtime Optimizations

- **OnPush Change Detection** - Reduce change detection cycles
- **TrackBy Functions** - Optimize `@for` loops
- **Lazy Loading** - Load features on demand
- **Virtual Scrolling** - Handle large lists efficiently (planned)
- **Image Optimization** - Use NgOptimizedImage for lazy loading

### Bundle Budgets

Current budgets (configured in `angular.json`):

- **Initial Bundle**: Warning at 500KB, error at 1MB
- **Component Styles**: Warning at 4KB, error at 8KB

### Performance Monitoring

Check bundle size after build:

```powershell
pnpm run build:production
```

Analyze bundle composition:

```powershell
npx webpack-bundle-analyzer dist/ecommerce-frontend/browser/stats.json
```

---

## ♿ Accessibility

### Best Practices

- **Semantic HTML** - Use proper HTML5 elements (`<nav>`, `<main>`, `<article>`, etc.)
- **ARIA Attributes** - Add `aria-label`, `aria-describedby` where needed
- **Keyboard Navigation** - Ensure all interactive elements are keyboard accessible
- **Focus Management** - Visible focus indicators, logical tab order
- **Color Contrast** - WCAG AA compliance (4.5:1 for normal text)
- **Screen Reader Support** - Test with NVDA, JAWS, or VoiceOver
- **Form Labels** - Every input has an associated label
- **Alt Text** - All images have descriptive alt attributes

### Accessibility Tools

- **axe DevTools** - Browser extension for accessibility auditing
- **Lighthouse** - Chrome DevTools accessibility audit
- **WAVE** - Web accessibility evaluation tool

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

### Workflow

1. **Fork the repository**
2. **Create a feature branch**
    ```powershell
    git checkout -b feature/amazing-feature
    ```
3. **Make your changes**
    - Follow Angular and TypeScript best practices
    - Write or update tests
    - Run linting and formatting
4. **Commit with clear messages**
    ```powershell
    git commit -m "feat: add amazing feature"
    ```
5. **Push to your fork**
    ```powershell
    git push origin feature/amazing-feature
    ```
6. **Open a Pull Request**

### Code Standards

- ✅ Follow Angular style guide
- ✅ Use standalone components
- ✅ Write meaningful commit messages (Conventional Commits)
- ✅ Add unit tests for new features
- ✅ Run `pnpm run lint` and `pnpm run format` before committing
- ✅ Keep PRs small and focused
- ✅ Update documentation for API changes

### Commit Message Convention

Use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, whitespace)
- `refactor:` - Code refactoring
- `test:` - Add or update tests
- `chore:` - Maintenance tasks

---

## 🔧 Troubleshooting

### Common Issues

#### Backend Connection Failed

**Error**: `ERR_CONNECTION_REFUSED` or CORS error

**Solution**:

1. Verify backend is running: `https://localhost:5049/api/v1`
2. Check CORS configuration in backend `Program.cs`
3. Update `apiBaseUrl` in frontend configuration
4. Disable browser extensions (ad blockers, privacy tools)

#### Port Already in Use

**Error**: `Port 4200 is already in use`

**Solution**:

```powershell
# Kill process on port 4200
netstat -ano | findstr :4200
taskkill /PID <PID> /F

# Or use a different port
ng serve --port 4300
```

#### Build Errors

**Error**: TypeScript compilation errors

**Solution**:

```powershell
# Clear cache and reinstall
Remove-Item -Recurse -Force node_modules, .angular
pnpm install
```

#### Linting Errors

**Error**: ESLint or Prettier errors

**Solution**:

```powershell
# Auto-fix linting issues
pnpm run lint:fix

# Format all files
pnpm run format
```

#### Test Failures

**Error**: Karma tests failing

**Solution**:

```powershell
# Clear Karma cache
Remove-Item -Recurse -Force .angular/cache

# Run tests with coverage
pnpm run test:development
```

---

## 📄 License

This project is licensed under the **GNU General Public License v3.0** (GPL-3.0-only).

See the [LICENSE.md](LICENSE.md) file for full license text.

### Key Points

- ✅ You can use, modify, and distribute this software
- ✅ You must disclose source code when distributing
- ✅ You must use the same GPL-3.0 license for derivative works
- ✅ You must state changes made to the code
- ❌ No warranty or liability is provided

---

## 👨‍💻 Author

**Miguel Nischor**

- GitHub: [@mgnischor](https://github.com/mgnischor)
- Frontend Repository: [ecommerce-frontend](https://github.com/mgnischor/ecommerce-frontend)
- Backend Repository: [ecommerce-backend](https://github.com/mgnischor/ecommerce-backend)

---

## 🙏 Acknowledgments

- **Angular Team** - For the incredible framework
- **RxJS Team** - For reactive programming patterns
- **TypeScript Team** - For type safety and developer experience
- **Bootstrap Team** - For responsive UI primitives
- **ng-bootstrap Team** - For Angular-native Bootstrap components

---

<div align="center">

**⭐ If you find this project useful, please consider giving it a star! ⭐**

Made with ❤️ using Angular 20

</div>
