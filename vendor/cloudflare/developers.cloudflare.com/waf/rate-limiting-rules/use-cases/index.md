---
title: Rate limiting rule examples
description: Sample rate limiting rule configurations for login pages, APIs, and geographic restrictions.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Rate limiting rule examples

The examples below include sample rate limiting rule configurations.

## Example 1

The following [rate limiting rule](https://developers.cloudflare.com/waf/rate-limiting-rules/create-zone-dashboard/) performs rate limiting on incoming requests from the US addressed at the login page, except for one allowed IP address.

**When incoming requests match:**

| Field             | Operator       | Value         |     |
| ----------------- | -------------- | ------------- | --- |
| URI Path          | equals         | /login        | And |
| Country           | equals         | United States | And |
| IP Source Address | does not equal | 192.0.0.1     |     |

If you are using the expression editor:  
`(http.request.uri.path eq "/login" and ip.src.country eq "US" and ip.src ne 192.0.0.1)`

**With the same characteristics:**

* _IP_
* _Data center ID_ (included by default in the dashboard, but not shown)

## Example 2

The following [rate limiting rule](https://developers.cloudflare.com/waf/rate-limiting-rules/create-zone-dashboard/) performs rate limiting on incoming requests with a given base URI path, incrementing on the IP address and the provided API key.

**When incoming requests match:**

| Field          | Operator | Value    |     |
| -------------- | -------- | -------- | --- |
| URI Path       | contains | /product | And |
| Request Method | equals   | POST     |     |

If you are using the expression editor:  
`(http.request.uri.path contains "/product" and http.request.method eq "POST")`

**With the same characteristics:**

* _IP_
* _Header value of_ \> `x-api-key`
* _Data center ID_ (included by default in the dashboard, but not shown)

## Example 3

The following [rate limiting rule](https://developers.cloudflare.com/waf/rate-limiting-rules/create-zone-dashboard/) performs rate limiting on requests targeting multiple URI paths in two hosts, excluding known bots. The request rate is based on IP address and `User-Agent` values.

**When incoming requests match:**

`(http.request.uri.path eq "/store" or http.request.uri.path eq "/prices") and (http.host eq "mystore1.com" or http.host eq "mystore2.com") and not cf.client.bot`

**With the same characteristics:**

* _IP_
* _Header value of_ \> `user-agent`
* _Data center ID_ (included by default in the dashboard, but not shown)

## Example 4

Note

[Complexity-based rate limiting](https://developers.cloudflare.com/waf/rate-limiting-rules/request-rate/#complexity-based-rate-limiting) is only available to Enterprise customers with Advanced Rate Limiting.

The following [rate limiting rule](https://developers.cloudflare.com/waf/rate-limiting-rules/create-zone-dashboard/) performs complexity-based rate limiting. The rule takes into account the `my-score` HTTP response header provided by the origin server to calculate a total complexity score for the client with the provided API key.

The counter with the total score is updated when there is a match for the rate limiting rule's [counting expression](https://developers.cloudflare.com/waf/rate-limiting-rules/parameters/#increment-counter-when) (in this case, the same as the rule expression since a counting expression was not provided). When this total score becomes larger than `400` during a period of one minute, any later client requests will be blocked for a period of 10 minutes.

**When incoming requests match:**

| Field    | Operator | Value       |
| -------- | -------- | ----------- |
| URI Path | wildcard | /graphql/\* |

If you are using the expression editor:  
`(http.request.uri.path wildcard "/graphql/*")`

**With the same characteristics:**

* _Header value of_ \> `x-api-key`
* _Data center ID_ (included by default in the dashboard, but not shown)

When rate exceeds: **Complexity based**

* Score per period: `400`
* Period: _1 minute_
* Response header name: `my-score`

Then take action:

* Choose action: _Block_

With the following behavior: **Block for the selected duration**

* Duration: _10 minutes_

For an API example with this rule configuration, refer to [Create a rate limiting rule via API](https://developers.cloudflare.com/waf/rate-limiting-rules/create-api/#example-d---complexity-based-rate-limiting-rule).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/rate-limiting-rules/use-cases/#page","headline":"Rate limiting rule examples · Cloudflare Web Application Firewall (WAF) docs","description":"Sample rate limiting rule configurations for login pages, APIs, and geographic restrictions.","url":"https://developers.cloudflare.com/waf/rate-limiting-rules/use-cases/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/rate-limiting-rules/","name":"Rate limiting rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/rate-limiting-rules/use-cases/","name":"Rate limiting rule examples"}}]}
```
