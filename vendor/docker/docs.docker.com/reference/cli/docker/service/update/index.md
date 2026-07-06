# docker service update

**Description:** Update a service

**Usage:** `docker service update [OPTIONS] SERVICE`








**Orchestrator:** Swarm

## Description

Updates a service as described by the specified parameters. The parameters are
the same as [`docker service create`](/reference/cli/docker/service/create/). Refer to the description
there for further information.

Normally, updating a service will only cause the service's tasks to be replaced with new ones if a change to the
service requires recreating the tasks for it to take effect. For example, only changing the
`--update-parallelism` setting will not recreate the tasks, because the individual tasks are not affected by this
setting. However, the `--force` flag will cause the tasks to be recreated anyway. This can be used to perform a
rolling restart without any changes to the service parameters.

> [!NOTE]
> This is a cluster management command, and must be executed on a swarm
> manager node. To learn about managers and workers, refer to the
> [Swarm mode section](/engine/swarm/) in the
> documentation.


## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--args` |  |  Service command args |
| `--cap-add` |  | API 1.41+ Add Linux capabilities |
| `--cap-drop` |  | API 1.41+ Drop Linux capabilities |
| `--config-add` |  | API 1.30+ Add or update a config file on a service |
| `--config-rm` |  | API 1.30+ Remove a configuration file |
| `--constraint-add` |  |  Add or update a placement constraint |
| `--constraint-rm` |  |  Remove a constraint |
| `--container-label-add` |  |  Add or update a container label |
| `--container-label-rm` |  |  Remove a container label by its key |
| `--credential-spec` |  | API 1.29+ Credential spec for managed service account (Windows only) |
| `-d`, `--detach` |  | API 1.29+ Exit immediately instead of waiting for the service to converge |
| `--dns-add` |  | API 1.25+ Add or update a custom DNS server |
| `--dns-option-add` |  | API 1.25+ Add or update a DNS option |
| `--dns-option-rm` |  | API 1.25+ Remove a DNS option |
| `--dns-rm` |  | API 1.25+ Remove a custom DNS server |
| `--dns-search-add` |  | API 1.25+ Add or update a custom DNS search domain |
| `--dns-search-rm` |  | API 1.25+ Remove a DNS search domain |
| `--endpoint-mode` |  |  Endpoint mode (vip or dnsrr) |
| `--entrypoint` |  |  Overwrite the default ENTRYPOINT of the image |
| `--env-add` |  |  Add or update an environment variable |
| `--env-rm` |  |  Remove an environment variable |
| `--force` |  | API 1.25+ Force update even if no changes require it |
| `--generic-resource-add` |  | API 1.32+ Add a Generic resource |
| `--generic-resource-rm` |  | API 1.32+ Remove a Generic resource |
| `--group-add` |  | API 1.25+ Add an additional supplementary user group to the container |
| `--group-rm` |  | API 1.25+ Remove a previously added supplementary user group from the container<br> |
| `--health-cmd` |  | API 1.25+ Command to run to check health |
| `--health-interval` |  | API 1.25+ Time between running the check (ms|s|m|h) |
| `--health-retries` |  | API 1.25+ Consecutive failures needed to report unhealthy |
| `--health-start-interval` |  | API 1.44+ Time between running the check during the start period (ms|s|m|h) |
| `--health-start-period` |  | API 1.29+ Start period for the container to initialize before counting retries towards unstable (ms|s|m|h)<br> |
| `--health-timeout` |  | API 1.25+ Maximum time to allow one check to run (ms|s|m|h) |
| `--host-add` |  | API 1.25+ Add a custom host-to-IP mapping (`host:ip`) |
| `--host-rm` |  | API 1.25+ Remove a custom host-to-IP mapping (`host:ip`) |
| `--hostname` |  | API 1.25+ Container hostname |
| `--image` |  |  Service image tag |
| `--init` |  | API 1.37+ Use an init inside each service container to forward signals and reap processes<br> |
| `--isolation` |  | API 1.35+ Service container isolation mode |
| `--label-add` |  |  Add or update a service label |
| `--label-rm` |  |  Remove a label by its key |
| `--limit-cpu` |  |  Limit CPUs |
| `--limit-memory` |  |  Limit Memory |
| `--limit-pids` |  | API 1.41+ Limit maximum number of processes (default 0 = unlimited) |
| `--log-driver` |  |  Logging driver for service |
| `--log-opt` |  |  Logging driver options |
| `--max-concurrent` |  | API 1.41+ Number of job tasks to run concurrently (default equal to --replicas)<br> |
| `--memory-swap` |  | API 1.52+ Swap Bytes (-1 for unlimited) |
| `--memory-swappiness` | `-1` | API 1.52+ Tune memory swappiness (0-100), -1 to reset to default |
| `--mount-add` |  |  Add or update a mount on a service |
| `--mount-rm` |  |  Remove a mount by its target path |
| `--network-add` |  | API 1.29+ Add a network |
| `--network-rm` |  | API 1.29+ Remove a network |
| `--no-healthcheck` |  | API 1.25+ Disable any container-specified HEALTHCHECK |
| `--no-resolve-image` |  | API 1.30+ Do not query the registry to resolve image digest and supported platforms<br> |
| `--oom-score-adj` |  | API 1.46+ Tune host's OOM preferences (-1000 to 1000) |
| `--placement-pref-add` |  | API 1.28+ Add a placement preference |
| `--placement-pref-rm` |  | API 1.28+ Remove a placement preference |
| `--publish-add` |  |  Add or update a published port |
| `--publish-rm` |  |  Remove a published port by its target port |
| `-q`, `--quiet` |  |  Suppress progress output |
| `--read-only` |  | API 1.28+ Mount the container's root filesystem as read only |
| `--replicas` |  |  Number of tasks |
| `--replicas-max-per-node` |  | API 1.40+ Maximum number of tasks per node (default 0 = unlimited) |
| `--reserve-cpu` |  |  Reserve CPUs |
| `--reserve-memory` |  |  Reserve Memory |
| `--restart-condition` |  |  Restart when condition is met (`none`, `on-failure`, `any`) |
| `--restart-delay` |  |  Delay between restart attempts (ns|us|ms|s|m|h) |
| `--restart-max-attempts` |  |  Maximum number of restarts before giving up |
| `--restart-window` |  |  Window used to evaluate the restart policy (ns|us|ms|s|m|h) |
| `--rollback` |  | API 1.25+ Rollback to previous specification |
| `--rollback-delay` |  | API 1.28+ Delay between task rollbacks (ns|us|ms|s|m|h) |
| `--rollback-failure-action` |  | API 1.28+ Action on rollback failure (`pause`, `continue`) |
| `--rollback-max-failure-ratio` |  | API 1.28+ Failure rate to tolerate during a rollback |
| `--rollback-monitor` |  | API 1.28+ Duration after each task rollback to monitor for failure (ns|us|ms|s|m|h)<br> |
| `--rollback-order` |  | API 1.29+ Rollback order (`start-first`, `stop-first`) |
| `--rollback-parallelism` |  | API 1.28+ Maximum number of tasks rolled back simultaneously (0 to roll back all at once)<br> |
| `--secret-add` |  | API 1.25+ Add or update a secret on a service |
| `--secret-rm` |  | API 1.25+ Remove a secret |
| `--stop-grace-period` |  |  Time to wait before force killing a container (ns|us|ms|s|m|h) |
| `--stop-signal` |  | API 1.28+ Signal to stop the container |
| `--sysctl-add` |  | API 1.40+ Add or update a Sysctl option |
| `--sysctl-rm` |  | API 1.40+ Remove a Sysctl option |
| `-t`, `--tty` |  | API 1.25+ Allocate a pseudo-TTY |
| `--ulimit-add` |  | API 1.41+ Add or update a ulimit option |
| `--ulimit-rm` |  | API 1.41+ Remove a ulimit option |
| `--update-delay` |  |  Delay between updates (ns|us|ms|s|m|h) |
| `--update-failure-action` |  |  Action on update failure (`pause`, `continue`, `rollback`) |
| `--update-max-failure-ratio` |  | API 1.25+ Failure rate to tolerate during an update |
| `--update-monitor` |  | API 1.25+ Duration after each task update to monitor for failure (ns|us|ms|s|m|h)<br> |
| `--update-order` |  | API 1.29+ Update order (`start-first`, `stop-first`) |
| `--update-parallelism` |  |  Maximum number of tasks updated simultaneously (0 to update all at once)<br> |
| `-u`, `--user` |  |  Username or UID (format: <name|uid>[:<group|gid>]) |
| `--with-registry-auth` |  |  Send registry authentication details to swarm agents |
| `-w`, `--workdir` |  |  Working directory inside the container |



