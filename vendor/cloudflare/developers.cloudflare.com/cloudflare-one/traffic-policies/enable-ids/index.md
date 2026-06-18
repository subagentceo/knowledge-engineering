---
title: Enable IDS
description: Enable IDS in Gateway.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Enable IDS

Cloudflare's Intrusion Detection System (IDS) is a Cloudflare Advanced Network Firewall feature you can use to actively monitor for a wide range of known threat signatures in your traffic. An IDS expands the security coverage of a firewall to analyze traffic against a broader threat database, detecting a variety of sophisticated attacks such as ransomware, data exfiltration, and network scanning based on signatures or “fingerprints” in network traffic.

With Cloudflare's global anycast network, you get:

* Cloudflare's entire global network capacity is now the capacity of your IDS.
* Built-in redundancy and failover. Every server runs Cloudflare's IDS software, and traffic is automatically attracted to the closest network location to its source.
* Continuous deployment for improvements to Cloudflare's IDS capabilities.

Refer to [Enable IDS](https://developers.cloudflare.com/cloudflare-one/traffic-policies/enable-ids/#enable-ids) for more information on enabling IDS and creating new rulesets. After IDS is enabled, your traffic will be scanned to find malicious traffic. The detections are logged to destinations that can be configured from the dashboard. Refer to [IDS logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/logpush/ids-logs/) for instructions on configuring a destination to receive the detections. Additionally, all traffic that is analyzed can be accessed via [network analytics](https://developers.cloudflare.com/analytics/network-analytics/). Refer to [GraphQL Analytics](https://developers.cloudflare.com/cloudflare-network-firewall/tutorials/graphql-analytics/) to query the analytics data.

Cloudflare's IDS takes advantage of the threat intelligence powered by our global network and extends the capabilities of the Cloudflare Firewall to monitor and protect your network from malicious actors.

## Enable IDS

You can enable IDS through the dashboard or via the API.

Note

This feature is available for Cloudflare Advanced Network Firewall users. For access, contact your account team.

* [ Dashboard ](#tab-panel-7604)
* [ API ](#tab-panel-7605)

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Traffic policies**.
2. Select **Policy settings** and turn on **IDS**.

To start using IDS via the API, first create a new ruleset in the `magic-transit-ids-managed` phase with a rule which is enabled.

1. Follow instructions in the [Rulesets Engine Page](https://developers.cloudflare.com/ruleset-engine/basic-operations/view-rulesets/) to view all rulesets for your account. You must see a ruleset with phase `magic-transit-ids-managed` and kind `managed`. If not, please contact your account team. The managed ruleset ID will be used in the next step.
2. Create a new root ruleset with a single rule in the `magic_transit_ids_managed` phase by running:

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/{account_id}/rulesets \

--header "Authorization: Bearer <API_TOKEN>" \

--header "Content-Type: application/json" \

--data '{

  "name": "IDS Execute ruleset",

  "description": "Ruleset to enable IDS",

  "kind": "root",

  "phase": "magic_transit_ids_managed",

  "rules": [

    {

      "enabled": true,

      "expression": "true",

      "action": "execute",

      "description": "enable ids",

      "action_parameters": {

        "id": "${managed_ruleset_id}"

      }

    }

  ]

}'


```

With this ruleset added, IDS will start inspecting packets and report any anomalous traffic. Next, you can [configure Logpush](https://developers.cloudflare.com/cloudflare-network-firewall/how-to/use-logpush-with-ids/) to start receiving details about the anomalous traffic.

1. Use the rule created in the previous step to enable or disable IDS. The Rulesets API documentation describes [how to patch a rule](https://developers.cloudflare.com/ruleset-engine/rulesets-api/update-rule/).  
    
 For example, the following patch request to set the `enabled` field to `false` will disable IDS. The ruleset and rule ID from the ruleset created in the previous step are used below.

Terminal window

```

curl --request PATCH \

https://api.cloudflare.com/client/v4/accounts/{account_id}/rulesets/{root_ruleset_id}/rules/{rule_id} \

--header "Authorization: Bearer <API_TOKEN>" \

--header "Content-Type: application/json" \

--data '{

  "enabled": false,

  "expression": "true",

  "action": "execute",

  "action_parameters": {

    "id": "${managed_ruleset_id}"

  }

}'


```

Similarly, sending a patch request with the `enabled` field set to `true` will enable IDS.

## IDS rules

IDS rules are run on a subset of packets. IDS also supports the current flows:

* Cloudflare WAN to Cloudflare WAN.
* Magic Transit ingress traffic (when egress traffic is handled through direct server return).
* Magic Transit ingress and egress traffic when Magic Transit has the [Egress option enabled](https://developers.cloudflare.com/reference-architecture/architectures/magic-transit/#magic-transit-with-egress-option-enabled).

## Next steps

You must configure Logpush to log detected risks. Refer to [Configure a Logpush destination](https://developers.cloudflare.com/cloudflare-network-firewall/how-to/use-logpush-with-ids/) for more information. Additionally, all traffic that is analyzed can be accessed via [network analytics](https://developers.cloudflare.com/analytics/network-analytics/). Refer to [GraphQL Analytics](https://developers.cloudflare.com/cloudflare-network-firewall/tutorials/graphql-analytics/) to query the analytics data.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/enable-ids/#page","headline":"Enable Intrusion Detection System (IDS) · Cloudflare One docs","description":"Enable IDS in Gateway.","url":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/enable-ids/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-22","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["REST API","Logging"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/traffic-policies/","name":"Traffic policies"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/traffic-policies/enable-ids/","name":"Enable IDS"}}]}
```
