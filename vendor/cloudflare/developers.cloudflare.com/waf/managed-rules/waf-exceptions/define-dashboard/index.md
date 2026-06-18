---
title: Add an exception in the dashboard
description: Use the Cloudflare dashboard to create exceptions that skip the execution of WAF managed rulesets or specific ruleset rules.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Add an exception in the dashboard

## 1\. Go to the zone or account dashboard page

To add an exception at the zone level:

* [  New dashboard ](#tab-panel-11254)
* [ Old dashboard ](#tab-panel-11255)

1. In the Cloudflare dashboard, go to the **Security rules** page.  
[ Go to **Security rules** ](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. Select **Create** \> **Managed rules**.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com), and select your account and domain.
2. Go to **Security** \> **WAF** \> **Managed rules** tab.
3. Select **Add exception**.

To add an exception at the account level (Enterprise plans only):

1. In the Cloudflare dashboard, go to the **WAF** page.  
[ Go to **WAF** ](https://dash.cloudflare.com/?to=/:account/application-security/waf)
2. Go to the **Managed rulesets** tab.
3. Select **Deploy** \> **Deploy managed exception**.

## 2\. Define basic exception parameters

1. In **Exception name**, enter a name for the exception.  
![The Add exception page in the Cloudflare dashboard](https://developers.cloudflare.com/_astro/waf-exception-create.DGVMUWUU_Z1xuWkC.webp)
2. In **When incoming requests match**, specify a filter expression that defines the conditions for applying the exception. When the expression matches, the WAF will evaluate the exception skipping one or more rules of WAF managed rulesets. The filter expression uses the [Rules language](https://developers.cloudflare.com/ruleset-engine/rules-language/).

## 3\. Select the rules to skip

1. In **Then**, select the [exception type](https://developers.cloudflare.com/waf/managed-rules/waf-exceptions/#types-of-exceptions) that determines which rules to skip:  
   * **Skip all remaining rules**: Skips all remaining rules of WAF managed rulesets. If you select this option, proceed to [4\. Create the exception](#4-create-the-exception).  
   * **Skip specific rules from a Managed Ruleset**: Skips one or more rules of a managed ruleset.
2. Select **Select ruleset**.
3. Next to the ruleset containing the rule(s) you wish to skip, select **Select rules**.
4. **A) To skip one or more rules in the ruleset:**  
   1. Search for a rule using the available filters. You can search by description, rule ID, or tag. For example, in the Cloudflare OWASP Core Ruleset you can search for `920460` to find the rule `920460: Abnormal character escapes in request`.  
   2. Select the checkbox next to the rule(s) you want to skip.  
   3. If required, search for other rules and select them. The dashboard keeps a list of the rules you selected between searches.  
**B) To skip all the rules in the ruleset:**  
   1. Select all the rules in the current page by selecting the checkbox in the table header, near **Description/Rule ID**. The table header will display `10 rules selected (of <TOTAL> rules)`.  
   ![Rule selection page showing the option to select all the rules in the ruleset](https://developers.cloudflare.com/_astro/waf-exception-select-all-rules.CBp6LP58_19ddVJ.webp)  
   2. Select **Select all <TOTAL> rules** in the table header to select all the rules across all pages.
5. Select **Next**.

## 4\. Create the exception

1. (Optional) To disable logging for requests matching the exception, disable **Log matching requests**.
2. To save and deploy your exception, select **Deploy**. If you are not ready to deploy your exception, select **Save as Draft**.

## 5\. (Optional) Edit the exception

To edit an exception at the zone level:

* [  New dashboard ](#tab-panel-11256)
* [ Old dashboard ](#tab-panel-11257)

1. In the Cloudflare dashboard, go to the **Security rules** page.  
[ Go to **Security rules** ](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. (Optional) Filter by **Managed Rules**.
3. Find the exception you want to edit and select its name. Exceptions are rules listed with **Action** \= **Skip**.
4. Once you have finished making changes, select **Save**.  
Alternatively, to delete the exception, select **Delete exception**.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com), and select your account and domain.
2. Go to **Security** \> **WAF** \> **Managed rules** tab.
3. Find the exception you want to edit and select its name. Exceptions are rules listed with **Action** \= **Skip**.
4. Once you have finished making changes, select **Save**.

To delete an exception listed in the **Managed rules** tab, select the three dots > **Delete**.

To edit an exception at the account level (Enterprise plans only):

1. In the Cloudflare dashboard, go to the **WAF** page.  
[ Go to **WAF** ](https://dash.cloudflare.com/?to=/:account/application-security/waf)
2. Go to the **Managed rulesets** tab.
3. Find the exception you want to edit and select its name. Exceptions are rules listed with **Action** \= **Skip**.
4. Once you have finished making changes, select **Save**.  
Alternatively, to delete the exception, select **Delete exception**.

Note

Exceptions only apply to rules executing a managed ruleset listed after them. For example, if you are skipping a rule belonging to the Cloudflare OWASP Core Ruleset, make sure the exception is listed in the rules list before the _Execute_ rule deploying this managed ruleset.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/managed-rules/waf-exceptions/define-dashboard/#page","headline":"Add a WAF exception in the dashboard · Cloudflare Web Application Firewall (WAF) docs","description":"Use the Cloudflare dashboard to create exceptions that skip the execution of WAF managed rulesets or specific ruleset rules.","url":"https://developers.cloudflare.com/waf/managed-rules/waf-exceptions/define-dashboard/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/managed-rules/","name":"Managed Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/managed-rules/waf-exceptions/","name":"Create exceptions"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/managed-rules/waf-exceptions/define-dashboard/","name":"Add an exception in the dashboard"}}]}
```
