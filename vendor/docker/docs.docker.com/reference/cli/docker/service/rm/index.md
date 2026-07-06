# docker service rm

**Description:** Remove one or more services

**Usage:** `docker service rm SERVICE [SERVICE...]`

**Aliases:** `docker service remove`






**Orchestrator:** Swarm

## Description

Removes the specified services from the swarm.

> [!NOTE]
> This is a cluster management command, and must be executed on a swarm
> manager node. To learn about managers and workers, refer to the
> [Swarm mode section](/engine/swarm/) in the
> documentation.




## Examples

Remove the `redis` service:

```console
$ docker service rm redis

redis

$ docker service ls

ID  NAME  MODE  REPLICAS  IMAGE
```

> [!WARNING]
> Unlike `docker rm`, this command does not ask for confirmation before removing
> a running service.



