---
title: "OpenTelemetry Protocol (OTLP)"
description: "Learn how to send OpenTelemetry traces and logs to Sentry."
url: https://docs.sentry.io/concepts/otlp/
---

# OpenTelemetry Protocol (OTLP)

This feature is currently in open beta. Please reach out to <feedback-tracing@sentry.io> if you have feedback or questions. Features in beta are still in-progress and may have bugs. We recognize the irony.

Sentry can ingest OpenTelemetry traces and logs via OTLP endpoints, either directly from an [OTel SDK](https://opentelemetry.io/docs/languages/) or through a pipeline tool like the [OpenTelemetry Collector](https://docs.sentry.io/concepts/otlp/forwarding/pipelines/collector.md). Sentry does not support OTLP metrics at this time.

## [Linking Traces with a Sentry SDK](https://docs.sentry.io/concepts/otlp.md#linking-traces-with-a-sentry-sdk)

If you're using a Sentry SDK alongside OTel instrumentation, you can connect them to share trace context:

| Scenario                                  | Solution                                                                                                                                                                               |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Sentry frontend + OTel backend**        | Use [propagateTraceparent](https://docs.sentry.io/concepts/otlp/sentry-with-otel.md#linking-sentry-and-otlp-traces) to connect frontend traces with OTel-instrumented backend services |
| **Sentry SDK + OTel in the same service** | Use the [OTLP Integration](https://docs.sentry.io/concepts/otlp/sentry-with-otel.md#otlp-integration) to share trace context between Sentry and OTel                                   |

## [Sending OTel Data to Sentry](https://docs.sentry.io/concepts/otlp.md#sending-otel-data-to-sentry)

If you're using OTel without a Sentry SDK, or want to ingest telemetry from infrastructure sources:

| Method                                                               | When to Use                                                                                                                                                                                          |
| -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **[Direct Export](https://docs.sentry.io/concepts/otlp/direct.md)**  | OTel SDK sending traces and logs straight to Sentry                                                                                                                                                  |
| **[Forwarding](https://docs.sentry.io/concepts/otlp/forwarding.md)** | Infrastructure sources via OTel Collector, Vector, or Fluent Bit. Use the [Sentry Exporter](https://docs.sentry.io/concepts/otlp/forwarding/pipelines/sentry-exporter.md) for multi-project routing. |
| **[Log and Trace Drains](https://docs.sentry.io/product/drains.md)** | Managed platforms (Vercel, Cloudflare, Heroku)                                                                                                                                                       |

## Pages in this section

- [Sentry with OTel](https://docs.sentry.io/concepts/otlp/sentry-with-otel.md)
- [Direct to Sentry](https://docs.sentry.io/concepts/otlp/direct.md)
- [Forward to Sentry](https://docs.sentry.io/concepts/otlp/forwarding.md)
