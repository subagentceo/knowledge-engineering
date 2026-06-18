> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Custom Headers & Cookies

> Send custom headers and cookies to access personalized or authenticated content

Custom headers and cookies enable you to access personalized data, maintain user sessions, and interact with authenticated endpoints. Set headers and cookies in string or object format to mimic real user behavior and retrieve content that requires specific request contexts.

## When to use

Use custom headers and cookies when you need to:

* **Access authenticated content**: Retrieve data behind login walls
* **Maintain sessions**: Preserve user state across requests
* **Mimic real users**: Include user-specific headers for personalized data
* **API authentication**: Send API keys or tokens in headers
* **Regional content**: Set language or region preferences

<Danger>
  This is an advanced feature. Misconfigured headers or cookies may trigger
  anti-bot detection or cause requests to fail.
</Danger>

## Parameters

<AccordionGroup>
  <Accordion title="headers" icon="list-check">
    <ParamField path="headers" type="object">
      Add custom HTTP headers to your request. Useful for authentication, setting custom user agents, or mimicking specific browsers.

      **Common use cases:**

      * API authentication (API keys, tokens)
      * Custom User-Agent strings
      * Accept-Language preferences
      * Referer headers
      * Custom authentication headers

      **Format:** Provide headers as key-value pairs in an object.
    </ParamField>

    **Example:**

    ```json theme={"system"}
    "headers": {
      "User-Agent": "MyApp/1.0",
      "Accept-Language": "en-US,en;q=0.9",
      "X-API-Key": "your-api-key"
    }
    ```
  </Accordion>

  <Accordion title="method" icon="arrow-right-arrow-left">
    <ParamField path="method" default="GET" type="string">
      The HTTP method to use for the request.

      **Supported methods:** `GET`, `POST`, `PUT`, `DELETE`, `PATCH`

      **When to use:**

      * `GET` - Fetching data (default)
      * `POST` - Submitting forms or data
      * `PUT` - Updating resources
      * `DELETE` - Removing resources

      **Note:** When using `POST` or `PUT`, you'll typically also need to include a `body` parameter.
    </ParamField>

    **Example:**

    ```json theme={"system"}
    "method": "POST"
    ```
  </Accordion>

  <Accordion title="body" icon="file-code">
    <ParamField path="body" type="object">
      The data to send in the request body. Used with POST, PUT, or PATCH requests.

      **Format:** Can be an object (auto-converted to JSON) or a string.

      **Common uses:**

      * Form submissions
      * API payloads
      * Search queries
      * Data uploads
    </ParamField>

    **Example:**

    ```json theme={"system"}
    "method": "POST",
    "body": {
      "query": "product search",
      "filters": ["category:electronics"]
    }
    ```
  </Accordion>

  <Accordion title="cookies (string format)" icon="cookie">
    <ParamField path="cookies" type="string">
      Send cookies as a simple string, just like they appear in the browser. Separate multiple cookies with semicolons.

      **When to use:**

      * Quickest way to add cookies
      * When you have a cookie string from browser dev tools
      * Session IDs and authentication tokens

      **Format:** `name1=value1;name2=value2;name3=value3`
    </ParamField>

    **Example:**

    ```json theme={"system"}
    "cookies": "session_id=abc123xyz;user_pref=en_US;logged_in=true"
    ```
  </Accordion>

  <Accordion title="cookies (array format)" icon="cookie-bite">
    <ParamField path="cookies" type="array">
      Send cookies as an array of objects for more control. Each cookie can specify its domain.

      **When to use:**

      * Different cookies for different domains
      * More precise cookie control
      * Complex cookie setups

      **Each cookie object needs:**

      * `key` - Cookie name (required)
      * `value` - Cookie value (required)
      * `domain` - Cookie domain (optional, defaults to request URL domain)
    </ParamField>

    **Example:**

    ```json theme={"system"}
    "cookies": [
      {
        "key": "session_id",
        "value": "abc123xyz",
        "domain": "example.com"
      },
      {
        "key": "user_token",
        "value": "token456",
        "domain": "api.example.com"
      }
    ]
    ```
  </Accordion>
