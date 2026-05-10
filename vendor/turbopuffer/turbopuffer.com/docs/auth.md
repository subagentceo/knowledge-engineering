# API Overview

## Authentication

All API calls require authenticating with your API key. You can create and expire tokens in the [dashboard](/dashboard).

The HTTP API expects the API key to be formatted as a standard Bearer token and passed in the Authorization header:

```http
Authorization: Bearer <API_KEY>
```

## Encoding

The API uses JSON encoding for both request and response payloads.

## Compression

The API supports standard HTTP compression headers.

However, for most workloads, disabling compression offers the best performance.
turbopuffer clients are typically CPU constrained, not network bandwidth
constrained.

The official client libraries disable request and response compression by default.

## Error responses

If an error occurs for your request, all endpoints will return a JSON payload in the format:

```json
{
  "status": "error",
  "error": "an error message"
}
```

You may encounter an `HTTP 429` if you query or write too quickly. See [limits](/docs/limits) for more information.

## Specification

The API has a public OpenAPI specification available at:

https://github.com/turbopuffer/turbopuffer-openapi
