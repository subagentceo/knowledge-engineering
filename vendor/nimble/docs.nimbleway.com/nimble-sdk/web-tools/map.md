> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Map

> Fast URL discovery and site structure mapping

Nimble **Map** is like having a bird's-eye view of any website. Give it a URL, and it automatically discovers and lists related URLs on that site, including site-map, with helpful context like titles and descriptions.

This context enables AI agents or Developers to intelligently decide which pages to scrape, making data collection smarter and more efficient.

## Quick Start

### Example Request

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.map(url="https://www.nimbleway.com")

  print(f"Found {len(result.links)} URLs")
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.map({
    url: "https://www.nimbleway.com",
  });

  console.log(`Found ${result.links.length} URLs`);
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/map' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://www.nimbleway.com"
  }'
  ```
</CodeGroup>

### Example Response

```json theme={"system"}
{
  "task_id": "123e4567-e89b-12d3-a456-426614174000",
  "success": true,
  "links": [
    {
      "url": "https://www.nimbleway.com",
      "title": "Nimble - Web Data Platform",
      "description": "AI-powered web data collection and extraction platform"
    },
    {
      "url": "https://docs.nimbleway.com"
    },
    {
      "url": "https://www.nimbleway.com/blog",
      "title": "Nimble Blog"
    },
    {
      "url": "https://www.nimbleway.com/pricing",
      "title": "Pricing",
      "description": "Nimble pricing plans and features"
    }
  ]
}
```

## How it works

<Steps>
  <Step title="You provide a starting URL">
    Give Map the URL of the website you want to explore
  </Step>

  <Step title="Map discovers URLs">
    * Reads the website's sitemap (if available) - Analyzes page links and
      navigation - Identifies all discoverable URLs on the site
  </Step>

  <Step title="Collects metadata for each URL">
    * Extracts page titles from sitemap or meta tags - Gathers descriptions when
      available - Associates context with each discovered URL
  </Step>

  <Step title="Returns structured URL list">
    Get a complete list of URLs with titles and descriptions ready for AI
    reasoning or crawling
  </Step>
</Steps>

## Parameters

Supported input parameters:

<AccordionGroup>
  <Accordion title="url - Required" icon="link">
    <ParamField path="url" type="string" required>
      The website URL you want to map. This is where the mapping process starts.

      **Example:** `https://www.nimbleway.com`
    </ParamField>
  </Accordion>

  <Accordion title="sitemap" icon="sitemap">
    <ParamField path="sitemap" default="include" type="string">
      Choose how to use the website's sitemap for discovering URLs.

      **Options:**

      * `include` (default) - Get URLs from both the sitemap and site iteself
      * `only` - Only use URLs listed in the sitemap
      * `skip` - Ignore the sitemap URLs
    </ParamField>
  </Accordion>

  <Accordion title="domain_filter" icon="filter">
    <ParamField path="domain_filter" default="all" type="string">
      Control whether to stay on one domain or include related domains.

      **Options:**

      * `domain` - Only get URLs from the exact domain you specified
      * `subdomain` - Include URLs from  subdomains
      * `all` (default) - Include URLs from any domain that's linked
    </ParamField>
  </Accordion>

  <Accordion title="limit" icon="hashtag">
    <ParamField path="limit" default="5000" type="integer">
      Maximum number of URLs to return.

      * Min: :  

        `1`
      * Max:  

        `100000`
      * Default:

        `100`
    </ParamField>
  </Accordion>

  <Accordion title="country" icon="globe">
    <ParamField path="country" default="ALL" type="string">
      Map the site as if you're visiting from a specific country. Useful for sites that show different content based on location.

      Use ISO Alpha-2 country codes like `US`, `GB`, `FR`, `DE`, `CA`, `JP`, etc. Use `ALL` for random country selection.
    </ParamField>
  </Accordion>

  <Accordion title="locale" icon="language">
    <ParamField path="locale" type="string">
      Set the language preference for the mapping. Use LCID standard\
      Helpful for multilingual sites.

      **Locale Examples:**

      * `en-US` - English (United States)
      * `en-GB` - English (United Kingdom)
      * `fr-FR` - French (France)
      * `de-DE` - German (Germany)
    </ParamField>
  </Accordion>
</AccordionGroup>

