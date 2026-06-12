> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Cortex Agents

> Call Nimble Search and Extract from Snowflake SQL, plus a pre-built Cortex Agent, without leaving your account

Bring Nimble's web data into Snowflake as scalar SQL UDFs, then wire them into a [Cortex Agent](https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-agents) so any Snowflake Intelligence chat (or any caller of the agent run REST API) can search the web and pull live page content alongside your warehouse data.

## What you get

* **`NIMBLE_SEARCH` and `NIMBLE_EXTRACT` callable inline from any Snowflake SQL.** Pipelines, notebooks, Streamlit, dbt — usable directly in `SELECT`, views, and joins because the UDFs return `VARIANT`.
* **A pre-built Cortex Agent** wired to those tools, invocable from Snowflake Intelligence or the agent run REST API
* **Stays inside your Snowflake account.** Only authorized outbound calls hit Nimble.
* **One-time setup, run by ACCOUNTADMIN.** Under 5 minutes.

## Prerequisites

* `ACCOUNTADMIN` role
* Snowflake Enterprise edition or higher
* A Nimble API key ([sign up free](https://online.nimbleway.com/signup))

## Install Nimble in Snowflake

<Steps>
  <Step title="Create the role, database, and dedicated warehouse">
    Set up an isolated namespace for the integration. A dedicated warehouse keeps agent traffic separate from analytics workloads and makes cost attribution trivial.

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
    ```

    <Card title="cookbook/snowflake/setup/setup.sql" icon="github" href="https://github.com/Nimbleway/cookbook/blob/main/snowflake/setup/setup.sql">
      Full setup script: role, grants, database, schema, warehouse
    </Card>
  </Step>

  <Step title="Authorize outbound traffic to Nimble">
    Create a network rule, store your Nimble API key as a Snowflake secret, and bind both into an External Access Integration. The UDFs reference the EAI to make outbound HTTPS calls.

    ```sql theme={"system"}
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

    <Card title="cookbook/snowflake/setup/setup.sql" icon="github" href="https://github.com/Nimbleway/cookbook/blob/main/snowflake/setup/setup.sql#L45">
      Network rule, secret, and External Access Integration block
    </Card>
  </Step>

  <Step title="Deploy NIMBLE_SEARCH">
    A Python UDF that calls Nimble's Search API and returns the response as a `VARIANT`. Callers navigate the JSON inline with `:field` syntax — no `PARSE_JSON()` needed.

    ```sql theme={"system"}
    CREATE OR REPLACE FUNCTION NIMBLE_INTEGRATION.TOOLS.NIMBLE_SEARCH(
      query        STRING,
      max_results  INTEGER DEFAULT 10
    )
    RETURNS VARIANT
    LANGUAGE PYTHON
    RUNTIME_VERSION = 3.11
    PACKAGES        = ('requests')
    HANDLER         = 'run'
    EXTERNAL_ACCESS_INTEGRATIONS = (nimble_eai)
    SECRETS         = ('api_key' = nimble_api_key)
    AS $$
    import _snowflake, requests

    def run(query, max_results):
        key = _snowflake.get_generic_secret_string('api_key')
        r = requests.post(
            'https://sdk.nimbleway.com/v1/search',
            headers={'Authorization': f'Bearer {key}',
                     'Content-Type':  'application/json'},
            json={'query': query, 'max_results': max_results},
            timeout=60,
        )
        r.raise_for_status()
        return r.json()
    $$;

    GRANT USAGE ON FUNCTION NIMBLE_INTEGRATION.TOOLS.NIMBLE_SEARCH(STRING, INTEGER)
      TO ROLE nimble_role;
    ```

    <Card title="cookbook/snowflake/cortex-agent-tools/01_nimble_search.sql" icon="github" href="https://github.com/Nimbleway/cookbook/blob/main/snowflake/cortex-agent-tools/01_nimble_search.sql">
      Full UDF with focus, depth, country, locale, and domain filters
    </Card>
  </Step>

  <Step title="Deploy NIMBLE_EXTRACT">
    Same shape as `NIMBLE_SEARCH`. Takes a single URL and returns the parsed page content as a `VARIANT`.

    ```sql theme={"system"}
    CREATE OR REPLACE FUNCTION NIMBLE_INTEGRATION.TOOLS.NIMBLE_EXTRACT(
      url     STRING,
      render  BOOLEAN DEFAULT TRUE
    )
    RETURNS VARIANT
    LANGUAGE PYTHON
    RUNTIME_VERSION = 3.11
    PACKAGES        = ('requests')
    HANDLER         = 'run'
    EXTERNAL_ACCESS_INTEGRATIONS = (nimble_eai)
    SECRETS         = ('api_key' = nimble_api_key)
    AS $$
    import _snowflake, requests

    def run(url, render):
        key = _snowflake.get_generic_secret_string('api_key')
        r = requests.post(
            'https://sdk.nimbleway.com/v1/extract',
            headers={'Authorization': f'Bearer {key}',
                     'Content-Type':  'application/json'},
            json={'url': url, 'render': render, 'formats': ['markdown']},
            timeout=90,
        )
        r.raise_for_status()
        return r.json()
    $$;

    GRANT USAGE ON FUNCTION NIMBLE_INTEGRATION.TOOLS.NIMBLE_EXTRACT(STRING, BOOLEAN)
      TO ROLE nimble_role;
    ```

    <Card title="cookbook/snowflake/cortex-agent-tools/02_nimble_extract.sql" icon="github" href="https://github.com/Nimbleway/cookbook/blob/main/snowflake/cortex-agent-tools/02_nimble_extract.sql">
      Full UDF with driver, country, locale, and format selection
    </Card>
  </Step>

  <Step title="Register the Cortex Agent">
    Wire both UDFs into a Cortex Agent. `tool_spec.type: generic` declares each tool's JSON schema; `tool_resources` maps the schema to the underlying function (`type: function`) and the warehouse that runs it.

    ```sql theme={"system"}
    CREATE OR REPLACE AGENT nimble_web_research_agent
      COMMENT = 'Agent with Nimble web search and content retrieval'
      FROM SPECIFICATION
      $$
      models:
        orchestration: auto

      orchestration:
        budget:
          seconds: 60
          tokens:  32000

      instructions:
        system: |
          You are a research assistant with access to Nimble's web data toolkit.
          Always cite source URLs.
        orchestration: |
          - Use NIMBLE_SEARCH for queries requiring web search.
          - Use NIMBLE_EXTRACT when the user provides specific URLs.

      tools:
        - tool_spec:
            type: generic
            name: nimble_search
            description: Search the web using Nimble.
            input_schema:
              type: object
              properties:
                query:       { type: string,  description: The search query. }
                max_results: { type: integer, description: "Number of results (default 10)." }
              required: [query]

        - tool_spec:
            type: generic
            name: nimble_extract
            description: Retrieve parsed content for a single URL.
            input_schema:
              type: object
              properties:
                url:    { type: string,  description: The URL to extract. }
                render: { type: boolean, description: "JS-render the page (slower; needed for SPAs)." }
              required: [url]

      tool_resources:
        nimble_search:
          type: function
          execution_environment:
            type:      warehouse
            warehouse: NIMBLE_AGENT_WH
          identifier: NIMBLE_INTEGRATION.TOOLS.NIMBLE_SEARCH
        nimble_extract:
          type: function
          execution_environment:
            type:      warehouse
            warehouse: NIMBLE_AGENT_WH
          identifier: NIMBLE_INTEGRATION.TOOLS.NIMBLE_EXTRACT
      $$;
    ```

    <Card title="cookbook/snowflake/cortex-agent-tools/03_cortex_agent.sql" icon="github" href="https://github.com/Nimbleway/cookbook/blob/main/snowflake/cortex-agent-tools/03_cortex_agent.sql">
      Full agent spec, including grants and verification queries
    </Card>
  </Step>
</Steps>

## Try these recipes

### Recipe 1: Quick search and extract from SQL

Both UDFs return `VARIANT`. Navigate the response inline with `:field` syntax — no `CALL`, no `PARSE_JSON`, no `RESULT_SCAN`.

```sql theme={"system"}
-- Top result URL for a query, in one line
SELECT NIMBLE_INTEGRATION.TOOLS.NIMBLE_SEARCH('AI agents news', 5)
       :results[0]:url::STRING AS top_url;

-- Rendered markdown of a single page
SELECT NIMBLE_INTEGRATION.TOOLS.NIMBLE_EXTRACT(
         'https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-agents'
       ):data:markdown::STRING AS page_markdown;

-- Flatten search results into a table — one row per result
SELECT
    f.value:metadata:position::INTEGER          AS position,
    f.value:title::STRING                       AS title,
    f.value:url::STRING                         AS url,
    f.value:description::STRING                 AS description,
    SUBSTRING(f.value:content::STRING, 1, 300)  AS content_preview
FROM TABLE(FLATTEN(
       input => NIMBLE_INTEGRATION.TOOLS.NIMBLE_SEARCH('AI agents news', 5):results
     )) f
ORDER BY position;

-- Compose with warehouse data: enrich a table of search terms with their top result
SELECT t.term,
       NIMBLE_INTEGRATION.TOOLS.NIMBLE_SEARCH(t.term, 3):results[0]:url::STRING AS top_url
FROM   my_search_terms t;
```

Because the UDFs are scalar and return `VARIANT`, they slot directly into views, dbt models, `FLATTEN` calls, and joins against warehouse data — no two-step `CALL` + `RESULT_SCAN` + `PARSE_JSON` workaround.

### Recipe 2: CPG retailer price and availability monitoring

A CPG brand keeps its product master in Snowflake and wants daily competitive intelligence on how its SKUs appear across Amazon, Walmart, and Target. Nimble Search finds the listing URL per SKU per retailer; Nimble Extract pulls price, stock, and reviews from each listing; the enriched rows land in a `PRODUCT_LISTINGS` table that BI can read.

**Input: `PRODUCTS`**

| sku     | brand            | product\_name              | upc          | category  |
| ------- | ---------------- | -------------------------- | ------------ | --------- |
| LB-001  | Liquid Death     | Mountain Water 16.9oz 12pk | 810014710013 | Beverages |
| OB-014  | Olipop           | Vintage Cola 12oz 12pk     | 850000334038 | Beverages |
| ATH-002 | Athletic Brewing | Free Wave Hazy IPA 12pk    | 850001234567 | Beverages |

**Output: `PRODUCT_LISTINGS`**

| sku    | retailer | listing\_url                                          | price | currency | in\_stock | rating | review\_count | last\_seen\_at |
| ------ | -------- | ----------------------------------------------------- | ----- | -------- | --------- | ------ | ------------- | -------------- |
| LB-001 | amazon   | [https://amazon.com/dp/](https://amazon.com/dp/)...   | 18.99 | USD      | TRUE      | 4.7    | 12483         | 2026-05-25     |
| LB-001 | walmart  | [https://walmart.com/ip/](https://walmart.com/ip/)... | 17.48 | USD      | TRUE      | 4.6    | 3201          | 2026-05-25     |
| LB-001 | target   | [https://target.com/p/A-](https://target.com/p/A-)... | 17.99 | USD      | FALSE     | 4.8    | 942           | 2026-05-25     |

A `v_price_alerts` view layers on top, surfacing SKUs with a 10%+ price drop versus the trailing seven-day median (or any retailer flipping to out-of-stock), and feeds the daily competitive briefing.

<Card title="cookbook/snowflake/recipes/cpg_price_monitoring/" icon="github" href="https://github.com/Nimbleway/cookbook/tree/main/snowflake/recipes/cpg_price_monitoring">
  Full recipe: sample data, enrichment SQL, the alerts view, and the daily task
</Card>

### Recipe 3: Chat with the agent in Snowflake Intelligence

The fastest way to try the agent is the [Snowflake Intelligence](https://docs.snowflake.com/en/user-guide/snowflake-cortex/snowflake-intelligence) UI:

<Steps>
  <Step title="Open Snowflake Intelligence">
    From Snowsight, open **AI & ML → Snowflake Intelligence**.
  </Step>

  <Step title="Pick the agent">
    Select **NIMBLE\_WEB\_RESEARCH\_AGENT** from the agent picker. The two tools (`nimble_search`, `nimble_extract`) appear in the tool tray.
  </Step>

  <Step title="Ask a research question">
    Try a prompt that forces both tools. For example: *"Find the three most recent posts on Snowflake's engineering blog about Cortex, then pull the full text of each."* The agent calls `nimble_search`, picks URLs from the results, then calls `nimble_extract` to retrieve page content, and answers with citations.
  </Step>
</Steps>

<Tip>
  Need to call the agent programmatically? The same agent is reachable via the [Cortex Agents REST API](https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-agents-rest-api): `POST` to `/api/v2/databases/{db}/schemas/{schema}/agents/NIMBLE_WEB_RESEARCH_AGENT:run` with a message body. Useful for Streamlit apps, scheduled tasks, or wiring the agent into an external orchestrator.
</Tip>

### Recipe 4: Schedule recurring enrichment

Wrap the CPG enrichment in a Snowflake task so it runs every morning before the business day. The task uses the same `NIMBLE_AGENT_WH` warehouse and writes incrementally to `PRODUCT_LISTINGS`.

```sql theme={"system"}
CREATE OR REPLACE TASK refresh_product_listings
  WAREHOUSE = NIMBLE_AGENT_WH
  SCHEDULE  = 'USING CRON 0 6 * * * UTC'
AS
  CALL NIMBLE_INTEGRATION.RECIPES.REFRESH_PRODUCT_LISTINGS();

ALTER TASK refresh_product_listings RESUME;
```

<Card title="cookbook/snowflake/recipes/cpg_price_monitoring/schedule.sql" icon="github" href="https://github.com/Nimbleway/cookbook/blob/main/snowflake/recipes/cpg_price_monitoring/schedule.sql">
  Full scheduled task: incremental load, retry policy, and dead-letter handling
</Card>

## Roll out across your organization

* **Grant scoped access.** Grant `nimble_role` to the specific user roles or service accounts that should call the UDFs, not to `PUBLIC`. The role already carries `SNOWFLAKE.CORTEX_USER`, so grantees can invoke the agent without any extra Cortex grant.
* **Tune for your Nimble rate-limit tier.** The cookbook enrichment proc accepts a `max_workers` parameter for concurrent extraction. Start at 4 and raise it as your tier allows; Nimble's [rate-limits page](/nimble-sdk/admin/rate-limits) lists per-tier ceilings.
* **Right-size the warehouse.** `XSMALL` with 60-second auto-suspend is fine for interactive agent chat. For large batch enrichment (thousands of SKUs), step up to `SMALL` or `MEDIUM` only for the duration of the scheduled task; suspend cost is negligible at this size.
* **Contain cost during dev.** Use `TABLESAMPLE` on the source table when iterating on enrichment logic, and monitor spend via the `TASK_HISTORY` and `WAREHOUSE_METERING_HISTORY` views.
* **Pre-approve the agent in shared workspaces.** When sharing Snowflake Intelligence workspaces, add `NIMBLE_WEB_RESEARCH_AGENT` to the workspace's allowed agent list so collaborators can invoke it without re-granting access.

## Resources

<CardGroup cols={2}>
  <Card title="Nimbleway/cookbook (snowflake/)" icon="github" href="https://github.com/Nimbleway/cookbook/tree/main/snowflake">
    Every SQL file referenced on this page, plus the CPG recipe
  </Card>

  <Card title="Nimble Search API" icon="magnifying-glass" href="/nimble-sdk/web-tools/search">
    Request shape, parameters, and response schema for `NIMBLE_SEARCH`
  </Card>

  <Card title="Nimble Extract API" icon="arrows-to-circle" href="/nimble-sdk/web-tools/extract/quickstart">
    Request shape, parameters, and response schema for `NIMBLE_EXTRACT`
  </Card>

  <Card title="Snowflake External Access Integration" icon="shield-check" href="https://docs.snowflake.com/en/developer-guide/external-network-access/external-network-access-overview">
    How Snowflake gates outbound HTTPS from UDFs and stored procedures
  </Card>

  <Card title="Snowflake Cortex Agents" icon="robot" href="https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-agents">
    Overview of the Cortex Agents runtime and orchestration model
  </Card>

  <Card title="CREATE AGENT reference" icon="file-code" href="https://docs.snowflake.com/en/sql-reference/sql/create-agent">
    Full SQL reference for the agent spec used in Step 5
  </Card>
</CardGroup>
