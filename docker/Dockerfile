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
RUN cd /temp/dev && bun install --frozen-lockfile --filter='!./packages/worker'
COPY --chown=bun:bun eslint.config.js /temp/dev/
COPY --chown=bun:bun packages /temp/dev/packages
RUN rm -rf /temp/dev/packages/worker

FROM base AS production
USER bun
ENV NODE_ENV=production
COPY --chown=bun:bun package.json bun.lockb .npmrc bunfig.toml /temp/prod/
COPY --chown=bun:bun packages/rpcmodel/package.json /temp/prod/packages/rpcmodel/
COPY --chown=bun:bun packages/frontend/package.json /temp/prod/packages/frontend/
COPY --chown=bun:bun packages/backend/package.json /temp/prod/packages/backend/
COPY --chown=bun:bun packages/worker/package.json /temp/prod/packages/worker/
COPY --chown=bun:bun packages/contentcompiler/package.json /temp/prod/packages/contentcompiler/
COPY --chown=bun:bun packages/database/package.json /temp/prod/packages/database/
RUN cd /temp/prod && \
    bun install --linker hoisted --frozen-lockfile \
        --omit=dev --omit=peer --omit=optional --production \
        --filter='!./packages/worker' --filter='!./packages/frontend'

FROM development AS builder-rpc-model
USER bun
RUN echo Building rpcmodel... && cd /temp/dev/packages/rpcmodel && bun run build

FROM builder-rpc-model AS builder-database
USER bun
RUN echo Building database... && cd /temp/dev/packages/database && bun run build

FROM builder-rpc-model AS builder-contentcompiler
USER bun
RUN echo Building contentcompiler... && cd /temp/dev/packages/contentcompiler && bun run build

FROM builder-database AS builder-backend
USER bun
COPY --chown=bun:bun --from=builder-contentcompiler /temp/dev/packages/contentcompiler packages/contentcompiler
RUN echo Building backend... && cd /temp/dev/packages/backend && bun run build

FROM builder-rpc-model AS builder-frontend
USER bun
ENV DASHBOARD_BASE_URL "/dashboard"
RUN echo Building frontend... && cd /temp/dev/packages/frontend && bun run build

FROM base AS release
RUN apk add openssl
USER bun
COPY --chown=bun:bun --from=production /temp/prod/node_modules node_modules
RUN rm -rf node_modules/@mailtura/rpcmodel
COPY --chown=bun:bun --from=builder-rpc-model /temp/dev/packages/rpcmodel node_modules/@mailtura/rpcmodel
RUN rm -rf node_modules/@mailtura/rpcmodel/node_modules node_modules/@mailtura/rpcmodel/src
RUN rm -rf node_modules/@mailtura/contentcompiler
COPY --chown=bun:bun --from=builder-contentcompiler /temp/dev/packages/contentcompiler node_modules/@mailtura/contentcompiler
RUN rm -rf node_modules/@mailtura/contentcompiler/node_modules node_modules/@mailtura/contentcompiler/src
RUN rm -rf node_modules/@mailtura/database
COPY --chown=bun:bun --from=builder-database /temp/dev/packages/database node_modules/@mailtura/database
RUN rm -rf node_modules/@mailtura/database/node_modules node_modules/@mailtura/database/src
COPY --chown=bun:bun --from=builder-frontend /temp/dev/packages/frontend/dist public
COPY --chown=bun:bun --from=builder-backend /temp/dev/packages/backend/dist .
COPY --chown=bun:bun --from=builder-backend /temp/dev/packages/backend/package.json .
COPY --chown=bun:bun --from=builder-backend /temp/dev/packages/backend/entrypoint.sh .

EXPOSE 3000/tcp
WORKDIR /opt/app
CMD [ "sh", "-c", "/opt/app/entrypoint.sh" ]
