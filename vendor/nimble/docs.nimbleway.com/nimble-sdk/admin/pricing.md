> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Pricing

> Flexible usage-based pricing for Nimble SDK

Nimble offers two ways to access the platform: **API pricing** for direct, per-request access, and **Data Services plans** for managed, production-scale workloads.

<Tip>
  **Free Trial:** Get started with 5,000 free web pages. No credit card
  required. [Start Building Now](https://online.nimbleway.com/signup)
</Tip>

***

## API Pricing

Use any Nimble API without a commitment. Only successful requests are charged.

### Extract, Crawl & Map APIs

Priced per 1,000 URLs based on the rendering driver:

* **Map** always uses the `VX6` driver.
* **Crawl** is billed as the sum of all `Extract` requests within the crawl.

| Extract Driver | Description                 | PAYG Price       |
| -------------- | --------------------------- | ---------------- |
| `VX6`          | Standard — no JS rendering  | \$0.90 / 1K URLs |
| `VX8`          | JS rendering                | \$1.30 / 1K URLs |
| `VX10`         | JS rendering + Stealth Mode | \$1.45 / 1K URLs |

<Warning>
  Nimble selects the optimal driver automatically, selecting driver manually may
  cause blocks or empty responses
</Warning>

### Agent API

Priced per 1,000 URLs based on the rendering driver:

#### Community & Custom Agents

Web Search Agents (WSA) you create in Studio or from the community gallery:

| Agent Driver | Description                 | PAYG Price       |
| ------------ | --------------------------- | ---------------- |
| `WSA-6`      | Standard — no JS rendering  | \$0.99 / 1K URLs |
| `WSA-8`      | JS rendering                | \$1.45 / 1K URLs |
| `WSA-10`     | JS rendering + Stealth Mode | \$1.60 / 1K URLs |

#### Nimble-Maintained Agents

Pre-built Web Search Agents (WSA), <u>maintained by Nimble</u>:

| Agent Driver | Description                 | PAYG Price       |
| ------------ | --------------------------- | ---------------- |
| `WSA-6M`     | Standard — no JS rendering  | \$1.08 / 1K URLs |
| `WSA-8M`     | JS rendering                | \$1.55 / 1K URLs |
| `WSA-10M`    | JS rendering + Stealth Mode | \$1.75 / 1K URLs |

<Warning>
  Nimble selects the optimal driver automatically, selecting driver manually may
  cause blocks or empty responses
</Warning>

### Search API

| Operation             | PAYG Price                                         |
| --------------------- | -------------------------------------------------- |
| Search                | \$1.00 / 1K inputs (up to 100 results per request) |
| Answer (AI-generated) | \$4.00 / 1K inputs                                 |

<Note>
  Deep Mode search also includes all `Extract` and/or `Agent` API costs. Total
  cost varies by configuration.
</Note>

### Media Download API

Priced per GB of data downloaded. Only successful downloads are charged.

| Driver      | Description             | PAYG Price  |
| ----------- | ----------------------- | ----------- |
| `Media-VX6` | Standard media download | \$2.00 / GB |

### Proxy API

| Product           | PAYG Price  |
| ----------------- | ----------- |
| Residential Proxy | \$5.30 / GB |

### Custom Rates

Custom API pricing for high-scale workloads. Includes:

* **Volume discounts:** lower per-request rates at scale
* **Multi-year pricing protection:** rate locks and long-term discounts
* **Product bundling discounts:** combine APIs for better rates
* **Custom concurrent sessions:** beyond standard limits
* **Dedicated support** and SLA options

<Callout icon="phone" color="#c516f9">
  To discuss custom API pricing for your use case, please [Contact
  Sales](https://nimbleway.com/contact-general/)
</Callout>

***

## Data Services Plans

Managed plans for teams running agents and data pipelines at scale. Billed annually.

|                       | **Startup** | **Scale**  | **Professional** | **Enterprise** |
| --------------------- | ----------- | ---------- | ---------------- | -------------- |
| **Monthly Price**     | \$2,500/mo  | \$7,000/mo | \$15,000/mo      | Custom         |
| **Concurrent Agents** | 5           | 10         | 20               | Unlimited      |
| **Credits**           | 350K pages  | 1.2M pages | 3M pages         | Custom         |
| **Storage**           | 7 days      | 30 days    | 90 days          | Custom         |

<AccordionGroup>
  <Accordion icon="seedling" title="Startup — $2,500/month">
    * 350,000 web page credits
    * 5 concurrent agents
    * 7 days data storage
    * Custom agent ETL
    * MCP integration
  </Accordion>

  <Accordion icon="chart-line" title="Scale — $7,000/month">
    * 1,200,000 web page credits
    * 10 concurrent agents
    * 30 days data storage
    * Custom agent ETL
    * MCP integration
    * Localized Agents
  </Accordion>

  <Accordion icon="briefcase" title="Professional — $15,000/month">
    * 3,000,000 web page credits
    * 20 concurrent agents
    * 90 days data storage
    * Custom agent ETL
    * MCP integration
    * Localized Agents
    * Custom workflow
  </Accordion>

  <Accordion icon="building" title="Enterprise — Custom">
    Everything in Professional, plus:

    * Unlimited concurrent Agents
    * Advanced security features
    * Custom data storage
    * Advanced SLAs

    [Contact Sales](https://nimbleway.com/contact-general/) to discuss your requirements.
  </Accordion>
</AccordionGroup>

***

## Understanding Drivers

Drivers are tiers of complexity --> You only pay for the capability your target site actually requires.

Nimble selects the optimal driver automatically, so simple pages use the cheapest tier and complex, protected pages escalate only when needed.

You can override the driver manually on the `/extract`, `/crawl`, and `/agent` APIs using the `driver` parameter.

<AccordionGroup>
  <Accordion icon="bolt" title="VX6 --> Standard">
    No JavaScript execution. Fast and lightweight.

    **Use when:** The page is static HTML: articles, docs, APIs, JSON endpoints.

    **Not suitable for:** JS-rendered pages, browser actions, network capture.
  </Accordion>

  <Accordion icon="code" title="VX8 --> JS Rendering">
    Full JavaScript execution for dynamic content.

    **Use when:** The page requires JavaScript to load: SPAs, lazy-loaded content, browser actions, network capture.
  </Accordion>

  <Accordion icon="shield" title="VX10 --> Stealth Mode">
    Full JS rendering with advanced anti-bot fingerprinting and evasion.

    **Use when:** The site actively blocks scrapers: Cloudflare, PerimeterX, or other bot protection layers.
  </Accordion>
</AccordionGroup>

<Note>
  Using `VX6`, `VX8`, or `VX10` on an **Agent** request is automatically mapped to the equivalent agent driver.

  <Accordion title="Agent Driver Aliases">
    | Alias  | Community & Custom | Nimble-Maintained |
    | ------ | ------------------ | ----------------- |
    | `VX6`  | `WSA-6`            | `WSA-6M`          |
    | `VX8`  | `WSA-8`            | `WSA-8M`          |
    | `VX10` | `WSA-10`           | `WSA-10M`         |
  </Accordion>
</Note>

***

## Billing FAQ

<AccordionGroup>
  <Accordion icon="calendar" title="When am I charged?">
    Pay-as-you-go usage is billed monthly by credit card. Data Services plans
    are billed annually. Only successful requests count toward your usage.
  </Accordion>

  <Accordion icon="circle-exclamation" title="What happens if I exceed my plan credits?">
    Additional usage is billed at pay-as-you-go rates on your next invoice.
  </Accordion>

  <Accordion icon="arrows-up-down" title="Can I upgrade or downgrade?">
    Yes. Plan changes take effect on your next billing cycle.
  </Accordion>

  <Accordion icon="rotate" title="Do unused credits roll over?">
    Credits roll over within your billing cycle but expire at the end of each
    month.
  </Accordion>

  <Accordion icon="handshake" title="How do I get custom pricing?">
    [Contact our sales team](https://nimbleway.com/contact-general/) for custom
    rates based on your volume and requirements.
  </Accordion>
</AccordionGroup>

***

## Get Started

<CardGroup cols={2}>
  <Card icon="rocket" href="https://online.nimbleway.com/signup" title="Start Free Trial">
    Get 5,000 free pages to test the platform
  </Card>

  <Card icon="phone" href="https://nimbleway.com/contact-general/" title="Contact Sales">
    Discuss Data Services plans or custom pricing
  </Card>
</CardGroup>
