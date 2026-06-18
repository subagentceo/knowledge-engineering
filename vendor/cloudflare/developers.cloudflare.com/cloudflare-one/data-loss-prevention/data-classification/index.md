---
title: Data classification
description: Understand how Data Classification works in Cloudflare DLP.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Data classification

Data Classification extends Cloudflare DLP with a reusable layer for identifying, organizing, and labeling sensitive content. Instead of building all detection logic directly inside a DLP profile, you can define labels and reusable classification rules, then apply them in custom DLP profiles.

## What is Data Classification?

With Data Classification, you can:

* Define labels such as sensitivity levels and data tags
* Use templates as a starting point for those labels
* Build reusable data classes that combine multiple signals into a single classification rule

This is useful when you want more than direct inspection. Detection entries help identify sensitive content. Data Classification helps organize and label that content so administrators can identify its severity and apply it consistently across DLP profiles.

Templates provide Cloudflare-managed starting points for sensitivity schemas and data tag groups. When you build from a template, Cloudflare creates a new object in your account that you can edit.

## How Data Classification fits with DLP

Data Classification works alongside detection entries and DLP profiles.

| Component         | What it does                                                                                                            |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Detection entries | Detect specific content such as patterns, datasets, document fingerprints, AI prompt topics, and predefined detections. |
| Labels            | Define sensitivity schemas, sensitivity levels, data tag groups, and data tags used to describe matched content.        |
| Templates         | Provide Cloudflare-managed starting points for sensitivity schemas and data tag groups.                                 |
| Data classes      | Build reusable classification rules from detection entries, other data classes, sensitivity levels, and data tags.      |
| DLP profiles      | Apply detection and classification logic to DLP scanning and enforcement workflows.                                     |

In general, detection entries help identify sensitive content. Data Classification helps organize and label that content so administrators can identify its severity, understand where it exists, and apply it consistently. DLP profiles then apply that logic to scanning and enforcement workflows.

## When to use Data Classification vs DLP profiles

Use detection entries and DLP profiles when you want direct detection and enforcement. For example, if you want to detect a specific regex, dataset, or predefined detection and immediately use it in a policy, building directly with detection entries may be enough.

Use Data Classification when you want a more reusable and structured model. For example, Data Classification is a better fit when you want to:

* standardize sensitivity labels across multiple detections
* organize related detections into a reusable data class
* combine multiple signals into a single classification rule
* reuse the same classification logic across multiple DLP profiles

In summary, use DLP profiles when you want enforcement. Use Data Classification when you want to organize and label sensitive content in a reusable way before applying that logic in DLP workflows.

## Next steps

To get started:

* [Configure labels and templates](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/data-classification/configure-labels-and-templates/) — Create labels and build from Cloudflare-managed templates.
* [Build a data class](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/data-classification/build-a-data-class/) — Create reusable classification rules and apply them in custom DLP profiles.
* [Configure DLP profiles](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/) — Apply detection entries, data classes, and labels in DLP scanning workflows.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/data-classification/#page","headline":"Data classification · Cloudflare One docs","description":"Understand how Data Classification works in Cloudflare DLP.","url":"https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/data-classification/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Compliance"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/data-loss-prevention/","name":"Data loss prevention"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/data-loss-prevention/data-classification/","name":"Data classification"}}]}
```
