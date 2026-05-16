---
title: ".NET"
description: "Learn how to set up and run Sentry's .NET SDK, which will automatically report errors and exceptions in your application."
url: https://docs.sentry.io/platforms/dotnet/
---

# .NET | Sentry for .NET

If you don't already have an account and Sentry project established, head over to [sentry.io](https://sentry.io/signup/), then return to this page.

You can use these instructions to run Sentry in an app running on:

* Windows
* macOS
* Linux
* Android
* iOS

If you're using a framework, such as ASP.NET Core or MAUI, please select the framework on the drop down on the top left.

## [Features](https://docs.sentry.io/platforms/dotnet.md#features)

In addition to capturing errors, you can monitor interactions between multiple services or applications by [enabling tracing](https://docs.sentry.io/concepts/key-terms/tracing.md). You can also collect and analyze performance profiles from real users with [profiling](https://docs.sentry.io/product/explore/profiling.md).

Select which Sentry features you'd like to install in addition to Error Monitoring to get the corresponding installation and configuration instructions below.

## [Install](https://docs.sentry.io/platforms/dotnet.md#install)

Error Monitoring\[ ]Tracing\[ ]Profiling

Sentry captures data by using an SDK within your application's runtime. These are platform-specific and allow Sentry to have a deep understanding of how your application works.

Install the **NuGet** package to add the Sentry dependency:

```shell
dotnet add package Sentry -v 6.5.0
```

```shell
dotnet add package Sentry.Profiling -v 6.5.0
```

## [Configure](https://docs.sentry.io/platforms/dotnet.md#configure)

To capture all errors, even the one during the startup of your application, you should initialize the Sentry .NET SDK as soon as possible.

```csharp
SentrySdk.Init(options =>
{
    options.Dsn = "___PUBLIC_DSN___";
    options.Debug = true;
    // Adds request URL and headers, IP and name for users, etc.
    options.SendDefaultPii = true;
    // ___PRODUCT_OPTION_START___ performance
    // A fixed sample rate of 1.0 - 100% of all transactions are getting sent
    options.TracesSampleRate = 1.0f;
    // ___PRODUCT_OPTION_END___ performance
    // ___PRODUCT_OPTION_START___ profiling
    // A sample rate for profiling - this is relative to TracesSampleRate
    options.ProfilesSampleRate = 1.0f;
    // ___PRODUCT_OPTION_END___ profiling
});
```

## [Verify](https://docs.sentry.io/platforms/dotnet.md#verify)

This snippet includes an intentional error, so you can test that everything is working as soon as you set it up.

```csharp
try
{
    throw null;
}
catch (Exception ex)
{
    SentrySdk.CaptureException(ex);
}
```

## [Next Steps](https://docs.sentry.io/platforms/dotnet.md#next-steps)

* Explore [practical guides](https://docs.sentry.io/guides.md) on what to monitor, log, track, and investigate after setup

## Frameworks

- [.NET for Android](https://docs.sentry.io/platforms/dotnet/guides/android.md)
- [.NET for iOS, macOS, and Mac Catalyst](https://docs.sentry.io/platforms/dotnet/guides/apple.md)
- [ASP.NET](https://docs.sentry.io/platforms/dotnet/guides/aspnet.md)
- [ASP.NET Core](https://docs.sentry.io/platforms/dotnet/guides/aspnetcore.md)
- [AWS Lambda](https://docs.sentry.io/platforms/dotnet/guides/aws-lambda.md)
- [Azure Functions](https://docs.sentry.io/platforms/dotnet/guides/azure-functions-worker.md)
- [Blazor Interactive SSR](https://docs.sentry.io/platforms/dotnet/guides/blazor-server.md)
- [Blazor WebAssembly](https://docs.sentry.io/platforms/dotnet/guides/blazor-webassembly.md)
- [Entity Framework](https://docs.sentry.io/platforms/dotnet/guides/entityframework.md)
- [Google Cloud Functions](https://docs.sentry.io/platforms/dotnet/guides/google-cloud-functions.md)
- [log4net](https://docs.sentry.io/platforms/dotnet/guides/log4net.md)
- [MAUI](https://docs.sentry.io/platforms/dotnet/guides/maui.md)
- [Microsoft.Extensions.Logging](https://docs.sentry.io/platforms/dotnet/guides/extensions-logging.md)
- [NLog](https://docs.sentry.io/platforms/dotnet/guides/nlog.md)
- [Serilog](https://docs.sentry.io/platforms/dotnet/guides/serilog.md)
- [Windows Forms](https://docs.sentry.io/platforms/dotnet/guides/winforms.md)
- [WinUI](https://docs.sentry.io/platforms/dotnet/guides/winui.md)
- [WPF](https://docs.sentry.io/platforms/dotnet/guides/wpf.md)
- [Xamarin](https://docs.sentry.io/platforms/dotnet/guides/xamarin.md)

## Topics

- [Capturing Errors](https://docs.sentry.io/platforms/dotnet/usage.md)
- [Enriching Events](https://docs.sentry.io/platforms/dotnet/enriching-events.md)
- [Extended Configuration](https://docs.sentry.io/platforms/dotnet/configuration.md)
- [Logs](https://docs.sentry.io/platforms/dotnet/logs.md)
- [Application Metrics](https://docs.sentry.io/platforms/dotnet/metrics.md)
- [Data Management](https://docs.sentry.io/platforms/dotnet/data-management.md)
- [Security Policy Reporting](https://docs.sentry.io/platforms/dotnet/security-policy-reporting.md)
- [Tracing](https://docs.sentry.io/platforms/dotnet/tracing.md)
- [Migration Guide](https://docs.sentry.io/platforms/dotnet/migration.md)
- [Profiling](https://docs.sentry.io/platforms/dotnet/profiling.md)
- [Crons](https://docs.sentry.io/platforms/dotnet/crons.md)
- [Troubleshooting](https://docs.sentry.io/platforms/dotnet/troubleshooting.md)
- [Unit Testing](https://docs.sentry.io/platforms/dotnet/unit-testing.md)
- [User Feedback](https://docs.sentry.io/platforms/dotnet/user-feedback.md)
- [Legacy SDK](https://docs.sentry.io/platforms/dotnet/legacy-sdk.md)
