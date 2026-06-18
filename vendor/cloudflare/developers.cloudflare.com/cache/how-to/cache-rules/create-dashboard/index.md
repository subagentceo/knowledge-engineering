---
title: Create a rule in the dashboard
description: Create cache rules in the Cloudflare dashboard.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Create a rule in the dashboard

1. In the Cloudflare dashboard, go to the **Cache Rules** page.  
[ Go to **Cache Rules** ](https://dash.cloudflare.com/?to=/:account/:zone/caching/cache-rules)
2. Select **Create rule**.
3. (Optional) Select one of the rule templates that address common use cases. Then, review and adjust the proposed rule configuration.
4. Enter a descriptive name for the rule in **Rule name**.
5. Under **When incoming requests match**, select **All incoming requests** if you want the rule to apply to all traffic or **Custom filter expression** if you want the rule to only apply to traffic matching the custom expression.
6. If you selected **Custom filter expression**, under **When incoming requests match**, define the [rule expression](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/edit-expressions/#expression-builder). Use the **Field** drop-down list to choose an HTTP property and select an **Operator**. Refer to [Available settings](https://developers.cloudflare.com/cache/how-to/cache-rules/settings/) for the list of available fields and operators.  
![Select fields in the Expression Builder.](https://developers.cloudflare.com/_astro/select-fields.euDkKViI_ZPmSQ0.webp)
7. Following the selection of the field and operator, enter the corresponding value that will trigger the Cache Rule. For example, if the selected field is `Hostname` and the operator is `equals`, a value of `cloudflare.com` would mean the rule matches any request to that hostname.  
![Example rule](https://developers.cloudflare.com/_astro/example-rule.fBosjk1F_ZeT0Gp.webp)  
Note  
Rules can be further customized by using the **Edit expression** option. You can find more information in [Edit expressions in the dashboard](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/edit-expressions/).
8. Under **Then**, in the **Cache eligibility** section, select [**Bypass cache**](https://developers.cloudflare.com/cache/how-to/cache-rules/settings/#bypass-cache) if you want matching requests to not be cacheable, or **Eligible for cache** if you want Cloudflare to attempt to cache them. Note that [cache-control headers](https://developers.cloudflare.com/cache/concepts/cache-control/) can also impact cache eligibility.
9. If you selected **Eligible for cache** in the previous step, you can customize the options described in the [Available settings](https://developers.cloudflare.com/cache/how-to/cache-rules/settings/) section.
10. Under **Place at**, from the dropdown, you can select the order of your rule. From the main page, you can also change the order of the rules you have created.
11. To save and deploy your rule, select **Deploy**. If you are not ready to deploy your rule, select **Save as Draft**.  
If you are matching a hostname in your rule expression, you may be prompted to create a proxied DNS record for that hostname. Refer to [Troubleshooting](https://developers.cloudflare.com/rules/reference/troubleshooting/#this-rule-may-not-apply-to-your-traffic) for more information.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/how-to/cache-rules/create-dashboard/#page","headline":"Create a cache rule in the dashboard · Cloudflare Cache (CDN) docs","description":"Create cache rules in the Cloudflare dashboard.","url":"https://developers.cloudflare.com/cache/how-to/cache-rules/create-dashboard/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cache/","name":"Cache / CDN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cache/how-to/","name":"Cache configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/cache/how-to/cache-rules/","name":"Cache Rules"}},{"@type":"ListItem","position":5,"item":{"@id":"/cache/how-to/cache-rules/create-dashboard/","name":"Create a rule in the dashboard"}}]}
```
