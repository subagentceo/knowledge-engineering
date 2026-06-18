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

* [ Dashboard ](#tab-panel-9116)
* [ Terraform (v5) ](#tab-panel-9117)

1. Go to **Traffic policies** \> **Traffic settings**.
2. In **Proxy and inspection**, turn on **Allow Secure Web Gateway to proxy traffic**.
3. Select **TCP**.
4. Select **UDP** (required to proxy traffic to internal DNS resolvers).
5. (Recommended) To proxy traffic for diagnostic tools such as `ping` and `traceroute`, select **ICMP**. You may also need to [update your system](https://developers.cloudflare.com/cloudflare-one/traffic-policies/proxy/#icmp) to allow ICMP traffic through `cloudflared`.

1. Add the following permission to your [cloudflare\_api\_token ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/api%5Ftoken):  
   * `Zero Trust Write`
2. Turn on the TCP and/or UDP proxy using the [cloudflare\_zero\_trust\_device\_settings ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Fdevice%5Fsettings) resource:  
```  
resource "cloudflare_zero_trust_device_settings "global_warp_settings" {  
  account_id            = var.cloudflare_account_id  
  gateway_proxy_enabled = true  
  gateway_udp_proxy_enabled = true  
}  
```

Cloudflare will now proxy traffic from enrolled devices, except for the traffic excluded in your [split tunnel settings](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/#3-route-private-network-ips-through-the-cloudflare-one-client). For more information on how Gateway forwards traffic, refer to [Gateway proxy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/proxy/).

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/replace-vpn/configure-device-agent/enable-proxy/#page","headline":"Proxy traffic through Gateway · Cloudflare Learning Paths","description":"Route device traffic through Cloudflare Gateway.","url":"https://developers.cloudflare.com/learning-paths/replace-vpn/configure-device-agent/enable-proxy/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/replace-vpn/configure-device-agent/","name":"Configure the device agent"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/replace-vpn/configure-device-agent/enable-proxy/","name":"Proxy traffic through Gateway"}}]}
```
