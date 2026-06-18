---
title: What to do when under attack
description: Respond to active DDoS attacks.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# What to do when under attack

## Enable "I'm Under Attack" mode (IAUM)

If you are under attack and have this feature enabled during the attack, visitors will receive an interstitial page for about five seconds while the traffic is analyzed to make sure it is a legitimate human visitor. The vast majority of Layer 7 attack scripts are defeated by IUAM and can be honed via Page Rules.

Refer to [I'm Under Attack Mode ↗](https://developers.cloudflare.com/fundamentals/reference/under-attack-mode/) for more information.

## Change Access Control List (ACL)

An ACL refers to rules that are applied to port numbers or IP addresses that are available on a host permitting use of the service. When you only allow Cloudflare IPs, you eliminate threats attempting to attack your origin IP range.

Refer to [Cloudflare IP Ranges ↗](https://www.cloudflare.com/ips) for more information.

## Change Origin IPs and update Cloudflare DNS records

If your origin is still being attacked, consider moving your Origin IPs and updating your Cloudflare DNS records.

Refer to [Prevent DDoS attacks](https://developers.cloudflare.com/learning-paths/prevent-ddos-attacks/concepts/) for detailed guidance.

Note

To learn about best practices for DDoS protection, review [Proactive DDoS defense](https://developers.cloudflare.com/ddos-protection/best-practices/proactive-defense/).

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/surge-readiness/security/enable-iaum/#page","headline":"What to do when under attack · Cloudflare Learning Paths","description":"Respond to active DDoS attacks.","url":"https://developers.cloudflare.com/learning-paths/surge-readiness/security/enable-iaum/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/surge-readiness/security/","name":"Security"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/surge-readiness/security/enable-iaum/","name":"What to do when under attack"}}]}
```
