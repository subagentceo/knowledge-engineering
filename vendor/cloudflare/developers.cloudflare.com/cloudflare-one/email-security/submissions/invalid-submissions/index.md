---
title: Invalid submissions
description: Invalid submissions in Email Security.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Invalid submissions

A submission is invalid when:

* A submission has no EML file attached.
* A submission has been made with an incorrect file extension.
* A submission was made to the wrong team or user alias.

To ensure your submission is valid:

* Ensure your submission has a file attached with a `.eml` file extension.
* Ensure you configure the domain you are submitting emails for.
* Ensure policies are configured correctly.

To view invalid submissions:

1. Log in to [Cloudflare One ↗](https://one.dash.cloudflare.com/).
2. Select **Email security** \> **Submissions**.
3. Select **Invalid submissions**.

You can search by submission ID or submitted email.

You can filter based on **Date Range** and **Submitted by** (which will list emails that made the invalid submissions). Once you have configured your desired filters, select **Apply filters**.

## Enable notifications

To enable Invalid submission email notifications:

1. Log in to [Cloudflare One ↗](https://one.dash.cloudflare.com/).
2. Select **Email security** \> **Settings**.
3. Go to **Invalid submission emails** and turn on **Invalid submission email notifications**.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/email-security/submissions/invalid-submissions/#page","headline":"Invalid submissions · Cloudflare One docs","description":"Invalid submissions in Email Security.","url":"https://developers.cloudflare.com/cloudflare-one/email-security/submissions/invalid-submissions/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/email-security/","name":"Email security"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/email-security/submissions/","name":"Submissions"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/email-security/submissions/invalid-submissions/","name":"Invalid submissions"}}]}
```
