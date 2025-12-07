FROM node:25-slim AS base
WORKDIR /opt/app

FROM base AS install
RUN mkdir -p /temp/dev
RUN npm install -g bun
COPY package.json bun.lockb .npmrc bunfig.toml /temp/dev/
COPY packages/rpcmodel/package.json /temp/dev/packages/rpcmodel/
COPY packages/frontend/package.json /temp/dev/packages/frontend/
COPY packages/backend/package.json /temp/dev/packages/backend/
COPY packages/worker/package.json /temp/dev/packages/worker/
COPY packages/contentcompiler/package.json /temp/dev/packages/contentcompiler/
COPY packages/database/package.json /temp/dev/packages/database/
RUN cd /temp/dev && bun install --frozen-lockfile --filter='!./packages/backend' --filter='!./packages/frontend'
COPY . /temp/dev/

RUN mkdir -p /temp/prod
ENV NODE_ENV=production
COPY package.json bun.lockb .npmrc bunfig.toml /temp/prod/
COPY packages/rpcmodel/package.json /temp/prod/packages/rpcmodel/
COPY packages/frontend/package.json /temp/prod/packages/frontend/
COPY packages/backend/package.json /temp/prod/packages/backend/
COPY packages/worker/package.json /temp/prod/packages/worker/
COPY packages/contentcompiler/package.json /temp/prod/packages/contentcompiler/
COPY packages/database/package.json /temp/prod/packages/database/
RUN cd /temp/prod && \
    bun install --linker hoisted --frozen-lockfile --production \
        --filter='!./packages/backend' --filter='!./packages/frontend'

FROM install AS builder
RUN echo Building rpcmodel... && cd /temp/dev/packages/rpcmodel && bun run build
RUN echo Building database... && cd /temp/dev/packages/database && bun run build
RUN echo Building contentcompiler... && cd /temp/dev/packages/contentcompiler && bun run build
RUN echo Building worker... && cd /temp/dev/packages/worker && bun run build

FROM base AS release
RUN apt-get update && apt-get install -y openssl && rm -rf /var/cache/apt/archives /var/lib/apt/lists/*
COPY --from=install /temp/prod/node_modules node_modules
RUN rm -rf node_modules/@mailtura/rpcmodel
COPY --from=builder /temp/dev/packages/rpcmodel node_modules/@mailtura/rpcmodel
RUN rm -rf node_modules/@mailtura/rpcmodel/node_modules
RUN rm -rf node_modules/@mailtura/contentcompiler
COPY --from=builder /temp/dev/packages/contentcompiler node_modules/@mailtura/contentcompiler
RUN rm -rf node_modules/@mailtura/contentcompiler/node_modules
RUN rm -rf node_modules/@mailtura/database
COPY --from=builder /temp/dev/packages/database node_modules/@mailtura/database
RUN rm -rf node_modules/@mailtura/database/node_modules
COPY --from=builder /temp/dev/packages/database node_modules/@mailtura/database
COPY --from=builder /temp/dev/packages/worker/dist .
COPY --from=builder /temp/dev/packages/worker/package.json .
COPY --from=builder /temp/dev/packages/worker/entrypoint.sh .
RUN ls -la node_modules/@temporal*

USER node
WORKDIR /opt/app
CMD [ "node", "./index.js" ]
