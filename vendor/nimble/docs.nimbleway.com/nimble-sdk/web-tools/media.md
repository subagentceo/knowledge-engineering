> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Media

> Download images, videos, and other media files directly via URL

Nimble **Media Download** fetches media files (images, videos, audio, documents) directly from any URL using Nimble's infrastructure. Bypass geo-restrictions and access controls while controlling the exact MIME types you expect — receiving the raw binary file in the response.

Two modes are available: **Realtime** for instant binary downloads, and **Async** for cloud-based delivery where the file is saved directly to your own storage bucket.

## Quick Start

### Example Request

<CodeGroup>
  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/media' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://example.com/product-image.jpg",
      "expected_mime_types": ["image/*"]
  }' \
  --output image.jpg
  ```
</CodeGroup>

### Example Response

The realtime endpoint returns the **raw binary file** — not JSON. The response `Content-Type` header will reflect the actual MIME type of the downloaded file (e.g. `image/webp`, `image/jpeg`, `video/mp4`).

```
< HTTP/2 200
< Content-Type: image/jpeg
< Content-Length: 48291

[binary image data]
```

## How it works

<Steps>
  <Step title="You provide a media URL">
    Supply the URL of the media file you want to download, along with optional
    geo-targeting and MIME type filters
  </Step>

  <Step title="Nimble fetches the file">
    Routes the request through Nimble's infrastructure - Applies geo-targeting
    if specified - Validates the response against your expected MIME types
  </Step>

  <Step title="You receive the media">
    * **Realtime:** The binary file is streamed directly back in the HTTP
      response - **Async:** The file is uploaded to your cloud storage bucket and
      a task ID is returned - sad
  </Step>
</Steps>

## Parameters

Supported input parameters for both endpoints:

<AccordionGroup>
  <Accordion icon="link" title="url - Required">
    <ParamField path="url" type="string" required>
      The URL of the media file to download.

      **Example:** `https://example.com/product-image.jpg`
    </ParamField>
  </Accordion>

  <Accordion icon="file-image" title="expected_mime_types">
    <ParamField path="expected_mime_types" type="array">
      List of acceptable MIME types. Wildcards are supported. If the fetched file does not match one of these types, the request will fail.

      **Examples:**

      * `["image/*"]` — any image format
      * `["image/webp", "image/jpeg"]` — specific image formats
      * `["video/mp4"]` — MP4 video only
      * `["image/*", "video/mp4"]` — images or MP4

      If omitted, any MIME type is accepted.
    </ParamField>
  </Accordion>

  <Accordion icon="globe" title="country">
    <ParamField path="country" type="string">
      Fetch the media as if requesting from a specific country. Useful for geo-restricted content.

      Use ISO Alpha-2 country codes like `US`, `GB`, `FR`, `DE`, `CA`, `JP`, etc.

      **Example:** `US`
    </ParamField>
  </Accordion>

  <Accordion icon="language" title="locale">
    <ParamField path="locale" type="string">
      LCID standard locale for the request. Use `auto` to automatically select the locale based on the `country` parameter.

      **Examples:**

      * `en-US` — English (United States)
      * `en-GB` — English (United Kingdom)
      * `fr-FR` — French (France)
      * `auto` — automatic based on country
    </ParamField>
  </Accordion>
</AccordionGroup>

### Async-only parameters

The following additional parameter is only available on the `/media/async` endpoint:

<AccordionGroup>
  <Accordion icon="cloud" title="storage - Required for async">
    <ParamField path="storage" type="object" required>
      Cloud storage destination where the downloaded media file will be saved. Only S3 is currently supported.

      **Fields:**

      * `url` (required) — Storage path in the format `s3://bucket-name/path/`
      * `type` — Storage provider: `s3` (default), `gcs`, `do`
      * `object_name` — Custom filename without extension (e.g. `product-123`)

      <Warning>
        Each `object_name` must be unique. Submitting two requests with the same
        name will overwrite the first file. Use a unique prefix or suffix to
        avoid collisions — for example `product_{id}` or
        `media_{date}_{timestamp}`.
      </Warning>

      **Example:**

      ```json theme={"system"}
      {
        "storage": {
          "url": "s3://my-bucket/media/",
          "type": "s3",
          "object_name": "product-123"
        }
      }
      ```
    </ParamField>
  </Accordion>
