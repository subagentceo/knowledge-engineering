# Get started with Claude Managed Agents

Create your first autonomous agent.

---

This guide walks you through creating an agent, setting up an environment, starting a session, and streaming agent responses.

<Tip>
**Prefer an interactive walkthrough?** Run `/claude-api managed-agents-onboard` in the latest version of [Claude Code](https://claude.com/product/claude-code) for a guided setup and interactive question-answering.
</Tip>

## Core concepts

| Concept | Description |
|---------|-------------|
| **Agent** | The model, system prompt, tools, MCP servers, and skills |
| **Environment** | A configured container template (packages, network access) |
| **Session** | A running agent instance within an environment, performing a specific task and generating outputs |
| **Events** | Messages exchanged between your application and the agent (user turns, tool results, status updates) |

## Prerequisites

- An Anthropic [Console account](/)
- An [API key](/settings/keys)

## Install the CLI

<Tabs>
<Tab title="Homebrew (macOS)">

```bash
brew install anthropics/tap/ant
```

</Tab>
<Tab title="curl (Linux/WSL)">

For Linux environments, download the release binary directly.

```bash nocheck
VERSION=1.7.0
OS=$(uname -s | tr '[:upper:]' '[:lower:]')
ARCH=$(uname -m | sed -e 's/x86_64/amd64/' -e 's/aarch64/arm64/')
curl -fsSL "https://github.com/anthropics/anthropic-cli/releases/download/v${VERSION}/ant_${VERSION}_${OS}_${ARCH}.tar.gz" \
  | sudo tar -xz -C /usr/local/bin ant
```

You can find all releases on the [GitHub releases page](https://github.com/anthropics/anthropic-cli/releases).

</Tab>
<Tab title="Go">

You may also install the CLI from source using `go install`. Requires Go 1.22 or later.

```bash
go install github.com/anthropics/anthropic-cli/cmd/ant@latest
```

The binary is placed in `$(go env GOPATH)/bin`. Add it to your `PATH` if it isn't already:

```bash
export PATH="$PATH:$(go env GOPATH)/bin"
```

</Tab>
</Tabs>

Check the installation:

```bash
ant --version
```

## Install the SDK

<Tabs>
  <Tab title="Python">
    ```bash
    pip install anthropic
    ```
  </Tab>
  <Tab title="TypeScript">
    ```bash
    npm install @anthropic-ai/sdk
    ```
  </Tab>
  <Tab title="Java">
    ```groovy Gradle
    implementation("com.anthropic:anthropic-java:2.30.0")
    ```
  </Tab>
  <Tab title="Go">
    ```bash
    go get github.com/anthropics/anthropic-sdk-go
    ```
  </Tab>
  <Tab title="C#">
    ```bash
    dotnet add package Anthropic
    ```
  </Tab>
  <Tab title="Ruby">
    ```bash
    bundle add anthropic
    ```
  </Tab>
  <Tab title="PHP">
    ```bash
    composer require anthropic-ai/sdk
    ```
  </Tab>
</Tabs>

Set your API key as an environment variable:

```bash
export ANTHROPIC_API_KEY="your-api-key-here"
```

## Create your first session

<Note>
All Managed Agents API requests require the `managed-agents-2026-04-01` beta header. The SDK sets the beta header automatically.
</Note>

<Steps>
  <Step title="Create an agent">
    Create an agent that defines the model, system prompt, and available tools.

    The `agent_toolset_20260401` tool type enables the full set of pre-built agent tools (bash, file operations, web search, and more). See [Tools](/docs/en/managed-agents/tools) for the complete list and per-tool configuration options.

    Save the returned `agent.id`. You'll reference it in every session you create.

  </Step>

  <Step title="Create an environment">
    An environment defines the container where your agent runs.

    Save the returned `environment.id`. You'll reference it in every session you create.
  </Step>

  <Step title="Start a session">
    Create a session that references your agent and environment.
  </Step>

  <Step title="Send a message and stream the response">
    Open a stream, send a user event, then process events as they arrive.

    The agent will write a Python script, execute it in the container, and verify the output file was created.
  </Step>
</Steps>

## What's happening

When you send a user event, Claude Managed Agents:

1. **Provisions a container:** Your environment configuration determines how it's built.
2. **Runs the agent loop:** Claude decides which tools to use based on your message
3. **Executes tools:** File writes, bash commands, and other tool calls run inside the container
4. **Streams events:** You receive real-time updates as the agent works
5. **Goes idle:** The agent emits a `session.status_idle` event when it has nothing more to do

## Next steps

<CardGroup cols={2}>
  <Card title="Define your agent" icon="brain" href="/docs/en/managed-agents/agent-setup">
    Create reusable, versioned agent configurations
  </Card>
  <Card title="Configure environments" icon="settings" href="/docs/en/managed-agents/environments">
    Customize networking and container settings
  </Card>
  <Card title="Agent tools" icon="tool" href="/docs/en/managed-agents/tools">
    Enable specific tools for your agent
  </Card>
  <Card title="Events and streaming" icon="lightning" href="/docs/en/managed-agents/events-and-streaming">
    Handle events and steer the agent mid-execution
  </Card>
</CardGroup>
