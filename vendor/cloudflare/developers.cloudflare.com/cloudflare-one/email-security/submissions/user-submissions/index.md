---
title: User submissions
description: User submissions in Email Security.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# User submissions

User submissions are the emails your users submitted for submission. User submissions help enhance our detection model, but can be escalated for human review.

Any email that is reported as [phish](https://developers.cloudflare.com/cloudflare-one/email-security/settings/phish-submissions/#reclassify-an-email) will be displayed under **User submissions**.

Note

[PhishGuard](https://developers.cloudflare.com/cloudflare-one/email-security/phishguard/) customers can have submissions analyzed when submitting at either user or team level. Any non-PhishGuard customer can still have submissions analyzed by submitting at team level.

## View user submissions

To view user submissions:

1. Log in to [Cloudflare One ↗](https://one.dash.cloudflare.com/).
2. Select **Email security** \> **Submissions**.
3. Select **User submissions**.

## Filter user submissions

Select among the following filters:

* **Date Range**: Select a date range from the last 7, last 30, and last 90 days.
* **Original disposition**: Select among the [available values](https://developers.cloudflare.com/cloudflare-one/email-security/reference/dispositions-and-attributes/#available-values).
* **Submitted as**: Select among the [available values](https://developers.cloudflare.com/cloudflare-one/email-security/reference/dispositions-and-attributes/#available-values).

Once you have selected all the filters, select **Apply filters**.

The dashboard will populate the table with the list of emails your users submitted for submission, including a **Submission ID**, and the **Email subject**.

## View submission details

To gain more details on a specific submission:

1. Go to the submission you want to have more details for.
2. Select the three dots > select among **View more**, **View email message**, **View similar details**, and **Escalate**.

## Escalate a submission

To escalate a submission:

1. Go to the submission you want to escalate.
2. Select the three dots > select **Escalate**.
3. The dashboard will display a message to authorize escalation. Select **Escalate**.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/email-security/submissions/user-submissions/#page","headline":"User submissions · Cloudflare One docs","description":"User submissions in Email Security.","url":"https://developers.cloudflare.com/cloudflare-one/email-security/submissions/user-submissions/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/email-security/","name":"Email security"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/email-security/submissions/","name":"Submissions"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/email-security/submissions/user-submissions/","name":"User submissions"}}]}
```
