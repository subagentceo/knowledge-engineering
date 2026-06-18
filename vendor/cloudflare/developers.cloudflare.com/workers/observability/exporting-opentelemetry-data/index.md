---
title: Exporting OpenTelemetry Data
description: Export traces and logs from Cloudflare Workers to any OpenTelemetry-compatible destination.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Exporting OpenTelemetry Data

Cloudflare Workers supports exporting OpenTelemetry (OTel)-compliant telemetry data to any destination with an available OTel endpoint, allowing you to integrate with your existing monitoring and observability stack.

### Supported telemetry types

You can export the following types of telemetry data:

* **Traces** \- Traces showing request flows through your Worker and connected services
* **Logs** \- Application logs including `console.log()` output and system-generated logs

**Note**: exporting Worker metrics and custom metrics is not yet supported.

### Available OpenTelemetry destinations

Below are common OTLP endpoint formats for popular observability providers. Refer to your provider's documentation for specific details and authentication requirements.

| Provider                                                                                                                 | Traces Endpoint                                             | Logs Endpoint                                                |
| ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------- | ------------------------------------------------------------ |
| [**Honeycomb**](https://developers.cloudflare.com/workers/observability/exporting-opentelemetry-data/honeycomb/)         | https://api.honeycomb.io/v1/traces                          | https://api.honeycomb.io/v1/logs                             |
| [**Grafana Cloud**](https://developers.cloudflare.com/workers/observability/exporting-opentelemetry-data/grafana-cloud/) | https://otlp-gateway-{region}.grafana.net/otlp/v1/traces    | https://otlp-gateway-{region}.grafana.net/otlp/v1/logs\[^1\] |
| [**Firetiger** ↗](https://docs.firetiger.com/ingest/cloudflare-workers.html)                                             | https://ingest.cloud.firetiger.com/v1/traces                | https://ingest.cloud.firetiger.com/v1/logs                   |
| [**Axiom**](https://developers.cloudflare.com/workers/observability/exporting-opentelemetry-data/axiom/)                 | https://api.axiom.co/v1/traces                              | https://api.axiom.co/v1/logs                                 |
| [**Sentry**](https://developers.cloudflare.com/workers/observability/exporting-opentelemetry-data/sentry/)               | https://{HOST}/api/{PROJECT\_ID}/integration/otlp/v1/traces | https://{HOST}/api/{PROJECT\_ID}/integration/otlp/v1/logs    |
| [**PostHog**](https://developers.cloudflare.com/workers/observability/exporting-opentelemetry-data/posthog/)             | Not supported                                               | https://{REGION}.i.posthog.com/i/v1/logs                     |
| [**Datadog** ↗](https://docs.datadoghq.com/opentelemetry/setup/otlp%5Fingest/)                                           | Coming soon, pending release from Datadog                   | https://otlp.{SITE}.datadoghq.com/v1/logs                    |
| [**New Relic** ↗](https://docs.newrelic.com/docs/opentelemetry/best-practices/opentelemetry-otlp/)                       | https://otlp.nr-data.net/v1/traces                          | https://otlp.nr-data.net/v1/logs                             |
| [**Splunk Observability** ↗](https://dev.splunk.com/observability/reference/api/ingest%5Fdata/latest)                    | https://ingest.{REALM}.signalfx.com/v2/trace/otlp           | N/A                                                          |
| [**Splunk Platform** ↗](https://github.com/splunk/splunk-connect-for-otlp)                                               | http://splunk.internal:4318/v1/traces                       | http://splunk.internal:4318/v1/logs                          |

Authentication

Most providers require authentication headers. Refer to your provider's documentation for specific authentication requirements.

## Setting up OpenTelemetry-compatible destinations

To start sending data to your destination, you'll need to create a destination in the Cloudflare dashboard.

### Creating a destination

![Observability Destinations dashboard showing configured destinations for Grafana and Honeycomb with their respective endpoints and status](https://developers.cloudflare.com/_astro/destinations.B-CW_OSI_Z1IImW8.webp) 
1. Head to your account's [Workers Observability ↗](https://dash.cloudflare.com/?to=/:account/workers-and-pages/observability/pipelines) section of the dashboard
2. Click add destination.
3. Configure your destination:  
   * **Destination Name** \- A descriptive name (e.g., "Grafana-tracing", "Honeycomb-Logs")  
   * **Destination Type** \- Choose between "Traces" or "Logs"  
   * **OTLP Endpoint** \- The URL where your observability platform accepts OTLP data.  
   * **Custom Headers** (Optional) - Any authentication headers or other provider-required headers
4. Save your destination
![Edit Destination dialog showing configuration for Honeycomb tracing with destination name, type selection, OTLP endpoint, and custom headers](https://developers.cloudflare.com/_astro/destination-setup.B8cxx8yd_Z127o0L.webp) 

## Enabling OpenTelemetry export for your Worker

After setting up destinations in the dashboard, configure your Worker to export telemetry data by updating your Wrangler configuration. Your destination name configured in your configuration file should be the same as the destination configured in the dashboard.

* [  wrangler.jsonc ](#tab-panel-11842)
* [  wrangler.toml ](#tab-panel-11843)

JSONC

```

{

  "observability": {

    "traces": {

      "enabled": true,

      "destinations": ["tracing-destination-name"],


      // traces sample rate of 5%

      "head_sampling_rate": 0.05,


      // (optional) set to false to only export traces to your

      // destination without persisting them in the Cloudflare dashboard

      "persist": false

    },

    "logs": {

      "enabled": true,

      "destinations": ["logs-destination-name"],

      // logs sample rate of 60%

      "head_sampling_rate": 0.6,


      // (optional) set to false to only export logs to your

      // destination without persisting them in the Cloudflare dashboard

      "persist": false

    }

  }

}


```

TOML

```

[observability.traces]

enabled = true

destinations = [ "tracing-destination-name" ]

head_sampling_rate = 0.05

persist = false


[observability.logs]

enabled = true

destinations = [ "logs-destination-name" ]

head_sampling_rate = 0.6

persist = false


```

`persist` and pricing

By default, `persist` is `true`, which means logs and traces are both exported to your destination and stored in the Cloudflare dashboard. Dashboard storage is billed [separately](https://developers.cloudflare.com/workers/observability/logs/workers-logs/#pricing). Set `persist` to `false` if you only need data in your external destination.

Once you've configured your Wrangler configuration file, redeploy your Worker for new configurations to take effect. Note that it may take a few minutes for events to reach your destination.

## Destination status

After creating a destination, you can monitor its health and delivery status in the Cloudflare dashboard. Each destination displays a status indicator that shows how recently data was successfully delivered.

### Status indicators

| Status                  | Description                                                             | Troubleshooting                                                                                    |
| ----------------------- | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| **Last: n minutes ago** | Data was recently delivered successfully.                               |                                                                                                    |
| **Never run**           | No data has been delivered to this destination.                         | •Check if your Worker is receiving traffic  • Review sampling rates (low rates generate less data) |
| **Error**               | An error occurred while attempting to deliver data to this destination. | • Verify OTLP endpoint URL is correct• Check authentication headers are valid                      |

## Limits and pricing

Exporting OTel data is currently **free** to those currently on a Workers Paid subscription or higher during the early beta period. However, starting on **`March 1, 2026`**, tracing will be billed as part of your usage on the Workers Paid plan or contract.

This includes the following limits and pricing:

| Plan             | Traces                               | Logs                                 | Pricing                             |
| ---------------- | ------------------------------------ | ------------------------------------ | ----------------------------------- |
| **Workers Free** | Not available                        | Not available                        | \-                                  |
| **Workers Paid** | 10 million events per month included | 10 million events per month included | $0.05 per million additional events |

## Known limitations

OpenTelemetry data export is currently in beta. Please be aware of the following limitations:

* **Metrics export not yet supported**: Exporting Worker infrastructure metrics and custom metrics via OpenTelemetry is not currently available. We are actively working to add metrics support in the future.
* **Limited OTLP support from some providers**: Some observability providers are still rolling out OTLP endpoint support. Check the [Available OpenTelemetry destinations](#available-opentelemetry-destinations) table above for current availability.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/observability/exporting-opentelemetry-data/#page","headline":"Exporting OpenTelemetry Data · Cloudflare Workers docs","description":"Export traces and logs from Cloudflare Workers to any OpenTelemetry-compatible destination.","url":"https://developers.cloudflare.com/workers/observability/exporting-opentelemetry-data/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/observability/","name":"Observability"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/observability/exporting-opentelemetry-data/","name":"Exporting OpenTelemetry Data"}}]}
```
