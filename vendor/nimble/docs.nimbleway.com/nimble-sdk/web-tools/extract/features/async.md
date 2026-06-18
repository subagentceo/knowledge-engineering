> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Async & Batch

> Run extraction tasks asynchronously or submit multiple URLs in a single batch request

Extract data in the background with async requests, or submit multiple URLs at once with batch. Both modes return immediately without blocking your application while Nimble processes the work.

## Quick Start

<Tabs>
  <Tab title="Async">
    <CodeGroup>
      ```python Python theme={"system"}
      from nimble_python import Nimble

      nimble = Nimble(api_key="YOUR_API_KEY")

      response = nimble.extract_async(
          url="https://www.example.com",
          render=True,
          formats=["markdown"]
      )

      print(f"Task created: {response.task_id}")
      # Poll GET /v1/tasks/{task_id} until state == "success"
      ```

      ```javascript Node theme={"system"}
      import Nimble from "@nimble-way/nimble-js";

      const nimble = new Nimble({ apiKey: "YOUR_API_KEY" });

      const response = await nimble.extractAsync({
        url: "https://www.example.com",
        render: true,
        formats: ["markdown"],
      });

      console.log(`Task created: ${response.task_id}`);
      // Poll GET /v1/tasks/{taskId} until state === "success"
      ```

      ```bash cURL theme={"system"}
      curl -X POST 'https://sdk.nimbleway.com/v1/extract/async' \
        --header 'Authorization: Bearer YOUR_API_KEY' \
        --header 'Content-Type: application/json' \
        --data-raw '{
          "url": "https://www.example.com",
          "render": true,
          "formats": ["markdown"]
        }'
      ```
    </CodeGroup>
  </Tab>

  <Tab title="Batch">
    <CodeGroup>
      ```python Python theme={"system"}
      from nimble_python import Nimble

      nimble = Nimble(api_key="YOUR_API_KEY")

      response = nimble.extract_batch(
          inputs=[
              {"url": "https://www.example.com/page1"},
              {"url": "https://www.example.com/page2"},
              {"url": "https://www.example.com/page3"},
          ],
          shared_inputs={
              "render": True,
              "formats": ["markdown"],
              "storage_type": "s3",
              "storage_url": "s3://my-bucket/results/",
          }
      )

      print(f"Batch created: {response.batch_id} ({response.batch_size} tasks)")
      # Poll GET /v1/batches/{batch_id}/progress until completed == true
      ```

      ```javascript Node theme={"system"}
      import Nimble from "@nimble-way/nimble-js";

      const nimble = new Nimble({ apiKey: "YOUR_API_KEY" });

      const response = await nimble.extractBatch({
        inputs: [
          { url: "https://www.example.com/page1" },
          { url: "https://www.example.com/page2" },
          { url: "https://www.example.com/page3" },
        ],
        shared_inputs: {
          render: true,
          formats: ["markdown"],
          storage_type: "s3",
          storage_url: "s3://my-bucket/results/",
        },
      });

      console.log(`Batch created: ${response.batch_id} (${response.batch_size} tasks)`);
      // Poll GET /v1/batches/{batchId}/progress until completed === true
      ```

      ```bash cURL theme={"system"}
      curl -X POST 'https://sdk.nimbleway.com/v1/extract/batch' \
        --header 'Authorization: Bearer YOUR_API_KEY' \
        --header 'Content-Type: application/json' \
        --data-raw '{
          "inputs": [
            {"url": "https://www.example.com/page1"},
            {"url": "https://www.example.com/page2"},
            {"url": "https://www.example.com/page3"}
          ],
          "shared_inputs": {
            "render": true,
            "formats": ["markdown"],
            "storage_type": "s3",
            "storage_url": "s3://my-bucket/results/"
          }
        }'
      ```
    </CodeGroup>
  </Tab>
</Tabs>

Use async or batch when you need to:

* Run extractions without blocking your application
* Process large volumes of URLs efficiently
* Deliver results to cloud storage (S3 / GCS) automatically
* Receive webhook notifications when tasks complete
* Integrate extraction into scheduled or queued workflows

