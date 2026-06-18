---
title: Proxy traffic through Gateway
description: Route device traffic through Cloudflare Gateway.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Proxy traffic through Gateway

With Cloudflare Gateway, you can log and filter DNS, network, and HTTP traffic from devices running the Cloudflare One Client. This includes traffic to the public Internet and traffic directed to your private network. DNS filtering is enabled by default since the Cloudflare One Client sends DNS queries to Cloudflare's public DNS resolver, [1.1.1.1](https://developers.cloudflare.com/1.1.1.1/). To enable network and HTTP filtering, you will need to allow Cloudflare Gateway to proxy that traffic.

## Enable the proxy

1. Go to **Traffic policies** \> **Traffic settings**.
2. Enable **Allow Secure Web Gateway to proxy traffic** for TCP.
3. (Recommended) To proxy all port `443` traffic, including internal DNS queries, select **UDP**.
4. (Optional) To scan file uploads and downloads for malware, [enable anti-virus scanning](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/antivirus-scanning/).

Cloudflare will now proxy traffic from enrolled devices, except for the traffic excluded in your [split tunnel settings](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/#3-route-private-network-ips-through-the-cloudflare-one-client). For more information on how Gateway forwards traffic, refer to [Gateway proxy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/proxy/).

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/configure-device-agent/enable-proxy/#page","headline":"Proxy traffic through Gateway · Cloudflare Learning Paths","description":"Route device traffic through Cloudflare Gateway.","url":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/configure-device-agent/enable-proxy/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/secure-internet-traffic/configure-device-agent/","name":"Configure the device agent"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/secure-internet-traffic/configure-device-agent/enable-proxy/","name":"Proxy traffic through Gateway"}}]}
```
