---
title: Pathing status
description: Understand edge pathing status fields in logs.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Pathing status

## Understand pathing

Cloudflare issues the following **Edge Pathing Statuses**:

* **EdgePathingSrc** (pathing source): The stage that made the routing decision.
* **EdgePathingOp** (pathing operation): The specific action or operation taken.
* **EdgePathingStatus** (pathing status): Additional information complementing the **EdgePathingOp**.

### EdgePathingSrc

**EdgePathingSrc** refers to the system that last handled the request before an error occurred or the request was passed to the cache server. Typically, this will be the macro/reputation list. Possible pathing sources include:

* `err`
* `sslv` (SSL verification checker)
* `bic` (browser integrity check)
* `hot` (hotlink protection)
* `macro` (the reputation list)
* `skip` (Always Online or cdnjs resources)
* `user` (user firewall rule)

For example:

Terminal window

```

jq -r .EdgePathingSrc logs.json | sort -n | uniq -c | sort -n | tail


```

```

1 err

5 user

93 macro


```

### EdgePathingOp

**EdgePathingOp** indicates how the request was handled. `wl` is a request that passed all security checks in the cn. Other possible values are:

* `errHost` (host header mismatch, DNS errors, etc.)
* `ban` (blocked by IP address, range, etc.)

For example:

Terminal window

```

jq -r .EdgePathingOp logs.json | sort -n | uniq -c | sort -n | tail


```

```

1 errHost

97 wl


```

### EdgePathingStatus

**EdgePathingStatus** is the value **EdgePathingSrc** returns. With a pathing source of `macro`, `user`, or `err`, the pathing status indicates the list where the IP address was found. `nr` is the most common value and it means that the request was not flagged by a security check. Some values indicate the class of user; for example, `se` means search engine.

For example:

Terminal window

```

jq -r .EdgePathingStatus logs.json | sort -n | uniq -c | sort -n | tail


```

```

1 dnsErr

5 ip

92 nr


```

## How does pathing map to Threat Analytics?

Certain combinations of pathing have been labeled in the Cloudflare **Threat Analytics** feature (in the **Analytics** app in the Cloudflare dashboard). The mapping is as follows:

| Pathing         | Label                |
| --------------- | -------------------- |
| bic.ban.unknown | Bad browser          |
| hot.ban.unknown | Blocked hotlink      |
| hot.ban.ip      |                      |
| macro.ban.ip    | Bad IP               |
| user.ban.ctry   | Country block        |
| user.ban.ip     | IP block (user)      |
| user.ban.ipr16  | IP range block (/16) |
| user.ban.ipr24  | IP range block (/24) |

## Understand response fields

The response status appears in three places in a request:

* **edgeResponse**
* **cacheResponse**
* **originResponse**

In your logs, the edge is what first accepts a visitor's request. The cache then accepts the request and either forwards it to your origin or responds from the cache. It is possible to have a request that has only an **edgeResponse** or a request that has an **edgeResponse** and a **cacheResponse**, but no **originResponse**.

This is how you can see where a request terminates. Requests with only an **edgeResponse** likely hit a security check or processing error. Requests with an **edgeResponse** and a **cacheResponse** either were served from the cache or saw an error contacting your origin server. Requests that have an **originResponse** went all the way to your origin server and errors seen would have been served directly from there.

For example, the following query shows the status code and pathing information for all requests that terminated at the Cloudflare edge:

Terminal window

```

jq -r 'select(.OriginResponseStatus == null) | select(.CacheResponseStatus == null) |"\(.EdgeResponseStatus) / \(.EdgePathingSrc) / \(.EdgePathingStatus) / \(.EdgePathingOp)"' logs.json | sort -n | uniq -c | sort -n


```

```

1 403 / macro / nr / wl

1 409 / err / dnsErr / errHost


```

The information stored is broken down based on the following categories:

## Errors

These occur for requests that did not pass any of the validation performed by the Cloudflare network. Example cases include:

* Whenever Cloudflare is unable to look up a domain or zone.
* An attempt to improperly use the IP for an origin server.
* Domain ownership is unclear (for example, the domain is not in Cloudflare).

| EdgePathingStatus  | Description                                               | EdgePathingOp | Status Code |
| ------------------ | --------------------------------------------------------- | ------------- | ----------- |
| cyclic             | Cloudflare loop.                                          | err\_host     | 403         |
| dns\_err           | Unable to resolve.                                        | err\_host     | 409         |
| reserved\_ip       | DNS points to local or disallowed IP.                     | err\_host     | 403         |
| reserved\_ip6      | DNS points to local or disallowed IPv6 address.           | err\_host     | 403         |
| bad\_host          | Bad or no Host header.                                    | err\_host     | 403         |
| no\_existing\_host | Ownership lookup failed: host possibly not on Cloudflare. | err\_host     | 409         |

## User-based actions

These occur for actions triggered from users based on the configuration for a specific IP (or IP range).

