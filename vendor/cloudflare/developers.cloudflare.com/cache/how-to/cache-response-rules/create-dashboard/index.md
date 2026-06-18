---
title: Create a rule in the dashboard
description: Create cache response rules in the Cloudflare dashboard.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Create a rule in the dashboard

1. In the Cloudflare dashboard, go to **Cache** \> **Cache Rules**.  
[ Go to **Cache Rules** ](https://dash.cloudflare.com/?to=/:account/:zone/caching/cache-rules)
2. Select the **Cache Response Rules** tab.
3. Select **Create rule**.
4. Enter a descriptive name for the rule in **Rule name**.
5. Under **When incoming requests match**, select **All incoming requests** if you want the rule to apply to all traffic or **Custom filter expression** if you want the rule to only apply to traffic matching the custom expression.
6. If you selected **Custom filter expression**, define the [rule expression](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/edit-expressions/#expression-builder). Use the **Field** drop-down list to choose an HTTP property and select an **Operator**. Both request fields (such as URI path or hostname) and response fields (such as response status code or response headers) are available for matching. Refer to [Available settings](https://developers.cloudflare.com/cache/how-to/cache-response-rules/settings/) for the full list of available fields and operators.  
Note  
Rules can be further customized by using the **Edit expression** option. You can find more information in [Edit expressions in the dashboard](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/edit-expressions/).
7. Following the selection of the field and operator, enter the corresponding value that will trigger the Cache Response Rule. For example, if the selected field is `Hostname` and the operator is `equals`, a value of `example.com` would mean the rule matches any request to that hostname.
8. Under **Then**, select one of the following actions:  
   * **Modify cache-control directives**: Set or remove `Cache-Control` directives sent by your origin. For each directive, choose **Set directive** or **Remove directive**. For duration-based directives like `max-age` or `s-maxage`, enter a value in seconds. Turn on **Cloudflare only** to apply the directive only within Cloudflare's cache without changing what visitors receive. Refer to [Supported directives](https://developers.cloudflare.com/cache/how-to/cache-response-rules/settings/#supported-directives) for the full list.  
   * **Modify cache tags**: Add, override, or remove cache tags on the response for targeted [purging](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-by-tags/). Select one of the following operations:  
         * **Add to existing tags**: Append new tags to the current set.  
         * **Override existing tags**: Replace all current tags with the specified tags.  
         * **Remove from existing tags**: Remove specific tags from the current set.  
   For the tag source, you can either specify tags manually or select **Parse from response header** to extract tags from a response header value. When parsing from a header, you can split the header value using a custom separator (for example, commas instead of spaces).  
   * **Strip headers**: Remove `Set-Cookie`, `ETag`, or `Last-Modified` headers from the origin response before Cloudflare evaluates the response for caching. Select which headers to strip.  
For more details on each action, refer to [Available settings](https://developers.cloudflare.com/cache/how-to/cache-response-rules/settings/#available-actions).
9. Under **Place at**, from the dropdown, you can select the order of your rule. From the main page, you can also change the order of the rules you have created.
10. To save and deploy your rule, select **Deploy**. If you are not ready to deploy your rule, select **Save as Draft**.

If you are matching a hostname in your rule expression, you may be prompted to create a proxied DNS record for that hostname. Refer to [Troubleshooting](https://developers.cloudflare.com/rules/reference/troubleshooting/#this-rule-may-not-apply-to-your-traffic) for more information.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/how-to/cache-response-rules/create-dashboard/#page","headline":"Create a Cache Response Rule in the dashboard · Cloudflare Cache (CDN) docs","description":"Create cache response rules in the Cloudflare dashboard.","url":"https://developers.cloudflare.com/cache/how-to/cache-response-rules/create-dashboard/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cache/","name":"Cache / CDN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cache/how-to/","name":"Cache configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/cache/how-to/cache-response-rules/","name":"Cache Response Rules"}},{"@type":"ListItem","position":5,"item":{"@id":"/cache/how-to/cache-response-rules/create-dashboard/","name":"Create a rule in the dashboard"}}]}
```