</AccordionGroup>

<Danger>
  Headers and cookies **<u>cannot</u>** be used together. Please do not include
  any cookies when sending custom headers.\ \ Just remember that cookies can be
  provided in either string format OR array format, but not both at the same
  time.
</Danger>

## Usage

### Send custom headers

Include headers as an object:

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.extract(
      url= "https://api.example.com/data",
      headers= {
          "User-Agent": "MyApp/1.0",
          "Accept-Language": "en-US,en;q=0.9",
  		"Some-Extra-Header": "some-extra-header"
      }
  )

  print(result)
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.extract({
    url: "https://api.example.com/data",
    headers: {
      "User-Agent": "MyApp/1.0",
      "Accept-Language": "en-US,en;q=0.9",
      "Some-Extra-Header": "some-extra-header",
    },
  });

  console.log(result);
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://api.example.com/data",
      "headers": {
          "User-Agent": "MyApp/1.0",
          "Accept-Language": "en-US,en;q=0.9",
  		"Some-Extra-Header": "some-extra-header"
      }
  }'
  ```
</CodeGroup>

### POST requests with headers

Send POST requests with custom headers and body:

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.extract(
      url= "https://api.example.com/submit",
      method= "POST",
      headers= {
          "Content-Type": "application/json",
          "Some-Extra-Header": "some-extra-header"
      },
      body= {
          "query": "product search",
          "filters": ["category:electronics"]
      }
  )

  print(result)
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.extract({
    url: "https://api.example.com/submit",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Some-Extra-Header": "some-extra-header",
    },
    body: {
      query: "product search",
      filters: ["category:electronics"],
    },
  });

  console.log(result);
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://api.example.com/submit",
      "method": "POST",
      "headers": {
          "Content-Type": "application/json",
          "Some-Extra-Header": "some-extra-header"
      },
      "body": {
          "query": "product search",
          "filters": ["category:electronics"]
      }
  }'
  ```
</CodeGroup>

### Send cookies (string format)

Use simple string format for multiple cookies:

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.extract(
      url= "https://www.example.com/account",
      cookies= "session_id=abc123xyz;user_pref=en_US;logged_in=true"
  )

  print(result)
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.extract({
    url: "https://www.example.com/account",
    cookies: "session_id=abc123xyz;user_pref=en_US;logged_in=true",
  });

  console.log(result);
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://www.example.com/account",
      "cookies": "session_id=abc123xyz;user_pref=en_US;logged_in=true"
  }'
  ```
</CodeGroup>

### Send cookies (object format)

Use object format for domain-specific cookies:

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.extract(
      url= "https://www.example.com/dashboard",
      cookies= [
          {
              "key": "session_id",
              "value": "abc123xyz",
              "domain": "example.com"
          },
          {
              "key": "user_token",
              "value": "token456",
              "domain": "api.example.com"
          }
      ]
  )

  print(result)
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.extract({
    url: "https://www.example.com/dashboard",
    cookies: [
      {
        key: "session_id",
        value: "abc123xyz",
        domain: "example.com",
      },
      {
        key: "user_token",
        value: "token456",
        domain: "api.example.com",
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
      "url": "https://www.example.com/dashboard",
      "cookies": [
          {
              "key": "session_id",
              "value": "abc123xyz",
              "domain": "example.com"
          },
          {
              "key": "user_token",
              "value": "token456",
              "domain": "api.example.com"
          }
      ]
  }'
  ```
</CodeGroup>

### Capture cookies with browser actions and reuse

