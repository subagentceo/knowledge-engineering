---
title: Percentage rollouts
description: Gradually release features to a fraction of users with Flagship percentage rollouts and consistent hashing for sticky bucketing.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/flagship/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Percentage rollouts

Percentage rollouts let you gradually release a feature to a fraction of your users. Any [targeting rule](https://developers.cloudflare.com/flagship/targeting/) can include a rollout percentage between 0 and 100.

## How percentage rollouts work

When a rule has a percentage rollout, Flagship evaluates the rule's conditions first. If the conditions match, only the specified percentage of users receive the rule's variation. Users who do not fall into the rollout percentage continue to the next rule or receive the default variation if no further rules match.

## Sticky bucketing

Flagship uses consistent hashing on a configurable attribute to assign users to a rollout bucket. The same user always receives the same flag value for a given rollout configuration. This ensures a consistent experience across repeated evaluations.

By default, the bucketing attribute is `targetingKey`. You can configure which attribute to use for bucketing when you set up the rollout in the dashboard.

Random assignment without targetingKey

If `targetingKey` is not present in the evaluation context and no alternative bucketing attribute is configured, Flagship cannot produce a stable hash. In this case the rollout bucket is assigned randomly on each evaluation, meaning the same user may receive different flag values across requests.

Always provide a stable `targetingKey` (or configure a consistent bucketing attribute) to guarantee sticky bucketing.

## Example

Consider a flag `new-checkout` with the following rules:

1. **Rule 1**: `plan equals "enterprise"` — serve variation `on`.
2. **Rule 2**: 25% rollout on `userId` — serve variation `on`.
3. **Default variation**: `off`.

In this configuration:

* All enterprise users see the new checkout.
* 25% of all other users, determined by their `userId`, also see the new checkout.
* The remaining 75% of non-enterprise users see the standard checkout.

As you gain confidence, increase the rollout percentage until you reach 100%.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/flagship/targeting/percentage-rollouts/#page","headline":"Percentage rollouts · Cloudflare Flagship docs","description":"Gradually release features to a fraction of users with Flagship percentage rollouts and consistent hashing for sticky bucketing.","url":"https://developers.cloudflare.com/flagship/targeting/percentage-rollouts/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/flagship/","name":"Flagship"}},{"@type":"ListItem","position":3,"item":{"@id":"/flagship/targeting/","name":"Targeting rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/flagship/targeting/percentage-rollouts/","name":"Percentage rollouts"}}]}
```
