---
title: Create a tunnel (dashboard)
description: Create a tunnel (dashboard) in Zero Trust networking.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Create a tunnel (dashboard)

Follow this step-by-step guide to create your first [remotely-managed tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/tunnel-useful-terms/#remotely-managed-tunnel) using Cloudflare One.

Tip

If your server is behind a restrictive firewall, verify it can reach Cloudflare on port `7844` before proceeding. Refer to [Connectivity pre-checks](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/troubleshoot-tunnels/connectivity-prechecks/).

## 1\. Create a tunnel

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and go to **Zero Trust** \> **Networks** \> **Connectors** \> **Cloudflare Tunnels**.
2. Select **Create a tunnel**.
3. Choose **Cloudflared** for the connector type and select **Next**.
4. Enter a name for your tunnel. We suggest choosing a name that reflects the type of resources you want to connect through this tunnel (for example, `enterprise-VPC-01`).
5. Select **Save tunnel**.
6. Next, you will need to install `cloudflared` and run it. To do so, check that the environment under **Choose an environment** reflects the operating system on your machine, then copy the command in the box below and paste it into a terminal window. Run the command.
7. Once the command has finished running, your connector will appear in Cloudflare One.  
![Connector appearing in the UI after cloudflared has run](https://developers.cloudflare.com/_astro/connector.BnVS4T_M_ZxLFu6.webp)
8. Select **Next**.

The next steps depend on whether you want to [publish an application to the Internet](#2a-publish-an-application) or [connect a private network](#2b-connect-a-network).

## 2a. Publish an application

Follow these steps to publish an application to the Internet. If you are looking to connect a private resource, skip to the [Connect a network](#2b-connect-a-network) section.

Prerequisites

Before you publish an application through your tunnel, you must [add a website to Cloudflare](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/).

To add a published application when creating a new tunnel:

1. Go to the **Published applications** tab.
2. Enter a subdomain and select a **Domain** from the drop-down menu. Specify any subdomain or path information.  
Note  
If you add a multi-level subdomain (more than one level of subdomain), you must [order an Advanced Certificate for the hostname](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/troubleshoot-tunnels/common-errors/#i-see-this-site-cant-provide-a-secure-connection).
3. Under **Service**, choose a [service type](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/protocols/) and specify its URL. For example,  
   * **Type**: _HTTP_  
   * **URL**: `localhost:8000`
4. Under **Additional application settings**, specify any [parameters](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/origin-parameters/) you would like to add to your tunnel configuration.  
![Example of a published application route in the Cloudflare One dashboard](https://developers.cloudflare.com/_astro/published-app.CZQbD1Bb_ZFOOUB.webp)
5. Select **Save**.

Anyone on the Internet can now access the application at the specified hostname. To allow or block specific users, [create an Access application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/).

## 2b. Connect a network

To connect a private network through your tunnel:

1. Go to the **CIDR** tab.
2. In **CIDR**, enter the private IP address or CIDR range of your service (for example, `10.0.0.1` or `10.0.0.0/24`).
3. Select **Complete setup**.

`cloudflared` can now route traffic to these destination IPs. To configure Zero Trust policies and connect as a user, refer to [Connect an IP/CIDR](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/).

Note

If you would like to route to a private application using its hostname instead of its IP, refer to [Connect a private hostname](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/connect-private-hostname/).

## 3\. View your tunnel

After saving the tunnel, you will be redirected to the **Networks** \> **Connectors** page. Your tunnel should be listed with a `Healthy` status. If your tunnel status is `Inactive`, `Down`, or `Degraded`, refer to the [troubleshooting documentation](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/troubleshoot-tunnels/common-errors/#tunnel-status) for recommended next steps.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel/#page","headline":"Create a tunnel (dashboard) · Cloudflare One docs","description":"Create a tunnel (dashboard) in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Private networks"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/","name":"Cloudflare Tunnel"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/","name":"Get started"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel/","name":"Create a tunnel (dashboard)"}}]}
```
