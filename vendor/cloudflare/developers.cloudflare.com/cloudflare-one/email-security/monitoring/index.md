---
title: Monitoring
description: Monitoring in Email Security.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Monitoring

Once you have chosen a domain to scan, Email security allows you to monitor the traffic scanned from your email inboxes.

Note

With Email security, you can enable logs to send detection data to an endpoint of your choice. Refer to [Enable Email security logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/logpush/email-security-logs/) for more information.

To monitor your inbox:

1. Log in to [Cloudflare One ↗](https://one.dash.cloudflare.com/).
2. Select **Email security**.
3. Under **Email security**, select **Monitoring**.

The dashboard will display the following metrics:

* Email activity
* [Disposition evaluation](https://developers.cloudflare.com/cloudflare-one/email-security/reference/dispositions-and-attributes/)
* Detection details
* [Impersonations](https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/impersonation-registry/)
* [Phish submissions](https://developers.cloudflare.com/cloudflare-one/email-security/settings/phish-submissions/)
* [Auto-move events](https://developers.cloudflare.com/cloudflare-one/email-security/settings/auto-moves/)
* [Detection settings metrics](https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/)

## Email activity

Email activity aggregates statistics about emails scanned and dispositions assigned (the number of email flagged due to a detection) within a given timeframe.

To view the live number of email scanned and dispositions scanned, enable **Live mode**.

## Disposition evaluation

Email traffic that flows through Email security is given a final disposition, which represents Email security's evaluation of that specific message.

Disposition evaluation displays the following dispositions:

* **Malicious**: Traffic associated with active threat campaigns. Malicious messages invoked multiple phishing verdict triggers and met thresholds for bad behavior.  
   * **Recommendation**: Block.
* **Spam**: Traffic associated with non-malicious, commercial campaigns.  
   * **Recommendation**: Route to existing Spam quarantine folder.
* **Bulk**: Traffic often associated with newsletters or marketing campaigns. Refer to [Graymail ↗](https://en.wikipedia.org/wiki/Graymail%5F%28email%29) for more details.  
   * **Recommendation**: Monitor or tag.
* **Suspicious**: Traffic associated with phishing campaigns (and is under further analysis by our automated systems).  
   * **Recommendation**: Research these messages internally to evaluate legitimacy.
* **Spoof**: Traffic associated with phishing campaigns that is either non-compliant with your email authentication policies ([SPF ↗](https://www.cloudflare.com/en-gb/learning/dns/dns-records/dns-spf-record/), [DKIM ↗](https://www.cloudflare.com/en-gb/learning/dns/dns-records/dns-dkim-record/), [DMARC ↗](https://www.cloudflare.com/en-gb/learning/dns/dns-records/dns-dmarc-record/)) or has mismatching `Envelope From` and `Header From` values.  
   * **Recommendation**: Block after investigating (can be triggered by third-party mail services).

## Detection details

Detection details displays information about:

* **Malicious** disposition:  
   * **Email threat types**: Top malicious threat types, and their number relative to the total amount of malicious threats received.  
   * **Targeted users**: Top number of emails targeted, and their number relative to the total amount of malicious targets.  
   * **Malicious links**: A graph displaying the total number of malicious links and their distribution throughout the month.  
   * **Malicious attachments**: Number of malicious attachments, and the top types of malicious files received.
* **Suspicious** disposition:  
   * **Suspicious threat types**: Top suspicious threat types, and their number relative to the total amount of threats received.  
   * **Suspicious targets**: Top number of emails targeted, and their number relative to the total amount of malicious targets.  
   * **Suspicious links**: A graph displaying the total number of suspicious links and their distribution throughout the month.
* **Spoof** disposition:  
   * **Spoof users (impersonated names)**: Top number of impersonated names, and their number relative to the total number of detection received.  
   * **Spoof targets**: Top number of targeted emails.  
   * **Sender v. envelope mismatch**: This field indicates the number of mismatches between the email address the message was sent from, and the email address the message was _actually_ sent from.

## Impersonations

Impersonations are a form of phishing attack where the actor pretends to be someone else to steal sensitive information.

**Impersonations** displays the number of targeted users, and a chart describing the total number of impersonation attempts.

* To view all targeted users, select **View all targeted users**.
* To view all impersonation emails, select **View all impersonation emails**.
* To view impersonated users, select **View impersonated users**.

Refer to [Trusted domains](https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/trusted-domains/) to add a trusted domain, and [Impersonation registry](https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/impersonation-registry/) to add a user to the impersonation registry.

## Phish submissions

Phishing is a type of attack that involves stealing sensitive information with the aim of using and selling the information.

A phish submission happens when a user or an administrator reports a phishing attack. Refer to [Phish submissions](https://developers.cloudflare.com/cloudflare-one/email-security/settings/phish-submissions/) to learn how to submit a phish.

Phish submissions displays the following information:

* **All submissions**: The total number of phish submissions.
* **User submissions**: The number of phish submissions reported by your users.
* **Admin submissions**: The number of phish submissions reported by an administrator.

Select **Review submissions** to review a filtered list of phish submissions reported by your team.

## Auto-move events

Auto-move events are emails moved to different inboxes based on the disposition Email security assigned.

This panel shows you the total number of auto-moves and the source folder from which these retractions are originating from.

Refer to [Auto-moves](https://developers.cloudflare.com/cloudflare-one/email-security/settings/auto-moves/) to configure auto-move events.

## Detection settings metrics

Detection settings metric displays information about:

* **Allowed traffic**: Traffic that Email security will exempt emails that match certain patterns from normal detection scanning. Allowed traffic shows metrics on emails that were allowed to go through user inboxes.
* **Blocked traffic**: Traffic that Email security automatically blocks from senders. Blocked traffic shows metrics on emails that were blocked from user inboxes.
* **Domain age**: The number of days since domain registration.

Select **Configure** to configure policy and rules for [allowed traffic](https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/allow-policies/), [blocked traffic](https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/blocked-senders/) and [domain age](https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/additional-detections/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/email-security/monitoring/#page","headline":"Monitoring · Cloudflare One docs","description":"Monitoring in Email Security.","url":"https://developers.cloudflare.com/cloudflare-one/email-security/monitoring/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/email-security/","name":"Email security"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/email-security/monitoring/","name":"Monitoring"}}]}
```
