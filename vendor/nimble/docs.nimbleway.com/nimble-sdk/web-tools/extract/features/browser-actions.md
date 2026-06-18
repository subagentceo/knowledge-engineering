> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Browser Actions

> Full control over browser actions with predefined steps

**Browser Actions** gives you full control over the sequence of actions performed in the browser, ensuring predictable and repeatable results. You manually specify each step like click, scroll, wait, or type.

Common uses:

* **Load more content**: Click "Show more" buttons or scroll to reveal additional items.
* **Set filters**: Select dropdowns, checkboxes, or date ranges to refine displayed data.
* **Submit searches**: Enter search terms and submit forms to access results pages.
* **Trigger lazy-loaded data**: Scroll to load images, products, or infinite feeds.

## When to use

Use Browser Actions when you need:

* **Predictable execution**: Same steps run every time
* **Full control**: Specify exact actions and sequences
* **Fast performance**: No AI inference overhead

<Tip>
  Browser Action flows may break when page structure or selectors change.
  Monitor and update your flows as needed.
</Tip>

## Parameters

<AccordionGroup>
  <Accordion title="render - Required" icon="browser">
    <ParamField path="render" default="false" type="boolean" required>
      **`Must be set to true`** to use browser actions. This enables the browser to execute JavaScript and perform interactions.

      Browser actions only work when the page is rendered in a real browser environment.
    </ParamField>

    **Example:**

    ```json theme={"system"}
    "render": true
    ```
  </Accordion>

  <Accordion title="browser_actions" icon="list-check">
    <ParamField path="browser_actions" type="array">
      A list of actions to perform in sequence on the page. Each action is an object specifying what to do (click, scroll, wait, type, etc.).

      **Actions execute in order** - the second action waits for the first to complete, and so on.

      **Global timeout:** All actions must complete within 240 seconds total.

      **Available actions:**

      * `goto` - Navigate to a different URL
      * `wait` - Pause for a specified duration
      * `wait_for_element` - Wait for an element to appear
      * `click` - Click an element
      * `press` - Press a keyboard key (Enter, Tab, Escape, etc.)
      * `fill` - Type or paste text into an input field
      * `scroll` - Scroll the page by pixels or to an element
      * `auto_scroll` - Automatically scroll to load lazy content
      * `screenshot` - Capture a screenshot
      * `get_cookies` - Extract cookies from the page
      * `fetch` - Make HTTP requests from the browser context

      Each action has specific parameters detailed in the sections below.
    </ParamField>

    **Example:**

    ```json theme={"system"}
    "browser_actions": [
      {
        "fill": {
          "selector": "input[type='search']",
          "value": "laptops"
        }
      },
      {
        "click": {
          "selector": "button[type='submit']"
        }
      },
      {
        "wait": "2s"
      }
    ]
    ```
  </Accordion>
</AccordionGroup>

<Warning>
  All browser actions execute sequentially within a global **240-second
  timeout**. If any action fails, the entire flow stops unless marked as
  optional.
</Warning>

## Usage

