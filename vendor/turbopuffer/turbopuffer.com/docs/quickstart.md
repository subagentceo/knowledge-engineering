# Quickstart Guide

**100B Vector Search**
- p50: 46ms
- p90: 61ms
- p99: 185ms

**Vector Query** (768 dimensions, f16, 10M docs, ~15GB. Strongly consistent.)
- warm (10M docs): p50=14ms, p90=17ms, p99=27ms
- cold (10M docs): p50=874ms, p90=1214ms, p99=1686ms

**Upsert** (Time for the batch to be durably acknowledged by object storage. Documents are immediately available to consistent reads after this.)
- Upsert latency (512kb docs): p50=165ms, p90=248ms, p99=850ms

Walk a tiny namespace through the core loop: connect, write rows with vectors
and attributes, query them, simple aggregations, then layer on conditional
writes and branching.

If you are an agent, you may wish to [read the full documentation in
Markdown](/llms-full.txt).

## Connect

1. Install an SDK:

   <!-- multilang -->
     
     
     
     
     
     
   <!-- /multilang -->

2. Create an [API key](https://turbopuffer.com/dashboard) from the Dashboard.
   The snippets default to [`gcp-us-central1`](/docs/regions); change it to
   your preferred region if needed.
3. Choose an embedding provider.
   Pick from the dropdown in the code sample below, or use random vectors to
   start (don't use in production or for benchmarking).

<!-- multilang -->
```bash
# Later steps use curl to call the turbopuffer HTTP API (usually preinstalled).
# Set your API key and a fresh namespace for this run.
api_key="${TURBOPUFFER_API_KEY:-your-api-key}" # created here: https://turbopuffer.com/dashboard
TPUF_URL="https://gcp-us-central1.turbopuffer.com" # choose best region: https://turbopuffer.com/docs/regions
TPUF_NAMESPACE="${TPUF_NAMESPACE:-quickstart-$(date +%s)-$$}"
TPUF_BRANCH_NAMESPACE="${TPUF_BRANCH_NAMESPACE:-$TPUF_NAMESPACE-branch}"
```
```python
import os
import uuid
import random
from typing import List
import turbopuffer

tpuf = turbopuffer.Turbopuffer(
    api_key=os.getenv("TURBOPUFFER_API_KEY"), # created here: https://turbopuffer.com/dashboard
    region="gcp-us-central1", # choose best region: https://turbopuffer.com/docs/regions
)
namespace = os.getenv("TURBOPUFFER_NAMESPACE", f"quickstart-{uuid.uuid4().hex[:8]}")
ns = tpuf.namespace(namespace)

def embed(_text: str) -> List[float]:
    return [random.random(), random.random()]
```
```python
# $ pip install turbopuffer sentence-transformers
import os
import uuid
from typing import List
import turbopuffer
from sentence_transformers import SentenceTransformer

tpuf = turbopuffer.Turbopuffer(
    api_key=os.getenv("TURBOPUFFER_API_KEY"), # created here: https://turbopuffer.com/dashboard
    region="gcp-us-central1", # choose best region: https://turbopuffer.com/docs/regions
)
namespace = os.getenv("TURBOPUFFER_NAMESPACE", f"quickstart-{uuid.uuid4().hex[:8]}")
ns = tpuf.namespace(namespace)

# Local embeddings with BGE — no API key needed.
# Model is downloaded on first run (~130 MB).
bge = SentenceTransformer("BAAI/bge-small-en-v1.5")

def embed(text: str) -> List[float]:
    return bge.encode(text).tolist()
```
```python
# $ pip install turbopuffer cohere
import os
import uuid
from typing import List
import turbopuffer
from cohere import ClientV2

tpuf = turbopuffer.Turbopuffer(
    api_key=os.getenv("TURBOPUFFER_API_KEY"), # created here: https://turbopuffer.com/dashboard
    region="gcp-us-central1", # choose best region: https://turbopuffer.com/docs/regions
)
namespace = os.getenv("TURBOPUFFER_NAMESPACE", f"quickstart-{uuid.uuid4().hex[:8]}")
ns = tpuf.namespace(namespace)
cohere = ClientV2(api_key=os.environ["COHERE_API_KEY"])

def embed(text: str) -> List[float]:
    return cohere.embed(
        model="embed-v4.0",
        input_type="search_document",
        texts=[text],
        embedding_types=["float"],
    ).embeddings.float[0]
```
```python
# $ pip install turbopuffer google-genai
import os
import uuid
from typing import List
import turbopuffer
from google.genai import Client
from google.genai.types import EmbedContentConfig

tpuf = turbopuffer.Turbopuffer(
    api_key=os.getenv("TURBOPUFFER_API_KEY"), # created here: https://turbopuffer.com/dashboard
    region="gcp-us-central1", # choose best region: https://turbopuffer.com/docs/regions
)
namespace = os.getenv("TURBOPUFFER_NAMESPACE", f"quickstart-{uuid.uuid4().hex[:8]}")
ns = tpuf.namespace(namespace)
gemini = Client(api_key=os.environ["GEMINI_API_KEY"])

def embed(text: str) -> List[float]:
    return gemini.models.embed_content(
        model="gemini-embedding-001",
        contents=text,
        config=EmbedContentConfig(task_type="RETRIEVAL_DOCUMENT"),
    ).embeddings[0].values
```
```python
# $ pip install turbopuffer openai
import os
import uuid
from typing import List
import turbopuffer
from openai import OpenAI

tpuf = turbopuffer.Turbopuffer(
    api_key=os.getenv("TURBOPUFFER_API_KEY"), # created here: https://turbopuffer.com/dashboard
    region="gcp-us-central1", # choose best region: https://turbopuffer.com/docs/regions
)
namespace = os.getenv("TURBOPUFFER_NAMESPACE", f"quickstart-{uuid.uuid4().hex[:8]}")
ns = tpuf.namespace(namespace)
fireworks = OpenAI(
    api_key=os.environ["FIREWORKS_API_KEY"],
    base_url="https://api.fireworks.ai/inference/v1",
)

def embed(text: str) -> List[float]:
    return fireworks.embeddings.create(
        model="fireworks/qwen3-embedding-8b",
        input=text,
    ).data[0].embedding
```
```python
# $ pip install turbopuffer voyageai
import os
import uuid
from typing import List
import turbopuffer
import voyageai

tpuf = turbopuffer.Turbopuffer(
    api_key=os.getenv("TURBOPUFFER_API_KEY"), # created here: https://turbopuffer.com/dashboard
    region="gcp-us-central1", # choose best region: https://turbopuffer.com/docs/regions
)
namespace = os.getenv("TURBOPUFFER_NAMESPACE", f"quickstart-{uuid.uuid4().hex[:8]}")
ns = tpuf.namespace(namespace)
voyage = voyageai.Client(api_key=os.environ["VOYAGE_API_KEY"])

def embed(text: str) -> List[float]:
    return voyage.embed(
        [text], model="voyage-4-lite"
    ).embeddings[0]
```
```typescript
import { Turbopuffer } from "@turbopuffer/turbopuffer";

const tpuf = new Turbopuffer({
  apiKey: process.env.TURBOPUFFER_API_KEY, // created here: https://turbopuffer.com/dashboard
  region: "gcp-us-central1", // choose best region: https://turbopuffer.com/docs/regions
});
const namespace = process.env.TURBOPUFFER_NAMESPACE ?? `quickstart-${Math.random().toString(36).slice(2, 10)}`;
const ns = tpuf.namespace(namespace);

function embed(_text: string): number[] {
  return [Math.random(), Math.random()];
}
```
```typescript
// $ npm install @turbopuffer/turbopuffer cohere-ai
import { Turbopuffer } from "@turbopuffer/turbopuffer";
import { CohereClient } from "cohere-ai";

const tpuf = new Turbopuffer({
  apiKey: process.env.TURBOPUFFER_API_KEY, // created here: https://turbopuffer.com/dashboard
  region: "gcp-us-central1", // choose best region: https://turbopuffer.com/docs/regions
});
const namespace = process.env.TURBOPUFFER_NAMESPACE ?? `quickstart-${Math.random().toString(36).slice(2, 10)}`;
const ns = tpuf.namespace(namespace);
const cohere = new CohereClient({ token: process.env.COHERE_API_KEY });

async function embed(text: string): Promise<number[]> {
  return (await cohere.v2.embed({
    model: "embed-v4.0",
    inputType: "search_document",
    texts: [text],
    embeddingTypes: ["float"],
  })).embeddings.float![0];
}
```
```typescript
// $ npm install @turbopuffer/turbopuffer @google/genai
import { Turbopuffer } from "@turbopuffer/turbopuffer";
import { GoogleGenAI } from "@google/genai";

const tpuf = new Turbopuffer({
  apiKey: process.env.TURBOPUFFER_API_KEY, // created here: https://turbopuffer.com/dashboard
  region: "gcp-us-central1", // choose best region: https://turbopuffer.com/docs/regions
});
const namespace = process.env.TURBOPUFFER_NAMESPACE ?? `quickstart-${Math.random().toString(36).slice(2, 10)}`;
const ns = tpuf.namespace(namespace);
const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function embed(text: string): Promise<number[]> {
  return (
    await gemini.models.embedContent({
      model: "gemini-embedding-001",
      contents: text,
      config: { taskType: "RETRIEVAL_DOCUMENT" },
    })
  ).embeddings![0].values!;
}
```
```typescript
// $ npm install @turbopuffer/turbopuffer openai
import { Turbopuffer } from "@turbopuffer/turbopuffer";
import OpenAI from "openai";

const tpuf = new Turbopuffer({
  apiKey: process.env.TURBOPUFFER_API_KEY, // created here: https://turbopuffer.com/dashboard
  region: "gcp-us-central1", // choose best region: https://turbopuffer.com/docs/regions
});
const namespace = process.env.TURBOPUFFER_NAMESPACE ?? `quickstart-${Math.random().toString(36).slice(2, 10)}`;
const ns = tpuf.namespace(namespace);
const fireworks = new OpenAI({
  apiKey: process.env.FIREWORKS_API_KEY,
  baseURL: "https://api.fireworks.ai/inference/v1",
});

async function embed(text: string): Promise<number[]> {
  return (
    await fireworks.embeddings.create({
      model: "fireworks/qwen3-embedding-8b",
      input: text,
      encoding_format: "float",
    })
  ).data[0].embedding;
}
```
```typescript
// $ npm install @turbopuffer/turbopuffer voyageai
import { Turbopuffer } from "@turbopuffer/turbopuffer";
import { VoyageAIClient } from "voyageai";

const tpuf = new Turbopuffer({
  apiKey: process.env.TURBOPUFFER_API_KEY, // created here: https://turbopuffer.com/dashboard
  region: "gcp-us-central1", // choose best region: https://turbopuffer.com/docs/regions
});
const namespace = process.env.TURBOPUFFER_NAMESPACE ?? `quickstart-${Math.random().toString(36).slice(2, 10)}`;
const ns = tpuf.namespace(namespace);
const voyage = new VoyageAIClient({
  apiKey: process.env.VOYAGE_API_KEY,
});

async function embed(text: string): Promise<number[]> {
  return (await voyage.embed({
    input: text,
    model: "voyage-4-lite",
  })).data[0].embedding;
}
```
```go
package main

import (
	"context"
	"fmt"
	"math/rand"
	"os"
	"time"

	"github.com/turbopuffer/turbopuffer-go/v2"
	"github.com/turbopuffer/turbopuffer-go/v2/option"
)

func embed(_ context.Context, _ string) []float32 {
	return []float32{rand.Float32(), rand.Float32()}
}

func main() {
	ctx := context.Background()
	tpuf := turbopuffer.NewClient(
		option.WithAPIKey(os.Getenv("TURBOPUFFER_API_KEY")), // created here: https://turbopuffer.com/dashboard
		option.WithRegion("gcp-us-central1"), // choose best region: https://turbopuffer.com/docs/regions
	)
	namespace := os.Getenv("TURBOPUFFER_NAMESPACE")
	if namespace == "" {
		namespace = fmt.Sprintf("quickstart-%d", time.Now().UnixNano())
	}
	ns := tpuf.Namespace(namespace)
```
```go
// $ go get github.com/turbopuffer/turbopuffer-go github.com/cohere-ai/cohere-go/v2
package main

import (
	"context"
	"fmt"
	"os"
	"time"

	cohere "github.com/cohere-ai/cohere-go/v2"
	cohereclient "github.com/cohere-ai/cohere-go/v2/client"
	"github.com/turbopuffer/turbopuffer-go"
	"github.com/turbopuffer/turbopuffer-go/option"
)

func embed(ctx context.Context, text string) []float32 {
	resp, err := cohereclient.NewClient(
		cohereclient.WithToken(os.Getenv("COHERE_API_KEY")),
	).V2.Embed(ctx, &cohere.V2EmbedRequest{
		Model:          "embed-v4.0",
		InputType:      cohere.EmbedInputTypeSearchDocument,
		Texts:          []string{text},
		EmbeddingTypes: []cohere.EmbeddingType{cohere.EmbeddingTypeFloat},
	})
	if err != nil {
		panic(err)
	}
	return toFloat32Slice(resp.GetEmbeddings().GetFloat()[0])
}

func toFloat32Slice(values []float64) []float32 {
	out := make([]float32, len(values))
	for i, v := range values {
		out[i] = float32(v)
	}
	return out
}

func main() {
	ctx := context.Background()
	tpuf := turbopuffer.NewClient(
		option.WithAPIKey(os.Getenv("TURBOPUFFER_API_KEY")), // created here: https://turbopuffer.com/dashboard
		option.WithRegion("gcp-us-central1"), // choose best region: https://turbopuffer.com/docs/regions
	)
	namespace := os.Getenv("TURBOPUFFER_NAMESPACE")
	if namespace == "" {
		namespace = fmt.Sprintf("quickstart-%d", time.Now().UnixNano())
	}
	ns := tpuf.Namespace(namespace)
```
```go
// $ go get github.com/turbopuffer/turbopuffer-go google.golang.org/genai
package main

import (
	"context"
	"fmt"
	"os"
	"time"

	"github.com/turbopuffer/turbopuffer-go"
	"github.com/turbopuffer/turbopuffer-go/option"
	"google.golang.org/genai"
)

func embed(ctx context.Context, text string) []float32 {
	client, err := genai.NewClient(ctx, &genai.ClientConfig{
		APIKey:  os.Getenv("GEMINI_API_KEY"),
		Backend: genai.BackendGeminiAPI,
	})
	if err != nil {
		panic(err)
	}
	defer client.Close()
	resp, err := client.Models.EmbedContent(
		ctx, "gemini-embedding-001",
		[]*genai.Content{genai.NewContentFromText(text, genai.RoleUser)},
		&genai.EmbedContentRequest{TaskType: genai.TaskTypeRetrievalDocument},
	)
	if err != nil {
		panic(err)
	}
	return resp.Embeddings[0].Values
}

func main() {
	ctx := context.Background()
	tpuf := turbopuffer.NewClient(
		option.WithAPIKey(os.Getenv("TURBOPUFFER_API_KEY")), // created here: https://turbopuffer.com/dashboard
		option.WithRegion("gcp-us-central1"), // choose best region: https://turbopuffer.com/docs/regions
	)
	namespace := os.Getenv("TURBOPUFFER_NAMESPACE")
	if namespace == "" {
		namespace = fmt.Sprintf("quickstart-%d", time.Now().UnixNano())
	}
	ns := tpuf.Namespace(namespace)
```
```go
// $ go get github.com/turbopuffer/turbopuffer-go github.com/openai/openai-go
package main

import (
	"context"
	"fmt"
	"os"
	"time"

	"github.com/openai/openai-go"
	openaioption "github.com/openai/openai-go/option"
	"github.com/turbopuffer/turbopuffer-go"
	tpufoption "github.com/turbopuffer/turbopuffer-go/option"
)

func embed(ctx context.Context, text string) []float32 {
	resp, err := openai.NewClient(
		openaioption.WithAPIKey(os.Getenv("FIREWORKS_API_KEY")),
		openaioption.WithBaseURL("https://api.fireworks.ai/inference/v1"),
	).Embeddings.New(ctx, openai.EmbeddingNewParams{
		Input: openai.EmbeddingNewParamsInputUnion{OfString: openai.String(text)},
		Model: openai.EmbeddingModel("fireworks/qwen3-embedding-8b"),
	})
	if err != nil {
		panic(err)
	}
	return toFloat32Slice(resp.Data[0].Embedding)
}

func toFloat32Slice(values []float64) []float32 {
	out := make([]float32, len(values))
	for i, v := range values {
		out[i] = float32(v)
	}
	return out
}

func main() {
	ctx := context.Background()
	tpuf := turbopuffer.NewClient(
		tpufoption.WithAPIKey(os.Getenv("TURBOPUFFER_API_KEY")), // created here: https://turbopuffer.com/dashboard
		tpufoption.WithRegion("gcp-us-central1"), // choose best region: https://turbopuffer.com/docs/regions
	)
	namespace := os.Getenv("TURBOPUFFER_NAMESPACE")
	if namespace == "" {
		namespace = fmt.Sprintf("quickstart-%d", time.Now().UnixNano())
	}
	ns := tpuf.Namespace(namespace)
```
```go
// $ go get github.com/turbopuffer/turbopuffer-go github.com/openai/openai-go
package main

import (
	"context"
	"fmt"
	"os"
	"time"

	"github.com/openai/openai-go"
	openaioption "github.com/openai/openai-go/option"
	"github.com/turbopuffer/turbopuffer-go"
	tpufoption "github.com/turbopuffer/turbopuffer-go/option"
)

func embed(ctx context.Context, text string) []float32 {
	resp, err := openai.NewClient(
		openaioption.WithAPIKey(os.Getenv("VOYAGE_API_KEY")),
		openaioption.WithBaseURL("https://api.voyageai.com/v1"),
	).Embeddings.New(ctx, openai.EmbeddingNewParams{
		Input: openai.EmbeddingNewParamsInputUnion{OfString: openai.String(text)},
		Model: openai.EmbeddingModel("voyage-4-lite"),
	})
	if err != nil {
		panic(err)
	}
	return toFloat32Slice(resp.Data[0].Embedding)
}

func toFloat32Slice(values []float64) []float32 {
	out := make([]float32, len(values))
	for i, v := range values {
		out[i] = float32(v)
	}
	return out
}

func main() {
	ctx := context.Background()
	tpuf := turbopuffer.NewClient(
		tpufoption.WithAPIKey(os.Getenv("TURBOPUFFER_API_KEY")), // created here: https://turbopuffer.com/dashboard
		tpufoption.WithRegion("gcp-us-central1"), // choose best region: https://turbopuffer.com/docs/regions
	)
	namespace := os.Getenv("TURBOPUFFER_NAMESPACE")
	if namespace == "" {
		namespace = fmt.Sprintf("quickstart-%d", time.Now().UnixNano())
	}
	ns := tpuf.Namespace(namespace)
```
```java
package com.turbopuffer.docs;

import com.turbopuffer.client.okhttp.*;
import com.turbopuffer.models.namespaces.*;
import java.util.*;

public class DefaultConnect {

  public static void main(String[] args) {
    var tpuf = TurbopufferOkHttpClient.builder()
      .fromEnv()
      .apiKey(System.getenv("TURBOPUFFER_API_KEY")) // created here: https://turbopuffer.com/dashboard
      .region("gcp-us-central1") // choose best region: https://turbopuffer.com/docs/regions
      .build();

    var namespace = Optional.ofNullable(System.getenv("TURBOPUFFER_NAMESPACE")).orElse(
      "quickstart-" + UUID.randomUUID().toString().substring(0, 8)
    );
    var ns = tpuf.namespace(namespace);
  }

  public static List<Float> embed(String text) {
    Random rand = new Random();
    return List.of(rand.nextFloat(), rand.nextFloat());
  }
}
```
```java
// Gradle: implementation("com.turbopuffer:turbopuffer-java:+"), implementation("com.cohere:cohere-java:+")
package com.turbopuffer.docs;

import com.cohere.api.Cohere;
import com.cohere.api.resources.v2.requests.V2EmbedRequest;
import com.cohere.api.types.EmbedInputType;
import com.turbopuffer.client.okhttp.*;
import com.turbopuffer.models.namespaces.*;
import java.util.*;

public class CohereConnect {

  public static void main(String[] args) {
    var tpuf = TurbopufferOkHttpClient.builder()
      .fromEnv()
      .apiKey(System.getenv("TURBOPUFFER_API_KEY")) // created here: https://turbopuffer.com/dashboard
      .region("gcp-us-central1") // choose best region: https://turbopuffer.com/docs/regions
      .build();

    var namespace = Optional.ofNullable(System.getenv("TURBOPUFFER_NAMESPACE")).orElse(
      "quickstart-" + UUID.randomUUID().toString().substring(0, 8)
    );
    var ns = tpuf.namespace(namespace);
  }

  public static List<Float> embed(String text) {
    var response = Cohere.builder()
      .token(System.getenv("COHERE_API_KEY"))
      .clientName("turbopuffer-quickstart")
      .build()
      .v2()
      .embed(
        V2EmbedRequest.builder()
          .model("embed-v4.0")
          .inputType(EmbedInputType.SEARCH_DOCUMENT)
          .texts(List.of(text))
          .build()
      );
    return response
      .getEmbeddings()
      .getFloat()
      .orElseThrow()
      .get(0)
      .stream()
      .map(Double::floatValue)
      .toList();
  }
}
```
```java
// Gradle: implementation("com.turbopuffer:turbopuffer-java:+"), implementation("com.google.genai:google-genai:+")
package com.turbopuffer.docs;

import com.google.genai.Client;
import com.google.genai.types.EmbedContentConfig;
import com.turbopuffer.client.okhttp.*;
import com.turbopuffer.models.namespaces.*;
import java.util.*;

public class GeminiConnect {

  public static void main(String[] args) {
    var tpuf = TurbopufferOkHttpClient.builder()
      .fromEnv()
      .apiKey(System.getenv("TURBOPUFFER_API_KEY")) // created here: https://turbopuffer.com/dashboard
      .region("gcp-us-central1") // choose best region: https://turbopuffer.com/docs/regions
      .build();

    var namespace = Optional.ofNullable(System.getenv("TURBOPUFFER_NAMESPACE")).orElse(
      "quickstart-" + UUID.randomUUID().toString().substring(0, 8)
    );
    var ns = tpuf.namespace(namespace);
  }

  public static List<Float> embed(String text) {
    try (Client client = Client.builder().apiKey(System.getenv("GEMINI_API_KEY")).build()) {
      return client.models
        .embedContent(
          "gemini-embedding-001",
          text,
          EmbedContentConfig.builder().taskType("RETRIEVAL_DOCUMENT").build()
        )
        .embeddings()
        .orElseThrow()
        .get(0)
        .values()
        .orElseThrow();
    }
  }
}
```
```java
// Gradle: implementation("com.turbopuffer:turbopuffer-java:+"), implementation("com.openai:openai-java:+")
package com.turbopuffer.docs;

import com.openai.client.okhttp.*;
import com.openai.models.embeddings.*;
import com.turbopuffer.client.okhttp.*;
import com.turbopuffer.models.namespaces.*;
import java.util.*;

public class QwenConnect {

  public static void main(String[] args) {
    var tpuf = TurbopufferOkHttpClient.builder()
      .fromEnv()
      .apiKey(System.getenv("TURBOPUFFER_API_KEY")) // created here: https://turbopuffer.com/dashboard
      .region("gcp-us-central1") // choose best region: https://turbopuffer.com/docs/regions
      .build();

    var namespace = Optional.ofNullable(System.getenv("TURBOPUFFER_NAMESPACE")).orElse(
      "quickstart-" + UUID.randomUUID().toString().substring(0, 8)
    );
    var ns = tpuf.namespace(namespace);
  }

  public static List<Float> embed(String text) {
    var client = OpenAIOkHttpClient.builder()
      .apiKey(System.getenv("FIREWORKS_API_KEY"))
      .baseUrl("https://api.fireworks.ai/inference/v1")
      .build();
    return client
      .embeddings()
      .create(
        EmbeddingCreateParams.builder()
          .input(text)
          .model(EmbeddingModel.of("fireworks/qwen3-embedding-8b"))
          .build()
      )
      .data()
      .get(0)
      .embedding();
  }
}
```
```java
// Gradle: implementation("com.turbopuffer:turbopuffer-java:+"), implementation("com.openai:openai-java:+")
package com.turbopuffer.docs;

import com.openai.client.okhttp.*;
import com.openai.models.embeddings.*;
import com.turbopuffer.client.okhttp.*;
import com.turbopuffer.models.namespaces.*;
import java.util.*;

public class VoyageConnect {

  public static void main(String[] args) {
    var tpuf = TurbopufferOkHttpClient.builder()
      .fromEnv()
      .apiKey(System.getenv("TURBOPUFFER_API_KEY")) // created here: https://turbopuffer.com/dashboard
      .region("gcp-us-central1") // choose best region: https://turbopuffer.com/docs/regions
      .build();

    var namespace = Optional.ofNullable(System.getenv("TURBOPUFFER_NAMESPACE")).orElse(
      "quickstart-" + UUID.randomUUID().toString().substring(0, 8)
    );
    var ns = tpuf.namespace(namespace);
  }

  public static List<Float> embed(String text) {
    var client = OpenAIOkHttpClient.builder()
      .apiKey(System.getenv("VOYAGE_API_KEY"))
      .baseUrl("https://api.voyageai.com/v1")
      .build();
    return client
      .embeddings()
      .create(
        EmbeddingCreateParams.builder()
          .input(text)
          .model(EmbeddingModel.of("voyage-4-lite"))
          .build()
      )
      .data()
      .get(0)
      .embedding();
  }
}
```
```cs
// dotnet add package Turbopuffer
using System;
using System.Collections.Generic;
using Turbopuffer;

using var tpuf = new TurbopufferClient
{
    // API tokens are created in the dashboard: https://turbopuffer.com/dashboard
    Region = "gcp-us-central1", // choose best region: https://turbopuffer.com/docs/regions
};

var namespaceName =
    Environment.GetEnvironmentVariable("TURBOPUFFER_NAMESPACE")
    ?? $"quickstart-{Guid.NewGuid().ToString("N").Substring(0, 8)}";
var ns = tpuf.Namespace(namespaceName);

static List<float> Embed(string text) =>
    new() { (float)Random.Shared.NextDouble(), (float)Random.Shared.NextDouble() };
```
```cs
// dotnet add package Turbopuffer
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using Turbopuffer;

using var tpuf = new TurbopufferClient
{
    Region = "gcp-us-central1", // choose best region: https://turbopuffer.com/docs/regions
};

var namespaceName =
    Environment.GetEnvironmentVariable("TURBOPUFFER_NAMESPACE")
    ?? $"quickstart-{Guid.NewGuid().ToString("N").Substring(0, 8)}";
var ns = tpuf.Namespace(namespaceName);

// Create an embedding with Cohere.
// Requires COHERE_API_KEY to be set (https://dashboard.cohere.com/api-keys)
static List<float> Embed(string text)
{
    using var http = new HttpClient();
    var request = new HttpRequestMessage(HttpMethod.Post, "https://api.cohere.com/v2/embed")
    {
        Content = new StringContent(
            JsonSerializer.Serialize(
                new
                {
                    model = "embed-v4.0",
                    input_type = "search_document",
                    texts = new[] { text },
                    embedding_types = new[] { "float" },
                }
            ),
            Encoding.UTF8,
            "application/json"
        ),
    };
    request.Headers.Authorization = new AuthenticationHeaderValue(
        "Bearer",
        Environment.GetEnvironmentVariable("COHERE_API_KEY")
    );
    var response = http.Send(request);
    response.EnsureSuccessStatusCode();
    using var doc = JsonDocument.Parse(response.Content.ReadAsStream());
    return doc
        .RootElement.GetProperty("embeddings")
        .GetProperty("float")[0]
        .EnumerateArray()
        .Select(v => v.GetSingle())
        .ToList();
}
```
```cs
// dotnet add package Turbopuffer
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using Turbopuffer;

using var tpuf = new TurbopufferClient
{
    Region = "gcp-us-central1", // choose best region: https://turbopuffer.com/docs/regions
};

var namespaceName =
    Environment.GetEnvironmentVariable("TURBOPUFFER_NAMESPACE")
    ?? $"quickstart-{Guid.NewGuid().ToString("N").Substring(0, 8)}";
var ns = tpuf.Namespace(namespaceName);

// Create an embedding with Gemini.
// Requires GEMINI_API_KEY to be set (https://aistudio.google.com/app/apikey)
static List<float> Embed(string text)
{
    var apiKey = Environment.GetEnvironmentVariable("GEMINI_API_KEY");
    using var http = new HttpClient();
    var request = new HttpRequestMessage(
        HttpMethod.Post,
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent?key="
            + apiKey
    )
    {
        Content = new StringContent(
            JsonSerializer.Serialize(
                new
                {
                    model = "models/gemini-embedding-001",
                    content = new { parts = new[] { new { text } } },
                    taskType = "RETRIEVAL_DOCUMENT",
                }
            ),
            Encoding.UTF8,
            "application/json"
        ),
    };
    var response = http.Send(request);
    response.EnsureSuccessStatusCode();
    using var doc = JsonDocument.Parse(response.Content.ReadAsStream());
    return doc
        .RootElement.GetProperty("embedding")
        .GetProperty("values")
        .EnumerateArray()
        .Select(v => v.GetSingle())
        .ToList();
}
```
```cs
// dotnet add package Turbopuffer
// dotnet add package OpenAI
using System;
using System.ClientModel;
using System.Collections.Generic;
using System.Linq;
using OpenAI;
using OpenAI.Embeddings;
using Turbopuffer;

using var tpuf = new TurbopufferClient
{
    Region = "gcp-us-central1", // choose best region: https://turbopuffer.com/docs/regions
};

var namespaceName =
    Environment.GetEnvironmentVariable("TURBOPUFFER_NAMESPACE")
    ?? $"quickstart-{Guid.NewGuid().ToString("N").Substring(0, 8)}";
var ns = tpuf.Namespace(namespaceName);

// Create an embedding with Qwen on Fireworks.
// Requires FIREWORKS_API_KEY to be set (https://fireworks.ai/settings/users/api-keys)
static List<float> Embed(string text)
{
    var client = new EmbeddingClient(
        "fireworks/qwen3-embedding-8b",
        new ApiKeyCredential(Environment.GetEnvironmentVariable("FIREWORKS_API_KEY")!),
        new OpenAIClientOptions { Endpoint = new Uri("https://api.fireworks.ai/inference/v1") }
    );
    return [.. client.GenerateEmbedding(text).Value.ToFloats().Span];
}
```
```cs
// dotnet add package Turbopuffer
// dotnet add package OpenAI
using System;
using System.ClientModel;
using System.Collections.Generic;
using System.Linq;
using OpenAI;
using OpenAI.Embeddings;
using Turbopuffer;

using var tpuf = new TurbopufferClient
{
    Region = "gcp-us-central1", // choose best region: https://turbopuffer.com/docs/regions
};

var namespaceName =
    Environment.GetEnvironmentVariable("TURBOPUFFER_NAMESPACE")
    ?? $"quickstart-{Guid.NewGuid().ToString("N").Substring(0, 8)}";
var ns = tpuf.Namespace(namespaceName);

// Create an embedding with Voyage.
// Requires VOYAGE_API_KEY to be set:
// https://dashboard.voyageai.com/organization/api-keys
static List<float> Embed(string text)
{
    var client = new EmbeddingClient(
        "voyage-4-lite",
        new ApiKeyCredential(Environment.GetEnvironmentVariable("VOYAGE_API_KEY")!),
        new OpenAIClientOptions { Endpoint = new Uri("https://api.voyageai.com/v1") }
    );
    return [.. client.GenerateEmbedding(text).Value.ToFloats().Span];
}
```
```ruby
require "turbopuffer"
require "securerandom"

tpuf = Turbopuffer::Client.new(
  api_key: ENV["TURBOPUFFER_API_KEY"], # created here: https://turbopuffer.com/dashboard
  region: "gcp-us-central1", # choose best region: https://turbopuffer.com/docs/regions
)
namespace = ENV["TURBOPUFFER_NAMESPACE"] || "quickstart-#{SecureRandom.hex(4)}"
ns = tpuf.namespace(namespace)

def embed(_text)
  [rand, rand]
end
```
```ruby
# $ gem install turbopuffer cohere-ruby
require "turbopuffer"
require "securerandom"
require "cohere"

tpuf = Turbopuffer::Client.new(
  api_key: ENV["TURBOPUFFER_API_KEY"], # created here: https://turbopuffer.com/dashboard
  region: "gcp-us-central1", # choose best region: https://turbopuffer.com/docs/regions
)
namespace = ENV["TURBOPUFFER_NAMESPACE"] || "quickstart-#{SecureRandom.hex(4)}"
ns = tpuf.namespace(namespace)

def embed(text)
  Cohere::Client
    .new(api_key: ENV["COHERE_API_KEY"])
    .embed(
      model: "embed-v4.0",
      texts: [text],
      input_type: "search_document",
      embedding_types: ["float"],
    )
    .embeddings.float.first
end
```
```ruby
# $ gem install turbopuffer openai
require "turbopuffer"
require "securerandom"
require "openai"

tpuf = Turbopuffer::Client.new(
  api_key: ENV["TURBOPUFFER_API_KEY"], # created here: https://turbopuffer.com/dashboard
  region: "gcp-us-central1", # choose best region: https://turbopuffer.com/docs/regions
)
namespace = ENV["TURBOPUFFER_NAMESPACE"] || "quickstart-#{SecureRandom.hex(4)}"
ns = tpuf.namespace(namespace)

def embed(text)
  OpenAI::Client
    .new(
      api_key: ENV["FIREWORKS_API_KEY"],
      base_url: "https://api.fireworks.ai/inference/v1",
    )
    .embeddings
    .create(model: "fireworks/qwen3-embedding-8b", input: text)
    .data[0].embedding
end
```
```ruby
# $ gem install turbopuffer openai
require "turbopuffer"
require "securerandom"
require "openai"

tpuf = Turbopuffer::Client.new(
  api_key: ENV["TURBOPUFFER_API_KEY"], # created here: https://turbopuffer.com/dashboard
  region: "gcp-us-central1", # choose best region: https://turbopuffer.com/docs/regions
)
namespace = ENV["TURBOPUFFER_NAMESPACE"] || "quickstart-#{SecureRandom.hex(4)}"
ns = tpuf.namespace(namespace)

def embed(text)
  OpenAI::Client
    .new(
      api_key: ENV["VOYAGE_API_KEY"],
      base_url: "https://api.voyageai.com/v1",
    )
    .embeddings
    .create(model: "voyage-4-lite", input: text)
    .data[0].embedding
end
```
<!-- /multilang -->

## Write

[Upsert](/docs/write) documents with vectors, typed attributes, and
[full-text search](/docs/fts) on `text` and `category` (with
[regex](/docs/query#param-Regex) on `text`).

<!-- multilang -->
```bash
curl $TPUF_URL/v2/namespaces/$TPUF_NAMESPACE \
  -X POST --fail-with-body \
  -H "Authorization: Bearer $api_key" \
  -H 'Content-Type: application/json' \
  -d '{
   "upsert_rows": [
     {"id": 1, "vector": [0.1, 0.2], "category": ["mammal"],
      "public": true, "text": "walrus narwhal"},
     {"id": 2, "vector": [0.3, 0.4], "category": ["fish"],
      "public": false, "text": "pufferfish clownfish swordfish"}
   ],
   "schema": {
     "text": {"type": "string", "full_text_search": true, "regex": true},
     "category": {"type": "[]string", "full_text_search": true}
   },
   "distance_metric": "cosine_distance"
 }'
```
```python
ns.write(
    upsert_rows=[
        {
            'id': 1,
            'vector': embed("walrus narwhal"),
            'category': ["mammal"],
            'public': True,
            'text': "walrus narwhal",
        },
        {
            'id': 2,
            'vector': embed("pufferfish clownfish swordfish"),
            'category': ["fish"],
            'public': False,
            'text': "pufferfish clownfish swordfish",
        },
    ],
    distance_metric='cosine_distance',
    schema={
        "text": {
            "type": "string",
            "full_text_search": True,
            "regex": True,
        },
        "category": {
            "type": "[]string",
            "full_text_search": True,
        },
    }
)
```
```typescript
await ns.write({
  upsert_rows: [
    {
      id: 1,
      vector: embed("walrus narwhal"),
      category: ["mammal"],
      public: true,
      text: "walrus narwhal",
    },
    {
      id: 2,
      vector: embed("pufferfish clownfish swordfish"),
      category: ["fish"],
      public: false,
      text: "pufferfish clownfish swordfish",
    },
  ],
  distance_metric: "cosine_distance",
  schema: {
    text: { type: "string", full_text_search: true, regex: true },
    category: { type: "[]string", full_text_search: true },
  },
});
```
```go
	_, err := ns.Write(ctx, turbopuffer.NamespaceWriteParams{
		UpsertRows: []turbopuffer.RowParam{
			{
				"id": 1, "vector": embed(ctx, "walrus narwhal"),
				"category": []string{"mammal"}, "public": true,
				"text": "walrus narwhal",
			},
			{
				"id": 2, "vector": embed(ctx, "pufferfish clownfish swordfish"),
				"category": []string{"fish"}, "public": false,
				"text": "pufferfish clownfish swordfish",
			},
		},
		DistanceMetric: turbopuffer.DistanceMetricCosineDistance,
		Schema: map[string]turbopuffer.AttributeSchemaConfigParam{
			"text": {
				Type:           "string",
				FullTextSearch: &turbopuffer.FullTextSearchConfigParam{},
				Regex:          param.NewOpt(true),
			},
			"category": {
				Type:           "[]string",
				FullTextSearch: &turbopuffer.FullTextSearchConfigParam{},
			},
		},
	})
	if err != nil {
		panic(err)
	}
```
```java
    ns.write(
      NamespaceWriteParams.builder()
        .addUpsertRow(
          Row.builder()
            .put("id", 1)
            .put("vector", embed("walrus narwhal"))
            .put("category", List.of("mammal"))
            .put("public", true)
            .put("text", "walrus narwhal")
            .build()
        )
        .addUpsertRow(
          Row.builder()
            .put("id", 2)
            .put("vector", embed("pufferfish clownfish swordfish"))
            .put("category", List.of("fish"))
            .put("public", false)
            .put("text", "pufferfish clownfish swordfish")
            .build()
        )
        .distanceMetric(DistanceMetric.COSINE_DISTANCE)
        .schema(
          Schema.builder()
            .put(
              "text",
              AttributeSchemaConfig.builder()
                .type("string")
                .fullTextSearch(FullTextSearchConfig.defaults())
                .regex(true)
                .build()
            )
            .put(
              "category",
              AttributeSchemaConfig.builder()
                .type("[]string")
                .fullTextSearch(FullTextSearchConfig.defaults())
                .build()
            )
            .build()
        )
        .build()
    );
```
```cs
await ns.Write(
    new NamespaceWriteParams
    {
        UpsertRows =
        [
            new Row()
                .Set("id", 1)
                .Set("vector", Embed("walrus narwhal"))
                .Set("category", new[] { "mammal" })
                .Set("public", true)
                .Set("text", "walrus narwhal"),
            new Row()
                .Set("id", 2)
                .Set("vector", Embed("pufferfish clownfish swordfish"))
                .Set("category", new[] { "fish" })
                .Set("public", false)
                .Set("text", "pufferfish clownfish swordfish"),
        ],
        DistanceMetric = DistanceMetric.CosineDistance,
        Schema = new Dictionary<string, AttributeSchemaConfig>
        {
            ["text"] = new AttributeSchemaConfig
            {
                Type = "string",
                FullTextSearch = true,
                Regex = true,
            },
            ["category"] = new AttributeSchemaConfig { Type = "[]string", FullTextSearch = true },
        },
    }
);
```
```ruby
ns.write(
  upsert_rows: [
    { id: 1, vector: embed("walrus narwhal"),
      category: ["mammal"], public: true,
      text: "walrus narwhal" },
    { id: 2, vector: embed("pufferfish clownfish swordfish"),
      category: ["fish"], public: false,
      text: "pufferfish clownfish swordfish" },
  ],
  distance_metric: "cosine_distance",
  schema: {
    text: { type: "string", full_text_search: true, regex: true },
    category: { type: "[]string", full_text_search: true },
  },
)
```
<!-- /multilang -->

## Search

Find documents by [vector similarity](/docs/vector) with filters,
by [full-text search](/docs/fts) with a
[boosted](/docs/query#field-weightsboosts) `category` field, or by
[regex](/docs/query#param-Regex) (`\w+fish` matches "pufferfish",
"swordfish", "clownfish"). To combine vector and FTS concurrently, see
[hybrid search](/docs/hybrid).

<!-- multilang -->
```bash
# Vector search with a filter
curl $TPUF_URL/v2/namespaces/$TPUF_NAMESPACE/query \
  -X POST --fail-with-body \
  -H "Authorization: Bearer $api_key" \
  -H 'Content-Type: application/json' \
  -d '{
   "rank_by": ["vector", "ANN", [0.1, 0.2]],
   "limit": 10,
   "filters": ["public", "Eq", true]
 }'

# Full-text search with boosted category field
curl $TPUF_URL/v2/namespaces/$TPUF_NAMESPACE/query \
  -X POST --fail-with-body \
  -H "Authorization: Bearer $api_key" \
  -H 'Content-Type: application/json' \
  -d '{
   "limit": 10,
   "filters": ["public", "Eq", true],
   "rank_by": ["Sum", [
     ["Product", 2, ["category", "BM25", "mammal"]],
     ["text", "BM25", "quick walrus"]
   ]]
 }'

# Regex filter — matches "pufferfish", "swordfish", "clownfish"
curl $TPUF_URL/v2/namespaces/$TPUF_NAMESPACE/query \
  -X POST --fail-with-body \
  -H "Authorization: Bearer $api_key" \
  -H 'Content-Type: application/json' \
  -d '{
   "limit": 10,
   "filters": ["text", "Regex", "\\w+fish"]
 }'
```
```python
# Vector search with a filter
print(ns.query(
    rank_by=("vector", "ANN", embed("arctic sea mammal")),
    limit=10,
    filters=("public", "Eq", True),
))

# Full-text search with boosted category field
print(ns.query(
    limit=10,
    filters=("public", "Eq", True),
    rank_by=("Sum", [
        ("Product", 2, ("category", "BM25", "mammal")),
        ("text", "BM25", "quick walrus"),
    ]),
))

# Regex filter — matches "pufferfish", "swordfish", "clownfish"
print(ns.query(
    limit=10,
    filters=("text", "Regex", "\\w+fish"),
))
```
```typescript
// Vector search with a filter
let result = await ns.query({
  rank_by: ["vector", "ANN", embed("arctic sea mammal")],
  limit: 10,
  filters: ["public", "Eq", true],
});
console.log(result.rows);

// Full-text search with boosted category field
result = await ns.query({
  limit: 10,
  filters: ["public", "Eq", true],
  rank_by: ["Sum", [
    ["Product", 2, ["category", "BM25", "mammal"]],
    ["text", "BM25", "quick walrus"],
  ]],
});
console.log(result.rows);

// Regex filter — matches "pufferfish", "swordfish", "clownfish"
result = await ns.query({
  limit: 10,
  filters: ["text", "Regex", "\\w+fish"],
});
console.log(result.rows);
```
```go
	res, err := ns.Query(ctx, turbopuffer.NamespaceQueryParams{
		RankBy:  turbopuffer.NewRankByAnn("vector", embed(ctx, "arctic sea mammal")),
		Limit:   turbopuffer.LimitParam{Total: 10},
		Filters: turbopuffer.NewFilterEq("public", true),
	})
	if err != nil {
		panic(err)
	}
	fmt.Print(turbopuffer.PrettyPrint(res.Rows))

	// Full-text search with boosted category field
	res, err = ns.Query(ctx, turbopuffer.NamespaceQueryParams{
		Limit:   turbopuffer.LimitParam{Total: 10},
		Filters: turbopuffer.NewFilterEq("public", true),
		RankBy: turbopuffer.NewRankByTextSum([]turbopuffer.RankByText{
			turbopuffer.NewRankByTextProduct(2, turbopuffer.NewRankByTextBM25("category", "mammal")),
			turbopuffer.NewRankByTextBM25("text", "quick walrus"),
		}),
	})
	if err != nil {
		panic(err)
	}
	fmt.Print(turbopuffer.PrettyPrint(res.Rows))

	// Regex filter — matches "pufferfish", "swordfish", "clownfish"
	res, err = ns.Query(ctx, turbopuffer.NamespaceQueryParams{
		Limit:   turbopuffer.LimitParam{Total: 10},
		Filters: turbopuffer.NewFilterRegex("text", `\w+fish`),
	})
	if err != nil {
		panic(err)
	}
	fmt.Print(turbopuffer.PrettyPrint(res.Rows))
```
```java
    // Vector search with a filter
    var queryResult = ns.query(
      NamespaceQueryParams.builder()
        .rankBy(RankBy.ann("vector", embed("arctic sea mammal")))
        .limit(10)
        .filters(Filter.eq("public", true))
        .build()
    );
    System.out.println(queryResult);

    // Full-text search with boosted category field
    var ftsResult = ns.query(
      NamespaceQueryParams.builder()
        .limit(10)
        .filters(Filter.eq("public", true))
        .rankBy(
          RankByText.sum(
            RankByText.product(2, RankByText.bm25("category", "mammal")),
            RankByText.bm25("text", "quick walrus")
          )
        )
        .build()
    );
    System.out.println(ftsResult);

    // Regex filter — matches "pufferfish", "swordfish", "clownfish"
    var regexResult = ns.query(
      NamespaceQueryParams.builder().limit(10).filters(Filter.regex("text", "\\w+fish")).build()
    );
    System.out.println(regexResult);
```
```cs
// Vector search with a filter
var queryResult = await ns.Query(
    new NamespaceQueryParams
    {
        RankBy = RankBy.Ann("vector", Embed("arctic sea mammal")),
        Limit = 10,
        Filters = Filter.Eq("public", true),
    }
);
foreach (var row in queryResult.GetRows())
{
    Console.WriteLine(row);
}

// Full-text search with boosted category field
var ftsResult = await ns.Query(
    new NamespaceQueryParams
    {
        Limit = 10,
        Filters = Filter.Eq("public", true),
        RankBy = RankByText.Sum(
            RankByText.Product(2, RankByText.BM25("category", "mammal")),
            RankByText.BM25("text", "quick walrus")
        ),
    }
);
foreach (var row in ftsResult.GetRows())
{
    Console.WriteLine(row);
}

// Regex filter — matches "pufferfish", "swordfish", "clownfish"
var regexResult = await ns.Query(
    new NamespaceQueryParams { Limit = 10, Filters = Filter.Regex("text", "\\w+fish") }
);
foreach (var row in regexResult.GetRows())
{
    Console.WriteLine(row);
}
```
```ruby
# Vector search with a filter
result = ns.query(
  rank_by: ["vector", "ANN", embed("arctic sea mammal")],
  limit: 10,
  filters: ["public", "Eq", true],
)
puts result.rows

# Full-text search with boosted category field
result = ns.query(
  limit: 10,
  filters: ["public", "Eq", true],
  rank_by: ["Sum", [
    ["Product", 2, ["category", "BM25", "mammal"]],
    ["text", "BM25", "quick walrus"],
  ]],
)
puts result.rows

# Regex filter — matches "pufferfish", "swordfish", "clownfish"
result = ns.query(
  limit: 10,
  filters: ["text", "Regex", "\\w+fish"],
)
puts result.rows
```
<!-- /multilang -->

## Aggregate

[Count](/docs/query#aggregations) documents without returning rows, and use
[grouped aggregations](/docs/query#group-by) to split the counts by attribute.
Stay in the same namespace and count rows per `category`.

<!-- multilang -->
```bash
curl $TPUF_URL/v2/namespaces/$TPUF_NAMESPACE/query \
  -X POST --fail-with-body \
  -H "Authorization: Bearer $api_key" \
  -H 'Content-Type: application/json' \
  -d '{
   "aggregate_by": {"count_by_category": ["Count"]},
   "group_by": ["category"]
 }'
# {
#   "aggregation_groups": [
#     {"category": ["fish"], "count_by_category": 1},
#     {"category": ["mammal"], "count_by_category": 1}
#   ]
# }
```
```python
grouped = ns.query(
    aggregate_by={"count_by_category": ("Count",)},
    group_by=["category"],
)
print(grouped.aggregation_groups)
# [Row(category=['fish'], count_by_category=1), Row(category=['mammal'], count_by_category=1)]
```
```typescript
const grouped = await ns.query({
  aggregate_by: { count_by_category: ["Count"] },
  group_by: ["category"],
});
console.log(grouped.aggregation_groups);
// [
//   { category: ["fish"], count_by_category: 1 },
//   { category: ["mammal"], count_by_category: 1 },
// ]
```
```go
	groupedResult, err := ns.Query(ctx, turbopuffer.NamespaceQueryParams{
		AggregateBy: map[string]turbopuffer.AggregateBy{
			"count_by_category": turbopuffer.NewAggregateByCount(),
		},
		GroupBy: []turbopuffer.GroupBy{turbopuffer.NewGroupByAttr("category")},
	})
	if err != nil {
		panic(err)
	}
	fmt.Println(turbopuffer.PrettyPrint(groupedResult.AggregationGroups))
	// [
	//   { category: ["fish"], count_by_category: 1 },
	//   { category: ["mammal"], count_by_category: 1 },
	// ]
```
```java
    var groupedResult = ns.query(
      NamespaceQueryParams.builder()
        .aggregateBy(Map.of("count_by_category", AggregateBy.count("id")))
        .groupBy(List.of(GroupBy.attr("category")))
        .build()
    );
    System.out.println(groupedResult.aggregationGroups().get());
    // [{category=[fish], count_by_category=1}, {category=[mammal], count_by_category=1}]
```
```cs
var groupedResult = await ns.Query(
    new NamespaceQueryParams
    {
        AggregateBy = new Dictionary<string, AggregateBy>
        {
            ["count_by_category"] = AggregateBy.Count("id"),
        },
        GroupBy = [GroupBy.Attr("category")],
    }
);
foreach (var group in groupedResult.GetAggregationGroups())
{
    Console.WriteLine(group);
}
// { "category": ["fish"], "count_by_category": 1 }
// { "category": ["mammal"], "count_by_category": 1 }
```
```ruby
grouped = ns.query(
  aggregate_by: { count_by_category: ["Count"] },
  group_by: ["category"],
)
puts grouped.aggregation_groups
# {category: ["fish"], count_by_category: 1}
# {category: ["mammal"], count_by_category: 1}
```
<!-- /multilang -->

## Full runnable example

Prefer one copy-paste program for the core loop? This version covers connect,
write, search, and aggregate in one file. Then continue below with the smaller
conditional-write and branching snippets.

<!-- multilang -->
```bash
api_key="${TURBOPUFFER_API_KEY:-your-api-key}" # created here: https://turbopuffer.com/dashboard
TPUF_URL="https://gcp-us-central1.turbopuffer.com" # choose best region: https://turbopuffer.com/docs/regions
TPUF_NAMESPACE="${TPUF_NAMESPACE:-quickstart-$(date +%s)-$$}"

# Upsert documents with vectors and attributes
curl $TPUF_URL/v2/namespaces/$TPUF_NAMESPACE \
  -X POST --fail-with-body \
  -H "Authorization: Bearer $api_key" \
  -H 'Content-Type: application/json' \
  -d '{
   "upsert_rows": [
     {
       "id": 1,
       "vector": [0.1, 0.2],
       "name": "foo",
       "public": true,
       "text": "walrus narwhal"
     },
     {
       "id": 2,
       "vector": [0.3, 0.4],
       "name": "foo",
       "public": false,
       "text": "elephant walrus rhino"
     }
   ],
   "schema": {
     "text": {
       "type": "string",
       "full_text_search": true,
       "regex": true
     },
     "category": {
       "type": "[]string",
       "full_text_search": true
     }
   },
   "distance_metric": "cosine_distance"
 }'

# Query nearest neighbors with a filter
curl $TPUF_URL/v2/namespaces/$TPUF_NAMESPACE/query \
  -X POST --fail-with-body \
  -H "Authorization: Bearer $api_key" \
  -H 'Content-Type: application/json' \
  -d '{
   "rank_by": ["vector", "ANN", [0.1, 0.2]],
   "limit": 10,
   "filters": ["public", "Eq", true]
 }'

# Full-text search on an attribute
# To combine FTS and vector search concurrently, see:
# https://turbopuffer.com/docs/hybrid-search
curl $TPUF_URL/v2/namespaces/$TPUF_NAMESPACE/query \
  -X POST --fail-with-body \
  -H "Authorization: Bearer $api_key" \
  -H 'Content-Type: application/json' \
  -d '{
   "limit": 10,
   "filters": ["public", "Eq", true],
   "rank_by": ["Sum", [
     ["Product", 2, ["category", "BM25", "mammal"]],
     ["text", "BM25", "quick walrus"]
   ]]
 }'

# Regex filter — matches "pufferfish", "swordfish", "clownfish"
curl $TPUF_URL/v2/namespaces/$TPUF_NAMESPACE/query \
  -X POST --fail-with-body \
  -H "Authorization: Bearer $api_key" \
  -H 'Content-Type: application/json' \
  -d '{
   "limit": 10,
   "filters": ["text", "Regex", "\\w+fish"]
 }'

# Count documents grouped by category
curl $TPUF_URL/v2/namespaces/$TPUF_NAMESPACE/query \
  -X POST --fail-with-body \
  -H "Authorization: Bearer $api_key" \
  -H 'Content-Type: application/json' \
  -d '{
   "aggregate_by": {
     "count_by_category": ["Count"]
   },
   "group_by": ["category"]
 }'
# {
#   "aggregation_groups": [
#     {"category": "fish", "count_by_category": 1},
#     {"category": "mammal", "count_by_category": 1}
#   ]
# }
```
```python
# $ pip install turbopuffer
# Sample Python notebook:
# https://colab.research.google.com/drive/17i4sfFTeJQkINCxjBaOGOZeENZr4ZaTE
import os
import uuid
import random
from typing import List

import turbopuffer

tpuf = turbopuffer.Turbopuffer(
    api_key=os.getenv("TURBOPUFFER_API_KEY"), # created here: https://turbopuffer.com/dashboard
    region="gcp-us-central1", # choose best region: https://turbopuffer.com/docs/regions
)

namespace = os.getenv("TURBOPUFFER_NAMESPACE", f"quickstart-{uuid.uuid4().hex[:8]}")
ns = tpuf.namespace(namespace)

# Use provider-free random vectors for the quickstart.
# Switch the embedding provider dropdown to see real embedding API calls.
def embed(_text: str) -> List[float]:
    return [random.random(), random.random()]

# Upsert documents with vectors and attributes
ns.write(
    upsert_rows=[
        {
            'id': 1,
            'vector': embed("walrus narwhal"),
            'category': ["mammal"],
            'public': True,
            'text': "walrus narwhal",
        },
        {
            'id': 2,
            'vector': embed("pufferfish clownfish swordfish"),
            'category': ["fish"],
            'public': False,
            'text': "pufferfish clownfish swordfish",
        },
    ],
    distance_metric='cosine_distance',
    schema={
        "text": {
            # Configure FTS/BM25. Other attributes get inferred types.
            "type": "string",
            # More schema & FTS options:
            # https://turbopuffer.com/docs/write#schema
            "full_text_search": True,
            "regex": True,
        },
        "category": {
            "type": "[]string",
            "full_text_search": True,
        },
    }
)

# Query nearest neighbors with a filter
print(ns.query(
  rank_by=("vector", "ANN", embed("arctic sea mammal")),
  limit=10,
  filters=("public", "Eq", True),
))
# [Row(id=1, vector=None, $dist=0.42773545)]

# Full-text search on an attribute
# To combine FTS and vector search concurrently, see:
# https://turbopuffer.com/docs/hybrid-search
print(ns.query(
  limit=10,
  filters=("public", "Eq", True),
  rank_by=("Sum", [
      ("Product", 2, ("category", "BM25", "mammal")),
      ("text", "BM25", "quick walrus"),
  ]),
))
# [Row(id=1, vector=None, $dist=0.7549128)]

# Regex filter — matches "pufferfish", "swordfish", "clownfish"
print(ns.query(
  limit=10,
  filters=("text", "Regex", "\\w+fish"),
))

# Count documents grouped by category
grouped_result = ns.query(
    aggregate_by={"count_by_category": ("Count",)},
    group_by=["category"],
)
print(grouped_result.aggregation_groups)
# [Row(category=['fish'], count_by_category=1), Row(category=['mammal'], count_by_category=1)]
```
```python
# $ pip install turbopuffer sentence-transformers
# Sample Python notebook:
# https://colab.research.google.com/drive/17i4sfFTeJQkINCxjBaOGOZeENZr4ZaTE
import os
import uuid
from typing import List

import turbopuffer
from sentence_transformers import SentenceTransformer

tpuf = turbopuffer.Turbopuffer(
    api_key=os.getenv("TURBOPUFFER_API_KEY"), # created here: https://turbopuffer.com/dashboard
    region="gcp-us-central1", # choose best region: https://turbopuffer.com/docs/regions
)

namespace = os.getenv("TURBOPUFFER_NAMESPACE", f"quickstart-{uuid.uuid4().hex[:8]}")
ns = tpuf.namespace(namespace)

# Local embeddings with BGE — no API key needed.
# Model is downloaded on first run (~130 MB).
bge = SentenceTransformer("BAAI/bge-small-en-v1.5")

def embed(text: str) -> List[float]:
    return bge.encode(text).tolist()

# Upsert documents with vectors and attributes
ns.write(
    upsert_rows=[
        {
            'id': 1,
            'vector': embed("walrus narwhal"),
            'category': ["mammal"],
            'public': True,
            'text': "walrus narwhal",
        },
        {
            'id': 2,
            'vector': embed("pufferfish clownfish swordfish"),
            'category': ["fish"],
            'public': False,
            'text': "pufferfish clownfish swordfish",
        },
    ],
    distance_metric='cosine_distance',
    schema={
        "text": {
            # Configure FTS/BM25. Other attributes get inferred types (`public`: int).
            "type": "string",
            # More schema & FTS options:
            # https://turbopuffer.com/docs/write#schema
            "full_text_search": True,
            "regex": True,
        },
        "category": {
            "type": "[]string",
            "full_text_search": True,
        },
    }
)

# Query nearest neighbors with a filter
print(ns.query(
  rank_by=("vector", "ANN", embed("arctic sea mammal")),
  limit=10,
  filters=("public", "Eq", True),
))
# [Row(id=1, vector=None, $dist=0.42773545)]

# Full-text search on an attribute
# To combine FTS and vector search concurrently, see:
# https://turbopuffer.com/docs/hybrid-search
print(ns.query(
  limit=10,
  filters=("public", "Eq", True),
  rank_by=("Sum", [
      ("Product", 2, ("category", "BM25", "mammal")),
      ("text", "BM25", "quick walrus"),
  ]),
))
# [Row(id=1, vector=None, $dist=0.7549128)]

# Regex filter — matches "pufferfish", "swordfish", "clownfish"
print(ns.query(
  limit=10,
  filters=("text", "Regex", "\\w+fish"),
))

# Count documents grouped by category
grouped_result = ns.query(
    aggregate_by={"count_by_category": ("Count",)},
    group_by=["category"],
)
print(grouped_result.aggregation_groups)
# [Row(category=['fish'], count_by_category=1), Row(category=['mammal'], count_by_category=1)]
```
```python
# $ pip install turbopuffer cohere
# Sample Python notebook:
# https://colab.research.google.com/drive/17i4sfFTeJQkINCxjBaOGOZeENZr4ZaTE
import os
import uuid
from typing import List

import turbopuffer
from cohere import ClientV2

tpuf = turbopuffer.Turbopuffer(
    api_key=os.getenv("TURBOPUFFER_API_KEY"), # created here: https://turbopuffer.com/dashboard
    region="gcp-us-central1", # choose best region: https://turbopuffer.com/docs/regions
)

namespace = os.getenv("TURBOPUFFER_NAMESPACE", f"quickstart-{uuid.uuid4().hex[:8]}")
ns = tpuf.namespace(namespace)
cohere = ClientV2(api_key=os.environ["COHERE_API_KEY"])

# Create an embedding with Cohere.
# Requires COHERE_API_KEY to be set (https://dashboard.cohere.com/api-keys)
def embed(text: str) -> List[float]:
    return cohere.embed(
        model="embed-v4.0",
        input_type="search_document",
        texts=[text],
        embedding_types=["float"],
    ).embeddings.float[0]

# Upsert documents with vectors and attributes
ns.write(
    upsert_rows=[
        {
            'id': 1,
            'vector': embed("walrus narwhal"),
            'category': ["mammal"],
            'public': True,
            'text': "walrus narwhal",
        },
        {
            'id': 2,
            'vector': embed("pufferfish clownfish swordfish"),
            'category': ["fish"],
            'public': False,
            'text': "pufferfish clownfish swordfish",
        },
    ],
    distance_metric='cosine_distance',
    schema={
        "text": {
            # Configure FTS/BM25. Other attributes get inferred types (`public`: int).
            "type": "string",
            # More schema & FTS options:
            # https://turbopuffer.com/docs/write#schema
            "full_text_search": True,
            "regex": True,
        },
        "category": {
            "type": "[]string",
            "full_text_search": True,
        },
    }
)

# Query nearest neighbors with a filter
print(ns.query(
  rank_by=("vector", "ANN", embed("arctic sea mammal")),
  limit=10,
  filters=("public", "Eq", True),
))
# [Row(id=1, vector=None, $dist=0.42773545)]

# Full-text search on an attribute
# To combine FTS and vector search concurrently, see:
# https://turbopuffer.com/docs/hybrid-search
print(ns.query(
  limit=10,
  filters=("public", "Eq", True),
  rank_by=("Sum", [
      ("Product", 2, ("category", "BM25", "mammal")),
      ("text", "BM25", "quick walrus"),
  ]),
))
# [Row(id=1, vector=None, $dist=0.7549128)]

# Regex filter — matches "pufferfish", "swordfish", "clownfish"
print(ns.query(
  limit=10,
  filters=("text", "Regex", "\\w+fish"),
))

# Count documents grouped by category
grouped_result = ns.query(
    aggregate_by={"count_by_category": ("Count",)},
    group_by=["category"],
)
print(grouped_result.aggregation_groups)
# [Row(category=['fish'], count_by_category=1), Row(category=['mammal'], count_by_category=1)]
```
```python
# $ pip install turbopuffer google-genai
# Sample Python notebook:
# https://colab.research.google.com/drive/17i4sfFTeJQkINCxjBaOGOZeENZr4ZaTE
import os
import uuid
from typing import List

import turbopuffer
from google.genai import Client
from google.genai.types import EmbedContentConfig

tpuf = turbopuffer.Turbopuffer(
    api_key=os.getenv("TURBOPUFFER_API_KEY"), # created here: https://turbopuffer.com/dashboard
    region="gcp-us-central1", # choose best region: https://turbopuffer.com/docs/regions
)

namespace = os.getenv("TURBOPUFFER_NAMESPACE", f"quickstart-{uuid.uuid4().hex[:8]}")
ns = tpuf.namespace(namespace)
gemini = Client(api_key=os.environ["GEMINI_API_KEY"])

# Create an embedding with Gemini.
# Requires GEMINI_API_KEY to be set (https://aistudio.google.com/app/apikey)
def embed(text: str) -> List[float]:
    return gemini.models.embed_content(
        model="gemini-embedding-001",
        contents=text,
        config=EmbedContentConfig(task_type="RETRIEVAL_DOCUMENT"),
    ).embeddings[0].values

# Upsert documents with vectors and attributes
ns.write(
    upsert_rows=[
        {
            'id': 1,
            'vector': embed("walrus narwhal"),
            'category': ["mammal"],
            'public': True,
            'text': "walrus narwhal",
        },
        {
            'id': 2,
            'vector': embed("pufferfish clownfish swordfish"),
            'category': ["fish"],
            'public': False,
            'text': "pufferfish clownfish swordfish",
        },
    ],
    distance_metric='cosine_distance',
    schema={
        "text": {
            # Configure FTS/BM25. Other attributes get inferred types (`public`: int).
            "type": "string",
            # More schema & FTS options:
            # https://turbopuffer.com/docs/write#schema
            "full_text_search": True,
            "regex": True,
        },
        "category": {
            "type": "[]string",
            "full_text_search": True,
        },
    }
)

# Query nearest neighbors with a filter
print(ns.query(
  rank_by=("vector", "ANN", embed("arctic sea mammal")),
  limit=10,
  filters=("public", "Eq", True),
))
# [Row(id=1, vector=None, $dist=0.42773545)]

# Full-text search on an attribute
# To combine FTS and vector search concurrently, see:
# https://turbopuffer.com/docs/hybrid-search
print(ns.query(
  limit=10,
  filters=("public", "Eq", True),
  rank_by=("Sum", [
      ("Product", 2, ("category", "BM25", "mammal")),
      ("text", "BM25", "quick walrus"),
  ]),
))
# [Row(id=1, vector=None, $dist=0.7549128)]

# Regex filter — matches "pufferfish", "swordfish", "clownfish"
print(ns.query(
  limit=10,
  filters=("text", "Regex", "\\w+fish"),
))

# Count documents grouped by category
grouped_result = ns.query(
    aggregate_by={"count_by_category": ("Count",)},
    group_by=["category"],
)
print(grouped_result.aggregation_groups)
# [Row(category=['fish'], count_by_category=1), Row(category=['mammal'], count_by_category=1)]
```
```python
# $ pip install turbopuffer openai
# Sample Python notebook:
# https://colab.research.google.com/drive/17i4sfFTeJQkINCxjBaOGOZeENZr4ZaTE
import os
import uuid
from typing import List

import turbopuffer
from openai import OpenAI

tpuf = turbopuffer.Turbopuffer(
    api_key=os.getenv("TURBOPUFFER_API_KEY"), # created here: https://turbopuffer.com/dashboard
    region="gcp-us-central1", # choose best region: https://turbopuffer.com/docs/regions
)

namespace = os.getenv("TURBOPUFFER_NAMESPACE", f"quickstart-{uuid.uuid4().hex[:8]}")
ns = tpuf.namespace(namespace)
fireworks = OpenAI(
    api_key=os.environ["FIREWORKS_API_KEY"],
    base_url="https://api.fireworks.ai/inference/v1",
)

# Create an embedding with Qwen on Fireworks.
# Requires FIREWORKS_API_KEY to be set (https://fireworks.ai/settings/users/api-keys)
def embed(text: str) -> List[float]:
    return fireworks.embeddings.create(
        model="fireworks/qwen3-embedding-8b",
        input=text,
    ).data[0].embedding

# Upsert documents with vectors and attributes
ns.write(
    upsert_rows=[
        {
            'id': 1,
            'vector': embed("walrus narwhal"),
            'category': ["mammal"],
            'public': True,
            'text': "walrus narwhal",
        },
        {
            'id': 2,
            'vector': embed("pufferfish clownfish swordfish"),
            'category': ["fish"],
            'public': False,
            'text': "pufferfish clownfish swordfish",
        },
    ],
    distance_metric='cosine_distance',
    schema={
        "text": {
            # Configure FTS/BM25. Other attributes get inferred types (`public`: int).
            "type": "string",
            # More schema & FTS options:
            # https://turbopuffer.com/docs/write#schema
            "full_text_search": True,
            "regex": True,
        },
        "category": {
            "type": "[]string",
            "full_text_search": True,
        },
    }
)

# Query nearest neighbors with a filter
print(ns.query(
  rank_by=("vector", "ANN", embed("arctic sea mammal")),
  limit=10,
  filters=("public", "Eq", True),
))
# [Row(id=1, vector=None, $dist=0.42773545)]

# Full-text search on an attribute
# To combine FTS and vector search concurrently, see:
# https://turbopuffer.com/docs/hybrid-search
print(ns.query(
  limit=10,
  filters=("public", "Eq", True),
  rank_by=("Sum", [
      ("Product", 2, ("category", "BM25", "mammal")),
      ("text", "BM25", "quick walrus"),
  ]),
))
# [Row(id=1, vector=None, $dist=0.7549128)]

# Regex filter — matches "pufferfish", "swordfish", "clownfish"
print(ns.query(
  limit=10,
  filters=("text", "Regex", "\\w+fish"),
))

# Count documents grouped by category
grouped_result = ns.query(
    aggregate_by={"count_by_category": ("Count",)},
    group_by=["category"],
)
print(grouped_result.aggregation_groups)
# [Row(category=['fish'], count_by_category=1), Row(category=['mammal'], count_by_category=1)]
```
```python
# $ pip install turbopuffer voyageai
# Sample Python notebook:
# https://colab.research.google.com/drive/17i4sfFTeJQkINCxjBaOGOZeENZr4ZaTE
import os
import uuid
from typing import List

import turbopuffer
import voyageai

tpuf = turbopuffer.Turbopuffer(
    api_key=os.getenv("TURBOPUFFER_API_KEY"), # created here: https://turbopuffer.com/dashboard
    region="gcp-us-central1", # choose best region: https://turbopuffer.com/docs/regions
)

namespace = os.getenv("TURBOPUFFER_NAMESPACE", f"quickstart-{uuid.uuid4().hex[:8]}")
ns = tpuf.namespace(namespace)
voyage = voyageai.Client(api_key=os.environ["VOYAGE_API_KEY"])

# Create an embedding with Voyage.
# Requires VOYAGE_API_KEY to be set:
# https://dashboard.voyageai.com/organization/api-keys
def embed(text: str) -> List[float]:
    return voyage.embed([text], model="voyage-4-lite").embeddings[0]

# Upsert documents with vectors and attributes
ns.write(
    upsert_rows=[
        {
            'id': 1,
            'vector': embed("walrus narwhal"),
            'category': ["mammal"],
            'public': True,
            'text': "walrus narwhal",
        },
        {
            'id': 2,
            'vector': embed("pufferfish clownfish swordfish"),
            'category': ["fish"],
            'public': False,
            'text': "pufferfish clownfish swordfish",
        },
    ],
    distance_metric='cosine_distance',
    schema={
        "text": {
            # Configure FTS/BM25. Other attributes get inferred types.
            "type": "string",
            # More schema & FTS options:
            # https://turbopuffer.com/docs/write#schema
            "full_text_search": True,
            "regex": True,
        },
        "category": {
            "type": "[]string",
            "full_text_search": True,
        },
    }
)

# Query nearest neighbors with a filter
print(ns.query(
  rank_by=("vector", "ANN", embed("arctic sea mammal")),
  limit=10,
  filters=("public", "Eq", True),
))
# [Row(id=1, vector=None, $dist=0.42773545)]

# Full-text search on an attribute
# To combine FTS and vector search concurrently, see:
# https://turbopuffer.com/docs/hybrid-search
print(ns.query(
  limit=10,
  filters=("public", "Eq", True),
  rank_by=("Sum", [
      ("Product", 2, ("category", "BM25", "mammal")),
      ("text", "BM25", "quick walrus"),
  ]),
))
# [Row(id=1, vector=None, $dist=0.7549128)]

# Regex filter — matches "pufferfish", "swordfish", "clownfish"
print(ns.query(
  limit=10,
  filters=("text", "Regex", "\\w+fish"),
))

# Count documents grouped by category
grouped_result = ns.query(
    aggregate_by={"count_by_category": ("Count",)},
    group_by=["category"],
)
print(grouped_result.aggregation_groups)
# [Row(category=['fish'], count_by_category=1), Row(category=['mammal'], count_by_category=1)]
```
```typescript
// $ npm install @turbopuffer/turbopuffer
import { Turbopuffer } from "@turbopuffer/turbopuffer";

const tpuf = new Turbopuffer({
  apiKey: process.env.TURBOPUFFER_API_KEY, // created here: https://turbopuffer.com/dashboard
  region: "gcp-us-central1", // choose best region: https://turbopuffer.com/docs/regions
});

const namespace = process.env.TURBOPUFFER_NAMESPACE ?? `quickstart-${Math.random().toString(36).slice(2, 10)}`;
const ns = tpuf.namespace(namespace);

// Use provider-free random vectors for the quickstart.
// Switch the embedding provider dropdown to see real embedding API calls.
function embed(_text: string): number[] {
  return [Math.random(), Math.random()];
}

// Upsert documents with vectors and attributes
await ns.write({
  upsert_rows: [
    {
      id: 1,
      vector: embed("walrus narwhal"),
      category: ["mammal"],
      public: true,
      text: "walrus narwhal",
    },
    {
      id: 2,
      vector: embed("pufferfish clownfish swordfish"),
      category: ["fish"],
      public: false,
      text: "pufferfish clownfish swordfish",
    },
  ],
  distance_metric: "cosine_distance",
  schema: {
    text: {
      // Configure FTS/BM25. Other attributes have inferred types.
      type: "string",
      // More schema & FTS options:
      // https://turbopuffer.com/docs/write#schema
      full_text_search: true,
      regex: true,
    },
    category: { type: "[]string", full_text_search: true },
  },
});

// Query nearest neighbors with a filter
let result = await ns.query({
  rank_by: ["vector", "ANN", embed("arctic sea mammal")],
  limit: 10,
  filters: ["public", "Eq", true],
});
console.log(result.rows);
// [{ '$dist': 0.42773545, id: 1 }]

// Full-text search on an attribute
// To combine FTS and vector search concurrently, see:
// https://turbopuffer.com/docs/hybrid-search
result = await ns.query({
  limit: 10,
  filters: ["public", "Eq", true],
  rank_by: ["Sum", [
    ["Product", 2, ["category", "BM25", "mammal"]],
    ["text", "BM25", "quick walrus"],
  ]],
});
console.log(result.rows);
// [{ '$dist': 0.7549128, id: 1 }]

// Regex filter — matches "pufferfish", "swordfish", "clownfish"
result = await ns.query({
  limit: 10,
  filters: ["text", "Regex", "\\w+fish"],
});
console.log(result.rows);

// Count documents grouped by category
const groupedResult = await ns.query({
  aggregate_by: { count_by_category: ["Count"] },
  group_by: ["category"],
});
console.log(groupedResult.aggregation_groups);
// [
//   { category: ["fish"], count_by_category: 1 },
//   { category: ["mammal"], count_by_category: 1 },
// ]
```
```typescript
// $ npm install @turbopuffer/turbopuffer cohere-ai
import { Turbopuffer } from "@turbopuffer/turbopuffer";
import { CohereClient } from "cohere-ai";

const tpuf = new Turbopuffer({
  apiKey: process.env.TURBOPUFFER_API_KEY, // created here: https://turbopuffer.com/dashboard
  region: "gcp-us-central1", // choose best region: https://turbopuffer.com/docs/regions
});

const namespace = process.env.TURBOPUFFER_NAMESPACE ?? `quickstart-${Math.random().toString(36).slice(2, 10)}`;
const ns = tpuf.namespace(namespace);
const cohere = new CohereClient({ token: process.env.COHERE_API_KEY });

// Create an embedding with Cohere.
// Requires COHERE_API_KEY to be set (https://dashboard.cohere.com/api-keys)
async function embed(text: string): Promise<number[]> {
  return (await cohere.v2.embed({
    model: "embed-v4.0",
    inputType: "search_document",
    texts: [text],
    embeddingTypes: ["float"],
  })).embeddings.float![0];
}

// Upsert documents with vectors and attributes
await ns.write({
  upsert_rows: [
    {
      id: 1,
      vector: await embed("walrus narwhal"),
      category: ["mammal"],
      public: true,
      text: "walrus narwhal",
    },
    {
      id: 2,
      vector: await embed("pufferfish clownfish swordfish"),
      category: ["fish"],
      public: false,
      text: "pufferfish clownfish swordfish",
    },
  ],
  distance_metric: "cosine_distance",
  schema: {
    text: {
      // Configure FTS/BM25. Other attributes have inferred types (`public`: int).
      type: "string",
      // More schema & FTS options:
      // https://turbopuffer.com/docs/write#schema
      full_text_search: true,
      regex: true,
    },
    category: { type: "[]string", full_text_search: true },
  },
});

// Query nearest neighbors with a filter
let result = await ns.query({
  rank_by: ["vector", "ANN", await embed("arctic sea mammal")],
  limit: 10,
  filters: ["public", "Eq", true],
});
console.log(result.rows);
// [{ '$dist': 0.42773545, id: 1 }]

// Full-text search on an attribute
// To combine FTS and vector search concurrently, see:
// https://turbopuffer.com/docs/hybrid-search
result = await ns.query({
  limit: 10,
  filters: ["public", "Eq", true],
  rank_by: ["Sum", [
    ["Product", 2, ["category", "BM25", "mammal"]],
    ["text", "BM25", "quick walrus"],
  ]],
});
console.log(result.rows);
// [{ '$dist': 0.7549128, id: 1 }]

// Regex filter — matches "pufferfish", "swordfish", "clownfish"
result = await ns.query({
  limit: 10,
  filters: ["text", "Regex", "\\w+fish"],
});
console.log(result.rows);

// Count documents grouped by category
const groupedResult = await ns.query({
  aggregate_by: { count_by_category: ["Count"] },
  group_by: ["category"],
});
console.log(groupedResult.aggregation_groups);
// [
//   { category: ["fish"], count_by_category: 1 },
//   { category: ["mammal"], count_by_category: 1 },
// ]
```
```typescript
// $ npm install @turbopuffer/turbopuffer @google/genai
import { Turbopuffer } from "@turbopuffer/turbopuffer";
import { GoogleGenAI } from "@google/genai";

const tpuf = new Turbopuffer({
  apiKey: process.env.TURBOPUFFER_API_KEY, // created here: https://turbopuffer.com/dashboard
  region: "gcp-us-central1", // choose best region: https://turbopuffer.com/docs/regions
});

const namespace = process.env.TURBOPUFFER_NAMESPACE ?? `quickstart-${Math.random().toString(36).slice(2, 10)}`;
const ns = tpuf.namespace(namespace);
const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Create an embedding with Gemini.
// Requires GEMINI_API_KEY to be set (https://aistudio.google.com/app/apikey)
async function embed(text: string): Promise<number[]> {
  return (
    await gemini.models.embedContent({
      model: "gemini-embedding-001",
      contents: text,
      config: { taskType: "RETRIEVAL_DOCUMENT" },
    })
  ).embeddings![0].values!;
}

// Upsert documents with vectors and attributes
await ns.write({
  upsert_rows: [
    {
      id: 1,
      vector: await embed("walrus narwhal"),
      category: ["mammal"],
      public: true,
      text: "walrus narwhal",
    },
    {
      id: 2,
      vector: await embed("pufferfish clownfish swordfish"),
      category: ["fish"],
      public: false,
      text: "pufferfish clownfish swordfish",
    },
  ],
  distance_metric: "cosine_distance",
  schema: {
    text: {
      // Configure FTS/BM25. Other attributes have inferred types (`public`: int).
      type: "string",
      // More schema & FTS options:
      // https://turbopuffer.com/docs/write#schema
      full_text_search: true,
      regex: true,
    },
    category: { type: "[]string", full_text_search: true },
  },
});

// Query nearest neighbors with a filter
let result = await ns.query({
  rank_by: ["vector", "ANN", await embed("arctic sea mammal")],
  limit: 10,
  filters: ["public", "Eq", true],
});
console.log(result.rows);
// [{ '$dist': 0.42773545, id: 1 }]

// Full-text search on an attribute
// To combine FTS and vector search concurrently, see:
// https://turbopuffer.com/docs/hybrid-search
result = await ns.query({
  limit: 10,
  filters: ["public", "Eq", true],
  rank_by: ["Sum", [
    ["Product", 2, ["category", "BM25", "mammal"]],
    ["text", "BM25", "quick walrus"],
  ]],
});
console.log(result.rows);
// [{ '$dist': 0.7549128, id: 1 }]

// Regex filter — matches "pufferfish", "swordfish", "clownfish"
result = await ns.query({
  limit: 10,
  filters: ["text", "Regex", "\\w+fish"],
});
console.log(result.rows);

// Count documents grouped by category
const groupedResult = await ns.query({
  aggregate_by: { count_by_category: ["Count"] },
  group_by: ["category"],
});
console.log(groupedResult.aggregation_groups);
// [
//   { category: ["fish"], count_by_category: 1 },
//   { category: ["mammal"], count_by_category: 1 },
// ]
```
```typescript
// $ npm install @turbopuffer/turbopuffer openai
import { Turbopuffer } from "@turbopuffer/turbopuffer";
import OpenAI from "openai";

const tpuf = new Turbopuffer({
  apiKey: process.env.TURBOPUFFER_API_KEY, // created here: https://turbopuffer.com/dashboard
  region: "gcp-us-central1", // choose best region: https://turbopuffer.com/docs/regions
});

const namespace = process.env.TURBOPUFFER_NAMESPACE ?? `quickstart-${Math.random().toString(36).slice(2, 10)}`;
const ns = tpuf.namespace(namespace);
const fireworks = new OpenAI({
  apiKey: process.env.FIREWORKS_API_KEY,
  baseURL: "https://api.fireworks.ai/inference/v1",
});

// Create an embedding with Qwen on Fireworks.
// Requires FIREWORKS_API_KEY to be set (https://fireworks.ai/settings/users/api-keys)
async function embed(text: string): Promise<number[]> {
  return (
    await fireworks.embeddings.create({
      model: "fireworks/qwen3-embedding-8b",
      input: text,
      encoding_format: "float",
    })
  ).data[0].embedding;
}

// Upsert documents with vectors and attributes
await ns.write({
  upsert_rows: [
    {
      id: 1,
      vector: await embed("walrus narwhal"),
      category: ["mammal"],
      public: true,
      text: "walrus narwhal",
    },
    {
      id: 2,
      vector: await embed("pufferfish clownfish swordfish"),
      category: ["fish"],
      public: false,
      text: "pufferfish clownfish swordfish",
    },
  ],
  distance_metric: "cosine_distance",
  schema: {
    text: {
      // Configure FTS/BM25. Other attributes have inferred types (`public`: int).
      type: "string",
      // More schema & FTS options:
      // https://turbopuffer.com/docs/write#schema
      full_text_search: true,
      regex: true,
    },
    category: { type: "[]string", full_text_search: true },
  },
});

// Query nearest neighbors with a filter
let result = await ns.query({
  rank_by: ["vector", "ANN", await embed("arctic sea mammal")],
  limit: 10,
  filters: ["public", "Eq", true],
});
console.log(result.rows);
// [{ '$dist': 0.42773545, id: 1 }]

// Full-text search on an attribute
// To combine FTS and vector search concurrently, see:
// https://turbopuffer.com/docs/hybrid-search
result = await ns.query({
  limit: 10,
  filters: ["public", "Eq", true],
  rank_by: ["Sum", [
    ["Product", 2, ["category", "BM25", "mammal"]],
    ["text", "BM25", "quick walrus"],
  ]],
});
console.log(result.rows);
// [{ '$dist': 0.7549128, id: 1 }]

// Regex filter — matches "pufferfish", "swordfish", "clownfish"
result = await ns.query({
  limit: 10,
  filters: ["text", "Regex", "\\w+fish"],
});
console.log(result.rows);

// Count documents grouped by category
const groupedResult = await ns.query({
  aggregate_by: { count_by_category: ["Count"] },
  group_by: ["category"],
});
console.log(groupedResult.aggregation_groups);
// [
//   { category: ["fish"], count_by_category: 1 },
//   { category: ["mammal"], count_by_category: 1 },
// ]
```
```typescript
// $ npm install @turbopuffer/turbopuffer voyageai
import { Turbopuffer } from "@turbopuffer/turbopuffer";
import { VoyageAIClient } from "voyageai";

const tpuf = new Turbopuffer({
  apiKey: process.env.TURBOPUFFER_API_KEY, // created here: https://turbopuffer.com/dashboard
  region: "gcp-us-central1", // choose best region: https://turbopuffer.com/docs/regions
});

const namespace = process.env.TURBOPUFFER_NAMESPACE ?? `quickstart-${Math.random().toString(36).slice(2, 10)}`;
const ns = tpuf.namespace(namespace);
const voyage = new VoyageAIClient({ apiKey: process.env.VOYAGE_API_KEY });

// Create an embedding with Voyage.
// Requires VOYAGE_API_KEY to be set:
// https://dashboard.voyageai.com/organization/api-keys
async function embed(text: string): Promise<number[]> {
  return (await voyage.embed({
    input: text,
    model: "voyage-4-lite",
  })).data[0].embedding;
}

// Upsert documents with vectors and attributes
await ns.write({
  upsert_rows: [
    {
      id: 1,
      vector: await embed("walrus narwhal"),
      category: ["mammal"],
      public: true,
      text: "walrus narwhal",
    },
    {
      id: 2,
      vector: await embed("pufferfish clownfish swordfish"),
      category: ["fish"],
      public: false,
      text: "pufferfish clownfish swordfish",
    },
  ],
  distance_metric: "cosine_distance",
  schema: {
    text: {
      // Configure FTS/BM25. Other attributes have inferred
      // types (`category`: str, `public`: int).
      type: "string",
      // More schema & FTS options:
      // https://turbopuffer.com/docs/write#schema
      full_text_search: true,
      regex: true,
    },
    category: { type: "[]string", full_text_search: true },
  },
});

// Query nearest neighbors with a filter
let result = await ns.query({
  rank_by: ["vector", "ANN", await embed("arctic sea mammal")],
  limit: 10,
  filters: ["public", "Eq", true],
});
console.log(result.rows);
// [{ '$dist': 0.42773545, id: 1 }]

// Full-text search on an attribute
// To combine FTS and vector search concurrently, see:
// https://turbopuffer.com/docs/hybrid-search
result = await ns.query({
  limit: 10,
  filters: ["public", "Eq", true],
  rank_by: ["Sum", [
    ["Product", 2, ["category", "BM25", "mammal"]],
    ["text", "BM25", "quick walrus"],
  ]],
});
console.log(result.rows);
// [{ '$dist': 0.7549128, id: 1 }]

// Regex filter — matches "pufferfish", "swordfish", "clownfish"
result = await ns.query({
  limit: 10,
  filters: ["text", "Regex", "\\w+fish"],
});
console.log(result.rows);

// Count documents grouped by category
const groupedResult = await ns.query({
  aggregate_by: { count_by_category: ["Count"] },
  group_by: ["category"],
});
console.log(groupedResult.aggregation_groups);
// [
//   { category: ["fish"], count_by_category: 1 },
//   { category: ["mammal"], count_by_category: 1 },
// ]
```
```go
package main

import (
	"context"
	"fmt"
	"math/rand"
	"os"

	"github.com/openai/openai-go"
	"github.com/turbopuffer/turbopuffer-go/v2"
	"github.com/turbopuffer/turbopuffer-go/v2/option"
)

// Create an embedding with OpenAI, could be {Cohere, Voyage, Mixed Bread, ...}
// Requires OPENAI_API_KEY to be set (https://platform.openai.com/settings/organization/api-keys)
func openaiOrRandVector(ctx context.Context, text string) []float32 {
	if os.Getenv("OPENAI_API_KEY") == "" {
		fmt.Println("OPENAI_API_KEY not set, using random vectors")
		return []float32{rand.Float32(), rand.Float32()}
	}

	client := openai.NewClient()
	resp, err := client.Embeddings.New(ctx, openai.EmbeddingNewParams{
		Input: openai.EmbeddingNewParamsInputUnion{OfString: openai.String(text)},
		Model: openai.EmbeddingModelTextEmbedding3Small,
	})
	if err != nil {
		fmt.Printf("OpenAI error, using random vectors: %v\n", err)
		return []float32{rand.Float32(), rand.Float32()}
	}
	embedding := make([]float32, len(resp.Data[0].Embedding))
	for i, v := range resp.Data[0].Embedding {
		embedding[i] = float32(v)
	}
	return embedding
}

func main() {
	ctx := context.Background()
	tpuf := turbopuffer.NewClient(
		// API tokens are created in the dashboard: https://turbopuffer.com/dashboard
		option.WithAPIKey(os.Getenv("TURBOPUFFER_API_KEY")),
		// Pick the right region: https://turbopuffer.com/docs/regions
		option.WithRegion("gcp-us-central1"),
	)

	ns := tpuf.Namespace("quickstart-example-go")

	// Upsert documents with vectors and attributes
	_, err := ns.Write(
		ctx,
		turbopuffer.NamespaceWriteParams{
			UpsertRows: []turbopuffer.RowParam{
				{
					"id":     1,
					"vector": openaiOrRandVector(ctx, "walrus narwhal"),
					"category": "mammal",
					"public": 1,
					"text":   "walrus narwhal",
				},
				{
					"id":     2,
					"vector": openaiOrRandVector(ctx, "pufferfish clownfish swordfish"),
					"category": "fish",
					"public": 0,
					"text":   "pufferfish clownfish swordfish",
				},
			},
			DistanceMetric: turbopuffer.DistanceMetricCosineDistance,
			Schema: map[string]turbopuffer.AttributeSchemaConfigParam{
				// Configure FTS/BM25, other attributes have inferred types (category: str, public: int)
				"text": {
					Type:           "string",
					FullTextSearch: &turbopuffer.FullTextSearchConfigParam{},
				},
			},
		},
	)
	if err != nil {
		panic(err)
	}

	// Query nearest neighbors with filter
	res, err := ns.Query(
		ctx,
		turbopuffer.NamespaceQueryParams{
			RankBy: turbopuffer.NewRankByAnn("vector", openaiOrRandVector(ctx, "arctic sea mammal")),
			Limit: turbopuffer.LimitParam{
				Total: 10,
			},
			Filters: turbopuffer.NewFilterAnd([]turbopuffer.Filter{
				turbopuffer.NewFilterEq("category", "mammal"),
				turbopuffer.NewFilterEq("public", 1),
			}),
			IncludeAttributes: turbopuffer.IncludeAttributesParam{StringArray: []string{"category"}},
		},
	)
	if err != nil {
		panic(err)
	}
	fmt.Print(turbopuffer.PrettyPrint(res.Rows))
	// [{"id": 1, "vector": null, "$dist": 0.42773545, "category": "mammal"}]

	// Full-text search on an attribute
	// To combine FTS and vector search concurrently and fuse results, see https://turbopuffer.com/docs/hybrid-search
	res, err = ns.Query(
		ctx,
		turbopuffer.NamespaceQueryParams{
			Limit: turbopuffer.LimitParam{
				Total: 10,
			},
			Filters: turbopuffer.NewFilterEq("category", "mammal"),
			RankBy:  turbopuffer.NewRankByTextBM25("text", "quick walrus"),
		},
	)
	if err != nil {
		panic(err)
	}
	fmt.Print(turbopuffer.PrettyPrint(res.Rows))
	// [{"id": 1, "vector": null, "$dist": 0.7549128}]
	// Vectors can be updated by passing new data for an existing ID
	ns.Write(
		ctx,
		turbopuffer.NamespaceWriteParams{
			UpsertRows: []turbopuffer.RowParam{
				{
					"id":     1,
					"vector": openaiOrRandVector(ctx, "foo"),
					"name":   "foo",
					"public": 1,
				},
				{
					"id":     2,
					"vector": openaiOrRandVector(ctx, "foo"),
					"name":   "foo",
					"public": 1,
				},
				{
					"id":     3,
					"vector": openaiOrRandVector(ctx, "foo"),
					"name":   "foo",
					"public": 1,
				},
			},
			DistanceMetric: turbopuffer.DistanceMetricCosineDistance,
		},
	)

	// Vectors are deleted by ID.
	_, err = ns.Write(
		ctx,
		turbopuffer.NamespaceWriteParams{
			Deletes: []any{1, 3},
		},
	)
	if err != nil {
		panic(err)
	}
}
```
```go
// $ go get github.com/turbopuffer/turbopuffer-go github.com/cohere-ai/cohere-go/v2
package main

import (
	"context"
	"fmt"
	"os"
	"time"

	cohere "github.com/cohere-ai/cohere-go/v2"
	cohereclient "github.com/cohere-ai/cohere-go/v2/client"
	"github.com/turbopuffer/turbopuffer-go"
	"github.com/turbopuffer/turbopuffer-go/option"
	"github.com/turbopuffer/turbopuffer-go/packages/param"
)

// Create an embedding with Cohere.
// Requires COHERE_API_KEY to be set (https://dashboard.cohere.com/api-keys)
func embed(ctx context.Context, text string) []float32 {
	resp, err := cohereclient.NewClient(cohereclient.WithToken(os.Getenv("COHERE_API_KEY"))).V2.Embed(
		ctx,
		&cohere.V2EmbedRequest{
			Model:          "embed-v4.0",
			InputType:      cohere.EmbedInputTypeSearchDocument,
			Texts:          []string{text},
			EmbeddingTypes: []cohere.EmbeddingType{cohere.EmbeddingTypeFloat},
		},
	)
	if err != nil {
		panic(err)
	}
	return toFloat32Slice(resp.GetEmbeddings().GetFloat()[0])
}

func toFloat32Slice(values []float64) []float32 {
	out := make([]float32, len(values))
	for i, value := range values {
		out[i] = float32(value)
	}
	return out
}

func main() {
	ctx := context.Background()
	tpuf := turbopuffer.NewClient(
		option.WithAPIKey(os.Getenv("TURBOPUFFER_API_KEY")), // created here: https://turbopuffer.com/dashboard
		option.WithRegion("gcp-us-central1"), // choose best region: https://turbopuffer.com/docs/regions
	)

	namespace := os.Getenv("TURBOPUFFER_NAMESPACE")
	if namespace == "" {
		namespace = fmt.Sprintf("quickstart-%d", time.Now().UnixNano())
	}
	ns := tpuf.Namespace(namespace)

	// Upsert documents with vectors and attributes
	_, err := ns.Write(
		ctx,
		turbopuffer.NamespaceWriteParams{
			UpsertRows: []turbopuffer.RowParam{
				{
					"id":       1,
					"vector":   embed(ctx, "walrus narwhal"),
					"category": []string{"mammal"},
					"public":   true,
					"text":     "walrus narwhal",
				},
				{
					"id":       2,
					"vector":   embed(ctx, "pufferfish clownfish swordfish"),
					"category": []string{"fish"},
					"public":   false,
					"text":     "pufferfish clownfish swordfish",
				},
			},
			DistanceMetric: turbopuffer.DistanceMetricCosineDistance,
			Schema: map[string]turbopuffer.AttributeSchemaConfigParam{
				"text": {
					Type:           "string",
					FullTextSearch: &turbopuffer.FullTextSearchConfigParam{},
					Regex:          param.NewOpt(true),
				},
				"category": {
					Type:           "[]string",
					FullTextSearch: &turbopuffer.FullTextSearchConfigParam{},
				},
			},
		},
	)
	if err != nil {
		panic(err)
	}

	// Query nearest neighbors with a filter
	res, err := ns.Query(
		ctx,
		turbopuffer.NamespaceQueryParams{
			RankBy: turbopuffer.NewRankByVector("vector", embed(ctx, "arctic sea mammal")),
			Limit: turbopuffer.LimitParam{
				Total: 10,
			},
			Filters: turbopuffer.NewFilterEq("public", true),
		},
	)
	if err != nil {
		panic(err)
	}
	fmt.Print(turbopuffer.PrettyPrint(res.Rows))
	// [{"id": 1, "vector": null, "$dist": 0.42773545}]

	// Full-text search on an attribute
	// To combine FTS and vector search concurrently, see:
	// https://turbopuffer.com/docs/hybrid-search
	res, err = ns.Query(
		ctx,
		turbopuffer.NamespaceQueryParams{
			Limit: turbopuffer.LimitParam{
				Total: 10,
			},
			Filters: turbopuffer.NewFilterEq("public", true),
			RankBy: turbopuffer.NewRankBySum([]turbopuffer.RankBy{
				turbopuffer.NewRankByProduct(2, turbopuffer.NewRankByTextBM25("category", "mammal")),
				turbopuffer.NewRankByTextBM25("text", "quick walrus"),
			}),
		},
	)
	if err != nil {
		panic(err)
	}
	fmt.Print(turbopuffer.PrettyPrint(res.Rows))
	// [{"id": 1, "vector": null, "$dist": 0.7549128}]

	// Regex filter — matches "pufferfish", "swordfish", "clownfish"
	res, err = ns.Query(
		ctx,
		turbopuffer.NamespaceQueryParams{
			Limit:   turbopuffer.LimitParam{Total: 10},
			Filters: turbopuffer.NewFilterRegex("text", `\w+fish`),
		},
	)
	if err != nil {
		panic(err)
	}
	fmt.Print(turbopuffer.PrettyPrint(res.Rows))

	// Count documents grouped by category
	groupedResult, err := ns.Query(
		ctx,
		turbopuffer.NamespaceQueryParams{
			AggregateBy: map[string]turbopuffer.AggregateBy{
				"count_by_category": turbopuffer.NewAggregateByCount(),
			},
			GroupBy: []string{"category"},
		},
	)
	if err != nil {
		panic(err)
	}
	fmt.Println(turbopuffer.PrettyPrint(groupedResult.AggregationGroups))
	// [
	//   { category: ["fish"], count_by_category: 1 },
	//   { category: ["mammal"], count_by_category: 1 },
	// ]
}
```
```go
// $ go get github.com/turbopuffer/turbopuffer-go google.golang.org/genai
package main

import (
	"context"
	"fmt"
	"os"
	"time"

	"github.com/turbopuffer/turbopuffer-go"
	"github.com/turbopuffer/turbopuffer-go/option"
	"github.com/turbopuffer/turbopuffer-go/packages/param"
	"google.golang.org/genai"
)

// Create an embedding with Gemini.
// Requires GEMINI_API_KEY to be set (https://aistudio.google.com/app/apikey)
func embed(ctx context.Context, text string) []float32 {
	client, err := genai.NewClient(ctx, &genai.ClientConfig{
		APIKey:  os.Getenv("GEMINI_API_KEY"),
		Backend: genai.BackendGeminiAPI,
	})
	if err != nil {
		panic(err)
	}
	defer client.Close()

	resp, err := client.Models.EmbedContent(
		ctx,
		"gemini-embedding-001",
		[]*genai.Content{genai.NewContentFromText(text, genai.RoleUser)},
		&genai.EmbedContentRequest{TaskType: genai.TaskTypeRetrievalDocument},
	)
	if err != nil {
		panic(err)
	}
	return resp.Embeddings[0].Values
}

func main() {
	ctx := context.Background()
	tpuf := turbopuffer.NewClient(
		option.WithAPIKey(os.Getenv("TURBOPUFFER_API_KEY")), // created here: https://turbopuffer.com/dashboard
		option.WithRegion("gcp-us-central1"), // choose best region: https://turbopuffer.com/docs/regions
	)

	namespace := os.Getenv("TURBOPUFFER_NAMESPACE")
	if namespace == "" {
		namespace = fmt.Sprintf("quickstart-%d", time.Now().UnixNano())
	}
	ns := tpuf.Namespace(namespace)

	// Upsert documents with vectors and attributes
	_, err := ns.Write(
		ctx,
		turbopuffer.NamespaceWriteParams{
			UpsertRows: []turbopuffer.RowParam{
				{
					"id":       1,
					"vector":   embed(ctx, "walrus narwhal"),
					"category": []string{"mammal"},
					"public":   true,
					"text":     "walrus narwhal",
				},
				{
					"id":       2,
					"vector":   embed(ctx, "pufferfish clownfish swordfish"),
					"category": []string{"fish"},
					"public":   false,
					"text":     "pufferfish clownfish swordfish",
				},
			},
			DistanceMetric: turbopuffer.DistanceMetricCosineDistance,
			Schema: map[string]turbopuffer.AttributeSchemaConfigParam{
				"text": {
					Type:           "string",
					FullTextSearch: &turbopuffer.FullTextSearchConfigParam{},
					Regex:          param.NewOpt(true),
				},
				"category": {
					Type:           "[]string",
					FullTextSearch: &turbopuffer.FullTextSearchConfigParam{},
				},
			},
		},
	)
	if err != nil {
		panic(err)
	}

	// Query nearest neighbors with a filter
	res, err := ns.Query(
		ctx,
		turbopuffer.NamespaceQueryParams{
			RankBy: turbopuffer.NewRankByVector("vector", embed(ctx, "arctic sea mammal")),
			Limit: turbopuffer.LimitParam{
				Total: 10,
			},
			Filters: turbopuffer.NewFilterEq("public", true),
		},
	)
	if err != nil {
		panic(err)
	}
	fmt.Print(turbopuffer.PrettyPrint(res.Rows))
	// [{"id": 1, "vector": null, "$dist": 0.42773545}]

	// Full-text search on an attribute
	// To combine FTS and vector search concurrently, see:
	// https://turbopuffer.com/docs/hybrid-search
	res, err = ns.Query(
		ctx,
		turbopuffer.NamespaceQueryParams{
			Limit: turbopuffer.LimitParam{
				Total: 10,
			},
			Filters: turbopuffer.NewFilterEq("public", true),
			RankBy: turbopuffer.NewRankBySum([]turbopuffer.RankBy{
				turbopuffer.NewRankByProduct(2, turbopuffer.NewRankByTextBM25("category", "mammal")),
				turbopuffer.NewRankByTextBM25("text", "quick walrus"),
			}),
		},
	)
	if err != nil {
		panic(err)
	}
	fmt.Print(turbopuffer.PrettyPrint(res.Rows))
	// [{"id": 1, "vector": null, "$dist": 0.7549128}]

	// Regex filter — matches "pufferfish", "swordfish", "clownfish"
	res, err = ns.Query(
		ctx,
		turbopuffer.NamespaceQueryParams{
			Limit:   turbopuffer.LimitParam{Total: 10},
			Filters: turbopuffer.NewFilterRegex("text", `\w+fish`),
		},
	)
	if err != nil {
		panic(err)
	}
	fmt.Print(turbopuffer.PrettyPrint(res.Rows))

	// Count documents grouped by category
	groupedResult, err := ns.Query(
		ctx,
		turbopuffer.NamespaceQueryParams{
			AggregateBy: map[string]turbopuffer.AggregateBy{
				"count_by_category": turbopuffer.NewAggregateByCount(),
			},
			GroupBy: []string{"category"},
		},
	)
	if err != nil {
		panic(err)
	}
	fmt.Println(turbopuffer.PrettyPrint(groupedResult.AggregationGroups))
	// [
	//   { category: ["fish"], count_by_category: 1 },
	//   { category: ["mammal"], count_by_category: 1 },
	// ]
}
```
```go
// $ go get github.com/turbopuffer/turbopuffer-go github.com/openai/openai-go
package main

import (
	"context"
	"fmt"
	"os"
	"time"

	"github.com/openai/openai-go"
	openaioption "github.com/openai/openai-go/option"
	"github.com/turbopuffer/turbopuffer-go"
	tpufoption "github.com/turbopuffer/turbopuffer-go/option"
	"github.com/turbopuffer/turbopuffer-go/packages/param"
)

// Create an embedding with Qwen on Fireworks.
// Requires FIREWORKS_API_KEY to be set (https://fireworks.ai/settings/users/api-keys)
func embed(ctx context.Context, text string) []float32 {
	resp, err := openai.NewClient(
		openaioption.WithAPIKey(os.Getenv("FIREWORKS_API_KEY")),
		openaioption.WithBaseURL("https://api.fireworks.ai/inference/v1"),
	).Embeddings.New(ctx, openai.EmbeddingNewParams{
		Input: openai.EmbeddingNewParamsInputUnion{OfString: openai.String(text)},
		Model: openai.EmbeddingModel("fireworks/qwen3-embedding-8b"),
	})
	if err != nil {
		panic(err)
	}
	return toFloat32Slice(resp.Data[0].Embedding)
}

func toFloat32Slice(values []float64) []float32 {
	out := make([]float32, len(values))
	for i, value := range values {
		out[i] = float32(value)
	}
	return out
}

func main() {
	ctx := context.Background()
	tpuf := turbopuffer.NewClient(
		tpufoption.WithAPIKey(os.Getenv("TURBOPUFFER_API_KEY")), // created here: https://turbopuffer.com/dashboard
		tpufoption.WithRegion("gcp-us-central1"), // choose best region: https://turbopuffer.com/docs/regions
	)

	namespace := os.Getenv("TURBOPUFFER_NAMESPACE")
	if namespace == "" {
		namespace = fmt.Sprintf("quickstart-%d", time.Now().UnixNano())
	}
	ns := tpuf.Namespace(namespace)

	// Upsert documents with vectors and attributes
	_, err := ns.Write(
		ctx,
		turbopuffer.NamespaceWriteParams{
			UpsertRows: []turbopuffer.RowParam{
				{
					"id":       1,
					"vector":   embed(ctx, "walrus narwhal"),
					"category": []string{"mammal"},
					"public":   true,
					"text":     "walrus narwhal",
				},
				{
					"id":       2,
					"vector":   embed(ctx, "pufferfish clownfish swordfish"),
					"category": []string{"fish"},
					"public":   false,
					"text":     "pufferfish clownfish swordfish",
				},
			},
			DistanceMetric: turbopuffer.DistanceMetricCosineDistance,
			Schema: map[string]turbopuffer.AttributeSchemaConfigParam{
				"text": {
					Type:           "string",
					FullTextSearch: &turbopuffer.FullTextSearchConfigParam{},
					Regex:          param.NewOpt(true),
				},
				"category": {
					Type:           "[]string",
					FullTextSearch: &turbopuffer.FullTextSearchConfigParam{},
				},
			},
		},
	)
	if err != nil {
		panic(err)
	}

	// Query nearest neighbors with a filter
	res, err := ns.Query(
		ctx,
		turbopuffer.NamespaceQueryParams{
			RankBy: turbopuffer.NewRankByVector("vector", embed(ctx, "arctic sea mammal")),
			Limit: turbopuffer.LimitParam{
				Total: 10,
			},
			Filters: turbopuffer.NewFilterEq("public", true),
		},
	)
	if err != nil {
		panic(err)
	}
	fmt.Print(turbopuffer.PrettyPrint(res.Rows))
	// [{"id": 1, "vector": null, "$dist": 0.42773545}]

	// Full-text search on an attribute
	// To combine FTS and vector search concurrently, see:
	// https://turbopuffer.com/docs/hybrid-search
	res, err = ns.Query(
		ctx,
		turbopuffer.NamespaceQueryParams{
			Limit: turbopuffer.LimitParam{
				Total: 10,
			},
			Filters: turbopuffer.NewFilterEq("public", true),
			RankBy: turbopuffer.NewRankBySum([]turbopuffer.RankBy{
				turbopuffer.NewRankByProduct(2, turbopuffer.NewRankByTextBM25("category", "mammal")),
				turbopuffer.NewRankByTextBM25("text", "quick walrus"),
			}),
		},
	)
	if err != nil {
		panic(err)
	}
	fmt.Print(turbopuffer.PrettyPrint(res.Rows))
	// [{"id": 1, "vector": null, "$dist": 0.7549128}]

	// Regex filter — matches "pufferfish", "swordfish", "clownfish"
	res, err = ns.Query(
		ctx,
		turbopuffer.NamespaceQueryParams{
			Limit:   turbopuffer.LimitParam{Total: 10},
			Filters: turbopuffer.NewFilterRegex("text", `\w+fish`),
		},
	)
	if err != nil {
		panic(err)
	}
	fmt.Print(turbopuffer.PrettyPrint(res.Rows))

	// Count documents grouped by category
	groupedResult, err := ns.Query(
		ctx,
		turbopuffer.NamespaceQueryParams{
			AggregateBy: map[string]turbopuffer.AggregateBy{
				"count_by_category": turbopuffer.NewAggregateByCount(),
			},
			GroupBy: []string{"category"},
		},
	)
	if err != nil {
		panic(err)
	}
	fmt.Println(turbopuffer.PrettyPrint(groupedResult.AggregationGroups))
	// [
	//   { category: ["fish"], count_by_category: 1 },
	//   { category: ["mammal"], count_by_category: 1 },
	// ]
}
```
```go
// $ go get github.com/turbopuffer/turbopuffer-go github.com/openai/openai-go
package main

import (
	"context"
	"fmt"
	"os"
	"time"

	"github.com/openai/openai-go"
	openaioption "github.com/openai/openai-go/option"
	"github.com/turbopuffer/turbopuffer-go"
	tpufoption "github.com/turbopuffer/turbopuffer-go/option"
	"github.com/turbopuffer/turbopuffer-go/packages/param"
)

// Create an embedding with Voyage.
// Requires VOYAGE_API_KEY to be set:
// https://dashboard.voyageai.com/organization/api-keys
func embed(ctx context.Context, text string) []float32 {
	resp, err := openai.NewClient(
		openaioption.WithAPIKey(os.Getenv("VOYAGE_API_KEY")),
		openaioption.WithBaseURL("https://api.voyageai.com/v1"),
	).Embeddings.New(ctx, openai.EmbeddingNewParams{
		Input: openai.EmbeddingNewParamsInputUnion{OfString: openai.String(text)},
		Model: openai.EmbeddingModel("voyage-4-lite"),
	})
	if err != nil {
		panic(err)
	}
	return toFloat32Slice(resp.Data[0].Embedding)
}

func toFloat32Slice(values []float64) []float32 {
	out := make([]float32, len(values))
	for i, value := range values {
		out[i] = float32(value)
	}
	return out
}

func main() {
	ctx := context.Background()
	tpuf := turbopuffer.NewClient(
		tpufoption.WithAPIKey(os.Getenv("TURBOPUFFER_API_KEY")), // created here: https://turbopuffer.com/dashboard
		tpufoption.WithRegion("gcp-us-central1"), // choose best region: https://turbopuffer.com/docs/regions
	)

	namespace := os.Getenv("TURBOPUFFER_NAMESPACE")
	if namespace == "" {
		namespace = fmt.Sprintf("quickstart-%d", time.Now().UnixNano())
	}
	ns := tpuf.Namespace(namespace)

	// Upsert documents with vectors and attributes
	_, err := ns.Write(
		ctx,
		turbopuffer.NamespaceWriteParams{
			UpsertRows: []turbopuffer.RowParam{
				{
					"id":       1,
					"vector":   embed(ctx, "walrus narwhal"),
					"category": []string{"mammal"},
					"public":   true,
					"text":     "walrus narwhal",
				},
				{
					"id":       2,
					"vector":   embed(ctx, "pufferfish clownfish swordfish"),
					"category": []string{"fish"},
					"public":   false,
					"text":     "pufferfish clownfish swordfish",
				},
			},
			DistanceMetric: turbopuffer.DistanceMetricCosineDistance,
			Schema: map[string]turbopuffer.AttributeSchemaConfigParam{
				"text": {
					Type:           "string",
					FullTextSearch: &turbopuffer.FullTextSearchConfigParam{},
					Regex:          param.NewOpt(true),
				},
				"category": {
					Type:           "[]string",
					FullTextSearch: &turbopuffer.FullTextSearchConfigParam{},
				},
			},
		},
	)
	if err != nil {
		panic(err)
	}

	// Query nearest neighbors with a filter
	res, err := ns.Query(
		ctx,
		turbopuffer.NamespaceQueryParams{
			RankBy: turbopuffer.NewRankByVector("vector", embed(ctx, "arctic sea mammal")),
			Limit: turbopuffer.LimitParam{
				Total: 10,
			},
			Filters: turbopuffer.NewFilterEq("public", true),
		},
	)
	if err != nil {
		panic(err)
	}
	fmt.Print(turbopuffer.PrettyPrint(res.Rows))
	// [{"id": 1, "vector": null, "$dist": 0.42773545}]

	// Full-text search on an attribute
	// To combine FTS and vector search concurrently, see:
	// https://turbopuffer.com/docs/hybrid-search
	res, err = ns.Query(
		ctx,
		turbopuffer.NamespaceQueryParams{
			Limit: turbopuffer.LimitParam{
				Total: 10,
			},
			Filters: turbopuffer.NewFilterEq("public", true),
			RankBy: turbopuffer.NewRankBySum([]turbopuffer.RankBy{
				turbopuffer.NewRankByProduct(2, turbopuffer.NewRankByTextBM25("category", "mammal")),
				turbopuffer.NewRankByTextBM25("text", "quick walrus"),
			}),
		},
	)
	if err != nil {
		panic(err)
	}
	fmt.Print(turbopuffer.PrettyPrint(res.Rows))
	// [{"id": 1, "vector": null, "$dist": 0.7549128}]

	// Regex filter — matches "pufferfish", "swordfish", "clownfish"
	res, err = ns.Query(
		ctx,
		turbopuffer.NamespaceQueryParams{
			Limit:   turbopuffer.LimitParam{Total: 10},
			Filters: turbopuffer.NewFilterRegex("text", `\w+fish`),
		},
	)
	if err != nil {
		panic(err)
	}
	fmt.Print(turbopuffer.PrettyPrint(res.Rows))

	// Count documents grouped by category
	groupedResult, err := ns.Query(
		ctx,
		turbopuffer.NamespaceQueryParams{
			AggregateBy: map[string]turbopuffer.AggregateBy{
				"count_by_category": turbopuffer.NewAggregateByCount(),
			},
			GroupBy: []string{"category"},
		},
	)
	if err != nil {
		panic(err)
	}
	fmt.Println(turbopuffer.PrettyPrint(groupedResult.AggregationGroups))
	// [
	//   { category: ["fish"], count_by_category: 1 },
	//   { category: ["mammal"], count_by_category: 1 },
	// ]
}
```
```java
// dependencies {
//     implementation("com.turbopuffer:turbopuffer-java:+")
//     implementation("com.openai:openai-java:+")
// }

package com.turbopuffer.docs;

import com.openai.client.okhttp.*;
import com.openai.errors.*;
import com.openai.models.embeddings.*;
import com.turbopuffer.client.okhttp.*;
import com.turbopuffer.models.namespaces.*;
import java.util.*;

public class QuickStart {

  public static void main(String[] args) {
    var tpuf = TurbopufferOkHttpClient.builder()
      .fromEnv()
      // API tokens are created in the dashboard: https://turbopuffer.com/dashboard
      .apiKey(System.getenv("TURBOPUFFER_API_KEY"))
      // Pick the right region: https://turbopuffer.com/docs/regions
      .region("gcp-us-central1")
      .build();

    var ns = tpuf.namespace("quickstart-example-java");

    // Upsert documents with vectors and attributes
    ns.write(
      NamespaceWriteParams.builder()
        .addUpsertRow(
          Row.builder()
            .put("id", 1)
            .put("vector", openAiOrRandVector("walrus narwhal"))
            .put("category", "mammal")
            .put("public", 1)
            .put("text", "walrus narwhal")
            .build()
        )
        .addUpsertRow(
          Row.builder()
            .put("id", 2)
            .put("vector", openAiOrRandVector("pufferfish clownfish swordfish"))
            .put("category", "fish")
            .put("public", 0)
            .put("text", "pufferfish clownfish swordfish")
            .build()
        )
        .distanceMetric(DistanceMetric.COSINE_DISTANCE)
        .schema(
          Schema.builder()
            .put(
              "text",
              AttributeSchemaConfig.builder()
                .type("string")
                // More schema & FTS options
                // https://turbopuffer.com/docs/write#schema
                .fullTextSearch(FullTextSearchConfig.defaults())
                .build()
            )
            .build()
        )
        .build()
    );

    // Query nearest neighbors with filter
    var queryResult = ns.query(
      NamespaceQueryParams.builder()
        .rankBy(RankBy.ann("vector", openAiOrRandVector("arctic sea mammal")))
        .limit(10)
        .filters(Filter.and(Filter.eq("category", "mammal"), Filter.eq("public", 1)))
        .includeAttributes("category")
        .build()
    );
    System.out.println(queryResult);
    // NamespaceQueryResponse{rows=[{$dist=0.42773545, id=1, category=mammal}]}

    // Full-text search on an attribute
    // To combine FTS and vector search concurrently and fuse results, see https://turbopuffer.com/docs/hybrid-search
    var ftsResult = ns.query(
      NamespaceQueryParams.builder()
        .limit(10)
        .filters(Filter.eq("category", "mammal"))
        .rankBy(RankByText.bm25("text", "quick walrus"))
        .build()
    );
    System.out.println(ftsResult);
    // NamespaceQueryResponse{rows=[{$dist=0.7549128, id=1}]}
    // Vectors can be updated by passing new data for an existing ID
    ns.write(
      NamespaceWriteParams.builder()
        .addUpsertRow(
          Row.builder()
            .put("id", 1)
            .put("vector", openAiOrRandVector("foo"))
            .put("name", "foo")
            .put("public", 1)
            .build()
        )
        .addUpsertRow(
          Row.builder()
            .put("id", 2)
            .put("vector", openAiOrRandVector("foo"))
            .put("name", "foo")
            .put("public", 1)
            .build()
        )
        .addUpsertRow(
          Row.builder()
            .put("id", 3)
            .put("vector", openAiOrRandVector("foo"))
            .put("name", "foo")
            .put("public", 1)
            .build()
        )
        .distanceMetric(DistanceMetric.COSINE_DISTANCE)
        .build()
    );

    // Vectors are deleted by ID.
    ns.write(NamespaceWriteParams.builder().addDelete(1).addDelete(3).build());
  }

  // Create an embedding with OpenAI, could be {Cohere, Voyage, Mixed Bread, ...}
  // Requires OPENAI_API_KEY to be set (https://platform.openai.com/settings/organization/api-keys)
  public static List<Float> openAiOrRandVector(String text) {
    if (System.getenv("OPENAI_API_KEY") == null) {
      System.out.println("OPENAI_API_KEY not set, using random vectors");
      return randVector();
    }
    var client = OpenAIOkHttpClient.fromEnv();
    try {
      var params = EmbeddingCreateParams.builder()
        .input(text)
        .model(EmbeddingModel.TEXT_EMBEDDING_3_SMALL)
        .build();
      var response = client.embeddings().create(params);
      return response.data().get(0).embedding();
    } catch (OpenAIException e) {
      System.out.println("OpenAI error, using random vectors: " + e.getMessage());
      return randVector();
    }
  }

  public static List<Float> randVector() {
    Random rand = new Random();
    List<Float> vector = new java.util.ArrayList<>(2);
    vector.add(rand.nextFloat());
    vector.add(rand.nextFloat());
    return vector;
  }
}
```
```java
// Gradle: implementation("com.turbopuffer:turbopuffer-java:+"), implementation("com.cohere:cohere-java:+")
package com.turbopuffer.docs;

import com.cohere.api.Cohere;
import com.cohere.api.resources.v2.requests.V2EmbedRequest;
import com.cohere.api.types.EmbedInputType;
import com.turbopuffer.client.okhttp.*;
import com.turbopuffer.models.namespaces.*;
import java.util.*;

class QuickStartCohere {

  public static void main(String[] args) {
    var tpuf = TurbopufferOkHttpClient.builder()
      .fromEnv()
      .apiKey(System.getenv("TURBOPUFFER_API_KEY")) // created here: https://turbopuffer.com/dashboard
      .region("gcp-us-central1") // choose best region: https://turbopuffer.com/docs/regions
      .build();

    var namespace = Optional.ofNullable(System.getenv("TURBOPUFFER_NAMESPACE")).orElse(
      "quickstart-" + UUID.randomUUID().toString().substring(0, 8)
    );
    var ns = tpuf.namespace(namespace);

    // Upsert documents with vectors and attributes
    ns.write(
      NamespaceWriteParams.builder()
        .addUpsertRow(
          Row.builder()
            .put("id", 1)
            .put("vector", embed("walrus narwhal"))
            .put("category", List.of("mammal"))
            .put("public", true)
            .put("text", "walrus narwhal")
            .build()
        )
        .addUpsertRow(
          Row.builder()
            .put("id", 2)
            .put("vector", embed("pufferfish clownfish swordfish"))
            .put("category", List.of("fish"))
            .put("public", false)
            .put("text", "pufferfish clownfish swordfish")
            .build()
        )
        .distanceMetric(DistanceMetric.COSINE_DISTANCE)
        .schema(
          Schema.builder()
            .put(
              "text",
              AttributeSchemaConfig.builder()
                .type("string")
                // More schema & FTS options:
                // https://turbopuffer.com/docs/write#schema
                .fullTextSearch(FullTextSearchConfig.defaults())
                .regex(true)
                .build()
            )
            .put(
              "category",
              AttributeSchemaConfig.builder()
                .type("[]string")
                .fullTextSearch(FullTextSearchConfig.defaults())
                .build()
            )
            .build()
        )
        .build()
    );

    // Query nearest neighbors with a filter
    var queryResult = ns.query(
      NamespaceQueryParams.builder()
        .rankBy(RankBy.vector("vector", embed("arctic sea mammal")))
        .limit(10)
        .filters(Filter.eq("public", true))
        .build()
    );
    System.out.println(queryResult);
    // NamespaceQueryResponse{rows=[{$dist=0.42773545, id=1}]}

    // Full-text search on an attribute
    // To combine FTS and vector search concurrently, see:
    // https://turbopuffer.com/docs/hybrid-search
    var ftsResult = ns.query(
      NamespaceQueryParams.builder()
        .limit(10)
        .filters(Filter.eq("public", true))
        .rankBy(
          RankByText.sum(
            RankByText.product(2, RankByText.bm25("category", "mammal")),
            RankByText.bm25("text", "quick walrus")
          )
        )
        .build()
    );
    System.out.println(ftsResult);
    // NamespaceQueryResponse{rows=[{$dist=0.7549128, id=1}]}

    // Regex filter — matches "pufferfish", "swordfish", "clownfish"
    var regexResult = ns.query(
      NamespaceQueryParams.builder().limit(10).filters(Filter.regex("text", "\\w+fish")).build()
    );
    System.out.println(regexResult);

    // Count documents grouped by category
    var groupedResult = ns.query(
      NamespaceQueryParams.builder()
        .aggregateBy(Map.of("count_by_category", AggregateBy.count("id")))
        .groupBy(List.of("category"))
        .build()
    );
    System.out.println(groupedResult.aggregationGroups().get());
    // [{category=[fish], count_by_category=1}, {category=[mammal], count_by_category=1}]
  }

  // Create an embedding with Cohere.
  // Requires COHERE_API_KEY to be set (https://dashboard.cohere.com/api-keys)
  public static List<Float> embed(String text) {
    var response = Cohere.builder()
      .token(System.getenv("COHERE_API_KEY"))
      .clientName("turbopuffer-quickstart")
      .build()
      .v2()
      .embed(
        V2EmbedRequest.builder()
          .model("embed-v4.0")
          .inputType(EmbedInputType.SEARCH_DOCUMENT)
          .texts(List.of(text))
          .build()
      );
    return response
      .getEmbeddings()
      .getFloat()
      .orElseThrow()
      .get(0)
      .stream()
      .map(Double::floatValue)
      .toList();
  }
}
```
```java
// Gradle: implementation("com.turbopuffer:turbopuffer-java:+"), implementation("com.google.genai:google-genai:+")
package com.turbopuffer.docs;

import com.google.genai.Client;
import com.google.genai.types.EmbedContentConfig;
import com.turbopuffer.client.okhttp.*;
import com.turbopuffer.models.namespaces.*;
import java.util.*;

class QuickStartGemini {

  public static void main(String[] args) {
    var tpuf = TurbopufferOkHttpClient.builder()
      .fromEnv()
      .apiKey(System.getenv("TURBOPUFFER_API_KEY")) // created here: https://turbopuffer.com/dashboard
      .region("gcp-us-central1") // choose best region: https://turbopuffer.com/docs/regions
      .build();

    var namespace = Optional.ofNullable(System.getenv("TURBOPUFFER_NAMESPACE")).orElse(
      "quickstart-" + UUID.randomUUID().toString().substring(0, 8)
    );
    var ns = tpuf.namespace(namespace);

    // Upsert documents with vectors and attributes
    ns.write(
      NamespaceWriteParams.builder()
        .addUpsertRow(
          Row.builder()
            .put("id", 1)
            .put("vector", embed("walrus narwhal"))
            .put("category", List.of("mammal"))
            .put("public", true)
            .put("text", "walrus narwhal")
            .build()
        )
        .addUpsertRow(
          Row.builder()
            .put("id", 2)
            .put("vector", embed("pufferfish clownfish swordfish"))
            .put("category", List.of("fish"))
            .put("public", false)
            .put("text", "pufferfish clownfish swordfish")
            .build()
        )
        .distanceMetric(DistanceMetric.COSINE_DISTANCE)
        .schema(
          Schema.builder()
            .put(
              "text",
              AttributeSchemaConfig.builder()
                .type("string")
                // More schema & FTS options:
                // https://turbopuffer.com/docs/write#schema
                .fullTextSearch(FullTextSearchConfig.defaults())
                .regex(true)
                .build()
            )
            .put(
              "category",
              AttributeSchemaConfig.builder()
                .type("[]string")
                .fullTextSearch(FullTextSearchConfig.defaults())
                .build()
            )
            .build()
        )
        .build()
    );

    // Query nearest neighbors with a filter
    var queryResult = ns.query(
      NamespaceQueryParams.builder()
        .rankBy(RankBy.vector("vector", embed("arctic sea mammal")))
        .limit(10)
        .filters(Filter.eq("public", true))
        .build()
    );
    System.out.println(queryResult);
    // NamespaceQueryResponse{rows=[{$dist=0.42773545, id=1}]}

    // Full-text search on an attribute
    // To combine FTS and vector search concurrently, see:
    // https://turbopuffer.com/docs/hybrid-search
    var ftsResult = ns.query(
      NamespaceQueryParams.builder()
        .limit(10)
        .filters(Filter.eq("public", true))
        .rankBy(
          RankByText.sum(
            RankByText.product(2, RankByText.bm25("category", "mammal")),
            RankByText.bm25("text", "quick walrus")
          )
        )
        .build()
    );
    System.out.println(ftsResult);
    // NamespaceQueryResponse{rows=[{$dist=0.7549128, id=1}]}

    // Regex filter — matches "pufferfish", "swordfish", "clownfish"
    var regexResult = ns.query(
      NamespaceQueryParams.builder().limit(10).filters(Filter.regex("text", "\\w+fish")).build()
    );
    System.out.println(regexResult);

    // Count documents grouped by category
    var groupedResult = ns.query(
      NamespaceQueryParams.builder()
        .aggregateBy(Map.of("count_by_category", AggregateBy.count("id")))
        .groupBy(List.of("category"))
        .build()
    );
    System.out.println(groupedResult.aggregationGroups().get());
    // [{category=[fish], count_by_category=1}, {category=[mammal], count_by_category=1}]
  }

  // Create an embedding with Gemini.
  // Requires GEMINI_API_KEY to be set (https://aistudio.google.com/app/apikey)
  public static List<Float> embed(String text) {
    try (Client client = Client.builder().apiKey(System.getenv("GEMINI_API_KEY")).build()) {
      return client.models
        .embedContent(
          "gemini-embedding-001",
          text,
          EmbedContentConfig.builder().taskType("RETRIEVAL_DOCUMENT").build()
        )
        .embeddings()
        .orElseThrow()
        .get(0)
        .values()
        .orElseThrow();
    }
  }
}
```
```java
// Gradle: implementation("com.turbopuffer:turbopuffer-java:+"), implementation("com.openai:openai-java:+")
package com.turbopuffer.docs;

import com.openai.client.okhttp.*;
import com.openai.models.embeddings.*;
import com.turbopuffer.client.okhttp.*;
import com.turbopuffer.models.namespaces.*;
import java.util.*;

class QuickStartQwen {

  public static void main(String[] args) {
    var tpuf = TurbopufferOkHttpClient.builder()
      .fromEnv()
      .apiKey(System.getenv("TURBOPUFFER_API_KEY")) // created here: https://turbopuffer.com/dashboard
      .region("gcp-us-central1") // choose best region: https://turbopuffer.com/docs/regions
      .build();

    var namespace = Optional.ofNullable(System.getenv("TURBOPUFFER_NAMESPACE")).orElse(
      "quickstart-" + UUID.randomUUID().toString().substring(0, 8)
    );
    var ns = tpuf.namespace(namespace);

    // Upsert documents with vectors and attributes
    ns.write(
      NamespaceWriteParams.builder()
        .addUpsertRow(
          Row.builder()
            .put("id", 1)
            .put("vector", embed("walrus narwhal"))
            .put("category", List.of("mammal"))
            .put("public", true)
            .put("text", "walrus narwhal")
            .build()
        )
        .addUpsertRow(
          Row.builder()
            .put("id", 2)
            .put("vector", embed("pufferfish clownfish swordfish"))
            .put("category", List.of("fish"))
            .put("public", false)
            .put("text", "pufferfish clownfish swordfish")
            .build()
        )
        .distanceMetric(DistanceMetric.COSINE_DISTANCE)
        .schema(
          Schema.builder()
            .put(
              "text",
              AttributeSchemaConfig.builder()
                .type("string")
                // More schema & FTS options:
                // https://turbopuffer.com/docs/write#schema
                .fullTextSearch(FullTextSearchConfig.defaults())
                .regex(true)
                .build()
            )
            .put(
              "category",
              AttributeSchemaConfig.builder()
                .type("[]string")
                .fullTextSearch(FullTextSearchConfig.defaults())
                .build()
            )
            .build()
        )
        .build()
    );

    // Query nearest neighbors with a filter
    var queryResult = ns.query(
      NamespaceQueryParams.builder()
        .rankBy(RankBy.vector("vector", embed("arctic sea mammal")))
        .limit(10)
        .filters(Filter.eq("public", true))
        .build()
    );
    System.out.println(queryResult);
    // NamespaceQueryResponse{rows=[{$dist=0.42773545, id=1}]}

    // Full-text search on an attribute
    // To combine FTS and vector search concurrently, see:
    // https://turbopuffer.com/docs/hybrid-search
    var ftsResult = ns.query(
      NamespaceQueryParams.builder()
        .limit(10)
        .filters(Filter.eq("public", true))
        .rankBy(
          RankByText.sum(
            RankByText.product(2, RankByText.bm25("category", "mammal")),
            RankByText.bm25("text", "quick walrus")
          )
        )
        .build()
    );
    System.out.println(ftsResult);
    // NamespaceQueryResponse{rows=[{$dist=0.7549128, id=1}]}

    // Regex filter — matches "pufferfish", "swordfish", "clownfish"
    var regexResult = ns.query(
      NamespaceQueryParams.builder().limit(10).filters(Filter.regex("text", "\\w+fish")).build()
    );
    System.out.println(regexResult);

    // Count documents grouped by category
    var groupedResult = ns.query(
      NamespaceQueryParams.builder()
        .aggregateBy(Map.of("count_by_category", AggregateBy.count("id")))
        .groupBy(List.of("category"))
        .build()
    );
    System.out.println(groupedResult.aggregationGroups().get());
    // [{category=[fish], count_by_category=1}, {category=[mammal], count_by_category=1}]
  }

  // Create an embedding with Qwen on Fireworks.
  // Requires FIREWORKS_API_KEY to be set (https://fireworks.ai/settings/users/api-keys)
  public static List<Float> embed(String text) {
    var client = OpenAIOkHttpClient.builder()
      .apiKey(System.getenv("FIREWORKS_API_KEY"))
      .baseUrl("https://api.fireworks.ai/inference/v1")
      .build();
    return client
      .embeddings()
      .create(
        EmbeddingCreateParams.builder()
          .input(text)
          .model(EmbeddingModel.of("fireworks/qwen3-embedding-8b"))
          .build()
      )
      .data()
      .get(0)
      .embedding();
  }
}
```
```java
// Gradle: implementation("com.turbopuffer:turbopuffer-java:+"), implementation("com.openai:openai-java:+")
package com.turbopuffer.docs;

import com.openai.client.okhttp.*;
import com.openai.models.embeddings.*;
import com.turbopuffer.client.okhttp.*;
import com.turbopuffer.models.namespaces.*;
import java.util.*;

class QuickStartVoyage {

  public static void main(String[] args) {
    var tpuf = TurbopufferOkHttpClient.builder()
      .fromEnv()
      .apiKey(System.getenv("TURBOPUFFER_API_KEY")) // created here: https://turbopuffer.com/dashboard
      .region("gcp-us-central1") // choose best region: https://turbopuffer.com/docs/regions
      .build();

    var namespace = Optional.ofNullable(System.getenv("TURBOPUFFER_NAMESPACE")).orElse(
      "quickstart-" + UUID.randomUUID().toString().substring(0, 8)
    );
    var ns = tpuf.namespace(namespace);

    // Upsert documents with vectors and attributes
    ns.write(
      NamespaceWriteParams.builder()
        .addUpsertRow(
          Row.builder()
            .put("id", 1)
            .put("vector", embed("walrus narwhal"))
            .put("category", List.of("mammal"))
            .put("public", true)
            .put("text", "walrus narwhal")
            .build()
        )
        .addUpsertRow(
          Row.builder()
            .put("id", 2)
            .put("vector", embed("pufferfish clownfish swordfish"))
            .put("category", List.of("fish"))
            .put("public", false)
            .put("text", "pufferfish clownfish swordfish")
            .build()
        )
        .distanceMetric(DistanceMetric.COSINE_DISTANCE)
        .schema(
          Schema.builder()
            .put(
              "text",
              AttributeSchemaConfig.builder()
                .type("string")
                // More schema & FTS options:
                // https://turbopuffer.com/docs/write#schema
                .fullTextSearch(FullTextSearchConfig.defaults())
                .regex(true)
                .build()
            )
            .put(
              "category",
              AttributeSchemaConfig.builder()
                .type("[]string")
                .fullTextSearch(FullTextSearchConfig.defaults())
                .build()
            )
            .build()
        )
        .build()
    );

    // Query nearest neighbors with a filter
    var queryResult = ns.query(
      NamespaceQueryParams.builder()
        .rankBy(RankBy.vector("vector", embed("arctic sea mammal")))
        .limit(10)
        .filters(Filter.eq("public", true))
        .build()
    );
    System.out.println(queryResult);
    // NamespaceQueryResponse{rows=[{$dist=0.42773545, id=1}]}

    // Full-text search on an attribute
    // To combine FTS and vector search concurrently, see:
    // https://turbopuffer.com/docs/hybrid-search
    var ftsResult = ns.query(
      NamespaceQueryParams.builder()
        .limit(10)
        .filters(Filter.eq("public", true))
        .rankBy(
          RankByText.sum(
            RankByText.product(2, RankByText.bm25("category", "mammal")),
            RankByText.bm25("text", "quick walrus")
          )
        )
        .build()
    );
    System.out.println(ftsResult);
    // NamespaceQueryResponse{rows=[{$dist=0.7549128, id=1}]}

    // Regex filter — matches "pufferfish", "swordfish", "clownfish"
    var regexResult = ns.query(
      NamespaceQueryParams.builder().limit(10).filters(Filter.regex("text", "\\w+fish")).build()
    );
    System.out.println(regexResult);

    // Count documents grouped by category
    var groupedResult = ns.query(
      NamespaceQueryParams.builder()
        .aggregateBy(Map.of("count_by_category", AggregateBy.count("id")))
        .groupBy(List.of("category"))
        .build()
    );
    System.out.println(groupedResult.aggregationGroups().get());
    // [{category=[fish], count_by_category=1}, {category=[mammal], count_by_category=1}]
  }

  // Create an embedding with Voyage.
  // Requires VOYAGE_API_KEY to be set:
  // https://dashboard.voyageai.com/organization/api-keys
  public static List<Float> embed(String text) {
    var client = OpenAIOkHttpClient.builder()
      .apiKey(System.getenv("VOYAGE_API_KEY"))
      .baseUrl("https://api.voyageai.com/v1")
      .build();
    return client
      .embeddings()
      .create(
        EmbeddingCreateParams.builder()
          .input(text)
          .model(EmbeddingModel.of("voyage-4-lite"))
          .build()
      )
      .data()
      .get(0)
      .embedding();
  }
}
```
```cs
// dotnet add package Turbopuffer
// dotnet add package OpenAI
using System;
using System.Collections.Generic;
using System.Linq;
using OpenAI.Embeddings;
using Turbopuffer;
using Turbopuffer.Models.Namespaces;

using var tpuf = new TurbopufferClient
{
    // API tokens are created in the dashboard: https://turbopuffer.com/dashboard
    // Loaded from TURBOPUFFER_API_KEY env var by default. Override if necessary:
    // ApiKey = "...",

    // Pick the right region: https://turbopuffer.com/docs/regions
    Region = "gcp-us-central1",
};

var ns = tpuf.Namespace("quickstart-example-csharp");

// Upsert documents with vectors and attributes
await ns.Write(
    new NamespaceWriteParams
    {
        UpsertRows =
        [
            new Row()
                .Set("id", 1)
                .Set("vector", OpenAiOrRandVector("walrus narwhal"))
                .Set("category", "mammal")
                .Set("public", 1)
                .Set("text", "walrus narwhal"),
            new Row()
                .Set("id", 2)
                .Set("vector", OpenAiOrRandVector("pufferfish clownfish swordfish"))
                .Set("category", "fish")
                .Set("public", 0)
                .Set("text", "pufferfish clownfish swordfish"),
        ],
        DistanceMetric = DistanceMetric.CosineDistance,
        Schema = new Dictionary<string, AttributeSchemaConfig>
        {
            ["text"] = new AttributeSchemaConfig
            {
                Type = "string",
                // More schema & FTS options
                // https://turbopuffer.com/docs/write#schema
                FullTextSearch = true,
            },
        },
    }
);

// Query nearest neighbors with filter
var queryResult = await ns.Query(
    new NamespaceQueryParams
    {
        RankBy = RankBy.Ann("vector", OpenAiOrRandVector("arctic sea mammal")),
        Limit = 10,
        Filters = Filter.And(Filter.Eq("category", "mammal"), Filter.Eq("public", 1)),
        IncludeAttributes = new List<string> { "category" },
    }
);
foreach (var row in queryResult.GetRows())
{
    Console.WriteLine(row);
}
// {"$dist": 0.42773545, "id": 1, "category": "mammal"}

// Full-text search on an attribute
// To combine FTS and vector search concurrently and fuse results, see https://turbopuffer.com/docs/hybrid-search
var ftsResult = await ns.Query(
    new NamespaceQueryParams
    {
        Limit = 10,
        Filters = Filter.Eq("category", "mammal"),
        RankBy = RankByText.BM25("text", "quick walrus"),
    }
);
foreach (var row in ftsResult.GetRows())
{
    Console.WriteLine(row);
}
// {"$dist": 0.7549128, "id": 1}

// Vectors can be updated by passing new data for an existing ID
await ns.Write(
    new NamespaceWriteParams
    {
        UpsertRows =
        [
            new Row().Set("id", 1).Set("vector", OpenAiOrRandVector("foo")).Set("name", "foo").Set("public", 1),
            new Row().Set("id", 2).Set("vector", OpenAiOrRandVector("foo")).Set("name", "foo").Set("public", 1),
            new Row().Set("id", 3).Set("vector", OpenAiOrRandVector("foo")).Set("name", "foo").Set("public", 1),
        ],
        DistanceMetric = DistanceMetric.CosineDistance,
    }
);

// Vectors are deleted by ID.
await ns.Write(new NamespaceWriteParams { Deletes = [1L, 3L] });

// Create an embedding with OpenAI, could be {Cohere, Voyage, Mixed Bread, ...}
// Requires OPENAI_API_KEY to be set (https://platform.openai.com/settings/organization/api-keys)
static List<float> OpenAiOrRandVector(string text)
{
    if (Environment.GetEnvironmentVariable("OPENAI_API_KEY") == null)
    {
        Console.WriteLine("OPENAI_API_KEY not set, using random vectors");
        return RandVector();
    }
    try
    {
        var client = new EmbeddingClient(
            "text-embedding-3-small",
            Environment.GetEnvironmentVariable("OPENAI_API_KEY")
        );
        return [.. client.GenerateEmbedding(text).Value.ToFloats().Span];
    }
    catch (Exception e)
    {
        Console.WriteLine($"OpenAI error, using random vectors: {e.Message}");
        return RandVector();
    }
}

static List<float> RandVector()
{
    return new List<float> { (float)Random.Shared.NextDouble(), (float)Random.Shared.NextDouble() };
}
```
```cs
// dotnet add package Turbopuffer
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using Turbopuffer;
using Turbopuffer.Models.Namespaces;

using var tpuf = new TurbopufferClient
{
    Region = "gcp-us-central1", // choose best region: https://turbopuffer.com/docs/regions
};

var namespaceName =
    Environment.GetEnvironmentVariable("TURBOPUFFER_NAMESPACE")
    ?? $"quickstart-{Guid.NewGuid().ToString("N").Substring(0, 8)}";
var ns = tpuf.Namespace(namespaceName);

// Upsert documents with vectors and attributes
await ns.Write(
    new NamespaceWriteParams
    {
        UpsertRows =
        [
            new Row()
                .Set("id", 1)
                .Set("vector", Embed("walrus narwhal"))
                .Set("category", new[] { "mammal" })
                .Set("public", true)
                .Set("text", "walrus narwhal"),
            new Row()
                .Set("id", 2)
                .Set("vector", Embed("pufferfish clownfish swordfish"))
                .Set("category", new[] { "fish" })
                .Set("public", false)
                .Set("text", "pufferfish clownfish swordfish"),
        ],
        DistanceMetric = DistanceMetric.CosineDistance,
        Schema = new Dictionary<string, AttributeSchemaConfig>
        {
            ["text"] = new AttributeSchemaConfig
            {
                Type = "string",
                // More schema & FTS options:
                // https://turbopuffer.com/docs/write#schema
                FullTextSearch = true,
                Regex = true,
            },
            ["category"] = new AttributeSchemaConfig { Type = "[]string", FullTextSearch = true },
        },
    }
);

// Query nearest neighbors with a filter
var queryResult = await ns.Query(
    new NamespaceQueryParams
    {
        RankBy = RankBy.Ann("vector", Embed("arctic sea mammal")),
        Limit = 10,
        Filters = Filter.Eq("public", true),
    }
);
foreach (var row in queryResult.GetRows())
{
    Console.WriteLine(row);
}

// Full-text search on an attribute
// To combine FTS and vector search concurrently, see:
// https://turbopuffer.com/docs/hybrid-search
var ftsResult = await ns.Query(
    new NamespaceQueryParams
    {
        Limit = 10,
        Filters = Filter.Eq("public", true),
        RankBy = RankByText.Sum(
            RankByText.Product(2, RankByText.BM25("category", "mammal")),
            RankByText.BM25("text", "quick walrus")
        ),
    }
);
foreach (var row in ftsResult.GetRows())
{
    Console.WriteLine(row);
}

// Regex filter — matches "pufferfish", "swordfish", "clownfish"
var regexResult = await ns.Query(
    new NamespaceQueryParams { Limit = 10, Filters = Filter.Regex("text", "\\w+fish") }
);
foreach (var row in regexResult.GetRows())
{
    Console.WriteLine(row);
}

// Count documents grouped by category
var groupedResult = await ns.Query(
    new NamespaceQueryParams
    {
        AggregateBy = new Dictionary<string, AggregateBy>
        {
            ["count_by_category"] = AggregateBy.Count("id"),
        },
        GroupBy = [GroupBy.Attr("category")],
    }
);
foreach (var group in groupedResult.GetAggregationGroups())
{
    Console.WriteLine(group);
}

// Create an embedding with Cohere.
// Requires COHERE_API_KEY to be set (https://dashboard.cohere.com/api-keys)
static List<float> Embed(string text)
{
    using var http = new HttpClient();
    var request = new HttpRequestMessage(HttpMethod.Post, "https://api.cohere.com/v2/embed")
    {
        Content = new StringContent(
            JsonSerializer.Serialize(
                new
                {
                    model = "embed-v4.0",
                    input_type = "search_document",
                    texts = new[] { text },
                    embedding_types = new[] { "float" },
                }
            ),
            Encoding.UTF8,
            "application/json"
        ),
    };
    request.Headers.Authorization = new AuthenticationHeaderValue(
        "Bearer",
        Environment.GetEnvironmentVariable("COHERE_API_KEY")
    );
    var response = http.Send(request);
    response.EnsureSuccessStatusCode();
    using var doc = JsonDocument.Parse(response.Content.ReadAsStream());
    return doc
        .RootElement.GetProperty("embeddings")
        .GetProperty("float")[0]
        .EnumerateArray()
        .Select(v => v.GetSingle())
        .ToList();
}
```
```cs
// dotnet add package Turbopuffer
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using Turbopuffer;
using Turbopuffer.Models.Namespaces;

using var tpuf = new TurbopufferClient
{
    Region = "gcp-us-central1", // choose best region: https://turbopuffer.com/docs/regions
};

var namespaceName =
    Environment.GetEnvironmentVariable("TURBOPUFFER_NAMESPACE")
    ?? $"quickstart-{Guid.NewGuid().ToString("N").Substring(0, 8)}";
var ns = tpuf.Namespace(namespaceName);

// Upsert documents with vectors and attributes
await ns.Write(
    new NamespaceWriteParams
    {
        UpsertRows =
        [
            new Row()
                .Set("id", 1)
                .Set("vector", Embed("walrus narwhal"))
                .Set("category", new[] { "mammal" })
                .Set("public", true)
                .Set("text", "walrus narwhal"),
            new Row()
                .Set("id", 2)
                .Set("vector", Embed("pufferfish clownfish swordfish"))
                .Set("category", new[] { "fish" })
                .Set("public", false)
                .Set("text", "pufferfish clownfish swordfish"),
        ],
        DistanceMetric = DistanceMetric.CosineDistance,
        Schema = new Dictionary<string, AttributeSchemaConfig>
        {
            ["text"] = new AttributeSchemaConfig
            {
                Type = "string",
                // More schema & FTS options:
                // https://turbopuffer.com/docs/write#schema
                FullTextSearch = true,
                Regex = true,
            },
            ["category"] = new AttributeSchemaConfig { Type = "[]string", FullTextSearch = true },
        },
    }
);

// Query nearest neighbors with a filter
var queryResult = await ns.Query(
    new NamespaceQueryParams
    {
        RankBy = RankBy.Ann("vector", Embed("arctic sea mammal")),
        Limit = 10,
        Filters = Filter.Eq("public", true),
    }
);
foreach (var row in queryResult.GetRows())
{
    Console.WriteLine(row);
}

// Full-text search on an attribute
// To combine FTS and vector search concurrently, see:
// https://turbopuffer.com/docs/hybrid-search
var ftsResult = await ns.Query(
    new NamespaceQueryParams
    {
        Limit = 10,
        Filters = Filter.Eq("public", true),
        RankBy = RankByText.Sum(
            RankByText.Product(2, RankByText.BM25("category", "mammal")),
            RankByText.BM25("text", "quick walrus")
        ),
    }
);
foreach (var row in ftsResult.GetRows())
{
    Console.WriteLine(row);
}

// Regex filter — matches "pufferfish", "swordfish", "clownfish"
var regexResult = await ns.Query(
    new NamespaceQueryParams { Limit = 10, Filters = Filter.Regex("text", "\\w+fish") }
);
foreach (var row in regexResult.GetRows())
{
    Console.WriteLine(row);
}

// Count documents grouped by category
var groupedResult = await ns.Query(
    new NamespaceQueryParams
    {
        AggregateBy = new Dictionary<string, AggregateBy>
        {
            ["count_by_category"] = AggregateBy.Count("id"),
        },
        GroupBy = [GroupBy.Attr("category")],
    }
);
foreach (var group in groupedResult.GetAggregationGroups())
{
    Console.WriteLine(group);
}

// Create an embedding with Gemini.
// Requires GEMINI_API_KEY to be set (https://aistudio.google.com/app/apikey)
static List<float> Embed(string text)
{
    var apiKey = Environment.GetEnvironmentVariable("GEMINI_API_KEY");
    using var http = new HttpClient();
    var request = new HttpRequestMessage(
        HttpMethod.Post,
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent?key="
            + apiKey
    )
    {
        Content = new StringContent(
            JsonSerializer.Serialize(
                new
                {
                    model = "models/gemini-embedding-001",
                    content = new { parts = new[] { new { text } } },
                    taskType = "RETRIEVAL_DOCUMENT",
                }
            ),
            Encoding.UTF8,
            "application/json"
        ),
    };
    var response = http.Send(request);
    response.EnsureSuccessStatusCode();
    using var doc = JsonDocument.Parse(response.Content.ReadAsStream());
    return doc
        .RootElement.GetProperty("embedding")
        .GetProperty("values")
        .EnumerateArray()
        .Select(v => v.GetSingle())
        .ToList();
}
```
```cs
// dotnet add package Turbopuffer
// dotnet add package OpenAI
using System;
using System.ClientModel;
using System.Collections.Generic;
using System.Linq;
using OpenAI;
using OpenAI.Embeddings;
using Turbopuffer;
using Turbopuffer.Models.Namespaces;

using var tpuf = new TurbopufferClient
{
    Region = "gcp-us-central1", // choose best region: https://turbopuffer.com/docs/regions
};

var namespaceName =
    Environment.GetEnvironmentVariable("TURBOPUFFER_NAMESPACE")
    ?? $"quickstart-{Guid.NewGuid().ToString("N").Substring(0, 8)}";
var ns = tpuf.Namespace(namespaceName);

// Upsert documents with vectors and attributes
await ns.Write(
    new NamespaceWriteParams
    {
        UpsertRows =
        [
            new Row()
                .Set("id", 1)
                .Set("vector", Embed("walrus narwhal"))
                .Set("category", new[] { "mammal" })
                .Set("public", true)
                .Set("text", "walrus narwhal"),
            new Row()
                .Set("id", 2)
                .Set("vector", Embed("pufferfish clownfish swordfish"))
                .Set("category", new[] { "fish" })
                .Set("public", false)
                .Set("text", "pufferfish clownfish swordfish"),
        ],
        DistanceMetric = DistanceMetric.CosineDistance,
        Schema = new Dictionary<string, AttributeSchemaConfig>
        {
            ["text"] = new AttributeSchemaConfig
            {
                Type = "string",
                // More schema & FTS options:
                // https://turbopuffer.com/docs/write#schema
                FullTextSearch = true,
                Regex = true,
            },
            ["category"] = new AttributeSchemaConfig { Type = "[]string", FullTextSearch = true },
        },
    }
);

// Query nearest neighbors with a filter
var queryResult = await ns.Query(
    new NamespaceQueryParams
    {
        RankBy = RankBy.Ann("vector", Embed("arctic sea mammal")),
        Limit = 10,
        Filters = Filter.Eq("public", true),
    }
);
foreach (var row in queryResult.GetRows())
{
    Console.WriteLine(row);
}

// Full-text search on an attribute
// To combine FTS and vector search concurrently, see:
// https://turbopuffer.com/docs/hybrid-search
var ftsResult = await ns.Query(
    new NamespaceQueryParams
    {
        Limit = 10,
        Filters = Filter.Eq("public", true),
        RankBy = RankByText.Sum(
            RankByText.Product(2, RankByText.BM25("category", "mammal")),
            RankByText.BM25("text", "quick walrus")
        ),
    }
);
foreach (var row in ftsResult.GetRows())
{
    Console.WriteLine(row);
}

// Regex filter — matches "pufferfish", "swordfish", "clownfish"
var regexResult = await ns.Query(
    new NamespaceQueryParams { Limit = 10, Filters = Filter.Regex("text", "\\w+fish") }
);
foreach (var row in regexResult.GetRows())
{
    Console.WriteLine(row);
}

// Count documents grouped by category
var groupedResult = await ns.Query(
    new NamespaceQueryParams
    {
        AggregateBy = new Dictionary<string, AggregateBy>
        {
            ["count_by_category"] = AggregateBy.Count("id"),
        },
        GroupBy = [GroupBy.Attr("category")],
    }
);
foreach (var group in groupedResult.GetAggregationGroups())
{
    Console.WriteLine(group);
}

// Create an embedding with Qwen on Fireworks.
// Requires FIREWORKS_API_KEY to be set (https://fireworks.ai/settings/users/api-keys)
static List<float> Embed(string text)
{
    var client = new EmbeddingClient(
        "fireworks/qwen3-embedding-8b",
        new ApiKeyCredential(Environment.GetEnvironmentVariable("FIREWORKS_API_KEY")!),
        new OpenAIClientOptions { Endpoint = new Uri("https://api.fireworks.ai/inference/v1") }
    );
    return [.. client.GenerateEmbedding(text).Value.ToFloats().Span];
}
```
```cs
// dotnet add package Turbopuffer
// dotnet add package OpenAI
using System;
using System.ClientModel;
using System.Collections.Generic;
using System.Linq;
using OpenAI;
using OpenAI.Embeddings;
using Turbopuffer;
using Turbopuffer.Models.Namespaces;

using var tpuf = new TurbopufferClient
{
    Region = "gcp-us-central1", // choose best region: https://turbopuffer.com/docs/regions
};

var namespaceName =
    Environment.GetEnvironmentVariable("TURBOPUFFER_NAMESPACE")
    ?? $"quickstart-{Guid.NewGuid().ToString("N").Substring(0, 8)}";
var ns = tpuf.Namespace(namespaceName);

// Upsert documents with vectors and attributes
await ns.Write(
    new NamespaceWriteParams
    {
        UpsertRows =
        [
            new Row()
                .Set("id", 1)
                .Set("vector", Embed("walrus narwhal"))
                .Set("category", new[] { "mammal" })
                .Set("public", true)
                .Set("text", "walrus narwhal"),
            new Row()
                .Set("id", 2)
                .Set("vector", Embed("pufferfish clownfish swordfish"))
                .Set("category", new[] { "fish" })
                .Set("public", false)
                .Set("text", "pufferfish clownfish swordfish"),
        ],
        DistanceMetric = DistanceMetric.CosineDistance,
        Schema = new Dictionary<string, AttributeSchemaConfig>
        {
            ["text"] = new AttributeSchemaConfig
            {
                Type = "string",
                // More schema & FTS options:
                // https://turbopuffer.com/docs/write#schema
                FullTextSearch = true,
                Regex = true,
            },
            ["category"] = new AttributeSchemaConfig { Type = "[]string", FullTextSearch = true },
        },
    }
);

// Query nearest neighbors with a filter
var queryResult = await ns.Query(
    new NamespaceQueryParams
    {
        RankBy = RankBy.Ann("vector", Embed("arctic sea mammal")),
        Limit = 10,
        Filters = Filter.Eq("public", true),
    }
);
foreach (var row in queryResult.GetRows())
{
    Console.WriteLine(row);
}

// Full-text search on an attribute
// To combine FTS and vector search concurrently, see:
// https://turbopuffer.com/docs/hybrid-search
var ftsResult = await ns.Query(
    new NamespaceQueryParams
    {
        Limit = 10,
        Filters = Filter.Eq("public", true),
        RankBy = RankByText.Sum(
            RankByText.Product(2, RankByText.BM25("category", "mammal")),
            RankByText.BM25("text", "quick walrus")
        ),
    }
);
foreach (var row in ftsResult.GetRows())
{
    Console.WriteLine(row);
}

// Regex filter — matches "pufferfish", "swordfish", "clownfish"
var regexResult = await ns.Query(
    new NamespaceQueryParams { Limit = 10, Filters = Filter.Regex("text", "\\w+fish") }
);
foreach (var row in regexResult.GetRows())
{
    Console.WriteLine(row);
}

// Count documents grouped by category
var groupedResult = await ns.Query(
    new NamespaceQueryParams
    {
        AggregateBy = new Dictionary<string, AggregateBy>
        {
            ["count_by_category"] = AggregateBy.Count("id"),
        },
        GroupBy = [GroupBy.Attr("category")],
    }
);
foreach (var group in groupedResult.GetAggregationGroups())
{
    Console.WriteLine(group);
}

// Create an embedding with Voyage.
// Requires VOYAGE_API_KEY to be set:
// https://dashboard.voyageai.com/organization/api-keys
static List<float> Embed(string text)
{
    var client = new EmbeddingClient(
        "voyage-4-lite",
        new ApiKeyCredential(Environment.GetEnvironmentVariable("VOYAGE_API_KEY")!),
        new OpenAIClientOptions { Endpoint = new Uri("https://api.voyageai.com/v1") }
    );
    return [.. client.GenerateEmbedding(text).Value.ToFloats().Span];
}
```
```ruby
# $ gem install turbopuffer
require "turbopuffer"
require "securerandom"
require "json"

tpuf = Turbopuffer::Client.new(
  api_key: ENV["TURBOPUFFER_API_KEY"], # created here: https://turbopuffer.com/dashboard
  region: "gcp-us-central1", # choose best region: https://turbopuffer.com/docs/regions
)

namespace = ENV["TURBOPUFFER_NAMESPACE"] || "quickstart-#{SecureRandom.hex(4)}"
ns = tpuf.namespace(namespace)

# Use provider-free random vectors for the quickstart.
# Switch the embedding provider dropdown to see real embedding API calls.
def embed(_text)
  [rand, rand]
end

# Upsert documents with vectors and attributes
ns.write(
  upsert_rows: [
    {
      id: 1,
      vector: embed("walrus narwhal"),
      category: ["mammal"],
      public: true,
      text: "walrus narwhal",
    },
    {
      id: 2,
      vector: embed("pufferfish clownfish swordfish"),
      category: ["fish"],
      public: false,
      text: "pufferfish clownfish swordfish",
    },
  ],
  distance_metric: "cosine_distance",
  schema: {
    text: {
      # Configure FTS/BM25. Other attributes have inferred types.
      type: "string",
      # More schema & FTS options:
      # https://turbopuffer.com/docs/write#schema
      full_text_search: true,
      regex: true,
    },
    category: { type: "[]string", full_text_search: true },
  },
)

# Query nearest neighbors with a filter
result = ns.query(
  rank_by: ["vector", "ANN", embed("arctic sea mammal")],
  limit: 10,
  filters: ["public", "Eq", true],
)
puts result.rows
# {id: 1, "$dist": 0.42773545}

# Full-text search on an attribute
# To combine FTS and vector search concurrently, see:
# https://turbopuffer.com/docs/hybrid-search
result = ns.query(
  limit: 10,
  filters: ["public", "Eq", true],
  rank_by: ["Sum", [
    ["Product", 2, ["category", "BM25", "mammal"]],
    ["text", "BM25", "quick walrus"],
  ]],
)
puts result.rows
# {id: 1, "$dist": 0.7549128}

# Regex filter — matches "pufferfish", "swordfish", "clownfish"
result = ns.query(
  limit: 10,
  filters: ["text", "Regex", "\\w+fish"],
)
puts result.rows

# Count documents grouped by category
grouped_result = ns.query(
  aggregate_by: { count_by_category: ["Count"] },
  group_by: ["category"],
)
puts grouped_result.aggregation_groups
# {category: ["fish"], count_by_category: 1}
# {category: ["mammal"], count_by_category: 1}
```
```ruby
# $ gem install turbopuffer cohere-ruby
require "turbopuffer"
require "securerandom"
require "cohere"

tpuf = Turbopuffer::Client.new(
  api_key: ENV["TURBOPUFFER_API_KEY"], # created here: https://turbopuffer.com/dashboard
  region: "gcp-us-central1", # choose best region: https://turbopuffer.com/docs/regions
)

namespace = ENV["TURBOPUFFER_NAMESPACE"] || "quickstart-#{SecureRandom.hex(4)}"
ns = tpuf.namespace(namespace)

# Create an embedding with Cohere.
# Requires COHERE_API_KEY to be set (https://dashboard.cohere.com/api-keys)
def embed(text)
  Cohere::Client
    .new(api_key: ENV["COHERE_API_KEY"])
    .embed(
      model: "embed-v4.0",
      texts: [text],
      input_type: "search_document",
      embedding_types: ["float"],
    )
    .embeddings
    .float
    .first
end

# Upsert documents with vectors and attributes
ns.write(
  upsert_rows: [
    {
      id: 1,
      vector: embed("walrus narwhal"),
      category: ["mammal"],
      public: true,
      text: "walrus narwhal",
    },
    {
      id: 2,
      vector: embed("pufferfish clownfish swordfish"),
      category: ["fish"],
      public: false,
      text: "pufferfish clownfish swordfish",
    },
  ],
  distance_metric: "cosine_distance",
  schema: {
    text: {
      # Configure FTS/BM25. Other attributes have inferred types (`public`: int).
      type: "string",
      # More schema & FTS options:
      # https://turbopuffer.com/docs/write#schema
      full_text_search: true,
      regex: true,
    },
    category: { type: "[]string", full_text_search: true },
  },
)

# Query nearest neighbors with a filter
result = ns.query(
  rank_by: ["vector", "ANN", embed("arctic sea mammal")],
  limit: 10,
  filters: ["public", "Eq", true],
)
puts result.rows
# {id: 1, "$dist": 0.42773545}

# Full-text search on an attribute
# To combine FTS and vector search concurrently, see:
# https://turbopuffer.com/docs/hybrid-search
result = ns.query(
  limit: 10,
  filters: ["public", "Eq", true],
  rank_by: ["Sum", [
    ["Product", 2, ["category", "BM25", "mammal"]],
    ["text", "BM25", "quick walrus"],
  ]],
)
puts result.rows
# {id: 1, "$dist": 0.7549128}

# Regex filter — matches "pufferfish", "swordfish", "clownfish"
result = ns.query(
  limit: 10,
  filters: ["text", "Regex", "\\w+fish"],
)
puts result.rows

# Count documents grouped by category
grouped_result = ns.query(
  aggregate_by: { count_by_category: ["Count"] },
  group_by: ["category"],
)
puts grouped_result.aggregation_groups
# {category: ["fish"], count_by_category: 1}
# {category: ["mammal"], count_by_category: 1}
```
```ruby
# $ gem install turbopuffer openai
require "turbopuffer"
require "securerandom"
require "openai"

tpuf = Turbopuffer::Client.new(
  api_key: ENV["TURBOPUFFER_API_KEY"], # created here: https://turbopuffer.com/dashboard
  region: "gcp-us-central1", # choose best region: https://turbopuffer.com/docs/regions
)

namespace = ENV["TURBOPUFFER_NAMESPACE"] || "quickstart-#{SecureRandom.hex(4)}"
ns = tpuf.namespace(namespace)

# Create an embedding with Qwen on Fireworks.
# Requires FIREWORKS_API_KEY to be set (https://fireworks.ai/settings/users/api-keys)
def embed(text)
  OpenAI::Client
    .new(
      api_key: ENV["FIREWORKS_API_KEY"],
      base_url: "https://api.fireworks.ai/inference/v1",
    )
    .embeddings
    .create(model: "fireworks/qwen3-embedding-8b", input: text)
    .data[0]
    .embedding
end

# Upsert documents with vectors and attributes
ns.write(
  upsert_rows: [
    {
      id: 1,
      vector: embed("walrus narwhal"),
      category: ["mammal"],
      public: true,
      text: "walrus narwhal",
    },
    {
      id: 2,
      vector: embed("pufferfish clownfish swordfish"),
      category: ["fish"],
      public: false,
      text: "pufferfish clownfish swordfish",
    },
  ],
  distance_metric: "cosine_distance",
  schema: {
    text: {
      # Configure FTS/BM25. Other attributes have inferred types (`public`: int).
      type: "string",
      # More schema & FTS options:
      # https://turbopuffer.com/docs/write#schema
      full_text_search: true,
      regex: true,
    },
    category: { type: "[]string", full_text_search: true },
  },
)

# Query nearest neighbors with a filter
result = ns.query(
  rank_by: ["vector", "ANN", embed("arctic sea mammal")],
  limit: 10,
  filters: ["public", "Eq", true],
)
puts result.rows
# {id: 1, "$dist": 0.42773545}

# Full-text search on an attribute
# To combine FTS and vector search concurrently, see:
# https://turbopuffer.com/docs/hybrid-search
result = ns.query(
  limit: 10,
  filters: ["public", "Eq", true],
  rank_by: ["Sum", [
    ["Product", 2, ["category", "BM25", "mammal"]],
    ["text", "BM25", "quick walrus"],
  ]],
)
puts result.rows
# {id: 1, "$dist": 0.7549128}

# Regex filter — matches "pufferfish", "swordfish", "clownfish"
result = ns.query(
  limit: 10,
  filters: ["text", "Regex", "\\w+fish"],
)
puts result.rows

# Count documents grouped by category
grouped_result = ns.query(
  aggregate_by: { count_by_category: ["Count"] },
  group_by: ["category"],
)
puts grouped_result.aggregation_groups
# {category: ["fish"], count_by_category: 1}
# {category: ["mammal"], count_by_category: 1}
```
```ruby
# $ gem install turbopuffer openai
require "turbopuffer"
require "securerandom"
require "openai"

tpuf = Turbopuffer::Client.new(
  api_key: ENV["TURBOPUFFER_API_KEY"], # created here: https://turbopuffer.com/dashboard
  region: "gcp-us-central1", # choose best region: https://turbopuffer.com/docs/regions
)

namespace = ENV["TURBOPUFFER_NAMESPACE"] || "quickstart-#{SecureRandom.hex(4)}"
ns = tpuf.namespace(namespace)

# Create an embedding with Voyage.
# Requires VOYAGE_API_KEY to be set:
# https://dashboard.voyageai.com/organization/api-keys
def embed(text)
  OpenAI::Client
    .new(
      api_key: ENV["VOYAGE_API_KEY"],
      base_url: "https://api.voyageai.com/v1",
    )
    .embeddings
    .create(model: "voyage-4-lite", input: text)
    .data[0]
    .embedding
end

# Upsert documents with vectors and attributes
ns.write(
  upsert_rows: [
    {
      id: 1,
      vector: embed("walrus narwhal"),
      category: ["mammal"],
      public: true,
      text: "walrus narwhal",
    },
    {
      id: 2,
      vector: embed("pufferfish clownfish swordfish"),
      category: ["fish"],
      public: false,
      text: "pufferfish clownfish swordfish",
    },
  ],
  distance_metric: "cosine_distance",
  schema: {
    text: {
      # Configure FTS/BM25. Other attributes have inferred types (`public`: int).
      type: "string",
      # More schema & FTS options:
      # https://turbopuffer.com/docs/write#schema
      full_text_search: true,
      regex: true,
    },
    category: { type: "[]string", full_text_search: true },
  },
)

# Query nearest neighbors with a filter
result = ns.query(
  rank_by: ["vector", "ANN", embed("arctic sea mammal")],
  limit: 10,
  filters: ["public", "Eq", true],
)
puts result.rows
# {id: 1, "$dist": 0.42773545}

# Full-text search on an attribute
# To combine FTS and vector search concurrently, see:
# https://turbopuffer.com/docs/hybrid-search
result = ns.query(
  limit: 10,
  filters: ["public", "Eq", true],
  rank_by: ["Sum", [
    ["Product", 2, ["category", "BM25", "mammal"]],
    ["text", "BM25", "quick walrus"],
  ]],
)
puts result.rows
# {id: 1, "$dist": 0.7549128}

# Regex filter — matches "pufferfish", "swordfish", "clownfish"
result = ns.query(
  limit: 10,
  filters: ["text", "Regex", "\\w+fish"],
)
puts result.rows

# Count documents grouped by category
grouped_result = ns.query(
  aggregate_by: { count_by_category: ["Count"] },
  group_by: ["category"],
)
puts grouped_result.aggregation_groups
# {category: ["fish"], count_by_category: 1}
# {category: ["mammal"], count_by_category: 1}
```
<!-- /multilang -->

## Conditional writes

Only update a document when a condition is met -- for example,
keep only the newest [timestamped write](/docs/write#conditional-writes).
Continue from the same namespace and only apply the write when the new
`updated_at` is newer than the stored one, or when the row has no timestamp yet.

<!-- multilang -->
```bash
curl $TPUF_URL/v2/namespaces/$TPUF_NAMESPACE \
  -X POST --fail-with-body \
  -H "Authorization: Bearer $api_key" \
  -H 'Content-Type: application/json' \
  -d '{
   "upsert_rows": [
     {"id": 1, "vector": [0.5, 0.6], "category": ["mammal"],
      "updated_at": "2024-04-16T09:27:32Z"}
   ],
   "upsert_condition": [
     "Or", [
       ["updated_at", "Lt", {"$ref_new": "updated_at"}],
       ["updated_at", "Eq", null]
     ]
   ],
   "distance_metric": "cosine_distance"
 }'
# {"rows_affected": 1, ...}
```
```python
# Only update if this write has a newer timestamp
result = ns.write(
    upsert_rows=[{
        'id': 1,
        'vector': embed("updated walrus"),
        'category': ["mammal"],
        'updated_at': "2024-04-16T09:27:32Z",
    }],
    upsert_condition=(
        'Or', [
            ('updated_at', 'Lt', {'$ref_new': 'updated_at'}),
            ('updated_at', 'Eq', None),
        ]
    ),
    distance_metric='cosine_distance',
)
print(result.rows_affected)  # 1
```
```typescript
// Only update if this write has a newer timestamp
const writeResult = await ns.write({
  upsert_rows: [{
    id: 1,
    vector: embed("updated walrus"),
    category: ["mammal"],
    updated_at: "2024-04-16T09:27:32Z",
  }],
  upsert_condition: [
    "Or", [
      ["updated_at", "Lt", { $ref_new: "updated_at" }],
      ["updated_at", "Eq", null],
    ],
  ],
  distance_metric: "cosine_distance",
});
console.log(writeResult.rows_affected); // 1
```
```go
	res, err := ns.Write(ctx, turbopuffer.NamespaceWriteParams{
		UpsertRows: []turbopuffer.RowParam{{
			"id":         1,
			"vector":     embed(ctx, "updated walrus"),
			"category":   []string{"mammal"},
			"updated_at": "2024-04-16T09:27:32Z",
		}},
		UpsertCondition: turbopuffer.NewFilterOr([]turbopuffer.Filter{
			turbopuffer.NewFilterLt("updated_at", turbopuffer.NewExprRefNew("updated_at")),
			turbopuffer.NewFilterEq("updated_at", nil),
		}),
		DistanceMetric: turbopuffer.DistanceMetricCosineDistance,
	})
	if err != nil {
		panic(err)
	}
	fmt.Println(res.RowsAffected) // 1
```
```java
    var writeResult = ns.write(
      NamespaceWriteParams.builder()
        .addUpsertRow(
          Row.builder()
            .put("id", 1)
            .put("vector", embed("updated walrus"))
            .put("category", List.of("mammal"))
            .put("updated_at", "2024-04-16T09:27:32Z")
            .build()
        )
        .upsertCondition(
          Filter.or(
            Filter.lt("updated_at", Expr.refNew("updated_at")),
            Filter.eq("updated_at", null)
          )
        )
        .distanceMetric(DistanceMetric.COSINE_DISTANCE)
        .build()
    );
    System.out.println(writeResult.rowsAffected()); // 1
```
```cs
// Only update if this write has a newer timestamp
var writeResult = await ns.Write(
    new NamespaceWriteParams
    {
        UpsertRows =
        [
            new Row()
                .Set("id", 1)
                .Set("vector", Embed("updated walrus"))
                .Set("category", new[] { "mammal" })
                .Set("updated_at", "2024-04-16T09:27:32Z"),
        ],
        UpsertCondition = Filter.Or(
            Filter.Lt("updated_at", Expr.RefNew("updated_at")),
            Filter.Eq("updated_at", null)
        ),
        DistanceMetric = DistanceMetric.CosineDistance,
    }
);
Console.WriteLine(writeResult.RowsAffected); // 1
```
```ruby
# Only update if this write has a newer timestamp
result = ns.write(
  upsert_rows: [{
    id: 1,
    vector: embed("updated walrus"),
    category: ["mammal"],
    updated_at: "2024-04-16T09:27:32Z",
  }],
  upsert_condition: [
    "Or", [
      ["updated_at", "Lt", { '$ref_new': "updated_at" }],
      ["updated_at", "Eq", nil],
    ],
  ],
  distance_metric: "cosine_distance",
)
puts result.rows_affected  # 1
```
<!-- /multilang -->

## Branching

Instantly [clone a namespace](/docs/branching) with copy-on-write.
Use it to spin up isolated test environments, keep lightweight versioned copies,
or take snapshots before risky changes. Constant-time regardless of size, and
fully independent after creation. Finally, branch the same namespace into a
fresh copy and query it independently.

<!-- multilang -->
```bash
# Branch from the quickstart namespace
curl $TPUF_URL/v2/namespaces/$TPUF_BRANCH_NAMESPACE \
  -X POST --fail-with-body \
  -H "Authorization: Bearer $api_key" \
  -H 'Content-Type: application/json' \
  -d "{\"branch_from_namespace\": \"$TPUF_NAMESPACE\"}"

# Query the branch independently
curl $TPUF_URL/v2/namespaces/$TPUF_BRANCH_NAMESPACE/query \
  -X POST --fail-with-body \
  -H "Authorization: Bearer $api_key" \
  -H 'Content-Type: application/json' \
  -d '{"rank_by": ["vector", "ANN", [0.1, 0.2]], "limit": 5}'
```
```python
branch_namespace = f"{namespace}-branch"
branch = tpuf.namespace(branch_namespace)
branch.write(branch_from_namespace=namespace)

# Query the branch independently
print(branch.query(
    rank_by=("vector", "ANN", embed("sea creature")),
    limit=5,
))
```
```typescript
const branchNamespace = `${namespace}-branch`;
const branch = tpuf.namespace(branchNamespace);
await branch.write({
  branch_from_namespace: namespace,
});

// Query the branch independently
const branchResult = await branch.query({
  rank_by: ["vector", "ANN", embed("sea creature")],
  limit: 5,
});
console.log(branchResult.rows);
```
```go
	branchNamespace := namespace + "-branch"
	branch := tpuf.Namespace(branchNamespace)
	if _, err := branch.Write(ctx, turbopuffer.NamespaceWriteParams{
		BranchFromNamespace: turbopuffer.BranchFromNamespaceParams{
			SourceNamespace: namespace,
		},
	}); err != nil {
		panic(err)
	}

	// Query the branch independently
	branchResult, err := branch.Query(ctx,
		turbopuffer.NamespaceQueryParams{
			RankBy: turbopuffer.NewRankByAnn("vector",
				embed(ctx, "sea creature")),
			Limit: turbopuffer.LimitParam{Total: 5},
		})
	if err != nil {
		panic(err)
	}
	fmt.Print(turbopuffer.PrettyPrint(branchResult.Rows))
```
```java
    var branchNamespace = namespace + "-branch";
    var branch = tpuf.namespace(branchNamespace);
    branch.branchFrom(NamespaceBranchFromParams.builder().sourceNamespace(namespace).build());

    // Query the branch independently
    var branchResult = branch.query(
      NamespaceQueryParams.builder()
        .rankBy(RankBy.ann("vector", embed("sea creature")))
        .limit(5)
        .build()
    );
    System.out.println(branchResult);
```
```cs
var branchName = namespaceName + "-branch";
var branch = tpuf.Namespace(branchName);
await branch.BranchFrom(new NamespaceBranchFromParams { SourceNamespace = namespaceName });

// Query the branch independently
var branchResult = await branch.Query(
    new NamespaceQueryParams { RankBy = RankBy.Ann("vector", Embed("sea creature")), Limit = 5 }
);
foreach (var row in branchResult.GetRows())
{
    Console.WriteLine(row);
}
```
```ruby
branch_namespace = "#{namespace}-branch"
branch = tpuf.namespace(branch_namespace)
branch.write(branch_from_namespace: namespace)

# Query the branch independently
result = branch.query(
  rank_by: ["vector", "ANN", embed("sea creature")],
  limit: 5,
)
puts result.rows
```
<!-- /multilang -->

## What's next

* [Write docs](/docs/write) -- schema, patches, deletes, delete-by-filter
* [Query docs](/docs/query) -- kNN, hybrid search, ordering, grouped aggregations
* [Concepts](/docs/concepts) -- namespaces, attributes, distance metrics
* [Architecture](/docs/architecture) -- how object storage makes this work


---

This page: [/docs/quickstart.md](https://turbopuffer.com/docs/quickstart.md)

All documentation pages: [/llms.txt](https://turbopuffer.com/llms.txt)

All documentation in one file: [/llms-full.txt](https://turbopuffer.com/llms-full.txt)
