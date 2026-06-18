---
title: Protocol detection
description: Protocol detection in Gateway.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Protocol detection

Gateway supports the detection, logging, and filtering of network protocols using packet attributes.

Protocol detection only applies to devices connected to Cloudflare One via the Cloudflare One Client in [Traffic and DNS mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#traffic-and-dns-mode-default) mode.

## Turn on protocol detection

To turn on protocol detection:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Traffic policies** \> **Traffic settings** \> **Proxy and inspection settings**.
2. Turn on **Allow protocol detection**.

You can now use _Detected Protocol_ as a selector in a [Network policy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/#detected-protocol).

### Inspect on all ports

By default, Gateway will only inspect HTTP traffic through port `80`. Additionally, if you [turn on TLS decryption](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/tls-decryption/#turn-on-tls-decryption), Gateway will inspect HTTPS traffic through port `443`.

To detect and inspect HTTP and HTTPS traffic on ports in addition to `80` and `443`, under **Manage HTTP inspection by port**, choose _Inspect on all ports_.

#### Important considerations

**TLS interception on all ports**: When you turn on this setting, Gateway will attempt to intercept TLS traffic on every port, not just port `443`. This means all applications using TLS on non-standard ports will have their traffic intercepted by the Gateway proxy. If you only want to turn on SNI detection for Network policy filtering without full TLS interception, you will need to create [Do Not Inspect policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/tls-decryption/#do-not-inspect) for the specific applications or domains that use TLS on non-standard ports.

Non-HTTP protocols inside TLS bypass network policy filtering

Once a Network policy allows a TLS connection at Layer 4, Gateway decrypts the TLS traffic. However, Gateway cannot filter non-HTTP protocols inside the TLS connection. All non-HTTPS traffic inside TLS (such as SSH over TLS, database protocols, or custom protocols) is allowed by default with no further filtering applied. If your organization uses a default-block Network policy, Gateway will still allow all non-HTTPS TLS traffic through.

To use HTTP policies to filter all HTTPS traffic on all ports when using a default Block Network policy, [create a Network policy to explicitly allow HTTP and TLS traffic](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/common-policies/#filter-https-traffic-when-inspecting-on-all-ports).

## Supported protocols

Gateway supports detection and filtering of the following protocols:

| Protocol     | Notes                                                                                        |
| ------------ | -------------------------------------------------------------------------------------------- |
| HTTP         | Hypertext Transfer Protocol (HTTP/1.1).                                                      |
| HTTP2        | Hypertext Transfer Protocol Version 2.                                                       |
| SSH          | Secure Shell Protocol — remote login and command execution.                                  |
| TLS          | Transport Layer Security. Gateway detects TLS versions 1.1 through 1.3 with the _TLS_ value. |
| DCERPC       | Distributed Computing Environment / Remote Procedure Call.                                   |
| MQTT         | Message Queuing Telemetry Transport — lightweight IoT messaging protocol.                    |
| TPKT         | TPKT commonly initiates RDP sessions, so you can use it to identify and filter RDP traffic.  |
| IMAP         | Internet Message Access Protocol — email retrieval.                                          |
| POP3         | Post Office Protocol v3 — email retrieval.                                                   |
| SMTP         | Simple Mail Transfer Protocol — email sending.                                               |
| MYSQL        | MySQL database wire protocol.                                                                |
| RSYNC-DAEMON | rsync daemon protocol.                                                                       |
| LDAP         | Lightweight Directory Access Protocol.                                                       |
| NTP          | Network Time Protocol.                                                                       |

## Example network policy

You can create network policies that filter traffic based on protocol detections rather than common ports. For example, you can block all SSH traffic on your network without blocking port 22 or any other non-default ports:

| Selector          | Operator | Value | Action |
| ----------------- | -------- | ----- | ------ |
| Detected Protocol | in       | _SSH_ | Block  |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/protocol-detection/#page","headline":"Protocol detection · Cloudflare One docs","description":"Protocol detection in Gateway.","url":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/protocol-detection/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-22","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SSH"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/traffic-policies/","name":"Traffic policies"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/traffic-policies/network-policies/","name":"Network policies"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/traffic-policies/network-policies/protocol-detection/","name":"Protocol detection"}}]}
```
