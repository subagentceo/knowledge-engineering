# OpenFeature Go SDK

![Specification](https://img.shields.io/static/v1?label=specification&message=v0.7.0&color=yellow&style=for-the-badge)![Release](https://img.shields.io/static/v1?label=release&message=v1.17.2&color=blue&style=for-the-badge)  
![API Reference](https://pkg.go.dev/badge/github.com/open-feature/go-sdk/openfeature.svg)![Go Report Card](https://goreportcard.com/badge/github.com/open-feature/go-sdk)![codecov](https://codecov.io/gh/open-feature/go-sdk/branch/main/graph/badge.svg?token=FZ17BHNSU5)![CII Best Practices](https://bestpractices.coreinfrastructure.org/projects/6601/badge)

## Quick start​

**MCP Install**📋 Copy Prompt

Follow the MCP Getting Started guide to quickly set up the OpenFeature MCP server and connect your AI tool.

*   Run this prompt: `"Install OpenFeature into this app"`

**Quick Install:**

📦 Install in Cursor📦 Install in VS Code

```
claude mcp add --transport stdio openfeature npx -y @openfeature/mcp
```

### Requirements​

Go language version: 1.25

Note

The OpenFeature Go SDK only supports currently maintained Go language versions.

### Install​

```
go get github.com/open-feature/go-sdk
```

### Usage​

```
package mainimport (    "fmt"    "context"    "github.com/open-feature/go-sdk/openfeature")func main() {    // Register your feature flag provider    openfeature.SetProviderAndWait(openfeature.NoopProvider{})    // Create a new client    client := openfeature.NewClient("app")    // Evaluate your feature flag    v2Enabled := client.Boolean(        context.TODO(), "v2_enabled", true, openfeature.EvaluationContext{},    )    // Use the returned flag value    if v2Enabled {        fmt.Println("v2 is enabled")    }}
```

Try this example in the Go Playground.

### API Reference​

See here for the complete API documentation.

## Features​

Status

Features

Description

✅

Providers

Integrate with a commercial, open source, or in-house feature management tool.

✅

Targeting

Contextually-aware flag evaluation using evaluation context.

✅

Hooks

Add functionality to various stages of the flag evaluation life-cycle.

✅

Tracking

Associate user actions with feature flag evaluations.

✅

Logging

Integrate with popular logging packages.

✅

Domains

Logically bind clients with providers.

✅

Eventing

React to state changes in the provider or flag management system.

✅

Shutdown

Gracefully clean up a provider during application shutdown.

✅

Transaction Context Propagation

Set a specific evaluation context for a transaction (e.g. an HTTP request or a thread)

✅

Extending

Extend OpenFeature with custom providers and hooks.

Implemented: ✅ | In-progress: ⚠️ | Not implemented yet: ❌

### Providers​

Providers are an abstraction between a flag management system and the OpenFeature SDK. Look here for a complete list of available providers. If the provider you're looking for hasn't been created yet, see the develop a provider section to learn how to build it yourself.

Once you've added a provider as a dependency, it can be registered with OpenFeature like this:

```
openfeature.SetProviderAndWait(MyProvider{})
```

In some situations, it may be beneficial to register multiple providers in the same application. This is possible using domains, which is covered in more details below, or the included multiprovider implementation.

### Targeting​

Sometimes, the value of a flag must consider some dynamic criteria about the application or user, such as the user's location, IP, email address, or the server's location. In OpenFeature, we refer to this as targeting. If the flag management system you're using supports targeting, you can provide the input data using the evaluation context.

```
// set a value to the global contextopenfeature.SetEvaluationContext(openfeature.NewTargetlessEvaluationContext(    map[string]any{        "region":  "us-east-1-iah-1a",    },))// set a value to the client contextclient := openfeature.NewClient("my-app")client.SetEvaluationContext(openfeature.NewTargetlessEvaluationContext(    map[string]any{        "version":  "1.4.6",    },))// set a value to the invocation contextevalCtx := openfeature.NewEvaluationContext(    "user-123",    map[string]any{        "company": "Initech",    },)boolValue, err := client.BooleanValue(context.TODO(), "boolFlag", false, evalCtx)
```

### Hooks​

Hooks allow for custom logic to be added at well-defined points of the flag evaluation life-cycle Look here for a complete list of available hooks. If the hook you're looking for hasn't been created yet, see the develop a hook section to learn how to build it yourself.

Once you've added a hook as a dependency, it can be registered at the global, client, or flag invocation level.

```
// add a hook globally, to run on all evaluationsopenfeature.AddHooks(ExampleGlobalHook{})// add a hook on this client, to run on all evaluations made by this clientclient := openfeature.NewClient("my-app")client.AddHooks(ExampleClientHook{})// add a hook for this evaluation onlyvalue, err := client.BooleanValue(    context.TODO(), "boolFlag", false, openfeature.EvaluationContext{}, openfeature.WithHooks(ExampleInvocationHook{}),)
```

### Tracking​

The tracking API allows you to use OpenFeature abstractions and objects to associate user actions with feature flag evaluations. This is essential for robust experimentation powered by feature flags. For example, a flag enhancing the appearance of a UI component might drive user engagement to a new feature; to test this hypothesis, telemetry collected by a hook or provider can be associated with telemetry reported in the client's `track` function.

```
// initialize a clientclient := openfeature.NewClient("my-app")// trigger tracking event actionclient.Track(    context.TODO(),    "visited-promo-page",    openfeature.EvaluationContext{},    openfeature.NewTrackingEventDetails(99.77).Add("currencyCode", "USD"),    )
```

Note that some providers may not support tracking; check the documentation for your provider for more information.

### Logging​

Note that in accordance with the OpenFeature specification, the SDK doesn't generally log messages during flag evaluation.

#### Logging Hook​

The GO SDK includes a `LoggingHook`, which logs detailed information at key points during flag evaluation, using slog structured logging API. This hook can be particularly helpful for troubleshooting and debugging; simply attach it at the global, client or invocation level and ensure your log level is set to "debug".

##### Usage example​

```
package mainimport (    "context"    "log/slog"    "os"    "github.com/open-feature/go-sdk/openfeature"    "github.com/open-feature/go-sdk/openfeature/hooks"    "github.com/open-feature/go-sdk/openfeature/memprovider")func main() {    // Register an in-memory provider with no flags    openfeature.SetNamedProviderAndWait("example", memprovider.NewInMemoryProvider(map[string]memprovider.InMemoryFlag{}))    // Configure slog    handler := slog.NewJSONHandler(os.Stderr, &slog.HandlerOptions{Level: slog.LevelDebug})    logger := slog.New(handler)    // Register a logging hook globally to run on all evaluations    loggingHook := hooks.NewLoggingHook(false, logger)    openfeature.AddHooks(loggingHook)    // Create a new client    client := openfeature.NewClient("example")    // Attempt to evaluate a flag that doesn't exist    _ = client.Boolean(context.TODO(), "not-exist", true, openfeature.EvaluationContext{})}
```

###### Output​

```
{"time":"2025-06-03T10:49:23.100783-04:00","level":"DEBUG","msg":"Before stage","domain":"example","provider_name":"InMemoryProvider","flag_key":"not-exist","default_value":true,"stage":"before"}{"time":"2025-06-03T10:49:23.101037-04:00","level":"ERROR","msg":"Error stage","domain":"example","provider_name":"InMemoryProvider","flag_key":"not-exist","default_value":true,"error_message":"error code: FLAG_NOT_FOUND: flag for key not-exist not found","stage":"error"}
```

See hooks for more information on configuring hooks.

### Domains​

Clients can be assigned to a domain. A domain is a logical identifier that can be used to associate clients with a particular provider. If a domain has no associated provider, the default provider is used.

```
import (    "github.com/open-feature/go-sdk/openfeature"    "github.com/open-feature/go-sdk/openfeature/memprovider")// Registering the default provideropenfeature.SetProviderAndWait(openfeature.NoopProvider{})// Registering a named provideropenfeature.SetNamedProvider("clientForCache", memprovider.NewInMemoryProvider(map[string]memprovider.InMemoryFlag{}))// A Client backed by default providerclientWithDefault := openfeature.NewDefaultClient()// A Client backed by NewCachedProviderclientForCache := openfeature.NewClient("clientForCache")
```

### Eventing​

Events allow you to react to state changes in the provider or underlying flag management system, such as flag definition changes, provider readiness, or error conditions. Initialization events (`PROVIDER_READY` on success, `PROVIDER_ERROR` on failure) are dispatched for every provider. Some providers support additional events, such as `PROVIDER_CONFIGURATION_CHANGED`.

Please refer to the documentation of the provider you're using to see what events are supported.

```
import "github.com/open-feature/go-sdk/openfeature"...var readyHandlerCallback = func(details openfeature.EventDetails) {    // callback implementation}// Global event handleropenfeature.AddHandler(openfeature.ProviderReady, &readyHandlerCallback)...var providerErrorCallback = func(details openfeature.EventDetails) {    // callback implementation}client := openfeature.NewDefaultClient()// Client event handlerclient.AddHandler(openfeature.ProviderError, &providerErrorCallback)
```

### Shutdown​

The OpenFeature API provides a close function to perform a cleanup of all registered providers. This should only be called when your application is in the process of shutting down.

```
import "github.com/open-feature/go-sdk/openfeature"openfeature.Shutdown()
```

### Transaction Context Propagation​

Transaction context is a container for transaction-specific evaluation context (e.g. user id, user agent, IP). Transaction context can be set where specific data is available (e.g. an auth service or request handler), and by using the transaction context propagator, it will automatically be applied to all flag evaluations within a transaction (e.g. a request or thread).

```
import "github.com/open-feature/go-sdk/openfeature"// set the TransactionContextctx := openfeature.WithTransactionContext(context.TODO(), openfeature.EvaluationContext{})// get the TransactionContext from a contextec := openfeature.TransactionContext(ctx)// merge an EvaluationContext with the existing TransactionContext, preferring// the context that is passed to MergeTransactionContexttCtx := openfeature.MergeTransactionContext(ctx, openfeature.EvaluationContext{})// use TransactionContext in a flag evaluationclient.BooleanValue(tCtx, ....)
```

### Multi-Provider Implementation​

Included with this SDK is an _experimental_ multi-provider that can be used to query multiple feature flag providers simultaneously. More information can be found in the multi package's README.

## Extending​

### Develop a provider​

To develop a provider, you need to create a new project and include the OpenFeature SDK as a dependency. This can be a new repository or included in the existing contrib repository available under the OpenFeature organization. You’ll then need to write the provider by implementing the `FeatureProvider` interface exported by the OpenFeature SDK.

```
package myfeatureproviderimport (  "context"  "github.com/open-feature/go-sdk/openfeature")// MyFeatureProvider implements the FeatureProvider interface and provides functions for evaluating flagstype MyFeatureProvider struct{}// Required: Methods below implements openfeature.FeatureProvider interface// This is the core interface implementation required from a provider// Metadata returns the metadata of the providerfunc (i MyFeatureProvider) Metadata() openfeature.Metadata {  return openfeature.Metadata{    Name: "MyFeatureProvider",  }}// Hooks returns a collection of openfeature.Hook defined by this providerfunc (i MyFeatureProvider) Hooks() []openfeature.Hook {  // Hooks that should be included with the provider  return []openfeature.Hook{}}// BooleanEvaluation returns a boolean flagfunc (i MyFeatureProvider) BooleanEvaluation(ctx context.Context, flag string, defaultValue bool, flatCtx openfeature.FlattenedContext) openfeature.BoolResolutionDetail {  // code to evaluate boolean}// StringEvaluation returns a string flagfunc (i MyFeatureProvider) StringEvaluation(ctx context.Context, flag string, defaultValue string, flatCtx openfeature.FlattenedContext) openfeature.StringResolutionDetail {  // code to evaluate string}// FloatEvaluation returns a float flagfunc (i MyFeatureProvider) FloatEvaluation(ctx context.Context, flag string, defaultValue float64, flatCtx openfeature.FlattenedContext) openfeature.FloatResolutionDetail {  // code to evaluate float}// IntEvaluation returns an int flagfunc (i MyFeatureProvider) IntEvaluation(ctx context.Context, flag string, defaultValue int64, flatCtx openfeature.FlattenedContext) openfeature.IntResolutionDetail {  // code to evaluate int}// ObjectEvaluation returns an object flagfunc (i MyFeatureProvider) ObjectEvaluation(ctx context.Context, flag string, defaultValue any, flatCtx openfeature.FlattenedContext) openfeature.InterfaceResolutionDetail {  // code to evaluate object}// Optional: openfeature.StateHandler implementation// Providers can opt-in for initialization & shutdown behavior by implementing this interface// Init holds initialization logic of the providerfunc (i MyFeatureProvider) Init(evaluationContext openfeature.EvaluationContext) error {  // code to initialize your provider}// Shutdown define the shutdown operation of the providerfunc (i MyFeatureProvider) Shutdown() {  // code to shutdown your provider}// Optional: openfeature.EventHandler implementation.// Providers can opt-in for eventing support by implementing this interface// EventChannel returns the event channel of this providerfunc (i MyFeatureProvider) EventChannel() <-chan openfeature.Event {  // expose event channel from this provider. SDK listen to this channel and invoke event handlers}
```

> Built a new provider? Let us know so we can add it to the docs!

### Develop a hook​

To develop a hook, you need to create a new project and include the OpenFeature SDK as a dependency. This can be a new repository or included in the existing contrib repository available under the OpenFeature organization. Implement your own hook by conforming to the Hook interface. To satisfy the interface, all methods (`Before`/`After`/`Finally`/`Error`) need to be defined. To avoid defining empty functions make use of the `UnimplementedHook` struct (which already implements all the empty functions).

```
import (  "context"  "github.com/open-feature/go-sdk/openfeature")type MyHook struct {  openfeature.UnimplementedHook}// overrides UnimplementedHook's Error functionfunc (h MyHook) Error(context context.Context, hookContext openfeature.HookContext, err error, hookHints openfeature.HookHints) {  // code that runs when there's an error during a flag evaluation}
```

> Built a new hook? Let us know so we can add it to the docs!

## Testing​

The SDK provides a `NewTestProvider` which allows you to set flags for the scope of a test. The `TestProvider` is thread-safe and can be used in tests that run in parallel.

Call `testProvider.UsingFlags(t, tt.flags)` to set flags for a test, and clean them up with `testProvider.Cleanup()`

```
import (  "github.com/open-feature/go-sdk/openfeature"  "github.com/open-feature/go-sdk/openfeature/testing")testProvider := testing.NewTestProvider()err := openfeature.SetProviderAndWait(testProvider)if err != nil {  t.Errorf("unable to set provider")}// configure flags for this test suitetests := map[string]struct {  flags map[string]memprovider.InMemoryFlag  want  bool}{  "test when flag is true": {    flags: map[string]memprovider.InMemoryFlag{      "my_flag": {        State:          memprovider.Enabled,        DefaultVariant: "on",        Variants: map[string]any{          "on": true,        },      },    },    want: true,  },  "test when flag is false": {    flags: map[string]memprovider.InMemoryFlag{      "my_flag": {        State:          memprovider.Enabled,        DefaultVariant: "off",        Variants: map[string]any{          "off": false,        },      },    },    want: false,  },}for name, tt := range tests {  tt := tt  name := name  t.Run(name, func(t *testing.T) {    // be sure to clean up your flags    defer testProvider.Cleanup()    testProvider.UsingFlags(t, tt.flags)    // your code under test    got := functionUnderTest()    if got != tt.want {      t.Fatalf("uh oh, value is not as expected: got %v, want %v", got, tt.want)    }  })}
```

If your test code runs in a different goroutine, `TestProvider.UsingFlags` returns a context that should be used for evaluations.

You can pass `*testing.T` directly.

```
// In your test, 't' is a *testing.Tctx := testProvider.UsingFlags(t, tt.flags)go func() {    // Make sure to use the context returned by UsingFlags in the new goroutine.    // The context carries the necessary information for the TestProvider.    _ = openfeature.NewDefaultClient().Boolean(ctx, "my_flag", false, openfeature.EvaluationContext{})}()
```

### Mocks​

Mocks are also available for testing purposes for all interfaces within the OpenFeature SDK. These are primarily intended for internal use for testing the SDK, but have been exported to ease the testing burden for any extensions or custom components (e.g. hooks & providers). These mocks are not include in builds by default. The build tag `testtools` must be used to have the mocks included in builds.