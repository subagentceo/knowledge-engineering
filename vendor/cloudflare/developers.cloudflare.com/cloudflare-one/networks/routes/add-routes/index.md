---
title: Add routes
description: Add routes in Zero Trust networking.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Add routes

A route maps an IP address or hostname to a [Cloudflare One connector](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/#connectors) installed on your private network. When a user connects to that IP or hostname through Cloudflare's network, Cloudflare will route their traffic down a secure tunnel to the corresponding resource in your private network.

## Add a CIDR route

CIDR routes define the IP network segments (such as `10.0.0.0/24`) that are reachable via a Cloudflare Tunnel.

Prerequisites

Before you add a CIDR route, ensure you have created a Cloudflare Tunnel using [cloudflared](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel/) or a [Cloudflare Mesh](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/) node.

To add a CIDR route:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Networks** \> **Routes** \> **CIDR**.
2. Select **Add CIDR route**.
3. In **CIDR**, enter the IP address or CIDR range that you wish to route through the tunnel (for example, `10.0.0.1` or `10.0.0.0/24`). This can be a private or public IP.
4. For **Tunnel**, select the Cloudflare Tunnel that is being used to connect your private network to Cloudflare.
5. (Optional) Under **Additional settings**, select a [virtual network](https://developers.cloudflare.com/cloudflare-one/networks/virtual-networks/) for this tunnel route. A virtual network is a private routing domain that provides routing isolation within your account. This step is only needed if the route's IP/CIDR range overlaps with another route in your account. If you do not select a virtual network, the IP route will be assigned to the `default` network.  
Note  
Virtual networks are only supported for `cloudflared` tunnels.
6. Select **Create**.

Cloudflare will now route requests to your private network. However, the route does not automatically capture traffic from end users. To enable client-side connectivity, refer to the [cloudflared](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/connect-cidr/) or[Cloudflare Mesh](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/routes/) setup guides.

## Add a hostname route

Hostname routes steer traffic for a public or private hostname down a Cloudflare Tunnel. This allows users to access internal resources using familiar URLs (such as `wiki.internal.local`) rather than IP addresses.

Prerequisites

Before you add a hostname route, ensure you have created a Cloudflare Tunnel using [cloudflared](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel/).

To add a hostname route:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Networks** \> **Routes** \> **Hostname routes**.
2. Select **Create hostname route**.
3. In **Hostname**, enter the private or public hostname that represents your application (for example, `wiki.internal.local` or `app.bank.com`).
4. For **Tunnel**, select the Cloudflare Tunnel that is being used to connect your private network to Cloudflare.
5. Select **Create**.

Cloudflare will now route requests to your private network. However, the route does not automatically capture traffic from end users. To enable client-side connectivity, refer to the [private hostname](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/connect-private-hostname/) or [public hostname](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/egress-cloudflared/#3-route-network-traffic-through-the-cloudflare-one-client) setup guides.

## Add a published application route

Published application routes expose applications to the Internet via a domain that you have connected to Cloudflare. This allows users to access your applications without needing a VPN or specialized client software.

Prerequisites

Before you publish an application, ensure you have:

* [Created a Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel/) using `cloudflared`.
* [Added a website to Cloudflare](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/).

To add a published application route to an existing tunnel:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Networks** \> **Connectors** \> **Cloudflare Tunnels**.
2. Select your tunnel and select **Edit**.
3. Go to the **Published application routes** tab and select **Add a published application route**.
4. Enter a subdomain and select a **Domain** from the drop-down menu. Specify any subdomain or path information.  
Note  
If you add a multi-level subdomain (more than one level of subdomain), you must [order an Advanced Certificate for the hostname](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/troubleshoot-tunnels/common-errors/#i-see-this-site-cant-provide-a-secure-connection).
5. Under **Service**, choose a [service type](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/protocols/) and specify its URL. For example:  
   * **Type**: _HTTP_  
   * **URL**: `localhost:8000`
6. Under **Additional application settings**, specify any [parameters](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/origin-parameters/) you would like to add to your tunnel configuration.
7. Select **Save**.

Anyone on the Internet can now access the application at the specified hostname. To allow or block specific users, [create an Access application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/).

## Add a WAN route

WAN routes define the IP network segments (such as `10.0.0.0/24`) that are reachable via a GRE or IPsec tunnel. To add a WAN route, refer to the [WAN Connectors documentation](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/how-to/configure-routes/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/routes/add-routes/#page","headline":"Add routes · Cloudflare One docs","description":"Add routes in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/routes/add-routes/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Private networks"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/routes/","name":"Routes"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/routes/add-routes/","name":"Add routes"}}]}
```