## How it works

<Steps>
  <Step title="Submit a request">
    Send a POST request to the async or batch endpoint. The API returns
    immediately with a `task_id` (async) or `batch_id` (batch) — no waiting for
    extraction to finish.
  </Step>

  <Step title="Nimble processes in the background">
    Extraction runs asynchronously. For batch, each URL becomes an independent
    task processed in parallel.
  </Step>

  <Step title="Receive results your way">
    Choose how results are delivered:

    * **Polling** — check task status and fetch results on demand
    * **Webhook** — get notified automatically when a task completes
    * **Cloud storage** — results saved directly to your S3 or GCS bucket

    <Tip>
      For setup instructions, code examples, and bucket permission configuration,
      see the [Callbacks & Delivery](/nimble-sdk/admin/callbacks-and-delivery)
      guide.
    </Tip>
  </Step>
</Steps>

***

## Async

Submit a single URL and receive a `task_id` immediately. Nimble processes the extraction in the background — retrieve results via polling, webhook, or cloud storage.

```bash theme={"system"}
POST https://sdk.nimbleway.com/v1/extract/async
```

### Parameters

Accepts all parameters from the [Extract API](/nimble-sdk/web-tools/extract/quickstart), plus async-specific delivery options:

* `url` (required) — The webpage to extract
* `formats` — Output formats: `html`, `markdown`, `text`, `screenshot`
* `render` — Enable JavaScript rendering
* `driver` — Extraction engine: `vx6`, `vx8`, `vx10`, etc.
* `country`, `state`, `city` — Geo-targeting
* `parse`, `parser` — Structured data extraction
* `browser_actions`, `network_capture` — Advanced interactions

**Async-specific parameters:**

<AccordionGroup>
  <Accordion icon="cloud" title="storage_type">
    <ParamField path="storage_type" type="string">
      Storage provider for results. When specified, results are saved to your cloud storage instead of Nimble's servers.

      **Options:** `s3` (Amazon S3), `gs` (Google Cloud Storage)
    </ParamField>
  </Accordion>

  <Accordion icon="folder" title="storage_url">
    <ParamField path="storage_url" type="string">
      Bucket path where results will be saved. Results are stored as `{task_id}.json` at the specified location.

      **Format:** `s3://your-bucket/path/prefix/`
    </ParamField>
  </Accordion>

  <Accordion icon="file-zipper" title="storage_compress">
    <ParamField path="storage_compress" type="boolean" default="false">
      Compress results with GZIP before saving. When `true`, results are saved as `{task_id}.json.gz`.
    </ParamField>
  </Accordion>

  <Accordion icon="tag" title="storage_object_name">
    <ParamField path="storage_object_name" type="string">
      Custom filename for the stored object instead of the default task ID.

      **Example:** `"my-custom-name"` saves as `my-custom-name.json`
    </ParamField>
  </Accordion>

  <Accordion icon="webhook" title="callback_url">
    <ParamField path="callback_url" type="string">
      Webhook URL to receive a POST request when the task completes. Nimble sends task metadata (without result data) to this URL when extraction finishes.

      **Example:** `https://your-api.com/webhook/complete`
    </ParamField>
  </Accordion>
</AccordionGroup>

### Examples

Submit a URL and receive a `task_id` immediately. All three delivery methods below return the same initial response — the difference is how you retrieve results once the task completes.

