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

## Asynchronous requests

Some long-running operations can run asynchronously rather than holding the connection open until they finish.
The official client libraries handle this automatically and transparently — the call will block until the operation finishes.
Make sure to [configure the request timeout](#configuring-timeouts) long enough for the operation to complete. In case of a timeout, the operation will still continue server-side.
The rest of this section is only relevant if you call the HTTP API directly.

Currently supported operations:

- [copy_from_namespace](/docs/write#param-copy_from_namespace)
- [recall evaluation](/docs/recall)

Send the `Prefer: respond-async` header to allow the server to start the operation in the background.
The server returns `202 Accepted` with a `Location` header pointing to the operation.
Poll that location to check on progress: The response is `{"status": "running"}` until the operation finishes, then carries the result.

Note that the `Prefer: respond-async` header is just a hint.
The server may return a sync response, for efficiency or load reasons.

### Configuring timeouts

<!-- multilang -->
```bash
curl https://gcp-us-central1.turbopuffer.com/v2/namespaces/asyncreq-dst-curl \
  -X POST --fail-with-body --include \
  -H "Authorization: Bearer $TURBOPUFFER_API_KEY" \
  -H 'Prefer: respond-async' \
  -H 'Content-Type: application/json' \
  -d '{"copy_from_namespace": "asyncreq-src-curl-'"$NONCE"'"}'
# Response:
#   HTTP/1.1 202 Accepted
#   Preference-Applied: respond-async
#   Location: /v1/namespaces/asyncreq-dst-curl/operations/tpuf-abc123
#
#   {"token": "tpuf-abc123"}

curl https://gcp-us-central1.turbopuffer.com/v1/namespaces/asyncreq-dst-curl/operations/tpuf-abc123 \
  -X GET --fail-with-body \
  -H "Authorization: Bearer $TURBOPUFFER_API_KEY"
# Response (while running):
#   {"status": "running"}
# Response (finished successfully):
#   {
#     "status": "finished",
#     "result": {
#       "success": {"status": "OK", "message": "namespace cloned successfully"}
#     }
#   }
# Response (operation failed):
#   {
#     "status": "finished",
#     "result": {
#       "error": {
#         "status_code": 400,
#         "detail": {"status": "error", "error": "destination namespace already exists"}
#       }
#     }
#   }
```
```python
import turbopuffer

tpuf = turbopuffer.Turbopuffer(region='gcp-us-central1')
ns = tpuf.namespace(f'asyncreq-dst-py')

# Allow up to 30 minutes for the call to complete.
ns.copy_from(
    source_namespace=f'asyncreq-src-py',
    timeout=30 * 60,
)
```
```typescript
import { Turbopuffer } from "@turbopuffer/turbopuffer";

const tpuf = new Turbopuffer({region: "gcp-us-central1"});
const ns = tpuf.namespace(`asyncreq-dst-ts`);

// Allow up to 30 minutes for the call to complete.
await ns.copyFrom(
    { source_namespace: `asyncreq-src-ts` },
    { timeout: 30 * 60 * 1000 },
);
```
```go
package main

import (
	"context"
	"os"
	"time"

	"github.com/turbopuffer/turbopuffer-go/v2"
	"github.com/turbopuffer/turbopuffer-go/v2/option"
)

func main() {
	ctx := context.Background()
	tpuf := turbopuffer.NewClient(option.WithRegion("gcp-us-central1"))
	ns := tpuf.Namespace("asyncreq-dst-go")

	// Allow up to 30 minutes for the call to complete.
	copyCtx, cancel := context.WithTimeout(ctx, 30*time.Minute)
	defer cancel()
	_, err := (&ns).CopyFrom(
		copyCtx,
		turbopuffer.NamespaceCopyFromParams{
			SourceNamespace: "asyncreq-src-go",
		},
	)
	if err != nil {
		panic(err)
	}
}
```
```java
package com.turbopuffer.docs;

import com.turbopuffer.client.okhttp.*;
import com.turbopuffer.core.*;
import com.turbopuffer.models.namespaces.*;
import java.time.Duration;
import java.util.*;

public class AsyncRequest {

  public static void main(String[] args) {
    var tpuf = TurbopufferOkHttpClient.builder().fromEnv().region("gcp-us-central1").build();
    var ns = tpuf.namespace("asyncreq-dst-java");

    // Allow up to 30 minutes for the call to complete.
    ns.copyFrom(
      NamespaceCopyFromParams.builder()
        .sourceNamespace("asyncreq-src-java")
        .build(),
      RequestOptions.builder().timeout(Duration.ofMinutes(30)).build()
    );
  }
}
```
<!-- /multilang -->

## Specification

The API has a public OpenAPI specification available at:

https://github.com/turbopuffer/turbopuffer-openapi


---

This page: [/docs/overview.md](https://turbopuffer.com/docs/overview.md)

All documentation pages: [/llms.txt](https://turbopuffer.com/llms.txt)

All documentation in one file: [/llms-full.txt](https://turbopuffer.com/llms-full.txt)