<AccordionGroup>
  <Accordion title="Navigate to URL" icon="arrow-right">
    Navigate to a different URL during the browser session.

    **Parameters:**

    **Direct form** - Pass URL as a string:

    * `goto` (required) - URL to navigate to

    **Extended form** - Use object with options:

    * `url` (required) - URL to navigate to (string)
    * `timeout` (optional) - Maximum wait time in milliseconds (number, default: 30000)
    * `referer` (optional) - HTTP referer header to send (string)
    * `wait_until` (optional) - Navigation wait condition: `'load'` (default), `'domcontentloaded'`, `'networkidle'`, or `'commit'`

    <CodeGroup>
      ```python Python theme={"system"}
      from nimble_python import Nimble

      nimble = Nimble(api_key="YOUR-API-KEY")

      # Direct form - simple navigation
      result = nimble.extract(
          url= "https://www.example.com",
          render= True,
          browser_actions= [
              {
                  "goto": "https://www.example.com/products"  # Navigate to products page
              }
          ]
      )

      # Extended form - with wait condition
      result = nimble.extract(
          url= "https://www.example.com",
          render= True,
          browser_actions= [
              {
                  "goto": {
                      "url": "https://www.example.com/products",
                      "wait_until": "networkidle",
                      "timeout": 5000,
                      "referer": "https://www.google.com"
                  }
              }
          ]
      )

      print(result)
      ```

      ```javascript Node theme={"system"}
      import Nimble from '@nimble-way/nimble-js';

      const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

      // Direct form - simple navigation
      const result = await nimble.extract({
        url: "https://www.example.com",
        render: true,
        browser_actions: [
          {
            goto: "https://www.example.com/products"  // Navigate to products page
          }
        ]
      });

      // Extended form - with wait condition
      const result2 = await nimble.extract({
        url: "https://www.example.com",
        render: true,
        browser_actions: [
          {
            goto: {
              url: "https://www.example.com/products",
              wait_until: "networkidle",
              timeout: 5000,
              referer: "https://www.google.com"
            }
          }
        ]
      });

      console.log(result);
      ```

      ```bash cURL theme={"system"}
      # Direct form
      curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
      --header 'Authorization: Bearer <YOUR-API-KEY>' \
      --header 'Content-Type: application/json' \
      --data-raw '{
          "url": "https://www.example.com",
          "render": true,
          "browser_actions": [{
              "goto": "https://www.example.com/products"
          }]
      }'

      # Extended form
      curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
      --header 'Authorization: Bearer <YOUR-API-KEY>' \
      --header 'Content-Type: application/json' \
      --data-raw '{
          "url": "https://www.example.com",
          "render": true,
          "browser_actions": [{
              "goto": {
                  "url": "https://www.example.com/products",
                  "wait_until": "networkidle",
                  "timeout": 5000,
                  "referer": "https://www.google.com"
              }
          }]
      }'
      ```
    </CodeGroup>
  </Accordion>

  <Accordion title="Wait (delay)" icon="clock">
    Add a delay between actions to simulate human behavior or allow elements to load.

    **Parameters:**

    **Direct form** - Pass duration as a string:

    * `wait` (required) - Duration string (e.g., "2s", "500ms", "1.5s")

    **Extended form** - Use object with options:

    * `duration` (required) - Duration string (e.g., "2s", "500ms", "1.5s")
    * `required` (optional) - Set to `false` to make this step optional (boolean, default: `true`)

    <CodeGroup>
      ```python Python theme={"system"}
      from nimble_python import Nimble

      nimble = Nimble(api_key="YOUR-API-KEY")

      # Direct form - simple delay
      result = nimble.extract(
          url= "https://www.example.com",
          render= True,
          browser_actions= [
              {
                  "wait": "2s"  # Wait for 2 seconds
              }
          ]
      )

      # Extended form - with options
      result = nimble.extract(
          url= "https://www.example.com",
          render= True,
          browser_actions= [
              {
                  "wait": {
                      "duration": "500ms",
                      "required": False
                  }
              }
          ]
      )
      ```

      ```javascript Node theme={"system"}
      import Nimble from '@nimble-way/nimble-js';

      const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

      // Direct form - simple delay
      const result = await nimble.extract({
        url: "https://www.example.com",
        render: true,
        browser_actions: [
          {
            wait: "2s"  // Wait for 2 seconds
          }
        ]
      });

      // Extended form - with options
      const result2 = await nimble.extract({
        url: "https://www.example.com",
        render: true,
        browser_actions: [
          {
            wait: {
              duration: "500ms",
              required: false
            }
          }
        ]
      });
      ```

      ```bash cURL theme={"system"}
      # Direct form
      curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
      --header 'Authorization: Bearer <YOUR-API-KEY>' \
      --header 'Content-Type: application/json' \
      --data-raw '{
          "url": "https://www.example.com",
          "render": true,
          "browser_actions": [{
              "wait": "2s"
          }]
      }'

      # Extended form
      curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
      --header 'Authorization: Bearer <YOUR-API-KEY>' \
      --header 'Content-Type: application/json' \
      --data-raw '{
          "url": "https://www.example.com",
          "render": true,
          "browser_actions": [{
              "wait": {
                  "duration": "500ms",
                  "required": false
              }
          }]
      }'
      ```
    </CodeGroup>
  </Accordion>

  <Accordion title="Wait for selector" icon="hourglass">
    Wait for DOM elements to appear on the page.

    **Parameters:**

    **Direct form** - Pass single selector or array of selectors:

    * `wait_for_element` (required) - CSS selector string or array of selectors to wait for (any one matching triggers success)

    **Extended form** - Use object with options:

    * `selector` (required) - CSS selector string or array of selectors to wait for
    * `timeout` (optional) - Maximum time in milliseconds to wait (number, default: 30000)
    * `visible` (optional) - Whether element must be visible (boolean, default: `true`)

    <CodeGroup>
      ```python Python theme={"system"}
      from nimble_python import Nimble

      nimble = Nimble(api_key="YOUR-API-KEY")

      # Direct form - wait for single element
      result = nimble.extract(
          url= "https://www.example.com",
          render= True,
          browser_actions= [
              {
                  "wait_for_element": "#submit-button"
              }
          ]
      )

      # Direct form - wait for multiple elements
      result = nimble.extract(
          url= "https://www.example.com",
          render= True,
          browser_actions= [
              {
                  "wait_for_element": ["#element1", ".class2"]
              }
          ]
      )

      # Extended form - with options
      result = nimble.extract(
          url= "https://www.example.com",
          render= True,
          browser_actions= [
              {
                  "wait_for_element": {
                      "selector": "#element",
                      "timeout": 30000,
                      "visible": False
                  }
              }
          ]
      )

      print(result)
      ```

      ```javascript Node theme={"system"}
      import Nimble from '@nimble-way/nimble-js';

      const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

      // Direct form - wait for single element
      const result = await nimble.extract({
        url: "https://www.example.com",
        render: true,
        browser_actions: [
          {
            wait_for_element: "#submit-button"
          }
        ]
      });

      // Direct form - wait for multiple elements
      const result2 = await nimble.extract({
        url: "https://www.example.com",
        render: true,
        browser_actions: [
          {
            wait_for_element: ["#element1", ".class2"]
          }
        ]
      });

      // Extended form - with options
      const result3 = await nimble.extract({
        url: "https://www.example.com",
        render: true,
        browser_actions: [
          {
            wait_for_element: {
              selector: "#element",
              timeout: 30000,
              visible: false
            }
          }
        ]
      });

      console.log(result);
      ```

      ```bash cURL theme={"system"}
      # Direct form - single selector
      curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
      --header 'Authorization: Bearer <YOUR-API-KEY>' \
      --header 'Content-Type: application/json' \
      --data-raw '{
          "url": "https://www.example.com",
          "render": true,
          "browser_actions": [{
              "wait_for_element": "#submit-button"
          }]
      }'

      # Direct form - multiple selectors
      curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
      --header 'Authorization: Bearer <YOUR-API-KEY>' \
      --header 'Content-Type: application/json' \
      --data-raw '{
          "url": "https://www.example.com",
          "render": true,
          "browser_actions": [{
              "wait_for_element": ["#element1", ".class2"]
          }]
      }'

      # Extended form
      curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
      --header 'Authorization: Bearer <YOUR-API-KEY>' \
      --header 'Content-Type: application/json' \
      --data-raw '{
          "url": "https://www.example.com",
          "render": true,
          "browser_actions": [{
              "wait_for_element": {
                  "selector": "#element",
                  "timeout": 30000,
                  "visible": false
              }
          }]
      }'
      ```
    </CodeGroup>
  </Accordion>

  <Accordion title="Click" icon="hand-pointer">
    Click on an element by selector or at specific coordinates.

    **Parameters:**

    **Direct form** - Pass CSS selector as string:

    * `click` (required) - CSS selector string

    **Extended form (selector mode)** - Use object with selector options:

    * `selector` (required) - CSS selector of element to click (string)
    * `timeout` (optional) - Maximum time to wait for element (Duration string, default: "30s")
    * `visible` (optional) - Whether element must be visible (boolean, default: `true`)
    * `delay` (optional) - Delay before clicking (Duration string, default: "0ms")
    * `scroll` (optional) - Whether to scroll element into view (boolean, default: `true`)
    * `count` (optional) - Number of times to click (number, default: 1)
    * `steps` (optional) - Mouse movement steps for granular control (number, advanced)
    * `strategy` (optional) - Mouse movement strategy for behavioral simulation (advanced)
    * `required` (optional) - Set to `false` to make this step optional (boolean, default: `true`)

    **Extended form (coordinates mode)** - Click at specific coordinates:

    * `x` (required) - X coordinate (horizontal position, number)
    * `y` (required) - Y coordinate (vertical position, number)
    * `relative_to` (optional) - CSS selector to make coordinates relative to this element (string)
    * `timeout` (optional) - Maximum time for the click operation (Duration string, default: "15s")
    * `delay` (optional) - Delay before clicking (Duration string, default: "0ms")
    * `count` (optional) - Number of times to click (number, default: 1)
    * `steps` (optional) - Mouse movement steps for granular control (number, advanced)
    * `required` (optional) - Set to `false` to make this step optional (boolean, default: `true`)

    <CodeGroup>
      ```python Python theme={"system"}
      from nimble_python import Nimble

      nimble = Nimble(api_key="YOUR-API-KEY")

      # Direct form - simple click by selector
      result = nimble.extract(
          "url": "https://www.example.com",
          "render": True,
          "browser_actions": [
              {
                  "click": "button.submit"  # Click element matching selector
              }
          ]
      )

      # Extended form (selector mode) - with options
      result = nimble.extract(
          url= "https://www.example.com",
          render= True,
          browser_actions= [
              {
                  "click": {
                      "selector": "button.load-more",
                      "timeout": "20s",
                      "delay": "500ms",
                      "scroll": True,
                      "visible": True,
                      "count": 2  # Double-click
                  }
              }
          ]
      )

      # Extended form (coordinates mode) - click at specific position
      result = nimble.extract(
          url= "https://www.example.com",
          render= True,
          browser_actions= [
              {
                  "click": {
                      "x": 100,
                      "y": 200,
                      "delay": "300ms"
                  }
              }
          ]
      )

      # Coordinates relative to element
      result = nimble.extract(
          url= "https://www.example.com",
          render= True,
          browser_actions= [
              {
                  "click": {
                      "x": 10,
                      "y": 10,
                      "relative_to": "#container"  # Click 10px from top-left of container
                  }
              }
          ]
      )

      print(result)
      ```

      ```javascript Node theme={"system"}
      import Nimble from '@nimble-way/nimble-js';

      const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

      // Direct form - simple click by selector
      const result = await nimble.extract({
        url: "https://www.example.com",
        render: true,
        browser_actions: [
          {
            click: "button.submit"  // Click element matching selector
          }
        ]
      });

      // Extended form (selector mode) - with options
      const result2 = await nimble.extract({
        url: "https://www.example.com",
        render: true,
        browser_actions: [
          {
            click: {
              selector: "button.load-more",
              timeout: "20s",
              delay: "500ms",
              scroll: true,
              visible: true,
              count: 2  // Double-click
            }
          }
        ]
      });

      // Extended form (coordinates mode) - click at specific position
      const result3 = await nimble.extract({
        url: "https://www.example.com",
        render: true,
        browser_actions: [
          {
            click: {
              x: 100,
              y: 200,
              delay: "300ms"
            }
          }
        ]
      });

      // Coordinates relative to element
      const result4 = await nimble.extract({
        url: "https://www.example.com",
        render: true,
        browser_actions: [
          {
            click: {
              x: 10,
              y: 10,
              relative_to: "#container"  // Click 10px from top-left of container
            }
          }
        ]
      });

      console.log(result);
      ```

      ```bash cURL theme={"system"}
      # Direct form - simple click by selector
      curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
      --header 'Authorization: Bearer <YOUR-API-KEY>' \
      --header 'Content-Type: application/json' \
      --data-raw '{
          "url": "https://www.example.com",
          "render": true,
          "browser_actions": [{
              "click": "button.submit"
          }]
      }'

      # Extended form (selector mode) - with options
      curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
      --header 'Authorization: Bearer <YOUR-API-KEY>' \
      --header 'Content-Type: application/json' \
      --data-raw '{
          "url": "https://www.example.com",
          "render": true,
          "browser_actions": [{
              "click": {
                  "selector": "button.load-more",
                  "timeout": "20s",
                  "delay": "500ms",
                  "scroll": true,
                  "visible": true,
                  "count": 2
              }
          }]
      }'

      # Extended form (coordinates mode) - click at specific position
      curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
      --header 'Authorization: Bearer <YOUR-API-KEY>' \
      --header 'Content-Type: application/json' \
      --data-raw '{
          "url": "https://www.example.com",
          "render": true,
          "browser_actions": [{
              "click": {
                  "x": 100,
                  "y": 200,
                  "delay": "300ms"
              }
          }]
      }'

      # Coordinates relative to element
      curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
      --header 'Authorization: Bearer <YOUR-API-KEY>' \
      --header 'Content-Type: application/json' \
      --data-raw '{
          "url": "https://www.example.com",
          "render": true,
          "browser_actions": [{
              "click": {
                  "x": 10,
                  "y": 10,
                  "relative_to": "#container"
              }
          }]
      }'
      ```
    </CodeGroup>
  </Accordion>

  <Accordion title="Press" icon="keyboard">
    Press a keyboard key like Enter, Tab, Escape, or arrow keys.

    **Parameters:**

    **Direct form** - Pass key name as a string:

    * `press` (required) - Key name to press (e.g., "Enter", "Tab", "Escape", "ArrowDown")

    **Extended form** - Use object with options:

    * `key` (required) - Key name to press (string)
    * `delay` (optional) - Delay in milliseconds before pressing (number, default: 0)

    <CodeGroup>
      ```python Python theme={"system"}
      from nimble_python import Nimble

      nimble = Nimble(api_key="YOUR-API-KEY")

      # Direct form - press Enter key
      result = nimble.extract(
          url= "https://www.example.com",
          render= True,
          browser_actions= [
              {
                  "press": "Enter"  # Press Enter key
              }
          ]
      )

      # Extended form - press with delay
      result = nimble.extract(
          url= "https://www.example.com",
          render= True,
          browser_actions= [
              {
                  "press": {
                      "key": "Tab",
                      "delay": 500
                  }
              }
          ]
      )

      print(result)
      ```

      ```javascript Node theme={"system"}
      import Nimble from '@nimble-way/nimble-js';

      const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

      // Direct form - press Enter key
      const result = await nimble.extract({
        url: "https://www.example.com",
        render: true,
        browser_actions: [
          {
            press: "Enter"  // Press Enter key
          }
        ]
      });

      // Extended form - press with delay
      const result2 = await nimble.extract({
        url: "https://www.example.com",
        render: true,
        browser_actions: [
          {
            press: {
              key: "Tab",
              delay: 500
            }
          }
        ]
      });

      console.log(result);
      ```

      ```bash cURL theme={"system"}
      # Direct form
      curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
      --header 'Authorization: Bearer <YOUR-API-KEY>' \
      --header 'Content-Type: application/json' \
      --data-raw '{
          "url": "https://www.example.com",
          "render": true,
          "browser_actions": [{
              "press": "Enter"
          }]
      }'

      # Extended form
      curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
      --header 'Authorization: Bearer <YOUR-API-KEY>' \
      --header 'Content-Type: application/json' \
      --data-raw '{
          "url": "https://www.example.com",
          "render": true,
          "browser_actions": [{
              "press": {
                  "key": "Tab",
                  "delay": 500
              }
          }]
      }'
      ```
    </CodeGroup>
  </Accordion>

  <Accordion title="Fill" icon="pen">
    Fill an input field with text. Supports both typing (character-by-character) and pasting (instant) modes.

    **Parameters:**

    **Extended form only** - No direct form available:

    * `selector` (required) - CSS selector of the input element (string)
    * `value` (required) - Text value to fill (string)
    * `mode` (optional) - Fill mode: `'type'` for character-by-character (default), `'paste'` for instant (string)
    * `timeout` (optional) - Maximum time to wait for element in milliseconds (number, default: 30000)
    * `typing_interval` (optional) - Interval between keystrokes in milliseconds when typing (number, default: 100, min: 10, max: 1000)
    * `click_on_element` (optional) - Whether to click on element to focus it (boolean, default: `true`)
    * `scroll` (optional) - Whether to scroll element into view (boolean, default: `true`)
    * `visible` (optional) - Whether element must be visible (boolean, default: `true`)
    * `delay` (optional) - Delay in milliseconds before filling (number, default: 0)
    * `mouse_movement_strategy` (optional) - Mouse movement strategy for behavioral simulation (advanced)
    * `typing_strategy` (optional) - Typing strategy for behavioral simulation (advanced)
    * `required` (optional) - Set to `false` to make this step optional (boolean, default: `true`)

    <CodeGroup>
      ```python Python theme={"system"}
      from nimble_python import Nimble

      nimble = Nimble(api_key="YOUR-API-KEY")

      # Type mode (default, character-by-character)
      result = nimble.extract(
          url= "https://www.example.com",
          render= True,
          browser_actions= [
              {
                  "fill": {
                      "selector": "input[name='search']",
                      "value": "eggplant",
                      "mode": "type",  # Default mode
                      "typing_interval": 100,  # 100ms between keystrokes
                      "click_on_element": True,
                      "scroll": True
                  }
              }
          ]
      )

      # Paste mode (instant, faster)
      result = nimble.extract(
          url= "https://www.example.com",
          render= True,
          browser_actions= [
              {
                  "fill": {
                      "selector": "textarea",
                      "value": "Long text content...",
                      "mode": "paste",  # Instant paste
                      "timeout": 30000
                  }
              }
          ]
      )

      # Fill with options
      result = nimble.extract(
          url= "https://www.example.com",
          render= True,
          browser_actions= [
              {
                  "fill": {
                      "selector": "input",
                      "value": "text",
                      "scroll": True,
                      "delay": 500,
                      "typing_interval": 150,
                      "visible": True
                  }
              }
          ]
      )

      print(result)
      ```

      ```javascript Node theme={"system"}
      import Nimble from '@nimble-way/nimble-js';

      const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

      // Type mode (default, character-by-character)
      const result = await nimble.extract({
        url: "https://www.example.com",
        render: true,
        browser_actions: [
          {
            fill: {
              selector: "input[name='search']",
              value: "eggplant",
              mode: "type",  // Default mode
              typing_interval: 100,  // 100ms between keystrokes
              click_on_element: true,
              scroll: true
            }
          }
        ]
      });

      // Paste mode (instant, faster)
      const result2 = await nimble.extract({
        url: "https://www.example.com",
        render: true,
        browser_actions: [
          {
            fill: {
              selector: "textarea",
              value: "Long text content...",
              mode: "paste",  // Instant paste
              timeout: 30000
            }
          }
        ]
      });

      // Fill with options
      const result3 = await nimble.extract({
        url: "https://www.example.com",
        render: true,
        browser_actions: [
          {
            fill: {
              selector: "input",
              value: "text",
              scroll: true,
              delay: 500,
              typing_interval: 150,
              visible: true
            }
          }
        ]
      });

      console.log(result);
      ```

      ```bash cURL theme={"system"}
      # Type mode (default)
      curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
      --header 'Authorization: Bearer <YOUR-API-KEY>' \
      --header 'Content-Type: application/json' \
      --data-raw '{
          "url": "https://www.example.com",
          "render": true,
          "browser_actions": [{
              "fill": {
                  "selector": "input[name='\''search'\'']",
                  "value": "eggplant",
                  "mode": "type",
                  "typing_interval": 100,
                  "click_on_element": true,
                  "scroll": true
              }
          }]
      }'

      # Paste mode
      curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
      --header 'Authorization: Bearer <YOUR-API-KEY>' \
      --header 'Content-Type: application/json' \
      --data-raw '{
          "url": "https://www.example.com",
          "render": true,
          "browser_actions": [{
              "fill": {
                  "selector": "textarea",
                  "value": "Long text content...",
                  "mode": "paste",
                  "timeout": 30000
              }
          }]
      }'

      # Fill with options
      curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
      --header 'Authorization: Bearer <YOUR-API-KEY>' \
      --header 'Content-Type: application/json' \
      --data-raw '{
          "url": "https://www.example.com",
          "render": true,
          "browser_actions": [{
              "fill": {
                  "selector": "input",
                  "value": "text",
                  "scroll": true,
                  "delay": 500,
                  "typing_interval": 150,
                  "visible": true
              }
          }]
      }'
      ```
    </CodeGroup>
  </Accordion>

  <Accordion title="Scroll" icon="arrows-up-down">
    Scroll the page by pixels, to a position, or to an element.

    **Parameters:**

    **Direct form** - Pass number or string:

    * `scroll: 500` - Scroll Y pixels (number, positive = down, negative = up)
    * `scroll: "bottom"` - Scroll to bottom of page (string)
    * `scroll: "#comments"` - Scroll to element matching selector (string)

    **Extended form** - Use object with options:

    * `y` (optional) - Vertical scroll distance in pixels (number, default: 0)
    * `x` (optional) - Horizontal scroll distance in pixels (number, default: 0)
    * `to` (optional) - CSS selector to scroll to (string, alternative to x/y)
    * `container` (optional) - CSS selector of container element to scroll within (string)
    * `visible` (optional) - Whether element must be visible when scrolling to it (boolean, default: `true`)
    * `required` (optional) - Set to `false` to make this step optional (boolean, default: `true`)

    <CodeGroup>
      ```python Python theme={"system"}
      from nimble_python import Nimble

      nimble = Nimble(api_key="YOUR-API-KEY")

      # Direct form - scroll down 500px
      result = nimble.extract(
          url= "https://www.example.com",
          render= True,
          browser_actions= [
              {
                  "scroll": 500  # Scroll down 500 pixels
              }
          ]
      )

      # Direct form - scroll up 200px
      result = nimble.extract(
          url= "https://www.example.com",
          render= True,
          browser_actions= [
              {
                  "scroll": -200  # Scroll up 200 pixels
              }
          ]
      )

      # Direct form - scroll to bottom
      result = nimble.extract(
          url= "https://www.example.com",
          render= True,
          browser_actions= [
              {
                  "scroll": "bottom"  # Scroll to page bottom
              }
          ]
      )

      # Direct form - scroll to element
      result = nimble.extract(
          url= "https://www.example.com",
          render= True,
          browser_actions= [
              {
                  "scroll": "#comments"  # Scroll to comments section
              }
          ]
      )

      # Extended form - scroll by pixels
      result = nimble.extract(
          url= "https://www.example.com",
          render= True,
          browser_actions= [
              {
                  "scroll": {
                      "x": 100,
                      "y": 500
                  }
              }
          ]
      )

      # Extended form - scroll to element in container
      result = nimble.extract(
          url= "https://www.example.com",
          render= True,
          browser_actions= [
              {
                  "scroll": {
                      "to": "#target",
                      "container": "#modal",
                      "visible": True
                  }
              }
          ]
      )

      print(result)
      ```

      ```javascript Node theme={"system"}
      import Nimble from '@nimble-way/nimble-js';

      const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

      // Direct form - scroll down 500px
      const result = await nimble.extract({
        url: "https://www.example.com",
        render: true,
        browser_actions: [
          {
            scroll: 500  // Scroll down 500 pixels
          }
        ]
      });

      // Direct form - scroll up 200px
      const result2 = await nimble.extract({
        url: "https://www.example.com",
        render: true,
        browser_actions: [
          {
            scroll: -200  // Scroll up 200 pixels
          }
        ]
      });

      // Direct form - scroll to bottom
      const result3 = await nimble.extract({
        url: "https://www.example.com",
        render: true,
        browser_actions: [
          {
            scroll: "bottom"  // Scroll to page bottom
          }
        ]
      });

      // Direct form - scroll to element
      const result4 = await nimble.extract({
        url: "https://www.example.com",
        render: true,
        browser_actions: [
          {
            scroll: "#comments"  // Scroll to comments section
          }
        ]
      });

      // Extended form - scroll by pixels
      const result5 = await nimble.extract({
        url: "https://www.example.com",
        render: true,
        browser_actions: [
          {
            scroll: {
              x: 100,
              y: 500
            }
          }
        ]
      });

      // Extended form - scroll to element in container
      const result6 = await nimble.extract({
        url: "https://www.example.com",
        render: true,
        browser_actions: [
          {
            scroll: {
              to: "#target",
              container: "#modal",
              visible: true
            }
          }
        ]
      });

      console.log(result);
      ```

      ```bash cURL theme={"system"}
      # Direct form - scroll down 500px
      curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
      --header 'Authorization: Bearer <YOUR-API-KEY>' \
      --header 'Content-Type: application/json' \
      --data-raw '{
          "url": "https://www.example.com",
          "render": true,
          "browser_actions": [{
              "scroll": 500
          }]
      }'

      # Direct form - scroll up 200px
      curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
      --header 'Authorization: Bearer <YOUR-API-KEY>' \
      --header 'Content-Type: application/json' \
      --data-raw '{
          "url": "https://www.example.com",
          "render": true,
          "browser_actions": [{
              "scroll": -200
          }]
      }'

      # Direct form - scroll to bottom
      curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
      --header 'Authorization: Bearer <YOUR-API-KEY>' \
      --header 'Content-Type: application/json' \
      --data-raw '{
          "url": "https://www.example.com",
          "render": true,
          "browser_actions": [{
              "scroll": "bottom"
          }]
      }'

      # Direct form - scroll to element
      curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
      --header 'Authorization: Bearer <YOUR-API-KEY>' \
      --header 'Content-Type: application/json' \
      --data-raw '{
          "url": "https://www.example.com",
          "render": true,
          "browser_actions": [{
              "scroll": "#comments"
          }]
      }'

      # Extended form - scroll by pixels
      curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
      --header 'Authorization: Bearer <YOUR-API-KEY>' \
      --header 'Content-Type: application/json' \
      --data-raw '{
          "url": "https://www.example.com",
          "render": true,
          "browser_actions": [{
              "scroll": {
                  "x": 100,
                  "y": 500
              }
          }]
      }'

      # Extended form - scroll to element in container
      curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
      --header 'Authorization: Bearer <YOUR-API-KEY>' \
      --header 'Content-Type: application/json' \
      --data-raw '{
          "url": "https://www.example.com",
          "render": true,
          "browser_actions": [{
              "scroll": {
                  "to": "#target",
                  "container": "#modal",
                  "visible": true
              }
          }]
      }'
      ```
    </CodeGroup>
  </Accordion>

  <Accordion title="Auto scroll" icon="scroll">
    Automatically scroll the page to load dynamic content (infinite scroll). Continuously scrolls until content stops loading or timeout is reached.

    **Parameters:**

    **Direct form** - Pass boolean or number:

    * `auto_scroll: true` - Use default settings
    * `auto_scroll: 30000` - Max duration in milliseconds

    **Extended form** - Use object with options:

    * `max_duration` (optional) - Maximum duration in milliseconds to scroll (number, default: 25000)
    * `delay_after_scroll` (optional) - Delay in milliseconds between scroll steps (number, default: 200)
    * `step_size` (optional) - Pixels to scroll per step (number, defaults to viewport height)
    * `click_selector` (optional) - CSS selector to click before scrolling (string, e.g., "Load More" button)
    * `container` (optional) - CSS selector of container element to scroll within (string)
    * `idle_timeout` (optional) - Stop scrolling after this many milliseconds of no new content (number, default: 7000)
    * `pause_on_selector` (optional) - Pause scrolling if this selector appears above the cursor position (string)
    * `required` (optional) - Set to `false` to make this step optional (boolean, default: `true`)

    <CodeGroup>
      ```python Python theme={"system"}
      from nimble_python import Nimble

      nimble = Nimble(api_key="YOUR-API-KEY")

      # Direct form - boolean (use defaults)
      result = nimble.extract(
          url= "https://www.example.com",
          render= True,
          browser_actions= [
              {
                  "auto_scroll": True  # Auto scroll with default settings
              }
          ]
      )

      # Direct form - number (max duration)
      result = nimble.extract(
          url= "https://www.example.com",
          render= True,
          browser_actions= [
              {
                  "auto_scroll": 30000  # Auto scroll for max 30 seconds
              }
          ]
      )

      # Extended form - with options
      result = nimble.extract(
          url= "https://www.example.com",
          render= True,
          browser_actions= [
              {
                  "auto_scroll": {
                      "max_duration": 30000,
                      "container": "#feed",
                      "click_selector": ".load-more",
                      "delay_after_scroll": 500,
                      "idle_timeout": 7000
                  }
              }
          ]
      )

      print(result)
      ```

      ```javascript Node theme={"system"}
      import Nimble from '@nimble-way/nimble-js';

      const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

      // Direct form - boolean (use defaults)
      const result = await nimble.extract({
        url: "https://www.example.com",
        render: true,
        browser_actions: [
          {
            auto_scroll: true  // Auto scroll with default settings
          }
        ]
      });

      // Direct form - number (max duration)
      const result2 = await nimble.extract({
        url: "https://www.example.com",
        render: true,
        browser_actions: [
          {
            auto_scroll: 30000  // Auto scroll for max 30 seconds
          }
        ]
      });

      // Extended form - with options
      const result3 = await nimble.extract({
        url: "https://www.example.com",
        render: true,
        browser_actions: [
          {
            auto_scroll: {
              max_duration: 30000,
              container: "#feed",
              click_selector: ".load-more",
              delay_after_scroll: 500,
              idle_timeout: 7000
            }
          }
        ]
      });

      console.log(result);
      ```

      ```bash cURL theme={"system"}
      # Direct form - boolean
      curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
      --header 'Authorization: Bearer <YOUR-API-KEY>' \
      --header 'Content-Type: application/json' \
      --data-raw '{
          "url": "https://www.example.com",
          "render": true,
          "browser_actions": [{
              "auto_scroll": true
          }]
      }'

      # Direct form - number
      curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
      --header 'Authorization: Bearer <YOUR-API-KEY>' \
      --header 'Content-Type: application/json' \
      --data-raw '{
          "url": "https://www.example.com",
          "render": true,
          "browser_actions": [{
              "auto_scroll": 30000
          }]
      }'

      # Extended form - with options
      curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
      --header 'Authorization: Bearer <YOUR-API-KEY>' \
      --header 'Content-Type: application/json' \
      --data-raw '{
          "url": "https://www.example.com",
          "render": true,
          "browser_actions": [{
              "auto_scroll": {
                  "max_duration": 30000,
                  "container": "#feed",
                  "click_selector": ".load-more",
                  "delay_after_scroll": 500,
                  "idle_timeout": 7000
              }
          }]
      }'
      ```
    </CodeGroup>

    <Note>
      Auto scroll continuously scrolls the page until `idle_timeout` milliseconds pass with no new content appearing, or until `max_duration` is reached. Use `click_selector` to handle "Load More" buttons.
    </Note>
  </Accordion>

  <Accordion title="Capture screenshot" icon="camera">
    Capture a screenshot of the page and return as base64-encoded image.

    **Parameters:**

    **Direct form** - Pass boolean to capture full page screenshot:

    * `screenshot` (required) - Set to `true` to capture full page PNG screenshot

    **Extended form** - Use object with options:

    * `full_page` (optional) - Capture full scrollable page (boolean, default: `true`)
    * `format` (optional) - Image format: `'png'` (default), `'jpeg'`, or `'webp'`
    * `quality` (optional) - Image quality for jpeg/webp (number, 0-100, default: 90)

    <CodeGroup>
      ```python Python theme={"system"}
      from nimble_python import Nimble

      nimble = Nimble(api_key="YOUR-API-KEY")

      # Direct form - full page PNG screenshot
      result = nimble.extract(
          url= "https://www.example.com",
          render= True,
          browser_actions= [
              {
                  "screenshot": True
              }
          ]
      )

      # Extended form - with options
      result = nimble.extract(
          url= "https://www.example.com",
          render= True,
          browser_actions= [
              {
                  "screenshot": {
                      "full_page": False,
                      "format": "jpeg",
                      "quality": 90
                  }
              }
          ]
      )

      print(result)
      ```

      ```javascript Node theme={"system"}
      import Nimble from '@nimble-way/nimble-js';

      const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

      // Direct form - full page PNG screenshot
      const result = await nimble.extract({
        url: "https://www.example.com",
        render: true,
        browser_actions: [
          {
            screenshot: true
          }
        ]
      });

      // Extended form - with options
      const result2 = await nimble.extract({
        url: "https://www.example.com",
        render: true,
        browser_actions: [
          {
            screenshot: {
              full_page: false,
              format: "jpeg",
              quality: 90
            }
          }
        ]
      });

      console.log(result);
      ```

      ```bash cURL theme={"system"}
      # Direct form
      curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
      --header 'Authorization: Bearer <YOUR-API-KEY>' \
      --header 'Content-Type: application/json' \
      --data-raw '{
          "url": "https://www.example.com",
          "render": true,
          "browser_actions": [{
              "screenshot": true
          }]
      }'

      # Extended form
      curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
      --header 'Authorization: Bearer <YOUR-API-KEY>' \
      --header 'Content-Type: application/json' \
      --data-raw '{
          "url": "https://www.example.com",
          "render": true,
          "browser_actions": [{
              "screenshot": {
                  "full_page": false,
                  "format": "jpeg",
                  "quality": 90
              }
          }]
      }'
      ```
    </CodeGroup>
  </Accordion>

  <Accordion title="Collect cookies" icon="cookie">
    Retrieve all cookies set in the browser for the current page.

    **Parameters:**

    **Direct form** - Pass boolean to get all cookies:

    * `get_cookies` (required) - Set to `true` to retrieve all cookies

    **Extended form** - Use object with options:

    * `domain` (optional) - Domain filter for cookies (string, e.g., ".example.com")

    <CodeGroup>
      ```python Python theme={"system"}
      from nimble_python import Nimble

      nimble = Nimble(api_key="YOUR-API-KEY")

      # Direct form - get all cookies
      result = nimble.extract(
          url= "https://www.example.com",
          render= True,
          browser_actions= [
              {
                  "get_cookies": True
              }
          ]
      )

      # Extended form - with domain filter
      result = nimble.extract(
          url= "https://www.example.com",
          render= True,
          browser_actions= [
              {
                  "get_cookies": {
                      "domain": ".example.com"
                  }
              }
          ]
      )

      print(result)
      ```

      ```javascript Node theme={"system"}
      import Nimble from '@nimble-way/nimble-js';

      const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

      // Direct form - get all cookies
      const result = await nimble.extract({
        url: "https://www.example.com",
        render: true,
        browser_actions: [
          {
            get_cookies: true
          }
        ]
      });

      // Extended form - with domain filter
      const result2 = await nimble.extract({
        url: "https://www.example.com",
        render: true,
        browser_actions: [
          {
            get_cookies: {
              domain: ".example.com"
            }
          }
        ]
      });

      console.log(result);
      ```

      ```bash cURL theme={"system"}
      # Direct form
      curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
      --header 'Authorization: Bearer <YOUR-API-KEY>' \
      --header 'Content-Type: application/json' \
      --data-raw '{
          "url": "https://www.example.com",
          "render": true,
          "browser_actions": [{
              "get_cookies": true
          }]
      }'

      # Extended form
      curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
      --header 'Authorization: Bearer <YOUR-API-KEY>' \
      --header 'Content-Type: application/json' \
      --data-raw '{
          "url": "https://www.example.com",
          "render": true,
          "browser_actions": [{
              "get_cookies": {
                  "domain": ".example.com"
              }
          }]
      }'
      ```
    </CodeGroup>
  </Accordion>

  <Accordion title="Execute HTTP requests" icon="globe">
    Make HTTP requests from the browser context and return the response.

    **Parameters:**

    **Direct form** - Pass URL as a string:

    * `fetch` (required) - URL for the HTTP request (GET method)

    **Extended form** - Use object with options:

    * `url` (required) - URL to request (string)
    * `method` (optional) - HTTP method: `'GET'` (default), `'POST'`, `'PUT'`, `'DELETE'`, `'PATCH'`, etc.
    * `headers` (optional) - HTTP headers to send as key-value object
    * `body` (optional) - Request body as string (for POST, PUT, PATCH)
    * `timeout` (optional) - Maximum time in milliseconds to wait for response (number, default: 15000)

    <CodeGroup>
      ```python Python theme={"system"}
      from nimble_python import Nimble

      nimble = Nimble(api_key="YOUR-API-KEY")

      # Direct form - simple GET request
      result = nimble.extract(
          url= "https://www.example.com",
          render= True,
          browser_actions= [
              {
                  "fetch": "https://api.example.com/data"  # Simple GET request
              }
          ]
      )

      # Extended form - POST with headers and body
      result = nimble.extract(
          url= "https://www.example.com",
          render= True,
          browser_actions= [
              {
                  "fetch": {
                      "url": "https://api.example.com/submit",
                      "method": "POST",
                      "headers": {
                          "Content-Type": "application/json"
                      },
                      "body": '{"key": "value"}',
                      "timeout": 15000
                  }
              }
          ]
      )

      print(result)
      ```

      ```javascript Node theme={"system"}
      import Nimble from '@nimble-way/nimble-js';

      const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

      // Direct form - simple GET request
      const result = await nimble.extract({
        url: "https://www.example.com",
        render: true,
        browser_actions: [
          {
            fetch: "https://api.example.com/data"  // Simple GET request
          }
        ]
      });

      // Extended form - POST with headers and body
      const result2 = await nimble.extract({
        url: "https://www.example.com",
        render: true,
        browser_actions: [
          {
            fetch: {
              url: "https://api.example.com/submit",
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: '{"key": "value"}',
              timeout: 15000
            }
          }
        ]
      });

      console.log(result);
      ```

      ```bash cURL theme={"system"}
      # Direct form
      curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
      --header 'Authorization: Bearer <YOUR-API-KEY>' \
      --header 'Content-Type: application/json' \
      --data-raw '{
          "url": "https://www.example.com",
          "render": true,
          "browser_actions": [{
              "fetch": "https://api.example.com/data"
          }]
      }'

      # Extended form
      curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
      --header 'Authorization: Bearer <YOUR-API-KEY>' \
      --header 'Content-Type: application/json' \
      --data-raw '{
          "url": "https://www.example.com",
          "render": true,
          "browser_actions": [{
              "fetch": {
                  "url": "https://api.example.com/submit",
                  "method": "POST",
                  "headers": {
                      "Content-Type": "application/json"
                  },
                  "body": "{\"key\": \"value\"}",
                  "timeout": 15000
              }
          }]
      }'
      ```
    </CodeGroup>

    <Note>
      The first `fetch` in a `browser_actions` is free. Starting from the second request, each additional `fetch` is billed as a VX6 request.
    </Note>
  </Accordion>

  <Accordion title="Chaining actions" icon="link">
    You can chain multiple actions together in the `browser_actions` array. They execute sequentially.

    <CodeGroup>
      ```python Python theme={"system"}
      from nimble_python import Nimble

      nimble = Nimble(api_key="YOUR-API-KEY")

      result = nimble.extract(
          url= "https://www.example.com",
          render= True,
          browser_actions= [
              {
                  "fill": {
                      "selectors": ["input[type='search']"],
                      "text": "laptop"
                  }
              },
              {
                  "wait": "1s"
              },
              {
                  "click": {
                      "selectors": ["button[type='submit']"]
                  }
              },
              {
                  "wait_for_element": {
                      "selector": ".results",
                      "timeout": 5000
                  }
              }
          ]
      )

      print(result)
      ```

      ```javascript Node theme={"system"}
      import Nimble from '@nimble-way/nimble-js';

      const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

      const result = await nimble.extract({
        url: "https://www.example.com",
        render: true,
        browser_actions: [
          {
            fill: {
              selectors: ["input[type='search']"],
              text: "laptop"
            }
          },
          {
            wait: "1s"
          },
          {
            click: {
              selectors: ["button[type='submit']"]
            }
          },
          {
            wait_for: {
              selectors: [".results"],
              timeout: "5s"
            }
          }
        ]
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
          "browser_actions": [
              {
                  "fill": {
                      "selectors": ["input[type='\''search'\'']"],
                      "text": "laptop"
                  }
              },
              {
                  "wait": "1s"
              },
              {
                  "click": {
                      "selectors": ["button[type='\''submit'\'']"]
                  }
              },
              {
                  "wait_for_element": {
                      "selector": ".results",
                      "timeout": 5000
                  }
              }
          ]
      }'
      ```
    </CodeGroup>
  </Accordion>
