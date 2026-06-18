---
title: WAF custom rules configuration using Terraform
description: Create and deploy Cloudflare WAF custom rules at the zone or account level using Terraform.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/terraform/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# WAF custom rules configuration using Terraform

This page provides examples of creating [WAF custom rules](https://developers.cloudflare.com/waf/custom-rules/) in a zone or account using Terraform. The examples cover the following scenarios:

* [Add a custom rule to a zone](#add-a-custom-rule-to-a-zone)
* [Create and deploy a custom ruleset](#create-and-deploy-a-custom-ruleset)

The WAF documentation includes additional Terraform examples — refer to [More resources](#more-resources).

If you are using the Cloudflare API, refer to the following resources in the WAF documentation:

* [Create a custom rule via API](https://developers.cloudflare.com/waf/custom-rules/create-api/)
* [Create a custom ruleset using the API](https://developers.cloudflare.com/waf/account/custom-rulesets/create-api/)

For more information on deploying and configuring custom rulesets using the Rulesets API, refer to [Work with custom rulesets](https://developers.cloudflare.com/ruleset-engine/custom-rulesets/) in the Ruleset Engine documentation.

## Before you start

### Obtain the necessary account or zone IDs

The Terraform configurations provided in this page need the zone ID (or account ID) of the zone/account where you will deploy rulesets.

* To retrieve the list of accounts you have access to, including their IDs, use the [List accounts](https://developers.cloudflare.com/api/resources/accounts/methods/list/) operation.
* To retrieve the list of zones you have access to, including their IDs, use the [List zones](https://developers.cloudflare.com/api/resources/zones/methods/list/) operation.

### Import or delete existing rulesets

Terraform assumes that it has complete control over account and zone rulesets. If you already have rulesets configured in your account or zone, do one of the following:

* [Import existing rulesets to Terraform](https://developers.cloudflare.com/terraform/advanced-topics/import-cloudflare-resources/) using the `cf-terraforming` tool. Recent versions of the tool can generate resource definitions for existing rulesets and import their configuration to Terraform state.
* Start from scratch by [deleting existing rulesets](https://developers.cloudflare.com/ruleset-engine/rulesets-api/delete/#delete-ruleset) (account and zone rulesets with `"kind": "root"` and `"kind": "zone"`, respectively) and then defining your rulesets configuration in Terraform.

---

## Add a custom rule to a zone

The following example configures a custom rule in the zone entry point ruleset for the `http_request_firewall_custom` phase for zone with ID `<ZONE_ID>`. The rule will block all traffic on non-standard HTTP(S) ports:

* [ Terraform (v5) ](#tab-panel-10952)
* [ Terraform (v4) ](#tab-panel-10953)

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:

* `Zone WAF Write`

Configure the [cloudflare\_ruleset ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/ruleset) resource:

```

resource "cloudflare_ruleset" "zone_custom_firewall" {

  zone_id     = var.cloudflare_zone_id

  name        = "Phase entry point ruleset for custom rules in my zone"

  description = ""

  kind        = "zone"

  phase       = "http_request_firewall_custom"


  rules = [{

    ref         = "block_non_default_ports"

    description = "Block ports other than 80 and 443"

    expression  = "(not cf.edge.server_port in {80 443})"

    action      = "block"

  }]

}


```

```

resource "cloudflare_ruleset" "zone_custom_firewall" {

  zone_id     = "<ZONE_ID>"

  name        = "Phase entry point ruleset for custom rules in my zone"

  description = ""

  kind        = "zone"

  phase       = "http_request_firewall_custom"


  rules {

    ref         = "block_non_default_ports"

    description = "Block ports other than 80 and 443"

    expression  = "(not cf.edge.server_port in {80 443})"

    action      = "block"

  }

}


```

To create another custom rule, add a new `rules` object to the same `cloudflare_ruleset` resource.

  
## Create and deploy a custom ruleset

Note

All customers can create custom rulesets at the [zone level](https://developers.cloudflare.com/waf/custom-rules/custom-rulesets/).  
Custom rulesets at the [account level](https://developers.cloudflare.com/waf/account/custom-rulesets/) require an Enterprise plan with a paid add-on.

The following example creates a [custom ruleset](https://developers.cloudflare.com/ruleset-engine/custom-rulesets/) in the account with ID `<ACCOUNT_ID>` containing a single custom rule. This custom ruleset is then deployed using a separate `cloudflare_ruleset` Terraform resource. If you do not deploy a custom ruleset, it will not execute.

The following configuration creates a custom ruleset with a single rule:

* [ Terraform (v5) ](#tab-panel-10954)
* [ Terraform (v4) ](#tab-panel-10955)

Required API token permissions

All of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) are required:

* `Account WAF Write`
* `Account Rulesets Write`

Configure the [cloudflare\_ruleset ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/ruleset) resource:

```

resource "cloudflare_ruleset" "account_firewall_custom_ruleset" {

  account_id  = var.cloudflare_account_id

  name        = "Custom ruleset blocking traffic in non-standard HTTP(S) ports"

  description = ""

  kind        = "custom"

  phase       = "http_request_firewall_custom"


  rules = [{

    ref         = "block_non_default_ports"

    description = "Block ports other than 80 and 443"

    expression  = "(not cf.edge.server_port in {80 443})"

    action      = "block"

  }]

}


```

```

resource "cloudflare_ruleset" "account_firewall_custom_ruleset" {

  account_id  = "<ACCOUNT_ID>"

  name        = "Custom ruleset blocking traffic in non-standard HTTP(S) ports"

  description = ""

  kind        = "custom"

  phase       = "http_request_firewall_custom"


  rules {

    ref         = "block_non_default_ports"

    description = "Block ports other than 80 and 443"

    expression  = "(not cf.edge.server_port in {80 443})"

    action      = "block"

  }

}


```

To create another custom rule in the custom ruleset, add a new `rules` object to the same `cloudflare_ruleset` resource.

  
The following configuration deploys the custom ruleset at the account level. It defines a dependency on the `account_firewall_custom_ruleset` resource and uses the ID of the created custom ruleset in `action_parameters`:

* [ Terraform (v5) ](#tab-panel-10950)
* [ Terraform (v4) ](#tab-panel-10951)

Required API token permissions

All of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) are required:

* `Account WAF Write`
* `Account Rulesets Write`

Configure the [cloudflare\_ruleset ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/ruleset) resource:

```

resource "cloudflare_ruleset" "account_firewall_custom_entrypoint" {

  account_id  = var.cloudflare_account_id

  name        = "Account-level entry point ruleset for the http_request_firewall_custom phase deploying a custom ruleset"

  description = ""

  kind        = "root"

  phase       = "http_request_firewall_custom"


  depends_on = [cloudflare_ruleset.account_firewall_custom_ruleset]


  rules = [{

    ref         = "deploy_custom_ruleset_example_com"

    description = "Deploy custom ruleset for example.com"

    expression  = "(cf.zone.name eq \"example.com\") and (cf.zone.plan eq \"ENT\")"

    action      = "execute"

    action_parameters = {

      id = cloudflare_ruleset.account_firewall_custom_ruleset.id

    }

  }]

}


```

```

resource "cloudflare_ruleset" "account_firewall_custom_entrypoint" {

  account_id  = "<ACCOUNT_ID>"

  name        = "Account-level entry point ruleset for the http_request_firewall_custom phase deploying a custom ruleset"

  description = ""

  kind        = "root"

  phase       = "http_request_firewall_custom"


  depends_on = [cloudflare_ruleset.account_firewall_custom_ruleset]


  rules {

    ref         = "deploy_custom_ruleset_example_com"

    description = "Deploy custom ruleset for example.com"

    expression  = "(cf.zone.name eq \"example.com\") and (cf.zone.plan eq \"ENT\")"

    action      = "execute"

    action_parameters {

      id = cloudflare_ruleset.account_firewall_custom_ruleset.id

    }

  }

}


```

For more information on configuring and deploying custom rulesets, refer to [Work with custom rulesets](https://developers.cloudflare.com/ruleset-engine/custom-rulesets/) in the Ruleset Engine documentation.

## More resources

* [Malicious uploads detection: Add a custom rule to block malicious uploads](https://developers.cloudflare.com/waf/detections/malicious-uploads/terraform-examples/#add-a-custom-rule-to-block-malicious-uploads)
* [Leaked credentials detection: Add a custom rule to challenge requests with leaked credentials](https://developers.cloudflare.com/waf/detections/leaked-credentials/terraform-examples/#add-a-custom-rule-to-challenge-requests-with-leaked-credentials)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/terraform/additional-configurations/waf-custom-rules/#page","headline":"WAF custom rules configuration using Terraform · Cloudflare Terraform docs","description":"Create and deploy Cloudflare WAF custom rules at the zone or account level using Terraform.","url":"https://developers.cloudflare.com/terraform/additional-configurations/waf-custom-rules/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-29","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/terraform/","name":"Terraform"}},{"@type":"ListItem","position":3,"item":{"@id":"/terraform/additional-configurations/","name":"Additional configurations"}},{"@type":"ListItem","position":4,"item":{"@id":"/terraform/additional-configurations/waf-custom-rules/","name":"WAF custom rules configuration using Terraform"}}]}
```
