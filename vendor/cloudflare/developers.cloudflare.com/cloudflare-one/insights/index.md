---
title: Insights
description: Insights resources and guides for Zero Trust analytics.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Insights

Cloudflare One offers observability tools to monitor and troubleshoot your environment:

* [Analytics Overview](https://developers.cloudflare.com/cloudflare-one/insights/analytics-overview/) to monitor overall Cloudflare One usage.
* [Analytics Dashboards](https://developers.cloudflare.com/cloudflare-one/insights/analytics/) to review organizational traffic trends and policy insights.
* [Logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/) for event-level investigation.
* [Digital Experience Monitoring (DEX)](https://developers.cloudflare.com/cloudflare-one/insights/dex/) for device, network, and application performance.

## Troubleshooting workflow example

A user reports they cannot reach an internal application behind [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/). To address the issue:

1. Check the [Analytics overview dashboard](https://developers.cloudflare.com/cloudflare-one/insights/analytics-overview/) to review if other users are experiencing similar issues.
2. Review [Logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/) to examine the user's authentication attempts and blocked requests.
3. Use [DEX](https://developers.cloudflare.com/cloudflare-one/insights/dex/) to evaluate the user's device health and network performance.

## How to use these tools together

### Onboarding

After onboarding your devices and users, use these tools to confirm everything is set up correctly and to monitor your organization's activity.

1. Start with [Logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/) to validate initial configuration and confirm that authentication is successful.
2. Use [Analytics Overview](https://developers.cloudflare.com/cloudflare-one/insights/analytics-overview/) to confirm expected patterns and policy activity.

If your device is experiencing connectivity issues, Cloudflare recommends starting with [troubleshooting WARP](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/troubleshooting-guide/) as WARP misconfiguration is the most common cause of connectivity issues.

### Daily monitoring

1. Use [Analytics Dashboards](https://developers.cloudflare.com/cloudflare-one/insights/analytics/) to understand trends and for visualizations of your log data.  
Administrators typically start with Analytics Dashboards because they offer:  
   * A high-level view of activity across your products, like Access, or security use cases, such as AI and shadow IT.  
   * Visibility into trends, provided through time-series graphs, to track the evolution of key metrics (such as [DNS queries](https://developers.cloudflare.com/cloudflare-one/insights/analytics/gateway/#dns-query-analytics), [network sessions](https://developers.cloudflare.com/cloudflare-one/insights/analytics/gateway/#network-session-analytics), [HTTP requests](https://developers.cloudflare.com/cloudflare-one/insights/analytics/gateway/#http-request-analytics), and [CASB posture/content findings](https://developers.cloudflare.com/cloudflare-one/insights/analytics/data-analytics/)) over time.
2. Use [Logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/) as needed for event-level verification.  
Use Logs when you need to:  
   * Investigate a specific event; for example, a user's [failed authentication attempt](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/access-authentication-logs/) when trying to log in to an application.  
   * Validate identity or device details; for example, confirming which user made the request, how they authenticated, and whether their device met required [posture conditions](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/posture-logs/).  
   * Confirm policy matches; for example, verifying which [specific rule](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/#rule-types) allowed, blocked, or challenged a user's request and why it was applied.

### User-reported issues

Users may report problems like slow or failing connections to internal apps.

1. Start with [Analytics Dashboards](https://developers.cloudflare.com/cloudflare-one/insights/analytics/) to review whether the issue impacts others.
2. Check [Logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/) for failed authentication attempts, blocked requests, or unexpected policy matches.
3. Use [DEX](https://developers.cloudflare.com/cloudflare-one/insights/dex/) to diagnose device- or network-level causes with [synthetic tests](https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/) and [device monitoring](https://developers.cloudflare.com/cloudflare-one/insights/dex/monitoring/).

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/cloudflare-one/insights/#page","headline":"Insights · Cloudflare One docs","description":"Insights resources and guides for Zero Trust analytics.","url":"https://developers.cloudflare.com/cloudflare-one/insights/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/insights/","name":"Insights"}}]}
```
