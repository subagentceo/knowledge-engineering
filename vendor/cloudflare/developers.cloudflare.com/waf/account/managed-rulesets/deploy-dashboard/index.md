---
title: Deploy a WAF managed ruleset in the dashboard (account)
description: Deploy WAF managed rulesets at the account level in the dashboard.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Deploy a WAF managed ruleset in the dashboard (account)

Note

This feature requires an Enterprise plan.

To deploy a managed ruleset for a single zone, refer to [Deploy a WAF managed ruleset in the dashboard](https://developers.cloudflare.com/waf/managed-rules/deploy-zone-dashboard/).

## Deploy a managed ruleset

1. In the Cloudflare dashboard, go to the **WAF** page.  
[ Go to **WAF** ](https://dash.cloudflare.com/?to=/:account/application-security/waf)
2. Go to the **Managed rulesets** tab.  
![Example WAF Managed Rules configuration in the Managed rulesets tab.](https://developers.cloudflare.com/_astro/managed-rulesets-dashboard.BxgYTxN0_ZfehkH.webp)
3. Select **Deploy** \> **Deploy managed ruleset**.
4. Next to the managed ruleset you want to deploy, select **Select ruleset**.
5. Give a name to the rule deploying the ruleset in **Execution name**.
6. (Optional) To execute the managed ruleset for a subset of incoming requests, select **Edit scope** and [configure the expression](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/edit-expressions/) that will determine the scope of the current rule deploying the managed ruleset.  
Warning  
Deployed rulesets will only apply to incoming traffic of Enterprise domains on your account. The Expression Builder will automatically include this filter. If you define a custom expression using the Expression Editor, use parentheses to enclose any custom conditions and end your expression with `and cf.zone.plan eq "ENT"` so that the rule only applies to domains on an Enterprise plan.
7. (Optional) You can customize the behavior of the managed ruleset in the following ways:  
   * [Configure the entire ruleset](#configure-field-values-for-all-the-rules) (affects all the rules)  
   * [Configure several rules or rules with specific tags](#configure-rules-in-bulk-in-a-managed-ruleset)  
   * [Configure a single rule](#configure-a-single-rule-in-a-managed-ruleset)
8. To deploy the managed ruleset immediately, select **Deploy**. If you are not ready to deploy, select **Save as Draft**.

The **Deployed managed rulesets** list will show an _Execute_ rule for the managed ruleset you deployed.

## Turn on or off a managed ruleset

Select the **Enabled** toggle next to a deployed managed ruleset to turn it on or off.

## Configure a managed ruleset

Configure a managed ruleset to define specific field values for one or more rules (for example, configure a rule with an action different from the action configured by Cloudflare). You can also turn off specific rules.

To skip one or more rules — or even entire WAF managed rulesets — for specific incoming requests, [add an exception](https://developers.cloudflare.com/waf/managed-rules/waf-exceptions/). Exceptions, also called skip rules, are shown as _Skip_ rules in the **Deployed managed rulesets** list.

Note

Some managed rulesets may not allow custom configuration, depending on your Cloudflare plan.

### Configure field values for all the rules

To configure an entire managed ruleset:

1. In the Cloudflare dashboard, go to the **WAF** page.  
[ Go to **WAF** ](https://dash.cloudflare.com/?to=/:account/application-security/waf)
2. Go to the **Managed rulesets** tab.
3. Select the rule description of the _Execute_ rule that deploys the managed ruleset you want to configure. Alternatively, select the three dots > **Edit**.  
If you have not deployed the managed ruleset yet, do the following:  
   1. Select **Deploy** \> **Deploy managed ruleset**.  
   2. Next to the managed ruleset you want to deploy and configure, select **Select ruleset**.
4. In the ruleset configuration section, set one or more rule fields from the available values in the drop-down lists. The exact options vary according to the managed ruleset you are configuring.  
For example, select the action to perform for all the rules in the ruleset from the **Ruleset action** drop-down list.  
![The Configure deployment page displaying the available options to override all the rules in the ruleset. In the displayed managed ruleset you can override the ruleset action.](https://developers.cloudflare.com/_astro/waf-configure-ruleset-account.YSsDcmI__ZvxBqT.webp)
5. If you are editing a deployed managed ruleset, select **Save**. If you have not deployed the managed ruleset yet, select **Deploy** to deploy the ruleset immediately, or **Save as Draft** to save your deployment settings for later.

### Configure rules in bulk in a managed ruleset

1. In the Cloudflare dashboard, go to the **WAF** page.  
[ Go to **WAF** ](https://dash.cloudflare.com/?to=/:account/application-security/waf)
2. Go to the **Managed rulesets** tab.
3. If you have already deployed the managed ruleset you want to configure, find the rule deploying that managed ruleset and select the rule description. Alternatively, select the three dots > **Edit** next to an _Execute_ rule deploying the managed ruleset.  
If you have not deployed the managed ruleset:  
   1. Select **Deploy** \> **Deploy managed ruleset**.  
   2. Next to the managed ruleset, select **Select ruleset**.
4. Select **Browse rules**.  
![The Cloudflare dashboard displaying the list of rules in the Cloudflare Managed Ruleset](https://developers.cloudflare.com/_astro/waf-browse-rules.lrvrhCdB_gTa6m.webp)
1. Select one or more tags under the search input to filter the rules with those tags, and then select the checkbox in the top left corner of the table to select all the rules shown in the current page.  
If not all the rules are displayed in the current page, extend your selection to all rules with the selected tags across all pages by selecting **Select all <NUMBER> rules**.
2. Update one or more settings for the selected rules using the buttons displayed in the top right corner of the table (for example, **Set status**).
3. Select **Next**.
4. A dialog appears asking you if any new rules with the selected tags should be configured with the field values you selected.  
   * Select **Include new rules** if you want to apply your configurations to any new rules with the select tags.  
   * Select **Only selected rules** to apply your configurations to the selected rules only.
5. Select **Save**.

### Configure a single rule in a managed ruleset

1. In the Cloudflare dashboard, go to the **WAF** page.  
[ Go to **WAF** ](https://dash.cloudflare.com/?to=/:account/application-security/waf)
2. Go to the **Managed rulesets** tab.
3. If you have already deployed the managed ruleset you want to configure, find the rule deploying that managed ruleset and select the rule description. Alternatively, select the three dots > **Edit** next to an _Execute_ rule deploying the managed ruleset.  
If you have not deployed the managed ruleset:  
   1. Select **Deploy** \> **Deploy managed ruleset**.  
   2. Next to the managed ruleset, select **Select ruleset**.
4. Select **Browse rules**.  
![The Cloudflare dashboard displaying the list of rules in the Cloudflare Managed Ruleset](https://developers.cloudflare.com/_astro/waf-browse-rules.lrvrhCdB_gTa6m.webp)
1. Search for rules using the available filters.
2. In the results list, change the values for each rule as desired, using the displayed drop-down lists and toggles. For example, change the status of a rule using the **Status** toggle next to the rule.  
To configure multiple rules with the same value, select the checkboxes for all the rules you want to configure. If not all the rules are displayed in the current page, you can extend your selection to all rules across all pages by selecting **Select all <NUMBER> rules**. Then, use the buttons displayed in the top right corner of the table — for example, **Set status** — to update one or more fields for the selected rules.
3. Select **Next**, and then select **Save**.

### Browse the rules of a managed ruleset

You can browse the available rules in a managed ruleset and search for individual rules or tags.

1. In the Cloudflare dashboard, go to the **WAF** page.  
[ Go to **WAF** ](https://dash.cloudflare.com/?to=/:account/application-security/waf)
2. Go to the **Managed rulesets** tab.
3. Select the rule description of the _Execute_ rule that deploys the managed ruleset you want to configure. Alternatively, select the three dots > **Edit**.  
If you have not deployed the managed ruleset yet, do the following:  
   1. Select **Deploy** \> **Deploy managed ruleset**.  
   2. Next to the managed ruleset you want to browse, select **Select ruleset**.
4. Select **Browse rules**.  
![The Browse rules page displaying the list of rules in the Cloudflare Managed Ruleset](https://developers.cloudflare.com/_astro/waf-browse-rules.lrvrhCdB_gTa6m.webp)

### Delete a managed ruleset deployment rule or an exception

1. In the Cloudflare dashboard, go to the **WAF** page.  
[ Go to **WAF** ](https://dash.cloudflare.com/?to=/:account/application-security/waf)
2. Go to the **Managed rulesets** tab.
3. Under **Deployed managed rulesets** and next to the rule you want to delete, select the three dots > **Delete** and confirm the operation.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/account/managed-rulesets/deploy-dashboard/#page","headline":"Deploy a WAF managed ruleset in the dashboard for an account · Cloudflare Web Application Firewall (WAF) docs","description":"Deploy WAF managed rulesets at the account level in the dashboard.","url":"https://developers.cloudflare.com/waf/account/managed-rulesets/deploy-dashboard/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/account/","name":"Account-level WAF configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/account/managed-rulesets/","name":"Managed rulesets"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/account/managed-rulesets/deploy-dashboard/","name":"Deploy a WAF managed ruleset in the dashboard (account)"}}]}
```
