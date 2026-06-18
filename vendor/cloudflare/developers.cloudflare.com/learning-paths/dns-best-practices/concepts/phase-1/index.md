---
title: Phase 1: Planning &amp; Inventory
description: Plan and inventory your DNS migration.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Phase 1: Planning & Inventory

Detailed planning is the cornerstone of a successful DNS migration.

## 1\. Understand your current BIND setup

1. Identify all DNS zones currently hosted on your BIND servers.
2. Review all DNS records within each zone. Remove stale or unnecessary records and verify the accuracy of existing records.
3. BIND views (split DNS): If you use BIND views to provide different DNS responses to internal versus external resolvers, Cloudflare authoritative DNS does not replicate per-client views directly.  
   * Continue to use an internal DNS resolver (for example, BIND, Active Directory, or another internal resolver) for internal-only names, while using Cloudflare authoritative DNS for public zones.  
   * For policy-based internal DNS, consider Cloudflare Zero Trust features such as DNS policies and Internal DNS (Beta). For more details, refer to [Cloudflare DNS](https://developers.cloudflare.com/dns/) and [Internal DNS](https://developers.cloudflare.com/dns/internal-dns/).
4. BIND ACLs (access control lists): If you use ACLs in BIND to restrict which clients can query your authoritative DNS or perform zone transfers, plan how these controls will change:  
   * **Authoritative DNS queries:** Cloudflare authoritative DNS nameservers are reachable on the public Internet and do not support per-resolver ACLs for standard DNS queries.  
   * **HTTP and application access:** To restrict or filter HTTP(S) traffic to your applications, use Cloudflare security features such as the [Web Application Firewall (WAF)](https://developers.cloudflare.com/waf/) and other Application Security products. These operate at the HTTP layer, not at the DNS query layer.  
   * Zone transfers (AXFR/IXFR): If you use AXFR/IXFR with BIND today, review Cloudflare’s zone transfer setups:  
         * [Cloudflare as primary DNS](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-primary/)  
         * [Cloudflare as secondary DNS](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/)  
   These setups document how to restrict which IP addresses can perform zone transfers.
5. Dependencies: Identify any applications or services critically dependent on specific DNS behaviors of your BIND setup.

## 2\. Define scope and objectives

Clearly list all domain names to be migrated and define success criteria for the migration.

## 3\. Cloudflare account and familiarization

1. [Create your Cloudflare account](https://developers.cloudflare.com/fundamentals/account/create-account/) if you have not already.
2. Familiarize yourself with the Cloudflare DNS dashboard and its features.
3. Consider the different [DNS record types](https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/) you can manage on Cloudflare and how they map from BIND.

## 4\. DNSSEC strategy (critical)

Determine if DNSSEC is currently enabled for your zones on BIND and at your domain registrar.

Cloudflare supports two main migration approaches when DNSSEC is enabled:

* Option 1 (recommended for most migrations): [Disable DNSSEC at your registrar](https://developers.cloudflare.com/dns/dnssec/#disable-dnssec) before changing nameservers. After the migration to Cloudflare is complete and stable, re-enable DNSSEC through the Cloudflare dashboard.
* Option 2 (advanced): Perform an active migration using [multi-signer DNSSEC](https://developers.cloudflare.com/dns/dnssec/multi-signer-dnssec/setup/), where both providers sign the zone during the transition. This requires careful key management but allows you to migrate without disabling DNSSEC. For more information, refer to [Migrate an existing zone with DNSSEC enabled](https://developers.cloudflare.com/dns/dnssec/dnssec-active-migration/).

**Disable-and-re-enable approach (safer for most teams):**

1. Log in to your registrar and remove the DS records associated with your on-prem BIND DNSSEC keys for each domain.
2. Plan to switch nameservers only after resolvers are no longer expecting the old DNSSEC chain.

\*DS record TTL: If DNSSEC is active, note the Time To Live (TTL) of your DS records at the parent zone (managed by your registrar). This will determine how long you need to wait after removing DS records. As a rule of thumb, wait at least one full DS TTL and preferably up to 1.5 times the TTL before changing nameservers.

For more information about DNSSEC on Cloudflare, refer to [DNSSEC](https://developers.cloudflare.com/dns/dnssec/).

## 5\. Choose migration window

Select a period of low traffic and activity to minimize potential impact and inform stakeholders of the planned window.

## 6\. Develop communication and rollback plan

* Communication: Plan how to communicate with stakeholders before, during, and after the migration.
* Rollback Plan: Document steps to revert to your BIND servers if major issues arise. This primarily involves changing nameservers back at the registrar and potentially re-adding old DS records if DNSSEC was involved.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/dns-best-practices/concepts/phase-1/#page","headline":"Phase 1: Planning & Inventory · Cloudflare Learning Paths","description":"Plan and inventory your DNS migration.","url":"https://developers.cloudflare.com/learning-paths/dns-best-practices/concepts/phase-1/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/dns-best-practices/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/dns-best-practices/concepts/phase-1/","name":"Phase 1: Planning & Inventory"}}]}
```
