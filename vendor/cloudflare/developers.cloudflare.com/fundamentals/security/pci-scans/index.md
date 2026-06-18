---
title: Scan for PCI compliance
description: Run PCI compliance scans against your origin server or Cloudflare proxy and interpret the results.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Scan for PCI compliance

Note

Cloudflare is PCI certified as a Data Processor. Refer to [PCI compliance and vulnerabilities mitigation](https://developers.cloudflare.com/ssl/reference/compliance-and-vulnerabilities) and Cloudflare's PCI DSS Responsibility Matrix for more information.

PCI scanners are tools used to identify security weaknesses. When a business undergoes a compliance audit, PCI scan results are used for compliance verification.

## Initiate a scan

1. Identify which server your scan should target. Are you scanning against your origin server, where your applications are hosted, or at a proxy server sitting in front of your origin, such as Cloudflare?
2. On your scanner tool, enter a public URL or an IP address. If you enter a public website URL, the scanner will resolve the hostname and scan the resulting the IP address. To scan your origin server, be sure to enter your origin server's IP address or a hostname that resolves to the origin server's IP, not a proxy server.
3. Start the scan and analyze the results.
4. (Optional) Run another scan for a different origin server.

### Open ports versus blocked traffic

Cloudflare's anycast network operates in a way that keeps ports other than 80 and 443 open, allowing it to serve traffic for other customers on these ports.

However, customers can easily block all unwanted traffic to these ports by using Cloudflare [WAF Managed Rules](https://developers.cloudflare.com/fundamentals/reference/network-ports/#how-to-block-traffic-on-additional-ports) or [custom rules](https://developers.cloudflare.com/waf/custom-rules/). The PCI scan will show the ports being open, but the traffic will not reach your origin server. This concern is often misunderstood.

## Additional resources

You can find all our public compliance resources in the following pages:

* [Certifications and compliance resources ↗](https://www.cloudflare.com/trust-hub/compliance-resources/)
* [Compliance documentation](https://developers.cloudflare.com/fundamentals/reference/policies-compliances/compliance-docs/)

You can access Compliance documents in the Cloudflare dashboard by selecting your account where you are a Super Administrator and then navigating to **Support** \> **Compliance Documents**.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/security/pci-scans/#page","headline":"Scan for PCI compliance · Cloudflare Fundamentals docs","description":"Run PCI compliance scans against your origin server or Cloudflare proxy and interpret the results.","url":"https://developers.cloudflare.com/fundamentals/security/pci-scans/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/security/","name":"Security"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/security/pci-scans/","name":"Scan for PCI compliance"}}]}
```
