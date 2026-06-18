---
title: Handle OAuth with MCP servers
description: Implement OAuth authentication flows in Cloudflare Agents to connect to protected MCP servers.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Handle OAuth with MCP servers

When connecting to OAuth-protected MCP servers (like Slack or Notion), your users need to authenticate before your Agent can access their data. This guide covers implementing OAuth flows for seamless authorization.

## How it works

1. Call `addMcpServer()` with the server URL
2. If OAuth is required, an `authUrl` is returned instead of connecting immediately
3. Present the `authUrl` to your user (redirect, popup, or link)
4. User authenticates on the provider's site
5. Provider redirects back to your Agent's callback URL
6. Your Agent completes the connection automatically

The MCP client uses a built-in `DurableObjectOAuthClientProvider` to manage OAuth state securely — storing a nonce and server ID, validating on callback, and cleaning up after use or expiration.

## Initiate OAuth

When connecting to an OAuth-protected server, check if `authUrl` is returned. If present, redirect your user to complete authorization:

* [  JavaScript ](#tab-panel-5797)
* [  TypeScript ](#tab-panel-5798)

JavaScript

```

export class MyAgent extends Agent {

  async onRequest(request) {

    const url = new URL(request.url);


    if (url.pathname.endsWith("/connect") && request.method === "POST") {

      const { id, authUrl } = await this.addMcpServer(

        "Cloudflare Observability",

        "https://observability.mcp.cloudflare.com/mcp",

      );


      if (authUrl) {

        // OAuth required - redirect user to authorize

        return Response.redirect(authUrl, 302);

      }


      // Already authenticated - connection complete

      return Response.json({ serverId: id, status: "connected" });

    }


    return new Response("Not found", { status: 404 });

  }

}


```

TypeScript

```

export class MyAgent extends Agent<Env> {

  async onRequest(request: Request): Promise<Response> {

    const url = new URL(request.url);


    if (url.pathname.endsWith("/connect") && request.method === "POST") {

      const { id, authUrl } = await this.addMcpServer(

        "Cloudflare Observability",

        "https://observability.mcp.cloudflare.com/mcp",

      );


      if (authUrl) {

        // OAuth required - redirect user to authorize

        return Response.redirect(authUrl, 302);

      }


      // Already authenticated - connection complete

      return Response.json({ serverId: id, status: "connected" });

    }


    return new Response("Not found", { status: 404 });

  }

}


```

### Alternative approaches

Instead of an automatic redirect, you can present the `authUrl` to your user as a:

* **Popup window**: `window.open(authUrl, '_blank', 'width=600,height=700')` for dashboard-style apps
* **Clickable link**: Display as a button or link for multi-step flows
* **Deep link**: Use custom URL schemes for mobile apps

## Configure callback behavior

After OAuth completes, the provider redirects back to your Agent's callback URL. By default, successful authentication redirects to your application origin, while failed authentication displays an HTML error page with the error message.

### Redirect to your application

Redirect users back to your application after OAuth completes:

* [  JavaScript ](#tab-panel-5793)
* [  TypeScript ](#tab-panel-5794)

JavaScript

```

export class MyAgent extends Agent {

  onStart() {

    this.mcp.configureOAuthCallback({

      successRedirect: "/dashboard",

      errorRedirect: "/auth-error",

    });

  }

}


```

TypeScript

```

export class MyAgent extends Agent<Env> {

  onStart() {

    this.mcp.configureOAuthCallback({

      successRedirect: "/dashboard",

      errorRedirect: "/auth-error",

    });

  }

}


```

Users return to `/dashboard` on success or `/auth-error?error=<message>` on failure.

### Close popup window

If you opened OAuth in a popup, close it automatically when complete:

* [  JavaScript ](#tab-panel-5795)
* [  TypeScript ](#tab-panel-5796)

JavaScript

```

import { Agent } from "agents";


export class MyAgent extends Agent {

  onStart() {

    this.mcp.configureOAuthCallback({

      customHandler: () => {

        // Close the popup after OAuth completes

        return new Response("<script>window.close();</script>", {

          headers: { "content-type": "text/html" },

        });

      },

    });

  }

}


```

TypeScript

```

import { Agent } from "agents";


export class MyAgent extends Agent<Env> {

  onStart() {

    this.mcp.configureOAuthCallback({

      customHandler: () => {

        // Close the popup after OAuth completes

        return new Response("<script>window.close();</script>", {

          headers: { "content-type": "text/html" },

        });

      },

    });

  }

}


```

Your main application can detect the popup closing and refresh the connection status. If OAuth fails, the connection state becomes `"failed"` and the error message is stored in `server.error` for display in your UI.

## Monitor connection status

### React applications

Use the `useAgent` hook for real-time updates via WebSocket:

* [  JavaScript ](#tab-panel-5801)
* [  TypeScript ](#tab-panel-5802)

JavaScript

```

import { useAgent } from "agents/react";

import { useState } from "react";


function App() {

  const [mcpState, setMcpState] = useState({

    prompts: [],

    resources: [],

    servers: {},

    tools: [],

  });


  const agent = useAgent({

    agent: "my-agent",

    name: "session-id",

    onMcpUpdate: (mcpServers) => {

      // Automatically called when MCP state changes!

      setMcpState(mcpServers);

    },

  });


  return (

    <div>

      {Object.entries(mcpState.servers).map(([id, server]) => (

        <div key={id}>

          <strong>{server.name}</strong>: {server.state}

          {server.state === "authenticating" && server.auth_url && (

            <button onClick={() => window.open(server.auth_url, "_blank")}>

              Authorize

            </button>

          )}

          {server.state === "failed" && server.error && (

            <p className="error">{server.error}</p>

          )}

        </div>

      ))}

    </div>

  );

}


```

TypeScript

```

import { useAgent } from "agents/react";

import { useState } from "react";

import type { MCPServersState } from "agents";


function App() {

  const [mcpState, setMcpState] = useState<MCPServersState>({

    prompts: [],

    resources: [],

    servers: {},

    tools: [],

  });


  const agent = useAgent({

    agent: "my-agent",

    name: "session-id",

    onMcpUpdate: (mcpServers: MCPServersState) => {

      // Automatically called when MCP state changes!

      setMcpState(mcpServers);

    },

  });


  return (

    <div>

      {Object.entries(mcpState.servers).map(([id, server]) => (

        <div key={id}>

          <strong>{server.name}</strong>: {server.state}

          {server.state === "authenticating" && server.auth_url && (

            <button onClick={() => window.open(server.auth_url, "_blank")}>

              Authorize

            </button>

          )}

          {server.state === "failed" && server.error && (

            <p className="error">{server.error}</p>

          )}

        </div>

      ))}

    </div>

  );

}


```

The `onMcpUpdate` callback fires automatically when MCP state changes — no polling needed.

### Other frameworks

Poll the connection status via an endpoint:

* [  JavaScript ](#tab-panel-5799)
* [  TypeScript ](#tab-panel-5800)

JavaScript

```

export class MyAgent extends Agent {

  async onRequest(request) {

    const url = new URL(request.url);


    if (

      url.pathname.endsWith("connection-status") &&

      request.method === "GET"

    ) {

      const mcpState = this.getMcpServers();


      const connections = Object.entries(mcpState.servers).map(

        ([id, server]) => ({

          serverId: id,

          name: server.name,

          state: server.state,

          isReady: server.state === "ready",

          needsAuth: server.state === "authenticating",

          authUrl: server.auth_url,

        }),

      );


      return Response.json(connections);

    }


    return new Response("Not found", { status: 404 });

  }

}


```

TypeScript

```

export class MyAgent extends Agent<Env> {

  async onRequest(request: Request): Promise<Response> {

    const url = new URL(request.url);


    if (

      url.pathname.endsWith("connection-status") &&

      request.method === "GET"

    ) {

      const mcpState = this.getMcpServers();


      const connections = Object.entries(mcpState.servers).map(

        ([id, server]) => ({

          serverId: id,

          name: server.name,

          state: server.state,

          isReady: server.state === "ready",

          needsAuth: server.state === "authenticating",

          authUrl: server.auth_url,

        }),

      );


      return Response.json(connections);

    }


    return new Response("Not found", { status: 404 });

  }

}


```

Connection states flow: `authenticating` (needs OAuth) → `connecting` (completing setup) → `ready` (available for use)

## Handle failures

When OAuth fails, the connection state becomes `"failed"` and the error message is stored in the `server.error` field. Display this error in your UI and allow users to retry:

* [  JavaScript ](#tab-panel-5803)
* [  TypeScript ](#tab-panel-5804)

JavaScript

```

import { useAgent } from "agents/react";

import { useState } from "react";


function App() {

  const [mcpState, setMcpState] = useState({

    prompts: [],

    resources: [],

    servers: {},

    tools: [],

  });


  const agent = useAgent({

    agent: "my-agent",

    name: "session-id",

    onMcpUpdate: setMcpState,

  });


  const handleRetry = async (serverId, serverUrl, name) => {

    // Remove failed connection

    await fetch(`/agents/my-agent/session-id/disconnect`, {

      method: "POST",

      body: JSON.stringify({ serverId }),

    });


    // Retry connection

    const response = await fetch(`/agents/my-agent/session-id/connect`, {

      method: "POST",

      body: JSON.stringify({ serverUrl, name }),

    });

    const { authUrl } = await response.json();

    if (authUrl) window.open(authUrl, "_blank");

  };


  return (

    <div>

      {Object.entries(mcpState.servers).map(([id, server]) => (

        <div key={id}>

          <strong>{server.name}</strong>: {server.state}

          {server.state === "failed" && (

            <div>

              {server.error && <p className="error">{server.error}</p>}

              <button

                onClick={() => handleRetry(id, server.server_url, server.name)}

              >

                Retry Connection

              </button>

            </div>

          )}

        </div>

      ))}

    </div>

  );

}


```

TypeScript

```

import { useAgent } from "agents/react";

import { useState } from "react";

import type { MCPServersState } from "agents";


function App() {

  const [mcpState, setMcpState] = useState<MCPServersState>({

    prompts: [],

    resources: [],

    servers: {},

    tools: [],

  });


  const agent = useAgent({

    agent: "my-agent",

    name: "session-id",

    onMcpUpdate: setMcpState,

  });


  const handleRetry = async (

    serverId: string,

    serverUrl: string,

    name: string,

  ) => {

    // Remove failed connection

    await fetch(`/agents/my-agent/session-id/disconnect`, {

      method: "POST",

      body: JSON.stringify({ serverId }),

    });


    // Retry connection

    const response = await fetch(`/agents/my-agent/session-id/connect`, {

      method: "POST",

      body: JSON.stringify({ serverUrl, name }),

    });

    const { authUrl } = await response.json();

    if (authUrl) window.open(authUrl, "_blank");

  };


  return (

    <div>

      {Object.entries(mcpState.servers).map(([id, server]) => (

        <div key={id}>

          <strong>{server.name}</strong>: {server.state}

          {server.state === "failed" && (

            <div>

              {server.error && <p className="error">{server.error}</p>}

              <button

                onClick={() => handleRetry(id, server.server_url, server.name)}

              >

                Retry Connection

              </button>

            </div>

          )}

        </div>

      ))}

    </div>

  );

}


```

Common failure reasons:

* **User canceled**: Closed OAuth window before completing authorization
* **Invalid credentials**: Provider credentials were incorrect
* **Permission denied**: User lacks required permissions
* **Expired session**: OAuth session timed out

Failed connections remain in state until removed with `removeMcpServer(serverId)`. The error message is automatically escaped to prevent XSS attacks, so it is safe to display directly in your UI.

## Complete example

This example demonstrates a complete OAuth integration with Cloudflare Observability. Users connect, authorize in a popup window, and the connection becomes available. Errors are automatically stored in the connection state for display in your UI.

* [  JavaScript ](#tab-panel-5805)
* [  TypeScript ](#tab-panel-5806)

JavaScript

```

import { Agent, routeAgentRequest } from "agents";


export class MyAgent extends Agent {

  onStart() {

    this.mcp.configureOAuthCallback({

      customHandler: () => {

        // Close popup after OAuth completes (success or failure)

        return new Response("<script>window.close();</script>", {

          headers: { "content-type": "text/html" },

        });

      },

    });

  }


  async onRequest(request) {

    const url = new URL(request.url);


    // Connect to MCP server

    if (url.pathname.endsWith("/connect") && request.method === "POST") {

      const { id, authUrl } = await this.addMcpServer(

        "Cloudflare Observability",

        "https://observability.mcp.cloudflare.com/mcp",

      );


      if (authUrl) {

        return Response.json({

          serverId: id,

          authUrl: authUrl,

          message: "Please authorize access",

        });

      }


      return Response.json({ serverId: id, status: "connected" });

    }


    // Check connection status

    if (url.pathname.endsWith("/status") && request.method === "GET") {

      const mcpState = this.getMcpServers();

      const connections = Object.entries(mcpState.servers).map(

        ([id, server]) => ({

          serverId: id,

          name: server.name,

          state: server.state,

          authUrl: server.auth_url,

        }),

      );

      return Response.json(connections);

    }


    // Disconnect

    if (url.pathname.endsWith("/disconnect") && request.method === "POST") {

      const { serverId } = await request.json();

      await this.removeMcpServer(serverId);

      return Response.json({ message: "Disconnected" });

    }


    return new Response("Not found", { status: 404 });

  }

}


export default {

  async fetch(request, env) {

    return (

      (await routeAgentRequest(request, env, { cors: true })) ||

      new Response("Not found", { status: 404 })

    );

  },

};


```

TypeScript

```

import { Agent, routeAgentRequest } from "agents";


type Env = {

  MyAgent: DurableObjectNamespace<MyAgent>;

};


export class MyAgent extends Agent<Env> {

  onStart() {

    this.mcp.configureOAuthCallback({

      customHandler: () => {

        // Close popup after OAuth completes (success or failure)

        return new Response("<script>window.close();</script>", {

          headers: { "content-type": "text/html" },

        });

      },

    });

  }


  async onRequest(request: Request): Promise<Response> {

    const url = new URL(request.url);


    // Connect to MCP server

    if (url.pathname.endsWith("/connect") && request.method === "POST") {

      const { id, authUrl } = await this.addMcpServer(

        "Cloudflare Observability",

        "https://observability.mcp.cloudflare.com/mcp",

      );


      if (authUrl) {

        return Response.json({

          serverId: id,

          authUrl: authUrl,

          message: "Please authorize access",

        });

      }


      return Response.json({ serverId: id, status: "connected" });

    }


    // Check connection status

    if (url.pathname.endsWith("/status") && request.method === "GET") {

      const mcpState = this.getMcpServers();

      const connections = Object.entries(mcpState.servers).map(

        ([id, server]) => ({

          serverId: id,

          name: server.name,

          state: server.state,

          authUrl: server.auth_url,

        }),

      );

      return Response.json(connections);

    }


    // Disconnect

    if (url.pathname.endsWith("/disconnect") && request.method === "POST") {

      const { serverId } = (await request.json()) as { serverId: string };

      await this.removeMcpServer(serverId);

      return Response.json({ message: "Disconnected" });

    }


    return new Response("Not found", { status: 404 });

  }

}


export default {

  async fetch(request: Request, env: Env) {

    return (

      (await routeAgentRequest(request, env, { cors: true })) ||

      new Response("Not found", { status: 404 })

    );

  },

} satisfies ExportedHandler<Env>;


```

## Related

[ Connect to an MCP server ](https://developers.cloudflare.com/agents/model-context-protocol/guides/connect-mcp-client/) Get started without OAuth. 

[ MCP Client API ](https://developers.cloudflare.com/agents/model-context-protocol/apis/client-api/) Complete API documentation for MCP clients. 

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/model-context-protocol/guides/oauth-mcp-client/#page","headline":"Handle OAuth with MCP servers · Cloudflare Agents docs","description":"Implement OAuth authentication flows in Cloudflare Agents to connect to protected MCP servers.","url":"https://developers.cloudflare.com/agents/model-context-protocol/guides/oauth-mcp-client/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["MCP"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/model-context-protocol/","name":"Model Context Protocol (MCP)"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/model-context-protocol/guides/","name":"Guides"}},{"@type":"ListItem","position":5,"item":{"@id":"/agents/model-context-protocol/guides/oauth-mcp-client/","name":"Handle OAuth with MCP servers"}}]}
```
