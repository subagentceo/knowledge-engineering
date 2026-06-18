---
title: Network Firewall log filters
description: Network Firewall log filters in Zero Trust analytics.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Network Firewall log filters

You can apply [Log filters](https://developers.cloudflare.com/logs/logpush/logpush-job/filters/) to your Logpush job to export only specific Cloudflare Network Firewall events. The examples below show common filter configurations using the Logpush API. Each filter uses a JSON structure with `where` clauses containing `key` (the log field to filter on), `operator` (the comparison, such as `eq` for equals or `!eq` for not equals), and `value` (the value to match).

The filters in this guide use the following log fields:

* `MitigationSystem` — Identifies which Cloudflare system sampled the packet. For Network Firewall events, this value is `magic-firewall`.
* `RulesetID` — The unique identifier of the managed ruleset containing the rule that matched the packet, if any. An empty string indicates no managed ruleset matched.
* `Outcome` — The action that Cloudflare systems took on the packet (`pass` or `drop`).
* `Verdict` — The action that Cloudflare systems determined should be taken on the packet (`pass` or `drop`). For disabled rules, `Verdict` may differ from `Outcome` because the rule evaluated the packet but did not enforce its action.

## Filter by enabled or disabled rules

Use the filter examples below to filter your Cloudflare Network Firewall traffic to display events for enabled or disabled rules.

The example below [creates a Logpush job](https://developers.cloudflare.com/api/resources/logpush/subresources/jobs/methods/create/) that only displays fields relevant to Cloudflare Network Firewall, and the filter only displays events for disabled rules.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Logs Write`

Create Logpush job

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/logpush/jobs" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "destination_conf": "<DESTINATION_CONF>",

    "output_options": {

        "field_names": [

            "ColoName",

            "Datetime",

            "Direction",

            "IPDestinationAddress",

            "IPDestinationSubnet",

            "IPProtocol",

            "IPSourceAddress",

            "IPSourceSubnet",

            "Outcome",

            "RuleID",

            "RulesetID",

            "SampleInterval",

            "Verdict"

        ]

    },

    "filter": "{\"where\":{\"or\":[{\"and\":[{\"key\":\"MitigationSystem\",\"operator\":\"eq\",\"value\":\"magic-firewall\"},{\"key\":\"RulesetID\",\"operator\":\"!eq\",\"value\":\"\"},{\"key\":\"Outcome\",\"operator\":\"eq\",\"value\":\"pass\"},{\"key\":\"Verdict\",\"operator\":\"eq\",\"value\":\"drop\"}]}]}}"

  }'


```

The example below [creates a Logpush job](https://developers.cloudflare.com/api/resources/logpush/subresources/jobs/methods/create/) that only displays fields relevant to Cloudflare Network Firewall, and the filter only displays events for enabled rules.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Logs Write`

Create Logpush job

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/logpush/jobs" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "destination_conf": "<DESTINATION_CONF>",

    "output_options": {

        "field_names": [

            "ColoName",

            "Datetime",

            "Direction",

            "IPDestinationAddress",

            "IPDestinationSubnet",

            "IPProtocol",

            "IPSourceAddress",

            "IPSourceSubnet",

            "Outcome",

            "RuleID",

            "RulesetID",

            "SampleInterval",

            "Verdict"

        ]

    },

    "filter": "{\"where\":{\"or\":[{\"and\":[{\"key\":\"MitigationSystem\",\"operator\":\"eq\",\"value\":\"magic-firewall\"},{\"key\":\"RulesetID\",\"operator\":\"!eq\",\"value\":\"\"},{\"or\":[{\"key\":\"Outcome\",\"operator\":\"eq\",\"value\":\"drop\"},{\"key\":\"Verdict\",\"operator\":\"eq\",\"value\":\"pass\"}]}]}]}}"

  }'


