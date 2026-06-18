> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Extract

> Get clean, structured data from any webpage with full control

<Note>
  **Looking for the easiest way to get web data?** [Web Search Agents](/nimble-sdk/agentic/agents) handle everything automatically — no selectors needed. [Try Nimble Studio](https://online.nimbleway.com/workflow-builder) to create an agent for any website in seconds.

  Extract is for developers who need full control over CSS selectors, browser actions, and page interactions.
</Note>

Nimble **Extract** retrieves and parses content from any URL, giving you clean structured data instead of raw HTML.

Point it at a webpage, specify what you want, and get back exactly the information you need - with full JavaScript rendering and anti-bot protection.

## Quick Start

### Example Request

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.extract(
      url= "https://www.google.com/search?q=nimble",
      render= True
  )

  print(result.data.html)
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.extract({
    url: "https://www.google.com/search?q=nimble",
    render: true,
  });

  console.log(result.data.html);
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://www.google.com/search?q=nimble",
      "render": true
  }'
  ```
</CodeGroup>

### Example Response

```json theme={"system"}
{
  "url": "https://www.example.com",
  "task_id": "b1fa7943-cba5-4ec2-a88c-4d2d6799c794",
  "status": "success",
  "data": {
    "html": "<!DOCTYPE html><html>...</html>",
    "headers": {}
  },
  "metadata": {
    "query_time": "2026-02-08T22:00:36.132Z",
    "query_duration": 1877,
    "driver": "vx8"
  },
  "status_code": 200
}
```

## How it works

<Steps>
  <Step title="You provide a URL and options">
    Give Extract the webpage URL and configure rendering, parsing, or browser
    actions
  </Step>

  <Step title="Extract fetches and renders the page">
    * Loads the webpage with optional JavaScript rendering if enabled - Handles
      cookies, headers, and authentication - Bypasses anti-bot protections with
      stealth mode - Renders dynamic content completely
  </Step>

  <Step title="Extracts your specified data">
    * Returns content in your chosen format (HTML, markdown) - Parses structured
      data using your CSS selectors (if parsing schema provided) - Captures
      network requests if configured
  </Step>

  <Step title="Returns structured results">
    Get clean JSON with your extracted data, ready to use in your application
  </Step>
</Steps>

## Parameters

Supported input parameters:

<AccordionGroup>
  <Accordion title="url - Required" icon="link">
    <ParamField path="url" type="string" required>
      The webpage URL to extract content from.

      **Example:** `https://www.example.com/product`
    </ParamField>
  </Accordion>

  <Accordion title="render" icon="browser">
    <ParamField path="render" default="false" type="boolean">
      Enable JavaScript rendering for dynamic content.

      Set to `true` for sites built with React, Vue, Angular, or other JavaScript frameworks.
    </ParamField>
  </Accordion>

  <Accordion title="driver" icon="gear">
    <ParamField path="driver" default="vx6" type="string">
      The extraction engine to use.

      **Options:**

      * `vx6` - Fast HTTP requests (no JavaScript)
      * `vx8` - Headless browser with JavaScript
      * `vx8-pro` - Headful browser with JavaScript
      * `vx10` - Stealth headless browser
      * `vx10-pro` - Stealth headful browser
    </ParamField>
  </Accordion>

  <Accordion title="formats" icon="file-lines">
    <ParamField path="formats" type="array">
      Output formats to return.

      **Options:**

      * `html` - Raw HTML content
      * `markdown` - Converted markdown format
      * `screenshot` - Full-page screenshot as base64-encoded PNG
      * `headers` - HTTP response headers returned by the server (`data.headers`)

      **Example:** `["html", "markdown"]`
    </ParamField>
  </Accordion>

  <Accordion title="country" icon="globe">
    <ParamField path="country" default="ALL" type="string">
      Extract content as if visiting from a specific country. Use ISO Alpha-2 codes.

      **Examples:** `US`, `UK`, `DE`, `FR`
    </ParamField>
  </Accordion>

  <Accordion title="state" icon="map-location-dot">
    <ParamField path="state" type="string">
      For US locations, you can specify a specific state. Only works in US or CA.

      Use ISO Alpha-2 codes like  `NY`, `FL`, etc.
    </ParamField>

    **Example:**

    ```json theme={"system"}
    "state": "CA"
    ```
  </Accordion>

  <Accordion title="city" icon="city">
    <ParamField path="city" type="string">
      Target a specific city for hyper-local content. Works with most major cities worldwide.
    </ParamField>

    **Example:**

    ```json theme={"system"}
    "city": "New York"
    ```

    <Warning>
      Replace spaces from city names with underscore (e.g,`New York` becomes `new_york`).
    </Warning>
  </Accordion>

  <Accordion title="locale" icon="language">
    <ParamField path="locale" default="auto" type="string">
      Set the browser's language preference. Affects how websites display content to you.

      Use LCID standard codes like `en-US`, `en-GB`, `fr-FR`, `de-DE`, etc.
    </ParamField>

    **Example:**

    ```json theme={"system"}
    "locale": "en-US"
    ```
  </Accordion>

  <Accordion title="parsing" icon="language">
    <ParamField path="parsing" type="object">
      CSS selectors for structured data extraction. Define field names with selectors and optional types.

      **Example:**

      ```json theme={"system"}
      {
          "parser":
          {
              "product_name":
              {
                  "type": "terminal",
                  "selector":
                  {
                      "type": "css",
                      "css_selector": ".product-title"
                  },
                  "extractor":
                  {
                      "type": "text"
                  }
              },
              "price":
              {
                  "type": "terminal",
                  "selector":
                  {
                      "type": "css",
                      "css_selector": ".price-value"
                  },
                  "extractor":
                  {
                      "type": "text",
                      "post_processor":
                      {
                          "type": "number"
                      }
                  }
              }
          }
      }
      ```
    </ParamField>
  </Accordion>

  <Accordion title="browser_actions" icon="hand-pointer">
    <ParamField path="browser_actions" type="array">
      Automate browser interactions before extraction. Supports click, scroll, wait, type, and more.

      **Example:**

      ```json theme={"system"}
      [
        {"click": {"selector": "#load-more"}},
        {"wait": {"duration": 2000}}
      ]
      ```
    </ParamField>
  </Accordion>

  <Accordion title="network_capture" icon="network-wired">
    <ParamField path="network_capture" type="array">
      Capture API calls and network requests during page load. Specify URL patterns to intercept.

      **Example:**

      ```json theme={"system"}
      {
          "url": "https://www.example.com",
          "render": true,
          "network_capture":
          [
              {
                  "method": "GET",
                  "url":
                  {
                      "type": "exact",
                      "value": "https://www.example.com/api/data"
                  }
              }
          ]
      }
      ```
    </ParamField>
  </Accordion>

  <Accordion title="headers" icon="list-check">
    <ParamField path="headers" type="object">
      Add custom HTTP headers to your request. Useful for authentication or custom user agents.
    </ParamField>

    **Example:**

    ```json theme={"system"}
    "headers": {
      "User-Agent": "Custom Bot 1.0",
      "X-API-Key": "your-key"
    }
    ```
  </Accordion>

  <Accordion title="cookies" icon="cookie">
    <ParamField path="cookies" type="array">
      Set cookies before loading the page. Great for accessing logged-in content or maintaining sessions.

      Each cookie needs a `key`, `value`, and `domain`.
    </ParamField>

    **Example:**

    ```json theme={"system"}
    "cookies": [
      {
        "key": "session_id",
        "value": "abc123xyz",
        "domain": "example.com"
      }
    ]
    ```
  </Accordion>
