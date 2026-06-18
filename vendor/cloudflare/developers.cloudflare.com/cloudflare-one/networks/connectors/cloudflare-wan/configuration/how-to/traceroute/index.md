---
title: Run traceroute
description: Learn what settings you need to change to perform a useful `traceroute` to an endpoint behind a Cloudflare Tunnel.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Run traceroute

If you have a Cloudflare WAN (formerly Magic WAN) client connected through [GRE](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/how-to/configure-tunnel-endpoints/), [IPsec](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/how-to/configure-tunnel-endpoints/), [CNI](https://developers.cloudflare.com/network-interconnect/) or [WARP](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/zero-trust/cloudflare-one-client/) and want to perform a `traceroute` to an endpoint behind a [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/zero-trust/cloudflare-tunnel/), the following settings must be applied for the command to return useful information.

## Inherited TTL value

On the machine where the `traceroute` client is executed, make sure the tunnel device does not inherit the TTL value of the inner packet. This is the default behavior on Linux and can result in unhelpful `traceroute` results:

Terminal window

```

sudo traceroute -s 10.1.0.100 -I 10.3.0.100


```

```

traceroute to 10.3.0.100 (10.3.0.100), 30 hops max, 60 byte packets

 1  * * *

 2  * * *

 3  * * *

 4  * * *

 5  * * *

 6  * * *

 7  * * *

 8  * * *

 9  * * *

10  10.3.0.100 (10.3.0.100)  420.505 ms  420.779 ms  420.776 ms


```

Setting the TTL explicitly returns much better results:

Terminal window

```

sudo ip link set cf_gre type gre ttl 64

sudo traceroute -s 10.1.0.100 -I 10.3.0.100


```

```

traceroute to 10.3.0.100 (10.3.0.100), 30 hops max, 60 byte packets

 1  10.0.0.11 (10.0.0.11)  58.947 ms  58.933 ms  58.930 ms

 2  173.245.60.175 (173.245.60.175)  61.138 ms  61.316 ms  61.313 ms

 3  172.68.145.21 (172.68.145.21)  367.448 ms  367.532 ms  367.530 ms

 4  mplat-e2e-vm3.c.magic-transit.internal (10.152.0.20)  370.362 ms  370.440 ms  370.522 ms

 5  10.3.0.100 (10.3.0.100)  370.519 ms  370.541 ms  518.152 ms


```

## Cloudflare One Client

Some Linux distributions default to a very strict setting for [reverse path filtering ↗](https://sysctl-explorer.net/net/ipv4/rp%5Ffilter/). This strict setting attempts to drop fake traffic as a security measure. Performing a `traceroute` with this setting on can unintentionally drop `traceroute` packets. If you use the Cloudflare One Client on Linux, set a less strict policy before attempting to perform a `traceroute`:

Terminal window

```

sudo sysctl -w net.ipv4.conf.CloudflareWARP.rp_filter=2


```

```

net.ipv4.conf.CloudflareWARP.rp_filter = 2


```

Terminal window

```

sudo traceroute -s 172.16.0.2 -I 10.3.0.100


```

```

traceroute to 10.3.0.100 (10.3.0.100), 30 hops max, 60 byte packets

 1  169.254.21.171 (169.254.21.171)  48.887 ms  48.894 ms  48.620 ms

 2  173.245.60.175 (173.245.60.175)  49.403 ms  49.519 ms  49.603 ms

 3  172.68.65.7 (172.68.65.7)  357.499 ms  357.519 ms  357.520 ms

 4  mplat-e2e-vm3.c.magic-transit.internal (10.152.0.20)  360.024 ms  360.086 ms  360.078 ms

 5  10.3.0.100 (10.3.0.100)  360.283 ms  360.297 ms  360.489 ms


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/how-to/traceroute/#page","headline":"Run traceroute · Cloudflare One docs","description":"Learn what settings you need to change to perform a useful traceroute to an endpoint behind a Cloudflare Tunnel.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/how-to/traceroute/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/","name":"Cloudflare WAN"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/","name":"Configuration"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/how-to/","name":"How to"}},{"@type":"ListItem","position":8,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/how-to/traceroute/","name":"Run traceroute"}}]}
```
