---
title: Deploy a WAF managed ruleset in the dashboard
description: Deploy WAF managed rulesets at the zone level in the dashboard.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Deploy a WAF managed ruleset in the dashboard

The instructions in this page provide general guidance for deploying and configuring a managed ruleset for a zone.

For more specific instructions, refer to the following pages:

* [Deploy the Cloudflare Managed Ruleset](https://developers.cloudflare.com/waf/managed-rules/reference/cloudflare-managed-ruleset/#deploy-in-the-dashboard)
* [Deploy the Cloudflare OWASP Core Ruleset](https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/configure-dashboard/#deploy-in-the-dashboard)
* [Deploy the Cloudflare Sensitive Data Detection ruleset](https://developers.cloudflare.com/waf/managed-rules/reference/sensitive-data-detection/#deploy-in-the-dashboard)

Tip

To deploy a managed ruleset for several Enterprise domains in your account, refer to [Deploy a WAF managed ruleset in the dashboard (account)](https://developers.cloudflare.com/waf/account/managed-rulesets/deploy-dashboard/).

## Deploy a managed ruleset

To deploy a managed ruleset for a zone:

* [  New dashboard ](#tab-panel-11216)
* [ Old dashboard ](#tab-panel-11217)

1. In the Cloudflare dashboard, go to the Security **Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. (Optional) Filter by **Web application exploits**.
3. Turn on the managed ruleset(s) you want to deploy:  
   * **Cloudflare managed ruleset** \- Deploys the [Cloudflare Managed Ruleset](https://developers.cloudflare.com/waf/managed-rules/reference/cloudflare-managed-ruleset/).  
   * **OWASP Core** \- Deploys the [Cloudflare OWASP Core Ruleset](https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/).  
   * **Sensitive data detection** \- Deploys the [Cloudflare Sensitive Data Detection](https://developers.cloudflare.com/waf/managed-rules/reference/sensitive-data-detection/) managed ruleset.
4. Review the deployment settings. Edit the scope, if necessary, to apply the ruleset to a subset of the incoming requests, or configure any custom settings (also known as overrides).
5. Select **Save**.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Security** \> **WAF** \> **Managed rules** tab.
3. Under **Managed Rulesets**, select **Deploy** next to a managed ruleset.  
![Example WAF Managed Rules configuration in the Managed rules tab under Security > WAF. There are two managed rulesets already deployed, and one managed ruleset available for deployment.](https://developers.cloudflare.com/_astro/waf-managed-rules-tab.CJ_mD1P3_Z1Q7yyY.webp)

This operation deploys the managed ruleset for the current zone, creating a new rule with the _Execute_ action.

To temporarily turn off a managed ruleset without deleting its deployment configuration, use the toggle next to the rule that deploys the managed ruleset.

## Configure a managed ruleset

Configure a managed ruleset to:

* Specify a custom filter expression to apply the rules in the ruleset to a subset of incoming requests.
* Configure (or override) specific settings for one or more rules (for example, configure a rule with an action different from the default action configured by Cloudflare), or turn off those rules.

To skip one or more rules — or even entire managed rulesets — for specific incoming requests, [add an exception](https://developers.cloudflare.com/waf/managed-rules/waf-exceptions/).

Note

Some managed rulesets may not allow custom configuration, depending on your Cloudflare plan.

### Configure all the rules in a managed ruleset

To configure (or override) settings for all the rules in a managed ruleset:

* [  New dashboard ](#tab-panel-11214)
* [ Old dashboard ](#tab-panel-11215)

1. In the Cloudflare dashboard, go to the **Security rules** page.  
[ Go to **Security rules** ](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. (Optional) Filter by **Managed rules**.
3. Search for the managed ruleset you want to configure. Look for a rule with an _Execute_ action.
4. Select the rule name (containing the name of the managed ruleset) to open the deployment configuration page.
5. (Optional) To execute the managed ruleset for a subset of incoming requests, select **Edit scope** and [configure the expression](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/edit-expressions/) that will determine the scope of the current rule deploying the managed ruleset.
6. In the ruleset configuration section, define settings for all the rules in the ruleset by setting one or more fields using the drop-down lists.  
For example, select the action to perform for all the rules in the ruleset.
7. Select **Save**.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Security** \> **WAF** \> **Managed rules** tab.
3. Next to the _Execute_ rule deploying the managed ruleset you want to configure, select the managed ruleset name.  
If you have not deployed the managed ruleset yet, select the managed ruleset name under **Managed Rulesets**.
4. (Optional) To execute the managed ruleset for a subset of incoming requests, select **Edit scope** and [configure the expression](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/edit-expressions/) that will determine the scope of the current rule deploying the managed ruleset.
5. Under **Ruleset configuration**, define settings for all the rules in the ruleset using the drop-down lists.  
For example, select the action to perform for all the rules in the ruleset.
6. If you have not deployed the managed ruleset yet:  
   * Select **Deploy** to deploy the ruleset immediately.  
   * Select **Save as Draft** to save your deployment settings for later.  
If you are editing a managed ruleset you already deployed, select **Save**.

### Configure rules of a managed ruleset with specific tags

To configure (or override) settings of rules tagged with specific tags:

* [  New dashboard ](#tab-panel-11222)
* [ Old dashboard ](#tab-panel-11223)

1. In the Cloudflare dashboard, go to the **Security rules** page.  
[ Go to **Security rules** ](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. (Optional) Filter by **Managed rules**.
3. Search for the managed ruleset you want to configure/browse. Look for a rule with an _Execute_ action.
4. Select the rule name (containing the name of the managed ruleset), and then select **Browse rules**.
1. Select one or more tags under the search input to filter the rules with those tags, and then select the checkbox in the top left corner of the table to select all the rules shown in the current page.  
If not all the rules are displayed in the current page, extend your selection to all rules with the selected tags across all pages by selecting **Select all <NUMBER> rules**.
2. Update one or more settings for the selected rules using the buttons displayed in the top right corner of the table (for example, **Set status**).
3. Select **Next**.
4. A dialog appears asking you if any new rules with the selected tags should be configured with the field values you selected.  
   * Select **Include new rules** if you want to apply your configurations to any new rules with the select tags.  
   * Select **Only selected rules** to apply your configurations to the selected rules only.
5. Select **Save**.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Security** \> **WAF** \> **Managed rules** tab.
3. If you have already deployed the managed ruleset you want to configure, select the ruleset name in the list of deployed managed rulesets. Alternatively, select the three dots > **Edit** next to the _Execute_ rule deploying the managed ruleset.  
If you have not deployed the managed ruleset, select the ruleset name under **Managed Rulesets**.
4. Select **Browse rules**.
1. Select one or more tags under the search input to filter the rules with those tags, and then select the checkbox in the top left corner of the table to select all the rules shown in the current page.  
If not all the rules are displayed in the current page, extend your selection to all rules with the selected tags across all pages by selecting **Select all <NUMBER> rules**.
2. Update one or more settings for the selected rules using the buttons displayed in the top right corner of the table (for example, **Set status**).
3. Select **Next**.
4. A dialog appears asking you if any new rules with the selected tags should be configured with the field values you selected.  
   * Select **Include new rules** if you want to apply your configurations to any new rules with the select tags.  
   * Select **Only selected rules** to apply your configurations to the selected rules only.
5. Select **Save**.

### Configure individual rules of a managed ruleset

To configure (or override) settings of individual rules of a managed ruleset:

* [  New dashboard ](#tab-panel-11220)
* [ Old dashboard ](#tab-panel-11221)

1. In the Cloudflare dashboard, go to the **Security rules** page.  
[ Go to **Security rules** ](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. (Optional) Filter by **Managed rules**.
3. Search for the managed ruleset you want to configure/browse. Look for a rule with an _Execute_ action.
4. Select the rule name (containing the name of the managed ruleset), and then select **Browse rules**.
1. Search for rules using the available filters.
2. In the results list, change the values for each rule as desired, using the displayed drop-down lists and toggles. For example, change the status of a rule using the **Status** toggle next to the rule.  
To configure multiple rules with the same value, select the checkboxes for all the rules you want to configure. If not all the rules are displayed in the current page, you can extend your selection to all rules across all pages by selecting **Select all <NUMBER> rules**. Then, use the buttons displayed in the top right corner of the table — for example, **Set status** — to update one or more fields for the selected rules.
3. Select **Next**, and then select **Save**.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Security** \> **WAF** \> **Managed rules** tab.
3. If you have already deployed the managed ruleset you want to configure, select the ruleset name in the list of deployed managed rulesets. Alternatively, select the three dots > **Edit** next to the _Execute_ rule deploying the managed ruleset.  
If you have not deployed the managed ruleset, select the ruleset name under **Managed Rulesets**.
4. Select **Browse rules**.
1. Search for rules using the available filters.
2. In the results list, change the values for each rule as desired, using the displayed drop-down lists and toggles. For example, change the status of a rule using the **Status** toggle next to the rule.  
To configure multiple rules with the same value, select the checkboxes for all the rules you want to configure. If not all the rules are displayed in the current page, you can extend your selection to all rules across all pages by selecting **Select all <NUMBER> rules**. Then, use the buttons displayed in the top right corner of the table — for example, **Set status** — to update one or more fields for the selected rules.
3. Select **Next**, and then select **Save**.

### Browse the rules of a managed ruleset

You can browse the available rules in a managed ruleset and search for individual rules or tags.

* [  New dashboard ](#tab-panel-11218)
* [ Old dashboard ](#tab-panel-11219)

1. In the Cloudflare dashboard, go to the Security **Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. (Optional) Filter by **Web application exploits**.
3. Find the managed ruleset you want to browse, and select **View ruleset**.
4. Review the rules and their tags in the side panel.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Security** \> **WAF** \> **Managed rules** tab.
3. If you have already deployed the managed ruleset you want to configure, select the ruleset name in the list of deployed managed rulesets. Alternatively, select the three dots > **Edit** next to the _Execute_ rule deploying the managed ruleset.  
If you have not deployed the managed ruleset, select the ruleset name under **Managed Rulesets**.
4. Select **Browse rules**.

### Delete a managed ruleset deployment rule or an exception

* [  New dashboard ](#tab-panel-11212)
* [ Old dashboard ](#tab-panel-11213)

1. In the Cloudflare dashboard, go to the **Security rules** page.  
[ Go to **Security rules** ](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. (Optional) Filter by **Managed rules**.
3. Search for the managed ruleset you want to configure.
4. Next to the managed ruleset deployment rule (execute rule) or exception (skip rule) you want to delete, select the three dots > **Delete** and confirm the operation.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and select your account and domain.
2. Go to **Security** \> **WAF** \> **Managed rules** tab.
3. Next to the rule or exception (skip rule) you want to delete, select the three dots > **Delete** and confirm the operation.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/managed-rules/deploy-zone-dashboard/#page","headline":"Deploy a WAF managed ruleset in the dashboard · Cloudflare Web Application Firewall (WAF) docs","description":"Deploy WAF managed rulesets at the zone level in the dashboard.","url":"https://developers.cloudflare.com/waf/managed-rules/deploy-zone-dashboard/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/managed-rules/","name":"Managed Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/managed-rules/deploy-zone-dashboard/","name":"Deploy a WAF managed ruleset in the dashboard"}}]}
```
