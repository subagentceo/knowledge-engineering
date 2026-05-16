---
title: "Dart"
url: https://docs.sentry.io/platforms/dart/
---

# Dart | Sentry for Dart

On this page, we get you up and running with Sentry's Dart SDK.

If you don't already have an account and Sentry project established, head over to [sentry.io](https://sentry.io/signup/), then return to this page.

## [Features](https://docs.sentry.io/platforms/dart.md#features)

In addition to capturing errors, you can monitor interactions between multiple services or applications by [enabling tracing](https://docs.sentry.io/concepts/key-terms/tracing.md).

Select which Sentry features you'd like to install in addition to Error Monitoring to get the corresponding installation and configuration instructions below.

Sentry provides a dedicated [Flutter SDK](https://docs.sentry.io/platforms/dart/guides/flutter.md) as well.

## [Install](https://docs.sentry.io/platforms/dart.md#install)

Error Monitoring\[ ]Tracing

Sentry captures data by using an SDK within your application's runtime.

`pubspec.yaml`

```yml
dependencies:
  sentry: ^9.20.0
```

## [Configure](https://docs.sentry.io/platforms/dart.md#configure)

To capture all errors, initialize the Sentry Dart SDK as soon as possible.

```dart
import 'package:sentry/sentry.dart';

Future<void> main() async {
  await Sentry.init((options) {
    options.dsn = '___PUBLIC_DSN___';
    // Adds request headers and IP for users, for more info visit:
    // https://docs.sentry.io/platforms/dart/data-management/data-collected/
    options.sendDefaultPii = true;
    // ___PRODUCT_OPTION_START___ performance
    // Set tracesSampleRate to 1.0 to capture 100% of transactions for tracing.
    // We recommend adjusting this value in production.
    options.tracesSampleRate = 1.0;
    // ___PRODUCT_OPTION_END___ performance
  });

  // you can also configure SENTRY_DSN, SENTRY_RELEASE, SENTRY_DIST, and
  // SENTRY_ENVIRONMENT via Dart environment variable (--dart-define)
}
```

## [Verify](https://docs.sentry.io/platforms/dart.md#verify)

Verify that your app is sending events to Sentry by adding the following snippet, which includes an intentional error. You should see the error reported in Sentry within a few minutes.

```dart
import 'package:sentry/sentry.dart';

try {
  throw StateError('Sentry Test Error');
} catch (exception, stackTrace) {
  await Sentry.captureException(
    exception,
    stackTrace: stackTrace,
  );
}
```

## [Next Steps](https://docs.sentry.io/platforms/dart.md#next-steps)

* Explore [practical guides](https://docs.sentry.io/guides.md) on what to monitor, log, track, and investigate after setup
* [Learn about the features of Sentry's Dart SDK](https://docs.sentry.io/platforms/dart/features.md)
* [Add performance instrumentation to your app](https://docs.sentry.io/platforms/dart/tracing/instrumentation.md)

## Frameworks

- [Flutter](https://docs.sentry.io/platforms/dart/guides/flutter.md)

## Topics

- [Features](https://docs.sentry.io/platforms/dart/features.md)
- [Debug Symbols](https://docs.sentry.io/platforms/dart/debug-symbols.md)
- [Basic Configuration](https://docs.sentry.io/platforms/dart/configuration.md)
- [Integrations](https://docs.sentry.io/platforms/dart/integrations.md)
- [Usage](https://docs.sentry.io/platforms/dart/usage.md)
- [Enriching Events](https://docs.sentry.io/platforms/dart/enriching-events.md)
- [Data Management](https://docs.sentry.io/platforms/dart/data-management.md)
- [Tracing](https://docs.sentry.io/platforms/dart/tracing.md)
- [Logs](https://docs.sentry.io/platforms/dart/logs.md)
- [Application Metrics](https://docs.sentry.io/platforms/dart/metrics.md)
- [User Feedback](https://docs.sentry.io/platforms/dart/user-feedback.md)
- [Set Up Feature Flags](https://docs.sentry.io/platforms/dart/feature-flags.md)
- [SDK Overhead](https://docs.sentry.io/platforms/dart/overhead.md)
- [Migration Guide](https://docs.sentry.io/platforms/dart/migration.md)
