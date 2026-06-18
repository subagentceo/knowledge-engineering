---
title: Monitor detections
description: Review email threat detection results.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Monitor detections

Spam and Malicious emails are blocked outright by Email security, but Suspicious and Spoof dispositions should be monitored. Suspicious messages should be investigated by a security analyst to determine the legitimacy of the message.

[PhishGuard](https://developers.cloudflare.com/cloudflare-one/email-security/phishguard/) (Cloudflare's managed email security service) can review these messages for you and move them from the end user inbox if they are deemed malicious.

Messages that receive a Spoof disposition should be investigated because it signals that the traffic is either non-compliant with your email authentication process [SPF ↗](https://www.cloudflare.com/en-gb/learning/dns/dns-records/dns-spf-record/), [DKIM ↗](https://www.cloudflare.com/en-gb/learning/dns/dns-records/dns-dkim-record/), [DMARC ↗](https://www.cloudflare.com/en-gb/learning/dns/dns-records/dns-dmarc-record/), or has a mismatching Envelope From and Header From value.

In most cases, a Spoof disposition is triggered by a legitimate third-party mail service. If you determine that the Spoofed email is a legitimate business use case, you can either:

* Update your email authentication records.
* Add an acceptable sender [allow policy](https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/allow-policies/) to exempt messages from the Spam, Spoof, or Bulk disposition, but not Malicious or Suspicious, so the content of the message can still be monitored.

## Search email messages

Email security offers a variety of ways for you to better examine and understand your message traffic:

You can search for emails that have been processed by Email security, whether they are marked with a [detection disposition](https://developers.cloudflare.com/email-security/reference/dispositions-and-attributes/) or not.

There are three ways for searching emails:

* Popular screen: A popular screen allows you to view messages based on common pre-defined criteria.
* Regular screen: A regular screen allows you to investigate your inbox by inserting a term to screen across all criteria.
* Advanced screen: The advanced screen criteria gives you the option to narrow message results based on specific criteria. The advanced screen has several options (such as keywords, subject keywords, sender domain, and more) to scan your inbox.

Additional information on search can be found on the [Screen criteria](https://developers.cloudflare.com/cloudflare-one/email-security/investigation/search-email/#screen-criteria) documentation.

### Export messages

With Email security, you can export messages to a CSV file. Via the dashboard, you can export up to 1,000 rows. If you want to export all messages, you can use the [API ↗](https://developers.cloudflare.com/api/resources/email%5Fsecurity/subresources/investigate/methods/get/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/secure-your-email/monitor-your-inbox/monitor-detections/#page","headline":"Monitor detections · Cloudflare Learning Paths","description":"Review email threat detection results.","url":"https://developers.cloudflare.com/learning-paths/secure-your-email/monitor-your-inbox/monitor-detections/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/secure-your-email/monitor-your-inbox/","name":"Monitor your email activity"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/secure-your-email/monitor-your-inbox/monitor-detections/","name":"Monitor detections"}}]}
```
