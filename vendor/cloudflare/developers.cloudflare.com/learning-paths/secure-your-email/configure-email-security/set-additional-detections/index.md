---
title: Set additional detections
description: Enable extra email threat detection rules.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Set additional detections

Email security allows you to configure the following additional detections:

* [Domain age](https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/additional-detections/#configure-domain-age)
* [Blank email detection](https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/additional-detections/#configure-blank-email-detection)
* [Automated Clearing House (ACH)](https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/additional-detections/#configure-ach-change-from-free-email-detection) change from free email detection.
* [HTML attachment email detection](https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/additional-detections/#configure-html-attachment-email-detection)

To configure additional detections:

1. Log in to [Cloudflare One ↗](https://one.dash.cloudflare.com/).
2. Select **Email security**.
3. Select **Settings**.
4. On the Settings page, go to **Detection settings** \> **Additional detections**, and select **Edit**.

## Configure domain age

The domain age is the time since the domain has been registered.

To configure a domain age:

1. On the **Edit additional detections** page:  
   * Select **Malicious domain age**: Controls the threshold for a malicious disposition. Maximum of 100 days.  
   * Select **Suspicious domain age**: Controls the threshold for a suspicious disposition. Maximum of 100 days.
2. Select **Save**.

## Configure blank email detection

Blank email detection detects emails with blank bodies and assigns a default disposition. You can choose between **Malicious** and **Suspicious** as dispositions.

To enable blank email detection:

1. On the **Edit additional detections** page, enable **Blank email detection**.
2. Choose between **Malicious** and **Suspicious**.
3. Select **Save**.

## Configure ACH change from free email detection

[Automated Clearing House (ACH) ↗](https://en.wikipedia.org/wiki/Automated%5Fclearing%5Fhouse) is a banking term related to direct deposits. ACH change from free email detection detects payroll inquiries or change requests from free email domains and assigns a default disposition. You can choose between **Malicious** and **Suspicious** as dispositions.

To enable ACH change from free email detection:

1. On the **Edit additional detections** page, enable **ACH change from free email detection**.
2. Choose between **Malicious** and **Suspicious**.
3. Select **Save**.

## Configure HTML Attachment Email Detection

HTML attachment email detection detects HTM and HTML attachments in emails and assigns a default disposition.

To enable HTML attachment email detection:

1. On the **Edit additional detections** page, enable **HTML attachment email detection**.
2. Choose between **Malicious** and **Suspicious**.
3. Select **Save**.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/secure-your-email/configure-email-security/set-additional-detections/#page","headline":"Set additional detections · Cloudflare Learning Paths","description":"Enable extra email threat detection rules.","url":"https://developers.cloudflare.com/learning-paths/secure-your-email/configure-email-security/set-additional-detections/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/secure-your-email/configure-email-security/","name":"Configure Email security"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/secure-your-email/configure-email-security/set-additional-detections/","name":"Set additional detections"}}]}
```
