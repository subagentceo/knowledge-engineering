---
title: "Python"
description: "Learn how to set up Sentry in your Python app, capture your first errors and traces, and view them in Sentry."
url: https://docs.sentry.io/platforms/python/
---

# Python | Sentry for Python

##### Using a framework?

This guide focuses on plain Python. If you're working with Django, FastAPI, Starlette, or any other web framework, choose the respective guide from the list of supported [frameworks](https://docs.sentry.io/platforms/python/integrations.md#web-frameworks).

## [Prerequisites](https://docs.sentry.io/platforms/python.md#prerequisites)

You need:

* A Sentry [account](https://sentry.io/signup/) and [project](https://docs.sentry.io/product/projects.md)
* Your application up and running

## [Install](https://docs.sentry.io/platforms/python.md#install)

Run the command for your preferred package manager to add the Sentry SDK to your application:

```bash
pip install "sentry-sdk"
```

*Other available variations of the above snippet: uv, poetry*

## [Configure](https://docs.sentry.io/platforms/python.md#configure)

Choose the features you want to configure, and this guide will show you how:

Error Monitoring\[ ]Tracing\[ ]Profiling\[ ]Logs\[ ]Metrics

Want to learn more about these features?

* [**Issues**](https://docs.sentry.io/product/issues.md) (always enabled): Sentry's core error monitoring product that automatically reports errors, uncaught exceptions, and unhandled rejections. If you have something that looks like an exception, Sentry can capture it.
* [**Tracing**](https://docs.sentry.io/product/tracing.md): Track software performance while seeing the impact of errors across multiple systems. For example, distributed tracing allows you to follow a request from the frontend to the backend and back.
* [**Profiling**](https://docs.sentry.io/product/explore/profiling.md): Gain deeper insight than traditional tracing without custom instrumentation, letting you discover slow-to-execute or resource-intensive functions in your app.
* [**Logs**](https://docs.sentry.io/product/explore/logs.md): Centralize and analyze your application logs to correlate them with errors and performance issues. Search, filter, and visualize log data to understand what's happening in your applications.
* [**Application Metrics**](https://docs.sentry.io/product/explore/metrics.md): Track and analyze custom application metrics, such as response times and database query durations, to understand trends and patterns in your application's performance and behavior over time.

### [Initialize the Sentry SDK](https://docs.sentry.io/platforms/python.md#initialize-the-sentry-sdk)

Configuration should happen as **early as possible** in your application's lifecycle.

Import and initialize the SDK in your app's entry point:

```python
import sentry_sdk
# ___PRODUCT_OPTION_START___ metrics
from sentry_sdk import metrics
# ___PRODUCT_OPTION_END___ metrics

sentry_sdk.init(
    dsn="https://<key>@o<orgId>.ingest.sentry.io/<projectId>",

    # Add request headers and IP for users,
    # see https://docs.sentry.io/platforms/python/data-management/data-collected/ for more info
    send_default_pii=True,
    # ___PRODUCT_OPTION_START___ performance

    # Set traces_sample_rate to 1.0 to capture 100%
    # of transactions for tracing.
    # see https://docs.sentry.io/platforms/python/configuration/options/#traces_sample_rate for more info
    traces_sample_rate=1.0,
    # ___PRODUCT_OPTION_END___ performance
    # ___PRODUCT_OPTION_START___ profiling

    # Enables continuous profiling.
    # To collect profiles for all profile sessions,
    # set `profile_session_sample_rate` to 1.0.
    # see https://docs.sentry.io/platforms/python/configuration/options/#profile_session_sample_rate for more info
    profile_session_sample_rate=1.0,

    # Profiles will be automatically collected while
    # there is an active span.
    # see https://docs.sentry.io/platforms/python/configuration/options/#profile_lifecycle for more info
    profile_lifecycle="trace",
    # ___PRODUCT_OPTION_END___ profiling
    # ___PRODUCT_OPTION_START___ logs

    # Enable logs to be sent to Sentry
    # see https://docs.sentry.io/platforms/python/configuration/options/#enable_logs for more info
    enable_logs=True,
    # ___PRODUCT_OPTION_END___ logs
)
```

In async programs, we recommend to initialize the Sentry SDK inside an `async` function to ensure async code is instrumented properly. If possible, call `sentry_sdk.init()` at the beginning of the first `async` function you call:

```python
import asyncio
import sentry_sdk
# ___PRODUCT_OPTION_START___ metrics
from sentry_sdk import metrics
# ___PRODUCT_OPTION_END___ metrics


async def main():
    sentry_sdk.init(
        ...  # same as above
    )

asyncio.run(main())
```

### [Instrumenting Your App](https://docs.sentry.io/platforms/python.md#instrumenting-your-app)

The Sentry SDK automatically enables integrations for [many popular libraries](https://docs.sentry.io/platforms/python/tracing/instrumentation/automatic-instrumentation.md), so operations like HTTP requests or database queries made with supported libraries will be captured as spans automatically.

However, spans are only created within an existing transaction. If you're not using a supported framework that creates transactions automatically, you'll need to create them manually using `sentry_sdk.start_transaction()`.

See [Custom Instrumentation](https://docs.sentry.io/platforms/python/tracing/instrumentation/custom-instrumentation.md) for more info.

```python
import sentry_sdk

def some_function():
    with sentry_sdk.start_transaction(op="task", name="Test Transaction"):
        ...
```

## [Verify Your Setup](https://docs.sentry.io/platforms/python.md#verify-your-setup)

Let's test your setup and confirm that data reaches your Sentry project.

Errors triggered from a Python shell like IPython will not trigger Sentry's error monitoring. Make sure you're running the examples from a file instead.

### [Issues](https://docs.sentry.io/platforms/python.md#issues)

To verify that Sentry captures errors and creates issues in your Sentry project, add this intentional error to your application:

```py
import sentry_sdk

division_by_zero = 1 / 0
```

### [Tracing](https://docs.sentry.io/platforms/python.md#tracing)

To test your tracing configuration, create a custom transaction and span:

```py
import sentry_sdk

with sentry_sdk.start_transaction(op="task", name="Transaction Name"):
    span = sentry_sdk.start_span(name="Custom Span Name")
    span.finish()
```

### [Logs](https://docs.sentry.io/platforms/python.md#logs)

To verify that Sentry catches your logs, add some log statements to your application:

```py
import sentry_sdk

sentry_sdk.logger.info("This is an info log message")
sentry_sdk.logger.warning("This is a warning message")
sentry_sdk.logger.error("This is an error message")
```

### [Metrics](https://docs.sentry.io/platforms/python.md#metrics)

Send test metrics from your app to verify metrics are arriving in Sentry:

```py
from sentry_sdk import metrics

metrics.count("checkout.failed", 1)
metrics.gauge("queue.depth", 42)
metrics.distribution("cart.amount_usd", 187.5)
```

### [View Captured Data in Sentry](https://docs.sentry.io/platforms/python.md#view-captured-data-in-sentry)

Now, head over to your project on [Sentry.io](https://sentry.io) to view the collected data (it takes a couple of moments for the data to appear).

Need help locating the captured errors in your Sentry project?

* Open the [**Issues**](https://sentry.io/orgredirect/organizations/:orgslug/issues/) page and select an error from the issues list to view the full details and context of this error. For more details, see this [interactive walkthrough](https://docs.sentry.io/product/sentry-basics/integrate-frontend/generate-first-error.md#ui-walkthrough).
* Open the [**Traces**](https://sentry.io/orgredirect/organizations/:orgslug/explore/traces/) page and select a trace to reveal more information about each span, its duration, and any errors. For an interactive UI walkthrough, click [here](https://docs.sentry.io/product/sentry-basics/distributed-tracing/generate-first-error.md#ui-walkthrough).
* Open the [**Profiles**](https://sentry.io/orgredirect/organizations/:orgslug/profiling/) page, select a transaction, and then a profile ID to view its flame graph. For more information, click [here](https://docs.sentry.io/product/explore/profiling/profile-details.md).
* Open the [**Logs**](https://sentry.io/orgredirect/organizations/:orgslug/explore/logs/) page and filter by service, environment, or search keywords to view log entries from your application. For an interactive UI walkthrough, click [here](https://docs.sentry.io/product/explore/logs.md#overview).
* Open the [**Application Metrics**](https://sentry.io/orgredirect/organizations/:orgslug/explore/metrics) page to view and analyze your metrics. For more details, see this [interactive walkthrough](https://docs.sentry.io/product/explore/metrics.md#overview).

## [Next Steps](https://docs.sentry.io/platforms/python.md#next-steps)

At this point, you should have integrated Sentry into your Python application and should already be sending data to your Sentry project.

Now's a good time to customize your setup and look into more advanced topics. Our next recommended steps for you are:

* Explore [practical guides](https://docs.sentry.io/guides.md) on what to monitor, log, track, and investigate after setup
* Continue to [customize your configuration](https://docs.sentry.io/platforms/python/configuration.md)
* Learn more about [manually capturing errors or messages](https://docs.sentry.io/platforms/python/usage.md)
* Dive straight into the API with our [API docs](https://getsentry.github.io/sentry-python/)

Are you having problems setting up the SDK?

* Find various topics in [Troubleshooting](https://docs.sentry.io/platforms/python/troubleshooting.md)
* [Get support](https://www.sentry.help/en/)

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
