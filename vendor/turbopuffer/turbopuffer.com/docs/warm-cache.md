# Warm cache

GET /v1/namespaces/:namespace/hint_cache_warm

**Hint Cache Warm** (Latency of the hint_cache_warm endpoint when warming is already in progress.)
- Hint Latency Only (Warming in Background): p50=1ms, p90=1ms, p99=2ms

Signal turbopuffer to prepare for low-latency requests. Hints turbopuffer that the client will send latency-sensitive requests in the near future,
so that turbopuffer can get ready to serve those requests with low (warm) latency.
turbopuffer responds by acknowledging the request.

## Billing

If turbopuffer is ready to serve requests with low latency, or it is already getting
the namespace ready for low-latency queries, this request is free.
Otherwise, this request is billed as a query that returns zero rows.

## Use cases

A common use case is for applications to send hints for all namespaces associated
with a user whenever a user begins a new session, so that users don't experience
cold latency when they trigger their first turbopuffer query.

## Examples

<!-- multilang -->
```bash
# choose best region: https://turbopuffer.com/docs/regions
curl https://gcp-us-central1.turbopuffer.com/v1/namespaces/warm-cache-example-curl/hint_cache_warm \
  -X GET --fail-with-body \
  -H "Authorization: Bearer $TURBOPUFFER_API_KEY"

# Response payload
# { "status": "ACCEPTED", "message": "cache warm hint accepted" }
```
```python
import turbopuffer

tpuf = turbopuffer.Turbopuffer(
    region='gcp-us-central1', # choose best region: https://turbopuffer.com/docs/regions
)

ns = tpuf.namespace(f'warm-cache-example-py')

print(ns.hint_cache_warm())
# NamespaceHintCacheWarmResponse(status='ACCEPTED', message='cache warm hint accepted')
```
```typescript
import { Turbopuffer } from "@turbopuffer/turbopuffer";

const tpuf = new Turbopuffer({
  region: "gcp-us-central1", // choose best region: https://turbopuffer.com/docs/regions
});

const ns = tpuf.namespace(`warm-cache-example-ts`);

console.log(await ns.hintCacheWarm());
// { "status": "ACCEPTED", "message": "cache warm hint accepted" }
```
```go
package main

import (
	"context"
	"fmt"
	"os"

	"github.com/turbopuffer/turbopuffer-go/v2"
	"github.com/turbopuffer/turbopuffer-go/v2/option"
)

func main() {
	ctx := context.Background()
	tpuf := turbopuffer.NewClient(
		option.WithRegion("gcp-us-central1"), // choose best region: https://turbopuffer.com/docs/regions
	)

	ns := tpuf.Namespace("warm-cache-example-go")

	result, err := ns.HintCacheWarm(ctx, turbopuffer.NamespaceHintCacheWarmParams{})
	if err != nil {
		panic(err)
	}
	fmt.Print(turbopuffer.PrettyPrint(result))
	// {"status": "ACCEPTED", "message": "cache warm hint accepted"}
}
```
```java
package com.turbopuffer.docs;

import com.turbopuffer.client.okhttp.*;
import com.turbopuffer.models.namespaces.*;
import java.util.*;

public class WarmCache {

  public static void main(String[] args) {
    var tpuf = TurbopufferOkHttpClient.builder()
      .fromEnv()
      .region("gcp-us-central1") // choose best region: https://turbopuffer.com/docs/regions
      .build();

    var ns = tpuf.namespace("warm-cache-example-java");

    System.out.println(ns.hintCacheWarm());
    // NamespaceHintCacheWarmResponse{status=ACCEPTED, message=cache warm hint accepted}
  }
}
```
```cs
// dotnet add package Turbopuffer
using System;
using Turbopuffer;
using Turbopuffer.Models.Namespaces;

using var tpuf = new TurbopufferClient
{
    // Pick the right region: https://turbopuffer.com/docs/regions
    Region = "gcp-us-central1",
};

var ns = tpuf.Namespace("warm-cache-example-csharp");

Console.WriteLine(await ns.HintCacheWarm(new NamespaceHintCacheWarmParams()));
// {"status": "ACCEPTED", "message": "cache warm hint accepted"}
```
```ruby
require "turbopuffer"

tpuf = Turbopuffer::Client.new(
  region: "gcp-us-central1", # choose best region: https://turbopuffer.com/docs/regions
)

ns = tpuf.namespace("warm-cache-example-rb")

puts ns.hint_cache_warm
# {status: :ACCEPTED, message: "cache warm hint accepted"}
```
<!-- /multilang -->


---

This page: [/docs/warm-cache.md](https://turbopuffer.com/docs/warm-cache.md)

All documentation pages: [/llms.txt](https://turbopuffer.com/llms.txt)

All documentation in one file: [/llms-full.txt](https://turbopuffer.com/llms-full.txt)
