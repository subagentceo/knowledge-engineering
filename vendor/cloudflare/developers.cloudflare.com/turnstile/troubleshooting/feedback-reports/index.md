---
title: Feedback reports
description: Submit Turnstile feedback reports for false positive challenges.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/turnstile/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Feedback reports

When Cloudflare detects that a challenge has failed or the user cannot be verified on a page with Turnstile, the user will encounter an [error](https://developers.cloudflare.com/turnstile/concepts/widget/#error-states) on the widget and may be asked to send feedback on the issue that they have encountered by choosing one of the options listed.

When debugging or submitting a feedback report for an unresolved issue, you must provide the Ray ID (a request identifier displayed on the challenge page) or QR code associated with the challenge. These identifiers are essential for Cloudflare Support to trace the specific event.

To obtain these identifiers:

1. Ray ID: Find the Ray ID displayed at the end of the Challenge Page. The RayID is collected by the feedback report.
2. QR Code: Click the success, failure, or spinner logo on the Turnstile widget four times. This action will reveal the unique QR code for that challenge instance.

Note

Currently, feedback submitted via the feedback form is sent directly to Cloudflare and used for improvements on the Turnstile user experience.

Available options include:

* The widget always fails
* The widget sometimes fails
* The widget is too slow
* The widget keeps looping
* Other

Users can provide additional data in the text field and then select **Submit**.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/turnstile/troubleshooting/feedback-reports/#page","headline":"Feedback reports · Cloudflare Turnstile docs","description":"Submit Turnstile feedback reports for false positive challenges.","url":"https://developers.cloudflare.com/turnstile/troubleshooting/feedback-reports/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/turnstile/","name":"Turnstile"}},{"@type":"ListItem","position":3,"item":{"@id":"/turnstile/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/turnstile/troubleshooting/feedback-reports/","name":"Feedback reports"}}]}
```
