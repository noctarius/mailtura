FROM oven/bun:alpine AS base
WORKDIR /opt/app

FROM base AS development
RUN mkdir -p /temp/dev && chown -R bun: /temp/dev && mkdir -p /temp/prod && chown -R bun: /temp/prod
USER bun
COPY --chown=bun:bun package.json bun.lockb .npmrc bunfig.toml /temp/dev/
COPY --chown=bun:bun packages/rpcmodel/package.json /temp/dev/packages/rpcmodel/
COPY --chown=bun:bun packages/frontend/package.json /temp/dev/packages/frontend/
COPY --chown=bun:bun packages/backend/package.json /temp/dev/packages/backend/
COPY --chown=bun:bun packages/worker/package.json /temp/dev/packages/worker/
COPY --chown=bun:bun packages/contentcompiler/package.json /temp/dev/packages/contentcompiler/
COPY --chown=bun:bun packages/database/package.json /temp/dev/packages/database/
COPY --chown=bun:bun packages/mails/package.json /temp/dev/packages/mails/
RUN cd /temp/dev && bun install --frozen-lockfile
COPY --chown=bun:bun eslint.config.js /temp/dev/

FROM base AS production-mailtura-core
USER bun
ENV NODE_ENV=production
COPY --chown=bun:bun package.json bun.lockb .npmrc bunfig.toml /temp/prod/
COPY --chown=bun:bun packages/rpcmodel/package.json /temp/prod/packages/rpcmodel/
COPY --chown=bun:bun packages/frontend/package.json /temp/prod/packages/frontend/
COPY --chown=bun:bun packages/backend/package.json /temp/prod/packages/backend/
COPY --chown=bun:bun packages/worker/package.json /temp/prod/packages/worker/
COPY --chown=bun:bun packages/contentcompiler/package.json /temp/prod/packages/contentcompiler/
COPY --chown=bun:bun packages/database/package.json /temp/prod/packages/database/
COPY --chown=bun:bun packages/mails/package.json /temp/prod/packages/mails/
RUN cd /temp/prod && bun install --linker hoisted --frozen-lockfile \
        --omit=dev --omit=peer --omit=optional --production \
        --filter='!./packages/worker' --filter='!./packages/frontend'
RUN cd /temp/prod && bunx modclean --run --patterns="default:*"
RUN rm -rf /temp/prod/node_modules/@mailtura/rpcmodel
RUN rm -rf /temp/prod/node_modules/@mailtura/contentcompiler
RUN rm -rf /temp/prod/node_modules/@mailtura/database
RUN rm -rf /temp/prod/node_modules/@mailtura/mails
RUN ls -lah /temp/prod

FROM base AS production-mailtura-worker
USER bun
ENV NODE_ENV=production
COPY --chown=bun:bun package.json bun.lockb .npmrc bunfig.toml /temp/prod/
COPY --chown=bun:bun packages/rpcmodel/package.json /temp/prod/packages/rpcmodel/
COPY --chown=bun:bun packages/frontend/package.json /temp/prod/packages/frontend/
COPY --chown=bun:bun packages/backend/package.json /temp/prod/packages/backend/
COPY --chown=bun:bun packages/worker/package.json /temp/prod/packages/worker/
COPY --chown=bun:bun packages/contentcompiler/package.json /temp/prod/packages/contentcompiler/
COPY --chown=bun:bun packages/database/package.json /temp/prod/packages/database/
COPY --chown=bun:bun packages/mails/package.json /temp/prod/packages/mails/
RUN cd /temp/prod && bun install --linker hoisted --frozen-lockfile \
        --omit=dev --omit=peer --omit=optional --production \
        --filter='!./packages/backend' --filter='!./packages/frontend'
RUN cd /temp/prod && bunx modclean --run --patterns="default:*"
RUN rm -rf /temp/prod/node_modules/@mailtura/rpcmodel
RUN rm -rf /temp/prod/node_modules/@mailtura/contentcompiler
RUN rm -rf /temp/prod/node_modules/@mailtura/database
RUN rm -rf /temp/prod/node_modules/@mailtura/mails
RUN ls -lah /temp/prod

FROM development AS builder-rpc-model
USER bun
COPY --chown=bun:bun packages/rpcmodel /temp/dev/packages/rpcmodel/
RUN echo Building rpcmodel... && cd /temp/dev/packages/rpcmodel && bun run build

FROM builder-rpc-model AS builder-database
USER bun
COPY --chown=bun:bun packages/database /temp/dev/packages/database/
RUN echo Building database... && cd /temp/dev/packages/database && bun run build

FROM builder-rpc-model AS builder-contentcompiler
USER bun
COPY --chown=bun:bun packages/contentcompiler /temp/dev/packages/contentcompiler/
RUN echo Building contentcompiler... && cd /temp/dev/packages/contentcompiler && bun run build

FROM builder-database AS builder-mails
USER bun
COPY --chown=bun:bun --from=builder-contentcompiler /temp/dev/packages/contentcompiler /temp/dev/packages/contentcompiler
COPY --chown=bun:bun packages/mails /temp/dev/packages/mails/
RUN echo Building contentcompiler... && cd /temp/dev/packages/contentcompiler && bun run build

