---
title: Find appropriate rate limit
description: Use Security Analytics request rate data to determine an appropriate rate limit.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Find appropriate rate limit

The **Request rate analysis** tab in [Security Analytics](https://developers.cloudflare.com/waf/analytics/security-analytics/) displays data on the request rate for traffic matching the selected filters and time period. Use this tab to determine the most appropriate rate limit for incoming traffic matching the applied filters.

Note

The **Request rate analysis** tab is only available to Enterprise customers.

## User interface overview

The **Request rate analysis** tab is available at the zone level in the **Analytics** page.

![Screenshot of the Request rate analysis tab in Security Analytics](https://developers.cloudflare.com/_astro/rate-limit-analytics.B2Hd7wNp_1JEIVb.webp) 

The main chart displays the distribution of request rates for the top 50 unique clients observed during the selected time interval (for example, `1 minute`) in descending order. You can group the request rates by the following unique request properties:

* **IP address**
* [**JA3 fingerprint**](https://developers.cloudflare.com/bots/additional-configurations/ja3-ja4-fingerprint/) (only available to customers with Bot Management)
* **IP & JA3** (only available to customers with Bot Management)
* [**JA4 fingerprint**](https://developers.cloudflare.com/bots/additional-configurations/ja3-ja4-fingerprint/) (only available to customers with Bot Management)
* **IP & JA4** (only available to customers with Bot Management)

Note

For more information on how Cloudflare calculates the request rate of incoming traffic, refer to [Request rate calculation](https://developers.cloudflare.com/waf/rate-limiting-rules/request-rate/).

---

## Determine an appropriate rate limit

### 1\. Define the scope

1. In the Cloudflare dashboard, go to the **Analytics** page.  
[ Go to **Analytics** ](https://dash.cloudflare.com/?to=/:account/:zone/security/analytics)
2. In the **Traffic analysis** tab, select a specific time period:  
   * To look at the regular rate distribution, specify a period with non-peak traffic.  
   * To analyze the rate of offending visitors/bots, select a period corresponding to an attack.
3. Apply filters to analyze a particular situation in your application where you want to apply rate limiting (for example, filter by `/login` URL path).
4. (Optional) To focus on non-automated/human traffic, use the bot score quick filter in the sidebar.

### 2\. Find the rate

1. Switch to the **Request rate analysis** tab.
2. Choose the request properties (JA3, IP, IP and JA3, or JA4) and the duration (1 min, 5 mins, or 1 hour) for your rate limit rule. The request properties you select will be used as [rate limiting rule characteristics](https://developers.cloudflare.com/waf/rate-limiting-rules/parameters/#with-the-same-characteristics).
3. Use the slider in the chart to move the horizontal line defining the rate limit. While you move the slider up and down, check the impact of defining a rate limiting rule with the selected limit on the displayed traffic.  
![User adjusting the rate limit in the Request rate analysis chart to check the impact on recent traffic](https://developers.cloudflare.com/images/waf/rate-limit-adjust.gif)

Note

Answering the following questions during your adjustments can help you with your analysis:

* "How many clients would have been caught by the rule and rate limited?"
* "Can I visually identify abusers with above-average rate vs. the long tail of average users?"

### 3\. Validate your rate

1. Repeat the rate selection process described in the previous section, but selecting a portion of traffic where you know there was an attack or traffic peak. The rate you have chosen should block the outlier traffic during the attack and allow traffic during regular periods.
2. (Optional) Check the [sampled logs](https://developers.cloudflare.com/waf/analytics/security-analytics/#sampled-logs) to verify the fingerprints and filters you selected.

### 4\. Create a rate limiting rule

1. In the **Request rate analysis** tab, select **Create rate limit rule** to go to the [rate limiting creation page](https://developers.cloudflare.com/waf/rate-limiting-rules/create-zone-dashboard/) with your filters, characteristics, and selected rate limit pre-populated.
2. Select the rule action. Depending on your needs, you can set the rule to log, challenge, or block requests exceeding the selected threshold.  
It is recommended that you first deploy the rule with the _Log_ action to validate the threshold, and change the action later to block or challenge incoming requests when you are confident about the rule behavior.
3. To save and deploy your rate limiting rule, select **Deploy**. If you are not ready to deploy your rule, select **Save as Draft**.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/rate-limiting-rules/find-rate-limit/#page","headline":"Find an appropriate rate limit · Cloudflare Web Application Firewall (WAF) docs","description":"Use Security Analytics request rate data to determine an appropriate rate limit.","url":"https://developers.cloudflare.com/waf/rate-limiting-rules/find-rate-limit/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/rate-limiting-rules/","name":"Rate limiting rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/rate-limiting-rules/find-rate-limit/","name":"Find appropriate rate limit"}}]}
```
