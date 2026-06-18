---
title: JSON objects
description: JSON object structure for Advanced DNS Protection API requests and responses.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ddos-protection/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# JSON objects

# JSON object

This page contains an example of the DNS protection rule JSON object used in the API.

```

{

  "id": "31c70c65-9f81-4669-94ed-1e1e041e7b06",

  "scope": "region",

  "name": "WEUR",

  "mode": "monitoring",

  "profile_sensitivity": "medium",

  "rate_sensitivity": "medium",

  "burst_sensitivity": "medium",

  "created_on": "2023-10-01T13:10:38.762503+01:00",

  "modified_on": "2023-10-01T13:10:38.762503+01:00"

}


```

The `scope` field value must be one of `global`, `region`, or `datacenter`. You must provide a region code (or data center code) in the `name` field when specifying a `region` (or `datacenter`) scope.

The `mode` value must be one of `enabled`, `disabled`, or `monitoring`.

The `profile_sensitivity` field value must be one of `low` (default), `medium`, `high`, or `very_high`.

The `rate_sensitivity` and `burst_sensitivity` field values must be one of `low`, `medium`, or `high`.

For more information on the rule settings, refer to [Rule settings](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/concepts/#rule-settings).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/api/dns-protection/json-objects/#page","headline":"Advanced TCP Protection API - JSON objects · Cloudflare DDoS Protection docs","description":"JSON object structure for Advanced DNS Protection API requests and responses.","url":"https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/api/dns-protection/json-objects/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["JSON"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ddos-protection/","name":"DDoS Protection"}},{"@type":"ListItem","position":3,"item":{"@id":"/ddos-protection/advanced-ddos-systems/","name":"Advanced DDoS systems"}},{"@type":"ListItem","position":4,"item":{"@id":"/ddos-protection/advanced-ddos-systems/api/","name":"API configuration"}},{"@type":"ListItem","position":5,"item":{"@id":"/ddos-protection/advanced-ddos-systems/api/dns-protection/","name":"Advanced DNS Protection"}},{"@type":"ListItem","position":6,"item":{"@id":"/ddos-protection/advanced-ddos-systems/api/dns-protection/json-objects/","name":"JSON objects"}}]}
```
