---
title: Cloudflare Managed Ruleset
description: Rules and categories in the Cloudflare Managed Ruleset.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cloudflare Managed Ruleset

Created by the Cloudflare security team, this ruleset provides fast and effective protection for all of your applications. The ruleset is updated frequently to cover new vulnerabilities and reduce false positives.

Cloudflare recommends that you enable the rules whose tags correspond to your technology stack. For example, if you use WordPress, enable the rules tagged with `wordpress`.

Cloudflare's [WAF changelog](https://developers.cloudflare.com/waf/change-log/) allows you to monitor ongoing changes to the WAF's managed rulesets.

Note

Some rules in the Cloudflare Managed Ruleset are disabled by default, intending to strike a balance between providing the right protection and reducing the number of false positives.

It is not recommended that you enable all the available rules using overrides, since it may affect legitimate traffic, unless you are running a proof of concept (PoC) to understand what kind of requests the WAF can block.

## Deploy the Cloudflare Managed Ruleset

* [  New dashboard ](#tab-panel-11230)
* [ Old dashboard ](#tab-panel-11231)

1. In the Cloudflare dashboard, go to the Security **Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. (Optional) Filter by **Web application exploits**.
3. Turn on **Cloudflare managed ruleset**.
4. Review the deployment settings. Edit the scope, if necessary, to apply the ruleset to a subset of the incoming requests, or configure any custom settings (also known as overrides).
5. Select **Save**.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Security** \> **WAF** \> **Managed rules** tab.
3. Under **Managed Rulesets**, select **Deploy** next to **Cloudflare Managed Ruleset**.

This operation deploys the managed ruleset for the current zone, creating a new rule with the _Execute_ action.

## Configure in the dashboard

You can configure (or override) the Cloudflare Managed Ruleset, overriding its default configuration, at several levels:

* [Ruleset level](#ruleset-level-configuration)
* [Tag level](#tag-level-configuration)
* [Rule level](#rule-level-configuration)

When you create several overrides at different levels, more specific configurations (tag and rule level) have priority over less specific configurations (ruleset level). Refer to [Override a managed ruleset](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/override-managed-ruleset/) in the Ruleset Engine documentation for more information.

### Ruleset-level configuration

You can configure (or override) the following Cloudflare Managed Ruleset settings in the Cloudflare dashboard:

* **Scope**: When you define a custom filter expression for the scope, the Cloudflare Managed Ruleset applies only to a subset of the incoming requests. By default, a managed ruleset deployed in the dashboard applies to all incoming traffic.
* **Ruleset action**: When you define an action for the ruleset, you override the default action defined for each rule. The available actions are: _Block_, _Log_, _Non-Interactive Challenge_, _Managed Challenge_, and _Interactive Challenge_. To remove the action override at the ruleset level, set the ruleset action to _Default_.
* **Ruleset status**: Enables or disables all the rules in the ruleset.  
Note  
When you enable all the rules in the ruleset, you will affect rules that are disabled by default and all the rules that are added to the managed ruleset in the future.
* **[Payload logging](https://developers.cloudflare.com/waf/managed-rules/payload-logging/configure/)**: When enabled, logs the request information (payload) that triggered a specific rule of the managed ruleset. You must configure a public key to encrypt the payload.

Once you have [deployed the Cloudflare Managed Ruleset](#deploy-in-the-dashboard), do the following to configure it in the dashboard:

* [  New dashboard ](#tab-panel-11232)
* [ Old dashboard ](#tab-panel-11233)

1. In the Cloudflare dashboard, go to the **Security rules** page.  
[ Go to **Security rules** ](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. (Optional) Filter by **Managed rules**.
3. Search for **Cloudflare Managed Ruleset**. Look for a rule with an _Execute_ action.
4. Select the rule name (containing the name of the managed ruleset) to open the deployment configuration page.
5. (Optional) To execute the Cloudflare Managed Ruleset for a subset of incoming requests, select **Edit scope** and [configure the expression](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/edit-expressions/) that will determine the scope of the current rule deploying the managed ruleset.
6. In the ruleset configuration section, define settings for all the rules in the Cloudflare Managed Ruleset by setting one or more fields using the drop-down lists.  
For example, select the action to perform for all the rules in the ruleset.  
![The Configure deployment page displaying the available options to override all the rules in the Cloudflare Managed Ruleset: ruleset action and ruleset status.](https://developers.cloudflare.com/_astro/ruleset-config-cloudflare-managed-ruleset.DHYvPCho_eoe68.webp)
7. Select **Save**.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Security** \> **WAF** \> **Managed rules** tab.
3. Next to the _Execute_ rule deploying the Cloudflare Managed Ruleset, select the managed ruleset name.  
If you have not deployed the managed ruleset yet, select **Cloudflare Managed Ruleset** under **Managed Rulesets**.
4. (Optional) To execute the Cloudflare Managed Ruleset for a subset of incoming requests, select **Edit scope** and [configure the expression](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/edit-expressions/) that will determine the scope of the current rule deploying the managed ruleset.
5. Under **Ruleset configuration**, define settings for all the rules in the Cloudflare Managed Ruleset using the drop-down lists.  
For example, select the action to perform for all the rules in the ruleset.  
![The Configure deployment page displaying the available options to override all the rules in the Cloudflare Managed Ruleset: ruleset action and ruleset status.](https://developers.cloudflare.com/_astro/ruleset-config-cloudflare-managed-ruleset.DHYvPCho_eoe68.webp)
6. If you have not deployed the Cloudflare Managed Ruleset yet:  
   * Select **Deploy** to deploy the ruleset immediately.  
   * Select **Save as Draft** to save your deployment settings for later.  
If you are editing a managed ruleset you already deployed, select **Save**.

### Tag-level configuration

You can configure (or override) the following Cloudflare Managed Ruleset settings in the dashboard for rules tagged with at least one of the selected tags:

* **Rule action**: Sets the rule action for all the rules with the selected tags. The available actions are: _Block_, _Log_, _Non-Interactive Challenge_, _Managed Challenge_, and _Interactive Challenge_.
* **Rule status**: Sets the rule status for all the rules with the selected tags.

Note

Setting any of these configurations for specific tags affects all current and future rules with the tags you selected.

Once you have [deployed the Cloudflare Managed Ruleset](#deploy-in-the-dashboard), do the following to configure rules with specific tags in the dashboard:

* [  New dashboard ](#tab-panel-11236)
* [ Old dashboard ](#tab-panel-11237)

1. In the Cloudflare dashboard, go to the **Security rules** page.  
[ Go to **Security rules** ](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. (Optional) Filter by **Managed rules**.
3. Search for **Cloudflare Managed Ruleset**. Look for a rule with an _Execute_ action.
4. Select the rule name (containing the name of the managed ruleset), and then select **Browse rules**.  
![The Cloudflare dashboard displaying the list of rules in the Cloudflare Managed Ruleset.](https://developers.cloudflare.com/_astro/rules-config-cloudflare-managed-ruleset.B2sNvTdY_ZKKGTd.webp)
1. Select one or more tags under the search input to filter the rules with those tags, and then select the checkbox in the top left corner of the table to select all the rules shown in the current page.  
If not all the rules are displayed in the current page, extend your selection to all rules with the selected tags across all pages by selecting **Select all <NUMBER> rules**.  
![The Configure deployment page displaying selected rules with the 'sqli' tag in the Cloudflare Managed Ruleset.](https://developers.cloudflare.com/_astro/tags-config-cloudflare-managed-ruleset.Db5oHcxi_Z1HEcr9.webp)
2. Update one or more settings for the selected rules using the buttons displayed in the top right corner of the table (for example, **Set status**).
3. Select **Next**.
4. A dialog appears asking you if any new rules with the selected tags should be configured with the field values you selected.  
   * Select **Include new rules** if you want to apply your configurations to any new rules with the select tags.  
   * Select **Only selected rules** to apply your configurations to the selected rules only.
5. Select **Save**.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Security** \> **WAF** \> **Managed rules** tab.
3. If you have already deployed the Cloudflare Managed Ruleset, select the ruleset name in the list of deployed managed rulesets. Alternatively, select the three dots > **Edit** next to the _Execute_ rule deploying the Cloudflare Managed Ruleset.  
If you have not deployed the managed ruleset, select **Cloudflare Managed Ruleset** under **Managed Rulesets**.
4. Select **Browse rules**.  
![The Configure deployment page displaying the rules in the Cloudflare Managed Ruleset.](https://developers.cloudflare.com/_astro/rules-config-cloudflare-managed-ruleset.B2sNvTdY_ZKKGTd.webp)
1. Select one or more tags under the search input to filter the rules with those tags, and then select the checkbox in the top left corner of the table to select all the rules shown in the current page.  
If not all the rules are displayed in the current page, extend your selection to all rules with the selected tags across all pages by selecting **Select all <NUMBER> rules**.  
![The Configure deployment page displaying selected rules with the 'sqli' tag in the Cloudflare Managed Ruleset.](https://developers.cloudflare.com/_astro/tags-config-cloudflare-managed-ruleset.Db5oHcxi_Z1HEcr9.webp)
2. Update one or more settings for the selected rules using the buttons displayed in the top right corner of the table (for example, **Set status**).
3. Select **Next**.
4. A dialog appears asking you if any new rules with the selected tags should be configured with the field values you selected.  
   * Select **Include new rules** if you want to apply your configurations to any new rules with the select tags.  
   * Select **Only selected rules** to apply your configurations to the selected rules only.
5. Select **Save**.

### Rule-level configuration

You can configure (or override) the following Cloudflare Managed Ruleset settings in the dashboard for the selected rules:

* **Rule action**: Sets the action of a single rule or, if you select multiple rules, for the selected rules. The available actions are: _Block_, _Log_, _Non-Interactive Challenge_, _Managed Challenge_, and _Interactive Challenge_. Once you have changed the configuration of a rule, you have the option to reset the configuration back to the default one as defined in the Cloudflare Managed Ruleset.
* **Rule status**: Sets the status (enabled or disabled) of a single rule or, if you select multiple rules, for the selected rules.

Once you have [deployed the Cloudflare Managed Ruleset](#deploy-in-the-dashboard), do the following to configure individual ruleset rules in the dashboard:

* [  New dashboard ](#tab-panel-11234)
* [ Old dashboard ](#tab-panel-11235)

1. In the Cloudflare dashboard, go to the **Security rules** page.  
[ Go to **Security rules** ](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. (Optional) Filter by **Managed rules**.
3. Search for **Cloudflare Managed Ruleset**. Look for a rule with an _Execute_ action.
4. Select the rule name (containing the name of the managed ruleset), and then select **Browse rules**.  
![The Cloudflare dashboard displaying the list of rules in the Cloudflare Managed Ruleset.](https://developers.cloudflare.com/_astro/rules-config-cloudflare-managed-ruleset.B2sNvTdY_ZKKGTd.webp)
1. Search for rules using the available filters.
2. In the results list, change the values for each rule as desired, using the displayed drop-down lists and toggles. For example, change the status of a rule using the **Status** toggle next to the rule.  
To configure multiple rules with the same value, select the checkboxes for all the rules you want to configure. If not all the rules are displayed in the current page, you can extend your selection to all rules across all pages by selecting **Select all <NUMBER> rules**. Then, use the buttons displayed in the top right corner of the table — for example, **Set status** — to update one or more fields for the selected rules.  
![The Configure deployment page displaying selected rules in the Cloudflare Managed Ruleset.](https://developers.cloudflare.com/_astro/tags-config-cloudflare-managed-ruleset.Db5oHcxi_Z1HEcr9.webp)
3. Select **Next**, and then select **Save**.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Security** \> **WAF** \> **Managed rules** tab.
3. If you have already deployed the Cloudflare Managed Ruleset, select the ruleset name in the list of deployed managed rulesets. Alternatively, select the three dots > **Edit** next to the _Execute_ rule deploying the Cloudflare Managed Ruleset.  
If you have not deployed the managed ruleset, select **Cloudflare Managed Ruleset** under **Managed Rulesets**.
4. Select **Browse rules**.  
![The Configure deployment page displaying the rules in the Cloudflare Managed Ruleset.](https://developers.cloudflare.com/_astro/rules-config-cloudflare-managed-ruleset.B2sNvTdY_ZKKGTd.webp)
1. Search for rules using the available filters.
2. In the results list, change the values for each rule as desired, using the displayed drop-down lists and toggles. For example, change the status of a rule using the **Status** toggle next to the rule.  
To configure multiple rules with the same value, select the checkboxes for all the rules you want to configure. If not all the rules are displayed in the current page, you can extend your selection to all rules across all pages by selecting **Select all <NUMBER> rules**. Then, use the buttons displayed in the top right corner of the table — for example, **Set status** — to update one or more fields for the selected rules.  
![The Configure deployment page displaying selected rules in the Cloudflare Managed Ruleset.](https://developers.cloudflare.com/_astro/tags-config-cloudflare-managed-ruleset.Db5oHcxi_Z1HEcr9.webp)
3. Select **Next**, and then select **Save**.

## Configure via API

To deploy the Cloudflare Managed Ruleset for a given zone via API, create a rule with `execute` action in the [entry point ruleset](https://developers.cloudflare.com/ruleset-engine/about/rulesets/#entry-point-ruleset) for the `http_request_firewall_managed` phase.

### Example

The following example deploys the [Cloudflare Managed Ruleset](https://developers.cloudflare.com/waf/managed-rules/reference/cloudflare-managed-ruleset/) to the `http_request_firewall_managed` phase of a given zone (`$ZONE_ID`) by creating a rule that executes the managed ruleset.

1. Invoke the [Get a zone entry point ruleset](https://developers.cloudflare.com/api/resources/rulesets/subresources/phases/methods/get/) operation to obtain the definition of the entry point ruleset for the `http_request_firewall_managed` phase. You will need the [zone ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) for this task.  
Get a zone entry point ruleset  
```  
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/phases/http_request_firewall_managed/entrypoint" \  
  --request GET \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  
```  
```  
{  
  "result": {  
    "description": "Zone-level phase entry point",  
    "id": "<RULESET_ID>",  
    "kind": "zone",  
    "last_updated": "2024-03-16T15:40:08.202335Z",  
    "name": "zone",  
    "phase": "http_request_firewall_managed",  
    "rules": [  
      // ...  
    ],  
    "source": "firewall_managed",  
    "version": "10"  
  },  
  "success": true,  
  "errors": [],  
  "messages": []  
}  
```
2. If the entry point ruleset already exists (that is, if you received a `200 OK` status code and the ruleset definition), take note of the ruleset ID in the response. Then, invoke the [Create a zone ruleset rule](https://developers.cloudflare.com/api/resources/rulesets/subresources/rules/methods/create/) operation to add an `execute` rule to the existing ruleset deploying the Cloudflare Managed Ruleset (with ID `efb7b8c949ac4650a09736fc376e9aee`). By default, the rule will be added at the end of the list of rules already in the ruleset.  
Create a zone ruleset rule  
```  
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/$RULESET_ID/rules" \  
  --request POST \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  
  --json '{  
    "action": "execute",  
    "action_parameters": {  
        "id": "efb7b8c949ac4650a09736fc376e9aee"  
    },  
    "expression": "true",  
    "description": "Execute the Cloudflare Managed Ruleset"  
  }'  
```  
```  
{  
  "result": {  
    "id": "<RULESET_ID>",  
    "name": "Zone-level phase entry point",  
    "description": "",  
    "kind": "zone",  
    "version": "11",  
    "rules": [  
      // ... any existing rules  
      {  
        "id": "<RULE_ID>",  
        "version": "1",  
        "action": "execute",  
        "action_parameters": {  
          "id": "efb7b8c949ac4650a09736fc376e9aee",  
          "version": "latest"  
        },  
        "expression": "true",  
        "description": "Execute the Cloudflare Managed Ruleset",  
        "last_updated": "2024-03-18T18:08:14.003361Z",  
        "ref": "<RULE_REF>",  
        "enabled": true  
      }  
    ],  
    "last_updated": "2024-03-18T18:08:14.003361Z",  
    "phase": "http_request_firewall_managed"  
  },  
  "success": true,  
  "errors": [],  
  "messages": []  
}  
```
3. If the entry point ruleset does not exist (that is, if you received a `404 Not Found` status code in step 1), create it using the [Create a zone ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/create/) operation. Include a single rule in the `rules` array that executes the Cloudflare Managed Ruleset (with ID `efb7b8c949ac4650a09736fc376e9aee`) for all incoming requests in the zone.  
Create a zone ruleset  
```  
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets" \  
  --request POST \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  
  --json '{  
    "name": "My ruleset",  
    "description": "Entry point ruleset for WAF managed rulesets",  
    "kind": "zone",  
    "phase": "http_request_firewall_managed",  
    "rules": [  
        {  
            "action": "execute",  
            "action_parameters": {  
                "id": "efb7b8c949ac4650a09736fc376e9aee"  
            },  
            "expression": "true",  
            "description": "Execute the Cloudflare Managed Ruleset"  
        }  
    ]  
  }'  
```

### Next steps

To configure the Cloudflare Managed Ruleset via API, create [overrides](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/override-managed-ruleset/) using the Rulesets API. You can perform the following configurations:

* Specify the action to perform for all the rules in the ruleset by creating a ruleset override.
* Disable or customize the action of individual rules by creating rule overrides.

For examples of creating overrides using the API, refer to [Override a managed ruleset](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/override-managed-ruleset/).

### More resources

For more information on working with managed rulesets via API, refer to [Work with managed rulesets](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/) in the Ruleset Engine documentation.

## Configure using Terraform

The following example deploys the Cloudflare Managed Ruleset for a zone and overrides the action and status of a specific rule.

* [ Terraform (v5) ](#tab-panel-11228)
* [ Terraform (v4) ](#tab-panel-11229)

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:

* `Zone WAF Write`

Configure the [cloudflare\_ruleset ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/ruleset) resource:

```

# Configure a ruleset at the zone level for the "http_request_firewall_managed" phase

resource "cloudflare_ruleset" "zone_level_managed_waf" {

  zone_id     = var.cloudflare_zone_id

  name        = "Managed WAF entry point ruleset"

  description = "Zone-level WAF Managed Rules config"

  kind        = "zone"

  phase       = "http_request_firewall_managed"


  # Execute Cloudflare Managed Ruleset

  rules = [{

    ref         = "execute_cloudflare_managed_ruleset"

    description = "Execute Cloudflare Managed Ruleset on my zone-level phase entry point ruleset"

    expression  = "true"

    action      = "execute"

    action_parameters = {

      id = "efb7b8c949ac4650a09736fc376e9aee"

      overrides = {

        rules = [{

          id      = "5de7edfa648c4d6891dc3e7f84534ffa"

          action  = "log"

          enabled = true

        }]

      }

    }

  }]

}


```

```

# Configure a ruleset at the zone level for the "http_request_firewall_managed" phase

resource "cloudflare_ruleset" "zone_level_managed_waf" {

  zone_id     = var.cloudflare_zone_id

  name        = "Managed WAF entry point ruleset"

  description = "Zone-level WAF Managed Rules config"

  kind        = "zone"

  phase       = "http_request_firewall_managed"


  # Execute Cloudflare Managed Ruleset

  rules {

    ref         = "execute_cloudflare_managed_ruleset"

    description = "Execute Cloudflare Managed Ruleset on my zone-level phase entry point ruleset"

    expression  = "true"

    action      = "execute"

    action_parameters {

      id = "efb7b8c949ac4650a09736fc376e9aee"

      overrides {

        rules {

          id      = "5de7edfa648c4d6891dc3e7f84534ffa"

          action  = "log"

          enabled = true

        }

      }

    }

  }

}


```

For more information, refer to [WAF Managed Rules configuration using Terraform](https://developers.cloudflare.com/terraform/additional-configurations/waf-managed-rulesets/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/managed-rules/reference/cloudflare-managed-ruleset/#page","headline":"Cloudflare Managed Ruleset · Cloudflare Web Application Firewall (WAF) docs","description":"Rules and categories in the Cloudflare Managed Ruleset.","url":"https://developers.cloudflare.com/waf/managed-rules/reference/cloudflare-managed-ruleset/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/managed-rules/","name":"Managed Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/managed-rules/reference/","name":"Rulesets reference"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/managed-rules/reference/cloudflare-managed-ruleset/","name":"Cloudflare Managed Ruleset"}}]}
```
