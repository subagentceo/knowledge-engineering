---
title: gRPC
description: gRPC in Zero Trust networking.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# gRPC

gRPC is a Remote Procedure Call (RPC) framework that allows client applications to call methods on a remote server as if they were running on the same local machine. You can connect gRPC servers and clients to Cloudflare's global network, making it easier to build applications that use services across different data centers and environments.

Cloudflare Tunnel supports gRPC traffic via [private subnet routing](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/). Public hostname deployments are not currently supported.
  
  
In this example, we will connect a gRPC server to Cloudflare using the`cloudflared` daemon, secure the server with Gateway policies, and open a gRPC channel to the server using the Cloudflare One Client.

## 1\. Set up a gRPC server

1. To set up a gRPC Python application, follow this [quick start guide ↗](https://grpc.io/docs/languages/python/quickstart/).
2. Start the server:

Terminal window

```

~/grpc/examples/python/helloworld $ python3 greeter_server.py

WARNING: All log messages before absl::InitializeLog() is called are written to STDERR

I0000 00:00:1721770418.373806    3677 config.cc:230] gRPC experiments enabled: call_status_override_on_cancellation, event_engine_dns, event_engine_listener, http2_stats_fix, monitoring_experiment, pick_first_new, trace_record_callops, work_serializer_clears_time_cache

Server started, listening on 50051


```

## 2\. Connect the server to Cloudflare

To establish a secure, outbound-only connection to Cloudflare:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Networks** \> **Connectors** \> **Cloudflare Tunnels**.
2. [Create a new tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel/) or edit an existing `cloudflared` tunnel.
1. In the **CIDR** tab for the tunnel, enter the private IP or CIDR address of your server.

## 3\. Route private network IPs through the Cloudflare One Client

By default, WARP excludes traffic bound for [RFC 1918 space ↗](https://datatracker.ietf.org/doc/html/rfc1918), which are IP addresses typically used in private networks and not reachable from the Internet. In order for the Cloudflare One Client to send traffic to your private network, you must configure [Split Tunnels](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/) so that the IP/CIDR of your private network routes through the Cloudflare One Client.

1. First, check whether your [Split Tunnels mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#change-split-tunnels-mode) is set to **Exclude** or **Include** mode.
2. Edit your Split Tunnel routes depending on the mode:  
   * [ Exclude IPs and domains ](#tab-panel-7304)  
   * [ Include IPs and domains ](#tab-panel-7305)  
If you are using **Exclude** mode:  
a. [Delete the route](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#remove-a-route) containing your private network's IP/CIDR range. For example, if your network uses the default AWS range of `172.31.0.0/16`, delete `172.16.0.0/12`.  
b. [Re-add IP/CIDR ranges](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#add-a-route) that are not explicitly used by your private network. For the AWS example above, you would add new entries for `172.16.0.0/13`, `172.24.0.0/14`, `172.28.0.0/15`, and `172.30.0.0/16`. This ensures that only traffic to `172.31.0.0/16` routes through the Cloudflare One Client.  
You can use the following calculator to determine which IP addresses to re-add:  
**Base CIDR:** **Subtracted CIDRs:**  
Calculate  
Calculator instructions  
   1. In **Base CIDR**, enter the RFC 1918 range that you deleted from Split Tunnels.  
   2. In **Subtracted CIDRs**, enter the IP/CIDR range used by your private network.  
   3. Re-add the calculator results to your Split Tunnel Exclude mode list.  
By tightening the private IP range included in the Cloudflare One Client, you reduce the risk of breaking a user's [access to local resources](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#allow-users-to-enable-local-network-exclusion).  
If you are using **Include** mode:  
   1. Add the required [Zero Trust domains](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#cloudflare-zero-trust-domains) or [IP addresses](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#cloudflare-zero-trust-ip-addresses) to your Split Tunnel include list.  
   2. [Add a route](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#add-a-route) to include your private network's IP/CIDR range.

## 4\. (Recommended) Create a Gateway policy

You can configure [Gateway network policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/) to either block or allow access to the gRPC server. The following example consists of two policies: the first allows gRPC connections from devices that pass [device posture checks](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/), and the second blocks all other traffic. Make sure that the Allow policy has higher [priority](https://developers.cloudflare.com/cloudflare-one/traffic-policies/order-of-enforcement/#order-of-precedence).

### 1\. Allow secured devices

| Selector                     | Operator | Value                                   | Logic | Action |
| ---------------------------- | -------- | --------------------------------------- | ----- | ------ |
| Destination Port             | is       | 50051                                   | And   | Allow  |
| Destination IP               | is       | 172.31.0.133                            | And   |        |
| Passed Device Posture Checks | is       | macOS firewall (Firewall)               | And   |        |
| Passed Device Posture Checks | is       | macOS disk encryption (Disk encryption) |       |        |

### 2\. Block everything else

| Selector       | Operator | Value         | Action |
| -------------- | -------- | ------------- | ------ |
| Destination IP | in       | 172.31.0.0/16 | Block  |

For more details on setting up the Gateway proxy, refer to [Filter network traffic with Gateway](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/#4-recommended-filter-network-traffic-with-gateway).

## 5\. Set up the client

gRPC clients can connect to the server by installing the Cloudflare One Client on the device and enrolling in your Zero Trust organization. When the client makes a request to a private IP exposed through Cloudflare Tunnel, WARP routes the connection through Cloudflare's network to the corresponding tunnel.

To set up the gRPC client:

1. [Deploy the Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/) on your device in Traffic and DNS mode.
2. [Create device enrollment rules](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/device-enrollment/) to determine which devices can enroll to your Zero Trust organization.
3. Install gRPC on the device by following this [quick start guide ↗](https://grpc.io/docs/languages/python/quickstart/).
4. Modify `greeter.py` to point to the private IP of your gRPC server. This is the same private IP configured in your [Cloudflare Tunnel routes](#2-connect-the-server-to-cloudflare). For example,

Python

```

def run():

    # NOTE(gRPC Python Team): .close() is possible on a channel and should be

    # used in circumstances in which the with statement does not fit the needs

    # of the code.

    print("Will try to greet world ...")

    with grpc.insecure_channel("172.31.0.133:50051") as channel:

        stub = helloworld_pb2_grpc.GreeterStub(channel)

        response = stub.SayHello(helloworld_pb2.HelloRequest(name="you"))

    print("Greeter client received: " + response.message)


```

## 6\. Test the connection

1. On the client device, ensure that the Cloudflare One Client is `Connected`.
2. Run the gRPC client application:

Terminal window

```

~/grpc/examples/python/helloworld $ python3 greeter_client.py

Will try to greet world ...

WARNING: All log messages before absl::InitializeLog() is called are written to STDERR

I0000 00:00:1721771484.489711 4414247 config.cc:230] gRPC experiments enabled: call_status_override_on_cancellation, event_engine_dns, event_engine_listener, http2_stats_fix, monitoring_experiment, pick_first_new, trace_record_callops, work_serializer_clears_time_cache

Greeter client received: Hello, you!


```

You can view [Tunnel logs](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/monitor-tunnels/logs/#view-logs-on-your-local-machine) to validate that requests are coming into the tunnel and reaching the gRPC server as intended.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/grpc/#page","headline":"gRPC · Cloudflare One docs","description":"gRPC in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/grpc/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["RPC"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/","name":"Cloudflare Tunnel"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/","name":"Use cases"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/grpc/","name":"gRPC"}}]}
```