<AccordionGroup>
  <Accordion icon="play" title="Example 1: Basic async extraction">
    Poll the task endpoint to check status and retrieve results when complete.

    <CodeGroup>
      ```python Python theme={"system"}
      from nimble_python import Nimble

      nimble = Nimble(api_key="YOUR_API_KEY")

      response = nimble.extract_async(
          url="https://www.example.com",
          render=True,
          formats=["html", "markdown"]
      )

      task_id = response.task_id
      print(f"Task created: {task_id}")
      ```

      ```javascript Node theme={"system"}
      import Nimble from "@nimble-way/nimble-js";

      const nimble = new Nimble({ apiKey: "YOUR_API_KEY" });

      const response = await nimble.extractAsync({
        url: "https://www.example.com",
        render: true,
        formats: ["html", "markdown"],
      });

      const taskId = response.task_id;
      console.log(`Task created: ${taskId}`);
      ```

      ```bash cURL theme={"system"}
      curl -X POST 'https://sdk.nimbleway.com/v1/extract/async' \
        --header 'Authorization: Bearer YOUR_API_KEY' \
        --header 'Content-Type: application/json' \
        --data-raw '{
          "url": "https://www.example.com",
          "render": true,
          "formats": ["html", "markdown"]
        }'
      ```
    </CodeGroup>
  </Accordion>

  <Accordion icon="cloud" title="Example 2: Cloud storage delivery">
    Results are saved automatically to your bucket as the task completes. No need to poll — the file appears at `storage_url/storage_object_name.json.gz` when done.

    <CodeGroup>
      ```python Python theme={"system"}
      response = nimble.extract_async(
          url="https://www.example.com",
          render=True,
          formats=["html", "markdown"],
          storage_type="s3",
          storage_url="s3://my-bucket/nimble-extracts/",
          storage_compress=True,
          storage_object_name="example-com-extraction"
      )

      print(f"Task created: {response.task_id}")
      print(f"Results will be saved to: s3://my-bucket/nimble-extracts/example-com-extraction.json.gz")
      ```

      ```javascript Node theme={"system"}
      const response = await nimble.extractAsync({
        url: "https://www.example.com",
        render: true,
        formats: ["html", "markdown"],
        storage_type: "s3",
        storage_url: "s3://my-bucket/nimble-extracts/",
        storage_compress: true,
        storage_object_name: "example-com-extraction",
      });

      console.log(`Task created: ${response.task_id}`);
      console.log("Results will be saved to: s3://my-bucket/nimble-extracts/example-com-extraction.json.gz");
      ```

      ```bash cURL theme={"system"}
      curl -X POST 'https://sdk.nimbleway.com/v1/extract/async' \
        --header 'Authorization: Bearer YOUR_API_KEY' \
        --header 'Content-Type: application/json' \
        --data-raw '{
          "url": "https://www.example.com",
          "render": true,
          "formats": ["html", "markdown"],
          "storage_type": "s3",
          "storage_url": "s3://my-bucket/nimble-extracts/",
          "storage_compress": true,
          "storage_object_name": "example-com-extraction"
        }'
      ```
    </CodeGroup>
  </Accordion>

  <Accordion icon="webhook" title="Example 3: Webhook notification">
    Nimble sends a POST to your `callback_url` when the task completes. No polling required — your server receives the notification automatically.

    <CodeGroup>
      ```python Python theme={"system"}
      response = nimble.extract_async(
          url="https://www.example.com",
          render=True,
          formats=["html"],
          callback_url="https://your-api.com/webhooks/extract-complete"
      )

      print(f"Task created: {response.task_id}")
      ```

      ```javascript Node theme={"system"}
      const response = await nimble.extractAsync({
        url: "https://www.example.com",
        render: true,
        formats: ["html", "markdown"],
        callback_url: "https://your-api.com/webhooks/extract-complete",
      });

      console.log(`Task created: ${response.task_id}`);
      ```

      ```bash cURL theme={"system"}
      curl -X POST 'https://sdk.nimbleway.com/v1/extract/async' \
        --header 'Authorization: Bearer YOUR_API_KEY' \
        --header 'Content-Type: application/json' \
        --data-raw '{
          "url": "https://www.example.com",
          "render": true,
          "formats": ["html", "markdown"],
          "callback_url": "https://your-api.com/webhooks/extract-complete"
        }'
      ```
    </CodeGroup>

    Nimble POSTs task metadata to your URL when complete:

    ```json theme={"system"}
    {
      "status": "success",
      "task": {
        "id": "8e8cfde8-345b-42b8-b3e2-0c61eb11e00f",
        "state": "pending",
        "created_at": "2026-01-24T12:36:24.685Z",
        "modified_at": "2026-01-24T12:36:24.685Z",
        "input": {}
      }
    }
    ```
  </Accordion>
