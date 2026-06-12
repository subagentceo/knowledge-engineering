---
title: "Go"
description: "Sentry's Go SDK supports all recent versions of the language, and integrates well with a variety of popular frameworks and packages in the Go ecosystem. It gives developers helpful hints for where and why an error or panic might have occurred."
url: https://docs.sentry.io/platforms/go/
---

# Go | Sentry for Go

On this page, we get you up and running with Sentry's SDK. If you are using our previous Go SDK, you can access the [legacy SDK](https://docs.sentry.io/platforms/go/legacy-sdk.md) documentation, until further notice.

##### Using a framework?

Check out the other SDKs we support in the left-hand dropdown.

## [Prerequisites](https://docs.sentry.io/platforms/go.md#prerequisites)

* If you don't have an account and Sentry project established already, please head over to [Sentry](https://sentry.io/signup/), and then return to this page.

## [Install](https://docs.sentry.io/platforms/go.md#install)

Install our Go SDK using `go get`:

```shell
go get github.com/getsentry/sentry-go
```

Consult the [Go documentation](https://github.com/golang/go/wiki/Modules#how-to-upgrade-and-downgrade-dependencies) for more information on how to manage your dependencies.

## [Configure](https://docs.sentry.io/platforms/go.md#configure)

Configuration should happen as early as possible in your application's lifecycle.

Error Monitoring\[ ]Tracing\[ ]Logs

```go
err := sentry.Init(sentry.ClientOptions{
    Dsn: "https://<key>@o<orgId>.ingest.sentry.io/<projectId>",
    // Enable printing of SDK debug messages.
    // Useful when getting started or trying to figure something out.
    Debug: true,
    // Adds request headers and IP for users,
    // visit: https://docs.sentry.io/platforms/go/data-management/data-collected/ for more info
    SendDefaultPII: true,
    // ___PRODUCT_OPTION_START___ performance
    EnableTracing: true,
    // Set TracesSampleRate to 1.0 to capture 100%
    // of transactions for tracing.
    TracesSampleRate: 1.0,
    // ___PRODUCT_OPTION_END___ performance
    // ___PRODUCT_OPTION_START___ logs
    EnableLogs: true,
    // ___PRODUCT_OPTION_END___ logs
})
if err != nil {
    log.Fatalf("sentry.Init: %s", err)
}
// Flush buffered events before the program terminates.
// Set the timeout to the maximum duration the program can afford to wait.
defer sentry.Flush(2 * time.Second)
```

## [Verify](https://docs.sentry.io/platforms/go.md#verify)

This snippet includes an intentional error, so you can test that everything is working as soon as you set it up.

```go
package main

import (
	"log"
	"time"

	"github.com/getsentry/sentry-go"
)

func main() {
	err := sentry.Init(sentry.ClientOptions{
		Dsn: "https://<key>@o<orgId>.ingest.sentry.io/<projectId>",
		// Adds request headers and IP for users,
        // visit: https://docs.sentry.io/platforms/go/data-management/data-collected/ for more info
        SendDefaultPII: true,
	})
	if err != nil {
		log.Fatalf("sentry.Init: %s", err)
	}
	defer sentry.Flush(2 * time.Second)

	sentry.CaptureMessage("It works!")
}
```

Learn more about manually capturing an error or message in our [Usage documentation](https://docs.sentry.io/platforms/go/usage.md).

To view and resolve the recorded error, log into [sentry.io](https://sentry.io) and select your project. Clicking on the error's title will open a page where you can see detailed information and mark it as resolved.

## [Next Steps](https://docs.sentry.io/platforms/go.md#next-steps)

* Learn how to set up [Source Context](https://docs.sentry.io/platforms/go/source-context.md) for readable stack traces
* Explore [practical guides](https://docs.sentry.io/guides.md) on what to monitor, log, track, and investigate after setup

## Frameworks

- [Echo](https://docs.sentry.io/platforms/go/guides/echo.md)
- [FastHTTP](https://docs.sentry.io/platforms/go/guides/fasthttp.md)
- [Fiber](https://docs.sentry.io/platforms/go/guides/fiber.md)
- [Gin](https://docs.sentry.io/platforms/go/guides/gin.md)
- [gRPC](https://docs.sentry.io/platforms/go/guides/grpc.md)
- [Iris](https://docs.sentry.io/platforms/go/guides/iris.md)
- [Negroni](https://docs.sentry.io/platforms/go/guides/negroni.md)
- [net/http](https://docs.sentry.io/platforms/go/guides/http.md)

## Topics

- [Extended Configuration](https://docs.sentry.io/platforms/go/configuration.md)
- [Capturing Errors](https://docs.sentry.io/platforms/go/usage.md)
- [Source Context](https://docs.sentry.io/platforms/go/source-context.md)
- [Legacy SDK](https://docs.sentry.io/platforms/go/legacy-sdk.md)
- [Integrations](https://docs.sentry.io/platforms/go/integrations.md)
- [Enriching Events](https://docs.sentry.io/platforms/go/enriching-events.md)
- [Data Management](https://docs.sentry.io/platforms/go/data-management.md)
- [Tracing](https://docs.sentry.io/platforms/go/tracing.md)
- [Logs](https://docs.sentry.io/platforms/go/logs.md)
- [Application Metrics](https://docs.sentry.io/platforms/go/metrics.md)
- [Crons](https://docs.sentry.io/platforms/go/crons.md)
- [User Feedback](https://docs.sentry.io/platforms/go/user-feedback.md)
- [Security Policy Reporting](https://docs.sentry.io/platforms/go/security-policy-reporting.md)
- [Migration Guide](https://docs.sentry.io/platforms/go/migration.md)
- [Troubleshooting](https://docs.sentry.io/platforms/go/troubleshooting.md)
