---
title: What is DNS filtering?
description: Learn how DNS filtering blocks threats.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# What is DNS filtering?

DNS filtering is a technique to block access to websites or online content. DNS filtering is implemented by specialized DNS resolvers (such as Cloudflare Gateway) that allow you to define a blocklist of domains or content categories. The DNS resolver acts as a filter by refusing to resolve queries for domains on the blocklist, thus preventing users from loading those websites.

## Purpose of DNS filtering

DNS filtering is commonly used to:

* Protect school data from phishing, ransomware, and malware.
* Block websites that go against school acceptable use policy, such as adult content, gambling, and piracy.
* Restrict access to websites that may impact student productivity, such as gaming, social media, and video streaming.

## How DNS filtering works

DNS filtering involves configuring your browser, device, or router to send all DNS requests to a DNS filtering service. The DNS filtering service checks the domain or IP against your DNS policies. If the domain or IP matches a block policy, the DNS filtering service can redirect the request to an alternative IP address or block it altogether. The diagram below shows the logic for Cloudflare Gateway's DNS filtering service.

flowchart LR
accTitle: DNS filtering
A[Browser] --  What is the IP address of www.example.com? --> B

subgraph ide1 [Cloudflare Gateway]
    direction TB
    B(DNS policies)-.->C((DNS resolver))
end
C --> D[(Nameservers)]

flowchart TD
accTitle: DNS filtering logic
A[Blocked by DNS policy?] --Yes --> B[Block page is configured?] --Yes--> C[Return IP of block page]
B--No-->E[Return 0.0.0.0]
A --No --> D[Return IP of www.example.com]

## DNS filtering vs. Secure Web Gateway

A URL assumes the form: `protocol://subdomain.domain.tld:port/path?query`

DNS filtering only applies to the hostname — `subdomain.domain.tld`. You cannot block specific protocols, ports, paths, or query types. Additionally, users can bypass DNS policies if they already know the IP address of the website, or by connecting through a Virtual Private Network (VPN) or proxy server.

Secure Web Gateways (SWGs) offer a greater set of capabilities, including:

* [URL filtering ↗](https://www.cloudflare.com/learning/access-management/what-is-url-filtering/) to block specific paths and queries
* L4 firewalls to block ports and protocols
* Antivirus scanning
* [Data loss prevention ↗](https://www.cloudflare.com/learning/access-management/what-is-dlp/)
* [Browser isolation ↗](https://www.cloudflare.com/learning/access-management/what-is-browser-isolation/)

However, this can make SWGs more complex to deploy. Therefore, many organizations will start with DNS filtering as an initial layer of defense against Internet threats.

## Related resources

* For more background information on DNS filtering, refer to our [Learning Center ↗](https://www.cloudflare.com/learning/access-management/what-is-dns-filtering/).

## Next steps

In the remaining modules, you will learn how to set up DNS filtering on your devices using Cloudflare Gateway.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/cybersafe/concepts/what-is-dns-filtering/#page","headline":"What is DNS filtering? · Cloudflare Learning Paths","description":"Learn how DNS filtering blocks threats.","url":"https://developers.cloudflare.com/learning-paths/cybersafe/concepts/what-is-dns-filtering/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/cybersafe/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/cybersafe/concepts/what-is-dns-filtering/","name":"What is DNS filtering?"}}]}
```
