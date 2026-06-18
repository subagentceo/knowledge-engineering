---
title: Monitoring
description: Monitor tunnel health, connectors, and connection status.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/tunnel/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Monitoring

Cloudflare Tunnel exposes logs, metrics, and diagnostic tools to help you monitor tunnel health and resolve issues.

## Tunnel health

You can check your tunnel connection status in the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) by going to **Networking** \> **Tunnels**, or by running `cloudflared tunnel list`.

[ Go to **Tunnels** ](https://dash.cloudflare.com/?to=/:account/tunnels) 

| Status       | Meaning                                                                                                                                                                                                                                                                                                                                                               | Recommended Action                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Healthy**  | The tunnel is active and serving traffic through four connections to the Cloudflare global network.                                                                                                                                                                                                                                                                   | No action is required. Your tunnel is running correctly.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **Inactive** | The tunnel has been created (via the API or dashboard) but the cloudflared connector has never been run to establish a connection.                                                                                                                                                                                                                                    | Run the tunnel as a service (recommended) or use the cloudflared tunnel run command on your origin server to connect the tunnel to Cloudflare. Refer to [substep 6 of step 1 in the Create a Tunnel dashboard guide](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel/#1-create-a-tunnel) or step 4 in the [Create a Tunnel API guide](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel-api/#4-install-and-run-the-tunnel). |
| **Down**     | The tunnel was previously connected but is currently disconnected because the cloudflared process has stopped.                                                                                                                                                                                                                                                        | 1\. Ensure the cloudflared [service](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/as-a-service/) or process is actively running on your server.  2\. Check for server-side issues, such as the machine being powered off, an application crash, or recent network changes.                                                                                                                                                                                                                |
| **Degraded** | The cloudflared connector is running and the tunnel is serving traffic, but at least one individual connection has failed. Further degradation in [tunnel availability](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/) could risk the tunnel going down and failing to serve traffic. | 1\. Review your cloudflared [logs](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/monitor-tunnels/logs/) for connection failures or error messages.  2\. Investigate local network and firewall rules to ensure they are not blocking connections to the [Cloudflare Tunnel IPs and ports](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-with-firewall/).                                                                                                       |

Tunnel status scope

The tunnel status only reflects the connection between `cloudflared` and the Cloudflare network. It does not indicate whether `cloudflared` can reach your internal services. A tunnel can appear **Healthy** while users are unable to connect to an application.

### Notifications

Administrators can receive alerts when tunnels change health or deployment status. Notifications can be delivered by email, webhook, or third-party services.

To configure tunnel notifications, refer to [Create a notification](https://developers.cloudflare.com/notifications/get-started/#create-a-notification).

Tunnel Creation or Deletion Event

**Who is it for?**

Customers who want to receive a notification when Cloudflare Tunnels are created or deleted in their account.

**Other options / filters**

None.

**Included with**

All Cloudflare Zero Trust plans.

**What should you do if you receive one?**

No action is needed.

Tunnel Health Alert

**Who is it for?**

Customers who want to be warned about changes in health status for their Cloudflare Tunnels.

**Other options / filters**

None.

**Included with**

All Cloudflare Zero Trust plans.

**What should you do if you receive one?**

Monitor tunnel health over time and consider deploying [cloudflared replicas or load balancers](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/).

**Additional information**

Refer to [Tunnel status](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/troubleshoot-tunnels/common-errors/#tunnel-status) to review the list of possible tunnel statuses (`Healthy`, `Inactive`, `Down` and `Degraded`).

## Logs

Tunnel logs record all activity between `cloudflared` and the Cloudflare global network, and all activity between `cloudflared` and your origin server.

### Server-side logs

If you have access to the origin server, you can use the [\--loglevel flag](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/run-parameters/#loglevel) to enable logging when you start the tunnel. By default, `cloudflared` prints logs to stdout and does not store logs on the server. You can optionally use the [\--logfile flag](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/run-parameters/#logfile) to write your logs to a file.

To enable logs, [run the tunnel](https://developers.cloudflare.com/tunnel/configuration/#update-run-parameters) using the `--loglevel info` and `--logfile <PATH>` flags. For example,

Terminal window

```

cloudflared tunnel --loglevel info --logfile cloudflared.log run <UUID>


```

### Remote log streaming

You can stream real-time logs from a running tunnel without SSH access to the server.

* [ CLI ](#tab-panel-10996)
* [ Dashboard ](#tab-panel-10997)

The `cloudflared` daemon can stream logs from any tunnel in your account to the local command line. `cloudflared` must be installed on both your local machine and the origin server.

1. On your local machine, authenticate `cloudflared` to your Cloudflare account:  
Terminal window  
```  
cloudflared tunnel login  
```
2. Run `cloudflared tail` for a specific tunnel:  
Terminal window  
```  
cloudflared tail <UUID>  
```  
For a more structured view of the JSON message, you can pipe the output to tools like [jq ↗](https://stedolan.github.io/jq/):  
Terminal window  
```  
cloudflared tail --output=json <UUID> | jq .  
```
1. If you are running multiple [replicas](https://developers.cloudflare.com/tunnel/configuration/#replicas-and-high-availability), you can specify which replica to stream logs from:  
Terminal window  
```  
cloudflared tail --connector-id <REPLICA ID> <UUID>  
```  
To find the replica ID, go to **Networks** \> **Connectors** and select your tunnel. All active replicas appear in the **Connectors** list on the tunnel overview page. The replica ID is the **Connector ID**.

Log filtering options

You can filter logs by event type (`--event`), event level (`--level`), or sampling rate (`-sampling`) to reduce the volume of logs streamed from the origin. This helps mitigate the performance impact on the origin, especially when the origin is normally under high load. For example:

Terminal window

```

cloudflared tail --level debug <UUID>


```

| Flag        | Description                                                                                                                                                                                                                             | Allowed values                  | Default value |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- | ------------- |
| \--event    | Filter by the type of event / request.                                                                                                                                                                                                  | cloudflared, http, tcp, udp     | All events    |
| \--level    | Return logs at this level and above. Works independently of the [\--loglevel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/run-parameters/#loglevel) setting on the server. | debug, info, warn, error, fatal | debug         |
| \--sampling | Sample a fraction of the total logs.                                                                                                                                                                                                    | Number from 0.0 to 1.0          | 1.0           |

Dashboard log streams are only available for remotely-managed tunnels. To stream tunnel logs from the dashboard:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Networks** \> **Connectors** \> **Cloudflare Tunnels**.
2. Select **View logs** next to the tunnel you want to monitor.
3. Select **Begin log stream**.

#### View logs for a replica

If you are running multiple `cloudflared` instances for the same tunnel (also known as [replicas](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/)), you can stream logs for a specific replica:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Networks** \> **Connectors** \> **Cloudflare Tunnels** and select your tunnel.
2. In the **Connectors** list, select the **Connector ID** for the replica you want to view.
3. Select **Begin log stream**.

## Metrics

Tunnel metrics show a Cloudflare Tunnel's throughput and resource usage over time. When you run a tunnel, `cloudflared` will spin up a Prometheus metrics endpoint — an HTTP server that exposes metrics in [Prometheus ↗](https://prometheus.io/docs/introduction/overview/) format. You can use the Prometheus toolkit on a remote machine to scrape metrics data from the `cloudflared` server.

### Default metrics server address

In non-containerized environments, `cloudflared` starts the metrics server on `127.0.0.1:<PORT>/metrics`, where `<PORT>` is the first available port in the range `20241` to `20245`. If all ports are unavailable, `cloudflared` binds to a random port. In containerized environments (Docker, Kubernetes), the default address is `0.0.0.0:<PORT>/metrics`.

To determine the default port, check your [tunnel logs](#server-side-logs) around the time when the tunnel started. For example:

```

2024-12-19T21:17:58Z INF Starting metrics server on 127.0.0.1:20241/metrics


```

### Configure a custom address

To serve metrics on a custom IP address and port, perform these steps on the `cloudflared` host:

1. [Run the tunnel](https://developers.cloudflare.com/tunnel/configuration/#update-run-parameters) using the`--metrics` flag. For example,  
Terminal window  
```  
cloudflared tunnel --metrics 127.0.0.1:60123 run my-tunnel  
```  
Note  
If you plan to fetch metrics from another machine on the local network, replace `127.0.0.1` with the internal IP of the `cloudflared` server (for example, `198.168.x.x`). To serve metrics on all available network interfaces, use `0.0.0.0`.
2. Verify that the metrics server is running by going to `http://localhost:60123/metrics`. This will only work if you configured a localhost IP (`127.0.0.1` or `0.0.0.0`).

You can now export the metrics to Prometheus and Grafana to visualize and query the data. Refer to the [Grafana tutorial](https://developers.cloudflare.com/tunnel/tutorials/grafana/) for instructions on getting started with these tools.

cloudflared metrics

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

Prometheus metrics

| Name                                            | Description                                  | Type    | Labels |
| ----------------------------------------------- | -------------------------------------------- | ------- | ------ |
| promhttp\_metric\_handler\_requests\_in\_flight | Current number of scrapes being served.      | GAUGE   |        |
| promhttp\_metric\_handler\_requests\_total      | Total number of scrapes by HTTP status code. | COUNTER | code   |

Go runtime metrics

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

## Diagnostic logs

Cloudflare Tunnel generates diagnostic reports that collect data from a single `cloudflared` instance running on the local machine. This requires `cloudflared` version 2024.12.2 or later.

### Generate diagnostics

1. (Linux only) To include network diagnostics in the logs, allow the `cloudflared` user to create RAW and PACKET sockets without root permissions:  
Terminal window  
```  
sudo setcap cap_net_raw+ep /usr/bin/traceroute && sudo setcap cap_net_raw+ep /usr/bin/traceroute  
```  
If you do not set `cap_net_raw`, then traceroute data will be unavailable.
2. Get diagnostic logs:  
Terminal window  
```  
cloudflared tunnel diag  
```  
If multiple instances of `cloudflared` are running on the same host, specify the [metrics server IP and port](#configure-a-custom-address) for the instance you want to diagnose. For example:  
Terminal window  
```  
cloudflared tunnel diag --metrics 127.0.0.1:20241  
```

This command will output the status of each diagnostic task and place a `cloudflared-diag-YYYY-MM-DDThh-mm-ss.zip` file in your working directory.

Docker diagnostics

`cloudflared` reads diagnostic data from the [tunnel metrics server](#metrics). To get diagnostic logs, the metrics server must be exposed from the Docker container and reachable from the host machine.

1. Determine the [metrics server port](#default-metrics-server-address) for the `cloudflared` instance running in Docker.
2. Ensure the container is deployed with port forwarding enabled. The diagnostic feature will request information from the Docker instance using local port `20241`, therefore you should forward port `20241` to the container port obtained in Step 1:  
Terminal window  
```  
docker run -d -p 20241:<metrics_port> docker.io/cloudflare/cloudflared tunnel ...  
```
3. Verify that you can reach the metrics server address from the Docker host environment:  
Terminal window  
```  
curl localhost:20241/diag/tunnel  
```  
This command should return a JSON:  
```  
{  
  "tunnelID": "ef96b330-a7f5-4bce-a00e-827ce5be077f",  
  "connectorID": "d236670a-9f74-422f-adf1-030f5c5f0523",  
  "connections": [  
    { "isConnected": true, "protocol": 1, "edgeAddress": "198.41.192.167"},  
    {"isConnected": true, "protocol": 1, "edgeAddress": "198.41.200.113", "index": 1},  
    {"isConnected": true, "protocol": 1, "edgeAddress": "198.41.192.47", "index": 2},  
    {"isConnected": true, "protocol": 1, "edgeAddress": "198.41.200.73", "index": 3}  
  ],  
  "icmp_sources": ["192.168.1.243", "fe80::c59:bd4a:e815:ed6"]  
}  
```
4. Run the diagnostic using the Docker container ID:  
Terminal window  
```  
cloudflared tunnel diag --diag-container-id=<containerID>  
```  
Alternatively, you can specify the container's name instead of its ID:  
Terminal window  
```  
cloudflared tunnel diag --diag-container-id=<containerName>  
```  
Running the diagnostic command with the container ID allows `cloudflared` to collect information from the Docker environment such as logs and container details.

This command will output the status of each diagnostic task and place a `cloudflared-diag-YYYY-MM-DDThh-mm-ss.zip` file in your working directory.

Kubernetes diagnostics

The diagnostic feature will request data from the [tunnel metrics server](#metrics) using ports `20241` to `20245`. You will need to use port forwarding to allow the local `cloudflared` instance to connect to the metrics server on one of these ports.

1. Determine the tunnel's [metrics server port](#default-metrics-server-address).
2. Enable port forwarding:  
Terminal window  
```  
kubectl port-forward <pod> <diagnostic_port>:<metrics_port>  
```  
   * `<pod>`: Name of the pod where the tunnel is running  
   * `<diagnostic_port>` is any local port in the range `20241` to `20245`.  
   * `<metrics_port>` is the Kubernetes pod port for the `cloudflared` instance you want to diagnose (obtained in Step 1).  
For example, if you set the metrics server address to `0.0.0.0:12345`:  
Terminal window  
```  
kubectl port-forward cloudflared-6d4897585b-r8kfz 20244:12345  
```  
Connections made to local port `20244` are forwarded to port `12345` of the pod that is running the tunnel.
3. Run the diagnostic:  
Terminal window  
```  
cloudflared tunnel diag --diag-pod-id=<podID>  
```  
If the pod has multiple applications/services running and `cloudflared` is not the first in the pod, you must specify either the container ID or name:  
Terminal window  
```  
cloudflared tunnel diag --diag-pod-id=<podID> --diag-container-id=<containerName>  
```

This command will output the status of each diagnostic task and place a `cloudflared-diag-YYYY-MM-DDThh-mm-ss.zip` file in your working directory.

### Diagnostic file contents

The `cloudflared-diag-YYYY-MM-DDThh-mm-ss.zip` archive contains the files listed below. The data in a file either applies to the `cloudflared` instance being diagnosed (`diagnosee`) or the instance that triggered the diagnosis (`diagnoser`). For example, if your tunnel is running in a Docker container, the diagnosee is the Docker instance and the diagnoser is the host instance.

| File name              | Description                                                                                                              | Instance  |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------ | --------- |
| cli-configuration.json | [Tunnel run parameters](https://developers.cloudflare.com/tunnel/advanced/run-parameters/) used when starting the tunnel | diagnosee |
| cloudflared\_logs.txt  | [Tunnel log file](#logs)[1](#user-content-fn-1)                                                                          | diagnosee |
| configuration.json     | Tunnel configuration parameters                                                                                          | diagnosee |
| goroutine.pprof        | goroutine profile made available by pprof                                                                                | diagnosee |
| heap.pprof             | heap profile made available by pprof                                                                                     | diagnosee |
| metrics.txt            | Snapshot of [Tunnel metrics](#metrics) at the time of diagnosis                                                          | diagnosee |
| network.txt            | JSON traceroutes to Cloudflare's global network using IPv4 and IPv6                                                      | diagnoser |
| raw-network.txt        | Raw traceroutes to Cloudflare's global network using IPv4 and IPv6                                                       | diagnoser |
| systeminformation.json | Operating system information and resource usage                                                                          | diagnosee |
| task-result.json       | Result of each diagnostic task                                                                                           | diagnoser |
| tunnelstate.json       | Tunnel connections at the time of diagnosis                                                                              | diagnosee |

## Footnotes

1. If the log file is blank, you may need to [set \--loglevel to debug](#server-side-logs) when you start the tunnel. The `--loglevel` parameter is only required if you ran the tunnel from the CLI using a `cloudflared tunnel run` command. It is not necessary if the tunnel runs as a Linux/macOS service or runs in Docker/Kubernetes. [↩](#user-content-fnref-1)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/tunnel/monitoring/#page","headline":"Monitoring · Cloudflare Docs","description":"Monitor tunnel health, connectors, and connection status.","url":"https://developers.cloudflare.com/tunnel/monitoring/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Logging"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/tunnel/","name":"Cloudflare Tunnel"}},{"@type":"ListItem","position":3,"item":{"@id":"/tunnel/monitoring/","name":"Monitoring"}}]}
```
