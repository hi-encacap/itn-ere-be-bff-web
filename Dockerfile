FROM node:20-alpine AS base

WORKDIR /app

RUN corepack enable
EXPOSE 20100

## Depedencies
FROM base as depedencies

COPY package.json ./

RUN yarn install

## Builder
FROM depedencies as builder

COPY --from=depedencies /app/node_modules ./node_modules
COPY src ./src
COPY .env.* .eslintrc.js .prettierrc nest-cli.json tsconfig.* ./

RUN yarn run build

FROM depedencies as development

ENV NODE_ENV=development

COPY . .

FROM builder as production

ENV NODE_ENV=production

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package.json ./package.json
