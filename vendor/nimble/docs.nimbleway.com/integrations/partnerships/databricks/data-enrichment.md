> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Data Enrichment

> Call Nimble as SQL table functions in Databricks — live web search, page extraction, and Web Search Agents that land in governed Delta tables.

This integration is ideal for data engineers who need live web search inside their Databricks pipelines — without leaving SQL or building a custom API integration.

Nimble ships as a set of SQL-native **table functions** in Unity Catalog. `SELECT … FROM nimble_search(…)` and `SELECT … FROM nimble_extract(…)` run live web search and page extraction directly inside a query, and results compose with `CREATE TABLE … AS` to land in a **governed Delta table** — access-controlled, lineage-tracked, time-travelable. The same shape exposes every [Web Search Agent](/nimble-sdk/agentic/agents) for structured, per-row enrichment.

```sql Live web search and page extraction, straight from SQL theme={"system"}
-- Web search → rows of (title, description, url, content)
SELECT title, url
FROM   nimble_integration.tools.nimble_search('AI agent frameworks news', 5, 'news');

-- Enrich a table of URLs and persist as a governed Delta table
CREATE TABLE my_catalog.web.page_text AS
SELECT u.id, x.url, x.content
FROM   my_catalog.web.urls u,
       LATERAL nimble_integration.tools.nimble_extract(u.url) x;
```

Every capability is a table function — call it in the `FROM` clause. No stored procedures, no Python middle-tier, no `http_request()` + `from_json` plumbing. Notebooks, dashboards, dbt models, Databricks Workflows, and Databricks Genie all consume the output transparently.

## What you get

* **Search and extract as first-class SQL.** `nimble_search(query, …)` returns rows of `title, description, url, content`; `nimble_extract(url, …)` returns a row of `url, format, content` (markdown / html / links). Both hit the live web through Nimble at query time.
* **Results land as governed Delta tables.** Wrap any call in `CREATE TABLE … AS` and the output is a managed Unity Catalog table — Delta time travel, column/table lineage, and `GRANT`-based access control come for free.
* **Every [Web Search Agent](/nimble-sdk/agentic/agent-gallery), one function.** `nimble_agent_run(agent, params_json)` runs any agent (`google_maps_search`, `amazon_serp`, `linkedin_company_details`, …) and returns the parsed payload as a navigable `VARIANT`. `nimble_agent_list()` enumerates the catalog and `nimble_agent_describe(agent)` returns an agent's exact input parameters.
* **Per-row error isolation.** Each tool yields **zero rows on failure** instead of raising, so a batch `CREATE TABLE … AS` over thousands of inputs is never aborted by one bad row.
* **Genie-native.** Databricks Genie registers table functions as tools, so each function is directly registrable as a Genie agent tool — the function and column `COMMENT`s are the spec the LLM reads.
* **Stays inside your Databricks account.** Only authorized outbound calls hit Nimble. The API key lives in a Databricks secret scope and is injected server-side — it never appears in a function signature or at a call site.

## Prerequisites

