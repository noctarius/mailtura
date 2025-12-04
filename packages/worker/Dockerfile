FROM node:25-slim AS base
WORKDIR /opt/app

FROM base AS install
RUN mkdir -p /temp/dev
COPY . /temp/dev
RUN npm install -g bun
RUN cd /temp/dev && bun install --linker hoisted --frozen-lockfile

RUN mkdir -p /temp/prod
ENV NODE_ENV=production
COPY package.json bun.lockb .npmrc /temp/prod/
COPY packages/rpcmodel/package.json /temp/prod/packages/rpcmodel/
COPY packages/frontend/package.json /temp/prod/packages/frontend/
COPY packages/backend/package.json /temp/prod/packages/backend/
COPY packages/worker/package.json /temp/prod/packages/worker/
COPY packages/contentcompiler/package.json /temp/prod/packages/contentcompiler/
COPY packages/database/package.json /temp/prod/packages/database/
RUN cd /temp/prod && bun install --linker hoisted --frozen-lockfile --production --filter="./packages/worker"

FROM install AS builder
RUN cd /temp/dev/packages/worker && bun run build

FROM base AS release
#RUN apt-get install -y openssl
COPY --from=install /temp/prod/node_modules node_modules
RUN rm -rf node_modules/@mailtura/rpcmodel
COPY --from=builder /temp/dev/packages/rpcmodel node_modules/@mailtura/rpcmodel
RUN rm -rf node_modules/@mailtura/contentcompiler
COPY --from=builder /temp/dev/packages/contentcompiler node_modules/@mailtura/contentcompiler
RUN rm -rf node_modules/@mailtura/database
COPY --from=builder /temp/dev/packages/database node_modules/@mailtura/database
COPY --from=builder /temp/dev/packages/worker/dist .
COPY --from=builder /temp/dev/packages/worker/package.json .
COPY --from=builder /temp/dev/packages/worker/entrypoint.sh .

USER node
WORKDIR /opt/app
CMD [ "node", "./index.js" ]
