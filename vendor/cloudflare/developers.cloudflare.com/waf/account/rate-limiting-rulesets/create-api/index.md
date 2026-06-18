---
title: Create a rate limiting ruleset via API
description: Create account-level rate limiting rulesets using the API.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Create a rate limiting ruleset via API

To deploy rate limiting rules at the account level, you must create a rate limiting ruleset with one or more rules. Use the [Rulesets API](https://developers.cloudflare.com/ruleset-engine/rulesets-api/) to create and deploy rate limiting rulesets via API.

For more information on rule parameters, refer to [Rate limiting parameters](https://developers.cloudflare.com/waf/rate-limiting-rules/parameters/).

Note

At the API level, a rate limiting ruleset is a regular [custom ruleset](https://developers.cloudflare.com/waf/account/custom-rulesets/) with one or more rate limiting rules that you create in the `http_ratelimit` phase. The concept of custom rate limiting ruleset exists in the Cloudflare dashboard to make it clear that you are configuring and deploying rate limiting rules at the account level. This page with API instructions uses the same terminology.

Each rate limiting rule contains a `ratelimit` object with the rate limiting configuration. Refer to [Rate limiting parameters](https://developers.cloudflare.com/waf/rate-limiting-rules/parameters/) for more information on this object and its parameters.

If you are using Terraform, refer to [Rate limiting rules configuration using Terraform](https://developers.cloudflare.com/terraform/additional-configurations/rate-limiting-rules/#create-a-rate-limiting-rule-at-the-account-level).

## Procedure

To deploy a rate limiting ruleset in your account, follow these general steps:

1. Create a rate limiting ruleset (that is, a custom ruleset in the `http_ratelimit` phase) with one or more rate limiting rules.
2. Deploy the ruleset to the [entry point ruleset](https://developers.cloudflare.com/ruleset-engine/about/rulesets/#entry-point-ruleset) of the `http_ratelimit` phase at the account level.

### 1\. Create a rate limiting ruleset

The following example creates a rate limiting ruleset with a single rate limiting rule in the `rules` array.

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

    "name": "My rate limiting ruleset",

    "rules": [

        {

            "description": "Rate limit API requests",

            "expression": "(starts_with(http.request.uri.path, \"/my-api/\"))",

            "ratelimit": {

                "characteristics": [

                    "ip.src",

                    "cf.colo.id"

                ],

                "requests_to_origin": false,

                "requests_per_period": 30,

                "period": 60,

                "mitigation_timeout": 120

            },

            "action": "block",

            "action_parameters": {

                "response": {

                    "status_code": 429,

                    "content_type": "application/json",

                    "content": "{ \"error\": \"Your API requests have been rate limited. Wait a couple of minutes and try again.\" }"

                }

            },

            "enabled": true

        }

    ],

    "phase": "http_ratelimit"

  }'


```

The available characteristics depend on your Cloudflare plan and product subscriptions. Refer to [Availability](https://developers.cloudflare.com/waf/rate-limiting-rules/#availability) for more information.

Save the ruleset ID in the response for the next step.

### 2\. Deploy the rate limiting ruleset

To deploy the rate limiting ruleset, add a rule with `"action": "execute"` to the `http_ratelimit` phase entry point ruleset at the account level.

1. Invoke the [Get an account entry point ruleset](https://developers.cloudflare.com/api/resources/rulesets/subresources/phases/methods/get/) operation to obtain the definition of the entry point ruleset for the `http_ratelimit` phase. You will need the [account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) for this task.  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `Account WAF Write`  
   * `Account WAF Read`  
   * `Account Rulesets Read`  
   * `Account Rulesets Write`  
Get an account entry point ruleset  
```  
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rulesets/phases/http_ratelimit/entrypoint" \  
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
    "phase": "http_ratelimit",  
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
2. If the entry point ruleset already exists (that is, if you received a `200 OK` status code and the ruleset definition), take note of the ruleset ID in the response. Then, invoke the [Create an account ruleset rule](https://developers.cloudflare.com/api/resources/rulesets/subresources/rules/methods/create/) operation to add an `execute` rule to the existing ruleset deploying the rate limiting ruleset. By default, the rule will be added at the end of the list of rules already in the ruleset.  
The following request creates a rule that executes the rate limiting ruleset with ID `<RATE_LIMITING_RULESET_ID>` for all Enterprise zones in the account:  
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
    "description": "Execute rate limiting ruleset",  
    "expression": "(cf.zone.plan eq \"ENT\")",  
    "action": "execute",  
    "action_parameters": {  
        "id": "<RATE_LIMITING_RULESET_ID>"  
    },  
    "enabled": true  
  }'  
```  
Warning  
You can only apply rate limiting rulesets to incoming traffic of zones on an Enterprise plan. To enforce this requirement, you must include `cf.zone.plan eq "ENT"` in the expression of the `execute` rule deploying the rate limiting ruleset.
3. If the entry point ruleset does not exist (that is, if you received a `404 Not Found` status code in step 1), create it using the [Create an account ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/create/) operation. Include a single rule in the `rules` array that executes the rate limiting ruleset for all incoming requests of Enterprise zones in your account.  
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
                "id": "<RATE_LIMITING_RULESET_ID>"  
            }  
        }  
    ],  
    "phase": "http_ratelimit"  
  }'  
```

For examples of rate limiting rule definitions for the API, refer to [Create a rate limiting rule via API](https://developers.cloudflare.com/waf/rate-limiting-rules/create-api/).

---

## Next steps

Use the different operations in the [Rulesets API](https://developers.cloudflare.com/ruleset-engine/rulesets-api/) to work with the ruleset you just created and deployed. The following table has a list of common tasks for working with rate limiting rulesets at the account level:

| Task                                      | Procedure                                                                                                                                                                                                                                                                                                                                                                                      |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Get list of rate limiting rulesets        | Use the [List account rulesets](https://developers.cloudflare.com/api/resources/rulesets/methods/list/) operation and search for rulesets with "kind": "custom" and "phase": "http\_ratelimit". The response will include the ruleset IDs.For more information, refer to [List existing rulesets](https://developers.cloudflare.com/ruleset-engine/rulesets-api/view/#list-existing-rulesets). |
| List all rules in a rate limiting ruleset | Use the [Get an account ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/get/) operation with the rate limiting ruleset ID to obtain the list of configured rate limiting rules and their IDs.For more information, refer to [View a specific ruleset](https://developers.cloudflare.com/ruleset-engine/rulesets-api/view/#view-a-specific-ruleset).                  |
| Update a rate limiting rule               | Use the [Update an account ruleset rule](https://developers.cloudflare.com/api/resources/rulesets/subresources/rules/methods/edit/) operation. You will need to provide the rate limiting ruleset ID and the rule ID.For more information, refer to [Update a rule in a ruleset](https://developers.cloudflare.com/ruleset-engine/rulesets-api/update-rule/).                                  |
| Delete a rate limiting rule               | Use the [Delete an account ruleset rule](https://developers.cloudflare.com/api/resources/rulesets/subresources/rules/methods/delete/) operation. You will need to provide the rate limiting ruleset ID and the rule ID.For more information, refer to [Delete a rule in a ruleset](https://developers.cloudflare.com/ruleset-engine/rulesets-api/delete-rule/).                                |

## More resources

For instructions on deploying a rate limiting rule at the zone level via API, refer to [Create a rate limiting rule via API](https://developers.cloudflare.com/waf/rate-limiting-rules/create-api/).

For more information on the different rate limiting parameters you can configure in your rate limiting rules, refer to [Rate limiting parameters](https://developers.cloudflare.com/waf/rate-limiting-rules/parameters/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/account/rate-limiting-rulesets/create-api/#page","headline":"Create a rate limiting ruleset via API · Cloudflare Web Application Firewall (WAF) docs","description":"Create account-level rate limiting rulesets using the API.","url":"https://developers.cloudflare.com/waf/account/rate-limiting-rulesets/create-api/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/account/","name":"Account-level WAF configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/account/rate-limiting-rulesets/","name":"Rate limiting rulesets"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/account/rate-limiting-rulesets/create-api/","name":"Create a rate limiting ruleset via API"}}]}
```
