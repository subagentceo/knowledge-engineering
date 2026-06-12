> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Databricks

> Bring Nimble's live web tools into the Databricks Lakehouse. Search, extract, map, crawl, and Web Search Agents run next to your Delta tables, agents, and Genie spaces.

Nimble brings the live web into the Databricks Lakehouse. Search, page extraction, site maps, crawls, and Web Search Agents sit alongside your Delta tables, Unity Catalog governance, and AI agents — so the AI you build inside Databricks can ground its answers in current external signal, not just historical data.

<Frame caption="Nimble MCP Server on the Databricks Marketplace">
  <img src="https://mintcdn.com/nimble-f5a8283f/kb8ZqPqVvfxEfmy7/images/partnerships/databricks-marketplace.png?fit=max&auto=format&n=kb8ZqPqVvfxEfmy7&q=85&s=c26a9870f1051ce27b28c6665c4792c1" alt="Nimble MCP: Agentic Web Search Platform listing on the Databricks Marketplace" width="2000" height="1172" data-path="images/partnerships/databricks-marketplace.png" />
</Frame>

## Why web data belongs next to the Lakehouse

Databricks is great at orchestrating the data you already own. But the world your data describes lives outside the Lakehouse, and most of the questions stakeholders actually ask need both. Nimble closes that gap without leaving the Databricks ecosystem:

* **Enrich Delta tables in place.** Pull current company metadata, product details, or pricing for the rows in a Unity Catalog table, and land the results straight back as a governed Delta table.
* **Ground agents in live signal.** Give a Databricks-hosted agent the same Nimble tools you'd use yourself, so it can research, verify, and gather external context as part of its workflow.
* **Govern every web call.** Route Nimble through Unity AI Gateway so every request inherits Databricks-native audit, lineage, and access control.
* **Stay in SQL.** Call Nimble as table functions inside any `SELECT`, so notebooks, dashboards, dbt models, Workflows, and Genie consume the output transparently.

## Pick a surface

<CardGroup cols={2}>
  <Card title="Marketplace & MCP" icon="https://mintcdn.com/nimble-f5a8283f/Uhf7Z1PiT7svxqB6/images/icons/marketplace.svg?fit=max&auto=format&n=Uhf7Z1PiT7svxqB6&q=85&s=191b84babb9cab993af0752de8319173" href="/integrations/partnerships/databricks/marketplace-mcp" width="576" height="512" data-path="images/icons/marketplace.svg">
    Install Nimble MCP Server from the Databricks Marketplace as a one-click Unity Catalog connection. Govern it with Unity AI Gateway, then test it in AI Playground and Databricks Assistant. The install foundation every other surface builds on.
  </Card>

  <Card title="Genie One" icon="https://mintcdn.com/nimble-f5a8283f/DGpFmwiXECVJsQZd/images/icons/genie.svg?fit=max&auto=format&n=DGpFmwiXECVJsQZd&q=85&s=8d72152137e59e24bbd073428ea05d87" href="/integrations/partnerships/databricks/genie" width="16" height="16" data-path="images/icons/genie.svg">
    Ask the live web in plain English from Genie One. Enable the Nimble MCP connection and business users get cited, web-grounded answers — no SQL, no notebook. The natural-language surface for the whole integration.
  </Card>

  <Card title="Data Enrichment" icon="https://mintcdn.com/nimble-f5a8283f/11o25xfLHwYX_BgD/images/icons/data-enrichment.svg?fit=max&auto=format&n=11o25xfLHwYX_BgD&q=85&s=90ace12188af8758c7f439576d0d6a66" href="/integrations/partnerships/databricks/data-enrichment" width="448" height="512" data-path="images/icons/data-enrichment.svg">
    Call Nimble as SQL-native table functions in Unity Catalog. `nimble_search`, `nimble_extract`, and `nimble_agent_run` run live web data inside a `SELECT` and land results in governed Delta tables — dbt-native, Workflow-native, Genie-native.
  </Card>
</CardGroup>

## When to use which surface

The Databricks integration spans three surfaces over one Nimble connection. Pick by question:

| You want to…                                                                                           | Use                                                                                 | Page                                                                       |
| ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Give an agent, AI Playground, or Databricks Assistant live web tools through a governed MCP connection | **Marketplace & MCP** install                                                       | [Marketplace & MCP](/integrations/partnerships/databricks/marketplace-mcp) |
| Let a business user ask live-web questions in plain English and get cited answers                      | **Genie One** + the Nimble MCP connection                                           | [Genie One](/integrations/partnerships/databricks/genie)                   |
| Enrich N warehouse rows with structured web fields, or land web data in Delta tables — in pure SQL     | **`nimble_search`** / **`nimble_extract`** / **`nimble_agent_run`** table functions | [Data Enrichment](/integrations/partnerships/databricks/data-enrichment)   |

All three share the same Nimble platform underneath — the difference is who drives the calls: an LLM agent (MCP), a business user in natural language (Genie), or your SQL pipeline (table functions).

## Resources

<CardGroup cols={2}>
  <Card title="Databricks Marketplace Listing" icon="store" href="https://marketplace.databricks.com/details/1fe5e521-e9ef-49d8-97c4-b8c0a448ce15/Nimble_Nimble-MCP-Agentic-Web-Search-Platform">
    Install Nimble MCP Server directly from the Marketplace
  </Card>

  <Card title="Nimble MCP Server Docs" icon="server" href="/integrations/mcp-server/mcp-server">
    Full MCP Server setup for Cursor, Claude, and other clients
  </Card>

  <Card title="Databricks External MCP Docs" icon="book-open" href="https://docs.databricks.com/aws/en/generative-ai/mcp/external-mcp">
    Databricks documentation for external MCP server connections
  </Card>

  <Card title="Nimble Web Search Agents" icon="robot" href="/nimble-sdk/agentic/agents">
    Overview of WSAs — what they are, when to use them, how they parse
  </Card>
</CardGroup>