</AccordionGroup>

## Usage

### Realtime download

Download a media file and save it locally:

<CodeGroup>
  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/media' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://example.com/product-image.jpg"
  }' \
  --output output.jpg
  ```
</CodeGroup>

### With MIME type filtering

Validate the response type before accepting the file:

<CodeGroup>
  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/media' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://example.com/hero-banner.webp",
      "expected_mime_types": ["image/webp", "image/jpeg", "image/png"]
  }' \
  --output banner.webp
  ```
</CodeGroup>

### Geo-targeted download

Fetch geo-restricted media from a specific region:

<CodeGroup>
  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/media' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://example.com/regional-image.jpg",
      "country": "DE",
      "locale": "de-DE",
      "expected_mime_types": ["image/*"]
  }' \
  --output regional.jpg
  ```
</CodeGroup>

## Async API

For large files or async workflows, use the async endpoint to have Nimble upload the file directly to your cloud storage bucket.

### Parameters

<AccordionGroup>
  <Accordion icon="cloud" title="storage.url — Required">
    <ParamField path="storage.url" type="string" required>
      Bucket path where the media file will be saved.

      **Format:** `s3://bucket-name/path/`

      **Example:** `s3://my-bucket/media/`
    </ParamField>
  </Accordion>

  <Accordion icon="server" title="storage.type">
    <ParamField path="storage.type" type="string" default="s3">
      Storage provider. Currently supported: `s3` (Amazon S3), `gcs` (Google Cloud Storage), `do` (DigitalOcean Spaces).
    </ParamField>
  </Accordion>

  <Accordion icon="tag" title="storage.object_name">
    <ParamField path="storage.object_name" type="string">
      Custom filename without extension (e.g. `product-123`). The original file extension is appended automatically.

      <Warning>
        Each `object_name` must be unique. Submitting two requests with the same
        name will overwrite the first file. Use a unique prefix or suffix to
        avoid collisions — for example `product_{id}` or
        `media_{date}_{timestamp}`.
      </Warning>
    </ParamField>
  </Accordion>
</AccordionGroup>

