# docker builder build

**Description:** Build an image from a Dockerfile

**Usage:** `docker builder build [OPTIONS] PATH | URL | -`

**Aliases:** `docker image build`, `docker build`, `docker builder build`








## Description

See [docker build](/reference/cli/docker/image/build/) for more information.



## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--add-host` |  |  Add a custom host-to-IP mapping (`host:ip`) |
| `--build-arg` |  |  Set build-time variables |
| `--cache-from` |  |  Images to consider as cache sources |
| `--cgroup-parent` |  |  Set the parent cgroup for the `RUN` instructions during build |
| `--compress` |  |  Compress the build context using gzip |
| `--cpu-period` |  |  Limit the CPU CFS (Completely Fair Scheduler) period |
| `--cpu-quota` |  |  Limit the CPU CFS (Completely Fair Scheduler) quota |
| `-c`, `--cpu-shares` |  |  CPU shares (relative weight) |
| `--cpuset-cpus` |  |  CPUs in which to allow execution (0-3, 0,1) |
| `--cpuset-mems` |  |  MEMs in which to allow execution (0-3, 0,1) |
| `-f`, `--file` |  |  Name of the Dockerfile (Default is `PATH/Dockerfile`) |
| `--force-rm` |  |  Always remove intermediate containers |
| `--iidfile` |  |  Write the image ID to the file |
| `--isolation` |  |  Container isolation technology |
| `--label` |  |  Set metadata for an image |
| `-m`, `--memory` |  |  Memory limit |
| `--memory-swap` |  |  Swap limit equal to memory plus swap: -1 to enable unlimited swap |
| `--network` |  | API 1.25+ Set the networking mode for the RUN instructions during build |
| `--no-cache` |  |  Do not use cache when building the image |
| `--platform` |  | API 1.38+ Set platform if server is multi-platform capable |
| `--pull` |  |  Always attempt to pull a newer version of the image |
| `-q`, `--quiet` |  |  Suppress the build output and print image ID on success |
| `--rm` | `true` |  Remove intermediate containers after a successful build |
| `--security-opt` |  |  Security options |
| `--shm-size` |  |  Size of `/dev/shm` |
| `--squash` |  | API 1.25+ **experimental (daemon)** Squash newly built layers into a single new layer |
| `-t`, `--tag` |  |  Name and optionally a tag in the `name:tag` format |
| `--target` |  |  Set the target build stage to build. |
| `--ulimit` |  |  Ulimit options |






