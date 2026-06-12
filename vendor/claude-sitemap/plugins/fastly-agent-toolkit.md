# Fastly Agent Toolkit

A collection of six specialized skills that give your coding agent deep knowledge of the Fastly edge cloud platform. Covers the full Fastly development lifecycle — from writing and linting VCL, to running Compute applications locally, to managing services, caching, security, and deployment via the Fastly CLI and API.

The toolkit includes skills for: **Fastly platform** knowledge (services, caching, WAF, TLS, DDoS, purging, and API usage), **Fastly CLI** operations, **Falco** (VCL linting, testing, simulation, and formatting), **Viceroy** (local WASM-based Compute execution and testing for Rust projects), **Fastlike** (Go-based local Compute execution), and **XVCL** (a VCL transpiler with metaprogramming features like loops, constants, and macros).

Each skill provides curated reference documentation that the agent consults when working on Fastly projects, helping it avoid common pitfalls like VCL scope violations, incorrect Vary header placement, missing local_server configuration, and deprecated syntax.

### How to use

Install individual skills based on your workflow — for example, add the `falco` and `viceroy` skills if you're developing Fastly Compute apps in Rust. Once installed, skills activate automatically based on context. Try prompts like: "Lint my VCL files and fix any errors", "Set up a local Viceroy dev server for this Compute app", "Configure a new Fastly service with caching and WAF rules", "Transpile my XVCL files to VCL and test them with Falco", or "Help me set up logging endpoints and purge strategies for this Fastly service".