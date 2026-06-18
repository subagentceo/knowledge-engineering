> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Agents Gallery

> Browse pre-built Web Search Agents — or create one for any website

Browse pre-built Web Search Agents for popular websites. These agents are maintained by Nimble 24/7 and auto-heal when sites change.

**Don't see the website you need?** Nimble creates agents for any website — not just the ones listed here.

<CardGroup cols={2}>
  <Card icon="wand-magic-sparkles" href="https://online.nimbleway.com/workflow-builder" title="Create Agent for Any Website">
    Open Nimble Studio and build a custom agent in seconds — no coding required
  </Card>

  <Card icon="plug" href="/integrations/agent-skills/plugin-installation" title="Install Plugin">
    Let Claude Code or Cursor find or create the right agent for you
    automatically
  </Card>
</CardGroup>

<Card title="Browse Gallery Visually" icon="palette" href="https://online.nimbleway.com/pipeline-gallery">
  Explore pre-built agents with previews, examples, and interactive
  documentation.
</Card>

## When to Use

Use agent discovery when you need to:

* **Browse available agents** - See what platforms are supported
* **Filter by vertical** - Find agents for specific industries (e-commerce, search, social)
* **Inspect agent details** - Understand input parameters and output schema
* **Check capabilities** - Verify localization and pagination support

## Two Ways to Explore

