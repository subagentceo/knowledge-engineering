# Collector

> Vendor-agnostic way to receive, process and export telemetry data.

---

LLMS index: [llms.txt](/llms.txt)

---

![OpenTelemetry Collector diagram with Jaeger, OTLP and Prometheus integration](img/otel-collector.svg)

## Introduction

The OpenTelemetry Collector offers a vendor-agnostic implementation of how to
receive, process and export telemetry data. It removes the need to run, operate,
and maintain multiple agents/collectors. This works with improved scalability
and supports open source observability data formats (e.g. Jaeger, Prometheus,
Fluent Bit, etc.) sending to one or more open source or commercial backends.

## Objectives

- _Usability_: Reasonable default configuration, supports popular protocols,
  runs and collects out of the box.
- _Performance_: Highly stable and performant under varying loads and
  configurations.
- _Observability_: An exemplar of an observable service.
- _Extensibility_: Customizable without touching the core code.
- _Unification_: Single codebase, deployable as an agent or collector with
  support for traces, metrics, and logs.

## When to use a collector

For most language specific instrumentation libraries you have exporters for
popular backends and OTLP. You might wonder,

> under what circumstances does one use a collector to send data, as opposed to
> having each service send directly to the backend?

For trying out and getting started with OpenTelemetry, sending your data
directly to a backend is a great way to get value quickly. Also, in a
development or small-scale environment you can get decent results without a
collector.

However, in general we recommend using a collector alongside your service, since
it allows your service to offload data quickly and the collector can take care
of additional handling like retries, batching, encryption or even sensitive data
filtering.

It is also easier to [setup a collector](quick-start) than you might think: the
default OTLP exporters in each language assume a local collector endpoint, so if
you launch a collector it will automatically start receiving telemetry.

## Collector security

Follow best practices to make sure your collectors are [hosted][] and
[configured][] securely.

## Status

The **Collector** status is: [mixed][], since core Collector components
currently have mixed [stability levels][].

**Collector components** differ in their maturity levels. Each component has its
stability documented in its `README.md`. You can find a list of all available
Collector components in the [registry][].

Support is guaranteed for Collector software artifacts for a certain time period
based on the artifact's intended audience. This support includes, at minimum,
fixes for critical bugs and security issues. See the
[support policies](https://github.com/open-telemetry/opentelemetry-collector/blob/main/VERSIONING.md)
for more details.

## Distributions and releases {#releases}

For information about Collector distributions and releases, including the
[latest release][], see [Distributions](distributions/).

[configured]: /docs/security/config-best-practices/
[hosted]: /docs/security/hosting-best-practices/
[latest release]:
  https://github.com/open-telemetry/opentelemetry-collector-releases/releases/latest
[mixed]: /docs/specs/otel/document-status/#mixed
[registry]: /ecosystem/registry/?language=collector
[stability levels]:
  https://github.com/open-telemetry/opentelemetry-collector#stability-levels

---

Section pages:

- [Quick start](/docs/collector/quick-start/): Set up and collect telemetry in minutes!
- [Install the Collector](/docs/collector/install/)
- [Deploy the Collector](/docs/collector/deploy/): Patterns you can apply to deploy the OpenTelemetry Collector
- [Configuration](/docs/collector/configuration/): Learn how to configure the Collector to suit your needs
- [Components](/docs/collector/components/): OpenTelemetry Collector components - receivers, processors, exporters, connectors, and extensions
- [Management](/docs/collector/management/): How to manage your OpenTelemetry Collector deployment at scale
- [Distributions](/docs/collector/distributions/)
- [Internal telemetry](/docs/collector/internal-telemetry/)
- [Troubleshooting](/docs/collector/troubleshooting/): Recommendations for troubleshooting the Collector
- [Scaling the Collector](/docs/collector/scaling/)
- [Transforming telemetry](/docs/collector/transforming-telemetry/)
- [Architecture](/docs/collector/architecture/)
- [Extend the Collector](/docs/collector/extend/): Learn how to extend the OpenTelemetry Collector with custom components
- [Benchmarks](/docs/collector/benchmarks/)
- [Registry](/docs/collector/registry/): Exporters, processors, receivers and other useful components for the OpenTelemetry Collector
- [Resiliency](/docs/collector/resiliency/): How to configure a resilient OTel Collector pipeline
