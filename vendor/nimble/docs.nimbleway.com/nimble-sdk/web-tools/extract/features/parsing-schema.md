> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Parsing Schema

> Precise data extraction with powerful parser syntax

Parsing Schema gives you full control over data extraction using a comprehensive parser syntax. Define exact data structures for predictable, low-cost extraction from HTML, JSON, XML, and network captures.

Parsers are the complete recipe for processing web content into structured data. They combine:

* selectors - identify elements
* extractors - extract data from elements
* post-processors (optional) - transform the output

# **When to use**

Use parsing schema when you need:

* **Predictable extraction**: Same selectors extract same data every time
* **Full control**: Specify exact selectors paths and data types
* **High volume**: Process large datasets efficiently

<Tip>
  Parsers may break when page structure or selectors change. Monitor source
  pages and update parsers as needed.
</Tip>

# **Parameters**

<AccordionGroup>
  <Accordion icon="wand-magic-sparkles" title="parse - Required">
    <ParamField path="parse" default="false" type="boolean" required>
      **`Must be set to true`** to enable parsing. This tells Nimble you want to extract structured data using the parser you define.

      When disabled, you'll just get raw HTML without structured extraction.
    </ParamField>

    **Example:**

    ```json theme={"system"}
    "parse": true
    ```
  </Accordion>

  <Accordion icon="code" title="parser">
    <ParamField path="parser" type="object">
      Your custom extraction recipe that defines exactly what data to pull from the page and how to structure it.

      **Parser structure:**

      Each field in your parser is a key-value pair where:

      * **Key** - The name of the field in your output (like `"product_name"` or `"price"`)
      * **Value** - An object that describes how to extract that field

      **Every parser needs:**

      1. `type` - What kind of parser to use
         * `terminal` - Extract a single value (like one price)
         * `terminal_list` - Extract multiple values (like a list of image URLs)
         * `schema` - Extract a nested object (like product details)
         * `schema_list` - Extract a list of objects (like multiple products)
         * `or` - Try multiple strategies, use first one that works
         * `and` - Combine multiple extraction strategies
         * `const` - Return a fixed value
      2. `selector` - How to find the element on the page
         * Use CSS selectors (`.product-name`, `#price`, etc.)
         * Or XPath, JSON paths for other data types
      3. `extractor` - What data to grab from the element
         * `text` - The text content
         * `attr` - An attribute value (like `href` or `src`)
         * `json` - Parse JSON data
         * `raw` - The raw HTML
      4. `post_processor` (optional) - Transform the data
         * Convert to number, format dates, clean text, etc.

      **Think of it as:** "Find THIS element, grab THIS data from it, and format it like THIS"
    </ParamField>

    **Simple example:**

    ```json theme={"system"}
    "parser": {
      "title": {
        "type": "terminal",
        "selector": {
          "type": "css",
          "css_selector": "h1.product-title"
        },
        "extractor": {
          "type": "text"
        }
      }
    }
    ```

    **List example:**

    ```json theme={"system"}
    "parser": {
      "images": {
        "type": "terminal_list",
        "selector": {
          "type": "css",
          "css_selector": ".product-gallery img"
        },
        "extractor": {
          "type": "attr",
          "attr": "src"
        }
      }
    }
    ```
  </Accordion>
</AccordionGroup>

### Usage

**Example parser structure:**

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  result = nimble.extract(
      url="https://www.example.com/product",
      parse=True,
      parser={
          "product_name": {  # key - output field name
              "type": "terminal",  # parser type
              "selector": {  # how to find the element
                  "type": "css",
                  "css_selector": ".product-title"
              },
              "extractor": {  # what to extract
                  "type": "text"
              }
          },
          "price": {
              "type": "terminal",
              "selector": {
                  "type": "css",
                  "css_selector": ".price-value"
              },
              "extractor": {
                  "type": "text",
                  "post_processor": {  # optional: transform the data
                      "type": "number"
                  }
              }
          }
      }
  )

  print(result)
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  const result = await nimble.extract({
    url: "https://www.example.com/product",
    parse: true,
    parser: {
      product_name: {
        // key - output field name
        type: "terminal", // parser type
        selector: {
          // how to find the element
          type: "css",
          css_selector: ".product-title",
        },
        extractor: {
          // what to extract
          type: "text",
        },
      },
      price: {
        type: "terminal",
        selector: {
          type: "css",
          css_selector: ".price-value",
        },
        extractor: {
          type: "text",
          post_processor: {
            // optional: transform the data
            type: "number",
          },
        },
      },
    },
  });

  console.log(result);
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://www.example.com/product",
      "parse": true,
      "parser": {
          "product_name": {
              "type": "terminal",
              "selector": {
                  "type": "css",
                  "css_selector": ".product-title"
              },
              "extractor": {
                  "type": "text"
              }
          },
          "price": {
              "type": "terminal",
              "selector": {
                  "type": "css",
                  "css_selector": ".price-value"
              },
              "extractor": {
                  "type": "text",
                  "post_processor": {
                      "type": "number"
                  }
              }
          }
      }
  }'
  ```
</CodeGroup>

### **Example Output**

```json theme={"system"}
{
  "status": "success",
  "data": {
    "parsing": {
      "product_name": "Wireless Headphones",
      "price": 79.99
    }
  }
}
```

## Parser Types

Supported parsing types:

* `terminal` - Returns a single terminal/literal as output.
* `terminal_list` - Returns a list of literals instead of a single literal.
* `schema` - Returns a dictionary/JSON according to its field parsers.
* `schema_list` - Returns a list of dictionaries/JSONs instead of a single dictionary/JSON.
* `or` - Tries a sequence of parsers and returns the result of the first parser that returns a non-null value
* `and` - Runs a sequence of schema parsers and merges their results into a single output. All parsers execute on the same input, and results are combined (first non-null value wins for overlapping keys).
* `const` - Always returns its `value` regardless of the input. Useful for adding static data to your output.

### terminal

* The most basic parser.

```json theme={"system"}
{
  "type": "terminal",
  "selector": { ... },
  "extractor": { ... }  // Defaults to raw extractor if not specified
}
```

<Expandable title="Example: Extract product name">
  ```json theme={"system"}
  {
    "type": "terminal",
    "selector": {
      "type": "css",
      "css_selector": ".product-name"
    },
    "extractor": {
      "type": "text"
    }
  }
  ```
</Expandable>

### terminal\_list

Returns a list of literals instead of a single literal.

```json theme={"system"}
{
  "type": "terminal_list",
  "selector": { ... },
  "extractor": { ... }  // Defaults to raw extractor if not specified
}
```

<Expandable title="Example: Extract all image URLs">
  ```json theme={"system"}
  {
    "type": "terminal_list",
    "selector": {
      "type": "css",
      "css_selector": ".product-gallery img"
    },
    "extractor": {
      "type": "attr",
      "attr": "src"
    }
  }
  ```
</Expandable>

### schema

This is the most commonly used parser for structured data extraction.

```json theme={"system"}
{
  "type": "schema",
  "selector": { ... },  // Optional
  "fields": {
    "field_name": { /* Parser */ }
  }
}
```

<Expandable title="Example: Extract product details">
  ```json theme={"system"}
  {
    "type": "schema",
    "selector": {
      "type": "css",
      "css_selector": ".product-card"
    },
    "fields": {
      "name": {
        "type": "terminal",
        "selector": {
          "type": "css",
          "css_selector": ".product-name"
        },
        "extractor": {
          "type": "text"
        }
      },
      "price": {
        "type": "terminal",
        "selector": {
          "type": "css",
          "css_selector": ".price"
        },
        "extractor": {
          "type": "text"
        }
      }
    }
  }
  ```
</Expandable>

### schema\_list

Returns a list of dictionaries/JSONs instead of a single dictionary/JSON.

```json theme={"system"}
{
  "type": "schema_list",
  "selector": { ... },  // Optional
  "fields": {
    "field_name": { /* Parser */ }
  }
}
```

<Expandable title="Exampe: With position tracking:">
  The optional `position` attribute adds an index field to each item in the output list.

  ```json theme={"system"}
  {
    "type": "schema_list",
    "selector": { ... },
    "fields": {
      "field_name": { /* Parser */ }
    },
    "position": {
      "field_name": "index",
      "start_from": 1  // Optional, defaults to 0
    }
  }
  ```
</Expandable>

<Expandable title="Example: Extract product list">
  ```json theme={"system"}
  {
    "type": "schema_list",
    "selector": {
      "type": "css",
      "css_selector": ".product-item"
    },
    "fields": {
      "name": {
        "type": "terminal",
        "selector": {
          "type": "css",
          "css_selector": ".product-name"
        },
        "extractor": {
          "type": "text"
        }
      },
      "price": {
        "type": "terminal",
        "selector": {
          "type": "css",
          "css_selector": ".price"
        },
        "extractor": {
          "type": "text"
        }
      }
    }
  }
  ```
</Expandable>

### or

Useful for handling variations in page structure.

```json theme={"system"}
{
  "type": "or",
  "parsers": [
    {
      /* Parser 1 */
    },
    {
      /* Parser 2 */
    },
    {
      /* Parser 3 */
    }
  ]
}
```

<Expandable title="Example: Try multiple price selectors">
  ```json theme={"system"}
  {
    "type": "or",
    "parsers": [
      {
        "type": "terminal",
        "selector": {
          "type": "css",
          "css_selector": ".sale-price"
        },
        "extractor": {
          "type": "text"
        }
      },
      {
        "type": "terminal",
        "selector": {
          "type": "css",
          "css_selector": ".regular-price"
        },
        "extractor": {
          "type": "text"
        }
      }
    ]
  }
  ```
</Expandable>

### and

Runs a sequence of schema parsers and merges their results into a single output. All parsers execute on the same input, and results are combined (first non-null value wins for overlapping keys).

```json theme={"system"}
{
  "type": "and",
  "parsers": [
    {
      /* Schema Parser 1 */
    },
    {
      /* Schema Parser 2 */
    }
  ]
}
```

### const

Always returns its `value` regardless of the input. Useful for adding static data to your output.

```json theme={"system"}
{
  "type": "const",
  "value": "some_value"
}
```

## Parsing Selectors

Selectors identify elements (HTML, JSON, XML, Network) in the input web page. Supported selectors:

* `css` - Selects elements matching a [CSS selector](https://www.w3schools.com/css/css_selectors.asp).
* `xpath` - Enables powerful element selection using [XPath expressions](https://www.w3schools.com/xml/xpath_intro.asp). Particularly useful for XML documents like RSS feeds and sitemaps.
* `json` - Extracts JSON elements from the page. All subsequent selectors and extractors receive JSON instead of HTML.
* `sequence` - Combines multiple selectors in sequence. Useful for chaining different selector types.
* `parent` - Traverses up the DOM tree (for HTML) or context hierarchy (for JSON). Useful when you need to select a parent element after finding a specific child.
* `root` - Returns the original page (document). Often used with JSON selector to access fields like `network_capture`, `url`, or `html`.

### css

Selects elements matching a [CSS selector](https://www.w3schools.com/css/css_selectors.asp).

```json theme={"system"}
{
  "type": "css",
  "css_selector": "div.price"
}
```

<Expandable title="Examples:">
  ```json theme={"system"}
  // Select by class
  { "type": "css", "css_selector": ".product-name" }

  // Select by ID
  { "type": "css", "css_selector": "#main-content" }

  // Select by attribute
  { "type": "css", "css_selector": "a[data-product-id]" }

  // Complex selector
  { "type": "css", "css_selector": "div.product > h2.title" }
  ```
</Expandable>

### xpath

Enables powerful element selection using [XPath expressions](https://www.w3schools.com/xml/xpath_intro.asp). Particularly useful for XML documents like RSS feeds and sitemaps.

```json theme={"system"}
{
  "type": "xpath",
  "path": "//book[@category='fiction']"
}
```

<Expandable title="Common XPath patterns:">
  * `//element` - Select all elements with the given name - `/root/child` -
    Select child elements of root - `//element[@attr='value']` - Select by
    attribute value - `//element[position()=1]` - Select first element -
    `//*[local-name()='element']` - Select ignoring namespaces
