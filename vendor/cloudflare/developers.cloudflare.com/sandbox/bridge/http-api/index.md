---
title: HTTP API reference
description: Complete HTTP API reference for the sandbox bridge Worker.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# HTTP API reference

**Last reviewed:**  2 months ago 

This page documents every route exposed by the [sandbox bridge](https://developers.cloudflare.com/sandbox/bridge/).

## Authentication

All routes under `/v1/sandbox/*` and `/v1/openapi.*` require a Bearer token:

```

Authorization: Bearer <SANDBOX_API_KEY>


```

When `SANDBOX_API_KEY` is not configured, authentication is skipped for local development convenience. Always set the secret before deploying to production.

## OpenAPI schema

The bridge serves its own API documentation:

| Method | Route            | Description                          |
| ------ | ---------------- | ------------------------------------ |
| GET    | /v1/openapi.json | Machine-readable OpenAPI 3.1 schema. |
| GET    | /v1/openapi      | Interactive HTML documentation.      |

Both routes accept authentication via Bearer header or `?token=` query parameter.

When running locally with `npm run dev`, open `http://localhost:8787/v1/openapi` in your browser to explore every endpoint interactively.

## Sandbox lifecycle

| Method | Route                   | Description                                                 |
| ------ | ----------------------- | ----------------------------------------------------------- |
| POST   | /v1/sandbox             | Create a new sandbox. Returns {"id": "<sandbox-id>"}.       |
| DELETE | /v1/sandbox/:id         | Destroy the sandbox container. Returns 204.                 |
| GET    | /v1/sandbox/:id/running | Check container liveness. Returns {"running": true\|false}. |

## Command execution

| Method | Route                | Description                                           |
| ------ | -------------------- | ----------------------------------------------------- |
| POST   | /v1/sandbox/:id/exec | Run a command. Response is an SSE stream (see below). |

The `/exec` endpoint accepts a JSON body:

```

{

  "argv": ["sh", "-lc", "echo hello"],

  "timeout_ms": 10000,

  "cwd": "/workspace"

}


```

### Argv escaping

Each element of the `argv` array is escaped using ANSI-C `$'...'` quoting before being joined into a shell command. Tokens that contain only safe characters (`A-Za-z0-9@%+=:,./-`) are passed through unchanged. All other tokens are wrapped in `$'...'` with backslashes, single quotes, newlines, carriage returns, and tabs escaped. This prevents shell injection while preserving arguments that contain spaces, quotes, or special characters.

### SSE response format

The response is a `text/event-stream` with the following event types:

| Event  | Data                        | Description                        |
| ------ | --------------------------- | ---------------------------------- |
| stdout | Base64-encoded chunk        | Standard output from the command.  |
| stderr | Base64-encoded chunk        | Standard error from the command.   |
| exit   | {"exit\_code": N}           | Command completed. Terminal event. |
| error  | {"error": "…", "code": "…"} | Command failed. Terminal event.    |

## File operations

| Method | Route                   | Description                                                                |
| ------ | ----------------------- | -------------------------------------------------------------------------- |
| GET    | /v1/sandbox/:id/file/\* | Read a file. Returns raw bytes (application/octet-stream).                 |
| PUT    | /v1/sandbox/:id/file/\* | Write a file. Request body is raw bytes. Returns {"ok": true}. Max 32 MiB. |

The file path is encoded in the URL after `/file/`. All paths must resolve within `/workspace`. Path traversal attempts (for example, `../../etc/passwd`) are rejected.

## Workspace persistence

| Method | Route                   | Description                                                      |
| ------ | ----------------------- | ---------------------------------------------------------------- |
| POST   | /v1/sandbox/:id/persist | Serialize /workspace to a tar archive. Returns raw tar bytes.    |
| POST   | /v1/sandbox/:id/hydrate | Populate /workspace from a tar archive sent as the request body. |

The `/persist` endpoint accepts an optional `excludes` query parameter — a comma-separated list of relative paths to exclude from the archive.

The `/hydrate` endpoint accepts a raw tar payload up to 32 MiB.

## Bucket mounts

| Method | Route                   | Description                                         |
| ------ | ----------------------- | --------------------------------------------------- |
| POST   | /v1/sandbox/:id/mount   | Mount an S3-compatible bucket as a local directory. |
| POST   | /v1/sandbox/:id/unmount | Unmount a previously mounted bucket.                |

The `/mount` endpoint accepts a JSON body. Two flows are supported:

### R2 binding mounts

Omit `endpoint` and pass the Worker R2 binding name in `bucket`:

```

{

  "bucket": "MY_BUCKET",

  "mountPath": "/mnt/data",

  "options": {

    "readOnly": false,

    "prefix": "/subdir"

  }

}


```

When `options.endpoint` is omitted, `bucket` means the Worker R2 binding name.

For an explicit S3-compatible endpoint mount, include `endpoint` and optionally `credentials`:

```

{

  "bucket": "my-r2-bucket",

  "mountPath": "/mnt/data",

  "options": {

    "endpoint": "https://ACCOUNT_ID.r2.cloudflarestorage.com",

    "readOnly": false,

    "prefix": "/subdir",

    "credentials": {

      "accessKeyId": "...",

      "secretAccessKey": "..."

    }

  }

}


```

When `endpoint` is provided, `bucket` means the remote bucket name. Credentials are optional in this mode only — the bridge auto-detects from Worker secrets (`R2_ACCESS_KEY_ID` / `R2_SECRET_ACCESS_KEY` or `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY`) when omitted.

## Sessions

| Method | Route                        | Description                                       |
| ------ | ---------------------------- | ------------------------------------------------- |
| POST   | /v1/sandbox/:id/session      | Create a session. Returns {"id": "<session-id>"}. |
| DELETE | /v1/sandbox/:id/session/:sid | Delete a session. Returns 204.                    |

Sessions isolate working directory, environment variables, and command execution state within a sandbox. Pass the `Session-Id` header on `/exec`, `/file/*`, and `/pty` requests to scope them to a session.

When no `Session-Id` header is provided, requests use the sandbox's implicit execution mode. By default this is the default session, but SDKs configured with `enableDefaultSession: false` run those implicit operations sessionless instead.

## Terminal (PTY)

| Method | Route               | Description                         |
| ------ | ------------------- | ----------------------------------- |
| GET    | /v1/sandbox/:id/pty | Upgrade to a WebSocket PTY session. |

Query parameters:

| Parameter | Type   | Default | Description                            |
| --------- | ------ | ------- | -------------------------------------- |
| cols      | number | 80      | Terminal width in columns.             |
| rows      | number | 24      | Terminal height in rows.               |
| shell     | string | —       | Shell binary (for example, /bin/bash). |
| session   | string | —       | Session ID for session-scoped PTY.     |

The WebSocket carries binary frames for terminal I/O and JSON text frames for control messages:

| Direction        | Frame type  | Content                                                                      |
| ---------------- | ----------- | ---------------------------------------------------------------------------- |
| Client to server | Binary      | UTF-8 encoded keystrokes.                                                    |
| Server to client | Binary      | Terminal output including ANSI escape sequences.                             |
| Client to server | Text (JSON) | Control messages (for example, {"type": "resize", "cols": 120, "rows": 30}). |
| Server to client | Text (JSON) | Status messages (ready, exit, error).                                        |

## Warm pool

| Method | Route                       | Description                     |
| ------ | --------------------------- | ------------------------------- |
| GET    | /v1/pool/stats              | Current pool statistics.        |
| POST   | /v1/pool/prime              | Start the warm pool alarm loop. |
| POST   | /v1/pool/shutdown-prewarmed | Stop all idle warm containers.  |

The warm pool pre-starts sandbox containers so new sessions boot instantly. Configure it with environment variables in `wrangler.jsonc`:

* [  wrangler.jsonc ](#tab-panel-10207)
* [  wrangler.toml ](#tab-panel-10208)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "vars": {

    "WARM_POOL_TARGET": "3",

    "WARM_POOL_REFRESH_INTERVAL": "10000"

  }

}


```

TOML

```

[vars]

WARM_POOL_TARGET = "3"           # Number of idle containers to keep warm (0 = disabled)

WARM_POOL_REFRESH_INTERVAL = "10000"  # Health-check interval in milliseconds


```

A cron trigger (`* * * * *`) primes the pool automatically after deployment. Set `WARM_POOL_TARGET` to `"0"` (the default) to disable the pool and avoid unexpected costs.

## Health check

| Method | Route   | Description                                           |
| ------ | ------- | ----------------------------------------------------- |
| GET    | /health | Unauthenticated liveness probe. Returns {"ok": true}. |

## Related resources

* [Bridge overview](https://developers.cloudflare.com/sandbox/bridge/) — What the bridge is, deployment, and usage examples.
* [Sandbox API reference](https://developers.cloudflare.com/sandbox/api/) — Complete Sandbox SDK method reference.
* [Bridge source on GitHub ↗](https://github.com/cloudflare/sandbox-sdk/tree/main/bridge) — Worker, Dockerfile, and OpenAPI schema.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/bridge/http-api/#page","headline":"HTTP API reference · Cloudflare Sandbox SDK docs","description":"Complete HTTP API reference for the sandbox bridge Worker.","url":"https://developers.cloudflare.com/sandbox/bridge/http-api/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-27","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/sandbox/","name":"Sandbox SDK"}},{"@type":"ListItem","position":3,"item":{"@id":"/sandbox/bridge/","name":"Sandbox bridge"}},{"@type":"ListItem","position":4,"item":{"@id":"/sandbox/bridge/http-api/","name":"HTTP API reference"}}]}
```
