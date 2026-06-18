---
title: WAF Managed Rules configuration using Terraform
description: Deploy and configure Cloudflare WAF Managed Rules at the zone or account level using Terraform.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/terraform/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# WAF Managed Rules configuration using Terraform

This page provides examples of deploying and configuring [WAF Managed Rules](https://developers.cloudflare.com/waf/managed-rules/) in your zone or account using Terraform. It covers the following configurations:

* [Deploy managed rulesets at the zone level](#deploy-managed-rulesets-at-the-zone-level)
* [Deploy managed rulesets at the account level](#deploy-managed-rulesets-at-the-account-level)
* [Configure exceptions](#configure-exceptions)
* [Configure payload logging](#configure-payload-logging)
* [Configure overrides](#configure-overrides)
* [Configure the OWASP paranoia level, score threshold, and action](#configure-the-owasp-paranoia-level-score-threshold-and-action)

If you are using the Cloudflare API, refer to the following resources:

* [Deploy a WAF managed ruleset via API](https://developers.cloudflare.com/waf/managed-rules/deploy-api/)
* [Deploy a WAF managed ruleset via API (account)](https://developers.cloudflare.com/waf/account/managed-rulesets/deploy-api/)

For more information on deploying and configuring managed rulesets using the Rulesets API, refer to [Work with managed rulesets](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/) in the Ruleset Engine documentation.

## Before you start

### Obtain the necessary account, zone, and managed ruleset IDs

The Terraform configurations provided in this page need the zone ID (or account ID) of the zone/account where you will deploy the managed rulesets.

* To retrieve the list of accounts you have access to, including their IDs, use the [List accounts](https://developers.cloudflare.com/api/resources/accounts/methods/list/) operation.
* To retrieve the list of zones you have access to, including their IDs, use the [List zones](https://developers.cloudflare.com/api/resources/zones/methods/list/) operation.

The deployment of managed rulesets via Terraform requires that you use the ruleset IDs. To find the IDs of managed rulesets, use the [List account rulesets](https://developers.cloudflare.com/api/resources/rulesets/methods/list/) operation. The response will include the description and IDs of existing managed rulesets.

The IDs of WAF managed rulesets are also available in the [WAF Managed Rules](https://developers.cloudflare.com/waf/managed-rules/#available-managed-rulesets) page.

### Import or delete existing rulesets

Terraform assumes that it has complete control over account and zone rulesets. If you already have rulesets configured in your account or zone, do one of the following:

* [Import existing rulesets to Terraform](https://developers.cloudflare.com/terraform/advanced-topics/import-cloudflare-resources/) using the `cf-terraforming` tool. Recent versions of the tool can generate resource definitions for existing rulesets and import their configuration to Terraform state.
* Start from scratch by [deleting existing rulesets](https://developers.cloudflare.com/ruleset-engine/rulesets-api/delete/#delete-ruleset) (account and zone rulesets with `"kind": "root"` and `"kind": "zone"`, respectively) and then defining your rulesets configuration in Terraform.

---

## Deploy managed rulesets at the zone level

The following example deploys two managed rulesets to the zone with ID `<ZONE_ID>` using Terraform, using a `cloudflare_ruleset` resource with two rules that execute the managed rulesets.

* [ Terraform (v5) ](#tab-panel-10964)
* [ Terraform (v4) ](#tab-panel-10965)

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


  rules = [

    {

      # Execute Cloudflare Managed Ruleset

      ref         = "execute_cloudflare_managed_ruleset"

      description = "Execute Cloudflare Managed Ruleset on my zone-level phase entry point ruleset"

      expression  = "true"

      action      = "execute"

      action_parameters = {

        id = "efb7b8c949ac4650a09736fc376e9aee"

      }

    },

    {

      # Execute Cloudflare OWASP Core Ruleset

      ref         = "execute_cloudflare_owasp_core_ruleset"

      description = "Execute Cloudflare OWASP Core Ruleset on my zone-level phase entry point ruleset"

      expression  = "true"

      action      = "execute"

      action_parameters = {

        id = "4814384a9e5d4991b9815dcfc25d2f1f"

      }

    },

  ]

}


```

```

# Configure a ruleset at the zone level for the "http_request_firewall_managed" phase

resource "cloudflare_ruleset" "zone_level_managed_waf" {

  zone_id     = "<ZONE_ID>"

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

    }

  }


  # Execute Cloudflare OWASP Core Ruleset

  rules {

    ref         = "execute_cloudflare_owasp_core_ruleset"

    description = "Execute Cloudflare OWASP Core Ruleset on my zone-level phase entry point ruleset"

    expression  = "true"

    action      = "execute"

    action_parameters {

      id = "4814384a9e5d4991b9815dcfc25d2f1f"

    }

  }

}


```

## Deploy managed rulesets at the account level

Notes

* [Account-level WAF configuration](https://developers.cloudflare.com/waf/account/) requires an Enterprise plan with a paid add-on.
* Managed rulesets deployed at the account level will only apply to incoming traffic of zones on an Enterprise plan. The expression of your `execute` rule must end with `and cf.zone.plan eq "ENT"`.

The following example deploys two managed rulesets to the account with ID `<ACCOUNT_ID>` using Terraform, using a `cloudflare_ruleset` resource with two rules that execute the managed rulesets for two hostnames belonging to Enterprise zones.

* [ Terraform (v5) ](#tab-panel-10966)
* [ Terraform (v4) ](#tab-panel-10967)

Required API token permissions

All of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) are required:

* `Account WAF Write`
* `Account Rulesets Write`

Configure the [cloudflare\_ruleset ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/ruleset) resource:

```

resource "cloudflare_ruleset" "account_level_managed_waf" {

  account_id  = var.cloudflare_account_id

  name        = "Managed WAF entry point ruleset"

  description = "Account-level WAF Managed Rules config"

  kind        = "root"

  phase       = "http_request_firewall_managed"


  rules = [

    {

      # Execute Cloudflare Managed Ruleset

      ref         = "execute_cloudflare_managed_ruleset_api_store"

      description = "Execute Cloudflare Managed Ruleset on my account-level phase entry point ruleset"

      expression  = "http.host in {\"api.example.com\" \"store.example.com\"} and cf.zone.plan eq \"ENT\""

      action      = "execute"

      action_parameters = {

        id = "efb7b8c949ac4650a09736fc376e9aee"

      }

    },

    {

      # Execute Cloudflare OWASP Core Ruleset

      ref         = "execute_owasp_core_ruleset_api_store"

      description = "Execute Cloudflare OWASP Core Ruleset on my account-level phase entry point ruleset"

      expression  = "http.host in {\"api.example.com\" \"store.example.com\"} and cf.zone.plan eq \"ENT\""

      action      = "execute"

      action_parameters = {

        id = "4814384a9e5d4991b9815dcfc25d2f1f"

      }

    },

  ]

}


```

```

resource "cloudflare_ruleset" "account_level_managed_waf" {

  account_id  = "<ACCOUNT_ID>"

  name        = "Managed WAF entry point ruleset"

  description = "Account-level WAF Managed Rules config"

  kind        = "root"

  phase       = "http_request_firewall_managed"


  # Execute Cloudflare Managed Ruleset

  rules {

    ref         = "execute_cloudflare_managed_ruleset_api_store"

    description = "Execute Cloudflare Managed Ruleset on my account-level phase entry point ruleset"

    expression  = "http.host in {\"api.example.com\" \"store.example.com\"} and cf.zone.plan eq \"ENT\""

    action      = "execute"

    action_parameters {

      id = "efb7b8c949ac4650a09736fc376e9aee"

    }

  }


  # Execute Cloudflare OWASP Core Ruleset

  rules {

    ref         = "execute_owasp_core_ruleset_api_store"

    description = "Execute Cloudflare OWASP Core Ruleset on my account-level phase entry point ruleset"

    expression  = "http.host in {\"api.example.com\" \"store.example.com\"} and cf.zone.plan eq \"ENT\""

    action      = "execute"

    action_parameters {

      id = "4814384a9e5d4991b9815dcfc25d2f1f"

    }

  }

}


```

## Configure exceptions

The following example adds two [exceptions](https://developers.cloudflare.com/waf/managed-rules/waf-exceptions/) for the Cloudflare Managed Ruleset:

* The first rule will skip the execution of the entire Cloudflare Managed Ruleset (with ID ...376e9aee ) for specific URLs, according to the rule expression.
* The second rule will skip the execution of two rules belonging to the Cloudflare Managed Ruleset for specific URLs, according to the rule expression.

Add the two exceptions to the `cloudflare_ruleset` resource before the rule that deploys the Cloudflare Managed Ruleset:

* [ Terraform (v5) ](#tab-panel-10956)
* [ Terraform (v4) ](#tab-panel-10957)

```

resource "cloudflare_ruleset" "zone_level_managed_waf" {

  # (...)


  rules = [

    {

      # Skip execution of the entire Cloudflare Managed Ruleset for specific URLs

      ref         = "skip_cloudflare_managed_ruleset_example_com"

      description = "Skip Cloudflare Managed Ruleset"

      expression  = "(http.request.uri.path eq \"/status\" and http.request.uri.query contains \"skip=rulesets\")"

      action      = "skip"

      action_parameters = {

        rulesets = ["efb7b8c949ac4650a09736fc376e9aee"]

      }

    },

    {

      # Skip execution of two rules in the Cloudflare Managed Ruleset for specific URLs

      ref         = "skip_wordpress_sqli_rules_example_com"

      description = "Skip WordPress and SQLi rules"

      expression  = "(http.request.uri.path eq \"/status\" and http.request.uri.query contains \"skip=rules\")"

      action      = "skip"

      action_parameters = {

        rules = {

          # Format: "<RULESET_ID>" = ["<RULE_ID_1>", "<RULE_ID_2>"]

          "efb7b8c949ac4650a09736fc376e9aee" = ["5de7edfa648c4d6891dc3e7f84534ffa", "e3a567afc347477d9702d9047e97d760"]

        }

      }

    },

    {

      # Execute Cloudflare Managed Ruleset

      ref         = "execute_cloudflare_managed_ruleset"

      description = "Execute Cloudflare Managed Ruleset on my zone-level phase entry point ruleset"

      expression  = "true"

      action      = "execute"

      action_parameters = {

        id = "efb7b8c949ac4650a09736fc376e9aee"

      }

    },

    # (...)

  ]

}


```

```

resource "cloudflare_ruleset" "zone_level_managed_waf" {

  # (...)


  # Skip execution of the entire Cloudflare Managed Ruleset for specific URLs

  rules {

    ref         = "skip_cloudflare_managed_ruleset_example_com"

    description = "Skip Cloudflare Managed Ruleset"

    expression  = "(http.request.uri.path eq \"/status\" and http.request.uri.query contains \"skip=rulesets\")"

    action      = "skip"

    action_parameters {

      rulesets = ["efb7b8c949ac4650a09736fc376e9aee"]

    }

  }


  # Skip execution of two rules in the Cloudflare Managed Ruleset for specific URLs

  rules {

    ref         = "skip_wordpress_sqli_rules_example_com"

    description = "Skip WordPress and SQLi rules"

    expression  = "(http.request.uri.path eq \"/status\" and http.request.uri.query contains \"skip=rules\")"

    action      = "skip"

    action_parameters {

      rules = {

        # Format: "<RULESET_ID>" = "<RULE_ID_1>,<RULE_ID_2>,..."

        "efb7b8c949ac4650a09736fc376e9aee" = "5de7edfa648c4d6891dc3e7f84534ffa,e3a567afc347477d9702d9047e97d760"

      }

    }

  }


  # Execute Cloudflare Managed Ruleset

  rules {

    ref         = "execute_cloudflare_managed_ruleset"

    description = "Execute Cloudflare Managed Ruleset on my zone-level phase entry point ruleset"

    expression  = "true"

    action      = "execute"

    action_parameters {

      id = "efb7b8c949ac4650a09736fc376e9aee"

    }

  }


  # (...)

}


```

Important

Ensure that you place the exceptions **before** the rule that executes the managed ruleset (or some of its rules) that you wish to skip, as in the previous example.

## Configure overrides

The following example adds three [overrides](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/override-managed-ruleset/) for the Cloudflare Managed Ruleset:

* A rule override for rule with ID `5de7edfa648c4d6891dc3e7f84534ffa` setting the action to `log`.
* A rule override for rule with ID `75a0060762034a6cb663fd51a02344cb` disabling the rule.
* A tag override for the `wordpress` tag, setting the action of all the rules with this tag to `js_challenge`.

Important

Ruleset overrides and tag overrides apply to both existing and _future_ rules in the managed ruleset. If you want to override existing rules only, you must use rule overrides.

The following configuration includes the three overrides in the rule that executes the Cloudflare Managed Ruleset:

* [ Terraform (v5) ](#tab-panel-10958)
* [ Terraform (v4) ](#tab-panel-10959)

```

  # (...)


  # Execute Cloudflare Managed Ruleset

  rules = [{

    ref         = "execute_cloudflare_managed_ruleset"

    description = "Execute Cloudflare Managed Ruleset on my zone-level phase entry point ruleset"

    expression  = "true"

    action      = "execute"

    action_parameters = {

      id = "efb7b8c949ac4650a09736fc376e9aee"

      overrides = {

        rules = [

          {

            id      = "5de7edfa648c4d6891dc3e7f84534ffa"

            action  = "log"

            enabled = true

          },

          {

            id      = "75a0060762034a6cb663fd51a02344cb"

            enabled = false

          },

        ]

        categories = [{

          category = "wordpress"

          action   = "js_challenge"

          enabled  = true

        }]

      }

    }

  }]


  # (...)


```

```

  # (...)


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

        rules {

          id      = "75a0060762034a6cb663fd51a02344cb"

          enabled = false

        }

        categories {

          category = "wordpress"

          action   = "js_challenge"

          enabled  = true

        }

      }

    }

  }


  # (...)


```

## Configure payload logging

This example enables [payload logging](https://developers.cloudflare.com/waf/managed-rules/payload-logging/) for matched rules of the Cloudflare Managed Ruleset, setting the public key used to encrypt the logged payload.

Building upon the rule that deploys the Cloudflare Managed Ruleset, the following rule configuration adds the `matched_data` object with the public key used to encrypt the payload:

* [ Terraform (v5) ](#tab-panel-10960)
* [ Terraform (v4) ](#tab-panel-10961)

```

  # (...)


  # Execute Cloudflare Managed Ruleset

  rules = [{

    ref         = "execute_cloudflare_managed_ruleset"

    description = "Execute Cloudflare Managed Ruleset on my zone-level phase entry point ruleset"

    expression  = "true"

    action      = "execute"

    action_parameters = {

      id = "efb7b8c949ac4650a09736fc376e9aee"

      matched_data = {

        public_key = "Ycig/Zr/pZmklmFUN99nr+taURlYItL91g+NcHGYpB8="

      }

    }

  }]


  # (...)


```

```

  # (...)


  # Execute Cloudflare Managed Ruleset

  rules {

    ref         = "execute_cloudflare_managed_ruleset"

    description = "Execute Cloudflare Managed Ruleset on my zone-level phase entry point ruleset"

    expression  = "true"

    action      = "execute"

    action_parameters {

      id = "efb7b8c949ac4650a09736fc376e9aee"

      matched_data {

         public_key = "Ycig/Zr/pZmklmFUN99nr+taURlYItL91g+NcHGYpB8="

      }

    }

  }


  # (...)


```

## Configure the OWASP paranoia level, score threshold, and action

The OWASP managed ruleset supports the following configurations:

* Enable all the rules up to a specific paranoia level by creating tag overrides that disable all the rules associated with higher paranoia levels.
* Set the action to perform when the calculated threat score is greater than the score threshold by creating a rule override for the last rule in the Cloudflare OWASP Core Ruleset (rule with ID ...843b323c  ), and including the `action` property.
* Set the score threshold by creating a rule override for the last rule in the Cloudflare OWASP Core Ruleset (rule with ID ...843b323c  ), and including the `score_threshold` property.

For more information on the available configuration values, refer to the [Cloudflare OWASP Core Ruleset](https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/) page in the WAF documentation.

The following example rule of a `cloudflare_ruleset` Terraform resource performs the following configuration:

* Deploys the OWASP managed ruleset.
* Sets the OWASP paranoia level to _PL2_.
* Sets the score threshold to `60` (_Low_).
* Sets the ruleset action to `log`.

* [ Terraform (v5) ](#tab-panel-10962)
* [ Terraform (v4) ](#tab-panel-10963)

```

  # (...)


  # Execute Cloudflare OWASP Core Ruleset

  rules = [{

    ref         = "execute_owasp_core_ruleset"

    description = "Execute Cloudflare OWASP Core Ruleset"

    expression  = "true"

    action      = "execute"

    action_parameters = {

      id = "4814384a9e5d4991b9815dcfc25d2f1f"

      overrides = {

        # By default, all PL1 to PL4 rules are enabled.

        # Set the paranoia level to PL2 by disabling rules with

        # tags "paranoia-level-3" and "paranoia-level-4".

        categories = [

          {

            category = "paranoia-level-3"

            enabled  = false

          },

          {

            category = "paranoia-level-4"

            enabled  = false

          },

        ]

        rules = [{

          id              = "6179ae15870a4bb7b2d480d4843b323c"

          action          = "log"

          score_threshold = 60

        }]

      }

    }

  }]


  # (...)


```

```

  # (...)


  # Execute Cloudflare OWASP Core Ruleset

  rules {

    ref         = "execute_owasp_core_ruleset"

    description = "Execute Cloudflare OWASP Core Ruleset"

    expression  = "true"

    action      = "execute"

    action_parameters {

      id = "4814384a9e5d4991b9815dcfc25d2f1f"

      overrides {

        # By default, all PL1 to PL4 rules are enabled.

        # Set the paranoia level to PL2 by disabling rules with

        # tags "paranoia-level-3" and "paranoia-level-4".

        categories {

          category = "paranoia-level-3"

          enabled  = false

        }

        categories {

          category = "paranoia-level-4"

          enabled  = false

        }

        rules {

          id              = "6179ae15870a4bb7b2d480d4843b323c"

          action          = "log"

          score_threshold = 60

        }

      }

    }

  }


  # (...)


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/terraform/additional-configurations/waf-managed-rulesets/#page","headline":"WAF Managed Rules configuration using Terraform · Cloudflare Terraform docs","description":"Deploy and configure Cloudflare WAF Managed Rules at the zone or account level using Terraform.","url":"https://developers.cloudflare.com/terraform/additional-configurations/waf-managed-rulesets/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-29","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/terraform/","name":"Terraform"}},{"@type":"ListItem","position":3,"item":{"@id":"/terraform/additional-configurations/","name":"Additional configurations"}},{"@type":"ListItem","position":4,"item":{"@id":"/terraform/additional-configurations/waf-managed-rulesets/","name":"WAF Managed Rules configuration using Terraform"}}]}
```
