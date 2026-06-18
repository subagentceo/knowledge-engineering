---
title: Concepts
description: Understand key DNS concepts with Cloudflare's technical documentation. Learn about nameservers, DNS records, DNSSEC, and more.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Concepts

The Domain Name System (DNS) translates human-readable domain names (like `example.com`) into IP addresses that computers use to locate each other on the Internet. This page covers key DNS concepts used throughout the Cloudflare DNS documentation. For more concepts and broader descriptions, refer to the [Cloudflare Learning Center ↗](https://www.cloudflare.com/learning/dns/what-is-dns/).

## Domain

Also known as domain name, a domain is the string of text that identifies a specific website, such as `google.com` or `facebook.com`. Every time you access a website from your web browser, a DNS query (a lookup request to translate the domain into an address) takes place and the DNS service maps the domain to the actual IP address where the website is [hosted](https://developers.cloudflare.com/fundamentals/manage-domains/).

## Registrar

Before you can start using the Cloudflare DNS service, you must first have a domain. You obtain a domain through a registrar, a service that handles the reservation of domain names as explained in the [Learning Center ↗](https://www.cloudflare.com/learning/dns/glossary/what-is-a-domain-name-registrar/).

Very often the same company that offers domain registration also offers web hosting and DNS management.

You can register a domain name at cost (without markup fees) through [Cloudflare Registrar](https://developers.cloudflare.com/registrar/). Every domain acquired through Cloudflare Registrar must also use Cloudflare as their [primary authoritative DNS](#authoritative-dns).

## Nameserver

DNS resolution — the process of translating a domain name into an IP address — involves several types of servers. In this documentation, nameserver usually refers to the Cloudflare authoritative nameservers, the servers that hold the definitive DNS records for your domain and provide the final answer in DNS resolution. For more context on the different server types involved, refer to the [article about DNS server types ↗](https://www.cloudflare.com/learning/dns/dns-server-types/).

Refer to [Nameservers](https://developers.cloudflare.com/dns/nameservers/) for details on the different nameserver offerings.

## Authoritative DNS

Authoritative DNS refers to the service whose nameservers provide the final answer mapping a hostname (such as `example.com` or `blog.example.com`) to the IP address that hosts the corresponding content or resources.

The speed and reliability of your authoritative DNS service directly affects how available, resilient, and responsive your website or application is. If the authoritative DNS is slow or unreachable, visitors may not be able to reach your site. Cloudflare DNS is an authoritative DNS service that runs on Cloudflare's global network, distributing DNS answers from data centers worldwide. Refer to [How Cloudflare works](https://developers.cloudflare.com/fundamentals/concepts/how-cloudflare-works/) for details.

## DNS setups

It is also possible that one same company will use more than one DNS provider. Usually, this relates to making a domain more resilient - if one provider faces an outage, the nameservers operated by the other DNS provider will most likely still be available.

In this context, you can have a primary DNS setup, when you use Cloudflare to manage your [DNS records](#dns-records), or a [secondary DNS setup](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/), when your DNS records are managed on a different provider and Cloudflare simply receives zone transfers containing your DNS records.

When you have a primary DNS setup, you can either use only Cloudflare (also known as [Full setup](https://developers.cloudflare.com/dns/zone-setups/full-setup/)), or you can use Cloudflare and another provider, where the other provider is the one to receive [outgoing zone transfers](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-primary/) from Cloudflare.

Finally, as Cloudflare also works as a [reverse proxy](https://developers.cloudflare.com/fundamentals/concepts/how-cloudflare-works/#cloudflare-as-a-reverse-proxy), you can use a [CNAME setup](https://developers.cloudflare.com/dns/zone-setups/partial-setup/) (also known as partial) when you do not want Cloudflare to be [authoritative](#authoritative-dns) for your domain but you still want to proxy individual subdomains through Cloudflare.

## DNS records

DNS records are instructions that live in the authoritative DNS servers and provide information about a [zone](#zone). This includes what IP address is associated with a particular domain, but can also cover many other use cases, such as directing emails to a mail server or validating ownership of a domain.

For more details about using DNS records within Cloudflare, refer to [Manage DNS records](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/) and [DNS record types](https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/).

## Zone

A DNS zone is an administrative boundary that defines who controls the DNS records for a given domain and its subdomains. For example, the zone for `example.com` contains the records for `example.com` and its subdomains like `blog.example.com`. Read more in the ["What is a DNS zone?" Learning Center article ↗](https://www.cloudflare.com/learning/dns/glossary/dns-zone/).

Each domain added to a Cloudflare account is listed on the account home page as a zone. The exact properties and behaviors of your zone depend on its [DNS setup](https://developers.cloudflare.com/dns/zone-setups/).

Different Cloudflare products and features are configurable at the zone level. Refer to [Fundamentals](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/) for details.

### Zone apex

The zone apex is the highest-level domain within a zone — the starting point from which all DNS records in that zone are managed.

In most cases, the zone apex is the same as the apex domain (for example, `example.com`). However, with [subdomain delegation](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/) (available on Enterprise plans), a subdomain like `sub.example.com` can be its own zone, making that subdomain the zone apex.

Example 1

DNS management for **example.com**:

| Type | Name | Content   | Proxy status | TTL  |
| ---- | ---- | --------- | ------------ | ---- |
| A    | blog | 192.0.2.1 | Proxied      | Auto |

Zone apex: `example.com`

Full record name: `blog.example.com`

Example 2

DNS management for **sub.example.com**:

| Type | Name | Content   | Proxy status | TTL  |
| ---- | ---- | --------- | ------------ | ---- |
| A    | blog | 192.0.2.1 | Proxied      | Auto |

Zone apex: `sub.example.com`

Full record name: `blog.sub.example.com`

To create a DNS record at the zone apex, use `@` for the record **Name**. The `@` symbol is a DNS convention that represents the zone apex itself. For details, refer to [Create zone apex record](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-zone-apex/).

Record at the zone apex

DNS management for **example.com**:

| Type | Name | Content   | Proxy status | TTL  |
| ---- | ---- | --------- | ------------ | ---- |
| A    | @    | 192.0.2.1 | Proxied      | Auto |

Zone apex: `example.com`

Full record name: `example.com`

DNS management for **sub.example.com**:

| Type | Name | Content   | Proxy status | TTL  |
| ---- | ---- | --------- | ------------ | ---- |
| A    | @    | 192.0.2.1 | Proxied      | Auto |

Zone apex: `sub.example.com`

Full record name: `sub.example.com`

## DNSSEC

Without additional protection, DNS responses can be spoofed — an attacker could return a forged response and redirect visitors to a malicious site. DNSSEC (DNS Security Extensions) addresses this by adding cryptographic signatures to DNS records. These signatures can then be checked to verify that a record came from the correct DNS server, preventing anyone else from issuing false DNS records on your behalf and redirecting traffic intended for your domain. You can read more about it in the [article about DNS security ↗](https://www.cloudflare.com/learning/dns/dns-security/).

For help setting up DNSSEC in Cloudflare, refer to [Enable DNSSEC](https://developers.cloudflare.com/dns/dnssec/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/concepts/#page","headline":"DNS concepts · Cloudflare DNS docs","description":"Understand key DNS concepts with Cloudflare's technical documentation. Learn about nameservers, DNS records, DNSSEC, and more.","url":"https://developers.cloudflare.com/dns/concepts/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/concepts/","name":"Concepts"}}]}
```
