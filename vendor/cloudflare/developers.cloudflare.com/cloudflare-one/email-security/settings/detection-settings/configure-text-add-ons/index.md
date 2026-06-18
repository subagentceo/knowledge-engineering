---
title: Configure text add-ons
description: Configure text add-ons in Email Security.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Configure text add-ons

You can create custom labels to be used as the subject or body prefix for emails with specific dispositions.

Note

You can only configure text add-ons if you deploy Email security via [MX/Inline](https://developers.cloudflare.com/cloudflare-one/email-security/setup/pre-delivery-deployment/mx-inline-deployment/).

Warning

If you currently do not have text add-ons enabled, configuring text add-ons will add a banner to the subject line. As a result, the subject line and the email body will be reduced.

## Subject prefix

To configure a subject prefix:

1. Log in to [Cloudflare One ↗](https://one.dash.cloudflare.com/).
2. Select **Email security**.
3. Select **Settings**, then go to **Detection settings** \> **Text add-ons** \> **View**.
4. Select **Configure** \> **Subject prefix**.
5. Populate each disposition with a subject prefix, and turn on the **Status** to enable the subject prefix for a specific disposition.

### Advanced settings

In **Advanced settings**, you can configure **Add "labels" variable**. This option allows you to add a dynamic value for a label that lists dispositions and allows for additional text.

To turn on **Add "labels" variable**:

1. Go to **Advanced settings** \> **Add "labels" variable**.
2. Choose between:  
   * **Use default**.  
   * **Use custom "labels" variable**: Enter the custom label in the text box.

Once you have configured the subject prefix, select **Save**.

## Body prefix

A body prefix is a custom label added to the top of the email body for emails with specific dispositions.

Populate each disposition with a body prefix, and turn on the **Status** to enable the body prefix for a specific disposition.

### Advanced settings

In Advanced settings, you can configure **Add "labels" or "threat types" variable**. This option allows you to add a dynamic value for labels that lists dispositions, or threats that lists the threat types behind an assigned disposition.

To turn on **Add "labels" or "threat types" variable**:

1. Go to **Advanced settings**:
2. Choose between:  
   * **Add "labels" variable**: This option allows you to add a dynamic value that for a label that lists dispositions and allows for additional text. Choose between:  
         * **Use default**.  
         * **Use custom "labels" variable**: Enter the custom label in the text box.

Once you have configured the body prefix, select **Save**.

### Add threat types variable

This option allows you to include a dynamic value for '%THREATS' that lists the threat types behind an assigned disposition. It can include additional, HTML-formatted text.

The dashboard will display **Default** or **Custom** (to use "labels" or "threat types" variable), depending on how you configured the [advanced settings](https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/configure-text-add-ons/#advanced-settings-1).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/configure-text-add-ons/#page","headline":"Configure text add-ons · Cloudflare One docs","description":"Configure text add-ons in Email Security.","url":"https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/configure-text-add-ons/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/email-security/","name":"Email security"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/email-security/settings/","name":"Settings"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/email-security/settings/detection-settings/","name":"Detection settings"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/email-security/settings/detection-settings/configure-text-add-ons/","name":"Configure text add-ons"}}]}
```
