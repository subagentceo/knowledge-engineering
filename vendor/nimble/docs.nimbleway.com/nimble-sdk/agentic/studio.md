> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Nimble Studio

> Turn any website into a structured data API. Describe what you need in plain English

## Overview

**Nimble Studio** turns any website into a structured data API. Describe what data you need in plain English, and Nimble builds a production-ready Web Search Agent that delivers structured results at scale.

Any website. Any data. No coding, no CSS selectors, no scraping expertise required.

<CardGroup cols={2}>
  <Card icon="wand-magic-sparkles" href="https://online.nimbleway.com/workflow-builder" title="Launch Nimble Studio">
    Create an agent for any website — see structured results in minutes
  </Card>

  <Card icon="plug" href="/integrations/agent-skills/plugin-installation" title="Install Plugin">
    Prefer your IDE? Use Nimble in Claude Code or Cursor — your AI assistant
    creates agents for you
  </Card>
</CardGroup>

## Why use Nimble Studio?

<CardGroup cols={2}>
  <Card icon="globe" title="Any Website">
    Create agents for any website — not limited to what's in the gallery
  </Card>

  <Card icon="message" title="No Coding Required">
    Describe what you need in plain English — Nimble handles the rest
  </Card>

  <Card icon="rocket" title="Production-Ready at Scale">
    Agents are optimized for high-volume extraction with predictable unit
    economics
  </Card>

  <Card icon="code" title="Instant API Access">
    Every agent works through the same simple API — use it immediately
  </Card>
</CardGroup>

## How it works

<Steps>
  <Step title="Open Nimble Studio">
    Go to the [Agentic Studio](https://online.nimbleway.com/workflow-builder) in
    the Nimble Platform
  </Step>

  <Step title="Provide a URL and describe your needs">
    Enter the website URL you want to extract from and describe what data you
    need in plain English. For example: "Extract product name, price, rating,
    and all review comments"
  </Step>

  <Step title="AI creates your agent">
    Our AI analyzes the page structure and builds an extraction agent based on
    your description. It identifies the right selectors and data patterns
    automatically.
  </Step>

  <Step title="Review and test">
    Preview the extracted data to make sure it matches your needs. Refine your
    description if needed - the AI will adjust the agent.
  </Step>

  <Step title="Save and use via API">
    Save your agent with a custom name. It's now available via the Agent API -
    just like public Agent, but private to your account.
  </Step>
</Steps>

## Custom vs. Public Agent

| Feature      | Public Agent                      | Custom Agent              |
| ------------ | --------------------------------- | ------------------------- |
| Maintenance  | **Maintained by Nimble** 24/7     | Maintained by you         |
| Setup        | Zero - just use agent name        | Create in Nimble Studio   |
| Availability | Popular sites                     | Any website               |
| Auto-healing | Yes - we update when sites change | No - you update if needed |
| API usage    | Same Agent API                    | Same Agent API            |
| Visibility   | Available to all users            | Private to your account   |

<Tip>
  Check the [Agent Gallery](/nimble-sdk/agentic/agent-gallery) first — a
  pre-built agent may already exist for your target site. Pre-built agents are
  auto-maintained by Nimble 24/7.
</Tip>

## Example: Creating a custom agent

Let's say you need to extract data from a niche e-commerce site that's not in our public gallery.

**Step 1: Enter the URL**

```
https://example-niche-store.com/products/widget-pro
```

**Step 2: Describe what you need**

```
Extract the product name, current price, original price (if on sale),
stock status, all product specifications as key-value pairs,
and the first 5 customer reviews with rating and text.
```

**Step 3: Review the extracted data**

```json theme={"system"}
{
  "product_name": "Widget Pro 3000",
  "current_price": 49.99,
  "original_price": 79.99,
  "stock_status": "In Stock",
  "specifications": [
    { "key": "Dimensions", "value": "10 x 5 x 3 inches" },
    { "key": "Weight", "value": "1.2 lbs" },
    { "key": "Material", "value": "Aluminum" }
  ],
  "reviews": [
    { "rating": 5, "text": "Excellent product, exactly what I needed!" },
    { "rating": 4, "text": "Good quality, fast shipping." }
  ]
}
```

**`Step 4: Save as niche_store_pdp`**

**Step 5: Use via API**

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  # Use your custom agent just like a public one
  result = nimble.agent.run(
      agent="niche_store_pdp",  # Your custom agent name
      params={
          "url": "https://example-niche-store.com/products/another-widget"
      }
  )

  print(f"Product: {result['parsing']['parsed']['product_name']}")
  print(f"Price: ${result['parsing']['parsed']['current_price']}")
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  // Use your custom agent just like a public one
  const result = await nimble.agent.run({
    agent: "niche_store_pdp", // Your custom agent name
    params: {
      url: "https://example-niche-store.com/products/another-widget",
    },
  });

  console.log(`Product: ${result.parsing.parsed.product_name}`);
  console.log(`Price: $${result.parsing.parsed.current_price}`);
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/agents/run' \
  --header 'Authorization: Bearer YOUR-API-KEY' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "agent": "niche_store_pdp",
      "params": {
          "url": "https://example-niche-store.com/products/another-widget"
      }
  }'
  ```
</CodeGroup>

## Tips for better agents

**Be specific about data types** Instead of "get the price", say "extract the current price as a number without currency symbols"

**Describe the structure you want** Instead of "get reviews", say "extract reviews as an array with rating (1-5) and review text for each"

**Mention edge cases** "Extract the sale price if available, otherwise use the regular price"

**Test with multiple pages** Try your agent on different product pages to ensure it works consistently

### Agent naming

* Use lowercase with underscores: `my_store_pdp`
* Be descriptive: `competitor_pricing` not `agent1`
* Include the site or type: `niche_store_reviews`

## Good to know

* **Pre-built agents are auto-maintained** by Nimble 24/7. Custom agents can be updated anytime in Nimble Studio if the target site changes.
* **Each agent handles one page type.** For multi-page workflows, create separate agents (e.g., one for search results, one for product details).

## FAQ

<AccordionGroup>
  <Accordion title="Can I use custom Agent in production?">
    Yes! Custom Agent are designed for production use. They use the same
    reliable infrastructure as public Agent with predictable costs and high
    throughput.
  </Accordion>

  <Accordion title="What happens if the target website changes?">
    Unlike public Agent (**maintained by Nimble** 24/7), custom Agent don't
    auto-heal. If your extractions start failing or returning incorrect data,
    you'll need to update your agent in the Nimble Studio.
  </Accordion>

  <Accordion title="How many custom Agent can I create?">
    There's no limit on the number of custom Agent you can create. Create as
    many as you need for your use cases.
  </Accordion>

  <Accordion title="Can I share custom Agent with my team?">
    Yes, custom Agent are available to all members of your Nimble account.
    They're private to your organization but shared within your team.
  </Accordion>
</AccordionGroup>

## Next steps

<CardGroup cols={2}>
  <Card icon="wand-magic-sparkles" href="https://online.nimbleway.com/workflow-builder" title="Launch Nimble Studio">
    Create an agent for any website right now
  </Card>

  <Card icon="plug" href="/integrations/agent-skills/plugin-installation" title="Install Plugin">
    Use Nimble in Claude Code or Cursor
  </Card>

  <Card icon="grid" href="/nimble-sdk/agentic/agent-gallery" title="Agent Gallery">
    Browse pre-built agents for popular sites
  </Card>

  <Card icon="phone" href="https://nimbleway.com/contact-general/" title="Talk to Sales">
    Need enterprise scale or managed delivery?
  </Card>
</CardGroup>
