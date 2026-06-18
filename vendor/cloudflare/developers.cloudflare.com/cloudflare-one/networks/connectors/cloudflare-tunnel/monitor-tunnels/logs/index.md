---
title: Log streams
description: Reference information for Log streams in Zero Trust networking.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Log streams

Tunnel logs record all activity between a `cloudflared` instance and Cloudflare's global network, as well as all activity between `cloudflared` and your origin server. These logs allow you to investigate connectivity or performance issues with a Cloudflare Tunnel. You can configure your server to store persistent logs, or you can stream real-time logs from any client machine.

## View logs on the server

If you have access to the origin server, you can use the [\--loglevel flag](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/run-parameters/#loglevel) to enable logging when you start the tunnel. By default, `cloudflared` prints logs to stdout and does not store logs on the server. You can optionally use the [\--logfile flag](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/run-parameters/#logfile) to write your logs to a file.

To enable logs, [run the tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/run-parameters/#add-run-parameters-to-tunnel-service) using the `--loglevel info` and `--logfile <PATH>` flags. For example,

Terminal window

```

cloudflared tunnel --loglevel info --logfile cloudflared.log run <UUID>


```

## View logs on your local machine

You can view real-time logs for a Cloudflare Tunnel via the dashboard or from any machine that has `cloudflared` installed. With remote log streams, you do not need to SSH into the server that is running the tunnel. To get remote logs, the tunnel must be active and able to receive requests.

### Dashboard

Note

Tunnel log streams require [edit permissions](https://developers.cloudflare.com/fundamentals/manage-members/roles/) for Cloudflare Tunnel. Due to the sensitive nature of these logs, read-only roles (such as `Zero Trust Read Only`) do not have access.

Dashboard log streams are only available for remotely-managed tunnels. To stream tunnel logs from the dashboard:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Networks** \> **Connectors** \> **Cloudflare Tunnels**.
2. Select **View logs** next to the tunnel you want to monitor.
3. Select **Begin log stream**.

#### View logs for a replica

If you are running multiple `cloudflared` instances for the same tunnel (also known as [replicas](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/)), you can stream logs for a specific replica:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Networks** \> **Connectors** \> **Cloudflare Tunnels** and select your tunnel.
2. In the **Connectors** list, select the **Connector ID** for the replica you want to view.
3. Select **Begin log stream**.

### CLI

The `cloudflared` daemon can stream logs from any tunnel in your account to the local command line. `cloudflared` must be installed on both your local machine and the origin server.

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

#### Filter logs

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

#### View logs for a replica

If you are running multiple `cloudflared` instances for the same tunnel (also known as [replicas](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/)), you must specify an individual instance to stream logs from:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Networks** \> **Connectors** \> **Cloudflare Tunnels** and select your tunnel.
2. Find the **Connector ID** for the `cloudflared` instance you want to view.
3. Specify the Connector ID in `cloudflared tail`:  
Terminal window  
```  
cloudflared tail --connector-id <CONNECTOR ID> <UUID>  
```

### Performance considerations

* The logging session will only be held open for one hour. All logging systems introduce some level of performance overhead, and this limit helps prevent long term impact to your tunnel's end-to-end latencies.
* When streaming logs for a high throughput tunnel, Cloudflare intentionally prioritizes service stability over log delivery. To reduce the number of dropped logs, try [requesting fewer logs](#filter-logs). To ensure that you are seeing all logs, [view logs on the server](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/monitor-tunnels/logs/#view-logs-on-the-server) instead of streaming the logs remotely.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/monitor-tunnels/logs/#page","headline":"Tunnel log streams · Cloudflare One docs","description":"Reference information for Log streams in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/monitor-tunnels/logs/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Logging"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/","name":"Cloudflare Tunnel"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/monitor-tunnels/","name":"Monitor tunnels"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/monitor-tunnels/logs/","name":"Log streams"}}]}
```
