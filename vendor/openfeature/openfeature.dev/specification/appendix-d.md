-   [](/)
-   Appendix D: Observability

On this page

# Appendix D: Observability

This document describes conventions for extracting data from the OpenFeature SDK for use in telemetry signals. It primarily focuses on providing recommendations for mapping well-known fields in OpenFeature to [OpenTelemetry feature-flag event records](https://opentelemetry.io/docs/specs/semconv/feature-flags/feature-flags-logs/) and other semantic conventions.

## Evaluations[​](#evaluations "Direct link to Evaluations")

Flag evaluation telemetry comprises data resolved from the provider resolution (evaluation details and flag metadata) as well as metadata about the provider itself. This is particularly relevant to telemetry-related [hooks](/specification/sections/hooks).

### Evaluation Details[​](#evaluation-details "Direct link to Evaluation Details")

The following describes how fields on the [evaluation details](/specification/types#evaluation-details) are mapped to feature flag event records:

Event Record Attribute

Source Field or Derived Value from Evaluation Details

Requirement level

Type

Notes

`feature_flag.key`

`flag key`

`Required`

`string`

See: [flag key](/specification/glossary#flag-key)

`feature_flag.result.variant`

`variant`

`Conditionally Required` [1](#user-content-fn-1)

`string`

See: [variant](/specification/glossary#variant)

`feature_flag.result.value`

`value`

`Conditionally Required` [2](#user-content-fn-2)

`undefined`

See: [value](/specification/glossary#values)

`feature_flag.result.reason`

`reason`

`Recommended`

`string`

See: [reason](/specification/types#resolution-reason)

`error.type`

`error code`

`Conditionally Required` [3](#user-content-fn-3)

`string`

See: [error code](/specification/types#error-code),

`error.message`

`error message`

`Conditionally Required` [3](#user-content-fn-3)

`string`

A human-readable error message associated with a failed evaluation. For programmatic purposes, refer to `error code`.

Note

The `error.type` and `feature_flag.result.reason` enumerations use a lowercase "snake\_case" convention (see [OpenTelemetry feature-flag event records](https://opentelemetry.io/docs/specs/semconv/feature-flags/feature-flags-logs/)). OpenFeature [error codes](/specification/types#error-code) and [resolution reasons](/specification/types#resolution-reason) should be transformed accordingly by integrations which include this data.

### Flag Metadata[​](#flag-metadata "Direct link to Flag Metadata")

The following describes how keys in [flag metadata](/specification/types#flag-metadata) are mapped to feature flag event records:

Event Record Attribute

Flag Metadata Key

Requirement level

Type

Notes

`feature_flag.context.id`

`contextId`

`Recommended`

`string`

The context identifier returned in the flag metadata uniquely identifies the subject of the flag evaluation. If not available, the [targeting key](/specification/glossary#targeting-key) should be used.

`feature_flag.set.id`

`flagSetId`

`Recommended`

`string`

A logical identifier for the [flag set](/specification/glossary#flag-set).

`feature_flag.version`

`version`

`Recommended`

`string`

A version string (format unspecified) for the flag or [flag set](/specification/glossary#flag-set).

Note

Keys in flag metadata use the "camelCase" casing convention, while the OpenTelemetry standard uses a namespaced "snake\_case" convention.

### Provider Metadata[​](#provider-metadata "Direct link to Provider Metadata")

Event Record Attribute

Provider Metadata Field

Requirement level

Type

Notes

`feature_flag.provider.name`

`name`

`Recommended`

`string`

The name of the provider as defined in the `provider metadata`, available in the `hook context`.

## Telemetry Hook Implementation Guide[​](#telemetry-hook-implementation-guide "Direct link to Telemetry Hook Implementation Guide")

This section provides guidance for implementing observability hooks that emit OpenTelemetry signals during feature flag evaluations. The recommendations ensure consistency across SDK implementations while allowing for language-specific idioms.

### Signal Emission Patterns[​](#signal-emission-patterns "Direct link to Signal Emission Patterns")

Telemetry hooks can emit OpenTelemetry signals in three distinct ways:

Pattern

Advantages

Disadvantages

**Span Events**  
![recommended](https://img.shields.io/badge/recommended-green)

-   Leverages existing trace configuration and tooling
-   Minimal overhead, no additional spans created
-   Maintains trace context relationships
-   Simpler than creating spans

-   Requires an active span to function
-   Must gracefully handle absence of active span
-   Limited to span lifetime and context.

**Event Logging**

-   Works independently without active spans
-   Aligns with OpenTelemetry's emerging direction
-   Suitable for environments without tracing
-   Simpler implementation model

-   Requires an event exporter to be configured
-   Processed and stored separately from spans
-   Event logging standards still evolving

**Standalone Spans**

-   Distributed traces contain every evaluation
-   Detailed timing information
-   Full span lifecycle control

-   Creates one span per evaluation
-   May clutter trace visualizations
-   Increased overhead and resource usage
-   Potential performance impact at scale
-   More complex implementation

Note

While span events are recommended for their low overhead and ease of use, OpenTelemetry is trending toward using log-based events instead of span events. Please refer to the [OpenTelemetry Span Event Deprecation Plan](https://github.com/open-telemetry/opentelemetry-specification/blob/main/oteps/4430-span-event-api-deprecation-plan.md) for more details.

### Hook Lifecycle Implementation[​](#hook-lifecycle-implementation "Direct link to Hook Lifecycle Implementation")

#### Before Stage[​](#before-stage "Direct link to Before Stage")

The `before` hook stage is primarily used by standalone span hooks to create and store spans. When creating spans, it's recommended to use the name `feature_flag.evaluation` and store them in hook data using a consistent, documented key for easy retrieval in later stages.

#### Error Stage[​](#error-stage "Direct link to Error Stage")

The `error` hook stage records exception information unless explicitly configured to exclude it. Implementations typically use [OpenTelemetry's standard exception](https://opentelemetry.io/docs/specs/semconv/general/recording-errors/) recording semantics (`recordException` for spans, exception log events for event logging). Configuration options like `excludeExceptions` allow users to control this behavior based on their needs.

#### Finally Stage[​](#finally-stage "Direct link to Finally Stage")

The `finally` hook stage is where telemetry signals are emitted with complete evaluation details. This stage should include all required and conditionally required attributes as defined in the attribute mapping tables above. It's also responsible for proper resource cleanup (like ending spans or closing connections).

### Attribute Transformations[​](#attribute-transformations "Direct link to Attribute Transformations")

When building telemetry attributes, implementations should extract and map well-known fields from flag metadata to their corresponding event record attributes as defined in the Flag Metadata table above. Remember to transform enumeration values (like error codes and reasons) from OpenFeature's uppercase format to OpenTelemetry's lowercase snake\_case convention.

### Value Handling and Privacy[​](#value-handling-and-privacy "Direct link to Value Handling and Privacy")

Flag values can contain large or sensitive data, so implementations should provide configuration to control whether values are included in telemetry signals. It's the users' responsibility to manage this configuration. When values are included, they need to be serialized appropriately for OpenTelemetry.

Consider providing mechanisms to redact or obfuscate sensitive flag values, along with size limits to prevent telemetry bloat. This helps balance observability needs with privacy and performance concerns.

### Configuration Options[​](#configuration-options "Direct link to Configuration Options")

For consistency across implementations, consider supporting a common set of configuration options:

-   `attributeMapper` (function): Custom function to add additional attributes to the signal
-   `excludeAttributes` (list): List of attribute keys to exclude from the signal
-   `excludeExceptions` (boolean): Whether to omit [exception details](https://opentelemetry.io/docs/specs/semconv/exceptions/) from error signals
-   `eventMutator` (function): Custom function to modify event attributes before sending

### Error Handling[​](#error-handling "Direct link to Error Handling")

Hooks should be designed to never throw exceptions that interrupt flag evaluation. Any internal errors can be logged at appropriate levels (debug/trace) without affecting application execution.

### Implementation Patterns[​](#implementation-patterns "Direct link to Implementation Patterns")

#### Common Base Class[​](#common-base-class "Direct link to Common Base Class")

In object-oriented languages, you might find it helpful to create a base hook class containing common functionality shared across all telemetry hook types. This typically includes:

-   Shared configuration options
-   Attribute building and transformation methods
-   Enumeration format conversion
-   Metadata extraction logic
-   Logger instances for internal debugging

This pattern can reduce code duplication and ensure consistency across different hook implementations, though it's not required.

## History[​](#history "Direct link to History")

Feature flags in the OpenTelemetry semantic conventions are currently in development and are marked as a release candidate. The following table describes the history of changes to the OpenTelemetry feature flag event records as it progresses towards a stable release.

Original Field Name

New Field Name

Semantic Convention Release

`feature_flag.variant`

`feature_flag.result.variant`

[v1.32.0](https://github.com/open-telemetry/semantic-conventions/releases/tag/v1.32.0)

`feature_flag.evaluation.reason`

`feature_flag.result.reason`

[v1.32.0](https://github.com/open-telemetry/semantic-conventions/releases/tag/v1.32.0)

`feature_flag.evaluation.error.message`

`error.message`

[v1.33.0](https://github.com/open-telemetry/semantic-conventions/releases/tag/v1.33.0)

`feature_flag.provider_name`

`feature_flag.provider.name`

[v1.33.0](https://github.com/open-telemetry/semantic-conventions/releases/tag/v1.33.0)

`value`

`feature_flag.result.value`

[v1.34.0](https://github.com/open-telemetry/semantic-conventions/releases/tag/v1.34.0)

## Footnotes[​](#footnotes "Direct link to Footnotes")

## Footnotes[​](#footnote-label "Direct link to Footnotes")

1.  The `variant` field should be included whenever possible as it represents the symbolic name of the flag's returned value (e.g., "on"/"off", "control"/"treatment"). Only omit if the provider doesn't supply this information. [↩](#user-content-fnref-1)
    
2.  The `value` field is required when a `variant` is not available, and recommended when it is. Considerations should be made for large and/or sensitive values, which should be redacted or omitted prior to being captured in telemetry signals. [↩](#user-content-fnref-2)
    
3.  Include `error.type` and `error.message`, if and only if an error occurred during a flag evaluation. [↩](#user-content-fnref-3) [↩2](#user-content-fnref-3-2)
    

[Edit this page](https://github.com/open-feature/spec/edit/main/specification/appendix-d-observability.md)