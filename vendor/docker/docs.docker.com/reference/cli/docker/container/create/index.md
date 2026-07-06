# docker container create

**Description:** Create a new container

**Usage:** `docker container create [OPTIONS] IMAGE [COMMAND] [ARG...]`

**Aliases:** `docker create`








## Description

The `docker container create` (or shorthand: `docker create`) command creates a
new container from the specified image, without starting it.

When creating a container, the Docker daemon creates a writeable container layer
over the specified image and prepares it for running the specified command. The
container ID is then printed to `STDOUT`. This is similar to `docker run -d`
except the container is never started. You can then use the `docker container start`
(or shorthand: `docker start`) command to start the container at any point.

This is useful when you want to set up a container configuration ahead of time
so that it's ready to start when you need it. The initial status of the
new container is `created`.

The `docker create` command shares most of its options with the `docker run`
command (which performs a `docker create` before starting it).
Refer to the [`docker run` CLI reference](/reference/cli/docker/container/run/)
for details on the available flags and options.


## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--add-host` |  |  Add a custom host-to-IP mapping (host:ip) |
| `--annotation` |  | API 1.43+ Add an annotation to the container (passed through to the OCI runtime)<br> |
| `-a`, `--attach` |  |  Attach to STDIN, STDOUT or STDERR |
| `--blkio-weight` |  |  Block IO (relative weight), between 10 and 1000, or 0 to disable (default 0)<br> |
| `--blkio-weight-device` |  |  Block IO weight (relative device weight) |
| `--cap-add` |  |  Add Linux capabilities |
| `--cap-drop` |  |  Drop Linux capabilities |
| `--cgroup-parent` |  |  Optional parent cgroup for the container |
| `--cgroupns` |  | API 1.41+ Cgroup namespace to use (host|private)<br>'host':    Run the container in the Docker host's cgroup namespace<br>'private': Run the container in its own private cgroup namespace<br>'':        Use the cgroup namespace as configured by the<br>           default-cgroupns-mode option on the daemon (default) |
| `--cidfile` |  |  Write the container ID to the file |
| `--cpu-count` |  |  CPU count (Windows only) |
| `--cpu-percent` |  |  CPU percent (Windows only) |
| `--cpu-period` |  |  Limit CPU CFS (Completely Fair Scheduler) period |
| `--cpu-quota` |  |  Limit CPU CFS (Completely Fair Scheduler) quota |
| `--cpu-rt-period` |  | API 1.25+ Limit CPU real-time period in microseconds |
| `--cpu-rt-runtime` |  | API 1.25+ Limit CPU real-time runtime in microseconds |
| `-c`, `--cpu-shares` |  |  CPU shares (relative weight) |
| `--cpus` |  | API 1.25+ Number of CPUs |
| `--cpuset-cpus` |  |  CPUs in which to allow execution (0-3, 0,1) |
| `--cpuset-mems` |  |  MEMs in which to allow execution (0-3, 0,1) |
| `--device` |  |  Add a host device to the container |
| `--device-cgroup-rule` |  |  Add a rule to the cgroup allowed devices list |
| `--device-read-bps` |  |  Limit read rate (bytes per second) from a device |
| `--device-read-iops` |  |  Limit read rate (IO per second) from a device |
| `--device-write-bps` |  |  Limit write rate (bytes per second) to a device |
| `--device-write-iops` |  |  Limit write rate (IO per second) to a device |
| `--dns` |  |  Set custom DNS servers |
| `--dns-option` |  |  Set DNS options |
| `--dns-search` |  |  Set custom DNS search domains |
| `--domainname` |  |  Container NIS domain name |
| `--entrypoint` |  |  Overwrite the default ENTRYPOINT of the image |
| `-e`, `--env` |  |  Set environment variables |
| `--env-file` |  |  Read in a file of environment variables |
| `--expose` |  |  Expose a port or a range of ports |
| `--gpus` |  | API 1.40+ GPU devices to add to the container ('all' to pass all GPUs) |
| `--group-add` |  |  Add additional groups to join |
| `--health-cmd` |  |  Command to run to check health |
| `--health-interval` |  |  Time between running the check (ms|s|m|h) (default 0s) |
| `--health-retries` |  |  Consecutive failures needed to report unhealthy |
| `--health-start-interval` |  | API 1.44+ Time between running the check during the start period (ms|s|m|h) (default 0s)<br> |
| `--health-start-period` |  | API 1.29+ Start period for the container to initialize before starting health-retries countdown (ms|s|m|h) (default 0s)<br> |
| `--health-timeout` |  |  Maximum time to allow one check to run (ms|s|m|h) (default 0s) |
| `--help` |  |  Print usage |
| `-h`, `--hostname` |  |  Container host name |
| `--init` |  | API 1.25+ Run an init inside the container that forwards signals and reaps processes<br> |
| `-i`, `--interactive` |  |  Keep STDIN open even if not attached |
| `--io-maxbandwidth` |  |  Maximum IO bandwidth limit for the system drive (Windows only) |
| `--io-maxiops` |  |  Maximum IOps limit for the system drive (Windows only) |
| `--ip` | `<nil>` |  IPv4 address (e.g., 172.30.100.104) |
| `--ip6` | `<nil>` |  IPv6 address (e.g., 2001:db8::33) |
| `--ipc` |  |  IPC mode to use |
| `--isolation` |  |  Container isolation technology |
| `-l`, `--label` |  |  Set meta data on a container |
| `--label-file` |  |  Read in a line delimited file of labels |
| `--link` |  |  Add link to another container |
| `--link-local-ip` |  |  Container IPv4/IPv6 link-local addresses |
| `--log-driver` |  |  Logging driver for the container |
| `--log-opt` |  |  Log driver options |
| `--mac-address` |  |  Container MAC address (e.g., 92:d0:c6:0a:29:33) |
| `-m`, `--memory` |  |  Memory limit |
| `--memory-reservation` |  |  Memory soft limit |
| `--memory-swap` |  |  Swap limit equal to memory plus swap: '-1' to enable unlimited swap<br> |
| `--memory-swappiness` | `-1` |  Tune container memory swappiness (0 to 100) |
| `--mount` |  |  Attach a filesystem mount to the container |
| `--name` |  |  Assign a name to the container |
| `--network` |  |  Connect a container to a network |
| `--network-alias` |  |  Add network-scoped alias for the container |
| `--no-healthcheck` |  |  Disable any container-specified HEALTHCHECK |
| `--oom-kill-disable` |  |  Disable OOM Killer |
| `--oom-score-adj` |  |  Tune host's OOM preferences (-1000 to 1000) |
| `--pid` |  |  PID namespace to use |
| `--pids-limit` |  |  Tune container pids limit (set -1 for unlimited) |
| `--platform` |  | API 1.32+ Set platform if server is multi-platform capable |
| `--privileged` |  |  Give extended privileges to this container |
| `-p`, `--publish` |  |  Publish a container's port(s) to the host |
| `-P`, `--publish-all` |  |  Publish all exposed ports to random ports |
| `--pull` | `missing` |  Pull image before creating (`always`, `|missing`, `never`) |
| `-q`, `--quiet` |  |  Suppress the pull output |
| `--read-only` |  |  Mount the container's root filesystem as read only |
| `--restart` | `no` |  Restart policy to apply when a container exits |
| `--rm` |  |  Automatically remove the container and its associated anonymous volumes when it exits<br> |
| `--runtime` |  |  Runtime to use for this container |
| `--security-opt` |  |  Security Options |
| `--shm-size` |  |  Size of /dev/shm |
| `--stop-signal` |  |  Signal to stop the container |
| `--stop-timeout` |  | API 1.25+ Timeout (in seconds) to stop a container |
| `--storage-opt` |  |  Storage driver options for the container |
| `--sysctl` |  |  Sysctl options |
| `--tmpfs` |  |  Mount a tmpfs directory |
| `-t`, `--tty` |  |  Allocate a pseudo-TTY |
| `--ulimit` |  |  Ulimit options |
| `--use-api-socket` |  |  **experimental (CLI)** Bind mount Docker API socket and required auth |
| `-u`, `--user` |  |  Username or UID (format: <name|uid>[:<group|gid>]) |
| `--userns` |  |  User namespace to use |
| `--uts` |  |  UTS namespace to use |
| `-v`, `--volume` |  |  Bind mount a volume |
| `--volume-driver` |  |  Optional volume driver for the container |
| `--volumes-from` |  |  Mount volumes from the specified container(s) |
| `-w`, `--workdir` |  |  Working directory inside the container |



