---
title: "Unity"
description: "Learn how to set up Sentry's Unity SDK for error monitoring and performance tracking."
url: https://docs.sentry.io/platforms/unity/
---

# Unity | Sentry for Unity

Our Unity SDK builds on top of the [.NET SDK](https://docs.sentry.io/platforms/dotnet.md) and extends it with Unity-specific features. It gives you helpful hints for where and why an error or performance issue might have occurred.

**Features:**

* [Automatically captures C# errors](https://docs.sentry.io/platforms/unity/usage/automatic-error-capture.md) on multiple platforms, including: Android, iOS, macOS, Linux, Windows, and WebGL

* Line numbers for C# [exceptions in IL2CPP builds](https://docs.sentry.io/platforms/unity/configuration/il2cpp.md)

* [Native support](https://docs.sentry.io/platforms/unity/native-support.md) for automatic crash error tracking for:

  * Android by using the [Android SDK](https://docs.sentry.io/platforms/android.md) to support Java, Kotlin, C and C++
  * iOS by using the [iOS SDK](https://docs.sentry.io/platforms/apple/guides/ios.md) to support Objective-C, Swift, C and C++
  * Windows and Linux by using the [Native SDK](https://docs.sentry.io/platforms/native.md) to support C and C++ with minidumps
  * macOS by using the [macOS SDK](https://docs.sentry.io/platforms/apple/guides/macos.md) to support Objective-C, Swift, C and C++
  * [PlayStation](https://docs.sentry.io/platforms/playstation.md), [Xbox](https://docs.sentry.io/platforms/xbox.md) and [Nintendo Switch](https://docs.sentry.io/platforms/nintendo-switch.md) support

* [Screenshot attachments](https://docs.sentry.io/platforms/unity/enriching-events/screenshots.md) for errors

* [ViewHierarchy attachments](https://docs.sentry.io/platforms/unity/enriching-events/view-hierarchy.md) for errors

* [Offline Caching](https://docs.sentry.io/platforms/unity/configuration/options.md#InitCacheFlushTimeout) stores event data to disk in case the device is not online

* [Release Health](https://docs.sentry.io/platforms/unity/configuration/releases.md) to keep track of crash-free users and sessions

* [Structured Logging](https://docs.sentry.io/platforms/unity/logs.md) to capture and send log messages with additional context

* [Metrics](https://docs.sentry.io/platforms/unity/metrics.md) to track counters, gauges, and distributions

* [Automatically adding breadcrumbs](https://docs.sentry.io/platforms/unity/enriching-events/breadcrumbs.md#automatic-breadcrumbs) for

  * Unity's `Debug.Log` and `Debug.LogWarning`
  * Scene load, unload, active change

* [Event debouncing](https://docs.sentry.io/platforms/unity/configuration/event-debouncing.md) to handle high amounts of log output i.e. during `Update`

On this page, we get you up and running with Sentry's SDK.

Don't already have an account and Sentry project established? Head over to [sentry.io](https://sentry.io/signup/), then return to this page.

## [Install](https://docs.sentry.io/platforms/unity.md#install)

Install the package via the [Unity Package Manager using a Git URL](https://docs.unity3d.com/Manual/upm-ui-giturl.html) to Sentry's SDK repository:

```bash
https://github.com/getsentry/unity.git
```

To use a specific version of the SDK, append `#4.4.0` to the URL.

## [Configure](https://docs.sentry.io/platforms/unity.md#configure)

Installing the SDK will add an entry to Unity's top menu: `Tools` > `Sentry`. When you first open the menu, a wizard will guide you through the process of associating your game with a Sentry project and set up the initial configuration for you. The minimum configuration required is the [DSN](https://docs.sentry.io/product/sentry-basics/dsn-explainer.md) to your project.

```json
{
  "public-dsn": "https://<key>@o<orgId>.ingest.sentry.io/<projectId>"
}
```

Sentry can be further configured via the Sentry configuration window or [programmatically](https://docs.sentry.io/platforms/unity/configuration/options.md).

Sentry saves your configuration to `Assets/Resources/Sentry/SentryOptions.asset` and reads from there both at build time and runtime.

## [Verify](https://docs.sentry.io/platforms/unity.md#verify)

This snippet includes an intentional error, so you can test that everything is working as soon as you set it up.

```csharp
using UnityEngine;

public class TestMonoBehaviour : MonoBehaviour
{
    private GameObject testObject = null;

    void Start()
    {
        Debug.Log("Captured Log");              // Adds a Breadcrumb
        Debug.LogWarning("Captured Warning");   // Adds a Breadcrumb
        Debug.LogError("Captured Error");       // Get's captured as an Error by default

        // This will throw an unhandled 'NullReferenceException'
        testObject.GetComponent<Transform>();   // Get's captured as an Error
    }
}
```

Additionally, the packages also includes a sample called "Unity of Bugs" that you can import into your project through the Package Manager. The samples contain a variety of common bugs, including native errors, so you don't have to write them yourself.

Learn more about manually capturing an error or message in our [Usage documentation](https://docs.sentry.io/platforms/unity/usage.md).

To view and resolve the recorded error, log into [sentry.io](https://sentry.io) and select your project. Clicking on the error's title will open a page where you can see detailed information and mark it as resolved.

## [Next Steps](https://docs.sentry.io/platforms/unity.md#next-steps)

* Explore [practical guides](https://docs.sentry.io/guides.md) on what to monitor, log, track, and investigate after setup

## Topics

- [Basic Configuration](https://docs.sentry.io/platforms/unity/configuration.md)
- [Game Consoles](https://docs.sentry.io/platforms/unity/game-consoles.md)
- [Usage](https://docs.sentry.io/platforms/unity/usage.md)
- [Native Support](https://docs.sentry.io/platforms/unity/native-support.md)
- [Enriching Events](https://docs.sentry.io/platforms/unity/enriching-events.md)
- [Data Management](https://docs.sentry.io/platforms/unity/data-management.md)
- [Tracing](https://docs.sentry.io/platforms/unity/tracing.md)
- [Logs](https://docs.sentry.io/platforms/unity/logs.md)
- [Application Metrics](https://docs.sentry.io/platforms/unity/metrics.md)
- [User Feedback](https://docs.sentry.io/platforms/unity/user-feedback.md)
- [Migration Guide](https://docs.sentry.io/platforms/unity/migration.md)
- [Troubleshooting](https://docs.sentry.io/platforms/unity/troubleshooting.md)
