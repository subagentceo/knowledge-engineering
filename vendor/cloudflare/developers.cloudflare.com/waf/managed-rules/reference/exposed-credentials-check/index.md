---
title: Cloudflare Exposed Credentials Check Managed Ruleset
description: Rules in the Cloudflare Exposed Credentials Check managed ruleset.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cloudflare Exposed Credentials Check Managed Ruleset

Deprecation notice

Exposed credentials check has been deprecated.

Switch from exposed credentials check to [leaked credentials detection](https://developers.cloudflare.com/waf/detections/leaked-credentials/) for improved security. To upgrade your current configuration, refer to the [upgrade guide](https://developers.cloudflare.com/waf/managed-rules/check-for-exposed-credentials/upgrade-to-leaked-credentials-detection/).

The Cloudflare Exposed Credentials Check Managed Ruleset is a set of pre-configured rules for well-known CMS applications that perform a lookup against a public database of stolen credentials.

The managed ruleset includes rules for the following CMS applications:

* WordPress
* Joomla
* Drupal
* Ghost
* Plone
* Magento

Additionally, this managed ruleset also includes generic rules for other common patterns:

* Check forms submitted using a `POST` request containing `username` and `password` arguments
* Check credentials sent as JSON with `email` and `password` keys
* Check credentials sent as JSON with `username` and `password` keys

The default action for the rules in managed ruleset is _Exposed-Credential-Check Header_ (named `rewrite` in the API and in [Security Events](https://developers.cloudflare.com/waf/analytics/security-events/#sampled-logs)).

The managed ruleset also contains a rule that blocks HTTP requests already containing the `Exposed-Credential-Check` HTTP header used by the _Exposed-Credential-Check Header_ action. These requests could be used to trick the origin into believing that a request contained (or did not contain) exposed credentials.

For more information on exposed credential checks, refer to [Check for exposed credentials](https://developers.cloudflare.com/waf/managed-rules/check-for-exposed-credentials/).

## Configure in the dashboard

Note

The Exposed Credentials Check managed ruleset is only shown in the Cloudflare dashboard if you have previously deployed it. Cloudflare recommends that you use [leaked credentials detection](https://developers.cloudflare.com/waf/detections/leaked-credentials/) instead.

You can configure the following settings of the Cloudflare Exposed Credentials Check Managed Ruleset in the dashboard:

* **Set the action to perform.** When you define an action for the ruleset, you override the default action defined for each rule. The available actions are: _Block_, _Log_, _Non-Interactive Challenge_, _Managed Challenge_, and _Interactive Challenge_. To remove the action override, set the ruleset action to _Default_.
* **Override the action performed by individual rules.** The available actions are: _Exposed-Credential-Check Header_, _Block_, _Log_, _Non-Interactive Challenge_, _Managed Challenge_, and _Interactive Challenge_. For more information, refer to [Available actions](https://developers.cloudflare.com/waf/managed-rules/check-for-exposed-credentials/#available-actions).
* **Disable specific rules.**
* **Customize the filter expression.** With a custom expression, the Cloudflare Exposed Credentials Check Managed Ruleset applies only to a subset of the incoming requests.
* **Configure [payload logging](https://developers.cloudflare.com/waf/managed-rules/payload-logging/configure/)**.

For details on configuring a managed ruleset in the dashboard, refer to [Configure a managed ruleset](https://developers.cloudflare.com/waf/managed-rules/deploy-zone-dashboard/#configure-a-managed-ruleset).

## Configure via API

To enable the Cloudflare Exposed Credentials Check Managed Ruleset for a given zone via API, create a rule with `execute` action in the [entry point ruleset](https://developers.cloudflare.com/ruleset-engine/about/rulesets/#entry-point-ruleset) for the `http_request_firewall_managed` phase.

### Example

This example deploys the Cloudflare Exposed Credentials Check Managed Ruleset to the `http_request_firewall_managed` phase of a given zone (`$ZONE_ID`) by creating a rule that executes the managed ruleset. The rules in the managed ruleset are executed for all incoming requests.

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
    "id": "<ENTRY_POINT_RULESET_ID>",  
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
2. If the entry point ruleset already exists (that is, if you received a `200 OK` status code and the ruleset definition), take note of the ruleset ID in the response. Then, invoke the [Create a zone ruleset rule](https://developers.cloudflare.com/api/resources/rulesets/subresources/rules/methods/create/) operation to add an `execute` rule to the existing ruleset deploying the Cloudflare Exposed Credentials Check Managed Ruleset (with ID `c2e184081120413c86c3ab7e14069605`). By default, the rule will be added at the end of the list of rules already in the ruleset.  
Create a zone ruleset rule  
```  
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/$ENTRY_POINT_RULESET_ID/rules" \  
  --request POST \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  
  --json '{  
    "action": "execute",  
    "action_parameters": {  
        "id": "c2e184081120413c86c3ab7e14069605"  
    },  
    "expression": "true",  
    "description": "Execute the Cloudflare Exposed Credentials Check Managed Ruleset"  
  }'  
```  
```  
{  
  "result": {  
    "id": "<ENTRY_POINT_RULESET_ID>",  
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
          "id": "c2e184081120413c86c3ab7e14069605",  
          "version": "latest"  
        },  
        "expression": "true",  
        "description": "Execute the Cloudflare Exposed Credentials Check Managed Ruleset",  
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
3. If the entry point ruleset does not exist (that is, if you received a `404 Not Found` status code in step 1), create it using the [Create a zone ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/create/) operation. Include a single rule in the `rules` array that executes the Cloudflare Exposed Credentials Check Managed Ruleset (with ID `c2e184081120413c86c3ab7e14069605`) for all incoming requests in the zone.  
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
                "id": "c2e184081120413c86c3ab7e14069605"  
            },  
            "expression": "true",  
            "description": "Execute the Cloudflare Exposed Credentials Check Managed Ruleset"  
        }  
    ]  
  }'  
```

### Next steps

To configure the Exposed Credentials Check Managed Ruleset via API, create [overrides](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/override-managed-ruleset/) using the Rulesets API. You can perform the following configurations:

* Specify the action to perform for all the rules in the ruleset by creating a ruleset override.
* Disable or customize the action of individual rules by creating rule overrides.

For examples of creating overrides using the API, refer to [Override a managed ruleset](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/override-managed-ruleset/).

Checking for exposed credentials in custom rules

Besides activating the Exposed Credentials Check Managed Ruleset, you can also check for exposed credentials in custom rules. One common use case is to create custom rules on the end user authentication endpoints of your application to check for exposed credentials.

For more information, refer to [Create a custom rule checking for exposed credentials](https://developers.cloudflare.com/waf/managed-rules/check-for-exposed-credentials/configure-api/#create-a-custom-rule-checking-for-exposed-credentials).

### More resources

For more information on working with managed rulesets via API, refer to [Work with managed rulesets](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/) in the Ruleset Engine documentation.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/managed-rules/reference/exposed-credentials-check/#page","headline":"Cloudflare Exposed Credentials Check Managed Ruleset · Cloudflare Web Application Firewall (WAF) docs","description":"Rules in the Cloudflare Exposed Credentials Check managed ruleset.","url":"https://developers.cloudflare.com/waf/managed-rules/reference/exposed-credentials-check/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Authentication"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/managed-rules/","name":"Managed Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/managed-rules/reference/","name":"Rulesets reference"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/managed-rules/reference/exposed-credentials-check/","name":"Cloudflare Exposed Credentials Check Managed Ruleset"}}]}
```
