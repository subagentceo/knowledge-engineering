---
title: "Android"
description: "Learn how to set up Sentry's Android SDK for error monitoring and performance tracking."
url: https://docs.sentry.io/platforms/android/
---

# Android | Sentry for Android

On this page, we get you up and running with Sentry's Android SDK, automatically reporting errors and exceptions in your application.

If you don't already have an account and Sentry project established, head over to [sentry.io](https://sentry.io/signup/), then return to this page.

## [Features](https://docs.sentry.io/platforms/android.md#features)

In addition to capturing errors, you can monitor interactions between multiple services or applications by [enabling tracing](https://docs.sentry.io/concepts/key-terms/tracing.md). You can also collect and analyze performance profiles from real users with [profiling](https://docs.sentry.io/product/explore/profiling.md).

Select which Sentry features you'd like to install in addition to Error Monitoring to get the corresponding installation and configuration instructions below.

Error Monitoring\[ ]Tracing\[ ]Profiling\[ ]Session Replay\[ ]Logs

Profiling uses the Android runtime's `tracer` under the hood to sample threads. There are known issues that this `tracer` can cause crashes in certain circumstances. See this [troubleshooting](https://docs.sentry.io/platforms/android/profiling/troubleshooting.md#i-see-elevated-number-of-crashes-in-the-android-runtime-when-profiling-is-activated) entry for more information.

## [Install](https://docs.sentry.io/platforms/android.md#install)

Sentry captures data by using an SDK within your application's runtime. These are platform-specific and allow Sentry to have a deep understanding of how your application works.

We recommend installing the SDK through our [Sentry Wizard](https://github.com/getsentry/sentry-wizard) by running one of the following commands inside your project directory:

```bash
brew install getsentry/tools/sentry-wizard && sentry-wizard -i android
```

This will patch your project and configure the SDK. You only need to patch the project once, then you can add the patched files to your version control system. If you prefer, you can also [set up the SDK manually](https://docs.sentry.io/platforms/android/manual-setup.md) or follow the instructions below to adapt the [configuration](https://docs.sentry.io/platforms/android.md#configure).

The following tasks will be performed by the Sentry Wizard

The wizard will prompt you to log in to Sentry. It'll then automatically do the following steps for you:

* Update your app's `build.gradle` file with the Sentry Gradle plugin and configure it
* Update your `AndroidManifest.xml` with the default Sentry configuration
* Create `sentry.properties` with an auth token to upload proguard mappings (this file is automatically added to `.gitignore`)
* Add an example error to your app's Main Activity to verify your Sentry setup

## [Configure](https://docs.sentry.io/platforms/android.md#configure)

Configuration is done via the application `AndroidManifest.xml`. Here's an example config which should get you started:

`AndroidManifest.xml`

```xml
<application>
  <!-- Required: set your sentry.io project identifier (DSN) -->
  <meta-data
    android:name="io.sentry.dsn"
    android:value="___PUBLIC_DSN___"
  />
  <!-- Add data like request headers, user ip address and device name, see https://docs.sentry.io/platforms/android/data-management/data-collected/ for more info -->
  <meta-data
    android:name="io.sentry.send-default-pii"
    android:value="true"
  />
  <!-- ___PRODUCT_OPTION_START___ performance -->
  <!-- Enable the performance API by setting a sample-rate, adjust in production env -->
  <meta-data
    android:name="io.sentry.traces.sample-rate"
    android:value="1.0"
  />
  <!-- ___PRODUCT_OPTION_END___ performance -->
  <!-- ___PRODUCT_OPTION_START___ profiling -->
  <!-- Enable profiling, adjust in production env. This is evaluated only once per session -->
  <meta-data
    android:name="io.sentry.traces.profiling.session-sample-rate"
    android:value="1.0"
  />
  <!-- Set profiling lifecycle, can be `manual` (controlled through `Sentry.startProfiler()` and `Sentry.stopProfiler()`) or `trace` (automatically starts and stop a profile whenever a sampled trace starts and finishes) -->
  <meta-data
    android:name="io.sentry.traces.profiling.lifecycle"
    android:value="trace"
  />
  <!-- Enable profiling on app start -->
  <meta-data
    android:name="io.sentry.traces.profiling.start-on-app-start"
    android:value="true"
  />
  <!-- ___PRODUCT_OPTION_END___ profiling -->
  <!-- ___PRODUCT_OPTION_START___ logs -->
  <!-- Enable logs to be sent to Sentry -->
  <meta-data android:name="io.sentry.logs.enabled" android:value="true" />
  <!-- ___PRODUCT_OPTION_END___ logs -->
  <!-- ___PRODUCT_OPTION_START___ session-replay -->
  <!-- Record session replays for 100% of errors and 10% of sessions -->
  <meta-data
    android:name="io.sentry.session-replay.on-error-sample-rate"
    android:value="1.0"
  />
  <meta-data
    android:name="io.sentry.session-replay.session-sample-rate"
    android:value="0.1"
  />
  <!-- ___PRODUCT_OPTION_END___ session-replay -->
</application>
```

## [Verify](https://docs.sentry.io/platforms/android.md#verify)

Verify that your app is sending events to Sentry by adding the following snippet, which includes an intentional error. You should see the error reported in Sentry within a few minutes.

```java
import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import java.lang.Exception;
import io.sentry.Sentry;

public class MyActivity extends AppCompatActivity {
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    try {
      throw new Exception("This is a test.");
    } catch (Exception e) {
      Sentry.captureException(e);
    }
  }
}
```

## [Next Steps](https://docs.sentry.io/platforms/android.md#next-steps)

* Explore [practical guides](https://docs.sentry.io/guides.md) on what to monitor, log, track, and investigate after setup
* [Learn about the features of Sentry's Android SDK](https://docs.sentry.io/platforms/android/features.md)
* [Learn how to enhance stack traces of your Sentry errors](https://docs.sentry.io/platforms/android/enhance-errors.md)
* [Enrich events with additional context to make debugging simpler](https://docs.sentry.io/platforms/android/enriching-events.md)
* [Diagnose ANRs](https://docs.sentry.io/platforms/android/configuration/app-not-respond.md) with profiling and automatic fingerprinting

## Topics

- [Features](https://docs.sentry.io/platforms/android/features.md)
- [Manual Setup](https://docs.sentry.io/platforms/android/manual-setup.md)
- [Extended Configuration](https://docs.sentry.io/platforms/android/configuration.md)
- [Capturing Errors](https://docs.sentry.io/platforms/android/usage.md)
- [Enhance Error Reporting](https://docs.sentry.io/platforms/android/enhance-errors.md)
- [Integrations](https://docs.sentry.io/platforms/android/integrations.md)
- [Enriching Events](https://docs.sentry.io/platforms/android/enriching-events.md)
- [Data Management](https://docs.sentry.io/platforms/android/data-management.md)
- [Tracing](https://docs.sentry.io/platforms/android/tracing.md)
- [Application Metrics](https://docs.sentry.io/platforms/android/metrics.md)
- [Profiling](https://docs.sentry.io/platforms/android/profiling.md)
- [Size Analysis](https://docs.sentry.io/platforms/android/size-analysis.md)
- [Build Distribution](https://docs.sentry.io/platforms/android/build-distribution.md)
- [Snapshots](https://docs.sentry.io/platforms/android/snapshots.md)
- [Session Replay](https://docs.sentry.io/platforms/android/session-replay.md)
- [Logs](https://docs.sentry.io/platforms/android/logs.md)
- [User Feedback](https://docs.sentry.io/platforms/android/user-feedback.md)
- [Mobile SDK Releases](https://docs.sentry.io/platforms/android/releases.md)
- [Feature Flags](https://docs.sentry.io/platforms/android/feature-flags.md)
- [SDK Overhead](https://docs.sentry.io/platforms/android/overhead.md)
- [Migration Guide](https://docs.sentry.io/platforms/android/migration.md)
- [Troubleshooting](https://docs.sentry.io/platforms/android/troubleshooting.md)
