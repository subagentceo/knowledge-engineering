---
title: Published applications
description: How Published applications works in Zero Trust networking.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Published applications

Cloudflare Tunnel allows you to publish local applications to the Internet via a public hostname. For example, you can [add a published application route](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel/#2a-publish-an-application) that points `docs.example.com` to `https://localhost:8080`. Anyone can now view your application by going to `docs.example.com` in their web browser.

Cloudflare can route traffic down your Cloudflare Tunnel using a [DNS record](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/dns/) or [Cloudflare Load Balancer](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/public-load-balancers/). You can configure either option from the Cloudflare dashboard by pointing a DNS `CNAME` record or a load balancer pool to your Cloudflare Tunnel subdomain (`<UUID>.cfargotunnel.com`). You can also associate these records with your tunnel from `cloudflared` directly.

Note

You do not need a paid Cloudflare Access plan to publish an application via Cloudflare Tunnel. [Access seats](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/seat-management/) are only required if you want to [secure the application using Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/), such as requiring users to log in via an identity provider.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/#page","headline":"Published applications · Cloudflare One docs","description":"How Published applications works in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/","name":"Cloudflare Tunnel"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/","name":"Published applications"}}]}
```
