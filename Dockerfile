FROM node:20-alpine AS base

WORKDIR /app

RUN corepack enable
EXPOSE 20100

FROM base AS dependencies

COPY package.json ./

RUN yarn install

## Builder
FROM dependencies AS builder

COPY src ./src
COPY .env.* .eslintrc.js .prettierrc nest-cli.json tsconfig.* ./

RUN yarn run build

FROM dependencies AS development

ENV NODE_ENV=development

COPY . .

FROM base AS production

ENV NODE_ENV=production

COPY --from=builder /app/dist ./dist
COPY package.json ./
COPY .env.production ./
