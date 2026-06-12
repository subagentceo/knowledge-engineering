> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Data Enrichment

> Enrich warehouse tables at scale with Nimble Web Search Agents using a SQL-native UDTF for Snowflake.

This integration is ideal for data engineers who need to enrich large datasets with web intelligence directly in their Snowflake pipelines — without leaving SQL or building custom API integrations.

Nimble provides a SQL-native User Defined Table Function (UDTF) for Snowflake that runs structured web extraction directly inside your queries. The integration uses Snowflake's [External Access Integration](https://docs.snowflake.com/en/developer-guide/external-network-access/external-network-access-overview) to securely connect to the Nimble API, and invokes one [Web Search Agent](/nimble-sdk/agentic/agents) per row — every agent returns typed, domain-specific fields server-side, so no LLM is needed downstream to extract structured data from raw HTML.

```sql Enrich a product master with live Amazon details, in one statement theme={"system"}
SELECT  p.sku,
        a.parsing:web_price::NUMBER(10, 2)         AS amazon_price,
        a.parsing:availability::BOOLEAN            AS in_stock,
        a.parsing:average_of_reviews::NUMBER(3, 2) AS rating
FROM    products p,
        TABLE(NIMBLE_INTEGRATION.TOOLS.NIMBLE_AGENT_RUN(
            'amazon_pdp',
            OBJECT_CONSTRUCT('asin', p.amazon_asin)
        )) a
WHERE   p.amazon_asin IS NOT NULL
  AND   a.status = 'success';
```

One SQL statement, one Snowflake-native function — no stored procedures, no `CALL + RESULT_SCAN` round-trips, no Python middle-tier. dbt models, Snowflake Tasks, Streamlit apps, and any BI tool consume the output transparently.

## What you get

* **One UDTF, every [Web Search Agent](/nimble-sdk/agentic/agent-gallery).** Pass an agent name (`amazon_pdp`, `google_maps_search`, `linkedin_search_companies`, `yelp_serp`, `walmart_serp`, `zillow_pdp`, …) and that agent's input params. The same function shape covers every domain — retail, real estate, social, local business, healthcare, jobs.
* **Typed structured output, no LLM in the loop.** Each agent parses its target domain server-side and returns purpose-built fields — product title, price, ratings, review count, ranking position. No Cortex Complete pass needed to extract values from markdown.
* **One input row → one or many output rows.** PDP-style agents return a single product object per input. SERP-style agents return an array; pair the UDTF with `LATERAL FLATTEN` to expand into per-product rows.
* **Per-row error isolation.** A 429 on one input row surfaces as `status='http_429'` for that row only. The rest of the lateral join still completes — easy to filter, easy to retry.
* **Stays inside your Snowflake account.** Only authorized outbound calls hit Nimble. Secrets live in Snowflake's secret manager.

## Prerequisites