Use browser actions to interact with a page (like selecting a zip code), capture the resulting cookies, and pass them to subsequent requests:

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  # Step 1: Perform browser actions and capture cookies
  initial_result = nimble.extract(
      url= "https://www.example.com",
      render= True,
      browser_actions= [
          {
              "click": {
                  "selector": "#location-selector"
              }
          },
          {
              "fill": {
                  "selector": "#zipcode-input",
                  "text": "90210"
              }
          },
          {
              "click": {
                  "selector": "#submit-location"
              }
          },
          {
              "wait": 2000
          },
          {
              "get_cookies": True
          }
      ]
  )

  # Extract cookies from the response
  captured_cookies = initial_result.data.cookies

  # Step 2: Use captured cookies in subsequent requests
  # Convert cookies array to string format
  cookie_string = ";".join([f"{cookie['name']}={cookie['value']}" for cookie in captured_cookies])

  result = nimble.extract(
      url= "https://www.example.com/products",
      cookies= cookie_string
  )

  print(result)
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  // Step 1: Perform browser actions and capture cookies
  const initialResult = await nimble.extract({
    url: "https://www.example.com",
    render: true,
    browser_actions: [
      {
        click: {
          selector: "#location-selector",
        },
      },
      {
        fill: {
          selector: "#zipcode-input",
          text: "90210",
        },
      },
      {
        click: {
          selector: "#submit-location",
        },
      },
      {
        wait: 2000,
      },
      {
        get_cookies: true,
      },
    ],
  });

  // Extract cookies from the response
  const capturedCookies = initialResult.data.cookies;

  // Step 2: Use captured cookies in subsequent requests
  // Convert cookies array to string format
  const cookieString = capturedCookies
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join(";");

  const result = await nimble.extract({
    url: "https://www.example.com/products",
    cookies: cookieString,
  });

  console.log(result);
  ```

  ```bash cURL theme={"system"}
  # Step 1: Perform browser actions and capture cookies
  curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://www.example.com",
      "render": true,
      "browser_actions": [
          {
              "click": {
                  "selector": "#location-selector"
              }
          },
          {
              "fill": {
                  "selector": "#zipcode-input",
                  "text": "90210"
              }
          },
          {
              "click": {
                  "selector": "#submit-location"
              }
          },
          {
              "wait": 2000
          },
          {
              "get_cookies": true
          }
      ]
  }'

  # Response will include cookies in data.cookies array:
  # {
  #   "status": "success",
  #   "data": {
  #     "html": "...",
  #     "cookies": [
  #       {
  #         "name": "location_zipcode",
  #         "value": "90210",
  #         "domain": ".example.com"
  #       },
  #       {
  #         "name": "session_id",
  #         "value": "abc123xyz",
  #         "domain": ".example.com"
  #       }
  #     ]
  #   }
  # }

  # Step 2: Use captured cookies in subsequent requests
  curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://www.example.com/products",
      "cookies": "location_zipcode=90210;session_id=abc123xyz"
  }'
  ```
</CodeGroup>

<Tip>
  This workflow is useful when you need to set user preferences (like location,
  language, or filters) via browser interaction, then make multiple faster
  requests with the same session state. See [Browser
  Actions](/nimble-sdk/web-tools/extract/features/browser-actions) for more
  interaction options.
</Tip>

## Important constraints

**Don't mix headers and cookies:**

```python theme={"system"}
# ❌ Don't send both in same request
result = nimble.extract({
    "url": "https://www.example.com",
    "headers": {"Some-Extra-Header": "some-extra-header"},
    "cookies": "session_id=abc"  # May cause conflicts
})

# ✅ Use one method
result = nimble.extract({
    "url": "https://www.example.com",
    "headers": {"Some-Extra-Header": "some-extra-header"}
})
```

**Detection risk:**

* Improper headers may trigger anti-bot detection
* Invalid cookies can cause request failures
* Test thoroughly before production use
* Monitor success rates when using custom headers/cookies

**Header size limits:**

* Total header size: 32 KB
* Individual header: 8 KB
* Cookie header: 4 KB

<Danger>
  This is an advanced feature requiring careful configuration. Always test in a
  development environment first.
</Danger>
