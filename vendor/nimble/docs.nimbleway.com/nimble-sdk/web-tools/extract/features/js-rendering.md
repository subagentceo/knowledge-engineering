> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# JavaScript Rendering

> Control browser rendering for dynamic content and JavaScript execution

JavaScript rendering enables full browser execution to capture dynamically loaded content, handle user interactions, and process JavaScript-heavy websites. Control rendering behavior with advanced options for timeout, iframe handling, and load detection.

## When to use

Use JavaScript rendering when you need to:

* **Load dynamic content**: Capture content loaded via AJAX or fetch requests
* **Execute JavaScript**: Process sites that require JS for content display
* **Handle SPAs**: Extract data from Single Page Applications (React, Vue, Angular)
* **Wait for interactions**: Capture DOM state after user actions
* **See final state**: Get the page as users see it, not raw HTML

## Parameters

<AccordionGroup>
  <Accordion title="render" icon="browser">
    <ParamField path="render" default="false" type="boolean">
      Turn JavaScript rendering on or off. When enabled, the page loads in a real browser that executes JavaScript, just like when you visit it yourself.

      **When to enable:**

      * Single Page Applications (React, Vue, Angular)
      * Content loaded via AJAX or fetch
      * Sites that need JavaScript to display content
      * When you need the page as users see it

      **When to keep disabled (faster, cheaper):**

      * Static HTML pages
      * Simple websites without JavaScript
      * When raw HTML is sufficient

      **Note:** Rendering requires vx8 or vx10. The vx6 driver doesn't support rendering.
    </ParamField>

    **Example:**

    ```json theme={"system"}
    "render": true
    ```
  </Accordion>

  <Accordion title="render_options" icon="sliders">
    <ParamField path="render_options" type="object">
      Fine-tune how the browser waits and loads the page. Only applies when `render: true`.

      **Available options:**

      * `render_type` - When to consider the page "loaded"
        * `load` (default) - Wait for the standard page load event - good for most pages
        * `domready` - Stop as soon as HTML is ready, before images load - fastest option
        * `idle2` - Wait until only 2 or fewer network requests in the last 500ms - good for dynamic content
        * `idle0` - Wait until zero network activity for 500ms - most thorough, slowest
      * `timeout` - Maximum wait time in milliseconds (default: 30,000)
        * How long to wait before giving up
      * `include_iframes` - Whether to load content inside iframes (default: false)
        * Enable for embedded videos, widgets, or important iframe content
      * `blocked_domains` - List of domains to block during loading
        * Great for blocking ads, analytics, or tracking scripts
        * Makes pages load faster and cleaner
    </ParamField>

    **Example:**

    ```json theme={"system"}
    "render_options": {
      "render_type": "idle0",
      "timeout": 60000,
      "include_iframes": true,
      "blocked_domains": ["google-analytics.com", "doubleclick.net"]
    }
    ```
  </Accordion>
</AccordionGroup>

## Usage

### Enable basic rendering

Set `render: true` to enable JavaScript execution:

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.extract(
      url= "https://www.google.com/search?q=nba+allstars+2026",
      render= True
  )

  print(result.data.html)
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.extract({
    url: "https://www.google.com/search?q=nba+allstars+2026",
    render: true,
  });

  console.log(result.data.html);
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://www.google.com/search?q=nba+allstars+2026",
      "render": true
  }'
  ```
</CodeGroup>

<Warning>
  When `render: false` (default), the API returns the raw HTML without
  JavaScript execution, suitable for static pages.
</Warning>

### Dynamic content loading

Wait for AJAX-loaded content:

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  # Wait for all network activity to stop
  result = nimble.extract(
      url= "https://www.target.com/deals/all",
      render= True,
      render_options= {
          "render_type": "idle0",
          "timeout": 45000
      }
  )

  print(result.data.html)
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  // Wait for all network activity to stop
  const result = await nimble.extract({
    url: "https://www.target.com/deals/all",
    render: true,
    render_options: {
      render_type: "idle0",
      timeout: 45000,
    },
  });

  console.log(result.data.html);
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://www.google.com/search?q=nba+allstars+2026",
      "render": true,
      "render_options": {
        "render_type": "idle0",
        "timeout": 45000
    }
  }'
  ```
</CodeGroup>

### Iframe content extraction