<Warning>
  Cloud storage delivery requires bucket permissions to be configured before
  use. See [Bucket
  Permissions](/nimble-sdk/admin/callbacks-and-delivery#configure-bucket-permissions-one-time)
  for setup instructions.
</Warning>

### Example Request

Submit a request and receive a `task_id` immediately — the file is uploaded to your bucket in the background.

```bash cURL theme={"system"}
curl -X POST 'https://sdk.nimbleway.com/v1/media/async' \
--header 'Authorization: Bearer <YOUR-API-KEY>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "url": "https://example.com/product-image.jpg",
    "country": "US",
    "locale": "en-US",
    "expected_mime_types": ["image/*"],
    "storage": {
        "url": "s3://my-bucket/media/",
        "type": "s3",
        "object_name": "product-123"
    }
}'
```

```json Response theme={"system"}
{
  "status": "success",
  "task": {
    "id": "52907745-7672-470e-1231-a2f8feb52944",
    "state": "pending"
  }
}
```

Use the `task.id` to poll for status. The file is ready when `task.state` returns `success`.

<Tip>
  Polling and cloud storage delivery are both supported. See [Callbacks &
  Delivery](/nimble-sdk/admin/callbacks-and-delivery) for the full guide.
</Tip>

## Response

### Realtime response

The response body is the **raw binary file**. Use the `Content-Type` response header to determine the actual file format.

| Header           | Description                                                                     |
| ---------------- | ------------------------------------------------------------------------------- |
| `Content-Type`   | MIME type of the downloaded file (e.g. `image/jpeg`, `image/webp`, `video/mp4`) |
| `Content-Length` | File size in bytes                                                              |

### Async response

Returns a task object immediately. The file is uploaded to your storage destination in the background.

<Accordion title="Example Response">
  ```json theme={"system"}
  {
    "status": "success",
    "task": {
      "id": "52907745-7672-470e-1231-a2f8feb52944",
      "state": "pending",
      "created_at": "2026-03-02T12:00:00.000Z",
      "modified_at": "2026-03-02T12:00:00.000Z",
      "account_name": "my-account",
      "api_type": "media",
      "input": {
        "url": "https://example.com/product-image.jpg",
        "country": "US",
        "locale": "en-US",
        "expected_mime_types": ["image/*"],
        "storage": {
          "url": "s3://my-bucket/media/",
          "type": "s3",
          "object_name": "product-123"
        }
      }
    }
  }
  ```
</Accordion>

| Field        | Type   | Description                                  |
| ------------ | ------ | -------------------------------------------- |
| `status`     | string | Request status: `success` or `error`         |
| `task.id`    | string | Task ID for tracking the async job           |
| `task.state` | string | `pending`, `processing`, `success`, `failed` |
| `task.input` | object | The original request parameters echoed back  |

Once the task completes, the media file will be available at the path specified in `storage.url` + `storage.object_name` (with the original file extension).

<Note>
  The async endpoint uses cloud-based delivery only — the file is saved directly
  to your storage bucket. There are no callback URLs for this endpoint.
</Note>

## Use cases

<CardGroup cols={2}>
  <Card title="Product Image Collection" icon="image">
    Download product images from e-commerce sites at scale for catalog building
    or price monitoring
  </Card>

  <Card title="Media Archiving" icon="box-archive">
    Archive images, videos, and documents from websites before they disappear
  </Card>

  <Card title="Geo-restricted Content" icon="globe">
    Access region-locked media by routing requests through the appropriate
    country
  </Card>

  <Card title="AI Training Data" icon="brain">
    Build large-scale image, video, and audio datasets for training and
    fine-tuning machine learning models
  </Card>
</CardGroup>

### Real-world examples

<AccordionGroup>
  <Accordion icon="brain" title="AI training data collection">
    **Scenario:** You're building an image or video dataset to train or fine-tune a machine learning model.

    **How Media Download helps:**

    * Collect images, videos, and audio files from any public URL at scale
    * Use `expected_mime_types` to enforce consistent file formats across your dataset
    * Async mode saves files directly to S3, ready for your training pipeline
    * Geo-targeting lets you collect region-specific visual data for diverse datasets

    **Result:** Clean, validated media dataset delivered straight to your storage bucket.
  </Accordion>

  <Accordion icon="store" title="E-commerce product image pipeline">
    **Scenario:** You're building a product catalog and need to collect images from multiple retailer websites.

    **How Media Download helps:**

    * Downloads images directly without needing to manage proxies
    * Validates MIME types to ensure you only store actual images
    * Geo-targeting lets you access region-specific product images
    * Async mode saves images directly to S3 without intermediate storage

    **Result:** Automated image pipeline ready for your product database.
  </Accordion>

  <Accordion icon="newspaper" title="News media archiving">
    **Scenario:** You want to archive images from news articles before they are removed.

    **How Media Download helps:**

    * Downloads images reliably through Nimble's infrastructure
    * Accepts wildcard MIME types (`image/*`) to handle any image format
    * Async delivery stores files directly to your archive bucket

    **Result:** Durable media archive from any news source.
  </Accordion>

  <Accordion icon="film" title="Video content collection">
    **Scenario:** You need to collect video clips from various websites for analysis.

    **How Media Download helps:**

    * Specify `expected_mime_types: ["video/mp4"]` to only accept video files
    * Use geo-targeting for region-locked video content
    * Async mode handles large file sizes without timeout issues

    **Result:** Reliable video collection with format validation.
  </Accordion>
</AccordionGroup>

## Pricing

Media Download is billed per GB of data downloaded using the `Media-VX6` driver. Only successful downloads count toward usage.

| Driver      | PAYG Price  |
| ----------- | ----------- |
| `Media-VX6` | \$2.00 / GB |

[View full pricing](/nimble-sdk/admin/pricing)

## Next steps

<CardGroup cols={2}>
  <Card icon="arrows-to-circle" href="/nimble-sdk/web-tools/extract/quickstart" title="Extract">
    Extract structured data and HTML from web pages
  </Card>

  <Card icon="sitemap" href="/nimble-sdk/web-tools/map" title="Map">
    Discover media URLs across an entire website before downloading
  </Card>
</CardGroup>
