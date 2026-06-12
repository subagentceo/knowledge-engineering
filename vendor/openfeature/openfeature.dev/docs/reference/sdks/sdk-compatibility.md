# SDK Compatibility Overview

This page provides an overview of the status and supported features of the OpenFeature SDKs.

### Server-side SDKs​

Server-side SDKs are intended for multi-user applications (e.g. web server applications) and conform to the dynamic-context paradigm.

Java

Node.js

.NET

Go

Python

PHP

Ruby

Dart

Rust

C++

Status

Spec version

The version of the specification that the SDK is fully compliant with.

0.7.0

0.8.0

0.8.0

0.7.0

0.8.0

0.5.1

0.8.0

0.8.0

0.5.2

0.2.0

Release version

The latest published release version.

1.20.2

1.21.0

2.13.0

1.17.2

0.10.0

2.1.2

0.6.5

0.0.22

0.3.0

0.0.1

Stable release

OpenFeature employs semantic versioning for release versions. SDKs below 1.0 aim to minimize breaking changes but are allowed in order to avoid long-term technical debt.

*   ✅: A major version 1 or greater is available
*   ⚠️: A major version hasn't been released

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

✅

✅

✅

✅

✅

✅

✅

✅

✅

⚠️

Targeting

✅

✅

✅

✅

✅

✅

✅

✅

✅

✅

Hooks

✅

✅

✅

✅

✅

✅

✅

✅

✅

❌

Logging

✅

✅

✅

✅

✅

✅

✅

✅

✅

❌

Domains / Named clients

✅

✅

✅

✅

✅

❌

✅

✅

✅

✅

Eventing

✅

✅

✅

✅

✅

⚠️

✅

✅

❌

❌

Tracking

✅

✅

✅

✅

✅

❓

✅

✅

❓

❌

Transaction Context Propagation

✅

✅

✅

✅

✅

❓

✅

✅

❓

❌

Shutdown

✅

✅

✅

✅

✅

❌

✅

✅

✅

✅

Extending

✅

✅

✅

✅

✅

✅

✅

✅

✅

✅

Multi-Provider

❓

✅

❓

❓

❓

❓

❓

⚠️

❓

❓

Implemented: ✅ | In-progress: ⚠️ | Not implemented yet: ❌ | Unknown status: ❓

### Client-side SDKs​

Client-side SDKs are intended for single user client applications (e.g. mobile phones, single-page web apps) and conform to the static-context paradigm.

Web

Kotlin

iOS

Status

Spec version

The version of the specification that the SDK is fully compliant with.

0.8.0

0.8.0

0.8.0

Release version

The latest published release version.

1.8.0

0.8.0

0.5.0

Stable release

OpenFeature employs semantic versioning for release versions. SDKs below 1.0 aim to minimize breaking changes but are allowed in order to avoid long-term technical debt.

*   ✅: A major version 1 or greater is available
*   ⚠️: A major version hasn't been released

✅

⚠️

⚠️

Features

Providers

✅

✅

✅

Targeting

✅

✅

✅

Hooks

✅

✅

✅

Logging

✅

✅

✅

Domains / Named clients

✅

⚠️

❌

Eventing

✅

✅

✅

Tracking

✅

✅

✅

Shutdown

✅

✅

❌

Extending

✅

✅

✅

Multi-Provider

✅

✅

❓

Implemented: ✅ | In-progress: ⚠️ | Not implemented yet: ❌ | Unknown status: ❓