</AccordionGroup>

The endpoint returns immediately with a task ID:

```json theme={"system"}
{
  "status": "success",
  "task": {
    "id": "8e8cfde8-345b-42b8-b3e2-0c61eb11e00f",
    "state": "pending",
    "created_at": "2026-01-24T12:36:24.685Z",
    "modified_at": "2026-01-24T12:36:24.685Z",
    "input": {}
  }
}
```

### Status & Results

When **polling**, the typical flow is:

1. Poll `GET /v1/tasks/{task_id}` until `state: "success"`
2. Call `GET /v1/tasks/{task_id}/results` to retrieve the extracted data

**Task states:**

| State     | Description                            |
| --------- | -------------------------------------- |
| `pending` | Task queued, waiting to start          |
| `success` | Extraction complete, results available |
| `error`   | Extraction failed                      |

#### Retrieve results

```bash theme={"system"}
GET https://sdk.nimbleway.com/v1/tasks/{task_id}/results
```

```json theme={"system"}
{
  "url": "https://www.nimbleway.com/blog/post",
  "task_id": "ec89b1f7-1cf2-40eb-91b4-78716093f9ed",
  "status": "success",
  "data": {
    "html": "<!DOCTYPE html>...",
    "markdown": "# Page Title\n\nContent..."
  },
  "metadata": {
    "query_duration": 1877,
    "driver": "vx6"
  },
  "status_code": 200
}
```

#### Check a task

```bash theme={"system"}
GET https://sdk.nimbleway.com/v1/tasks/{task_id}
```

```json theme={"system"}
{
  "task": {
    "id": "8e8cfde8-345b-42b8-b3e2-0c61eb11e00f",
    "state": "success",
    "status_code": 200,
    "created_at": "2026-01-24T12:36:24.685Z",
    "api_type": "extract"
  }
}
```

#### List all tasks (paginated)

```bash theme={"system"}
GET https://sdk.nimbleway.com/v1/tasks?limit=100&cursor={cursor}
```

```json theme={"system"}
{
  "data": [
    {
      "id": "8e8cfde8-...",
      "state": "success",
      "batch_id": "b7e1a2f3-...",
      "api_type": "extract",
      "created_at": "2026-03-19T10:00:00.000Z",
      "download_url": "https://sdk.nimbleway.com/v1/tasks/8e8cfde8-.../results"
    }
  ],
  "pagination": {
    "has_next": true,
    "next_cursor": "eyJpZCI6Ij...",
    "total": 142
  }
}
```

***

## Batch

Submit up to **1,000 URLs in a single request**. Each URL runs as an independent async task. Use `shared_inputs` to apply common settings across all URLs — individual items in `inputs` can override any shared value.

```bash theme={"system"}
POST https://sdk.nimbleway.com/v1/extract/batch
```

### Parameters

<AccordionGroup>
  <Accordion icon="list" title="inputs — Required">
    <ParamField path="inputs" type="array" required>
      Array of per-URL extraction requests. Supports up to **1,000 items** per batch. Each item accepts all [Core extraction parameters](/nimble-sdk/web-tools/extract/quickstart) — `url` is the only required field per item.

      Per-item values override anything set in `shared_inputs`:

      ```json theme={"system"}
      "inputs": [
        { "url": "https://example.com/us-page", "country": "US" },
        { "url": "https://example.com/il-page", "country": "IL" }
      ]
      ```
    </ParamField>
  </Accordion>

  <Accordion icon="layer-group" title="shared_inputs">
    <ParamField path="shared_inputs" type="object">
      Default parameters applied to every item in the batch. Accepts two categories:

      **Delivery params** (batch-wide, not overridable per item):

      * `storage_type` — `s3` or `gs`
      * `storage_url` — bucket path for results
      * `storage_compress` — GZIP compress results
      * `storage_object_name` — custom filename prefix
      * `callback_url` — webhook on completion

      **Extraction defaults** (applied to all items, overridable per item in `inputs`):

      * `render`, `driver`, `formats`, `country`, `locale`, `parse`, `parser`, and others
    </ParamField>
  </Accordion>
