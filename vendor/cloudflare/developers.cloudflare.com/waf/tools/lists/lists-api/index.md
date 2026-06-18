---
title: Lists API
description: Manage lists programmatically with the Lists API.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Lists API

The [Lists API](https://developers.cloudflare.com/api/resources/rules/subresources/lists/) provides an interface for programmatically managing the following types of lists:

* [Custom lists](https://developers.cloudflare.com/waf/tools/lists/custom-lists/): Contain one or more strings of the same type (such as IP addresses or hostnames) that you can reference collectively, by name, in rule expressions.
* [Bulk Redirect Lists](https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/concepts/#bulk-redirect-lists): Contain URL redirects that you enable by creating a Bulk Redirect Rule.

To use a list in a rule expression, refer to [Lists](https://developers.cloudflare.com/ruleset-engine/rules-language/values/#lists) in the Rules language documentation.

## Get started

To get started, review the Lists [JSON object](https://developers.cloudflare.com/waf/tools/lists/lists-api/json-object/) and [Endpoints](https://developers.cloudflare.com/waf/tools/lists/lists-api/endpoints/).

---

## Rate limiting for Lists API requests

Cloudflare may apply rate limiting to your API requests creating, modifying, or deleting list items in custom lists and Bulk Redirect Lists.

Each operation (create, edit, or delete) on a list item counts as a modification. The following limits apply:

* You can make a maximum of 1,000,000 list item modifications in API requests over 12 hours.
* You can make a maximum of 30,000 API requests over 12 hours doing list item modifications.

If a write operation is still being processed — which happens asynchronously — and you submit a new request, you will receive a `429` HTTP status code. When this happens, submit your request again later.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/waf/tools/lists/lists-api/#page","headline":"Lists API · Cloudflare Web Application Firewall (WAF) docs","description":"Manage lists programmatically with the Lists API.","url":"https://developers.cloudflare.com/waf/tools/lists/lists-api/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/tools/","name":"Additional tools"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/tools/lists/","name":"Lists"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/tools/lists/lists-api/","name":"Lists API"}}]}
```
