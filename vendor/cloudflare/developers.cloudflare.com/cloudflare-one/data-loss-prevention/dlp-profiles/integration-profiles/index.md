---
title: Integration profiles
description: How integration profiles work in Cloudflare One.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Integration profiles

Note

Integration profiles require [Cloudflare CASB](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/).

Integration profiles let you use data classifications from a third-party platform (such as Microsoft Purview sensitivity labels) directly in Cloudflare DLP. Instead of recreating classification rules yourself, Cloudflare retrieves them from the third-party platform and populates them as [detection entries](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/detection-entries/configure-detection-entries/) in a DLP profile. You can then enable the entries you want and create a DLP policy to allow or block matching data.

Detection entries in integration profiles are managed by the third-party platform. You cannot manually add, edit, or delete these entries within Cloudflare DLP.

## Microsoft Purview Information Protection (MIP) sensitivity labels

Microsoft provides [Purview Information Protection sensitivity labels ↗](https://learn.microsoft.com/en-us/purview/sensitivity-labels) to classify and protect sensitive data.

Warning

DLP does not filter or log [MIP sublabels ↗](https://learn.microsoft.com/purview/sensitivity-labels#sublabels-that-use-parent-labels-or-label-groups). Only top-level sensitivity labels will be detected, filtered, and logged.

To ensure DLP will detect and filter all sensitive data, use only [MIP top-level labels ↗](https://learn.microsoft.com/purview/sensitivity-labels#top-level-labels).

### Setup

To add MIP sensitivity labels to a DLP profile, integrate your Microsoft account with [Cloudflare CASB](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/microsoft-365/). A new integration profile will appear under **Zero Trust** \> **Data loss prevention** \> **Profiles**. The profile is named **MIP Sensitivity Labels** followed by the name of the CASB integration.

MIP sensitivity labels can also be added to a [custom DLP profile](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/#build-a-custom-profile) as an existing entry.

### Syncing

Allow 24 hours for label additions and edits in your Microsoft account to propagate to Cloudflare DLP. Deletions in your Microsoft account will not delete entries in your Cloudflare DLP profile.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/integration-profiles/#page","headline":"Integration profiles · Cloudflare One docs","description":"How integration profiles work in Cloudflare One.","url":"https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/integration-profiles/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-06-08","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Microsoft"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/data-loss-prevention/","name":"Data loss prevention"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/data-loss-prevention/dlp-profiles/","name":"DLP profiles"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/data-loss-prevention/dlp-profiles/integration-profiles/","name":"Integration profiles"}}]}
```
