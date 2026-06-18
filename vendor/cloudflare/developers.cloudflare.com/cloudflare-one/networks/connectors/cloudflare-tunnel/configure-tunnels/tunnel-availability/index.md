---
title: Tunnel availability and failover
description: Deploy multiple `cloudflared` replicas for high availability and automatic failover across your infrastructure.

image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Tunnel availability and failover

Our lightweight and open-source connector, [cloudflared ↗](https://github.com/cloudflare/cloudflared), was built to be highly available without any additional configuration requirements. When you run a tunnel, `cloudflared` establishes four outbound-only connections between the origin server and the Cloudflare network. These four connections are made to four different servers spread across at least two distinct data centers. This model ensures high availability and mitigates the risk of individual connection failures. This means in event a single connection, server, or data center goes offline, your resources will remain available.

## `cloudflared` replicas

You can deploy additional instances of `cloudflared` for availability and failover. These instances are called replicas. Each replica establishes four new connections to Cloudflare, providing additional points of ingress to your origin. All replicas point to the same tunnel, so if a single host running `cloudflared` goes down, the remaining replicas continue to serve traffic.

graph LR
    C((Cloudflare))
    subgraph E[Your network]
        cf1["cloudflared <br> (Replica for tunnel-01)"]
        cf2["cloudflared <br> (Replica for tunnel-01)"]
        S1[Application]
        cf1-->S1
        cf2-->S1
    end
    C -- "Connections x 4 <br>"--> cf1
    C --> cf1
    C --> cf1
    C --> cf1
    C -- Connections x 4--> cf2
    C --> cf2
    C --> cf2
    C --> cf2

Replicas do not support traffic steering (such as round-robin or hash-based routing). When a request arrives at Cloudflare, it is forwarded to the geographically closest replica. If that connection fails, Cloudflare retries with other replicas, but there is no guarantee about which one is chosen. If you need intelligent traffic distribution, use [Cloudflare Load Balancers](#cloudflare-load-balancers) instead.

### When to use `cloudflared` replicas

* To provide additional points of availability for a single tunnel.
* To allocate failover nodes within your network.
* To update the configuration of a tunnel [without downtime](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/downloads/update-cloudflared/#update-with-multiple-cloudflared-instances).

For setup instructions, refer to [Deploy cloudflared replicas](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/deploy-replicas/).

## Cloudflare Load Balancers

[Cloudflare Load Balancing](https://developers.cloudflare.com/load-balancing/) proactively steers traffic away from unhealthy origins and intelligently distributes the traffic load based on your choice of [steering algorithms](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/). Unlike [cloudflared replicas](#cloudflared-replicas) which all use the same tunnel, a typical load balancer setup requires creating multiple tunnels. Most customers will create one tunnel per data center and one load balancer pool per tunnel.

graph LR
    accTitle: Load balancing traffic to applications behind Cloudflare Tunnel

    A[Internet] --> C{Cloudflare <br> Load Balancer}
    B[Cloudflare One Client] --> C
    M[Cloudflare WAN] --> C
    C -- Tunnel 1 --> cf1
    C -- Tunnel 2 --> cf2
    subgraph F[Data center 2]
        cf2[cloudflared <br> server]
        S3[App server]
        S4[App server]
        cf2-->S3
        cf2-->S4
    end
    subgraph E[Data center 1]
        cf1[cloudflared <br> server]
        S1[App server]
        S2[App server]
        cf1-->S1
        cf1-->S2
    end

### When to use load balancers

* To intelligently steer traffic based on latency, geolocation, or other signals.
* To implement failover logic if a tunnel reaches an inactive state.
* To get a [health alert](https://developers.cloudflare.com/notifications/notification-available/#load-balancing) when a tunnel reaches an inactive state.
* To distribute traffic more evenly across your Cloudflare Tunnel-accessible origins or endpoints.

For setup instructions, refer to [Public load balancers](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/public-load-balancers/) or [Private Network Load Balancing](https://developers.cloudflare.com/load-balancing/private-network/) depending on your [use case](#types-of-load-balancers).

### Types of load balancers

There are two types of load balancers that you can use with Cloudflare Tunnel endpoints:

* [Public load balancers](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/public-load-balancers/) steer traffic from the Internet to applications published on a Cloudflare domain. Use this method if your service is served by Cloudflare Tunnel via a [published application route](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel/#2a-publish-an-application).
* [Private load balancers](https://developers.cloudflare.com/load-balancing/private-network/) steer traffic from Cloudflare One Clients, Cloudflare WAN, and other on-ramps to an internal IP on your private network. Use this method if your service is connected to Cloudflare Tunnel via a [CIDR route](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/connect-cidr/).

Note

[Private hostname routes](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/connect-private-hostname/) are not currently compatible with Load Balancing. If your service is connected via a hostname route, use `cloudflared` [replicas](#cloudflared-replicas) for high availability.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/#page","headline":"Tunnel availability and failover · Cloudflare One docs","description":"Deploy multiple cloudflared replicas for high availability and automatic failover across your infrastructure.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/","name":"Cloudflare Tunnel"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/","name":"Configure a tunnel"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/","name":"Tunnel availability and failover"}}]}
```
