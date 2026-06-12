# OpenFeature .NET SDK

![Specification](https://img.shields.io/static/v1?label=specification&message=v0.8.0&color=yellow&style=for-the-badge) ![Release](https://img.shields.io/static/v1?label=release&message=v2.13.0&color=blue&style=for-the-badge)

![Slack](https://img.shields.io/badge/slack-%40cncf%2Fopenfeature-brightgreen?style=flat&logo=slack) ![Codecov](https://codecov.io/gh/open-feature/dotnet-sdk/branch/main/graph/badge.svg?token=MONAVJBXUJ) ![NuGet](https://img.shields.io/nuget/vpre/OpenFeature) ![CII Best Practices](https://bestpractices.coreinfrastructure.org/projects/6250/badge)

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

*   .NET 8+
*   .NET Framework 4.6.2+

Note that the packages will aim to support all current .NET versions. Refer to the currently supported versions .NET and .NET Framework excluding .NET Framework 3.5

### NativeAOT Support​

✅ **Full NativeAOT Compatibility** - The OpenFeature .NET SDK is fully compatible with .NET NativeAOT compilation for fast startup and small deployment size. See the AOT Compatibility Guide for detailed instructions.

> While the core OpenFeature SDK is fully NativeAOT compatible, contrib and community-provided providers, hooks, and extensions may not be. Please check with individual provider/hook documentation for their NativeAOT compatibility status.

### Install​

Use the following to initialize your project:

```
dotnet new console
```

and install OpenFeature:

```
dotnet add package OpenFeature
```

### Usage​

```
public async Task Example(){    // Register your feature flag provider    try    {        await Api.Instance.SetProviderAsync(new InMemoryProvider());    }    catch (Exception ex)    {        // Log error    }    // Create a new client    FeatureClient client = Api.Instance.GetClient();    // Evaluate your feature flag    bool v2Enabled = await client.GetBooleanValueAsync("v2_enabled", false);    if ( v2Enabled )    {        // Do some work    }}
```

### Samples​

The `samples/` folder contains example applications demonstrating how to use OpenFeature in different .NET scenarios.

Sample Name

Description

AspNetCore

Feature flags in an ASP.NET Core Web API.

Console

Feature flags in a .NET console app.

**Getting Started with a Sample:**

1.  Navigate to the sample directory
    
    ```
    cd samples/AspNetCore
    ```
    
2.  Restore dependencies and run
    
    ```
    dotnet run
    ```
    

Want to contribute a new sample? See our CONTRIBUTING guide!

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

Set a specific evaluation context for a transaction (e.g. an HTTP request or a thread).

✅

Extending

Extend OpenFeature with custom providers and hooks.

🔬

Multi-Provider

Use multiple feature flag providers simultaneously with configurable evaluation strategies.

🔬

DependencyInjection

Integrate OpenFeature with .NET's dependency injection for streamlined provider setup.

> Implemented: ✅ | In-progress: ⚠️ | Not implemented yet: ❌ | Experimental: 🔬

### Providers​

Providers are an abstraction between a flag management system and the OpenFeature SDK. Here is a complete list of available providers.

If the provider you're looking for hasn't been created yet, see the develop a provider section to learn how to build it yourself.

Once you've added a provider as a dependency, it can be registered with OpenFeature like this:

```
try{    await Api.Instance.SetProviderAsync(new MyProvider());}catch (Exception ex){    // Log error}
```

When calling `SetProviderAsync` an exception may be thrown if the provider cannot be initialized. This may occur if the provider has not been configured correctly. See the documentation for the provider you are using for more information on how to configure the provider correctly.

In some situations, it may be beneficial to register multiple providers in the same application. This is possible using domains, which is covered in more detail below.

### Targeting​

Sometimes, the value of a flag must consider some dynamic criteria about the application or user such as the user's location, IP, email address, or the server's location. In OpenFeature, we refer to this as targeting. If the flag management system you're using supports targeting, you can provide the input data using the evaluation context.

```
// set a value to the global contextEvaluationContextBuilder builder = EvaluationContext.Builder();builder.Set("region", "us-east-1");EvaluationContext apiCtx = builder.Build();Api.Instance.SetContext(apiCtx);// set a value to the client contextbuilder = EvaluationContext.Builder();builder.Set("region", "us-east-1");EvaluationContext clientCtx = builder.Build();var client = Api.Instance.GetClient();client.SetContext(clientCtx);// set a value to the invocation contextbuilder = EvaluationContext.Builder();builder.Set("region", "us-east-1");EvaluationContext reqCtx = builder.Build();bool flagValue = await client.GetBooleanValueAsync("some-flag", false, reqCtx);
```

### Hooks​

Hooks allow for custom logic to be added at well-defined points of the flag evaluation life-cycle. Look here for a complete list of available hooks. If the hook you're looking for hasn't been created yet, see the develop a hook section to learn how to build it yourself.

Once you've added a hook as a dependency, it can be registered at the global, client, or flag invocation level.

```
// add a hook globally, to run on all evaluationsApi.Instance.AddHooks(new ExampleGlobalHook());// add a hook on this client, to run on all evaluations made by this clientvar client = Api.Instance.GetClient();client.AddHooks(new ExampleClientHook());// add a hook for this evaluation onlyvar value = await client.GetBooleanValueAsync("boolFlag", false, context, new FlagEvaluationOptions(new ExampleInvocationHook()));
```

### Logging​

The .NET SDK uses Microsoft.Extensions.Logging. See the manual for complete documentation. Note that in accordance with the OpenFeature specification, the SDK doesn't generally log messages during flag evaluation. If you need further troubleshooting, please look into the `Logging Hook` section.

#### Logging Hook​

The .NET SDK includes a LoggingHook, which logs detailed information at key points during flag evaluation, using Microsoft.Extensions.Logging structured logging API. This hook can be particularly helpful for troubleshooting and debugging; simply attach it at the global, client or invocation level and ensure your log level is set to "debug".

```
using var loggerFactory = LoggerFactory.Create(builder => builder.AddConsole());var logger = loggerFactory.CreateLogger("Program");var client = Api.Instance.GetClient();client.AddHooks(new LoggingHook(logger));
```

See hooks for more information on configuring hooks.

### Domains​

Clients can be assigned to a domain. A domain is a logical identifier which can be used to associate clients with a particular provider. If a domain has no associated provider, the default provider is used.

```
try{    // registering the default provider    await Api.Instance.SetProviderAsync(new LocalProvider());    // registering a provider to a domain    await Api.Instance.SetProviderAsync("clientForCache", new CachedProvider());}catch (Exception ex){    // Log error}// a client backed by default providerFeatureClient clientDefault = Api.Instance.GetClient();// a client backed by CachedProviderFeatureClient scopedClient = Api.Instance.GetClient("clientForCache");
```

Domains can be defined on a provider during registration. For more details, please refer to the providers section.

### Eventing​

Events allow you to react to state changes in the provider or underlying flag management system, such as flag definition changes, provider readiness, or error conditions. Initialization events (`PROVIDER_READY` on success, `PROVIDER_ERROR` on failure) are dispatched for every provider. Some providers support additional events, such as `PROVIDER_CONFIGURATION_CHANGED`.

Please refer to the documentation of the provider you're using to see what events are supported.

Example usage of an Event handler:

```
public static void EventHandler(ProviderEventPayload eventDetails){    Console.WriteLine(eventDetails.Type);}
```

```
EventHandlerDelegate callback = EventHandler;// add an implementation of the EventHandlerDelegate for the PROVIDER_READY eventApi.Instance.AddHandler(ProviderEventTypes.ProviderReady, callback);
```

It is also possible to register an event handler for a specific client, as in the following example:

```
EventHandlerDelegate callback = EventHandler;var myClient = Api.Instance.GetClient("my-client");try{    var provider = new ExampleProvider();    await Api.Instance.SetProviderAsync(myClient.GetMetadata().Name, provider);}catch (Exception ex){    // Log error}myClient.AddHandler(ProviderEventTypes.ProviderReady, callback);
```

### Tracking​

The tracking API allows you to use OpenFeature abstractions and objects to associate user actions with feature flag evaluations. This is essential for robust experimentation powered by feature flags. For example, a flag enhancing the appearance of a UI component might drive user engagement to a new feature; to test this hypothesis, telemetry collected by a hook(#hooks) or provider(#providers) can be associated with telemetry reported in the client's `track` function.

```
var client = Api.Instance.GetClient();client.Track("visited-promo-page", trackingEventDetails: TrackingEventDetails.Builder().SetValue(99.77).Set("currency", "USD").Build());
```

Note that some providers may not support tracking; check the documentation for your provider for more information.

### Shutdown​

The OpenFeature API provides a close function to perform a cleanup of all registered providers. This should only be called when your application is in the process of shutting down.

```
// Shut down all providersawait Api.Instance.ShutdownAsync();
```

### Transaction Context Propagation​

Transaction context is a container for transaction-specific evaluation context (e.g. user id, user agent, IP). Transaction context can be set where specific data is available (e.g. an auth service or request handler) and by using the transaction context propagator it will automatically be applied to all flag evaluations within a transaction (e.g. a request or thread). By default, the `NoOpTransactionContextPropagator` is used, which doesn't store anything. To register a AsyncLocal context propagator, you can use the `SetTransactionContextPropagator` method as shown below.

```
// registering the AsyncLocalTransactionContextPropagatorApi.Instance.SetTransactionContextPropagator(new AsyncLocalTransactionContextPropagator());
```

Once you've registered a transaction context propagator, you can propagate the data into request-scoped transaction context.

```
// adding userId to transaction contextEvaluationContext transactionContext = EvaluationContext.Builder()    .Set("userId", userId)    .Build();Api.Instance.SetTransactionContext(transactionContext);
```

Additionally, you can develop a custom transaction context propagator by implementing the `TransactionContextPropagator` interface and registering it as shown above.

## Extending​

### Develop a provider​

To develop a provider, you need to create a new project and include the OpenFeature SDK as a dependency. This can be a new repository or included in the existing contrib repository available under the OpenFeature organization. You’ll then need to write the provider by implementing the `FeatureProvider` interface exported by the OpenFeature SDK.

```
public class MyProvider : FeatureProvider{    public override Metadata GetMetadata()    {        return new Metadata("My Provider");    }    public override Task<ResolutionDetails<bool>> ResolveBooleanValueAsync(string flagKey, bool defaultValue, EvaluationContext? context = null, CancellationToken cancellationToken = default)    {        // resolve a boolean flag value    }    public override Task<ResolutionDetails<string>> ResolveStringValueAsync(string flagKey, string defaultValue, EvaluationContext? context = null, CancellationToken cancellationToken = default)    {        // resolve a string flag value    }    public override Task<ResolutionDetails<int>> ResolveIntegerValueAsync(string flagKey, int defaultValue, EvaluationContext? context = null, CancellationToken cancellationToken = default)    {        // resolve an int flag value    }    public override Task<ResolutionDetails<double>> ResolveDoubleValueAsync(string flagKey, double defaultValue, EvaluationContext? context = null, CancellationToken cancellationToken = default)    {        // resolve a double flag value    }    public override Task<ResolutionDetails<Value>> ResolveStructureValueAsync(string flagKey, Value defaultValue, EvaluationContext? context = null, CancellationToken cancellationToken = default)    {        // resolve an object flag value    }}
```

### Develop a hook​

To develop a hook, you need to create a new project and include the OpenFeature SDK as a dependency. This can be a new repository or included in the existing contrib repository available under the OpenFeature organization. Implement your own hook by conforming to the `Hook interface`. To satisfy the interface, all methods (`Before`/`After`/`Finally`/`Error`) need to be defined.

```
public class MyHook : Hook{  public override ValueTask<EvaluationContext> BeforeAsync<T>(HookContext<T> context,      IReadOnlyDictionary<string, object>? hints = null,      CancellationToken cancellationToken = default)  {    // code to run before flag evaluation  }  public override ValueTask AfterAsync<T>(HookContext<T> context, FlagEvaluationDetails<T> details,      IReadOnlyDictionary<string, object>? hints = null,      CancellationToken cancellationToken = default)  {    // code to run after successful flag evaluation  }  public override ValueTask ErrorAsync<T>(HookContext<T> context, Exception error,      IReadOnlyDictionary<string, object>? hints = null,      CancellationToken cancellationToken = default)  {    // code to run if there's an error during before hooks or during flag evaluation  }  public override ValueTask FinallyAsync<T>(HookContext<T> context, FlagEvaluationDetails<T> evaluationDetails,      IReadOnlyDictionary<string, object>? hints = null,      CancellationToken cancellationToken = default)  {    // code to run after all other stages, regardless of success/failure  }}
```

Hooks support passing per-evaluation data between that stages using `hook data`. The below example hook uses `hook data` to measure the duration between the execution of the `before` and `after` stage.

```
    class TimingHook : Hook    {        public override ValueTask<EvaluationContext> BeforeAsync<T>(HookContext<T> context,            IReadOnlyDictionary<string, object>? hints = null,            CancellationToken cancellationToken = default)        {            context.Data.Set("beforeTime", DateTime.Now);            return ValueTask.FromResult(context.EvaluationContext);        }        public override ValueTask AfterAsync<T>(HookContext<T> context, FlagEvaluationDetails<T> details,            IReadOnlyDictionary<string, object>? hints = null,            CancellationToken cancellationToken = default)        {            var beforeTime = context.Data.Get("beforeTime") as DateTime?;            var duration = DateTime.Now - beforeTime;            Console.WriteLine($"Duration: {duration}");            return ValueTask.CompletedTask;        }    }
```

Built a new hook? Let us know so we can add it to the docs!

### Multi-Provider​

Note

The Multi-Provider feature is currently experimental.

The Multi-Provider enables the use of multiple underlying feature flag providers simultaneously, allowing different providers to be used for different flag keys or based on specific evaluation strategies.

The Multi-Provider supports provider hooks and executes them in accordance with the OpenFeature specification. Each provider's hooks are executed with context isolation, ensuring that context modifications by one provider's hooks do not affect other providers.

#### Basic Usage​

```
using OpenFeature.Providers.MultiProvider;using OpenFeature.Providers.MultiProvider.Models;using OpenFeature.Providers.MultiProvider.Strategies;// Create provider entriesvar providerEntries = new List<ProviderEntry>{    new(new InMemoryProvider(provider1Flags), "Provider1"),    new(new InMemoryProvider(provider2Flags), "Provider2")};// Create multi-provider with FirstMatchStrategy (default)var multiProvider = new MultiProvider(providerEntries, new FirstMatchStrategy());// Set as the default providerawait Api.Instance.SetProviderAsync(multiProvider);// Use normally - the multi-provider will handle delegationvar client = Api.Instance.GetClient();var flagValue = await client.GetBooleanValueAsync("my-flag", false);
```

#### Evaluation Strategies​

The Multi-Provider supports different evaluation strategies that determine how multiple providers are used:

##### FirstMatchStrategy (Default)​

Evaluates providers sequentially and returns the first result that is not "flag not found". If any provider returns an error, that error is returned immediately.

```
var multiProvider = new MultiProvider(providerEntries, new FirstMatchStrategy());
```

##### FirstSuccessfulStrategy​

Evaluates providers sequentially and returns the first successful result, ignoring errors. Only if all providers fail will errors be returned.

```
var multiProvider = new MultiProvider(providerEntries, new FirstSuccessfulStrategy());
```

##### ComparisonStrategy​

Evaluates all providers in parallel and compares results. If values agree, returns the agreed value. If they disagree, returns the fallback provider's value (or first provider if no fallback is specified) and optionally calls a mismatch callback.

```
// Basic comparisonvar multiProvider = new MultiProvider(providerEntries, new ComparisonStrategy());// With fallback providervar multiProvider = new MultiProvider(providerEntries,    new ComparisonStrategy(fallbackProvider: provider1));// With mismatch callbackvar multiProvider = new MultiProvider(providerEntries,    new ComparisonStrategy(onMismatch: (mismatchDetails) => {        // Log or handle mismatches between providers        foreach (var kvp in mismatchDetails)        {            Console.WriteLine($"Provider {kvp.Key}: {kvp.Value}");        }    }));
```

#### Evaluation Modes​

The Multi-Provider supports two evaluation modes:

*   **Sequential**: Providers are evaluated one after another (used by `FirstMatchStrategy` and `FirstSuccessfulStrategy`)
*   **Parallel**: All providers are evaluated simultaneously (used by `ComparisonStrategy`)

#### Limitations​

*   **Experimental status**: The API may change in future releases

For a complete example, see the AspNetCore sample which demonstrates Multi-Provider usage.

### Dependency Injection​

Note

The OpenFeature.Hosting package is currently experimental. The Hosting package streamlines the integration of OpenFeature within .NET applications, allowing for seamless configuration and lifecycle management of feature flag providers using dependency injection and hosting services.

#### Installation​

To set up dependency injection and hosting capabilities for OpenFeature, install the following package:

```
dotnet add package OpenFeature.Hosting
```

#### Usage Examples​

For a basic configuration, you can use the InMemoryProvider. This provider is simple and well-suited for development and testing purposes.

**Basic Configuration:**

```
builder.Services.AddOpenFeature(featureBuilder => {    featureBuilder        .AddInMemoryProvider();});
```

You can add EvaluationContext, hooks, and handlers at a global/API level as needed.

```
builder.Services.AddOpenFeature(featureBuilder => {    featureBuilder        .AddContext((contextBuilder, serviceProvider) => { /* Custom context configuration */ })        .AddHook<LoggingHook>()        .AddHandler(ProviderEventTypes.ProviderReady, (eventDetails) => { /* Handle event */ });});
```

**Domain-Scoped Provider Configuration:**  
To set up multiple providers with a selection policy, define logic for choosing the default provider. This example designates `name1` as the default provider:

```
builder.Services.AddOpenFeature(featureBuilder => {    featureBuilder        .AddContext((contextBuilder, serviceProvider) => { /* Custom context configuration */ })        .AddHook((serviceProvider) => new LoggingHook( /* Custom configuration */ ))        .AddHook(new MetricsHook())        .AddInMemoryProvider("name1")        .AddInMemoryProvider("name2")        .AddPolicyName(options => {            // Custom logic to select a default provider            options.DefaultNameSelector = serviceProvider => "name1";        });});
```

### Registering a Custom Provider​

You can register a custom provider, such as `InMemoryProvider`, with OpenFeature using the `AddProvider` method. This approach allows you to dynamically resolve services or configurations during registration.

```
services.AddOpenFeature(builder =>{    builder.AddProvider(provider =>    {        // Resolve services or configurations as needed        var variants = new Dictionary<string, bool> { { "on", true } };        var flags = new Dictionary<string, Flag>        {            { "feature-key", new Flag<bool>(variants, "on") }        };        // Register a custom provider, such as InMemoryProvider        return new InMemoryProvider(flags);    });});
```

#### Adding a Domain-Scoped Provider​

You can also register a domain-scoped custom provider, enabling configurations specific to each domain:

```
services.AddOpenFeature(builder =>{    builder.AddProvider("my-domain", (provider, domain) =>    {        // Resolve services or configurations as needed for the domain        var variants = new Dictionary<string, bool> { { "on", true } };        var flags = new Dictionary<string, Flag>        {            { $"{domain}-feature-key", new Flag<bool>(variants, "on") }        };        // Register a domain-scoped custom provider such as InMemoryProvider        return new InMemoryProvider(flags);    });});
```

### Trace Enricher Hook​

The `TraceEnricherHook` enriches telemetry traces with additional information during the feature flag evaluation lifecycle. This hook adds relevant flag evaluation details as tags and events to the current `Activity` for tracing purposes.

For this hook to function correctly, an active span must be set in the current `Activity`, otherwise the hook will no-op.

Below are the tags added to the trace event:

Tag Name

Description

Source

feature_flag.key

The lookup key of the feature flag

Hook context flag key

feature_flag.provider.name

The name of the feature flag provider

Provider metadata

feature_flag.result.reason

The reason code which shows how a feature flag value was determined

Evaluation details

feature_flag.result.variant

A semantic identifier for an evaluated flag value

Evaluation details

feature_flag.result.value

The evaluated value of the feature flag

Evaluation details

feature_flag.context.id

The unique identifier for the flag evaluation context

Flag metadata (if available)

feature_flag.set.id

The identifier of the flag set to which the feature flag belongs

Flag metadata (if available)

feature_flag.version

The version of the ruleset used during the evaluation

Flag metadata (if available)

error.type

Describes a class of error the operation ended with

Evaluation details (if error)

error.message

A message explaining the nature of an error occurring during flag evaluation

Evaluation details (if error)

#### Example​

The following example demonstrates the use of the `TraceEnricherHook` with the `OpenFeature dotnet-sdk`. The traces are sent to a `jaeger` OTLP collector running at `localhost:4317`.

```
using System.Threading.Tasks;using OpenFeature.Contrib.Providers.Flagd;using OpenFeature.Hooks;using OpenTelemetry.Exporter;using OpenTelemetry.Resources;using OpenTelemetry;using OpenTelemetry.Trace;namespace OpenFeatureTestApp{    class Hello {        static async Task Main(string[] args) {            // set up the OpenTelemetry OTLP exporter            var tracerProvider = Sdk.CreateTracerProviderBuilder()                    .AddSource("my-tracer")                    .ConfigureResource(r => r.AddService("jaeger-test"))                    .AddOtlpExporter(o =>                    {                        o.ExportProcessorType = ExportProcessorType.Simple;                    })                    .Build();            // add the TraceEnricherHook to the OpenFeature instance            OpenFeature.Api.Instance.AddHooks(new TraceEnricherHook());            var flagdProvider = new FlagdProvider(new Uri("http://localhost:8013"));            // Set the flagdProvider as the provider for the OpenFeature SDK            await OpenFeature.Api.Instance.SetProviderAsync(flagdProvider);            var client = OpenFeature.Api.Instance.GetClient("my-app");            var val = await client.GetBooleanValueAsync("myBoolFlag", false);            // Print the value of the 'myBoolFlag' feature flag            System.Console.WriteLine(val);        }    }}
```

After running this example, you will be able to see the traces, including the events sent by the hook in your Jaeger UI.

You can specify custom tags on spans created by the `TraceEnricherHook` by providing `TraceEnricherHookOptions` when adding the hook:

```
var options = TraceEnricherHookOptions.CreateBuilder()    .WithTag("custom_dimension_key", "custom_dimension_value")    .Build();OpenFeature.Api.Instance.AddHooks(new TraceEnricherHook(options));
```

You can also write your own extraction logic against the Flag metadata by providing a callback to `WithFlagEvaluationMetadata`. The below example will add a tag to the span with the key `boolean` and a value specified by the callback.

```
var options = TraceEnricherHookOptions.CreateBuilder()    .WithFlagEvaluationMetadata("boolean", s => s.GetBool("boolean"))    .Build();
```

### Metrics Hook​

For this hook to function correctly a global `MeterProvider` must be set. `MetricsHook` performs metric collection by tapping into various hook stages.

Below are the metrics extracted by this hook and dimensions they carry:

Metric key

Description

Unit

Dimensions

feature_flag.evaluation_requests_total

Number of evaluation requests

request

key, provider name

feature_flag.evaluation_success_total

Flag evaluation successes

impression

key, provider name, reason

feature_flag.evaluation_error_total

Flag evaluation errors

1

key, provider name, exception

feature_flag.evaluation_active_count

Active flag evaluations counter

1

key, provider name

Consider the following code example for usage.

#### Example​

The following example demonstrates the use of the `MetricsHook` with the `OpenFeature dotnet-sdk`. The metrics are sent to the `console`.

```
using System.Threading.Tasks;using OpenFeature.Contrib.Providers.Flagd;using OpenFeature;using OpenFeature.Hooks;using OpenTelemetry;using OpenTelemetry.Metrics;namespace OpenFeatureTestApp{    class Hello {        static async Task Main(string[] args) {            // set up the OpenTelemetry OTLP exporter            var meterProvider = Sdk.CreateMeterProviderBuilder()                    .AddMeter("OpenFeature")                    .ConfigureResource(r => r.AddService("openfeature-test"))                    .AddConsoleExporter()                    .Build();            // add the MetricsHook to the OpenFeature instance            OpenFeature.Api.Instance.AddHooks(new MetricsHook());            var flagdProvider = new FlagdProvider(new Uri("http://localhost:8013"));            // Set the flagdProvider as the provider for the OpenFeature SDK            await OpenFeature.Api.Instance.SetProviderAsync(flagdProvider);            var client = OpenFeature.Api.Instance.GetClient("my-app");            var val = await client.GetBooleanValueAsync("myBoolFlag", false);            // Print the value of the 'myBoolFlag' feature flag            System.Console.WriteLine(val);        }    }}
```

After running this example, you should be able to see some metrics being generated into the console.

You can specify custom dimensions on all instruments by the `MetricsHook` by providing `MetricsHookOptions` when adding the hook:

```
var options = MetricsHookOptions.CreateBuilder()    .WithCustomDimension("custom_dimension_key", "custom_dimension_value")    .Build();OpenFeature.Api.Instance.AddHooks(new MetricsHook(options));
```

You can also write your own extraction logic against the Flag metadata by providing a callback to `WithFlagEvaluationMetadata`.

```
var options = MetricsHookOptions.CreateBuilder()    .WithFlagEvaluationMetadata("boolean", s => s.GetBool("boolean"))    .Build();
```