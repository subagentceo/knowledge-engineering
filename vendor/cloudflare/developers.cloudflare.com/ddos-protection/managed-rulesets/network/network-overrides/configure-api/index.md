---
title: Configure via API
description: Create and manage Network-layer DDoS Attack Protection overrides using the API.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ddos-protection/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Configure via API

Configure the Cloudflare Network-layer DDoS Attack Protection managed ruleset by defining overrides at the account level using the [Rulesets API](https://developers.cloudflare.com/ruleset-engine/rulesets-api/).

Each account has the Network-layer DDoS Attack Protection managed ruleset enabled by default. This means that you do not need to deploy the managed ruleset to the `ddos_l4` phase entry point ruleset explicitly. You only have to create a rule in the phase entry point to deploy the managed ruleset if you need to configure overrides.

If you are using Terraform, refer to [DDoS managed rulesets configuration using Terraform](https://developers.cloudflare.com/terraform/additional-configurations/ddos-managed-rulesets/#example-configure-network-layer-ddos-attack-protection).

## Configure an override for the Network-layer DDoS Attack Protection managed ruleset

You can define overrides at the ruleset, tag, and rule level for all managed rulesets.

When configuring the Network-layer DDoS Attack Protection managed ruleset, use overrides to define a different **action** or **sensitivity** from the default values. For more information on these rule parameters and the allowed values, refer to [Managed ruleset parameters](https://developers.cloudflare.com/ddos-protection/managed-rulesets/network/override-parameters/).

Important

* The Network-layer DDoS Attack Protection managed ruleset is always enabled. You cannot disable its rules using an override with `"enabled": false`.
* The managed ruleset includes some read-only rules that you cannot override.
* You can only define overrides for the Network-layer DDoS Attack Protection managed ruleset at the account level.

## Example

The following `PUT` example creates a new phase ruleset (or updates the existing one) for the `ddos_l4` phase at the account level. The request includes several overrides to adjust the default behavior of the Network-layer DDoS Attack Protection managed ruleset. These overrides are the following:

* All rules of the Network-layer DDoS Attack Protection managed ruleset will have their sensitivity set to `medium`.
* All rules tagged with `<TAG_NAME>` will have their sensitivity set to `low`.
* The rule with ID `<MANAGED_RULESET_RULE_ID>` will use the `block` action.

The overrides apply to all packets matching the rule expression: `ip.dst in { 1.1.1.0/24 }`.

Request

```

curl --request PUT \

https://api.cloudflare.com/client/v4/accounts/{account_id}/rulesets/phases/ddos_l4/entrypoint \

--header "Authorization: Bearer <API_TOKEN>" \

--header "Content-Type: application/json" \

--data '{

  "description": "Define overrides for the Network-layer DDoS Attack Protection managed ruleset",

  "rules": [

    {

      "action": "execute",

      "expression": "ip.dst in { 1.1.1.0/24 }",

      "action_parameters": {

        "id": "<MANAGED_RULESET_ID>",

        "overrides": {

          "sensitivity_level": "medium",

          "categories": [

            {

              "category": "<TAG_NAME>",

              "sensitivity_level": "low"

            }

          ],

          "rules": [

            {

              "id": "<MANAGED_RULESET_RULE_ID>",

              "action": "block"

            }

          ]

        }

      }

    }

  ]

}'


```

The response returns the created (or updated) phase entry point ruleset.

Response

```

{

  "result": {

    "id": "<PHASE_ENTRY_POINT_RULESET_ID>",

    "name": "default",

    "description": "Define overrides for the Network-layer DDoS Attack Protection managed ruleset",

    "kind": "root",

    "version": "1",

    "rules": [

      {

        "id": "<RULE_ID>",

        "version": "1",

        "action": "execute",

        "action_parameters": {

          "id": "<MANAGED_RULESET_ID>",

          "version": "latest",

          "overrides": {

            "categories": [

              {

                "category": "<TAG_NAME>",

                "sensitivity_level": "low"

              }

            ],

            "rules": [

              {

                "id": "<MANAGED_RULESET_RULE_ID>",

                "action": "block"

              }

            ],

            "sensitivity_level": "medium"

          }

        },

        "expression": "ip.dst in { 1.1.1.0/24 }",

        "last_updated": "2021-08-16T04:14:47.977741Z",

        "ref": "<RULE_REF>",

        "enabled": true

      }

    ],

    "last_updated": "2021-08-16T04:14:47.977741Z",

    "phase": "ddos_l4"

  }

}


```

For more information on defining overrides for managed rulesets using the Rulesets API, refer to [Override a managed ruleset](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/override-managed-ruleset/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ddos-protection/managed-rulesets/network/network-overrides/configure-api/#page","headline":"Configure Network-layer DDoS Attack Protection via API · Cloudflare DDoS Protection docs","description":"Create and manage Network-layer DDoS Attack Protection overrides using the API.","url":"https://developers.cloudflare.com/ddos-protection/managed-rulesets/network/network-overrides/configure-api/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["REST API"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ddos-protection/","name":"DDoS Protection"}},{"@type":"ListItem","position":3,"item":{"@id":"/ddos-protection/managed-rulesets/","name":"Managed rulesets"}},{"@type":"ListItem","position":4,"item":{"@id":"/ddos-protection/managed-rulesets/network/","name":"Network-layer DDoS Attack Protection"}},{"@type":"ListItem","position":5,"item":{"@id":"/ddos-protection/managed-rulesets/network/network-overrides/","name":"Overrides"}},{"@type":"ListItem","position":6,"item":{"@id":"/ddos-protection/managed-rulesets/network/network-overrides/configure-api/","name":"Configure via API"}}]}
```
