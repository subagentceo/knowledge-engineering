---
title: FAQ
description: Answers to common questions about WAF configuration and behavior.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# FAQ

## General questions

### Why does a security event display a Cloudflare IP address even though other fields match the client details?

This happens when a request goes through a Cloudflare Worker.

In this case, Cloudflare considers the client details, including its IP address, for triggering security settings. However, the IP displayed in [Security Events](https://developers.cloudflare.com/waf/analytics/security-events/) will be a Cloudflare IP address.

### Do I need to escape certain characters in expressions?

Yes, you may have to escape certain characters in expressions. The exact escaping will depend on the string syntax you use:

* If you use the raw string syntax (for example, `r#"this is a string"#`), you will only need to escape characters that have a special meaning in regular expressions.
* If you use the quoted string syntax (for example, `"this is a string"`), you need to perform additional escaping, such as escaping special characters `"` and `\` using `\"` and `\\`, both in literal strings and in regular expressions.

For more information on string syntaxes and escaping, refer to [String values and regular expressions](https://developers.cloudflare.com/ruleset-engine/rules-language/values/#string-values-and-regular-expressions).

### Why is my regular expression pattern not working?

If you are using a regular expression, it is recommended that you test it with a tool such as [Regular Expressions 101 ↗](https://regex101.com/?flavor=rust&regex=) or [Rustexp ↗](https://rustexp.lpil.uk).

### Why are some rules bypassed when I did not create an exception?

If you have [SSL/TLS certificates](https://developers.cloudflare.com/ssl/) managed by Cloudflare, every time a certificate is issued or renewed, a [domain control validation (DCV)](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/dcv-flow/) must happen. When a certificate is in `pending_validation` state and there are valid DCV tokens in place, some Cloudflare security features such as [custom rules](https://developers.cloudflare.com/waf/custom-rules/) and [Managed Rules](https://developers.cloudflare.com/waf/managed-rules/) will be automatically disabled on specific DCV paths (for example, `/.well-known/pki-validation/` and `/.well-known/acme-challenge/`).

These automatic bypasses do not appear in [Trace](https://developers.cloudflare.com/rules/trace-request/) results.

### Why have I been blocked?

Cloudflare may block requests when it detects activity that could be unsafe. Common reasons include:

* Security protection against malicious traffic, DDoS attacks, or other threats.
* Excessive requests in a short time (rate limiting).
* Bot-like or automated traffic.
* IP addresses listed on public blocklists, such as [Project Honey Pot ↗](https://projecthoneypot.org/).

If you are a site visitor:

* Contact the site owner, providing details of your actions when the block occurred and the Cloudflare Ray ID displayed at the bottom of the error page.
* Avoid suspicious inputs or automated scripts.
* Check your IP reputation through [Project Honey Pot ↗](https://projecthoneypot.org/).

If you are the site owner:

* Adjust security settings to balance protection with accessibility.
* Monitor blocked requests in your Cloudflare dashboard.
* Allowlist trusted IPs or fine-tune WAF/bot rules to reduce false positives.

Note

ISP-level blocks are distinct from Cloudflare or site-owner security restrictions. For details, refer to [Potential ISP blocking of Cloudflare IP addresses](https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/potential-isp-blocking/).

## Bots

### How does the WAF handle traffic from known bots?

#### Caution about potentially blocking bots

When you create a custom rule with a _Block_, _Non-Interactive Challenge_, _Managed Challenge_, or _Interactive Challenge_ action, you might unintentionally block traffic from known bots. Specifically, this might affect search engine optimization (SEO) and website monitoring when trying to enforce a mitigation action based on URI, path, host, ASN, or country.

Refer to the [Challenges documentation](https://developers.cloudflare.com/cloudflare-challenges/troubleshooting/#allowlist-traffic-from-mitigation-actions) for more information.

#### Bots currently detected

[Cloudflare Radar ↗](https://radar.cloudflare.com/verified-bots) lists a **sample** of known bots that the WAF currently detects. When traffic comes from these bots and others not listed, the `cf.client.bot` field is set to `true`.

To submit a friendly bot to be verified, go to the [**Verified bots** ↗](https://radar.cloudflare.com/traffic/verified-bots) page in Cloudflare Radar and select **Add a bot**.

For more information on verified bots, refer to [Bots](https://developers.cloudflare.com/bots/concepts/bot/).

Note

There is no functional difference between known and verified bots. However, the known bots field (`cf.client.bot`) is available for all customers, while the verified bots field (`cf.bot_management.verified_bot`) is available for Enterprise customers.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/troubleshooting/faq/#page","headline":"FAQ · Cloudflare Web Application Firewall (WAF) docs","description":"Answers to common questions about WAF configuration and behavior.","url":"https://developers.cloudflare.com/waf/troubleshooting/faq/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/troubleshooting/faq/","name":"FAQ"}}]}
```