* A Databricks workspace with a **serverless SQL warehouse**.
* Privilege to create a catalog/schema (or an existing schema you own) plus `CREATE FUNCTION` on it.
* The **Databricks CLI v0.205+**, authenticated (`databricks auth login`), and `jq` (used by the deploy snippet to resolve a warehouse id).
* A Nimble API key ([sign up free](https://online.nimbleway.com/signup)).

<Warning>
  **Enable outbound networking for the warehouse — or every tool returns zero rows.** A serverless SQL warehouse blocks Python UDF/UDTF egress by default. Two one-time steps fix it:

  1. **Workspace Settings → Previews** → enable **"Enable networking for isolated workloads in Serverless SQL Warehouses"** (Public Preview).
  2. **Cold-restart the warehouse** — fully **Stop** it, then **Start** it. A plain "restart" is *not* enough; the new network config is only picked up on a cold start.

  Symptom of skipping this: a tool returns zero rows and the underlying request fails with `Connection refused` (Errno 111) even though DNS resolves. The account-level serverless egress *network policy* is a separate control and is usually already "allow all" — it is not this setting.

  Workspaces that can't enable the preview can use the [`http_request()` fallback](#fallback-http-request-without-the-networking-preview) instead.
</Warning>

## Install in Databricks

<Steps>
  <Step title="Store the Nimble API key in a secret scope">
    The tools read the key from `secret('nimble','api_key')`, so no token ever appears in a function body or at a call site. Create the scope once per workspace.

    ```bash theme={"system"}
    databricks secrets create-scope nimble
    databricks secrets put-secret  nimble api_key   # paste the raw token, then Ctrl-D
    databricks secrets put-acl     nimble users READ
    ```

    `READ` lets every workspace user *call* `secret('nimble','api_key')` from SQL — values come back **redacted** in any display or log, so the plaintext can't be extracted. Replace `users` with a group name to scope access more tightly.
  </Step>

  <Step title="Get the cookbook">
    All the SQL and the deploy helper live in the Nimble cookbook. Clone it and work from the repo root — the deploy commands below use paths relative to it.

    ```bash theme={"system"}
    git clone https://github.com/Nimbleway/cookbook.git
    cd cookbook
    ```
  </Step>

  <Step title="Deploy the catalog, schemas, and tools">
    One loop deploys everything. `01_setup.sql` creates the `nimble_integration` catalog and the `tools` + `recipes` schemas; each file in `tools/` then installs one table function. `deploy_sql.py` posts each multi-statement file to your warehouse (it treats the `$$ … $$` UDTF bodies as opaque), and all DDL is re-runnable (`CREATE … IF NOT EXISTS`).

    ```bash theme={"system"}
    # Grab a warehouse id automatically (first one), or set WH explicitly. Needs jq.
    WH=$(databricks warehouses list -o json | jq -r '.[0].id')

    for f in databricks/01_setup.sql databricks/tools/*.sql; do
        python3 databricks/helpers/deploy_sql.py --file "$f" --warehouse "$WH"
    done
    ```

    Each tool is a Python **UDTF** (`_nimble_xxx`) that makes the HTTP call, behind a thin SQL `RETURNS TABLE` wrapper (`nimble_xxx`) that supplies defaults and injects the API key. The wrapper is what you call and what Genie registers — there is no scalar twin. `nimble_search` defaults to `search_depth = lite` (`fast` / `deep` are premium and not enabled on every account).

    <Note>
      If your workspace uses Unity Catalog **Default Storage**, the `01_setup.sql` deploy may fail with *"Metastore storage root URL does not exist."* Create the catalog once from Catalog Explorer (**Create Catalog → Default Storage**, name it `nimble_integration`) — or use the explicit `CREATE CATALOG nimble_integration MANAGED LOCATION '<uri>'` form pointed at one of your UC external locations — then re-run the loop.
    </Note>

    <Card title="cookbook/databricks/tools/" icon="github" href="https://github.com/Nimbleway/cookbook/tree/main/databricks/tools">
      `nimble_search.sql`, `nimble_extract.sql`, `nimble_agent_list.sql`, `nimble_agent_describe.sql`, `nimble_agent_run.sql` — full UDTF + wrapper for each, with COMMENTs and smoke tests
    </Card>
  </Step>

  <Step title="Verify with a smoke test">
    Both should return real results within \~30 seconds.

    ```sql theme={"system"}
    -- Web search → expect ~10 rows of live results (title + url populated)
    SELECT title, url
    FROM   nimble_integration.tools.nimble_search('AI agent frameworks news', 10);

    -- Page extraction → expect a snippet of real extracted markdown
    SELECT substr(content, 1, 300) AS preview
    FROM   nimble_integration.tools.nimble_extract('https://www.nimbleway.com');
    ```

    If a tool returns zero rows, re-check the networking Preview + cold restart from [Prerequisites](#prerequisites).
  </Step>
</Steps>

## The tools

| Function                                                    | What it does                                                                                                                                                                                        |
| ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `nimble_search(query, max_results, focus, search_depth, …)` | Live web search → rows of `title, description, url, content`.                                                                                                                                       |
| `nimble_extract(url, render, format, …)`                    | Fetch + parse one URL → a row of `url, format, content` (markdown / html / links).                                                                                                                  |
| `nimble_agent_list(privacy, managed_by, …)`                 | The Nimble agent catalog → one row per agent.                                                                                                                                                       |
| `nimble_agent_describe(agent_name)`                         | A single agent's input parameters → one row per param (`param_name`, `required`, `type`, localization/pagination flags). Use it to build a valid `nimble_agent_run` `params_json` without guessing. |
| `nimble_agent_run(agent, params_json, localization)`        | Run any agent → one row: response envelope + `parsing` (VARIANT).                                                                                                                                   |

<Tip>
  **Two functions per tool.** Each capability is a Python UDTF (`_nimble_xxx`, does the HTTP call and yields rows) behind a thin SQL `RETURNS TABLE` wrapper (`nimble_xxx`). The wrapper does three things the UDTF can't: supply `DEFAULT` parameter values (UC Python UDTFs reject them), inject `secret('nimble','api_key')` once (a UDTF can't read `secret()` itself), and — for `nimble_agent_run` — `parse_json()` the payload into a navigable `VARIANT` (a Python UDF/UDTF can't *return* `VARIANT`). You only ever call the public wrapper.
</Tip>

## Common workflows

### Land web data as a governed Delta table

The payoff of SQL-native web data: results compose with `CREATE TABLE … AS` and inherit Unity Catalog governance — access control, lineage, and time travel. Enrich a table of company homepages into a managed Delta table in one statement:

```sql theme={"system"}
CREATE TABLE my_catalog.web.company_pages AS
SELECT c.company_id,
       c.homepage,
       x.content            AS homepage_markdown,
       current_timestamp()  AS fetched_at
FROM   my_catalog.crm.companies c,
       LATERAL nimble_integration.tools.nimble_extract(c.homepage) x;
```

Because `nimble_extract` yields zero rows on a failed fetch (instead of raising), the batch over every company is never aborted by one bad URL. The result is a real Unity Catalog Delta table: `DESCRIBE HISTORY` it for time travel, `GRANT SELECT` it to a group, and trace its column lineage back through `nimble_extract` to `companies`.

### Local business discovery at scale

Build a fresh, location-aware view of every business that matters for a category in a market: feed a `location_queries` table of research terms and get back the ranked Google Maps landscape — one row per business per query. Useful for market sizing, account-universe building, competitive territory mapping, and POI databases.

`google_maps_search` returns \~20 results per query under `parsing:entities:SearchResult`. `nimble_agent_run` is a table function whose `parsing` column is a `VARIANT`, so navigate it with `:` paths and explode the results array with `LATERAL variant_explode` — one row per business — then persist with `CREATE TABLE … AS`.

```sql theme={"system"}
CREATE OR REPLACE TABLE nimble_integration.recipes.local_businesses AS
SELECT
    q.query,
    q.category,
    biz:position::int                          AS position,
    biz:title::string                          AS name,
    biz:business_category[0]::string           AS business_category,
    biz:street_address::string                 AS street_address,
    biz:city::string                           AS city,
    biz:review_summary:overall_rating::double  AS rating,
    coalesce(biz:review_summary:review_count::int,
             biz:number_of_reviews::int)       AS review_count,
    biz:price_level::string                    AS price_level,
    biz:place_information:website_url::string  AS website,
    biz:business_status::string                AS business_status,
    biz:sponsored::boolean                     AS sponsored,
    current_timestamp()                        AS enriched_at
FROM nimble_integration.recipes.location_queries q,
     LATERAL nimble_integration.tools.nimble_agent_run(
         'google_maps_search',
         to_json(named_struct('query', q.query))
     ) a,
     LATERAL variant_explode(a.parsing:entities:SearchResult) AS e(pos, key, biz)
WHERE a.status = 'success';
```

**Input: `location_queries`**

| query                                 | category |
| ------------------------------------- | -------- |
| coffee shops in Williamsburg Brooklyn | coffee   |
| pizza restaurants in Chicago Loop     | pizza    |
| gyms in Austin Texas                  | gym      |

**Output: `local_businesses`** (one row per business per refresh)

| query                                 | position | name       | city     | rating | review\_count | price\_level |
| ------------------------------------- | -------- | ---------- | -------- | ------ | ------------- | ------------ |
| coffee shops in Williamsburg Brooklyn | 1        | Devoción   | Brooklyn | 4.5    | 2481          | \$\$         |
| coffee shops in Williamsburg Brooklyn | 2        | Sey Coffee | Brooklyn | 4.6    | 1840          | \$\$         |
| pizza restaurants in Chicago Loop     | 1        | Giordano's | Chicago  | 4.4    | 10618         | \$\$         |

<Tip>
  `google_maps_search` nests results under `parsing:entities:SearchResult` — not a flat array. `LATERAL variant_explode(a.parsing:entities:SearchResult)` is the correct unfold path. Different agents nest results differently; inspect once with `SELECT parsing FROM nimble_agent_run(<agent>, …)` before pinning the explode target and projection.
</Tip>

<Card title="cookbook/databricks/recipes/local_business_universe.sql" icon="github" href="https://github.com/Nimbleway/cookbook/blob/main/databricks/recipes/local_business_universe.sql">
  Full runnable recipe: the `location_queries` seed, the stitch-and-explode CTAS, sanity-check queries, and the governance proof points (time travel + lineage + GRANT)
</Card>

### Structured per-row enrichment with any agent

When there is no domain-specific need beyond a single identifier, `nimble_agent_run` enriches each input row with that agent's typed payload. PDP-style agents (Amazon PDP, LinkedIn Profile, Walmart PDP) return a single object; navigate it inline with `:` paths and cast leaves with `::type`.

```sql theme={"system"}
SELECT
    p.sku,
    a.parsing:brand::string                    AS brand,
    a.parsing:product_title::string            AS title,
    a.parsing:web_price::decimal(10, 2)        AS price,
    a.parsing:availability::boolean            AS in_stock,
    a.parsing:average_of_reviews::double       AS rating
FROM   my_catalog.crm.products p,
       LATERAL nimble_integration.tools.nimble_agent_run(
           'amazon_pdp',
           to_json(named_struct('asin', p.amazon_asin))
       ) a
WHERE  p.amazon_asin IS NOT NULL
  AND  a.status = 'success';
```

One input row → one output row, no `variant_explode` needed. Param and field names differ per agent (`amazon_pdp` takes `asin`; `product_title` vs. `product_name`, `web_price` vs. `price`) — discover the catalog with `SELECT * FROM nimble_agent_list()`, read an agent's inputs with `SELECT * FROM nimble_agent_describe('<agent>')`, and inspect a single response with `SELECT parsing FROM nimble_agent_run(<agent>, …)` before pinning a projection.

### Schedule recurring enrichment

Each tool runs in a single SQL statement, so a [Databricks Workflow](https://docs.databricks.com/aws/en/jobs/) can execute the enrichment directly on a schedule — point a SQL task at the `CREATE OR REPLACE TABLE … AS` statement above and set a cron trigger. No wrapper procedure required. The same statement also drops straight into a dbt model body for orchestrated, incremental refreshes.

## Fallback: `http_request()` without the networking preview

If a workspace can't enable UDTF egress, the `http_request()` SQL builtin reaches the Nimble API through a different, always-on egress path — at the cost of `from_json` parsing in SQL and no per-row isolation. It needs a one-time UC HTTP `CONNECTION` (requires the `CREATE CONNECTION` privilege):

```sql theme={"system"}
CREATE CONNECTION IF NOT EXISTS nimble_api TYPE HTTP
OPTIONS (
    host         'https://sdk.nimbleway.com',
    port         '443',
    base_path    '/',
    bearer_token secret('nimble', 'api_key')
);
```

A fallback query then calls `http_request(conn => 'nimble_api', method => 'POST', path => '/v1/search', headers => map('Content-Type','application/json'), json => to_json(named_struct(…)))`, gates on `response.status_code`, and parses `response.text` with `from_json`. See `ADDING_A_TOOL.md` in the cookbook for the full pattern.

## Roll out across your organization

* **Tune for your Nimble rate-limit tier.** Each tool call is one upstream request — one per input row. For high-cardinality inputs (thousands of rows), watch for 429s; because failures yield zero rows, a single retry pass over the rows that produced no output is the typical recovery. Nimble's [rate-limits page](/nimble-sdk/admin/rate-limits) lists per-tier ceilings.
* **Right-size the warehouse.** A small serverless warehouse handles daily refreshes over a few hundred input rows. For larger enrichments (10K+ rows), step up the size only for the duration of the scheduled job.
* **Surface failures separately.** Because tools yield zero rows on failure, an input row with no matching output row is a failed call — left-join the input table against the result to find the gaps and audit them, rather than grepping job logs.
* **Don't ship guesses.** Input params and `parsing` field names differ per agent. Read the inputs with `nimble_agent_describe('<agent>')` and inspect the output shape once (`SELECT parsing FROM nimble_agent_run(<agent>, …)`) before pinning a projection into a dbt model or production view.

## Use it from Databricks Genie

Genie registers **table functions** as tools, so each public function is directly registrable — point a Genie space at `nimble_integration.tools.nimble_search` (and the others). The function `COMMENT` and per-column `COMMENT`s are what the LLM reads to decide when and how to call each tool. The cookbook ships `helpers/create_genie_space.py` to create a space wired to all five functions programmatically.

## Resources

<CardGroup cols={2}>
  <Card title="Nimbleway/cookbook (databricks/)" icon="github" href="https://github.com/Nimbleway/cookbook/tree/main/databricks">
    Every SQL file on this page, the one-time prereqs, the local-business recipe, and the deploy helpers
  </Card>

  <Card title="Databricks MCP Server" icon="server" href="/integrations/partnerships/databricks">
    The agent-side surface: Nimble MCP Server from the Databricks Marketplace, wired into Genie and AI Playground
  </Card>

  <Card title="Nimble Web Search Agents" icon="robot" href="/nimble-sdk/agentic/agents">
    Overview of WSAs — what they are, when to use them, how they parse
  </Card>

  <Card title="Nimble Agent Gallery" icon="grid" href="/nimble-sdk/agentic/agent-gallery">
    Browse the catalog of pre-built agents and their per-agent parsing shapes
  </Card>

  <Card title="Databricks UC Python UDFs/UDTFs" icon="file-code" href="https://docs.databricks.com/aws/en/udf/unity-catalog">
    How Unity Catalog tabular UDFs work — `eval()` handler, `RETURNS TABLE`, and network egress
  </Card>

  <Card title="Databricks Genie" icon="sparkles" href="https://docs.databricks.com/aws/en/genie/">
    Register these table functions as tools in a Genie space for natural-language web data
  </Card>
</CardGroup>
