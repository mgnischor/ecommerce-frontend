# ecommerce-frontend — Claude Instructions

## Project Overview

Angular 21 e-commerce frontend for a robust multi-vendor marketplace. Supports storefront (product browsing, cart, checkout) and an admin panel (shipments, refunds, promotions, vendors, finance, inventory, stores, suppliers, shipping zones).

## Tech Stack

| Layer           | Technology                                   |
| --------------- | -------------------------------------------- |
| Framework       | Angular 21 (standalone, zoneless)            |
| Language        | TypeScript 5.9 (strict mode)                 |
| UI library      | Bootstrap 5.3 + ng-bootstrap 19              |
| State           | Angular Signals                              |
| Forms           | Angular Reactive Forms                       |
| HTTP            | Angular HttpClient + functional interceptors |
| i18n            | Custom `TranslateService` (en, es, pt-BR)    |
| Testing         | Jasmine + Karma                              |
| Linting         | ESLint + angular-eslint                      |
| Formatting      | Prettier (printWidth 100, singleQuote)       |
| Package manager | **pnpm**                                     |

## Architecture

Clean layered architecture under `src/app/`:

```
domain/         → Pure TypeScript models and enums (no Angular deps)
  models/       → Interfaces + enums exported via index.ts

application/    → Routing only (app.routes.ts)

infrastructure/ → Angular integration layer
  app.config.ts         → ApplicationConfig (providers)
  i18n/                 → TranslateService + TranslatePipe
  interceptors/         → authInterceptor, errorInterceptor (functional)
  services/             → One service per domain entity (HttpClient-based)

presentation/   → UI layer
  app.ts / app.html     → Root component
  components/           → Reusable layout components (Header, Sidebar, Footer, Layout)
  pages/                → Route-level page components
    admin/              → Lazy-loaded admin pages
    <page>/             → Eagerly loaded storefront pages
```

### Layer rules

- `domain/` models must NOT import from Angular or other layers.
- `infrastructure/services/` talk to the REST API; they return `Observable<T>`.
- `presentation/` components inject services and use signals for local state.
- Do NOT put business logic in components; keep it in services.

## Key Conventions

### Components

- Class names have **no suffix**: `Home`, `Header`, `ProductList`, `AdminShipments` — not `HomeComponent`.
- Never set `standalone: true` (it is the default in Angular 21).
- Always set `changeDetection: ChangeDetectionStrategy.OnPush`.
- Use `inject()` — never constructor injection.
- Use `input()` / `output()` functions — never `@Input()` / `@Output()` decorators.
- Use `signal()` for mutable local state, `computed()` for derived state.
- Do NOT use `ngClass` or `ngStyle` — use `class` and `style` bindings.
- Do NOT use `@HostBinding` / `@HostListener` — use the `host` object in `@Component`.

### Templates

- Use native control flow: `@if`, `@for`, `@switch` — never `*ngIf`, `*ngFor`, `*ngSwitch`.
- Use the `async` pipe for observables in templates.
- Use `TranslatePipe` for all user-facing strings: `{{ 'key' | translate }}`.
- Use `NgOptimizedImage` for all static images (not for base64).

### Services

- All services: `providedIn: 'root'`.
- One service file per domain entity (e.g., `product.service.ts`, `order.service.ts`).
- Services return `Observable<T>` — never subscribe inside a service.
- Use `environment.apiUrl` as the base URL.

### i18n

- Translation files: `public/i18n/{en,es,pt-BR}.json`.
- Use `TranslatePipe` in templates: `{{ 'section.key' | translate }}`.
- Use `TranslateService.get(key, params?)` in TypeScript code.
- Use `TranslateService.formatPrice(price)` and `formatDate(date)` for locale-aware formatting.

### Routing

- Storefront pages are **eagerly** loaded in `app.routes.ts`.
- Admin pages are **lazily** loaded via `loadComponent`.
- Admin routes are children of `{ path: 'admin', children: [...] }`.

### State (Signals)

- Local component state → `signal<T>(initialValue)`.
- Derived state → `computed(() => ...)`.
- Update signals with `.set()` or `.update()` — never `.mutate()`.
- Expose read-only signals to templates via `.asReadonly()` or `computed()`.

### Forms

- Always use Reactive Forms (`FormGroup`, `FormControl`, `Validators`).
- Call `form.markAllAsTouched()` before validation on submit.
- Never use Template-driven forms.

### HTTP & Interceptors

- `authInterceptor` automatically attaches `Authorization: Bearer <token>`.
- `errorInterceptor` handles 401 → logout + redirect to `/login`.
- Components subscribe to service observables and handle errors locally via `error` signal.

### Models

- All interfaces and enums are in `src/app/domain/models/`.
- Each domain entity has its own file (e.g., `product.model.ts`).
- Everything is exported through `index.ts` barrel.

### Formatting & Linting

- Prettier: `printWidth: 100`, `singleQuote: true`, Angular HTML parser for `.html` files.
- Run `pnpm format` to auto-format and `pnpm lint:fix` to auto-fix lint issues.

## Common Commands

```bash
pnpm start                   # Dev server (ng serve)
pnpm build:development       # Development build
pnpm build:production        # Production build with optimization
pnpm test:development        # Run tests (development config)
pnpm lint                    # ESLint check
pnpm lint:fix                # ESLint auto-fix
pnpm format                  # Prettier auto-format
pnpm format:check            # Prettier check
```

## Important Patterns

### Page component skeleton

```typescript
@Component({
    selector: 'app-<name>',
    imports: [TranslatePipe, ...],
    templateUrl: './<name>.html',
    styleUrl: './<name>.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class <Name> implements OnInit {
    private readonly service = inject(<Domain>Service);
    readonly t = inject(TranslateService);

    items = signal<Item[]>([]);
    isLoading = signal(true);
    error = signal<string | null>(null);

    ngOnInit() { this.load(); }

    private load() {
        this.isLoading.set(true);
        this.service.getAll().subscribe({
            next: (data) => { this.items.set(data); this.isLoading.set(false); },
            error: () => { this.error.set(this.t.get('error.generic')); this.isLoading.set(false); },
        });
    }
}
```

### Admin page skeleton (lazy-loaded)

```typescript
// src/app/presentation/pages/admin/<domain>/<domain>.ts
export class Admin<Domain> { ... }

// app.routes.ts entry:
{
    path: '<domain>',
    loadComponent: () =>
        import('../presentation/pages/admin/<domain>/<domain>').then((m) => m.Admin<Domain>),
}
```

### Adding a new translation key

1. Add the key to `public/i18n/en.json` (and `es.json`, `pt-BR.json`).
2. Use `{{ 'section.key' | translate }}` in the template.

## Do NOT

- Do NOT install NgRx or other state libraries — use Signals.
- Do NOT use Zone.js-dependent APIs — the app is zoneless (`provideZonelessChangeDetection`).
- Do NOT use `NgModule` — all components are standalone.
- Do NOT add `standalone: true` to decorators.
- Do NOT use `any` — use `unknown` when type is uncertain.
- Do NOT subscribe inside services — return `Observable<T>`.
- Do NOT commit untranslated strings; always add i18n keys.
- Do NOT use third-party component libraries beyond Bootstrap / ng-bootstrap without discussion.
