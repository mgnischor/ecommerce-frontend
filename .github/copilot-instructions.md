You are an expert in TypeScript, Angular 21, Bootstrap 5, and scalable e-commerce web application development. This project is a multi-vendor e-commerce frontend. You write maintainable, performant, and accessible code following the conventions established in this codebase.

## Project Stack

-   **Framework**: Angular 21 — standalone, zoneless (`provideZonelessChangeDetection`)
-   **Language**: TypeScript 5.9 with strict mode
-   **UI**: Bootstrap 5.3 + ng-bootstrap 19 — no Angular Material, no other UI libraries
-   **State**: Angular Signals — no NgRx or other state management libraries
-   **Forms**: Reactive Forms only
-   **HTTP**: Angular `HttpClient` with functional interceptors
-   **i18n**: Custom `TranslateService` with `TranslatePipe` (en, es, pt-BR)
-   **Package manager**: pnpm
-   **Testing**: Jasmine + Karma

## Architecture

Clean layered architecture under `src/app/`:

```
domain/         → Pure TypeScript interfaces and enums (no Angular dependencies)
application/    → Routing only (app.routes.ts)
infrastructure/ → Angular integration: services, interceptors, i18n, app.config.ts
presentation/   → Components and pages
  components/   → Reusable layout pieces (Header, Sidebar, Footer, Layout)
  pages/        → Route-level components
    admin/      → Lazy-loaded admin pages
    <page>/     → Eagerly loaded storefront pages
```

-   `domain/` must NEVER import from Angular or other layers
-   `infrastructure/services/` talk to the REST API and return `Observable<T>`
-   Business logic lives in services, NOT in components
-   Barrel exports (`index.ts`) are used in `domain/models/`, `infrastructure/services/`, `infrastructure/i18n/`, and `infrastructure/interceptors/`

## TypeScript

-   Use strict type checking — never disable strict checks
-   Prefer type inference when the type is obvious
-   Use `unknown` instead of `any` when the type is uncertain
-   Use `interface` for domain models and `enum` for status/category types (numeric enums)
-   Keep all interfaces and enums in `src/app/domain/models/`, one file per entity

## Angular Best Practices

-   All components are standalone — do NOT use `NgModule`
-   Must NOT set `standalone: true` inside decorators — it is the default in Angular 21
-   The app is zoneless — do NOT use Zone.js-dependent APIs (e.g., `tick()`, `fakeAsync` with timers)
-   Use `NgOptimizedImage` for all static images; it does NOT work for inline base64 images

## Components

-   Class names have **no suffix**: `Home`, `Header`, `AdminShipments` — never `HomeComponent`
-   Always set `changeDetection: ChangeDetectionStrategy.OnPush`
-   Use `inject()` — never constructor injection
-   Use `input()` / `output()` functions — never `@Input()` / `@Output()` decorators
-   Use `signal()` for mutable local state; `computed()` for derived state
-   Use `.set()` or `.update()` on signals — never `.mutate()`
-   Expose signals read-only to the template via `.asReadonly()` or `computed()`
-   Do NOT use `@HostBinding` or `@HostListener` — use the `host` object in `@Component` instead
-   Do NOT use `ngClass` — use `[class]` or `[class.name]` bindings
-   Do NOT use `ngStyle` — use `[style]` or `[style.property]` bindings
-   Keep components small and focused on a single responsibility

## Templates

-   Use native control flow: `@if`, `@for`, `@switch` — never `*ngIf`, `*ngFor`, `*ngSwitch`
-   Use the `async` pipe for observables in templates
-   Use `TranslatePipe` for all user-facing strings: `{{ 'section.key' | translate }}`
-   Avoid complex logic in templates — move it to the component class

## State (Signals)

-   Local component state → `signal<T>(initialValue)`
-   Derived/computed state → `computed(() => ...)`
-   Update with `.set(value)` for replacement or `.update(fn)` for transformation
-   Never call `.mutate()` — it does not exist in current Angular Signals API