</Expandable>

<Expandable title="Example: Parse XML sitemap">
  ```json theme={"system"}
  {
    "type": "terminal_list",
    "selector": {
      "type": "xpath",
      "path": "//*[local-name()='loc']"
    },
    "extractor": {
      "type": "text"
    }
  }
  ```
</Expandable>

<Expandable title="Example: Select nested RSS elements">
  ```json theme={"system"}
  {
    "type": "sequence",
    "sequence": [
      {
        "type": "xpath",
        "path": "//item"
      },
      {
        "type": "xpath",
        "path": ".//title"
      }
    ]
  }
  ```
</Expandable>

### json

Extracts JSON elements from the page. All subsequent selectors and extractors receive JSON instead of HTML.

```json theme={"system"}
{
  "type": "json",
  "path": "nested.keys.in.the.json" // jsonpath
}
```

<Expandable title="With coercion filter:">
  The `coercion_filter` field provides advanced control when dealing with multiple JSON objects. It uses JSONPath expressions to filter specific JSON objects.

  ```json theme={"system"}
  {
    "type": "json",
    "coercion_filter": "$[1]", // Get the second JSON object
    "path": "nested.keys"
  }
  ```
</Expandable>

<Expandable title="Example: Extract specific JSON by type">
  ```json theme={"system"}
  {
    "type": "json",
    "coercion_filter": "$[?(@.type=='product')]",
    "path": "name"
  }
  ```
</Expandable>

<Expandable title="Example: Extract from embedded JSON in script tag">
  ```json theme={"system"}
  {
    "type": "terminal",
    "selector": {
      "type": "sequence",
      "sequence": [
        {
          "type": "css",
          "css_selector": "script[type='application/ld+json']"
        },
        {
          "type": "json",
          "path": "$.offers.price"
        }
      ]
    },
    "extractor": {
      "type": "raw"
    }
  }
  ```
</Expandable>

### sequence

Combines multiple selectors in sequence. Useful for chaining different selector types.

```json theme={"system"}
{
  "type": "sequence",
  "sequence": [
    {
      /* Selector 1 */
    },
    {
      /* Selector 2 */
    },
    {
      /* Selector 3 */
    }
  ]
}
```

<Expandable title="Example: Select JSON from HTML element">
  ```json theme={"system"}
  {
    "type": "sequence",
    "sequence": [
      {
        "type": "css",
        "css_selector": "script#product-data"
      },
      {
        "type": "json",
        "path": "$.product"
      }
    ]
  }
  ```
</Expandable>

### parent

Traverses up the DOM tree (for HTML) or context hierarchy (for JSON). Useful when you need to select a parent element after finding a specific child.

```json theme={"system"}
{
  "type": "parent",
  "times": 1 // Number of levels to traverse (default: 1)
}
```

<Expandable title="Example: Find parent container">
  ```json theme={"system"}
  {
    "type": "sequence",
    "sequence": [
      {
        "type": "css",
        "css_selector": "span.price"
      },
      {
        "type": "parent",
        "times": 2
      }
    ]
  }
  ```
</Expandable>

### root

Returns the original page (document). Often used with JSON selector to access fields like `network_capture`, `url`, or `html`.

```json theme={"system"}
{
  "type": "root"
}
```

<Expandable title="Example: Access page URL">
  ```json theme={"system"}
  {
    "type": "terminal",
    "selector": {
      "type": "sequence",
      "sequence": [
        {
          "type": "root"
        },
        {
          "type": "json",
          "path": "$.url"
        }
      ]
    },
    "extractor": {
      "type": "raw"
    }
  }
  ```
</Expandable>

<Expandable title="Example: Parse network capture data">
  ```json theme={"system"}
  {
    "type": "terminal",
    "selector": {
      "type": "sequence",
      "sequence": [
        {
          "type": "root"
        },
        {
          "type": "json",
          "path": "$.network_capture"
        }
      ]
    },
    "extractor": {
      "type": "raw"
    }
  }
  ```
</Expandable>

## Parsing Extractors

Extractors specify what data to extract from the selected element. Supported extractors:

* `text` - Extracts the text content of the element. Works with both HTML (CSS selectors) and XML (XPath selectors).
  * `strip` (optional, boolean) - If it is set to `false`, leading and trailing whitespaces are preserved in the text. Default is `true`.
  * `separator` (optional, string) - Specifies a separator string to use when joining text from different child elements. When extracting text from nested HTML elements, this separator will be inserted between text from different elements. If not specified, text from different elements is concatenated without a separator.
* `attr` - Extracts an attribute value from the element. Works with both HTML and XML elements. common attr:
  * `href` - Links
  * `src` - Images, scripts
  * `data-*` - Custom data attributes
  * `class` - CSS classes
  * `id` - Element IDs
* `json` - Extracts JSON content using JSONPath.
* `raw` - Extracts an element as-is without coercion. JSON stays as JSON, strings stay as strings. Useful for advanced parsing with complex JSON selectors.

<Note>
  If no extractor is specified, the **raw** extractor is used by default.
</Note>

### text

Extracts the text content of the element. This extractor works with both HTML elements (from CSS selectors) and XML elements (from XPath selectors).

You can use `strip=false` to keep leading and trailing whitespace characters. The default is to remove them.

<Note>
  The text extractor supports both HTML elements (BeautifulSoup Tag) from CSS
  selectors and XML elements (lxml Element) from XPath selectors. This allows
  you to use the same extractor regardless of whether you're parsing HTML or XML
  documents.
</Note>

**Basic usage:**

```json theme={"system"}
{
  "type": "text",
  "regex": "string" // Optional (deprecated), will return 1st match
}
```

<Expandable title="With strip parameter:">
  ```json theme={"system"}
  {
    "type": "text",
    "regex": "string", // Optional (deprecated), will return 1st match
    "strip": false
  }
  ```
</Expandable>

<Expandable title="With separator parameter:">
  ```json theme={"system"}
  {
    "type": "text",
    "regex": "string", // Optional (deprecated), will return 1st match
    "separator": " | "
  }
  ```
</Expandable>

<Expandable title="Example with XPath Selector">
  ```json theme={"system"}
  {
    "type": "terminal",
    "selector": {
      "type": "xpath",
      "path": "//book/title"
    },
    "extractor": {
      "type": "text",
      "strip": true
    }
  }
  ```
</Expandable>

### attr

Extracts an attribute value from the element. Works with both HTML and XML elements. Common attributes: `href` ,`src` ,`data-*` ,`class` , `id`

```json theme={"system"}
{
  "type": "attr",
  "attr": "href"
}
```

<Expandable title="Example: Extract image URL">
  ```json theme={"system"}
  {
    "type": "terminal",
    "selector": {
      "type": "css",
      "css_selector": "img.product-image"
    },
    "extractor": {
      "type": "attr",
      "attr": "src"
    }
  }
  ```
</Expandable>

### json

Extracts JSON content using JSONPath.

```json theme={"system"}
{
  "type": "json",
  "path": "nested.keys.in.the.json"
}
```

### raw

Extracts an element as-is without coercion. JSON stays as JSON, strings stay as strings. Useful for advanced parsing with complex JSON selectors.

```json theme={"system"}
{
  "type": "raw"
}
```

## Parsing Post Processors

Post processors transform extractor output. Define them in the extractor's `post_processor` field. Supported post-procession options:

