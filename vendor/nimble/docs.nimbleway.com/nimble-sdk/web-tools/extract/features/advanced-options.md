> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Advanced Options

> Fine-tune extract requests with referrer policies, session control, device emulation, and more

Advanced options let you control how Nimble issues requests at a lower level. Use them to tune referrer behavior, accept specific response codes, switch protocols, persist sessions, tag requests, or emulate different device types.

## When to use

Use advanced options when you need to:

* **Control referrer behavior**: Set realistic referrers to bypass referrer-based gating
* **Accept non-200 responses**: Treat specific status codes as successful
* **Switch to HTTP/2**: Required by some modern sites for correct responses
* **Persist sessions**: Reuse the same browser session across requests
* **Tag requests**: Attach a label for tracking or analytics
* **Emulate devices**: Render pages as mobile or tablet instead of desktop

<Danger>
  These are advanced parameters. Misconfiguring them can cause requests to fail
  or trigger anti-bot detection.
</Danger>

## Parameters

<AccordionGroup>
  <Accordion title="referrer_type" icon="arrow-turn-down-left">
    <ParamField path="referrer_type" type="string">
      Referrer policy for the request. Nimble sends the chosen referrer header with the request to mimic real browsing behavior.

      **Generic policies:**

      * `random` - Use a randomly selected referrer
      * `no-referrer` - Do not send any referrer
      * `same-origin` - Use the target site's own origin as referrer

      **Search and social referrers:**

      * `google`, `bing` - Search engine referrers
      * `facebook`, `twitter`, `instagram` - Social platform referrers
    </ParamField>

    **Example:**

    ```json theme={"system"}
    "referrer_type": "google"
    ```
  </Accordion>

  <Accordion title="expected_status_codes" icon="list-check">
    <ParamField path="expected_status_codes" type="array">
      HTTP status codes that should be treated as successful. By default, only `200` is considered success. Use this to accept responses like `201` (Created), `204` (No Content), or `302` (Redirect).

      **Format:** Array of integers.
    </ParamField>

    **Example:**

    ```json theme={"system"}
    "expected_status_codes": [200, 201, 204]
    ```
  </Accordion>

  <Accordion title="http2" icon="arrows-up-down">
    <ParamField path="http2" default="false" type="boolean">
      Use HTTP/2 instead of HTTP/1.1 for the request. Some sites require HTTP/2 to return the expected response.
    </ParamField>

    **Example:**

    ```json theme={"system"}
    "http2": true
    ```
  </Accordion>

  <Accordion title="session" icon="clock-rotate-left">
    <ParamField path="session" type="object">
      Persist a browser session across multiple requests. Useful for maintaining login state, cookies, or navigation context between calls.

      **Fields:**

      * `id` (string) - Session identifier. Reuse the same ID across requests to share the session.
      * `timeout` (number) - Session timeout in seconds. Must be greater than 0.
      * `retry` (boolean, default `false`) - Retry the request within the same session on failure.
      * `prefetch_userbrowser` (boolean, default `false`) - Preload the user browser for faster subsequent requests.
    </ParamField>

    **Example:**

    ```json theme={"system"}
    "session": {
      "id": "my-session-123",
      "timeout": 300,
      "retry": true,
      "prefetch_userbrowser": true
    }
    ```
  </Accordion>

  <Accordion title="tag" icon="tag">
    <ParamField path="tag" type="string">
      User-defined label attached to the request. Use tags to group requests by campaign, workflow, or customer for tracking and analytics.
    </ParamField>

    **Example:**

    ```json theme={"system"}
    "tag": "campaign-2026-q2"
    ```
  </Accordion>

  <Accordion title="render_options" icon="sliders">
    <ParamField path="render_options" type="object">
      Fine-grained control over page rendering. Override defaults for wait strategy, timeouts, iframe handling, resource blocking, and retry behavior.

      **Fields:**

      * `render_type` (string) - Wait strategy before returning the response. Options: `load` (default), `domready`, `idle0`, `idle2`
      * `timeout` (number) - Maximum time in milliseconds to wait for the page to render.
      * `include_iframes` (boolean) - Include iframe content in the response.
      * `disabled_resources` (array) - Resource types to block from loading. Options include `image`, `stylesheet`, `font`, `media`, `script`, `xhr`, `fetch`, and others.
      * `blocked_domains` (array) - Domains to block from loading. Useful for filtering ads, trackers, or analytics.
      * `skip_network_capture_on_browser_actions_error` (boolean) - Stop network capture immediately if a browser action it depends on fails, instead of hanging until the timeout expires.
      * `retry_on_network_capture_error` (boolean) - Retry the full request if network capture fails, instead of returning a 200 with the capture marked as failed.
      * `retry_on_browser_actions_error` (boolean) - Retry the full request if a browser action fails, instead of returning success with a failed action.
    </ParamField>

    **Example:**

    ```json theme={"system"}
    "render_options": {
      "render_type": "idle2",
      "timeout": 30000,
      "include_iframes": true,
      "disabled_resources": ["image", "stylesheet"],
      "blocked_domains": ["ads.example.com", "tracker.com"],
      "retry_on_network_capture_error": true
    }
    ```
  </Accordion>

  <Accordion title="device" icon="mobile">
    <ParamField path="device" default="desktop" type="string">
      Device type for browser emulation. Affects viewport size, user agent, and rendering behavior.

      **Options:** `desktop` | `mobile` | `tablet`
    </ParamField>

    **Example:**

    ```json theme={"system"}
    "device": "mobile"
    ```
  </Accordion>
