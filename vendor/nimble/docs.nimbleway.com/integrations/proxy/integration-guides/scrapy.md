> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Scrapy

> Connect Nimble Proxy with Scrapy

Scrapy is a popular open-source web crawling and scraping framework for Python. It's used to crawl websites and extract structured data from their pages, making it ideal for data mining, monitoring, and automated testing.

By integrating Nimble with Scrapy, you can route your crawling requests through residential IPs, enabling access to geo-restricted content and avoiding IP-based blocking at scale.

## Prerequisites

* Python 3.8+ installed on your system
* Nimble account with API credentials

## **Follow these steps to integrate Nimble**

<Steps>
  <Step title="Install the Scrapy-Nimble package" titleSize="h3">
    Install the official Nimble middleware for Scrapy:

    ```bash theme={"system"}
    pip install scrapy-nimble
    ```
  </Step>

  <Step title="Get your API credentials" titleSize="h3">
    * Log in to your [Nimble Dashboard](https://app.nimbleway.com)
    * Navigate to Account Settings to find your API credentials
    * You'll need your username and password for the configuration
  </Step>

  <Step title="Configure your Scrapy settings" titleSize="h3">
    Update your project's `settings.py` file to enable the Nimble middleware:

    ```python theme={"system"}
    # Enable Nimble integration
    NIMBLE_ENABLED = True

    # Your Nimble credentials
    NIMBLE_USERNAME = "your-username"
    NIMBLE_PASSWORD = "your-password"

    # Register the Nimble middleware
    DOWNLOADER_MIDDLEWARES = {
        "scrapy_nimble.middlewares.NimbleWebApiMiddleware": 570,
    }
    ```

    <Warning>
      Ensure the Nimble middleware priority (570) is set to run before the default `HttpCompressionMiddleware` (590).
    </Warning>
  </Step>
</Steps>

## Using Nimble in your spiders

Once configured, you can use Nimble features in your spider requests via the `meta` parameter:

```python theme={"system"}
import scrapy

class MySpider(scrapy.Spider):
    name = "my_spider"

    def start_requests(self):
        yield scrapy.Request(
            url="https://example.com",
            callback=self.parse,
            meta={
                "nimble_render": True,      # Enable JavaScript rendering
                "nimble_country": "US",     # Geo-target to US
                "nimble_locale": "en",      # Set locale
            }
        )

    def parse(self, response):
        # Your parsing logic here
        title = response.css("title::text").get()
        yield {"title": title}
```

## Available request options

| Meta Parameter   | Type    | Description                                                        |
| ---------------- | ------- | ------------------------------------------------------------------ |
| `nimble_render`  | boolean | Enable JavaScript rendering                                        |
| `nimble_country` | string  | Two-letter country code for geo-targeting (e.g., "US", "DE", "GB") |
| `nimble_locale`  | string  | Locale setting for the request                                     |

## Example spider with geo-targeting

```python theme={"system"}
import scrapy

class GeoSpider(scrapy.Spider):
    name = "geo_spider"

    countries = ["US", "GB", "DE", "FR"]

    def start_requests(self):
        for country in self.countries:
            yield scrapy.Request(
                url="https://example.com",
                callback=self.parse,
                meta={
                    "nimble_country": country,
                    "nimble_render": True,
                },
                cb_kwargs={"country": country}
            )

    def parse(self, response, country):
        yield {
            "country": country,
            "title": response.css("title::text").get(),
            "content_length": len(response.body),
        }
```

## Development setup

For local development, we recommend using a virtual environment:

```bash theme={"system"}
# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install scrapy scrapy-nimble

# Create a new Scrapy project
scrapy startproject myproject
```

That's all! Scrapy will now route all requests through Nimble's infrastructure.
