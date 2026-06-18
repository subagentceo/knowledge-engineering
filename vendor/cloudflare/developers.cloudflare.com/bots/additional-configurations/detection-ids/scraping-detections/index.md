---
title: Scraping detections
description: Detection IDs for identifying volumetric scraping attacks by ASN and fingerprint.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/bots/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Scraping detections

Scraping behavioral detection IDs allow you to better protect your website from volumetric scraping attacks by identifying anomalous behavior. The detection IDs below are specifically designed to catch suspicious scraping activity at the zone level.

| Detection ID | Description                                                                                         |
| ------------ | --------------------------------------------------------------------------------------------------- |
| 50331648     | Observes patterns of requests sent to your zone, dynamically analyzing behavior by ASN.             |
| 50331649     | Observes patterns of requests sent to your zone, dynamically analyzing behavior by JA4 fingerprint. |

## Challenges for scraping detections

Cloudflare's [Managed Challenge](https://developers.cloudflare.com/cloudflare-challenges/challenge-types/challenge-pages/#managed-challenge) can limit scraping attacks on your website.

To access scraping detections:

* [  New dashboard ](#tab-panel-6828)
* [ Old dashboard ](#tab-panel-6829)

1. In the Cloudflare dashboard, go to the **Security rules** page.  
[ Go to **Security rules** ](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. Select **Create rule** and choose **Custom rule**.
3. Fill out the form using **Bot Detection IDs** along with other necessary information.
4. Select **Save as draft** to return to the rule later, or **Deploy** to deploy the rule.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Security** \> **WAF**.
3. Under **Custom rules**, select **Create rule**.
4. Fill out the form using **Bot Detection IDs** along with other necessary information.
5. Select **Save as draft** to return to the rule later, or **Deploy** to deploy the rule.

Rule example

```

(any(cf.bot_management.detection_ids[*] in {50331648 50331649}) and not cf.bot_management.verified_bot)


```

Best practice

If you are choosing to challenge as your rule action, ensure that you exclude any API calls on which you do not want to issue a challenge. To exclude requests to such paths, edit the [WAF custom rule](https://developers.cloudflare.com/waf/custom-rules/) to exclude the relevant paths.

Note

The matched traffic for detection IDs `50331648` and `50331649` is dynamically re-calculated, meaning a single fingerprint would not be permanently flagged unless it continues to behave suspiciously at all times.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/bots/additional-configurations/detection-ids/scraping-detections/#page","headline":"Scraping detections · Cloudflare bot solutions docs","description":"Detection IDs for identifying volumetric scraping attacks by ASN and fingerprint.","url":"https://developers.cloudflare.com/bots/additional-configurations/detection-ids/scraping-detections/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Scraping"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/bots/","name":"Bots"}},{"@type":"ListItem","position":3,"item":{"@id":"/bots/additional-configurations/","name":"Additional configurations"}},{"@type":"ListItem","position":4,"item":{"@id":"/bots/additional-configurations/detection-ids/","name":"Detection IDs"}},{"@type":"ListItem","position":5,"item":{"@id":"/bots/additional-configurations/detection-ids/scraping-detections/","name":"Scraping detections"}}]}
```
