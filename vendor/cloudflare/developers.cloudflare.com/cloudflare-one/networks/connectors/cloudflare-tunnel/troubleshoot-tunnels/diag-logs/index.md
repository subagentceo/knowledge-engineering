---
title: Tunnel diagnostic logs
description: Tunnel diagnostic logs in Zero Trust networking.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Tunnel diagnostic logs

Cloudflare Tunnel generates a set of diagnostic logs that can be used to troubleshoot issues with `cloudflared`. A diagnostic report collects data from a single instance of `cloudflared` running on the local machine.

## Get diagnostic logs

The steps for getting diagnostic logs depend on your `cloudflared` deployment environment.

### Prerequisites

* `cloudflared` version 2024.12.2 or later installed on the host

### Host environment

These instructions apply to remotely-managed and locally-managed tunnels running directly on the host machine.

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
If multiple instances of `cloudflared` are running on the same host, specify the [metrics server IP and port](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/monitor-tunnels/metrics/#configure-the-metrics-server-address) for the instance you want to diagnose. For example:  
Terminal window  
```  
cloudflared tunnel diag --metrics 127.0.0.1:20241  
```

This command will output the status of each diagnostic task and place a `cloudflared-diag-YYYY-MM-DDThh-mm-ss.zip` file in your working directory.

### Docker

`cloudflared` reads diagnostic data from the [tunnel metrics server](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/monitor-tunnels/metrics/). To get diagnostic logs, the metrics server must be exposed from the Docker container and reachable from the host machine.

1. Determine the [metrics server port](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/monitor-tunnels/metrics/#default-metrics-server-address) for the `cloudflared` instance running in Docker.
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

### Kubernetes

The diagnostic feature will request data from the [tunnel metrics server](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/monitor-tunnels/metrics/) using ports `20241` to `20245`. You will need to use port forwarding to allow the local `cloudflared` instance to connect to the metrics server on one of these ports.

1. Determine the tunnel's [metrics server port](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/monitor-tunnels/metrics/#default-metrics-server-address).
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

## cloudflared-diag files

The `cloudflared-diag-YYYY-MM-DDThh-mm-ss.zip` archive contains the files listed below. The data in a file either applies to the `cloudflared` instance being diagnosed (`diagnosee`) or the instance that triggered the diagnosis (`diagnoser`). For example, if your tunnel is running in a Docker container, the diagnosee is the Docker instance and the diagnoser is the host instance.

| File name              | Description                                                                                                                                                                              | Instance  |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| cli-configuration.json | [Tunnel run parameters](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/run-parameters/) used when starting the tunnel          | diagnosee |
| cloudflared\_logs.txt  | [Tunnel log file](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/monitor-tunnels/logs/)[1](#user-content-fn-1)                                   | diagnosee |
| configuration.json     | Tunnel configuration parameters                                                                                                                                                          | diagnosee |
| goroutine.pprof        | goroutine profile made available by pprof                                                                                                                                                | diagnosee |
| heap.pprof             | heap profile made available by pprof                                                                                                                                                     | diagnosee |
| metrics.txt            | Snapshot of [Tunnel metrics](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/monitor-tunnels/metrics/#available-metrics) at the time of diagnosis | diagnosee |
| network.txt            | JSON traceroutes to Cloudflare's global network using IPv4 and IPv6                                                                                                                      | diagnoser |
| raw-network.txt        | Raw traceroutes to Cloudflare's global network using IPv4 and IPv6                                                                                                                       | diagnoser |
| systeminformation.json | Operating system information and resource usage                                                                                                                                          | diagnosee |
| task-result.json       | Result of each diagnostic task                                                                                                                                                           | diagnoser |
| tunnelstate.json       | Tunnel connections at the time of diagnosis                                                                                                                                              | diagnosee |

## Footnotes

1. If the log file is blank, you may need to [set \--loglevel to debug](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/monitor-tunnels/logs/#view-logs-on-the-server) when you start the tunnel. The `--loglevel` parameter is only required if you ran the tunnel from the CLI using a `cloudflared tunnel run` command. It is not necessary if the tunnel runs as a Linux/macOS service or runs in Docker/Kubernetes. [↩](#user-content-fnref-1)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/troubleshoot-tunnels/diag-logs/#page","headline":"Tunnel diagnostic logs · Cloudflare One docs","description":"Tunnel diagnostic logs in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/troubleshoot-tunnels/diag-logs/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Debugging"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/","name":"Cloudflare Tunnel"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/troubleshoot-tunnels/","name":"Troubleshoot tunnels"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/troubleshoot-tunnels/diag-logs/","name":"Tunnel diagnostic logs"}}]}
```
