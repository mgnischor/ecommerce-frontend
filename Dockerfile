# ─── Stage 1: Build ───────────────────────────────────────────────────────────
FROM node:22-alpine AS builder

RUN npm install -g pnpm

WORKDIR /app

# Install dependencies first (cache layer)
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy source and build
COPY . .
RUN pnpm build:production

# ─── Stage 2: Serve ───────────────────────────────────────────────────────────
FROM nginx:1.27-alpine AS runner

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output (Angular @angular/build outputs to dist/<name>/browser)
COPY --from=builder /app/dist/ecommerce-frontend/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
