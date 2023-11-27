FROM node:20-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

WORKDIR /usr/src/app

RUN corepack enable

## Depedencies
FROM base as depedencies

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

## Builder
FROM depedencies as builder

COPY --from=depedencies /usr/src/app/node_modules ./node_modules
COPY src ./src
COPY .env.* .eslintrc.js .prettierrc nest-cli.json tsconfig.* ./

RUN pnpm build

## Development
FROM base as development

ENV NODE_ENV=development

COPY --from=depedencies /usr/src/app/node_modules ./node_modules
COPY . .

## Production
FROM base as production

ENV NODE_ENV=production

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist