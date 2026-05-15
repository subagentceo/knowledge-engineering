# Language APIs & SDKs

> OpenTelemetry code instrumentation is supported for many popular programming languages

---

LLMS index: [llms.txt](/llms.txt)

---

OpenTelemetry code [instrumentation][] is supported for the languages listed in
the [Statuses and Releases](#status-and-releases) table below. Unofficial
implementations for [other languages](/docs/languages/other) are available as
well. You can find them in the [registry](/ecosystem/registry/).

For Go, .NET, PHP, Python, Java and JavaScript you can use
[zero-code solutions](/docs/zero-code) to add instrumentation to your
application without code changes.

If you are using Kubernetes, you can use the [OpenTelemetry Operator for
Kubernetes][otel-op] to [inject these zero-code solutions][zero-code] into your
application.

## Status and Releases

The current status of the major functional components for OpenTelemetry is as
follows:

> [!WARNING]
>
> Regardless of an API/SDK's status, if your instrumentation relies on [semantic
> conventions][semconv] that are marked as [Experimental][] in the [semantic
> conventions specification][semconv-spec], your data flow might be subject to
> **breaking changes**.
>
> [semconv]: /docs/concepts/semantic-conventions/
> [Experimental]: /docs/specs/otel/document-status/
> [semconv-spec]: /docs/specs/semconv/




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


## API references

Special Interest Groups (SIGs) implementing the OpenTelemetry API and SDK in a
specific language also publish API references for developers. The following
references are available:


    
      
    
    
    
    
    
    
    
    
    
    
    
- <a href="/docs/languages/cpp/api/" target="_blank" rel="noopener" class="external-link">C++</a>
- <a href="/docs/languages/dotnet/traces-api/" target="_blank" rel="noopener" class="external-link">.NET &mdash; Tracing </a>
- <a href="/docs/languages/dotnet/metrics-api/" target="_blank" rel="noopener" class="external-link">.NET &mdash; Metrics </a>
- <a href="/docs/languages/erlang/api/" target="_blank" rel="noopener" class="external-link">Erlang/Elixir</a>
- <a href="/docs/languages/go/api/" target="_blank" rel="noopener" class="external-link">Go</a>
- <a href="/docs/languages/java/api/">Java &mdash; Record Telemetry with API</a>
- <a href="/docs/languages/js/api/" target="_blank" rel="noopener" class="external-link">JavaScript</a>
- <a href="/docs/languages/php/api/" target="_blank" rel="noopener" class="external-link">PHP</a>
- <a href="/docs/languages/python/api/" target="_blank" rel="noopener" class="external-link">Python</a>
- <a href="/docs/languages/ruby/api/" target="_blank" rel="noopener" class="external-link">Ruby</a>
- <a href="/docs/languages/rust/api/" target="_blank" rel="noopener" class="external-link">Rust</a>

> [!NOTE]
>
> The list above is aliased to [`/api`](/api).

[zero-code]: /docs/platforms/kubernetes/operator/automatic/
[instrumentation]: /docs/concepts/instrumentation/
[otel-op]: /docs/platforms/kubernetes/operator/

---

Section pages:

- [SDK Configuration](/docs/languages/sdk-configuration/)
- [C++](/docs/languages/cpp/): <img width="35" class="img-initial otel-icon" src="/img/logos/32x32/C++_SDK.svg" alt="C++"> A language-specific implementation of OpenTelemetry in C++.
- [.NET](/docs/languages/dotnet/): <img width="35" class="img-initial otel-icon" src="/img/logos/32x32/dotnet.svg" alt=".NET"> A language-specific implementation of OpenTelemetry in .NET.
- [Erlang/Elixir](/docs/languages/erlang/): <img width="35" class="img-initial otel-icon" src="/img/logos/32x32/Erlang_SDK.svg" alt="Erlang/Elixir"> A language-specific implementation of OpenTelemetry in Erlang/Elixir.
- [Go](/docs/languages/go/): <img width="35" class="img-initial otel-icon" src="/img/logos/32x32/Golang_SDK.svg" alt="Go"> A language-specific implementation of OpenTelemetry in Go.
- [Java](/docs/languages/java/): <img width="35" class="img-initial otel-icon" src="/img/logos/32x32/Java_SDK.svg" alt="Java"> Language-specific implementation of OpenTelemetry in Java.
- [JavaScript](/docs/languages/js/): <img width="35" class="img-initial otel-icon" src="/img/logos/32x32/JS_SDK.svg" alt="JavaScript"> A language-specific implementation of OpenTelemetry in JavaScript (for Node.js & the browser).
- [Kotlin](/docs/languages/kotlin/): <img width="35" class="img-initial otel-icon" src="/img/logos/32x32/SDK.svg" alt="Kotlin"> A language-specific implementation of OpenTelemetry in Kotlin.
- [PHP](/docs/languages/php/): <img width="35" class="img-initial otel-icon" src="/img/logos/32x32/PHP.svg" alt="PHP"> A language-specific implementation of OpenTelemetry in PHP.
- [Python](/docs/languages/python/): <img width="35" class="img-initial otel-icon" src="/img/logos/32x32/Python_SDK.svg" alt="Python"> A language-specific implementation of OpenTelemetry in Python.
- [Ruby](/docs/languages/ruby/): <img width="35" class="img-initial otel-icon" src="/img/logos/32x32/Ruby_SDK.svg" alt="Ruby"> A language-specific implementation of OpenTelemetry in Ruby.
- [Rust](/docs/languages/rust/): <img width="35" class="img-initial otel-icon" src="/img/logos/32x32/Rust.svg" alt="Rust"> A language-specific implementation of OpenTelemetry in Rust.
- [Swift](/docs/languages/swift/): <img width="35" class="img-initial otel-icon" src="/img/logos/32x32/Swift.svg" alt="Swift"> A language-specific implementation of OpenTelemetry in Swift.
- [Other languages](/docs/languages/other/): Language-specific implementation of OpenTelemetry for other languages.
