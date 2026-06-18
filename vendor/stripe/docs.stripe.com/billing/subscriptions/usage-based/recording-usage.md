# Record usage for billing

Learn how to record customer usage data.

## How Metronome handles event ingestion

This page describes usage recording for basic usage-based billing, where you send meter events to the Stripe `/v1/billing/meter_events` endpoint and Stripe aggregates them at the end of the billing period. If you’re evaluating a new integration, [Metronome](https://docs.stripe.com/billing/usage-based.md) handles event ingestion differently and is recommended for most new use cases.

In Metronome, you send usage events to Metronome’s ingest API rather than to Stripe directly. Metronome processes events in real time, applies your pricing configuration, and tracks running balances and usage totals continuously, so you and your customers can see current usage at any point during the billing period, not just at invoice time. Metronome is also built for high-volume ingest, making it more suitable for products where customers generate large numbers of events per second or per day.

The Billing Meters approach on this page is appropriate only if you are already billing customers via Billing Meters today. For a new integration, including adding usage-based pricing to existing flat-rate subscriptions, use [Metronome](https://docs.stripe.com/billing/usage-based.md) instead of building custom event recording infrastructure.

> This page covers usage recording for basic usage-based billing with Billing Meters. Stripe recommends [Metronome](https://docs.stripe.com/billing/usage-based.md) for new integrations. Metronome handles event ingestion, metering, and real-time usage visibility without custom recording infrastructure. [Compare your options](https://docs.stripe.com/billing/subscriptions/usage-based/compare-metronome.md) before building a new integration.

If you need guidance for the previous usage-based billing process, refer to our [legacy documentation](https://docs.stripe.com/billing/subscriptions/usage-based-legacy.md).

Throughout each billing period, you must record usage in Stripe to bill your customers the correct amounts. You can decide how often you record usage in Stripe. You can record usage in Stripe using the Dashboard or API.

To record usage in Stripe, first [configure your meter](https://docs.stripe.com/billing/subscriptions/usage-based/meters/configure.md) and then add the recorded usage through the Stripe Dashboard or API.

Stripe processes meter events asynchronously, so aggregated usage in meter event summaries and on upcoming invoices might not immediately reflect recently received meter events.

[Use the API](https://docs.stripe.com/billing/subscriptions/usage-based/recording-usage-api.md): Use the Stripe API to record customer usage data.

[Use the Stripe Dashboard](https://docs.stripe.com/billing/subscriptions/usage-based/recording-usage-in-bulk-dashboard.md): Use the Dashboard to upload a CSV file with usage data.

[Use Amazon S3](https://docs.stripe.com/billing/subscriptions/usage-based/recording-usage-in-bulk.md): Use Amazon S3 to add customer usage data in bulk.
