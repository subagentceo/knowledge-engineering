---
title: Setup
description: Create your first Cloudflare Tunnel and publish an application in under 5 minutes.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/tunnel/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Setup

Create a Cloudflare Tunnel and publish your first application in under 5 minutes.

## Prerequisites

* A [Cloudflare account ↗](https://dash.cloudflare.com/sign-up)
* A [domain on Cloudflare](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/) (required to publish applications)
* A server or VM with internet access where you will install `cloudflared`

Tip

If your server is behind a restrictive firewall, verify it can reach Cloudflare on port `7844` before proceeding. Refer to [Connection errors](https://developers.cloudflare.com/tunnel/troubleshooting/#connection-errors).

## Create a tunnel

To create a new Cloudflare Tunnel:

* [ Dashboard ](#tab-panel-11004)
* [ API ](#tab-panel-11005)

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Networking** \> **Tunnels**.  
[ Go to **Tunnels** ](https://dash.cloudflare.com/?to=/:account/tunnels)
2. Select **Create Tunnel**.
3. Enter a name for your tunnel (for example, `production-web` or `staging-api`).
4. Select **Create Tunnel**.
5. Under **Setup Environment**, select the operating system and architecture of your server.
6. Copy the install commands shown under **Install and Run** and run them in a terminal on your server.
7. Once the tunnel connects, select **Continue**.

Your tunnel should appear on the **Tunnels** page with a `Healthy` [status](https://developers.cloudflare.com/tunnel/monitoring/#tunnel-health).

1. [Create an API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with the following permissions:  
| Type    | Item              | Permission |  
| ------- | ----------------- | ---------- |  
| Account | Cloudflare Tunnel | Edit       |  
| Zone    | DNS               | Edit       |
2. Create a tunnel:  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `Cloudflare One Connectors Write`  
   * `Cloudflare One Connector: cloudflared Write`  
   * `Cloudflare Tunnel Write`  
Create a Cloudflare Tunnel  
```  
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cfd_tunnel" \  
  --request POST \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  
  --json '{  
    "name": "api-tunnel",  
    "config_src": "cloudflare"  
  }'  
```
3. Copy the `id` and `token` values from the response. You will need them to configure and run the tunnel.

## Publish an application

To make an application accessible from the Internet, add a published application route to your tunnel. The tunnel route maps a public hostname to a local service.

* [ Dashboard ](#tab-panel-11006)
* [ API ](#tab-panel-11007)

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Networking** \> **Tunnels** and select your tunnel. [ Go to **Tunnels** ](https://dash.cloudflare.com/?to=/:account/tunnels)
2. Under **Routes**, select **Add route**.
3. Select **Published application**.
4. Under **Hostname**, enter a subdomain and select a domain from the drop-down menu.
5. For **Service URL**, enter the local address and port of your application.  
For example, if your web server runs on the same machine as `cloudflared`:  
   * HTTP on port `80`: `http://localhost:80`  
   * HTTPS on port `443`: `https://localhost:443`  
If your web server runs on a different machine: `http://192.0.2.1:80`
6. Select **Add route**.

1. Configure your tunnel's ingress rules:  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `Cloudflare One Connectors Write`  
   * `Cloudflare One Connector: cloudflared Write`  
   * `Cloudflare Tunnel Write`  
Put configuration  
```  
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cfd_tunnel/$TUNNEL_ID/configurations" \  
  --request PUT \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  
  --json '{  
    "config": {  
        "ingress": [  
            {  
                "hostname": "app.example.com",  
                "service": "http://localhost:80",  
                "originRequest": {}  
            },  
            {  
                "service": "http_status:404"  
            }  
        ]  
    }  
  }'  
```  
Your ingress rules must include a catch-all rule at the end. In this example, `cloudflared` will respond with a 404 status code when the request does not match any hostname.
2. Create a DNS record for your application:  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `DNS Write`  
Create DNS Record  
```  
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \  
  --request POST \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  
  --json '{  
    "type": "CNAME",  
    "proxied": true,  
    "name": "app.example.com",  
    "content": "<TUNNEL_ID>.cfargotunnel.com"  
  }'  
```
3. Install `cloudflared` on your server and run the tunnel using the `token` obtained in [Create a tunnel](https://developers.cloudflare.com/tunnel/setup/#create-a-tunnel):  
   * [ Linux ](#tab-panel-11000)  
   * [ Windows ](#tab-panel-11001)  
   * [ macOS ](#tab-panel-11002)  
   * [ Docker ](#tab-panel-11003)  
   1. [Download and install ↗](https://pkg.cloudflare.com/index.html) `cloudflared`.  
   2. Run the following command:  
   Terminal window  
   ```  
   sudo cloudflared service install <TUNNEL_TOKEN>  
   ```  
   1. [Download and install](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/downloads/#windows) `cloudflared`.  
   2. Open Command Prompt as administrator.  
   3. Run the following command:  
   ```  
   cloudflared.exe service install <TUNNEL_TOKEN>  
   ```  
   1. [Download and install](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/downloads/#macos) `cloudflared`.  
   2. Open a terminal window and run the following command:  
   Terminal window  
   ```  
   sudo cloudflared service install <TUNNEL_TOKEN>  
   ```  
   1. Open a terminal window.  
   2. Run the following command:  
   Terminal window  
   ```  
   docker run cloudflare/cloudflared:latest tunnel --no-autoupdate run --token <TUNNEL_TOKEN>  
   ```

Your application is now live at the hostname you configured. Cloudflare automatically proxies traffic through its network, applying CDN caching, WAF, and DDoS protection.

Note

Non-HTTP services (SSH, TCP, RDP) require `cloudflared` on the client side. Refer to the [protocols reference](https://developers.cloudflare.com/tunnel/routing/#supported-protocols) for details.

## Quick tunnels (development)

For local development, you can instantly expose localhost without a Cloudflare account:

Terminal window

```

cloudflared tunnel --url http://localhost:8080


```

This generates a random `trycloudflare.com` subdomain that proxies traffic to your local server. Quick tunnels are for testing only — they have a 200 concurrent request limit and do not support Server-Sent Events (SSE).

For production use, [create a tunnel](#create-a-tunnel) instead.

## Next steps

* [Routing](https://developers.cloudflare.com/tunnel/routing/) — Configure DNS records, load balancers, and protocol support.
* [Configuration](https://developers.cloudflare.com/tunnel/configuration/) — Deploy replicas, manage tokens, and tune performance.
* [Deployment guides](https://developers.cloudflare.com/tunnel/deployment-guides/) — Deploy on Kubernetes, AWS, GCP, Terraform, and more.
* [Troubleshooting](https://developers.cloudflare.com/tunnel/troubleshooting/) — Resolve common errors and connectivity issues.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/tunnel/setup/#page","headline":"Set up Cloudflare Tunnel · Cloudflare Docs","description":"Create your first Cloudflare Tunnel and publish an application in under 5 minutes.","url":"https://developers.cloudflare.com/tunnel/setup/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/tunnel/","name":"Cloudflare Tunnel"}},{"@type":"ListItem","position":3,"item":{"@id":"/tunnel/setup/","name":"Setup"}}]}
```
