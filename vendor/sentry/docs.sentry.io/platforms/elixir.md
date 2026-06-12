---
title: "Elixir"
description: "Sentry's Elixir SDK enables automatic reporting of errors, exceptions and messages. You can also use it to monitor your cron jobs."
url: https://docs.sentry.io/platforms/elixir/
---

# Elixir | Sentry for Elixir

On this page, we get you up and running with Sentry's SDK.

You don't have an account and Sentry project established? Head over to [sentry.io](https://sentry.io/signup/), then return to this page.

## [Install](https://docs.sentry.io/platforms/elixir.md#install)

Sentry captures data by using an SDK within your application’s runtime.

Edit your `mix.exs` file to add it as a dependency and add the `:sentry` package to your application:

```elixir
defp deps do
  [
    # ...
    {:sentry, "~> 13.2.0"},
    {:jason, "~> 1.1"},

    # If you want to use Sentry's default HTTP client:
    {:hackney, "~> 1.8"}
  ]
end
```

## [Configure](https://docs.sentry.io/platforms/elixir.md#configure)

Configuration should happen as early as possible in your application's lifecycle.

Sentry has a range of configuration options, but most applications will have a configuration that looks like the following:

```elixir
config :sentry,
  dsn: "https://<key>@o<orgId>.ingest.sentry.io/<projectId>",
  environment_name: Mix.env(),
  enable_source_code_context: true,
  root_source_code_paths: [File.cwd!()]
```

## [Verify](https://docs.sentry.io/platforms/elixir.md#verify)

This snippet includes an intentional error, so you can test that everything is working as soon as you set it up.

```elixir
try do
  raise "This is a test!"
rescue
  exception ->
    Sentry.capture_exception(exception, stacktrace: __STACKTRACE__)
end
```

Learn more about manually capturing an error or message in our [Usage documentation](https://docs.sentry.io/platforms/elixir/usage.md).

To view and resolve the recorded error, log into [sentry.io](https://sentry.io) and select your project. Clicking on the error's title will open a page where you can see detailed information and mark it as resolved.

## [Next Steps](https://docs.sentry.io/platforms/elixir.md#next-steps)

* Explore [practical guides](https://docs.sentry.io/guides.md) on what to monitor, log, track, and investigate after setup

## Topics

- [Logs](https://docs.sentry.io/platforms/elixir/logs.md)
- [Configuration](https://docs.sentry.io/platforms/elixir/configuration.md)
- [Application Metrics](https://docs.sentry.io/platforms/elixir/metrics.md)
- [Testing](https://docs.sentry.io/platforms/elixir/testing.md)
- [Capturing Errors](https://docs.sentry.io/platforms/elixir/usage.md)
- [Tracing](https://docs.sentry.io/platforms/elixir/tracing.md)
- [Integrations](https://docs.sentry.io/platforms/elixir/integrations.md)
- [Enriching Events](https://docs.sentry.io/platforms/elixir/enriching-events.md)
- [Data Management](https://docs.sentry.io/platforms/elixir/data-management.md)
- [Crons](https://docs.sentry.io/platforms/elixir/crons.md)
- [User Feedback](https://docs.sentry.io/platforms/elixir/user-feedback.md)
- [Security Policy Reporting](https://docs.sentry.io/platforms/elixir/security-policy-reporting.md)
- [Migration Guides](https://docs.sentry.io/platforms/elixir/migration.md)
