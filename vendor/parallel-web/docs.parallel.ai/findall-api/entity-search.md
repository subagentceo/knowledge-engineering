> ## Documentation Index
> Fetch the complete documentation index at: https://docs.parallel.ai/llms.txt
> Use this file to discover all available pages before exploring further.

# Entity Search

> Fast, synchronous people and company search, the real-time counterpart to FindAll — describe what you need in natural language and receive a set of matching results in seconds

<div className="sr-only" aria-hidden="false">
  For AI agents: a documentation index is available at [https://docs.parallel.ai/llms.txt](https://docs.parallel.ai/llms.txt). The full text of all docs is at [https://docs.parallel.ai/llms-full.txt](https://docs.parallel.ai/llms-full.txt). You may also fetch any page as Markdown by appending `.md` to its URL or sending `Accept: text/markdown`.
</div>

<Note>
  **Beta Notice**: Entity Search is part of Parallel FindAll, which is currently in public beta. Endpoints and request/response formats are subject to change; we will provide 30 days notice before any breaking changes. Entity Search is new and evolving quickly — if it isn't working for your use case, tell us at [support@parallel.ai](mailto:support@parallel.ai).
</Note>

## What is Entity Search?

**Entity Search finds people and companies on the web.** It is a fast, synchronous API: you describe the people or companies you're looking for in plain language and receive a structured set of matching results in seconds. Here, an **entity** is a real-world company or person.

Entity Search is the real-time counterpart to FindAll, designed for the latency-sensitive parts of agentic systems.

<Note>
  Entity Search is optimized for recall and speed: results return in seconds, and depending on the specificity of your objective, may not satisfy every requirement. The [FindAll API](/findall-api/findall-quickstart) is optimized for precision: it runs asynchronously and verifies every result against your match conditions.
</Note>

## When to Use It

Entity Search is built for real-time, human-in-the-loop, and latency-sensitive agentic workflows that require a starting set of people or companies to evaluate, enrich, or pass into deeper research:

* **Interactive interfaces**: Power a go-to-market or hiring interface, a chat experience, or an automation with a human in the loop, where results need to come back in seconds.
* **Starting sets for deeper work**: Generate an initial set of people or companies to filter, enrich with additional fields, or hand off to [FindAll](/findall-api/findall-quickstart) or the [Task API](/task-api/task-quickstart) for comprehensive list building and research.
* **Cost-sensitive lookups**: Run people-and-company search at a fraction of the cost of a full FindAll run when you don't need exhaustive coverage or per-field citations.

## Input and Output

You send a small set of inputs and receive a structured set of matching results.

**Input:**

| Field         | Type    | Description                                                                                             |
| ------------- | ------- | ------------------------------------------------------------------------------------------------------- |
| `entity_type` | enum    | The kind of entity to search for: `people` or `companies`.                                              |
| `objective`   | string  | Natural-language description of the people or companies you're looking for.                             |
| `match_limit` | integer | Maximum number of results to return. Between 5 and 1000 (inclusive); defaults to 100. May return fewer. |

**Output:** an `entity_set_id` identifying the request, plus a ranked list of `entities`. Each entity includes its `name`, `url`, and `description`.

<Note>
  Entity Search does not support pagination — a request returns a single set of results, up to `match_limit`. To retrieve as many results as possible, set `match_limit` to its maximum of 1,000.
</Note>

### Sample Request

<CodeGroup>
  ```bash cURL theme={"system"}
  curl -X POST "https://api.parallel.ai/v1beta/findall/entity-search" \
    -H "x-api-key: $PARALLEL_API_KEY" \
    -H "Content-Type: application/json" \
    -d '{
      "entity_type": "companies",
      "objective": "AI startups that raised Series A in 2024",
      "match_limit": 100
    }'
  ```

  ```python Python theme={"system"}
  from parallel import Parallel

  client = Parallel(api_key="YOUR_API_KEY")

  response = client.beta.findall.entity_search(
      entity_type="companies",
      objective="AI startups that raised Series A in 2024",
      match_limit=100,
  )

  for entity in response.entities:
      print(f"{entity.name}: {entity.url}")
  ```

  ```typescript TypeScript theme={"system"}
  import Parallel from 'parallel-web';

  const client = new Parallel({
    apiKey: process.env.PARALLEL_API_KEY
  });

  const response = await client.beta.findall.entitySearch({
    entity_type: "companies",
    objective: "AI startups that raised Series A in 2024",
    match_limit: 100,
  });

  for (const entity of response.entities) {
    console.log(`${entity.name}: ${entity.url}`);
  }
  ```
</CodeGroup>

### Sample Response

```json theme={"system"}
{
  "entity_set_id": "entity_set_cad0a6d2dec046bd95ae900527d880e7",
  "entities": [
    {
      "name": "Figure AI",
      "url": "https://www.figure.ai",
      "description": "AI robotics company building general purpose humanoid robots"
    }
    // ... additional results omitted for brevity ...
  ]
}
```

## Getting Good Results

Entity Search prioritizes recall: a response favors including every relevant entity over excluding every irrelevant one. As a result:

* **Consider requesting more results than you need.** Results are ranked approximately rather than verified against your objective, so a low `match_limit` may omit relevant entities that a larger request would include. If your workflow filters or reviews results downstream, request 100 or more and select from the response.
* **Avoid highly restrictive objectives.** The API returns up to `match_limit` results even when few entities satisfy the objective, so for narrow, heavily qualified objectives, relevance declines toward the end of the list. Prefer an objective that captures your core criterion and apply further conditions downstream, or use [FindAll](/findall-api/findall-quickstart), which evaluates each match condition explicitly.

## How It Differs from FindAll

Entity Search and [FindAll](/findall-api/findall-quickstart) both turn natural-language criteria into entities, but they make different trade-offs.

|                          | Entity Search                                                                                                                                                                   | FindAll                                                                                                                                                                                                                   |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Validation**           | Results are ranked but not individually verified; depending on the specificity of the objective, some may not satisfy every requirement                                         | Every result is verified against your match conditions before it is returned                                                                                                                                              |
| **Input / output shape** | A natural-language objective and an entity type in; a ranked list of `name`, `url`, and `description` out                                                                       | A structured schema with match conditions and optional enrichments in; verified, enriched records with reasoning out                                                                                                      |
| **Cost**                 | Much cheaper — priced per request (see [Pricing](/getting-started/pricing))                                                                                                     | Higher — a fixed cost per run plus a per-match cost, and per-enrichment costs                                                                                                                                             |
| **Speed**                | Much faster — **synchronous**, returning results in seconds                                                                                                                     | **Asynchronous**, taking seconds to hours; poll, stream, or use webhooks                                                                                                                                                  |
| **Fields it matches on** | A limited set: `entity_type` and the natural-language `objective` go in; only `name`, `url`, and `description` come back. No custom match conditions, enrichments, or citations | Evaluates arbitrary `match_conditions`, runs [enrichments](/findall-api/features/findall-enrich) to extract additional fields, and returns per-field [basis and citations](/findall-api/core-concepts/findall-candidates) |

## Scope and Compliance

Results draw on the public web and cover companies and people **in a professional context** — not consumer profiling, and not for use in employment, credit, or housing decisions.

## Next Steps

* **[FindAll Quickstart](/findall-api/findall-quickstart)**: Comprehensive, asynchronous entity discovery with verified, enriched, and cited results
* **[Search API](/search/search-quickstart)**: Retrieve pages and excerpts across the whole web
* **[Pricing](/getting-started/pricing)**: Detailed rate schedule
* **[Rate Limits](/getting-started/rate-limits)**: Default quotas and how to request higher limits
