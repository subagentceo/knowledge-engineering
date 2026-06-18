---
title: Cloudflare Cookies
description: Review the cookies Cloudflare sets for load balancing, bot management, challenges, and other product features.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cloudflare Cookies

Cloudflare uses various cookies to maximize network resources, manage traffic, and protect our customers’ sites from malicious traffic.

## Understanding the Cloudflare Cookies

As defined in our [Privacy Policy ↗](https://www.cloudflare.com/privacypolicy/), all the cookies listed below are strictly necessary to provide the services requested by our customers, unless otherwise stated.

As mentioned in our Privacy Policy, Cloudflare encourages our customers to disclose the use of these cookies to their end users. In some jurisdictions, customers may be required by law to disclose these cookies to their end users.

By default, cookie data may be processed in Cloudflare's data center in the United States and is subject to the cross-border data transfer section 7 of the Cloudflare [Privacy Policy ↗](https://www.cloudflare.com/privacypolicy/). Customers who use the [Data Localization Suite](https://developers.cloudflare.com/data-localization/) can control where cookie data is processed (with [Regional Services](https://developers.cloudflare.com/data-localization/regional-services/)) and logged (using the [Customer Metadata Boundary](https://developers.cloudflare.com/data-localization/metadata-boundary/)).

### \_\_cflb cookie for Cloudflare Load Balancer session affinity

When enabling session affinity with [Cloudflare Load Balancer](https://developers.cloudflare.com/load-balancing/understand-basics/session-affinity/), Cloudflare sets a `__cflb` cookie with a unique value on the first response to the requesting client. Cloudflare routes future requests to the same origin, optimizing network resource usage. In the event of a failover, Cloudflare sets a new `__cflb` cookie to direct future requests to the failover pool.

The `__cflb` cookie allows Cloudflare to return an end user to the same customer origin for a specific period of time configured by the customer. This allows the end user to have a seamless experience (for example, this cookie is used for keeping an end user’s items in a shopping cart while they continue to navigate around the website). This cookie is a session cookie that lasts from several seconds up to 24 hours.

Note

Currently Cloudflare only supports Session Affinity in "orange-cloud" (proxied) mode.

### \_\_cf\_bm cookie for Cloudflare bot products

Cloudflare's [bot products](https://developers.cloudflare.com/bots/) identify and mitigate automated traffic to protect your site from bad bots. Cloudflare places the `__cf_bm` cookie on end-user devices that access customer sites protected by Bot Management or Bot Fight Mode. The `__cf_bm` cookie is necessary for these bot solutions to function properly.

This cookie expires after 30 minutes of continuous inactivity by the end user. The cookie contains information related to the calculation of Cloudflare's proprietary bot score and, when Anomaly Detection is enabled on Bot Management, a session identifier. The information in the cookie (other than time-related information) is encrypted and can only be decrypted by Cloudflare.

Note

The `Set-Cookie` header attributes for the `__cf_bm` cookie may use different casing depending on infrastructure version. For example, the expiration attribute may appear as `expires` or `Expires`. If you parse cookie headers programmatically, use case-insensitive matching for attribute names.

A separate `__cf_bm` cookie is generated for each site that an end user visits, as Cloudflare does not track users from site to site or from session to session. The `__cf_bm` cookie is generated independently by Cloudflare, and does not correspond to any user ID or other identifiers in a customer's web application.

Note

Bot Management is available to Enterprise customers as an add-on service. Contact your Cloudflare account team to enable Bot Management for your site. Non-Enterprise customers can enable [Bot Fight Mode or Super Bot Fight Mode](https://developers.cloudflare.com/bots/).

You can disable the `__cf_bm` cookie using the `bm_cookie_enabled` field [via the API](https://developers.cloudflare.com/api/resources/bot%5Fmanagement/methods/update/).

### \_\_cfseq cookie for Cloudflare bot products

[Sequence rules](https://developers.cloudflare.com/bots/additional-configurations/sequence-rules/) uses cookies to track the order of requests a user has made and the time between requests and makes them available via [Cloudflare Rules](https://developers.cloudflare.com/rules/). This allows you to write rules that match valid or invalid sequences. The specific cookies used to validate sequences are called sequence cookies.

### cf\_clearance cookie for Cloudflare bot products

The `cf_clearance` cookie is required for [JavaScript detections](https://developers.cloudflare.com/bots/additional-configurations/javascript-detections/). JavaScript detections are stored in the `cf_clearance` cookie.

The `cf_clearance` cookie is set with `SameSite=None; Secure; Partitioned` so that challenge state is preserved across cross-site requests while complying with [CHIPS ↗ ↗](https://developers.google.com/privacy-sandbox/cookies/chips). When the cookie is issued inside a third-party context, it is stored in a partition keyed to the top-level site and is not shared across embedding sites. For details, refer to [Partitioned cookies (CHIPS) and cf\_clearance](https://developers.cloudflare.com/waf/troubleshooting/samesite-cookie-interaction/#partitioned-cookies-chips-and-cf%5Fclearance).

### cf\_ob\_info and cf\_use\_ob cookie for Cloudflare Always Online

The `cf_ob_info` cookie provides information on:

* The HTTP Status Code returned by the origin web server
* The Ray ID of the original failed request
* The data center serving the traffic

The `cf_use_ob` cookie informs Cloudflare to fetch the requested resource from the Always Online cache on the designated port. Applicable values are: 0, 80, and 443\. The `cf_ob_info` and `cf_use_ob` cookies are persistent cookies that expire after 30 seconds.

### \_\_cfwaitingroom for Cloudflare Waiting Room

[Cloudflare's Waiting Room](https://developers.cloudflare.com/waiting-room/) product enables a waiting room for a particular host and path combination within a zone. Visitors are put in the waiting room and provided an estimate of when they will be allowed to access the application, if not immediately available.

The `__cfwaitingroom` cookie is only used to track visitors that access a waiting room enabled host and path combination for a zone. Visitors using a browser that does not accept cookies cannot visit the host and path combination while the waiting room is active. For more details, refer to [Waiting Room cookies](https://developers.cloudflare.com/waiting-room/reference/waiting-room-cookie/).

### \_\_cfruid to support Cloudflare Rate Limiting (previous version)

The `__cfruid` cookie is strictly necessary to support Cloudflare Rate Limiting products. As part of our Rate Limiting solution, this cookie is required to manage incoming traffic and to have better visibility on the origin of a particular request.

### \_cfuvid for Rate Limiting Rules

The Rate Limiting Rules product uses a number of techniques for applying rate limits to traffic where multiple unique visitors share the same IP address, such as traffic from behind a NAT. These techniques can be enabled by using the `cf.unique_visitor_id` field in the rate limiting configuration.

The `_cfuvid` cookie is only set when a site uses this option in a Rate Limiting Rule, and is only used to allow the Cloudflare WAF to distinguish individual users who share the same IP address. Visitors who do not provide the cookie are likely to be grouped together and may not be able to access the site if there are many other visitors from the same IP address.

### Additional cookies used by the Challenge Platform

The table below shows additional cookies used by the Challenge Platform.

| Cookie Name                                     | Description                                                                                                                                            |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| cf\_clearance                                   | Clearance Cookie stores the proof of challenge passed. It is used to no longer issue a challenge if present. It is required to reach an origin server. |
| cf\_chl\_rc\_i; cf\_chl\_rc\_ni; cf\_chl\_rc\_m | These cookies are for internal use which allows Cloudflare to identify production issues on clients.                                                   |

Warning

If your website is not [using HTTPS](https://developers.cloudflare.com/ssl/edge-certificates/encrypt-visitor-traffic/), you may experience issues with the [cf\_clearance cookie](https://developers.cloudflare.com/waf/troubleshooting/samesite-cookie-interaction/#known-issues-with-samesite-and-cf%5Fclearance-cookies).

### Cloudflare Access cookies

To review Cloudflare Access cookies and their behavior, refer to [Access cookies](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/#access-cookies).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cloudflare-cookies/#page","headline":"Cloudflare Cookies · Cloudflare Fundamentals docs","description":"Review the cookies Cloudflare sets for load balancing, bot management, challenges, and other product features.","url":"https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cloudflare-cookies/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/reference/policies-compliances/","name":"Policies"}},{"@type":"ListItem","position":5,"item":{"@id":"/fundamentals/reference/policies-compliances/cloudflare-cookies/","name":"Cloudflare Cookies"}}]}
```
