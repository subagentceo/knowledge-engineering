---
title: Egress IPs
description: Reference information for Egress IPs in Email Security.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Egress IPs

When Email Security processes inbound messages through an [MX/Inline deployment](https://developers.cloudflare.com/cloudflare-one/email-security/setup/pre-delivery-deployment/mx-inline-deployment/), it re-delivers the messages to your mailbox from its own IP addresses, known as egress IPs (the source addresses Cloudflare sends outbound mail from). Your existing email provider (such as Microsoft 365 or Google Workspace) needs to be configured to accept connections from these addresses, otherwise it will reject the messages as coming from an unauthorized sender.

Add all of the following addresses to your mail provider's IP allowlist.

Additional information for Microsoft 365

Microsoft 365 does not support IPv6 addresses or the following IPv4 ranges:

* `104.30.32.0/19`
* `134.195.26.0/23`

If you use Microsoft 365, use the individual `/24` blocks (256 addresses each) listed in [Microsoft 365 /24 addresses](#microsoft-365-24-addresses) instead.

### IPv4

```

52.11.209.211

52.89.255.11

52.0.67.109

54.173.50.115

104.30.32.0/19

158.51.64.0/26

158.51.65.0/26

134.195.26.0/23

35.157.195.63

52.58.35.43


```

### IPv6

```

2405:8100:c400::/38


```

## Microsoft 365 `/24` addresses

Use these IPv4 addresses for Microsoft 365, instead of the `/19` and `/23` subnets:

```

104.30.32.0/24

104.30.33.0/24

104.30.34.0/24

104.30.35.0/24

104.30.36.0/24

104.30.37.0/24

104.30.38.0/24

104.30.39.0/24

104.30.40.0/24

104.30.41.0/24

104.30.42.0/24

104.30.43.0/24

104.30.44.0/24

104.30.45.0/24

104.30.46.0/24

104.30.47.0/24

104.30.48.0/24

104.30.49.0/24

104.30.50.0/24

104.30.51.0/24

104.30.52.0/24

104.30.53.0/24

104.30.54.0/24

104.30.55.0/24

104.30.56.0/24

104.30.57.0/24

104.30.58.0/24

104.30.59.0/24

104.30.60.0/24

104.30.61.0/24

104.30.62.0/24

104.30.63.0/24

134.195.26.0/24

134.195.27.0/24


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/email-security/setup/pre-delivery-deployment/egress-ips/#page","headline":"Egress IPs · Cloudflare One docs","description":"Reference information for Egress IPs in Email Security.","url":"https://developers.cloudflare.com/cloudflare-one/email-security/setup/pre-delivery-deployment/egress-ips/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/email-security/","name":"Email security"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/email-security/setup/","name":"Before you begin"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/email-security/setup/pre-delivery-deployment/","name":"Pre-delivery deployment"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/email-security/setup/pre-delivery-deployment/egress-ips/","name":"Egress IPs"}}]}
```
