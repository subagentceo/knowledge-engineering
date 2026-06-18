---
title: Submissions
description: Submissions in Email Security.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Submissions

Submitting messages allows you to choose the disposition of your messages if the disposition is incorrect. This helps improve Email security's detection accuracy and ensures proper handling of email threats.

## Submit messages for review

To submit a message for review:

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Email security** and select **Investigation**.
2. On the **Investigation** page, under **Your matching messages**, select the message you want to reclassify.
3. Select the three dots, then select **Submit for review**.
4. Under **New disposition**, select among the following:  
   * **Malicious**: Traffic invoked multiple phishing verdict triggers, met thresholds for bad behavior, and is associated with active campaigns.  
   * **Spoof**: Traffic associated with phishing campaigns that is either non-compliant with your email authentication policies (SPF, DKIM, DMARC) or has mismatching Envelope From and `Header From` values.  
   * **Spam**: Traffic associated with non-malicious, commercial campaigns.  
   * **Bulk**: Traffic associated with [Graymail ↗](https://en.wikipedia.org/wiki/Graymail%5F%28email%29), that falls in between the definitions of `SPAM` and `SUSPICIOUS`. For example, a marketing email that intentionally obscures its unsubscribe link.  
   * **Clean**: Traffic not associated with any phishing campaigns.
5. Select **Save**.

To submit messages in bulk, select **Select all messages** \> **Action** \> **Request submissions**.

To release messages in bulk, select **Select all messages** \> **Action** \> **Release**.

## Upload EML files

Email security classifies certain emails as "Clean". If you disagree with the disposition, you can upload an EML file and reclassify the email.

On the **Investigation** page:

1. Go to the email marked as **Clean**.
2. Select the three dots > **Submit for review**.
3. Upload the EML file.
4. Select a new disposition.
5. Select **Save**.

## View submissions

Once you have submitted your messages, you can access those on **Submissions**.

To view submissions:

1. Log in to [Cloudflare One ↗](https://one.dash.cloudflare.com/).
2. Select **Email security** \> **Submissions**.
3. Choose from the following submission types:  
   * [**Team submissions**](https://developers.cloudflare.com/cloudflare-one/email-security/submissions/team-submissions/): View emails your security team submitted for submissions.  
   * [**User submissions**](https://developers.cloudflare.com/cloudflare-one/email-security/submissions/user-submissions/): View emails your users submitted for submissions.  
   * [**Invalid submissions**](https://developers.cloudflare.com/cloudflare-one/email-security/submissions/invalid-submissions/): View submissions that could not be processed.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/email-security/submissions/#page","headline":"Submissions · Cloudflare One docs","description":"Submissions in Email Security.","url":"https://developers.cloudflare.com/cloudflare-one/email-security/submissions/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/email-security/","name":"Email security"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/email-security/submissions/","name":"Submissions"}}]}
```