</AccordionGroup>

## Usage

### Set a referrer

Send a Google referrer to mimic search engine traffic.

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.extract(
      url="https://www.example.com",
      referrer_type="google"
  )

  print(result.data.html)
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.extract({
    url: "https://www.example.com",
    referrer_type: "google",
  });

  console.log(result.data.html);
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://www.example.com",
      "referrer_type": "google"
  }'
  ```

  ```bash CLI theme={"system"}
  nimble extract \
    --url "https://www.example.com" \
    --referrer-type google
  ```
</CodeGroup>

### Accept multiple status codes

Treat `200`, `201`, and `204` all as successful responses.

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.extract(
      url="https://api.example.com/created",
      expected_status_codes=[200, 201, 204]
  )

  print(result.status_code)
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.extract({
    url: "https://api.example.com/created",
    expected_status_codes: [200, 201, 204],
  });

  console.log(result.status_code);
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://api.example.com/created",
      "expected_status_codes": [200, 201, 204]
  }'
  ```

  ```bash CLI theme={"system"}
  nimble extract \
    --url "https://api.example.com/created" \
    --options '{"expected_status_codes": [200, 201, 204]}'
  ```
</CodeGroup>

### Force HTTP/2

Force the request to use HTTP/2 instead of HTTP/1.1.

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.extract(
      url="https://www.example.com",
      http2=True
  )

  print(result.data.html)
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.extract({
    url: "https://www.example.com",
    http2: true,
  });

  console.log(result.data.html);
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://www.example.com",
      "http2": true
  }'
  ```

  ```bash CLI theme={"system"}
  nimble extract \
    --url "https://www.example.com" \
    --http2 true
  ```
</CodeGroup>

### Persist a session

Reuse a browser session across multiple requests.

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.extract(
      url="https://www.example.com/product/123",
      session={
          "id": "shopping-session-abc",
          "timeout": 600,
          "retry": True
      }
  )

  print(result.data.html)
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.extract({
    url: "https://www.example.com/product/123",
    session: {
      id: "shopping-session-abc",
      timeout: 600,
      retry: true,
    },
  });

  console.log(result.data.html);
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://www.example.com/product/123",
      "session": {
        "id": "shopping-session-abc",
        "timeout": 600,
        "retry": true
      }
  }'
  ```

  ```bash CLI theme={"system"}
  nimble extract \
    --url "https://www.example.com/product/123" \
    --options '{"session": {"id": "shopping-session-abc", "timeout": 600, "retry": true}}'
  ```
</CodeGroup>

