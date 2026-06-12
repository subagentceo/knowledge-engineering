---
title: "PHP"
description: "Learn how to set up Sentry in your PHP application."
url: https://docs.sentry.io/platforms/php/
---

# PHP | Sentry for PHP

## [Prerequisites](https://docs.sentry.io/platforms/php.md#prerequisites)

* You need a [Sentry account](https://sentry.io/signup/) and project
* Your application needs to run on PHP 7.2 or later
* You need to be using Composer
* Read one of these other guides if you use [Laravel](https://docs.sentry.io/platforms/php/guides/laravel.md) or [Symfony](https://docs.sentry.io/platforms/php/guides/symfony.md)

## [Features](https://docs.sentry.io/platforms/php.md#features)

Select which Sentry features you'd like to install in addition to Error Monitoring to get the corresponding installation and configuration instructions below.

Error Monitoring\[ ]Tracing\[ ]Profiling\[ ]Logs

## [Install](https://docs.sentry.io/platforms/php.md#install)

Install the Sentry SDK using [Composer](https://getcomposer.org/):

```bash
composer require sentry/sentry
```

To use Profiling, you'll also need to install the Excimer extension via PECL:

```bash
pecl install excimer
```

The Excimer PHP extension supports PHP 7.2 and up. Excimer requires Linux or macOS and doesn't support Windows. For additional ways to install Excimer, [see docs](https://docs.sentry.io/platforms/php/profiling.md#installation).

## [Configure](https://docs.sentry.io/platforms/php.md#configure)

To capture all errors, even the one during the startup of your application, you should initialize the Sentry PHP SDK as soon as possible.

```php
\Sentry\init([
  'dsn' => 'https://<key>@o<orgId>.ingest.sentry.io/<projectId>',
  // Add request headers, cookies and IP address,
  // see https://docs.sentry.io/platforms/php/data-management/data-collected/ for more info
  'send_default_pii' => true,
  // ___PRODUCT_OPTION_START___ performance
  // Specify a fixed sample rate
  'traces_sample_rate' => 1.0,
  // ___PRODUCT_OPTION_END___ performance
  // ___PRODUCT_OPTION_START___ profiling
  // Set a sampling rate for profiling - this is relative to traces_sample_rate
  'profiles_sample_rate' => 1.0,
  // ___PRODUCT_OPTION_END___ profiling
  // ___PRODUCT_OPTION_START___ logs

  // Enable logs to be sent to Sentry
  'enable_logs' => true,
  // ___PRODUCT_OPTION_END___ logs
]);
```

In order to receive stack trace arguments in your errors, make sure to set `zend.exception_ignore_args: Off` in your php.ini

## [Verify](https://docs.sentry.io/platforms/php.md#verify)

In PHP you can either capture a caught exception or capture the last error with captureLastError.

```php
try {
  $this->functionFailsForSure();
} catch (\Throwable $exception) {
  \Sentry\captureException($exception);
}
```

## [Set up Sentry through Forge](https://docs.sentry.io/platforms/php.md#set-up-sentry-through-forge)

If you're using Laravel's Forge platform to provision and deploy your PHP application, you can create a Sentry organization through [Forge](https://forge.laravel.com/docs/integrations/sentry).

## [Next Steps](https://docs.sentry.io/platforms/php.md#next-steps)

* Explore [practical guides](https://docs.sentry.io/guides.md) on what to monitor, log, track, and investigate after setup

## Frameworks

- [Laravel](https://docs.sentry.io/platforms/php/guides/laravel.md)
- [Symfony](https://docs.sentry.io/platforms/php/guides/symfony.md)

## Topics

- [Enriching Events](https://docs.sentry.io/platforms/php/enriching-events.md)
- [Tracing](https://docs.sentry.io/platforms/php/tracing.md)
- [Configuration](https://docs.sentry.io/platforms/php/configuration.md)
- [Profiling](https://docs.sentry.io/platforms/php/profiling.md)
- [Integrations](https://docs.sentry.io/platforms/php/integrations.md)
- [Logs](https://docs.sentry.io/platforms/php/logs.md)
- [Troubleshooting](https://docs.sentry.io/platforms/php/troubleshooting.md)
- [Agent](https://docs.sentry.io/platforms/php/agent.md)
- [Crons](https://docs.sentry.io/platforms/php/crons.md)
- [Data Management](https://docs.sentry.io/platforms/php/data-management.md)
- [Application Metrics](https://docs.sentry.io/platforms/php/metrics.md)
- [Security Policy Reporting](https://docs.sentry.io/platforms/php/security-policy-reporting.md)
- [User Feedback](https://docs.sentry.io/platforms/php/user-feedback.md)
- [Feature Flags](https://docs.sentry.io/platforms/php/feature-flags.md)
- [Usage](https://docs.sentry.io/platforms/php/usage.md)
- [Legacy SDK](https://docs.sentry.io/platforms/php/legacy-sdk.md)
