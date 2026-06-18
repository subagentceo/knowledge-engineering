---
title: Configure payload logging via API
description: Configure payload logging for managed rulesets using the API.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Configure payload logging via API

Use the [Rulesets API](https://developers.cloudflare.com/ruleset-engine/rulesets-api/) to configure payload logging for a managed ruleset via API.

## Configure and enable payload logging

1. Use the [Get a zone entry point ruleset](https://developers.cloudflare.com/api/resources/rulesets/subresources/phases/methods/get/) operation to obtain the following IDs:  
   * The ID of the [entry point ruleset](https://developers.cloudflare.com/ruleset-engine/about/rulesets/#entry-point-ruleset) of the `http_request_firewall_managed` [phase](https://developers.cloudflare.com/ruleset-engine/about/phases/).  
   * The ID of the `execute` rule deploying the WAF managed ruleset, for which you want to configure payload logging.
2. Use the [Update a zone ruleset rule](https://developers.cloudflare.com/api/resources/rulesets/methods/update/) operation to update the rule you identified in the previous step.  
Include a `matched_data` object in the rule's `action_parameters` object to configure payload logging. The `matched_data` object has the following structure:  
```  
"action_parameters": {  
  // ...  
  "matched_data": {  
    "public_key": "<PUBLIC_KEY_VALUE>"  
  }  
}  
```  
Replace `<PUBLIC_KEY_VALUE>` with the public key you want to use for payload logging. You can generate a public key [in the command line](https://developers.cloudflare.com/waf/managed-rules/payload-logging/command-line/generate-key-pair/) or [in the Cloudflare dashboard](https://developers.cloudflare.com/waf/managed-rules/payload-logging/configure/).

Account-level configuration

To configure payload logging for a managed ruleset deployed at the account level (only available on Enterprise plans), use the following API operations instead:

* In step 1: [Get an account entry point ruleset](https://developers.cloudflare.com/api/resources/rulesets/subresources/phases/methods/get/)
* In step 2: [Update an account ruleset rule](https://developers.cloudflare.com/api/resources/rulesets/subresources/rules/methods/edit/)

### Example

This example configures payload logging for the [Cloudflare Managed Ruleset](https://developers.cloudflare.com/waf/managed-rules/reference/cloudflare-managed-ruleset/), which is already deployed for a zone with ID `$ZONE_ID`.

1. Invoke the [Get a zone entry point ruleset](https://developers.cloudflare.com/api/resources/rulesets/subresources/phases/methods/get/) operation to obtain the rules currently configured in the entry point ruleset of the `http_request_firewall_managed` phase.  
Get a zone entry point ruleset  
```  
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/phases/http_request_firewall_managed/entrypoint" \  
  --request GET \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  
```  
```  
{  
  "result": {  
    "id": "060013b1eeb14c93b0dcd896537e0d2c", // entry point ruleset ID  
    "name": "default",  
    "description": "",  
    "source": "firewall_managed",  
    "kind": "zone",  
    "version": "3",  
    "rules": [  
      // (...)  
      {  
        "id": "1bdb49371c1f46958fc8b985efcb79e7", // `execute` rule ID  
        "version": "1",  
        "action": "execute",  
        "expression": "true",  
        "last_updated": "2024-01-20T14:21:28.643979Z",  
        "ref": "1bdb49371c1f46958fc8b985efcb79e7",  
        "enabled": true,  
        "action_parameters": {  
          "id": "efb7b8c949ac4650a09736fc376e9aee", // "Cloudflare Managed Ruleset" ID  
          "version": "latest"  
        }  
      }  
      // (...)  
    ],  
    "last_updated": "2024-01-20T14:29:00.190643Z",  
    "phase": "http_request_firewall_managed"  
  },  
  "success": true,  
  "errors": [],  
  "messages": []  
}  
```
2. Save the following IDs for the next step:  
   * The ID of the entry point ruleset: `060013b1eeb14c93b0dcd896537e0d2c`  
   * The ID of the `execute` rule deploying the Cloudflare Managed Ruleset: `1bdb49371c1f46958fc8b985efcb79e7`  
To find the correct rule in the `rules` array, search for an `execute` rule containing the ID of the Cloudflare Managed Ruleset ( ...376e9aee ) in `action_parameters` \> `id`.  
Note  
To get the IDs of existing WAF managed rulesets, refer to [Available managed rulesets](https://developers.cloudflare.com/waf/managed-rules/#available-managed-rulesets) or use the [List account rulesets](https://developers.cloudflare.com/api/resources/rulesets/methods/list/) operation.
3. Invoke the [Update a zone ruleset rule](https://developers.cloudflare.com/api/resources/rulesets/methods/update/) operation to update the configuration of the rule you identified. The rule will now include the payload logging configuration (`matched_data` object).  
Update a zone ruleset rule  
```  
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/060013b1eeb14c93b0dcd896537e0d2c/rules/1bdb49371c1f46958fc8b985efcb79e7" \  
  --request PATCH \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  
  --json '{  
    "action": "execute",  
    "action_parameters": {  
        "id": "efb7b8c949ac4650a09736fc376e9aee",  
        "matched_data": {  
            "public_key": "Ycig/Zr/pZmklmFUN99nr+taURlYItL91g+NcHGYpB8="  
        }  
    },  
    "expression": "true"  
  }'  
```  
The response will include the complete ruleset after updating the rule.

For more information on deploying managed rulesets via API, refer to [Deploy a managed ruleset](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/deploy-managed-ruleset/) in the Ruleset Engine documentation.

---

## Disable payload logging

To disable payload logging for a managed ruleset:

1. Use the [Update a zone ruleset rule](https://developers.cloudflare.com/api/resources/rulesets/methods/update/) operation to update the rule deploying the managed ruleset (a rule with `"action": "execute"`).
2. Modify the rule definition so that there is no `matched_data` object in `action_parameters`.

For example, the following `PATCH` request updates the rule with ID `$RULE_ID` deploying the [Cloudflare Managed Ruleset](https://developers.cloudflare.com/waf/managed-rules/reference/cloudflare-managed-ruleset/) so that payload logging is disabled:

Update a zone ruleset rule

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/$RULESET_ID/rules/$RULE_ID" \

  --request PATCH \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "action": "execute",

    "action_parameters": {

        "id": "efb7b8c949ac4650a09736fc376e9aee"

    },

    "expression": "true"

  }'


```

For details on obtaining the entry point ruleset ID and the ID of the rule to update, refer to [Configure and enable payload logging](https://developers.cloudflare.com/waf/managed-rules/payload-logging/configure-api/#configure-and-enable-payload-logging).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/managed-rules/payload-logging/configure-api/#page","headline":"Configure payload logging for a managed ruleset via API · Cloudflare Web Application Firewall (WAF) docs","description":"Configure payload logging for managed rulesets using the API.","url":"https://developers.cloudflare.com/waf/managed-rules/payload-logging/configure-api/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Logging"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/managed-rules/","name":"Managed Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/managed-rules/payload-logging/","name":"Log the payload of matched rules"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/managed-rules/payload-logging/configure-api/","name":"Configure payload logging via API"}}]}
```