</AccordionGroup>

## Usage

### Basic HTML extraction

Extract HTML content from any URL:

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.extract(
      url= "https://www.google.com/search?q=nimble"
  )

  html = result.data.html
  print(html)
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.extract({
    url: "https://www.google.com/search?q=nimble",
  });

  const html = result.data.html;
  console.log(html);
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://www.google.com/search?q=nimble"
  }'
  ```
</CodeGroup>

### JavaScript rendering

Enable rendering for dynamic sites (React, Vue, etc.):

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.extract(
      url= "https://www.nimbleway.com/sdk",
      render= True
  )

  print(result.data.html)
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.extract({
    url: "https://www.nimbleway.com/sdk",
    render: true,
  });

  console.log(result.data.html);
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://www.nimbleway.com/sdk",
      "render": true
  }'
  ```
</CodeGroup>

### Stealth mode

Bypass anti-bot protections with stealth driver:

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.extract(
      url= "https://www.protected-site.com",
      render= True,
      driver= "vx10"
  )

  print(result.data.html)
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.extract({
    url: "https://www.protected-site.com",
    render: true,
    driver: "vx10",
  });

  console.log(result.data.html);
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://www.protected-site.com",
      "render": true,
      "driver": "vx10"
  }'
  ```
</CodeGroup>

### Parsing with CSS selectors

Extract structured data with a parsing schema:

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.extract(
      url= "https://www.amazon.com/s?k=iphone+17",
      parser= {
          "title": {
              "selector": "h1.product-title"
          },
          "price": {
              "selector": ".price",
              "type": "number"
          },
          "in_stock": {
              "selector": ".availability",
              "type": "boolean"
          }
      }
  )

  parsed = result.data.parsing
  print(f"Title: {parsed['title']}")
  print(f"Price: {parsed['price']}")
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.extract({
    url: "https://www.example.com/product",
    render: true,
    parsing: {
      title: { selector: "h1.product-title" },
      price: { selector: ".price", type: "number" },
      in_stock: { selector: ".availability", type: "boolean" },
    },
  });

  const parsed = result.data.parsing;
  console.log(`Title: ${parsed.title}`);
  console.log(`Price: ${parsed.price}`);
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://www.example.com/product",
      "render": true,
      "parsing": {
          "title": { "selector": "h1.product-title" },
          "price": { "selector": ".price", "type": "number" },
          "in_stock": { "selector": ".availability", "type": "boolean" }
      }
  }'
  ```
