> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Network Capture

> Capture internal API calls and dynamic data without parsing HTML

Network Capture intercepts internal API calls made during webpage loading, giving you direct access to structured data in JSON format instead of parsing HTML.

Common uses:

* **Dynamic content**: Capture lazy-loaded data and real-time updates.
* **API access**: Interact directly with backend APIs bypassing UI rendering.
* **Performance**: Reduce overhead by accessing machine-readable responses.
* **Accuracy**: Get reliable data directly from API endpoints.

<Tip>
  Network Capture requires page rendering to be enabled (`render: true`). For
  XHR/AJAX calls that don't need rendering, use the `is_xhr` parameter instead.
</Tip>

## Parameters

<AccordionGroup>
  <Accordion title="network_capture" icon="network-wired">
    <ParamField path="network_capture" type="array">
      Intercept and capture network requests made by the page. Perfect for accessing hidden APIs or getting data directly from backend calls instead of parsing HTML.

      **Requirements:** Only works when `render: true`

      **Each capture filter is an object with these options:**

      * `method` - Filter by HTTP method (GET, POST, PUT, DELETE, etc.)
        * Leave empty to capture any method
      * `url.type` - How to match URLs
        * `exact` - Match the complete URL exactly
        * `contains` - Match URLs containing a specific string
      * `url.value` - The URL or URL pattern to match
      * `resource_type` - Filter by request type (array)
        * Options: `xhr`, `fetch`, `stylesheet`, `script`, `document`, `image`
        * Example: `["xhr", "fetch"]` to capture only AJAX/fetch requests
      * `validation` - Validate response content (default: false)
        * Ensures captured responses are valid
      * `wait_for_requests_count` - Wait for this many matching requests (default: 0)
        * Useful when you know how many API calls to expect
      * `wait_for_requests_count_timeout` - How long to wait in seconds (default: 10)
        * Timeout for waiting for the expected request count

      **Pro tip:** Use `contains` with `/api/` to capture all API calls, or be specific with exact URLs.
    </ParamField>

    **Example (capture specific API):**

    ```json theme={"system"}
    "network_capture": [
      {
        "method": "GET",
        "url": {
          "type": "contains",
          "value": "/api/products"
        },
        "resource_type": ["xhr", "fetch"]
      }
    ]
    ```

    **Example (multiple captures):**

    ```json theme={"system"}
    "network_capture": [
      {
        "url": {
          "type": "contains",
          "value": "/graphql"
        }
      },
      {
        "url": {
          "type": "exact",
          "value": "https://api.example.com/data"
        },
        "wait_for_requests_count": 1
      }
    ]
    ```
  </Accordion>
</AccordionGroup>

## Usage

### Filter by exact URL match