<Note>
  Prefer a visual interface? Browse agents with previews, live demos, and
  exportable code snippets at the [Agent
  Gallery](https://online.nimbleway.com/pipeline-gallery) in Nimble Platform.
</Note>

***

## List Agents API

Browse and search the agent catalog.

<Card icon="code" title="GET /v1/agents">
  `GET https://sdk.nimbleway.com/v1/agents`
</Card>

### Parameters

| Parameter | Type    | Description                                          | Required |
| --------- | ------- | ---------------------------------------------------- | -------- |
| `privacy` | Enum    | Filter by privacy level (`all`, `public`, `private`) | No       |
| `search`  | String  | Filter agents by keyword.                            | No       |
| `offset`  | Integer | Pagination offset (default: `0`)                     | No       |
| `limit`   | Integer | Number of results per page (default: `100`)          | No       |

### Response Schema

Each agent in the response contains:

| Field          | Type    | Description                                                                            |
| -------------- | ------- | -------------------------------------------------------------------------------------- |
| `name`         | string  | Unique agent identifier (use this in API calls)                                        |
| `display_name` | string  | Human-readable agent name                                                              |
| `description`  | string  | What the agent does                                                                    |
| `is_public`    | boolean | Whether the agent is publicly available                                                |
| `managed_by`   | string  | Who maintains this agent: `nimble` (public), `community` (public), or `self` (private) |
| `vertical`     | string  | Industry vertical (e.g., "Ecommerce", "Search")                                        |
| `entity_type`  | string  | Page type (e.g., "Product Detail Page", "SERP")                                        |
| `domain`       | string  | Target website domain                                                                  |

### Usage Examples

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  # List all public agents
  agents = nimble.agent.list(privacy="public")

  for agent in agents:
      print(f"{agent.name}: {agent.display_name}")
      print(f"  Domain: {agent.domain}")
      print(f"  Vertical: {agent.vertical}")
      print(f"  Type: {agent.entity_type}")
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  // List all public agents
  const agents = await nimble.agent.list({ privacy: "public" });

  agents.forEach((agent) => {
    console.log(`${agent.name}: ${agent.display_name}`);
    console.log(`  Domain: ${agent.domain}`);
    console.log(`  Vertical: ${agent.vertical}`);
    console.log(`  Type: ${agent.entity_type}`);
  });
  ```

  ```bash cURL theme={"system"}
  curl -X GET 'https://sdk.nimbleway.com/v1/agents?privacy=public' \
    -H 'Authorization: Bearer YOUR-API-KEY'
  ```
</CodeGroup>

### Response Example

```json theme={"system"}
[
  {
    "name": "amazon_pdp",
    "is_public": true,
    "display_name": "Amazon Product Page",
    "description": "Extract structured data from Amazon product detail pages including pricing, reviews, specifications, and availability.",
    "vertical": "Ecommerce",
    "entity_type": "Product Detail Page (PDP)",
    "domain": "www.amazon.com"
  },
  {
    "name": "amazon_serp",
    "is_public": true,
    "display_name": "Amazon Search Results",
    "description": "Extract product listings from Amazon search results pages based on a keyword query.",
    "vertical": "Ecommerce",
    "entity_type": "Search Engine Results Page (SERP)",
    "domain": "www.amazon.com"
  },
  {
    "name": "walmart_pdp",
    "is_public": true,
    "display_name": "Walmart Product Page",
    "description": "Extract structured data from Walmart product detail pages including pricing, reviews, and variants.",
    "vertical": "Ecommerce",
    "entity_type": "Product Detail Page (PDP)",
    "domain": "www.walmart.com"
  },
  {
    "name": "google_search",
    "is_public": true,
    "display_name": "Google Search Results",
    "description": "Extract structured data from Google Search Results Pages (SERPs) including organic results, ads, and featured snippets.",
    "vertical": "Search Engine",
    "entity_type": "Search Engine Results Page (SERP)",
    "domain": "www.google.com"
  }
]
```

***

## Get Agent Details API

Get comprehensive information about a specific agent, including input parameters and output schema.

<Card icon="code" title="GET /v1/agents/{agent_name}">
  ```GET https://sdk.nimbleway.com/v1/agents/{agent_name} theme={"system"}
  ```
</Card>

### Parameters

| Parameter    | Type   | Description                         | Required |
| ------------ | ------ | ----------------------------------- | -------- |
| `agent_name` | string | The agent name (e.g., `amazon_pdp`) | Yes      |

### Response Schema

| Field              | Type    | Description                                                                            |
| ------------------ | ------- | -------------------------------------------------------------------------------------- |
| `name`             | string  | Unique agent identifier                                                                |
| `display_name`     | string  | Human-readable agent name                                                              |
| `description`      | string  | What the agent does                                                                    |
| `is_public`        | boolean | Whether the agent is publicly available                                                |
| `managed_by`       | string  | Who maintains this agent: `nimble` (public), `community` (public), or `self` (private) |
| `vertical`         | string  | Industry vertical                                                                      |
| `entity_type`      | string  | Page type                                                                              |
| `domain`           | string  | Target website domain                                                                  |
| `input_properties` | array   | Input parameters for the agent (see below)                                             |
| `output_schema`    | object  | JSON schema describing output fields                                                   |
| `feature_flags`    | object  | Supported capabilities (localization, pagination)                                      |

#### Input Properties

Each item in `input_properties` contains:

| Field                   | Type    | Description                                 |
| ----------------------- | ------- | ------------------------------------------- |
| `name`                  | string  | Parameter name                              |
| `type`                  | string  | Data type (string, number, boolean)         |
| `description`           | string  | What the parameter does                     |
| `required`              | boolean | Whether the parameter is required           |
| `default`               | string  | Default value if not provided               |
| `examples`              | array   | Example values                              |
| `rules`                 | array   | Validation rules                            |
| `is_localization_param` | boolean | Whether the parameter controls localization |
| `is_pagination_param`   | boolean | Whether the parameter controls pagination   |

#### Feature Flags

| Flag                        | Type    | Description                                  |
| --------------------------- | ------- | -------------------------------------------- |
| `is_localization_supported` | boolean | Supports ZIP code for location-specific data |
| `is_pagination_supported`   | boolean | Supports paginated results                   |

### Usage Examples

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  # Get agent details
  agent = nimble.agent.get("amazon_pdp")

  print(f"Agent: {agent.display_name}")
  print(f"Description: {agent.description}")
  print(f"Domain: {agent.domain}")

  # Check feature flags
  flags = agent.feature_flags
  print(f"\nCapabilities:")
  print(f"  Localization: {'Yes' if flags.is_localization_supported else 'No'}")
  print(f"  Pagination: {'Yes' if flags.is_pagination_supported else 'No'}")

  # List input parameters
  print(f"\nInput Parameters:")
  for param in agent.input_properties:
      required = "required" if param.required else "optional"
      print(f"  {param.name} ({param.type}) - {required}")
      print(f"    {param.description}")
      if param.examples:
          print(f"    Examples: {', '.join(param.examples)}")
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  // Get agent details
  const agent = await nimble.agent.get("amazon_pdp");

  console.log(`Agent: ${agent.display_name}`);
  console.log(`Description: ${agent.description}`);
  console.log(`Domain: ${agent.domain}`);

  // Check feature flags
  const flags = agent.feature_flags;
  console.log("\nCapabilities:");
  console.log(
    `  Localization: ${flags.is_localization_supported ? "Yes" : "No"}`,
  );
  console.log(`  Pagination: ${flags.is_pagination_supported ? "Yes" : "No"}`);

  // List input parameters
  console.log("\nInput Parameters:");
  agent.input_properties.forEach((param) => {
    const required = param.required ? "required" : "optional";
    console.log(`  ${param.name} (${param.type}) - ${required}`);
    console.log(`    ${param.description}`);
    if (param.examples?.length) {
      console.log(`    Examples: ${param.examples.join(", ")}`);
    }
  });
  ```

  ```bash cURL theme={"system"}
  curl -X GET 'https://sdk.nimbleway.com/v1/agents/amazon_pdp' \
    -H 'Authorization: Bearer YOUR-API-KEY'
  ```
</CodeGroup>

### Response Example

```json theme={"system"}
{
  "name": "amazon_pdp",
  "is_public": true,
  "display_name": "Amazon Product Page",
  "description": "Extract structured data from Amazon product detail pages including pricing, reviews, specifications, variants, and availability.",
  "vertical": "Ecommerce",
  "entity_type": "Product Detail Page (PDP)",
  "domain": "www.amazon.com",
  "input_properties": [
    {
      "name": "asin",
      "required": true,
      "type": "string",
      "description": "Amazon Standard Identification Number (ASIN) - the unique 10-character product identifier",
      "rules": ["Must be exactly 10 alphanumeric characters"],
      "examples": ["B08N5WRWNW", "B0DLKFK6LR"],
      "default": null
    },
    {
      "name": "zip_code",
      "required": false,
      "type": "string",
      "description": "ZIP code for location-specific pricing and availability",
      "rules": ["5-digit US ZIP code"],
      "examples": ["90210", "10001"],
      "default": "90210"
    }
  ],
  "output_schema": {
    "asin": { "type": "string", "description": "Product ASIN" },
    "product_title": { "type": "string", "description": "Full product name" },
    "brand": { "type": "string", "description": "Product brand" },
    "web_price": { "type": "number", "description": "Current selling price" },
    "list_price": {
      "type": "number",
      "description": "Original price before discount"
    },
    "average_of_reviews": {
      "type": "number",
      "description": "Average rating (0-5)"
    },
    "number_of_reviews": {
      "type": "number",
      "description": "Total review count"
    },
    "availability": { "type": "boolean", "description": "Whether in stock" },
    "image_url": { "type": "string", "description": "Main product image URL" }
  },
  "feature_flags": {
    "is_localization_supported": true,
    "is_pagination_supported": false
  }
}
```

***

## Available Agents by Vertical

### E-commerce

| Agent             | Display Name         | Domain                                        | Localization | Pagination |
| ----------------- | -------------------- | --------------------------------------------- | ------------ | ---------- |
| `amazon_pdp`      | Amazon Product Page  | [www.amazon.com](http://www.amazon.com)       | Yes          | No         |
| `amazon_serp`     | Amazon Search        | [www.amazon.com](http://www.amazon.com)       | Yes          | Yes        |
| `amazon_category` | Amazon Category      | [www.amazon.com](http://www.amazon.com)       | No           | Yes        |
| `walmart_pdp`     | Walmart Product Page | [www.walmart.com](http://www.walmart.com)     | Yes          | No         |
| `walmart_search`  | Walmart Search       | [www.walmart.com](http://www.walmart.com)     | Yes          | Yes        |
| `target_pdp`      | Target Product Page  | [www.target.com](http://www.target.com)       | Yes          | No         |
| `best_buy_pdp`    | Best Buy Product     | [www.bestbuy.com](http://www.bestbuy.com)     | Yes          | No         |
| `home_depot_pdp`  | Home Depot Product   | [www.homedepot.com](http://www.homedepot.com) | Yes          | No         |

### Search Engines

| Agent                | Display Name          | Domain                                  | Localization | Pagination |
| -------------------- | --------------------- | --------------------------------------- | ------------ | ---------- |
| `google_search`      | Google Search Results | [www.google.com](http://www.google.com) | Yes          | Yes        |
| `google_maps_search` | Google Maps Search    | maps.google.com                         | Yes          | Yes        |
| `google_search_aio`  | Google AI Overview    | [www.google.com](http://www.google.com) | Yes          | No         |

### Social Media

| Agent            | Display Name   | Domain                                      | Localization | Pagination |
| ---------------- | -------------- | ------------------------------------------- | ------------ | ---------- |
| `tiktok_account` | TikTok Account | [www.tiktok.com](http://www.tiktok.com)     | No           | Yes        |
| `facebook_page`  | Facebook Page  | [www.facebook.com](http://www.facebook.com) | No           | No         |
| `youtube_shorts` | YouTube Shorts | [www.youtube.com](http://www.youtube.com)   | No           | Yes        |

### LLM Platforms

| Agent        | Display Name      | Domain                                        | Localization | Pagination |
| ------------ | ----------------- | --------------------------------------------- | ------------ | ---------- |
| `chatgpt`    | ChatGPT Responses | chatgpt.com                                   | No           | No         |
| `gemini`     | Gemini Responses  | gemini.google.com                             | No           | No         |
| `perplexity` | Perplexity        | [www.perplexity.ai](http://www.perplexity.ai) | No           | No         |
| `grok`       | Grok Responses    | grok.com                                      | No           | No         |

***

## Common Patterns

### Search Agents by Keyword

Use the `search` query parameter to find agents matching a term across `display_name`, `vertical`, and `domain`:

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  agents = nimble.agent.list(search="amazon")

  for agent in agents:
      print(f"{agent.name}: {agent.display_name} ({agent.domain})")
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const agents = await nimble.agent.list({ search: "amazon" });

  agents.forEach((agent) => {
    console.log(`${agent.name}: ${agent.display_name} (${agent.domain})`);
  });
  ```

  ```bash cURL theme={"system"}
  curl -X GET 'https://sdk.nimbleway.com/v1/agents?search=amazon' \
    -H 'Authorization: Bearer YOUR-API-KEY'
  ```
</CodeGroup>

### Filter Agents by Vertical

Find all agents for a specific industry:

```python theme={"system"}
from nimble_python import Nimble

nimble = Nimble(api_key="YOUR-API-KEY")

# Get all agents
agents = nimble.agent.list(privacy="public")

# Filter by vertical
ecommerce_agents = [
    agent for agent in agents
    if agent.vertical == 'Ecommerce'
]

print(f"Found {len(ecommerce_agents)} e-commerce agents:")
for agent in ecommerce_agents:
    print(f"  {agent.name}: {agent.display_name} ({agent.domain})")
```

### Check Localization Support

Verify an agent supports location-specific data:

```python theme={"system"}
from nimble_python import Nimble

nimble = Nimble(api_key="YOUR-API-KEY")

agent = nimble.agent.get("amazon_pdp")

if agent.feature_flags.is_localization_supported:
    print("This agent supports localization!")
    print("Pass zip_code parameter for location-specific pricing.")
else:
    print("This agent does not support localization.")
```

### Get Required Parameters

Find which parameters are required before calling an agent:

```python theme={"system"}
from nimble_python import Nimble

nimble = Nimble(api_key="YOUR-API-KEY")

agent = nimble.agent.get("amazon_pdp")

required_params = [
    p for p in agent.input_properties
    if p.required
]

optional_params = [
    p for p in agent.input_properties
    if not p.required
]

print("Required parameters:")
for p in required_params:
    examples = ', '.join(p.examples) if p.examples else ''
    print(f"  {p.name}: {p.description}")
    if examples:
        print(f"    Examples: {examples}")

print("\nOptional parameters:")
for p in optional_params:
    default = p.default if p.default else 'none'
    print(f"  {p.name}: {p.description} (default: {default})")
```

### Validate Parameters Before Calling

Check parameters match the expected schema:

```python theme={"system"}
from nimble_python import Nimble

nimble = Nimble(api_key="YOUR-API-KEY")

def validate_params(agent_name, params):
    """Validate params against agent input_properties"""
    agent = nimble.agent.get(agent_name)
    errors = []

    # Build lookup of input properties
    props = {p.name: p for p in agent.input_properties}

    # Check required fields
    for prop_name, prop in props.items():
        if prop.required and prop_name not in params:
            errors.append(f"Missing required parameter: {prop_name}")

    # Check for unknown parameters
    for param_name in params:
        if param_name not in props:
            errors.append(f"Unknown parameter: {param_name}")

    return errors

# Validate before calling
errors = validate_params("amazon_pdp", {"asin": "B08N5WRWNW"})

if errors:
    print("Validation errors:")
    for error in errors:
        print(f"  - {error}")
else:
    print("Parameters are valid!")
```

***

## Next Steps

<CardGroup cols={2}>
  <Card title="Create Agent for Any Website" icon="wand-magic-sparkles" href="https://online.nimbleway.com/workflow-builder">
    Open Nimble Studio and describe what you need
  </Card>

  <Card title="Install Plugin" icon="plug" href="/integrations/agent-skills/plugin-installation">
    Use Nimble in Claude Code or Cursor
  </Card>

  <Card title="Use Agents" icon="play" href="/nimble-sdk/agentic/agents">
    Learn how to call agents in your code
  </Card>

  <Card icon="code" href="/api-reference/agents/list-agents" title="API Reference">
    Explore endpoints and response schemas for the Agents API
  </Card>
</CardGroup>
