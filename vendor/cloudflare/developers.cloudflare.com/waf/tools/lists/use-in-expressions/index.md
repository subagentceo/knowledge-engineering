---
title: Use lists in expressions
description: Learn how to use lists in rule expressions.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Use lists in expressions

In the Cloudflare dashboard, there are two options for editing [expressions](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/):

* [Expression Builder](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/edit-expressions/#expression-builder): Allows you to create expressions using drop-down lists, emphasizing a visual approach to defining an expression.
* [Expression Editor](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/edit-expressions/#expression-editor): A text-only interface that supports advanced features, such as grouping symbols and functions for transforming and validating values.

## Use a list in the Expression Builder

To use a list in the Expression Builder:

1. From the **Operator** drop-down list, select _is in list_ or _is not in list_. Note that not all fields support these operators.  
![Selecting an IP list from the Value drop-down list when configuring the expression of a WAF custom rule](https://developers.cloudflare.com/_astro/cf-open-proxies-list.DYcEfIK7_Z2w9oe6.webp)
2. Select a list from the **Value** drop-down list. Depending on your plan, you may be able to select a [Managed IP List](https://developers.cloudflare.com/waf/tools/lists/managed-lists/#managed-ip-lists).
3. To commit your changes and enable the rule, select **Deploy**. If you are not ready to enable the rule, select **Save as Draft**.

## Use a list in the Expression Editor

To use a list in the Expression Editor, specify the `in` operator and use `$<list_name>` to specify the name of the list.

Examples:

* Expression matching requests from IP addresses that are in an IP list named `office_network`:  
```  
ip.src in $office_network  
```
* Expression matching requests with a source IP address different from IP addresses in the `office_network` IP list:  
```  
not ip.src in $office_network  
```
* Expression matching requests from IP addresses in the Cloudflare Open Proxies [Managed IP List](https://developers.cloudflare.com/waf/tools/lists/managed-lists/#managed-ip-lists):  
```  
ip.src in $cf.open_proxies  
```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/tools/lists/use-in-expressions/#page","headline":"Use lists in expressions · Cloudflare Web Application Firewall (WAF) docs","description":"Learn how to use lists in rule expressions.","url":"https://developers.cloudflare.com/waf/tools/lists/use-in-expressions/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/tools/","name":"Additional tools"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/tools/lists/","name":"Lists"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/tools/lists/use-in-expressions/","name":"Use lists in expressions"}}]}
```
