# OpenFeature Web SDK

![Specification](https://img.shields.io/static/v1?label=specification&message=v0.8.0&color=yellow&style=for-the-badge)![Release](https://img.shields.io/static/v1?label=release&message=v1.8.0&color=blue&style=for-the-badge)  
![API Reference](https://img.shields.io/badge/reference-teal?logo=javascript&logoColor=white)![NPM Download](https://img.shields.io/npm/dm/%40openfeature%2Fweb-sdk)![codecov](https://codecov.io/gh/open-feature/js-sdk/branch/main/graph/badge.svg?token=3DC5XOEHMY)![CII Best Practices](https://bestpractices.coreinfrastructure.org/projects/6594/badge)

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

*   ES2015-compatible web browser (Chrome, Edge, Firefox, etc)

### Install​

#### npm​

```
npm install --save @openfeature/web-sdk
```

Tip

This SDK is designed to run in the browser. If you're interested in server support, check out the Node.js SDK.

#### yarn​

```
# yarn requires manual installation of the @openfeature/core peer-dependencyyarn add @openfeature/web-sdk @openfeature/core
```

Note

`@openfeature/core` contains common components used by all OpenFeature JavaScript implementations. Every SDK version has a requirement on a single, specific version of this dependency. For more information, and similar implications on libraries developed with OpenFeature see considerations when extending.

### Usage​

```
import { OpenFeature } from '@openfeature/web-sdk';// Register your feature flag providertry {  await OpenFeature.setProviderAndWait(new YourProviderOfChoice());} catch (error) {  console.error('Failed to initialize provider:', error);}// create a new clientconst client = OpenFeature.getClient();// Evaluate your feature flagconst v2Enabled = client.getBooleanValue('v2_enabled', false);if (v2Enabled) {  console.log('v2 is enabled');}
```

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

Logging

Integrate with popular logging packages.

✅

Domains

Logically bind clients with providers.

✅

Eventing

React to state changes in the provider or flag management system.

✅

Tracking

Associate user actions with feature flag evaluations, particularly for A/B testing.

✅

Shutdown

Gracefully clean up a provider during application shutdown.

✅

Extending

Extend OpenFeature with custom providers and hooks.

✅

Multi-Provider

Combine multiple providers with configurable evaluation strategies.

Implemented: ✅ | In-progress: ⚠️ | Not implemented yet: ❌

### Providers​

Providers are an abstraction between a flag management system and the OpenFeature SDK. Look here for a complete list of available providers. If the provider you're looking for hasn't been created yet, see the develop a provider section to learn how to build it yourself.

Once you've added a provider as a dependency, it can be registered with OpenFeature like this:

#### Awaitable​

To register a provider and ensure it is ready before further actions are taken, you can use the `setProviderAndWait` method as shown below:

```
try {  await OpenFeature.setProviderAndWait(new MyProvider());} catch (error) {  console.error('Failed to initialize provider:', error);}
```

#### Synchronous​

To register a provider in a synchronous manner, you can use the `setProvider` method as shown below:

```
OpenFeature.setProvider(new MyProvider());
```

Once the provider has been registered, the status can be tracked using events.

In some situations, it may be beneficial to register multiple providers in the same application. This is possible using domains, which is covered in more detail below.

#### Multi-Provider​

The Multi-Provider allows you to use multiple underlying providers as sources of flag data for the OpenFeature web SDK. When a flag is being evaluated, the Multi-Provider will consult each underlying provider it is managing in order to determine the final result. Different evaluation strategies can be defined to control which providers get evaluated and which result is used.

The Multi-Provider is a powerful tool for performing migrations between flag providers, or combining multiple providers into a single feature flagging interface. For example:

*   **Migration**: When migrating between two providers, you can run both in parallel under a unified flagging interface. As flags are added to the new provider, the Multi-Provider will automatically find and return them, falling back to the old provider if the new provider does not have the flag.
*   **Multiple Data Sources**: The Multi-Provider allows you to seamlessly combine many sources of flagging data, such as environment variables, local files, database values and SaaS hosted feature management systems.

```
import { MultiProvider } from '@openfeature/web-sdk';const multiProvider = new MultiProvider([{ provider: new ProviderA() }, { provider: new ProviderB() }]);await OpenFeature.setProviderAndWait(multiProvider);const client = OpenFeature.getClient();console.log(client.getBooleanDetails('my-flag', false));
```

By default, the Multi-Provider will evaluate all underlying providers in order and return the first successful result. If a provider indicates it does not have a flag (FLAG_NOT_FOUND error code), then it will be skipped and the next provider will be evaluated.

##### Evaluation Strategies​

The Multi-Provider comes with three strategies out of the box:

*   **FirstMatchStrategy** (default): Evaluates all providers in order and returns the first successful result. Providers that indicate FLAG_NOT_FOUND error will be skipped and the next provider will be evaluated.
*   **FirstSuccessfulStrategy**: Evaluates all providers in order and returns the first successful result. Any error will cause that provider to be skipped.
*   **ComparisonStrategy**: Evaluates all providers sequentially. If every provider returns a successful result with the same value, then that result is returned. Otherwise, the result returned by the configured "fallback provider" will be used.

```
import { MultiProvider, FirstSuccessfulStrategy } from '@openfeature/web-sdk';const multiProvider = new MultiProvider(  [{ provider: new ProviderA() }, { provider: new ProviderB() }],  new FirstSuccessfulStrategy(),);
```

##### Tracking Support​

The Multi-Provider supports tracking events across multiple providers, allowing you to send analytics events to all configured providers simultaneously:

```
// Tracked events will be sent to all providers by defaultclient.track('user-conversion', {  value: 99.99,  currency: 'USD',});
```

### Flag evaluation flow​

When a new provider is added to OpenFeature client the following process happens:

In (1) the Client sends a request to the provider backend in order to get all values from all feature flags that it has. Once the provider backend replies (2) the client holds all flag values and therefore the flag evaluation process is synchronous.

In order to prevent flag evaluations from defaulting while the provider is initializing, it is highly recommended to evaluate flags only after the provider is ready. This can be done using the `setProviderAndWait` method or using the `setProvider` method and listening for the `READY` event.

### Targeting and Context​

Sometimes, the value of a flag must consider some dynamic criteria about the application or user, such as the user's location, IP, email address, or the server's location. In OpenFeature, we refer to this as targeting. If the flag management system you're using supports targeting, you can provide the input data using the evaluation context.

```
// Sets global context during provider registrationawait OpenFeature.setProvider(new MyProvider(), { origin: document.location.host });
```

Change context after the provider has been registered using `setContext`.

```
// Set a value to the global contextawait OpenFeature.setContext({ targetingKey: localStorage.getItem('targetingKey') });
```

Context is global and setting it is `async`. Providers may implement an `onContextChange` method that receives the old and newer contexts. Given a context change, providers can use this method internally to detect if the flag values cached on the client are still valid. If needed, a request will be made to the provider with the new context in order to get the correct flag values.

### Hooks​

Hooks allow for custom logic to be added at well-defined points of the flag evaluation life-cycle. Look here for a complete list of available hooks. If the hook you're looking for hasn't been created yet, see the develop a hook section to learn how to build it yourself.

Once you've added a hook as a dependency, it can be registered at the global, client, or flag invocation level.

```
import { OpenFeature } from '@openfeature/web-sdk';// add a hook globally, to run on all evaluationsOpenFeature.addHooks(new ExampleGlobalHook());// add a hook on this client, to run on all evaluations made by this clientconst client = OpenFeature.getClient();client.addHooks(new ExampleClientHook());// add a hook for this evaluation onlyconst boolValue = client.getBooleanValue('bool-flag', false, { hooks: [new ExampleHook()] });
```

### Logging​

The Web SDK will log warnings and errors to the console by default. This behavior can be overridden by passing a custom logger either globally or per client. A custom logger must implement the Logger interface.

```
import type { Logger } from '@openfeature/web-sdk';// The logger can be anything that conforms with the Logger interfaceconst logger: Logger = console;// Sets a global loggerOpenFeature.setLogger(logger);// Sets a client loggerconst client = OpenFeature.getClient();client.setLogger(logger);
```

### Domains​

Clients can be assigned to a domain. A domain is a logical identifier which can be used to associate clients with a particular provider. If a domain has no associated provider, the default provider is used.

```
import { OpenFeature, TypedInMemoryProvider } from '@openfeature/web-sdk';const myFlags = {  v2_enabled: {    variants: {      on: true,      off: false,    },    disabled: false,    defaultVariant: 'on',  },} as const;// Registering the default providerOpenFeature.setProvider(new TypedInMemoryProvider(myFlags));// Registering a provider to a domainOpenFeature.setProvider('my-domain', new TypedInMemoryProvider(someOtherFlags));// A Client bound to the default providerconst clientWithDefault = OpenFeature.getClient();// A Client bound to the TypedInMemoryProvider providerconst domainScopedClient = OpenFeature.getClient('my-domain');
```

Domains can be defined on a provider during registration. For more details, please refer to the providers section.

#### Manage evaluation context for domains​

By default, domain-scoped clients use the global context. This can be overridden by explicitly setting context when registering the provider or by referencing the domain when updating context:

```
OpenFeature.setProvider('my-domain', new NewCachedProvider(), { targetingKey: localStorage.getItem('targetingKey') });
```

To change context after the provider has been registered, use `setContext` with a domain:

```
await OpenFeature.setContext('my-domain', { targetingKey: localStorage.getItem('targetingKey') });
```

Once a domain's context has been defined, it will override the global context for all clients bound to the domain. Context can be cleared for a domain by calling `OpenFeature.clearContext("my-domain")` or `OpenFeature.clearContexts()` to reset all context.

### Eventing​

Events allow you to react to state changes in the provider or underlying flag management system, such as flag definition changes, provider readiness, or error conditions. Initialization events (`PROVIDER_READY` on success, `PROVIDER_ERROR` on failure) are dispatched for every provider. Some providers support additional events, such as `PROVIDER_CONFIGURATION_CHANGED`.

Please refer to the documentation of the provider you're using to see what events are supported.

```
import { OpenFeature, ProviderEvents } from '@openfeature/web-sdk';// OpenFeature APIOpenFeature.addHandler(ProviderEvents.Ready, (eventDetails) => {  console.log(`Ready event from: ${eventDetails?.providerName}:`, eventDetails);});// Specific clientconst client = OpenFeature.getClient();client.addHandler(ProviderEvents.Error, (eventDetails) => {  console.log(`Error event from: ${eventDetails?.providerName}:`, eventDetails);});
```

### Tracking​

The tracking API allows you to use OpenFeature abstractions and objects to associate user actions with feature flag evaluations. This is essential for robust experimentation powered by feature flags. For example, a flag enhancing the appearance of a UI component might drive user engagement to a new feature; to test this hypothesis, telemetry collected by a hook or provider can be associated with telemetry reported in the client's `track` function.

```
// flag is evaluatedclient.getBooleanValue('new-feature', false);// new feature is used and track function is called recording the usageuseNewFeature();client.track('new-feature-used');
```

### Shutdown​

The OpenFeature API provides a close function to perform a cleanup of all registered providers. This should only be called when your application is in the process of shutting down.

```
import { OpenFeature } from '@openfeature/web-sdk';await OpenFeature.close();
```

### Type-Safe Flag Keys​

For enhanced type safety and autocompletion, you can override flag key types using TypeScript module augmentation. See the `@openfeature/core` README for details.

## Extending​

### Develop a provider​

To develop a provider, you need to create a new project and include the OpenFeature SDK as a dependency. This can be a new repository or included in the existing contrib repository available under the OpenFeature organization. You’ll then need to write the provider by implementing the Provider interface exported by the OpenFeature SDK.

```
import {  AnyProviderEvent,  EvaluationContext,  Hook,  JsonValue,  Logger,  Provider,  ProviderEventEmitter,  ResolutionDetails,} from '@openfeature/web-sdk';// implement the provider interfaceclass MyProvider implements Provider {  // Adds runtime validation that the provider is used with the expected SDK  public readonly runsOn = 'client';  readonly metadata = {    name: 'My Provider',  } as const;  // Optional provider managed hooks  hooks?: Hook[];  resolveBooleanEvaluation(    flagKey: string,    defaultValue: boolean,    context: EvaluationContext,    logger: Logger,  ): ResolutionDetails<boolean> {    // code to evaluate a boolean  }  resolveStringEvaluation(    flagKey: string,    defaultValue: string,    context: EvaluationContext,    logger: Logger,  ): ResolutionDetails<string> {    // code to evaluate a string  }  resolveNumberEvaluation(    flagKey: string,    defaultValue: number,    context: EvaluationContext,    logger: Logger,  ): ResolutionDetails<number> {    // code to evaluate a number  }  resolveObjectEvaluation<T extends JsonValue>(    flagKey: string,    defaultValue: T,    context: EvaluationContext,    logger: Logger,  ): ResolutionDetails<T> {    // code to evaluate an object  }  onContextChange?(oldContext: EvaluationContext, newContext: EvaluationContext): Promise<void> {    // reconcile the provider's cached flags, if applicable  }  // implement with "new OpenFeatureEventEmitter()", and use "emit()" to emit events  events?: ProviderEventEmitter<AnyProviderEvent> | undefined;  initialize?(context?: EvaluationContext | undefined): Promise<void> {    // code to initialize your provider  }  onClose?(): Promise<void> {    // code to shut down your provider  }}
```

> Built a new provider? Let us know so we can add it to the docs!

### Develop a hook​

To develop a hook, you need to create a new project and include the OpenFeature SDK as a dependency. This can be a new repository or included in the existing contrib repository available under the OpenFeature organization. Implement your own hook by conforming to the Hook interface.

```
import type { Hook, HookContext, EvaluationDetails, FlagValue } from '@openfeature/web-sdk';export class MyHook implements Hook {  after(hookContext: HookContext, evaluationDetails: EvaluationDetails<FlagValue>) {    // code that runs after flag values are successfully resolved from the provider  }}
```

> Built a new hook? Let us know so we can add it to the docs!

### Considerations​

When developing a library based on OpenFeature components, it's important to list the `@openfeature/web-sdk` as a `peerDependency` of your package. This is a general best-practice when developing JavaScript libraries that have dependencies in common with their consuming application. Failing to do this can result in multiple copies of the OpenFeature SDK in the consumer, which can lead to type errors, and broken singleton behavior. The `@openfeature/core` package itself follows this pattern: the `@openfeature/web-sdk` has a peer dependency on `@openfeature/core`, and uses whatever copy of that module the consumer has installed (note that NPM installs peers automatically unless `--legacy-peer-deps` is set, while yarn does not, and PNPM does so based on its configuration). When developing such libraries, it's NOT necessary to add a `peerDependency` on `@openfeature/core`, since the `@openfeature/web-sdk` establishes that dependency itself transitively.