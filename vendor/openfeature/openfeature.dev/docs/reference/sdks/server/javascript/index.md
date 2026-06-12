# OpenFeature Node.js SDK

![Specification](https://img.shields.io/static/v1?label=specification&message=v0.8.0&color=yellow&style=for-the-badge)![Release](https://img.shields.io/static/v1?label=release&message=v1.21.0&color=blue&style=for-the-badge)  
![API Reference](https://img.shields.io/badge/reference-teal?logo=javascript&logoColor=white)![NPM Download](https://img.shields.io/npm/dm/%40openfeature%2Fserver-sdk)![codecov](https://codecov.io/gh/open-feature/js-sdk/branch/main/graph/badge.svg?token=3DC5XOEHMY)![CII Best Practices](https://bestpractices.coreinfrastructure.org/projects/6594/badge)

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

*   Node.js version 18+

### Install​

#### npm​

```
npm install --save @openfeature/server-sdk
```

Tip

This SDK is designed to run in Node.JS. If you're interested in browser support, check out the Web SDK.

#### yarn​

```
# yarn requires manual installation of the @openfeature/core peer-dependencyyarn add @openfeature/server-sdk @openfeature/core
```

Note

`@openfeature/core` contains common components used by all OpenFeature JavaScript implementations. Every SDK version has a requirement on a single, specific version of this dependency. For more information, and similar implications on libraries developed with OpenFeature see considerations when extending.

### Usage​

```
import { OpenFeature } from '@openfeature/server-sdk';// Register your feature flag providertry {  await OpenFeature.setProviderAndWait(new YourProviderOfChoice());} catch (error) {  console.error('Failed to initialize provider:', error);}// create a new clientconst client = OpenFeature.getClient();// Evaluate your feature flagconst v2Enabled = await client.getBooleanValue('v2_enabled', false);if (v2Enabled) {  console.log('v2 is enabled');}
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

Transaction Context Propagation

Set a specific evaluation context for a transaction (e.g. an HTTP request or a thread)

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
await OpenFeature.setProviderAndWait(new MyProvider());
```

#### Synchronous​

To register a provider in a synchronous manner, you can use the `setProvider` method as shown below:

```
OpenFeature.setProvider(new MyProvider());
```

Once the provider has been registered, the status can be tracked using events.

In some situations, it may be beneficial to register multiple providers in the same application. This is possible using domains, which is covered in more detail below.

#### Multi-Provider​

The Multi-Provider allows you to use multiple underlying providers as sources of flag data for the OpenFeature server SDK. When a flag is being evaluated, the Multi-Provider will consult each underlying provider it is managing in order to determine the final result. Different evaluation strategies can be defined to control which providers get evaluated and which result is used.

The Multi-Provider is a powerful tool for performing migrations between flag providers, or combining multiple providers into a single feature flagging interface. For example:

*   **Migration**: Gradually migrate from one provider to another by serving some flags from your old provider and some from your new provider
*   **Backup**: Use one provider as a backup for another in case of failures
*   **Comparison**: Compare results from multiple providers to validate consistency
*   **Hybrid**: Combine multiple providers to leverage different strengths (e.g., one for simple flags, another for complex targeting)

```
import { OpenFeature, MultiProvider, FirstMatchStrategy } from '@openfeature/server-sdk';// Create providersconst primaryProvider = new YourPrimaryProvider();const backupProvider = new YourBackupProvider();// Create multi-provider with a strategyconst multiProvider = new MultiProvider(  [{ provider: primaryProvider }, { provider: backupProvider }],  new FirstMatchStrategy(),);// Register the multi-providerawait OpenFeature.setProviderAndWait(multiProvider);// Use as normalconst client = OpenFeature.getClient();const value = await client.getBooleanValue('my-flag', false);
```

**Available Strategies:**

*   `FirstMatchStrategy`: Returns the first successful result from the list of providers (short-circuits on error)
*   `FirstSuccessfulStrategy`: Returns the first successful result, ignoring errors from earlier providers
*   `ComparisonStrategy`: Compares results from multiple providers and can handle discrepancies

**Migration Example:**

```
import { OpenFeature, MultiProvider, FirstMatchStrategy } from '@openfeature/server-sdk';// During migration, serve some flags from the new provider and fallback to the old oneconst newProvider = new NewFlagProvider();const oldProvider = new OldFlagProvider();const multiProvider = new MultiProvider(  [{ provider: newProvider }, { provider: oldProvider }], // New provider is consulted first  new FirstMatchStrategy(),);await OpenFeature.setProviderAndWait(multiProvider);
```

**Comparison Example:**

```
import { OpenFeature, MultiProvider, ComparisonStrategy } from '@openfeature/server-sdk';// Compare results from two providers for validationconst providerA = new ProviderA();const providerB = new ProviderB();const multiProvider = new MultiProvider(  [{ provider: providerA }, { provider: providerB }],  new ComparisonStrategy(providerA, (resolutions) => {    console.warn('Mismatch detected', resolutions);  }),);await OpenFeature.setProviderAndWait(multiProvider);
```

### Targeting​

Sometimes, the value of a flag must consider some dynamic criteria about the application or user, such as the user's location, IP, email address, or the server's location. In OpenFeature, we refer to this as targeting. If the flag management system you're using supports targeting, you can provide the input data using the evaluation context.

```
// set a value to the global contextOpenFeature.setContext({ region: 'us-east-1' });// set a value to the client contextconst client = OpenFeature.getClient();client.setContext({ version: process.env.APP_VERSION });// set a value to the invocation contextconst requestContext = {  targetingKey: req.session.id,  email: req.session.email,  product: req.productId,};const boolValue = await client.getBooleanValue('some-flag', false, requestContext);
```

Context is merged by the SDK before a flag evaluation occurs. The merge order is defined here in the OpenFeature specification.

### Hooks​

Hooks allow for custom logic to be added at well-defined points of the flag evaluation life-cycle. Look here for a complete list of available hooks. If the hook you're looking for hasn't been created yet, see the develop a hook section to learn how to build it yourself.

Once you've added a hook as a dependency, it can be registered at the global, client, or flag invocation level.

```
import { OpenFeature } from '@openfeature/server-sdk';// add a hook globally, to run on all evaluationsOpenFeature.addHooks(new ExampleGlobalHook());// add a hook on this client, to run on all evaluations made by this clientconst client = OpenFeature.getClient();client.addHooks(new ExampleClientHook());// add a hook for this evaluation onlyconst boolValue = await client.getBooleanValue('bool-flag', false, { hooks: [new ExampleHook()] });
```

### Logging​

The Node.JS SDK will log warnings and errors to the console by default. This behavior can be overridden by passing a custom logger either globally or per client. A custom logger must implement the Logger interface.

```
import type { Logger } from '@openfeature/server-sdk';// The logger can be anything that conforms with the Logger interfaceconst logger: Logger = console;// Sets a global loggerOpenFeature.setLogger(logger);// Sets a client loggerconst client = OpenFeature.getClient();client.setLogger(logger);
```

### Domains​

Clients can be assigned to a domain. A domain is a logical identifier which can be used to associate clients with a particular provider. If a domain has no associated provider, the default provider is used.

```
import { OpenFeature, TypedInMemoryProvider } from '@openfeature/server-sdk';const myFlags = {  v2_enabled: {    variants: {      on: true,      off: false,    },    disabled: false,    defaultVariant: 'on',  },} as const;// Registering the default providerOpenFeature.setProvider(new TypedInMemoryProvider(myFlags));// Registering a provider to a domainOpenFeature.setProvider('my-domain', new TypedInMemoryProvider(someOtherFlags));// A Client bound to the default providerconst clientWithDefault = OpenFeature.getClient();// A Client bound to the TypedInMemoryProvider providerconst domainScopedClient = OpenFeature.getClient('my-domain');
```

Domains can be defined on a provider during registration. For more details, please refer to the providers section.

### Eventing​

Events allow you to react to state changes in the provider or underlying flag management system, such as flag definition changes, provider readiness, or error conditions. Initialization events (`PROVIDER_READY` on success, `PROVIDER_ERROR` on failure) are dispatched for every provider. Some providers support additional events, such as `PROVIDER_CONFIGURATION_CHANGED`.

Please refer to the documentation of the provider you're using to see what events are supported.

```
import { OpenFeature, ProviderEvents } from '@openfeature/server-sdk';// OpenFeature APIOpenFeature.addHandler(ProviderEvents.Ready, (eventDetails) => {  console.log(`Ready event from: ${eventDetails?.providerName}:`, eventDetails);});// Specific clientconst client = OpenFeature.getClient();client.addHandler(ProviderEvents.Error, (eventDetails) => {  console.log(`Error event from: ${eventDetails?.providerName}:`, eventDetails);});
```

### Transaction Context Propagation​

Transaction context is a container for transaction-specific evaluation context (e.g. user id, user agent, IP). Transaction context can be set where specific data is available (e.g. an auth service or request handler) and by using the transaction context propagator it will automatically be applied to all flag evaluations within a transaction (e.g. a request or thread).

The following example shows an Express middleware using transaction context propagation to propagate the request ip and user id into request scoped transaction context.

```
import express, { Request, Response, NextFunction } from 'express';import { OpenFeature, AsyncLocalStorageTransactionContextPropagator } from '@openfeature/server-sdk';OpenFeature.setTransactionContextPropagator(new AsyncLocalStorageTransactionContextPropagator());/** * This example is based on an express middleware. */const app = express();app.use((req: Request, res: Response, next: NextFunction) => {  const ip = req.headers['x-forwarded-for'];  OpenFeature.setTransactionContext({ targetingKey: req.user.id, ipAddress: ip }, () => {    // The transaction context is used in any flag evaluation throughout the whole call chain of next    next();  });});
```

### Tracking​

The tracking API allows you to use OpenFeature abstractions and objects to associate user actions with feature flag evaluations. This is essential for robust experimentation powered by feature flags. For example, a flag enhancing the appearance of a UI component might drive user engagement to a new feature; to test this hypothesis, telemetry collected by a hook or provider can be associated with telemetry reported in the client's `track` function.

```
// flag is evaluatedawait client.getBooleanValue('new-feature', false);// new feature is used and track function is called recording the usageuseNewFeature();client.track('new-feature-used');
```

### Shutdown​

The OpenFeature API provides a close function to perform a cleanup of all registered providers. This should only be called when your application is in the process of shutting down.

```
import { OpenFeature } from '@openfeature/server-sdk';await OpenFeature.close();
```

### Type-Safe Flag Keys​

For enhanced type safety and autocompletion, you can override flag key types using TypeScript module augmentation. See the `@openfeature/core` README for details.

## Extending​

### Develop a provider​

To develop a provider, you need to create a new project and include the OpenFeature SDK as a dependency. This can be a new repository or included in the existing contrib repository available under the OpenFeature organization. You’ll then need to write the provider by implementing the Provider interface exported by the OpenFeature SDK.

```
import {  AnyProviderEvent,  EvaluationContext,  Hook,  JsonValue,  Logger,  Provider,  ProviderEventEmitter,  ResolutionDetails,} from '@openfeature/server-sdk';// implement the provider interfaceclass MyProvider implements Provider {  // Adds runtime validation that the provider is used with the expected SDK  public readonly runsOn = 'server';  readonly metadata = {    name: 'My Provider',  } as const;  // Optional provider managed hooks  hooks?: Hook[];  resolveBooleanEvaluation(    flagKey: string,    defaultValue: boolean,    context: EvaluationContext,    logger: Logger,  ): Promise<ResolutionDetails<boolean>> {    // code to evaluate a boolean  }  resolveStringEvaluation(    flagKey: string,    defaultValue: string,    context: EvaluationContext,    logger: Logger,  ): Promise<ResolutionDetails<string>> {    // code to evaluate a string  }  resolveNumberEvaluation(    flagKey: string,    defaultValue: number,    context: EvaluationContext,    logger: Logger,  ): Promise<ResolutionDetails<number>> {    // code to evaluate a number  }  resolveObjectEvaluation<T extends JsonValue>(    flagKey: string,    defaultValue: T,    context: EvaluationContext,    logger: Logger,  ): Promise<ResolutionDetails<T>> {    // code to evaluate an object  }  // implement with "new OpenFeatureEventEmitter()", and use "emit()" to emit events  events?: ProviderEventEmitter<AnyProviderEvent> | undefined;  initialize?(context?: EvaluationContext | undefined): Promise<void> {    // code to initialize your provider  }  onClose?(): Promise<void> {    // code to shut down your provider  }}
```

> Built a new provider? Let us know so we can add it to the docs!

### Develop a hook​

To develop a hook, you need to create a new project and include the OpenFeature SDK as a dependency. This can be a new repository or included in the existing contrib repository available under the OpenFeature organization. Implement your own hook by conforming to the Hook interface.

```
import type { Hook, HookContext, EvaluationDetails, FlagValue } from '@openfeature/server-sdk';export class MyHook implements Hook {  after(hookContext: HookContext, evaluationDetails: EvaluationDetails<FlagValue>) {    // code that runs after flag values are successfully resolved from the provider  }}
```

> Built a new hook? Let us know so we can add it to the docs!

### Considerations​

When developing a library based on OpenFeature components, it's important to list the `@openfeature/server-sdk` as a `peerDependency` of your package. This is a general best-practice when developing JavaScript libraries that have dependencies in common with their consuming application. Failing to do this can result in multiple copies of the OpenFeature SDK in the consumer, which can lead to type errors, and broken singleton behavior. The `@openfeature/core` package itself follows this pattern: the `@openfeature/server-sdk` has a peer dependency on `@openfeature/core`, and uses whatever copy of that module the consumer has installed (note that NPM installs peers automatically unless `--legacy-peer-deps` is set, while yarn does not, and PNPM does so based on its configuration). When developing such libraries, it's NOT necessary to add a `peerDependency` on `@openfeature/core`, since the `@openfeature/server-sdk` establishes that dependency itself transitively.