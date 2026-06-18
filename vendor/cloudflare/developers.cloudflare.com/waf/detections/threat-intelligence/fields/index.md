---
title: Threat intelligence fields
description: Fields available for threat intelligence detection in rule expressions.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Threat intelligence fields

The threat intelligence detection populates the following fields when the client IP address is found in the threat intelligence database. If the IP address is not found, the fields are empty.

All fields are arrays. Use the [any()](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/#any) function with the `[*]` wildcard to match values.

Note

These five fields are available in rule expressions. Security Analytics logs only the dataset and threat event identifiers for each match. You can view the threat event details — including attacker names, industries, and countries — directly in [Security Analytics](https://developers.cloudflare.com/waf/analytics/security-analytics/).

| Field                                                             | Description                                                                                                         |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Threat intelligence datasets cf.intel.ip.datasets  Array<String>  | Dataset that flagged the IP address. Values: ddos, waf.                                                             |
| Target industries cf.intel.ip.target\_industries  Array<String>   | Industries this IP address has targeted. Refer to [target industries](#target-industries) for valid values.         |
| Attacker names cf.intel.ip.attacker\_names  Array<String>         | Threat actor names associated with this IP address (for example, CONVOLUTEDKRILL).                                  |
| Attacker countries cf.intel.ip.attacker\_countries  Array<String> | Source countries of the threat activity, as [ISO 3166-1 Alpha 2 ↗](https://www.iso.org/obp/ui/#search/code/) codes. |
| Target countries cf.intel.ip.target\_countries  Array<String>     | Countries this IP address has targeted, as [ISO 3166-1 Alpha 2 ↗](https://www.iso.org/obp/ui/#search/code/) codes.  |

## Case sensitivity

Values are case-sensitive. Use the casing shown in the examples: `ddos` (lowercase), `FR` (uppercase country codes), `Banking & Financial Services` (title case), `BLACKBASTA` (uppercase attacker names).

To discover valid values for your traffic, use the [Threat Events](https://developers.cloudflare.com/security-center/cloudforce-one/) dashboard.

## Matching behavior

Fields reflect all threat activity for an IP address over the past seven days, flattened into a single set of values per field.

A value in one field does not have to come from the same threat event as a value in another field. For example, this expression matches if the IP has _any_ China-origin activity **and** _any_ banking-targeted activity — even from separate events:

```

any(cf.intel.ip.attacker_countries[*] == "CN") and any(cf.intel.ip.target_industries[*] == "Banking & Financial Services")


```

Combining fields across dimensions produces broader matches than you might expect. Test combined rules with the _Log_ action first.

## Target industries

The `cf.intel.ip.target_industries` field uses a fixed set of industry names. Examples:

* `Automotive`
* `Banking & Financial Services`
* `Cryptocurrency`
* `Telecommunications`

For the complete list, refer to [Threat Events](https://developers.cloudflare.com/security-center/cloudforce-one/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/detections/threat-intelligence/fields/#page","headline":"Threat intelligence fields · Cloudflare Web Application Firewall (WAF) docs","description":"Fields available for threat intelligence detection in rule expressions.","url":"https://developers.cloudflare.com/waf/detections/threat-intelligence/fields/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-06-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Threat Intelligence"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/detections/","name":"Traffic detections"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/detections/threat-intelligence/","name":"Threat intelligence"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/detections/threat-intelligence/fields/","name":"Threat intelligence fields"}}]}
```