## Forms

-   Always use Reactive Forms (`FormGroup`, `FormControl`, `Validators`)
-   Call `form.markAllAsTouched()` before checking validity on submit
-   Never use Template-driven forms

## Services

-   All services use `providedIn: 'root'` for singleton scope
-   One service file per domain entity (e.g., `product.service.ts`)
-   Services return `Observable<T>` — never subscribe inside a service
-   Use `environment.apiUrl` as the base URL for all HTTP calls
-   Use `inject(HttpClient)` inside the service class

## HTTP & Interceptors

-   `authInterceptor` attaches `Authorization: Bearer <token>` automatically
-   `errorInterceptor` handles 401 → calls `AuthService.logout()` and redirects to `/login`
-   Both interceptors are functional (`HttpInterceptorFn`) — never class-based

## i18n

-   Translation files: `public/i18n/{en,es,pt-BR}.json` (flat keys via dot-notation)
-   In templates: `{{ 'section.key' | translate }}`
-   In TypeScript: `this.t.get('section.key', { param: value })`
-   For prices: `this.t.formatPrice(price)` — uses `Intl.NumberFormat` with BRL currency
-   For dates: `this.t.formatDate(date, options?)` — uses `toLocaleDateString`
-   Always add a key to all three language files when adding new UI strings

## Routing

-   Storefront pages are **eagerly** loaded in `app.routes.ts`
-   Admin pages are **lazily** loaded with `loadComponent`
-   Admin routes are nested under `{ path: 'admin', children: [...] }`
-   When adding a new admin route, add the `loadComponent` entry in `app.routes.ts`

## Naming & File Structure

-   Page files: `src/app/presentation/pages/<name>/<name>.ts` (and `.html`, `.scss`)
-   Admin page files: `src/app/presentation/pages/admin/<domain>/<domain>.ts`
-   Service files: `src/app/infrastructure/services/<entity>.service.ts`
-   Model files: `src/app/domain/models/<entity>.model.ts`
-   Export all models through `src/app/domain/models/index.ts`
-   Export all services through `src/app/infrastructure/services/index.ts`

## Formatting

-   Prettier config (defined in `package.json`): `printWidth: 100`, `singleQuote: true`, Angular HTML parser for `.html` files
-   Run `pnpm format` to auto-format all source files
-   Run `pnpm lint:fix` to auto-fix ESLint issues

## Common Commands

```bash
pnpm start                   # Dev server
pnpm build:development       # Development build
pnpm build:production        # Production build (optimized)
pnpm test:development        # Run unit tests
pnpm lint                    # ESLint check
pnpm lint:fix                # ESLint auto-fix
pnpm format                  # Prettier auto-format
pnpm format:check            # Prettier check (CI)
```

## Page Component Skeleton

```typescript
@Component({
    selector: 'app-<name>',
    imports: [TranslatePipe, /* other imports */],
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

    ngOnInit(): void {
        this.load();
    }

    private load(): void {
        this.isLoading.set(true);
        this.service.getAll().subscribe({
            next: (data) => {
                this.items.set(data);
                this.isLoading.set(false);
            },
            error: () => {
                this.error.set(this.t.get('error.generic'));
                this.isLoading.set(false);
            },
        });
    }
}
```

## Admin Page Skeleton (Lazy-Loaded)

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

## Do NOT

-   Do NOT install NgRx, Akita, or any other state library — use Signals
-   Do NOT use Zone.js APIs — the app uses `provideZonelessChangeDetection`
-   Do NOT use `NgModule` — all components are standalone
-   Do NOT add `standalone: true` to decorators
-   Do NOT use `any` — use `unknown` for uncertain types
-   Do NOT subscribe inside services — always return `Observable<T>`
-   Do NOT leave untranslated strings in templates — always add i18n keys
-   Do NOT install third-party UI component libraries — use Bootstrap + ng-bootstrap only
-   Do NOT use npm or yarn — always use pnpm
