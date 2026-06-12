# Regions

We support Azure for "Deploy in your VPC", but no public regions yet. [Contact us](/contact) if you need a public Azure region.

In addition to these public clusters, we run dedicated clusters in various other
regions for single-tenancy customers and in any region inside your VPC in AWS,
GCP and Azure (BYOC). We can spin up dedicated or BYOC clusters in hours upon request, [contact
us](/contact). We will continue to expand public regions with
demand.

<!-- multilang -->
```bash
REGION_URL="https://gcp-us-east4.turbopuffer.com" # choose best region: https://turbopuffer.com/docs/regions

# First, create a namespace and add some data
curl --fail-with-body -X POST "$REGION_URL/v2/namespaces/region-example-curl" \
  -H "Authorization: Bearer $TURBOPUFFER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "upsert_rows": [
      {"id": 1, "vector": [0.1, 0.2, 0.3]},
      {"id": 2, "vector": [0.4, 0.5, 0.6]}
    ],
    "distance_metric": "cosine_distance"
  }'
```
```python
import turbopuffer

tpuf = turbopuffer.Turbopuffer(
    region='gcp-us-east4', # choose best region: https://turbopuffer.com/docs/regions
)

ns = tpuf.namespace(f'region-example-py')
```
```typescript
import { Turbopuffer } from "@turbopuffer/turbopuffer";

const tpuf = new Turbopuffer({
  region: "gcp-us-east4", // choose best region: https://turbopuffer.com/docs/regions
});

const ns = tpuf.namespace(`region-example-ts`);
```
```go
package main

import (
	"fmt"
	"os"

	"github.com/turbopuffer/turbopuffer-go/v2"
	"github.com/turbopuffer/turbopuffer-go/v2/option"
)

func main() {
	tpuf := turbopuffer.NewClient(
		option.WithRegion("gcp-us-east4"), // choose best region: https://turbopuffer.com/docs/regions
	)

	ns := tpuf.Namespace("region-example-go")

	// Use the namespace to avoid "declared and not used" error
	fmt.Printf("Created namespace in region: %v\n", ns)
}
```
```java
package com.turbopuffer.docs;

import com.turbopuffer.client.okhttp.*;
import com.turbopuffer.core.*;
import com.turbopuffer.models.namespaces.*;
import java.util.*;
import java.util.stream.*;

public class Region {

  public static void main(String[] args) {
    var tpuf = TurbopufferOkHttpClient.builder()
      .fromEnv()
      .region("gcp-us-east4") // choose best region: https://turbopuffer.com/docs/regions
      .build();

    var ns = tpuf.namespace("region-example-java");
  }
}
```
```cs
// dotnet add package Turbopuffer
using System;
using Turbopuffer;

using var tpuf = new TurbopufferClient
{
    // Pick the right region: https://turbopuffer.com/docs/regions
    Region = "gcp-us-east4",
};

var ns = tpuf.Namespace("region-example-csharp");
```
```ruby
require "turbopuffer"

tpuf = Turbopuffer::Client.new(
  region: "gcp-us-east4", # choose best region: https://turbopuffer.com/docs/regions
)

ns = tpuf.namespace("region-example-rb")
```
<!-- /multilang -->

To move data between regions, use [`copy_from_namespace`](/docs/write#param-copy_from_namespace) with a cross-region source. For granular control, use the [export](/docs/export) and [write](/docs/write) APIs with a client for each region.

## Cross-Cloud Latency

Since response times for vector search are typically above 10ms, the
contribution of cross-cloud latency is generally acceptable. Traffic within a
cloud provider's region is lower latency (\< 1ms) than cross-cloud traffic
(1-10ms), even if the providers are geographically close. For larger
customers, cross-cloud interconnects can be set up to reduce network latency.

## Cross-Cloud Egress Fees

A common misconception is that as long as your vendor is in the same Cloud as
you (e.g. AWS ↔️ AWS), you will be charged lower networking fees. This is generally not the case,
as most providers' API endpoints point to public IPs that route through the
public internet, unless you've set up a private connect (see below; you'll know if you
have). Any traffic leaving your VPC incurs \$0.05-0.09/GB Internet egress fees
([AWS](https://aws.amazon.com/ec2/pricing/on-demand/) /
[GCP](https://cloud.google.com/vpc/network-pricing#all-networking-pricing)/
[Azure](https://azure.microsoft.com/en-us/pricing/details/bandwidth/)).

Egress networking fees are charged to you on your bill by your provider. For
larger customers, we will work with you to set up AWS Private Link, GCP Private
Service Connect, Azure Private Link or an interconnect to reduce networking fees
to \$0.01/GB. Unless you're transferring tens of billions of vectors per month,
this is unlikely to have a large effect on your bill (1B vectors = 6TB would be
\$600 of egress, not a significant issue).

## All Regions

| Region | URL | Location |
| --- | --- | --- |
| aws-ap-southeast-2 | https://aws-ap-southeast-2.turbopuffer.com | Sydney, Australia |
| aws-ca-central-1 | https://aws-ca-central-1.turbopuffer.com | Montreal, Canada |
| aws-eu-central-1 | https://aws-eu-central-1.turbopuffer.com | Frankfurt, Germany |
| aws-eu-west-1 | https://aws-eu-west-1.turbopuffer.com | Dublin, Ireland |
| aws-eu-west-2 | https://aws-eu-west-2.turbopuffer.com | London, UK |
| aws-us-east-1 | https://aws-us-east-1.turbopuffer.com | N. Virginia, US |
| aws-us-east-2 | https://aws-us-east-2.turbopuffer.com | Ohio, US |
| aws-us-west-2 | https://aws-us-west-2.turbopuffer.com | Oregon, US |
| aws-ap-south-1 | https://aws-ap-south-1.turbopuffer.com | Mumbai, India |
| aws-sa-east-1 | https://aws-sa-east-1.turbopuffer.com | São Paulo, Brazil |
| gcp-us-central1 | https://gcp-us-central1.turbopuffer.com | Iowa, US |
| gcp-us-east1 | https://gcp-us-east1.turbopuffer.com | South Carolina, US |
| gcp-us-west1 | https://gcp-us-west1.turbopuffer.com | Oregon, US |
| gcp-us-east4 | https://gcp-us-east4.turbopuffer.com | N. Virginia, US |
| gcp-northamerica-northeast2 | https://gcp-northamerica-northeast2.turbopuffer.com | Toronto, Canada |
| gcp-europe-west3 | https://gcp-europe-west3.turbopuffer.com | Frankfurt, Germany |
| gcp-europe-west1 | https://gcp-europe-west1.turbopuffer.com | St. Ghislain, Belgium |
| gcp-asia-southeast1 | https://gcp-asia-southeast1.turbopuffer.com | Jurong West, Singapore |
| gcp-asia-northeast3 | https://gcp-asia-northeast3.turbopuffer.com | Seoul, South Korea |


---

This page: [/docs/regions.md](https://turbopuffer.com/docs/regions.md)

All documentation pages: [/llms.txt](https://turbopuffer.com/llms.txt)

All documentation in one file: [/llms-full.txt](https://turbopuffer.com/llms-full.txt)
