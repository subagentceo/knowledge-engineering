---
title: Nameservers
description: Manage Cloudflare nameservers for your zones.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Nameservers

Nameservers are DNS servers that answer DNS queries about the domains they are authoritative for. When a visitor types your domain into a browser, the [DNS resolution process ↗](https://www.cloudflare.com/learning/dns/what-is-dns/) passes through several server types and eventually reaches the authoritative nameservers for the final answer.

In the context of Cloudflare DNS, nameservers refer to authoritative nameservers — the servers that hold the definitive DNS records for your domain and provide the final response in DNS resolution. When a nameserver is authoritative for `example.com`, DNS resolvers will consider responses from this nameserver when a user tries to access `example.com`.

Note

The IPs assigned to each nameserver are static, meaning they will not change without notification.

## Authoritative nameservers offering

Within Cloudflare, and depending on your plan, you can choose between using Cloudflare-branded nameservers or setting up your own custom nameservers. The names for Cloudflare-branded nameservers are automatically assigned and cannot be changed.

Regardless of the type you choose, for these nameservers to be authoritative for your domain, you need to [update your domain nameservers](https://developers.cloudflare.com/dns/nameservers/update-nameservers/), typically where you registered your domain. Updating your nameservers is required to activate your domain on Cloudflare and use most of Cloudflare's [application services](https://developers.cloudflare.com/fundamentals/concepts/how-cloudflare-works/), such as proxying, caching, and security features.

Cloudflare Registrar

If you acquired your domain from [Cloudflare Registrar](https://developers.cloudflare.com/registrar/), your domain already uses Cloudflare nameservers, automatically protecting and speeding up your content or services. If you need to update your nameservers to use a different DNS provider, you will have to [transfer your domain from Cloudflare](https://developers.cloudflare.com/registrar/account-options/transfer-out-from-cloudflare/).

### Standard nameservers

Unless your account has a specific [DNS zone defaults](https://developers.cloudflare.com/dns/additional-options/dns-zone-defaults/) configuration, when you add a domain on a [primary (full)](https://developers.cloudflare.com/dns/zone-setups/full-setup/) or [secondary](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/) DNS setup, Cloudflare automatically assigns two standard nameservers for your zone.

Standard nameservers are hosted on `ns.cloudflare.com` and follow the pattern `<proper_name>.ns.cloudflare.com`.

To know the reason behind these nameserver names, refer to [our blog ↗](https://blog.cloudflare.com/whats-the-story-behind-the-names-of-cloudflares-name-servers/).

### Advanced nameservers

Enterprise accounts on [Foundation DNS](https://developers.cloudflare.com/dns/foundation-dns/) have access to advanced nameservers.

[Advanced nameservers](https://developers.cloudflare.com/dns/foundation-dns/advanced-nameservers/) are hosted on `foundationdns.com`, `foundationdns.net`, and `foundationdns.org`.

Each zone that uses advanced nameservers is assigned a set of three nameservers names: `<color>.foundationdns.com`, `<color>.foundationdns.net`, and `<color>.foundationdns.org`.

### Custom nameservers

With [custom nameservers](https://developers.cloudflare.com/dns/nameservers/custom-nameservers/), your nameservers are hosted on your own domain (or domains) and, in this sense, are not Cloudflare branded.

You provide fully qualified domain names — complete domain names like `ns1.example.com` — for your nameservers, and Cloudflare assigns one IPv4 and one IPv6 address to each.

Warning

The advantages that come with Foundation DNS [advanced nameservers](https://developers.cloudflare.com/dns/foundation-dns/advanced-nameservers/) are currently not available for [custom nameservers](https://developers.cloudflare.com/dns/nameservers/custom-nameservers/). Make sure you only use one at a time.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/nameservers/#page","headline":"Nameservers · Cloudflare DNS docs","description":"Manage Cloudflare nameservers for your zones.","url":"https://developers.cloudflare.com/dns/nameservers/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-22","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/nameservers/","name":"Nameservers"}}]}
```
