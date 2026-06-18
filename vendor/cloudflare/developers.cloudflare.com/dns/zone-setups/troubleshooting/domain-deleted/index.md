---
title: Domain deleted from Cloudflare
description: Learn why a domain may be removed from Cloudflare and how to recover it using audit logs and registrar verification.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Domain deleted from Cloudflare

Domain deletion commonly occurs for the following reasons:

* A user with access to the domain removed it.
* The nameservers no longer point to Cloudflare. Cloudflare continuously monitors domain registration.
* The domain was not authenticated (pending for 28 days).

---

## Check Audit Logs

Cloudflare [Audit Logs](https://developers.cloudflare.com/fundamentals/account/account-security/review-audit-logs/) contain information about domain deletion.

Note

_Delete_ is an **Action** that denotes domain deletion but is also commonly used for deletion of other various account settings. Therefore, ensure that **Resource** says _Zone_.

---

## Check registrar for Cloudflare nameservers

If your domain was using a [primary setup (full)](https://developers.cloudflare.com/dns/zone-setups/full-setup/), your registrar needs to use Cloudflare nameservers as the authoritative nameservers for your domain.

1. Use either the command-line based `whois` application provided with your operating system or a website such as [ICANN Lookup ↗](https://lookup.icann.org/).  
   * If you are unable to find the nameserver details for your domain, reach out to your domain registrar or domain provider to provide the domain registration information.  
   * Ensure Cloudflare's nameservers are the only two nameservers listed in the domain registration details.  
   * Ensure nameservers are spelled correctly in the domain registration.
2. Confirm that the nameservers exactly match the nameservers provided within the **Cloudflare Nameservers** card on the [**DNS Records** ↗](https://dash.cloudflare.com/?to=/:account/:zone/dns/records) page.
3. If you identify incorrect information, log in to your domain provider's portal to make updates or contact your domain provider for assistance.

---

## Recover a deleted domain

To recover a deleted domain, [re-add it in Cloudflare](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/) just like you would for a new domain.

Warning

Cloudflare support is unable to restore DNS or settings for deleted domains.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/zone-setups/troubleshooting/domain-deleted/#page","headline":"Domain deleted from Cloudflare · Cloudflare DNS docs","description":"Learn why a domain may be removed from Cloudflare and how to recover it using audit logs and registrar verification.","url":"https://developers.cloudflare.com/dns/zone-setups/troubleshooting/domain-deleted/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/zone-setups/","name":"DNS setups"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/zone-setups/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":5,"item":{"@id":"/dns/zone-setups/troubleshooting/domain-deleted/","name":"Domain deleted from Cloudflare"}}]}
```
