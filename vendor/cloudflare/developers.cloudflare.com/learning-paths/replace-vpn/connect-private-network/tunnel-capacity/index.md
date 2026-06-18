---
title: Tunnel capacity for cloudflared
description: Size and scale cloudflared tunnel capacity.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Tunnel capacity for cloudflared

Now that you have a Cloudflare Tunnel up and running, evaluate whether `cloudflared` has enough system resources to handle the expected volume of requests from end users. 

Unlike legacy VPNs where throughput is determined by the server's memory, CPU and other hardware specifications, Cloudflare Tunnel throughput is primarily limited by the number of ports configured in system software. Therefore, when sizing your `cloudflared` server, the most important element is sizing the available ports on the machine to reflect the expected throughput of TCP and UDP traffic.

If you have exhausted the ports on a single machine, you will need to add additional servers running `cloudflared`. 

## Size the tunnel

To determine how many `cloudflared` host servers you need:

1. Start with our baseline recommendations:  
   * Run a [cloudflared replica](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/#cloudflared-replicas) on two dedicated host machines per network location. Using two hosts enables server-side redundancy and traffic balancing.  
   * Size each host with minimum 4GB of RAM and 4 CPU cores.  
   * Allocate 50,000 [ports](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/system-requirements/#number-of-ports) to the `cloudflared` process on each host.  
This setup is usually sufficient to handle traffic from 8,000 users (4,000 per host).
2. After you have completed this learning path and have users actively engaging with the network, [calculate](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/system-requirements/#calculate-your-tunnel-capacity) your actual tunnel usage.
3. Decide how much headroom you want to include and [resize the tunnel](#scale-the-tunnel) if needed.

## Scale the tunnel

There are two ways to scale Cloudflare Tunnel: you could either add additional replicas of the existing tunnel (Figure 1), or you could divide your network's IP space across multiple tunnels (Figure 2).

flowchart TB
accTitle: Figure 1: Multiple replicas of a tunnel that proxies all private networks.
subgraph replica1[my-tunnel]
  ip1[10.0.0.0/8 </br> 172.0.0.0/8 </br> 192.0.0.0/8]
end
subgraph replica2[my-tunnel]
  ip2[10.0.0.0/8 </br> 172.0.0.0/8 </br> 192.0.0.0/8]
end
subgraph replica3[my-tunnel]
  ip3[10.0.0.0/8 </br> 172.0.0.0/8 </br> 192.0.0.0/8]
end
replica1 <--> C((Cloudflare))
replica2 <--> C
replica3 <--> C

flowchart TB
accTitle: Figure 2: Multiple tunnels proxying different private networks.
subgraph tunnel-1
  ip1[10.0.0.0/8]
end
subgraph tunnel-2
  ip2[172.0.0.0/8]
end
subgraph tunnel-3
  ip3[192.0.0.0/8]
end
tunnel-1 <--> C((Cloudflare))
tunnel-2 <--> C
tunnel-3 <--> C

### When to add replicas

Adding additional [replicas](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/#cloudflared-replicas) of an existing Cloudflare Tunnel (two is the baseline recommendation) should only be done to support additional traffic to the IP routes in the tunnel. Replicas should always be added in the same physical location as one another so that they can operate in a pooled mode. If you are considering adding a replica in a different geographic location, reevaluate the network proxy design for your Cloudflare Tunnel and refer to [When to add tunnels](#when-to-add-tunnels).

### When to add tunnels

#### Servers in different locations

Consider creating brand new tunnels when your network is dispersed across different geographic locations. For example, assume that the network represented by `10.0.0.0/8` is almost entirely contiguous in Eastern United States, with one non-overlapping exception for `10.0.50.0/24` served out of the Pacific Northwest. Rather than serve an additional replica from the Pacific Northwest, we recommend breaking out `10.0.50.0/24` into a separate Cloudflare Tunnel. Serve this new tunnel from a host machine near the Pacific Northwest with its own balanced replica implementation.

Note

If you add the `10.0.50.0/24` range to a new tunnel without removing it from your existing `10.0.0.0/8` tunnel, Cloudflare will automatically default to the most specific path for user traffic. In other words, all traffic to `10.0.50/0/24` will flow through the newly created tunnel even though both tunnels technically include that route.

#### Servers in same location

Even if all routes in your network are served from the same physical location, it may eventually make sense from a control-plane redundancy perspective to split up the network into separate tunnels rather than add replicas.

For instance, if you proxy the ranges `10.0.0.0/8`, `172.0.0.0/8`, and `192.0.0.0/8` from a single tunnel with multiple replicas, you may reach a point of port exhaustion with respect to the traffic flowing through the multitude of networks. It may make sense to break out `10.0.0.0/8`, `172.0.0.0/8`, and `192.0.0.0/8` into their own independent tunnels, each with their own replica. Alternatively, you could find specific applications or functions (like DNS servers or other functions that generate a high volume of independent traffic) and break them out into standalone tunnels with properly rated throughput and replica volume.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/replace-vpn/connect-private-network/tunnel-capacity/#page","headline":"Tunnel capacity for cloudflared · Cloudflare Learning Paths","description":"Size and scale cloudflared tunnel capacity.","url":"https://developers.cloudflare.com/learning-paths/replace-vpn/connect-private-network/tunnel-capacity/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/replace-vpn/connect-private-network/","name":"Connect your private network"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/replace-vpn/connect-private-network/tunnel-capacity/","name":"Tunnel capacity for cloudflared"}}]}
```
