---
title: Securing MCP servers
description: Secure your MCP servers with OAuth 2.1, token validation, and scope-based access control on Cloudflare.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Securing MCP servers

MCP servers, like any web application, need to be secured so they can be used by trusted users without abuse. The MCP specification uses OAuth 2.1 for authentication between MCP clients and servers.

This guide covers security best practices for MCP servers that act as OAuth proxies to third-party providers (like GitHub or Google).

## OAuth protection with workers-oauth-provider

Cloudflare's [workers-oauth-provider ↗](https://github.com/cloudflare/workers-oauth-provider) handles token management, client registration, and access token validation:

* [  JavaScript ](#tab-panel-5807)
* [  TypeScript ](#tab-panel-5808)

JavaScript

```

import { OAuthProvider } from "@cloudflare/workers-oauth-provider";

import { MyMCP } from "./mcp";


export default new OAuthProvider({

  authorizeEndpoint: "/authorize",

  tokenEndpoint: "/token",

  clientRegistrationEndpoint: "/register",

  apiRoute: "/mcp",

  apiHandler: MyMCP.serve("/mcp"),

  defaultHandler: AuthHandler,

});


```

TypeScript

```

import { OAuthProvider } from "@cloudflare/workers-oauth-provider";

import { MyMCP } from "./mcp";


export default new OAuthProvider({

  authorizeEndpoint: "/authorize",

  tokenEndpoint: "/token",

  clientRegistrationEndpoint: "/register",

  apiRoute: "/mcp",

  apiHandler: MyMCP.serve("/mcp"),

  defaultHandler: AuthHandler,

});


```

## Consent dialog security

When your MCP server proxies to third-party OAuth providers, you must implement your own consent dialog before forwarding users upstream. This prevents the "confused deputy" problem where attackers could exploit cached consent.

### CSRF protection

Without CSRF protection, attackers can trick users into approving malicious OAuth clients. Use a random token stored in a secure cookie:

* [  JavaScript ](#tab-panel-5811)
* [  TypeScript ](#tab-panel-5812)

JavaScript

```

// Generate CSRF token when showing consent form

function generateCSRFProtection() {

  const token = crypto.randomUUID();

  const setCookie = `__Host-CSRF_TOKEN=${token}; HttpOnly; Secure; Path=/; SameSite=Lax; Max-Age=600`;

  return { token, setCookie };

}


// Validate CSRF token on form submission

function validateCSRFToken(formData, request) {

  const tokenFromForm = formData.get("csrf_token");

  const cookieHeader = request.headers.get("Cookie") || "";

  const tokenFromCookie = cookieHeader

    .split(";")

    .find((c) => c.trim().startsWith("__Host-CSRF_TOKEN="))

    ?.split("=")[1];


  if (!tokenFromForm || !tokenFromCookie || tokenFromForm !== tokenFromCookie) {

    throw new Error("CSRF token mismatch");

  }


  // Clear cookie after use (one-time use)

  return {

    clearCookie: `__Host-CSRF_TOKEN=; HttpOnly; Secure; Path=/; SameSite=Lax; Max-Age=0`,

  };

}


```

TypeScript

```

// Generate CSRF token when showing consent form

function generateCSRFProtection() {

  const token = crypto.randomUUID();

  const setCookie = `__Host-CSRF_TOKEN=${token}; HttpOnly; Secure; Path=/; SameSite=Lax; Max-Age=600`;

  return { token, setCookie };

}


// Validate CSRF token on form submission

function validateCSRFToken(formData: FormData, request: Request) {

  const tokenFromForm = formData.get("csrf_token");

  const cookieHeader = request.headers.get("Cookie") || "";

  const tokenFromCookie = cookieHeader

    .split(";")

    .find((c) => c.trim().startsWith("__Host-CSRF_TOKEN="))

    ?.split("=")[1];


  if (!tokenFromForm || !tokenFromCookie || tokenFromForm !== tokenFromCookie) {

    throw new Error("CSRF token mismatch");

  }


  // Clear cookie after use (one-time use)

  return {

    clearCookie: `__Host-CSRF_TOKEN=; HttpOnly; Secure; Path=/; SameSite=Lax; Max-Age=0`,

  };

}


```

Include the token as a hidden field in your consent form:

```

<input type="hidden" name="csrf_token" value="${csrfToken}" />


```

### Input sanitization

User-controlled content (client names, logos, URIs) can execute malicious scripts if not sanitized:

* [  JavaScript ](#tab-panel-5815)
* [  TypeScript ](#tab-panel-5816)

JavaScript

```

function sanitizeText(text) {

  return text

    .replace(/&/g, "&amp;")

    .replace(/</g, "&lt;")

    .replace(/>/g, "&gt;")

    .replace(/"/g, "&quot;")

    .replace(/'/g, "&#039;");

}


function sanitizeUrl(url) {

  if (!url) return "";

  try {

    const parsed = new URL(url);

    // Only allow http/https - reject javascript:, data:, file:

    if (!["http:", "https:"].includes(parsed.protocol)) {

      return "";

    }

    return url;

  } catch {

    return "";

  }

}


// Always sanitize before rendering

const clientName = sanitizeText(client.clientName);

const logoUrl = sanitizeText(sanitizeUrl(client.logoUri));


```

TypeScript

```

function sanitizeText(text: string): string {

  return text

    .replace(/&/g, "&amp;")

    .replace(/</g, "&lt;")

    .replace(/>/g, "&gt;")

    .replace(/"/g, "&quot;")

    .replace(/'/g, "&#039;");

}


function sanitizeUrl(url: string): string {

  if (!url) return "";

  try {

    const parsed = new URL(url);

    // Only allow http/https - reject javascript:, data:, file:

    if (!["http:", "https:"].includes(parsed.protocol)) {

      return "";

    }

    return url;

  } catch {

    return "";

  }

}


// Always sanitize before rendering

const clientName = sanitizeText(client.clientName);

const logoUrl = sanitizeText(sanitizeUrl(client.logoUri));


```

### Content Security Policy

CSP headers instruct browsers to block dangerous content:

* [  JavaScript ](#tab-panel-5813)
* [  TypeScript ](#tab-panel-5814)

JavaScript

```

function buildSecurityHeaders(setCookie, nonce) {

  const cspDirectives = [

    "default-src 'none'",

    "script-src 'self'" + (nonce ? ` 'nonce-${nonce}'` : ""),

    "style-src 'self' 'unsafe-inline'",

    "img-src 'self' https:",

    "font-src 'self'",

    "form-action 'self'",

    "frame-ancestors 'none'", // Prevent clickjacking

    "base-uri 'self'",

    "connect-src 'self'",

  ].join("; ");


  return {

    "Content-Security-Policy": cspDirectives,

    "X-Frame-Options": "DENY",

    "X-Content-Type-Options": "nosniff",

    "Content-Type": "text/html; charset=utf-8",

    "Set-Cookie": setCookie,

  };

}


```

TypeScript

```

function buildSecurityHeaders(setCookie: string, nonce?: string): HeadersInit {

  const cspDirectives = [

    "default-src 'none'",

    "script-src 'self'" + (nonce ? ` 'nonce-${nonce}'` : ""),

    "style-src 'self' 'unsafe-inline'",

    "img-src 'self' https:",

    "font-src 'self'",

    "form-action 'self'",

    "frame-ancestors 'none'", // Prevent clickjacking

    "base-uri 'self'",

    "connect-src 'self'",

  ].join("; ");


  return {

    "Content-Security-Policy": cspDirectives,

    "X-Frame-Options": "DENY",

    "X-Content-Type-Options": "nosniff",

    "Content-Type": "text/html; charset=utf-8",

    "Set-Cookie": setCookie,

  };

}


```

## State handling

Between the consent dialog and the OAuth callback, you need to ensure it is the same user. Use a state token stored in KV with a short expiration:

* [  JavaScript ](#tab-panel-5817)
* [  TypeScript ](#tab-panel-5818)

JavaScript

```

// Create state token before redirecting to upstream provider

async function createOAuthState(oauthReqInfo, kv) {

  const stateToken = crypto.randomUUID();

  await kv.put(`oauth:state:${stateToken}`, JSON.stringify(oauthReqInfo), {

    expirationTtl: 600, // 10 minutes

  });

  return { stateToken };

}


// Bind state to browser session with a hashed cookie

async function bindStateToSession(stateToken) {

  const encoder = new TextEncoder();

  const hashBuffer = await crypto.subtle.digest(

    "SHA-256",

    encoder.encode(stateToken),

  );

  const hashHex = Array.from(new Uint8Array(hashBuffer))

    .map((b) => b.toString(16).padStart(2, "0"))

    .join("");


  return {

    setCookie: `__Host-CONSENTED_STATE=${hashHex}; HttpOnly; Secure; Path=/; SameSite=Lax; Max-Age=600`,

  };

}


// Validate state in callback

async function validateOAuthState(request, kv) {

  const url = new URL(request.url);

  const stateFromQuery = url.searchParams.get("state");


  if (!stateFromQuery) {

    throw new Error("Missing state parameter");

  }


  // Check state exists in KV

  const storedData = await kv.get(`oauth:state:${stateFromQuery}`);

  if (!storedData) {

    throw new Error("Invalid or expired state");

  }


  // Validate state matches session cookie

  // ... (hash comparison logic)


  await kv.delete(`oauth:state:${stateFromQuery}`);

  return JSON.parse(storedData);

}


```

TypeScript

```

// Create state token before redirecting to upstream provider

async function createOAuthState(oauthReqInfo: AuthRequest, kv: KVNamespace) {

  const stateToken = crypto.randomUUID();

  await kv.put(`oauth:state:${stateToken}`, JSON.stringify(oauthReqInfo), {

    expirationTtl: 600, // 10 minutes

  });

  return { stateToken };

}


// Bind state to browser session with a hashed cookie

async function bindStateToSession(stateToken: string) {

  const encoder = new TextEncoder();

  const hashBuffer = await crypto.subtle.digest(

    "SHA-256",

    encoder.encode(stateToken),

  );

  const hashHex = Array.from(new Uint8Array(hashBuffer))

    .map((b) => b.toString(16).padStart(2, "0"))

    .join("");


  return {

    setCookie: `__Host-CONSENTED_STATE=${hashHex}; HttpOnly; Secure; Path=/; SameSite=Lax; Max-Age=600`,

  };

}


// Validate state in callback

async function validateOAuthState(request: Request, kv: KVNamespace) {

  const url = new URL(request.url);

  const stateFromQuery = url.searchParams.get("state");


  if (!stateFromQuery) {

    throw new Error("Missing state parameter");

  }


  // Check state exists in KV

  const storedData = await kv.get(`oauth:state:${stateFromQuery}`);

  if (!storedData) {

    throw new Error("Invalid or expired state");

  }


  // Validate state matches session cookie

  // ... (hash comparison logic)


  await kv.delete(`oauth:state:${stateFromQuery}`);

  return JSON.parse(storedData);

}


```

## Cookie security

### Why use the `__Host-` prefix?

The `__Host-` prefix prevents subdomain attacks, which is especially important on `*.workers.dev` domains:

* Must be set with `Secure` flag (HTTPS only)
* Must have `Path=/`
* Must not have a `Domain` attribute

Without `__Host-`, an attacker controlling `evil.workers.dev` could set cookies for your `mcp-server.workers.dev` domain.

### Multiple OAuth flows

If running multiple OAuth flows on the same domain, namespace your cookies:

```

__Host-CSRF_TOKEN_GITHUB

__Host-CSRF_TOKEN_GOOGLE

__Host-APPROVED_CLIENTS_GITHUB

__Host-APPROVED_CLIENTS_GOOGLE


```

## Approved clients registry

Maintain a registry of approved client IDs per user to avoid showing the consent dialog repeatedly:

* [  JavaScript ](#tab-panel-5809)
* [  TypeScript ](#tab-panel-5810)

JavaScript

```

async function addApprovedClient(request, clientId, cookieSecret) {

  const existingClients =

    (await getApprovedClientsFromCookie(request, cookieSecret)) || [];

  const updatedClients = [...new Set([...existingClients, clientId])];


  const payload = JSON.stringify(updatedClients);

  const signature = await signData(payload, cookieSecret); // HMAC-SHA256

  const cookieValue = `${signature}.${btoa(payload)}`;


  return `__Host-APPROVED_CLIENTS=${cookieValue}; HttpOnly; Secure; Path=/; SameSite=Lax; Max-Age=2592000`;

}


```

TypeScript

```

async function addApprovedClient(

  request: Request,

  clientId: string,

  cookieSecret: string,

) {

  const existingClients =

    (await getApprovedClientsFromCookie(request, cookieSecret)) || [];

  const updatedClients = [...new Set([...existingClients, clientId])];


  const payload = JSON.stringify(updatedClients);

  const signature = await signData(payload, cookieSecret); // HMAC-SHA256

  const cookieValue = `${signature}.${btoa(payload)}`;


  return `__Host-APPROVED_CLIENTS=${cookieValue}; HttpOnly; Secure; Path=/; SameSite=Lax; Max-Age=2592000`;

}


```

When reading the cookie, verify the HMAC signature before trusting the data. If the client is not in the approved list, show the consent dialog.

## Security checklist

| Protection         | Purpose                          |
| ------------------ | -------------------------------- |
| CSRF tokens        | Prevent forged consent approvals |
| Input sanitization | Prevent XSS in consent dialogs   |
| CSP headers        | Block injected scripts           |
| State binding      | Prevent session fixation         |
| \_\_Host- cookies  | Prevent subdomain attacks        |
| HMAC signatures    | Verify cookie integrity          |

## Next steps

[ MCP authorization ](https://developers.cloudflare.com/agents/model-context-protocol/protocol/authorization/) OAuth and authentication for MCP servers. 

[ Build a remote MCP server ](https://developers.cloudflare.com/agents/model-context-protocol/guides/remote-mcp-server/) Deploy MCP servers on Cloudflare. 

[ MCP security best practices ](https://modelcontextprotocol.io/specification/draft/basic/security%5Fbest%5Fpractices) Official MCP specification security guide. 

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/model-context-protocol/guides/securing-mcp-server/#page","headline":"Securing MCP servers · Cloudflare Agents docs","description":"Secure your MCP servers with OAuth 2.1, token validation, and scope-based access control on Cloudflare.","url":"https://developers.cloudflare.com/agents/model-context-protocol/guides/securing-mcp-server/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["MCP"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/model-context-protocol/","name":"Model Context Protocol (MCP)"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/model-context-protocol/guides/","name":"Guides"}},{"@type":"ListItem","position":5,"item":{"@id":"/agents/model-context-protocol/guides/securing-mcp-server/","name":"Securing MCP servers"}}]}
```
