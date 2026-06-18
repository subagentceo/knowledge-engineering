---
title: Tunnel tokens
description: Manage tunnel authentication tokens for remote and local tunnels.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/tunnel/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Tunnel tokens

A remotely-managed tunnel only requires a token to run. Anyone with the token can run the tunnel.

## Get the token

To get the token for a remotely-managed tunnel:

* [ Dashboard ](#tab-panel-10978)
* [ API ](#tab-panel-10979)

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Networking** \> **Tunnels**.  
[ Go to **Tunnels** ](https://dash.cloudflare.com/?to=/:account/tunnels)
2. Select your tunnel.
3. Select **Add a replica**.
4. Copy the `cloudflared` installation command into a text editor (do not run the command). The token is the `eyJ...` string.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Cloudflare One Connectors Write`
* `Cloudflare One Connector: cloudflared Write`
* `Cloudflare Tunnel Write`

Get a Cloudflare Tunnel token

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cfd_tunnel/$TUNNEL_ID/token" \

  --request GET \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

## Rotate a token

Rotate tokens regularly to reduce the risk of compromise. For tunnels with multiple [replicas](https://developers.cloudflare.com/tunnel/configuration/#replicas-and-high-availability), rotate outside working hours and update replicas in batches.

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Networking** \> **Tunnels**.  
[ Go to **Tunnels** ](https://dash.cloudflare.com/?to=/:account/tunnels)
2. Select your tunnel.
3. Select **Rotate token**. After rotating the token, `cloudflared` cannot establish new connections with the old token. Existing connectors remain active until restarted.
4. Select **Add replica** and copy the new `cloudflared` installation command.
5. On each replica, reinstall the `cloudflared` service using the new token:  
Terminal window  
```  
sudo cloudflared service uninstall  
sudo cloudflared service install <NEW_TOKEN>  
```

Rotate a compromised token

If your tunnel token is compromised, immediately [rotate the token](#rotate-a-token), then force-disconnect all existing connections:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Cloudflare One Connectors Write`
* `Cloudflare One Connector: cloudflared Write`
* `Cloudflare Tunnel Write`

Clean up Cloudflare Tunnel connections

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cfd_tunnel/$TUNNEL_ID/connections" \

  --request DELETE \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

Then reinstall the `cloudflared` service on all replicas using the new token.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/tunnel/advanced/tunnel-tokens/#page","headline":"Tunnel tokens · Cloudflare Docs","description":"Manage tunnel authentication tokens for remote and local tunnels.","url":"https://developers.cloudflare.com/tunnel/advanced/tunnel-tokens/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Authentication"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/tunnel/","name":"Cloudflare Tunnel"}},{"@type":"ListItem","position":3,"item":{"@id":"/tunnel/advanced/","name":"Advanced"}},{"@type":"ListItem","position":4,"item":{"@id":"/tunnel/advanced/tunnel-tokens/","name":"Tunnel tokens"}}]}
```
