---
title: Phase 4: Post-migration and DNSSEC Re-activation
description: Verify and stabilize after DNS migration.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Phase 4: Post-migration and DNSSEC Re-activation

After the cutover, verify and stabilize.

## 1\. Thorough testing and validation

1. Test all services that rely on DNS: websites, email (sending and receiving), VPNs, APIs, etc.
2. Test from different networks and geographical locations if possible.
3. Monitor application logs for any DNS-related errors.

## 2\. Enable DNSSEC in Cloudflare (if disabled earlier)

Enable DNSSEC only after you are confident that DNS is resolving correctly through Cloudflare and that nameserver changes have fully propagated. In practice, plan for at least one full DS TTL after you add new DS records at the registrar.

**Action in Cloudflare:**

1. In the Cloudflare dashboard, go to your zone's **DNS Settings**.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/dns/settings)
2. Select **Enable DNSSEC**. Cloudflare will sign your zone and generate `DNSKEY` and `DS` record details.

**Action at registrar:**

1. Log in to your domain registrar.
2. Navigate to the DNSSEC management section for your domain.
3. Add the `DS` record details provided by Cloudflare.

After adding the `DS` record, allow time for propagation and then validate your configuration with tools such as [DNSViz ↗](https://dnsviz.net) or [Verisign's DNSSEC debugger ↗](https://dnssec-debugger.verisignlabs.com/). For more information, refer to [DNSSEC](https://developers.cloudflare.com/dns/dnssec/).

Note

If your domain uses Cloudflare Registrar, some DNSSEC steps can be simplified or automated. Refer to [Enable DNSSEC with Cloudflare Registrar](https://developers.cloudflare.com/registrar/get-started/enable-dnssec/) for registrar-specific instructions.

## 3\. Adjust TTLs in Cloudflare

After the migration is stable and DNSSEC is active (if used), increase the TTLs for your DNS records from the short values used during the migration to more standard values (for example, 3600 seconds for frequently changing records or 86400 seconds for very stable records).

Higher TTLs improve resolver cache efficiency and can reduce latency by allowing recursive resolvers to reuse cached answers for longer, at the cost of slower propagation when you make changes.

## 4\. Review and enable Cloudflare proxy features

If you initially set records to **DNS Only** (grey cloud), now is a good time to enable Cloudflare's proxy (orange cloud) for HTTP/S records (`A`, `AAAA`, `CNAME`) to leverage [CDN](https://developers.cloudflare.com/cache/), [WAF](https://developers.cloudflare.com/waf/), and other security and performance features. Test thoroughly after enabling proxying.

## 5\. Decommission On-Prem BIND servers

Only after a significant stabilization period (for example, several days to a week after full propagation and successful testing) and when you are fully confident in the Cloudflare setup, decommission the on-premise BIND servers.

Ensure no resolvers are still pointing to the old BIND servers. This is especially important for internal resolvers, if they were not addressed separately.

## 6\. Update internal documentation and monitoring

Update all internal IT documentation to reflect the new DNS infrastructure and ensure your monitoring systems are checking DNS resolution via Cloudflare.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/dns-best-practices/concepts/phase-4/#page","headline":"Phase 4: Post-migration and DNSSEC Re-activation · Cloudflare Learning Paths","description":"Verify and stabilize after DNS migration.","url":"https://developers.cloudflare.com/learning-paths/dns-best-practices/concepts/phase-4/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/dns-best-practices/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/dns-best-practices/concepts/phase-4/","name":"Phase 4: Post-migration and DNSSEC Re-activation"}}]}
```
