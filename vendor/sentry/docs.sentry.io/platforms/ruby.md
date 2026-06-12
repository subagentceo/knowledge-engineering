---
title: "Ruby"
url: https://docs.sentry.io/platforms/ruby/
---

# Ruby | Sentry for Ruby

##### Using a framework?

Check out the other SDKs we support in the left-hand dropdown.

## [Prerequisites](https://docs.sentry.io/platforms/ruby.md#prerequisites)

* You need a Sentry [account](https://sentry.io/signup/) and [project](https://docs.sentry.io/product/projects.md)
* Ruby 2.4+ or any of the most recent JRuby versions

## [Features](https://docs.sentry.io/platforms/ruby.md#features)

In addition to capturing errors, you can monitor interactions between multiple services or applications by [enabling tracing](https://docs.sentry.io/concepts/key-terms/tracing.md). You can also collect and analyze performance profiles from real users with [profiling](https://docs.sentry.io/product/explore/profiling.md).

Select which Sentry features you'd like to install in addition to Error Monitoring to get the corresponding installation and configuration instructions below.

Error Monitoring\[ ]Tracing\[ ]Profiling\[ ]Logs

## [Install](https://docs.sentry.io/platforms/ruby.md#install)

Add the `sentry-ruby` gem to your `Gemfile`:

```ruby
gem "sentry-ruby"
```

Add the `sentry-ruby` and `stackprof` gems to your `Gemfile`:

```ruby
gem "stackprof"
gem "sentry-ruby"
```

## [Configure](https://docs.sentry.io/platforms/ruby.md#configure)

Configuration should happen as early as possible in your application's lifecycle.

```ruby
require 'sentry-ruby'

Sentry.init do |config|
  config.dsn = 'https://<key>@o<orgId>.ingest.sentry.io/<projectId>'

  # get breadcrumbs from logs
  config.breadcrumbs_logger = [:sentry_logger, :http_logger]

  # Add data like request headers and IP for users, if applicable;
  # see https://docs.sentry.io/platforms/ruby/data-management/data-collected/ for more info
  config.send_default_pii = true
  # ___PRODUCT_OPTION_START___ performance

  # enable tracing
  # we recommend adjusting this value in production
  config.traces_sample_rate = 1.0
  # ___PRODUCT_OPTION_END___ performance
  # ___PRODUCT_OPTION_START___ profiling

  # enable profiling
  # this is relative to traces_sample_rate
  config.profiles_sample_rate = 1.0
  # ___PRODUCT_OPTION_END___ profiling
  # ___PRODUCT_OPTION_START___ logs

  # Enable logs to be sent to Sentry
  config.enable_logs = true
  # ___PRODUCT_OPTION_END___ logs
end
```

## [Verify](https://docs.sentry.io/platforms/ruby.md#verify)

This snippet includes an intentional error, so you can test that everything is working as soon as you set it up.

```ruby
Sentry.capture_message("test message")
```

Learn more about manually capturing an error or message in our [Usage documentation](https://docs.sentry.io/platforms/ruby/usage.md).

To view and resolve the recorded error, log into [sentry.io](https://sentry.io) and select your project. Clicking on the error's title will open a page where you can see detailed information and mark it as resolved.

## [Next Steps](https://docs.sentry.io/platforms/ruby.md#next-steps)

* Explore [practical guides](https://docs.sentry.io/guides.md) on what to monitor, log, track, and investigate after setup

## Frameworks

- [DelayedJob](https://docs.sentry.io/platforms/ruby/guides/delayed_job.md)
- [Rack Middleware](https://docs.sentry.io/platforms/ruby/guides/rack.md)
- [Rails](https://docs.sentry.io/platforms/ruby/guides/rails.md)
- [Resque](https://docs.sentry.io/platforms/ruby/guides/resque.md)
- [Sidekiq](https://docs.sentry.io/platforms/ruby/guides/sidekiq.md)

## Topics

- [Capturing Errors](https://docs.sentry.io/platforms/ruby/usage.md)
- [Logs](https://docs.sentry.io/platforms/ruby/logs.md)
- [Tracing](https://docs.sentry.io/platforms/ruby/tracing.md)
- [Application Metrics](https://docs.sentry.io/platforms/ruby/metrics.md)
- [Profiling](https://docs.sentry.io/platforms/ruby/profiling.md)
- [Crons](https://docs.sentry.io/platforms/ruby/crons.md)
- [User Feedback](https://docs.sentry.io/platforms/ruby/user-feedback.md)
- [Enriching Events](https://docs.sentry.io/platforms/ruby/enriching-events.md)
- [Extended Configuration](https://docs.sentry.io/platforms/ruby/configuration.md)
- [Integrations](https://docs.sentry.io/platforms/ruby/integrations.md)
- [Data Management](https://docs.sentry.io/platforms/ruby/data-management.md)
- [Security Policy Reporting](https://docs.sentry.io/platforms/ruby/security-policy-reporting.md)
- [Migration Guide](https://docs.sentry.io/platforms/ruby/migration.md)
- [Troubleshooting](https://docs.sentry.io/platforms/ruby/troubleshooting.md)