</CodeGroup>

### Browser actions

Automate interactions before extraction:

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.extract(
      url="https://www.nimbleway.com/blog",
      render=True,
      browser_actions=[{"wait": 2000}, {"scroll": 500}]
  )

  print(result.data.html)
  print(f"Browser Actions: {result.data.browser_actions}")
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.extract({
    url: "https://www.nimbleway.com/blog",
    render: true,
    browser_actions: [{ wait: 2000 }, { scroll: 500 }],
  });

  console.log(result.data.html);
  console.log(`Browser Actions: ${result.data.browser_actions}`);
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://www.nimbleway.com/blog",
      "render": true,
      "browser_actions": [
          {"wait": 2000 },
          {"scroll": 500 }
      ]
  }'
  ```
</CodeGroup>

### Geo-targeting

Extract content from specific locations:

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.extract(
      url= "https://ipinfo.io/json",
      country= "GB",
      locale= "en-GB"
  )

  print(result.data.html)
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.extract({
    url: "https://ipinfo.io/json",
    country: "GB",
    locale: "en-GB",
  });

  console.log(result.data.html);
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://ipinfo.io/json",
      "country": "GB",
      "locale": "en-GB"
  }'
  ```
</CodeGroup>

## Drivers

Choose the right extraction engine for your needs:

| Driver     | Description                | Best For                       | Render |
| ---------- | -------------------------- | ------------------------------ | ------ |
| `vx6`      | Fast HTTP requests (no JS) | Static HTML, APIs, high volume | No     |
| `vx8`      | Headless browser with JS   | Dynamic sites, SPAs            | Yes    |
| `vx8-pro`  | Headful browser with JS    | Complex interactions           | Yes    |
| `vx10`     | Stealth headless browser   | Bot-protected sites            | Yes    |
| `vx10-pro` | Stealth headful browser    | Most protected sites           | Yes    |

## Response Fields

| Field           | Type   | Description                             |
| --------------- | ------ | --------------------------------------- |
| `url`           | string | The requested URL                       |
| `task_id`       | string | Unique identifier for the request       |
| `status`        | string | `success` or `failed`                   |
| `data.html`     | string | Extracted HTML content                  |
| `data.markdown` | string | Content as markdown (if requested)      |
| `data.parsing`  | object | Structured data (if parsing configured) |
| `status_code`   | number | HTTP status code from target            |

## Blocked Domains

Requests targeting the following domains are blocked and will be rejected.

<Accordion title="View blocked domain list">
  * `*.paypal.com`
  * `account.sonyentertainmentnetwork.com`
  * `acopic.click`
  * `adskpak.com`
  * `amctheatres.com`
  * `andromedabee.com`
  * `antliabee.co.uk`
  * `api.groupon.com`
  * `api.stripe.com`
  * `api.tyrads.com`
  * `apusbee.co.uk`
  * `auth.api.sonyentertainmentnetwork.com`
  * `bellarmine.click`
  * `caixa.gov.br`
  * `callofduty.com`
  * `canal-plus.com`
  * `clubmium.com`
  * `clubmium.net`
  * `couponcabin.com`
  * `crunchyroll.com`
  * `dazn.com`
  * `directv.com`
  * `ea.com`
  * `epicgames.com`
  * `fustian.click`
  * `gomobile.it`
  * `googlecm.hit.gemius.pl`
  * `hbo.com`
  * `hitspro.net`
  * `honeyga.in`
  * `honeygain.com`
  * `honeygain.money`
  * `hotstar.com`
  * `iplogger.org`
  * `kayak.com`
  * `mojang.com`
  * `mte.gov.br`
  * `music-box.mobi`
  * `mybip.it`
  * `myy.io`
  * `native.np.ac.playstation.net`
  * `networkcontroller.net`
  * `ocmey.com`
  * `onevanilla.com`
  * `ordo.link`
  * `pagseguro.com`
  * `paypal.com`
  * `playstation.com`
  * `playstation.net`
  * `plex.tv`
  * `powerbrowsing.online`
  * `revenuevelocity.eu`
  * `roblox.com`
  * `runescape.com`
  * `seasyvendas.com`
  * `sky.com`
  * `sport4life.mobi`
  * `spotify.com`
  * `ssfcu.com`
  * `steamcommunity.com`
  * `steampowered.com`
  * `torrentdownloads.me`
  * `ttvnw.net`
  * `tyrads.com`
  * `tyrrewards.com`
  * `ubi.com`
  * `ubisoft.com`
  * `unrealengine.com`
  * `usps.com`
  * `valuedopinions.com`
  * `vrv.co`
  * `wellsfargo.com`
  * `www.ltv-mob.com`
  * `yogini.top`
  * `zelator.in`
