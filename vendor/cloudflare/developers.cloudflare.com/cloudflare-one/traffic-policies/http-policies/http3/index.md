---
title: HTTP/3 inspection
description: How HTTP/3 inspection works in Gateway.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# HTTP/3 inspection

HTTP/3 uses the QUIC protocol over UDP instead of TCP. Because Gateway's default proxy only handles TCP traffic, HTTP/3 inspection requires turning on the UDP proxy. Without it, HTTP/3 traffic bypasses HTTP inspection. [Network policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/) still apply to the underlying UDP traffic.

Gateway applies HTTP policies to HTTP/3 traffic last. For more information, refer to the [order of enforcement](https://developers.cloudflare.com/cloudflare-one/traffic-policies/order-of-enforcement/#http3-traffic).

## Turn on HTTP/3 inspection

Before you can inspect any HTTPS traffic, you must deploy a [user-side certificate](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/user-side-certificates/) to your devices and turn on [TLS decryption](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/tls-decryption/). To inspect HTTP/3 traffic, you must also turn on the [Gateway proxy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/proxy/) for UDP.

To turn on the Gateway proxy for UDP and TLS decryption:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Traffic policies** \> **Traffic settings**.
2. In **Proxy and inspection**, turn on **Allow Secure Web Gateway to proxy traffic**.
3. Select **TCP** and **UDP**.
4. Turn on **TLS decryption**.

### Application limitations

Gateway can inspect HTTP/3 traffic from Mozilla Firefox and Microsoft Edge by establishing an HTTP/3 proxy connection. Gateway will then terminate the HTTP/3 connection, decrypt and inspect the traffic, and connect to the destination server over HTTP/2\. Gateway can also inspect other HTTP applications, such as cURL.

If both the UDP proxy and TLS decryption are turned on, Google Chrome will automatically cancel HTTP/3 connections and retry them over HTTP/2, which Gateway can inspect. If either the UDP proxy or TLS decryption is turned off, HTTP/3 traffic from Chrome bypasses inspection entirely.

Warning

If you do not turn on the UDP proxy, HTTP/3 traffic from browsers other than Chrome will bypass HTTP policy enforcement. Network policies still apply.

## Exempt HTTP/3 traffic from inspection

If you require HTTP/3 traffic with end-to-end encryption from the client to the origin while still using the Gateway proxy, you can create a [Do Not Inspect HTTP policy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/#do-not-inspect) to match the desired traffic. Using a Do Not Inspect policy allows HTTP/3 traffic to preserve proxy performance and end-to-end encryption by bypassing Gateway's TLS decryption and inspection.

## Force HTTP/2 traffic

To apply Gateway policies to HTTP traffic without turning on the UDP proxy, you must turn off QUIC in your users' browsers to ensure only HTTP/2 traffic reaches Gateway.

Google Chrome

1. Go to `chrome://flags`
2. Set **Experimental QUIC protocol** to _Disabled_.
3. Relaunch Chrome.

Safari

You cannot turn off QUIC in Safari. All traffic will be sent over HTTP/3.

Firefox

1. Go to `about:config`.
2. If you receive a warning, select **Accept the Risk and Continue**.
3. Set **network.http.http3.enable** to _false_.
4. Relaunch Firefox.

Microsoft Edge

1. Go to `edge://flags`
2. Set **Experimental QUIC protocol** to _Disabled_.
3. Relaunch Edge.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/http3/#page","headline":"HTTP/3 inspection · Cloudflare One docs","description":"How HTTP/3 inspection works in Gateway.","url":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/http3/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-22","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["QUIC","UDP"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/traffic-policies/","name":"Traffic policies"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/traffic-policies/http-policies/","name":"HTTP policies"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/traffic-policies/http-policies/http3/","name":"HTTP/3 inspection"}}]}
```