## Usage

### Basic map

Map a website using default settings:

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.map(url="https://www.nimbleway.com")

  print(f"Found {len(result.links)} URLs")
  for link in result.links:
      print(link.url)
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.map({
    url: "https://www.nimbleway.com",
  });

  console.log(`Found ${result.links.length} URLs`);
  result.links.forEach((link) => console.log(link.url));
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/map' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://www.nimbleway.com"
  }'
  ```
</CodeGroup>

### Sitemap-only mapping

Fast mapping using only the sitemap:

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.map(url="https://docs.nimbleway.com", sitemap="only")

  print(f"Found {len(result.links)} URLs in sitemap")
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.map({
    url: "https://docs.nimbleway.com",
    sitemap: "only",
  });

  console.log(`Found ${result.links.length} URLs in sitemap`);
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/map' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://docs.nimbleway.com",
      "sitemap": "only"
  }'
  ```
</CodeGroup>

### Skip sitemap

Map without using sitemap, discovering URLs through page crawling:

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.map(url="https://www.bestbuy.com", sitemap="skip")

  print(f"Found {len(result.links)} URLs")
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.map({
    url: "https://www.bestbuy.com",
    sitemap: "skip",
  });

  console.log(result);
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/map' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://www.bestbuy.com",
      "sitemap": "skip"
  }'
  ```
</CodeGroup>

### Include subdomains

Map URLs across all subdomains:

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.map(url="https://www.nimbleway.com", domain_filter="subdomain")

  print(f"Found {len(result.links)} URLs including subdomains")
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.map({
    url: "https://www.nimbleway.com",
    domain_filter: "subdomain",
  });

  console.log(`Found ${result.links.length} URLs including subdomains`);
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/map' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://www.nimbleway.com",
      "domain_filter": "subdomain"
  }'
  ```
</CodeGroup>

### Exact domain

Restrict mapping to exact domain only:

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.map(url="https://docs.nimbleway.com", domain_filter="domain")

  print(f"Found {len(result.links)} URLs on exact domain")
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.map({
    url: "https://docs.nimbleway.com",
    domain_filter: "domain",
  });

  console.log(`Found ${result.links.length} URLs on exact domain`);
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/map' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://docs.nimbleway.com",
      "domain_filter": "domain"
  }'
  ```
</CodeGroup>

### Geo-targeted mapping

Map with specific country and locale settings:

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.map(url="https://www.nike.com", country="GB", locale="en-GB")

  print(f"Found {len(result.links)} URLs from GB location")
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.map({
    url: "https://www.nike.com",
    country: "GB",
    locale: "en-GB",
  });

  console.log(`Found ${result.links.length} URLs from GB location`);
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/map' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://www.nike.com",
      "country": "GB",
      "locale": "en-GB"
  }'
  ```
</CodeGroup>

### Combined parameters

