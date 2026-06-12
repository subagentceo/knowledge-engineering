---
title: "Unreal Engine"
description: "Learn how to set up Sentry's Unreal Engine SDK for error monitoring and performance tracking."
url: https://docs.sentry.io/platforms/unreal/
---

# Unreal Engine | Sentry for Unreal Engine

Unreal Engine SDK builds on top of other Sentry SDKs and extends them with Unreal Engine specific features. It gives developers helpful hints for where and why an error or performance issue might have occurred.

**Features:**

* Native support for automatic crash error tracking for

  * Windows (UE 5.2+) and Linux by using the [Native SDK](https://docs.sentry.io/platforms/native.md) to support C and C++ with minidumps
  * macOS by using the [macOS SDK](https://docs.sentry.io/platforms/apple/guides/macos.md) to support Objective-C, Swift, C and C++
  * iOS by using the [iOS SDK](https://docs.sentry.io/platforms/apple/guides/ios.md) to support Objective-C, Swift, C and C++
  * Android by using the [Android SDK](https://docs.sentry.io/platforms/android.md) to support Java, Kotlin, C and C++

* [Crash Reporter](https://docs.sentry.io/platforms/unreal/configuration/crash-reporter.md) support

  * [Sentry Crash Reporter](https://docs.sentry.io/platforms/unreal/configuration/crash-reporter/sentry-crash-reporter.md) - standalone app for collecting user feedback after a crash
  * Compatibility with the default [Crash Reporter Client](https://docs.sentry.io/platforms/unreal/configuration/crash-reporter/crash-reporter-client.md) provided along with Unreal Engine

* [PlayStation](https://docs.sentry.io/platforms/playstation.md), [Xbox](https://docs.sentry.io/platforms/xbox.md) and [Nintendo Switch](https://docs.sentry.io/platforms/nintendo-switch.md) support

* [Release health](https://docs.sentry.io/platforms/unreal/configuration/releases.md) to keep track of crash free users and sessions

* [Session Replay](https://docs.sentry.io/platforms/unreal/session-replay.md) (experimental) to attach gameplay video to crash reports on Windows, macOS, Linux, and Xbox, and native session replay on Android

* [Structured Logging](https://docs.sentry.io/platforms/unreal/logs.md) to capture and send log messages with additional context

* [Metrics](https://docs.sentry.io/platforms/unreal/metrics.md) to track counters, gauges, and distributions

* [Offline Caching](https://docs.sentry.io/platforms/unreal/configuration/options.md#EnableOfflineCaching) stores event data to disk in case the device is not online

To automatically capture crashes on Windows with UE 5.1 or older, you have to configure the [Crash Reporter Client](https://docs.sentry.io/platforms/unreal/configuration/crash-reporter/crash-reporter-client.md). Starting from UE 5.2, the provided API allows you to switch between default (CRC) and third-party (Sentry) crash-handling solutions, so the CRC configuration step isn't required. The two are mutually exclusive and can't be used simultaneously.

On this page, we get you up and running with Sentry's SDK.

Don't already have an account and Sentry project established? Head over to [sentry.io](https://sentry.io/signup/), then return to this page.

## [Install](https://docs.sentry.io/platforms/unreal.md#install)

Sentry captures data by using an SDK within your application’s runtime.

The Unreal Engine (UE) SDK is officially supported for the three latest UE versions. However, it is likely to be compatible with older engine versions as well depending on the specific features and functionality that you need.

We recommend downloading the latest plugin sources from the [GitHub Releases page](https://github.com/getsentry/sentry-unreal/releases), but we also support [alternate installation methods](https://docs.sentry.io/platforms/unreal/install.md).

To integrate Sentry into your Unreal Engine project using the GitHub package, select the artifact that matches your Unreal Engine version. Place the extracted files in your project's `Plugins` directory. On the next project launch, UE will prompt you to build the Sentry and SentryEditor modules.

Currently, this method is available only for C++ UE projects. Blueprint projects can be converted to a C++ one by adding an empty class using the editor.

To make sure the Sentry plugin has been enabled after installation has been completed, go to the editor and navigate to the **Settings > Plugins > Code Plugins** menu and check for the installation.

To access the plugin API from within C++, add `Sentry` support to the build script (`MyProject.build.cs`):

```csharp
PublicDependencyModuleNames.AddRange(new string[] { ..., "Sentry" });
```

## [Configure](https://docs.sentry.io/platforms/unreal.md#configure)

The minimum configuration required is the [DSN](https://docs.sentry.io/product/sentry-basics/dsn-explainer.md) of your project:

```json
{
  "public-dsn": "https://<key>@o<orgId>.ingest.sentry.io/<projectId>"
}
```

If you are logged in, you can also go to your project settings and copy its DSN directly from there.

Sentry can be configured using the Sentry configuration window. The window can be accessed by going to editor's menu: **Project Settings > Plugins > Sentry**.

By default, the SDK is automatically initialized on application startup. Alternatively, the `Initialize SDK automatically` option can be disabled and in this case, explicit SDK initialization is required.

To override SDK settings at runtime, use the `InitializeWithSettings` method of the `SentrySubsystem` class.

## [Verify](https://docs.sentry.io/platforms/unreal.md#verify)

This snippet includes message capturing, so you can test that everything is working as soon as you set it up:

```cpp
#include "SentrySubsystem.h"

void Verify()
{
    // Capture message
    USentrySubsystem* SentrySubsystem = GEngine->GetEngineSubsystem<USentrySubsystem>();
    SentrySubsystem->CaptureMessage(TEXT("Capture message"));
}
```

The same result can be achieved by calling corresponding function in blueprint:

Learn more about manually capturing an error or message in our [Usage documentation](https://docs.sentry.io/platforms/unreal/usage.md).

To view and resolve the recorded error, log into [sentry.io](https://sentry.io) and select your project. Clicking on the error's title will open a page where you can see detailed information and mark it as resolved.

## [Store Minidumps as Attachments](https://docs.sentry.io/platforms/unreal.md#store-minidumps-as-attachments)

[Minidumps](https://docs.sentry.io/platforms/native/guides/minidumps.md#what-is-a-minidump) may contain sensitive information about the target system, such as environment variables, local pathnames, or in-memory representations of input fields, including passwords. By default, Sentry only uses minidump files to create events and immediately drops them. All sensitive information is stripped from the resulting events.

All attachment types, including log files, screenshots and minidumps (if you enable Store Minidumps As Attachments), are retained for 30 or 90 days, based on [your plan's data retention period](https://docs.sentry.io/security-legal-pii/security/data-retention-periods.md#default-data-retention-by-plan) when sent to Sentry. Note that Sentry does not apply data scrubbing to attachments.

☝ This feature is supported on Windows, Linux, and Android.

### [Enabling Minidump Storage](https://docs.sentry.io/platforms/unreal.md#enabling-minidump-storage)

You can enable *Store Minidumps As Attachments* in your organization or project settings under **Security & Privacy**. By default, this setting is disabled. Determine the maximum number of crash reports that will be stored per issue; disabled, unlimited, or maximum per issue:

If you set a limit per issue, as in the example above, a limit of 5, Sentry will store the first 5 attachments associated with this issue, but drop any that follow. To make room for additional attachments, delete them. Sentry will then accept attachments until the limit is reached again.

## [Next Steps](https://docs.sentry.io/platforms/unreal.md#next-steps)

* Explore [practical guides](https://docs.sentry.io/guides.md) on what to monitor, log, track, and investigate after setup

## Topics

- [Installation Methods](https://docs.sentry.io/platforms/unreal/install.md)
- [Basic Configuration](https://docs.sentry.io/platforms/unreal/configuration.md)
- [Game Consoles](https://docs.sentry.io/platforms/unreal/game-consoles.md)
- [Usage](https://docs.sentry.io/platforms/unreal/usage.md)
- [Enriching Events](https://docs.sentry.io/platforms/unreal/enriching-events.md)
- [Data Management](https://docs.sentry.io/platforms/unreal/data-management.md)
- [Tracing](https://docs.sentry.io/platforms/unreal/tracing.md)
- [Session Replay](https://docs.sentry.io/platforms/unreal/session-replay.md)
- [Logs](https://docs.sentry.io/platforms/unreal/logs.md)
- [Application Metrics](https://docs.sentry.io/platforms/unreal/metrics.md)
- [User Feedback](https://docs.sentry.io/platforms/unreal/user-feedback.md)
- [Migration Guide](https://docs.sentry.io/platforms/unreal/migration.md)
- [Troubleshooting](https://docs.sentry.io/platforms/unreal/troubleshooting.md)
