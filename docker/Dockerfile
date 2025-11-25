FROM oven/bun:alpine AS base
WORKDIR /opt/app

FROM base AS development
RUN mkdir -p /temp/dev
COPY . /temp/dev/
RUN cd /temp/dev && bun install --linker hoisted --frozen-lockfile

FROM development AS production
RUN mkdir -p /temp/prod
ENV NODE_ENV=production
COPY package.json bun.lockb .npmrc /temp/prod/
COPY packages/rpcmodel/package.json /temp/prod/packages/rpcmodel/
COPY packages/frontend/package.json /temp/prod/packages/frontend/
COPY packages/backend/package.json /temp/prod/packages/backend/
COPY packages/worker/package.json /temp/prod/packages/worker/
COPY packages/contentcompiler/package.json /temp/prod/packages/contentcompiler/
COPY packages/database/package.json /temp/prod/packages/database/
RUN cd /temp/prod && bun install --linker hoisted --frozen-lockfile --production --filter="./packages/backend"

FROM production AS builder
ENV DASHBOARD_BASE_URL "/dashboard"
RUN cd /temp/dev && bun run build

FROM base AS release
RUN apk add openssl
COPY --from=production /temp/prod/node_modules node_modules
RUN rm -rf node_modules/@mailtura/rpcmodel
COPY --from=builder /temp/dev/packages/rpcmodel node_modules/@mailtura/rpcmodel
RUN rm -rf node_modules/@mailtura/contentcompiler
COPY --from=builder /temp/dev/packages/rpcmodel node_modules/@mailtura/contentcompiler
RUN rm -rf node_modules/@mailtura/database
COPY --from=builder /temp/dev/packages/rpcmodel node_modules/@mailtura/database
COPY --from=builder /temp/dev/packages/frontend/dist public
COPY --from=builder /temp/dev/packages/backend/prisma prisma
COPY --from=builder /temp/dev/packages/backend/dist .
COPY --from=builder /temp/dev/packages/backend/generated generated
COPY --from=builder /temp/dev/packages/backend/package.json .
COPY --from=builder /temp/dev/packages/backend/entrypoint.sh .
RUN chown bun -R /opt/app

USER bun
EXPOSE 3000/tcp
WORKDIR /opt/app
CMD [ "sh", "-c", "/opt/app/entrypoint.sh" ]