Map with multiple parameters for precise control:

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.map(
      url="https://www.bestbuy.com",
      sitemap="include",
      domain_filter="subdomain",
      limit=500
  )

  print(f"Found {len(result.links)} URLs across subdomains")
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.map({
    url: "https://www.bestbuy.com",
    sitemap: "include",
    domain_filter: "subdomain",
    limit: 500,
  });

  console.log(`Found ${result.links.length} URLs across subdomains`);
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/map' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://www.bestbuy.com",
      "sitemap": "include",
      "domain_filter": "subdomain",
      "limit": 500
  }'
  ```
</CodeGroup>

## Response Fields

When you use **Map**, you receive:

* **URLs with context** - Each URL includes optional title and description for AI reasoning
* **Complete discovery** - Every discoverable page on the site
* **Fast results** - Most sites mapped in seconds
* **Smart filtering** - Subdomain control and comprehensive sitemap + link discovery

<Accordion title="Example Response" icon="">
  ```json theme={"system"}
  {
    "task_id": "123e4567-e89b-12d3-a456-426614174000",
    "success": true,
    "links": [
      {
        "url": "https://www.nimbleway.com",
        "title": "Nimble - Web Data Platform",
        "description": "AI-powered web data collection and extraction platform"
      },
      {
        "url": "https://docs.nimbleway.com"
      },
      {
        "url": "https://www.nimbleway.com/blog",
        "title": "Nimble Blog"
      },
      {
        "url": "https://www.nimbleway.com/pricing",
        "title": "Pricing",
        "description": "Nimble pricing plans and features"
      }
    ]
  }
  ```
</Accordion>

| Field                 | Type    | Description                        |
| --------------------- | ------- | ---------------------------------- |
| `task_id`             | string  | Unique identifier for the map task |
| `success`             | boolean | Whether the request succeeded      |
| `links`               | array   | Discovered URLs                    |
| `links[].url`         | string  | The discovered URL                 |
| `links[].title`       | string  | Page title (if available)          |
| `links[].description` | string  | Page description (if available)    |

## Use cases

<CardGroup cols={2}>
  <Card title="AI Agent Planning" icon="robot">
    Give AI agents URL context (titles, descriptions) to intelligently decide
    which pages to scrape
  </Card>

  <Card title="Pre-crawl Planning" icon="route">
    Discover all URLs before crawling to plan budget and prioritize important
    pages
  </Card>

  <Card title="Site Audits" icon="clipboard-check">
    Quick inventory of all pages for SEO audits, content analysis, or quality
    checks
  </Card>

  <Card title="Competitive Research" icon="magnifying-glass-chart">
    See competitor site structure - product pages, blog posts, landing pages
  </Card>
</CardGroup>

### Real-world examples

<AccordionGroup>
  <Accordion title="AI agent intelligent scraping" icon="robot">
    **Scenario:** Your AI agent needs to extract product data from an e-commerce site but should only scrape relevant product pages.

    **How Map helps:**

    * Discovers all URLs with titles and descriptions
    * AI agent reads the context (title: "Laptop Pro 15", description: "High-performance laptop...")
    * Agent intelligently decides which URLs contain product data vs navigation/legal pages
    * Only scrapes relevant product URLs, saving costs and time

    **Result:** AI-powered smart scraping that automatically filters out irrelevant pages based on URL context.
  </Accordion>

  <Accordion title="E-commerce competitor analysis" icon="store">
    **Scenario:** You want to understand a competitor's product catalog structure.

    **How Map helps:**

    * Discover all product category pages
    * Find hidden product pages not linked from the homepage
    * Identify promotional landing pages
    * Map out the entire site structure before detailed scraping

    **Result:** Complete visibility into their online catalog without manual browsing.
  </Accordion>

  <Accordion title="Content research and monitoring" icon="newspaper">
    **Scenario:** You're tracking content strategy across multiple news sites.

    **How Map helps:**

    * Get a complete list of articles and sections
    * Discover new content categories as they're added
    * Identify archive structures and content organization
    * Plan targeted crawling for specific content types

    **Result:** Systematic content discovery at scale.
  </Accordion>

  <Accordion title="SEO and site structure analysis" icon="chart-line">
    **Scenario:** Analyzing website architecture for SEO optimization.

    **How Map helps:**

    * Visualize complete site hierarchy
    * Identify orphaned pages (pages not well-linked)
    * Discover deep pages buried in site structure
    * Understand internal linking patterns

    **Result:** Comprehensive site architecture insights in seconds.
  </Accordion>

  <Accordion title="Pre-crawl planning" icon="route">
    **Scenario:** You need to scrape data from a large website efficiently.

    **How Map helps:**

    * Get complete URL inventory before crawling
    * Filter for specific sections or page types
    * Plan crawl budget and prioritization
    * Avoid wasting resources on irrelevant pages

    **Result:** Smarter, more efficient data collection.
  </Accordion>
</AccordionGroup>

## Map vs Crawl

| Need                              | Use                            |
| --------------------------------- | ------------------------------ |
| Quick URL discovery               | **Map** - completes in seconds |
| URL list with titles/descriptions | **Map**                        |
| Deep link following               | **Crawl**                      |
| Complex filtering patterns        | **Crawl**                      |
| Extract content from pages        | **Crawl**                      |

<Tip>
  **Map is the starting point** - Use it to discover URLs with context, then use
  Crawl or Extract for the actual data collection.
</Tip>

## Next steps

<CardGroup cols={2}>
  <Card icon="code" href="/api-reference/map/map" title="API Reference">
    Explore endpoints, request parameters, and response schemas for the Map API
  </Card>
</CardGroup>