## Examples

### Create and start a container

The following example creates an interactive container with a pseudo-TTY attached,
then starts the container and attaches to it:

```console
$ docker container create -i -t --name mycontainer alpine
6d8af538ec541dd581ebc2a24153a28329acb5268abe5ef868c1f1a261221752

$ docker container start --attach -i mycontainer
/ # echo hello world
hello world
```

The above is the equivalent of a `docker run`:

```console
$ docker run -it --name mycontainer2 alpine
/ # echo hello world
hello world
```

### Initialize volumes

Container volumes are initialized during the `docker create` phase
(i.e., `docker run` too). For example, this allows you to `create` the `data`
volume container, and then use it from another container:

```console
$ docker create -v /data --name data ubuntu

240633dfbb98128fa77473d3d9018f6123b99c454b3251427ae190a7d951ad57

$ docker run --rm --volumes-from data ubuntu ls -la /data

total 8
drwxr-xr-x  2 root root 4096 Dec  5 04:10 .
drwxr-xr-x 48 root root 4096 Dec  5 04:11 ..
```

Similarly, `create` a host directory bind mounted volume container, which can
then be used from the subsequent container:

```console
$ docker create -v /home/docker:/docker --name docker ubuntu

9aa88c08f319cd1e4515c3c46b0de7cc9aa75e878357b1e96f91e2c773029f03

$ docker run --rm --volumes-from docker ubuntu ls -la /docker

total 20
drwxr-sr-x  5 1000 staff  180 Dec  5 04:00 .
drwxr-xr-x 48 root root  4096 Dec  5 04:13 ..
-rw-rw-r--  1 1000 staff 3833 Dec  5 04:01 .ash_history
-rw-r--r--  1 1000 staff  446 Nov 28 11:51 .ashrc
-rw-r--r--  1 1000 staff   25 Dec  5 04:00 .gitconfig
drwxr-sr-x  3 1000 staff   60 Dec  1 03:28 .local
-rw-r--r--  1 1000 staff  920 Nov 28 11:51 .profile
drwx--S---  2 1000 staff  460 Dec  5 00:51 .ssh
drwxr-xr-x 32 1000 staff 1140 Dec  5 04:01 docker
```



