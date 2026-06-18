---
title: Redirects for AI Training
description: Redirect AI training crawlers to canonical URLs.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-crawl-control/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Redirects for AI Training

Redirects for AI Training enforces your existing `<link rel="canonical">` tags as 301 redirects for [verified AI training crawlers](https://developers.cloudflare.com/bots/concepts/bot/#verified-bots). When a verified bot with the [AI Crawler category](https://developers.cloudflare.com/bots/concepts/bot/verified-bots/#categories) requests a page whose canonical tag points to a different same-origin URL, Cloudflare returns a `301 Moved Permanently` to the canonical. All other visitors—browsers, search engines, [AI Assistants](https://developers.cloudflare.com/bots/concepts/bot/verified-bots/#categories)—receive the original page unchanged.

To learn more about why this feature can be useful, refer to the [announcement blog post ↗](https://blog.cloudflare.com/ai-redirects/).

## Enable Redirects for AI Training

Redirects for AI Training is available as a toggle in **AI Crawl Control** \> **Quick Actions**, alongside [Markdown for Agents](https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/) and [Managed robots.txt](https://developers.cloudflare.com/bots/additional-configurations/managed-robots-txt/).

* [ Dashboard ](#tab-panel-6524)
* [ API ](#tab-panel-6525)
* [ Custom Hostnames ](#tab-panel-6526)

To enable Redirects for AI Training for your zone in the dashboard:

1. Log into the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and select your account (you need a Pro or Business plan).
2. Select the zone you want to configure.
3. Visit the [AI Crawl Control ↗](https://dash.cloudflare.com/?to=/:account/:zone/ai) section.
4. Enable **Redirects for AI Training**.

### Enable for specific subdomains or paths

To enable Redirects for AI Training for specific subdomains or paths instead of your entire zone, create a [configuration rule](https://developers.cloudflare.com/rules/configuration-rules/):

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and select your account.
2. Select the zone you want to configure.
3. Go to **Rules** \> **Overview** and select **Create rule** \> **Configuration Rules**.
4. Under **When incoming requests match**, build an expression to match your subdomain (for example, `http.host eq "docs.example.com"`) or path.
5. Under **Then the settings are**, select **Add setting** \> **Redirects for AI Training** and set it to **On**.
6. Select **Deploy**.

To enable Redirects for AI Training for your zone using APIs, send a `PATCH` to `/client/v4/zones/{zone_tag}/settings/redirects_for_ai_training` with the payload `{"value": "on"}` to the Cloudflare API.

You will need to create an API token with the Zone Settings edit permissions enabled.

Example:

Enable Redirects for AI Training

```

curl -X PATCH 'https://api.cloudflare.com/client/v4/zones/{zone_tag}/settings/redirects_for_ai_training' \

  --header 'Content-Type: application/json' \

  --header "Authorization: Bearer {api_token}" --data-raw '{"value": "on"}'


```

### Enable for specific subdomains or paths

To enable Redirects for AI Training for specific subdomains or paths instead of your entire zone, create a [configuration rule](https://developers.cloudflare.com/rules/configuration-rules/create-api/):

Enable Redirects for AI Training for a subdomain

```

curl --request PUT \

  --url "https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets/phases/http_config_settings/entrypoint" \

  --header "Authorization: Bearer {api_token}" \

  --header "Content-Type: application/json" \

  --data '{

    "rules": [{

      "expression": "http.host eq \"docs.example.com\"",

      "action": "set_config",

      "action_parameters": {

        "redirects_for_ai_training": true

      },

      "description": "Enable Redirects for AI Training for docs subdomain"

    }]

  }'


```

You can also use path-based expressions like `starts_with(http.request.uri.path, "/docs/")`. For more information on building expressions, refer to [Rules language](https://developers.cloudflare.com/ruleset-engine/rules-language/).

If you are using [Cloudflare for SaaS](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/) and want to enable Redirects for AI Training for your [custom hostnames](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/), you have two options:

### Enable for all custom hostnames

To enable Redirects for AI Training for all custom hostnames on your SaaS zone:

1. Log into the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and select your account.
2. Select your SaaS zone.
3. Look for **Quick Actions**.
4. Toggle the **Redirects for AI Training** button to enable.

### Enable for specific custom hostnames

Enabling Redirects for AI Training for specific custom hostnames requires an [advanced subscription](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/plans/) with access to [custom metadata](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/custom-metadata/).

#### Step 1: Set custom metadata on the custom hostname

When creating or updating a custom hostname via API, add `redirects_for_ai_training` to the `custom_metadata` object:

Terminal window

```

curl --request PATCH \

  --url "https://api.cloudflare.com/client/v4/zones/{zone_id}/custom_hostnames/{custom_hostname_id}" \

  --header "Authorization: Bearer {api_token}" \

  --header "Content-Type: application/json" \

  --data '{

    "custom_metadata": {

      "redirects_for_ai_training": "enabled"

    }

  }'


```

#### Step 2: Create a Configuration Rule

Create a Configuration Rule on your SaaS zone that matches custom hostnames with the metadata and enables the feature:

Terminal window

```

curl --request PUT \

  --url "https://api.cloudflare.com/client/v4/zones/{zone_id}/rulesets/phases/http_config_settings/entrypoint" \

  --header "Authorization: Bearer {api_token}" \

  --header "Content-Type: application/json" \

  --data '{

    "rules": [{

      "expression": "lookup_json_string(cf.hostname.metadata, \"redirects_for_ai_training\") eq \"enabled\"",

      "action": "set_config",

      "action_parameters": {

        "redirects_for_ai_training": true

      },

      "description": "Enable Redirects for AI Training for opted-in custom hostnames"

    }]

  }'


```

This will enable the feature on custom hostnames that have the `redirects_for_ai_training` custom metadata tag set.

## How it works

Cloudflare inspects the origin HTML response to verified AI training crawlers and:

1. Stream-parses the `<head>` of the origin response to extract `<link rel="canonical" href="https://developers.cloudflare.com/ai-crawl-control/reference/redirects-for-ai-training/...">`
2. Resolves relative canonical URLs against the request URL
3. Validates that the canonical URL is same-origin and differs from the current URL
4. Returns a `301` redirect to the canonical URL

If no canonical tag is found, the canonical is cross-origin, or the page is self-canonical, the origin response passes through unchanged.

Interaction with Markdown for Agents

Redirects for AI Training operates on the origin HTML response before [Markdown for Agents](https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/) content conversion runs. If a crawler requests `text/markdown` and the origin returns HTML with a non-self canonical tag, the 301 redirect is issued based on the original HTML. Markdown conversion only applies to responses that are not redirected.

### Canonical tag parsing

The feature parses the `<link rel="canonical">` tag from the `<head>` section of the origin response:

```

<!DOCTYPE html>

<html>

<head>

  <link rel="canonical" href="https://example.com/current-version">

</head>

<body>

  <!-- Page content -->

</body>

</html>


```

Both absolute and relative URLs are supported:

```

<!-- Absolute URL -->

<link rel="canonical" href="https://example.com/page">


<!-- Relative URL (resolved against request URL) -->

<link rel="canonical" href="/current-page">


```

### Interaction with other redirect features

Redirects for AI Training operates at a different layer than [Single Redirects](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/) and [Bulk Redirects](https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/). Those redirect rules execute before the origin is contacted. Redirects for AI Training executes after the origin responds, because it needs to read the canonical tag from the origin HTML.

If a Single Redirect or Bulk Redirect matches first, the request is redirected before Redirects for AI Training has a chance to evaluate it.

## Availability

Available on Pro, Business, and Enterprise plans at no additional cost.

## Limitations

* Only HTML responses (`content-type: text/html`) from the origin are evaluated. Other content types pass through unchanged.
* The canonical tag must appear within the first 256 KB of the uncompressed HTML response body.
* Only same-origin canonical URLs trigger a redirect. Cross-origin canonicals are ignored.
* Only [verified bots](https://developers.cloudflare.com/bots/concepts/bot/#verified-bots) with the [AI Crawler category](https://developers.cloudflare.com/bots/concepts/bot/verified-bots/#categories) are redirected. [AI Assistants and AI Search bots](https://developers.cloudflare.com/bots/concepts/bot/verified-bots/#categories) are not affected.
* Self-canonical pages (where the canonical URL matches the request URL) are not redirected.
* Best-effort loop detection uses the `Referer` header. If a crawler was just redirected from the canonical URL back to the current page, the origin HTML is served instead of redirecting. This handles common two-page canonical misconfigurations (Page A canonical points to Page B, Page B canonical points to Page A).

## Logging

When a redirect is issued, Cloudflare logs the canonical target URL in your HTTP request logs via the `redirects_for_ai_training_target` field. You can use the [GraphQL Analytics API](https://developers.cloudflare.com/ai-crawl-control/reference/graphql-api/) or [Logpush](https://developers.cloudflare.com/logs/logpush/) to query this data.

## Related

* [Manage AI crawlers](https://developers.cloudflare.com/ai-crawl-control/features/manage-ai-crawlers/) \- Set allow or block rules per crawler
* [Analyze AI traffic](https://developers.cloudflare.com/ai-crawl-control/features/analyze-ai-traffic/) \- View request metrics by crawler, operator, and content type
* [Markdown for Agents](https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/) \- Serve HTML as markdown via content negotiation
* [Content Signals Policy ↗](https://contentsignals.org/) \- Signal post-access content usage preferences in `robots.txt`
* [Directives](https://developers.cloudflare.com/ai-crawl-control/features/track-robots-txt/) \- Monitor `robots.txt` compliance and check Agent Readiness
* [Single Redirects](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/) \- Rule-based URL redirects that execute before origin
* [Verified bots](https://developers.cloudflare.com/bots/concepts/bot/verified-bots/#categories) \- Bot categories including AI Crawler, AI Assistant, and AI Search

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-crawl-control/reference/redirects-for-ai-training/#page","headline":"Redirects for AI Training · Cloudflare AI Crawl Control docs","description":"Redirect AI training crawlers to canonical URLs.","url":"https://developers.cloudflare.com/ai-crawl-control/reference/redirects-for-ai-training/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-crawl-control/","name":"AI Crawl Control"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-crawl-control/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-crawl-control/reference/redirects-for-ai-training/","name":"Redirects for AI Training"}}]}
```
