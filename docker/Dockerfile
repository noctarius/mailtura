FROM oven/bun:alpine AS base
WORKDIR /opt/app

FROM base AS development
RUN mkdir -p /temp/dev
COPY package.json bun.lockb .npmrc bunfig.toml /temp/dev/
COPY packages/rpcmodel/package.json /temp/dev/packages/rpcmodel/
COPY packages/frontend/package.json /temp/dev/packages/frontend/
COPY packages/backend/package.json /temp/dev/packages/backend/
COPY packages/worker/package.json /temp/dev/packages/worker/
COPY packages/contentcompiler/package.json /temp/dev/packages/contentcompiler/
COPY packages/database/package.json /temp/dev/packages/database/
RUN cd /temp/dev && bun install --frozen-lockfile --filter='!./packages/worker'
COPY . /temp/dev/

FROM development AS production
RUN mkdir -p /temp/prod
ENV NODE_ENV=production
COPY package.json bun.lockb .npmrc bunfig.toml /temp/prod/
COPY packages/rpcmodel/package.json /temp/prod/packages/rpcmodel/
COPY packages/frontend/package.json /temp/prod/packages/frontend/
COPY packages/backend/package.json /temp/prod/packages/backend/
COPY packages/worker/package.json /temp/prod/packages/worker/
COPY packages/contentcompiler/package.json /temp/prod/packages/contentcompiler/
COPY packages/database/package.json /temp/prod/packages/database/
RUN cd /temp/prod && bun install --linker hoisted --frozen-lockfile --production --filter='!./packages/worker'

FROM development AS builder
ENV DASHBOARD_BASE_URL "/dashboard"
RUN echo Building rpcmodel... && cd /temp/dev/packages/rpcmodel && bun run build
RUN echo Building database... && cd /temp/dev/packages/database && bun run build
RUN echo Building contentcompiler... && cd /temp/dev/packages/contentcompiler && bun run build
RUN echo Building backend... && cd /temp/dev/packages/backend && bun run build
RUN echo Building frontend... && cd /temp/dev/packages/frontend && bun run build
RUN rm -rf /temp/dev/packages/worker

FROM base AS release
RUN apk add openssl
COPY --from=production /temp/prod/node_modules node_modules
RUN rm -rf node_modules/@mailtura/rpcmodel
COPY --from=builder /temp/dev/packages/rpcmodel node_modules/@mailtura/rpcmodel
RUN rm -rf node_modules/@mailtura/rpcmodel/node_modules
RUN rm -rf node_modules/@mailtura/contentcompiler
COPY --from=builder /temp/dev/packages/contentcompiler node_modules/@mailtura/contentcompiler
RUN rm -rf node_modules/@mailtura/contentcompiler/node_modules
RUN rm -rf node_modules/@mailtura/database
COPY --from=builder /temp/dev/packages/database node_modules/@mailtura/database
RUN rm -rf node_modules/@mailtura/database/node_modules
COPY --from=builder /temp/dev/packages/frontend/dist public
COPY --from=builder /temp/dev/packages/backend/dist .
COPY --from=builder /temp/dev/packages/backend/package.json .
COPY --from=builder /temp/dev/packages/backend/entrypoint.sh .
RUN chown bun -R /opt/app

USER bun
EXPOSE 3000/tcp
WORKDIR /opt/app
CMD [ "sh", "-c", "/opt/app/entrypoint.sh" ]
