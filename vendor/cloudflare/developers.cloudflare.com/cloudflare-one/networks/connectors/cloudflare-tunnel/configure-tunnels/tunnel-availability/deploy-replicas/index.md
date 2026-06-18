---
title: Deploy cloudflared replicas
description: Deploy cloudflared replicas in Zero Trust networking.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Deploy cloudflared replicas

To deploy multiple instances of `cloudflared`, you can create and configure one tunnel and run it on multiple hosts. If your tunnel runs as a service, only one `cloudflared` instance is allowed per host.

You can run the same tunnel across various `cloudflared` processes for up to 100 connections (25 replicas) per tunnel. Cloudflare Load Balancers and DNS records can still point to the tunnel and its UUID. Traffic will be sent to all `cloudflared` processes associated with the tunnel.

Deploy replicas in Kubernetes

For information about running `cloudflared` in a Kubernetes deployment, refer to the [Kubernetes guide](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/deployment-guides/kubernetes/).

## Remotely-managed tunnels

1. To create a remotely-managed tunnel, follow the [dashboard setup guide](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel/).
2. On the **Tunnels** page, select your newly created tunnel. The tunnel overview page displays all active replicas.
3. Select **Edit**.
4. Select the operating system of the host where you want to deploy a replica.
5. Copy the installation command and run it on the host.

The new replica will appear on the tunnel overview page. All replicas serve the same routes and use the same configuration parameters.

## Locally-managed tunnels

1. To create a locally-managed tunnel, complete Steps 1 through 5 in the [CLI setup guide](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/local-management/create-local-tunnel/).
2. Run your newly created tunnel.  
Terminal window  
```  
cloudflared tunnel run <NAME>  
```  
This will start a `cloudflared` instance and generate a unique `connector_id`.
3. In a separate window or on another host, run the same command again:  
Terminal window  
```  
cloudflared tunnel run <NAME>  
```  
This will initialize another `cloudflared` instance and generate another `connector_id`.
4. Run `tunnel info` to show each `cloudflared` instance running your tunnel:  
Terminal window  
```  
cloudflared tunnel info <NAME>  
```

This will output your tunnel UUID as well as two Connector IDs, one for each `cloudflared` process running your tunnel. With this command, you can also see that your tunnel is now being served by eight connections.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/deploy-replicas/#page","headline":"Deploy cloudflared replicas · Cloudflare One docs","description":"Deploy cloudflared replicas in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/deploy-replicas/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/","name":"Cloudflare Tunnel"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/","name":"Configure a tunnel"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/","name":"Tunnel availability and failover"}},{"@type":"ListItem","position":8,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/deploy-replicas/","name":"Deploy cloudflared replicas"}}]}
```
