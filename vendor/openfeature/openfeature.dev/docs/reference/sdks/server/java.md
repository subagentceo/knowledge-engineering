# OpenFeature Java SDK

![Specification](https://img.shields.io/static/v1?label=specification&message=v0.7.0&color=yellow&style=for-the-badge)![Release](https://img.shields.io/static/v1?label=release&message=v1.20.2&color=blue&style=for-the-badge)  
![Javadoc](https://javadoc.io/badge2/dev.openfeature/sdk/javadoc.svg)![Maven Central](https://maven-badges.herokuapp.com/maven-central/dev.openfeature/sdk/badge.svg)![Codecov](https://codecov.io/gh/open-feature/java-sdk/branch/main/graph/badge.svg?token=XMS9L7PBY1)![CII Best Practices](https://bestpractices.coreinfrastructure.org/projects/6241/badge)

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

*   Java 11+ (compiler target is 11)

Note that this library is intended to be used in server-side contexts and has not been evaluated for use on mobile devices.

### Install​

#### Maven​

```
<dependency>    <groupId>dev.openfeature</groupId>    <artifactId>sdk</artifactId>    <version>1.20.2</version></dependency>
```

If you would like snapshot builds, this is the relevant repository information:

```
<repositories>    <repository>        <snapshots>            <enabled>true</enabled>        </snapshots>        <id>sonatype</id>        <name>Sonatype Repository</name>        <url>https://s01.oss.sonatype.org/content/repositories/snapshots/</url>    </repository></repositories>
```

#### Gradle​

```
dependencies {    implementation 'dev.openfeature:sdk:1.20.2'}
```

### Usage​

```
public void example(){    // flags defined in memory    Map<String, Flag<?>> myFlags = new HashMap<>();    myFlags.put("v2_enabled", Flag.builder()        .variant("on", true)        .variant("off", false)        .defaultVariant("on")        .build());    // configure a provider    OpenFeatureAPI api = OpenFeatureAPI.getInstance();    try {        api.setProviderAndWait(new InMemoryProvider(myFlags));    } catch (Exception e) {        // handle initialization failure        e.printStackTrace();    }    // create a client    Client client = api.getClient();    // get a bool flag value    boolean flagValue = client.getBooleanValue("v2_enabled", false);}
```

### API Reference​

See here for the Javadocs.

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

Multi-provider (experimental)

Combine multiple providers and delegate evaluations according to a strategy.

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

Implemented: ✅ | In-progress: ⚠️ | Not implemented yet: ❌

### Providers​

Providers are an abstraction between a flag management system and the OpenFeature SDK. Look here for a complete list of available providers. If the provider you're looking for hasn't been created yet, see the develop a provider section to learn how to build it yourself.

Once you've added a provider as a dependency, it can be registered with OpenFeature like this:

In some situations, it may be beneficial to register multiple providers in the same application. This is possible using domains, which is covered in more detail below.

#### Multi-provider (experimental)​

In addition to domains, you may want to delegate flag evaluation across multiple providers using a configurable strategy. The multi-provider allows you to compose several `FeatureProvider` implementations and determine which provider's result to use.

> **Experimental:** This API is experimental and may change in future releases.

```
import dev.openfeature.sdk.OpenFeatureAPI;import dev.openfeature.sdk.Client;import dev.openfeature.sdk.FeatureProvider;import dev.openfeature.sdk.multiprovider.MultiProvider;import java.util.List;public void multiProviderExample() throws Exception {    FeatureProvider primaryProvider = new MyPrimaryProvider();    FeatureProvider fallbackProvider = new MyFallbackProvider();    MultiProvider multiProvider = new MultiProvider(List.of(primaryProvider, fallbackProvider));    OpenFeatureAPI api = OpenFeatureAPI.getInstance();    api.setProviderAndWait(multiProvider);    Client client = api.getClient();    boolean value = client.getBooleanValue("some-flag", false);}
```

#### Synchronous​

To register a provider in a blocking manner to ensure it is ready before further actions are taken, you can use the `setProviderAndWait` method as shown below:

```
    OpenFeatureAPI api = OpenFeatureAPI.getInstance();    try {        api.setProviderAndWait(new MyProvider());    }  catch (Exception e) {        // handle initialization failure        e.printStackTrace();    }
```

#### Asynchronous​

To register a provider in a non-blocking manner, you can use the `setProvider` method as shown below:

```
    OpenFeatureAPI.getInstance().setProvider(new MyProvider());
```

In some situations, it may be beneficial to register multiple providers in the same application. This is possible using domains, which is covered in more detail below.

### Targeting​

Sometimes, the value of a flag must consider some dynamic criteria about the application or user, such as the user's location, IP, email address, or the server's location. In OpenFeature, we refer to this as targeting. If the flag management system you're using supports targeting, you can provide the input data using the evaluation context.

```
// set a value to the global contextOpenFeatureAPI api = OpenFeatureAPI.getInstance();Map<String, Value> apiAttrs = new HashMap<>();apiAttrs.put("region", new Value(System.getEnv("us-east-1")));EvaluationContext apiCtx = new ImmutableContext(apiAttrs);api.setEvaluationContext(apiCtx);// set a value to the client contextMap<String, Value> clientAttrs = new HashMap<>();clientAttrs.put("region", new Value(System.getEnv("us-east-1")));EvaluationContext clientCtx = new ImmutableContext(clientAttrs);Client client = api.getInstance().getClient();client.setEvaluationContext(clientCtx);// set a value to the invocation contextMap<String, Value> requestAttrs = new HashMap<>();requestAttrs.put("email", new Value(session.getAttribute("email")));requestAttrs.put("product", new Value("productId"));String targetingKey = session.getId();EvaluationContext reqCtx = new ImmutableContext(targetingKey, requestAttrs);boolean flagValue = client.getBooleanValue("some-flag", false, reqCtx);
```

### Hooks​

Hooks allow for custom logic to be added at well-defined points of the flag evaluation life-cycle Look here for a complete list of available hooks. If the hook you're looking for hasn't been created yet, see the develop a hook section to learn how to build it yourself.

Once you've added a hook as a dependency, it can be registered at the global, client, or flag invocation level.

```
  // add a hook globally, to run on all evaluations  OpenFeatureAPI api = OpenFeatureAPI.getInstance();  api.addHooks(new ExampleHook());    // add a hook on this client, to run on all evaluations made by this client  Client client = api.getClient();          client.addHooks(new ExampleHook());    // add a hook for this evaluation only  Boolean retval = client.getBooleanValue(flagKey, false, null,          FlagEvaluationOptions.builder().hook(new ExampleHook()).build());
```

### Tracking​

The tracking API allows you to use OpenFeature abstractions to associate user actions with feature flag evaluations. This is essential for robust experimentation powered by feature flags. Note that, unlike methods that handle feature flag evaluations, calling `track(...)` may throw an `IllegalArgumentException` if an empty string is passed as the `trackingEventName`.

```
OpenFeatureAPI api = OpenFeatureAPI.getInstance();api.getClient().track("visited-promo-page", new MutableTrackingEventDetails(99.77).add("currency", "USD"));
```

### Logging​

The Java SDK uses SLF4J. See the SLF4J manual for complete documentation. Note that in accordance with the OpenFeature specification, the SDK doesn't generally log messages during flag evaluation.

#### Logging Hook​

The Java SDK includes a `LoggingHook`, which logs detailed information at key points during flag evaluation, using SLF4J's structured logging API. This hook can be particularly helpful for troubleshooting and debugging; simply attach it at the global, client or invocation level and ensure your log level is set to "debug".

See hooks for more information on configuring hooks.

### Domains​

Clients can be assigned to a domain. A domain is a logical identifier which can be used to associate clients with a particular provider. If a domain has no associated provider, the global provider is used.

```
FeatureProvider scopedProvider = new MyProvider();// registering the default providerOpenFeatureAPI.getInstance().setProvider(LocalProvider());// registering a provider to a domainOpenFeatureAPI.getInstance().setProvider("my-domain", new CachedProvider());// A client bound to the default providerClient clientDefault = OpenFeatureAPI.getInstance().getClient();// A client bound to the CachedProvider providerClient domainScopedClient = OpenFeatureAPI.getInstance().getClient("my-domain");
```

Providers for domains can be set in a blocking or non-blocking way. For more details, please refer to the providers section.

### Eventing​

Events allow you to react to state changes in the provider or underlying flag management system, such as flag definition changes, provider readiness, or error conditions. Initialization events (`PROVIDER_READY` on success, `PROVIDER_ERROR` on failure) are dispatched for every provider. Some providers support additional events, such as `PROVIDER_CONFIGURATION_CHANGED`.

Please refer to the documentation of the provider you're using to see what events are supported.

```
// add an event handler to a clientClient client = OpenFeatureAPI.getInstance().getClient();client.onProviderConfigurationChanged((EventDetails eventDetails) -> {    // do something when the provider's flag settings change});// add an event handler to the global APIOpenFeatureAPI.getInstance().onProviderStale((EventDetails eventDetails) -> {    // do something when the provider's cache goes stale});
```

### Shutdown​

The OpenFeature API provides a close function to perform a cleanup of all registered providers. This should only be called when your application is in the process of shutting down.

```
// shut down all providersOpenFeatureAPI.getInstance().shutdown();
```

### Transaction Context Propagation​

Transaction context is a container for transaction-specific evaluation context (e.g. user id, user agent, IP). Transaction context can be set where specific data is available (e.g. an auth service or request handler) and by using the transaction context propagator it will automatically be applied to all flag evaluations within a transaction (e.g. a request or thread). By default, the `NoOpTransactionContextPropagator` is used, which doesn't store anything. To register a `ThreadLocal` context propagator, you can use the `setTransactionContextPropagator` method as shown below.

```
// registering the ThreadLocalTransactionContextPropagatorOpenFeatureAPI.getInstance().setTransactionContextPropagator(new ThreadLocalTransactionContextPropagator());
```

Once you've registered a transaction context propagator, you can propagate the data into request-scoped transaction context.

```
// adding userId to transaction contextOpenFeatureAPI api = OpenFeatureAPI.getInstance();Map<String, Value> transactionAttrs = new HashMap<>();transactionAttrs.put("userId", new Value("userId"));EvaluationContext transactionCtx = new ImmutableContext(transactionAttrs);api.setTransactionContext(transactionCtx);
```

Additionally, you can develop a custom transaction context propagator by implementing the `TransactionContextPropagator` interface and registering it as shown above.

## Extending​

### Develop a provider​

To develop a provider, you need to create a new project and include the OpenFeature SDK as a dependency. This can be a new repository or included in the existing contrib repository available under the OpenFeature organization. You’ll then need to write the provider by implementing the `FeatureProvider` interface exported by the OpenFeature SDK.

```
public class MyProvider implements FeatureProvider {    @Override    public Metadata getMetadata() {        return () -> "My Provider";    }    @Override    public void initialize(EvaluationContext evaluationContext) throws Exception {        // start up your provider    }    @Override    public void shutdown() {        // shut down your provider    }    @Override    public ProviderEvaluation<Boolean> getBooleanEvaluation(String key, Boolean defaultValue, EvaluationContext ctx) {        // resolve a boolean flag value    }    @Override    public ProviderEvaluation<String> getStringEvaluation(String key, String defaultValue, EvaluationContext ctx) {        // resolve a string flag value    }    @Override    public ProviderEvaluation<Integer> getIntegerEvaluation(String key, Integer defaultValue, EvaluationContext ctx) {        // resolve an int flag value    }    @Override    public ProviderEvaluation<Double> getDoubleEvaluation(String key, Double defaultValue, EvaluationContext ctx) {        // resolve a double flag value    }    @Override    public ProviderEvaluation<Value> getObjectEvaluation(String key, Value defaultValue, EvaluationContext ctx) {        // resolve an object flag value    }}
```

If you'd like your provider to support firing events, such as events for when flags are changed in the flag management system, extend `EventProvider`.

```
class MyEventProvider extends EventProvider {    @Override    public Metadata getMetadata() {        return () -> "My Event Provider";    }    @Override    public void initialize(EvaluationContext evaluationContext) throws Exception {        // emit events when flags are changed in a hypothetical REST API        this.restApiClient.onFlagsChanged(() -> {            ProviderEventDetails details = ProviderEventDetails.builder().message("flags changed in API!").build();            this.emitProviderConfigurationChanged(details);        });    }    @Override    public void shutdown() {        // shut down your provider    }    // remaining provider methods...}
```

Providers no longer need to manage their own state, this is done by the SDK itself. If desired, the state of a provider can be queried through the client that uses the provider.

```
OpenFeatureAPI.getInstance().getClient().getProviderState();
```

> Built a new provider? Let us know so we can add it to the docs!

### Develop a hook​

To develop a hook, you need to create a new project and include the OpenFeature SDK as a dependency. This can be a new repository or included in the existing contrib repository available under the OpenFeature organization. Implement your own hook by conforming to the `Hook interface`.

```
class MyHook implements Hook {    @Override    public Optional before(HookContext ctx, Map hints) {        // code that runs before the flag evaluation    }    @Override    public void after(HookContext ctx, FlagEvaluationDetails details, Map hints) {        // code that runs after the flag evaluation succeeds    }    @Override    public void error(HookContext ctx, Exception error, Map hints) {        // code that runs when there's an error during a flag evaluation    }    @Override    public void finallyAfter(HookContext ctx, FlagEvaluationDetails details, Map hints) {        // code that runs regardless of success or error    }};
```

> Built a new hook? Let us know so we can add it to the docs!