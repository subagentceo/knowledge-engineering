# SDK Compatibility Overview

This page provides an overview of the status and supported features of the OpenFeature SDKs.

### Server-side SDKs[​](#server-side-sdks "Direct link to Server-side SDKs")

Server-side SDKs are intended for multi-user applications (e.g. web server applications) and conform to the [dynamic-context paradigm](/specification/glossary#dynamic-context-paradigm).

[Java](/docs/reference/sdks/server/java)

[Node.js](/docs/reference/sdks/server/javascript)

[.NET](/docs/reference/sdks/server/dotnet)

[Go](/docs/reference/sdks/server/go)

[Python](/docs/reference/sdks/server/python)

[PHP](/docs/reference/sdks/server/php)

[Ruby](/docs/reference/sdks/server/ruby)

[Dart](/docs/reference/sdks/server/dart)

[Rust](/docs/reference/sdks/server/rust)

[C++](/docs/reference/sdks/server/cpp)

Status

Spec version

The version of the specification that the SDK is fully compliant with.

[0.7.0](https://github.com/open-feature/spec/releases/tag/v0.7.0)

[0.8.0](https://github.com/open-feature/spec/releases/tag/v0.8.0)

[0.8.0](https://github.com/open-feature/spec/releases/tag/v0.8.0)

[0.7.0](https://github.com/open-feature/spec/releases/tag/v0.7.0)

[0.8.0](https://github.com/open-feature/spec/releases/tag/v0.8.0)

[0.5.1](https://github.com/open-feature/spec/releases/tag/v0.5.1)

[0.8.0](https://github.com/open-feature/spec/releases/tag/v0.8.0)

[0.8.0](https://github.com/open-feature/spec/releases/tag/v0.8.0)

[0.5.2](https://github.com/open-feature/spec/releases/tag/v0.5.2)

[0.2.0](https://github.com/open-feature/spec/releases/tag/v0.2.0)

Release version

The latest published release version.

[1.20.2](https://github.com/open-feature/java-sdk/releases/tag/v1.20.2)

[1.21.0](https://github.com/open-feature/js-sdk/releases/tag/server-sdk-v1.21.0)

[2.13.0](https://github.com/open-feature/dotnet-sdk/releases/tag/v2.13.0)

[1.17.2](https://github.com/open-feature/go-sdk/releases/tag/v1.17.2)

[0.9.0](https://github.com/open-feature/python-sdk/releases/tag/v0.9.0)

[2.1.2](https://github.com/open-feature/php-sdk/releases/tag/2.1.2)

[0.6.5](https://github.com/open-feature/ruby-sdk/releases/tag/v0.6.5)

[0.0.22](https://github.com/open-feature/dart-server-sdk/releases/tag/v0.0.22)

[0.3.0](https://github.com/open-feature/rust-sdk/releases/tag/open-feature-v0.3.0)

[0.0.1](https://github.com/open-feature/cpp-sdk/releases/tag/v0.0.1)

Stable release

OpenFeature employs semantic versioning for release versions. SDKs below 1.0 aim to minimize breaking changes but are allowed in order to avoid long-term technical debt.

-   ✅: A major version 1 or greater is available
-   ⚠️: A major version hasn't been released

✅

✅

✅

✅

⚠️

✅

⚠️

⚠️

⚠️

⚠️

Features

Providers

[✅](/docs/reference/sdks/server/java#providers)

[✅](/docs/reference/sdks/server/javascript#providers)

[✅](/docs/reference/sdks/server/dotnet#providers)

[✅](/docs/reference/sdks/server/go#providers)

[✅](/docs/reference/sdks/server/python#providers)

[✅](/docs/reference/sdks/server/php#providers)

[✅](/docs/reference/sdks/server/ruby#providers)

[✅](/docs/reference/sdks/server/dart#providers)

[✅](/docs/reference/sdks/server/rust#providers)

[⚠️](/docs/reference/sdks/server/cpp#providers)

Targeting

[✅](/docs/reference/sdks/server/java#targeting)

[✅](/docs/reference/sdks/server/javascript#targeting)

[✅](/docs/reference/sdks/server/dotnet#targeting)

[✅](/docs/reference/sdks/server/go#targeting)

[✅](/docs/reference/sdks/server/python#targeting)

[✅](/docs/reference/sdks/server/php#targeting)

[✅](/docs/reference/sdks/server/ruby#targeting)

[✅](/docs/reference/sdks/server/dart#targeting)

[✅](/docs/reference/sdks/server/rust#targeting)

[✅](/docs/reference/sdks/server/cpp#targeting)

Hooks

[✅](/docs/reference/sdks/server/java#hooks)

[✅](/docs/reference/sdks/server/javascript#hooks)

[✅](/docs/reference/sdks/server/dotnet#hooks)

[✅](/docs/reference/sdks/server/go#hooks)

[✅](/docs/reference/sdks/server/python#hooks)

[✅](/docs/reference/sdks/server/php#hooks)

[✅](/docs/reference/sdks/server/ruby#hooks)

[✅](/docs/reference/sdks/server/dart#hooks)

[✅](/docs/reference/sdks/server/rust#hooks)

[❌](/docs/reference/sdks/server/cpp#hooks)

Logging

[✅](/docs/reference/sdks/server/java#logging)

[✅](/docs/reference/sdks/server/javascript#logging)

[✅](/docs/reference/sdks/server/dotnet#logging)

[✅](/docs/reference/sdks/server/go#logging)

[✅](/docs/reference/sdks/server/python#logging)

[✅](/docs/reference/sdks/server/php#logging)

[✅](/docs/reference/sdks/server/ruby#logging)

[✅](/docs/reference/sdks/server/dart#logging)

[✅](/docs/reference/sdks/server/rust#logging)

[❌](/docs/reference/sdks/server/cpp#logging)

Domains / Named clients

[✅](/docs/reference/sdks/server/java#domains)

[✅](/docs/reference/sdks/server/javascript#domains)

[✅](/docs/reference/sdks/server/dotnet#domains)

[✅](/docs/reference/sdks/server/go#domains)

[✅](/docs/reference/sdks/server/python#domains)

[❌](/docs/reference/sdks/server/php#named-clients)

[✅](/docs/reference/sdks/server/ruby#domains)

[✅](/docs/reference/sdks/server/dart#domains)

[✅](/docs/reference/sdks/server/rust#named-clients)

[✅](/docs/reference/sdks/server/cpp#domains)

Eventing

[✅](/docs/reference/sdks/server/java#eventing)

[✅](/docs/reference/sdks/server/javascript#eventing)

[✅](/docs/reference/sdks/server/dotnet#eventing)

[✅](/docs/reference/sdks/server/go#eventing)

[✅](/docs/reference/sdks/server/python#eventing)

[⚠️](/docs/reference/sdks/server/php#eventing)

[✅](/docs/reference/sdks/server/ruby#eventing)

[✅](/docs/reference/sdks/server/dart#eventing)

[❌](/docs/reference/sdks/server/rust#eventing)

[❌](/docs/reference/sdks/server/cpp#eventing)

Tracking

[✅](/docs/reference/sdks/server/java#tracking)

[✅](/docs/reference/sdks/server/javascript#tracking)

[✅](/docs/reference/sdks/server/dotnet#tracking)

[✅](/docs/reference/sdks/server/go#tracking)

[✅](/docs/reference/sdks/server/python#tracking)

[❓](/docs/reference/sdks/server/php)

[✅](/docs/reference/sdks/server/ruby#tracking)

[✅](/docs/reference/sdks/server/dart#tracking)

[❓](/docs/reference/sdks/server/rust)

[❌](/docs/reference/sdks/server/cpp#tracking)

Transaction Context Propagation

[✅](/docs/reference/sdks/server/java#transaction-context-propagation)

[✅](/docs/reference/sdks/server/javascript#transaction-context-propagation)

[✅](/docs/reference/sdks/server/dotnet#transaction-context-propagation)

[✅](/docs/reference/sdks/server/go#transaction-context-propagation)

[✅](/docs/reference/sdks/server/python#transaction-context-propagation)

[❓](/docs/reference/sdks/server/php)

[✅](/docs/reference/sdks/server/ruby#transaction-context-propagation)

[✅](/docs/reference/sdks/server/dart#transaction-context-propagation)

[❓](/docs/reference/sdks/server/rust)

[❌](/docs/reference/sdks/server/cpp#transaction-context-propagation)

Shutdown

[✅](/docs/reference/sdks/server/java#shutdown)

[✅](/docs/reference/sdks/server/javascript#shutdown)

[✅](/docs/reference/sdks/server/dotnet#shutdown)

[✅](/docs/reference/sdks/server/go#shutdown)

[✅](/docs/reference/sdks/server/python#shutdown)

[❌](/docs/reference/sdks/server/php#shutdown)

[✅](/docs/reference/sdks/server/ruby#shutdown)

[✅](/docs/reference/sdks/server/dart#shutdown)

[✅](/docs/reference/sdks/server/rust#shutdown)

[✅](/docs/reference/sdks/server/cpp#shutdown)

Extending

[✅](/docs/reference/sdks/server/java#extending)

[✅](/docs/reference/sdks/server/javascript#extending)

[✅](/docs/reference/sdks/server/dotnet#extending)

[✅](/docs/reference/sdks/server/go#extending)

[✅](/docs/reference/sdks/server/python#extending)

[✅](/docs/reference/sdks/server/php#extending)

[✅](/docs/reference/sdks/server/ruby#extending)

[✅](/docs/reference/sdks/server/dart#extending)

[✅](/docs/reference/sdks/server/rust#extending)

[✅](/docs/reference/sdks/server/cpp#extending)

Multi-Provider

[❓](/docs/reference/sdks/server/java)

[✅](/docs/reference/sdks/server/javascript#multi-provider)

[❓](/docs/reference/sdks/server/dotnet)

[❓](/docs/reference/sdks/server/go)

[❓](/docs/reference/sdks/server/python)

[❓](/docs/reference/sdks/server/php)

[❓](/docs/reference/sdks/server/ruby)

[⚠️](/docs/reference/sdks/server/dart#multi-provider-experimental)

[❓](/docs/reference/sdks/server/rust)

[❓](/docs/reference/sdks/server/cpp)

Implemented: ✅ | In-progress: ⚠️ | Not implemented yet: ❌ | Unknown status: ❓

### Client-side SDKs[​](#client-side-sdks "Direct link to Client-side SDKs")

Client-side SDKs are intended for single user client applications (e.g. mobile phones, single-page web apps) and conform to the [static-context paradigm](/specification/glossary#static-context-paradigm).

[Web](/docs/reference/sdks/client/web)

[Kotlin](/docs/reference/sdks/client/kotlin)

[iOS](/docs/reference/sdks/client/swift)

Status

Spec version

The version of the specification that the SDK is fully compliant with.

[0.8.0](https://github.com/open-feature/spec/releases/tag/v0.8.0)

[0.8.0](https://github.com/open-feature/spec/releases/tag/v0.8.0)

[0.8.0](https://github.com/open-feature/spec/releases/tag/v0.8.0)

Release version

The latest published release version.

[1.8.0](https://github.com/open-feature/js-sdk/releases/tag/web-sdk-v1.8.0)

[0.8.0](https://github.com/open-feature/kotlin-sdk/releases/tag/v0.8.0)

[0.5.0](https://github.com/open-feature/swift-sdk/releases/tag/0.5.0)

Stable release

OpenFeature employs semantic versioning for release versions. SDKs below 1.0 aim to minimize breaking changes but are allowed in order to avoid long-term technical debt.

-   ✅: A major version 1 or greater is available
-   ⚠️: A major version hasn't been released

✅

⚠️

⚠️

Features

Providers

[✅](/docs/reference/sdks/client/web#providers)

[✅](/docs/reference/sdks/client/kotlin#providers)

[✅](/docs/reference/sdks/client/swift#providers)

Targeting

[✅](/docs/reference/sdks/client/web#targeting-and-context)

[✅](/docs/reference/sdks/client/kotlin#targeting)

[✅](/docs/reference/sdks/client/swift#targeting)

Hooks

[✅](/docs/reference/sdks/client/web#hooks)

[✅](/docs/reference/sdks/client/kotlin#hooks)

[✅](/docs/reference/sdks/client/swift#hooks)

Logging

[✅](/docs/reference/sdks/client/web#logging)

[✅](/docs/reference/sdks/client/kotlin#logging)

[✅](/docs/reference/sdks/client/swift#logging)

Domains / Named clients

[✅](/docs/reference/sdks/client/web#domains)

[⚠️](/docs/reference/sdks/client/kotlin#domains)

[❌](/docs/reference/sdks/client/swift#domains)

Eventing

[✅](/docs/reference/sdks/client/web#eventing)

[✅](/docs/reference/sdks/client/kotlin#eventing)

[✅](/docs/reference/sdks/client/swift#eventing)

Tracking

[✅](/docs/reference/sdks/client/web#tracking)

[✅](/docs/reference/sdks/client/kotlin#tracking)

[✅](/docs/reference/sdks/client/swift#tracking)

Shutdown

[✅](/docs/reference/sdks/client/web#shutdown)

[✅](/docs/reference/sdks/client/kotlin#shutdown)

[❌](/docs/reference/sdks/client/swift#shutdown)

Extending

[✅](/docs/reference/sdks/client/web#extending)

[✅](/docs/reference/sdks/client/kotlin#extending)

[✅](/docs/reference/sdks/client/swift#extending)

Multi-Provider

[✅](/docs/reference/sdks/client/web#multi-provider)

[✅](/docs/reference/sdks/client/kotlin#multi-provider)

[❓](/docs/reference/sdks/client/swift)

Implemented: ✅ | In-progress: ⚠️ | Not implemented yet: ❌ | Unknown status: ❓