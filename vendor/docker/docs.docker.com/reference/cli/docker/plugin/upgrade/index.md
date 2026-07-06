# docker plugin upgrade

**Description:** Upgrade an existing plugin

**Usage:** `docker plugin upgrade [OPTIONS] PLUGIN [REMOTE]`










## Description

Upgrades an existing plugin to the specified remote plugin image. If no remote
is specified, Docker will re-pull the current image and use the updated version.
All existing references to the plugin will continue to work.
The plugin must be disabled before running the upgrade.


## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--grant-all-permissions` |  |  Grant all permissions necessary to run the plugin |
| `--skip-remote-check` |  |  Do not check if specified remote plugin matches existing plugin image<br> |



## Examples

The following example installs `vieus/sshfs` plugin, uses it to create and use
a volume, then upgrades the plugin.

```console
$ docker plugin install vieux/sshfs DEBUG=1

Plugin "vieux/sshfs:next" is requesting the following privileges:
 - network: [host]
 - device: [/dev/fuse]
 - capabilities: [CAP_SYS_ADMIN]
Do you grant the above permissions? [y/N] y
vieux/sshfs:next

$ docker volume create -d vieux/sshfs:next -o sshcmd=root@1.2.3.4:/tmp/shared -o password=XXX sshvolume

sshvolume

$ docker run -it -v sshvolume:/data alpine sh -c "touch /data/hello"

$ docker plugin disable -f vieux/sshfs:next

viex/sshfs:next

# Here docker volume ls doesn't show 'sshfsvolume', since the plugin is disabled
$ docker volume ls

DRIVER              VOLUME NAME

$ docker plugin upgrade vieux/sshfs:next vieux/sshfs:next

Plugin "vieux/sshfs:next" is requesting the following privileges:
 - network: [host]
 - device: [/dev/fuse]
 - capabilities: [CAP_SYS_ADMIN]
Do you grant the above permissions? [y/N] y
Upgrade plugin vieux/sshfs:next to vieux/sshfs:next

$ docker plugin enable vieux/sshfs:next

viex/sshfs:next

$ docker volume ls

DRIVER              VOLUME NAME
viuex/sshfs:next    sshvolume

$ docker run -it -v sshvolume:/data alpine sh -c "ls /data"

hello
```



