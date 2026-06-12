> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Marketplace & MCP

> Install Nimble MCP Server from the Databricks Marketplace, govern it with Unity AI Gateway, and test it in AI Playground and Databricks Assistant.

Nimble MCP Server is available on the [Databricks Marketplace](https://marketplace.databricks.com/details/1fe5e521-e9ef-49d8-97c4-b8c0a448ce15/Nimble_Nimble-MCP-Agentic-Web-Search-Platform) as a one-click install. It creates a secure Unity Catalog connection that gives any Databricks agent access to Nimble's full web data platform — search, extract, map, crawl, and structured data extraction. This is the install foundation every other Databricks surface builds on.

<Frame caption="Nimble MCP Server on the Databricks Marketplace">
  <img src="https://mintcdn.com/nimble-f5a8283f/kb8ZqPqVvfxEfmy7/images/partnerships/databricks-marketplace.png?fit=max&auto=format&n=kb8ZqPqVvfxEfmy7&q=85&s=c26a9870f1051ce27b28c6665c4792c1" alt="Nimble MCP: Agentic Web Search Platform listing on the Databricks Marketplace" width="2000" height="1172" data-path="images/partnerships/databricks-marketplace.png" />
</Frame>

## Prerequisites

* A Databricks workspace with the **Managed MCP Servers** preview enabled ([manage previews](https://docs.databricks.com/aws/en/admin/workspace-settings/manage-previews))
* `CREATE CONNECTION` privilege on the Unity Catalog metastore
* A Nimble API key — [sign up](https://online.nimbleway.com/signup) and generate one from [Account Settings > API Keys](/nimble-sdk/admin/account-management#api-keys)

## Install from Databricks Marketplace

<Steps>
  <Step title="Find Nimble MCP Server">
    In your Databricks workspace, go to **Marketplace** and search for **Nimble**.
  </Step>

  <Step title="Install and configure the connection">
    Click **Install**. In the installation dialog, configure:

    | Field               | Value                                                                       |
    | ------------------- | --------------------------------------------------------------------------- |
    | **Connection name** | A name for the Unity Catalog connection (default: `nimble-mcp-marketplace`) |
    | **Host**            | Pre-populated                                                               |
    | **Base path**       | Pre-populated                                                               |
    | **Bearer token**    | Your Nimble API key                                                         |

    <Frame caption="Databricks Marketplace install dialog">
      <img src="https://mintcdn.com/nimble-f5a8283f/kb8ZqPqVvfxEfmy7/images/partnerships/databricks-install-dialog.png?fit=max&auto=format&n=kb8ZqPqVvfxEfmy7&q=85&s=0be31166e0bfbe9ccfc5f785e77521ce" alt="Install dialog for Nimble MCP Server showing connection name, host, base path, and bearer token fields" width="1288" height="1512" data-path="images/partnerships/databricks-install-dialog.png" />
    </Frame>
  </Step>

  <Step title="Verify the installation">
    Go to **Agents > MCP Servers** tab and confirm `nimble-mcp-marketplace` appears with status **Active**.
  </Step>
</Steps>

## Share the connection

Grant access so team members can use the Nimble MCP server:

1. Go to **Catalog > Connections** and click the Nimble connection.
2. Open the **Permissions** tab and grant **USE CONNECTION** to the principals that need access.

## Governance with Unity AI Gateway

Once installed, the Nimble connection appears automatically in **Unity AI Gateway > MCPs** as an active MCP server — no extra registration step. Unity AI Gateway is the control plane for AI traffic in Databricks, so every Nimble call routes through its managed proxy and inherits Databricks-native governance.

### Available now

* **Managed proxy and AI Playground** — Nimble is reachable at `https://<workspace-hostname>/api/2.0/mcp/external/<connection-name>` and available in the Playground.
* **Audit and usage tracking** — every proxied Nimble call is recorded in the `system.access.audit` system table with the calling user, connection, HTTP method, and status code. The built-in **AI Gateway Usage Analytics** dashboard visualizes this under the **External MCP Server** tab.

Query your own Nimble usage directly:

```sql theme={"system"}
SELECT event_time,
       user_identity.email            AS user,
       request_params.connection_name AS connection_name,
       request_params.http_method     AS http_method,
       response.status_code           AS status_code
FROM system.access.audit
WHERE service_name = 'ucHttpConnection'
  AND action_name  = 'ucHttpConnectionProxiedRequest'
  AND request_params.connection_name ILIKE '%nimble%'
ORDER BY event_time DESC;
```

### Databricks MCP governance Beta

Ask your Databricks account team to enable these on your workspace:

* **Payload logging** — full request and response bodies recorded to a Unity Catalog inference table for audit and replay (the audit table above logs metadata only, not bodies).
* **Service policies** — constrain a Nimble tool with a SQL Unity Catalog function (for example, a domain allowlist on `nimble_search`); the gateway enforces the policy before the call leaves Databricks.
* **Rate limits and cost attribution** — meter and attribute Nimble usage per user and workload.

The Marketplace connection authenticates to Nimble with a shared bearer token, so all traffic shares one Nimble identity. Per-user authentication — where each Databricks user authenticates to Nimble individually (on-behalf-of) so the end-user identity reaches Nimble's logs — is on the roadmap.

## Test in Databricks

### AI Playground

<Steps>
  <Step title="Open AI Playground">
    Choose a model with the **Tools enabled** label.
  </Step>

  <Step title="Add Nimble MCP tools">
    Click **Tools > + Add tool > MCP Servers > External MCP servers** and select the `nimble-mcp-marketplace` connection.
  </Step>

  <Step title="Chat">
    Ask the model to search the web, extract a page, or map a site to verify the tools work.
  </Step>
</Steps>

### Databricks Assistant

1. Open **Databricks Assistant** and click the **Settings** icon.
2. Under **MCP Servers**, click **+ Add MCP Server > External MCP servers** and select the `nimble-mcp-marketplace` connection.

<Note>
  Once the connection is verified here, point a production agent at the same proxy URL. The [Nimble MCP + Databricks notebook](https://github.com/Nimbleway/cookbook/blob/main/nimble-mcp-server/databricks-agent/nimble-mcp-databricks-marketplace.ipynb) walks through connecting a Databricks-hosted LLM to Nimble tools with LangGraph and the `DatabricksMCPClient`.
</Note>

## Resources

<CardGroup cols={2}>
  <Card title="Databricks Marketplace Listing" icon="store" href="https://marketplace.databricks.com/details/1fe5e521-e9ef-49d8-97c4-b8c0a448ce15/Nimble_Nimble-MCP-Agentic-Web-Search-Platform">
    Install Nimble MCP Server directly from the Marketplace
  </Card>

  <Card title="Nimble MCP Server Docs" icon="server" href="/integrations/mcp-server/mcp-server">
    Full MCP Server setup for Claude, Cursor, and other clients
  </Card>

  <Card title="Databricks External MCP Docs" icon="book-open" href="https://docs.databricks.com/aws/en/generative-ai/mcp/external-mcp">
    Databricks documentation for external MCP server connections
  </Card>

  <Card title="Data Enrichment" icon="https://mintcdn.com/nimble-f5a8283f/11o25xfLHwYX_BgD/images/icons/data-enrichment.svg?fit=max&auto=format&n=11o25xfLHwYX_BgD&q=85&s=90ace12188af8758c7f439576d0d6a66" href="/integrations/partnerships/databricks/data-enrichment" width="448" height="512" data-path="images/icons/data-enrichment.svg">
    Call Nimble as SQL table functions to enrich Delta tables at scale
  </Card>
</CardGroup>