Include iframe content in extraction:

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  # Include iframe content (e.g., embedded videos, widgets)
  result = nimble.extract(
      url= "https://www.example.com/page-with-iframes",
      render= True,
      render_options= {
          "include_iframes": True,
          "render_type": "load",
          "timeout": 40000
      }
  )

  print(result.data.html)
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  // Include iframe content (e.g., embedded videos, widgets)
  const result = await nimble.extract({
    url: "https://www.example.com/page-with-iframes",
    render: true,
    render_options: {
      include_iframes: true,
      render_type: "load",
      timeout: 40000,
    },
  });

  console.log(result.data.html);
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://www.example.com/page-with-iframes",
      "render": true,
      "render_options": {
        "include_iframes": true,
        "render_type": "load",
        "timeout": 40000
    }
  }'
  ```
</CodeGroup>

### Block unnecessary resources

Improve performance by blocking ads and tracking:

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  # Block ads, analytics, and tracking domains
  result = nimble.extract(
      url= "https://www.example.com",
      render= True,
      render_options= {
          "blocked_domains": [
              "googletagmanager.com",
              "google-analytics.com",
              "facebook.com",
              "doubleclick.net",
              "ads.example.com"
          ],
          "render_type": "idle2",
          "timeout": 25000
      }
  )

  print(result.data.html)
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  // Block ads, analytics, and tracking domains
  const result = await nimble.extract({
    url: "https://www.example.com",
    render: true,
    render_options: {
      blocked_domains: [
        "googletagmanager.com",
        "google-analytics.com",
        "facebook.com",
        "doubleclick.net",
        "ads.example.com",
      ],
      render_type: "idle2",
      timeout: 25000,
    },
  });

  console.log(result.data.html);
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://www.google.com/search?q=nba+allstars+2026",
      "render": true,
      "render_options": {
      "blocked_domains": [
          "googletagmanager.com",
          "google-analytics.com",
          "facebook.com",
          "doubleclick.net",
          "ads.example.com"
      ],
      "render_type": "idle2",
      "timeout": 25000
    }
  }'
  ```
</CodeGroup>

### Fast rendering for simple sites

Use DOMContentLoaded for faster responses:

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  # Don't wait for images/styles to load
  result = nimble.extract(
      url= "https://www.example.com/article",
      render= True,
      render_options= {
          "render_type": "domready",
          "timeout": 15000
      },
      formats= ["markdown"]
  )

  print(result.data.markdown)
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  // Don't wait for images/styles to load
  const result = await nimble.extract({
    url: "https://www.example.com/article",
    render: true,
    render_options: {
      render_type: "domready",
      timeout: 15000,
    },
    formats: ["markdown"],
  });

  console.log(result.data.markdown);
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://www.google.com/search?q=nba+allstars+2026",
      "render": true,
      "render_options": {
        "render_type": "domready",
        "timeout": 15000
    },
    "formats": ["markdown"]
  }'
  ```
</CodeGroup>

### Combining with browser actions

Rendering works seamlessly with browser actions:

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  # Render page, then perform actions
  result = nimble.extract(
      url= "https://www.example.com",
      render= True,
      render_options= {
          "render_type": "idle0",
          "timeout": 240000
      },
      browser_actions= [
          {
              "click": {
                  "selector": "button.load-more",
                  "timeout": 5000
              }
          },
          {
              "sleep": "2s"
          },
          {
              "auto_scroll": 5000
          }
      ]
  )

  print(result)
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  // Render page, then perform actions
  const result = await nimble.extract({
    url: "https://www.example.com",
    render: true,
    render_options: {
      render_type: "idle0",
      timeout: 240000,
    },
    browser_actions: [
      {
        click: {
          selector: "button.load-more",
          timeout: 5000,
        },
      },
      {
        sleep: "2s",
      },
      {
        auto_scroll: 5000,
      },
    ],
  });

  console.log(result);
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://www.google.com/search?q=nba+allstars+2026",
      "render": true,
      "render_options": {
        "render_type": "idle0",
        "timeout": 45000
    },
     "browser_actions": [
      {
        "click": {
          "selector": "button.load-more",
          "timeout": 5000
        }
      },
      {
        "sleep": "2s"
      },
      {
        "auto_scroll": 5000
      }
    ]
  }'
  ```
</CodeGroup>

## Best practices

### Choose the right render type

**`Use load for standard pages:`**

