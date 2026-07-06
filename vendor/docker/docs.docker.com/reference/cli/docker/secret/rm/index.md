# docker secret rm

**Description:** Remove one or more secrets

**Usage:** `docker secret rm SECRET [SECRET...]`

**Aliases:** `docker secret remove`






**Orchestrator:** Swarm

## Description

Removes the specified secrets from the swarm.

For detailed information about using secrets, refer to [manage sensitive data with Docker secrets](/engine/swarm/secrets/).

> [!NOTE]
> This is a cluster management command, and must be executed on a swarm
> manager node. To learn about managers and workers, refer to the
> [Swarm mode section](/engine/swarm/) in the
> documentation.




## Examples

This example removes a secret:

```console
$ docker secret rm secret.json
sapth4csdo5b6wz2p5uimh5xg
```

> [!WARNING]
> Unlike `docker rm`, this command does not ask for confirmation before removing
> a secret.
{ .warning }



