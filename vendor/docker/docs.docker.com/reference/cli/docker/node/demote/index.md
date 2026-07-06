# docker node demote

**Description:** Demote one or more nodes from manager in the swarm

**Usage:** `docker node demote NODE [NODE...]`








**Orchestrator:** Swarm

## Description

Demotes an existing manager so that it is no longer a manager.

> [!NOTE]
> This is a cluster management command, and must be executed on a swarm
> manager node. To learn about managers and workers, refer to the [Swarm mode
> section](/engine/swarm/) in the documentation.




## Examples

```console
$ docker node demote <node name>
```



