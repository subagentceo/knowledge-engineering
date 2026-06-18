---
title: Manage PII
description: How Manage PII works in Zero Trust analytics.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Manage PII

Cloudflare Gateway gives you multiple ways to safely handle your employees' personally identifiable information (PII) in activity logs:

* **Redact PII** (default) — PII is stored in logs but hidden from view. Only the Super Administrator and users with the [Cloudflare Zero Trust PII role](https://developers.cloudflare.com/cloudflare-one/roles-permissions/#cloudflare-zero-trust-pii) can view redacted PII. The underlying data is preserved — redaction only controls who can see it.
* **[Exclude PII](#exclude-pii)** — PII is not stored in logs at all. No user, including the Super Administrator, can retrieve it.

Only the Super Administrator can assign roles and determine who has permission to view PII. To add or remove the Cloudflare Zero Trust PII role for a user in your organization, refer to [Roles](https://developers.cloudflare.com/fundamentals/manage-members/roles/).

## Types of PII

Cloudflare Gateway can log the following types of PII:

* Source IP
* User email
* User ID
* Device ID
* URL
* Referer
* User agent

## Exclude PII

When you exclude PII, Gateway logs activity without storing any employee PII. This differs from the default redaction behavior — excluded PII is not stored and cannot be retrieved by any role, including the Super Administrator.

Warning

Excluding PII is irreversible for the period it is active. If you turn on this setting and later turn it off, logs captured while the setting was on will permanently lack PII data.

Changes to this setting do not affect PII already stored in previous logs.

To turn on the setting to exclude PII:

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Traffic policies** \> **Traffic settings**.
2. In **Traffic logging**, turn on **Exclude personally identifiable information (PII) from logs**.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/gateway-logs/manage-pii/#page","headline":"Manage PII · Cloudflare One docs","description":"How Manage PII works in Zero Trust analytics.","url":"https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/gateway-logs/manage-pii/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Privacy"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/insights/","name":"Insights"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/insights/logs/","name":"Logs"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/insights/logs/dashboard-logs/","name":"Dashboard logs"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/insights/logs/dashboard-logs/gateway-logs/","name":"Gateway activity logs"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/insights/logs/dashboard-logs/gateway-logs/manage-pii/","name":"Manage PII"}}]}
```
