---
title: API reference
description: Sandbox SDK API for executing code, managing files, running processes, and exposing services.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# API reference

The Sandbox SDK provides a comprehensive API for executing code, managing files, running processes, and exposing services in isolated sandboxes.

[Lifecycle](https://developers.cloudflare.com/sandbox/api/lifecycle/) 

Create and manage sandbox containers. Get sandbox instances, configure options, and clean up resources.

[Commands](https://developers.cloudflare.com/sandbox/api/commands/) 

Execute commands and stream output. Run scripts, manage background processes, and capture execution results.

[Files](https://developers.cloudflare.com/sandbox/api/files/) 

Read, write, and manage files in the sandbox filesystem. Includes directory operations and file metadata.

[File watching](https://developers.cloudflare.com/sandbox/api/file-watching/) 

Monitor real-time filesystem changes using native inotify. Build development tools, hot-reload systems, and responsive file processing.

[Code interpreter](https://developers.cloudflare.com/sandbox/api/interpreter/) 

Execute Python and JavaScript code with rich outputs including charts, tables, and formatted data.

[Ports](https://developers.cloudflare.com/sandbox/api/ports/) 

Expose services running in the sandbox via preview URLs. Access web servers and APIs from the internet.

[Tunnels](https://developers.cloudflare.com/sandbox/api/tunnels/) 

Expose services on zero-config `*.trycloudflare.com` URLs via`sandbox.tunnels.get(port)`. Best for quick development and `.workers.dev`deployments.

[Storage](https://developers.cloudflare.com/sandbox/api/storage/) 

Mount S3-compatible buckets (R2, S3, GCS) as local filesystems for persistent data storage across sandbox lifecycles.

[Backups](https://developers.cloudflare.com/sandbox/api/backups/) 

Create point-in-time snapshots of directories and restore them with copy-on-write overlays. Store backups in R2.

[Sessions](https://developers.cloudflare.com/sandbox/api/sessions/) 

Create isolated execution contexts within a sandbox. Each session maintains its own shell state, environment variables, and working directory.

[Terminal](https://developers.cloudflare.com/sandbox/api/terminal/) 

Connect browser-based terminal UIs to sandbox shells via WebSocket, with the xterm.js SandboxAddon for automatic reconnection and resize handling.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/sandbox/api/#page","headline":"API reference · Cloudflare Sandbox SDK docs","description":"Sandbox SDK API for executing code, managing files, running processes, and exposing services.","url":"https://developers.cloudflare.com/sandbox/api/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-26","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/sandbox/","name":"Sandbox SDK"}},{"@type":"ListItem","position":3,"item":{"@id":"/sandbox/api/","name":"API reference"}}]}
```
