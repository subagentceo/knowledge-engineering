# OpenFeature iOS SDK

![Specification](https://img.shields.io/static/v1?label=specification&message=v0.8.0&color=yellow&style=for-the-badge)![Release](https://img.shields.io/static/v1?label=release&message=v0.5.0&color=blue&style=for-the-badge)  
![Status](https://img.shields.io/badge/lifecycle-alpha-a0c3d2.svg)

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

This SDK supports the following Apple platforms:

*   **iOS 15+**
*   **macOS 12+**
*   **watchOS 8+**
*   **tvOS 15+**

The SDK is built with Swift 5.5+ and uses Foundation, Combine, and the swift-log Logging package, making it suitable for all Apple platform contexts including mobile, desktop, wearable, and TV applications.

### Install​

#### Xcode Dependencies​

You have two options, both start from File > Add Packages... in the code menu.

First, ensure you have your GitHub account added as an option (+ > Add Source Control Account...). You will need to create a Personal Access Token with the permissions defined in the Xcode interface.

1.  Add as a remote repository
    *   Search for `git@github.com:open-feature/swift-sdk.git` and click "Add Package"
2.  Clone the repository locally
    *   Clone locally using your preferred method
    *   Use the "Add Local..." button to select the local folder

**Note:** Option 2 is only recommended if you are making changes to the client SDK.

#### Swift Package Manager​

If you manage dependencies through SPM, in the dependencies section of Package.swift add:

```
.package(url: "git@github.com:open-feature/swift-sdk.git", from: "0.5.0")
```

and in the target dependencies section add:

```
.product(name: "OpenFeature", package: "swift-sdk"),
```

#### CocoaPods​

If you manage dependencies through CocoaPods, add the following to your Podfile:

```
pod 'OpenFeature', '~> 0.5.0'
```

Then, run:

```
pod install
```

### iOS Usage​

```
import OpenFeatureTask {    let provider = CustomProvider()    // configure a provider, wait for it to complete its initialization tasks    await OpenFeatureAPI.shared.setProviderAndWait(provider: provider)    // get a bool flag value    let client = OpenFeatureAPI.shared.getClient()    let flagValue = client.getBooleanValue(key: "boolFlag", defaultValue: false)}
```

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

❌

Domains

Logically bind clients with providers.

✅

MultiProvider

Combine multiple providers with configurable evaluation strategies.

✅

Eventing

React to state changes in the provider or flag management system.

❌

Shutdown

Gracefully clean up a provider during application shutdown.

✅

Extending

Extend OpenFeature with custom providers and hooks.

Implemented: ✅ | In-progress: ⚠️ | Not implemented yet: ❌

### Providers​

Providers are an abstraction between a flag management system and the OpenFeature SDK. Look here for a complete list of available providers. If the provider you're looking for hasn't been created yet, see the develop a provider section to learn how to build it yourself.

Once you've added a provider as a dependency, it can be registered with OpenFeature like this:

```
await OpenFeatureAPI.shared.setProviderAndWait(provider: MyProvider())
```

> Asynchronous API that doesn't wait is also available

### Targeting​

Sometimes, the value of a flag must consider some dynamic criteria about the application or user, such as the user's location, IP, email address, or the server's location. In OpenFeature, we refer to this as targeting. If the flag management system you're using supports targeting, you can provide the input data using the evaluation context.

```
// Configure your evaluation context and pass it to OpenFeatureAPIlet ctx = ImmutableContext(    targetingKey: userId,    structure: ImmutableStructure(attributes: ["product": Value.string(productId)]))OpenFeatureAPI.shared.setEvaluationContext(evaluationContext: ctx)
```

### Hooks​

Hooks allow for custom logic to be added at well-defined points of the flag evaluation life-cycle. Look here for a complete list of available hooks. If the hook you're looking for hasn't been created yet, see the develop a hook section to learn how to build it yourself.

Once you've added a hook as a dependency, it can be registered at the global, client, or flag invocation level.

```
// add a hook globally, to run on all evaluationsOpenFeatureAPI.shared.addHooks(hooks: ExampleHook())// add a hook on this client, to run on all evaluations made by this clientlet client = OpenFeatureAPI.shared.getClient()client.addHooks(ExampleHook())// add a hook for this evaluation only_ = client.getValue(    key: "key",    defaultValue: false,    options: FlagEvaluationOptions(hooks: [ExampleHook()]))
```

### Tracking​

The tracking API allows you to use OpenFeature abstractions and objects to associate user actions with feature flag evaluations. This is essential for robust experimentation powered by feature flags. For example, a flag enhancing the appearance of a UI component might drive user engagement to a new feature; to test this hypothesis, telemetry collected by a hook or provider can be associated with telemetry reported in the client's `track` function.

```
let client = OpenFeatureAPI.shared.getClient()// Track an eventclient.track(key: "test")// Track an event with a numeric valueclient.track(key: "test-value", details: ImmutableTrackingEventDetails(value: 5))
```

Note that some providers may not support tracking; check the documentation for your provider for more information.

### Logging​

The iOS SDK integrates with swift-log, the standard logging API for Swift. This provides a unified, cross-platform logging interface that works with any swift-log compatible backend.

#### Configure Logger​

You can configure logging at three levels, with each level taking precedence over the previous:

**1. Global (API-level)** - affects all flag evaluations:

```
import Logginglet logger = Logger(label: "com.example.app.openfeature")OpenFeatureAPI.shared.setLogger(logger)
```

**2. Client-level** - affects all evaluations from a specific client:

```
let client = OpenFeatureAPI.shared.getClient()let logger = Logger(label: "com.example.app.flags")client.setLogger(logger)
```

**3. Evaluation-level** - affects a single flag evaluation:

```
let logger = Logger(label: "com.example.app.critical-flag")let options = FlagEvaluationOptions(logger: logger)let value = client.getBooleanValue(key: "my-flag", defaultValue: false, options: options)
```

#### Provider Support​

Providers can optionally use the logger for debugging and diagnostics. The logger is passed to providers during flag evaluation, allowing them to log relevant information.

If no logger is configured, logging is disabled. The logger is completely optional for both SDK users and provider authors.

### Domains​

Domains allow you to logically bind clients with providers, enabling the use of multiple providers within a single application. Each domain can have its own provider, and clients can be associated with a specific domain.

Support for domains is not yet available in the iOS SDK.

### MultiProvider​

The `MultiProvider` allows you to combine multiple feature flag providers into a single provider, enabling you to use different providers for different flags or implement fallback mechanisms. This is useful when migrating between providers, implementing A/B testing across providers, or ensuring high availability.

#### Basic Usage​

```
import OpenFeatureTask {    // Create individual providers    let primaryProvider = PrimaryProvider()    let fallbackProvider = FallbackProvider()        // Create a MultiProvider with default FirstMatchStrategy    let multiProvider = MultiProvider(providers: [primaryProvider, fallbackProvider])        // Set the MultiProvider as the global provider    await OpenFeatureAPI.shared.setProviderAndWait(provider: multiProvider)        // Use flags normally - the MultiProvider will handle provider selection    let client = OpenFeatureAPI.shared.getClient()    let flagValue = client.getBooleanValue(key: "my-flag", defaultValue: false)}
```

#### Evaluation Strategies​

The `MultiProvider` supports different strategies for evaluating flags across multiple providers:

##### FirstMatchStrategy (Default)​

The `FirstMatchStrategy` evaluates providers in order and returns the first result that doesn't indicate "flag not found". If a provider returns an error other than "flag not found", that error is returned immediately.

```
let multiProvider = MultiProvider(    providers: [primaryProvider, fallbackProvider],    strategy: FirstMatchStrategy())
```

##### FirstSuccessfulStrategy​

The `FirstSuccessfulStrategy` evaluates providers in order and returns the first successful result (no error). Unlike `FirstMatchStrategy`, it continues to the next provider if any error occurs, including "flag not found".

```
let multiProvider = MultiProvider(    providers: [primaryProvider, fallbackProvider],    strategy: FirstSuccessfulStrategy())
```

#### Use Cases​

**Provider Migration:**

```
// Gradually migrate from OldProvider to NewProviderlet multiProvider = MultiProvider(providers: [    NewProvider(),  // Check new provider first    OldProvider()   // Fall back to old provider])
```

**High Availability:**

```
// Use multiple providers for redundancylet multiProvider = MultiProvider(providers: [    RemoteProvider(),    LocalCacheProvider(),    StaticProvider()])
```

**Environment-Specific Providers:**

```
// Different providers for different environmentslet providers = [    EnvironmentProvider(environment: "production"),    DefaultProvider()]let multiProvider = MultiProvider(providers: providers)
```

### Eventing​

Events allow you to react to state changes in the provider or underlying flag management system, such as flag definition changes, provider readiness, or error conditions. Initialization events (`PROVIDER_READY` on success, `PROVIDER_ERROR` on failure) are dispatched for every provider. Some providers support additional events, such as `PROVIDER_CONFIGURATION_CHANGED`.

Please refer to the documentation of the provider you're using to see what events are supported.

```
let cancellable = OpenFeatureAPI.shared.observe().sink { event in    switch event {    case ProviderEvent.ready:        // ...    default:        // ...    }}
```

### Shutdown​

A shutdown function is not yet available in the iOS SDK.

## Extending​

### Develop a provider​

To develop a provider, you need to create a new project and include the OpenFeature SDK as a dependency. You'll then need to write the provider by implementing the `FeatureProvider` interface exported by the OpenFeature SDK.

#### Status ownership​

Providers are fully responsible for managing their own status. The SDK reads `status` from the provider but never sets it. You must keep `status` consistent with the events you emit, and the property must be thread-safe (it can be read concurrently from flag evaluation paths).

The easiest way to satisfy these requirements is to delegate to `ProviderStatusTracker`.

#### Example implementation​

```
import Combineimport OpenFeaturefinal class CustomProvider: FeatureProvider {    var hooks: [any Hook] = []    var metadata: ProviderMetadata = CustomMetadata()    // ProviderStatusTracker keeps `status` in sync with emitted events,    // handles thread safety, and replays the current status to new subscribers.    private let statusTracker = ProviderStatusTracker()    var status: ProviderStatus { statusTracker.status }    func observe() -> AnyPublisher<ProviderEvent, Never> { statusTracker.observe() }    func initialize(initialContext: EvaluationContext?) -> Future<Void, Never> {        Future { promise in            // Perform context-aware initialisation, then emit any non-.notReady status.            // .ready and .error are the most common outcomes.            self.statusTracker.send(.ready(nil))            promise(.success(()))        }    }    func onContextSet(oldContext: EvaluationContext?, newContext: EvaluationContext) -> Future<Void, Never> {        // Note: this may be called again before a previous lifecycle Future has        // resolved. Cancel any in-flight async work when a new call arrives.        Future { promise in            self.statusTracker.send(.reconciling(nil))            // ... re-initialize with new context ...            self.statusTracker.send(.contextChanged(nil))  // or .error(nil) on failure            promise(.success(()))        }    }    func getBooleanEvaluation(        key: String,        defaultValue: Bool,        context: EvaluationContext?    ) throws -> ProviderEvaluation<Bool> {        // resolve a boolean flag value    }    ...}
```

> Built a new provider? Let us know so we can add it to the docs!

### Develop a hook​

To develop a hook, you need to create a new project and include the OpenFeature SDK as a dependency. Implement your own hook by conforming to the `Hook interface`. To satisfy the interface, all methods (`Before`/`After`/`Finally`/`Error`) need to be defined.

```
class BooleanHook: Hook {    typealias HookValue = Bool    func before<HookValue>(ctx: HookContext<HookValue>, hints: [String: Any]) {        // do something    }    func after<HookValue>(ctx: HookContext<HookValue>, details: FlagEvaluationDetails<HookValue>, hints: [String: Any]) {        // do something    }    func error<HookValue>(ctx: HookContext<HookValue>, error: Error, hints: [String: Any]) {        // do something    }    func finally<HookValue>(ctx: HookContext<HookValue>, details: FlagEvaluationDetails<HookValue>, hints: [String: Any]) {        // do something    }}
```

> Built a new hook? Let us know so we can add it to the docs!