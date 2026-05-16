---
title: "Godot Engine"
description: "Learn how to set up Sentry's Godot Engine SDK for error monitoring and performance tracking."
url: https://docs.sentry.io/platforms/godot/
---

# Godot Engine | Sentry for Godot Engine

Our SDK for Godot Engine builds on top of existing Sentry SDKs, extending them with Godot-specific features. It gives developers helpful hints for where and why an error or performance issue might have occurred.

**Features:**

* Native support for automatic crash and error reporting for:

  * Windows and Linux using the [Native SDK](https://docs.sentry.io/platforms/native.md) to support C and C++ with minidumps
  * macOS using the [macOS SDK](https://docs.sentry.io/platforms/apple/guides/macos.md) to support Objective-C, Swift, C and C++
  * iOS using the [iOS SDK](https://docs.sentry.io/platforms/apple/guides/ios.md) to support Objective-C, Swift, C and C++
  * Android using the [Android SDK](https://docs.sentry.io/platforms/android.md) to support Java, Kotlin, C and C++
  * Web using the [JavaScript SDK](https://docs.sentry.io/platforms/javascript.md) to support WebAssembly and JavaScript

* Automatically capture Godot runtime errors, such as script and shader errors

* GDScript stack traces with optional [local and member variable](https://docs.sentry.io/platforms/godot/configuration/options.md#logger_include_variables) information

* Include surrounding script source code with events when available at runtime

* [Structured Logs](https://docs.sentry.io/platforms/godot/logs.md) that automatically capture console output like `print()` statements and connect to your traces with searchable attributes

* [Enrich events](https://docs.sentry.io/platforms/godot/enriching-events.md) with tags, breadcrumbs, contexts, and attachments

* Information about user configuration like GPU, CPU, platform and such

* [Filter and customize events](https://docs.sentry.io/platforms/godot/data-management/sensitive-data.md#scrubbing-data) in `before_send` callback (in GDScript)

* [Log-file attachments](https://docs.sentry.io/platforms/godot/configuration/options.md#attach_log) for events

* [Scene tree data attachments](https://docs.sentry.io/platforms/godot/enriching-events/view-hierarchy.md) for events

* [Screenshot attachments](https://docs.sentry.io/platforms/godot/enriching-events/screenshots.md) for events (experimental)

* [Release Health](https://docs.sentry.io/platforms/godot/configuration/releases.md) to keep track of crash-free users and sessions

* [Event throttling](https://docs.sentry.io/platforms/godot/configuration/options.md#logger_limits) to handle spammy errors

On this page, we get you up and running with Sentry's SDK.

Don't already have an account and Sentry project established? Head over to [sentry.io](https://sentry.io/signup/), then return to this page.

## [Install](https://docs.sentry.io/platforms/godot.md#install)

Sentry captures data through our addon for Godot Engine which you can install in your project.

Download the latest stable version `1.6.0` from [GitHub Releases](https://github.com/getsentry/sentry-godot/releases/). Extract the `addons/sentry` folder from the archive into your project.

Ensure that the addon is placed in the `addons/sentry` folder, preserving the exact casing.

A separate **demo project** archive is also available on the releases page. It contains a ready-to-run Godot project with examples of common features like error capturing, breadcrumbs, and user feedback. To use it, enter your DSN in **Project Settings > Sentry > Options**.

## [Configure](https://docs.sentry.io/platforms/godot.md#configure)

The minimum configuration required is the [DSN](https://docs.sentry.io/product/sentry-basics/dsn-explainer.md) to your project.

Sentry can be configured via Project Settings or [in GDScript](https://docs.sentry.io/platforms/godot/configuration/options.md). To access project settings in Godot Engine, navigate to `Project` > `Project Settings...`, then scroll down the sections list on the left until you find the Sentry section.

Your configuration is saved in the `project.godot` file along with other project settings.

## [Verify](https://docs.sentry.io/platforms/godot.md#verify)

Add a `Node` to your test scene and attach a script with the following content:

```GDScript
extends Node

func _ready():
	SentrySDK.add_breadcrumb(SentryBreadcrumb.create("Just about to welcome the World."))
	SentrySDK.capture_message("Hello, World!")
```

This snippet includes message capturing, so you can test that everything is working as soon as you set it up.

Learn more about manually capturing an error or message in our [Usage documentation](https://docs.sentry.io/platforms/godot/usage.md).

To view and resolve the recorded error, log into [sentry.io](https://sentry.io) and select your project. Clicking on the error's title will open a page where you can see detailed information and mark it as resolved.

## [Next Steps](https://docs.sentry.io/platforms/godot.md#next-steps)

* Explore [practical guides](https://docs.sentry.io/guides.md) on what to monitor, log, track, and investigate after setup

## Topics

- [Configuration](https://docs.sentry.io/platforms/godot/configuration.md)
- [Usage](https://docs.sentry.io/platforms/godot/usage.md)
- [Enriching Events](https://docs.sentry.io/platforms/godot/enriching-events.md)
- [Data Management](https://docs.sentry.io/platforms/godot/data-management.md)
- [Logs](https://docs.sentry.io/platforms/godot/logs.md)
- [Application Metrics](https://docs.sentry.io/platforms/godot/metrics.md)
- [User Feedback](https://docs.sentry.io/platforms/godot/user-feedback.md)
- [Migration Guide](https://docs.sentry.io/platforms/godot/migration.md)
