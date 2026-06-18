---
title: Machine Learning models
description: Manage auto-updates for Bot Management machine learning models.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/bots/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Machine Learning models

## Enable auto-updates to the Machine Learning models

Cloudflare encourages Enterprise customers to enable auto-updates to its Machine Learning models to get the newest bot detection models as they are released.

To enable auto-updates:

* [  New dashboard ](#tab-panel-6850)
* [ Old dashboard ](#tab-panel-6851)

1. In the Cloudflare dashboard, go to the **Security Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. Filter by **Bot traffic**.
3. Go to **Bot Management**.
4. Under **Configurations**, select the edit icon for **Auto-updates to the Machine Learning Model** and turn it on.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Security** \> **Bots**.
3. Select **Configure Bot Management**.
4. Enable **Auto-updates to the Machine Learning Model**.

### What will change

If you are on an older Machine Learning model, you will see a score change to requests scored by the **Machine Learning** source instantly. If you are already on the latest model, you will see changes only after a new Machine Learning model becomes the global default.

Customers will be notified via email and dashboard prior to a new Machine Learning model becoming the global default.

### Risks of not updating

By not updating to the latest version, you will be using a Machine Learning model no longer maintained or monitored by our engineering team. As Internet traffic changes and new trends evolve, scoring accuracy by older versions may degrade.

### Model versions and release notes

| Version | Release Notes                                                                                                                                                                                                                     | Launch Date |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| v1      | First Machine Learning Model released.                                                                                                                                                                                            | Q1 2019     |
| v2      | Introduced dynamic inter-request features to leverage the Cloudflare network to detect new bots more accurately. Feedback other Bot Management detection mechanisms to the machine learning model to more accurately detect bots. | Q1 2020     |
| v3      | Fixed accuracy issues under some conditions in the previous version.                                                                                                                                                              | Q2 2020     |
| v4      | Improved scoring for iOS devices. Fixed scoring inaccuracy in Firefox builds.                                                                                                                                                     | Q1 2021     |
| v5      | Recalibrated model for the [removal of \_cfduid cookie ↗](https://blog.cloudflare.com/deprecating-cfduid-cookie/).  Introduced new signals to reduce false negatives.                                                             | Q2 2021     |
| v6      | Significantly improved scoring for native Android application traffic. Improved scoring on the newest versions of Chromium browsers.                                                                                              | Q1 2022     |
| v7      | Increased recognition of distributed botnets. Improved HTTP/3 scoring.                                                                                                                                                            | Q1 2024     |
| v8      | Improved detection of residential proxies. Increased weight on network level traffic characteristics.                                                                                                                             | Q2 2024     |
| v9      | Improved model consistency and model efficacy against randomization attack techniques                                                                                                                                             | Q2 2025     |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/bots/reference/machine-learning-models/#page","headline":"Machine Learning models · Cloudflare bot solutions docs","description":"Manage auto-updates for Bot Management machine learning models.","url":"https://developers.cloudflare.com/bots/reference/machine-learning-models/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/bots/","name":"Bots"}},{"@type":"ListItem","position":3,"item":{"@id":"/bots/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/bots/reference/machine-learning-models/","name":"Machine Learning models"}}]}
```
