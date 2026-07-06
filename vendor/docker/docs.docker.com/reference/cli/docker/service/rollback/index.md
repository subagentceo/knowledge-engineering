# docker service rollback

**Description:** Revert changes to a service's configuration

**Usage:** `docker service rollback [OPTIONS] SERVICE`








**Orchestrator:** Swarm

## Description

Roll back a specified service to its previous version from the swarm.

> [!NOTE]
> This is a cluster management command, and must be executed on a swarm
> manager node. To learn about managers and workers, refer to the
> [Swarm mode section](/engine/swarm/) in the
> documentation.


## Options

| Option | Default | Description |
|--------|---------|-------------|
| `-d`, `--detach` |  | API 1.29+ Exit immediately instead of waiting for the service to converge |
| `-q`, `--quiet` |  |  Suppress progress output |



## Examples

### Roll back to the previous version of a service

Use the `docker service rollback` command to roll back to the previous version
of a service. After executing this command, the service is reverted to the
configuration that was in place before the most recent `docker service update`
command.

The following example creates a service with a single replica, updates the
service to use three replicas, and then rolls back the service to the
previous version, having one replica.

Create a service with a single replica:

```console
$ docker service create --name my-service -p 8080:80 nginx:alpine
```

Confirm that the service is running with a single replica:

```console
$ docker service ls

ID                  NAME                MODE                REPLICAS            IMAGE               PORTS
xbw728mf6q0d        my-service          replicated          1/1                 nginx:alpine        *:8080->80/tcp
```

Update the service to use three replicas:

```console
$ docker service update --replicas=3 my-service

$ docker service ls

ID                  NAME                MODE                REPLICAS            IMAGE               PORTS
xbw728mf6q0d        my-service          replicated          3/3                 nginx:alpine        *:8080->80/tcp
```

Now roll back the service to its previous version, and confirm it is
running a single replica again:

```console
$ docker service rollback my-service

$ docker service ls

ID                  NAME                MODE                REPLICAS            IMAGE               PORTS
xbw728mf6q0d        my-service          replicated          1/1                 nginx:alpine        *:8080->80/tcp
```



