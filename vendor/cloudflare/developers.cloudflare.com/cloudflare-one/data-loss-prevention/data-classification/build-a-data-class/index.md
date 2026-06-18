---
title: Build a data class
description: Create reusable data classes in Cloudflare DLP Data Classification.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Build a data class

Data classes are reusable classification rules built from detection entries, other data classes, sensitivity levels, and data tags.

Use a data class when you want to combine multiple signals into a single reusable classification rule that can then be added to custom DLP profiles.

## What a data class does

A data class lets you define classification logic separately from a DLP profile.

Instead of rebuilding the same logic in multiple profiles, you can create one reusable data class and apply it wherever you need it.

Data classes can also assign labels to matched content. This lets you connect raw detections to a broader classification model instead of relying only on direct entry matching in a profile.

## Create a data class

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Data loss prevention** \> **Data classification** \> **Data classes**.
2. Select **Create data class**.
3. Enter a name and optional description.
4. Build the detection rules for the data class.
5. Assign the labels you want matching content to receive.
6. Select **Save**.

## Build detection rules

Data classes use a rule builder to combine multiple signals into one classification rule.

You can build rules from:

* [detection entries](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/detection-entries/)
* other existing data classes

Use logical operators such as `AND` and `OR` to control how those conditions are evaluated.

Because data classes can reference other data classes, you can build reusable classification layers instead of recreating the same logic in multiple places. Cloudflare excludes the current data class from the selector to prevent recursive references.

## Assign labels

After you define the rule logic, choose the labels you want matching content to receive.

You can assign:

* a sensitivity schema and sensitivity level
* a data tag group and one or more data tags

When content matches the data class, Cloudflare applies those labels to the match.

## Use a data class in a DLP profile

After you create a data class, you can add it to a custom DLP profile.

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Data loss prevention** \> **Profiles**.
2. Create or edit a custom DLP profile.
3. In **Data classes**, select **Add data classes**.
4. Choose the data classes you want to include, then select **Confirm**.
5. (Optional) Add direct detection entries or labels to the profile.
6. Select **Save profile**.

Custom DLP profiles can combine direct detection entries, data classes, and labels in the same profile.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/data-classification/build-a-data-class/#page","headline":"Build a data class · Cloudflare One docs","description":"Create reusable data classes in Cloudflare DLP Data Classification.","url":"https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/data-classification/build-a-data-class/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Compliance"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/data-loss-prevention/","name":"Data loss prevention"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/data-loss-prevention/data-classification/","name":"Data classification"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/data-loss-prevention/data-classification/build-a-data-class/","name":"Build a data class"}}]}
```
