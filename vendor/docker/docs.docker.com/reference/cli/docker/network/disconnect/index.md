# docker network disconnect

**Description:** Disconnect a container from a network

**Usage:** `docker network disconnect [OPTIONS] NETWORK CONTAINER`










## Description

Disconnects a container from a network. The container must be running to
disconnect it from the network.


## Options

| Option | Default | Description |
|--------|---------|-------------|
| `-f`, `--force` |  |  Force the container to disconnect from a network |



## Examples

```console
$ docker network disconnect multi-host-network container1
```



