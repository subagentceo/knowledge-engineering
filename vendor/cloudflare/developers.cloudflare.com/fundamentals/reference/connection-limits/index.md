---
title: Connection limits
description: Review TCP and HTTP connection timeouts between clients, Cloudflare, and origin servers, including keep-alive and request limits.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Connection limits

When HTTP/HTTPS traffic is [proxied through Cloudflare](https://developers.cloudflare.com/fundamentals/concepts/how-cloudflare-works/#cloudflare-as-a-reverse-proxy), there are often two established [TCP connections](https://developers.cloudflare.com/fundamentals/reference/tcp-connections/): the first is between the requesting client to Cloudflare and the second is between Cloudflare and the origin server. Each connection has their own set of TCP and HTTP limits, which are documented below.

## Between client and Cloudflare

| Type                           | Limit (seconds) | HTTP status code at limit | Configurable |
| ------------------------------ | --------------- | ------------------------- | ------------ |
| Connection Keep-Alive HTTP/1.1 | 400             | TCP connection closed     | No           |
| Connection Idle HTTP/2         | 400             | TCP connection closed     | No           |

## Between Cloudflare and origin server

Note

If you are using [Cloudflare tunnels](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/), refer to [Origin configuration](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/configure-tunnels/origin-parameters/) to view or modify your connection settings.

| Type                    | Limit (seconds) | HTTP status code at limit                                                                                           | [Configurable](https://developers.cloudflare.com/fundamentals/reference/connection-limits/#configurable-limits)        |
| ----------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Complete TCP Connection | 19              | [522](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/error-522/) | No                                                                                                                     |
| TCP ACK Timeout         | 90              | [522](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/error-522/) | No                                                                                                                     |
| TCP Keep-Alive Interval | 30              | [520](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/error-520/) | No                                                                                                                     |
| Proxy Idle Timeout      | 900             | [520](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/error-520/) | No                                                                                                                     |
| Proxy Read Timeout      | 120             | [524](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/error-524/) | [Yes, for Enterprise zones](https://developers.cloudflare.com/api/resources/zones/subresources/settings/methods/edit/) |
| Proxy Write Timeout     | 30              | [524](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/error-524/) | No                                                                                                                     |
| HTTP/2 Pings to Origin  | Off             | \-                                                                                                                  | Yes                                                                                                                    |
| HTTP/2 Connection Idle  | 900             | No                                                                                                                  | No                                                                                                                     |

## Configurable limits

Some TCP connections can be customized for Enterprise customers. Reach out to your account team for more details.

## Keep-Alives

Cloudflare maintains keep-alive connections to improve performance and reduce cost of recurring TCP connects in the request transaction as Cloudflare proxies customer traffic from its global network to the site's origin server.

Ensure HTTP keep-alive connections are enabled on your origin. Cloudflare reuses open TCP connections up to the `Proxy Idle Timeout` limit after the last HTTP request. Origin web servers close TCP connections if too many are open. HTTP keep-alive helps avoid connection resets for requests proxied by Cloudflare.

## Request limits

URLs have a limit of 16 KB. Request headers have a total limit of 128 KB.

## Response limits

Response headers observe a total limit of 128 KB.

## Cache limits

Refer to the [Cache documentation](https://developers.cloudflare.com/cache/concepts/default-cache-behavior/#customization-options-and-limits) for more details about the max upload size and the cacheable file size limits.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/reference/connection-limits/#page","headline":"Connection limits · Cloudflare Fundamentals docs","description":"Review TCP and HTTP connection timeouts between clients, Cloudflare, and origin servers, including keep-alive and request limits.","url":"https://developers.cloudflare.com/fundamentals/reference/connection-limits/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/reference/connection-limits/","name":"Connection limits"}}]}
```
