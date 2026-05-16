Deploy and manage apps, databases, and infrastructure on [Railway](https://railway.com) directly from Claude Code. This plugin provides a comprehensive skill for the full Railway lifecycle — from creating projects and provisioning databases to deploying code, configuring environments, and debugging production issues. It supports Postgres, Redis, MySQL, MongoDB, S3-compatible storage buckets, custom domains, private networking, and multi-region deployments.

The plugin follows a CLI-first approach, using the `railway` CLI with JSON output for reliable automation, and falls back to Railway's GraphQL API for advanced operations. A built-in hook auto-approves Railway CLI and API commands so you don't need to manually confirm each one. Destructive actions still require explicit confirmation.

Five reference modules cover every aspect of Railway management: project and service setup, code deployment with build log streaming, environment and variable configuration (including template syntax), operational monitoring with metrics and log queries, and direct access to Railway's API and documentation.

**How to use:** Ask Claude to manage your Railway infrastructure using natural language. Example prompts:

-   "Deploy my app to Railway"
-   "Create a new Postgres database for my project"
-   "Show me the logs for my API service from the last hour"
-   "Set up a custom domain for my frontend"
-   "Check why my deployment is failing"
-   "Add a Redis cache to my project"
-   "Show CPU and memory metrics for my service"
-   "Create an S3 bucket in the Amsterdam region"