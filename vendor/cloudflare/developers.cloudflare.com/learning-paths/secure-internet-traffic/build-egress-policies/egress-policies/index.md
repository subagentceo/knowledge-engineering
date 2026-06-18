---
title: Use egress policies to deliver consistent egress IPs
description: Create egress policies for IP consistency.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Use egress policies to deliver consistent egress IPs

Note

Only available on Enterprise plans.

Egress policies allow you to determine whether your organization's traffic egresses via the default Cloudflare IP or via a [dedicated egress IP](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/dedicated-egress-ips/) assigned to your account.

To create a new egress policy:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Traffic policies** \> **Egress policies**.
2. Select **Add a policy**.
3. Name the policy.
4. Build a logical expression that defines the traffic you want to control egress for. For example, you can add a policy to configure all traffic destined for a third-party network to use a static source IP:  
| Policy name                 | Selector       | Operator | Value          | Egress method                   |  
| --------------------------- | -------------- | -------- | -------------- | ------------------------------- |  
| Access third-party provider | Destination IP | is       | 198.51.100.158 | Dedicated Cloudflare egress IPs |  
| Primary IPv4 address | IPv6 address  |  
| -------------------- | ------------- |  
| 203.0.113.88         | 2001:db8::/32 |
5. Select **Create policy**.

For more information, refer to [Egress policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/build-egress-policies/egress-policies/#page","headline":"Use egress policies to deliver consistent egress IPs · Cloudflare Learning Paths","description":"Create egress policies for IP consistency.","url":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/build-egress-policies/egress-policies/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-05-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/secure-internet-traffic/build-egress-policies/","name":"Control traffic egress with source IP anchoring and allowlisting"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/secure-internet-traffic/build-egress-policies/egress-policies/","name":"Use egress policies to deliver consistent egress IPs"}}]}
```