</AccordionGroup>

### Examples

Parameters set in `shared_inputs` are applied as defaults to all items in `inputs`. Any value set inside an individual item overrides the shared default.

<AccordionGroup>
  <Accordion icon="list" title="Example 1: Collect data from multiple URLs">
    Extract several unique URLs with results delivered to S3 and a webhook callback on completion:

    <CodeGroup>
      ```python Python theme={"system"}
      response = nimble.extract_batch(
          inputs=[
              {"url": "https://www.finance.com"},
              {"url": "https://www.travel.com"},
              {"url": "https://www.socialmedia.com"},
          ],
          shared_inputs={
              "storage_type": "s3",
              "storage_url": "s3://your-bucket/results/",
              "callback_url": "https://your-api.com/webhooks/batch-complete",
          }
      )

      print(f"Batch ID: {response.batch_id}")
      print(f"Tasks submitted: {response.batch_size}")
      ```

      ```javascript Node theme={"system"}
      const response = await nimble.extractBatch({
        inputs: [
          { url: "https://www.finance.com" },
          { url: "https://www.travel.com" },
          { url: "https://www.socialmedia.com" },
        ],
        shared_inputs: {
          storage_type: "s3",
          storage_url: "s3://your-bucket/results/",
          callback_url: "https://your-api.com/webhooks/batch-complete",
        },
      });

      console.log(`Batch ID: ${response.batch_id}`);
      console.log(`Tasks submitted: ${response.batch_size}`);
      ```

      ```bash cURL theme={"system"}
      curl -X POST 'https://sdk.nimbleway.com/v1/extract/batch' \
        --header 'Authorization: Bearer YOUR_API_KEY' \
        --header 'Content-Type: application/json' \
        --data-raw '{
          "inputs": [
            {"url": "https://www.finance.com"},
            {"url": "https://www.travel.com"},
            {"url": "https://www.socialmedia.com"}
          ],
          "shared_inputs": {
            "storage_type": "s3",
            "storage_url": "s3://your-bucket/results/",
            "callback_url": "https://your-api.com/webhooks/batch-complete"
          }
        }'
      ```
    </CodeGroup>
  </Accordion>

  <Accordion icon="globe" title="Example 2: Multiple URLs from multiple countries">
    Set a different country per URL. Items without a country fall back to the shared default (`CA`):

    <CodeGroup>
      ```python Python theme={"system"}
      response = nimble.extract_batch(
          inputs=[
              {"url": "https://www.finance.com",     "country": "US", "locale": "en-US"},
              {"url": "https://www.travel.com",       "country": "FR", "locale": "fr-FR"},
              {"url": "https://www.socialmedia.com",  "country": "DE", "locale": "de-DE"},
              {"url": "https://www.searchengine.com"},  # falls back to shared country: CA
          ],
          shared_inputs={
              "country": "CA",
              "locale": "en-CA",
              "storage_type": "s3",
              "storage_url": "s3://your-bucket/results/",
              "callback_url": "https://your-api.com/webhooks/batch-complete",
          }
      )
      ```

      ```javascript Node theme={"system"}
      const response = await nimble.extractBatch({
        inputs: [
          { url: "https://www.finance.com",    country: "US", locale: "en-US" },
          { url: "https://www.travel.com",      country: "FR", locale: "fr-FR" },
          { url: "https://www.socialmedia.com", country: "DE", locale: "de-DE" },
          { url: "https://www.searchengine.com" }, // falls back to shared country: CA
        ],
        shared_inputs: {
          country: "CA",
          locale: "en-CA",
          storage_type: "s3",
          storage_url: "s3://your-bucket/results/",
          callback_url: "https://your-api.com/webhooks/batch-complete",
        },
      });
      ```

      ```bash cURL theme={"system"}
      curl -X POST 'https://sdk.nimbleway.com/v1/extract/batch' \
        --header 'Authorization: Bearer YOUR_API_KEY' \
        --header 'Content-Type: application/json' \
        --data-raw '{
          "inputs": [
            {"url": "https://www.finance.com",    "country": "US", "locale": "en-US"},
            {"url": "https://www.travel.com",      "country": "FR", "locale": "fr-FR"},
            {"url": "https://www.socialmedia.com", "country": "DE", "locale": "de-DE"},
            {"url": "https://www.searchengine.com"}
          ],
          "shared_inputs": {
            "country": "CA",
            "locale": "en-CA",
            "storage_type": "s3",
            "storage_url": "s3://your-bucket/results/",
            "callback_url": "https://your-api.com/webhooks/batch-complete"
          }
        }'
      ```
    </CodeGroup>
  </Accordion>

  <Accordion icon="flag" title="Example 3: Same URL from multiple countries">
    Set the URL once in `shared_inputs` and vary only the country per item — useful for geo-comparison:

    <CodeGroup>
      ```python Python theme={"system"}
      response = nimble.extract_batch(
          inputs=[
              {"country": "US", "locale": "en-US"},
              {"country": "FR", "locale": "fr-FR"},
              {"country": "DE", "locale": "de-DE"},
          ],
          shared_inputs={
              "url": "https://www.finance.com",
              "storage_type": "s3",
              "storage_url": "s3://your-bucket/results/",
              "callback_url": "https://your-api.com/webhooks/batch-complete",
          }
      )
      ```

      ```javascript Node theme={"system"}
      const response = await nimble.extractBatch({
        inputs: [
          { country: "US", locale: "en-US" },
          { country: "FR", locale: "fr-FR" },
          { country: "DE", locale: "de-DE" },
        ],
        shared_inputs: {
          url: "https://www.finance.com",
          storage_type: "s3",
          storage_url: "s3://your-bucket/results/",
          callback_url: "https://your-api.com/webhooks/batch-complete",
        },
      });
      ```

      ```bash cURL theme={"system"}
      curl -X POST 'https://sdk.nimbleway.com/v1/extract/batch' \
        --header 'Authorization: Bearer YOUR_API_KEY' \
        --header 'Content-Type: application/json' \
        --data-raw '{
          "inputs": [
            {"country": "US", "locale": "en-US"},
            {"country": "FR", "locale": "fr-FR"},
            {"country": "DE", "locale": "de-DE"}
          ],
          "shared_inputs": {
            "url": "https://www.finance.com",
            "storage_type": "s3",
            "storage_url": "s3://your-bucket/results/",
            "callback_url": "https://your-api.com/webhooks/batch-complete"
          }
        }'
      ```
    </CodeGroup>
  </Accordion>
