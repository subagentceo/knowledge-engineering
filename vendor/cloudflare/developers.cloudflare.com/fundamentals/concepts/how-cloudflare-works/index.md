---
title: How Cloudflare DNS works
description: Understand how Cloudflare acts as your authoritative DNS provider and reverse proxy to optimize, cache, and protect your web traffic.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# How Cloudflare DNS works

To optimize your website or web application, Cloudflare provides [DNS ↗](https://www.cloudflare.com/learning/dns/what-is-dns/) and [CDN ↗](https://www.cloudflare.com/learning/cdn/what-is-a-cdn/) services, so we can [reverse proxy ↗](https://www.cloudflare.com/learning/cdn/glossary/reverse-proxy/) the web traffic to and from your domain.

## DNS explained

The Domain Name System (DNS) acts as the Internet's phonebook, translating domain names (for example, `cloudflare.com`) into numerical Internet Protocol (IP) addresses (for example, `103.21.244.0`).

The IP address is like a home address of where a website lives, and the domain name is the human-readable name.

A DNS query is like asking for directions to a place, and the DNS records are the source-of-truth for what exists where. DNS records live in authoritative [DNS servers ↗](https://www.cloudflare.com/learning/dns/dns-server-types/) and provide information about a domain, such as the [IP addresses ↗](https://www.cloudflare.com/learning/dns/glossary/what-is-my-ip-address/) of the servers that host the web content and services on that domain. With this information, Internet browsers know where to find a website or app, so they can render it for visitors using [HTTP ↗](https://www.cloudflare.com/learning/ddos/glossary/hypertext-transfer-protocol-http/).

## Cloudflare as a DNS provider

When you onboard your website or application to Cloudflare, Cloudflare becomes the primary authoritative DNS provider for your domain. As the primary authoritative DNS provider, Cloudflare responds to DNS queries for your domain, and you manage your domain's DNS records via the Cloudflare dashboard or API.

Note

Cloudflare only becomes the primary authoritative DNS provider when you use the default, full DNS setup. For alternative options, refer to [DNS setups](https://developers.cloudflare.com/dns/zone-setups/).

If your [domain's status](https://developers.cloudflare.com/dns/zone-setups/reference/domain-status/) is active and the queried DNS record is set to `proxied`, Cloudflare responds with an [anycast IP address](https://developers.cloudflare.com/fundamentals/concepts/cloudflare-ip-addresses/), instead of the origin IP address defined in your DNS table.

Your domain status is active when your [nameservers are updated](https://developers.cloudflare.com/dns/nameservers/update-nameservers/) to point to Cloudflare and have been authenticated. The [proxy status](https://developers.cloudflare.com/dns/proxy-status/) defines how Cloudflare treats queries for specific DNS records. The [anycast IP address](https://developers.cloudflare.com/fundamentals/concepts/cloudflare-ip-addresses/) is used to distribute traffic amongst Cloudflare's network, which protects your website or app from [DDoS ↗](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/) and other attacks, while optimizing site speed.

## Cloudflare as a reverse proxy

A reverse proxy is a network of servers that sits in front of web servers and either forwards requests to those web servers, or handles requests on behalf of the web servers. Reverse proxies are typically implemented to help increase security, performance, and reliability of websites and web applications.

![The flow of a request from a server through Cloudflare to the origin server when Cloudflare is a reverse proxy.](https://developers.cloudflare.com/_astro/reverse-proxy.BUdeHa1B_18p3wj.webp) 

When Cloudflare receives a DNS query for your domain, the response is determined by the configuration [set in your DNS table](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/), including the [type of the record](https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/), the record's [proxy eligibility](https://developers.cloudflare.com/dns/proxy-status/limitations/#proxy-eligibility), and its [proxy status](https://developers.cloudflare.com/dns/proxy-status/#proxied-records).

When DNS records in your DNS table have a `proxied` status, the record's HTTP/HTTPS traffic will route through Cloudflare on its way between the client and the origin server. If the domain's status is active, all HTTP/HTTPS requests for proxied DNS records route through Cloudflare.

Using Cloudflare as a reverse proxy has several benefits, including:

* **Load balancing** A reverse proxy can provide a load balancing solution which distributes incoming traffic evenly among different servers to prevent any single server from becoming overloaded. In the event that a server fails completely, other servers can step up to handle the traffic.
* **Protection from attacks.** With a reverse proxy in place, a web site or service never needs to reveal the IP address of their origin servers, which makes it much harder for attackers to leverage a targeted attack against them, such as a DDoS attack. Instead the attackers will only be able to target the reverse proxy, such as Cloudflare's CDN, which will have tighter security and more resources to fend off a cyber attack.
* **Caching.** A reverse proxy can also cache content, resulting in faster performance. For example, if a user in Paris visits a reverse-proxied website with web servers in Los Angeles, the user might actually connect to a local reverse proxy server in Paris, which will then have to communicate with an origin server in L.A. The proxy server can then cache (or temporarily save) the response data. Subsequent Parisian users who browse the site will then get the locally cached version from the Parisian reverse proxy server, resulting in much faster performance.
* **SSL encryption.** SSL/TLS is essential. Without an SSL/TLS certificate, your visitors will find a warning on their browser stating your website or application is not secure. However, encrypting and decrypting SSL (or TLS) communications for each client can be computationally expensive for an origin server. A reverse proxy can be configured to decrypt all incoming requests and encrypt all outgoing responses, freeing up valuable resources on the origin server.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/concepts/how-cloudflare-works/#page","headline":"How Cloudflare DNS works · Cloudflare Fundamentals docs","description":"Understand how Cloudflare acts as your authoritative DNS provider and reverse proxy to optimize, cache, and protect your web traffic.","url":"https://developers.cloudflare.com/fundamentals/concepts/how-cloudflare-works/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/concepts/how-cloudflare-works/","name":"How Cloudflare DNS works"}}]}
```
