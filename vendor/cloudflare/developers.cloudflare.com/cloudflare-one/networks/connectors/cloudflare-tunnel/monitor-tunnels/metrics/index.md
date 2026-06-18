---
title: Metrics
description: How Metrics works in Zero Trust networking.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Metrics

Tunnel metrics show a Cloudflare Tunnel's throughput and resource usage over time. When you run a tunnel, `cloudflared` will spin up a Prometheus metrics endpoint — an HTTP server that exposes metrics in [Prometheus ↗](https://prometheus.io/docs/introduction/overview/) format. You can use the Prometheus toolkit on a remote machine to scrape metrics data from the `cloudflared` server.

## Default metrics server address

In non-containerized environments, `cloudflared` starts the metrics server on `127.0.0.1:<PORT>/metrics`, where `<PORT>` is the first available port in the range `20241` to `20245`. If all ports are unavailable, `cloudflared` binds to a random port. In containerized environments (Docker, Kubernetes), the default address is `0.0.0.0:<PORT>/metrics`.

To determine the default port, check your [tunnel logs](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/monitor-tunnels/logs/) around the time when the tunnel started. For example:

```

2024-12-19T21:17:58Z INF Starting metrics server on 127.0.0.1:20241/metrics


```

## Configure the metrics server address

To serve metrics on a custom IP address and port, perform these steps on the `cloudflared` host:

