---
title: Create a custom ruleset using the API
description: Create account-level custom rulesets using the Rulesets API.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Create a custom ruleset using the API

Note

This feature requires an Enterprise plan.

To deploy custom rules at the account level:

1. Create a custom ruleset with one or more rules. Alternatively, identify the existing custom ruleset you want to deploy using the [List account rulesets](https://developers.cloudflare.com/api/resources/rulesets/methods/list/) API operation.
2. Deploy the custom ruleset so that it gets executed. To deploy a custom ruleset, create a rule with the `execute` action.

Use the [Rulesets API](https://developers.cloudflare.com/ruleset-engine/rulesets-api/) to work with custom rulesets using the API.

If you are using Terraform, refer to [WAF custom rules configuration using Terraform](https://developers.cloudflare.com/terraform/additional-configurations/waf-custom-rules/#create-and-deploy-a-custom-ruleset).

## Procedure

To deploy a custom ruleset, follow these general steps:

1. Create a custom ruleset in the `http_request_firewall_custom` phase with one or more rules.
2. Deploy the ruleset to the [entry point ruleset](https://developers.cloudflare.com/ruleset-engine/about/rulesets/#entry-point-ruleset) of the `http_request_firewall_custom` phase.

### 1\. Create a custom ruleset

The following example creates a custom ruleset at the account level with a single rule in the `rules` array.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Account WAF Write`
* `Account Rulesets Write`

Create an account ruleset

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rulesets" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "description": "",

    "kind": "custom",

    "name": "My custom ruleset",

    "rules": [

        {

            "description": "Challenge web traffic (not /api)",

            "expression": "not starts_with(http.request.uri.path, \"/api/\")",

            "action": "managed_challenge"

        }

    ],

    "phase": "http_request_firewall_custom"

  }'


```

Save the ruleset ID in the response for the next step.

### 2\. Deploy the custom ruleset

To deploy the custom ruleset, add a rule with `"action": "execute"` to the `http_request_firewall_custom` phase entry point ruleset.

1. Invoke the [Get an account entry point ruleset](https://developers.cloudflare.com/api/resources/rulesets/subresources/phases/methods/get/) operation to obtain the definition of the entry point ruleset for the `http_request_firewall_custom` phase. You will need the [account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) for this task.  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `Account WAF Write`  
   * `Account WAF Read`  
   * `Account Rulesets Read`  
   * `Account Rulesets Write`  
Get an account entry point ruleset  
```  
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rulesets/phases/http_request_firewall_custom/entrypoint" \  
  --request GET \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  
```  
```  
{  
  "result": {  
    "description": "Account-level phase entry point",  
    "id": "<RULESET_ID>",  
    "kind": "root",  
    "last_updated": "2024-03-16T15:40:08.202335Z",  
    "name": "root",  
    "phase": "http_request_firewall_custom",  
    "rules": [  
      // ...  
    ],  
    "version": "9"  
  },  
  "success": true,  
  "errors": [],  
  "messages": []  
}  
```
2. If the entry point ruleset already exists (that is, if you received a `200 OK` status code and the ruleset definition), take note of the ruleset ID in the response. Then, invoke the [Create an account ruleset rule](https://developers.cloudflare.com/api/resources/rulesets/subresources/rules/methods/create/) operation to add an `execute` rule to the existing ruleset deploying the custom ruleset. By default, the rule will be added at the end of the list of rules already in the ruleset.  
The following request creates a rule that executes the custom ruleset with ID `<CUSTOM_RULESET_ID>` for all Enterprise zones in the account:  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `Account WAF Write`  
   * `Account Rulesets Write`  
Create an account ruleset rule  
```  
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rulesets/$RULESET_ID/rules" \  
  --request POST \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  
  --json '{  
    "description": "Execute custom ruleset",  
    "expression": "(cf.zone.plan eq \"ENT\")",  
    "action": "execute",  
    "action_parameters": {  
        "id": "<CUSTOM_RULESET_ID>"  
    },  
    "enabled": true  
  }'  
```  
Warning  
At the account level, you can only apply custom rulesets to incoming traffic of zones on an Enterprise plan. To enforce this requirement, you must include `cf.zone.plan eq "ENT"` in the expression of the `execute` rule deploying the custom ruleset.
3. If the entry point ruleset does not exist (that is, if you received a `404 Not Found` status code in step 1), create it using the [Create an account ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/create/) operation. Include a single rule in the `rules` array that executes the custom ruleset for all incoming requests of Enterprise zones in your account.  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `Account WAF Write`  
   * `Account Rulesets Write`  
Create an account ruleset  
```  
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rulesets" \  
  --request POST \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  
  --json '{  
    "description": "",  
    "kind": "root",  
    "name": "Account-level phase entry point",  
    "rules": [  
        {  
            "action": "execute",  
            "expression": "(cf.zone.plan eq \"ENT\")",  
            "action_parameters": {  
                "id": "<CUSTOM_RULESET_ID>"  
            }  
        }  
    ],  
    "phase": "http_request_firewall_custom"  
  }'  
```

## Next steps

Use the different operations in the [Rulesets API](https://developers.cloudflare.com/ruleset-engine/rulesets-api/) to work with the custom ruleset you created and deployed. The following table has a list of common tasks for working with custom rulesets at the account level:

| Task                               | Procedure                                                                                                                                                                                                                                                                                                                                                                                                      |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Get list of custom rulesets        | Use the [List account rulesets](https://developers.cloudflare.com/api/resources/rulesets/methods/list/) operation and search for rulesets with "kind": "custom" and "phase": "http\_request\_firewall\_custom". The response will include the ruleset IDs.For more information, refer to [List existing rulesets](https://developers.cloudflare.com/ruleset-engine/rulesets-api/view/#list-existing-rulesets). |
| List all rules in a custom ruleset | Use the [Get an account ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/get/) operation with the custom ruleset ID to obtain the list of configured rules and their IDs.For more information, refer to [View a specific ruleset](https://developers.cloudflare.com/ruleset-engine/rulesets-api/view/#view-a-specific-ruleset).                                                       |
| Update a custom rule               | Use the [Update an account ruleset rule](https://developers.cloudflare.com/api/resources/rulesets/subresources/rules/methods/edit/) operation. You will need to provide the custom ruleset ID and the rule ID.For more information, refer to [Update a rule in a ruleset](https://developers.cloudflare.com/ruleset-engine/rulesets-api/update-rule/).                                                         |
| Delete a custom rule               | Use the [Delete an account ruleset rule](https://developers.cloudflare.com/api/resources/rulesets/subresources/rules/methods/delete/) operation. You will need to provide the custom ruleset ID and the rule ID.For more information, refer to [Delete a rule in a ruleset](https://developers.cloudflare.com/ruleset-engine/rulesets-api/delete-rule/).                                                       |

## More resources

For instructions on creating a custom ruleset at the zone level via API, refer to [Custom rulesets (zone level)](https://developers.cloudflare.com/waf/custom-rules/custom-rulesets/).

For more information on working with custom rulesets, refer to [Work with custom rulesets](https://developers.cloudflare.com/ruleset-engine/custom-rulesets/) in the Ruleset Engine documentation.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/account/custom-rulesets/create-api/#page","headline":"Create a WAF custom ruleset using the API · Cloudflare Web Application Firewall (WAF) docs","description":"Create account-level custom rulesets using the Rulesets API.","url":"https://developers.cloudflare.com/waf/account/custom-rulesets/create-api/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/account/","name":"Account-level WAF configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/account/custom-rulesets/","name":"Custom rulesets (account level)"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/account/custom-rulesets/create-api/","name":"Create a custom ruleset using the API"}}]}
```
