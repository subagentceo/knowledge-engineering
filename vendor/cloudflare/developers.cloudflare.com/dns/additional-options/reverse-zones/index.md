---
title: Reverse zones and PTR records
description: Set up reverse DNS zones and PTR records.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Reverse zones and PTR records

If you control your own IP prefix(es), you can set up reverse zones with PTR records to allow reverse DNS lookups.

## PTR records

PTR records specify the allowed hosts for a given IP address. They are the opposite of [A records ↗](https://www.cloudflare.com/learning/dns/dns-records/dns-a-record) and used for reverse DNS lookups.

Historically, PTR records prevented outbound SMTP servers from being blocked by spam filters. However, more modern DNS records — [SPF, DKIM, and DMARC](https://developers.cloudflare.com/dns/manage-dns-records/how-to/email-records/#prevent-domain-spoofing) — provide better verifications of domain ownership.

Now, PTR records are primarily useful for those who own a dedicated IP space. They can help populate trace routes and security tools with human-readable domain names.

As PTR records are mainly used for reverse DNS lookups, they should preferably be added to reverse zones.

## Availability

The following Cloudflare customers can create reverse zones.

* Customers with an IPv4 or IPv6 address space can add the IPv4 or IPv6 reverse zone for their IP space to their account, and create the required PTR records for forward resolution.
* DNS Firewall customers need to contact their account team to add PTR records for the IPs used for their DNS Firewall clusters.

If your account does not meet these qualifications and you do not own the IP prefix you want to add PTR records on, contact the owner of the IP address based on a [whois lookup ↗](https://lookup.icann.org/).

## Set up a reverse zone

To set up a reverse zone, you need to create a reverse DNS zone and add PTR records for forward resolution.

### 1\. Create a reverse DNS zone

1. Within your account, click **Add** \> **Connect a domain**.
2. For your site name, use the reverse IP address:  
   * For IPv4 /24 prefixes, the pattern is:  
         * **IP prefix**: `<octet_1>.<octet_2>.<octet_3>.0/24`  
         * **Reverse zone address**: `<octet_3>.<octet_2>.<octet_1>.in-addr.arpa`  
   * For IPv4 /16 prefixes, the pattern is:  
         * **IP prefix**: `<octet_1>.<octet_2>.0.0/16`  
         * **Reverse zone address**: `<octet_2>.<octet_1>.in-addr.arpa`  
Example  
   * **IPv4 prefix**: `198.51.100.0/24`  
   * **Reverse zone**: `100.51.198.in-addr.arpa`  
   * For IPv6, consider the following examples:  
   * **IPv6 prefix**: `2001:DB8::0/32`  
   * **Reverse zone**: `8.b.d.0.1.0.0.2.ip6.arpa`  
   * **IPv6 prefix**: `2001:DB8::0/48`  
   * **Reverse zone**: `0.0.0.0.8.b.d.0.1.0.0.2.ip6.arpa`
3. If you are adding less than 200 PTR records, select the **Free** plan. If you are adding more, select a paid plan.
4. Skip the rest of the onboarding process.

### 2\. Add PTR records

1. In the Cloudflare dashboard, go to the **DNS Records** page.  
[ Go to **Records** ](https://dash.cloudflare.com/?to=/:account/:zone/dns/records)
2. For each IP within the prefix, add a PTR record using the least significant octet(s) as the subdomain.

IPv4 example

Suppose you have the following configuration:

* **Reverse zone**: `100.51.198.in-addr.arpa`
* **IP address**: `198.51.100.123`

The subdomain for the PTR record would be `123`, making the full domain for forward lookup `123.100.51.198.in-addr.arpa`.

| Type | Name | Domain name | TTL  |
| ---- | ---- | ----------- | ---- |
| PTR  | 123  | example.com | Auto |

IPv6 example

Suppose you have the following configuration:

* **Reverse zone**: `0.0.0.0.8.b.d.0.1.0.0.2.ip6.arpa`
* **IP address**: `2001:DB8::5`

The subdomain for the PTR record would be `5.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0`, making the full domain for forward lookup `5.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.8.b.d.0.1.0.0.2.ip6.arpa`.

| Type | Name                                    | Domain name | TTL  |
| ---- | --------------------------------------- | ----------- | ---- |
| PTR  | 5.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0 | example.com | Auto |

### 3\. Set Cloudflare nameservers

Add the two Cloudflare nameservers provided for the zone at your Regional Internet Registry (RIR). The exact steps to update your nameservers will depend on the registry you are using.

After this process, your reverse zone will be activated and you can perform reverse DNS lookups.

## Other resources

While setting up reverse zones, the following third-party tools may be useful:

* [Reverse DNS record generator ↗](https://www.whatsmydns.net/reverse-dns-generator)
* [IPv6 subnet calculator ↗](https://www.internex.at/de/toolbox/ipv6)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/additional-options/reverse-zones/#page","headline":"Reverse zones and PTR records · Cloudflare DNS docs","description":"Set up reverse DNS zones and PTR records.","url":"https://developers.cloudflare.com/dns/additional-options/reverse-zones/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["IPv4","IPv6"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/additional-options/","name":"Additional options"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/additional-options/reverse-zones/","name":"Reverse zones and PTR records"}}]}
```