</AccordionGroup>

## Example response

When browser actions complete successfully, you'll receive the final page state along with any data captured.

The response includes:

* **data**: All related extacted data
  * **data.html**: Final DOM state after all actions
  * **data.screenshot**: Page screenshot if used
  * **data.cookies**: Collected cookies if `get_cookies` was used by order
  * **data.fetch**: HTTP response if `fetch` was used by order
* **metadata**: Execution details including task id, driver used, execution time and more
  * **metadata.browser\_actions**: The browser actions results per step

```json theme={"system"}
{
  "url": "https://www.example.com/",
  "task_id": "b1fa7943-cba5-4ec2-a88c-4d2d6799c794",
  "status": "success",
  "data": {
    "html": "<!DOCTYPE html><html>...</html>",
    "screenshot": "base64_encoded_image_data",
    "cookies": [
      {
        "name": "session_id",
        "value": "abc123xyz",
        "domain": ".example.com",
        "path": "/",
        "expires": 1735689600,
        "httpOnly": true,
        "secure": true
      }
    ],
    "fetch": [
      {
        "status": 200,
        "duration": 235,
        "method": "POST",
        "url": "https://api.example.com/submit",
        "headers": {},
        "body": "..."
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

### Use required parameter for optional steps

**Make non-critical steps optional:**

```python theme={"system"}
# ✅ Continue even if optional element isn't found
browser_actions = [
    {
        "click": {
            "selectors": [".cookie-banner button"],
            "required": False  # Don't fail if banner doesn't exist
        }
    },
    {
        "click": {
            "selectors": [".submit-button"],
            "required": True  # This is critical
        }
    }
]