1. [Run the tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/run-parameters/#add-run-parameters-to-tunnel-service) using the`--metrics` flag. For example,  
Terminal window  
```  
cloudflared tunnel --metrics 127.0.0.1:60123 run my-tunnel  
```  
Note  
If you plan to fetch metrics from another machine on the local network, replace `127.0.0.1` with the internal IP of the `cloudflared` server (for example, `198.168.x.x`). To serve metrics on all available network interfaces, use `0.0.0.0`.
2. Verify that the metrics server is running by going to `http://localhost:60123/metrics`. This will only work if you configured a localhost IP (`127.0.0.1` or `0.0.0.0`).

You can now export the metrics to Prometheus and Grafana to visualize and query the data. Refer to the [Grafana tutorial](https://developers.cloudflare.com/cloudflare-one/tutorials/grafana/) for instructions on getting started with these tools.

## Available metrics

### cloudflared metrics

| Name                                                   | Description                                                                                                | Type    | Labels                             |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- | ------- | ---------------------------------- |
| build\_info                                            | Build and version information.                                                                             | GAUGE   | goversion, revision, type, version |
| cloudflared\_config\_local\_config\_pushes             | Number of local configuration pushes to Cloudflare.                                                        | COUNTER |                                    |
| cloudflared\_config\_local\_config\_pushes\_errors     | Number of errors that occurred during local configuration pushes.                                          | COUNTER |                                    |
| cloudflared\_orchestration\_config\_version            | Configuration version.                                                                                     | GAUGE   |                                    |
| cloudflared\_tcp\_active\_sessions                     | Concurrent number of TCP sessions that are being proxied to any origin.                                    | GAUGE   |                                    |
| cloudflared\_tcp\_total\_sessions                      | Total number of TCP sessions that have been proxied to any origin.                                         | COUNTER |                                    |
| cloudflared\_tunnel\_active\_streams                   | Total number of active streams.                                                                            | GAUGE   |                                    |
| cloudflared\_tunnel\_concurrent\_requests\_per\_tunnel | Concurrent number of requests proxied through each tunnel.                                                 | GAUGE   |                                    |
| cloudflared\_tunnel\_ha\_connections                   | Number of active HA connections.                                                                           | GAUGE   |                                    |
| cloudflared\_tunnel\_request\_errors                   | Number of errors proxying to origin.                                                                       | COUNTER |                                    |
| cloudflared\_tunnel\_server\_locations                 | Where each tunnel is connected to. 1 means current location, 0 means previous locations.                   | GAUGE   | connection\_id, edge\_location     |
| cloudflared\_tunnel\_timer\_retries                    | Unacknowledged heart beats count.                                                                          | GAUGE   |                                    |
| cloudflared\_tunnel\_total\_requests                   | Number of requests proxied through all tunnels.                                                            | COUNTER |                                    |
| cloudflared\_tunnel\_tunnel\_authenticate\_success     | Number of successful tunnel authentication events.                                                         | COUNTER |                                    |
| cloudflared\_tunnel\_tunnel\_register\_success         | Number of successful tunnel registrations.                                                                 | COUNTER | rpcName                            |
| cloudflared\_udp\_active\_sessions                     | Concurrent number of UDP sessions that are being proxied to any origin.                                    | GAUGE   |                                    |
| cloudflared\_udp\_total\_sessions                      | Total number of UDP sessions that have been proxied to any origin.                                         | COUNTER |                                    |
| coredns\_panics\_total                                 | Number of panics.                                                                                          | COUNTER |                                    |
| quic\_client\_closed\_connections                      | Number of connections that have been closed.                                                               | COUNTER |                                    |
| quic\_client\_latest\_rtt                              | Latest round-trip time (RTT) measured on a connection.                                                     | GAUGE   | conn\_index                        |
| quic\_client\_lost\_packets                            | Number of packets that have been lost from a connection.                                                   | COUNTER | conn\_index, reason                |
| quic\_client\_min\_rtt                                 | Lowest RTT measured on a connection in ms.                                                                 | GAUGE   | conn\_index                        |
| quic\_client\_packet\_too\_big\_dropped                | Number of packets received from origin that are too big to send to Cloudflare and are dropped as a result. | COUNTER |                                    |
| quic\_client\_smoothed\_rtt                            | Smoothed RTT calculated for a connection in ms.                                                            | GAUGE   | conn\_index                        |
| quic\_client\_total\_connections                       | Number of connections initiated. For all QUIC metrics, client means the side initiating the connection.    | COUNTER |                                    |

### Prometheus metrics

| Name                                            | Description                                  | Type    | Labels |
| ----------------------------------------------- | -------------------------------------------- | ------- | ------ |
| promhttp\_metric\_handler\_requests\_in\_flight | Current number of scrapes being served.      | GAUGE   |        |
| promhttp\_metric\_handler\_requests\_total      | Total number of scrapes by HTTP status code. | COUNTER | code   |

### Go runtime metrics

| Name                                  | Description                                                        | Type    | Labels  |
| ------------------------------------- | ------------------------------------------------------------------ | ------- | ------- |
| go\_gc\_duration\_seconds             | A summary of the pause duration of garbage collection cycles.      | SUMMARY |         |
| go\_goroutines                        | Number of goroutines that currently exist.                         | GAUGE   |         |
| go\_info                              | Information about the Go environment.                              | GAUGE   | version |
| go\_memstats\_alloc\_bytes            | Number of bytes allocated and still in use.                        | GAUGE   |         |
| go\_memstats\_alloc\_bytes\_total     | Total number of bytes allocated, even if freed.                    | COUNTER |         |
| go\_memstats\_buck\_hash\_sys\_bytes  | Number of bytes used by the profiling bucket hash table.           | GAUGE   |         |
| go\_memstats\_frees\_total            | Total number of frees.                                             | COUNTER |         |
| go\_memstats\_gc\_sys\_bytes          | Number of bytes used for garbage collection system metadata.       | GAUGE   |         |
| go\_memstats\_heap\_alloc\_bytes      | Number of heap bytes allocated and still in use.                   | GAUGE   |         |
| go\_memstats\_heap\_idle\_bytes       | Number of heap bytes waiting to be used.                           | GAUGE   |         |
| go\_memstats\_heap\_inuse\_bytes      | Number of heap bytes that are in use.                              | GAUGE   |         |
| go\_memstats\_heap\_objects           | Number of allocated objects.                                       | GAUGE   |         |
| go\_memstats\_heap\_released\_bytes   | Number of heap bytes released to OS.                               | GAUGE   |         |
| go\_memstats\_heap\_sys\_bytes        | Number of heap bytes obtained from system.                         | GAUGE   |         |
| go\_memstats\_last\_gc\_time\_seconds | Number of seconds since 1970 of last garbage collection.           | GAUGE   |         |
| go\_memstats\_lookups\_total          | Total number of pointer lookups.                                   | COUNTER |         |
| go\_memstats\_mallocs\_total          | Total number of mallocs.                                           | COUNTER |         |
| go\_memstats\_mcache\_inuse\_bytes    | Number of bytes in use by mcache structures.                       | GAUGE   |         |
| go\_memstats\_mcache\_sys\_bytes      | Number of bytes used for mcache structures obtained from system.   | GAUGE   |         |
| go\_memstats\_mspan\_inuse\_bytes     | Number of bytes in use by mspan structures.                        | GAUGE   |         |
| go\_memstats\_mspan\_sys\_bytes       | Number of bytes used for mspan structures obtained from system.    | GAUGE   |         |
| go\_memstats\_next\_gc\_bytes         | Number of heap bytes when next garbage collection will take place. | GAUGE   |         |
| go\_memstats\_other\_sys\_bytes       | Number of bytes used for other system allocations.                 | GAUGE   |         |
| go\_memstats\_stack\_inuse\_bytes     | Number of bytes in use by the stack allocator.                     | GAUGE   |         |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/monitor-tunnels/metrics/#page","headline":"Tunnel metrics · Cloudflare One docs","description":"How Metrics works in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/monitor-tunnels/metrics/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/","name":"Cloudflare Tunnel"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/monitor-tunnels/","name":"Monitor tunnels"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/monitor-tunnels/metrics/","name":"Metrics"}}]}
```
