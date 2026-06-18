---
title: API examples
description: API examples for configuring custom rules with the Skip action.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# API examples

Use the [Rulesets API](https://developers.cloudflare.com/ruleset-engine/rulesets-api/) to configure custom rules via API.

The `skip` action supports different [skip options](https://developers.cloudflare.com/waf/custom-rules/skip/options/), according to the security features or products that you wish to skip.

## Before you continue

This page contains examples of different skip rule scenarios for custom rules. Take the following into account:

* The `$ZONE_ID` value is the [ID of the zone](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) where you want to add the rule.
* The `$RULESET_ID` value is the ID of the [entry point ruleset](https://developers.cloudflare.com/ruleset-engine/about/rulesets/#entry-point-ruleset) of the `http_request_firewall_custom` phase. For details on obtaining this ruleset ID, refer to [List and view rulesets](https://developers.cloudflare.com/ruleset-engine/rulesets-api/view/). The API examples in this page add a skip rule to an existing ruleset using the [Create a zone ruleset rule](https://developers.cloudflare.com/api/resources/rulesets/subresources/rules/methods/create/) operation.  
However, the entry point ruleset may not exist yet. In this case, invoke the [Create a zone ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/create/) operation to create the entry point ruleset with a skip rule. Refer to [Create ruleset](https://developers.cloudflare.com/ruleset-engine/rulesets-api/create/#example---create-a-zone-level-phase-entry-point-ruleset) for an example.
* Although each example only includes one action parameter, you can use several skip options in the same rule by specifying the `ruleset`, `phases`, and `products` action parameters simultaneously.

## Skip the remaining rules in the current ruleset

This example invokes the [Create a zone ruleset rule](https://developers.cloudflare.com/api/resources/rulesets/subresources/rules/methods/create/) operation to add a skip rule to the existing `http_request_firewall_custom` phase entry point ruleset with ID `$RULESET_ID`. The rule will skip all remaining rules in the current ruleset for requests matching the rule expression.

Create a zone ruleset rule

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/$RULESET_ID/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "action": "skip",

    "action_parameters": {

        "ruleset": "current"

    },

    "expression": "http.request.uri.path contains \"/skip-current-ruleset/\"",

    "description": ""

  }'


```

## Skip a phase

This example invokes the [Create a zone ruleset rule](https://developers.cloudflare.com/api/resources/rulesets/subresources/rules/methods/create/) operation to add a rule to the existing `http_request_firewall_custom` phase entry point ruleset with ID `$RULESET_ID`. The rule will skip the `http_ratelimit` phase for requests matching the rule expression.

Create a zone ruleset rule

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/$RULESET_ID/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "action": "skip",

    "action_parameters": {

        "phases": [

            "http_ratelimit"

        ]

    },

    "expression": "http.request.uri.path contains \"/skip-phase/\"",

    "description": ""

  }'


```

Refer to [Available skip options](https://developers.cloudflare.com/waf/custom-rules/skip/options/) for the list of phases you can skip.

## Skip a phase and do not log matching requests

This example invokes the [Create a zone ruleset rule](https://developers.cloudflare.com/api/resources/rulesets/subresources/rules/methods/create/) operation to add a rule that:

* Skips the `http_ratelimit` phase
* Disables event logging for the current rule

Create a zone ruleset rule

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/$RULESET_ID/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "action": "skip",

    "action_parameters": {

        "phases": [

            "http_ratelimit"

        ]

    },

    "logging": {

        "enabled": false

    },

    "expression": "http.request.uri.path contains \"/disable-logging/\"",

    "description": ""

  }'


```

Refer to [Available skip options](https://developers.cloudflare.com/waf/custom-rules/skip/options/#log-requests-matching-the-skip-rule) for more information on disabling logging for requests that match a skip rule.

## Skip security products

This example uses the [Create a zone ruleset rule](https://developers.cloudflare.com/api/resources/rulesets/subresources/rules/methods/create/) operation to add a rule that skips the [Zone Lockdown](https://developers.cloudflare.com/waf/tools/zone-lockdown/) and [User Agent Blocking](https://developers.cloudflare.com/waf/tools/user-agent-blocking/) products for requests matching the rule expression.

Create a zone ruleset rule

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/$RULESET_ID/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "action": "skip",

    "action_parameters": {

        "products": [

            "zoneLockdown",

            "uaBlock"

        ]

    },

    "expression": "http.request.uri.path contains \"/skip-products/\"",

    "description": ""

  }'


```

Refer to [Available skip options](https://developers.cloudflare.com/waf/custom-rules/skip/options/#skip-products) for the list of products you can skip.

## Skip the remaining rules in the current phase

This example invokes the [Create a zone ruleset rule](https://developers.cloudflare.com/api/resources/rulesets/subresources/rules/methods/create/) operation to add a skip rule to the existing `http_request_firewall_custom` phase entry point ruleset with ID `$RULESET_ID`. The rule will skip all remaining rules in the `http_request_firewall_custom` phase for requests matching the rule expression.

Create a zone ruleset rule

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/$RULESET_ID/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "action": "skip",

    "action_parameters": {

        "phase": "current"

    },

    "expression": "http.request.uri.path contains \"/skip-current-ruleset/\"",

    "description": ""

  }'


```

Currently, this skip option is only available at the zone level. Refer to [Available skip options](https://developers.cloudflare.com/waf/custom-rules/skip/options/#skip-the-remaining-custom-rules-current-phase) for more details.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/custom-rules/skip/api-examples/#page","headline":"API examples of custom rules with the Skip action · Cloudflare Web Application Firewall (WAF) docs","description":"API examples for configuring custom rules with the Skip action.","url":"https://developers.cloudflare.com/waf/custom-rules/skip/api-examples/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/custom-rules/","name":"Custom rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/custom-rules/skip/","name":"Configure a rule with the Skip action"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/custom-rules/skip/api-examples/","name":"API examples"}}]}
```
