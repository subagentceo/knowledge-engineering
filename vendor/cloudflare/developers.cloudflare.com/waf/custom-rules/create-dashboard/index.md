---
title: Create a custom rule in the dashboard
description: Create WAF custom rules in the Cloudflare dashboard.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Create a custom rule in the dashboard

* [  New dashboard ](#tab-panel-11151)
* [ Old dashboard ](#tab-panel-11152)

1. In the Cloudflare dashboard, go to the **Security rules** page.  
[ Go to **Security rules** ](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. To create a new empty rule, select **Create rule** \> **Custom rules**. To duplicate an existing rule, select the three dots next to it > **Duplicate**.
3. Enter a descriptive name for the rule in **Rule name**.  
![Custom rule creation page in the Cloudflare dashboard](https://developers.cloudflare.com/_astro/firewall-custom-rule-create.tVXiVklq_1Tgdjc.webp)
4. Under **When incoming requests match**, use the **Field** drop-down list to choose an HTTP property. For each request, the value of the property you choose for **Field** is compared to the value you specify for **Value** using the operator selected in **Operator**.
5. Under **Then take action**, select the rule action in the **Choose action** dropdown. For example, selecting _Block_ tells Cloudflare to refuse requests that match the conditions you specified.
6. (Optional) If you selected the _Block_ action, you can [configure a custom response](#configure-a-custom-response-for-blocked-requests).
7. To save and deploy your rule, select **Deploy**. If you are not ready to deploy your rule, select **Save as Draft**.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com), and select your account and domain.
2. Go to **Security** \> **WAF** \> **Custom rules**.
3. To create a new empty rule, select **Create rule**. To duplicate an existing rule, select the three dots next to it > **Duplicate**.
4. Enter a descriptive name for the rule in **Rule name**.  
![Custom rule creation page in the Cloudflare dashboard](https://developers.cloudflare.com/_astro/firewall-custom-rule-create.tVXiVklq_1Tgdjc.webp)
5. Under **When incoming requests match**, use the **Field** drop-down list to choose an HTTP property. For each request, the value of the property you choose for **Field** is compared to the value you specify for **Value** using the operator selected in **Operator**.
6. Under **Then take action**, select the rule action in the **Choose action** dropdown. For example, selecting _Block_ tells Cloudflare to refuse requests that match the conditions you specified.
7. (Optional) If you selected the _Block_ action, you can [configure a custom response](#configure-a-custom-response-for-blocked-requests).
8. To save and deploy your rule, select **Deploy**. If you are not ready to deploy your rule, select **Save as Draft**.

## Configure a custom response for blocked requests

Note

This feature is only available on Pro plans and above.

When you select the _Block_ action in a rule you can optionally define a custom response.

The custom response has three settings:

* **With response type**: Choose a content type or the default WAF block response from the list. The available custom response types are the following:  
| Dashboard value | API value          |  
| --------------- | ------------------ |  
| Custom HTML     | "text/html"        |  
| Custom Text     | "text/plain"       |  
| Custom JSON     | "application/json" |  
| Custom XML      | "text/xml"         |
* **With response code**: Choose an HTTP status code for the response, in the range 400-499\. The default response code is 403.
* **Response body**: The body of the response. Configure a valid body according to the response type you selected. The maximum field size is 2 KB.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/custom-rules/create-dashboard/#page","headline":"Create a custom rule in the dashboard · Cloudflare Web Application Firewall (WAF) docs","description":"Create WAF custom rules in the Cloudflare dashboard.","url":"https://developers.cloudflare.com/waf/custom-rules/create-dashboard/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/custom-rules/","name":"Custom rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/custom-rules/create-dashboard/","name":"Create a custom rule in the dashboard"}}]}
```
