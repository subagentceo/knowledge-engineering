---
title: About
description: Learn about random prefix attacks. As part of DNS Firewall, Cloudflare can protect your upstream authoritative nameservers from these attacks.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# About

Random prefix attacks are when someone sends a lot of traffic to subdomains that are highly unlikely to exist (`12345.example.com`, `abcdefg.example.com`), but are still associated with your main domain (`example.com`).

Usually, a DNS query to each random subdomain (or prefix) is not repeated, so it cannot be cached by resolvers or any other proxies and always reaches the authoritative nameservers. Rate limiting or blocking queries based on source IP can introduce a high amount of false positives, since random prefix attacks commonly are conducted via public resolvers. This makes these attacks particularly effective and hard to mitigate.

  
## Attack characteristics

### Queries for nonexistent domains

If the request only involved nonexistent domains, the `NXDOMAIN` errors would only be served by the top-level domain (TLD) nameservers for `com.`. This means that the queries never reach the authoritative nameservers.

    flowchart TD
      accTitle: Random prefix attacks diagram
      A[End user query to <code>example.com</code>] --"1)"--> B[<code>1.1.1.1 resolver</code>]
      B --"2)"--> C[<code>com.</code> TLD NS]
      C --"3)" <code>NXDOMAIN error</code>--> B
      B --"4)" <code>NXDOMAIN error</code>--> A
      D[Authoritative NS]

  
### Queries for nonexistent subdomains

These attacks are successful because they target subdomains, which require a response from a domain's authoritative nameservers.

    flowchart TD
      accTitle: Random prefix attacks diagram
      A[End user query to <code>random.example.com</code>] --"1)"--> B[<code>1.1.1.1 resolver</code>]
      B -- "2)" --> C[<code>com.</code> TLD NS]
      C -- "3)" Query Authoritative NS --> B
      B -- "4)" --> D[Authoritative NS]
      D --"5)" <code>NXDOMAIN error</code>--> B
      B --"6)" <code>NXDOMAIN error</code>--> A

  
With an attack against a subdomain of an existing domain, the resolver is forced to fully resolve it against the authoritative nameservers since these random subdomains are likely not cached by the resolver or any other proxy. If an attacker sends enough of these queries, and the authoritative nameservers cannot handle the query load, it will become unresponsive or even fall over, taking all zones it is hosting down, not just the attacked zone.

This attack is difficult to mitigate for a few reasons. From the perspective of the authoritative nameservers, the attacker appears to be Cloudflare (`1.1.1.1`) since that is the source of the queries. Blocking Cloudflare is not an option since that will block legitimate traffic.

## Solution

When you [enable random prefix attack mitigations](https://developers.cloudflare.com/dns/dns-firewall/random-prefix-attacks/setup/), Cloudflare monitors incoming queries for potential random prefix attacks.

When we detect an attack, we will temporarily stop querying your upstream nameservers for subdomains, sub-subdomains, and more. Cloudflare will then respond with cached responses (if their TTL has not yet expired).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/dns-firewall/random-prefix-attacks/about/#page","headline":"About random prefix attacks - DNS Firewall · Cloudflare DNS docs","description":"Learn about random prefix attacks. As part of DNS Firewall, Cloudflare can protect your upstream authoritative nameservers from these attacks.","url":"https://developers.cloudflare.com/dns/dns-firewall/random-prefix-attacks/about/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/dns-firewall/","name":"DNS Firewall"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/dns-firewall/random-prefix-attacks/","name":"Random prefix attack mitigation"}},{"@type":"ListItem","position":5,"item":{"@id":"/dns/dns-firewall/random-prefix-attacks/about/","name":"About"}}]}
```
