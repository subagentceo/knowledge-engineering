# Ingestion

data={ingestionByLanguage} unit="MB/s" />
</SidebarWidget>

turbopuffer's ingestion layer is heavily optimized for throughput and can achieve over 150 MB/s. This guide presents several strategies for eliminating bottlenecks in your ingestion pipeline to achieve maximum throughput.

### Ingestion vs. indexing

```
                              ╔═ turbopuffer ════════════════════════════╗
   ╔════════╗    ingestion    ║      ┏━━━━━━━━━┓  indexing   ┏━━━━━━━━━┓ ║
   ║ client ║─────────────────╫─▶LB─▶┃   WAL   ┃────────────▶┃  index  ┃ ║
   ╚════════╝   synchronous   ║      ┗━━━━━━━━━┛   async     ┗━━━━━━━━━┛ ║
                              ╚══════════════════════════════════════════╝
```

Two distinct things happen when you write to turbopuffer:

1. **Ingestion** is a synchronous process driven by the client: a write request appends rows to the namespace's [write-ahead log (WAL)](/docs/architecture) on object storage and returns once the commit is durable. The write is immediately visible to queries.

2. **Indexing** is the asynchronous process that turbopuffer drives in the background: an indexer reads from the WAL and indexes new documents into data structures optimized for search queries. If indexing falls behind ingestion by more than 2 GB, writes will be rejected (HTTP 429) until indexing catches up unless you [disable backpressure](#2-disable-backpressure). We are always working to increase indexing throughput. [Contact us](/contact/support) if indexing is too slow for your workload.

Whereas optimizing indexing throughput is generally in turbopuffer's control, optimizing ingestion throughput is generally in your control. The strategies in this guide will help you increase ingestion throughput.

### 1. Batch your writes

To minimize the number of roundtrips across the network between your client and the backend, group your writes into batches. Each batch can be up to 512 MB. As a bonus, batching your writes also [lowers your cost by up to 50%](/pricing#faq-write-billing).

### 2. Disable backpressure

If your application can tolerate eventually consistent queries, consider setting [`disable_backpressure`](/docs/write#param-disable_backpressure) to `True`. This will prevent the backend from rejecting writes when the 2 GB WAL [limit](/docs/limits) is reached. When the WAL limit is exceeded, eventual consistency queries are still accepted, but strongly consistent queries are rejected with HTTP 429.

<!-- multilang -->
```bash
# Write with backpressure disabled
curl https://gcp-us-central1.turbopuffer.com/v2/namespaces/disable-backpressure-example-curl \
  -X POST --fail-with-body \
  -H "Authorization: Bearer $TURBOPUFFER_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{
   "upsert_rows": [
     {"id": 1, "vector": [0.1, 0.1]}
   ],
   "distance_metric": "cosine_distance",
   "disable_backpressure": true
 }'

# Query with eventual consistency
curl https://gcp-us-central1.turbopuffer.com/v2/namespaces/disable-backpressure-example-curl/query \
  -X POST --fail-with-body \
  -H "Authorization: Bearer $TURBOPUFFER_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{
   "rank_by": [
     "vector",
     "ANN",
     [0.1, 0.1]
   ],
   "limit": 10,
   "consistency": {"level": "eventual"}
 }'
```
```python
ns = tpuf.namespace(f'disable-backpressure-example-py')

# Write with backpressure disabled
ns.write(
    upsert_rows=[
        {'id': 1, 'vector': [0.1, 0.1]},
    ],
    distance_metric='cosine_distance',
    disable_backpressure=True,
)

# Query with eventual consistency
ns.query(
    rank_by=('vector', 'ANN', [0.1, 0.1]),
    limit=10,
    consistency={'level': 'eventual'},
)
```
```typescript
const ns = tpuf.namespace(`disable-backpressure-example-ts`);

// Write with backpressure disabled
await ns.write({
  upsert_rows: [
    { id: 1, vector: [0.1, 0.1] },
  ],
  distance_metric: "cosine_distance",
  disable_backpressure: true,
});

// Query with eventual consistency
await ns.query({
  rank_by: ["vector", "ANN", [0.1, 0.1]],
  limit: 10,
  consistency: { level: "eventual" },
});
```
```go
	ns := tpuf.Namespace("disable-backpressure-example-go")

	_, err := ns.Write(
		ctx,
		turbopuffer.NamespaceWriteParams{
			UpsertRows: []turbopuffer.RowParam{
				{
					"id":     1,
					"vector": []float32{0.1, 0.1},
				},
			},
			DistanceMetric:      turbopuffer.DistanceMetricCosineDistance,
			DisableBackpressure: turbopuffer.Bool(true),
		},
	)
	if err != nil {
		panic(err)
	}

	_, err = ns.Query(
		ctx,
		turbopuffer.NamespaceQueryParams{
			RankBy: turbopuffer.NewRankByAnn("vector", []float32{0.1, 0.1}),
			Limit: turbopuffer.LimitParam{
				Total: 10,
			},
			Consistency: turbopuffer.NamespaceQueryParamsConsistency{
				Level: "eventual",
			},
		},
	)
	if err != nil {
		panic(err)
	}
}
```
```java
    var ns = tpuf.namespace("disable-backpressure-example-java");

    // Write with backpressure disabled
    ns.write(
      NamespaceWriteParams.builder()
        .addUpsertRow(Row.builder().put("id", 1).put("vector", List.of(0.1f, 0.1f)).build())
        .distanceMetric(DistanceMetric.COSINE_DISTANCE)
        .disableBackpressure(true)
        .build()
    );

    // Query with eventual consistency
    ns.query(
      NamespaceQueryParams.builder()
        .rankBy(RankBy.ann("vector", List.of(0.1f, 0.1f)))
        .limit(10)
        .consistency(
          NamespaceQueryParams.Consistency.builder()
            .level(NamespaceQueryParams.Consistency.Level.EVENTUAL)
            .build()
        )
        .build()
    );
  }
}
```
```cs
var ns = tpuf.Namespace("disable-backpressure-example-csharp");

// Write with backpressure disabled
await ns.Write(
    new NamespaceWriteParams
    {
        UpsertRows = [new Row().Set("id", 1).Set("vector", new[] { 0.1f, 0.1f })],
        DistanceMetric = DistanceMetric.CosineDistance,
        DisableBackpressure = true,
    }
);

// Query with eventual consistency
await ns.Query(
    new NamespaceQueryParams
    {
        RankBy = RankBy.Ann("vector", new[] { 0.1f, 0.1f }),
        Limit = 10,
        Consistency = new NamespaceQueryParamsConsistency
        {
            Level = NamespaceQueryParamsConsistencyLevel.Eventual,
        },
    }
);
```
```ruby
ns = tpuf.namespace("disable-backpressure-example-rb")

# Write with backpressure disabled
ns.write(
  upsert_rows: [
    { id: 1, vector: [0.1, 0.1] },
  ],
  distance_metric: "cosine_distance",
  disable_backpressure: true,
)

# Query with eventual consistency
ns.query(
  rank_by: ["vector", "ANN", [0.1, 0.1]],
  limit: 10,
  consistency: { level: "eventual" },
)
```
<!-- /multilang -->

If your application requires strongly consistent queries, this approach can still be used during the initial ingestion into turbopuffer before turbopuffer is serving queries. For example:

  1. Backfill data in a namespace using `disable_backpressure=True`
  2. Begin serving production traffic with strong consistency
  3. Send future updates using `disable_backpressure=False`

As a side effect, letting the unindexed WAL grow larger also lets the indexer work on bigger batches at once, which can increase indexing throughput.

Note that you cannot use `disable_backpressure` with `patch_rows`, `patch_columns`, and conditional writes, as these rely on strongly consistent queries.

### 3. Concurrent, not sequential

Don't let your process sit idle waiting for API requests to return. A single object storage roundtrip has a p50 of 165ms for a 500 kB batch, so waiting for one request to return before issuing the next is capped at single-digit writes per second.

```
Sequential

┃━━ req1 ━━┫┃━━ req2 ━━┫┃━━ req3 ━━┫┃━━ req4 ━━┫  ≈ 3 writes/s

Concurrent

┃━━ req1 ━━┫
 ┃━━ req2 ━━┫
  ┃━━ req3 ━━┫
   ┃━━ req4 ━━┫
    ┃━━ req5 ━━┫
     ┃━━ req6 ━━┫
      ...
```

Limiting concurrency to 2 · N<sub>CPUs</sub> is a good rule of thumb, but don't be afraid to benchmark to find the optimal concurrency for your setup.

### 4. Use more CPUs

Client-side serialization can be a bottleneck with large batches, especially in interpreted languages like Python and TypeScript. You can determine this by looking at the per-thread CPU usage of your ingestion pipeline.

If you see one or more threads with high CPU usage, parallelize the work across more CPUs, using whatever primitive your runtime provides. This may require spawning additional processes or containers, or provisioning larger machines. Note that threading in some languages like Ruby/JS/Python won't help here, as threads in these languages aren't multi-core by default.

### 5. Use a bigger box

If your ingestion process is CPU-bound, the simplest fix is often to run it on a larger machine. More cores let you run more concurrent writers (see [concurrent writes](#3-concurrent-not-sequential)), and faster cores speed up batch serialization. More memory also helps when building large batches in memory before sending them.

For a one-time backfill, consider spinning up a large instance in the same cloud region as your turbopuffer [region](/docs/regions), running the ingest, and tearing it down when done.

### 6. Optimize your schema and index design

Careful schema design can improve ingestion and indexing performance by ensuring you only ingest necessary data and avoid building search indexes for attributes you will not search. A few schema tips to speed up throughput:

- Mark large attributes as `filterable: false` to avoid building an attribute index
- Use the smallest vector precision that still provides acceptable recall
- Whenever possible, use UUIDs as IDs for your documents 

Additionally, consider separating ANN and BM25 index namespaces. If indexing performance suffers on a namespace with both ANN and BM25 indexes, we recommend splitting these indexes into separate namespaces to improve throughput. We're actively working on improving performance for combined ANN and BM25 namespaces, and this temporary workaround will be unnecessary soon.

See our [Performance guide](/docs/performance) for more optimization strategies.

### Examples

Below are code snippets that optimize ingestion throughput by implementing these strategies with our Python and Go client SDKs. The comments in each snippet describe language-specific details.

<!-- multilang -->
```python
# $ pip install turbopuffer
import asyncio
import math
import multiprocessing
import os
import random
import time
from typing import Any, List, Tuple

import turbopuffer

MAX_DOCUMENTS = 16384  # 16,384
BATCH_SIZE = 4096  # 4,096
PROCESS_COUNT: int = os.cpu_count() or 1 # set this according to machine specs using os.cpu_count() or similar
VECTOR_DIM = 1024

DOCS_PER_PROCESS = MAX_DOCUMENTS // PROCESS_COUNT

async def write_rows(batch_num: int, ns: Any, data: List[Any]) -> None:
    rows = data[batch_num*BATCH_SIZE:(batch_num+1)*BATCH_SIZE]
    await ns.write(
        upsert_rows=rows,
        distance_metric='cosine_distance',
        # use lower precision vectors when possible
        schema={
            'vector': {'type': '[1024]f16', 'ann': True},
        },
        # set disable backpressure to avoid hitting limits when 2GB WAL limit
        # is reached
        disable_backpressure=True,
    )

async def process_items(ns: Any, data: List[Any]) -> None:
    num_batches = math.ceil(len(data) / BATCH_SIZE)
    await asyncio.gather(*[
        write_rows(batch_num, ns, data)
        for batch_num in range(num_batches)
    ])

async def async_worker(data: List[Any]) -> None:
    # to avoid blocking the CPU while waiting for backend to respond
    # use the async API to write data
    print(f"[Process {os.getpid()}] initialised")
    async with turbopuffer.AsyncTurbopuffer(
        api_key=os.getenv('TURBOPUFFER_API_KEY'),
        region="gcp-us-central1", # pick the region closest to where you run your ingestion process
    ) as tpuf:
        start_time = time.perf_counter()
        ns = tpuf.namespace(f'async-vector-multiprocessing-ingest-1024')
        await process_items(ns, data)
        elapsed = time.perf_counter() - start_time
    print(f"[Process {os.getpid()}] Finished in {elapsed:.2f} seconds")

def worker(args: Tuple[int, int]) -> None:
    id_start, id_end = args
    print(f"[Process {os.getpid()}] generating {id_end - id_start} vectors")
    # to avoid the overhead of copying data between parent and child processes
    # generate and/or read vectors in the child process
    data = [{'id': block_id, 'vector': [random.gauss(0, 1) for _ in range(VECTOR_DIM)]} for block_id in range(id_start, id_end)]
    try:
        asyncio.run(async_worker(data))
    except Exception as e:
        raise RuntimeError(f"[Process {os.getpid()}] failed: {type(e).__name__}: {e}") from None

if __name__ == '__main__':
    # total number of documents might yield a remainder when divided by process_count
    # to make sure last process captures remaining documents
    chunks = [(i * DOCS_PER_PROCESS, MAX_DOCUMENTS if i == PROCESS_COUNT - 1 else (i + 1) * DOCS_PER_PROCESS) for i in range(PROCESS_COUNT)]

    with multiprocessing.Pool(PROCESS_COUNT) as pool:
        pool.map(worker, chunks)
```
```go
package main

import (
	"context"
	"fmt"
	"math/rand"
	"os"
	"runtime"
	"sync"
	"time"

	"github.com/turbopuffer/turbopuffer-go/v2"
	"github.com/turbopuffer/turbopuffer-go/v2/option"
	"github.com/turbopuffer/turbopuffer-go/v2/packages/param"
)

const (
	maxDocuments = 16_384
	// Batch your writes: group rows into batches up to 512 MB
	batchSize = 4_096
	vectorDim = 1024
)

func loadData() []turbopuffer.RowParam {
    // Randomly generate some data.
    // Replace with code to load your actual data.
	rows := make([]turbopuffer.RowParam, maxDocuments)
	for i := range rows {
		vec := make([]float32, vectorDim)
		for j := range vec {
			vec[j] = rand.Float32()
		}
		rows[i] = turbopuffer.RowParam{
			"id":     i,
			"vector": vec,
		}
	}
	return rows
}

func writeBatch(ctx context.Context, ns turbopuffer.Namespace, batch []turbopuffer.RowParam) error {
	_, err := ns.Write(ctx, turbopuffer.NamespaceWriteParams{
		UpsertRows:     batch,
		DistanceMetric: turbopuffer.DistanceMetricCosineDistance,
		// Use lower precision vectors when possible
		Schema: map[string]turbopuffer.AttributeSchemaConfigParam{
			"vector": {Type: "[1024]f16", Ann: param.Override[turbopuffer.AttributeSchemaConfigAnnParam](true)},
		},
		// Disable backpressure: disable 2 GiB unindexed WAL cap for bulk ingestion
		DisableBackpressure: turbopuffer.Bool(true),
	})
	return err
}

func main() {
	ctx := context.Background()
	tpuf := turbopuffer.NewClient(
		option.WithAPIKey(os.Getenv("TURBOPUFFER_API_KEY")),
		option.WithRegion("gcp-us-central1"),
	)

	ns := tpuf.Namespace("async-vector-ingest-test-go")

	allVectors := loadData()

	start := time.Now()

	// Write batches in parallel: up to NCPUs * 2 batches.
	var wg sync.WaitGroup
	sem := make(chan struct{}, 2*runtime.NumCPU())
	for i := 0; i < len(allVectors); i += batchSize {
		batch := allVectors[i:min(i+batchSize, len(allVectors))]
		sem <- struct{}{} // acquire slot
		wg.Add(1)
		go func(batch []turbopuffer.RowParam) {
			defer wg.Done()
			defer func() { <-sem }() // release slot
			if err := writeBatch(ctx, ns, batch); err != nil {
				panic(err)
			}
		}(batch)
	}
	wg.Wait()

	fmt.Printf("Total time: %.2f seconds\n", time.Since(start).Seconds())
}
```
<!-- /multilang -->


---

This page: [/docs/ingestion.md](https://turbopuffer.com/docs/ingestion.md)

All documentation pages: [/llms.txt](https://turbopuffer.com/llms.txt)

All documentation in one file: [/llms-full.txt](https://turbopuffer.com/llms-full.txt)
