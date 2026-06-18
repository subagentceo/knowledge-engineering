---
title: Unsafe and custom topic detection
description: Detect unsafe and custom topics in AI application traffic.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Unsafe and custom topic detection

AI Security for Apps can detect when an LLM prompt touches on unsafe or unwanted subjects. There are two layers of topic detection:

* [Default unsafe topics](#default-unsafe-topics): A built-in set of safety categories that detect harmful content such as violent crimes, hate speech, and sexual content.
* [Custom topics](#custom-topics): Topics you define to match your organization's specific policies, such as "competitors" or "financial-advice".

## Default unsafe topics

When AI Security for Apps is enabled, it automatically evaluates prompts against a set of default unsafe topic categories and populates two fields:

* **LLM Unsafe topic detected** ([cf.llm.prompt.unsafe\_topic\_detected](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.llm.prompt.unsafe%5Ftopic%5Fdetected/)): `true` if any unsafe topic was found.
* **LLM Unsafe topic categories** ([cf.llm.prompt.unsafe\_topic\_categories](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.llm.prompt.unsafe%5Ftopic%5Fcategories/)): An array of the specific categories detected.

Default unsafe topic categories

| Category | Description               |
| -------- | ------------------------- |
| S1       | Violent crimes            |
| S2       | Non-violent crimes        |
| S3       | Sex-related crimes        |
| S4       | Child sexual exploitation |
| S5       | Defamation                |
| S6       | Specialized advice        |
| S7       | Privacy                   |
| S8       | Intellectual property     |
| S9       | Indiscriminate weapons    |
| S10      | Hate                      |
| S11      | Suicide and self-harm     |
| S12      | Sexual content            |
| S13      | Elections                 |
| S14      | Code interpreter abuse    |

---

## Custom topics

Custom topic detection lets you define your own topics and AI Security for Apps will score each prompt against them. You can then use these scores in [custom rules](https://developers.cloudflare.com/waf/custom-rules/) or [rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/) to block, challenge, or log requests based on a relevance score that you define.

This capability uses a zero-shot classification model that evaluates prompts at runtime. No model training is required.

### How custom topics work

1. You define a list of up to 20 custom topics. Each topic consists of:  
   * **Label**: A short, hyphenated identifier used in rule expressions and analytics (for example, `financial-advice`).  
   * **Topic description**: The descriptive text the model uses to classify prompts (for example, `seeking financial advice`).
2. When a request arrives at a `cf-llm` labeled endpoint, the model evaluates the prompt against all defined topic descriptions and returns a relevance score for each.
3. Scores are written to the [cf.llm.prompt.custom\_topic\_categories](https://developers.cloudflare.com/waf/detections/ai-security-for-apps/fields/) map field, keyed by label. You use labels (not topic descriptions) in rule expressions and analytics.

Inverted relevance scale

Custom topic scores use an inverted scale, where lower values indicate higher relevance (`1` \= highly relevant, `99` \= not relevant). This is the same convention used by all Application Security scores. When writing rules, use `lt` (less than) to match relevant prompts. For example, `lt 20` matches only highly relevant prompts.

### Define custom topics

You can manage custom topics from two places in the dashboard:

1. **Security Settings page**: Go to **Security** \> **Settings** and search for the **AI Security for Apps** section. Under **Custom Topics**, select **Manage topics** to add, edit, or remove topics.
2. **Expression builder sidebar**: When creating or editing a [custom rule](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/), select the **LLM Custom topic** field. Then, select **Manage custom topics** to open a sidebar where you can manage topics without leaving the rule creation page.

Both methods will update the same underlying topic list. Changes made in one are immediately reflected in the other.

* [ Dashboard ](#tab-panel-11174)
* [ API ](#tab-panel-11175)

1. In the Cloudflare dashboard, go to the Security **Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)  
Alternatively, go to the [custom rules creation page](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/), select the **LLM Custom topic** field, and select **Manage custom topics** to open the sidebar.
2. Add a topic by providing:  
   * **Label**: A short, hyphenated identifier (for example, `competitors`).  
   * **Topic Description**: A descriptive English phrase the model uses for classification (for example, `seeking info on competitors`).
3. Select **Save**.

Update your custom topics list using a `PUT` request:

Terminal window

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/firewall-for-ai/custom-topics" \

  --request PUT \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "topics": [

      {

        "label": "competitors",

        "topic": "seeking info on competitors"

      },

      {

        "label": "financial-advice",

        "topic": "seeking financial advice"

      },

      {

        "label": "hr-internal",

        "topic": "asking about internal HR policies"

      }

    ]

  }'


```

Warning

This request replaces your entire topic list. Include all topics you want to keep, not just new ones.

To retrieve your current topics, use a `GET` request:

Terminal window

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/firewall-for-ai/custom-topics" \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

### Constraints

| Parameter                | Limit                                             |
| ------------------------ | ------------------------------------------------- |
| Maximum number of topics | 20                                                |
| Topic string length      | 2–50 printable ASCII characters                   |
| Label length             | 2–20 characters                                   |
| Label format             | Lowercase letters, numbers, and hyphens (\-) only |

Warning

If you reference a label in a rule expression that has not been defined, the map lookup returns `nil`. Comparisons against `nil` are almost always `false`. For example, `cf.llm.prompt.custom_topic_categories["missing"] >= 0` evaluates to `false`. Make sure the label in your rule expression exactly matches a label you have defined in your custom topics list.

## Best practices for defining custom topics

The quality of custom topic detection depends on how you write your topic descriptions. The underlying model is a zero-shot classifier that compares the semantic meaning of the prompt against your topic description.

The most important thing to do is to describe the user's intent, not just the subject.

### Lead with intent

The model performs semantic classification, not keyword matching. Topic descriptions that capture what the user is _trying to do_ are significantly more accurate than descriptions that simply name a subject area. A short verb phrase (3–6 words) is usually the best trade-off between precision and coverage.

Compare how the same two topic descriptions perform against two prompts that both mention finance but with very different intent:

| Topic description                        | Prompt: _"Should I invest my savings in index funds?"_ | Prompt: _"Our finance team just finished the Q3 report."_                       |
| ---------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------- |
| financial advice (noun only)             | Matches                                                | Also matches. The word "finance" appears, even though no advice is being sought |
| seeking financial advice (intent phrase) | Matches                                                | Correctly ignored. Mentions finance but has no advice-seeking intent            |

#### Example: `competitors`

| Quality | Topic description                  | Why                                                                              |
| ------- | ---------------------------------- | -------------------------------------------------------------------------------- |
| Best    | seeking info on competitors        | Captures intent. Only fires when users are actively asking about competitors     |
| Okay    | Acme Corp, Banana Co, Candy & Sons | Works for known names but misses unnamed competitors and catches casual mentions |
| Avoid   | other companies                    | Far too vague. Matches nearly any prompt that mentions a business                |

#### Example: `financial-advice`

| Quality | Topic description          | Why                                                                                               |
| ------- | -------------------------- | ------------------------------------------------------------------------------------------------- |
| Best    | seeking financial advice   | Intent-driven. Matches users asking for guidance, ignores passive mentions of finance             |
| Okay    | securities and investments | Reasonable subject scope but fires on news articles and factual mentions, not just advice-seeking |
| Avoid   | finance                    | Extremely broad. Matches almost everything from expense reports to pricing questions              |

### More best practices

* **Be specific.** Overly broad topics cause false positives; overly narrow topics cause false negatives.
* **Avoid semantic overlap.** If two topics mean nearly the same thing (for example, `seeking financial advice` and `asking for investment guidance`), they will score similarly on the same prompts and waste your 20-topic budget.
* **Test and iterate.** Send test prompts and review scores in [Security Analytics](https://developers.cloudflare.com/waf/analytics/security-analytics/). You can tune by adjusting the topic description (more or less specific) or the score threshold in your rule (`lt 20` is strict, `lt 50` is permissive).
* **Do not list multiple values in one topic description.** The model only evaluates against the first item in a comma-separated list. For example, `Toyota, Ford, Audi, BMW` will only match prompts about `Toyota` — the remaining items are ignored. Removing the commas does not improve results. Use a single intent-driven phrase such as `seeking info on competitors`, or create separate topics for each value.

### Example custom topics

| Label            | Topic description                               |
| ---------------- | ----------------------------------------------- |
| competitors      | seeking info on competitors                     |
| financial-advice | seeking financial advice                        |
| legal-advice     | asking for legal or regulatory advice           |
| sensitive-data   | requesting passwords or API keys                |
| job-seeking      | asking about job openings or careers            |
| bias             | comparing demographic groups as better or worse |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/detections/ai-security-for-apps/unsafe-topics/#page","headline":"Unsafe and custom topic detection · Cloudflare Web Application Firewall (WAF) docs","description":"Detect unsafe and custom topics in AI application traffic.","url":"https://developers.cloudflare.com/waf/detections/ai-security-for-apps/unsafe-topics/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/detections/","name":"Traffic detections"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/detections/ai-security-for-apps/","name":"AI Security for Apps"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/detections/ai-security-for-apps/unsafe-topics/","name":"Unsafe and custom topic detection"}}]}
```
