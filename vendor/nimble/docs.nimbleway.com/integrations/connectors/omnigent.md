> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Omnigent

> Nimble is a built-in web_search provider in Omnigent: grounded, live web search for any model, including Databricks-hosted Claude and Llama.

### Overview

<Frame caption="A Databricks-hosted agent in Omnigent running grounded web search through Nimble">
  <video autoPlay muted loop playsInline className="w-full aspect-video" src="https://mintcdn.com/nimble-f5a8283f/Fl607xrgXEKFH6Ts/images/connectors/omnigent-hero.mp4?fit=max&auto=format&n=Fl607xrgXEKFH6Ts&q=85&s=14fd57670b937697dab8b7a37c457f62" data-path="images/connectors/omnigent-hero.mp4" />
</Frame>

[Omnigent](https://github.com/omnigent-ai/omnigent) is an open-source AI agent framework and meta-harness from Databricks. It gives you one orchestration layer over Claude Code, Codex, Cursor, Pi, and agents you write yourself, with shared sessions, policies, and sandboxing.

Nimble ships as a first-class `web_search` provider in Omnigent. Set `search_provider: nimble` in any agent spec and the agent gets grounded, live web results from Nimble's [Search API](/nimble-sdk/web-tools/search). No fork, no plugin.

### Web search for any model

Omnigent lets you run any model and swap harnesses with a one-line change. Nimble brings that same flexibility to web search.

The `web_search` builtin pairs each model with a search backend. Set `search_provider: nimble` and any model gets grounded web search through Nimble: Claude, Llama, and the Databricks-hosted models you run in Omnigent. One model-agnostic backend, with anti-bot handling, JS rendering, and geo-targeting underneath.

Databricks-hosted models get grounded, live web search through Nimble out of the box.

### Quick Start

#### 1. Get a Nimble API key

Get your API key from [Nimble's dashboard](https://online.nimbleway.com/account-settings/api-keys) (free trial available) and export it:

```bash theme={"system"}
export NIMBLE_API_KEY="your-api-key"
```

#### 2. Enable the provider in your agent spec

A custom agent lives in its own directory with a `config.yaml` at the root. Create `research-agent/config.yaml`, add the `web_search` builtin, and set `search_provider: nimble`:

```yaml theme={"system"}
spec_version: 1
name: research-agent
prompt: |
  You are a research assistant. Use web_search to ground your
  answers in current information from the web.

executor:
  type: omnigent
  model: databricks-claude-sonnet-4-6   # run on any model

tools:
  builtins:
    - name: web_search
      search_provider: nimble
      api_key: ${NIMBLE_API_KEY}
```

#### 3. Run the agent

Reference the agent by its directory path:

```bash theme={"system"}
omni run ./research-agent -p "What were the biggest AI model releases this month?"
```

The agent now calls Nimble whenever it searches the web.

### Configuration

The `web_search` builtin accepts these keys under the Nimble provider:

<AccordionGroup>
  <Accordion title="search_provider" icon="plug">
    **Required.** Set to `nimble` to route web search through Nimble.
  </Accordion>

  <Accordion title="api_key" icon="key">
    **Required.** Your Nimble API key. Use `${NIMBLE_API_KEY}` to read it from the environment instead of hardcoding it in the spec.
  </Accordion>

  <Accordion title="max_results" icon="list-ol">
    **Optional.** Number of results to return, from `1` to `100`. Defaults to `5`. Values outside the range are clamped.
  </Accordion>

  <Accordion title="search_depth" icon="layer-group">
    **Optional.** Controls the speed-vs-richness tradeoff. Defaults to `lite`.

    * `lite`: titles, URLs, and snippets. Lowest latency, best for broad discovery.
    * `deep`: full real-time page extraction for each result. Higher latency, richer content.

    See [Search Depth](/nimble-sdk/web-tools/search-depth) for details.
  </Accordion>
</AccordionGroup>

A fully configured provider looks like this:

```yaml theme={"system"}
tools:
  builtins:
    - name: web_search
      search_provider: nimble
      api_key: ${NIMBLE_API_KEY}
      max_results: 10
      search_depth: deep
```

### Additional Resources

<CardGroup cols={2}>
  <Card title="Omnigent on GitHub" icon="github" href="https://github.com/omnigent-ai/omnigent">
    The open-source agent framework and meta-harness.
  </Card>

  <Card title="Omnigent Custom Agents" icon="book-open" href="https://omnigent.ai/docs/use/custom-agents">
    Define and run a custom agent: directory layout, `config.yaml`, and the run command.
  </Card>

  <Card title="Nimble Search API" icon="magnifying-glass" href="/nimble-sdk/web-tools/search">
    The Search endpoint behind the provider: parameters and response format.
  </Card>

  <Card title="Nimble on Databricks" icon="https://mintcdn.com/nimble-f5a8283f/xHR1kINYho_Fqe-s/images/icons/databricks.svg?fit=max&auto=format&n=xHR1kINYho_Fqe-s&q=85&s=1a405a4f3e0fb5d7b3e9d1b8fd5607ff" href="/integrations/partnerships/databricks" width="24" height="24" data-path="images/icons/databricks.svg">
    The full Databricks integration: Marketplace MCP, Genie, and SQL-native enrichment.
  </Card>
</CardGroup>
