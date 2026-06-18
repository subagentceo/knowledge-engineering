---
title: Routing
description: Route traffic to private networks and services through Cloudflare Tunnel.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/tunnel/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Routing

Cloudflare Tunnel routes traffic from Cloudflare's network to services running behind `cloudflared`. When you [publish an application](https://developers.cloudflare.com/tunnel/setup/#publish-an-application), you map a public hostname to a local service — for example, `app.example.com` to `http://localhost:8080` — and Cloudflare applies CDN caching, WAF, and DDoS protection before forwarding the request to your origin.

![Multiple outbound connections from cloudflared are spread across Cloudflare data centers for reliability and failover.](https://developers.cloudflare.com/_astro/cf1-ref-arch-7.Dk3BnKM8_UmiKN.svg) 

## Published applications

A published application is a hostname-to-service mapping defined in your tunnel configuration. Each mapping tells `cloudflared` which local service should receive traffic for a given public hostname.

You can publish multiple applications on a single tunnel. For each application, specify:

* **Public hostname** — The domain or subdomain that users visit (for example, `app.example.com`).
* **Service** — The local address or socket where the application is running (for example, `http://localhost:8080`).

When you add a route through the dashboard, Cloudflare automatically creates a DNS record pointing the hostname to your tunnel subdomain (`<UUID>.cfargotunnel.com`).

## Supported protocols

The table below lists the service types you can route to a public hostname. Non-HTTP services require [installing cloudflared on the client](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/cloudflared-authentication/) for end users to connect.

| Service type | Description                                                                                                                                                                                                                                                                                                                                                                                                                    | Example service value               |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------- |
| HTTP         | Proxies incoming HTTPS requests to your local web service over HTTP.                                                                                                                                                                                                                                                                                                                                                           | http://localhost:8000               |
| HTTPS        | Proxies incoming HTTPS requests directly to your local web service. You can [disable TLS verification](https://developers.cloudflare.com/tunnel/configuration/#notlsverify) for self-signed certificates.                                                                                                                                                                                                                      | https://localhost:8000              |
| UNIX         | Same as HTTP, but uses a Unix socket.                                                                                                                                                                                                                                                                                                                                                                                          | unix:/home/production/echo.sock     |
| UNIX + TLS   | Same as HTTPS, but uses a Unix socket.                                                                                                                                                                                                                                                                                                                                                                                         | unix+tls:/home/production/echo.sock |
| TCP          | Streams TCP over a WebSocket connection. End users run cloudflared access tcp to [connect](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/cloudflared-authentication/arbitrary-tcp/). For long-lived connections, use [Client-to-Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/) instead.                     | tcp://localhost:2222                |
| SSH          | Streams SSH over a WebSocket connection. End users run cloudflared access ssh to [connect](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/ssh-cloudflared-authentication/). For long-lived connections, use [Client-to-Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/ssh-infrastructure-access/) instead. | ssh://localhost:22                  |
| RDP          | Streams RDP over a WebSocket connection. For more information, refer to [Connect to RDP with client-side cloudflared](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/rdp/rdp-cloudflared-authentication/).                                                                                                                                                                   | rdp://localhost:3389                |
| SMB          | Streams SMB over a WebSocket connection. For more information, refer to [Connect to SMB with client-side cloudflared](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/smb/#connect-to-smb-server-with-cloudflared-access).                                                                                                                                                    | smb://localhost:445                 |
| HTTP\_STATUS | Responds to all requests with a fixed HTTP status code.                                                                                                                                                                                                                                                                                                                                                                        | http\_status:404                    |
| BASTION      | Allows cloudflared to act as a jump host, providing access to any local address.                                                                                                                                                                                                                                                                                                                                               | bastion                             |
| HELLO\_WORLD | Test server for validating your Cloudflare Tunnel connection (for [locally managed tunnels](https://developers.cloudflare.com/tunnel/other-tunnel-types/local-management/configuration-file/#file-structure-for-published-applications) only).                                                                                                                                                                                 | hello\_world                        |

## IPv6 service addresses

When the service value is an IPv6 literal, wrap the address in square brackets as defined by [RFC 3986 ↗](https://datatracker.ietf.org/doc/html/rfc3986#section-3.2.2). The brackets are required so that the `:` characters in the address are not confused with the port separator.

| Service type | Example service value       |
| ------------ | --------------------------- |
| HTTP         | http://\[2001:db8::1\]:8000 |
| HTTPS        | https://\[2001:db8::1\]:443 |
| TCP          | tcp://\[2001:db8::1\]:2222  |
| SSH          | ssh://\[2001:db8::1\]:22    |
| RDP          | rdp://\[2001:db8::1\]:3389  |

Hostnames and IPv4 addresses do not need brackets — `http://localhost:8000` and `http://192.0.2.1:8000` are valid as-is.

## DNS records

When you create a tunnel, Cloudflare generates a subdomain at `<UUID>.cfargotunnel.com`. You point a CNAME record at this subdomain to route traffic from your hostname to the tunnel.

The `cfargotunnel.com` subdomain only proxies traffic for DNS records in the same Cloudflare account. If someone discovers your tunnel UUID, they cannot create a DNS record in another account to proxy traffic through it.

### Create a DNS record

To create a DNS record for a Cloudflare Tunnel:

* [ Dashboard ](#tab-panel-10998)
* [ CLI ](#tab-panel-10999)

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and go to **DNS Records** for your domain.  
[ Go to **Records** ](https://dash.cloudflare.com/?to=/:account/:zone/dns/records)
2. Select **Add record**.
3. Enter the following values:  
   * **Type**: _CNAME_  
   * **Name**: Subdomain of your application  
   * **Target**: `<UUID>.cfargotunnel.com`
4. Select **Save**.

![Example of fields completed to create a new CNAME record.](https://developers.cloudflare.com/_astro/dns-record.B25etJTI_Z1p13KV.webp)

For locally-managed tunnels, run the following command to create a CNAME record pointing to your tunnel subdomain:

Terminal window

```

cloudflared tunnel route dns <UUID or NAME> www.app.com


```

This creates a CNAME record but does not proxy traffic unless the tunnel is running.

Note

To create DNS records using `cloudflared`, the [cert.pem](https://developers.cloudflare.com/tunnel/other-tunnel-types/local-management/local-tunnel-terms/#certpem) file must be installed on your system.

The DNS record and the tunnel are independent. You can create DNS records that point to a tunnel that is not running. If a tunnel stops, the DNS record is not deleted — visitors will see a `1016` error.

You can also create multiple DNS records pointing to the same tunnel subdomain. If you route traffic from multiple hostnames to multiple services, create a CNAME entry for each hostname. All entries share the same target.

## Load balancing

Use a [public load balancer](https://developers.cloudflare.com/load-balancing/load-balancers/) to distribute traffic across servers running your published applications. This provides health-check-based failover and intelligent traffic steering across regions.

graph LR
    accTitle: Load balancing traffic to applications behind Cloudflare Tunnel

    A[Internet] --> C{Cloudflare <br> Load Balancer}
    C -- Tunnel 1 --> cf1
    C -- Tunnel 2 --> cf2
    subgraph F[Data center 2]
        cf2[cloudflared]
        S3[App server]
        S4[App server]
        cf2-->S3
        cf2-->S4
    end
    subgraph E[Data center 1]
        cf1[cloudflared]
        S1[App server]
        S2[App server]
        cf1-->S1
        cf1-->S2
    end

### Replicas versus load balancers

Running multiple `cloudflared` [replicas](https://developers.cloudflare.com/tunnel/configuration/#replicas-and-high-availability) on the same tunnel UUID provides basic redundancy — if one host fails, other replicas continue serving traffic. However, the load balancer treats all replicas of the same tunnel UUID as a single endpoint.

For granular traffic steering and [session affinity](https://developers.cloudflare.com/load-balancing/understand-basics/session-affinity/), connect each host using a different tunnel UUID so the load balancer can address them independently.

### Add a tunnel to a load balancer pool

Prerequisites

A Cloudflare Tunnel with at least one [published application route](https://developers.cloudflare.com/tunnel/setup/#publish-an-application).

To create a load balancer for Cloudflare Tunnel published applications:

1. In the Cloudflare dashboard, go to the **Load Balancing** page.  
[ Go to **Load Balancing** ](https://dash.cloudflare.com/?to=/:account/load-balancing)
2. Select **Create load balancer**, then select **Public load balancer**.
3. Under **Select website**, select the domain of your published application route.
4. On the **Hostname** page, enter a hostname for the load balancer (for example, `lb.example.com`).
5. On the **Pools** page, select **Create a pool** and enter a descriptive name.
6. Add a tunnel endpoint with the following values:  
   * **Endpoint Name**: Name of the server running the application  
   * **Endpoint Address**: `<UUID>.cfargotunnel.com` (find the Tunnel ID in the \[Cloudflare dashboard\](https://dash.cloudflare.com/) under \*\*Networking\*\* > \*\*Tunnels\*\*)  
   * **Header value**: Hostname of your published application route (for example, `app.example.com`)  
   * **Weight**: `1` (if only one endpoint)  
Note  
A single origin pool cannot reference the same tunnel UUID twice.
7. Choose a **Fallback pool**. Refer to [traffic steering policies](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/steering-policies/) for routing options.
8. (Recommended) On the **Monitors** page, attach a monitor to the endpoint. For an HTTP or HTTPS application, create an HTTPS monitor:  
   * **Type**: _HTTPS_  
   * **Path**: `/`  
   * **Port**: `443`  
   * **Expected Code(s)**: `200`  
   * **Header Name**: `Host`  
   * **Value**: `app.example.com`
9. Save and deploy the load balancer.

To test, access your application using the load balancer hostname (`lb.example.com`).

Monitor TCP tunnel origins

TCP monitors are not supported for tunnel endpoints. Instead, create a health check endpoint on the `cloudflared` host and use an HTTPS monitor. For example, you can use `cloudflared` to return a fixed HTTP status response:

1. [Add a published application route](https://developers.cloudflare.com/tunnel/setup/#publish-an-application) for the health check:  
   * **Hostname**: `health-check.example.com`  
   * **Service Type**: _HTTP\_STATUS_  
   * **HTTP Status Code**: `200`
2. [Create a monitor](https://developers.cloudflare.com/load-balancing/monitors/create-monitor/) with these settings:  
   * **Type**: _HTTPS_  
   * **Path**: `/`  
   * **Port**: `443`  
   * **Expected Code(s)**: `200`  
   * **Header Name**: `Host`  
   * **Value**: `health-check.example.com`

This monitor verifies that `cloudflared` is reachable. It does not check whether the upstream service is accepting requests.

Local connection preference

If you notice traffic imbalances across endpoints in different locations, you may need to adjust your load balancer configuration.

Cloudflare uses [Anycast routing ↗](https://www.cloudflare.com/learning/cdn/glossary/anycast-network/) to direct end user requests to the nearest data center. `cloudflared` prefers to serve requests using connections in the same data center, which can affect how traffic is distributed across endpoints.

If you run [cloudflared replicas](https://developers.cloudflare.com/tunnel/configuration/#replicas-and-high-availability) on the same tunnel UUID, consider switching to separate tunnels for more granular control over [traffic steering](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/).

## Cloudflare settings

Published applications inherit the Cloudflare settings for their hostname, including [cache rules](https://developers.cloudflare.com/cache/how-to/cache-rules/), [WAF rules](https://developers.cloudflare.com/waf/), and other [Rules](https://developers.cloudflare.com/rules/) configurations. You can change these settings for each hostname in the [Cloudflare dashboard ↗](https://dash.cloudflare.com/).

If you use a load balancer, settings are applied to the load balancer hostname instead.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/tunnel/routing/#page","headline":"Routing · Cloudflare Docs","description":"Route traffic to private networks and services through Cloudflare Tunnel.","url":"https://developers.cloudflare.com/tunnel/routing/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-07","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["DNS","WebSockets"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/tunnel/","name":"Cloudflare Tunnel"}},{"@type":"ListItem","position":3,"item":{"@id":"/tunnel/routing/","name":"Routing"}}]}
```
