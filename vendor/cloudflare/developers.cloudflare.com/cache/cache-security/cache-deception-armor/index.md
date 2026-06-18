---
title: Cache Deception Armor
description: Prevent cache deception attacks that expose private content.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cache Deception Armor

## Web Cache Deception attacks

A Web Cache Deception attack tricks a user into visiting a URL that appears to point to a static asset but actually returns dynamic, personalized content from the origin.

This attack works when an origin treats requests to non-existent paths as equivalent to a parent path — for example, when `http://www.example.com/newsfeed` is a dynamic page that returns different content for each authenticated user, and the origin also serves that same response for `/newsfeed/foo.jpg`. Because the path ends in `.jpg`, Cloudflare caches the response by default. The attacker then visits the same URL and receives the cached copy of the user's personalized content.

## Cache Deception Armor protects against attacks

You can protect users from Web Cache Deception attacks by [creating a cache rule](https://developers.cloudflare.com/cache/cache-security/cache-deception-armor/#enable-cache-deception-armor). With this rule, you can continue to cache static assets, but the rule will verify a URL's extension matches the returned `Content-Type`.

In the newsfeed example above, if `http://www.example.com/newsfeed` is a script that outputs a webpage, the `Content-Type` is `text/html`. On the other hand, `http://www.example.com/newsfeed/foo.jpg` is expected to have `image/jpeg` as `Content-Type`. When a mismatch that could result in a Web Cache Deception attack is found, Cloudflare does not cache the response.

### Exceptions

* If the returned `Content-Type` is `application/octet-stream`, the extension does not matter because that is typically a signal to instruct the browser to save the asset instead of to display it.
* Cloudflare allows `.jpg` to be served as `image/webp` or `.gif` as `video/webm` and other cases that are unlikely to be attacks.
* Keep in mind that Cache Deception Armor depends upon [Origin Cache Control](https://developers.cloudflare.com/cache/concepts/cache-control/). A `Cache-Control` header from the origin, or an [Edge Cache TTL Cache Rule](https://developers.cloudflare.com/cache/how-to/cache-rules/settings/#edge-ttl) may override the protection.

## Enable Cache Deception Armor

To enable Cache Deception Armor, you need to start by creating a [cache rule](https://developers.cloudflare.com/cache/how-to/cache-rules/). Follow the steps below for guidance:

1. In the Cloudflare dashboard, go to the **Cache Rules** page.  
[ Go to **Cache Rules** ](https://dash.cloudflare.com/?to=/:account/:zone/caching/cache-rules)
2. Select **Create rule**.
3. Under **When incoming requests match**, define the [rule expression](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/edit-expressions/#expression-builder).
4. Under **Then**, in the **Cache eligibility** section, select **Eligible for cache**.
5. Add the **Cache Key** setting to the rule and turn on **Cache deception armor**.
6. To save and deploy your rule, select **Deploy**. If you are not ready to deploy your rule, select **Save as Draft**.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/cache-security/cache-deception-armor/#page","headline":"Cache Deception Armor · Cloudflare Cache (CDN) docs","description":"Prevent cache deception attacks that expose private content.","url":"https://developers.cloudflare.com/cache/cache-security/cache-deception-armor/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Security"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cache/","name":"Cache / CDN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cache/cache-security/","name":"Cache security"}},{"@type":"ListItem","position":4,"item":{"@id":"/cache/cache-security/cache-deception-armor/","name":"Cache Deception Armor"}}]}
```
