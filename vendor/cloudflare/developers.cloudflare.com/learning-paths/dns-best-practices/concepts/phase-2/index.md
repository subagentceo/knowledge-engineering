---
title: Phase 2: Preparation
description: Prepare for DNS migration with minimal downtime.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Phase 2: Preparation

Careful preparation will minimize downtime and issues during the cutover.

## 1\. Reduce DNS record TTLs (Time To Live)

At least 24-48 hours (or longer, ideally matching your longest current TTLs) before your planned migration window, lower the TTLs for all critical records in your BIND zone files. A common short TTL for migration is 300 seconds (5 minutes).

This ensures that DNS resolvers worldwide will cache your old records for a shorter period, allowing changes to propagate more quickly when you switch to Cloudflare.

* SOA Record: Also consider lowering the `MINIMUM` field in your SOA record, which dictates the TTL to be used for negative responses ([RFC 2308 ↗](https://www.rfc-editor.org/rfc/rfc2308.html#section-4)).

## 2\. Export zone files from BIND

Obtain a clean and current export of your zone files from your BIND servers in standard BIND format and ensure these files are complete and accurate.

## 3\. Add domains to Cloudflare

1. Log in to your Cloudflare dashboard.  
[ Go to **Account home** ](https://dash.cloudflare.com/?to=/:account/home)
2. Add each domain you intend to migrate. Cloudflare will attempt to scan for existing DNS records.

## 4\. Import DNS Records into Cloudflare

Use Cloudflare's **Import and Export** feature (under **DNS** \> **Records**) to upload your BIND zone files.

[ Go to **Account home** ](https://dash.cloudflare.com/?to=/:account/home) 
* Verification (Crucial):  
   * After import, meticulously compare the records in Cloudflare with your BIND zone files or a `dig` output of your current zone.  
   * Pay close attention to `MX` records, `SRV` records, `TXT` records (especially for `SPF`, `DKIM`, `DMARC`), and any complex `CNAME` configurations.  
   * Ensure FQDNs (Fully Qualified Domain Names) are correctly formatted (Cloudflare usually handles the trailing dot correctly on import, but verify).
* Proxy status (orange vs grey cloud):  
   * For `A`, `AAAA`, and `CNAME` records that point to HTTP or HTTPS services you want to proxy through Cloudflare (for example, websites and APIs), you can enable the orange cloud to use Cloudflare CDN and security features.  
   * Some services and ports are not supported behind the proxy, and certain record types (for example, `MX` targets and many non-HTTP services) must remain **DNS only**. For a detailed list, refer to [Proxy status and limitations](https://developers.cloudflare.com/dns/proxy-status/limitations/).  
   * Recommendation for initial migration: To isolate the DNS migration from potential proxy-related issues, consider setting all records to **DNS only** (grey cloud) initially. After you confirm that DNS resolution is working correctly, enable the proxy (orange cloud) for specific HTTP(S) records and test again.

## 5\. DNSSEC preparation (if currently enabled)

Complete this step before you change your nameservers at the registrar.

Note

For more detailed guidance, refer to [DNSSEC](https://developers.cloudflare.com/dns/dnssec/). If during [Phase 1](https://developers.cloudflare.com/learning-paths/dns-best-practices/concepts/phase-1/#4-dnssec-strategy-critical) you have opted for a multi-signer DNSSEC strategy, refer to [Migrate an existing zone with DNSSEC enabled](https://developers.cloudflare.com/dns/dnssec/dnssec-active-migration/).

* **Action at registrar:** Log in to your domain registrar and delete the existing DS records associated with your on-prem BIND DNSSEC keys for each domain.
* **Wait for DS TTL:** Wait at least the full DS record TTL published at the parent zone, and preferably up to 1.5 times that TTL, before you change nameservers. This ensures that validating resolvers stop expecting the old DNSSEC chain. The typical TTL duration for DS records is set to +24 hours (86,400 seconds).
* **Impact of incorrect timing:** If you change nameservers while resolvers still expect the old DS record, DNSSEC validation will fail and your domain may become unreachable for validating resolvers.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/dns-best-practices/concepts/phase-2/#page","headline":"Phase 2: Preparation · Cloudflare Learning Paths","description":"Prepare for DNS migration with minimal downtime.","url":"https://developers.cloudflare.com/learning-paths/dns-best-practices/concepts/phase-2/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/dns-best-practices/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/dns-best-practices/concepts/phase-2/","name":"Phase 2: Preparation"}}]}
```
