# Mailtura Helm Chart

This chart deploys:
- Mailtura app Deployment (backend + frontend container)
- Mailtura Temporal worker Deployment
- A migrations Job via Helm hooks (`post-install,post-upgrade`)
- Temporal via official `temporal` Helm chart (enabled by default)
- StackGres operator via official StackGres Helm chart (enabled by default)
- A StackGres PostgreSQL cluster (`SGCluster`) for Mailtura and Temporal persistence

## Install

```bash
helm dependency build helm/mailtura
helm upgrade --install mailtura helm/mailtura -n mailtura --create-namespace --wait --wait-for-jobs
```

Migration hook timing:
- `post-install` for fresh installs (after DB/infra resources are created)
- `post-upgrade` for upgrades

Dependency ordering:
- The chart lists StackGres before Temporal so StackGres resources are applied first.
- For strict, guaranteed sequencing in production, use a two-step install:
  1. install with `--set temporal.enabled=false`
  2. run a second `helm upgrade --install` with `temporal.enabled=true` after StackGres is ready.

Dependency chart sources used by this chart:
- Temporal: `https://go.temporal.io/helm-charts`
- StackGres operator: `https://stackgres.io/downloads/stackgres-k8s/stackgres/helm/`

## Disable bundled Temporal

```bash
helm upgrade --install mailtura helm/mailtura \
  --set temporal.enabled=false \
  --set env.temporal.address=your-temporal-frontend:7233
```

## Disable bundled StackGres and use external DB

```bash
helm upgrade --install mailtura helm/mailtura \
  --set stackgres.enabled=false \
  --set externalDatabase.enabled=true \
  --set externalDatabase.url='postgres://user:pass@host:5432/db'
```

## Important values

- `env.mailturaAuthSecret`: Secret for auth/session token handling.
- `env.temporal.address`: Temporal frontend address used by app/worker.
- `env.temporal.namespace`: Temporal namespace.
- `env.temporal.taskQueue`: Temporal task queue.
- `env.apiBaseUrl`: API base URL used by the worker for callbacks.
- `stackgres.cluster.*`: StackGres cluster shape, storage, and Postgres version.
- `stackgres.credentials.superuser.*`: StackGres superuser credentials used by Mailtura and Temporal.
- `temporal.web.enabled`: Enables Temporal UI.
- `temporal.server.config.persistence.*`: SQL persistence configuration.

When `stackgres.enabled=true`, this chart enforces Temporal SQL persistence to:
- host: `stackgres.cluster.name`
- database: `postgres`
- schema: `temporal`

The default `values.yaml` uses YAML anchors so StackGres and Temporal share the same host/user/password/database values.

## Notes

The chart creates one Kubernetes Secret with runtime env vars and injects it into:
- Mailtura app deployment
- Worker deployment
- Migrations hook job
- StackGres cluster credentials

If `env.temporal.address` is empty and `temporal.enabled=true`, the chart defaults it to `temporal-frontend:7233` (or `<temporal.fullnameOverride>-frontend:7233`).
If `env.apiBaseUrl` is empty, the chart defaults it to `http://<mailtura-service>:3000/api/v1`.
