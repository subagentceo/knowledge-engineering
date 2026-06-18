---
title: Detect MCP traffic in Gateway logs
description: Scan Gateway logs for unauthorized MCP traffic.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Detect MCP traffic in Gateway logs

**Last reviewed:**  2 months ago 

Organizations may lack visibility into Model Context Protocol (MCP) traffic, which can allow employees to connect to remote MCP servers outside of IT oversight. These connections risk the exfiltration of sensitive internal data and credentials, tool injection attacks or software supply chain risks.

As an IT administrator, you want to identify shadow MCP traffic to prevent unauthorized data exfiltration while still supporting governed use cases. In this tutorial, you will use the Cloudflare GraphQL Analytics API to scan Gateway HTTP logs for MCP traffic patterns, create DLP profiles that detect MCP JSON-RPC methods, and classify traffic to differentiate between authorized traffic sent to MCP server portals and traffic sent to "shadow" remote MCP servers.

## Prerequisites

* A Cloudflare account with a [Zero Trust organization](https://developers.cloudflare.com/cloudflare-one/setup/)
* [Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) with HTTP filtering enabled and actively proxying user traffic
* An [API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with the following permissions:  
   * Account-level `Zero Trust: Read`  
   * Account-level `DLP: Write`  
   * Account-level `Gateway: Write`
* Your Cloudflare account ID (available in the [Cloudflare dashboard ↗](https://dash.cloudflare.com/login) under **Account Home**)
* Familiarity with [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/) queries
* A working knowledge of TypeScript and REST APIs

## 1\. Review the Gateway HTTP dataset

The `gatewayHttpRequestsAdaptiveGroups` dataset in the GraphQL Analytics API provides aggregated Gateway HTTP log data. Use this dataset to query for MCP-related traffic patterns:

* **Dimensions**: `httpHost`, `httpRequestURI`, `action`, `users`, `dlpProfiles`
* **Time range**: Up to 30 days of historical data
* **Grouping**: Aggregates results by dimension values
* **Filtering**: Supports `OR`, `AND`, and `like` operators

## 2\. Build the MCP detection query

MCP traffic can be identified by three signals:

1. **Domain patterns**: Hostnames containing `mcp` (for example, `mcp.datadog.com`)
2. **URL paths**: Standard MCP endpoints such as `/mcp`, `/mcp/sse`, and `/sse`
3. **DLP matches**: JSON-RPC methods in request bodies (covered in a later step)

The following GraphQL query scans Gateway logs for the first two signals:

* [  JavaScript ](#tab-panel-7728)
* [  TypeScript ](#tab-panel-7729)

JavaScript

```

const query = `

  query MCPTrafficScan($accountTag: string, $since: string, $until: string) {

    viewer {

      accounts(filter: { accountTag: $accountTag }) {

        gatewayHttpRequestsAdaptiveGroups(

          filter: {

            datetime_geq: $since

            datetime_leq: $until

            OR: [

              { httpHost_like: "%mcp%" }

              { httpRequestURI_like: "%/mcp%" }

              { httpRequestURI_like: "%/sse%" }

            ]

          }

          limit: 10000

        ) {

          dimensions {

            httpHost

            action

            users

          }

          count

        }

      }

    }

  }

`;


const variables = {

  accountTag: "<YOUR_ACCOUNT_ID>",

  since: "<START_DATE>", // ISO-8601 format, for example 2025-03-08T00:00:00Z

  until: "<END_DATE>", // Up to 30 days after start date

};


const response = await fetch("https://api.cloudflare.com/client/v4/graphql", {

  method: "POST",

  headers: {

    Authorization: `Bearer ${apiToken}`,

    "Content-Type": "application/json",

  },

  body: JSON.stringify({ query, variables }),

});


const data = await response.json();

const groups =

  data.data?.viewer?.accounts?.[0]?.gatewayHttpRequestsAdaptiveGroups || [];


```

TypeScript

```

const query = `

  query MCPTrafficScan($accountTag: string, $since: string, $until: string) {

    viewer {

      accounts(filter: { accountTag: $accountTag }) {

        gatewayHttpRequestsAdaptiveGroups(

          filter: {

            datetime_geq: $since

            datetime_leq: $until

            OR: [

              { httpHost_like: "%mcp%" }

              { httpRequestURI_like: "%/mcp%" }

              { httpRequestURI_like: "%/sse%" }

            ]

          }

          limit: 10000

        ) {

          dimensions {

            httpHost

            action

            users

          }

          count

        }

      }

    }

  }

`;


const variables = {

  accountTag: "<YOUR_ACCOUNT_ID>",

  since: "<START_DATE>", // ISO-8601 format, for example 2025-03-08T00:00:00Z

  until: "<END_DATE>", // Up to 30 days after start date

};


const response = await fetch("https://api.cloudflare.com/client/v4/graphql", {

  method: "POST",

  headers: {

    Authorization: `Bearer ${apiToken}`,

    "Content-Type": "application/json",

  },

  body: JSON.stringify({ query, variables }),

});


const data = await response.json();

const groups =

  data.data?.viewer?.accounts?.[0]?.gatewayHttpRequestsAdaptiveGroups || [];


```

Replace `<YOUR_ACCOUNT_ID>` with your Cloudflare account ID. Replace `<START_DATE>` and `<END_DATE>` with ISO-8601 timestamps covering your desired time range (up to 30 days).

## 3\. Process the query results

Each group in the response represents aggregated traffic for a specific `httpHost` and `action` combination. Parse the results to identify unblocked MCP connections:

* [  JavaScript ](#tab-panel-7722)
* [  TypeScript ](#tab-panel-7723)

JavaScript

```

const hits = groups.map((group) => ({

  domain: group.dimensions.httpHost,

  requestCount: group.count,

  users: group.dimensions.users || [],

  actions: {

    allowed: group.dimensions.action === "allow" ? group.count : 0,

    blocked: group.dimensions.action === "block" ? group.count : 0,

  },

}));


const totalMCPRequests = hits.reduce((sum, h) => sum + h.requestCount, 0);

const unblockedHits = hits.filter((h) => h.actions.allowed > 0);


console.log(`Found ${totalMCPRequests} MCP requests`);

console.log(`${unblockedHits.length} destinations are unblocked`);


```

TypeScript

```

interface MCPTrafficHit {

  domain: string;

  requestCount: number;

  users: string[];

  actions: {

    allowed: number;

    blocked: number;

  };

}


const hits: MCPTrafficHit[] = groups.map((group: any) => ({

  domain: group.dimensions.httpHost,

  requestCount: group.count,

  users: group.dimensions.users || [],

  actions: {

    allowed: group.dimensions.action === "allow" ? group.count : 0,

    blocked: group.dimensions.action === "block" ? group.count : 0,

  },

}));


const totalMCPRequests = hits.reduce((sum, h) => sum + h.requestCount, 0);

const unblockedHits = hits.filter((h) => h.actions.allowed > 0);


console.log(`Found ${totalMCPRequests} MCP requests`);

console.log(`${unblockedHits.length} destinations are unblocked`);


```

Key insights from the data:

* **Unblocked traffic** (`action` \= `allow`) - Active MCP connections that need investigation or blocking
* **Blocked traffic** (`action` \= `block`) - Your existing policies are working
* **User attribution** \- This indicates which employees are connecting to MCP servers

## 4\. Create DLP profiles for MCP JSON-RPC detection

Gateway HTTP policies can match domains and URL paths, but they cannot inspect request bodies. DLP profiles scan `POST` body content for patterns, which is useful for shadow MCP detection, since MCP uses JSON-RPC over HTTP and has several detectable hallmarks.

Every MCP request contains a `"method"` field:

```

{

  "jsonrpc": "2.0",

  "id": 1,

  "method": "tools/call",

  "params": { "name": "read_file", "arguments": { "path": "/etc/passwd" } }

}


```

An attacker could run an MCP server on a non-standard domain (for example, `internal-tools.company.com/api/assistant`) without triggering domain-based or path-based rules. You can use DLP scans of the `POST` body for `"method": "tools/call"` and other MCP-specific patterns to provide more robust protection of MCP traffic.

### Review DLP constraints

Before building detection patterns, note the following DLP limitations:

* **Regex syntax** — Rust regex (differs slightly from JavaScript and PCRE)
* **Scan depth** — First 1,024 bytes of the request body only
* **POST only** — DLP only scans `POST` requests
* **Performance** — Regex patterns must be efficient to avoid catastrophic backtracking

### Build MCP detection patterns

MCP indicators can be found in JSON-RPC method fields. The following regex patterns cover the core MCP protocol methods:

* [  JavaScript ](#tab-panel-7730)
* [  TypeScript ](#tab-panel-7731)

JavaScript

```

const DLP_REGEX_PATTERNS = [

  {

    name: "MCP Initialize Method",

    regex: '"method"\\s{0,5}:\\s{0,5}"initialize"',

  },

  {

    name: "MCP Tools Call",

    regex: '"method"\\s{0,5}:\\s{0,5}"tools/call"',

  },

  {

    name: "MCP Tools List",

    regex: '"method"\\s{0,5}:\\s{0,5}"tools/list"',

  },

  {

    name: "MCP Resources Read",

    regex: '"method"\\s{0,5}:\\s{0,5}"resources/read"',

  },

  {

    name: "MCP Resources List",

    regex: '"method"\\s{0,5}:\\s{0,5}"resources/list"',

  },

  {

    name: "MCP Prompts List",

    regex: '"method"\\s{0,5}:\\s{0,5}"prompts/(list|get)"',

  },

  {

    name: "MCP Sampling Create Message",

    regex: '"method"\\s{0,5}:\\s{0,5}"sampling/createMessage"',

  },

  {

    name: "MCP Protocol Version",

    regex: '"protocolVersion"\\s{0,5}:\\s{0,5}"202[4-9]',

  },

  {

    name: "MCP Notifications Initialized",

    regex: '"method"\\s{0,5}:\\s{0,5}"notifications/initialized"',

  },

  {

    name: "MCP Roots List",

    regex: '"method"\\s{0,5}:\\s{0,5}"roots/list"',

  },

];


```

TypeScript

```

const DLP_REGEX_PATTERNS = [

  {

    name: "MCP Initialize Method",

    regex: '"method"\\s{0,5}:\\s{0,5}"initialize"',

  },

  {

    name: "MCP Tools Call",

    regex: '"method"\\s{0,5}:\\s{0,5}"tools/call"',

  },

  {

    name: "MCP Tools List",

    regex: '"method"\\s{0,5}:\\s{0,5}"tools/list"',

  },

  {

    name: "MCP Resources Read",

    regex: '"method"\\s{0,5}:\\s{0,5}"resources/read"',

  },

  {

    name: "MCP Resources List",

    regex: '"method"\\s{0,5}:\\s{0,5}"resources/list"',

  },

  {

    name: "MCP Prompts List",

    regex: '"method"\\s{0,5}:\\s{0,5}"prompts/(list|get)"',

  },

  {

    name: "MCP Sampling Create Message",

    regex: '"method"\\s{0,5}:\\s{0,5}"sampling/createMessage"',

  },

  {

    name: "MCP Protocol Version",

    regex: '"protocolVersion"\\s{0,5}:\\s{0,5}"202[4-9]',

  },

  {

    name: "MCP Notifications Initialized",

    regex: '"method"\\s{0,5}:\\s{0,5}"notifications/initialized"',

  },

  {

    name: "MCP Roots List",

    regex: '"method"\\s{0,5}:\\s{0,5}"roots/list"',

  },

];


```

Pattern explanation:

* `\\s{0,5}` — Allows zero to five whitespace characters to handle both minified and pretty-printed JSON
* `"method"` — Double quotes are literal because JSON requires them
* `"tools/call"` — Matches the exact MCP method name
* `202[4-9]` — Matches MCP protocol versions 2024 through 2029

### Create the DLP profile via API

Send a `POST` request to create a custom DLP profile containing all detection patterns:

* [  JavaScript ](#tab-panel-7726)
* [  TypeScript ](#tab-panel-7727)

JavaScript

```

const dlpProfile = {

  name: "MCP-Shield: MCP JSON-RPC Detection",

  description: "Detects MCP protocol JSON-RPC methods in HTTP request bodies.",

  type: "custom",

  entries: DLP_REGEX_PATTERNS.map((p) => ({

    name: p.name,

    enabled: true,

    pattern: {

      regex: p.regex,

      validation: "luhn",

    },

  })),

};


const response = await fetch(

  `https://api.cloudflare.com/client/v4/accounts/${accountId}/gateway/rules`,

  {

    method: "POST",

    headers: {

      Authorization: `Bearer ${apiToken}`,

      "Content-Type": "application/json",

    },

    body: JSON.stringify(dlpRule),

  },

);


const data = await response.json();

if (data.success) {

  console.log(`Created DLP profile: ${data.result.id}`);

}


```

TypeScript

```

const dlpProfile = {

  name: "MCP-Shield: MCP JSON-RPC Detection",

  description: "Detects MCP protocol JSON-RPC methods in HTTP request bodies.",

  type: "custom",

  entries: DLP_REGEX_PATTERNS.map((p) => ({

    name: p.name,

    enabled: true,

    pattern: {

      regex: p.regex,

      validation: "luhn",

    },

  })),

};


const response = await fetch(

  `https://api.cloudflare.com/client/v4/accounts/${accountId}/gateway/rules`,

  {

    method: "POST",

    headers: {

      Authorization: `Bearer ${apiToken}`,

      "Content-Type": "application/json",

    },

    body: JSON.stringify(dlpRule),

  },

);


const data = await response.json();

if (data.success) {

  console.log(`Created DLP profile: ${data.result.id}`);

}


```

Replace `${accountId}` with your Cloudflare account ID and `${apiToken}` with your API token.

### Reference the DLP profile in a Gateway rule

After the DLP profile exists, create a Gateway HTTP policy that blocks requests matching the profile:

* [  JavaScript ](#tab-panel-7720)
* [  TypeScript ](#tab-panel-7721)

JavaScript

```

const dlpRule = {

  name: "MCP-Shield: Block MCP JSON-RPC via DLP",

  description: "Blocks requests with MCP JSON-RPC patterns detected by DLP",

  precedence: 85,

  enabled: true,

  action: "block",

  filters: ["http"],

  traffic:

    'any(http.request.body.scan.dlp.profiles[*] == "MCP-Shield: MCP JSON-RPC Detection")',

};


```

TypeScript

```

const dlpRule = {

  name: "MCP-Shield: Block MCP JSON-RPC via DLP",

  description: "Blocks requests with MCP JSON-RPC patterns detected by DLP",

  precedence: 85,

  enabled: true,

  action: "block",

  filters: ["http"],

  traffic:

    'any(http.request.body.scan.dlp.profiles[*] == "MCP-Shield: MCP JSON-RPC Detection")',

};


```

This rule triggers when the DLP profile matches any of the regex patterns in the request body.

## 5\. Classify Portal traffic and shadow MCP traffic

Cloudflare [MCP Server Portals](https://developers.cloudflare.com/cloudflare-one/) provide governed infrastructure for approved MCP access within your organization, including:

* **Governed access** — Centralized MCP infrastructure managed by your IT team
* **Audit trails** — All MCP requests logged through Gateway with user attribution
* **Policy enforcement** — Zero Trust policies apply automatically, including authentication and DLP
* **Approved tools** — A curated set of MCP tools and resources vetted by security

When analyzing Gateway logs, it is helpful to differentiate between two types of MCP traffic:

| Traffic type       | Characteristics                                                                                | Risk level  | Action                    |
| ------------------ | ---------------------------------------------------------------------------------------------- | ----------- | ------------------------- |
| MCP Portal traffic | httpHost matches your portal domain (for example, mcp.yourcompany.com or mcp-portal.pages.dev) | Authorized  | Monitor                   |
| Shadow MCP traffic | httpHost does not match any portal domain (for example, mcp.datadog.com, api.stripe.com/mcp)   | Investigate | Block, redirect or review |

Extend the query processing from [Process the query results](#3-process-the-query-results) to classify traffic by comparing hostnames against your list of approved portal domains:

* [  JavaScript ](#tab-panel-7724)
* [  TypeScript ](#tab-panel-7725)

JavaScript

```

const portalDomains = [

  "mcp.yourcompany.com",

  "mcp-portal.pages.dev",

  "approved-mcp.workers.dev",

];


const results = groups.map((group) => {

  const isPortalTraffic = portalDomains.some((domain) =>

    group.dimensions.httpHost.includes(domain),

  );


  return {

    domain: group.dimensions.httpHost,

    requestCount: group.count,

    users: group.dimensions.users || [],

    trafficType: isPortalTraffic ? "portal" : "shadow",

    riskLevel: isPortalTraffic ? "low" : "high",

  };

});


const portalTraffic = results.filter((r) => r.trafficType === "portal");

const shadowTraffic = results.filter((r) => r.trafficType === "shadow");


console.log("Portal traffic:", portalTraffic);

console.log("Shadow MCP traffic:", shadowTraffic);


```

TypeScript

```

const portalDomains = [

  "mcp.yourcompany.com",

  "mcp-portal.pages.dev",

  "approved-mcp.workers.dev",

];


const results = groups.map((group) => {

  const isPortalTraffic = portalDomains.some((domain) =>

    group.dimensions.httpHost.includes(domain),

  );


  return {

    domain: group.dimensions.httpHost,

    requestCount: group.count,

    users: group.dimensions.users || [],

    trafficType: isPortalTraffic ? "portal" : "shadow",

    riskLevel: isPortalTraffic ? "low" : "high",

  };

});


const portalTraffic = results.filter((r) => r.trafficType === "portal");

const shadowTraffic = results.filter((r) => r.trafficType === "shadow");


console.log("Portal traffic:", portalTraffic);

console.log("Shadow MCP traffic:", shadowTraffic);


```

Replace the `portalDomains` array with the actual domains of your approved MCP Server Portals.

## Related resources

* [Zero Trust documentation](https://developers.cloudflare.com/cloudflare-one/)
* [Gateway policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/)
* [DLP profiles](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/)
* [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/)
* [Rules language and wirefilter expressions](https://developers.cloudflare.com/ruleset-engine/rules-language/)
* [Pages Functions](https://developers.cloudflare.com/pages/functions/)
* [Logpush](https://developers.cloudflare.com/logs/logpush/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/tutorials/detect-mcp-traffic-gateway-logs/#page","headline":"Detect MCP traffic in Gateway logs · Cloudflare One docs","description":"Scan Gateway logs for unauthorized MCP traffic.","url":"https://developers.cloudflare.com/cloudflare-one/tutorials/detect-mcp-traffic-gateway-logs/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["MCP","Logging","TypeScript","GraphQL"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/tutorials/detect-mcp-traffic-gateway-logs/","name":"Detect MCP traffic in Gateway logs"}}]}
```
