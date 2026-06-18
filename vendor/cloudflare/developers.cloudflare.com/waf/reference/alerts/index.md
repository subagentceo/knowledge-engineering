---
title: Alerts for security events
description: Set up alerts for WAF security events.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Alerts for security events

Cloudflare provides two types of security alerts that inform you of any spikes in security events:

* **Security Events Alert**: Alerts about spikes across all services that generate log entries in Security Events.
* **Advanced Security Events Alert**: Similar to Security Events Alert with support for additional filtering options.

For details on alert types and their availability, refer to [Alert types](#alert-types).

To receive security alerts, you must configure a [notification](https://developers.cloudflare.com/notifications/). Notifications help you stay up to date with your Cloudflare account through email, PagerDuty, or webhooks, depending on your Cloudflare plan.

## Set up a notification for security alerts

For instructions on how to set up a notification for a security alert, refer to [Create a Notification](https://developers.cloudflare.com/notifications/get-started/#create-a-notification).

---

## Alert logic

Security alerts use a static threshold together with a [z-score ↗](https://en.wikipedia.org/wiki/Standard%5Fscore) calculation over the last six hours and five-minute buckets of events. An alert is triggered whenever the z-score value is above 3.5 and the spike crosses a threshold of 200 security events. You will not receive duplicate alerts within the same two-hour time frame.

## Alert types

Advanced Security Events Alert

**Who is it for?**

Enterprise customers who want to receive alerts about spikes in specific services that generate log entries in [Security Events](https://developers.cloudflare.com/waf/analytics/security-events/). For more information, refer to [WAF alerts](https://developers.cloudflare.com/waf/reference/alerts/).

**Other options / filters**

A mandatory [filters](https://developers.cloudflare.com/api/resources/alerting/subresources/policies/methods/create/) selection is needed when you create a notification policy which includes the list of services and zones that you want to be alerted on.

* You can search for and add domains from your list of Enterprise zones.
* You can choose which services the alert should monitor (Managed Firewall, Rate Limiting, etc.).
* You can filter events by a targeted action.
**Included with**

Enterprise plans.

**What should you do if you receive one?**

Review the information in [Security Events](https://developers.cloudflare.com/waf/analytics/security-events/) to identify any possible attack or misconfiguration.

**Additional information**

The mean time to detection is five minutes.

When setting up this alert, you can select the services that will be monitored. Each selected service is monitored separately and can be selected as a filter.

**Limitations**

Security Events (WAF) alerts are not sent for each individual events, but only when a spike in traffic reaches the threshold for an alert to be sent.

These thresholds cannot be configured. Z-score is used to determine the threshold.

Security Events Alert

**Who is it for?**

Business and Enterprise customers who want to receive alerts about spikes across all services that generate log entries in [Security Events](https://developers.cloudflare.com/waf/analytics/security-events/). For more information, refer to [WAF alerts](https://developers.cloudflare.com/waf/reference/alerts/).

**Other options / filters**

A mandatory [filters](https://developers.cloudflare.com/api/resources/alerting/subresources/policies/methods/create/) selection is needed when you create a notification policy which includes the list of zones that you want to be alerted on.

* You can also search for and add domains from your list of business or enterprise zones. The notification will be sent for the domains chosen.
* You can filter events by a targeted action.
**Included with**

Business and Enterprise plans.

**What should you do if you receive one?**

Review the information in [Security Events](https://developers.cloudflare.com/waf/analytics/security-events/) to identify any possible attack or misconfiguration.

**Additional information**

The mean time to detection is five minutes.

When setting up this alert, you can select the services that will be monitored. Each selected service is monitored separately.

**Limitations**

Security Events (WAF) alerts are not sent for each individual events, but only when a spike in traffic reaches the threshold for an alert to be sent.

These thresholds cannot be configured. Z-score is used to determine the threshold.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/reference/alerts/#page","headline":"Alerts for security events · Cloudflare Web Application Firewall (WAF) docs","description":"Set up alerts for WAF security events.","url":"https://developers.cloudflare.com/waf/reference/alerts/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/reference/alerts/","name":"Alerts for security events"}}]}
```
