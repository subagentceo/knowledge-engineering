> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Domain Knowledge

> Resolve the optimal driver and detect antibots for any URL or agent

Look up which driver Nimble recommends for a given domain or agent — including detected antibot systems and whether JavaScript rendering is required. Use the result to set the `driver` parameter explicitly on Extract or Agent requests.

<Tip>
  Nimble selects the optimal driver automatically on every request. Use Domain
  Knowledge when you want to understand the driver tier before running at scale,
  or to pin a specific tier for cost predictability.
</Tip>

## Quick Start

### Example Request

<CodeGroup>
  ```bash cURL (URL) theme={"system"}
  curl -X GET 'https://sdk.nimbleway.com/v1/domain-knowledge/driver?url=www.lowes.com' \
  --header 'Authorization: Bearer <YOUR-API-KEY>'
  ```

  ```bash cURL (Agent) theme={"system"}
  curl -X GET 'https://sdk.nimbleway.com/v1/domain-knowledge/driver?agent=target_serp' \
  --header 'Authorization: Bearer <YOUR-API-KEY>'
  ```
</CodeGroup>

### Example Response

```json theme={"system"}
{
  "url": "www.lowes.com",
  "driver": "vx6",
  "antibots": ["akamai", "threatmetrix", "recaptcha", "akamai-sbsd"],
  "description": "Native Driver - non rendered fast request",
  "need_to_render": false
}
```

Agent lookup response:

```json theme={"system"}
{
  "agent": "target_serp",
  "driver": "wsa-10m",
  "antibots": ["perimeterx", "f5-shape", "recaptcha"],
  "description": "Stealth Driver - stealth browser with advanced bypassing any site, for Agents managed by Nimble",
  "need_to_render": true
}
```

## How it works

<Steps>
  <Step title="Submit a URL or agent name">
    Pass either a `url` (domain) or `agent` name as a query parameter. Exactly
    one must be provided.
  </Step>

  <Step title="Nimble resolves the driver">
    Nimble queries its domain knowledge database to identify the antibot systems
    protecting the target and returns the recommended driver.
  </Step>

  <Step title="Pin the driver on your Extract or Agent request">
    Use the returned `driver` value in the `driver` parameter of an Extract or
    Agent request to skip auto-detection and use the resolved tier directly.
  </Step>
</Steps>

## Parameters

<AccordionGroup>
  <Accordion icon="link" title="url">
    <ParamField query="url" type="string">
      Target domain to resolve the driver for.

      **Example:** `amazon.com`

      Mutually exclusive with `agent` — provide exactly one.
    </ParamField>
  </Accordion>

  <Accordion icon="robot" title="agent">
    <ParamField query="agent" type="string">
      Agent name to resolve the driver for.

      **Example:** `amazon_pdp`

      Mutually exclusive with `url` — provide exactly one.
    </ParamField>
  </Accordion>
</AccordionGroup>

## Response fields

| Field            | Type    | Description                                                                           |
| ---------------- | ------- | ------------------------------------------------------------------------------------- |
| `driver`         | string  | Recommended driver (e.g. `vx6`, `vx8`, `vx10`, `wsa-6m`)                              |
| `description`    | string  | Human-readable description of the driver                                              |
| `antibots`       | array   | Antibot systems detected on the domain (e.g. `cloudflare`, `perimeterx`, `recaptcha`) |
| `need_to_render` | boolean | Whether JavaScript rendering is required                                              |
| `url`            | string  | Echoed input (present when `url` query param was used)                                |
| `agent`          | string  | Echoed input (present when `agent` query param was used)                              |

## Using the result with Extract

Pass the resolved `driver` value directly to an Extract request to skip auto-detection.

<Note>
  If the resolved driver is a `wsa-*` value, use the equivalent `vx` driver
  instead when calling Extract. See the conversion table below.
</Note>

| Agent driver         | Extract driver |
| -------------------- | -------------- |
| `wsa-6` / `wsa-6m`   | `vx6`          |
| `wsa-8` / `wsa-8m`   | `vx8`          |
| `wsa-10` / `wsa-10m` | `vx10`         |

```bash cURL theme={"system"}
# Step 1 — resolve the driver
curl -s -X GET 'https://sdk.nimbleway.com/v1/domain-knowledge/driver?url=www.lowes.com' \
--header 'Authorization: Bearer <YOUR-API-KEY>'

# Step 2 — use the resolved driver in Extract
curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
--header 'Authorization: Bearer <YOUR-API-KEY>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "url": "https://www.lowes.com/pl/Drills/4294857312",
    "driver": "<DRIVER>"
}'
```

## Related

<CardGroup cols={2}>
  <Card icon="arrows-to-circle" href="/nimble-sdk/web-tools/extract/quickstart" title="Extract">
    Use the resolved driver in Extract requests via the `driver` parameter
  </Card>

  <Card icon="robot" href="/nimble-sdk/agentic/agents" title="Agents">
    Resolve the driver for any pre-built or custom agent
  </Card>

  <Card icon="credit-card" href="/nimble-sdk/admin/pricing" title="Pricing">
    Understand how driver tiers affect request cost
  </Card>
</CardGroup>
