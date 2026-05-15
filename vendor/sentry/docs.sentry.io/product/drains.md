---
title: "Log and Trace Drains"
description: "Learn how to set up log and trace drains to send logs and traces to Sentry from managed hosting platforms."
url: https://docs.sentry.io/product/drains/
---

# Log and Trace Drains

Log and trace drains connect your hosting platform's native telemetry system directly to Sentry, letting you send [logs](https://docs.sentry.io/product/explore/logs.md) and [traces](https://docs.sentry.io/product/explore/trace-explorer.md) without modifying your application code.

**How is this different from OTLP Forwarding?** Log and trace drains use your hosting platform's built-in telemetry export feature—you just configure a destination and the platform handles the rest. [OTLP Forwarding](https://docs.sentry.io/concepts/otlp/forwarding.md) is for when you need to run your own pipeline (like the OpenTelemetry Collector) to collect data from infrastructure sources.

## [Supported Platforms](https://docs.sentry.io/product/drains.md#supported-platforms)

| Platform                                                                      | Logs | Traces |
| ----------------------------------------------------------------------------- | ---- | ------ |
| [Vercel](https://docs.sentry.io/product/drains/vercel.md)                     | ✅    | ✅      |
| [Cloudflare Workers](https://docs.sentry.io/product/drains/cloudflare.md)     | ✅    | ✅      |
| [Heroku](https://docs.sentry.io/product/drains/heroku.md)                     | ✅    | ✅      |
| [OpenRouter](https://docs.sentry.io/product/drains/openrouter.md)             | ❌    | ✅      |
| [Supabase](https://docs.sentry.io/product/drains/supabase.md)                 | ✅    | ❌      |
| [Shopify Hydrogen](https://docs.sentry.io/product/drains/shopify-hydrogen.md) | ❌    | ✅      |

## [Limitations](https://docs.sentry.io/product/drains.md#limitations)

Log and trace drains support logs and traces only:

* **Errors**: To capture errors, add the [Sentry SDK](https://docs.sentry.io/platforms.md) to your application.
* **Metrics**: Not currently supported. If you're interested in this, reach out on [GitHub](https://github.com/getsentry/sentry/issues/103486) or email <feedback-metrics@sentry.io>.

## [Learn More](https://docs.sentry.io/product/drains.md#learn-more)

* [OpenTelemetry Protocol (OTLP)](https://docs.sentry.io/concepts/otlp.md): Send OTLP data to Sentry via SDK, OpenTelemetry Collector, Vector, or Fluent Bit
* [Logs](https://docs.sentry.io/product/explore/logs.md): View, search, and analyze logs in Sentry
* [Trace Explorer](https://docs.sentry.io/product/explore/trace-explorer.md): View, search, and analyze traces in Sentry

## Pages in this section

- [Vercel](https://docs.sentry.io/product/drains/vercel.md)
- [Cloudflare](https://docs.sentry.io/product/drains/cloudflare.md)
- [Heroku](https://docs.sentry.io/product/drains/heroku.md)
- [OpenRouter](https://docs.sentry.io/product/drains/openrouter.md)
- [Supabase](https://docs.sentry.io/product/drains/supabase.md)
- [Shopify Hydrogen](https://docs.sentry.io/product/drains/shopify-hydrogen.md)
