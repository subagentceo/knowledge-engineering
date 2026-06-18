---
title: Export to Honeycomb
description: Send OpenTelemetry traces and logs from Cloudflare Workers to Honeycomb.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Export to Honeycomb

Honeycomb is an observability platform built for high-cardinality data that helps you understand and debug your applications. By exporting your Cloudflare Workers application telemetry to Honeycomb, you can:

* Visualize traces to understand request flows and identify performance bottlenecks
* Query and analyze logs with unlimited dimensionality across any attribute
* Create custom queries and dashboards to monitor your Workers
![Trace view including POST request, fetch operations, durable object subrequest, and queue send, with timing information displayed on a timeline](https://developers.cloudflare.com/_astro/honeycomb-example.cEkEF1c4_Z52f1D.webp) 

This guide will walk you through configuring your Cloudflare Worker application to export OpenTelemetry-compliant traces and logs to Honeycomb.

## Prerequisites

Before you begin, ensure you have:

* An active [Honeycomb account ↗](https://ui.honeycomb.io/signup) (free tier available)
* A deployed Worker that you want to monitor

## Step 1: Get your Honeycomb API key

1. Log in to your [Honeycomb account ↗](https://ui.honeycomb.io/)
2. Navigate to your account settings by clicking on your profile icon in the top right
3. Select **Team Settings**
4. In the left sidebar, click **Environments** and click the gear icon
5. Find your environment (e.g., `production`, `test`) or create a new one
6. Under **API Keys**, click **Create Ingest API Key**
7. Configure your API key:  
   * **Name**: Enter a descriptive name (e.g., `cloudflare-workers-otel`)  
   * **Permissions**: Select **Can create services/datasets** (required for OTLP ingestion)
8. Click **Create**
9. **Important**: Copy the API key immediately and store it securely - you won't be able to see it again

The API key will look something like: `hcaik_01hq...`

## Step 2: Configure Cloudflare destinations

Now you'll create destinations in the Cloudflare dashboard that point to Honeycomb.

### Honeycomb OTLP endpoints

Honeycomb provides separate OTLP endpoints for traces and logs:

* **Traces**: `https://api.honeycomb.io/v1/traces`
* **Logs**: `https://api.honeycomb.io/v1/logs`

### Configure trace destination

1. Navigate to your Cloudflare account's [Workers Observability ↗](https://dash.cloudflare.com/?to=/:account/workers-and-pages/observability/pipelines) section
2. Click **Add destination**
3. Configure your trace destination:  
   * **Destination Name**: `honeycomb-traces` (or any descriptive name)  
   * **Destination Type**: Select **Traces**  
   * **OTLP Endpoint**: `https://api.honeycomb.io/v1/traces`  
   * **Custom Headers**: Add the authentication header:  
         * Header name: `x-honeycomb-team`  
         * Header value: Your Honeycomb API key (e.g., `hcaik_01hq...`)
4. Click **Save**

### Configure logs destination

Repeat the process for logs:

1. Click **Add destination** again
2. Configure your logs destination:  
   * **Destination Name**: `honeycomb-logs` (or any descriptive name)  
   * **Destination Type**: Select **Logs**  
   * **OTLP Endpoint**: `https://api.honeycomb.io/v1/logs`  
   * **Custom Headers**: Add the authentication header:  
         * Header name: `x-honeycomb-team`  
         * Header value: Your Honeycomb API key (same as above)
3. Click **Save**

## Step 3: Configure your Worker

With your destinations created in the Cloudflare dashboard, update your Worker's configuration to enable telemetry export.

* [  wrangler.jsonc ](#tab-panel-11848)
* [  wrangler.toml ](#tab-panel-11849)

JSONC

```

{

  "observability": {

    "traces": {

      "enabled": true,

      // Must match the destination name in the dashboard

      "destinations": ["honeycomb-traces"]

    },

    "logs": {

      "enabled": true,

      // Must match the destination name in the dashboard

      "destinations": ["honeycomb-logs"]

    }

  }

}


```

TOML

```

[observability.traces]

enabled = true

destinations = [ "honeycomb-traces" ]


[observability.logs]

enabled = true

destinations = [ "honeycomb-logs" ]


```

After updating your configuration, deploy your Worker for the changes to take effect.

Note

It may take a few minutes after deployment for data to appear in Honeycomb.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/observability/exporting-opentelemetry-data/honeycomb/#page","headline":"Export to Honeycomb · Cloudflare Workers docs","description":"Send OpenTelemetry traces and logs from Cloudflare Workers to Honeycomb.","url":"https://developers.cloudflare.com/workers/observability/exporting-opentelemetry-data/honeycomb/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/observability/","name":"Observability"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/observability/exporting-opentelemetry-data/","name":"Exporting OpenTelemetry Data"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/observability/exporting-opentelemetry-data/honeycomb/","name":"Export to Honeycomb"}}]}
```
