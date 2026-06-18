---
title: Non-identity on-ramps
description: Non-identity on-ramps in Browser Isolation.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Non-identity on-ramps

On-ramps are the methods used to route traffic from your network to Cloudflare for inspection. With Cloudflare One, you can isolate HTTP traffic from on-ramps such as [proxy endpoints](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/) (which your browser connects to via PAC files to send traffic through Gateway) or [Cloudflare WAN](https://developers.cloudflare.com/cloudflare-wan/zero-trust/cloudflare-gateway/) (formerly Magic WAN, which connects your network to Cloudflare through GRE or IPsec tunnels). Since these on-ramps do not require users to log in to the Cloudflare One Client, [identity-based policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/identity-selectors/) are not supported.

Note

If you want to apply Isolate policies based on user identity, you will need to either install the [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) or manually redirect users to the [Clientless Web Isolation](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/setup/clientless-browser-isolation/) URL.

## Set up non-identity browser isolation

1. [Install a Cloudflare certificate](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/user-side-certificates/) on your devices.
2. Connect your infrastructure to Gateway using one of the following on-ramps:  
   * Configure your browser to forward traffic to a Gateway proxy endpoint with [PAC files](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/) (Proxy Auto-Configuration files that tell the browser which traffic to route through the proxy).  
   * Connect your enterprise site router to Gateway with the [anycast GRE or IPsec tunnel on-ramp to Cloudflare WAN](https://developers.cloudflare.com/cloudflare-wan/zero-trust/cloudflare-gateway/) (site-to-site encrypted tunnels between your network and Cloudflare).
3. Enable non-identity browser isolation:  
   1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Browser isolation** \> **Browser isolation settings**.  
   2. Turn on **Allow isolated HTTP traffic when user identity is unknown**.
4. Build a non-identity [HTTP policy](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/isolation-policies/) to isolate websites in a remote browser.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/setup/non-identity/#page","headline":"Non-identity on-ramps · Cloudflare One docs","description":"Non-identity on-ramps in Browser Isolation.","url":"https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/setup/non-identity/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/remote-browser-isolation/","name":"Remote browser isolation"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/remote-browser-isolation/setup/","name":"Set up Browser Isolation"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/remote-browser-isolation/setup/non-identity/","name":"Non-identity on-ramps"}}]}
```
