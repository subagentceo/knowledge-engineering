> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Via Code

> Create custom extraction agents programmatically via API, CLI, SDK, or your AI coding assistant

Custom agents let you turn any website into a structured data API. Describe what data you need, and Nimble builds a production-ready extraction agent that delivers structured results at scale.

There are multiple ways to create them. Pick the one that fits your workflow.

<CardGroup cols={3}>
  <Card icon="browser" href="/nimble-sdk/agentic/studio" title="Nimble Studio">
    Visual, no-code creation in the browser
  </Card>

  <Card icon="code" href="#programmatic-creation" title="API / CLI / SDK">
    Create agents from code, terminal, or CI/CD pipelines
  </Card>

  <Card icon="hammer" href="/integrations/agent-skills/web-tools-skills/nimble-agent-builder" title="Agent Builder Skill">
    AI-assisted creation in Claude Code or Cursor
  </Card>
</CardGroup>

## Custom vs Public Agents

| Feature      | Public Agent                   | Custom Agent                               |
| ------------ | ------------------------------ | ------------------------------------------ |
| Maintenance  | **Maintained by Nimble** 24/7  | Maintained by you                          |
| Setup        | Zero, just use agent name      | Create via Platform, API, CLI, SDK, or IDE |
| Availability | Popular sites                  | Any website                                |
| Auto-healing | Yes, updated when sites change | No, you update if needed                   |
| API usage    | Same Agent API                 | Same Agent API                             |
| Visibility   | Available to all users         | Private to your account                    |

<Tip>
  Check the [Agent Gallery](/nimble-sdk/agentic/agent-gallery) first. A
  pre-built agent may already exist for your target site. Pre-built agents are
  auto-maintained by Nimble 24/7.
</Tip>

## Choose Your Method

All methods produce the same result: a private agent accessible via the Agent API. The difference is the interface.

| Method                                          | Best for                                     | Setup                                                                      |
| ----------------------------------------------- | -------------------------------------------- | -------------------------------------------------------------------------- |
| **[Nimble Studio](/nimble-sdk/agentic/studio)** | Non-technical users, quick visual creation   | None, browser only                                                         |
| **API**                                         | CI/CD pipelines, automated agent creation    | API key                                                                    |
| **CLI**                                         | Terminal-first developers                    | `npm i -g @nimble-way/nimble-cli` + API key                                |
| **SDK** (Python/Node)                           | Programmatic creation in application code    | `pip install nimble_python` or `npm i @nimble-way/nimble-js` + API key     |
| **Agent Builder Skill**                         | AI-assisted creation in Claude Code / Cursor | [Plugin install](/integrations/agent-skills/plugin-installation) + API key |

## Agent Builder Skill (Recommended)

The fastest way to create custom agents. The [Agent Builder skill](/integrations/agent-skills/web-tools-skills/nimble-agent-builder) handles the entire generate/test/iterate flow inside your IDE. Just describe what you need in plain language, and your AI assistant does the rest.

<Card icon="hammer" href="/integrations/agent-skills/web-tools-skills/nimble-agent-builder" title="Get Started with Agent Builder">
  Install the Nimble plugin for Claude Code or Cursor and start building agents
  from your IDE in minutes.
</Card>

**Example prompts:**

```
"build an agent for extracting hotel prices from Booking.com"
"set up extraction for Amazon product pages"
"create a reusable scraper for job listings on LinkedIn"
```

The skill searches for existing agents, generates a new one if needed, and lets you refine interactively. No manual API calls or polling required.

<Tip>
  The Agent Builder skill uses the same APIs documented below, but handles the
  generate/poll/iterate loop automatically. Start here unless you need CI/CD
  integration or full programmatic control.
</Tip>

***

## Via API / CLI / SDK

For CI/CD pipelines, automation, or full programmatic control. All methods follow three steps: generate, poll, iterate.

