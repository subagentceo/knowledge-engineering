-   [](/)
-   [SDKs](/docs/reference/sdks/)
-   [Client](/docs/reference/sdks/client/)
-   [Web](/docs/reference/sdks/client/web/)
-   React

On this page

# OpenFeature React SDK

[![Specification](https://img.shields.io/static/v1?label=specification&message=v0.8.0&color=yellow&style=for-the-badge)](https://github.com/open-feature/spec/releases/tag/v0.8.0)[![Release](https://img.shields.io/static/v1?label=release&message=v1.3.0&color=blue&style=for-the-badge)](https://github.com/open-feature/js-sdk/releases/tag/react-sdk-v1.3.0)  
[![codecov](https://codecov.io/gh/open-feature/js-sdk/branch/main/graph/badge.svg?token=3DC5XOEHMY)](https://codecov.io/gh/open-feature/js-sdk)[![NPM Download](https://img.shields.io/npm/dm/%40openfeature%2Freact-sdk)](https://www.npmjs.com/package/@openfeature/react-sdk)

## Overview[​](#overview "Direct link to Overview")

The OpenFeature React SDK adds React-specific functionality to the [OpenFeature Web SDK](/docs/reference/sdks/client/web).

In addition to the feature provided by the [web sdk](/docs/reference/sdks/client/web), capabilities include:

-   [Overview](#overview)
-   [Quick start](#quick-start)
    -   [Requirements](#requirements)
    -   [Install](#install)
        -   [npm](#npm)
        -   [yarn](#yarn)
        -   [Required peer dependencies](#required-peer-dependencies)
    -   [Usage](#usage)
        -   [OpenFeatureProvider context provider](#openfeatureprovider-context-provider)
        -   [Evaluation hooks](#evaluation-hooks)
        -   [Declarative components](#declarative-components)
            -   [FeatureFlag Component](#featureflag-component)
        -   [Multiple Providers and Domains](#multiple-providers-and-domains)
        -   [Re-rendering with Context Changes](#re-rendering-with-context-changes)
        -   [Re-rendering with Flag Configuration Changes](#re-rendering-with-flag-configuration-changes)
        -   [Suspense Support](#suspense-support)
        -   [Tracking](#tracking)
        -   [Observability Considerations](#observability-considerations)
    -   [Testing](#testing)
-   [FAQ and troubleshooting](#faq-and-troubleshooting)
-   [Resources](#resources)

## Quick start[​](#quick-start "Direct link to Quick start")

**MCP Install**📋 Copy Prompt

Follow the [MCP Getting Started](/docs/reference/other-technologies/mcp) guide to quickly set up the OpenFeature MCP server and connect your AI tool.

-   Run this prompt: `"Install OpenFeature into this app"`

**Quick Install:**

[📦 Install in Cursor](cursor://anysphere.cursor-deeplink/mcp/install?name=OpenFeature&config=eyJjb21tYW5kIjogIm5weCIsICJhcmdzIjogWyIteSIsICJAb3BlbmZlYXR1cmUvbWNwIl19Cg==)[📦 Install in VS Code](https://vscode.dev/redirect/mcp/install?name=OpenFeature&config=%7B%22command%22%3A%20%22npx%22%2C%20%22args%22%3A%20%5B%22-y%22%2C%20%22%40openfeature%2Fmcp%22%5D%7D)

```
claude mcp add --transport stdio openfeature npx -y @openfeature/mcp
```

### Requirements[​](#requirements "Direct link to Requirements")

-   ES2015-compatible web browser (Chrome, Edge, Firefox, etc)
-   React version 16.8+

### Install[​](#install "Direct link to Install")

#### npm[​](#npm "Direct link to npm")

```
npm install --save @openfeature/react-sdk
```

#### yarn[​](#yarn "Direct link to yarn")

```
# yarn requires manual installation of the peer dependencies (see below)yarn add @openfeature/react-sdk @openfeature/web-sdk @openfeature/core
```

#### Required peer dependencies[​](#required-peer-dependencies "Direct link to Required peer dependencies")

The following list contains the peer dependencies of `@openfeature/react-sdk`. See the [package.json](https://github.com/open-feature/js-sdk/blob/main/packages/react/package.json) for the required versions.

-   `@openfeature/web-sdk`
-   `react`

### Usage[​](#usage "Direct link to Usage")

#### OpenFeatureProvider context provider[​](#openfeatureprovider-context-provider "Direct link to OpenFeatureProvider context provider")

The `OpenFeatureProvider` is a [React context provider](https://react.dev/reference/react/createContext#provider) which represents a scope for feature flag evaluations within a React application. It binds an OpenFeature client to all evaluations within child components, and allows the use of evaluation hooks. The example below shows how to use the `OpenFeatureProvider` with OpenFeature's `TypedInMemoryProvider`.

```
import {  EvaluationContext,  OpenFeatureProvider,  useFlag,  OpenFeature,  TypedInMemoryProvider,} from '@openfeature/react-sdk';const flagConfig = {  'new-message': {    disabled: false,    variants: {      on: true,      off: false,    },    defaultVariant: 'on',    contextEvaluator: (context: EvaluationContext) => {      if (context.silly) {        return 'on';      }      return 'off';    },  },} as const;// Instantiate and set our provider (be sure this only happens once)!// Note: there's no need to await its initialization, the React SDK handles re-rendering and suspense for you!OpenFeature.setProvider(new TypedInMemoryProvider(flagConfig));// Enclose your content in the configured providerfunction App() {  return (    <OpenFeatureProvider>      <Page></Page>    </OpenFeatureProvider>  );}
```

#### Evaluation hooks[​](#evaluation-hooks "Direct link to Evaluation hooks")

Within the provider, you can use the various evaluation hooks to evaluate flags.

```
function Page() {  // Use the "query-style" flag evaluation hook, specifying a flag-key and a default value.  const { value: showNewMessage } = useFlag('new-message', true);  return (    <div className="App">      <header className="App-header">        {showNewMessage ? <p>Welcome to this OpenFeature-enabled React app!</p> : <p>Welcome to this React app.</p>}      </header>    </div>  );}
```

You can use the strongly typed flag value and flag evaluation detail hooks as well if you prefer.

```
import { useBooleanFlagValue } from '@openfeature/react-sdk';// boolean flag evaluationconst value = useBooleanFlagValue('new-message', false);
```

```
import { useBooleanFlagDetails } from '@openfeature/react-sdk';// "detailed" boolean flag evaluationconst { value, variant, reason, flagMetadata } = useBooleanFlagDetails('new-message', false);
```

#### Declarative components[​](#declarative-components "Direct link to Declarative components")

The React SDK includes declarative components for feature flagging that provide a more JSX-native approach to conditional rendering.

##### FeatureFlag Component[​](#featureflag-component "Direct link to FeatureFlag Component")

The `FeatureFlag` component conditionally renders its children based on feature flag evaluation:

```
import { FeatureFlag } from '@openfeature/react-sdk';function App() {  return (    <OpenFeatureProvider>      {/* Basic usage - renders children when flag is truthy */}      <FeatureFlag flagKey="new-feature" defaultValue={false}>        <NewFeatureComponent />      </FeatureFlag>      {/* Match specific values */}      <FeatureFlag flagKey="theme" matchValue="dark" defaultValue="light">        <DarkThemeStyles />      </FeatureFlag>      {/* Boolean flag with fallback */}      <FeatureFlag flagKey="premium-feature" matchValue={true} defaultValue={false} fallback={<UpgradePrompt />}>        <PremiumContent />      </FeatureFlag>      {/* Custom predicate function for complex matching */}      <FeatureFlag        flagKey="user-segment"        defaultValue=""        matchValue="beta"        // check if the actual flag value includes the match ('beta')        predicate={(expected, actual) => !!expected && actual.value.includes(expected)}      >        <BetaFeatures />      </FeatureFlag>      {/* Function as children for accessing flag details */}      <FeatureFlag flagKey="experiment" defaultValue="control" matchValue="beta">        {({ value, reason }) => (          <span>            value is {value}, reason is {reason?.toString()}          </span>        )}      </FeatureFlag>    </OpenFeatureProvider>  );}
```

The `FeatureFlag` component supports the following props:

-   **`flagKey`** (required): The feature flag key to evaluate
-   **`defaultValue`** (required): Default value when the flag is not available
-   **`matchValue`** (required, except for boolean flags): Value to match against the flag value. By default, an optimized deep-comparison function is used.
-   **`predicate`** (optional): Custom function for matching logic that receives the expected value and evaluation details
-   **`children`**: Content to render when condition is met (can be JSX or a function receiving flag details)
-   **`fallback`** (optional): Content to render when condition is not met

#### Multiple Providers and Domains[​](#multiple-providers-and-domains "Direct link to Multiple Providers and Domains")

Multiple providers can be used by passing a `domain` to the `OpenFeatureProvider`:

```
// Flags within this domain will use the client/provider associated with `my-domain`,function App() {  return (    <OpenFeatureProvider domain={'my-domain'}>      <Page></Page>    </OpenFeatureProvider>  );}
```

This is analogous to:

```
OpenFeature.getClient('my-domain');
```

Alternatively, a pre-configured `Client` instance can be passed directly via the `client` prop:

```
const client = OpenFeature.getClient('my-domain');function App() {  return (    <OpenFeatureProvider client={client}>      <Page></Page>    </OpenFeatureProvider>  );}
```

The `domain` and `client` props are mutually exclusive.

For more information about `domains`, refer to the [web SDK](https://github.com/open-feature/js-sdk/blob/main/packages/web/README.md).

#### Re-rendering with Context Changes[​](#re-rendering-with-context-changes "Direct link to Re-rendering with Context Changes")

By default, if the OpenFeature [evaluation context](/docs/reference/concepts/evaluation-context) is modified, components will be re-rendered. This is useful in cases where flag values are dependant on user-attributes or other application state (user logged in, items in card, etc). You can disable this feature in the hook options (or in the [OpenFeatureProvider](#openfeatureprovider-context-provider)):

```
function Page() {  const { value: showNewMessage } = useFlag('new-message', false, { updateOnContextChanged: false });  return (    <div className="App">      <header className="App-header">        {showNewMessage ? <p>Welcome to this OpenFeature-enabled React app!</p> : <p>Welcome to this React app.</p>}      </header>    </div>  );}
```

For more information about how evaluation context works in the React SDK, see the documentation on OpenFeature's [static context SDK paradigm](/specification/glossary/#static-context-paradigm).

#### Re-rendering with Flag Configuration Changes[​](#re-rendering-with-flag-configuration-changes "Direct link to Re-rendering with Flag Configuration Changes")

By default, if the underlying provider emits a `ConfigurationChanged` event, components will be re-rendered. This is useful if you want your UI to immediately reflect changes in the backend flag configuration. You can disable this feature in the hook options (or in the [OpenFeatureProvider](#openfeatureprovider-context-provider)):

```
function Page() {  const { value: showNewMessage } = useFlag('new-message', false, { updateOnConfigurationChanged: false });  return (    <div className="App">      <header className="App-header">        {showNewMessage ? <p>Welcome to this OpenFeature-enabled React app!</p> : <p>Welcome to this React app.</p>}      </header>    </div>  );}
```

If your provider doesn't support updates, this configuration has no impact.

Note

If your provider includes a list of [flags changed](https://open-feature.github.io/js-sdk/types/_openfeature_server_sdk.ConfigChangeEvent.html) in its `PROVIDER_CONFIGURATION_CHANGED` event, that list of flags is used to decide which flag evaluation hooks should re-run by diffing the latest value of these flags with the previous render. If your provider event does not the include the `flags changed` list, then the SDK diffs all flags with the previous render to determine which hooks should re-run.

#### Suspense Support[​](#suspense-support "Direct link to Suspense Support")

Note

React suspense is an experimental feature and is subject to change in future versions.

Frequently, providers need to perform some initial startup tasks. It may be desirable not to display components with feature flags until this is complete or when the context changes. Built-in [suspense](https://react.dev/reference/react/Suspense) support makes this easy. Use `useSuspenseFlag` or pass `{ suspend: true }` in the hook options to leverage this functionality.

```
function Content() {  // cause the "fallback" to be displayed if the component uses feature flags and the provider is not ready  return (    <Suspense fallback={<Fallback />}>      <Message />    </Suspense>  );}function Message() {  // component to render after READY, equivalent to useFlag('new-message', false, { suspend: true });  const { value: showNewMessage } = useSuspenseFlag('new-message', false);  return (    <>      {showNewMessage ? (        <p>Welcome to this OpenFeature-enabled React app!</p>      ) : (        <p>Welcome to this plain old React app!</p>      )}    </>  );}function Fallback() {  // component to render before READY.  return <p>Waiting for provider to be ready...</p>;}
```

This can be disabled in the hook options (or in the [OpenFeatureProvider](#openfeatureprovider-context-provider)).

#### Tracking[​](#tracking "Direct link to Tracking")

The tracking API allows you to use OpenFeature abstractions and objects to associate user actions with feature flag evaluations. This is essential for robust experimentation powered by feature flags. For example, a flag enhancing the appearance of a UI component might drive user engagement to a new feature; to test this hypothesis, telemetry collected by a [hook](/docs/reference/sdks/client/web/#hooks) or [provider](/docs/reference/sdks/client/web/#providers) can be associated with telemetry reported in the client's `track` function.

The React SDK includes a hook for firing tracking events in the `<OpenFeatureProvider>` context in use:

```
function MyComponent() {  // get a tracking function for this <OpenFeatureProvider>.  const { track } = useTrack();  // call the tracking event  // can be done in render, useEffect, or in handlers, depending on your use case  track(eventName, trackingDetails);  return <>...</>;}
```

#### Observability Considerations[​](#observability-considerations "Direct link to Observability Considerations")

React's lifecycle can result in flags being evaluated multiple times as a user interacts with a page. If you are using an OpenFeature hook for telemetry, this can result in inflated evaluation metrics. The [OpenFeature debounce hook](https://github.com/open-feature/js-sdk-contrib/tree/main/libs/hooks/debounce) can help to reduce the amount of redundant evaluations reported to your observability platform by limiting the frequency at which evaluation metrics are reported.

#### Type-Safe Flag Keys[​](#type-safe-flag-keys "Direct link to Type-Safe Flag Keys")

For enhanced type safety and autocompletion, you can override flag key types using TypeScript module augmentation. See the [`@openfeature/core` README](https://github.com/open-feature/js-sdk/blob/main/packages/shared/README.md#type-safe-flag-keys) for details.

### Testing[​](#testing "Direct link to Testing")

The React SDK includes a built-in context provider for testing. This allows you to easily test components that use evaluation hooks (such as `useFlag`) or declarative components (such as `FeatureFlag`). If you try to test a component (in this case, `MyComponent`) which uses feature flags, you might see an error message like:

> No OpenFeature client available - components using OpenFeature must be wrapped with an `<OpenFeatureProvider>`.

You can resolve this by simply wrapping your component under test in the OpenFeatureTestProvider:

```
// use default values for all evaluations<OpenFeatureTestProvider>  <MyComponent /></OpenFeatureTestProvider>
```

The basic configuration above will simply use the default value provided in code. If you'd like to control the values returned by the evaluation hooks, you can pass a map of flag keys and values:

```
// return `true` for all evaluations of `'my-boolean-flag'`<OpenFeatureTestProvider flagValueMap={{ 'my-boolean-flag': true }}>  <MyComponent /></OpenFeatureTestProvider>// testing declarative FeatureFlag components<OpenFeatureTestProvider flagValueMap={{ 'new-feature': true, 'theme': 'dark' }}>  <FeatureFlag flagKey="new-feature" defaultValue={false}>    <NewFeature />  </FeatureFlag>  <FeatureFlag flagKey="theme" matchValue="dark" defaultValue="light">    <DarkMode />  </FeatureFlag></OpenFeatureTestProvider>
```

Additionally, you can pass an artificial delay for the provider startup to test your suspense boundaries or loaders/spinners impacted by feature flags:

```
// delay the provider start by 1000ms and then return `true` for all evaluations of `'my-boolean-flag'`<OpenFeatureTestProvider delayMs={1000} flagValueMap={{ 'my-boolean-flag': true }}>  <MyComponent /></OpenFeatureTestProvider>
```

For maximum control, you can also pass your own mock provider implementation. The type of this option is `Partial<Provider>`, so you can pass an incomplete implementation:

```
class MyTestProvider implements Partial<Provider> {  // implement the relevant resolver  resolveBooleanEvaluation(): ResolutionDetails<boolean> {    return {      value: true,      variant: 'my-variant',      reason: 'MY_REASON',    };  }}
```

```
// use your custom testing provider<OpenFeatureTestProvider provider={new MyTestProvider()}>  <MyComponent /></OpenFeatureTestProvider>,
```

## FAQ and troubleshooting[​](#faq-and-troubleshooting "Direct link to FAQ and troubleshooting")

> I get an error that says something like: `A React component suspended while rendering, but no fallback UI was specified.`

The OpenFeature React SDK features built-in [suspense support](#suspense-support). This means that it will render your loading fallback automatically while your provider starts up and during context reconciliation for any of your components using feature flags! If you use suspense and neglect to create a suspense boundary around any components using feature flags, you will see this error. Add a suspense boundary to resolve this issue. Alternatively, you can disable this suspense (the default) by removing `suspendWhileReconciling=true`, `suspendUntilReady=true` or `suspend=true` in the [evaluation hooks](#evaluation-hooks) or the [OpenFeatureProvider](#openfeatureprovider-context-provider) (which applies to all evaluation hooks in child components).

> I get odd rendering issues or errors when components mount if I use the suspense features.

In React 16/17's "Legacy Suspense", when a component suspends, its sibling components initially mount and then are hidden. This can cause surprising effects and inconsistencies if sibling components are rendered while the provider is still getting ready. To fix this, you can upgrade to React 18, which uses "Concurrent Suspense", in which siblings are not mounted until their suspended sibling resolves. Alternatively, if you cannot upgrade to React 18, you can use the `useWhenProviderReady` utility hook in any sibling components to prevent them from mounting until the provider is ready.

> I am using multiple `OpenFeatureProvider` contexts, but they share the same provider or evaluation context. Why?

The `OpenFeatureProvider` binds a `client` to all child components, but the provider and context associated with that client is controlled by the `domain` parameter. This is consistent with all OpenFeature SDKs. To scope an OpenFeatureProvider to a particular provider/context, set the `domain` parameter on your `OpenFeatureProvider`:

```
<OpenFeatureProvider domain={'my-domain'}>  <Page></Page></OpenFeatureProvider>
```

> I can import things form the `@openfeature/react-sdk`, `@openfeature/web-sdk`, and `@openfeature/core`; which should I use?

The `@openfeature/react-sdk` re-exports everything from its peers (`@openfeature/web-sdk` and `@openfeature/core`) and adds the React-specific features. You can import everything from the `@openfeature/react-sdk` directly. Avoid importing anything from `@openfeature/web-sdk` or `@openfeature/core`.

## Resources[​](#resources "Direct link to Resources")

-   [Example repo](https://github.com/open-feature/react-test-app)

[Edit this page](https://github.com/open-feature/openfeature.dev/edit/main/docs/reference/sdks/client/web/react.mdx)