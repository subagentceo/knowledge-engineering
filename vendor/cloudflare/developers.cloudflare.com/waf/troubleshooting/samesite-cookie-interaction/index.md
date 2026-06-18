---
title: SameSite cookie interaction with Cloudflare
description: How SameSite cookie attributes interact with Cloudflare challenges.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# SameSite cookie interaction with Cloudflare

[Google Chrome enforces SameSite cookie behavior ↗](https://www.chromium.org/updates/same-site) to protect against marketing cookies that track users and Cross-site Request Forgery (CSRF) that allows attackers to steal or manipulate your cookies.

The `SameSite` cookie attribute has three different modes:

* **Strict**: Cookies are created by the first party (the visited domain). For example, a first-party cookie is set by Cloudflare when visiting `cloudflare.com`.
* **Lax**: Cookies are only sent to the apex domain (such as `example.com`). For example, if someone (`blog.example.net`) hotlinked an image (`img.example.com/bar.png`), the client does not send a cookie to `img.example.com` since it is neither the first-party nor apex context.
* **None**: Cookies are sent with all requests.

`SameSite` settings for [Cloudflare cookies](https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cloudflare-cookies/) include:

| Cloudflare cookie | SameSite setting      | HTTPS Only | Partitioned (CHIPS) |
| ----------------- | --------------------- | ---------- | ------------------- |
| \_\_cf\_bm        | SameSite=None; Secure | Yes        | No                  |
| cf\_clearance     | SameSite=None; Secure | Yes        | Yes                 |
| \_\_cflb          | SameSite=Lax          | No         | No                  |

## SameSite attribute in session affinity cookies

Currently, to configure the `SameSite` attribute on [session affinity cookies](https://developers.cloudflare.com/load-balancing/understand-basics/session-affinity/) you must use the Cloudflare API (for example, the [Create Load Balancer](https://developers.cloudflare.com/api/resources/load%5Fbalancers/methods/create/) operation).

To configure the value of the `SameSite` cookie attribute, include the `samesite` and `secure` JSON attributes in your HTTP request, inside the `session_affinity_attributes` object.

The available values for these two attributes are the following:

**`samesite` attribute:**

* Valid values: `Auto` (default), `Lax`, `None`, `Strict`.

**`secure` attribute:**

* Valid values: `Auto` (default), `Always`, `Never`.

The `Auto` value for the `samesite` attribute will have the following behavior:

* If [**Always Use HTTPS**](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/always-use-https/) is enabled, session affinity cookies will use the `Lax` SameSite mode.
* If **Always Use HTTPS** is disabled, session affinity cookies will use the `None` SameSite mode.

The `Auto` value for the `secure` attribute will have the following behavior:

* If **Always Use HTTPS** is enabled, session affinity cookies will include `Secure` in the SameSite attribute.
* If **Always Use HTTPS** is disabled, session affinity cookies will not include `Secure` in the SameSite attribute.

If you set `samesite` to `None` in your API request, you cannot set `secure` to `Never`.

If you require a specific `SameSite` configuration in your session affinity cookies, Cloudflare recommends that you provide values for `samesite` and `secure` different from `Auto`, instead of relying on the default behavior. This way, the value of the `SameSite` cookie attribute will not change due to configuration changes (namely [**Always Use HTTPS**](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/always-use-https/)).

---

## Known issues with SameSite and `cf_clearance` cookies

When a visitor solves a [challenge](https://developers.cloudflare.com/cloudflare-challenges/) presented due to a [custom rule](https://developers.cloudflare.com/waf/custom-rules/) or an [IP access rule](https://developers.cloudflare.com/waf/tools/ip-access-rules/), a `cf_clearance` cookie is set in the visitor's browser. The `cf_clearance` cookie has a default lifetime of 30 minutes, which you can configure via [Challenge Passage](https://developers.cloudflare.com/cloudflare-challenges/challenge-types/challenge-pages/challenge-passage/).

Cloudflare uses `SameSite=None` in the `cf_clearance` cookie so that visitor requests from different hostnames are not met with later challenges or errors. When `SameSite=None` is used, it must be set in conjunction with the `Secure` flag.

Using the `Secure` flag requires sending the cookie via an HTTPS connection. If you use HTTP on any part of your website, the `cf_clearance` cookie defaults to `SameSite=Lax`, which may cause your website not to function properly.

To resolve the issue, move your website traffic to HTTPS. Cloudflare offers two features for this purpose:

* [Automatic HTTPS Rewrites](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/automatic-https-rewrites/)
* [Always Use HTTPS](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/always-use-https/)

---

## Partitioned cookies (CHIPS) and `cf_clearance`

Cloudflare sets the `Partitioned` attribute on the `cf_clearance` cookie (and on the internal `cf_chl_*` cookies used by the Challenge Platform) to comply with [Cookies Having Independent Partitioned State (CHIPS) ↗ ↗](https://developers.google.com/privacy-sandbox/cookies/chips).

With CHIPS, a cookie set in a third-party context (for example, inside an iframe or from a cross-site subresource) is stored in a partition keyed to the top-level site, rather than being shared across all sites that embed the third party. On Chromium-based browsers that block third-party cookies, this preserves challenge state for cross-site embeds that would otherwise be broken. On browsers that do not implement CHIPS, the `Partitioned` attribute is ignored and behavior is unchanged.

The `Partitioned` attribute is not applied to `__cf_bm`.

### Impact on embedded challenges

Because `cf_clearance` is partitioned, a clearance obtained in one top-level context is not reused in a different top-level context. A visitor who passes a challenge while browsing a site directly will not automatically carry that clearance into another site that embeds it, and vice versa. This is the intended behavior under CHIPS.

### `Partitioned` requires `SameSite=None; Secure`

The `Partitioned` attribute only takes effect on cookies that are also set with `SameSite=None; Secure`. If your site does not serve all traffic over HTTPS, the `cf_clearance` cookie falls back to `SameSite=Lax` (refer to [Known issues with SameSite and cf\_clearance cookies](#known-issues-with-samesite-and-cf%5Fclearance-cookies)), and the `Partitioned` attribute has no effect.

---

## Related resources

* [SameSite cookies explained ↗](https://web.dev/samesite-cookies-explained/)
* [Cloudflare Cookies](https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cloudflare-cookies/)
* [Cloudflare SSL FAQ](https://developers.cloudflare.com/ssl/faq/)
* [Automatic HTTPS Rewrites](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/automatic-https-rewrites/)
* [Always Use HTTPS](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/always-use-https/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/troubleshooting/samesite-cookie-interaction/#page","headline":"SameSite cookie interaction with Cloudflare · Cloudflare Web Application Firewall (WAF) docs","description":"How SameSite cookie attributes interact with Cloudflare challenges.","url":"https://developers.cloudflare.com/waf/troubleshooting/samesite-cookie-interaction/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Cookies","Debugging"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/troubleshooting/samesite-cookie-interaction/","name":"SameSite cookie interaction with Cloudflare"}}]}
```