<Note>
  Agent generation is rate limited to **100 generations per customer per day**. This limit applies across all generation methods (API, CLI, SDK, and Agent Builder skill). Need a higher limit? Contact your CS or open a [Support Ticket](https://portal.usepylon.com/nimble).
</Note>

<Steps>
  <Step title="Generate">
    Describe what you need. Optionally provide input/output schemas. Refine an
    existing agent by passing `from_agent`.
  </Step>

  <Step title="Poll for completion">
    Generation is async. Poll the generation ID until status is `success`. This
    typically takes 3-7 minutes for new agents, or as fast as 1 minute for
    refinements. The generated version is automatically available via the Agent
    API.
  </Step>

  <Step title="Iterate (optional)">
    Not satisfied with the results? Generate again with `from_agent` pointing at
    the current agent to refine it. Repeat steps 1-2 until the output matches
    expectations.
  </Step>
</Steps>

### Generate

`POST /v1/agents/generations`

<AccordionGroup>
  <Accordion icon="message" title="prompt - Required">
    <ParamField path="prompt" type="string" required>
      Natural language description of what data to extract from the target page.

      Be specific about data types and structure. For example: "Extract product name, current price as a number, rating out of 5, and first 5 reviews with rating and text."
    </ParamField>
  </Accordion>

  <Accordion icon="link" title="url - Required">
    <ParamField path="url" type="string" required>
      Sample URL of the page type you want to extract from. The generation engine analyzes this page to build the extraction logic.
    </ParamField>
  </Accordion>

  <Accordion icon="tag" title="agent_name">
    <ParamField path="agent_name" type="string">
      Name for the new agent. Use lowercase with underscores (e.g., `niche_store_pdp`).

      Be descriptive: `competitor_pricing` not `agent1`. Include the site or type: `niche_store_reviews`.
    </ParamField>
  </Accordion>

  <Accordion icon="rotate" title="from_agent">
    <ParamField path="from_agent" type="string">
      Name of an existing agent to refine. Use this to iterate on a previous generation. A new version is created with the new prompt applied on top, preserving what already works.
    </ParamField>
  </Accordion>

  <Accordion icon="brackets-curly" title="input_schema">
    <ParamField path="input_schema" type="object">
      Custom input schema defining the parameters the agent accepts (e.g., `url`, `keyword`, `page`). If omitted, the schema is inferred from the prompt and URL.
    </ParamField>
  </Accordion>

  <Accordion icon="brackets-curly" title="output_schema">
    <ParamField path="output_schema" type="object">
      Custom output schema defining the structure of extracted data. If omitted, the schema is inferred from the prompt.
    </ParamField>
  </Accordion>

  <Accordion icon="circle-info" title="metadata">
    <ParamField path="metadata" type="object">
      Additional metadata to attach to the agent. Use this for internal labels, tags, or tracking information.
    </ParamField>
  </Accordion>
</AccordionGroup>

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble
  import time

  nimble = Nimble(api_key="YOUR-API-KEY")

  # Generate the agent
  result = nimble.agent.generate(
      prompt="Extract product name, price, rating, stock status, and first 5 reviews with rating and text",
      url="https://example-niche-store.com/products/widget-pro"
  )

  generation_id = result["id"]
  print(f"Generation started: {generation_id}")

  # Poll until complete
  while True:
      gen = nimble.agent.get_generation(generation_id=generation_id)
      print(f"Status: {gen['status']}")
      if gen["status"] == "success":
          break
      time.sleep(10)

  print(f"Agent ready: {gen['agent_name']}")
  print(f"Summary: {gen['summary']}")
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  // Generate the agent
  const result = await nimble.agent.generate({
    agentName: "niche_store_pdp",
    prompt:
      "Extract product name, price, rating, stock status, and first 5 reviews with rating and text",
    url: "https://example-niche-store.com/products/widget-pro",
  });

  const generationId = result.id;
  console.log(`Generation started: ${generationId}`);

  // Poll until complete
  let gen;
  do {
    await new Promise((r) => setTimeout(r, 10000));
    gen = await nimble.agent.getGeneration(generationId);
    console.log(`Status: ${gen.status}`);
  } while (gen.status !== "success");

  console.log(`Agent ready: ${gen.agent_name}`);
  console.log(`Summary: ${gen.summary}`);
  ```

  ```bash cURL theme={"system"}
  # 1. Generate the agent
  curl -X POST 'https://sdk.nimbleway.com/v1/agents/generations' \
  --header 'Authorization: Bearer YOUR-API-KEY' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "prompt": "Extract product name, price, rating, stock status, and first 5 reviews with rating and text",
      "url": "https://example-niche-store.com/products/widget-pro"
  }'

  # 2. Poll until complete (replace gen_abc123 with the returned id)
  curl 'https://sdk.nimbleway.com/v1/agents/generations/gen_abc123' \
  --header 'Authorization: Bearer YOUR-API-KEY'
  ```

  ```bash CLI theme={"system"}
  # 1. Generate the agent
  nimble agent generate \
    --agent-name niche_store_pdp \
    --prompt "Extract product name, price, rating, stock status, and first 5 reviews with rating and text" \
    --url "https://example-niche-store.com/products/widget-pro"

  # 2. Poll until complete (replace gen_abc123 with the returned id)
  nimble agent get-generation --generation-id gen_abc123
  ```
</CodeGroup>

### Generate Response

```json theme={"system"}
{
  "id": "gen_abc123",
  "status": "queued",
  "agent_name": "niche_store_pdp"
}
```

| Field        | Type   | Description                                            |
| ------------ | ------ | ------------------------------------------------------ |
| `id`         | string | Unique generation ID. Use this to poll for completion. |
| `status`     | string | `queued`, `in_progress`, `success`, or `failed`.       |
| `agent_name` | string | The agent name provided in the request.                |

### Poll Response

`GET /v1/agents/generations/{generation_id}`

Generation is async and typically takes 3-7 minutes for new agents, or as fast as 1 minute for refinements. Poll with the `generation_id` (path parameter) until `status` is `success`. Review the results to decide whether to iterate or use the agent.

**Response:**

```json theme={"system"}
{
  "id": "gen_abc123",
  "status": "success",
  "agent_name": "niche_store_pdp",
  "generated_version_id": "ver_xyz789",
  "summary": "Extracts product name, price, rating, stock status, and customer reviews from product detail pages."
}
```

| Field                  | Type   | Description                                                                                      |
| ---------------------- | ------ | ------------------------------------------------------------------------------------------------ |
| `id`                   | string | The generation ID.                                                                               |
| `status`               | string | `queued`, `in_progress`, `success`, or `failed`.                                                 |
| `agent_name`           | string | The agent name.                                                                                  |
| `generated_version_id` | string | Version ID of the generated agent. Present when `success`. Automatically published.              |
| `summary`              | string | What the generated agent does. Present when `success`. Review to decide if refinement is needed. |

### Iterate (Optional)

`POST /v1/agents/generations`

If the generation results are not satisfactory, refine the agent by calling the same generate endpoint with `from_agent`. A new version is created with the new prompt applied on top, preserving what already works.

<AccordionGroup>
  <Accordion icon="rotate" title="from_agent - Required">
    <ParamField path="from_agent" type="string" required>
      Name of the agent to refine. Pass the agent name from the original
      generation.
    </ParamField>
  </Accordion>

  <Accordion icon="message" title="prompt - Required">
    <ParamField path="prompt" type="string" required>
      Describe what to change. For example: "Add a discount\_percentage field" or
      "Fix the reviews array to include the reviewer name."
    </ParamField>
  </Accordion>
</AccordionGroup>

<CodeGroup>
  ```python Python theme={"system"}
  result = nimble.agent.generate(
      prompt="Add a discount_percentage field. Fix the reviews array to include the reviewer name.",
      from_agent="niche_store_pdp"
  )
  ```

  ```javascript Node theme={"system"}
  const result = await nimble.agent.generate({
    prompt:
      "Add a discount_percentage field. Fix the reviews array to include the reviewer name.",
    fromAgent: "niche_store_pdp",
  });
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/agents/generations' \
  --header 'Authorization: Bearer YOUR-API-KEY' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "prompt": "Add a discount_percentage field. Fix the reviews array to include the reviewer name.",
      "from_agent": "niche_store_pdp"
  }'
  ```

  ```bash CLI theme={"system"}
  nimble agent generate \
    --from-agent niche_store_pdp \
    --prompt "Add a discount_percentage field. Fix the reviews array to include the reviewer name."
  ```
</CodeGroup>

Response is the same as [Generate](#generate). Poll the new generation ID until complete, then decide to iterate again or use the agent.

Each generated version is automatically published and available via `POST /v1/agents/run` with `"agent": "niche_store_pdp"` just like any pre-built agent. See the [Agents API docs](/nimble-sdk/agentic/agents) for full usage.

## Tips for Better Agents

**Be specific about data types.** Instead of "get the price", say "extract the current price as a number without currency symbols."

**Describe the structure you want.** Instead of "get reviews", say "extract reviews as an array with rating (1-5) and review text for each."

**Mention edge cases.** "Extract the sale price if available, otherwise use the regular price."

**Test with multiple pages.** Try your agent on different pages of the same type to ensure it works consistently.

### Agent Naming

* Use lowercase with underscores: `my_store_pdp`
* Be descriptive: `competitor_pricing` not `agent1`
* Include the site or type: `niche_store_reviews`

## Good to Know

* **Pre-built agents are auto-maintained** by Nimble 24/7. Custom agents can be updated anytime via [Nimble Studio](/nimble-sdk/agentic/studio), API, CLI, or SDK if the target site changes.
* **Each agent handles one page type.** For multi-page workflows, create separate agents (e.g., one for search results, one for product details).
* **Custom agents are private** to your account but shared within your team.

## FAQ

<AccordionGroup>
  <Accordion title="Can I use custom agents in production?">
    Yes. Custom agents are designed for production use. They use the same
    reliable infrastructure as public agents with predictable costs and high
    throughput.
  </Accordion>

  <Accordion title="What happens if the target website changes?">
    Unlike public agents (maintained by Nimble 24/7), custom agents don't
    auto-heal. If extractions start failing or returning incorrect data, update
    the agent via [Nimble Studio](/nimble-sdk/agentic/studio), API, CLI, or SDK
    using the `from_agent` refinement flow.
  </Accordion>

  <Accordion title="How long does generation take?">
    Generation typically takes 3-7 minutes for new agents, or as fast as 1
    minute for refinements. Poll the generation ID until the status is
    `success`.
  </Accordion>

  <Accordion title="What is the difference between generate and refine (from_agent)?">
    `generate` creates a new agent from scratch. Passing `from_agent` refines an
    existing agent by creating a new version with your prompt applied on top,
    preserving what already works while fixing what doesn't.
  </Accordion>

  <Accordion title="Can I automate agent creation in CI/CD?">
    Yes. The full generate/poll/iterate flow is available via REST API, making
    it straightforward to integrate into CI/CD pipelines.
  </Accordion>

  <Accordion title="How many custom agents can I create?">
    There is no limit on the number of custom agents you can create.
  </Accordion>

  <Accordion title="Can I share custom agents with my team?">
    Yes. Custom agents are available to all members of your Nimble account. They
    are private to your organization but shared within your team.
  </Accordion>
</AccordionGroup>

## Next Steps

<CardGroup cols={2}>
  <Card icon="browser" href="https://online.nimbleway.com/workflow-builder" title="Nimble Studio">
    Create agents visually in the browser
  </Card>

  <Card icon="hammer" href="/integrations/agent-skills/web-tools-skills/nimble-agent-builder" title="Agent Builder Skill">
    AI-assisted creation in Claude Code or Cursor
  </Card>

  <Card icon="grid" href="/nimble-sdk/agentic/agent-gallery" title="Agent Gallery">
    Browse pre-built agents for popular sites
  </Card>

  <Card icon="book-open" href="/api-reference/introduction" title="API Reference">
    Full API docs for agents endpoints
  </Card>
</CardGroup>
