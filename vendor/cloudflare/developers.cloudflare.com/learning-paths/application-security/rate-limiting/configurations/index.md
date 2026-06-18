---
title: Configurations
description: Configure rules with advanced settings.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Configurations

Let's step through an example. If your `/create-account` page is being attacked, you will create a rule to limit the amount of requests, per `counting characteristic`, that you feel comfortable permitting through to your origin.

The rule below is being created on the `free` plan, which limits configuration options. The rule will trigger if the URI path matches `/create-account`, from the same IP address, _after_ 5 requests and within a 10 second window, [within each Cloudflare datacenter](https://developers.cloudflare.com/waf/rate-limiting-rules/request-rate/), globally.

---

![rate-limiting-create-account-endpoint](https://developers.cloudflare.com/_astro/rl-create-account-endpoint.BFxHF746_ZuP5Pg.webp)![rate-limiting-create-account-endpoint-block](https://developers.cloudflare.com/_astro/rl-create-account-endpoint-block.DOOFhKll_Z1wTXBj.webp) 

---

## Advanced configuration

In the previous module, we reviewed the various configurations available per plan. Using the same endpoint as an example, let us walk through another example, but with the additional advanced configurations.

The rule below is being created on the `enterprise` plan, so we are no longer limited to default configurations.

* The rule will also limit the number of requests to `/create-account`, but will only trigger against `POST` requests. In the basic example, even requests with the `GET` method will increment the counter.
* Requests that do not have a [client certificate (mTLS)](https://developers.cloudflare.com/ssl/client-certificates/), will increment the counter.
* Requests will be counted using the [IP with NAT support](https://developers.cloudflare.com/waf/rate-limiting-rules/parameters/#use-cases-of-ip-with-nat-support) characteristic.
* Within a 1 minute period, for each counted entity, if the number of requests exceeds 10, then the user will be presented with a [Managed Challenge](https://developers.cloudflare.com/cloudflare-challenges/challenge-types/challenge-pages/#managed-challenge) for a custom duration of 1 day.
![rate-limiting-advanced-config-1](https://developers.cloudflare.com/_astro/rl-advanced-config.CWcevnzk_Z1ixPSR.webp) 

---

## Best practices

Rules that match identical criteria can be stacked together. For example, instead of creating just a single rule for `/create-account`, you can create multiple rules that match the same path but have different `counting characteristics` or `request limits` to protect against a threat that might behave dynamically.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/application-security/rate-limiting/configurations/#page","headline":"Configurations · Cloudflare Learning Paths","description":"Configure rules with advanced settings.","url":"https://developers.cloudflare.com/learning-paths/application-security/rate-limiting/configurations/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/application-security/rate-limiting/","name":"Rate Limiting"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/application-security/rate-limiting/configurations/","name":"Configurations"}}]}
```