# ❌ Fail entire request if cookie banner isn't found
browser_actions = [
    {
        "click": {
            "selectors": [".cookie-banner button"]
            # required defaults to True
        }
    }
]
```

### Chain actions with appropriate waits

**Add delays between actions:**

```python theme={"system"}
# ✅ Wait for content to load between actions
browser_actions = [
    {
        "click": {
            "selectors": ["button.load-more"]
        }
    },
    {
        "wait": "2s"  # Wait for new content to load
    },
    {
        "wait_for_element": {
            "selector": ".new-content"
        }
    }
]

# ❌ No wait - may act on stale content
browser_actions = [
    {
        "click": {
            "selectors": ["button.load-more"]
        }
    },
    {
        "click": {
            "selectors": [".new-content button"]  # May not exist yet
        }
    }
]
```

### Use specific selectors

**Be precise with CSS selectors:**

```python theme={"system"}
# ✅ Specific selector
selector = "button[data-testid='submit-form']"

# ✅ Unique class or ID
selector = "#unique-submit-button"

# ❌ Too generic - may match wrong element
selector = "button"

# ❌ Fragile - breaks with style changes
selector = ".btn.btn-primary.btn-lg.mt-4"
```

### Optimize auto scroll parameters

**Set appropriate scroll limits:**

```python theme={"system"}
# ✅ Controlled scrolling with limits
auto_scroll = {
    "max_duration": 10000,  # 10 seconds max
    "idle_timeout": 3000,  # Stop if no change for 3s
    "delay_after_scroll": 500,  # Wait between scrolls
    "click_selector": ".load-more"  # Handle load more buttons
}

# ❌ Excessive scrolling - slow and costly
auto_scroll = {
    "max_duration": 60000,  # 60 seconds - too long
    "delay_after_scroll": 100  # Too fast - may miss content
}example
```