```

## Filter by allowed or blocked traffic

Use the filter examples below to filter your Cloudflare Network Firewall traffic to display events for allowed or blocked traffic.

The example below [creates a Logpush job](https://developers.cloudflare.com/api/resources/logpush/subresources/jobs/methods/create/) that only displays fields relevant to Cloudflare Network Firewall, and the filter only displays events where no explicit action was taken — that is, a packet passed through the firewall without matching any rule. By default, Cloudflare Network Firewall permits unmatched traffic. This is identified by an empty `RulesetID`.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Logs Write`

Create Logpush job

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/logpush/jobs" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "destination_conf": "<DESTINATION_CONF>",

    "output_options": {

        "field_names": [

            "ColoName",

            "Datetime",

            "Direction",

            "IPDestinationAddress",

            "IPDestinationSubnet",

            "IPProtocol",

            "IPSourceAddress",

            "IPSourceSubnet",

            "Outcome",

            "RuleID",

            "RulesetID",

            "SampleInterval",

            "Verdict"

        ]

    },

    "filter": "{\"where\":{\"and\":[{\"key\":\"MitigationSystem\",\"operator\":\"eq\",\"value\":\"magic-firewall\"},{\"key\":\"RulesetID\",\"operator\":\"eq\",\"value\":\"\"}]}}"

  }'


```

The example below [creates a Logpush job](https://developers.cloudflare.com/api/resources/logpush/subresources/jobs/methods/create/) that only displays fields relevant to Cloudflare Network Firewall, and the filter only displays events where explicit action was taken. The example includes both enabled and disabled Cloudflare Network Firewall rules.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Logs Write`

Create Logpush job

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/logpush/jobs" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "destination_conf": "<DESTINATION_CONF>",

    "output_options": {

        "field_names": [

            "ColoName",

            "Datetime",

            "Direction",

            "IPDestinationAddress",

            "IPDestinationSubnet",

            "IPProtocol",

            "IPSourceAddress",

            "IPSourceSubnet",

            "Outcome",

            "RuleID",

            "RulesetID",

            "SampleInterval",

            "Verdict"

        ]

    },

    "filter": "{\"where\":{\"and\":[{\"key\":\"MitigationSystem\",\"operator\":\"eq\",\"value\":\"magic-firewall\"},{\"key\":\"RulesetID\",\"operator\":\"!eq\",\"value\":\"\"}]}}"

  }'


```

## Filter to only Network Firewall events

If your Logpush job includes events from multiple Cloudflare mitigation systems, use the filter below to include only Cloudflare Network Firewall events. The example below [creates a Logpush job](https://developers.cloudflare.com/api/resources/logpush/subresources/jobs/methods/create/) that filters on `MitigationSystem` to include only Network Firewall traffic.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Logs Write`

Create Logpush job

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/logpush/jobs" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "destination_conf": "<DESTINATION_CONF>",

    "output_options": {

        "field_names": [

            "ColoName",

            "Datetime",

            "Direction",

            "IPDestinationAddress",

            "IPDestinationSubnet",

            "IPProtocol",

            "IPSourceAddress",

            "IPSourceSubnet",

            "Outcome",

            "RuleID",

            "RulesetID",

            "SampleInterval",

            "Verdict"

        ]

    },

    "filter": "{\"where\":{\"key\":\"MitigationSystem\",\"operator\":\"eq\",\"value\":\"magic-firewall\"}}"

  }'


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/insights/logs/logpush/network-firewall-log-filters/#page","headline":"Network Firewall log filters · Cloudflare One docs","description":"Network Firewall log filters in Zero Trust analytics.","url":"https://developers.cloudflare.com/cloudflare-one/insights/logs/logpush/network-firewall-log-filters/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-29","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Logging"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/insights/","name":"Insights"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/insights/logs/","name":"Logs"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/insights/logs/logpush/","name":"Logpush integration"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/insights/logs/logpush/network-firewall-log-filters/","name":"Network Firewall log filters"}}]}
```
