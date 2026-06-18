---
title: Export to PostHog
description: Send OpenTelemetry logs from Cloudflare Workers to PostHog for analytics.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Export to PostHog

PostHog is a product analytics platform that helps you understand user behavior and debug issues. By exporting your Cloudflare Workers application telemetry to PostHog, you can:

* Correlate logs with user sessions, events, and error tracking data
* Query and filter logs by severity, attributes, and custom properties
* Connect application logs to session replays for full debugging context
![PostHog logs view with attributes expanded and a timeline view at the top](https://developers.cloudflare.com/_astro/posthog-example.DhJh65s7_Z1PeQj6.webp) 

This guide will walk you through configuring your Cloudflare Worker application to export OpenTelemetry-compliant logs to PostHog.

## Prerequisites

Before you begin, ensure you have:

* An active [PostHog account ↗](https://app.posthog.com/signup) (free tier available)
* A deployed Worker that you want to monitor
* Your PostHog project API key

## Step 1: Get your PostHog project API key

1. Log in to your [PostHog account ↗](https://app.posthog.com/)
2. Navigate to the [**Project settings** ↗](https://app.posthog.com/settings/project)
3. Find your **Project API key** in the project details section
4. Copy the API key - this is the same key used for capturing events and exceptions

The API key should look something like: `phc_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

## Step 2: Determine your PostHog region endpoint

PostHog has different endpoints depending on your data region:

| Region           | Logs Endpoint                      |
| ---------------- | ---------------------------------- |
| **US** (default) | https://us.i.posthog.com/i/v1/logs |
| **EU**           | https://eu.i.posthog.com/i/v1/logs |

You can find your region in your PostHog project settings or by checking the URL when logged into PostHog (either `us.posthog.com` or `eu.posthog.com`).

## Step 3: Configure Cloudflare Logs destination

Warning

Cloudflare Workers Observability only supports exporting **logs** to PostHog at this time. Exporting **traces** to PostHog is not currently supported.

Now you'll create a destination in the Cloudflare dashboard that points to PostHog.

1. Navigate to your Cloudflare account's [Workers Observability ↗](https://dash.cloudflare.com/?to=/:account/workers-and-pages/observability/pipelines) section
2. Click **Add destination**
3. Configure your logs destination:  
   * **Destination Name**: `posthog-logs` (or any descriptive name)  
   * **Destination Type**: Select **Logs**  
   * **OTLP Endpoint**: Your PostHog logs endpoint (e.g., `https://us.i.posthog.com/i/v1/logs` or `https://eu.i.posthog.com/i/v1/logs`)  
   * **Custom Headers**: Add the authentication header:  
         * Header name: `Authorization`  
         * Header value: `Bearer <your-project-api-key>` (e.g., `Bearer phc_xxxxx...`)
4. Click **Save**
![Cloudflare destination configuration for PostHog logs with destination name, type selection, OTLP endpoint, and custom headers](https://developers.cloudflare.com/_astro/posthog-example-destination-modal.Dkn5CFBP_ZTWDAQ.webp) 

## Step 4: Configure your Worker

With your destination created in the Cloudflare dashboard, update your Worker's configuration to enable logs export.

* [  wrangler.jsonc ](#tab-panel-11850)
* [  wrangler.toml ](#tab-panel-11851)

JSONC

```

{

  "observability": {

    "logs": {

      "enabled": true,

      // Must match the destination name in the dashboard

      "destinations": ["posthog-logs"]

    }

  }

}


```

TOML

```

[observability.logs]

enabled = true

destinations = [ "posthog-logs" ]


```

After updating your configuration, deploy your Worker for the changes to take effect.

Note

It may take a few minutes after deployment for logs to appear in PostHog.

## Step 5: View logs in PostHog

Once your Worker is deployed and receiving traffic:

1. Log in to your [PostHog account ↗](https://app.posthog.com/)
2. Navigate to the **Logs** section in the left sidebar
3. Your Worker logs will appear with severity levels, timestamps, and attributes

You can filter logs by:

* **Severity level** (trace, debug, info, warn, error, fatal)
* **Time range**
* **Custom attributes** added to your log entries
* **Keywords** in log messages

## Adding custom attributes to logs

You can add custom attributes to your logs using standard `console` methods with structured data:

JavaScript

```

export default {

  async fetch(request, env) {

    // Basic logging

    console.log("Processing request");


    // Logs with additional context

    console.info("User action", {

      userId: "user_123",

      action: "api_call",

      path: new URL(request.url).pathname

    });


    // Error logging with details

    console.error("Request failed", {

      error: "Connection timeout",

      retryCount: 3

    });


    return new Response("OK");

  }

};


```

These attributes will be searchable and filterable in the PostHog logs interface.

## Troubleshooting

### Logs not appearing in PostHog

1. **Verify your API key**: Ensure you're using your project API key (starts with `phc_`), not a personal API key
2. **Check the endpoint region**: Confirm you're using the correct regional endpoint (US or EU) matching your PostHog instance
3. **Confirm destination status**: In the Cloudflare dashboard, verify your destination shows a recent successful delivery
4. **Check sampling rate**: If you've configured a sampling rate, not all logs may be sent

### Authentication errors

If you see authentication errors in your destination status:

* Ensure the Authorization header value includes `Bearer ` prefix followed by your API key
* Verify the API key has not been revoked or regenerated in PostHog
* Alternatively, you can pass the token as a query parameter by using `https://us.i.posthog.com/i/v1/logs?token=<your-project-api-key>` as your endpoint

## Related resources

* [PostHog Logs documentation ↗](https://posthog.com/docs/logs)
* [PostHog Getting Started with Logs ↗](https://posthog.com/docs/logs/start-here)
* [OpenTelemetry Logs specification ↗](https://opentelemetry.io/docs/specs/otel/logs/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/observability/exporting-opentelemetry-data/posthog/#page","headline":"Export to PostHog · Cloudflare Workers docs","description":"Send OpenTelemetry logs from Cloudflare Workers to PostHog for analytics.","url":"https://developers.cloudflare.com/workers/observability/exporting-opentelemetry-data/posthog/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/observability/","name":"Observability"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/observability/exporting-opentelemetry-data/","name":"Exporting OpenTelemetry Data"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/observability/exporting-opentelemetry-data/posthog/","name":"Export to PostHog"}}]}
```
