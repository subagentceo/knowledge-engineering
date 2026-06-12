# New in Claude Managed Agents: self-hosted sandboxes and MCP tunnels

Starting today, Claude Managed Agents can operate in a sandbox you control and connect to your private Model Context Protocol (MCP) servers. Both the sandbox where an agent executes tools and the services it reaches run within the established boundaries of your enterprise, under your security and runtime controls.

The sandbox runs on your own infrastructure, or with managed providers like Cloudflare, Daytona, Modal, or Vercel to handle the compute and isolation for you.

On the Claude Platform, self-hosted sandboxes is available in public beta and MCP tunnels in research preview (request access).

## Keep agent execution within your perimeter

With self-hosted sandboxes, you keep sensitive files, packages, and services in your own infrastructure or with a managed sandbox provider. The agent loop that handles orchestration, context management, and error recovery stays on Anthropic’s infrastructure, while tool execution moves to your own configured environment.

Inside your perimeter, network policies, audit logging, and security tooling are already in place, and files and repositories don't leave. You also control the compute: resource sizing and the runtime image are set on your side, so agents running compute-heavy work such as long builds or image generation get the CPU, memory, and capacity the task needs.

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a0c965b35dd4ce814b00c56_Sandboxes_3%20\(1\).png)

## Choose your sandbox client

Bring any sandbox client you want, or start with one of our supported providers:

*   **Cloudflare** runs sandboxes at scale using microVMs and lighter weight isolates. Outbound network requests are in your control with zero-trust secrets injection, customizable proxies to audit, reroute, or modify egress, and the ability to connect to internal services over Cloudflare's network. **Amplitude** is building Design Agent, an internal tool for on-brand production UI and marketing design, on Managed Agents and Cloudflare for tighter observability and control.
*   **Daytona** sandboxes are full composable computers, long-running and stateful. The same primitive runs a quick burst or an agent that works for hours. The sandbox stays accessible while a session runs over SSH or an authenticated preview URL, or can be paused and restored with full state preserved. **Clay’s** GTM engineering agent, Sculptor, builds, tests, and monitors workflows autonomously on Managed Agents and Daytona.
*   **Modal** is a cloud platform built for AI workloads, where sandboxes share the same foundation as Modal's functions, storage, and networking primitives, giving you everything you need to build production AI systems. Modal's custom container runtime delivers sub-second startup on any image, scales to hundreds of thousands of concurrent sandboxes, and gives you CPU and GPU resources on demand.
*   **Vercel** sandboxes combine VM security, VPC peering, and bring your own cloud with millisecond startup time. Managed Agents handles the model, tools, and session state, while the Vercel Sandbox firewall injects credentials at the network boundary so they never enter the sandbox. **Rogo**, an AI platform for institutional finance, is building an analyst agent on Managed Agents and Vercel Sandbox to handle their proprietary data securely.

## Connect to services within your private network

With MCP tunnels, your agents reach MCP servers inside your private network without exposing them to the public internet. Internal databases, private APIs, knowledge bases, and ticketing systems become tools your agents can call. A lightweight gateway you deploy makes a single outbound connection, no inbound firewall rules, no public endpoints, and traffic encrypted end to end.

MCP tunnels is supported in Managed Agents and the Messages API. MCP tunnels is managed from workspace settings within the Claude Console by organization admins.

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a0b4fdc9749bb31acafa95b_MCP%20tunnel%20\(1\).png)