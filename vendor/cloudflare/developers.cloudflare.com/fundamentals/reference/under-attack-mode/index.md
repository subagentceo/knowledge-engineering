---
title: Under Attack mode
description: Turn on Cloudflare Under Attack mode to mitigate layer 7 DDoS attacks by challenging suspicious visitors with an interstitial page.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Under Attack mode

Cloudflare's Under Attack mode performs additional security checks to help mitigate layer 7 DDoS attacks. Validated users access your website and suspicious traffic is blocked. It is designed to be used as one of the last resorts when a zone is under attack (and will temporarily pause access to your site and impact your site analytics).

When enabled, visitors receive an interstitial page.

## Turn on Under Attack mode

Under Attack mode is turned off by default for your zone.

### Globally

To put your entire zone in Under Attack mode:

1. In the Cloudflare dashboard, select your account and zone from the **Account home** page.  
[ Go to **Account home** ](https://dash.cloudflare.com/?to=/:account/home)
2. In the zone overview page, turn on **Under Attack Mode** in the **Quick Actions** sidebar.

### Selectively

To enable Under Attack mode for specific pages or sections of your site, use a [configuration rule](https://developers.cloudflare.com/rules/configuration-rules/) to adjust the **Security Level**.

**When incoming requests match**

* **Field:** _URI Path_
* **Operator:** _starts with_
* **Value:** `/admin`

If you are using the Expression Editor, enter the following expression:  
`(starts_with(http.request.uri.path, "/admin"))`

**Then the settings are**

1. For **I'm Under Attack**, select **Add**.
2. Switch the toggle to **On**.

To turn it on for specific ASNs (hosts/ISPs that own IP addresses), countries, or IP ranges, use [IP Access Rules](https://developers.cloudflare.com/waf/tools/ip-access-rules/).

---

## Preview Under Attack mode

To preview what Under Attack mode looks like for your visitors:

1. In the Cloudflare dashboard, go to the **Configurations** page.  
[ Go to **Configurations** ](https://dash.cloudflare.com/?to=/:account/configurations)
2. Go to **Custom Pages**.
3. For **Managed Challenge / I'm Under Attack Mode™**, select **Custom Pages** \> **View default**.

The `Checking your browser before accessing...` challenge determines whether to block or allow a visitor within five seconds. After passing the challenge, the visitor does not observe another challenge until the duration configured in [Challenge Passage](https://developers.cloudflare.com/cloudflare-challenges/challenge-types/challenge-pages/challenge-passage/).

---

## Potential issues

Since the Under Attack mode requires your browser to support JavaScript to display and pass the interstitial page, it is expected to observe impact on third party analytics tools.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/reference/under-attack-mode/#page","headline":"Under Attack mode · Cloudflare Fundamentals docs","description":"Turn on Cloudflare Under Attack mode to mitigate layer 7 DDoS attacks by challenging suspicious visitors with an interstitial page.","url":"https://developers.cloudflare.com/fundamentals/reference/under-attack-mode/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/reference/under-attack-mode/","name":"Under Attack mode"}}]}
```
