# How to use the Brave Search API with OpenClaw

Search API Guides > Cookbooks

# How to use the Brave Search API with OpenClaw

Published Apr 1, 2026

Share on X (formerly Twitter) Share on Reddit Share on Telegram Share on LinkedIn

This guide explains how to equip OpenClaw with better exposure to the Brave Search API, giving agents access to crucial context and enhanced Web search capabilities.

_Readers’ note: If you plan to try OpenClaw, for security reasons you should run it on a dedicated machine or VM that has restricted access to sensitive data. Don’t share your API key publicly; monitor for unauthorized use; and, if you discover your key has been leaked by OpenClaw, revoke its access via the Brave Search API dashboard._

## Step 1: Set up your Brave Search API key

1.  Register for (or log in to) a Brave Search API account.
2.  Once you’re logged in, navigate to the **My subscriptions** tab in the dashboard, and ensure you’re subscribed to the **Search** plan.
    *   If you’re not subscribed to the **Search** plan, visit the **Available plans** tab to change plans.
    *   Also note that each plan includes $5 in free credits, every single month. If you have a small-scale project you can set a usage limit in your account dashboard after you subscribe. This can help ensure your usage remains free as long as you need it to.
3.  Go to the **API keys** section and create a new API key.
4.  Note your API key for later use, and save your key in a safe place.

## Step 2: Install and configure OpenClaw

OpenClaw offers several installation methods depending on your environment and needs. For most users, the recommended option is the official installer, which detects your platform, installs Node.js if needed, installs OpenClaw, and launches onboarding automatically.

**macOS, Linux, and WSL2:**

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

**Windows (PowerShell):**

```bash
iwr -useb https://openclaw.ai/install.ps1 | iex
```

OpenClaw currently recommends Node 24, though Node 22.16+ is also supported.

If you prefer to manage Node.js yourself, you can also install OpenClaw via npm or pnpm. For development or maximum control, you can build from source (requires pnpm). Containerized deployment via Docker (the route chosen when authoring/testing this walkthrough), Podman, or Nix is also available and may be a better fit if you want stronger isolation or are deploying to a server or cloud environment. For the full set of installation options and platform-specific details, see the OpenClaw install documentation.

Once installed, verify your setup before proceeding:

```bash
openclaw --version
openclaw doctor
```

If you installed OpenClaw without onboarding, or if you need to set up the long-running gateway service manually, run:

```bash
openclaw onboard --install-daemon
```

This installs the gateway daemon as a user service so it stays running in the background.

## Step 3: Retrieve and set up the Brave Search CLI

The Brave Search skill leverages the new Brave Search CLI utility (referenced as _bx_ once installed). You can manually locate your preferred binary/executable via the releases page on github. Download the CLI file, rename it to _bx_ (or _bx.exe_ on Windows) and store it in an easily retrievable place. You’ll soon need to expose this file’s location to OpenClaw.

Alternatively, the _bx_ CLI utility can be installed with the help of an installer script. You can configure the download path for the utility via the `BX_INSTALL_DIR` environment variable, though this is not required.

**macOS, Linux, and WSL2:**

```bash
curl -fsSL https://raw.githubusercontent.com/brave/brave-search-cli/main/scripts/install.sh | sh
```

**Windows (PowerShell):**

```bash
powershell -ExecutionPolicy Bypass -c "irm https://raw.githubusercontent.com/brave/brave-search-cli/main/scripts/install.ps1 | iex"
```

The output from these installer scripts will contain the location of the _bx_ utility. For example:

```
bx v1.3.0 installed to /home/node/.local/bin/bx
```

You can either `cd` to that directory now, or use it when invoking `bx` in the next step.

#### Set your API Key

Now that the CLI utility is on the system, you can access it directly to configure your Brave Search API key (also configurable via the `BRAVE_SEARCH_API_KEY` environment variable):

```bash
bx config set-key BSAv...WSxs
```

With this key set, you can test the utility by querying for the OpenClaw logo:

```bash
bx images "openclaw logo" --count 1
```

The JSON response indicates the utility is working as expected.

## Step 4: Finish set up for OpenClaw

#### Configure OpenClaw’s access to the CLI

In order for OpenClaw to have access to the _bx_ utility, you’ll need to add its path to the openclaw.json configuration file (if needed, run `openclaw config file` to locate your config file). For example, if _bx_ were downloaded to `/home/node/.local/bin`, you would run the following command:

```bash
openclaw config set tools.exec.pathPrepend '["/home/node/.local/bin"]'
```