* `url` - Converts relative URLs to absolute URLs based on the page origin.
* `regex` - Transforms output using a [regular expression](https://regexr.com/). The optional `group` parameter extracts a specific capturing group (defaults to 0).
* `format` - Formats input into a string using Python's str.format, where the input is available as `{data}`.
* `date` - Formats dates to ISO format or custom format.
* `boolean` - Transforms output to boolean based on conditions: `contains`, `exists`, or `regex`. Use `not: true` to reverse the result.
* `number` - Coerces output to a number (int or float). Handles formatted numbers like `"1.5M"` → `1500000` or `"2,100"` → `2100`.
* `country` - Converts country names to country codes.
* `sequence` - Applies multiple post processors in sequence.

### url

Converts relative URLs to absolute URLs based on the page origin.

```json theme={"system"}
{
  "extractor": {
    "type": "text",
    "post_processor": {
      "type": "url"
    }
  }
}
```

<Expandable title="Example:">
  * Input: `"/news/article"` - Output: `"https://www.example.com/news/article"`
</Expandable>

### regex

Transforms output using a [regular expression](https://regexr.com/). The optional `group` parameter extracts a specific capturing group (defaults to 0).

```json theme={"system"}
{
  "extractor": {
    "type": "text",
    "post_processor": {
      "type": "regex",
      "regex": "\\d+",
      "group": 0 // Optional
    }
  }
}
```

<Expandable title="Example: Extract numbers">
  ```json theme={"system"}
  {
    "extractor": {
      "type": "text",
      "post_processor": {
        "type": "regex",
        "regex": "\\d+\\.\\d+"
      }
    }
  }
  ```
</Expandable>

<Expandable title="Example: Extract capturing group">
  ```json theme={"system"}
  {
    "extractor": {
      "type": "text",
      "post_processor": {
        "type": "regex",
        "regex": "Price: (\\d+)\\.(\\d+)",
        "group": 1
      }
    }
  }
  ```
</Expandable>

### format

Formats input into a string using Python's str.format, where the input is available as `{data}`.

```json theme={"system"}
{
  "extractor": {
    "type": "text",
    "post_processor": {
      "type": "format",
      "format": "${data}"
    }
  }
}
```

<Expandable title="Example:">- Input: 5.00 - Output: "\$5.00"</Expandable>

### date

Formats dates to ISO format or custom format.

```json theme={"system"}
{
  "extractor": {
    "type": "text",
    "post_processor": {
      "type": "date",
      "format": "%d/%m/%y" // Optional, defaults to ISO format
    }
  }
}
```

<Expandable title="Example:">
  * Input: `"5 days ago"` - Output (no format): `"2024-07-29T00:00:00"` - Output
    (with format `%d/%m/%y`): `"29/07/2024"`
</Expandable>

### boolean

Transforms output to boolean based on conditions: `contains`, `exists`, or `regex`. Use `not: true` to reverse the result.

<Expandable title="Contains condition:">
  ```json theme={"system"}
  {
    "extractor": {
      "type": "text",
      "post_processor": {
        "type": "boolean",
        "condition": "contains",
        "contains": "InStock"
      }
    }
  }
  ```
</Expandable>

<Expandable title="Exists condition:">
  ```json theme={"system"}
  {
    "extractor": {
      "type": "text",
      "post_processor": {
        "type": "boolean",
        "condition": "exists"
      }
    }
  }
  ```
</Expandable>

<Expandable title="Regex condition:">
  ```json theme={"system"}
  {
    "extractor": {
      "type": "text",
      "post_processor": {
        "type": "boolean",
        "condition": "regex",
        "regex": "\\d+"
      }
    }
  }
  ```
</Expandable>

<Expandable title="With negation:">
  ```json theme={"system"}
  {
    "extractor": {
      "type": "text",
      "post_processor": {
        "type": "boolean",
        "condition": "contains",
        "contains": "OutOfStock",
        "not": true
      }
    }
  }
  ```
</Expandable>

### number

Coerces output to a number (int or float). Handles formatted numbers like `"1.5M"` → `1500000` or `"2,100"` → `2100`.

```json theme={"system"}
{
  "extractor": {
    "type": "text",
    "post_processor": {
      "type": "number",
      "locale": "en", // Optional: locale for number parsing
      "force_type": "float" // Optional: "int" or "float"
    }
  }
}
```

<Expandable title="Example with German locale:">
  ```json theme={"system"}
  {
    "extractor": {
      "type": "text",
      "post_processor": {
        "type": "number",
        "locale": "de"
      }
    }
  }
  ```

  Input: `"1.000,50"` → Output: `1000.50`
</Expandable>

### country

Converts country names to country codes.

```json theme={"system"}
{
  "extractor": {
    "type": "text",
    "post_processor": {
      "type": "country"
    }
  }
}
```

<Expandable title="Example:">
  * Input: `"United States"` - Output: `"US"`
</Expandable>

### sequence

Applies multiple post processors in sequence.

```json theme={"system"}
{
  "extractor": {
    "type": "text",
    "post_processor": {
      "type": "sequence",
      "sequence": [
        {
          "type": "regex",
          "regex": "\\d+\\.\\d+"
        },
        {
          "type": "number"
        }
      ]
    }
  }
}
```

<Expandable title="Example:">
  * Input: `"The price is $50.25!"` - After regex: `"50.25"` - After number:
    `50.25`
</Expandable>

## Complete Examples

### Parsing a BBC News Article

This example demonstrates parsing a complete BBC news article about a three-legged cat, showing how to extract structured data from HTML using various parser types, selectors, and extractors.

<Expandable title="Complete Walkthrough">
  **Target URL:** `https://www.bbc.com/news/articles/cervlxymly2o`

  **Target Schema:**

  ```json theme={"system"}
  {
    "url": "string",
    "title": "string",
    "date": "string",
    "author": {
      "name": "string",
      "organization": "string"
    },
    "images": ["string"],
    "paragraphs": ["string"]
  }
  ```

  ### Field-by-Field Breakdown

  <Expandable title="Parsing: url">
    The URL is the canonical link for the page, typically found in the HTML `head` tag under a `link` element with `rel="canonical"`.

    **HTML Structure:**

    ```html theme={"system"}
    <head>
      <link rel="canonical" href="https://www.bbc.com/news/articles/cervlxymly2o" />
    </head>
    ```

    **Parser:**

    ```json theme={"system"}
    {
      "type": "terminal",
      "description": "Extracts the canonical URL from the page's head section",
      "selector": {
        "type": "css",
        "css_selector": "link[rel='canonical']"
      },
      "extractor": {
        "type": "attr",
        "attr": "href"
      }
    }
    ```

    **Explanation:**

    * **Selector:** `link[rel='canonical']` selects the first link element with `rel="canonical"`
    * **Extractor:** `attr` with `href` extracts the URL from the href attribute
  </Expandable>

  <Expandable title="Parsing: title">
    The article title is contained in an `h1` element within a headline block.

    **HTML Structure:**

    ```html theme={"system"}
    <article>
      <div data-component="headline-block" class="sc-18fde0d6-0 eeiVGB">
        <h1 class="sc-518485e5-0 bWszMR">
          Three-legged cat 'brings town together'
        </h1>
      </div>
    </article>
    ```

    **Parser:**

    ```json theme={"system"}
    {
      "type": "terminal",
      "description": "Main headline of the article",
      "selector": {
        "type": "css",
        "css_selector": "div[data-component='headline-block'] h1"
      },
      "extractor": {
        "type": "text"
      }
    }
    ```

    **Explanation:**

    * **Selector:** `div[data-component='headline-block'] h1` targets the h1 inside the headline block
    * **Extractor:** `text` extracts the text content from the element
  </Expandable>

  <Expandable title="Parsing: date">
    The publication date is in a `time` element and needs to be formatted to ISO format.

    **HTML Structure:**

    ```html theme={"system"}
    <div data-testid="byline-new" class="sc-2b5e3b35-0 dWFSHg">
      <div class="sc-2b5e3b35-1 jTEdni">
        <time class="sc-2b5e3b35-2 fkLXLN">29 July 2024</time>
      </div>
    </div>
    ```

    **Parser:**

    ```json theme={"system"}
    {
      "type": "terminal",
      "description": "Publication date in ISO format",
      "selector": {
        "type": "css",
        "css_selector": "div[data-testid='byline-new'] time"
      },
      "extractor": {
        "type": "text",
        "post_processor": {
          "type": "date"
        }
      }
    }
    ```

    **Explanation:**

    * **Selector:** `div[data-testid='byline-new'] time` targets the time element
    * **Extractor:** `text` with `date` post-processor converts "29 July 2024" to "2024-07-29T00:00:00"

    <Note>
      This field requires JavaScript rendering. Add render options to your API request to wait for this element.
    </Note>
  </Expandable>

  <Expandable title="Parsing: author (nested schema)">
    The author information contains both name and organization, requiring a nested schema parser.

    **HTML Structure:**

    ```html theme={"system"}
    <div data-testid="byline-new-contributors" class="sc-2b5e3b35-12 bRrXa-D">
      <div class="sc-2b5e3b35-5 bpnWmT">
        <div>
          <span class="sc-2b5e3b35-7 bZCrck">Martin Heath</span>
          <div class="sc-2b5e3b35-8 gxaSLA">
            <span>BBC News, Northamptonshire</span>
          </div>
        </div>
      </div>
    </div>
    ```

    **Parser:**

    ```json theme={"system"}
    {
      "type": "schema",
      "description": "Author information with name and organization",
      "selector": {
        "type": "css",
        "css_selector": "div[data-testid='byline-new-contributors']"
      },
      "fields": {
        "name": {
          "type": "terminal",
          "selector": {
            "type": "css",
            "css_selector": "span[class]"
          },
          "extractor": {
            "type": "text"
          }
        },
        "organization": {
          "type": "terminal",
          "selector": {
            "type": "css",
            "css_selector": "span:not([class])"
          },
          "extractor": {
            "type": "text"
          }
        }
      }
    }
    ```

    **Explanation:**

    * **Schema Parser:** Returns a nested object with multiple fields
    * **Selector Nesting:** Parent selector scopes child selectors to the byline-new-contributors div
    * **Name Selector:** `span[class]` selects spans with a class attribute
    * **Organization Selector:** `span:not([class])` selects spans without a class attribute
  </Expandable>

  <Expandable title="Parsing: images (list)">
    Extract all image URLs from the article, converting relative URLs to absolute.

    **HTML Structure:**

    ```html theme={"system"}
    <article>
      <img src="/news/480/cpsprodpb/2a87/live/321fae30.jpg.webp" />
      <img src="/news/480/cpsprodpb/a8c2/live/904194b0.jpg.webp" />
      <!-- more images -->
    </article>
    ```

    **Parser:**

    ```json theme={"system"}
    {
      "type": "terminal_list",
      "description": "All article images with absolute URLs",
      "selector": {
        "type": "css",
        "css_selector": "article img"
      },
      "extractor": {
        "type": "attr",
        "attr": "src",
        "post_processor": {
          "type": "url"
        }
      }
    }
    ```

    **Explanation:**

    * **terminal\_list:** Returns an array of values instead of a single value
    * **Selector:** `article img` selects all img elements within article
    * **Extractor:** `attr` with `src` gets the image source
    * **Post-processor:** `url` converts relative URLs to absolute (e.g., `/news/...` → `https://www.bbc.com/news/...`)
  </Expandable>

  <Expandable title="Parsing: paragraphs (list)">
    Extract all article paragraphs as an array of strings.

    **HTML Structure:**

    ```html theme={"system"}
    <article>
      <div data-component="text-block" class="sc-18fde0d6-0 dlWCEZ">
        <p class="sc-eb7bd5f6-0 fYAfXe">
          A three-legged cat has captured a town's imagination...
        </p>
        <p class="sc-eb7bd5f6-0 fYAfXe">
          The people of Daventry, Northamptonshire, love taking photographs...
        </p>
        <!-- more paragraphs -->
      </div>
    </article>
    ```

    **Parser:**

    ```json theme={"system"}
    {
      "type": "terminal_list",
      "description": "Article content paragraphs",
      "selector": {
        "type": "css",
        "css_selector": "article div[data-component='text-block'] p"
      },
      "extractor": {
        "type": "text"
      }
    }
    ```

    **Explanation:**

    * **terminal\_list:** Returns an array of paragraph texts
    * **Selector:** `article div[data-component='text-block'] p` selects all p elements in text blocks
    * **Extractor:** `text` extracts the text content from each paragraph
  </Expandable>

  ### Complete Parser

  ```json theme={"system"}
  {
    "type": "schema",
    "description": "Parses a BBC news article into structured data",
    "fields": {
      "url": {
        "type": "terminal",
        "description": "Canonical URL of the article",
        "selector": {
          "type": "css",
          "css_selector": "link[rel='canonical']"
        },
        "extractor": {
          "type": "attr",
          "attr": "href"
        }
      },
      "title": {
        "type": "terminal",
        "description": "Main headline of the article",
        "selector": {
          "type": "css",
          "css_selector": "div[data-component='headline-block'] h1"
        },
        "extractor": {
          "type": "text"
        }
      },
      "date": {
        "type": "terminal",
        "description": "Publication date in ISO format",
        "selector": {
          "type": "css",
          "css_selector": "div[data-testid='byline-new'] time"
        },
        "extractor": {
          "type": "text",
          "post_processor": {
            "type": "date"
          }
        }
      },
      "author": {
        "type": "schema",
        "description": "Author information",
        "selector": {
          "type": "css",
          "css_selector": "div[data-testid='byline-new-contributors']"
        },
        "fields": {
          "name": {
            "type": "terminal",
            "selector": {
              "type": "css",
              "css_selector": "span[class]"
            },
            "extractor": {
              "type": "text"
            }
          },
          "organization": {
            "type": "terminal",
            "selector": {
              "type": "css",
              "css_selector": "span:not([class])"
            },
            "extractor": {
              "type": "text"
            }
          }
        }
      },
      "images": {
        "type": "terminal_list",
        "description": "All article images",
        "selector": {
          "type": "css",
          "css_selector": "article img"
        },
        "extractor": {
          "type": "attr",
          "attr": "src",
          "post_processor": {
            "type": "url"
          }
        }
      },
      "paragraphs": {
        "type": "terminal_list",
        "description": "Article content paragraphs",
        "selector": {
          "type": "css",
          "css_selector": "article div[data-component='text-block'] p"
        },
        "extractor": {
          "type": "text"
        }
      }
    }
  }
  ```

  ### Example Output

  ```json theme={"system"}
  {
    "url": "https://www.bbc.com/news/articles/cervlxymly2o",
    "title": "Three-legged cat 'brings town together'",
    "date": "2024-07-29T00:00:00",
    "author": {
      "name": "Martin Heath",
      "organization": "BBC News, Northamptonshire"
    },
    "images": [
      "https://ichef.bbci.co.uk/news/480/cpsprodpb/2a87/live/321fae30-4c01-11ef-b2d2-cdb23d5d7c5b.jpg.webp",
      "https://ichef.bbci.co.uk/news/480/cpsprodpb/a8c2/live/904194b0-4c01-11ef-b2d2-cdb23d5d7c5b.jpg.webp",
      "https://ichef.bbci.co.uk/news/480/cpsprodpb/7579/live/9ecae4f0-4c01-11ef-aebc-6de4d31bf5cd.jpg.webp"
    ],
    "paragraphs": [
      "A three-legged cat has captured a town's imagination with his appearances in shops and offices.",
      "The people of Daventry, Northamptonshire, love taking photographs of the 14-year-old feline and documenting his travels on social media.",
      "Funds have been raised to buy a street sign with his name on it, and souvenir Salem T-shirts could follow."
    ]
  }
  ```

  ### API Request Example

  <CodeGroup>
    ```python Python theme={"system"}
    from nimble_python import Nimble

    nimble = Nimble(api_key="YOUR-API-KEY")

    result = nimble.extract(
        url="https://www.bbc.com/news/articles/cervlxymly2o",
        parse=True,
        render=True,
        render_flow=[{
            "wait_for": {
                "selectors": ["div[data-testid='byline-new'] time"]
            }
        }],
        parser={
            "type": "schema",
            "description": "Parses a BBC news article into structured data",
            "fields": {
                # ... (full parser structure as shown above)
            }
        }
    )

    print(result)
    ```

    ```javascript Node theme={"system"}
    import Nimble from "@nimble-way/nimble-js";

    const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

    const result = await nimble.extract({
      url: "https://www.bbc.com/news/articles/cervlxymly2o",
      parse: true,
      render: true,
      render_flow: [
        {
          wait_for: {
            selectors: ["div[data-testid='byline-new'] time"],
          },
        },
      ],
      parser: {
        type: "schema",
        description: "Parses a BBC news article into structured data",
        fields: {
          // ... (full parser structure as shown above)
        },
      },
    });

    console.log(result);
    ```

    ```bash cURL theme={"system"}
    curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
    --header 'Authorization: Bearer <YOUR-API-KEY>' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "url": "https://www.bbc.com/news/articles/cervlxymly2o",
        "parse": true,
        "render": true,
        "render_flow": [{
            "wait_for": {
                "selectors": ["div[data-testid=\"byline-new\"] time"]
            }
        }],
        "parser": {
            "type": "schema",
            "description": "Parses a BBC news article into structured data",
            "fields": {
                ...
            }
        }
    }'
    ```
  </CodeGroup>

  <Tip>
    This parser can be reused for any BBC news article following the same structure - just change the URL!
  </Tip>
</Expandable>

### Parsing Embedded JSON from Etsy.com Prodcut Page

This example demonstrates parsing structured data from embedded JSON-LD (Linked Data JSON) within an HTML page. Many websites embed JSON-LD in their HTML to help search engines understand their content - we can leverage this for easier, more reliable parsing.

<Note>
  **What is LD+JSON?** Linked Data JSON is a format for structuring data in a machine-readable way. It's often embedded in webpages using `<script type="application/ld+json">` tags to provide search engines with detailed information about products, articles, events, and more.
</Note>

<Expandable title="Complete Walkthrough">
  **Target URL:** `https://www.etsy.com/il-en/listing/1487833925/crochet-pattern-flower-cat-hat-crochet`

  <Tip>
    **Finding Embedded JSONs:** Search for the keyword `"json"` in the page's source code. Look for `<script type="application/ld+json">` tags.
  </Tip>

  ### The Embedded JSON

  The Etsy product page contains this LD+JSON (simplified):

  ```json theme={"system"}
  {
    "@type": "Product",
    "@context": "https://schema.org",
    "url": "https://www.etsy.com/il-en/listing/1487833925/...",
    "name": "CROCHET PATTERN - Flower Cat Hat...",
    "sku": "1487833925",
    "description": "***This is a CROCHET PATTERN...",
    "brand": {
      "@type": "Brand",
      "name": "HatsonCatsCrochet"
    },
    "image": [
      {
        "@type": "ImageObject",
        "contentURL": "https://i.etsystatic.com/.../il_fullxfull.jpg",
        "thumbnail": "https://i.etsystatic.com/.../il_340x270.jpg"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": 233
    },
    "offers": {
      "@type": "Offer",
      "price": "17.31",
      "priceCurrency": "ILS",
      "availability": "https://schema.org/InStock"
    }
  }
  ```

  **Target Schema:**

  ```json theme={"system"}
  {
    "url": "string",
    "name": "string",
    "brand": "string",
    "category": "string",
    "sku": "string",
    "description": "string",
    "price": "number",
    "currency": "string",
    "image_urls": ["string"],
    "rating_score": "number",
    "rating_count": "number",
    "is_available": "boolean"
  }
  ```

  ### Selecting the JSON

  First, we need to select the embedded JSON script element:

  ```json theme={"system"}
  {
    "type": "schema",
    "selector": {
      "type": "css",
      "css_selector": "script[type='application/ld+json']:-soup-contains(Product)"
    },
    "fields": { ... }
  }
  ```

  <Note>
    The `:-soup-contains(Product)` suffix helps select the specific JSON
    containing `"@type": "Product"` when multiple LD+JSON scripts exist on the
    page.
  </Note>

  ### Field-by-Field Breakdown

  <Expandable title="Simple top-level fields (url, name, category, sku, description)">
    These fields exist at the top level of the JSON and can be extracted directly using JSON path.

    **`Parser for url:`**

    ```json theme={"system"}
    {
      "type": "terminal",
      "extractor": {
        "type": "json",
        "path": "url",
        "post_processor": {
          "type": "url"
        }
      }
    }
    ```

    **`Parser for name:`**

    ```json theme={"system"}
    {
      "type": "terminal",
      "extractor": {
        "type": "json",
        "path": "name"
      }
    }
    ```

    **Explanation:**

    * **JSON Extractor:** Uses JSONPath expressions to navigate the JSON structure
    * **Path:** Simple field names for top-level values (e.g., `"url"`, `"name"`, `"sku"`)
    * **Post-processor:** `url` post-processor ensures URLs are properly formatted

    The same pattern applies to `category`, `sku`, and `description` fields.
  </Expandable>

  <Expandable title="Nested fields (brand, price, currency, rating_score, rating_count)">
    These fields are nested within objects in the JSON. We use dot notation in JSONPath to access them.

    **`Parser for brand:`**

    In the JSON, brand is an object:

    ```json theme={"system"}
    {
      "brand": {
        "@type": "Brand",
        "name": "HatsonCatsCrochet"
      }
    }
    ```

    We want the `name` field inside `brand`:

    ```json theme={"system"}
    {
      "type": "terminal",
      "extractor": {
        "type": "json",
        "path": "brand.name"
      }
    }
    ```

    **`Parser for price:`**

    ```json theme={"system"}
    {
      "type": "terminal",
      "extractor": {
        "type": "json",
        "path": "offers.price",
        "post_processor": {
          "type": "number"
        }
      }
    }
    ```

    **`Parser for rating_score:`**

    ```json theme={"system"}
    {
      "type": "terminal",
      "extractor": {
        "type": "json",
        "path": "aggregateRating.ratingValue",
        "post_processor": {
          "type": "number"
        }
      }
    }
    ```

    **Explanation:**

    * **Nested Path:** Use dot notation to access nested fields (e.g., `"brand.name"`, `"offers.price"`)
    * **Number Post-processor:** Converts string numbers to actual number types
    * **JSONPath:** Follow the object hierarchy: `offers.price` means "get the `price` field from the `offers` object"
  </Expandable>

  <Expandable title="Array fields (image_urls)">
    The `image_urls` field requires extracting specific values from an array of objects.

    **JSON Structure:**

    ```json theme={"system"}
    {
      "image": [
        {
          "@type": "ImageObject",
          "contentURL": "https://i.etsystatic.com/.../image1.jpg",
          "thumbnail": "https://i.etsystatic.com/.../thumb1.jpg"
        },
        {
          "@type": "ImageObject",
          "contentURL": "https://i.etsystatic.com/.../image2.jpg",
          "thumbnail": "https://i.etsystatic.com/.../thumb2.jpg"
        }
      ]
    }
    ```

    **Parser:**

    ```json theme={"system"}
    {
      "type": "terminal_list",
      "selector": {
        "type": "json",
        "path": "image[*]"
      },
      "extractor": {
        "type": "json",
        "path": "contentURL",
        "post_processor": {
          "type": "url"
        }
      }
    }
    ```

    **Explanation:**

    * **terminal\_list:** Returns an array of strings instead of a single value
    * **Selector:** `image[*]` selects all elements in the `image` array
      * The `[*]` notation tells JSONPath to iterate over all array elements
      * Without `[*]`, you'd get a single-element array containing the entire `image` array
    * **Extractor:** From each image object, extract the `contentURL` field
    * **Result:** Array of image URLs: `["url1.jpg", "url2.jpg", ...]`
  </Expandable>

  <Expandable title="Boolean conversion (is_available)">
    The availability is stored as an enum string that needs to be converted to a boolean.

    **JSON Structure:**

    ```json theme={"system"}
    {
      "offers": {
        "availability": "https://schema.org/InStock"
      }
    }
    ```

    **Parser:**

    ```json theme={"system"}
    {
      "type": "terminal",
      "extractor": {
        "type": "json",
        "path": "offers.availability",
        "post_processor": {
          "type": "boolean",
          "condition": "contains",
          "contains": "InStock"
        }
      }
    }
    ```

    **Explanation:**

    * **Path:** Navigate to `offers.availability`
    * **Boolean Post-processor:** Converts the string to boolean
      * `condition: "contains"` checks if the string contains a specific substring
      * `contains: "InStock"` looks for "InStock" in the value
      * Returns `true` if found, `false` otherwise
    * **Result:** `"https://schema.org/InStock"` → `true`
  </Expandable>

  ### Complete Parser

  ```json theme={"system"}
  {
    "type": "schema",
    "description": "Parses Etsy product from embedded LD+JSON",
    "selector": {
      "type": "css",
      "css_selector": "script[type='application/ld+json']:-soup-contains(Product)"
    },
    "fields": {
      "url": {
        "type": "terminal",
        "extractor": {
          "type": "json",
          "path": "url",
          "post_processor": {
            "type": "url"
          }
        }
      },
      "brand": {
        "type": "terminal",
        "extractor": {
          "type": "json",
          "path": "brand.name"
        }
      },
      "name": {
        "type": "terminal",
        "extractor": {
          "type": "json",
          "path": "name"
        }
      },
      "category": {
        "type": "terminal",
        "extractor": {
          "type": "json",
          "path": "category"
        }
      },
      "sku": {
        "type": "terminal",
        "extractor": {
          "type": "json",
          "path": "sku"
        }
      },
      "description": {
        "type": "terminal",
        "extractor": {
          "type": "json",
          "path": "description"
        }
      },
      "price": {
        "type": "terminal",
        "extractor": {
          "type": "json",
          "path": "offers.price",
          "post_processor": {
            "type": "number"
          }
        }
      },
      "currency": {
        "type": "terminal",
        "extractor": {
          "type": "json",
          "path": "offers.priceCurrency"
        }
      },
      "image_urls": {
        "type": "terminal_list",
        "selector": {
          "type": "json",
          "path": "image[*]"
        },
        "extractor": {
          "type": "json",
          "path": "contentURL",
          "post_processor": {
            "type": "url"
          }
        }
      },
      "rating_score": {
        "type": "terminal",
        "extractor": {
          "type": "json",
          "path": "aggregateRating.ratingValue",
          "post_processor": {
            "type": "number"
          }
        }
      },
      "rating_count": {
        "type": "terminal",
        "extractor": {
          "type": "json",
          "path": "aggregateRating.reviewCount",
          "post_processor": {
            "type": "number"
          }
        }
      },
      "is_available": {
        "type": "terminal",
        "extractor": {
          "type": "json",
          "path": "offers.availability",
          "post_processor": {
            "type": "boolean",
            "condition": "contains",
            "contains": "InStock"
          }
        }
      }
    }
  }
  ```

  ### Example Output

  ```json theme={"system"}
  {
    "url": "https://www.etsy.com/listing/1487833925/crochet-pattern-flower-cat-hat-crochet",
    "brand": "HatsonCatsCrochet",
    "name": "CROCHET PATTERN - Flower Cat Hat Crochet Pattern Digital PDF, Sunflower Pet Hat Crochet Pattern, Cat Hat Crochet Pattern",
    "category": "Craft Supplies & Tools < Patterns & How To < Patterns & Blueprints",
    "sku": "1487833925",
    "description": "***This is a CROCHET PATTERN - you will get a PDF document online...",
    "price": 4.2,
    "currency": "EUR",
    "image_urls": [
      "https://i.etsystatic.com/42395346/r/il/31e0a6/5935941239/il_fullxfull.5935941239_bnss.jpg",
      "https://i.etsystatic.com/42395346/r/il/22aeda/5935940175/il_fullxfull.5935940175_3koh.jpg",
      "https://i.etsystatic.com/42395346/r/il/6994bb/5887867454/il_fullxfull.5887867454_9d7z.jpg"
    ],
    "rating_score": 4.9,
    "rating_count": 233,
    "is_available": true
  }
  ```

  ### API Request Example

  <CodeGroup>
    ```python Python theme={"system"}
    from nimble_python import Nimble

    nimble = Nimble(api_key="YOUR-API-KEY")

    result = nimble.extract(
        url="https://www.etsy.com/il-en/listing/1487833925/crochet-pattern-flower-cat-hat-crochet",
        parse=True,
        parser={
            "type": "schema",
            "selector": {
                "type": "css",
                "css_selector": "script[type='application/ld+json']:-soup-contains(Product)"
            },
            "fields": {
                # ... (full parser structure as shown above)
            }
        }
    )

    print(result)
    ```

    ```javascript Node theme={"system"}
    import Nimble from "@nimble-way/nimble-js";

    const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

    const result = await nimble.extract({
      url: "https://www.etsy.com/il-en/listing/1487833925/crochet-pattern-flower-cat-hat-crochet",
      parse: true,
      parser: {
        type: "schema",
        selector: {
          type: "css",
          css_selector:
            "script[type='application/ld+json']:-soup-contains(Product)",
        },
        fields: {
          // ... (full parser structure as shown above)
        },
      },
    });

    console.log(result);
    ```

    ```bash cURL theme={"system"}
    curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
    --header 'Authorization: Bearer <YOUR-API-KEY>' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "url": "https://www.etsy.com/il-en/listing/1487833925/crochet-pattern-flower-cat-hat-crochet",
        "parse": true,
        "parser": {
            "type": "schema",
            "selector": {
                "type": "css",
                "css_selector": "script[type=\"application/ld+json\"]:-soup-contains(Product)"
            },
            "fields": {
                ...
            }
        }
    }'
    ```
  </CodeGroup>

  ### Key Takeaways

  <Note>
    **Advantages of Parsing LD+JSON:**

    * **Cleaner data:** JSON is already structured, no need to navigate complex HTML
    * **More reliable:** Less likely to break than HTML selectors when pages are redesigned
    * **Richer data:** Often contains data not visible on the page
    * **Standardized:** Follows Schema.org standards across many websites
  </Note>

  <Tip>
    **JSONPath Tips:**

    * Use `.` for nested objects: `brand.name`
    * Use `[*]` for arrays: `image[*]`
    * Combine them: `reviews[*].author.name`
    * Test JSONPath expressions at [jsonpath.com](https://jsonpath.com)
  </Tip>
</Expandable>

### Parsing XML Document with XPath

XPath provides a powerful query language for parsing XML documents like RSS feeds, sitemaps, product catalogs, and other structured XML data. Unlike CSS selectors designed for HTML, XPath is specifically built for XML navigation.

<Note>
  **When to use XPath:**

  * Parsing RSS/Atom feeds
  * Extracting data from XML sitemaps
  * Processing XML APIs and data exports
  * Handling namespaced XML documents
</Note>

<Expandable title="Complete Walkthrough">
  ### Parsing an RSS Feed

  RSS feeds are a common XML format for syndicating content. Let's parse a typical RSS feed structure.

  **XML Structure:**

  ```xml theme={"system"}
  <?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>Example RSS Feed</title>
      <link>https://example.com</link>
      <description>A sample RSS feed</description>
      <item>
        <title>Getting Started with XPath</title>
        <link>https://example.com/xpath-guide</link>
        <description>Learn how to use XPath for XML parsing</description>
        <pubDate>Mon, 01 Jan 2024 10:00:00 GMT</pubDate>
      </item>
      <item>
        <title>Advanced XML Techniques</title>
        <link>https://example.com/xml-advanced</link>
        <description>Deep dive into XML parsing strategies</description>
        <pubDate>Tue, 02 Jan 2024 14:30:00 GMT</pubDate>
      </item>
    </channel>
  </rss>
  ```

  **Target Schema:**

  ```json theme={"system"}
  {
    "feed_title": "string",
    "articles": [
      {
        "title": "string",
        "link": "string",
        "description": "string",
        "published_date": "string"
      }
    ]
  }
  ```

  **Complete Parser:**

  ```json theme={"system"}
  {
    "type": "schema",
    "description": "Parses an RSS feed into structured data",
    "fields": {
      "feed_title": {
        "type": "terminal",
        "description": "The title of the RSS feed",
        "selector": {
          "type": "xpath",
          "path": "/rss/channel/title"
        },
        "extractor": {
          "type": "text"
        }
      },
      "articles": {
        "type": "schema_list",
        "description": "List of articles from the RSS feed",
        "selector": {
          "type": "xpath",
          "path": "//item"
        },
        "fields": {
          "title": {
            "type": "terminal",
            "selector": {
              "type": "xpath",
              "path": ".//title"
            },
            "extractor": {
              "type": "text"
            }
          },
          "link": {
            "type": "terminal",
            "selector": {
              "type": "xpath",
              "path": ".//link"
            },
            "extractor": {
              "type": "text"
            }
          },
          "description": {
            "type": "terminal",
            "selector": {
              "type": "xpath",
              "path": ".//description"
            },
            "extractor": {
              "type": "text"
            }
          },
          "published_date": {
            "type": "terminal",
            "selector": {
              "type": "xpath",
              "path": ".//pubDate"
            },
            "extractor": {
              "type": "text",
              "post_processor": {
                "type": "date"
              }
            }
          }
        }
      }
    }
  }
  ```

  **Key Points:**

  * **Absolute XPath:** `/rss/channel/title` starts from document root
  * **Descendant selector:** `//item` finds all item elements anywhere in the document
  * **Relative XPath:** `.//title` uses `.` to refer to the current context (the item element)
  * **Date post-processor:** Converts RFC 822 date format to ISO format

  ### Parsing XML Sitemaps with Namespaces

  XML sitemaps often include namespaces, which require special handling with the `local-name()` function.

  **XML Structure:**

  ```xml theme={"system"}
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://example.com/page1</loc>
      <lastmod>2024-01-01</lastmod>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>https://example.com/page2</loc>
      <lastmod>2024-01-02</lastmod>
      <priority>1.0</priority>
    </url>
  </urlset>
  ```

  **Parser:**

  ```json theme={"system"}
  {
    "type": "schema",
    "description": "Parses an XML sitemap",
    "fields": {
      "urls": {
        "type": "schema_list",
        "selector": {
          "type": "xpath",
          "path": "//*[local-name()='url']"
        },
        "fields": {
          "location": {
            "type": "terminal",
            "selector": {
              "type": "xpath",
              "path": ".//*[local-name()='loc']"
            },
            "extractor": {
              "type": "text"
            }
          },
          "last_modified": {
            "type": "terminal",
            "selector": {
              "type": "xpath",
              "path": ".//*[local-name()='lastmod']"
            },
            "extractor": {
              "type": "text",
              "post_processor": {
                "type": "date"
              }
            }
          },
          "priority": {
            "type": "terminal",
            "selector": {
              "type": "xpath",
              "path": ".//*[local-name()='priority']"
            },
            "extractor": {
              "type": "text",
              "post_processor": {
                "type": "number"
              }
            }
          }
        }
      }
    }
  }
  ```

  <Note>
    **Handling Namespaces:**

    The `local-name()` function ignores XML namespaces. Instead of `//*[name()='ns:url']` which requires namespace registration, use `//*[local-name()='url']` to select elements by name alone.

    * Without `local-name()`: `//ns:url` (requires namespace prefix)
    * With `local-name()`: `//*[local-name()='url']` (works regardless of namespace)
  </Note>

  ### Parsing XML with Filtering (Book Catalog)

  XPath predicates allow powerful filtering directly in the selector.

  **XML Structure:**

  ```xml theme={"system"}
  <?xml version="1.0" encoding="UTF-8"?>
  <catalog>
    <book id="bk101" category="fiction">
      <title>The Great Gatsby</title>
      <author>F. Scott Fitzgerald</author>
      <price>10.99</price>
      <year>1925</year>
    </book>
    <book id="bk102" category="non-fiction">
      <title>A Brief History of Time</title>
      <author>Stephen Hawking</author>
      <price>15.99</price>
      <year>1988</year>
    </book>
    <book id="bk103" category="fiction">
      <title>1984</title>
      <author>George Orwell</author>
      <price>9.99</price>
      <year>1949</year>
    </book>
  </catalog>
  ```

  <Expandable title="Example 1: Extract only fiction books">
    ```json theme={"system"}
    {
      "type": "schema_list",
      "description": "Extract only fiction books",
      "selector": {
        "type": "xpath",
        "path": "//book[@category='fiction']"
      },
      "fields": {
        "id": {
          "type": "terminal",
          "selector": {
            "type": "xpath",
            "path": "."
          },
          "extractor": {
            "type": "attr",
            "attr": "id"
          }
        },
        "title": {
          "type": "terminal",
          "selector": {
            "type": "xpath",
            "path": ".//title"
          },
          "extractor": {
            "type": "text"
          }
        },
        "author": {
          "type": "terminal",
          "selector": {
            "type": "xpath",
            "path": ".//author"
          },
          "extractor": {
            "type": "text"
          }
        },
        "price": {
          "type": "terminal",
          "selector": {
            "type": "xpath",
            "path": ".//price"
          },
          "extractor": {
            "type": "text",
            "post_processor": {
              "type": "number"
            }
          }
        }
      }
    }
    ```

    **Key Points:**

    * `[@category='fiction']` is an XPath predicate that filters elements
    * `.` in XPath refers to the current context node (the selected book element)
    * Attribute extractor with `attr: "id"` extracts the id attribute value
  </Expandable>

  <Expandable title="Example 2: Find a specific book by ID">
    ```json theme={"system"}
    {
      "type": "schema",
      "description": "Extract a specific book by ID",
      "selector": {
        "type": "xpath",
        "path": "//book[@id='bk101']"
      },
      "fields": {
        "title": {
          "type": "terminal",
          "selector": {
            "type": "xpath",
            "path": ".//title"
          },
          "extractor": {
            "type": "text"
          }
        },
        "author": {
          "type": "terminal",
          "selector": {
            "type": "xpath",
            "path": ".//author"
          },
          "extractor": {
            "type": "text"
          }
        }
      }
    }
    ```

    The predicate `[@id='bk101']` selects only the book with that specific ID.
  </Expandable>

  <Expandable title="Example 3: Books priced under $12">
    ```json theme={"system"}
    {
      "type": "schema_list",
      "description": "Extract books priced under $12",
      "selector": {
        "type": "xpath",
        "path": "//book[price < 12]"
      },
      "fields": {
        "title": {
          "type": "terminal",
          "selector": {
            "type": "xpath",
            "path": ".//title"
          },
          "extractor": {
            "type": "text"
          }
        },
        "price": {
          "type": "terminal",
          "selector": {
            "type": "xpath",
            "path": ".//price"
          },
          "extractor": {
            "type": "text",
            "post_processor": {
              "type": "number"
            }
          }
        }
      }
    }
    ```

    XPath predicates support numeric comparisons: `[price < 12]` filters books by price.
  </Expandable>

  ### Common XPath Patterns

  **Selecting Elements:**

  | Pattern       | Description                     | Example         |
  | ------------- | ------------------------------- | --------------- |
  | `//element`   | All elements with name anywhere | `//book`        |
  | `/root/child` | Direct child from root          | `/catalog/book` |
  | `.//element`  | Descendants of current node     | `.//title`      |
  | `..`          | Parent of current node          | `..`            |
  | `.`           | Current node                    | `.`             |

  **Filtering with Predicates:**

  | Pattern                   | Description                  | Example                       |
  | ------------------------- | ---------------------------- | ----------------------------- |
  | `[@attr='value']`         | Element with attribute value | `//book[@category='fiction']` |
  | `[position()=1]` or `[1]` | First element                | `//book[1]`                   |
  | `[last()]`                | Last element                 | `//item[last()]`              |
  | `[price < 10]`            | Numeric comparison           | `//book[price < 10]`          |
  | `[@attr]`                 | Has attribute                | `//book[@id]`                 |

  **Handling Namespaces:**

  | Pattern                   | Description       | Example                   |
  | ------------------------- | ----------------- | ------------------------- |
  | `local-name()='element'`  | Ignore namespace  | `//*[local-name()='url']` |
  | `name()='prefix:element'` | Match with prefix | `//*[name()='atom:link']` |

  **Advanced Patterns:**

  | Pattern                                              | Description             |
  | ---------------------------------------------------- | ----------------------- |
  | `//book[@category='fiction' and price < 12]`         | Multiple AND conditions |
  | `//book[@category='fiction' or @category='science']` | OR conditions           |
  | `//book[contains(@id, 'bk10')]`                      | String contains check   |
  | `//book[position() > 1 and position() < 5]`          | Range selection         |

  ### API Request Example

  <CodeGroup>
    ```python Python theme={"system"}
    from nimble_python import Nimble

    nimble = Nimble(api_key="YOUR-API-KEY")

    result = nimble.extract(
        url="https://example.com/feed.xml",
        parse=True,
        parser={
            "type": "schema",
            "fields": {
                "feed_title": {
                    "type": "terminal",
                    "selector": {
                        "type": "xpath",
                        "path": "/rss/channel/title"
                    },
                    "extractor": {
                        "type": "text"
                    }
                },
                "articles": {
                    "type": "schema_list",
                    "selector": {
                        "type": "xpath",
                        "path": "//item"
                    },
                    "fields": {
                        # ... (fields as shown above)
                    }
                }
            }
        }
    )

    print(result)
    ```

    ```javascript Node theme={"system"}
    import Nimble from "@nimble-way/nimble-js";

    const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

    const result = await nimble.extract({
      url: "https://example.com/feed.xml",
      parse: true,
      parser: {
        type: "schema",
        fields: {
          feed_title: {
            type: "terminal",
            selector: {
              type: "xpath",
              path: "/rss/channel/title",
            },
            extractor: {
              type: "text",
            },
          },
          articles: {
            type: "schema_list",
            selector: {
              type: "xpath",
              path: "//item",
            },
            fields: {
              // ... (fields as shown above)
            },
          },
        },
      },
    });

    console.log(result);
    ```

    ```bash cURL theme={"system"}
    curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
    --header 'Authorization: Bearer <YOUR-API-KEY>' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "url": "https://example.com/feed.xml",
        "parse": true,
        "parser": {
            "type": "schema",
            "fields": {
                "feed_title": {
                    "type": "terminal",
                    "selector": {
                        "type": "xpath",
                        "path": "/rss/channel/title"
                    },
                    "extractor": {
                        "type": "text"
                    }
                },
                "articles": {
                    "type": "schema_list",
                    "selector": {
                        "type": "xpath",
                        "path": "//item"
                    },
                    "fields": {
                        ...
                    }
                }
            }
        }
    }'
    ```
  </CodeGroup>

  ### Best Practices for XML Parsing

  <Tip>
    **Use Relative XPath in Nested Parsers**

    When working with nested schema parsers, use relative XPath expressions (starting with `.//`) to keep selectors scoped to the parent element. This makes parsers more maintainable and performant.
  </Tip>

  <Note>
    **Namespace Handling**

    When parsing XML with namespaces (like sitemaps, Atom feeds), use `local-name()` to ignore namespaces unless you need to distinguish between elements with the same name in different namespaces.
  </Note>

  <Warning>
    **Element-Only Results**

    XPath selectors only return Element nodes. Use the `text` or `attr` extractors to get data from the selected elements. Don't try to select text nodes directly with `//title/text()`.
  </Warning>

  <Tip>
    **Combine with Post-Processors**

    Use post-processors to convert extracted text to appropriate data types:

    * `date` for timestamps and dates
    * `number` for numeric values
    * `url` for making relative URLs absolute
  </Tip>

  ### Combining XPath with Other Selectors

  You can combine XPath with CSS selectors using sequence selectors:

  ```json theme={"system"}
  {
    "type": "sequence",
    "sequence": [
      {
        "type": "css",
        "css_selector": "script[type='application/xml']"
      },
      {
        "type": "xpath",
        "path": "//item"
      }
    ]
  }
  ```

  This first uses CSS to find a script tag containing XML, then applies XPath to parse that XML.
</Expandable>

### Parsing Network API Calls from Target.com Product Page

Modern web applications often load data dynamically through API calls rather than embedding it directly in HTML. Nimble's network capture feature records these API responses, allowing you to parse structured JSON data directly from backend endpoints - often cleaner and more reliable than parsing the rendered HTML.

<Note>
  **What is Network Capture?**

  Network capture records API calls made by the browser while loading a page. This gives you access to the raw JSON responses from backend services, which often contain more complete data than what's visible in the HTML.
</Note>

<Expandable title="Complete Walkthrough">
  **Target URL:** `https://www.target.com/p/A-87562588`

  When you visit a Target product page, the browser makes an API call to `/pdp_client_v1` that returns comprehensive product data in JSON format. Instead of parsing the complex HTML, we can extract this data directly from the captured API response.

  ### How Network Capture Works

  1. **Enable network capture** with `render_options.capture_network_calls: true`
  2. **Access captured data** using the root selector followed by JSON path to `network_capture`
  3. **Filter by URL pattern** to find the specific API call
  4. **Parse the JSON response** using standard JSON extractors

  **Target Schema:**

  ```json theme={"system"}
  {
    "title": "string",
    "image_url": "string",
    "price": "number",
    "return_policy_best_guest": "string",
    "children_product_titles": ["string"]
  }
  ```

  ### Understanding network\_capture Structure

  The `network_capture` array contains all recorded API responses:

  ```json theme={"system"}
  {
    "network_capture": [
      {
        "url": "https://redsky.target.com/redsky_aggregations/v1/web/pdp_client_v1?...",
        "method": "GET",
        "status": 200,
        "response_body": {
          // Full JSON response from the API
        }
      }
    ]
  }
  ```

  ### Accessing Network Capture Data

  Use the root selector with JSON path to access network\_capture:

  ```json theme={"system"}
  {
    "type": "sequence",
    "sequence": [
      {
        "type": "root"
      },
      {
        "type": "json",
        "coercion_filter": "$.network_capture[?(@.url =~ /.*pdp_client_v1.*/)]",
        "path": "response_body.data"
      }
    ]
  }
  ```

  **Explanation:**

  * **Root selector:** Returns to the document root (escapes from HTML context)
  * **JSON selector:** Navigates into the network\_capture array
  * **coercion\_filter:** Uses JSONPath to filter API calls by URL pattern
    * `$.network_capture[?(...)]` iterates through captured requests
    * `@.url =~ /.*pdp_client_v1.*/` matches URLs containing "pdp\_client\_v1"
  * **path:** Navigates into the response body to the data field

  ### Field-by-Field Breakdown

  <Expandable title="Parsing: title">
    The product title is located at the top level of the product data.

    **API Response Structure:**

    ```json theme={"system"}
    {
      "data": {
        "product": {
          "item": {
            "product_description": {
              "title": "Apple Watch Series 9 GPS 45mm Midnight Aluminum Case..."
            }
          }
        }
      }
    }
    ```

    **Parser:**

    ```json theme={"system"}
    {
      "type": "terminal",
      "description": "Product title from API response",
      "selector": {
        "type": "sequence",
        "sequence": [
          {
            "type": "root"
          },
          {
            "type": "json",
            "coercion_filter": "$.network_capture[?(@.url =~ /.*pdp_client_v1.*/)]",
            "path": "response_body.data.product.item.product_description.title"
          }
        ]
      },
      "extractor": {
        "type": "raw"
      }
    }
    ```

    **Explanation:**

    * **Sequence selector:** First goes to root, then navigates into network\_capture
    * **coercion\_filter:** Finds the specific API call containing product data
    * **path:** Full JSONPath to the title field in the nested response
    * **raw extractor:** Returns the string value as-is
  </Expandable>

  <Expandable title="Parsing: image_url">
    The primary product image URL is nested within the enrichment data.

    **API Response Structure:**

    ```json theme={"system"}
    {
      "data": {
        "product": {
          "item": {
            "enrichment": {
              "images": {
                "primary_image_url": "https://target.scene7.com/is/image/Target/..."
              }
            }
          }
        }
      }
    }
    ```

    **Parser:**

    ```json theme={"system"}
    {
      "type": "terminal",
      "description": "Primary product image URL",
      "selector": {
        "type": "sequence",
        "sequence": [
          {
            "type": "root"
          },
          {
            "type": "json",
            "coercion_filter": "$.network_capture[?(@.url =~ /.*pdp_client_v1.*/)]",
            "path": "response_body.data.product.item.enrichment.images.primary_image_url"
          }
        ]
      },
      "extractor": {
        "type": "raw",
        "post_processor": {
          "type": "url"
        }
      }
    }
    ```

    **Explanation:**

    * **JSONPath:** Navigate deep into the nested structure to find the image URL
    * **url post-processor:** Ensures the URL is properly formatted and absolute
  </Expandable>

  <Expandable title="Parsing: price">
    The current price is in the formatted price field of the product.

    **API Response Structure:**

    ```json theme={"system"}
    {
      "data": {
        "product": {
          "price": {
            "formatted_current_price": "$399.00"
          }
        }
      }
    }
    ```

    **Parser:**

    ```json theme={"system"}
    {
      "type": "terminal",
      "description": "Current product price as number",
      "selector": {
        "type": "sequence",
        "sequence": [
          {
            "type": "root"
          },
          {
            "type": "json",
            "coercion_filter": "$.network_capture[?(@.url =~ /.*pdp_client_v1.*/)]",
            "path": "response_body.data.product.price.formatted_current_price"
          }
        ]
      },
      "extractor": {
        "type": "raw",
        "post_processor": {
          "type": "sequence",
          "sequence": [
            {
              "type": "regex",
              "regex": "[\\d,]+\\.\\d+"
            },
            {
              "type": "number"
            }
          ]
        }
      }
    }
    ```

    **Explanation:**

    * **JSONPath:** Navigate to the formatted\_current\_price field
    * **regex post-processor:** Extract numeric value from formatted string "\$399.00" → "399.00"
    * **number post-processor:** Convert string to actual number type: "399.00" → 399.00
    * **sequence:** Chain post-processors for multi-step transformation
  </Expandable>

  <Expandable title="Parsing: return_policy_best_guest (with JSONPath filtering)">
    The return policy is buried within an array of bullet points. We need to filter to find the specific bullet containing return information.

    **API Response Structure:**

    ```json theme={"system"}
    {
      "data": {
        "product": {
          "item": {
            "product_description": {
              "bullet_descriptions": [
                "<B>Returns:</B> This item must be returned within 30 days...",
                "<B>Packaging:</B> Shows what's inside...",
                "<B>Warranty:</B> 1 Year Limited Warranty..."
              ]
            }
          }
        }
      }
    }
    ```

    **Parser:**

    ```json theme={"system"}
    {
      "type": "terminal",
      "description": "Return policy extracted from bullet points",
      "selector": {
        "type": "sequence",
        "sequence": [
          {
            "type": "root"
          },
          {
            "type": "json",
            "coercion_filter": "$.network_capture[?(@.url =~ /.*pdp_client_v1.*/)]",
            "path": "response_body.data.product.item.product_description.bullet_descriptions[?(@=~/.*Returns:.*/)]"
          }
        ]
      },
      "extractor": {
        "type": "raw",
        "post_processor": {
          "type": "regex",
          "regex": "<B>Returns:</B>\\s*(.*)"
        }
      }
    }
    ```

    **Explanation:**

    * **JSONPath with filter:** `bullet_descriptions[?(@=~/.*Returns:.*/)]` filters array elements
      * `[?(...)]` is a JSONPath filter predicate
      * `@` represents the current array element
      * `=~` is the regex match operator
      * `/.*Returns:.*/` matches strings containing "Returns:"
    * **regex post-processor:** Extracts text after the "Returns:" label
      * `<B>Returns:</B>\\s*(.*)` captures everything after the label
      * Returns only the policy text, not the HTML tags

    <Tip>
      **JSONPath Filtering:** Use `[?(@=~/pattern/)]` to filter arrays by regex pattern, or `[?(@.field=='value')]` to filter by field value.
    </Tip>
  </Expandable>

  <Expandable title="Parsing: children_product_titles (extracting from array)">
    Extract titles of all child products (variations) from a nested array structure.

    **API Response Structure:**

    ```json theme={"system"}
    {
      "data": {
        "product": {
          "children": [
            {
              "item": {
                "product_description": {
                  "title": "Apple Watch Series 9 GPS 41mm Midnight Aluminum Case..."
                }
              }
            },
            {
              "item": {
                "product_description": {
                  "title": "Apple Watch Series 9 GPS 45mm Starlight Aluminum Case..."
                }
              }
            }
          ]
        }
      }
    }
    ```

    **Parser:**

    ```json theme={"system"}
    {
      "type": "terminal_list",
      "description": "Titles of all product variations",
      "selector": {
        "type": "sequence",
        "sequence": [
          {
            "type": "root"
          },
          {
            "type": "json",
            "coercion_filter": "$.network_capture[?(@.url =~ /.*pdp_client_v1.*/)]",
            "path": "response_body.data.product.children[*].item.product_description"
          }
        ]
      },
      "extractor": {
        "type": "json",
        "path": "title"
      }
    }
    ```

    **Explanation:**

    * **terminal\_list:** Returns an array of values instead of a single value
    * **JSONPath:** `children[*]` iterates over all elements in the children array
      * `[*]` expands to each child product
      * Continues navigation: `.item.product_description`
    * **json extractor:** From each product\_description object, extract the title field
    * **Result:** Array of all child product titles

    <Note>
      **Array Iteration:** The `[*]` notation in JSONPath makes the selector return multiple elements, which terminal\_list collects into an array.
    </Note>
  </Expandable>

  ### Complete Parser

  ```json theme={"system"}
  {
    "type": "schema",
    "description": "Parses Target product from network API call",
    "fields": {
      "title": {
        "type": "terminal",
        "description": "Product title",
        "selector": {
          "type": "sequence",
          "sequence": [
            {
              "type": "root"
            },
            {
              "type": "json",
              "coercion_filter": "$.network_capture[?(@.url =~ /.*pdp_client_v1.*/)]",
              "path": "response_body.data.product.item.product_description.title"
            }
          ]
        },
        "extractor": {
          "type": "raw"
        }
      },
      "image_url": {
        "type": "terminal",
        "description": "Primary product image",
        "selector": {
          "type": "sequence",
          "sequence": [
            {
              "type": "root"
            },
            {
              "type": "json",
              "coercion_filter": "$.network_capture[?(@.url =~ /.*pdp_client_v1.*/)]",
              "path": "response_body.data.product.item.enrichment.images.primary_image_url"
            }
          ]
        },
        "extractor": {
          "type": "raw",
          "post_processor": {
            "type": "url"
          }
        }
      },
      "price": {
        "type": "terminal",
        "description": "Current price",
        "selector": {
          "type": "sequence",
          "sequence": [
            {
              "type": "root"
            },
            {
              "type": "json",
              "coercion_filter": "$.network_capture[?(@.url =~ /.*pdp_client_v1.*/)]",
              "path": "response_body.data.product.price.formatted_current_price"
            }
          ]
        },
        "extractor": {
          "type": "raw",
          "post_processor": {
            "type": "sequence",
            "sequence": [
              {
                "type": "regex",
                "regex": "[\\d,]+\\.\\d+"
              },
              {
                "type": "number"
              }
            ]
          }
        }
      },
      "return_policy_best_guest": {
        "type": "terminal",
        "description": "Return policy text",
        "selector": {
          "type": "sequence",
          "sequence": [
            {
              "type": "root"
            },
            {
              "type": "json",
              "coercion_filter": "$.network_capture[?(@.url =~ /.*pdp_client_v1.*/)]",
              "path": "response_body.data.product.item.product_description.bullet_descriptions[?(@=~/.*Returns:.*/)]"
            }
          ]
        },
        "extractor": {
          "type": "raw",
          "post_processor": {
            "type": "regex",
            "regex": "<B>Returns:</B>\\s*(.*)",
            "group": 1
          }
        }
      },
      "children_product_titles": {
        "type": "terminal_list",
        "description": "Titles of product variations",
        "selector": {
          "type": "sequence",
          "sequence": [
            {
              "type": "root"
            },
            {
              "type": "json",
              "coercion_filter": "$.network_capture[?(@.url =~ /.*pdp_client_v1.*/)]",
              "path": "response_body.data.product.children[*].item.product_description"
            }
          ]
        },
        "extractor": {
          "type": "json",
          "path": "title"
        }
      }
    }
  }
  ```

  ### Example Output

  ```json theme={"system"}
  {
    "title": "Apple Watch Series 9 GPS 45mm Midnight Aluminum Case with Midnight Sport Band - M/L",
    "image_url": "https://target.scene7.com/is/image/Target/GUEST_3ad473cc-8f21-44c8-85ca-b9a1dee1806c",
    "price": 399.0,
    "return_policy_best_guest": "This item must be returned within 30 days of the date it was purchased in store, shipped, delivered by a Shipt shopper, or made ready for pickup.",
    "children_product_titles": [
      "Apple Watch Series 9 GPS 41mm Midnight Aluminum Case with Midnight Sport Band - S/M",
      "Apple Watch Series 9 GPS 41mm Midnight Aluminum Case with Midnight Sport Band - M/L",
      "Apple Watch Series 9 GPS 45mm Starlight Aluminum Case with Starlight Sport Band - S/M",
      "Apple Watch Series 9 GPS 45mm Starlight Aluminum Case with Starlight Sport Band - M/L"
    ]
  }
  ```

  ### API Request Example

  <CodeGroup>
    ```python Python theme={"system"}
    from nimble_python import Nimble

    nimble = Nimble(api_key="YOUR-API-KEY")

    result = nimble.extract(
        url="https://www.target.com/p/A-87562588",
        parse=True,
        render=True,
        render_options={
            "capture_network_calls": True
        },
        parser={
            "type": "schema",
            "description": "Parses Target product from network API call",
            "fields": {
                "title": {
                    "type": "terminal",
                    "selector": {
                        "type": "sequence",
                        "sequence": [
                            {
                                "type": "root"
                            },
                            {
                                "type": "json",
                                "coercion_filter": "$.network_capture[?(@.url =~ /.*pdp_client_v1.*/)]",
                                "path": "response_body.data.product.item.product_description.title"
                            }
                        ]
                    },
                    "extractor": {
                        "type": "raw"
                    }
                },
                # ... (other fields as shown above)
            }
        }
    )

    print(result)
    ```

    ```javascript Node theme={"system"}
    import Nimble from "@nimble-way/nimble-js";

    const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

    const result = await nimble.extract({
      url: "https://www.target.com/p/A-87562588",
      parse: true,
      render: true,
      render_options: {
        capture_network_calls: true,
      },
      parser: {
        type: "schema",
        description: "Parses Target product from network API call",
        fields: {
          title: {
            type: "terminal",
            selector: {
              type: "sequence",
              sequence: [
                {
                  type: "root",
                },
                {
                  type: "json",
                  coercion_filter:
                    "$.network_capture[?(@.url =~ /.*pdp_client_v1.*/)]",
                  path: "response_body.data.product.item.product_description.title",
                },
              ],
            },
            extractor: {
              type: "raw",
            },
          },
          // ... (other fields as shown above)
        },
      },
    });

    console.log(result);
    ```

    ```bash cURL theme={"system"}
    curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
    --header 'Authorization: Bearer <YOUR-API-KEY>' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "url": "https://www.target.com/p/A-87562588",
        "parse": true,
        "render": true,
        "render_options": {
            "capture_network_calls": true
        },
        "parser": {
            "type": "schema",
            "description": "Parses Target product from network API call",
            "fields": {
                "title": {
                    "type": "terminal",
                    "selector": {
                        "type": "sequence",
                        "sequence": [
                            {
                                "type": "root"
                            },
                            {
                                "type": "json",
                                "coercion_filter": "$.network_capture[?(@.url =~ /.*pdp_client_v1.*/)]",
                                "path": "response_body.data.product.item.product_description.title"
                            }
                        ]
                    },
                    "extractor": {
                        "type": "raw"
                    }
                }
            }
        }
    }'
    ```
  </CodeGroup>

  <Warning>
    **Important:** You must set `render: true` and
    `render_options.capture_network_calls: true` to enable network capture.
    Without these settings, the `network_capture` field will not be available.
  </Warning>

  ### Key Takeaways

  <Note>
    **Advantages of Parsing Network Calls:**

    * **Cleaner data:** API responses contain structured JSON, not cluttered HTML
    * **More complete:** Backend APIs often return data not visible in the rendered page
    * **More stable:** API response structures change less frequently than HTML layouts
    * **Better performance:** Parse smaller JSON payloads instead of large HTML documents
    * **Access to internal data:** Capture data from authenticated or dynamic API endpoints
  </Note>

  <Tip>
    **Network Capture Best Practices:**

    * **URL filtering:** Use regex patterns in `coercion_filter` to find specific API calls
      * `$.network_capture[?(@.url =~ /.*api_endpoint.*/)]`
    * **Method filtering:** Filter by HTTP method if needed
      * `$.network_capture[?(@.method=='POST')]`
    * **Multiple filters:** Combine conditions with `&&`
      * `$.network_capture[?(@.url =~ /.*products.*/ && @.status==200)]`
    * **Inspect first:** Check browser DevTools Network tab to identify API endpoints
    * **Test JSONPath:** Use online JSONPath evaluators to test your path expressions
  </Tip>

  <Tip>
    **When to Use Network Capture:**

    * Single-page applications (SPAs) that load data via JavaScript
    * Pages with lazy-loaded or infinite scroll content
    * E-commerce sites with dynamic pricing and inventory
    * Social media feeds and comment sections
    * Any page where data is fetched from GraphQL or REST APIs
  </Tip>
</Expandable>

## Best Practices

### Use specific selectors

Prefer specific selectors over generic ones:

```json theme={"system"}
// ✅ Good
{ "type": "css", "css_selector": ".product-card .price-value" }

// ❌ Avoid
{ "type": "css", "css_selector": ".price" }
```

### Leverage fallback logic with `or` parser

Handle page variations gracefully:

```json theme={"system"}
{
  "type": "or",
  "parsers": [
    {
      "type": "terminal",
      "selector": { "type": "css", "css_selector": ".new-layout" },
      "extractor": { "type": "text" }
    },
    {
      "type": "terminal",
      "selector": { "type": "css", "css_selector": ".old-layout" },
      "extractor": { "type": "text" }
    }
  ]
}
```

### Chain post processors for complex transformations

Use `sequence` post processor for multi-step transformations:

```json theme={"system"}
{
  "extractor": {
    "type": "text",
    "post_processor": {
      "type": "sequence",
      "sequence": [
        { "type": "regex", "regex": "\\d+\\.\\d+" },
        { "type": "number" },
        { "type": "format", "format": "${data} USD" }
      ]
    }
  }
}
```

### Add descriptions for documentation

```json theme={"system"}
{
  "type": "terminal",
  "description": "Extracts product price and converts to number",
  "selector": { ... },
  "extractor": { ... }
}
```

### Use relative paths in nested contexts

When working within a nested selector, use relative paths:

```json theme={"system"}
{
  "type": "schema",
  "selector": {
    "type": "css",
    "css_selector": ".product-card"
  },
  "fields": {
    "name": {
      "type": "terminal",
      "selector": {
        "type": "css",
        "css_selector": ".name" // Relative to .product-card
      },
      "extractor": { "type": "text" }
    }
  }
}
```
