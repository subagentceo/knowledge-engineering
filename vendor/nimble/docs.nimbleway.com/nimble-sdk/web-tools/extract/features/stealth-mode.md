> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Stealth Mode

> Advanced anti-bot evasion for highly protected websites

Stealth Mode applies advanced evasion techniques to bypass sophisticated anti-bot systems. Use it when targeting sites with strong protection mechanisms.

Common uses:

* **Protected sites**: e-commerce, social media, and sites with advanced bot detection.
* **Anti-fingerprinting**: mimic real browser behavior and characteristics.
* **Higher success rates**: bypass CAPTCHAs and challenge pages automatically.

## Parameters

<AccordionGroup>
  <Accordion title="driver" icon="gears">
    <ParamField path="driver" default="vx6" type="string">
      Choose which extraction engine to use. Different drivers offer different levels of stealth and capabilities.

      **Available drivers:**

      * `vx6` - **No rendering** (fastest, cheapest)
        * Plain HTTP requests without JavaScript
        * Best for static pages and APIs
        * No bot protection evasion
        * Perfect for high-volume simple scraping
      * `vx8` - **Basic headless browser**
        * Executes JavaScript in headless mode
        * Good for most dynamic sites
        * Basic anti-detection
        * Balanced speed and capability
      * `vx8-pro` - **Headful browser with better stealth**
        * Runs a visible browser (headful mode)
        * More human-like behavior
        * Better for sites with moderate protection
        * Slower but more realistic
      * `vx10` - **Advanced stealth headless**
        * Advanced anti-bot evasion techniques
        * Mimics real browser fingerprints
        * Best for protected sites without needing headful
        * Good balance of stealth and speed
      * `vx10-pro` - **Maximum stealth headful** (highest protection)
        * Full visible browser with maximum realism
        * Bypasses sophisticated anti-bot systems
        * Best for heavily protected sites
        * Slowest but most effective

      **Choosing the right driver:**

      * Start with the simplest driver that works
      * Only upgrade if you get blocked
      * Higher drivers cost more but have better success rates

      **Auto-selection:** When `render: true` without specifying a driver, Nimble automatically picks the optimal driver based on the target site.
    </ParamField>

    **Example:**

    ```json theme={"system"}
    "driver": "vx10"
    ```

    **Example (maximum stealth):**

    ```json theme={"system"}
    "driver": "vx10-pro"
    ```
  </Accordion>
</AccordionGroup>

## Usage

### Fast Non Rendered request

This request uses the **vx6** driver for fast extraction without JS rendering

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.extract(
      url="https://www.example.com",
      driver="vx6",
  )

  print(result)
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.extract({
    url: "https://www.example.com",
    driver: "vx6",
  });

  console.log(result);
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://ipinfo.io/json",
      "driver": "vx6"
  }'
  ```
</CodeGroup>

<Warning>
  When setting `render:false` , the driver is automatically set to **vx6**
</Warning>

### Advanced Stealth with vx10-pro

For maximum protection against the most sophisticated anti-bot systems, use `vx10-pro`.

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.extract(
      url="https://heavily-protected-site.com",
      driver="vx10-pro",
  )

  print(result)
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.extract({
    url: "https://heavily-protected-site.com",
    driver: "vx10-pro",
  });

  console.log(result);
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://heavily-protected-site.com",
      "driver": "vx10-pro"
  }'
  ```
</CodeGroup>

<Warning>
  When setting `render:true`,Nimble automatically selects the optimal driver
  (**vx8** / **vx8-pro** / **vx10** / **vx10-pro**) based on the target domain's
  anti-bot technology
</Warning>
