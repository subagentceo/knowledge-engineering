---
title: Network ports
description: Review the HTTP and HTTPS ports Cloudflare proxies by default and how to enable proxy support for additional ports.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Network ports

Learn which network ports Cloudflare proxies by default and how to enable Cloudflare's proxy for additional ports.

## Network ports compatible with Cloudflare's proxy

By default, Cloudflare proxies traffic destined for the HTTP/HTTPS ports listed below.

HTTP ports supported by Cloudflare

* 80
* 8080
* 8880
* 2052
* 2082
* 2086
* 2095

HTTPS ports supported by Cloudflare

* 443
* 2053
* 2083
* 2087
* 2096
* 8443

Ports supported by Cloudflare, but with caching disabled

* 2052
* 2053
* 2082
* 2083
* 2086
* 2087
* 2095
* 2096
* 8880
* 8443

Note

Enterprise customers that want to enable caching on these ports can do so by creating a [cache rule](https://developers.cloudflare.com/cache/how-to/cache-rules/settings/#caching-on-port-enterprise-only).

## How to enable Cloudflare's proxy for additional ports

If traffic for your domain is destined for a different port than the ones listed above, for example you have an SSH server that listens for incoming connections on port 22, either:

* Change your subdomain to be [gray-clouded](https://developers.cloudflare.com/dns/proxy-status/), via your Cloudflare DNS app, to bypass the Cloudflare network and connect directly to your origin.
* Configure a [Spectrum application](https://developers.cloudflare.com/spectrum/get-started/) for the hostname running the server. Spectrum supports all ports. Spectrum for all TCP and UDP ports is only available on the Enterprise plan. If you would like to know more about Cloudflare plans, please reach out to your Cloudflare account team.

## How to block traffic on additional ports

Block traffic on ports other than 80 and 443 in Cloudflare paid plans by doing one of the following:

* If you are using [WAF managed rules (previous version)](https://developers.cloudflare.com/waf/reference/legacy/old-waf-managed-rules/), enable rule ID `100015` (`Anomaly:Port - Non Standard Port (not 80 or 443)`).
* If you are using the new [Cloudflare Web Application Firewall (WAF)](https://developers.cloudflare.com/waf/), enable rule ID ...664ed6fe  (`Anomaly:Port - Non Standard Port (not 80 or 443)`), which is disabled by default. This rule is part of the Cloudflare Managed Ruleset.

Ports 80 and 443 are the only ports compatible with:

* HTTP/HTTPS traffic within China data centers for domains that have the **China Network** enabled

Due to the nature of Cloudflare's anycast network, ports other than `80` and `443` will be open so that Cloudflare can serve traffic for other customers on these ports. In general, Cloudflare makes available several different products on [Cloudflare IPs ↗](https://www.cloudflare.com/ips), so you can expect tools like Netcat and security scanners to report these non-standard ports as open in specific conditions. If you have questions on security compliance, review [Cloudflare's certifications and compliance resources ↗](https://www.cloudflare.com/en-gb/trust-hub/compliance-resources/) and contact your Cloudflare enterprise account manager for more information.

  
The WAF's [Cloudflare Managed Ruleset](https://developers.cloudflare.com/waf/managed-rules/reference/cloudflare-managed-ruleset/) includes a rule that will block traffic at the application layer (layer 7 in the [OSI model ↗](https://www.cloudflare.com/learning/ddos/glossary/open-systems-interconnection-model-osi/)), preventing HTTP/HTTPS requests over non-standard ports from reaching the origin server.

Note

[Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/) does not support port numbers in URLs. Port numbers are stripped from requests for URLs protected through Cloudflare Access.

## Related resources

* [Managing DNS records at Cloudflare](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/reference/network-ports/#page","headline":"Network ports · Cloudflare Fundamentals docs","description":"Review the HTTP and HTTPS ports Cloudflare proxies by default and how to enable proxy support for additional ports.","url":"https://developers.cloudflare.com/fundamentals/reference/network-ports/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/reference/network-ports/","name":"Network ports"}}]}
```
