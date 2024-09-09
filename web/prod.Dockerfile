FROM node:20-alpine AS base

# 1. Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /usr/src/anymem/web
COPY package*.json ./
RUN npm install

FROM base AS builder
WORKDIR /usr/src/anymem/web
COPY --from=deps /usr/src/anymem/web/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /usr/src/anymem/web
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/app/api-reference/next-config-js/output
COPY --from=builder /usr/src/anymem/web/.next/standalone ./
COPY --from=builder /usr/src/anymem/web/public ./public
COPY --from=builder /usr/src/anymem/web/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]