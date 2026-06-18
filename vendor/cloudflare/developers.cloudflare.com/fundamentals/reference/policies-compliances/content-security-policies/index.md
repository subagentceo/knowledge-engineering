---
title: Content Security Policies (CSPs)
description: Understand how Cloudflare interacts with Content Security Policies (CSPs) and which headers to update for specific Cloudflare features.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Content Security Policies (CSPs)

A **Content Security Policy (CSP)** is an added layer of security that helps detect and mitigate certain types of attacks, including:

* Content/code injection
* Cross-site scripting (XSS)
* Embedding malicious resources
* Malicious iframes (clickjacking)

To learn more about configuring a CSP in general, refer to the [Mozilla documentation ↗](https://developer.mozilla.org/docs/web/http/csp).

## Using a CSP with Cloudflare

Cloudflare's [CDN](https://developers.cloudflare.com/cache/) is compatible with CSP.

Cloudflare does not:

* Modify CSP headers from the origin web server (except when using Zaraz, to ensure the [Zaraz script is always running ↗](https://blog.cloudflare.com/cloudflare-zaraz-supports-csp/)).
* Require changes to acceptable sources for first or third-party content.
* Modify URLs (besides adding the [/cdn-cgi/ endpoint](https://developers.cloudflare.com/fundamentals/reference/cdn-cgi-endpoint/) and [Cloudflare Fonts](https://developers.cloudflare.com/speed/optimization/content/fonts/) that rewrites Google Fonts urls).
* Interfere with locations specified in your CSP.

If you require the CSP headers to be changed or added, you can change them using some Cloudflare products:

* If your website is [proxied](https://developers.cloudflare.com/dns/proxy-status/) through Cloudflare, you can use a [response header transform rule](https://developers.cloudflare.com/rules/transform/response-header-modification/) to replace or add CSP headers.
* If your website is hosted using [Cloudflare Pages](https://developers.cloudflare.com/pages/), you can set a [\_headers file](https://developers.cloudflare.com/pages/configuration/headers/) to modify or add CSP headers.

### Product requirements

To use certain Cloudflare features, however, you may need to update the headers in your CSP:

| Feature(s)                                                                                             | Updated headers                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Rocket Loader](https://developers.cloudflare.com/speed/optimization/content/rocket-loader/)           | script-src 'self' ajax.cloudflare.com;                                                                                                                                               |
| [Scrape Shield](https://developers.cloudflare.com/waf/tools/scrape-shield/)                            | script-src 'self' 'unsafe-inline'                                                                                                                                                    |
| [Web Analytics](https://developers.cloudflare.com/web-analytics/)                                      | script-src static.cloudflareinsights.com; connect-src cloudflareinsights.com                                                                                                         |
| [Bot products](https://developers.cloudflare.com/bots/)                                                | Refer to [JavaScript detections and CSPs](https://developers.cloudflare.com/cloudflare-challenges/challenge-types/javascript-detections/#if-you-have-a-content-security-policy-csp). |
| [Client-side security](https://developers.cloudflare.com/client-side-security/) (formerly Page Shield) | Refer to [CSP header format](https://developers.cloudflare.com/client-side-security/reference/csp-header/).                                                                          |
| [Zaraz](https://developers.cloudflare.com/zaraz/)                                                      | No updates required ([details ↗](https://blog.cloudflare.com/cloudflare-zaraz-supports-csp/)).                                                                                       |
| [Turnstile](https://developers.cloudflare.com/turnstile/)                                              | Refer to [Turnstile CSP](https://developers.cloudflare.com/turnstile/reference/content-security-policy/).                                                                            |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/reference/policies-compliances/content-security-policies/#page","headline":"Content Security Policies (CSPs) and Cloudflare · Cloudflare Fundamentals docs","description":"Understand how Cloudflare interacts with Content Security Policies (CSPs) and which headers to update for specific Cloudflare features.","url":"https://developers.cloudflare.com/fundamentals/reference/policies-compliances/content-security-policies/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/reference/policies-compliances/","name":"Policies"}},{"@type":"ListItem","position":5,"item":{"@id":"/fundamentals/reference/policies-compliances/content-security-policies/","name":"Content Security Policies (CSPs)"}}]}
```
