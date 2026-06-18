---
title: Phase 3: Execution (Migration window)
description: Execute the DNS nameserver cutover.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Phase 3: Execution (Migration window)

Phase 3 is when you make the actual switch to Cloudflare.

## 1\. Final verification

Complete one last check of all DNS records in your Cloudflare dashboard for accuracy and ensure your BIND servers are still operational as a fallback if needed.

## 2\. Update nameservers at your registrar

1. Log in to your domain registrar's control panel for each domain.
2. Navigate to the section for managing nameservers.
3. Replace your current on-prem BIND nameserver entries with your Cloudflare nameservers.
4. Add the Cloudflare nameservers assigned to your domain (Cloudflare will provide at least two).
5. Save the changes.

## 3\. Monitor propagation

* DNS nameserver changes can take time to propagate globally, typically anywhere from a few minutes to 48 hours (though often much faster due to lowered TTLs).
* Use the commands exemplified below, replacing `yourdomain.com` by your actual domain.  
   * `dig yourdomain.com NS @8.8.8.8` (query Google's DNS)  
   * `dig yourdomain.com NS @1.1.1.1` (query Cloudflare's DNS)  
   * `whois yourdomain.com`  
   * `dig yourdomain.com @tld.nameserver.com` (`tld.nameserver.com` is the nameserver of your domain's TLD. You can find this information by querying it as `dig com ns +short` where `.com` is the example.)  
You are looking for the Cloudflare nameservers to be reported consistently.

## 4\. Initial testing

Once propagation appears to be widespread, perform basic resolution tests for critical records (for example, your website's `A` record and any `MX` records, if you had them set up).

* `dig yourdomain.com A +short`
* `dig yourdomain.com MX +short`

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/dns-best-practices/concepts/phase-3/#page","headline":"Phase 3: Execution (Migration window) · Cloudflare Learning Paths","description":"Execute the DNS nameserver cutover.","url":"https://developers.cloudflare.com/learning-paths/dns-best-practices/concepts/phase-3/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/dns-best-practices/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/dns-best-practices/concepts/phase-3/","name":"Phase 3: Execution (Migration window)"}}]}
```