### Tag a request

Attach a label to the request for tracking.

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.extract(
      url="https://www.example.com",
      tag="campaign-2026-q2"
  )

  print(result.data.html)
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.extract({
    url: "https://www.example.com",
    tag: "campaign-2026-q2",
  });

  console.log(result.data.html);
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://www.example.com",
      "tag": "campaign-2026-q2"
  }'
  ```

  ```bash CLI theme={"system"}
  nimble extract \
    --url "https://www.example.com" \
    --tag "campaign-2026-q2"
  ```
</CodeGroup>

### Rendering Options

Fine-grained control over how Nimble renders a page before returning the response.

<AccordionGroup>
  <Accordion title="render_type —> Set a wait strategy" icon="hourglass">
    Controls when Nimble considers the page ready before returning the response. Choose based on how the target page loads.

    | Value                | When to use                                                                                                              |
    | -------------------- | ------------------------------------------------------------------------------------------------------------------------ |
    | `load` **(default)** | Waits for the load event — HTML, CSS, images, and all subresources have finished loading.                                |
    | `domready`           | Fires once the HTML is parsed and the DOM is built, without waiting for images or stylesheets. Fastest option.           |
    | `idle0`              | Waits until there are 0 in-flight network requests for at least 500ms. Most thorough, but slowest.                       |
    | `idle2`              | Waits until there are 2 or fewer in-flight network requests for at least 500ms. Good for pages with lazy-loaded content. |

    <CodeGroup>
      ```python Python theme={"system"}
      from nimble_python import Nimble

      nimble = Nimble(api_key="YOUR-API-KEY")

      result = nimble.extract(
          url="https://www.example.com",
          render_options={"render_type": "idle2"}
      )

      print(result.data.html)
      ```

      ```javascript Node theme={"system"}
      import Nimble from "@nimble-way/nimble-js";

      const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

      const result = await nimble.extract({
        url: "https://www.example.com",
        render_options: { render_type: "idle2" },
      });

      console.log(result.data.html);
      ```

      ```bash cURL theme={"system"}
      curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
      --header 'Authorization: Bearer <YOUR-API-KEY>' \
      --header 'Content-Type: application/json' \
      --data-raw '{"url": "https://www.example.com", "render_options": {"render_type": "idle2"}}'
      ```

      ```bash CLI theme={"system"}
      nimble extract \
        --url "https://www.example.com" \
        --render_options '{"render_type": "idle2"}'
      ```
    </CodeGroup>
  </Accordion>

  <Accordion title="timeout —> Limit render time" icon="clock">
    Sets the maximum milliseconds Nimble waits for the page to render before returning. Default is `30000` (30 seconds). Increase for slow or JS-heavy pages. Decrease to fail fast on unresponsive targets.

    <CodeGroup>
      ```python Python theme={"system"}
      from nimble_python import Nimble

      nimble = Nimble(api_key="YOUR-API-KEY")

      result = nimble.extract(
          url="https://www.example.com",
          render_options={"timeout": 60000}
      )

      print(result.data.html)
      ```

      ```javascript Node theme={"system"}
      import Nimble from "@nimble-way/nimble-js";

      const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

      const result = await nimble.extract({
        url: "https://www.example.com",
        render_options: { timeout: 60000 },
      });

      console.log(result.data.html);
      ```

      ```bash cURL theme={"system"}
      curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
      --header 'Authorization: Bearer <YOUR-API-KEY>' \
      --header 'Content-Type: application/json' \
      --data-raw '{"url": "https://www.example.com", "render_options": {"timeout": 60000}}'
      ```

      ```bash CLI theme={"system"}
      nimble extract \
        --url "https://www.example.com" \
        --render_options '{"timeout": 60000}'
      ```
    </CodeGroup>
  </Accordion>

  <Accordion title="include_iframes  —>  Capture iframe content" icon="window-restore">
    By default, iframe content is excluded from the response. Set to `true` when the data you need lives inside an embedded frame. Common on finance dashboards, media players, and widget-heavy pages.

    <CodeGroup>
      ```python Python theme={"system"}
      from nimble_python import Nimble

      nimble = Nimble(api_key="YOUR-API-KEY")

      result = nimble.extract(
          url="https://www.example.com",
          render_options={"include_iframes": True}
      )

      print(result.data.html)
      ```

      ```javascript Node theme={"system"}
      import Nimble from "@nimble-way/nimble-js";

      const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

      const result = await nimble.extract({
        url: "https://www.example.com",
        render_options: { include_iframes: true },
      });

      console.log(result.data.html);
      ```

      ```bash cURL theme={"system"}
      curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
      --header 'Authorization: Bearer <YOUR-API-KEY>' \
      --header 'Content-Type: application/json' \
      --data-raw '{"url": "https://www.example.com", "render_options": {"include_iframes": true}}'
      ```

      ```bash CLI theme={"system"}
      nimble extract \
        --url "https://www.example.com" \
        --render_options '{"include_iframes": true}'
      ```
    </CodeGroup>
  </Accordion>

  <Accordion title="disabled_resources —> Block resource types" icon="ban">
    Prevents specific resource types from loading. Reduces render time and bandwidth when you only need the HTML structure. Default is `["image", "font"]`. Available types: `image`, `stylesheet`, `font`, `media`, `script`, `xhr`, `fetch`.

    <Warning>Blocking `script` prevents JavaScript execution. Only use it on fully static pages.</Warning>

    <CodeGroup>
      ```python Python theme={"system"}
      from nimble_python import Nimble

      nimble = Nimble(api_key="YOUR-API-KEY")

      result = nimble.extract(
          url="https://www.example.com",
          render_options={"disabled_resources": ["image", "stylesheet", "font"]}
      )

      print(result.data.html)
      ```

      ```javascript Node theme={"system"}
      import Nimble from "@nimble-way/nimble-js";

      const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

      const result = await nimble.extract({
        url: "https://www.example.com",
        render_options: { disabled_resources: ["image", "stylesheet", "font"] },
      });

      console.log(result.data.html);
      ```

      ```bash cURL theme={"system"}
      curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
      --header 'Authorization: Bearer <YOUR-API-KEY>' \
      --header 'Content-Type: application/json' \
      --data-raw '{"url": "https://www.example.com", "render_options": {"disabled_resources": ["image", "stylesheet", "font"]}}'
      ```

      ```bash CLI theme={"system"}
      nimble extract \
        --url "https://www.example.com" \
        --render_options '{"disabled_resources": ["image", "stylesheet", "font"]}'
      ```
    </CodeGroup>
  </Accordion>

  <Accordion title="blocked_domains  —>  Block specific domains" icon="shield-halved">
    Blocks requests to specific third-party domains. Use to suppress ads, trackers, or analytics scripts that slow down rendering or interfere with the response.

    <CodeGroup>
      ```python Python theme={"system"}
      from nimble_python import Nimble

      nimble = Nimble(api_key="YOUR-API-KEY")

      result = nimble.extract(
          url="https://www.example.com",
          render_options={"blocked_domains": ["ads.example.com", "tracker.com"]}
      )

      print(result.data.html)
      ```

      ```javascript Node theme={"system"}
      import Nimble from "@nimble-way/nimble-js";

      const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

      const result = await nimble.extract({
        url: "https://www.example.com",
        render_options: { blocked_domains: ["ads.example.com", "tracker.com"] },
      });

      console.log(result.data.html);
      ```

      ```bash cURL theme={"system"}
      curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
      --header 'Authorization: Bearer <YOUR-API-KEY>' \
      --header 'Content-Type: application/json' \
      --data-raw '{"url": "https://www.example.com", "render_options": {"blocked_domains": ["ads.example.com", "tracker.com"]}}'
      ```

      ```bash CLI theme={"system"}
      nimble extract \
        --url "https://www.example.com" \
        --render_options '{"blocked_domains": ["ads.example.com", "tracker.com"]}'
      ```
    </CodeGroup>
  </Accordion>

  <Accordion title="skip_network_capture... —> Stop capture on action failure" icon="circle-stop">
    When a browser action fails, network capture keeps running until `timeout` expires. Setting this to `true` stops capture immediately on action failure, avoiding unnecessary delays.

    <Note>Only relevant when using `browser_actions` alongside `network_capture`.</Note>

    <CodeGroup>
      ```python Python theme={"system"}
      from nimble_python import Nimble

      nimble = Nimble(api_key="YOUR-API-KEY")

      result = nimble.extract(
          url="https://www.example.com",
          render=True,
          browser_actions=[
              {"click": {"selector": "button.load-more", "required": True}},
              {"wait": "2s"}
          ],
          network_capture=[
              {
                  "url": {"type": "contains", "value": "/api/data"},
                  "resource_type": ["xhr", "fetch"]
              }
          ],
          render_options={"skip_network_capture_on_browser_actions_error": True}
      )

      print(result.data.network_capture)
      ```

      ```javascript Node theme={"system"}
      import Nimble from "@nimble-way/nimble-js";

      const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

      const result = await nimble.extract({
        url: "https://www.example.com",
        render: true,
        browser_actions: [
          { click: { selector: "button.load-more", required: true } },
          { wait: "2s" },
        ],
        network_capture: [
          {
            url: { type: "contains", value: "/api/data" },
            resource_type: ["xhr", "fetch"],
          },
        ],
        render_options: { skip_network_capture_on_browser_actions_error: true },
      });

      console.log(result.data.network_capture);
      ```

      ```bash cURL theme={"system"}
      curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
      --header 'Authorization: Bearer <YOUR-API-KEY>' \
      --header 'Content-Type: application/json' \
      --data-raw '{
        "url": "https://www.example.com",
        "render": true,
        "browser_actions": [
          {"click": {"selector": "button.load-more", "required": true}},
          {"wait": "2s"}
        ],
        "network_capture": [
          {"url": {"type": "contains", "value": "/api/data"}, "resource_type": ["xhr", "fetch"]}
        ],
        "render_options": {"skip_network_capture_on_browser_actions_error": true}
      }'
      ```

      ```bash CLI theme={"system"}
      nimble extract \
        --url "https://www.example.com" \
        --render true \
        --browser_actions '[{"click": {"selector": "button.load-more", "required": true}}, {"wait": "2s"}]' \
        --network_capture '[{"url": {"type": "contains", "value": "/api/data"}, "resource_type": ["xhr", "fetch"]}]' \
        --render_options '{"skip_network_capture_on_browser_actions_error": true}'
      ```
    </CodeGroup>
  </Accordion>

  <Accordion title="retry_on_network_capture_error —> Retry on capture failure" icon="rotate-right">
    By default, if network capture fails, Nimble returns a `200` with the capture marked as failed. Set to `true` to retry the full request instead. Use when capture reliability is critical to your pipeline.

    <CodeGroup>
      ```python Python theme={"system"}
      from nimble_python import Nimble

      nimble = Nimble(api_key="YOUR-API-KEY")

      result = nimble.extract(
          url="https://www.example.com",
          render=True,
          network_capture=[
              {
                  "url": {"type": "contains", "value": "/api/data"},
                  "resource_type": ["xhr", "fetch"]
              }
          ],
          render_options={"retry_on_network_capture_error": True}
      )

      print(result.data.network_capture)
      ```

      ```javascript Node theme={"system"}
      import Nimble from "@nimble-way/nimble-js";

      const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

      const result = await nimble.extract({
        url: "https://www.example.com",
        render: true,
        network_capture: [
          {
            url: { type: "contains", value: "/api/data" },
            resource_type: ["xhr", "fetch"],
          },
        ],
        render_options: { retry_on_network_capture_error: true },
      });

      console.log(result.data.network_capture);
      ```

      ```bash cURL theme={"system"}
      curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
      --header 'Authorization: Bearer <YOUR-API-KEY>' \
      --header 'Content-Type: application/json' \
      --data-raw '{
        "url": "https://www.example.com",
        "render": true,
        "network_capture": [
          {"url": {"type": "contains", "value": "/api/data"}, "resource_type": ["xhr", "fetch"]}
        ],
        "render_options": {"retry_on_network_capture_error": true}
      }'
      ```

      ```bash CLI theme={"system"}
      nimble extract \
        --url "https://www.example.com" \
        --render true \
        --network_capture '[{"url": {"type": "contains", "value": "/api/data"}, "resource_type": ["xhr", "fetch"]}]' \
        --render_options '{"retry_on_network_capture_error": true}'
      ```
    </CodeGroup>
  </Accordion>

  <Accordion title="retry_on_browser_actions_error —> Retry on action failure" icon="arrow-rotate-left">
    By default, if a browser action fails, Nimble returns success with the failed action noted in the response. Set to `true` to retry the full request instead. Use when browser actions are required for the page to reach the correct state.

    <CodeGroup>
      ```python Python theme={"system"}
      from nimble_python import Nimble

      nimble = Nimble(api_key="YOUR-API-KEY")

      result = nimble.extract(
          url="https://www.example.com",
          render=True,
          browser_actions=[
              {"click": {"selector": "button.accept-cookies", "required": True}},
              {"wait_for_element": {"selector": ".main-content", "timeout": 5000}}
          ],
          render_options={"retry_on_browser_actions_error": True}
      )

      print(result.data.html)
      ```

      ```javascript Node theme={"system"}
      import Nimble from "@nimble-way/nimble-js";

      const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

      const result = await nimble.extract({
        url: "https://www.example.com",
        render: true,
        browser_actions: [
          { click: { selector: "button.accept-cookies", required: true } },
          { wait_for_element: { selector: ".main-content", timeout: 5000 } },
        ],
        render_options: { retry_on_browser_actions_error: true },
      });

      console.log(result.data.html);
      ```

      ```bash cURL theme={"system"}
      curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
      --header 'Authorization: Bearer <YOUR-API-KEY>' \
      --header 'Content-Type: application/json' \
      --data-raw '{
        "url": "https://www.example.com",
        "render": true,
        "browser_actions": [
          {"click": {"selector": "button.accept-cookies", "required": true}},
          {"wait_for_element": {"selector": ".main-content", "timeout": 5000}}
        ],
        "render_options": {"retry_on_browser_actions_error": true}
      }'
      ```

      ```bash CLI theme={"system"}
      nimble extract \
        --url "https://www.example.com" \
        --render true \
        --browser_actions '[{"click": {"selector": "button.accept-cookies", "required": true}}, {"wait_for_element": {"selector": ".main-content", "timeout": 5000}}]' \
        --render_options '{"retry_on_browser_actions_error": true}'
      ```
    </CodeGroup>
  </Accordion>
</AccordionGroup>

### Emulate a device

Render the page as a mobile device.

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.extract(
      url="https://www.example.com",
      device="mobile"
  )

  print(result.data.html)
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.extract({
    url: "https://www.example.com",
    device: "mobile",
  });

  console.log(result.data.html);
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://www.example.com",
      "device": "mobile"
  }'
  ```

  ```bash CLI theme={"system"}
  nimble extract \
    --url "https://www.example.com" \
    --device mobile
  ```
</CodeGroup>

## Related

<CardGroup cols={2}>
  <Card title="Custom Headers & Cookies" icon="cookie" href="/nimble-sdk/web-tools/extract/features/headers-and-cookies">
    Send custom request headers and cookies
  </Card>

  <Card title="Geo-Targeting" icon="location-dot" href="/nimble-sdk/web-tools/extract/features/geo-targeting">
    Route requests through specific countries, states, or cities
  </Card>

  <Card title="Stealth Mode" icon="user-secret" href="/nimble-sdk/web-tools/extract/features/stealth-mode">
    Bypass anti-bot detection with real user emulation
  </Card>

  <Card title="JS Rendering" icon="code" href="/nimble-sdk/web-tools/extract/features/js-rendering">
    Render JavaScript-heavy pages before extraction
  </Card>
</CardGroup>
