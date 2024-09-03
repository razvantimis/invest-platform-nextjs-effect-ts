##### DEPENDENCIES

FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app


# Install dependencies based on the preferred package manager

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm && pnpm i


##### BUILDER

FROM node:20-alpine AS builder
ARG DATABASE_URL
ARG NEXT_PUBLIC_APP_URL
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm install -g pnpm && SKIP_ENV_VALIDATION=1 pnpm run build

##### RUNNER

FROM gcr.io/distroless/nodejs20-debian12 AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["server.js"]