</Accordion>

## Use cases

<CardGroup cols={2}>
  <Card title="High-Scale Extraction" icon="gauge-high">
    Full control for data extraction at high scale with precise selectors and
    configurations
  </Card>

  <Card title="Dynamic Content" icon="rotate">
    Handle JavaScript-heavy sites that require full page rendering
  </Card>

  <Card title="Stealth Mode" icon="shield">
    Bypass anti-bot protections with stealth mode and residential proxies
  </Card>

  <Card title="Data Parsing" icon="code">
    Extract structured data using CSS selectors and parsing schemas
  </Card>
</CardGroup>

## Extract vs other tools

| What you need                                  | Use                                                                           |
| ---------------------------------------------- | ----------------------------------------------------------------------------- |
| Data from popular sites (Amazon, Google, etc.) | [**Public Agent**](/nimble-sdk/agentic/agent-gallery) - maintained by Nimble  |
| Data from sites not in the gallery             | [**Custom Agent**](/nimble-sdk/agentic/studio) - create with natural language |
| Data from specific URLs (expert users)         | **Extract** - full control with CSS selectors                                 |
| Data from entire website                       | [**Crawl**](/nimble-sdk/web-tools/crawl)                                      |
| Search web + extract content from results      | [**Search**](/nimble-sdk/web-tools/search)                                    |

<Tip>
  **For most users**, we recommend starting with [Web Search
  Agents](/nimble-sdk/agentic/agents) - pre-built extractors maintained by
  Nimble for popular sites. Use Extract when you need full control over
  selectors and page interactions.
</Tip>

## Features

Explore detailed documentation for each Extract feature:

<CardGroup cols={3}>
  <Card title="Async Requests" icon="clock" href="/nimble-sdk/web-tools/extract/features/async">
    asynchronous processing and long-running operations
  </Card>

  <Card title="Output Formats" icon="file-lines" href="/nimble-sdk/web-tools/extract/features/formats">
    HTML, markdown, and text output options
  </Card>

  <Card title="Geo-Targeting" icon="globe" href="/nimble-sdk/web-tools/extract/features/geo-targeting">
    Extract from specific countries, states, or cities
  </Card>

  <Card title="JS Rendering" icon="browser" href="/nimble-sdk/web-tools/extract/features/js-rendering">
    Enable JavaScript for dynamic websites
  </Card>

  <Card title="Stealth Mode" icon="mask" href="/nimble-sdk/web-tools/extract/features/stealth-mode">
    Bypass anti-bot systems
  </Card>

  <Card title="Browser Actions" icon="hand-pointer" href="/nimble-sdk/web-tools/extract/features/browser-actions">
    Automate clicks, scrolling, form filling
  </Card>

  <Card title="Parsing Schemas" icon="language" href="/nimble-sdk/web-tools/extract/features/parsing-schema">
    Define CSS selectors for structured data
  </Card>

  <Card title="Network Capture" icon="network-wired" href="/nimble-sdk/web-tools/extract/features/network-capture">
    Intercept API calls and AJAX requests
  </Card>

  <Card title="Headers & Cookies" icon="cookie" href="/nimble-sdk/web-tools/extract/features/headers-and-cookies">
    Send custom headers and cookies
  </Card>
</CardGroup>

## Next steps

<CardGroup cols={2}>
  <Card icon="wand-magic-sparkles" href="https://online.nimbleway.com/workflow-builder" title="Try Nimble Studio Instead">
    Create a Web Search Agent for any website — no CSS selectors needed
  </Card>

  <Card icon="plug" href="/integrations/agent-skills/plugin-installation" title="Install Plugin">
    Use Nimble in Claude Code or Cursor
  </Card>

  <Card icon="code" href="/api-reference/extract/extract" title="API Reference">
    Explore endpoints, request parameters, and response schemas for the Extract
    API
  </Card>

  <Card icon="bullseye-pointer" href="/nimble-sdk/agentic/agents" title="Web Search Agents">
    Learn about intelligent agents that handle extraction automatically
  </Card>
</CardGroup>
