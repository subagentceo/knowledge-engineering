---
title: Run pre-flight checks
description: Verify readiness before Magic Transit activation.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Run pre-flight checks

After setting up your Magic Transit product, Cloudflare validates:

* Tunnel connectivity
* Tunnel and endpoint [health checks](https://developers.cloudflare.com/magic-transit/reference/tunnel-health-checks/#types-of-health-checks)
* Letter of Agency (LOA)
* Internet Routing Registry (IRR)
* Maximum segment size (MSS) configurations.

Refer to [Get started](https://developers.cloudflare.com/learning-paths/data-center-protection/get-started/) for information about the above topics.

Configurations for Cloudflare global network are applied and take around one day to rollout.

On your side, you should do the following:

* Confirm that your upstream ISPs do not have [uRPF](https://developers.cloudflare.com/byoip/troubleshooting/#urpf-filtering-and-packet-loss) strict-mode enabled. If they do, ask them to change this setting to uRPF loose mode. Having strict-mode uRPF will result in packet loss when you advertise your prefix from Cloudflare and withdraw your prefix advertisement from your ISP.
* Confirm you have adjusted MSS/MTU value on any IPsec or GRE tunnels with third parties that are configured on your Magic Transit prefix.
* If you are using BGP for Magic Transit prefix advertisement, configure your own alerts/logs for the BGP peerings with Cloudflare route reflectors. Cloudflare will not notify you if these peerings go down, so you should enable this on your equipment using syslog or other event-alerting tools.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/data-center-protection/run-pre-flight-checks/#page","headline":"Run pre-flight checks · Cloudflare Learning Paths","description":"Verify readiness before Magic Transit activation.","url":"https://developers.cloudflare.com/learning-paths/data-center-protection/run-pre-flight-checks/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/data-center-protection/run-pre-flight-checks/","name":"Run pre-flight checks"}}]}
```
