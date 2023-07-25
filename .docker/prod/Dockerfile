FROM node:20-slim as base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml ./

FROM base as deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM base as builder
COPY . .
COPY --from=deps /usr/src/app/node_modules ./node_modules
RUN pnpm build

FROM base as prod
ENV NODE_ENV=production
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
CMD ["pnpm", "start:prod"]
EXPOSE 3011