FROM builder-database AS builder-backend
USER bun
COPY --chown=bun:bun packages/backend /temp/dev/packages/backend/
COPY --chown=bun:bun --from=builder-contentcompiler /temp/dev/packages/contentcompiler /temp/dev/packages/contentcompiler
COPY --chown=bun:bun --from=builder-mails /temp/dev/packages/mails /temp/dev/packages/mails
RUN echo Building backend... && cd /temp/dev/packages/backend && bun run build

FROM builder-rpc-model AS builder-frontend
USER bun
ENV DASHBOARD_BASE_URL "/dashboard"
COPY --chown=bun:bun packages/frontend /temp/dev/packages/frontend/
RUN echo Building frontend... && cd /temp/dev/packages/frontend && bun run build

FROM builder-database AS builder-worker
USER bun
COPY --chown=bun:bun packages/worker /temp/dev/packages/worker/
COPY --chown=bun:bun --from=builder-contentcompiler /temp/dev/packages/contentcompiler /temp/dev/packages/contentcompiler
COPY --chown=bun:bun --from=builder-mails /temp/dev/packages/mails /temp/dev/packages/mails
RUN echo Building worker... && cd /temp/dev/packages/worker && bun run build


# Final mailtura image
FROM base AS release-mailtura-core
RUN apk add openssl
USER bun
COPY --chown=bun:bun --from=production-mailtura-core /temp/prod/node_modules node_modules
COPY --chown=bun:bun --from=builder-rpc-model /temp/dev/packages/rpcmodel/package.json node_modules/@mailtura/rpcmodel/
COPY --chown=bun:bun --from=builder-rpc-model /temp/dev/packages/rpcmodel/lib node_modules/@mailtura/rpcmodel/lib
COPY --chown=bun:bun --from=builder-contentcompiler /temp/dev/packages/contentcompiler/package.json node_modules/@mailtura/contentcompiler/
COPY --chown=bun:bun --from=builder-contentcompiler /temp/dev/packages/contentcompiler/lib node_modules/@mailtura/contentcompiler/lib
COPY --chown=bun:bun --from=builder-database /temp/dev/packages/database/package.json node_modules/@mailtura/database/
COPY --chown=bun:bun --from=builder-database /temp/dev/packages/database/lib node_modules/@mailtura/database/lib
COPY --chown=bun:bun --from=builder-mails /temp/dev/packages/mails/package.json node_modules/@mailtura/mails/
COPY --chown=bun:bun --from=builder-mails /temp/dev/packages/mails/lib node_modules/@mailtura/mails/lib
COPY --chown=bun:bun --from=builder-frontend /temp/dev/packages/frontend/dist public
COPY --chown=bun:bun --from=builder-backend /temp/dev/packages/backend/dist .
COPY --chown=bun:bun --from=builder-backend /temp/dev/packages/backend/package.json .
COPY --chown=bun:bun --from=builder-backend /temp/dev/packages/backend/entrypoint.sh .

EXPOSE 3333/tcp
WORKDIR /opt/app
CMD [ "sh", "-c", "/opt/app/entrypoint.sh" ]


# Final worker image
FROM node:25-slim AS release-mailtura-worker
WORKDIR /opt/app
RUN apt-get update && apt-get install -y openssl && rm -rf /var/cache/apt/archives /var/lib/apt/lists/*
USER node
COPY --chown=node:node --from=production-mailtura-worker /temp/prod/node_modules node_modules
COPY --chown=bun:bun --from=builder-rpc-model /temp/dev/packages/rpcmodel/package.json node_modules/@mailtura/rpcmodel/
COPY --chown=bun:bun --from=builder-rpc-model /temp/dev/packages/rpcmodel/lib node_modules/@mailtura/rpcmodel/lib
COPY --chown=bun:bun --from=builder-contentcompiler /temp/dev/packages/contentcompiler/package.json node_modules/@mailtura/contentcompiler/
COPY --chown=bun:bun --from=builder-contentcompiler /temp/dev/packages/contentcompiler/lib node_modules/@mailtura/contentcompiler/lib
COPY --chown=bun:bun --from=builder-database /temp/dev/packages/database/package.json node_modules/@mailtura/database/
COPY --chown=bun:bun --from=builder-database /temp/dev/packages/database/lib node_modules/@mailtura/database/lib
COPY --chown=bun:bun --from=builder-mails /temp/dev/packages/mails/package.json node_modules/@mailtura/mails/
COPY --chown=bun:bun --from=builder-mails /temp/dev/packages/mails/lib node_modules/@mailtura/mails/lib
COPY --chown=node:node --from=builder-worker /temp/dev/packages/worker/dist .
COPY --chown=node:node --from=builder-worker /temp/dev/packages/worker/package.json .
COPY --chown=node:node --from=builder-worker /temp/dev/packages/worker/entrypoint.sh .

CMD [ "node", "./index.js" ]

