---
title: Cross-domain authentication
description: Authenticate WebSocket connections to Cloudflare Agents across domains using signed tokens.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cross-domain authentication

When your Agents are deployed, to keep things secure, send a token from the client, then verify it on the server. This guide covers authentication patterns for WebSocket connections to agents.

## WebSocket authentication

WebSockets are not HTTP, so the handshake is limited when making cross-domain connections.

You cannot send:

* Custom headers during the upgrade
* `Authorization: Bearer ...` on connect

You can:

* Put a signed, short-lived token in the connection URL as query parameters
* Verify the token in your server's connect path

Note

Never place raw secrets in URLs. Use a JWT or a signed token that expires quickly, and is scoped to the user or room.

### Same origin

If the client and server share the origin, the browser will send cookies during the WebSocket handshake. Session-based auth can work here. Prefer HTTP-only cookies.

### Cross origin

Cookies do not help across origins. Pass credentials in the URL query, then verify on the server.

## Usage examples

### Static authentication

* [  JavaScript ](#tab-panel-6447)
* [  TypeScript ](#tab-panel-6448)

JavaScript

```

import { useAgent } from "agents/react";


function ChatComponent() {

  const agent = useAgent({

    agent: "my-agent",

    query: {

      token: "demo-token-123",

      userId: "demo-user",

    },

  });


  // Use agent to make calls, access state, etc.

}


```

TypeScript

```

import { useAgent } from "agents/react";


function ChatComponent() {

  const agent = useAgent({

    agent: "my-agent",

    query: {

      token: "demo-token-123",

      userId: "demo-user",

    },

  });


  // Use agent to make calls, access state, etc.

}


```

### Async authentication

Build query values right before connect. Use Suspense for async setup.

* [  JavaScript ](#tab-panel-6453)
* [  TypeScript ](#tab-panel-6454)

JavaScript

```

import { useAgent } from "agents/react";

import { Suspense, useCallback } from "react";


function ChatComponent() {

  const asyncQuery = useCallback(async () => {

    const [token, user] = await Promise.all([getAuthToken(), getCurrentUser()]);

    return {

      token,

      userId: user.id,

      timestamp: Date.now().toString(),

    };

  }, []);


  const agent = useAgent({

    agent: "my-agent",

    query: asyncQuery,

  });


  // Use agent to make calls, access state, etc.

}


function App() {

  return (

    <Suspense fallback={<div>Authenticating...</div>}>

      <ChatComponent />

    </Suspense>

  );

}


```

TypeScript

```

import { useAgent } from "agents/react";

import { Suspense, useCallback } from "react";


function ChatComponent() {

  const asyncQuery = useCallback(async () => {

    const [token, user] = await Promise.all([getAuthToken(), getCurrentUser()]);

    return {

      token,

      userId: user.id,

      timestamp: Date.now().toString(),

    };

  }, []);


  const agent = useAgent({

    agent: "my-agent",

    query: asyncQuery,

  });


  // Use agent to make calls, access state, etc.

}


function App() {

  return (

    <Suspense fallback={<div>Authenticating...</div>}>

      <ChatComponent />

    </Suspense>

  );

}


```

### JWT refresh pattern

Refresh the token when the connection fails due to authentication error.

* [  JavaScript ](#tab-panel-6455)
* [  TypeScript ](#tab-panel-6456)

JavaScript

```

import { useAgent } from "agents/react";

import { useCallback } from "react";


const validateToken = async (token) => {

  // An example of how you might implement this

  const res = await fetch(`${API_HOST}/api/users/me`, {

    headers: {

      Authorization: `Bearer ${token}`,

    },

  });


  return res.ok;

};


const refreshToken = async () => {

  // Depends on implementation:

  // - You could use a longer-lived token to refresh the expired token

  // - De-auth the app and prompt the user to log in manually

  // - ...

};


function useJWTAgent(agentName) {

  const asyncQuery = useCallback(async () => {

    let token = localStorage.getItem("jwt");


    // If no token OR the token is no longer valid

    // request a fresh token

    if (!token || !(await validateToken(token))) {

      token = await refreshToken();

      localStorage.setItem("jwt", token);

    }


    return {

      token,

    };

  }, []);


  const agent = useAgent({

    agent: agentName,

    query: asyncQuery,

    queryDeps: [], // Run on mount

  });


  return agent;

}


```

TypeScript

```

import { useAgent } from "agents/react";

import { useCallback } from "react";


const validateToken = async (token: string) => {

  // An example of how you might implement this

  const res = await fetch(`${API_HOST}/api/users/me`, {

    headers: {

      Authorization: `Bearer ${token}`,

    },

  });


  return res.ok;

};


const refreshToken = async () => {

  // Depends on implementation:

  // - You could use a longer-lived token to refresh the expired token

  // - De-auth the app and prompt the user to log in manually

  // - ...

};


function useJWTAgent(agentName: string) {

  const asyncQuery = useCallback(async () => {

    let token = localStorage.getItem("jwt");


    // If no token OR the token is no longer valid

    // request a fresh token

    if (!token || !(await validateToken(token))) {

      token = await refreshToken();

      localStorage.setItem("jwt", token);

    }


    return {

      token,

    };

  }, []);


  const agent = useAgent({

    agent: agentName,

    query: asyncQuery,

    queryDeps: [], // Run on mount

  });


  return agent;

}


```

## Cross-domain authentication

Pass credentials in the URL when connecting to another host, then verify on the server.

### Static cross-domain auth

* [  JavaScript ](#tab-panel-6449)
* [  TypeScript ](#tab-panel-6450)

JavaScript

```

import { useAgent } from "agents/react";


function StaticCrossDomainAuth() {

  const agent = useAgent({

    agent: "my-agent",

    host: "https://my-agent.example.workers.dev",

    query: {

      token: "demo-token-123",

      userId: "demo-user",

    },

  });


  // Use agent to make calls, access state, etc.

}


```

TypeScript

```

import { useAgent } from "agents/react";


function StaticCrossDomainAuth() {

  const agent = useAgent({

    agent: "my-agent",

    host: "https://my-agent.example.workers.dev",

    query: {

      token: "demo-token-123",

      userId: "demo-user",

    },

  });


  // Use agent to make calls, access state, etc.

}


```

### Async cross-domain auth

* [  JavaScript ](#tab-panel-6451)
* [  TypeScript ](#tab-panel-6452)

JavaScript

```

import { useAgent } from "agents/react";

import { useCallback } from "react";


function AsyncCrossDomainAuth() {

  const asyncQuery = useCallback(async () => {

    const [token, user] = await Promise.all([getAuthToken(), getCurrentUser()]);

    return {

      token,

      userId: user.id,

      timestamp: Date.now().toString(),

    };

  }, []);


  const agent = useAgent({

    agent: "my-agent",

    host: "https://my-agent.example.workers.dev",

    query: asyncQuery,

  });


  // Use agent to make calls, access state, etc.

}


```

TypeScript

```

import { useAgent } from "agents/react";

import { useCallback } from "react";


function AsyncCrossDomainAuth() {

  const asyncQuery = useCallback(async () => {

    const [token, user] = await Promise.all([getAuthToken(), getCurrentUser()]);

    return {

      token,

      userId: user.id,

      timestamp: Date.now().toString(),

    };

  }, []);


  const agent = useAgent({

    agent: "my-agent",

    host: "https://my-agent.example.workers.dev",

    query: asyncQuery,

  });


  // Use agent to make calls, access state, etc.

}


```

## Server-side verification

On the server side, verify the token in the `onConnect` handler:

* [  JavaScript ](#tab-panel-6457)
* [  TypeScript ](#tab-panel-6458)

JavaScript

```

import { Agent, Connection, ConnectionContext } from "agents";


export class SecureAgent extends Agent {

  async onConnect(connection, ctx) {

    const url = new URL(ctx.request.url);

    const token = url.searchParams.get("token");

    const userId = url.searchParams.get("userId");


    // Verify the token

    if (!token || !(await this.verifyToken(token, userId))) {

      connection.close(4001, "Unauthorized");

      return;

    }


    // Store user info on the connection state

    connection.setState({ userId, authenticated: true });

  }


  async verifyToken(token, userId) {

    // Implement your token verification logic

    // For example, verify a JWT signature, check expiration, etc.

    try {

      const payload = await verifyJWT(token, this.env.JWT_SECRET);

      return payload.sub === userId && payload.exp > Date.now() / 1000;

    } catch {

      return false;

    }

  }


  async onMessage(connection, message) {

    // Check if connection is authenticated

    if (!connection.state?.authenticated) {

      connection.send(JSON.stringify({ error: "Not authenticated" }));

      return;

    }


    // Process message for authenticated user

    const userId = connection.state.userId;

    // ...

  }

}


```

TypeScript

```

import { Agent, Connection, ConnectionContext } from "agents";


export class SecureAgent extends Agent {

  async onConnect(connection: Connection, ctx: ConnectionContext) {

    const url = new URL(ctx.request.url);

    const token = url.searchParams.get("token");

    const userId = url.searchParams.get("userId");


    // Verify the token

    if (!token || !(await this.verifyToken(token, userId))) {

      connection.close(4001, "Unauthorized");

      return;

    }


    // Store user info on the connection state

    connection.setState({ userId, authenticated: true });

  }


  private async verifyToken(token: string, userId: string): Promise<boolean> {

    // Implement your token verification logic

    // For example, verify a JWT signature, check expiration, etc.

    try {

      const payload = await verifyJWT(token, this.env.JWT_SECRET);

      return payload.sub === userId && payload.exp > Date.now() / 1000;

    } catch {

      return false;

    }

  }


  async onMessage(connection: Connection, message: string) {

    // Check if connection is authenticated

    if (!connection.state?.authenticated) {

      connection.send(JSON.stringify({ error: "Not authenticated" }));

      return;

    }


    // Process message for authenticated user

    const userId = connection.state.userId;

    // ...

  }

}


```

## Best practices

1. **Use short-lived tokens** \- Tokens in URLs may be logged. Keep expiration times short (minutes, not hours).
2. **Scope tokens appropriately** \- Include the agent name or instance in the token claims to prevent token reuse across agents.
3. **Validate on every connection** \- Always verify tokens in `onConnect`, not just once.
4. **Use HTTPS** \- Always use secure WebSocket connections (`wss://`) in production.
5. **Rotate secrets** \- Regularly rotate your JWT signing keys or token secrets.
6. **Log authentication failures** \- Track failed authentication attempts for security monitoring.

## Next steps

[ Routing ](https://developers.cloudflare.com/agents/runtime/communication/routing/) Routing and authentication hooks. 

[ WebSockets ](https://developers.cloudflare.com/agents/runtime/communication/websockets/) Real-time bidirectional communication. 

[ GitHub OAuth agent example ](https://github.com/cloudflare/agents/tree/main/examples/auth-agent) Protect an app built with Agents using GitHub OAuth, HTTP-only cookies, and server-owned Durable Object routing. 

[ Agents API ](https://developers.cloudflare.com/agents/runtime/agents-api/) Complete API reference for the Agents SDK. 

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/runtime/operations/cross-domain-authentication/#page","headline":"Cross-domain authentication · Cloudflare Agents docs","description":"Authenticate WebSocket connections to Cloudflare Agents across domains using signed tokens.","url":"https://developers.cloudflare.com/agents/runtime/operations/cross-domain-authentication/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/runtime/","name":"Runtime"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/runtime/operations/","name":"Operations"}},{"@type":"ListItem","position":5,"item":{"@id":"/agents/runtime/operations/cross-domain-authentication/","name":"Cross-domain authentication"}}]}
```
