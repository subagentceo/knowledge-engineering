---
title: Exposed IP addresses
description: Understand and resolve warnings about DNS records that expose your origin server IP address.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Exposed IP addresses

When your DNS records are [proxied](https://developers.cloudflare.com/dns/proxy-status/), Cloudflare speeds up and protects your site.

A `dig` query against your proxied apex domain returns a Cloudflare IP address. This way, your origin server's IP address remains concealed from the public. Proxy benefits only apply to HTTP traffic.

When your server's IP address is exposed, your server is more vulnerable to direct attacks. It is still possible (but more difficult) for attackers to determine your origin server IP address when proxying traffic to Cloudflare.

---

## Dashboard warnings

The Cloudflare dashboard displays warnings when DNS records may expose your origin server's IP address. These warnings do not block or affect traffic to your site.

When your zone has DNS records that are not proxied, the **DNS Records** page displays the following banner:

`Proxying is required for most security and performance features. Set your DNS records to proxied by clicking "Edit" in the table below, to benefit from DDoS protection, security rules, caching, and more.`

Individual DNS records may also display warnings. The specific message depends on whether the record can be proxied.

---

## DNS records that should be proxied

Cloudflare recommends [proxying](https://developers.cloudflare.com/dns/proxy-status/) any record that handles HTTP traffic so that a `dig` query returns a Cloudflare IP address instead of your origin server IP address.

To take advantage of Cloudflare's performance and security benefits, proxy `A`, `AAAA`, and `CNAME` records.

---

## DNS records that should be DNS-only

Some DNS records need to remain DNS-only. For example, you may have to host multiple services (for example, a website and email) on the same physical server.

When a DNS-only record points to the same origin server as a proxied record, a `dig` query against that record reveals your origin server's IP address. This makes it easier for potential attackers to target your origin server directly.

To mitigate this risk:

* Analyze the impact of hosting multiple services on the same origin server in cases when you cannot avoid having DNS-only records.
* Proxy all records that share the same origin IP address as your apex domain and can be safely proxied through Cloudflare.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/manage-dns-records/troubleshooting/exposed-ip-address/#page","headline":"Exposed IP addresses · Cloudflare DNS docs","description":"Understand and resolve warnings about DNS records that expose your origin server IP address.","url":"https://developers.cloudflare.com/dns/manage-dns-records/troubleshooting/exposed-ip-address/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Proxying"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/manage-dns-records/","name":"DNS records"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/manage-dns-records/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":5,"item":{"@id":"/dns/manage-dns-records/troubleshooting/exposed-ip-address/","name":"Exposed IP addresses"}}]}
```
