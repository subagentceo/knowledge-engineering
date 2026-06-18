# Status

> Maturity-level of the main OpenTelemetry components

---

LLMS index: [llms.txt](/llms.txt)

---

OpenTelemetry is made up of [several components](/docs/concepts/components/),
some language-specific and others language-agnostic. When looking for a
[status](/docs/specs/otel/versioning-and-stability/), make sure to look for the
status from the right component page. For example, the status of a signal in the
specification may not be the same as the signal status in a particular language
SDK.

## Language APIs & SDKs

For the development status, or maturity level, of a
[language API or SDK](/docs/languages/), see the following table:




Language | Traces | Metrics | Logs | Profiles |
| --- | --- | --- | --- | --- |
| [C++](/docs/languages/cpp/) | [Stable](https://github.com/open-telemetry/opentelemetry-specification/blob/main/oteps/0232-maturity-of-otel.md#stable) | [Stable](https://github.com/open-telemetry/opentelemetry-specification/blob/main/oteps/0232-maturity-of-otel.md#stable) | [Stable](https://github.com/open-telemetry/opentelemetry-specification/blob/main/oteps/0232-maturity-of-otel.md#stable) | - |
| [C#/.NET](/docs/languages/dotnet/) | [Stable](https://github.com/open-telemetry/opentelemetry-specification/blob/main/oteps/0232-maturity-of-otel.md#stable) | [Stable](https://github.com/open-telemetry/opentelemetry-specification/blob/main/oteps/0232-maturity-of-otel.md#stable) | [Stable](https://github.com/open-telemetry/opentelemetry-specification/blob/main/oteps/0232-maturity-of-otel.md#stable) | - |
| [Erlang/Elixir](/docs/languages/erlang/) | [Stable](https://github.com/open-telemetry/opentelemetry-specification/blob/main/oteps/0232-maturity-of-otel.md#stable) | [Development](https://github.com/open-telemetry/opentelemetry-specification/blob/main/oteps/0232-maturity-of-otel.md#development) | [Development](https://github.com/open-telemetry/opentelemetry-specification/blob/main/oteps/0232-maturity-of-otel.md#development) | - |
| [Go](/docs/languages/go/) | [Stable](https://github.com/open-telemetry/opentelemetry-specification/blob/main/oteps/0232-maturity-of-otel.md#stable) | [Stable](https://github.com/open-telemetry/opentelemetry-specification/blob/main/oteps/0232-maturity-of-otel.md#stable) | [Beta](https://github.com/open-telemetry/opentelemetry-specification/blob/main/oteps/0232-maturity-of-otel.md#beta) | - |
| [Java](/docs/languages/java/) | [Stable](https://github.com/open-telemetry/opentelemetry-specification/blob/main/oteps/0232-maturity-of-otel.md#stable) | [Stable](https://github.com/open-telemetry/opentelemetry-specification/blob/main/oteps/0232-maturity-of-otel.md#stable) | [Stable](https://github.com/open-telemetry/opentelemetry-specification/blob/main/oteps/0232-maturity-of-otel.md#stable) | [Development](https://github.com/open-telemetry/opentelemetry-specification/blob/main/oteps/0232-maturity-of-otel.md#development) |
| [JavaScript](/docs/languages/js/) | [Stable](https://github.com/open-telemetry/opentelemetry-specification/blob/main/oteps/0232-maturity-of-otel.md#stable) | [Stable](https://github.com/open-telemetry/opentelemetry-specification/blob/main/oteps/0232-maturity-of-otel.md#stable) | [Development](https://github.com/open-telemetry/opentelemetry-specification/blob/main/oteps/0232-maturity-of-otel.md#development) | - |
| [Kotlin](/docs/languages/kotlin/) | [Development](https://github.com/open-telemetry/opentelemetry-specification/blob/main/oteps/0232-maturity-of-otel.md#development) | [Development](https://github.com/open-telemetry/opentelemetry-specification/blob/main/oteps/0232-maturity-of-otel.md#development) | [Development](https://github.com/open-telemetry/opentelemetry-specification/blob/main/oteps/0232-maturity-of-otel.md#development) | - |
| [PHP](/docs/languages/php/) | [Stable](https://github.com/open-telemetry/opentelemetry-specification/blob/main/oteps/0232-maturity-of-otel.md#stable) | [Stable](https://github.com/open-telemetry/opentelemetry-specification/blob/main/oteps/0232-maturity-of-otel.md#stable) | [Stable](https://github.com/open-telemetry/opentelemetry-specification/blob/main/oteps/0232-maturity-of-otel.md#stable) | - |
| [Python](/docs/languages/python/) | [Stable](https://github.com/open-telemetry/opentelemetry-specification/blob/main/oteps/0232-maturity-of-otel.md#stable) | [Stable](https://github.com/open-telemetry/opentelemetry-specification/blob/main/oteps/0232-maturity-of-otel.md#stable) | [Development](https://github.com/open-telemetry/opentelemetry-specification/blob/main/oteps/0232-maturity-of-otel.md#development) | - |
| [Ruby](/docs/languages/ruby/) | [Stable](https://github.com/open-telemetry/opentelemetry-specification/blob/main/oteps/0232-maturity-of-otel.md#stable) | [Development](https://github.com/open-telemetry/opentelemetry-specification/blob/main/oteps/0232-maturity-of-otel.md#development) | [Development](https://github.com/open-telemetry/opentelemetry-specification/blob/main/oteps/0232-maturity-of-otel.md#development) | - |
| [Rust](/docs/languages/rust/) | [Beta](https://github.com/open-telemetry/opentelemetry-specification/blob/main/oteps/0232-maturity-of-otel.md#beta) | [Beta](https://github.com/open-telemetry/opentelemetry-specification/blob/main/oteps/0232-maturity-of-otel.md#beta) | [Beta](https://github.com/open-telemetry/opentelemetry-specification/blob/main/oteps/0232-maturity-of-otel.md#beta) | - |
| [Swift](/docs/languages/swift/) | [Stable](https://github.com/open-telemetry/opentelemetry-specification/blob/main/oteps/0232-maturity-of-otel.md#stable) | [Development](https://github.com/open-telemetry/opentelemetry-specification/blob/main/oteps/0232-maturity-of-otel.md#development) | [Development](https://github.com/open-telemetry/opentelemetry-specification/blob/main/oteps/0232-maturity-of-otel.md#development) | - |


For more details on the specification compliance per implementation, see the
[Spec Compliance Matrix](https://github.com/open-telemetry/opentelemetry-specification/blob/main/spec-compliance-matrix.md).

## Collector

The collector status is: [mixed](/docs/specs/otel/document-status/#mixed), since
core collector components currently have mixed
[stability levels](https://github.com/open-telemetry/opentelemetry-collector#stability-levels).

**Collector components** differ in their maturity levels. Each component has its
stability documented in its `README.md`. You can find a list of all available
collector components in the [registry](/ecosystem/registry/?language=collector).

## Kubernetes Operator

The OpenTelemetry Operator status is
[mixed](/docs/specs/otel/document-status/#mixed), since it deploys components of
differing statuses.

The Operator itself is in a [mixed](/docs/specs/otel/document-status/#mixed)
state with components in `v1alpha1` and `v1beta1` states.

## Specifications

For the development status, or maturity level, of the
[specification](/docs/specs/otel/), see the following:
[Specification Status Summary](/docs/specs/status/).
