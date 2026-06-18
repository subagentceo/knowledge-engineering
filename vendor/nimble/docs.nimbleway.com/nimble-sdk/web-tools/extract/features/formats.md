> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Formats

> Control response format and included data types

Format options control what data types are included in your response. Specify one or more formats to receive HTML, markdown, screenshots, response headers, or extracted links alongside your extracted data.

Common uses:

* **Full page content**: Get raw HTML for custom processing
* **Readable text**: Convert pages to clean markdown format
* **Visual records**: Capture screenshots for monitoring or archival
* **Link extraction**: Get all URLs from the page for further crawling
* **Response headers**: Inspect HTTP headers returned by the server

<Note>
  You can combine multiple formats in a single request. All specified formats
  will be included in the response.
</Note>

## Parameters

<AccordionGroup>
  <Accordion icon="file-lines" title="formats">
    <ParamField path="formats" default="['html']" type="array">
      Choose which types of content you want in your response. You can request multiple formats at once, and each will be included in the result.

      **Available formats:**

      * `html` - The full HTML source code of the page
        * *Best for:* Custom parsing, preserving exact page structure, accessing all DOM elements
      * `markdown` - Clean, readable markdown version of the page
        * *Best for:* Content analysis, LLM processing, human-readable output
      * `screenshot` - Full-page screenshot as base64-encoded PNG
        * *Best for:* Visual verification, monitoring, archival, debugging
        * *Note:* Automatically enables rendering (VX8/VX10 driver)
      * `headers` - HTTP response headers returned by the server
        * *Best for:* Inspecting content type, caching policies, redirects, server metadata
        * *Returns:* Key-value object under `data.headers`
      * `links` - All URLs found on the page
        * *Best for:* Discovering pages to crawl, mapping site structure, finding external references
        * *Returns:* Array of URL strings under `data.links`
    </ParamField>

    **Example:**

    ```json theme={"system"}
    "formats": ["html", "markdown", "screenshot", "headers", "links"]
    ```
  </Accordion>
</AccordionGroup>

## Usage

### HTML format

Request one format type - html (default). **Best for:**

* Custom HTML parsing
* Preserving exact page structure
* Accessing all DOM elements and attributes
* Archival purposes

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.extract(
      url= "https://www.google.com/search?q=nimble",
      formats= ["html"] # default
  )

  # Access HTML content
  html_content = result.data.html
  print(html_content)
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.extract({
    url: "https://www.google.com/search?q=nimble",
    formats: ["html"], // default
  });

  // Access HTML content
  const htmlContent = result.data.html;
  console.log(htmlContent);
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://www.google.com/search?q=nimble",
      "formats": ["html"]
  }'
  ```
</CodeGroup>

### Markdown format

Convert the page to clean, readable markdown. **Best for:**

* Clean text extraction
* Content analysis
* LLM processing
* Human-readable output:

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.extract(
      url= "https://www.amazon.com/s?k=ironflask",
      formats= ["markdown"]
  )

  # Access markdown content
  markdown_content = result.data.markdown
  print(markdown_content)
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.extract({
    url: "https://www.amazon.com/s?k=ironflask",
    formats: ["markdown"],
  });

  // Access markdown content
  const markdownContent = result.data.markdown;
  console.log(markdownContent);
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://www.amazon.com/s?k=ironflask",
      "formats": ["markdown"]
  }'
  ```
</CodeGroup>

### Screenshot format

Capture a full-page screenshot as a base64-encoded PNG image. **Best for:**

* Visual verification and monitoring
* Page archival and documentation
* Comparing page changes over time

<Warning>
  Screenshot format automatically enables JavaScript rendering (VX8 or VX10
  driver), which may affect pricing. See [Pricing](/nimble-sdk/admin/pricing)
  for driver costs.