## Examples

### Update a service

```console
$ docker service update --limit-cpu 2 redis
```

### Perform a rolling restart with no parameter changes {#update-parallelism}

```console
$ docker service update --force --update-parallelism 1 --update-delay 30s redis
```

In this example, the `--force` flag causes the service's tasks to be shut down
and replaced with new ones even though none of the other parameters would
normally cause that to happen. The `--update-parallelism 1` setting ensures
that only one task is replaced at a time (this is the default behavior). The
`--update-delay 30s` setting introduces a 30 second delay between tasks, so
that the rolling restart happens gradually.

### Add or remove mounts (--mount-add, --mount-rm) {#mount-add}

Use the `--mount-add` or `--mount-rm` options add or remove a service's bind mounts
or volumes.

The following example creates a service which mounts the `test-data` volume to
`/somewhere`. The next step updates the service to also mount the `other-volume`
volume to `/somewhere-else`volume, The last step unmounts the `/somewhere` mount
point, effectively removing the `test-data` volume. Each command returns the
service name.

- The `--mount-add` flag takes the same parameters as the `--mount` flag on
  `service create`. Refer to the [volumes and bind mounts](/reference/cli/docker/service/create/#mount)
  section in the `service create` reference for details.

- The `--mount-rm` flag takes the `target` path of the mount.

```console
$ docker service create \
    --name=myservice \
    --mount type=volume,source=test-data,target=/somewhere \
    nginx:alpine

myservice

$ docker service update \
    --mount-add type=volume,source=other-volume,target=/somewhere-else \
    myservice

myservice

$ docker service update --mount-rm /somewhere myservice

myservice
```

### Add or remove published service ports (--publish-add, --publish-rm) {#publish-add}

Use the `--publish-add` or `--publish-rm` flags to add or remove a published
port for a service. You can use the short or long syntax discussed in the
[docker service create](/reference/cli/docker/service/create/#publish)
reference.

The following example adds a published service port to an existing service.

```console
$ docker service update \
  --publish-add published=8080,target=80 \
  myservice
```

### Add or remove network (--network-add, --network-rm) {#network-add}

Use the `--network-add` or `--network-rm` flags to add or remove a network for
a service. You can use the short or long syntax discussed in the
[docker service create](/reference/cli/docker/service/create/#network)
reference.

The following example adds a new alias name to an existing service already connected to network my-network:

```console
$ docker service update \
  --network-rm my-network \
  --network-add name=my-network,alias=web1 \
  myservice
```

### Roll back to the previous version of a service (--rollback) {#rollback}

Use the `--rollback` option to roll back to the previous version of the service.

This will revert the service to the configuration that was in place before the most recent `docker service update` command.

The following example updates the number of replicas for the service from 4 to 5, and then rolls back to the previous configuration.

```console
$ docker service update --replicas=5 web

web

$ docker service ls

ID            NAME  MODE        REPLICAS  IMAGE
80bvrzp6vxf3  web   replicated  0/5       nginx:alpine

```

The following example rolls back the `web` service:

```console
$ docker service update --rollback web

web

$ docker service ls

ID            NAME  MODE        REPLICAS  IMAGE
80bvrzp6vxf3  web   replicated  0/4       nginx:alpine

```

Other options can be combined with `--rollback` as well, for example, `--update-delay 0s` to execute the rollback without a delay between tasks:

```console
$ docker service update \
  --rollback \
  --update-delay 0s
  web

web

```

Services can also be set up to roll back to the previous version automatically
when an update fails. To set up a service for automatic rollback, use
`--update-failure-action=rollback`. A rollback will be triggered if the fraction
of the tasks which failed to update successfully exceeds the value given with
`--update-max-failure-ratio`.

The rate, parallelism, and other parameters of a rollback operation are
determined by the values passed with the following flags:

- `--rollback-delay`
- `--rollback-failure-action`
- `--rollback-max-failure-ratio`
- `--rollback-monitor`
- `--rollback-parallelism`

For example, a service set up with `--update-parallelism 1 --rollback-parallelism 3`
will update one task at a time during a normal update, but during a rollback, 3
tasks at a time will get rolled back. These rollback parameters are respected both
during automatic rollbacks and for rollbacks initiated manually using `--rollback`.

### Add or remove secrets (--secret-add, --secret-rm) {#secret-add}

Use the `--secret-add` or `--secret-rm` options add or remove a service's
secrets.

The following example adds a secret named `ssh-2` and removes `ssh-1`:

```console
$ docker service update \
    --secret-add source=ssh-2,target=ssh-2 \
    --secret-rm ssh-1 \
    myservice
```

### Update services using templates

Some flags of `service update` support the use of templating.
See [`service create`](/reference/cli/docker/service/create/#create-services-using-templates) for the reference.


### Specify isolation mode on Windows (--isolation) {#isolation}

`service update` supports the same `--isolation` flag as `service create`
See [`service create`](/reference/cli/docker/service/create/) for the reference.

### Updating Jobs

When a service is created as a job, by setting its mode to `replicated-job` or
to `global-job` when doing `service create`, options for updating it are
limited.

Updating a Job immediately stops any Tasks that are in progress. The operation
creates a new set of Tasks for the job and effectively resets its completion
status. If any Tasks were running before the update, they are stopped, and new
Tasks are created.

Jobs cannot be rolled out or rolled back. None of the flags for configuring
update or rollback settings are valid with job modes.

To run a job again with the same parameters that it was run previously, it can
be force updated with the `--force` flag.



