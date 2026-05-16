---
title: "Python"
description: "Sentry's Python SDK enables automatic reporting of errors and performance data in your application."
url: https://docs.sentry.io/platforms/python/
---

# Python | Sentry for Python

## [Prerequisites](https://docs.sentry.io/platforms/python.md#prerequisites)

* You need a Sentry [account](https://sentry.io/signup/) and [project](https://docs.sentry.io/product/projects.md)
* Read one of our dedicated guides if you use any of the [frameworks](https://docs.sentry.io/platforms/python/integrations.md#web-frameworks) we support

## [Install](https://docs.sentry.io/platforms/python.md#install)

Install the Sentry SDK using [`pip`](https://pip.pypa.io/en/stable/):

```bash
pip install "sentry-sdk"
```

## [Configure](https://docs.sentry.io/platforms/python.md#configure)

Choose the features you want to configure, and this guide will show you how:

Error Monitoring\[ ]Tracing\[ ]Profiling\[ ]Logs

Configuration should happen as **early as possible** in your application's lifecycle.

```python
import sentry_sdk

sentry_sdk.init(
    dsn="___PUBLIC_DSN___",
    # Add request headers and IP for users,
    # see https://docs.sentry.io/platforms/python/data-management/data-collected/ for more info
    send_default_pii=True,
    # ___PRODUCT_OPTION_START___ performance
    # Set traces_sample_rate to 1.0 to capture 100%
    # of transactions for tracing.
    traces_sample_rate=1.0,
    # ___PRODUCT_OPTION_END___ performance
    # ___PRODUCT_OPTION_START___ profiling
    # To collect profiles for all profile sessions,
    # set `profile_session_sample_rate` to 1.0.
    profile_session_sample_rate=1.0,
    # Profiles will be automatically collected while
    # there is an active span.
    profile_lifecycle="trace",
    # ___PRODUCT_OPTION_END___ profiling
    # ___PRODUCT_OPTION_START___ logs

    # Enable logs to be sent to Sentry
    enable_logs=True,
    # ___PRODUCT_OPTION_END___ logs
)
```

In async programs, it's recommended to call `sentry_sdk.init()` inside an `async` function to ensure async code is instrumented properly. If possible, we recommend calling `sentry_sdk.init()` at the beginning of the first `async` function you call.

```python
import asyncio
import sentry_sdk

async def main():
    sentry_sdk.init(
        ...  # same as above
    )

asyncio.run(main())
```

## [Verify](https://docs.sentry.io/platforms/python.md#verify)

Add this intentional error to your application to test that everything is working right away.

```py
division_by_zero = 1 / 0
```

Learn more about manually capturing an error or message in our [Usage documentation](https://docs.sentry.io/platforms/python/usage.md).

To view and resolve the recorded error, log into [sentry.io](https://sentry.io) and select your project. Clicking on the error's title will open a page where you can see detailed information and mark it as resolved.

Not seeing your error in Sentry? Make sure you're running the above example from a file and not from a Python shell like IPython.

## [Next Steps](https://docs.sentry.io/platforms/python.md#next-steps)

* Explore [practical guides](https://docs.sentry.io/guides.md) on what to monitor, log, track, and investigate after setup
* Dive straight into the API with our [API docs](https://getsentry.github.io/sentry-python/)

## Topics

- [Capturing Errors](https://docs.sentry.io/platforms/python/usage.md)
- [Logs](https://docs.sentry.io/platforms/python/logs.md)
- [Tracing](https://docs.sentry.io/platforms/python/tracing.md)
- [Application Metrics](https://docs.sentry.io/platforms/python/metrics.md)
- [Profiling](https://docs.sentry.io/platforms/python/profiling.md)
- [Crons](https://docs.sentry.io/platforms/python/crons.md)
- [User Feedback](https://docs.sentry.io/platforms/python/user-feedback.md)
- [Feature Flags](https://docs.sentry.io/platforms/python/feature-flags.md)
- [Sampling](https://docs.sentry.io/platforms/python/sampling.md)
- [Enriching Events](https://docs.sentry.io/platforms/python/enriching-events.md)
- [Legacy SDK](https://docs.sentry.io/platforms/python/legacy-sdk.md)
- [Extended Configuration](https://docs.sentry.io/platforms/python/configuration.md)
- [Integrations](https://docs.sentry.io/platforms/python/integrations.md)
- [Data Management](https://docs.sentry.io/platforms/python/data-management.md)
- [Security Policy Reporting](https://docs.sentry.io/platforms/python/security-policy-reporting.md)
- [Migration Guide](https://docs.sentry.io/platforms/python/migration.md)
- [Troubleshooting](https://docs.sentry.io/platforms/python/troubleshooting.md)
