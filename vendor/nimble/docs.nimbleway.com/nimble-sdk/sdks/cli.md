> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# CLI

> Official Nimble CLI — interact with the Nimble API directly from your terminal

The Nimble CLI lets you run extractions, searches, crawls, and agents directly from your terminal — no code required.

## Installation

The CLI requires **Go 1.22+**.

```bash theme={"system"}
npm -g i @nimble-way/nimble-cli
```

The binary installs to `$HOME/go/bin`. Add it to your `PATH` if needed:

```bash theme={"system"}
export PATH="$PATH:$(go env GOPATH)/bin"
```

Verify the installation:

```bash theme={"system"}
nimble --version
```

## Authentication

Set your API key as an environment variable:

```bash theme={"system"}
export NIMBLE_API_KEY="your-api-key"
```

Get your API key from [Account Settings](https://online.nimbleway.com/account-settings/api-keys).

## Command Structure

All commands follow a resource-based pattern:

```bash theme={"system"}
nimble [resource] <command> [flags...]
```

Run `nimble --help` to list all resources, or `nimble [resource] --help` for resource-specific usage.

## Core Commands

### Extract

Extract clean content from any URL:

```bash theme={"system"}
nimble extract --url "https://www.example.com"
```

With JavaScript rendering and geo-targeting:

```bash theme={"system"}
nimble extract \
  --url "https://www.example.com" \
  --render true \
  --country US
```

### Search

Perform a real-time web search:

```bash theme={"system"}
nimble search --query "best web scraping tools" --country US
```

### Map

Discover all URLs in a domain:

```bash theme={"system"}
nimble map --url "https://www.example.com" --sitemap only
```

### Crawl

Crawl an entire website:

```bash theme={"system"}
nimble crawl run --url "https://www.example.com" --limit 100
```

### Agents

Run a pre-built agent:

```bash theme={"system"}
nimble agent run --agent amazon_pdp --params '{"asin": "B08N5WRWNW"}'
```

## Output Formats

Control response formatting with the `--format` flag:

| Format    | Description                      |
| --------- | -------------------------------- |
| `auto`    | Automatic (default)              |
| `pretty`  | Pretty-printed JSON              |
| `json`    | Compact JSON                     |
| `jsonl`   | JSON Lines (one object per line) |
| `yaml`    | YAML output                      |
| `raw`     | Raw API response body            |
| `explore` | Interactive explorer view        |

```bash theme={"system"}
nimble extract --url "https://www.example.com" --format pretty
```

## Transforming Output

Use `--transform` with [GJSON syntax](https://github.com/tidwall/gjson) to extract specific fields:

```bash theme={"system"}
# Extract just the task_id
nimble extract --url "https://www.example.com" --transform "task_id"

# Extract a nested field
nimble extract --url "https://www.example.com" --transform "data.html"
```

## File Arguments

Pass file contents as argument values using `@filename` syntax:

```bash theme={"system"}
# Pass a JSON schema file
nimble extract --url "https://www.example.com" --parsing-schema @schema.json

# Pass a file inside a JSON structure
nimble extract --options '{"parsing_schema": "@schema.json"}'
```

Use `@file://filename` for plain text or `@data://filename` for base64-encoded content.

## Global Flags

| Flag                | Description                                 |
| ------------------- | ------------------------------------------- |
| `--help`            | Show help for any command                   |
| `--debug`           | Enable debug logging with full HTTP details |
| `--version`, `-v`   | Display the CLI version                     |
| `--base-url`        | Override the API base URL                   |
| `--format`          | Set output format                           |
| `--format-error`    | Set error output format                     |
| `--transform`       | Transform output using GJSON syntax         |
| `--transform-error` | Transform error output using GJSON syntax   |

## Debug Mode

Enable `--debug` to inspect the full HTTP request and response — useful for troubleshooting:

```bash theme={"system"}
nimble extract --url "https://www.example.com" --debug
```

## Next Steps

<CardGroup cols={2}>
  <Card title="API Reference" icon="code" href="/api-reference/introduction">
    Full REST API documentation for all endpoints
  </Card>

  <Card title="Extract" icon="arrows-to-circle" href="/nimble-sdk/web-tools/extract/quickstart">
    Extract features and parameters
  </Card>

  <Card title="Search" icon="magnifying-glass" href="/nimble-sdk/web-tools/search">
    Real-time web search with structured results
  </Card>

  <Card title="Agents" icon="bullseye-pointer" href="/nimble-sdk/agentic/agents">
    Pre-built extraction agents for popular platforms
  </Card>
</CardGroup>