* `ACCOUNTADMIN` role for one-time setup
* Snowflake Enterprise edition or higher
* A Nimble API key ([sign up free](https://online.nimbleway.com/signup))

## Install in Snowflake

<Steps>
  <Step title="Run the shared setup (skip if already installed)">
    `NIMBLE_AGENT_RUN` shares the same role, database, warehouse, secret, and External Access Integration as `NIMBLE_SEARCH` and `NIMBLE_EXTRACT`. If you already deployed those for the [Cortex Agents](/integrations/partnerships/snowflake/cortex-agents) integration, skip ahead.

    ```sql theme={"system"}
    USE ROLE ACCOUNTADMIN;

    CREATE ROLE IF NOT EXISTS nimble_role;
    GRANT DATABASE ROLE SNOWFLAKE.CORTEX_USER TO ROLE nimble_role;

    CREATE DATABASE IF NOT EXISTS NIMBLE_INTEGRATION;
    CREATE SCHEMA   IF NOT EXISTS NIMBLE_INTEGRATION.TOOLS;
    GRANT USAGE ON DATABASE NIMBLE_INTEGRATION       TO ROLE nimble_role;
    GRANT USAGE ON SCHEMA   NIMBLE_INTEGRATION.TOOLS TO ROLE nimble_role;

    CREATE WAREHOUSE IF NOT EXISTS NIMBLE_AGENT_WH
      WAREHOUSE_SIZE = XSMALL
      AUTO_SUSPEND   = 60
      AUTO_RESUME    = TRUE;
    GRANT USAGE ON WAREHOUSE NIMBLE_AGENT_WH TO ROLE nimble_role;

    CREATE OR REPLACE NETWORK RULE nimble_api_rule
      MODE       = EGRESS
      TYPE       = HOST_PORT
      VALUE_LIST = ('sdk.nimbleway.com:443');

    CREATE OR REPLACE SECRET nimble_api_key
      TYPE          = GENERIC_STRING
      SECRET_STRING = 'YOUR_NIMBLE_API_KEY';

    CREATE OR REPLACE EXTERNAL ACCESS INTEGRATION nimble_eai
      ALLOWED_NETWORK_RULES          = (nimble_api_rule)
      ALLOWED_AUTHENTICATION_SECRETS = (nimble_api_key)
      ENABLED                        = TRUE;

    GRANT USAGE ON INTEGRATION nimble_eai TO ROLE nimble_role;
    ```

    <Card title="cookbook/snowflake/setup/setup.sql" icon="github" href="https://github.com/Nimbleway/cookbook/blob/main/snowflake/setup/setup.sql">
      Full setup script: role, grants, database, schema, warehouse, network rule, secret, EAI
    </Card>
  </Step>

  <Step title="Deploy NIMBLE_AGENT_RUN">
    A Python UDTF that wraps Nimble's [agents/run API](https://docs.nimbleway.com/api-reference/agents/run-realtime). The signature is `(agent_name STRING, params OBJECT)` — every Web Search Agent's `params` body is a JSON object, so `OBJECT` removes the need for a `::VARIANT` cast on every call site.

    ```sql theme={"system"}
    CREATE OR REPLACE FUNCTION NIMBLE_INTEGRATION.TOOLS.NIMBLE_AGENT_RUN(
      agent_name  STRING,
      params      OBJECT
    )
    RETURNS TABLE (
      task_id     STRING,
      status      STRING,
      status_code INTEGER,
      url         STRING,
      parsing     VARIANT,
      warnings    VARIANT,
      raw         VARIANT
    )
    LANGUAGE PYTHON
    RUNTIME_VERSION = 3.11
    PACKAGES        = ('requests')
    HANDLER         = 'NimbleAgentRun'
    EXTERNAL_ACCESS_INTEGRATIONS = (nimble_eai)
    SECRETS         = ('cred' = nimble_api_key)
    AS $$
    import _snowflake, requests

    NIMBLE_AGENTS_RUN_URL = "https://sdk.nimbleway.com/v1/agents/run"

    class NimbleAgentRun:
        def process(self, agent_name, params):
            token = _snowflake.get_generic_secret_string("cred")
            headers = {
                "Authorization": f"Bearer {token}",
                "Content-Type": "application/json",
                "X-Client-Source": "snowflake-cortex-agent",
            }
            body = {"agent": agent_name, "params": params or {}}
            resp = requests.post(NIMBLE_AGENTS_RUN_URL, json=body,
                                 headers=headers, timeout=120)
            if resp.status_code >= 400:
                err = resp.json() if resp.headers.get("content-type", "").startswith("application/json") else {"text": resp.text}
                yield (None, f"http_{resp.status_code}", resp.status_code,
                       None, None, None, err)
                return
            data = resp.json()
            agent_data = data.get("data") or {}
            yield (
                data.get("task_id"),
                data.get("status"),
                data.get("status_code"),
                data.get("url"),
                agent_data.get("parsing"),
                data.get("warnings"),
                data,
            )
    $$;

    GRANT USAGE ON FUNCTION NIMBLE_INTEGRATION.TOOLS.NIMBLE_AGENT_RUN(STRING, OBJECT)
      TO ROLE nimble_role;
    ```

    <Card title="cookbook/snowflake/udtf-data-feeds/nimble_agent_run.sql" icon="github" href="https://github.com/Nimbleway/cookbook/blob/main/snowflake/udtf-data-feeds/nimble_agent_run.sql">
      Full UDTF with per-row error isolation, request-timeout handling, and smoke tests
    </Card>
  </Step>

  <Step title="Verify with a smoke test">
    Pick the response shape that matches the agent you want to call. PDP-style agents (Amazon PDP, LinkedIn Profile, Walmart PDP, …) return a single product object. SERP-style agents (Amazon SERP, Google Search, …) return an array of products.

    ```sql theme={"system"}
    -- PDP-style: parsing is a single object
    SELECT parsing:product_title::STRING  AS title,
           parsing:web_price::NUMBER      AS price,
           parsing:availability::BOOLEAN  AS in_stock
    FROM   TABLE(NIMBLE_INTEGRATION.TOOLS.NIMBLE_AGENT_RUN(
               'amazon_pdp',
               OBJECT_CONSTRUCT('asin', 'B09B8V1LZ3')
           ));

    -- SERP-style: parsing is an array; FLATTEN to one row per product
    SELECT p.value:position::INTEGER       AS position,
           p.value:asin::STRING            AS asin,
           p.value:product_name::STRING    AS title,
           p.value:price::NUMBER(10, 2)    AS price,
           p.value:rating::NUMBER(3, 2)    AS rating
    FROM   TABLE(NIMBLE_INTEGRATION.TOOLS.NIMBLE_AGENT_RUN(
               'amazon_serp',
               OBJECT_CONSTRUCT('keyword', 'noise canceling headphones')
           )) a,
           LATERAL FLATTEN(INPUT => a.parsing) p
    WHERE  a.status = 'success'
    ORDER  BY position
    LIMIT  10;
    ```

    Both should return a populated result within \~30 seconds.
  </Step>
</Steps>

<Tip>
  **Discover an agent's field names before pinning a projection.** Each agent in the [gallery](/nimble-sdk/agentic/agent-gallery) returns its own shape — `product_title` vs. `product_name`, `web_price` vs. `price`, `review_count` vs. `reviews_count`. Inspect once before wiring into a dbt model: `SELECT raw FROM TABLE(NIMBLE_AGENT_RUN(<agent>, …))` shows the full response; `SELECT OBJECT_KEYS(parsing[0]) FROM …` lists the per-product keys for SERP-style agents.
</Tip>

## Common workflows

### Local business discovery at scale

Build a fresh, location-aware view of every business that matters for a category in a market: feed a `LOCATION_QUERIES` table of research terms, get back the ranked Google Maps landscape — one row per business per query per refresh. Useful for market sizing, account-universe building, competitive territory mapping, and POI databases.

`google_maps_search` returns up to 20 results per query with rich per-place data: name, address, rating, review count, phone, business status, price level, sponsored flag, plus opening hours and accessibility metadata. The lateral join plus `LATERAL FLATTEN` on the nested results array is a single SQL statement.

```sql theme={"system"}
INSERT INTO LOCAL_BUSINESSES (query, category, position, name, address, city, rating, review_count, phone, business_status, price_level, sponsored, status, enriched_at)
SELECT
    q.query,
    q.category,
    p.value:position::INTEGER                          AS position,
    p.value:title::STRING                              AS name,
    p.value:address::STRING                            AS address,
    p.value:city::STRING                               AS city,
    p.value:review_summary:overall_rating::NUMBER(3, 2) AS rating,
    p.value:number_of_reviews::INTEGER                 AS review_count,
    p.value:phone_number::STRING                       AS phone,
    p.value:business_status::STRING                    AS business_status,
    p.value:price_level::STRING                        AS price_level,
    p.value:sponsored::BOOLEAN                         AS sponsored,
    a.status                                           AS status,
    CURRENT_TIMESTAMP()                                AS enriched_at
FROM LOCATION_QUERIES q,
     TABLE(NIMBLE_INTEGRATION.TOOLS.NIMBLE_AGENT_RUN(
         'google_maps_search',
         OBJECT_CONSTRUCT('query', q.query)
     )) a,
     LATERAL FLATTEN(INPUT => a.parsing:entities:SearchResult) p
WHERE a.status = 'success';
```

**Input: `LOCATION_QUERIES`**

| query                                  | category        |
| -------------------------------------- | --------------- |
| coffee shop in austin texas            | Food & Beverage |
| veterinary clinic in seattle wa        | Pet care        |
| boutique fitness studio in brooklyn ny | Fitness         |

**Output: `LOCAL_BUSINESSES`** (one row per business per refresh)

| query                       | position | name            | address                  | rating | review\_count | price\_level | sponsored |
| --------------------------- | -------- | --------------- | ------------------------ | ------ | ------------- | ------------ | --------- |
| coffee shop in austin texas | 1        | Epoch Coffee    | 221 W N Loop Blvd, …     | 4.5    | 2481          | \$           | FALSE     |
| coffee shop in austin texas | 2        | Mozart's Coffee | 3825 Lake Austin Blvd, … | 4.5    | 10618         | \$\$         | FALSE     |
| coffee shop in austin texas | 3        | Jo's Coffee     | 1300 S Congress Ave, …   | 4.4    | 1958          | \$\$         | FALSE     |

<Tip>
  `google_maps_search` returns `parsing.entities.SearchResult` (a nested array inside the `parsing` dict), not a flat `parsing` array like Amazon SERP. `LATERAL FLATTEN(INPUT => a.parsing:entities:SearchResult)` is the correct unfold path. Different agents nest results differently — always inspect with `SELECT raw FROM …` once per agent before pinning the FLATTEN target.
</Tip>

A `V_NEW_ENTRANTS` view can layer on top, flagging place IDs ranking in the top 20 for a tracked query for the first time in the last 7 days — useful for catching new market entrants before they take real share.

<Card title="cookbook/snowflake/recipes/amazon_keyword_research/" icon="github" href="https://github.com/Nimbleway/cookbook/tree/main/snowflake/recipes/amazon_keyword_research">
  Companion cookbook recipe (Amazon SERP flavor): full notebook, sample data, the lateral-join INSERT, the V\_NEW\_ENTRANTS view, and the daily Task — drop-in adapt the agent name and FLATTEN target to switch to `google_maps_search` or any other SERP-style WSA
</Card>

### Product-master enrichment

Some agents return a single structured object instead of an array — Amazon PDP, LinkedIn Profile, Walmart PDP, Best Buy PDP. Use them when you already know which products you care about and want a full attribute dump per identifier: brand, description, color, packaging, pricing, availability, reviews.

```sql theme={"system"}
SELECT
    p.sku,
    a.parsing:brand::STRING                    AS brand,
    a.parsing:product_title::STRING            AS title,
    a.parsing:brief_product_description::STRING AS description,
    a.parsing:color::STRING                    AS color,
    a.parsing:packaging::STRING                AS packaging,
    a.parsing:web_price::NUMBER(10, 2)         AS price,
    a.parsing:availability::BOOLEAN            AS in_stock,
    a.parsing:average_of_reviews::NUMBER(3, 2) AS rating
FROM   PRODUCTS p,
       TABLE(NIMBLE_INTEGRATION.TOOLS.NIMBLE_AGENT_RUN(
           'amazon_pdp',
           OBJECT_CONSTRUCT('asin', p.amazon_asin)
       )) a
WHERE  p.amazon_asin IS NOT NULL
  AND  a.status = 'success';
```

One row per input row. No `LATERAL FLATTEN` needed — the agent already returns the typed product as a single object. PDP-style agents typically return \~30 attribute fields per product; project whichever subset your downstream models need.

### Schedule recurring enrichment

`NIMBLE_AGENT_RUN` runs at a single SQL statement, which means a Snowflake Task can execute the enrichment directly. No wrapper procedure required.

```sql theme={"system"}
CREATE OR REPLACE TASK daily_local_business_discovery
  WAREHOUSE = NIMBLE_AGENT_WH
  SCHEDULE  = 'USING CRON 0 8 * * * America/Los_Angeles'
AS
  INSERT INTO LOCAL_BUSINESSES (query, category, position, name, address, city, rating, review_count, phone, business_status, price_level, sponsored, status, enriched_at)
  SELECT
      q.query,
      q.category,
      p.value:position::INTEGER                          AS position,
      p.value:title::STRING                              AS name,
      p.value:address::STRING                            AS address,
      p.value:city::STRING                               AS city,
      p.value:review_summary:overall_rating::NUMBER(3, 2) AS rating,
      p.value:number_of_reviews::INTEGER                 AS review_count,
      p.value:phone_number::STRING                       AS phone,
      p.value:business_status::STRING                    AS business_status,
      p.value:price_level::STRING                        AS price_level,
      p.value:sponsored::BOOLEAN                         AS sponsored,
      a.status                                           AS status,
      CURRENT_TIMESTAMP()                                AS enriched_at
  FROM LOCATION_QUERIES q,
       TABLE(NIMBLE_INTEGRATION.TOOLS.NIMBLE_AGENT_RUN(
           'google_maps_search',
           OBJECT_CONSTRUCT('query', q.query)
       )) a,
       LATERAL FLATTEN(INPUT => a.parsing:entities:SearchResult) p
  WHERE a.status = 'success';

ALTER TASK daily_local_business_discovery RESUME;
```

<Card title="cookbook/snowflake/recipes/amazon_keyword_research/schedule.sql" icon="github" href="https://github.com/Nimbleway/cookbook/blob/main/snowflake/recipes/amazon_keyword_research/schedule.sql">
  Reference cookbook Task (Amazon SERP flavor): incremental load, category column, error-row filtering — adapt the agent name and FLATTEN target for `google_maps_search` or any other WSA
</Card>

### Use as a dbt incremental model

The lateral-join + `FLATTEN` shape is also a valid dbt model body. Drop the SQL block above into `models/local_businesses.sql`, add a config block for incremental materialization, and dbt orchestrates the daily refresh — the same way it would for any other model.

```sql theme={"system"}
{{ config(
    materialized='incremental',
    unique_key=['query', 'position', 'enriched_at'],
    on_schema_change='append_new_columns'
) }}

SELECT
    q.query,
    q.category,
    p.value:position::INTEGER                          AS position,
    p.value:title::STRING                              AS name,
    p.value:address::STRING                            AS address,
    p.value:review_summary:overall_rating::NUMBER(3, 2) AS rating,
    p.value:number_of_reviews::INTEGER                 AS review_count,
    a.status                                           AS status,
    CURRENT_TIMESTAMP()                                AS enriched_at
FROM {{ ref('location_queries') }} q,
     TABLE(NIMBLE_INTEGRATION.TOOLS.NIMBLE_AGENT_RUN(
         'google_maps_search',
         OBJECT_CONSTRUCT('query', q.query)
     )) a,
     LATERAL FLATTEN(INPUT => a.parsing:entities:SearchResult) p
WHERE a.status = 'success'
{% if is_incremental() %}
  AND CURRENT_TIMESTAMP() > (SELECT MAX(enriched_at) FROM {{ this }})
{% endif %}
```

## Roll out across your organization

* **Tune for your Nimble rate-limit tier.** Each `NIMBLE_AGENT_RUN` call is one upstream request — one per row in your input table. For high-cardinality inputs (thousands of rows), watch for 429s; they surface per-row as `status='http_429'`, so a single retry pass over those rows is the typical recovery. Nimble's [rate-limits page](/nimble-sdk/admin/rate-limits) lists per-tier ceilings.
* **Right-size the warehouse.** `XSMALL` with 60-second auto-suspend is fine for daily Task runs over a few hundred input rows. For larger enrichments (10K+ rows), step up to `SMALL` or `MEDIUM` only for the duration of the scheduled task; Snowflake bills per second.
* **Surface failures separately.** Filter `status='success'` for analytical views, but log non-success rows to a `_FAILURES` audit table — `status='http_429'`, `'http_4xx'`, `'request_error'` — so a sudden spike is visible without grepping Task logs.
* **Don't ship guesses.** Field names inside `parsing` differ per agent. Inspect the shape once per agent (`SELECT raw FROM …` or `SELECT OBJECT_KEYS(parsing[0]) FROM …`) before pinning a projection into a dbt model or production view.

## When to use which surface

The Snowflake integration ships three primitives across two pages. Pick by question:

| You want to…                                                    | Use                                                    | Page                                                                |
| --------------------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------- |
| Chat with an agent in Snowflake Intelligence that knows the web | A pre-built **Cortex Agent** wired to scalar UDFs      | [Cortex Agents](/integrations/partnerships/snowflake/cortex-agents) |
| Call generic web search or page extraction inline in a `SELECT` | **`NIMBLE_SEARCH`** / **`NIMBLE_EXTRACT`** scalar UDFs | [Cortex Agents](/integrations/partnerships/snowflake/cortex-agents) |
| Enrich N warehouse rows with structured fields per row          | **`NIMBLE_AGENT_RUN`** UDTF                            | This page                                                           |

Cortex Agent custom tools can only be scalar functions or procedures — they can't be UDTFs. So `NIMBLE_AGENT_RUN` lives here as a sibling surface, not as a third tool on the agent.

## Resources

<CardGroup cols={2}>
  <Card title="Nimbleway/cookbook (snowflake/)" icon="github" href="https://github.com/Nimbleway/cookbook/tree/main/snowflake">
    Every SQL file referenced on this page, plus the Amazon keyword research recipe
  </Card>

  <Card title="Nimble Web Search Agents" icon="robot" href="/nimble-sdk/agentic/agents">
    Overview of WSAs — what they are, when to use them, how they parse
  </Card>

  <Card title="Nimble Agent Gallery" icon="grid" href="/nimble-sdk/agentic/agent-gallery">
    Browse the catalog of pre-built agents and their per-agent parsing shapes
  </Card>

  <Card title="Snowflake Python UDTFs" icon="file-code" href="https://docs.snowflake.com/en/developer-guide/udf/python/udf-python-tabular-functions">
    How Snowflake's tabular UDFs work — `process()` handler, `RETURNS TABLE`, lateral-join semantics
  </Card>

  <Card title="Snowflake External Access Integration" icon="shield-check" href="https://docs.snowflake.com/en/developer-guide/external-network-access/external-network-access-overview">
    How Snowflake gates outbound HTTPS from UDFs and stored procedures
  </Card>

  <Card title="Cortex Agents (sibling surface)" icon="robot" href="/integrations/partnerships/snowflake/cortex-agents">
    Scalar UDFs for Search + Extract, wired into a pre-built Cortex Agent
  </Card>
</CardGroup>
