-   [](/)
-   Glossary

On this page

# Glossary

This document defines some terms that are used across this specification.

Table of Contents

-   [Feature Flag](#feature-flag)
-   [User Roles](#user-roles)
    -   [Application Author](#application-author)
    -   [Application Integrator](#application-integrator)
    -   [Provider Author](#provider-author)
    -   [Integration Author](#integration-author)
    -   [Library Author](#library-author)
-   [Common](#common)
    -   [Feature Flag SDK](#feature-flag-sdk)
    -   [Client-Side SDK](#client-side-sdk)
    -   [Server-Side SDK](#server-side-sdk)
    -   [Feature Flag API](#feature-flag-api)
    -   [Evaluation API](#evaluation-api)
    -   [Flag Management System](#flag-management-system)
    -   [Client](#client)
    -   [Provider](#provider)
    -   [Provider Lifecycle](#provider-lifecycle)
    -   [Domain](#domain)
    -   [Integration](#integration)
    -   [Evaluation Context](#evaluation-context)
    -   [Transaction Context Propagator](#transaction-context-propagator)
    -   [Evaluating Flag Values](#evaluating-flag-values)
    -   [Resolving Flag Values](#resolving-flag-values)
    -   [Tracking Event](#tracking-event)
-   [Flagging specifics](#flagging-specifics)
    -   [Flag](#flag)
    -   [Flag Set](#flag-set)
    -   [Flag Key](#flag-key)
    -   [Variant](#variant)
    -   [Values](#values)
    -   [Targeting](#targeting)
    -   [Targeting Key](#targeting-key)
    -   [Fractional Evaluation](#fractional-evaluation)
    -   [Rule](#rule)
-   [SDK Paradigms](#sdk-paradigms)
    -   [Dynamic-Context Paradigm](#dynamic-context-paradigm)
    -   [Static-Context Paradigm](#static-context-paradigm)

## Feature Flag[​](#feature-flag "Direct link to Feature Flag")

A mechanism that allows an Application Author to define alternative codepaths within a deployed piece of software, which is conditionally executed at runtime, based on a rule set.

## User Roles[​](#user-roles "Direct link to User Roles")

### Application Author[​](#application-author "Direct link to Application Author")

A developer of an application or service which utilizes the feature flags SDK. This person writes code which calls into the SDK to make flagging decisions.

### Application Integrator[​](#application-integrator "Direct link to Application Integrator")

A developer who is setting up or configuring an application or service to use the feature flags SDK. They would write code like "We should speak to the open source flagging service, not $vendor" or "The way the system should handle telemetry is through $library".

### Provider Author[​](#provider-author "Direct link to Provider Author")

The maintainer of an API-compliant [provider](/specification/sections/providers) which implements the necessary interfaces required for flag evaluation.

### Integration Author[​](#integration-author "Direct link to Integration Author")

The maintainer of an API-compliant integration which implements additional secondary functionality besides flag evaluation.

### Library Author[​](#library-author "Direct link to Library Author")

The maintainer of a shared library which is a dependency of many applications or libraries, which utilizes the feature flags SDK to allow consumers to manage library functionality.

## Common[​](#common "Direct link to Common")

### Feature Flag SDK[​](#feature-flag-sdk "Direct link to Feature Flag SDK")

The libraries used by the Application Author to implement feature flags in their application or service. The interfaces defined in these libraries adhere to the Feature Flag API.

### Client-Side SDK[​](#client-side-sdk "Direct link to Client-Side SDK")

An SDK which is built for usage in client applications (e.g. single-page web applications), and typically uses the [static-context paradigm](#static-context-paradigm).

### Server-Side SDK[​](#server-side-sdk "Direct link to Server-Side SDK")

An SDK which is built for usage in server applications (e.g. REST services), and typically uses the [dynamic-context paradigm](#dynamic-context-paradigm).

### Feature Flag API[​](#feature-flag-api "Direct link to Feature Flag API")

The interfaces and abstractions used by authors (Application, Integration, Provider).

Provider & Integration authors adhere to the API to add support for their feature flag implementation or integration. Application authors use it via the Feature Flag SDK.

### Evaluation API[​](#evaluation-api "Direct link to Evaluation API")

The subset of the [Feature Flag API](#feature-flag-api) that the Application Author uses to evaluate flags.

### Flag Management System[​](#flag-management-system "Direct link to Flag Management System")

A source-of-truth for flag values and rules. Flag management systems may include SaaS feature flag vendors, custom "in-house" feature flag infrastructure, or open-source implementations.

### Client[​](#client "Direct link to Client")

A lightweight abstraction that provides functions to evaluate feature flags. A client is associated with a single provider, which it uses to perform evaluations.

### Provider[​](#provider "Direct link to Provider")

An SDK-compliant implementation which resolves flag values from a particular flag management system, allowing the use of the [Evaluation API](/specification/sections/flag-evaluation#13-flag-evaluation) as an abstraction for the system in question.

### Provider Lifecycle[​](#provider-lifecycle "Direct link to Provider Lifecycle")

The possible states and transitions of a provider over the course of its usage, as defined by the [provider interface](/specification/sections/providers).

### Domain[​](#domain "Direct link to Domain")

An identifier which logically binds clients with providers, allowing for multiple providers to be used simultaneously within a single application. Domain binding is dynamic; it may change over the course of an application's lifetime (i.e.: a client associated with the default provider via an unbound domain will be bound to a new provider if a provider is subsequently assigned to that domain).

### Integration[​](#integration "Direct link to Integration")

An SDK-compliant secondary function that is abstracted by the Feature Flag API, and requires only minimal configuration by the Application Author. Examples include telemetry, tracking, custom logging and monitoring.

### Evaluation Context[​](#evaluation-context "Direct link to Evaluation Context")

Context object for flag evaluation, which may contain information about the runtime environment, details of the transport method encapsulating the flag evaluation, the host, the client, the subject (user), etc. This data may be used as a basis for differential evaluation of feature flags based on rules that can be defined in the flag system. Context data may be provided by merging static global context, arguments to flag evaluation, and implicit language-dependant state propagation mechanisms (thread-local storage, promise chains, continuations, etc).

### Transaction Context Propagator[​](#transaction-context-propagator "Direct link to Transaction Context Propagator")

An SDK-compliant implementation that stores and returns transaction-specific evaluation context. A _transaction_ might be a web request or application event, which carries its contextual data in a thread or continuation storage.

### Evaluating Flag Values[​](#evaluating-flag-values "Direct link to Evaluating Flag Values")

The process of retrieving a feature flag value in its entirety, including:

-   any effects resulting from hooks
-   resolving a flag value from a configured provider
-   falling back to a supplied default, in the case of abnormal execution

### Resolving Flag Values[​](#resolving-flag-values "Direct link to Resolving Flag Values")

The process of a provider retrieving a feature flag value from its particular source-of-truth.

### Tracking Event[​](#tracking-event "Direct link to Tracking Event")

A particular user action or application state representing a business objective or outcome, identified by a unique string, and recorded using the [tracking API](/specification/sections/tracking).

## Flagging specifics[​](#flagging-specifics "Direct link to Flagging specifics")

### Flag[​](#flag "Direct link to Flag")

Flags represent a single pivot point of logic. Flags have a type, like `string`, `boolean`, `json`, etc. Examples: `redesign_enabled` or `header-order`

### Flag Set[​](#flag-set "Direct link to Flag Set")

A collection of related [flags](#flag). This grouping helps organize feature flags based on their intended use, facilitating easier management and deployment.

### Flag Key[​](#flag-key "Direct link to Flag Key")

A string that logically identifies a particular flag.

### Variant[​](#variant "Direct link to Variant")

A variant is a semantic identifier for a value. This allows for referral to particular values without necessarily including the value itself, which may be quite prohibitively large or otherwise unsuitable in some cases.

### Values[​](#values "Direct link to Values")

Individual variants have values associated with them. These values adhere to the flag's type. For the `header-order` variants, we may have values like:

```
reverse: [5,4,3,2,1]wonky: [3,5,2,1,4]standard: [1,2,3,4,5]
```

### Targeting[​](#targeting "Direct link to Targeting")

The application of rules, specific user overrides, or fractional evaluations in feature flag resolution.

### Targeting Key[​](#targeting-key "Direct link to Targeting Key")

A string logically identifying the subject of evaluation (end-user, service, etc).

### Fractional Evaluation[​](#fractional-evaluation "Direct link to Fractional Evaluation")

Pseudorandomly resolve flag values using a context property, such as a targeting key, based on a configured proportion or percentage (ie: 50/50).

### Rule[​](#rule "Direct link to Rule")

A rule is some criteria or logic used to assign a variant during an evaluation.

## SDK Paradigms[​](#sdk-paradigms "Direct link to SDK Paradigms")

Feature flag frameworks have SDKs which operate in two distinct paradigms: those designed for use with a single user client application (e.g. mobile phones, single-page web apps), and those designed for multi-user applications, such as web server applications. Some parts of the OpenFeature specification diverge depending on the paradigm.

### Dynamic-Context Paradigm[​](#dynamic-context-paradigm "Direct link to Dynamic-Context Paradigm")

Server-side applications typically perform flag evaluations on behalf of many users, with each request or event being associated with a particular user or client. For this reason, server frameworks typically operate similarly to this:

-   the application is initialized with some static context (geography, service name, hostname, etc)
-   with each request or event, relevant dynamic context (for example, user session data, unique user identifiers) is provided to flag evaluations

### Static-Context Paradigm[​](#static-context-paradigm "Direct link to Static-Context Paradigm")

In contrast to server-side or other service-type applications, client side applications typically operate in the context of a single user. Most feature flagging libraries for these applications have been designed with this in mind. Frequently, client/web libraries operate similarly to this:

-   an initialization occurs, which fetches evaluated flags in bulk for a given context (user)
-   the evaluated flags are cached in the library
-   flag evaluations take place against this cache, without a need to provide context (context was already used to evaluate flags in bulk)
-   libraries provide a mechanism to update context (e.g. if a user logs in), meaning cached evaluations are no longer valid and must be re-evaluated, frequently involving a network request or I/O operation

Not all client libraries work this way, but generally, libraries that accept dynamic context per evaluation can build providers which conform to this model with relative ease, while the reverse is not true.

[Edit this page](https://github.com/open-feature/spec/edit/main/specification/glossary.md)