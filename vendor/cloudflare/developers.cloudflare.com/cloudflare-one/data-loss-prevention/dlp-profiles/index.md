---
title: DLP profiles
description: DLP profiles in Cloudflare One.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# DLP profiles

A DLP profile defines what sensitive data Cloudflare detects in your traffic. A profile combines one or more of the following building blocks:

* **[Detection entries](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/detection-entries/configure-detection-entries/)** — reusable detection logic that identifies sensitive content, such as patterns, datasets, document fingerprints, predefined detections, and AI prompt topics.
* **Data classes** — reusable classification rules that combine detection entries and other signals into a single rule.
* **Labels** — sensitivity levels and data tags that describe matched content.

Data classes and labels are part of [Data Classification](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/data-classification/). Cloudflare DLP offers three types of profiles:

* **[Predefined profiles](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/predefined-profiles/)** — Cloudflare-managed profiles for common sensitive data types such as credit card numbers, national identifiers, and AI prompts.
* **Custom profiles** — profiles you [build](#build-a-custom-profile) from detection entries, data classes, and labels, specific to your data, organization, and risk tolerance.
* **[Integration profiles](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/integration-profiles/)** — profiles populated with data classifications from a third-party platform, such as Microsoft Purview sensitivity labels (requires Cloudflare CASB).

## Configure a predefined profile

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Data loss prevention** \> **Profiles**.
2. Choose a [predefined profile](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/predefined-profiles/) and select **Edit**.
3. Enable one or more **Detection entries** according to your preferences.
4. Select **Save profile**.

Most predefined profiles match when any enabled detection entry matches. The **Personally Identifiable Information (PII) Record** profile is an exception and requires at least three unique detection entries in close proximity before the profile matches.

You can now use this profile in a [DLP policy](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-policies/#2-create-a-dlp-policy), [CASB integration](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/casb-dlp/), [AI Gateway DLP policy](https://developers.cloudflare.com/ai-gateway/features/dlp/set-up-dlp/), or [Email Security outbound DLP policy](https://developers.cloudflare.com/cloudflare-one/email-security/outbound-dlp/).

## Build a custom profile

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Data loss prevention** \> **Profiles**.
2. Select **Create profile**.
3. Enter a name and optional description for the profile.
4. Add detection entries to the profile.  
Create a custom entry  
   1. Select **Create custom entry**.  
   2. Choose the type of detection entry you want to create and configure its values.  
   For information on supported detection entry types, refer to [Configure detection entries](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/detection-entries/configure-detection-entries/).  
   3. To save the detection entry, select **Done**.  
Add existing entries  
Existing entries include [predefined](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/detection-entries/predefined-detection-entries/) and [user-defined](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/detection-entries/configure-detection-entries/) detection entries that you manage from the Detection entries section.  
   1. Select **Add existing entries**.  
   2. Choose which entries you want to add, then select **Confirm**.  
   3. To finish, select **Done**.
5. (Optional) Add data classes to include reusable classification rules.  
   * Select **Add data classes**  
   * Choose the data classes you want to add, then select **Confirm**
6. (Optional) Use labels as match criteria for the profile.  
   * Select a sensitivity schema and minimum sensitivity level.  
   * Select a data tag group and one or more data tags.  
For more information on labels, templates, and data classes, refer to [Data Classification](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/data-classification/).
7. (Optional) Configure [**profile settings**](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/advanced-settings/) for the profile.
8. Select **Save profile**.

You can now use this profile in a [DLP policy](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-policies/#2-create-a-dlp-policy), [CASB integration](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/casb-dlp/), [AI Gateway DLP policy](https://developers.cloudflare.com/ai-gateway/features/dlp/set-up-dlp/), or [Email Security outbound DLP policy](https://developers.cloudflare.com/cloudflare-one/email-security/outbound-dlp/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/#page","headline":"DLP profiles · Cloudflare One docs","description":"DLP profiles in Cloudflare One.","url":"https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-06-08","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Compliance"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/data-loss-prevention/","name":"Data loss prevention"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/data-loss-prevention/dlp-profiles/","name":"DLP profiles"}}]}
```