</AccordionGroup>

The endpoint returns immediately with a `batch_id` and the initial task list:

```json theme={"system"}
{
  "batch_id": "b7e1a2f3-4c5d-6e7f-8a9b-0c1d2e3f4a5b",
  "batch_size": 3,
  "tasks": [
    { "id": "task-001-uuid", "state": "pending", "batch_id": "b7e1a2f3-..." },
    { "id": "task-002-uuid", "state": "pending", "batch_id": "b7e1a2f3-..." }
  ]
}
```

### Status & Results

When **polling**, the typical flow is:

1. Poll `/v1/batches/{batch_id}/progress` until `completed: true`
2. Fetch `/v1/batches/{batch_id}` to get all task IDs and states
3. For each `success` task, call `GET /v1/tasks/{task_id}/results`

**Batch states:**

| State         | Description                            |
| ------------- | -------------------------------------- |
| `pending`     | Task queued, waiting to start          |
| `in_progress` | Task is currently being processed      |
| `success`     | Extraction complete, results available |
| `error`       | Extraction failed                      |

<Steps>
  <Step>
    #### Poll for batch completion

    Call `/v1/batches/{batch_id}/progress` repeatedly until `completed: true`. This is a lightweight endpoint — use it for polling.

    ```bash theme={"system"}
    GET https://sdk.nimbleway.com/v1/batches/{batch_id}/progress
    ```

    ```json theme={"system"}
    {
      "id": "b7e1a2f3-4c5d-6e7f-8a9b-0c1d2e3f4a5b",
      "completed": false,
      "completed_count": 47,
      "progress": 0.47,
      "completed_at": null
    }
    ```
  </Step>

  <Step>
    #### Fetch the full batch details

    Once `completed: true`, fetch the batch details to get all task IDs, states, and download URLs.

    ```bash theme={"system"}
    GET https://sdk.nimbleway.com/v1/batches/{batch_id}
    ```

    ```json theme={"system"}
    {
      "id": "b7e1a2f3-4c5d-6e7f-8a9b-0c1d2e3f4a5b",
      "completed": true,
      "completed_count": 3,
      "progress": 1.0,
      "tasks": [
        {
          "id": "task-001-uuid",
          "state": "success",
          "download_url": "https://sdk.nimbleway.com/v1/tasks/task-001-uuid/results"
        },
        {
          "id": "task-002-uuid",
          "state": "error",
          "error": "Connection timeout"
        }
      ]
    }
    ```
  </Step>

  <Step>
    #### Retrieve results per task

    Iterate over the task list and call `GET /v1/tasks/{task_id}/results` for each `success` task.

    <CodeGroup>
      ```python Python theme={"system"}
      import requests

      batch = requests.get(
          f"https://sdk.nimbleway.com/v1/batches/{batch_id}",
          headers={"Authorization": "Bearer YOUR_API_KEY"}
      ).json()

      for task in batch["tasks"]:
          if task["state"] == "success":
              result = requests.get(
                  task["download_url"],
                  headers={"Authorization": "Bearer YOUR_API_KEY"}
              ).json()
              print(result["data"]["markdown"])
      ```

      ```javascript Node theme={"system"}
      const batch = await fetch(`https://sdk.nimbleway.com/v1/batches/${batchId}`, {
        headers: { Authorization: "Bearer YOUR_API_KEY" },
      }).then((r) => r.json());

      for (const task of batch.tasks) {
        if (task.state === "success") {
          const result = await fetch(task.download_url, {
            headers: { Authorization: "Bearer YOUR_API_KEY" },
          }).then((r) => r.json());
          console.log(result.data.markdown);
        }
      }
      ```

      ```bash cURL theme={"system"}
      # Fetch results for a single task (repeat per task_id)
      curl 'https://sdk.nimbleway.com/v1/tasks/{task_id}/results' \
        --header 'Authorization: Bearer YOUR_API_KEY'
      ```
    </CodeGroup>
  </Step>
</Steps>

#### List all batches

```bash theme={"system"}
GET https://sdk.nimbleway.com/v1/batches
```

```json theme={"system"}
{
  "data": [
    {
      "id": "b7e1a2f3-4c5d-6e7f-8a9b-0c1d2e3f4a5b",
      "completed": true,
      "created_at": "2026-03-19T10:00:00.000Z",
      "tasks": ["task-001-uuid", "task-002-uuid", "task-003-uuid"]
    }
  ],
  "pagination": { "has_next": false, "next_cursor": null, "total": 1 }
}
```

***

## Data Retention

Results are retained for **7 days**. For longer retention, use cloud storage (`storage_url`) to persist results indefinitely.

| Item              | Expiration                                  |
| ----------------- | ------------------------------------------- |
| Pending tasks     | 24 hours if not started                     |
| Completed results | 24–48 hours (indefinite with cloud storage) |
| Failed tasks      | 24 hours                                    |

## API Reference

<CardGroup cols={2}>
  <Card icon="list-check" title="Tasks APIs" href="/api-reference/tasks/task-status">
    Check the status of a single async task
  </Card>

  <Card icon="layer-group" title="Batch APIs" href="/api-reference/tasks/get-batch-details">
    Retrieve the full task list and states for a batch
  </Card>
</CardGroup>
