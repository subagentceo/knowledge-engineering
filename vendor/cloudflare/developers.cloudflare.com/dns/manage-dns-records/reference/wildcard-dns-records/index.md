---
title: Wildcard DNS records
description: How wildcard DNS records work on Cloudflare.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Wildcard DNS records

Normal DNS records map a domain name to one or multiple IP addresses or other associated resources to a specific domain name (a one-to-many mapping). Wildcard DNS records allow you to have a many-to-many mapping, for example if you had hundreds or thousands of subdomains you wanted to point to the same resources.

Within Cloudflare, wildcard DNS records can be either [proxied or DNS-only](https://developers.cloudflare.com/dns/proxy-status/).

## Create a Wildcard record

To create a wildcard DNS record, [create a DNS record](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/) with an `*` in the **Name** field.

| Type | Name | IPv4 address | Proxy status |
| ---- | ---- | ------------ | ------------ |
| A    | \*   | 192.0.2.1    | Proxied      |

Warning

If your project is on [Cloudflare Pages](https://developers.cloudflare.com/pages/), note that wildcard custom domains are not supported. Refer to [known issues](https://developers.cloudflare.com/pages/platform/known-issues/#custom-domains) for details.

You can also create a wildcard DNS record specifically for a deeper subdomain. For example, if you wanted to create a wildcard record on `*.www.example.com`, you would create a record with `*.www` in the name field.

| Type  | Name   | IPv4 address | Proxy status |
| ----- | ------ | ------------ | ------------ |
| CNAME | \*.www | example.com  | Proxied      |

### Aspects to consider

#### Wildcards are only supported on the first label

This means that a hostname such as `subdomain.*.example.com` is not a wildcard on the level of the asterisk character. If you create a DNS record with that name, the asterisk is interpreted as the literal character `*` and not as the wildcard operator.

#### Wildcards are multi-level by default

If you create a DNS record on `*.*.example.com`, only the first asterisk is interpreted as a wildcard while the second one is interpreted as the literal `*` character. A record `*.example.com` is already multi-level by default, meaning it would cover `abc.example.com` as well as `123.abc.example.com`, as long as there are no [specific DNS records](#specific-dns-records-take-precedence-over-wildcard-records) that would take precedence.

#### Specific DNS records take precedence over wildcard records

A wildcard record applies only when no exact record exists at the queried name. If a record or delegation exists, the wildcard does not apply.

Example 1 - specific or below

If you have only these two records on your domain:

| Type | Name | Content      |
| ---- | ---- | ------------ |
| A    | \*   | 192.0.2.1    |
| TXT  | abc  | <some\_text> |

The `A` wildcard record will be used for queries going to any subdomain of `example.com` except `abc.example.com` or anything below that specific label (`123.abc.example.com` or `deeper.label.abc.example.com`, and so on).

The wildcard will still be used for deeper labels that are not below the specific record on `abc.example.com` — for example, `deeper.label.xyz.example.com`.

Example 2 - implicit parent

If you have only these two records on your domain:

| Type | Name    | Content      |
| ---- | ------- | ------------ |
| A    | \*      | 192.0.2.1    |
| TXT  | 123.abc | <some\_text> |

In this example, `123.abc.example.com` is a descendant of `abc.example.com`, and `abc.example.com` has no records associated with it. The behavior will depend on the type of nameservers you are using:

* Standard nameservers: The wildcard `*.example.com` will still apply to `abc.example.com`.
* [Advanced nameservers](https://developers.cloudflare.com/dns/foundation-dns/setup/)[1](#user-content-fn-1): In compliance with [RFC 4592 ↗](https://www.rfc-editor.org/rfc/rfc4592.html), the wildcard `*.example.com` will not apply to `abc.example.com`.

## Availability

Customers on all plans can create and proxy wildcard DNS records.

## Limitations

If you are using a [CNAME setup (partial)](https://developers.cloudflare.com/dns/zone-setups/partial-setup/) for your DNS, Cloudflare does not automatically provision SSL/TLS certificates for your wildcard record.

For wildcard hostname certificates, certificate issuance and renewal varies based on the type of certificate you are using:

* **Universal**: Perform DCV using [TXT validation method](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/methods/txt/).
* **Advanced**: In most cases, you can opt for [Delegated DCV](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/methods/delegated-dcv/), which greatly simplifies certificate management.

If you cannot use Delegated DCV, you need to use [TXT based DCV](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/methods/txt/) for certificate issuance and renewal. This means you will need to place one TXT DCV token for every hostname on the certificate. If one or more of the hostnames on the certificate fails to validate, the certificate will not be issued or renewed.

This means that a wildcard certificate covering `example.com` and `*.example.com` will require two DCV tokens to be placed at the authoritative DNS provider. Similarly, a certificate with five hostnames in the SAN (including a wildcard) will require five DCV tokens to be placed at the authoritative DNS provider.

## Additional information

For more information on wildcard records — as well as more details about their limitations — refer to the [introductory blog post ↗](https://blog.cloudflare.com/wildcard-proxy-for-everyone/).

## Footnotes

1. An opt-in configuration available for Enterprise customers. [↩](#user-content-fnref-1)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/manage-dns-records/reference/wildcard-dns-records/#page","headline":"Wildcard DNS records · Cloudflare DNS docs","description":"How wildcard DNS records work on Cloudflare.","url":"https://developers.cloudflare.com/dns/manage-dns-records/reference/wildcard-dns-records/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/manage-dns-records/","name":"DNS records"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/manage-dns-records/reference/","name":"Reference"}},{"@type":"ListItem","position":5,"item":{"@id":"/dns/manage-dns-records/reference/wildcard-dns-records/","name":"Wildcard DNS records"}}]}
```
