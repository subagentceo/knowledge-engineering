---
title: Advanced nameservers
description: Advanced nameserver features for Foundation DNS.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Advanced nameservers

Advanced nameservers included with [Foundation DNS](https://developers.cloudflare.com/dns/foundation-dns/) offer improved resiliency and more consistent nameserver assignment.

Consider the sections below for details about advanced nameservers, and refer to [Set up advanced nameservers](https://developers.cloudflare.com/dns/foundation-dns/setup/) to learn how to enable this feature.

Note

The advantages that come with Foundation DNS [advanced nameservers](https://developers.cloudflare.com/dns/foundation-dns/advanced-nameservers/) are currently not available for [custom nameservers](https://developers.cloudflare.com/dns/nameservers/custom-nameservers/). Make sure you only use one at a time.

Also, [some behaviors are different](https://developers.cloudflare.com/dns/foundation-dns/setup/#differences-from-standard-nameservers) when compared to standard nameservers.

## Anycast network groups

To increase resiliency, the advertisement of advanced nameserver IPs is organized into three anycast network groups.

Two groups consist of IPs advertised from geographically distributed data centers, and a third group consists of IPs advertised from all data centers in the Cloudflare network.

United Kingdom example

| IPs           | Group | Data centers                      |
| ------------- | ----- | --------------------------------- |
| 108.162.198.1 | A     | London and Edinburgh              |
| 172.64.40.1   | B     | Manchester                        |
| 162.159.60.1  | C     | Manchester, London, and Edinburgh |

In DNS resolution, a resolver eventually acquires a list of all IPs where authoritative nameservers for a domain can be reached, and will then usually prefer the IP with the best resolution performance.

When, instead of advertising all IPs in all data centers, this group logic is applied, resiliency is improved because, if one of the data centers experiences a localized issue, the resolver can fall back to an IP advertised by the next closest data center. The third group adds another layer of redundancy, further enhancing resiliency.

Refer to [our blog post ↗](https://blog.cloudflare.com/foundation-dns-launch) for an in-depth explanation of the distributed groups logic.

Note

The IPs assigned to each nameserver are static, meaning they will not change without notification.

## Dedicated release process

Zones using advanced nameservers are less exposed to incidents or software regression.

The dedicated release process means that only changes that have been in production for a while will reach advanced nameservers.

## Nameservers hosting and assignment

While standard Cloudflare nameservers are hosted under `ns.cloudflare.com` or `secondary.cloudflare.com`, advanced nameservers use different domains:

* `foundationdns.com`
* `foundationdns.net`
* `foundationdns.org`

Using the different TLDs (`.com`, `.net`, and `.org`) and making these available only to enterprise accounts allows for better predictability and consistency in nameserver assignment.

There should also be less conflicts when guaranteeing that directly descending zones do not have the same nameserver set.

Descending zones example

Consider the domain `example.com`, and subdomains `abc.example.com` and `123.example.com`:

* `abc.example.com` and `123.example.com` directly descend from `example.com` and cannot have the same nameservers as `example.com`.
* `abc.example.com` and `123.example.com` are sibling domains and can have the same nameservers.
* `new.abc.example.com` directly descends from both `abc.example.com` and `example.com`, and cannot have the same nameservers as them, but can have the same nameservers as `123.example.com`.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/foundation-dns/advanced-nameservers/#page","headline":"Advanced nameservers · Cloudflare DNS docs","description":"Advanced nameserver features for Foundation DNS.","url":"https://developers.cloudflare.com/dns/foundation-dns/advanced-nameservers/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/foundation-dns/","name":"Foundation DNS"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/foundation-dns/advanced-nameservers/","name":"Advanced nameservers"}}]}
```
