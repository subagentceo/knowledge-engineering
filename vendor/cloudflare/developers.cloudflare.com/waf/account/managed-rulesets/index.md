---
title: Managed rulesets
description: Deploy and manage WAF managed rulesets at the account level.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Managed rulesets

Note

This feature requires an Enterprise plan.

Cloudflare provides pre-configured managed rulesets that protect against web application exploits such as the following:

* Zero-day vulnerabilities
* Top-10 attack techniques
* Use of stolen/leaked credentials
* Extraction of sensitive data

Managed rulesets are [regularly updated](https://developers.cloudflare.com/waf/change-log/). Each rule has a default action that varies according to the severity of the rule. You can adjust the behavior of specific rules, choosing from several possible actions.

Rules of managed rulesets have associated tags (such as `wordpress`) that allow you to search for a specific group of rules and configure them in bulk.

## Account-level deployment

At the zone level, each [WAF managed ruleset](https://developers.cloudflare.com/waf/managed-rules/#available-managed-rulesets) can only be deployed once. At the account level, you can deploy each managed ruleset more than once. This allows you to apply the same ruleset with different configurations to different subsets of incoming traffic across the Enterprise zones in your account.

For example, you could deploy the [Cloudflare OWASP Core Ruleset](https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/) multiple times with different [paranoia levels](https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/concepts/#paranoia-level) and a different action (_Managed Challenge_ action for PL3 and _Log_ action for PL4). Higher paranoia levels enable additional rules that are more likely to produce false positives.

Example: Deploy OWASP with two different configurations

The following example deploys the [Cloudflare OWASP Core Ruleset](https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/) multiple times at the account level through the following [execute rules](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/deploy-managed-ruleset/):

* First execute rule: Enable OWASP rules up to paranoia level 3 (PL3) and set the action to _Managed Challenge_.
* Second execute rule: Enable OWASP rules up to PL4 and set the action to _Log_.

This configuration gives you additional protection by enabling PL3 rules, but without blocking the requests, since higher paranoia levels are more prone to false positives.

The second rule logs any matches for PL4 rules, the most strict set of rules in the ruleset, so that it does not affect live traffic. You could use this configuration to understand which traffic would be affected by PL4 rules.

* [ Dashboard ](#tab-panel-11147)
* [ API ](#tab-panel-11148)

1. Deploy the Cloudflare OWASP Core Ruleset by following the [dashboard instructions](https://developers.cloudflare.com/waf/account/managed-rulesets/deploy-dashboard/#deploy-a-managed-ruleset), customizing the ruleset behavior using these settings:  
   * **OWASP Anomaly Score Threshold**: _Medium - 40 and higher_  
   * **OWASP Paranoia Level**: _PL3_  
   * **OWASP Action**: _Managed Challenge_
2. Select **Deploy**.
3. Repeat the deployment procedure for the OWASP ruleset, but with following ruleset configuration:  
   * **OWASP Anomaly Score Threshold**: _Medium - 40 and higher_  
   * **OWASP Paranoia Level**: _PL4_  
   * **OWASP Action**: _Log_

Once you finish your configuration, the **Deployed managed rulesets** list will show two _Execute_ rules for the Cloudflare OWASP Core Ruleset.

The following `POST` request for the [Create an account ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/create/) operation creates an [entry point ruleset](https://developers.cloudflare.com/ruleset-engine/about/rulesets/#entry-point-ruleset) for the `http_request_firewall_managed` [phase](https://developers.cloudflare.com/ruleset-engine/about/phases/) at the account level. The ruleset includes two rules deploying the Cloudflare OWASP Core Ruleset twice with different configurations.

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

    "name": "My ruleset",

    "description": "Entry point ruleset for WAF managed rulesets (account)",

    "kind": "root",

    "phase": "http_request_firewall_managed",

    "rules": [

        {

            "action": "execute",

            "action_parameters": {

                "id": "4814384a9e5d4991b9815dcfc25d2f1f",

                "overrides": {

                    "categories": [

                        {

                            "category": "paranoia-level-4",

                            "enabled": false

                        }

                    ],

                    "rules": [

                        {

                            "id": "6179ae15870a4bb7b2d480d4843b323c",

                            "action": "managed_challenge"

                        }

                    ]

                }

            },

            "expression": "cf.zone.plan eq \"ENT\"",

            "description": "Execute OWASP ruleset at PL3 with Managed Challenge action"

        },

        {

            "action": "execute",

            "action_parameters": {

                "id": "4814384a9e5d4991b9815dcfc25d2f1f",

                "overrides": {

                    "rules": [

                        {

                            "id": "6179ae15870a4bb7b2d480d4843b323c",

                            "action": "log"

                        }

                    ]

                }

            },

            "expression": "cf.zone.plan eq \"ENT\"",

            "description": "Execute OWASP ruleset at PL4 with Log action"

        }

    ]

  }'


```

## Customize the behavior of managed rulesets

To customize the behavior of managed rulesets, do one of the following:

* [Create exceptions](https://developers.cloudflare.com/waf/managed-rules/waf-exceptions/) to skip the execution of managed rulesets or some of their rules under certain conditions.
* [Configure overrides](https://developers.cloudflare.com/waf/account/managed-rulesets/deploy-dashboard/#configure-a-managed-ruleset) to change the rule action or disable one or more rules of managed rulesets. Overrides can affect an entire managed ruleset, specific tags, or specific rules in the managed ruleset.

Exceptions have priority over overrides.

Important

Ruleset overrides and tag overrides apply to both existing and _future_ rules in the managed ruleset. If you want to override existing rules only, you must use rule overrides.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/account/managed-rulesets/#page","headline":"Managed rulesets · Cloudflare Web Application Firewall (WAF) docs","description":"Deploy and manage WAF managed rulesets at the account level.","url":"https://developers.cloudflare.com/waf/account/managed-rulesets/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/account/","name":"Account-level WAF configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/account/managed-rulesets/","name":"Managed rulesets"}}]}
```