</Warning>

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble
  import base64

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.extract(
      url="https://www.nimbleway.com",
      formats=["screenshot"]
  )

  # Access screenshot (base64-encoded PNG)
  screenshot_base64 = result.data.screenshot

  # Save to file
  with open("screenshot.png", "wb") as f:
      f.write(base64.b64decode(screenshot_base64))

  print("Screenshot saved to screenshot.png")
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";
  import fs from "fs";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.extract({
    url: "https://www.nimbleway.com",
    formats: ["screenshot"],
  });

  // Access screenshot (base64-encoded PNG)
  const screenshotBase64 = result.data.screenshot;

  // Save to file
  fs.writeFileSync("screenshot.png", Buffer.from(screenshotBase64, "base64"));

  console.log("Screenshot saved to screenshot.png");
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://www.nimbleway.com",
      "formats": ["screenshot"]
  }'
  ```
</CodeGroup>

### Headers format

Return the HTTP response headers from the server. **Best for:**

* Inspecting `Content-Type`, `Cache-Control`, and redirect behavior
* Debugging server responses and middleware
* Verifying geo-targeted responses return the expected locale or region

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.extract(
      url="https://www.example.com",
      formats=["headers"]
  )

  # Access response headers
  headers = result.data.headers
  print(headers)
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.extract({
    url: "https://www.example.com",
    formats: ["headers"],
  });

  // Access response headers
  const headers = result.data.headers;
  console.log(headers);
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://www.example.com",
      "formats": ["headers"]
  }'
  ```
</CodeGroup>

### Links format

Extract all URLs found in the page HTML. **Best for:**

* Discovering new pages to crawl or extract
* Mapping internal site structure
* Finding outbound links and external references

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.extract(
      url="https://www.example.com",
      formats=["links"]
  )

  # Access extracted links
  links = result.data.links
  for link in links:
      print(link)
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.extract({
    url: "https://www.example.com",
    formats: ["links"],
  });

  // Access extracted links
  const links = result.data.links;
  links.forEach((link) => console.log(link));
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://www.example.com",
      "formats": ["links"]
  }'
  ```
</CodeGroup>

### Multiple formats

Combine multiple formats to get different data representations:

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.extract(
      url="https://www.nimbleway.com",
      formats=["html", "markdown", "screenshot"]
  )

  print(result.data.html)
  print(result.data.markdown)
  print(result.data.screenshot)  # base64-encoded PNG
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.extract({
    url: "https://www.nimbleway.com",
    formats: ["html", "markdown", "screenshot"],
  });

  console.log(result.data.html);
  console.log(result.data.markdown);
  console.log(result.data.screenshot); // base64-encoded PNG
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://www.nimbleway.com",
      "formats": ["html", "markdown", "screenshot"]
  }'
  ```
</CodeGroup>

<Note>
  When combining screenshot with other formats, rendering is automatically
  enabled for all formats in the request.
</Note>

## Example response

When formats are specified, all requested data is included in the response. The response includes:

* **data.html**: Raw HTML if requested
* **data.markdown**: Converted markdown if requested
* **data.screenshot**: Base64-encoded PNG if requested
* **data.links**: Array of extracted URLs if requested
* **data.headers**: HTTP response headers key-value object if requested
* **data.parsing**: Structured data if parsing was used
* **metadata**: Execution details and formats included:

```json theme={"system"}
{
  "url": "https://www.example.com/",
  "task_id": "b1fa7943-cba5-4ec2-a88c-4d2d6799c794",
  "status": "success",
  "data": {
    "html": "<!DOCTYPE html><html><head>...</head><body>...</body></html>",
    "markdown": "# Article Title\n\nThis is the article content...",
    "screenshot": "iVBORw0KGgoAAAANSUhEUgAAA...",
    "headers": {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "max-age=3600",
      "content-language": "en-US",
      "server": "nginx"
    },
    "links": [
      "https://www.example.com/about",
      "https://www.example.com/contact",
      "https://www.example.com/products",
      "https://external-site.com"
    ],
    "parsing": {
      "title": "Example Article",
      "author": "John Doe"
    }
  },
  "metadata": {
    "query_time": "2026-02-08T22:00:36.132Z",
    "query_duration": 1877,
    "response_parameters": {
      "input_url": "https://www.example.com/"
    },
    "driver": "vx6"
  },
  "status_code": 200
}
```

## Best practices

### Format selection

**Choose formats based on your needs:**

* Use `html` when you need full DOM access
* Use `markdown` for clean text and content analysis
* Use `screenshot` for visual verification
* Use `links` for discovering URLs to crawl
* Use `headers` for inspecting server metadata, content type, or caching behavior

**Avoid unnecessary formats:**

```python theme={"system"}
# ❌ Don't request all formats if you only need one
formats=["html", "markdown"]

# ✅ Request only what you need
formats=["markdown"]
```

### Performance considerations

* Each format adds processing time
* Screenshots require rendering and are slower
* HTML and markdown are faster to generate
* Request only needed formats for optimal performance
