# docker network connect

**Description:** Connect a container to a network

**Usage:** `docker network connect [OPTIONS] NETWORK CONTAINER`










## Description

Connects a container to a network. You can connect a container by name
or by ID. Once connected, the container can communicate with other containers in
the same network.


## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--alias` |  |  Add network-scoped alias for the container |
| `--driver-opt` |  |  driver options for the network |
| `--gw-priority` |  |  Highest gw-priority provides the default gateway. Accepts positive and negative values.<br> |
| `--ip` | `<nil>` |  IPv4 address (e.g., `172.30.100.104`) |
| `--ip6` | `<nil>` |  IPv6 address (e.g., `2001:db8::33`) |
| `--link` |  |  Add link to another container |
| `--link-local-ip` |  |  Add a link-local address for the container |



## Examples

### Connect a running container to a network

```console
$ docker network connect multi-host-network container1
```

### Connect a container to a network when it starts

You can also use the `docker run --network=<network-name>` option to start a
container and immediately connect it to a network.

```console
$ docker run -itd --network=multi-host-network busybox
```

### Specify the IP address a container will use on a given network (--ip) {#ip}

You can specify the IP address you want to be assigned to the container's interface.

```console
$ docker network connect --ip 10.10.36.122 multi-host-network container2
```

### Use the legacy `--link` option (--link) {#link}

You can use `--link` option to link another container with a preferred alias.

```console
$ docker network connect --link container1:c1 multi-host-network container2
```

### Create a network alias for a container (--alias) {#alias}

`--alias` option can be used to resolve the container by another name in the network
being connected to.

```console
$ docker network connect --alias db --alias mysql multi-host-network container2
```

### Set sysctls for a container's interface (--driver-opt) {#sysctl}

`sysctl` settings that start with `net.ipv4.` and `net.ipv6.` can be set per-interface
using `--driver-opt` label `com.docker.network.endpoint.sysctls`. The name of the
interface must be replaced by `IFNAME`.

To set more than one `sysctl` for an interface, quote the whole value of the
`driver-opt` field, remembering to escape the quotes for the shell if necessary.
For example, if the interface to `my-net` is given name `eth3`, the following example
sets `net.ipv4.conf.eth3.log_martians=1` and `net.ipv4.conf.eth3.forwarding=0`.

```console
$ docker network connect --driver-opt=\"com.docker.network.endpoint.sysctls=net.ipv4.conf.IFNAME.log_martians=1,net.ipv4.conf.IFNAME.forwarding=0\" multi-host-network container2
```

> [!NOTE]
> Network drivers may restrict the sysctl settings that can be modified and, to protect
> the operation of the network, new restrictions may be added in the future.

### Network implications of stopping, pausing, or restarting containers

You can pause, restart, and stop containers that are connected to a network.
A container connects to its configured networks when it runs.

If specified, the container's IP address(es) is reapplied when a stopped
container is restarted. If the IP address is no longer available, the container
fails to start. One way to guarantee that the IP address is available is
to specify an `--ip-range` when creating the network, and choose the static IP
address(es) from outside that range. This ensures that the IP address is not
given to another container while this container is not on the network.

```console
$ docker network create --subnet 172.20.0.0/16 --ip-range 172.20.240.0/20 multi-host-network
```

```console
$ docker network connect --ip 172.20.128.2 multi-host-network container2
```

To verify the container is connected, use the `docker network inspect` command.
Use `docker network disconnect` to remove a container from the network.

Once connected in network, containers can communicate using only another
container's IP address or name. For `overlay` networks or custom plugins that
support multi-host connectivity, containers connected to the same multi-host
network but launched from different Engines can also communicate in this way.

You can connect a container to one or more networks. The networks need not be
the same type. For example, you can connect a single container bridge and overlay
networks.



