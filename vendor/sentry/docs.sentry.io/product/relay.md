---
title: "Relay"
description: "Learn more about Relay, Sentry's data security solution."
url: https://docs.sentry.io/product/relay/
---

# Relay

Sentry Relay offers enterprise-grade data security by providing a standalone service that acts as a middle layer between your application and sentry.io.

Relay is specifically designed to:

* Scrub personally identifiable information (PII) in a central place prior to sending it to Sentry
* Improve event response time in regions with low bandwidth or limited connectivity
* Act as an opaque proxy for organizations that restrict all HTTP communication to a custom domain name

## [Use Cases for Relay](https://docs.sentry.io/product/relay.md#use-cases-for-relay)

Relay is designed to support organizations that have specific enterprise security requirements for data scrubbing of personally identifiable information (PII), response time, and enterprise domain management.

### [PII Data Scrubbing](https://docs.sentry.io/product/relay.md#pii-data-scrubbing)

Sentry already scrubs PII in two places:

1. In the SDK before sending the event
2. Upon arrival on Sentry's infrastructure

Relay adds a third option that scrubs data in a central place prior to sending it to Sentry.

To choose the right place for data scrubbing, consider:

* If you prefer to configure data scrubbing in a central place, you can let Sentry handle it. When an event arrives, Sentry will immediately apply [server-side scrubbing](https://docs.sentry.io/security-legal-pii/scrubbing/server-side-scrubbing.md).

* If you can't send PII outside your infrastructure, but still prefer to configure data scrubbing in a centralized place, configure your SDK to send events to Relay, which uses the privacy settings configured in Sentry, and scrubs PII before forwarding any data.

* If you must enforce strict data privacy requirements, you can configure SDKs to scrub PII using the [`beforeSend` and `beforeSendTransaction` hooks](https://docs.sentry.io/platform-redirect.md?next=/configuration/options/%23hooks), which will prevent data from being collected on the device. This may require you to replicate the same logic across your applications, and may impact performance.

### [Response Time](https://docs.sentry.io/product/relay.md#response-time)

Relay responds very quickly to requests. Installing Relay close to your infrastructure will further improve the response time when sending events. This installation approach can particularly reduce the roundtrip time in remote locations.

### [Enterprise Domain Management](https://docs.sentry.io/product/relay.md#enterprise-domain-management)

By default, SDKs need to be configured with a Data Source Name (DSN) that points to `sentry.io`. If you need to restrict all HTTP communication to a custom domain name, Relay can act as an opaque proxy that reliably forwards events to Sentry.

## [Next Steps](https://docs.sentry.io/product/relay.md#next-steps)

* #### [Getting Started](https://docs.sentry.io/product/relay/getting-started.md)

  Learn how to get started with Relay, Sentry's data security solution.

* #### [Relay Modes](https://docs.sentry.io/product/relay/modes.md)

  Relay can operate in different modes depending on your organization's needs.

* #### [Configuration Options](https://docs.sentry.io/product/relay/options.md)

  Configure Relay to suit the needs of your organization.

* #### [Monitoring](https://docs.sentry.io/product/relay/monitoring.md)

  Configure logging, metrics, and error reporting for your Relay installation.

* #### [Operating Guidelines](https://docs.sentry.io/product/relay/operating-guidelines.md)

  Learn about our guidelines for operation when self-hosting external Relays.

## Pages in this section

- [Getting Started](https://docs.sentry.io/product/relay/getting-started.md)
- [Relay Modes](https://docs.sentry.io/product/relay/modes.md)
- [Configuration Options](https://docs.sentry.io/product/relay/options.md)
- [Monitoring](https://docs.sentry.io/product/relay/monitoring.md)
- [Operating Guidelines](https://docs.sentry.io/product/relay/operating-guidelines.md)
