# `runtime/` — local container plane

Copied from `apps/docker-harness`. This is the reusable local infrastructure for building and testing the
`e2m-*` packages in clean, version-correct containers — the complement to the cloud (Terraform) plane.

```bash
# service deps
docker compose -f runtime/docker-compose.yml up redis postgres

# polyglot test runners
docker compose -f runtime/docker-compose.yml run --rm node-tests     # e2m-ts, e2m-cli
docker compose -f runtime/docker-compose.yml run --rm py-tests       # e2m-py
docker compose -f runtime/docker-compose.yml run --rm swift-tests    # e2m-swift (Linux-portable targets)
```

Why containers: the host pins (Python 3.13, Node 22, Swift 6.x, redis 7, postgres 16) are guaranteed here
regardless of the dev machine. Kubernetes is intentionally absent — the cloud plane is serverless (Cloudflare
Workers), and local needs only Compose. If a managed-cluster target is ever added, it slots in as a third
plane alongside these two.
