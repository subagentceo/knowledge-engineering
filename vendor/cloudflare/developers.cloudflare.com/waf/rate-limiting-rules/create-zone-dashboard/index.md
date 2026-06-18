---
title: Create a rate limiting rule in the dashboard
description: Create a rate limiting rule for your zone in the Cloudflare dashboard.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Create a rate limiting rule in the dashboard

* [  New dashboard ](#tab-panel-11258)
* [ Old dashboard ](#tab-panel-11259)

1. In the Cloudflare dashboard, go to the **Security rules** page.  
[ Go to **Security rules** ](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. To create a new empty rule, select **Create rule** \> **Rate limiting rules**. To duplicate an existing rule, select the three dots next to it > **Duplicate**.
3. Enter a descriptive name for the rule in **Rule name**.  
![The Create rate limiting rule page in the Cloudflare dashboard](https://developers.cloudflare.com/_astro/rate-limiting-create.qwL_1SJt_Z1hMrFF.webp)
4. In the **Field** drop-down, choose an HTTP property. For each request, the value of the property you choose for **Field** is compared to the value you specify for **Value** using the operator selected in **Operator**.
5. (Optional) Under **Cache status**, disable **Also apply rate limiting to cached assets** to consider only the requests that reach the origin when determining the rate.
6. Under **With the same characteristics**, add one or more characteristics that will define the request counters for rate limiting purposes. Each value combination will have its own counter to determine the rate. Refer to [How Cloudflare determines the request rate](https://developers.cloudflare.com/waf/rate-limiting-rules/request-rate/) for more information.
7. (Optional) To define an expression that specifies the conditions for incrementing the rate counter, enable **Use custom counting expression** and set the expression. By default, the counting expression is the same as the rule expression. The counting expression can include [response fields](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/?field-category=Response).
8. Under **When rate exceeds**, define the maximum number of requests and the time period to consider when determining the rate.
9. Under **Then take action**, select the rule action from the **Choose action** drop-down list. For example, selecting _Block_ tells Cloudflare to refuse requests in the conditions you specified when the request limit is reached.
10. (Optional) If you selected the _Block_ action, you can [configure a custom response](#configure-a-custom-response-for-blocked-requests) for requests exceeding the configured rate limit.
11. Select the mitigation timeout in the **Duration** dropdown. This is the time period during which Cloudflare applies the select action once the rate is reached.  
Enterprise customers with a paid add-on can [throttle requests](https://developers.cloudflare.com/waf/rate-limiting-rules/parameters/#with-the-following-behavior) instead of applying the configured action for a selected duration. To throttle requests, under **With the following behavior** select _Throttle requests over the maximum configured rate_.
12. To save and deploy your rule, select **Deploy**. If you are not ready to deploy your rule, select **Save as Draft**.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and zone.
2. Go to **Security** \> **WAF** \> **Rate limiting rules**.
3. To create a new empty rule, select **Create rule**. To duplicate an existing rule, select the three dots next to it > **Duplicate**.
4. Enter a descriptive name for the rule in **Rule name**.  
![The Create rate limiting rule page in the Cloudflare dashboard](https://developers.cloudflare.com/_astro/rate-limiting-create.qwL_1SJt_Z1hMrFF.webp)
5. In the **Field** drop-down, choose an HTTP property. For each request, the value of the property you choose for **Field** is compared to the value you specify for **Value** using the operator selected in **Operator**.
6. (Optional) Under **Cache status**, disable **Also apply rate limiting to cached assets** to consider only the requests that reach the origin when determining the rate.
7. Under **With the same characteristics**, add one or more [characteristics](https://developers.cloudflare.com/waf/rate-limiting-rules/parameters/#with-the-same-characteristics) that will define the request counters for rate limiting purposes. Each value combination will have its own counter to determine the rate. For more information, refer to [Request rate calculation](https://developers.cloudflare.com/waf/rate-limiting-rules/request-rate/).
8. (Optional) To define an expression that specifies the conditions for incrementing the rate counter, enable **Use custom counting expression** and set the expression. By default, the counting expression is the same as the rule expression. The counting expression can include [response fields](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/?field-category=Response).
9. (Optional) In **When rate exceeds**, select between:  
   * **Request based**: Rate limiting based on the number of incoming requests during a given period.  
   * **Complexity based**: Rate limiting based on the complexity or cost of handling requests during a given period.  
Note  
[Complexity-based rate limiting](https://developers.cloudflare.com/waf/rate-limiting-rules/request-rate/#complexity-based-rate-limiting) is only available to Enterprise customers with Advanced Rate Limiting. Other users will always use request-based rate limiting.
10. If you selected **Request based** in the previous step (or if you could not select the rate limiting method), enter a value for:  
   * **Requests**: Maximum number of requests.  
   * **Period**: Time period to consider when determining the rate.  
If you selected **Complexity based**, enter a value for:  
   * **Score per period**: Maximum score per period. When this value is exceeded, the rule action will execute.  
   * **Period**: Time period to consider when determining the rate.  
   * **Response header name**: Name of HTTP header in the response, set by the origin server, with the score for the current request.
11. Under **Then take action**, select the rule action from the **Choose action** drop-down list. For example, selecting _Block_ tells Cloudflare to refuse requests in the conditions you specified when the request limit is reached.
12. (Optional) If you selected the _Block_ action, you can [configure a custom response](#configure-a-custom-response-for-blocked-requests) for requests exceeding the configured rate limit.
13. Select the mitigation timeout in the **Duration** dropdown. This is the time period during which Cloudflare applies the select action once the rate is reached.  
Enterprise customers with a paid add-on can [throttle requests](https://developers.cloudflare.com/waf/rate-limiting-rules/parameters/#with-the-following-behavior) instead of applying the configured action for a selected duration. To throttle requests, under **With the following behavior** select _Throttle requests over the maximum configured rate_.
14. To save and deploy your rule, select **Deploy**. If you are not ready to deploy your rule, select **Save as Draft**.

## Configure a custom response for blocked requests

Note

This feature is only available on Pro plans and above.

When you select the _Block_ action in a rule you can optionally define a custom response.

The custom response has three settings:

* **With response type**: Choose a content type or the default rate limiting response from the list. The available custom response types are the following:  
| Dashboard value | API value          |  
| --------------- | ------------------ |  
| Custom HTML     | "text/html"        |  
| Custom Text     | "text/plain"       |  
| Custom JSON     | "application/json" |  
| Custom XML      | "text/xml"         |
* **With response code**: Choose an HTTP status code for the response, in the range 400-499\. The default response code is 429.
* **Response body**: The body of the response. Configure a valid body according to the response type you selected. The maximum field size is 30 KB.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/rate-limiting-rules/create-zone-dashboard/#page","headline":"Create a rate limiting rule in the dashboard · Cloudflare Web Application Firewall (WAF) docs","description":"Create a rate limiting rule for your zone in the Cloudflare dashboard.","url":"https://developers.cloudflare.com/waf/rate-limiting-rules/create-zone-dashboard/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/rate-limiting-rules/","name":"Rate limiting rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/rate-limiting-rules/create-zone-dashboard/","name":"Create a rate limiting rule in the dashboard"}}]}
```
