---
title: Configure in the dashboard
description: Create HTTP DDoS Attack Protection overrides in the Cloudflare dashboard.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ddos-protection/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Configure in the dashboard

Configure the HTTP DDoS Attack Protection managed ruleset by defining [overrides](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/override-managed-ruleset/) in the Cloudflare dashboard. DDoS overrides allow you to customize the **action** and **sensitivity** of one or more rules in the managed ruleset.

For more information on the available parameters and allowed values, refer to [Ruleset parameters](https://developers.cloudflare.com/ddos-protection/managed-rulesets/http/override-parameters/).

Number of available overrides

If you are an Enterprise customer with the Advanced DDoS Protection subscription, you can define up to 10 overrides. These overrides can have a custom expression so that the override only applies to a subset of incoming requests. If you do not have the Advanced DDoS Protection subscription, you can only deploy one override which will always apply to all incoming requests.

If you cannot deploy any additional overrides, consider editing an existing override to adjust rule configuration.

Create multiple rules in the `ddos_l7` phase entry point ruleset to define different overrides for different sets of incoming requests. Set each rule expression according to the traffic whose HTTP DDoS protection you wish to customize.

Rules in the phase entry point ruleset, where you create overrides, are evaluated in order until there is a match for a rule expression and sensitivity level, and Cloudflare will apply the first rule that matches the request. Therefore, the rule order in the entry point ruleset is very important.

## Access

* [  New dashboard ](#tab-panel-8053)
* [ Old dashboard ](#tab-panel-8054)

1. In the Cloudflare dashboard, go to the **Security rules** page.  
[ Go to **Security rules** ](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. Go to the **DDoS protection** tab.
3. On **HTTP DDoS attack protection**, select **Create override**.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and website.
2. Go to **Security** \> **DDoS**.
3. Next to **HTTP DDoS attack protection**, select **Deploy a DDoS override**.

### Create a DDoS override

1. Enter a descriptive name for the override in **Override name**.
2. If you are an Enterprise customer with the Advanced DDoS Protection subscription:  
   1. Under **Override scope**, review the scope of the override — by default, all incoming requests for the current zone.  
   2. If necessary, select **Edit scope** and configure the [custom filter expression](https://developers.cloudflare.com/ddos-protection/managed-rulesets/http/http-overrides/override-expressions/) that will determine the override scope.
3. Depending on what you wish to override, refer to the following sections (you can perform both configurations on the same override):  
Configure all the rules in the ruleset (ruleset override)  
   1. To always apply a given action for all the rules in the ruleset, select an action in **Ruleset action**.  
   2. To set the sensitivity level for all the rules in the ruleset, select a value in **Ruleset sensitivity**.  
Configure one or more rules  
   1. Under **Rule configuration**, select **Browse rules**.  
   2. Search for the rules you wish to configure using the available filters. You can search by [tag](https://developers.cloudflare.com/ddos-protection/managed-rulesets/http/rule-categories/) (also known as category).  
   3. To configure a single rule, select the desired value for a field in the displayed dropdowns next to the rule.  
   To configure more than one rule, select the rules using the row checkboxes and update the fields for the selected rules using the dropdowns displayed before the table. You can also configure all the rules with a given tag. For more information, refer to [Configure a managed ruleset](https://developers.cloudflare.com/waf/managed-rules/deploy-zone-dashboard/#configure-a-managed-ruleset).  
   4. Select **Next**.  
Notes  
   * Tag and rule overrides have priority over ruleset overrides.  
   * The managed ruleset includes some read-only rules that you cannot override.
4. Select **Save**.

### Delete a DDoS override

* [  New dashboard ](#tab-panel-8055)
* [ Old dashboard ](#tab-panel-8056)

1. In the Cloudflare dashboard, go to the **Security rules** page.  
[ Go to **Security rules** ](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. Go to the **DDoS protection** tab.
3. Select the override.
4. Select **Delete deployment**.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Security > DDoS**.
3. Next to the DDoS override you wish to delete, select **Delete**.
4. Select **Delete** to confirm the operation.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ddos-protection/managed-rulesets/http/http-overrides/configure-dashboard/#page","headline":"Configure HTTP DDoS Attack Protection in the dashboard · Cloudflare DDoS Protection docs","description":"Create HTTP DDoS Attack Protection overrides in the Cloudflare dashboard.","url":"https://developers.cloudflare.com/ddos-protection/managed-rulesets/http/http-overrides/configure-dashboard/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ddos-protection/","name":"DDoS Protection"}},{"@type":"ListItem","position":3,"item":{"@id":"/ddos-protection/managed-rulesets/","name":"Managed rulesets"}},{"@type":"ListItem","position":4,"item":{"@id":"/ddos-protection/managed-rulesets/http/","name":"HTTP DDoS Attack Protection"}},{"@type":"ListItem","position":5,"item":{"@id":"/ddos-protection/managed-rulesets/http/http-overrides/","name":"Overrides"}},{"@type":"ListItem","position":6,"item":{"@id":"/ddos-protection/managed-rulesets/http/http-overrides/configure-dashboard/","name":"Configure in the dashboard"}}]}
```
