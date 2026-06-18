---
title: Targeting rules
description: Serve different Flagship flag values to different users based on attributes, conditions, and logical grouping.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/flagship/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Targeting rules

Targeting rules let you serve different flag values to different users based on their attributes. Each flag can have zero or more rules.

Rules are evaluated in sequential order, from top to bottom. The first rule whose conditions match is used, and its configured variation is returned. If no rule matches, Flagship returns the flag's default variation.

When a flag is disabled, the default variation is always returned regardless of rules.

## How rules work

A rule consists of:

* **Conditions** — One or more attribute comparisons that must be satisfied. For example, `country equals "US"` or `plan in ["enterprise", "business"]`.
* **Serve variation** — The variation to return when the rule matches.
* **Rollout** (optional) — A percentage-based gradual release. Only the specified percentage of matching users receive the rule's variation. The rest continue to the next rule.

## Condition structure

Each condition compares an attribute from the evaluation context against a value using an operator:

* **Attribute** — The context key to evaluate (for example, `userId`, `country`, `plan`).
* **Operator** — The comparison to perform. Flagship supports [11 operators](https://developers.cloudflare.com/flagship/targeting/operators/).
* **Value** — The value to compare against. Can be a string, number, or array depending on the operator.

## Logical grouping

Conditions within a rule can be grouped with `AND`/`OR` operators and nested up to six levels deep.

For example, to target enterprise users in the US or Canada:

* `AND`:  
   * `plan equals "enterprise"`  
   * `OR`:  
         * `country equals "US"`  
         * `country equals "CA"`

## Learn more

* [ Operators ](https://developers.cloudflare.com/flagship/targeting/operators/)
* [ Percentage rollouts ](https://developers.cloudflare.com/flagship/targeting/percentage-rollouts/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/flagship/targeting/#page","headline":"Targeting rules · Cloudflare Flagship docs","description":"Serve different Flagship flag values to different users based on attributes, conditions, and logical grouping.","url":"https://developers.cloudflare.com/flagship/targeting/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/flagship/","name":"Flagship"}},{"@type":"ListItem","position":3,"item":{"@id":"/flagship/targeting/","name":"Targeting rules"}}]}
```
