FROM node:19.6.0-alpine3.17 AS development
RUN corepack enable
WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --development --frozen-lockfile
COPY . .
CMD ["pnpm", "start:dev"]