```python theme={"system"}
# ✅ Default for most websites
render_options = {
    "render_type": "load"
}
```

**`Use domready for speed:`**

```python theme={"system"}
# ✅ When images/styles aren't needed
render_options = {
    "render_type": "domready"  # Faster response
}
```

**`Use idle2 for dynamic content:`**

```python theme={"system"}
# ✅ For AJAX-heavy pages
render_options = {
    "render_type": "idle2",  # Wait for most requests to finish
    "timeout": 30000
}
```

**`Use idle0 for complete loading:`**

```python theme={"system"}
# ✅ When you need everything loaded
render_options = {
    "render_type": "idle0",  # Wait for all network activity
    "timeout": 60000  # Higher timeout for slow sites
}
```

### Optimize timeout settings

**Set appropriate timeouts:**

```python theme={"system"}
# ❌ Too short - may miss content
render_options = {
    "render_type": "idle0",
    "timeout": 5000  # Not enough for slow sites
}

# ✅ Balanced timeout
render_options = {
    "render_type": "idle0",
    "timeout": 30000  # 30 seconds is usually sufficient
}

# ✅ Extended for slow sites
render_options = {
    "render_type": "idle0",
    "timeout": 60000  # Up to 60 seconds for very slow sites
}
```

### Block unnecessary domains

**Common domains to block:**

```python theme={"system"}
common_blocked_domains = [
    # Analytics
    "google-analytics.com",
    "googletagmanager.com",
    "segment.com",
    "mixpanel.com",

    # Advertising
    "doubleclick.net",
    "googlesyndication.com",
    "adservice.google.com",

    # Social media widgets
    "facebook.com",
    "twitter.com",
    "linkedin.com",

    # CDN for ads
    "ads.example.com",
    "tracking.example.com"
]

result = nimble.extract({
    "url": "https://www.example.com",
    "render": True,
    "render_options": {
        "blocked_domains": common_blocked_domains
    }
})
```

**Benefits of blocking:**

* Faster page loads
* Lower bandwidth usage
* Reduced detection risk
* Cleaner HTML output

### Handle iframes carefully

**Enable only when needed:**

```python theme={"system"}
# ❌ Don't enable iframes unnecessarily
render_options = {
    "include_iframes": True  # Slower and larger response
}

# ✅ Enable only for specific content
if need_iframe_content:
    render_options = {
        "include_iframes": True,
        "timeout": 45000  # Increase timeout for iframes
    }
else:
    render_options = {
        "include_iframes": False
    }
```

### Combine with network capture

Monitor and capture API calls during rendering:

```python theme={"system"}
from nimble_python import Nimble

nimble = Nimble(api_key="YOUR-API-KEY")

# Render page and capture specific API calls
result = nimble.extract(
    url= "https://www.example.com",
    render= True,
    render_options= {
        "render_type": "idle0",
        "timeout": 30000
    },
    network_capture= [
        {
            "method": "GET",
            "url": {
                "type": "contains",
                "value": "/api/products"
            }
        }
    ]
)

# Access captured network data
api_responses = result.data.network_capture
print(api_responses)
```

### Performance optimization

**Choose the minimal driver:**

```python theme={"system"}
# ❌ Don't use vx10 when vx8 works
result = nimble.extract({
    "url": "https://simple-spa.com",
    "driver": "vx10",  # Unnecessary stealth features
    "render": True
})

# ✅ Use appropriate driver
result = nimble.extract({
    "url": "https://simple-spa.com",
    "driver": "vx8",  # Sufficient for most SPAs
    "render": True
})
```

**Monitor execution time:**

```python theme={"system"}
result = nimble.extract({
    "url": "https://www.example.com",
    "render": True
})

# Check rendering performance
exec_time = result.metadata.query_duration
print(f"Rendering took {exec_time}ms")

# Optimize if too slow
if exec_time > 10000:
    print("Consider blocking domains or changing render_type")
```

### When to skip rendering

Use non-rendering (vx6) when:

* **Static content**: HTML already contains all data
* **API endpoints**: Fetching JSON directly
* **High throughput needed**: Rendering is slower
* **Simple pages**: No JavaScript required
* **Cost optimization**: Non-rendering is cheaper

```python theme={"system"}
# ✅ Skip rendering for static pages
result = nimble.extract({
    "url": "https://static-site.com/page.html",
    "render": False,  # or omit (false is default)
})
```
