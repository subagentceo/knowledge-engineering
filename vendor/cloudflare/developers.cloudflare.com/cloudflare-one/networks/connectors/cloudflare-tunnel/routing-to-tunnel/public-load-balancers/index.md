---
title: Public load balancers
description: How Public load balancers works in Zero Trust networking.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Public load balancers

A [public load balancer](https://developers.cloudflare.com/load-balancing/load-balancers/) allows you to distribute traffic across the servers that are running your [published applications](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/).

When you add a [published application route](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel/#2a-publish-an-application) to your Cloudflare Tunnel, Cloudflare generates a subdomain of `cfargotunnel.com` with the UUID of the created tunnel. You can add the application to a load balancer pool by using `<UUID>.cfargotunnel.com` as the [endpoint address](https://developers.cloudflare.com/load-balancing/understand-basics/load-balancing-components/#endpoints) and specifying the application hostname (`app.example.com`) in the [endpoint host header](https://developers.cloudflare.com/load-balancing/additional-options/override-http-host-headers/). Load Balancer does not support directly adding `app.example.com` as an endpoint if the service is behind Cloudflare Tunnel.

## Create a public load balancer

### Prerequisites

* A Cloudflare Tunnel with a [published application route](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel/#2a-publish-an-application)

### Create a load balancer

To create a load balancer for Cloudflare Tunnel published applications:

1. In the Cloudflare dashboard, go to the **Load Balancing** page.  
[ Go to **Load Balancing** ](https://dash.cloudflare.com/?to=/:account/load-balancing)
2. Select **Create load balancer**, then select **Public load balancer**.
3. Under **Select website**, select the domain of your published application route.
4. On the **Hostname** page, enter a hostname for the load balancer (for example, `lb.example.com`).
5. On the **Pools** page, select **Create a pool** and enter a descriptive name.
6. Add a tunnel endpoint with the following values:  
   * **Endpoint Name**: Name of the server running the application  
   * **Endpoint Address**: `<UUID>.cfargotunnel.com` (find the Tunnel ID in the \[Cloudflare dashboard\](https://dash.cloudflare.com/) under \*\*Zero Trust\*\* > \*\*Networks\*\* > \*\*Connectors\*\* > \*\*Cloudflare Tunnels\*\*)  
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

Refer to the [Load Balancing documentation](https://developers.cloudflare.com/load-balancing/) for more details on load balancer settings and configurations.

### Optional Cloudflare settings

The application will default to the Cloudflare settings for the load balancer hostname, including [Rules](https://developers.cloudflare.com/rules/), [Cache Rules](https://developers.cloudflare.com/cache/how-to/cache-rules/) and [WAF rules](https://developers.cloudflare.com/waf/). You can change the settings for your hostname in the [Cloudflare dashboard ↗](https://dash.cloudflare.com/).

## Common architectures

Review common load balancing configurations for published applications behind Cloudflare Tunnel.

### One app per load balancer

For this example, assume we have a web application that runs on servers in two different data centers. We want to connect the application to Cloudflare so that users can access the application from anywhere in the world. Additionally, we want Cloudflare to load balance between the servers such that if the primary server fails, the secondary server receives all traffic.

graph LR
		subgraph LB["Public load balancer <br> app.example.com "]
			subgraph P1[Pool 2]
				E1(["**Endpoint:** &lt;UUID_1&gt;.cfargotunnel.com<br> **Host header**: server2.example.com"])
			end
			subgraph P2[Pool 1]
				E2(["**Endpoint:** &lt;UUID_2&gt;.cfargotunnel.com<br> **Host header**: server1.example.com"])
			end
		end
		R@{ shape: text, label: "app.example.com" }
		R--> LB
    P1 -- Tunnel 1 --> cf1
    P2 -- Tunnel 2 --> cf2
		subgraph D2[Private network]
			subgraph r1[Region eu-west-1]
			cf1@{ shape: processes, label: "cloudflared <br> **Route:** server2.example.com" }
			S1(["Server 2<br> 10.0.0.1:80"])
			cf1-->S1
			end
			subgraph r2[Region us-east-1]
			cf2@{ shape: processes, label: "cloudflared <br> **Route:** server1.example.com" }
			S3(["Server 1 <br> 10.0.0.2:80"])
			cf2-->S3
			end
		end

		style r1 stroke-dasharray: 5 5
		style r2 stroke-dasharray: 5 5

As shown in the diagram, a typical setup includes:

* A dedicated Cloudflare Tunnel per data center.
* One load balancer pool per tunnel. The load balancer hostname is set to the user-facing application hostname (`app.example.com`).
* One load balancer endpoint per pool. The endpoint host header is set to the `cloudflared` published application hostname (`server1.example.com`)
* At least two `cloudflared` [replicas](#session-affinity-and-replicas) per tunnel in their respective data centers, in case a `cloudflared` host machine goes down.

Users can now connect to the application using the load balancer hostname (`app.example.com`). Note that this configuration is only valid for [Active-Passive failover](https://developers.cloudflare.com/load-balancing/load-balancers/common-configurations/#active---passive-failover), since each pool only supports one endpoint per tunnel.

### Multiple apps per load balancer

The following diagram illustrates how to steer traffic to two different applications on a private network using a single load balancer.

graph LR
		subgraph LB["Public load balancer <br> lb.example.com"]
			subgraph P1[Pool for App 1]
				E1(["**Endpoint:** &lt;UUID_1&gt;.cfargotunnel.com<br> **Host header**: app1.example.com"])
				E2(["**Endpoint:** &lt;UUID_2&gt;.cfargotunnel.com<br> **Host header**: app1.example.com"])
			end
			subgraph P2[Pool for App 2]
				E3(["**Endpoint:** &lt;UUID_1&gt;.cfargotunnel.com<br> **Host header**: app2.example.com"])
				E4(["**Endpoint:** &lt;UUID_2&gt;.cfargotunnel.com<br> **Host header**: app2.example.com"])
			end
		end
		R@{ shape: text, label: "app1.example.com <br> app2.example.com" }
		R--> LB
    E1 -- Tunnel 1 -->cf1
		E3 -- Tunnel 1 --> cf1
		E2 -- Tunnel 2 --> cf2
		E4 -- Tunnel 2 --> cf2

		subgraph N[Private network]
			cf2[cloudflared <br> **Route:** app1.example.com <br> **Route:** app2.example.com]
			S3(["App 1 <br> 10.0.0.1:80"])
			cf2-->S3
			cf2-->S1
			cf1[cloudflared <br> **Route:** app1.example.com <br> **Route:** app2.example.com]
			S1(["App 2 <br> 10.0.0.2:80"])
			cf1-->S1
			cf1-->S3
		end

This load balancing setup includes:

* Two Cloudflare Tunnels with identical routes to both applications.
* One load balancer pool per application.
* Each load balancer pool has an endpoint per tunnel.
* A [DNS record](#dns-records) for each application that points to the load balancer hostname.

Users can now access all applications through the load balancer. Since there are multiple tunnel endpoints per pool, this configuration supports [Active-Active Failover](https://developers.cloudflare.com/load-balancing/load-balancers/common-configurations/#active---active-failover). Active-Active uses all available endpoints in the pool to process requests simultaneously, providing better performance and scalability by load balancing traffic across them.

#### DNS records

When you configure a published application route via the dashboard, Cloudflare will automatically generate a `CNAME` DNS record that points the application hostname (`app1.example.com`) to the tunnel subdomain (`<UUID>.cfargotunnel.com`). You can [edit these DNS records](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/#edit-dns-records) so that they point to the load balancer hostname instead.

Note

Tunnel routes configured via the API or CLI require [manually creating DNS records](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/dns/).

Here is an example of what your DNS records will look like before and after setting up [Multiple apps per load balancer](#multiple-apps-per-load-balancer):

**Before**:

| Type  | Name | Content                    |
| ----- | ---- | -------------------------- |
| CNAME | app1 | <UUID\_1>.cfargotunnel.com |
| CNAME | app2 | <UUID\_1>.cfargotunnel.com |
| CNAME | app1 | <UUID\_2>.cfargotunnel.com |
| CNAME | app2 | <UUID\_2>.cfargotunnel.com |

**After**:

| Type  | Name           | Content        |
| ----- | -------------- | -------------- |
| LB    | lb.example.com | n/a            |
| CNAME | app1           | lb.example.com |
| CNAME | app2           | lb.example.com |

## Known limitations

### Monitors and TCP tunnel origins

TCP monitors are not supported for tunnel endpoints. Instead, create a health check endpoint on the `cloudflared` host and use an HTTPS monitor. For example, you can use `cloudflared` to return a fixed HTTP status response:

1. [Add a published application route](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel/#2a-publish-an-application) for the health check:  
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

### Session affinity and replicas

The load balancer does not distinguish between [replicas](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/) of the same tunnel. If you run the same tunnel UUID on two separate hosts, the load balancer treats both hosts as a single endpoint. To maintain [session affinity](https://developers.cloudflare.com/load-balancing/understand-basics/session-affinity/) between a client and a particular host, you will need to connect each host to Cloudflare using a different tunnel UUID.

### Local connection preference

If you notice traffic imbalances across endpoints in different locations, you may need to adjust your load balancer configuration.

Cloudflare uses [Anycast routing ↗](https://www.cloudflare.com/learning/cdn/glossary/anycast-network/) to direct end user requests to the nearest data center. `cloudflared` prefers to serve requests using connections in the same data center, which can affect how traffic is distributed across endpoints.

If you run [cloudflared replicas](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/) on the same tunnel UUID, consider switching to separate tunnels for more granular control over [traffic steering](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/public-load-balancers/#page","headline":"Public load balancers · Cloudflare One docs","description":"How Public load balancers works in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/public-load-balancers/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["DNS"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/","name":"Cloudflare Tunnel"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/","name":"Published applications"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/public-load-balancers/","name":"Public load balancers"}}]}
```
