---
title: JSON objects
description: JSON object structure for Programmable Flow Protection API requests and responses.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ddos-protection/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# JSON objects

This page contains examples of the JSON objects used in the Programmable Flow Protection API.

## Program

```

{

  "id": "31c70c65-9f81-4669-94ed-1e1e041e7b06",

  "name": "rate-limiter",

  "status": "success",

  "created_on": "2024-01-01T13:06:04.721954+01:00",

  "modified_on": "2024-01-01T13:06:04.721954+01:00"

}


```

| Field        | Description                                                                                                                                       |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| id           | Unique identifier for the program.                                                                                                                |
| name         | Name of the program, derived from the uploaded filename.                                                                                          |
| status       | Compilation and verification status. One of success or failed. Programs with failed status are automatically deleted after 30 days of inactivity. |
| created\_on  | Timestamp when the program was created.                                                                                                           |
| modified\_on | Timestamp when the program was last modified.                                                                                                     |

## Rule

```

{

  "id": "20b99eb6-8b48-48dd-a5b9-a995a0843b57",

  "program_id": "31c70c65-9f81-4669-94ed-1e1e041e7b06",

  "scope": "region",

  "name": "WEUR",

  "mode": "enabled",

  "expression": "ip.dst in { 192.0.2.0/24 }",

  "created_on": "2024-01-01T13:10:38.762503+01:00",

  "modified_on": "2024-01-01T13:10:38.762503+01:00"

}


```

| Field        | Description                                                                                                                                                        |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| id           | Unique identifier for the rule.                                                                                                                                    |
| program\_id  | The ID of the program this rule executes.                                                                                                                          |
| scope        | The scope of the rule. Must be one of global, region, or datacenter.                                                                                               |
| name         | For global scope, use global. For region or datacenter scope, provide the region code or datacenter code.                                                          |
| mode         | The rule mode. Must be one of enabled, disabled, or monitoring.                                                                                                    |
| expression   | A [Rules language expression](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/) to filter which packets the rule applies to. Optional. |
| created\_on  | Timestamp when the rule was created.                                                                                                                               |
| modified\_on | Timestamp when the rule was last modified.                                                                                                                         |

### Scope

The `scope` field determines where the rule executes:

* `global` — The rule executes at all Cloudflare locations. You can only create one global rule per account.
* `region` — The rule executes at all Cloudflare locations within the specified region.
* `datacenter` — The rule executes only at the specified Cloudflare datacenter.

When multiple rules match a packet, the rule with the most specific scope executes. A datacenter-scoped rule takes precedence over a region-scoped rule, which takes precedence over a global rule.

### Mode

The `mode` field determines how the rule behaves:

* `enabled` — The program runs and its verdict (pass or drop) is applied to packets.
* `disabled` — The rule is inactive and the program does not run.
* `monitoring` — The program runs but packets are never dropped, regardless of the program's verdict. Use this mode to test a program before enabling it.

### Expression

The `expression` field is a [Rules language expression](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/) up to 8,192 characters. The expression filters which packets the rule applies to. Only packets matching the expression are processed by the program.

Supported fields:

* `ip.src`
* `ip.dst`
* `udp.srcport`
* `udp.dstport`

If the expression is empty or omitted, the rule applies to all UDP packets within its scope.

For more information on rule settings, refer to [Rule settings](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/concepts/#rule-settings).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/api/programmable-flow-protection/json-objects/#page","headline":"Programmable Flow Protection API - JSON objects · Cloudflare DDoS Protection docs","description":"JSON object structure for Programmable Flow Protection API requests and responses.","url":"https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/api/programmable-flow-protection/json-objects/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["JSON"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ddos-protection/","name":"DDoS Protection"}},{"@type":"ListItem","position":3,"item":{"@id":"/ddos-protection/advanced-ddos-systems/","name":"Advanced DDoS systems"}},{"@type":"ListItem","position":4,"item":{"@id":"/ddos-protection/advanced-ddos-systems/api/","name":"API configuration"}},{"@type":"ListItem","position":5,"item":{"@id":"/ddos-protection/advanced-ddos-systems/api/programmable-flow-protection/","name":"Programmable Flow Protection"}},{"@type":"ListItem","position":6,"item":{"@id":"/ddos-protection/advanced-ddos-systems/api/programmable-flow-protection/json-objects/","name":"JSON objects"}}]}
```
