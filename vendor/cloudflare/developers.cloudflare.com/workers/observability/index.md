---
title: Observability
description: Understand how your Worker projects are performing via logs, traces, metrics, and other data sources.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Observability

Cloudflare Workers provides comprehensive observability tools to help you understand how your applications are performing, diagnose issues, and gain insights into request flows. Whether you want to use Cloudflare's native observability platform or export telemetry data to your existing monitoring stack, Workers has you covered.

## Logs

Logs are essential for troubleshooting and understanding your application's behavior. Cloudflare offers several ways to access and manage your Worker logs.

[ Workers Logs ](https://developers.cloudflare.com/workers/observability/logs/workers-logs/) Automatically collect, store, filter, and analyze logs in the Cloudflare dashboard. 

[ Real-time logs ](https://developers.cloudflare.com/workers/observability/logs/real-time-logs/) Access log events in near real-time for immediate feedback during development and deployments. 

[ Tail Workers ](https://developers.cloudflare.com/workers/observability/logs/tail-workers/) Apply custom filtering, sampling, and transformation logic to your telemetry data. 

[ Workers Logpush ](https://developers.cloudflare.com/workers/observability/logs/logpush/) Send Workers Trace Event Logs to supported destinations like R2, S3, or logging providers. 

## Traces

[Tracing](https://developers.cloudflare.com/workers/observability/traces/) gives you end-to-end visibility into the life of a request as it travels through your Workers application and connected services. With automatic instrumentation, Cloudflare captures telemetry data for fetch calls, binding operations (KV, R2, Durable Objects), and handler invocations - no code changes required.

## Metrics and analytics

[Metrics and analytics](https://developers.cloudflare.com/workers/observability/metrics-and-analytics/) let you monitor your Worker's health with built-in metrics including request counts, error rates, CPU time, wall time, and execution duration. View metrics per Worker or aggregated across all Workers on a zone.

## Query Builder

The [Query Builder](https://developers.cloudflare.com/workers/observability/query-builder/) helps you write structured queries to investigate and visualize your telemetry data. Build queries with filters, aggregations, and groupings to analyze logs and identify patterns.

## Exporting data

[Export OpenTelemetry-compliant traces and logs](https://developers.cloudflare.com/workers/observability/exporting-opentelemetry-data/) from Workers to your existing observability stack. Workers supports exporting to any destination with an OTLP endpoint, including Honeycomb, Grafana Cloud, Axiom, and Sentry.

## Debugging

[ Errors and exceptions ](https://developers.cloudflare.com/workers/observability/errors/) Understand Workers error codes and debug common issues. 

[ Source maps and stack traces ](https://developers.cloudflare.com/workers/observability/source-maps/) Get readable stack traces that map back to your original source code. 

[ DevTools ](https://developers.cloudflare.com/workers/observability/dev-tools/) Use Chrome DevTools for breakpoints, CPU profiling, and memory debugging during local development. 

## Additional resources

[ MCP server ](https://github.com/cloudflare/mcp-server-cloudflare/tree/main/apps/workers-observability) Query Workers observability data using the Model Context Protocol. 

[ Third-party integrations ](https://developers.cloudflare.com/workers/observability/third-party-integrations/) Integrate Workers with third-party observability platforms. 

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/workers/observability/#page","headline":"Observability · Cloudflare Workers docs","description":"Understand how your Worker projects are performing via logs, traces, metrics, and other data sources.","url":"https://developers.cloudflare.com/workers/observability/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/observability/","name":"Observability"}}]}
```