If you have already configured a path in this manner before, you may wish to manually add the new path by directly modifying the openclaw.json configuration file:

```json
{
  "tools": {
    "exec": {
      "pathPrepend": ["/home/node/.local/bin", "/previous/path"]
    }
  }
}
```

Because you’re making changes to a central part of OpenClaw’s configuration, you’ll need to restart the gateway for these changes to take effect. If you’re running OpenClaw in a docker container, restart the container. If you’re running it on the host machine, simply run the restart command:

```bash
openclaw gateway restart
```

### Installing the Skill via ClawHub

With the _bx_ utility now installed and accessible, you can proceed to install the Skill itself, which teaches OpenClaw how to use the _bx_ utility to its full potential. To install the Skill from ClawHub, use the _openclaw skills install_ command in your terminal:

```bash
openclaw skills install bx-search
```

## Step 5: Use Brave Search in your assistant

Once configured, OpenClaw will be instructed to prefer the _bx_ utility for web-search requests. There are a few ways you can leverage this utility via the OpenClaw agent:

*   Asking natural language questions that require Web search
*   Sending a message with “search” or “find” followed by your query
*   Messages that start with `/skill bx-search` are explicit skill requests (e.g. `/skill bx-search "current formula 1 standings"`)

Your agent may at times attempt to use its built-in _web_search_ tool over the Skill. You can ask that your agent prefer this new Skill in the future, and/or you can prepend your query with `/skill bx-search` to be more explicit.

## Advanced configuration

The _bx_ utility supports an optional `--config` argument, enabling you or your agent to use a custom configuration file with each request. This file can specify its own API key and timeout threshold. You can also use a custom API Key via the `--api-key` command line argument, but be careful with this parameter as it may leave your plain-text key in shell history.

The _bx_ utility supports a top-level `--help` flag (i.e. `bx --help`) to understand endpoints. This flag can also be used with specific endpoints (e.g. `bx web --help`) to understand more granular, endpoint-specific search parameters.

## Troubleshooting

If you’re encountering issues, try one (or more) of the following fixes:

*   Make sure the location of _bx_ is known to you and your agent
*   Ensure your API key is correct and has sufficient query limits
*   Verify that the Brave Search API is accessible from your network
*   Check that your OpenClaw instance has Internet connectivity
*   Review the logs for any error messages related to API calls

## Security considerations

**Note**: By publishing this guide Brave is not (and cannot) make any claims about the security of OpenClaw. If you choose to use OpenClaw, proceed carefully. In addition to the security recommendations that appear at the top of this guide, visit Brave’s X thread for a non-exhaustive list of other precautions you should take.

You should also set usage limits for the Brave Search API to ensure your usage does not exceed your expected monthly budget.

## Support and updates

For the latest information and updates about using the Brave Search API with OpenClaw:

*   Brave Search Skill (_bx_) source on GitHub
*   Brave Search Skill (_bx_) on ClawHub
*   OpenClaw repository on GitHub
*   Brave Search API documentation

Share on X (formerly Twitter) Share on Reddit Share on Telegram Share on LinkedIn

Previous: How to add Brave Search to Claude…

Next: Brave Search API vs the Bing API

## Related articles

### How to add Brave Search to Claude Desktop with MCP

May 6, 2025

This guide covers the steps required to enable Brave Search as a tool to be used in the Claude desktop app using the Model Context Protocol (MCP). Since both Brave’s and Anthropic’s products are evolving quickly, it’s best to always check official documentation for the most up-to-date information and instructions. In order to use MCP, you will need to have Node.js installed on your computer. Please note that some Windows users have encountered issues with MCP when using a node installer, rather than node version manager.

Read this article

### How to use Brave Search with Dify

May 6, 2025

This guide will help you get set up with the Brave Search API in Dify, an open-source platform designed to simplify AI application development, and offer real-time, accurate search results as part of AI agent orchestration. Dify offers an intuitive interface that brings together AI workflows, RAG pipelines, and agent capabilities, empowering developers to rapidly move from initial concept to production-ready applications. Sign-up and create a key for Brave Search API Register or login to a Brave Search API account.

Read this article

### How to use Brave Search with Open WebUI

May 2, 2024

This guide covers the steps required to enable Brave Search as the default search engine in Open WebUI, a free and extensible self-hosted AI interface. Since both Brave Search API and any Open WebUI frameworks or libraries can evolve quickly, it’s best to always check the official documentation for the most up-to-date details. 1. Install Open WebUI using Docker Follow the official documentation to install Open WebUI on your choice Linux, Mac, or Windows: https://docs.

Read this article