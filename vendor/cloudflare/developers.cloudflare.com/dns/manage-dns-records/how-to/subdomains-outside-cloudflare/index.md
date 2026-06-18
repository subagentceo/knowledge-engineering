---
title: Delegate subdomains
description: Delegate subdomains to external DNS providers.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Delegate subdomains

Subdomain delegation allows different individuals, teams, or organizations to manage different subdomains of a site.

Note

DNS delegation is not possible for Cloudflare domains using a [CNAME setup (partial)](https://developers.cloudflare.com/dns/zone-setups/partial-setup).

For instance, consider `example.com` as a Cloudflare domain with `www.example.com` managed in Cloudflare's **DNS** app and `blog.example.com` delegated to nameservers outside of Cloudflare. In this example, `blog.example.com` can now be managed by individuals who do not have access to Cloudflare credentials for the `example.com` domain.

Warning

Cloudflare's CDN and security services are not applied to delegated subdomains.

## Availability

| Free         | Pro | Business | Enterprise |     |
| ------------ | --- | -------- | ---------- | --- |
| Availability | Yes | Yes      | Yes        | Yes |

---

## Delegate a subdomain (outgoing)

To delegate a subdomain such as `blog.example.com`, tell DNS resolvers where to find the zone file:

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com) and select your account.
2. Select the domain that contains the subdomain to be delegated.
3. Go to the **DNS Records** page.  
[ Go to **Records** ](https://dash.cloudflare.com/?to=/:account/:zone/dns/records)
4. Create `NS` records for the subdomain. For example:  
   * `blog.example.com NS ns1.externalhost.com`  
   * `blog.example.com NS ns2.externalhost.com`  
   * `blog.example.com NS ns3.externalhost.com`  
Note  
The `A` records for the subdomain are only required as glue records for nameservers that are located in the subdomain of the current zone that is being delegated.
5. (Optional) If the delegated nameserver has DNSSEC enabled, [add the DS record](https://developers.cloudflare.com/dns/dnssec/#1-activate-dnssec-in-cloudflare) in Cloudflare.

### Limits

When creating NS records, there are limits on the number of nameservers that can be associated with a single delegation name.

According to DNS standards defined in [RFC 1912 ↗](https://www.rfc-editor.org/rfc/rfc1912.html), a delegation should not include more than seven nameserver names for the same delegation name.

To align with these standards and maintain platform stability:

* Cloudflare supports up to 10 NS records per delegation name, but the best practice is to keep the set at seven or fewer.
* Creating more than 10 NS records for the same name is not supported. Requests that exceed this limit may be rejected or fail validation.

Example

DNS management for **example.com**:

| Type | Name | Content               |
| ---- | ---- | --------------------- |
| NS   | blog | ns1.externalhost.com  |
| NS   | blog | ns2.externalhost.com  |
| NS   | blog | ns3.externalhost.com  |
| NS   | blog | ns4.externalhost.com  |
| NS   | blog | ns5.externalhost.com  |
| NS   | blog | ns6.externalhost.com  |
| NS   | blog | ns7.externalhost.com  |
| NS   | blog | ns8.externalhost.com  |
| NS   | blog | ns9.externalhost.com  |
| NS   | blog | ns10.externalhost.com |

In this example, Cloudflare would prevent you from adding another NS record for the delegation name `blog`.

## Delegate a subdomain (incoming)

To delegate a subdomain from an external DNS provider to Cloudflare, refer to [subdomain setups](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/setup/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/manage-dns-records/how-to/subdomains-outside-cloudflare/#page","headline":"Delegate subdomains · Cloudflare DNS docs","description":"Delegate subdomains to external DNS providers.","url":"https://developers.cloudflare.com/dns/manage-dns-records/how-to/subdomains-outside-cloudflare/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/manage-dns-records/","name":"DNS records"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/manage-dns-records/how-to/","name":"How to"}},{"@type":"ListItem","position":5,"item":{"@id":"/dns/manage-dns-records/how-to/subdomains-outside-cloudflare/","name":"Delegate subdomains"}}]}
```
