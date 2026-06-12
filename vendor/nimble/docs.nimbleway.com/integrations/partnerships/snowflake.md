> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Snowflake

> Bring Nimble's live web tools into Snowflake's Cortex AI stack. Search, extract, map, crawl, and Web Search Agents run alongside warehouse data.

Nimble brings the live web into Snowflake's data and AI stack. Search, page extraction, site maps, crawls, and Web Search Agents sit alongside your warehouse tables, semantic models, and Cortex skills, so the AI you build inside Snowflake can ground its answers in current external signal, not just historical data.

<Frame caption="Nimble web data tools working alongside Snowflake AI Stack">
  <img src="https://mintcdn.com/nimble-f5a8283f/xHR1kINYho_Fqe-s/images/partnerships/snowflake-cortex-hero.png?fit=max&auto=format&n=xHR1kINYho_Fqe-s&q=85&s=3a02fb09e8d451df3130acc534fb24fc" alt="Nimble web data tools running alongside Snowflake Cortex AI" width="1164" height="595" data-path="images/partnerships/snowflake-cortex-hero.png" />
</Frame>

## Why web data belongs next to your warehouse

Snowflake's AI surfaces (Cortex Code, Cortex Analyst, Cortex Agents, Streamlit) are great at orchestrating the data you already own. But the world your data describes lives outside the warehouse, and most of the questions stakeholders actually ask need both. Nimble closes that gap without leaving the Snowflake ecosystem:

* **Enrich tables in place.** Pull current company metadata, product details, or pricing for the rows in a Snowflake table, and write the results straight back as a staging table.
* **Validate semantic models against the real world.** Check whether the entities a Cortex Analyst semantic model points at still exist, still resolve, still match.
* **Ground Streamlit dashboards in live signal.** Combine warehouse aggregates with current web context (competitor pricing, news mentions, regulatory updates) in the same view.
* **Build Cortex Agents that need the web.** Give an agent the same Nimble tools you'd use yourself, so it can research, verify, and gather external context as part of its workflow.

## Pick a surface

<CardGroup cols={2}>
  <Card title="Cortex Code" icon="terminal" href="/integrations/partnerships/snowflake/cortex-code">
    Install Nimble MCP in Snowflake's native AI coding agent. One `cortex mcp add` command, OAuth sign-in, full web data toolkit in every Cortex Code session.
  </Card>

  <Card title="Cortex Agents" icon="robot" href="/integrations/partnerships/snowflake/cortex-agents">
    Deploy `NIMBLE_SEARCH` and `NIMBLE_EXTRACT` as scalar Snowflake UDFs callable inline from any `SELECT`, then wire them into a pre-built Cortex Agent for Snowflake Intelligence.
  </Card>

  <Card title="Data Enrichment" icon="https://mintcdn.com/nimble-f5a8283f/11o25xfLHwYX_BgD/images/icons/data-enrichment.svg?fit=max&auto=format&n=11o25xfLHwYX_BgD&q=85&s=90ace12188af8758c7f439576d0d6a66" href="/integrations/partnerships/snowflake/data-enrichment" width="448" height="512" data-path="images/icons/data-enrichment.svg">
    Enrich warehouse tables at scale with `NIMBLE_AGENT_RUN`, a SQL-native UDTF for Snowflake. Lateral-join any table with typed structured output from Nimble Web Search Agents — dbt-native, Task-native, no LLM in the loop.
  </Card>
</CardGroup>

## Resources

<CardGroup cols={2}>
  <Card title="Nimble MCP Server Docs" icon="server" href="/integrations/mcp-server/mcp-server">
    Full MCP Server setup for Cursor, Claude, and other clients
  </Card>

  <Card title="Snowflake Cortex Code" icon="terminal" href="https://docs.snowflake.com/en/user-guide/cortex-code/cortex-code">
    Snowflake's docs for the native AI coding agent
  </Card>

  <Card title="Snowflake Cortex Agents" icon="robot" href="https://docs.snowflake.com/en/user-guide/snowflake-cortex/cortex-agents">
    Overview of the Cortex Agents runtime and orchestration model
  </Card>

  <Card title="Snowflake External Access Integration" icon="shield-check" href="https://docs.snowflake.com/en/developer-guide/external-network-access/external-network-access-overview">
    How Snowflake gates outbound HTTPS from UDFs and stored procedures
  </Card>
</CardGroup>
