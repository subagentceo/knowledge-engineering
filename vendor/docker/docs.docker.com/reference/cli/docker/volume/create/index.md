# docker volume create

**Description:** Create a volume

**Usage:** `docker volume create [OPTIONS] [VOLUME]`










## Description

Creates a new volume that containers can consume and store data in. If a name is
not specified, Docker generates a random name.


## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--availability` | `active` | API 1.42+ **Swarm** Cluster Volume availability (`active`, `pause`, `drain`) |
| `-d`, `--driver` | `local` |  Specify volume driver name |
| `--group` |  | API 1.42+ **Swarm** Cluster Volume group (cluster volumes) |
| `--label` |  |  Set metadata for a volume |
| `--limit-bytes` |  | API 1.42+ **Swarm** Minimum size of the Cluster Volume in bytes |
| `-o`, `--opt` |  |  Set driver specific options |
| `--required-bytes` |  | API 1.42+ **Swarm** Maximum size of the Cluster Volume in bytes |
| `--scope` | `single` | API 1.42+ **Swarm** Cluster Volume access scope (`single`, `multi`) |
| `--secret` |  | API 1.42+ **Swarm** Cluster Volume secrets |
| `--sharing` | `none` | API 1.42+ **Swarm** Cluster Volume access sharing (`none`, `readonly`, `onewriter`, `all`)<br> |
| `--topology-preferred` |  | API 1.42+ **Swarm** A topology that the Cluster Volume would be preferred in |
| `--topology-required` |  | API 1.42+ **Swarm** A topology that the Cluster Volume must be accessible from |
| `--type` | `block` | API 1.42+ **Swarm** Cluster Volume access type (`mount`, `block`) |



## Examples

Create a volume and then configure the container to use it:

```console
$ docker volume create hello

hello

$ docker run -d -v hello:/world busybox ls /world
```

The mount is created inside the container's `/world` directory. Docker doesn't
support relative paths for mount points inside the container.

Multiple containers can use the same volume. This is useful if two containers
need access to shared data. For example, if one container writes and the other
reads the data.

Volume names must be unique among drivers. This means you can't use the same
volume name with two different drivers. Attempting to create two volumes with
the same name results in an error:

```console
A volume named  "hello"  already exists with the "some-other" driver. Choose a different volume name.
```

If you specify a volume name already in use on the current driver, Docker
assumes you want to reuse the existing volume and doesn't return an error.

### Driver-specific options (-o, --opt) {#opt}

Some volume drivers may take options to customize the volume creation. Use the
`-o` or `--opt` flags to pass driver options:

```console
$ docker volume create --driver fake \
    --opt tardis=blue \
    --opt timey=wimey \
    foo
```

These options are passed directly to the volume driver. Options for
different volume drivers may do different things (or nothing at all).

The built-in `local` driver accepts no options on Windows. On Linux and with
Docker Desktop, the `local` driver accepts options similar to the Linux `mount`
command. You can provide multiple options by passing the `--opt` flag multiple
times. Some `mount` options (such as the `o` option) can take a comma-separated
list of options. Complete list of available mount options can be found
[here](https://man7.org/linux/man-pages/man8/mount.8.html).

For example, the following creates a `tmpfs` volume called `foo` with a size of
100 megabyte and `uid` of 1000.

```console
$ docker volume create --driver local \
    --opt type=tmpfs \
    --opt device=tmpfs \
    --opt o=size=100m,uid=1000 \
    foo
```

Another example that uses `btrfs`:

```console
$ docker volume create --driver local \
    --opt type=btrfs \
    --opt device=/dev/sda2 \
    foo
```

Another example that uses `nfs` to mount the `/path/to/dir` in `rw` mode from
`192.168.1.1`:

```console
$ docker volume create --driver local \
    --opt type=nfs \
    --opt o=addr=192.168.1.1,rw \
    --opt device=:/path/to/dir \
    foo
```



