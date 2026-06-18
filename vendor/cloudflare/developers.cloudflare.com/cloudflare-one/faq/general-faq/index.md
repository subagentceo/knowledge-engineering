---
title: General
description: Review frequently asked questions about Cloudflare Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# General

[❮ Back to FAQ](https://developers.cloudflare.com/cloudflare-one/faq/)

## What is the difference between Cloudflare Gateway and 1.1.1.1?

1.1.1.1 does not block any DNS query. When a browser requests for example.com, 1.1.1.1 simply looks up the answer either in cache or by performing a full recursive DNS query.

Cloudflare Gateway's DNS resolver introduces security into this flow. Instead of allowing all DNS queries, Gateway first checks the hostname being queried against the intelligence Cloudflare has about threats on the Internet. If that query matches a known threat, or is requesting a blocked domain configured by an administrator as part of a Gateway policy, Gateway stops it before the site could load for the user - and potentially execute code or phish that team member.

## Is multi-factor authentication supported?

Access supports two methods of enforcing MFA:

* **Independent MFA** — Access prompts users for a second factor directly, without relying on your identity provider. You can configure MFA requirements per organization, application, or policy. For more information, refer to [Enforce independent MFA](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/mfa-requirements/#independent-mfa).
* **Identity provider-based MFA** — Access respects the [MFA policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/mfa-requirements/#identity-provider-based-mfa) set in your identity provider. For example, if your users are logging into an Access protected app through Okta, Okta would enforce an MFA check before sending the valid authentication confirmation back to Cloudflare Access.

## Which browsers are supported?

These browsers are supported:

* Internet Explorer 11
* Edge (current release, last release)
* Firefox (current release, last release)
* Chrome (current release, last release)
* Safari (current release, last release)

## What languages does the Cloudflare dashboard support?

The Cloudflare dashboard is available in the following languages:

* Deutsch (German)
* English
* Español (Spanish)
* Français (French)
* Italiano (Italian)
* 日本語 (Japanese)
* 한국어 (Korean)
* Português (Portuguese)
* 简体中文 (Mandarin Chinese, Simplified)
* 繁體中文 (Mandarin Chinese, Traditional)

To change your dashboard language, refer to [Profile settings](https://developers.cloudflare.com/fundamentals/user-profiles/customize-account/#language).

## What data localization services are supported?

Cloudflare Zero Trust can be used with the Data Localization Suite to ensure that traffic is only inspected in the regions you choose. For more information refer to [Use Zero Trust with Data Localization Suite](https://developers.cloudflare.com/data-localization/how-to/zero-trust/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/faq/general-faq/#page","headline":"General · Cloudflare One docs","description":"Review frequently asked questions about Cloudflare Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/faq/general-faq/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-06-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["DNS"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/faq/","name":"FAQ"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/faq/general-faq/","name":"General"}}]}
```
