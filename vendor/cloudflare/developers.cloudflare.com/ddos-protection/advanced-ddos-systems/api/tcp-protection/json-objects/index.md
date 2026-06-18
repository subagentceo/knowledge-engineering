---
title: JSON objects
description: JSON object structure for Advanced TCP Protection API requests and responses.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ddos-protection/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# JSON objects

This page contains an example of the TCP protection rule JSON object used in the API.

## Prefix

```

{

  "id": "31c70c65-9f81-4669-94ed-1e1e041e7b06",

  "prefix": "192.0.2.0/24",

  "comment": "Game ranges",

  "excluded": false,

  "created_on": "2022-01-01T13:06:04.721954+01:00",

  "modified_on": "2022-01-01T13:06:04.721954+01:00"

}


```

## Prefix in allowlist

```

{

  "id": "31c70c65-9f81-4669-94ed-1e1e041e7b06",

  "prefix": "192.0.2.0/24",

  "comment": "Game ranges",

  "enabled": true,

  "created_on": "2021-10-01T13:06:04.721954+01:00",

  "modified_on": "2021-10-01T13:06:04.721954+01:00"

}


```

The `prefix` field can contain an IP address or a CIDR range.

## SYN flood rule or out-of-state TCP rule

```

{

  "id": "31c70c65-9f81-4669-94ed-1e1e041e7b06",

  "scope": "region",

  "name": "WEUR",

  "rate_sensitivity": "medium",

  "burst_sensitivity": "medium",

  "created_on": "2021-10-01T13:10:38.762503+01:00",

  "modified_on": "2021-10-01T13:10:38.762503+01:00"

}


```

The `scope` field value must be one of `global`, `region`, or `datacenter`. You must provide a region code (or data center code) in the `name` field when specifying a `region` (or `datacenter`) scope.

The `rate_sensitivity` and `burst_sensitivity` field values must be one of `low`, `medium`, or `high`.

## Filter

```

{

  "id": "20b99eb6-8b48-48dd-a5b9-a995a0843b57",

  "expression": "ip.dst in { 192.0.2.0/24 203.0.113.0/24 } and tcp.dstport in { 80 443 10000..65535 }",

  "mode": "enabled",

  "created_on": "2022-11-01T13:10:38.762503+01:00",

  "modified_on": "2022-11-01T13:10:38.762503+01:00"

}


```

The `expression` field is a [Rules language expression](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/) up to 8,192 characters that can include the following fields:

* `ip.src`
* `ip.dst`
* `tcp.srcport`
* `tcp.dstport`

Note

Expressions of SYN flood protection and out-of-state TCP protection filters do not currently support functions.

The `mode` value must be one of `enabled`, `disabled`, or `monitoring`.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/api/tcp-protection/json-objects/#page","headline":"Advanced TCP Protection API - JSON objects · Cloudflare DDoS Protection docs","description":"JSON object structure for Advanced TCP Protection API requests and responses.","url":"https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/api/tcp-protection/json-objects/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["JSON"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ddos-protection/","name":"DDoS Protection"}},{"@type":"ListItem","position":3,"item":{"@id":"/ddos-protection/advanced-ddos-systems/","name":"Advanced DDoS systems"}},{"@type":"ListItem","position":4,"item":{"@id":"/ddos-protection/advanced-ddos-systems/api/","name":"API configuration"}},{"@type":"ListItem","position":5,"item":{"@id":"/ddos-protection/advanced-ddos-systems/api/tcp-protection/","name":"Advanced TCP Protection"}},{"@type":"ListItem","position":6,"item":{"@id":"/ddos-protection/advanced-ddos-systems/api/tcp-protection/json-objects/","name":"JSON objects"}}]}
```
