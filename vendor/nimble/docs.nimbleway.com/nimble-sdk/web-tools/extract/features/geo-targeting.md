> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Geo Targeting

> Built-in residential proxy allowing Geo-targeting options

Geo Targeting routes each request through a proxy exit in a specific region. Use it when content changes by location or language.

Common uses:

* **Localized content**: pricing, availability, shipping, store pages.
* **SEO & market research**: region-specific SERPs and ads.
* **Fewer blocks**: look like a real local user with residential exits.

## Parameters

<AccordionGroup>
  <Accordion title="country" icon="flag">
    <ParamField path="country" default="US" type="string">
      Make your request appear as if it's coming from a specific country. Perfect for accessing region-specific content like localized prices or availability.

      **When to use:**

      * E-commerce sites with different prices by country
      * Content that varies by region
      * Accessing geo-restricted pages
      * SEO analysis for different markets

      Use ISO Alpha-2 Country Codes i.e. `US`, `DE`, `GB`.\
      Use `ALL` for random country selection.
    </ParamField>

    **Example:**

    ```json theme={"system"}
    "country": "GB"
    ```
  </Accordion>

  <Accordion title="state" icon="map-location-dot">
    <ParamField path="state" type="string">
      For US or CA locations only - specify which state your request should come from.

      Use ISO Alpha-2 Country Codes i.e. `NY`, `AZ`, `CA`

      **Note:** Only works when `country` is set to `US` or `CA`. Useful for state-specific content like local store inventory or regional pricing.
    </ParamField>

    **Example:**

    ```json theme={"system"}
    "country": "US",
    "state": "CA"
    ```
  </Accordion>

  <Accordion title="city" icon="city">
    <ParamField path="city" type="string">
      Target a specific city for hyper-local content. Works best when combined with country (and state for US cities).

      **When to use:**

      * Local business listings
      * City-specific promotions
      * Store availability by location
      * Hyper-local content

      **Examples:** `"new_york"`, `"london"`, `"paris"`
    </ParamField>

    **Example:**

    ```json theme={"system"}
    "country": "US",
    "state": "NY",
    "city": "new_york"
    ```

    <Warning>
      Replace spaces from city names with underscore (e.g,`New York` becomes `new_york`).
    </Warning>
  </Accordion>

  <Accordion title="locale" icon="language">
    <ParamField path="locale" default="auto" type="string">
      Set the browser's preferred language. This changes the `Accept-Language` header and tells websites which language you prefer.

      **Most common locales:**

      * `en-US` - English (United States)
      * `en-GB` - English (United Kingdom)
      * `fr-FR` - French (France)
      * `de-DE` - German (Germany)
      * `es-ES` - Spanish (Spain)
      * `ja-JP` - Japanese (Japan)
      * `zh-CN` - Chinese (China)
      * `pt-BR` - Portuguese (Brazil)
      * `auto` - Automatically match the country

      **Best practice:** Match your locale to your country (e.g., `fr-FR` with `country: "FR"`) for the most authentic experience.
    </ParamField>

    **Example:**

    ```json theme={"system"}
    "country": "FR",
    "locale": "fr-FR"
    ```
  </Accordion>
</AccordionGroup>

<Card title="Supprted Geo Locations" icon="sparkles" href="https://api.nimbleway.com/api/v1/location/cities" />

<Note>
  `country`/`state`/`city` geo targeting changes **where** the request comes
  from. `locale` changes **which language** the browser prefers.
</Note>

## Usage

This request exits from **New York** and sets the browser language to **English**.

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.extract(
      url="https://ipinfo.io/json",
      country="US",
      state="NY",
      locale="en-US",
  )

  print(result.data.html)
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.extract("https://ipinfo.io/json", {
    country: "US",
    state: "NY",
    locale: "en-US",
  });

  console.log(result.data.html);
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://ipinfo.io/json",
      "country": "US",
      "state": "NY",
      "locale": "en-US"
  }'
  ```
</CodeGroup>

## Best practices

### Use geo targeting when content varies by location

Only specify country/state/city when the content differs by location.

```python theme={"system"}
# ✅ Use for location-specific content
result = nimble.extract({
    "url": "https://www.example.com/products",
    "country": "GB"  # Prices and availability vary by country
})

# ❌ Unnecessary for global content
result = nimble.extract({
    "url": "https://www.example.com/about",
    "country": "DE"  # About page is the same everywhere
})
```

### Match locale to target country

Set the locale to match the country for accurate localized content.

```python theme={"system"}
# ✅ Locale matches country
result = nimble.extract({
    "url": "https://www.example.com",
    "country": "FR",
    "locale": "fr-FR"
})

# ✅ Locale auto matching country
result = nimble.extract({
    "url": "https://www.example.com",
    "country": "FR",
    "locale": "auto"
})

# ❌ Locale doesn't match country
result = nimble.extract({
    "url": "https://www.example.com",
    "country": "FR",
    "locale": "en-US"  # May not get French content
})
```

### Start with country-level targeting

Use country-level targeting first, then add state/city if needed.

```python theme={"system"}
# ✅ Start simple with country
result = nimble.extract({
    "url": "https://www.example.com",
    "country": "US"
})

# ✅ Add state if content differs
result = nimble.extract({
    "url": "https://www.example.com",
    "country": "US",
    "state": "NY"  # Only if NY shows different content
})

# ❌ Overly specific when not needed
result = nimble.extract({
    "url": "https://www.example.com/global-page",
    "country": "US",
    "state": "NY", # Unnecessary granularity
    "city": "new_york"
})
```
