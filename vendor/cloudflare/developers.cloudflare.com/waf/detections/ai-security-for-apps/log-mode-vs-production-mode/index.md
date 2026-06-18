---
title: Log mode versus production mode
description: Differences between log mode and production mode for AI security detections.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Log mode versus production mode

AI Security for Apps can operate in two distinct modes. Understanding the trade-offs between them helps you choose the right approach for your stage of deployment.

## Comparison

| Feature                | Production mode                                                                                                               | Log mode                                                                                                                                      |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **How it works**       | You write WAF [custom rules](https://developers.cloudflare.com/waf/custom-rules/) using AI Security for Apps detection fields | You enable the AI Security Log Mode Ruleset with pre-built rules                                                                              |
| **Prompt logging**     | No — only request metadata is logged                                                                                          | Yes — the full request body is logged (encrypted via [payload logging](https://developers.cloudflare.com/waf/managed-rules/payload-logging/)) |
| **Response logging**   | No — use [AI Gateway](https://developers.cloudflare.com/ai-gateway/) if response visibility is required                       | No — same limitation                                                                                                                          |
| **Policy flexibility** | Full — combine injection scores, PII categories, bot scores, custom topics, and more                                          | Limited — three fixed rules (PII detected, unsafe topic detected, prompt injection detected) with no score-based or subcategory logic         |
| **Blocking behavior**  | Customizable — issue custom responses including custom JSON                                                                   | Default WAF block page only                                                                                                                   |
| **Best for**           | Production traffic with granular control                                                                                      | Evaluation and testing — correlate prompts with detection results to tune thresholds                                                          |

## Production mode

Production mode is the standard operating mode. You enable AI Security for Apps and create [custom rules](https://developers.cloudflare.com/waf/custom-rules/) using the [detection fields](https://developers.cloudflare.com/waf/detections/ai-security-for-apps/fields/) it populates. This gives you full control over:

* **Which detections trigger an action.** For example, block only when `cf.llm.prompt.injection_score` is below 30, rather than blocking any detection.
* **Which PII categories matter.** For example, block `CREDIT_CARD` but only log `EMAIL_ADDRESS`.
* **Combining signals.** For example, block when both PII is detected and the bot score is low.
* **Custom responses.** Return a JSON error message to your application instead of the default WAF block page.

Example production rule expression:  
`(cf.llm.prompt.injection_score lt 30 and cf.bot_management.score lt 20)`

Limitation

In production mode, the prompt text is not logged. You can see detection metadata (scores, categories) in [Security Analytics](https://developers.cloudflare.com/waf/analytics/security-analytics/), but not the actual prompt content.

## Log mode

Log mode uses the AI Security Log Mode Ruleset — a pre-built ruleset that logs the full request body alongside detection results. This mode is designed for evaluation and tuning rather than production enforcement.

In log mode:

* The managed ruleset fires on three broad conditions: PII detected, unsafe topic detected, and prompt injection detected.
* The entire request body is logged using [payload logging](https://developers.cloudflare.com/waf/managed-rules/payload-logging/) (encrypted — you must configure a key pair to decrypt payloads).
* You can correlate specific prompts with their detection scores to understand how the model classifies your traffic.

**When to use log mode:**

* During initial deployment, to understand what AI Security for Apps detects on your traffic before enforcing actions.
* When tuning score thresholds — review logged prompts alongside their scores to determine appropriate thresholds.
* When validating that [custom topic](https://developers.cloudflare.com/waf/detections/ai-security-for-apps/unsafe-topics/#custom-topics) definitions are working as expected.

### Enable log mode

* [ Dashboard ](#tab-panel-11172)
* [ API ](#tab-panel-11173)

1. In the Cloudflare dashboard, go to the Security **Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. Under **AI Security for Apps**, find the **Managed Ruleset** section.
3. Enable the **AI Security Log Mode Ruleset**.
4. Set the action to _Log_.
5. (Recommended) Configure [payload logging](https://developers.cloudflare.com/waf/managed-rules/payload-logging/) so you can decrypt and view the full prompt content alongside detection results.

Deploy the managed ruleset using a `PUT` request:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Zone WAF Write`
* `Account WAF Write`

Update a zone entry point ruleset

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/phases/http_request_firewall_managed/entrypoint" \

  --request PUT \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "rules": [

        {

            "action": "execute",

            "action_parameters": {

                "id": "b7cd52df92f74c848cec0c2ed385e336"

            },

            "expression": "true"

        }

    ]

  }'


```

The ID of the AI Security Log Mode Ruleset is ...d385e336 .

To set individual rule actions to `log`, override the rules within the managed ruleset using `action_parameters.overrides`. For more information, refer to [Override a managed ruleset](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/override-managed-ruleset/).

Warning

Since the managed ruleset uses broad, binary detection logic (detected/not detected), it can be too aggressive for production traffic. Without score-based thresholds, you should expect a higher rate of false positives if the action is set to _Block_.

## Recommended workflow

1. **Start in log mode.** Enable the AI Security Log Mode Ruleset with the action set to _Log_. Configure [payload logging](https://developers.cloudflare.com/waf/managed-rules/payload-logging/) so you can view prompts alongside detection results.
2. **Review detections in [Security Analytics](https://developers.cloudflare.com/waf/analytics/security-analytics/).** Filter on events from the managed ruleset. Decrypt payloads and review the prompts that triggered detections. Note the scores to understand where to set thresholds.
3. **Build production rules.** Based on your analysis, [create custom rules](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/) with appropriate score thresholds and PII category filters.
4. **Disable log mode.** Once your production rules are deployed and validated, disable the managed ruleset or keep it on _Log_ as ongoing monitoring.
5. **Monitor and iterate.** Continuously review detection events in [Security Analytics](https://developers.cloudflare.com/waf/analytics/security-analytics/) and adjust thresholds as your traffic patterns evolve.

Note

You can run both modes simultaneously during a transition period. The managed ruleset (log mode) operates in the managed rules phase, while your custom rules operate in the custom rules phase. Custom rules are evaluated before managed rules — if a custom rule blocks a request, it will not reach the managed ruleset. During evaluation, consider setting your custom rules to _Log_ as well.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/detections/ai-security-for-apps/log-mode-vs-production-mode/#page","headline":"Log mode versus production mode · Cloudflare Web Application Firewall (WAF) docs","description":"Differences between log mode and production mode for AI security detections.","url":"https://developers.cloudflare.com/waf/detections/ai-security-for-apps/log-mode-vs-production-mode/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/detections/","name":"Traffic detections"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/detections/ai-security-for-apps/","name":"AI Security for Apps"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/detections/ai-security-for-apps/log-mode-vs-production-mode/","name":"Log mode versus production mode"}}]}
```
