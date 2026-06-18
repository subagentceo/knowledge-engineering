---
title: OpenTelemetry
description: Export AI Gateway trace spans to OpenTelemetry-compatible backends for distributed tracing and performance monitoring.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# OpenTelemetry

AI Gateway supports exporting traces to OpenTelemetry-compatible backends, enabling you to monitor and analyze AI request performance alongside your existing observability infrastructure.

## Overview

The OpenTelemetry (OTEL) integration automatically exports trace spans for AI requests processed through your gateway. These spans include detailed information about:

* Request model and provider
* Token usage (input and output)
* Request prompts and completions
* Cost estimates
* Custom metadata

This integration follows the [OpenTelemetry specification ↗](https://opentelemetry.io/docs/specs/otel/) for distributed tracing and uses the OTLP (OpenTelemetry Protocol) format, supporting both JSON and protobuf encoding.

## Configuration

To enable OpenTelemetry tracing for your gateway, configure one or more OTEL exporters in your gateway settings. Each exporter accepts:

* **URL** (required): The endpoint URL of your OTEL collector
* **Headers** (optional): Additional custom headers to include in export requests. If your collector requires authentication, pass it here (for example, `Authorization: Bearer <token>`).
* **Authorization** (optional): A reference to a secret in [Secrets Store](https://developers.cloudflare.com/secrets-store/) containing your collector's authorization header value. When set, AI Gateway resolves the secret at runtime and sends it as the `Authorization` header on export requests. For most use cases, passing authentication via **Headers** is simpler.
* **Content type** (optional): The export format — `json` (default) or `protobuf`.

### Configuration via Dashboard

1. Navigate to your AI Gateway in the Cloudflare dashboard.
2. Go to **Settings** tab.
3. Add an OTEL exporter with your collector endpoint URL.
4. If your collector requires authentication, add an `Authorization` header in the **Headers** field with your token value.

## Exported Span Attributes

AI Gateway exports spans with the following attributes following the [Semantic Conventions for Gen AI ↗](https://opentelemetry.io/docs/specs/semconv/gen-ai/):

### Standard Attributes

| Attribute                    | Type   | Description                                     |
| ---------------------------- | ------ | ----------------------------------------------- |
| gen\_ai.request.model        | string | The AI model used for the request               |
| gen\_ai.model.provider       | string | The AI provider (e.g., openai, anthropic)       |
| gen\_ai.usage.input\_tokens  | int    | Number of input tokens consumed                 |
| gen\_ai.usage.output\_tokens | int    | Number of output tokens generated               |
| gen\_ai.prompt\_json         | string | JSON-encoded prompt/messages sent to the model  |
| gen\_ai.completion\_json     | string | JSON-encoded completion/response from the model |
| gen\_ai.usage.cost           | double | Estimated cost of the request                   |

### Custom Metadata

Any custom metadata added to your requests via the `cf-aig-metadata` header will also be included as span attributes. This allows you to correlate traces with user IDs, team names, or other business context.

Terminal window

```

curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openai/chat/completions \

  --header 'Authorization: Bearer {api_token}' \

  --header 'Content-Type: application/json' \

  --header 'cf-aig-metadata: {"user_id": "user123", "team": "engineering"}' \

  --data '{

    "model": "gpt-4o",

    "messages": [{"role": "user", "content": "Hello!"}]

  }'


```

The above request will include `user_id` and `team` as additional span attributes in the exported trace.

Note

Custom metadata attributes that start with `gen_ai.` are reserved for standard GenAI semantic conventions and will not be added as custom attributes.

## Trace Context Propagation

AI Gateway supports trace context propagation, allowing you to link AI Gateway spans with your application's traces. You can provide trace context using custom headers:

* `cf-aig-otel-trace-id` (optional): A 32-character hex string to use as the trace ID
* `cf-aig-otel-parent-span-id` (optional): A 16-character hex string to use as the parent span ID

Terminal window

```

curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openai/chat/completions \

  --header 'cf-aig-otel-trace-id: a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6' \

  --header 'cf-aig-otel-parent-span-id: a1b2c3d4e5f6g7h8' \

  --header 'Authorization: Bearer {api_token}' \

  --header 'Content-Type: application/json' \

  --data '{

    "model": "gpt-4o",

    "messages": [{"role": "user", "content": "Hello!"}]

  }'


```

When these headers are provided, the AI Gateway span will use them to link with your existing trace. If not provided, AI Gateway will generate a new trace ID automatically.

## Common OTEL Backends

AI Gateway's OTEL integration works with any OpenTelemetry-compatible backend, including:

* [Honeycomb ↗](https://www.honeycomb.io/)
* [Braintrust ↗](https://www.braintrust.dev/docs/integrations/sdk-integrations/opentelemetry)
* [Langfuse ↗](https://langfuse.com/integrations/native/opentelemetry)

Note

AI Gateway supports both OTLP/JSON and OTLP/protobuf export formats. Use the **Content type** setting to choose the format your collector expects.

Refer to your observability platform's documentation for the correct OTLP endpoint URL and authentication requirements.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/observability/otel-integration/#page","headline":"OpenTelemetry · Cloudflare AI Gateway docs","description":"Export AI Gateway trace spans to OpenTelemetry-compatible backends for distributed tracing and performance monitoring.","url":"https://developers.cloudflare.com/ai-gateway/observability/otel-integration/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/observability/","name":"Observability"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/observability/otel-integration/","name":"OpenTelemetry"}}]}
```
