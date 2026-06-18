---
title: Status codes
description: Analyze HTTP status code distribution per data center.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Status codes

Note

Status Codes analytics by data center is exclusive to the [enterprise level of service ↗](https://www.cloudflare.com/plans/enterprise/contact/).

Status Codes metrics in the Cloudflare dashboard **Analytics** app provide customers with a deeper insight into the distribution of errors that are occurring on their website per data center. A data center facility is where Cloudflare runs its servers that make up our edge network ([current locations ↗](https://www.cloudflare.com/network/)).

HTTP status codes that appear in a response passing through our edge are displayed in analytics.

The `Origin Status Code` can help you investigate issues on your origin. If your origin returns a `5xx` error, Cloudflare's edge will forward this error to the end user. Comparing the `Edge Status Code` and `Origin Status Code` can help determine whether the issue is occurring on your origin or on the Cloudflare edge.

Errors that originate from our edge servers (blank `502`, `503`, or `504` error page with just `Cloudflare`) are not reported as part of the error analytics.

You can filter out specific error(s) by selecting one or more in the legend. You can also exclude a particular error and it will no longer display as part of the graph.

Note

Users may also see `100x` errors which are not reported. These will be displayed as either `403` or `409` (edge) errors.

![Error analytics by Cloudflare data center](https://developers.cloudflare.com/_astro/status-codes.BbTZPg-P_ZDqqiT.webp) 

---

## Common edge status codes

* `400` \- Bad Request intercepted at the Cloudflare Edge (for example, missing or bad HTTP header)
* `403` \- Security functionality (for example, Web Application Firewall, Browser Integrity Check, [Cloudflare challenges](https://developers.cloudflare.com/cloudflare-challenges/), and most 1xxx error codes)
* `409` \- DNS errors typically in the form of 1000 or 1001 error code
* `413` \- File size upload exceeded the maximum size allowed (configured in the dashboard under **Network** \> **Maximum Upload Size**.)
* `444` \- Used by Nginx to indicate that the server has returned no information to the client, and closed the connection. This error code is internal to Nginx and is **not** returned to the client.
* `499` \- Used by Nginx to indicate when a connection has been closed by the client while the server is still processing its request, making the server unable to send a status code back.

For more information, refer to [4xx Client Error](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/).

---

## Common origin status codes

* `400` \- Origin rejected the request due to bad, or unsupported syntax sent by the application.
* `404` \- Only if the origin triggered a 404 response for a request.
* `4xx`
* `50x`

For more information, refer to [4xx Client Error](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/) and [Troubleshooting Cloudflare 5XX errors](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/).

---

## 52x errors

* `520` \- This is essentially a "catch-all" response for when the origin server returns something unexpected, or something that is not tolerated/cannot be interpreted by our edge (that is, protocol violation or empty response).
* `522` \- Our edge could not establish a TCP connection to the origin server.
* `523` \- Origin server is unreachable (for example, the origin IP changed but DNS was not updated, or due to network issues between our edge and the origin).
* `524` \- Our edge established a TCP connection, but the origin did not reply with a HTTP response before the connection timed out.
* `525` \- This error indicates that the SSL handshake between Cloudflare and the origin web server failed, either due to a network issue or a certificate issue at the origin.
* `526` \- The certificate configured at the origin is not valid.

For more information, refer to [Troubleshooting Cloudflare 5XX errors](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/account-and-zone-analytics/status-codes/#page","headline":"Status codes · Cloudflare Analytics docs","description":"Analyze HTTP status code distribution per data center.","url":"https://developers.cloudflare.com/analytics/account-and-zone-analytics/status-codes/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/analytics/","name":"Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/analytics/account-and-zone-analytics/","name":"Account and zone analytics"}},{"@type":"ListItem","position":4,"item":{"@id":"/analytics/account-and-zone-analytics/status-codes/","name":"Status codes"}}]}
```
