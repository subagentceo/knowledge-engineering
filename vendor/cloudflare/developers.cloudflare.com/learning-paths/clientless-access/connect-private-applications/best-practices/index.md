---
title: Best practices
description: Follow recommended deployment best practices.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Best practices

We recommend following these best practices when you deploy Cloudflare Tunnel for clientless access.

## Deploy another instance of cloudflared

For an additional point of availability, add a [cloudflared replica](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/tunnel-availability/) to another host machine in your network.

## Standardize public hostnames

To make your applications easier to manage, standardize the public hostnames that you publish your applications on. Here are a few examples of how customers manage their public hostnames:

* Delegate a subdomain of your primary public website to use for internal applications (for example, `tools.dev.customer.com`).
* If your internal DNS infrastructure is available for public use, register your internal primary DNS record on Cloudflare and use this domain for your public hostname routes. This allows you to present applications on identical private and public hostnames.
* Specify some sort of internal logic that generates hostnames based on the type of tool you are connecting. For example, if you have a set of applications in a US-East datacenter allocated explicitly for production resources, you could create subdomains of `tools.us-east.prod.ztproject.com`.

## Disable TLS verification

If your public hostname route serves an `HTTPS` application, we recommend enabling [**No TLS Verify**](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/origin-parameters/#notlsverify) to reduce connectivity issues caused by mismatched certificates. **No TLS Verify** disables TLS verification between `cloudflared` and the origin service, meaning that `cloudflared` will accept any certificate that the origin service provides. This setting has no impact on traffic between the user's browser and the `cloudflared` host, which will always be encrypted.

## (Optional) Add `Host` header to accommodate local traffic management tools

If your target application sits behind a load balancer or similar, you may need to set [**HTTP Host Header**](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/origin-parameters/#httphostheader) to the service hostname. Load balancers in between the origin service and `cloudflared` can be difficult to troubleshoot, and you can typically resolve the issue by adding a request header to match the way that the load balancer typically identifies traffic.

## Enable tunnel notifications

[Enable notifications](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/monitor-tunnels/notifications/) in the Cloudflare dashboard to monitor tunnel health.

## Update cloudflared

[Update cloudflared](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/downloads/update-cloudflared/) regularly to get the latest features and bug fixes.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/clientless-access/connect-private-applications/best-practices/#page","headline":"Best practices · Cloudflare Learning Paths","description":"Follow recommended deployment best practices.","url":"https://developers.cloudflare.com/learning-paths/clientless-access/connect-private-applications/best-practices/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/clientless-access/connect-private-applications/","name":"Connect your private applications"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/clientless-access/connect-private-applications/best-practices/","name":"Best practices"}}]}
```
