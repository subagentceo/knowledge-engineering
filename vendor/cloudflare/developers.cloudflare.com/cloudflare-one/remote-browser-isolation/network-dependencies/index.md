---
title: Browser Isolation with firewall
description: Reference information for Browser Isolation with firewall in Browser Isolation.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Browser Isolation with firewall

If your organization uses a firewall or other policies to restrict Internet traffic, you may need to make a few changes to allow Browser Isolation to connect.

## Remoting client

Isolated pages are served by the remoting client — the software component in the user's browser that loads, displays, and communicates with the remote browser session. This client communicates to Cloudflare's network via HTTPS and WebRTC.

### Remoting Client (Services)

The remoting client provides static assets and API endpoints. For Browser Isolation to function, you must allow:

* HTTPS traffic to `*.browser.run` on port `443`

#### Clientless Web Isolation

Users connecting through Clientless Web Isolation also require connectivity to Cloudflare Access. For users to connect to Access, you must allow:

* HTTPS traffic to `https://<team-name>.cloudflareaccess.com` on port `443`

### WebRTC channel

Browser Isolation uses WebRTC (a real-time communication protocol) for low-latency communication between the local browser and the remote browser. WebRTC uses UDP rather than TCP, which means this traffic does not flow through standard HTTP/HTTPS proxy settings. The connecting device must have direct UDP connectivity to the IP ranges listed below.

In order to pass WebRTC traffic, the remoting client must be able to connect to the following IP addresses:

| IP range                                                                                           | Port range    | Protocol |
| -------------------------------------------------------------------------------------------------- | ------------- | -------- |
| IPv4: 162.159.201.10 - 162.159.201.255  IPv4: 172.64.73.0 - 172.64.73.255  IPv6: 2606:4700:f2::/48 | 10000 - 59999 | UDP      |

Each remote browser instance is randomly assigned a port, and the port that a user is allocated to will change often and without notice.

Note

WebRTC traffic does not flow through proxies specified in local browser HTTP/HTTPS proxy settings. The connecting device needs to be able to directly connect to the WebRTC IP ranges.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/network-dependencies/#page","headline":"Browser Isolation with firewall · Cloudflare One docs","description":"Reference information for Browser Isolation with firewall in Browser Isolation.","url":"https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/network-dependencies/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["UDP"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/remote-browser-isolation/","name":"Remote browser isolation"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/remote-browser-isolation/network-dependencies/","name":"Browser Isolation with firewall"}}]}
```
