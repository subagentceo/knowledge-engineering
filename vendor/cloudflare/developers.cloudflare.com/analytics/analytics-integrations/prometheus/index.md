---
title: Prometheus
description: This tutorial explains how to export Cloudflare metrics to Prometheus using the Cloudflare Prometheus Exporter.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Prometheus

This tutorial explains how to export Cloudflare metrics to [Prometheus ↗](https://prometheus.io/) using the [Cloudflare Prometheus Exporter ↗](https://github.com/cloudflare/cloudflare-prometheus-exporter), an open-source tool built on Cloudflare Workers with Durable Objects.

## Overview

Before setting up the Cloudflare Prometheus Exporter, note that this integration:

* Is available to all Cloudflare customer plans (Free, Pro, Business, and Enterprise). Zones on the Free plan have limited metrics availability.
* Is based on the Cloudflare GraphQL Analytics API and REST API.
* Exports 90+ Prometheus metrics covering requests, bandwidth, threats, Workers, load balancers, SSL certificates, firewall events, health checks, Magic Transit, Stream, and more.
* Runs as a Cloudflare Worker with Durable Objects for stateful counter accumulation and background refresh.
* Supports multi-account setups, automatically discovering all accessible accounts and zones.

## Prerequisites

Before deploying the exporter, make sure that you:

* Have a Cloudflare account.
* Have a [Cloudflare API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with the required permissions (see [Create an API token](#task-2---create-an-api-token) below).
* Have a Prometheus instance to scrape the exporter.

## Task 1 - Deploy the exporter

You can deploy the exporter using one-click deploy or manually.

### One-click deploy

Select the button below to deploy the exporter to your Cloudflare Workers account:

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/cloudflare-prometheus-exporter)

After deployment, configure `CLOUDFLARE_API_TOKEN` as a secret. Optionally configure `BASIC_AUTH_USER` and `BASIC_AUTH_PASSWORD` to protect the exporter with HTTP Basic Auth.

### Manual deployment

Terminal window

```

git clone https://github.com/cloudflare/cloudflare-prometheus-exporter.git

cd cloudflare-prometheus-exporter

bun install

wrangler secret put CLOUDFLARE_API_TOKEN

bun run deploy


```

## Task 2 - Create an API token

Create a Cloudflare API token with the following permissions:

[Create token with pre-filled permissions ↗](https://dash.cloudflare.com/profile/api-tokens?permissionGroupKeys=%5B%7B%22key%22%3A%22analytics%22%2C%22type%22%3A%22read%22%7D%2C%7B%22key%22%3A%22account%5Fanalytics%22%2C%22type%22%3A%22read%22%7D%2C%7B%22key%22%3A%22workers%5Fscripts%22%2C%22type%22%3A%22read%22%7D%2C%7B%22key%22%3A%22ssl%5Fand%5Fcertificates%22%2C%22type%22%3A%22read%22%7D%2C%7B%22key%22%3A%22firewall%5Fservices%22%2C%22type%22%3A%22read%22%7D%2C%7B%22key%22%3A%22load%5Fbalancers%22%2C%22type%22%3A%22read%22%7D%2C%7B%22key%22%3A%22account%5Flogs%22%2C%22type%22%3A%22read%22%7D%2C%7B%22key%22%3A%22magic%5Ftransit%22%2C%22type%22%3A%22read%22%7D%5D&name=Cloudflare%20Prometheus%20Exporter)

| Permission                  | Access | Required |
| --------------------------- | ------ | -------- |
| Zone > Analytics            | Read   | Yes      |
| Account > Account Analytics | Read   | Yes      |
| Account > Workers Scripts   | Read   | Yes      |
| Zone > SSL and Certificates | Read   | Optional |
| Zone > Firewall Services    | Read   | Optional |
| Zone > Load Balancers       | Read   | Optional |
| Account > Logs              | Read   | Optional |
| Account > Magic Transit     | Read   | Optional |

## Task 3 - Configure Prometheus

Add the exporter as a scrape target in your Prometheus configuration:

YAML

```

scrape_configs:

  - job_name: 'cloudflare'

    scrape_interval: 60s

    scrape_timeout: 30s

    static_configs:

      - targets: ['your-worker.your-subdomain.workers.dev']


```

### With Basic Auth

If you configured Basic Auth on the exporter, update your Prometheus configuration:

YAML

```

scrape_configs:

  - job_name: 'cloudflare'

    scrape_interval: 60s

    scrape_timeout: 30s

    basic_auth:

      username: 'your-username'

      password: 'your-password'

    static_configs:

      - targets: ['your-worker.your-subdomain.workers.dev']


```

## Configuration

Configuration is resolved in order: **KV overrides** \> **environment variables** \> **defaults**. You can use the runtime config API for dynamic changes without redeployment.

Set environment variables in `wrangler.jsonc` or via `wrangler secret put`:

| Variable                           | Default  | Description                                           |
| ---------------------------------- | -------- | ----------------------------------------------------- |
| CLOUDFLARE\_API\_TOKEN             | \-       | Cloudflare API token (secret)                         |
| SCRAPE\_DELAY\_SECONDS             | 300      | Delay before fetching metrics (data propagation)      |
| TIME\_WINDOW\_SECONDS              | 60       | Query time window                                     |
| METRIC\_REFRESH\_INTERVAL\_SECONDS | 60       | Background refresh interval                           |
| CF\_ACCOUNTS                       | \-       | Comma-separated account IDs to include (default: all) |
| CF\_ZONES                          | \-       | Comma-separated zone IDs to include (default: all)    |
| METRICS\_DENYLIST                  | \-       | Comma-separated list of metrics to exclude            |
| EXCLUDE\_HOST                      | false    | Exclude host labels from metrics                      |
| METRICS\_PATH                      | /metrics | Custom path for metrics endpoint                      |
| BASIC\_AUTH\_USER                  | \-       | Username for Basic Auth (secret)                      |
| BASIC\_AUTH\_PASSWORD              | \-       | Password for Basic Auth (secret)                      |

For a full list of configuration options, refer to the [exporter README ↗](https://github.com/cloudflare/cloudflare-prometheus-exporter#configuration).

## Endpoints

| Path         | Method | Description                             |
| ------------ | ------ | --------------------------------------- |
| /            | GET    | Landing page                            |
| /metrics     | GET    | Prometheus metrics                      |
| /health      | GET    | Health check                            |
| /config      | GET    | Get all runtime config                  |
| /config/:key | PUT    | Set a config override (persisted in KV) |
| /config/:key | DELETE | Reset a config key to its default       |

## Available metrics

The exporter provides 90+ metrics across the following categories:

* **Zone requests** \- Total requests, cached requests, requests by status code, country, content type, HTTP version, and more.
* **Zone bandwidth** \- Total bandwidth, cached bandwidth, bandwidth by content type and country.
* **Zone threats** \- Threat counts by country and type.
* **Firewall** \- Firewall events by action, source, and rule. Bot detection metrics.
* **Workers** \- Request counts, error counts, CPU time, and duration by script.
* **Load balancers** \- Pool health status, request counts, RTT, steering policy, and origin weights.
* **Health checks** \- Health check events, RTT, TTFB, TCP connection time, and TLS handshake time.
* **SSL certificates** \- Certificate validation status by type and issuer.
* **Cache** \- Cache hit ratio and cache miss origin duration.
* **Error rates** \- 4xx/5xx error counts, edge and origin error rates, origin response duration.
* **Logpush** \- Failed job counts at account and zone level.
* **Magic Transit** \- Tunnel health, SLO status, and per-tunnel traffic (bits and packets).
* **Magic Firewall** \- Per-rule sampled traffic (bits and packets).
* **Network Analytics** \- Traffic volume across Magic Transit, DDoS defense, IDPS, TCP protection, and DNS protection.
* **Stream** \- Video playback counts, time viewed, live input metrics.
* **Hostname metrics** \- Per-hostname request counts, latency averages, and percentiles (requires `HOST_METRICS_ALLOWLIST`).

For a complete list of metrics with types and labels, refer to the [exporter README ↗](https://github.com/cloudflare/cloudflare-prometheus-exporter#available-metrics).

## Free tier zone limitations

Zones on Cloudflare's Free plan do not have access to the GraphQL Analytics API. The exporter automatically detects and skips free tier zones for metrics that require this API.

Free tier zones still export:

* `cloudflare_zone_certificate_validation_status` (SSL certificates)
* `cloudflare_zone_lb_origin_weight` (Load balancer weights, if configured)

You can monitor skipped zones with the `cloudflare_zones_skipped_free_tier` metric.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/analytics-integrations/prometheus/#page","headline":"Prometheus · Cloudflare Analytics docs","description":"This tutorial explains how to export Cloudflare metrics to Prometheus using the Cloudflare Prometheus Exporter.","url":"https://developers.cloudflare.com/analytics/analytics-integrations/prometheus/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/analytics/","name":"Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/analytics/analytics-integrations/","name":"Analytics integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/analytics/analytics-integrations/prometheus/","name":"Prometheus"}}]}
```
