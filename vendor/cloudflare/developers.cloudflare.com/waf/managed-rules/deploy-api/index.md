---
title: Deploy a WAF managed ruleset via API (zone)
description: Deploy WAF managed rulesets at the zone level using the API.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Deploy a WAF managed ruleset via API (zone)

Use the [Rulesets API](https://developers.cloudflare.com/ruleset-engine/rulesets-api/) to deploy a managed ruleset at the zone level.

Deploy WAF managed rulesets to the `http_request_firewall_managed` phase. Other managed rulesets, like DDoS Attack Protection managed rulesets, must be deployed to a different phase. Refer to the specific managed ruleset documentation for details.

The [WAF Managed Rules](https://developers.cloudflare.com/waf/managed-rules/#available-managed-rulesets) page includes the IDs of the different WAF managed rulesets. You will need this information when deploying the rulesets via API.

If you are using Terraform, refer to [WAF Managed Rules configuration using Terraform](https://developers.cloudflare.com/terraform/additional-configurations/waf-managed-rulesets/).

## Example

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

## Next steps

To customize the behavior of the rules included in a managed ruleset, [create an override](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/override-managed-ruleset/).

To skip the execution of WAF managed rulesets or some of their rules, [create an exception](https://developers.cloudflare.com/waf/managed-rules/waf-exceptions/define-api/) (also called a skip rule).

Exceptions have priority over overrides.

## More resources

For instructions on deploying a managed ruleset at the account level via API, refer to [Deploy a WAF managed ruleset via API (account)](https://developers.cloudflare.com/waf/account/managed-rulesets/deploy-api/).

For more information on working with managed rulesets via API, refer to [Work with managed rulesets](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/) in the Ruleset Engine documentation.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/managed-rules/deploy-api/#page","headline":"Deploy a WAF managed ruleset via API for a zone · Cloudflare Web Application Firewall (WAF) docs","description":"Deploy WAF managed rulesets at the zone level using the API.","url":"https://developers.cloudflare.com/waf/managed-rules/deploy-api/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/managed-rules/","name":"Managed Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/managed-rules/deploy-api/","name":"Deploy a WAF managed ruleset via API (zone)"}}]}
```