Capture a specific API endpoint by matching the complete URL.

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.extract(
      url="https://www.example.com",
      render=True,
      network_capture=[
          {
              "method": "GET",
              "url": {
                  "type": "exact",
                  "value": "https://www.example.com/api/data"
              }
          }
      ]
  )

  print(result)
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.extract({
    url: "https://www.example.com",
    render: true,
    network_capture: [
      {
        method: "GET",
        url: {
          type: "exact",
          value: "https://www.example.com/api/data",
        },
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
      "url": "https://www.example.com",
      "render": true,
      "network_capture": [
          {
              "method": "GET",
              "url": {
                  "type": "exact",
                  "value": "https://www.example.com/api/data"
              }
          }
      ]
  }'
  ```
</CodeGroup>

### Filter by URL pattern

Use `contains` to capture requests with URLs matching a pattern. This is useful for capturing file types (like `.css` or `.js`), requests with dynamic URL components, or when you don't know the exact URL.

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.extract(
      url="https://www.example.com",
      render=True,
      network_capture=[
          {
              "url": {
                  "type": "contains",
                  "value": "/graphql"
              }
          }
      ]
  )

  print(result)
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.extract({
    url: "https://www.example.com",
    render: true,
    network_capture: [
      {
        url: {
          type: "contains",
          value: "/api/",
        },
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
      "url": "https://www.example.com",
      "render": true,
      "network_capture": [
          {
              "url": {
                  "type": "contains",
                  "value": "/api/"
              }
          }
      ]
  }'
  ```
</CodeGroup>

### Filter by resource type

Capture specific types of resources like XHR, Fetch, or Script requests.

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.extract(
      url="https://www.example.com",
      render=True,
      network_capture=[
          {
              "method": "GET",
              "resource_type": ["xhr", "fetch"]
          }
      ]
  )

  print(result)
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.extract({
    url: "https://www.example.com",
    render: true,
    network_capture: [
      {
        method: "GET",
        resource_type: ["xhr", "fetch"],
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
      "url": "https://www.example.com",
      "render": true,
      "network_capture": [
          {
              "method": "GET",
              "resource_type": ["xhr", "fetch"]
          }
      ]
  }'
  ```
</CodeGroup>

### Multiple filters

Combine multiple filters to capture different request types in one call.

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.extract(
      url="https://www.example.com",
      render=True,
      network_capture=[
          {
              "method": "GET",
              "url": {
                  "type": "exact",
                  "value": "https://www.example.com/api/resource"
              }
          },
          {
              "url": {
                  "type": "contains",
                  "value": ".css"
              }
          }
      ]
  )

  print(result)
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.extract({
    url: "https://www.example.com",
    render: true,
    network_capture: [
      {
        method: "GET",
        url: {
          type: "exact",
          value: "https://www.example.com/api/resource",
        },
      },
      {
        url: {
          type: "contains",
          value: ".css",
        },
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
      "url": "https://www.example.com",
      "render": true,
      "network_capture": [
          {
              "method": "GET",
              "url": {
                  "type": "exact",
                  "value": "https://www.example.com/api/resource"
              }
          },
          {
              "url": {
                  "type": "contains",
                  "value": ".css"
              }
          }
      ]
  }'
  ```
</CodeGroup>

### Wait for requests

Use `wait_for_requests_count` to ensure you capture a minimum number of network requests. The request duration will be extended until the count is reached or the timeout expires.

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.extract(
      url="https://www.example.com",
      render=True,
      network_capture=[
          {
              "method": "GET",
              "resource_type": ["xhr", "script"],
              "wait_for_requests_count": 3,
              "wait_for_requests_count_timeout": 5
          }
      ]
  )

  print(result)
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.extract({
    url: "https://www.example.com",
    render: true,
    network_capture: [
      {
        method: "GET",
        resource_type: ["xhr", "script"],
        wait_for_requests_count: 3,
        wait_for_requests_count_timeout: 5,
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
      "url": "https://www.example.com",
      "render": true,
      "network_capture": [
          {
              "method": "GET",
              "resource_type": ["xhr", "script"],
              "wait_for_requests_count": 3,
              "wait_for_requests_count_timeout": 5
          }
      ]
  }'
  ```
</CodeGroup>

<Note>
  This configuration will wait up to 5 seconds to capture at least 3 network
  requests matching the filter criteria.
</Note>

## XHR without rendering

For direct API endpoints that don't require page rendering, use `is_xhr` for better performance.

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.extract(
      url="https://api.example.com/endpoint",
      is_xhr=True,
  )

  print(result)
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.extract({
    url: "https://api.example.com/endpoint",
    is_xhr: true,
  });

  console.log(result);
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://api.example.com/endpoint",
      "is_xhr": true
  }'
  ```
</CodeGroup>

<Note>
  `is_xhr` only works when `render` is `false`. It sends XHR-specific headers
  and targets the API URL directly.
</Note>

## Example response

When browser actions complete successfully, you'll receive the final page state along with any data captured.

The response includes:

* **data**: All related extacted data
  * **data.html**: Final DOM state after all actions
  * **data.network\_capture**: The network capture response by order
* **metadata**: Execution details including task id, driver used, execution time and more

```json theme={"system"}
{
  "url": "https://www.example.com/",
  "task_id": "b1fa7943-cba5-4ec2-a88c-4d2d6799c794",
  "status": "success",
  "data": {
    "html": "<!DOCTYPE html><html>...</html>",
    "network_capture": [
      {
        "filter": {
          "method": "GET",
          "resource_type": ["xhr", "script"]
        },
        "result": [
          {
            "request": {
              "resource_type": "script",
              "method": "GET",
              "url": "https://www.example.com/script/0001.js",
              "headers": {}
            },
            "response": {
              "status": 200,
              "headers": {},
              "body": "..."
            }
          },
          {
            "request": {
              "resource_type": "xhr",
              "method": "GET",
              "url": "https://www.example.com/script/0002.js",
              "headers": {}
            },
            "response": {
              "status": 200,
              "headers": {},
              "body": "..."
            }
          }
        ]
      }
    ]
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

### Use specific URL patterns

**Be specific with URL matching:**

```python theme={"system"}
# ✅ Specific pattern for API endpoints
network_capture = [
    {
        "url": {
            "type": "contains",
            "value": "/api/v1/products"
        }
    }
]

# ❌ Too broad - captures everything
network_capture = [
    {
        "url": {
            "type": "contains",
            "value": "/"
        }
    }
]
```

### Filter by resource type

**Narrow down to relevant resources:**

```python theme={"system"}
# ✅ Capture only XHR and Fetch requests
network_capture = [
    {
        "resource_type": ["xhr", "fetch"]
    }
]

# ✅ Capture scripts and stylesheets
network_capture = [
    {
        "resource_type": ["script", "stylesheet"]
    }
]
```

### Set appropriate wait counts

**Use wait\_for\_requests\_count for dynamic content:**

```python theme={"system"}
# ✅ Wait for specific number of requests
network_capture = [
    {
        "method": "GET",
        "resource_type": ["xhr"],
        "wait_for_requests_count": 3,
        "wait_for_requests_count_timeout": 10
    }
]

# ❌ No wait - may miss delayed requests
network_capture = [
    {
        "method": "GET",
        "resource_type": ["xhr"]
    }
]
```

### Use XHR mode for direct API calls

**Skip rendering when accessing APIs directly:**

```python theme={"system"}
# ✅ Direct API access without rendering
result = nimble.extract({
    "url": "https://api.example.com/data",
    "is_xhr": True
})

# ❌ Unnecessary rendering for API endpoints
result = nimble.extract({
    "url": "https://api.example.com/data",
    "render": True,
    "network_capture": [...]
})
```
