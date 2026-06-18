---
title: Custom rulesets (zone level)
description: Create and manage zone-level custom rulesets for WAF rules.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Custom rulesets (zone level)

Custom rulesets are collections of custom rules that you can deploy at the zone or [account level](https://developers.cloudflare.com/waf/account/custom-rulesets/).

Like [custom rules](https://developers.cloudflare.com/waf/custom-rules/), custom rulesets allow you to control incoming traffic by filtering requests.

For example, you can apply a custom ruleset to all incoming requests of your zone or to a subset of incoming requests.

At the zone level, all customers can create and deploy custom rulesets. Custom rulesets at the account level require an Enterprise plan. For more details, refer to [Availability](https://developers.cloudflare.com/waf/custom-rules/#availability).

Use case: Different teams managing different sets of custom rules

Consider creating custom rulesets instead of managing individual custom rules at the zone level to allow different teams in your company to manage different sets of rules independently, including [via Terraform](https://developers.cloudflare.com/terraform/additional-configurations/waf-custom-rules/#create-and-deploy-a-custom-ruleset).

## Deploy a custom ruleset via API

Note

Currently, the Cloudflare dashboard does not support working with custom rulesets at the zone level. You will need to use the Cloudflare API to configure or deploy these rulesets.

Creating a custom ruleset does not activate it. Custom rulesets only run when a rule with the `execute` action references them from a [phase entry point ruleset](https://developers.cloudflare.com/ruleset-engine/about/rulesets/#entry-point-ruleset) — the top-level ruleset that Cloudflare evaluates for each request in a given [phase](https://developers.cloudflare.com/ruleset-engine/about/phases/).

To deploy a custom ruleset for a zone:

1. Create a custom ruleset at the zone level with one or more rules. Alternatively, identify the existing custom ruleset you want to deploy using the [List zone rulesets](https://developers.cloudflare.com/api/resources/rulesets/methods/list/) API operation.
2. Add a rule with the `execute` action to the `http_request_firewall_custom` phase entry point ruleset, referencing the custom ruleset ID. This rule tells Cloudflare to run the custom ruleset when the rule expression matches.

### 1\. Create custom ruleset

The following request creates a new custom ruleset at the zone level with two rules. The response will include the ID of the new custom ruleset in the `id` field.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Zone WAF Write`

Create a zone ruleset

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Custom Ruleset 1",

    "description": "My First Custom Ruleset (zone)",

    "kind": "custom",

    "phase": "http_request_firewall_custom",

    "rules": [

        {

            "expression": "(ip.src.country in {\"GB\" \"FR\"} and cf.bot_management.score < 20 and not cf.bot_management.verified_bot)",

            "action": "challenge",

            "description": "challenge GB and FR based on bot score"

        },

        {

            "expression": "not http.request.uri.path wildcard \"/api/*\"",

            "action": "challenge",

            "description": "challenge not /api"

        }

    ]

  }'


```

```

{

  "result": {

    "id": "f82ccda3d21f4a02825d3fe45b5e1c10",

    "name": "Custom Ruleset 1",

    "description": "My First Custom Ruleset (zone)",

    "kind": "custom",

    "version": "1",

    "rules": [

      {

        "expression": "(ip.src.country in {\"GB\" \"FR\"} and cf.bot_management.score < 20 and not cf.bot_management.verified_bot)",

        "action": "challenge",

        "description": "challenge GB and FR based on bot score"

      },

      {

        "expression": "not http.request.uri.path wildcard \"/api/*\"",

        "action": "challenge",

        "description": "challenge not /api"

      }

    ],

    "last_updated": "2025-11-09T10:27:30.636197Z",

    "phase": "http_request_firewall_custom"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

Note

Currently, zone-level custom rulesets are only available in the `http_request_firewall_custom` phase.

### 2\. Deploy custom ruleset

Deploy the custom ruleset by adding a rule with `"action": "execute"` to the `http_request_firewall_custom` phase entry point ruleset.

1. Invoke the [Get a zone entry point ruleset](https://developers.cloudflare.com/api/resources/rulesets/subresources/phases/methods/get/) operation to obtain the definition of the entry point ruleset for the `http_request_firewall_custom` phase. You will need the [zone ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) for this task.  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `Zone WAF Write`  
   * `Zone WAF Read`  
Get a zone entry point ruleset  
```  
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/phases/http_request_firewall_custom/entrypoint" \  
  --request GET \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  
```  
```  
{  
  "result": {  
    "description": "Zone-level phase entry point",  
    "id": "<ENTRY_POINT_RULESET_ID>",  
    "kind": "zone",  
    "last_updated": "2025-11-16T15:40:08.202335Z",  
    "name": "zone",  
    "phase": "http_request_firewall_custom",  
    "rules": [  
      // ...  
    ],  
    "version": "10"  
  },  
  "success": true,  
  "errors": [],  
  "messages": []  
}  
```
2. If the entry point ruleset already exists (that is, if you received a `200 OK` status code and the ruleset definition), take note of the ruleset ID in the response. Then, invoke the [Create a zone ruleset rule](https://developers.cloudflare.com/api/resources/rulesets/subresources/rules/methods/create/) operation to add an `execute` rule to the existing ruleset deploying the custom ruleset you created in Step 1 (replace `f82ccda3d21f4a02825d3fe45b5e1c10` with your custom ruleset ID).  
Since the expression is `true`, the custom ruleset will run for all incoming requests. By default, the rule will be added at the end of the list of rules already in the ruleset.  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `Zone WAF Write`  
Create a zone ruleset rule  
```  
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/$ENTRY_POINT_RULESET_ID/rules" \  
  --request POST \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  
  --json '{  
    "action": "execute",  
    "expression": "true",  
    "action_parameters": {  
        "id": "f82ccda3d21f4a02825d3fe45b5e1c10"  
    },  
    "description": "Execute custom ruleset"  
  }'  
```  
```  
{  
  "result": {  
    "id": "<ENTRY_POINT_RULESET_ID>",  
    "name": "zone",  
    "description": "Zone-level phase entry point",  
    "kind": "zone",  
    "version": "11",  
    "rules": [  
      // ... any existing rules  
      {  
        "id": "<RULE_ID>",  
        "version": "1",  
        "action": "execute",  
        "action_parameters": {  
          "id": "f82ccda3d21f4a02825d3fe45b5e1c10"  
        },  
        "expression": "true",  
        "description": "Execute custom ruleset",  
        "last_updated": "2025-11-18T18:08:14.003361Z",  
        "ref": "<RULE_REF>",  
        "enabled": true  
      }  
    ],  
    "last_updated": "2025-11-18T18:08:14.003361Z",  
    "phase": "http_request_firewall_custom"  
  },  
  "success": true,  
  "errors": [],  
  "messages": []  
}  
```
3. If the entry point ruleset does not exist (that is, if you received a `404 Not Found` status code in step 1), create it using the [Create a zone ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/create/) operation. Include a single rule in the `rules` array that executes the custom ruleset for all incoming requests in the zone. Replace `f82ccda3d21f4a02825d3fe45b5e1c10` with your custom ruleset ID.  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `Zone WAF Write`  
Create a zone ruleset  
```  
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets" \  
  --request POST \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  
  --json '{  
    "name": "zone",  
    "description": "Zone-level phase entry point",  
    "kind": "zone",  
    "phase": "http_request_firewall_custom",  
    "rules": [  
        {  
            "action": "execute",  
            "action_parameters": {  
                "id": "f82ccda3d21f4a02825d3fe45b5e1c10"  
            },  
            "expression": "true",  
            "description": "Execute custom ruleset"  
        }  
    ]  
  }'  
```

## Next steps

Use the different operations in the [Rulesets API](https://developers.cloudflare.com/ruleset-engine/rulesets-api/) to work with the custom ruleset you created and deployed. The following table has a list of common tasks for working with custom rulesets at the zone level:

| Task                               | Procedure                                                                                                                                                                                                                                                                                                                                                                                                   |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Get list of custom rulesets        | Use the [List zone rulesets](https://developers.cloudflare.com/api/resources/rulesets/methods/list/) operation and search for rulesets with "kind": "custom" and "phase": "http\_request\_firewall\_custom". The response will include the ruleset IDs.For more information, refer to [List existing rulesets](https://developers.cloudflare.com/ruleset-engine/rulesets-api/view/#list-existing-rulesets). |
| List all rules in a custom ruleset | Use the [Get a zone ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/get/) operation with the custom ruleset ID to obtain the list of configured rules and their IDs.For more information, refer to [View a specific ruleset](https://developers.cloudflare.com/ruleset-engine/rulesets-api/view/#view-a-specific-ruleset).                                                        |
| Update a custom rule               | Use the [Update a zone ruleset rule](https://developers.cloudflare.com/api/resources/rulesets/subresources/rules/methods/edit/) operation. You will need to provide the custom ruleset ID and the rule ID.For more information, refer to [Update a rule in a ruleset](https://developers.cloudflare.com/ruleset-engine/rulesets-api/update-rule/).                                                          |
| Delete a custom rule               | Use the [Delete a zone ruleset rule](https://developers.cloudflare.com/api/resources/rulesets/subresources/rules/methods/delete/) operation. You will need to provide the custom ruleset ID and the rule ID.For more information, refer to [Delete a rule in a ruleset](https://developers.cloudflare.com/ruleset-engine/rulesets-api/delete-rule/).                                                        |

## More resources

For more information on working with custom rulesets via Cloudflare API, refer to [Work with custom rulesets](https://developers.cloudflare.com/ruleset-engine/custom-rulesets/) in the Ruleset Engine documentation.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/custom-rules/custom-rulesets/#page","headline":"Custom rulesets (zone level) · Cloudflare Web Application Firewall (WAF) docs","description":"Create and manage zone-level custom rulesets for WAF rules.","url":"https://developers.cloudflare.com/waf/custom-rules/custom-rulesets/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/custom-rules/","name":"Custom rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/custom-rules/custom-rulesets/","name":"Custom rulesets (zone level)"}}]}
```
