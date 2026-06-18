---
title: Cloudflare Firewall Rules
description: Create rules to inspect and act on incoming HTTP traffic.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/firewall/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cloudflare Firewall Rules

Cloudflare Firewall Rules allows you to create rules that inspect incoming traffic and block, challenge, log, or allow specific requests.

Deprecation notice

Cloudflare Firewall Rules has been deprecated. Cloudflare has moved existing firewall rules to [WAF custom rules](https://developers.cloudflare.com/waf/custom-rules/). For more information on this change, refer to the [upgrade guide](https://developers.cloudflare.com/waf/reference/legacy/firewall-rules-upgrade/).

## Main features

* **Rule-based protection**: Use pre-defined rulesets provided by Cloudflare, or define your own firewall rules. Create rules in the Cloudflare dashboard or via API.
* **Complex custom rules**: Each rule's expression can reference multiple fields from all the available HTTP request parameters and fields, allowing you to create complex rules.

## Availability

This table outlines the Firewall Rules features and entitlements available with each customer plan:

| Free              | Pro            | Business       | Enterprise     |       |
| ----------------- | -------------- | -------------- | -------------- | ----- |
| Availability      | Yes            | Yes            | Yes            | Yes   |
| Number of rules   | 5              | 20             | 100            | 1,000 |
| Supported actions | All except Log | All except Log | All except Log | All   |
| Regex support     | No             | No             | Yes            | Yes   |

## Next steps

* Unless you are already an advanced user, refer to [Expressions](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/) and [Actions](https://developers.cloudflare.com/firewall/cf-firewall-rules/actions/) to learn more about the basic elements of firewall rules.
* To start building your own firewall rules, refer to one of the following pages:  
   * [Manage firewall rules in the dashboard](https://developers.cloudflare.com/firewall/cf-dashboard/create-edit-delete-rules/)  
   * [Manage firewall rules via the APIs](https://developers.cloudflare.com/firewall/api/)
* You can also manage firewall rules through Terraform. For more information, refer to [Getting Started with Terraform ↗](https://blog.cloudflare.com/getting-started-with-terraform-and-cloudflare-part-1/).

## Related resources

* [Cloudflare Rules language](https://developers.cloudflare.com/ruleset-engine/rules-language/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/firewall/#page","headline":"Cloudflare Firewall Rules (deprecated) · Cloudflare Firewall Rules (deprecated) docs","description":"Create rules to inspect and act on incoming HTTP traffic.","url":"https://developers.cloudflare.com/firewall/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/firewall/","name":"Firewall Rules (deprecated)"}}]}
```