| EdgePathingStatus                                  | Description                                   | EdgePathingOp | EdgePathingSrc | Status Code |
| -------------------------------------------------- | --------------------------------------------- | ------------- | -------------- | ----------- |
| Asnum ip ipr24 ipr16 ip6 ip6r64 ip6r48 ip6r32 ctry | The request was blocked.                      | ban           | user           | 403         |
| Asnum ip ipr24 ipr16 ip6 ip6r64 ip6r48 ip6r32 ctry | The request was allowed.WAF will not execute. | wl            | user           | n/a         |

## Firewall Rules

Cloudflare Firewall Rules (deprecated) triggers actions based on matching customer-defined rules.

| EdgePathingStatus       | Description              | EdgePathingOp |
| ----------------------- | ------------------------ | ------------- |
| filter\_based\_firewall | The request was blocked. | ban           |
| filter\_based\_firewall | The request was allowed. | wl            |

## Zone Lockdown

**Zone Lockdown** blocks visitors to particular URIs where the visitor's IP is not allowlisted.

| EdgePathingStatus | Description        | EdgePathingOp | EdgePathingSrc |
| ----------------- | ------------------ | ------------- | -------------- |
| zl                | Lock down applied. | ban           | user           |

## Firewall User-Agent Block

Challenge (Interactive or Non-Interactive) or block visitors who use a browser for which the User-Agent name matches a specific string.

| EdgePathingStatus | Description         | EdgePathingOp | EdgePathingSrc |
| ----------------- | ------------------- | ------------- | -------------- |
| ua                | Blocked User-Agent. | ban           | user           |

## Browser Integrity Check

Assert whether the source of the request is illegitimate or the request itself is malicious.

| EdgePathingStatus | Description      | EdgePathingOp | EdgePathingSrc |
| ----------------- | ---------------- | ------------- | -------------- |
| empty             | Blocked request. | ban           | bic            |

## Hot Linking

Prevent hot linking from other sites.

| EdgePathingStatus | Description      | EdgePathingOp | EdgePathingSrc |
| ----------------- | ---------------- | ------------- | -------------- |
| empty             | Blocked request. | ban           | hot            |

## L7-to-L7 DDoS mitigation

Drop DDoS attacks through L7 mitigation.

| EdgePathingStatus | Description      | EdgePathingOp | EdgePathingSrc |
| ----------------- | ---------------- | ------------- | -------------- |
| l7ddos            | Blocked request. | ban           | protect        |

## IP Reputation (MACRO)

The macro stage is comprised of many different paths. They are categorized by the reputation of the visitor IP.

| EdgePathingStatus | Description                                                                                                                               | EdgePathingOp | EdgePathingSrc |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------- | -------------- |
| nr                | There is no reputation data for the IP and no action is being taken.                                                                      | wl            | macro          |
| wl                | IP is explicitly allowlisted.                                                                                                             | wl            | macro          |
| scan              | IP is explicitly allowlisted and categorized as a security scanner.                                                                       | wl            | macro          |
| mon               | IP is explicitly allowlisted and categorized as a Monitoring Service.                                                                     | wl            | macro          |
| bak               | IP is explicitly allowlisted and categorized as a Backup Service.                                                                         | wl            | macro          |
| mob               | IP is explicitly allowlisted and categorized as Mobile Proxy Service.                                                                     | wl            | macro          |
| se                | IP is explicitly allowlisted as it belongs to a search engine crawler and no action is taken.                                             | wl            | macro          |
| grey              | IP is greylisted (suspected to be bad) but the request was either for a favicon or security is turned off and as such, it is allowlisted. | wl            | macro          |
| bad\_ok           | The reputation score of the IP is bad but the request was either for a favicon or security is turned off and as such, it is allowlisted.  | wl            | macro          |
| unknown           | The pathing\_status is unknown and the request is being processed as normal.                                                              | wl            | macro          |

## Rate Limiting

| EdgePathingStatus | Description                   | EdgePathingOp | EdgePathingSrc |
| ----------------- | ----------------------------- | ------------- | -------------- |
| rate\_limit       | Dropped request.              | ban           | user           |
| rate\_limit       | IP is explicitly allowlisted. | simulate      | user           |

## Special cases

| EdgePathingStatus                                         | Description                         | EdgePathingOp | EdgePathingSrc |
| --------------------------------------------------------- | ----------------------------------- | ------------- | -------------- |
| ao\_crawl                                                 | AO (Always Online) crawler request. | wl            | skip           |
| cdnjs                                                     | Request to a cdnjs resource.        | wl            | skip           |
| Certain challenge forced by Cloudflare's special headers. | forced                              |               |                |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/reference/pathing-status/#page","headline":"Pathing status · Cloudflare Logs docs","description":"Understand edge pathing status fields in logs.","url":"https://developers.cloudflare.com/logs/reference/pathing-status/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/logs/","name":"Logs"}},{"@type":"ListItem","position":3,"item":{"@id":"/logs/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/logs/reference/pathing-status/","name":"Pathing status"}}]}
```
