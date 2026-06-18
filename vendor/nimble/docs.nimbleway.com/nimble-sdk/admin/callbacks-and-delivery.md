> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Callbacks & Delivery

> Configure how you receive results from async operations

When using async operations like `/extract/async`, `/extract/batch`, `/agent/async`, or `/crawl`, you have three flexible options for receiving your results. Choose the method that best fits your infrastructure and workflow.

<CardGroup cols={3}>
  <Card icon="rotate" title="Polling">
    Pull results on-demand using task IDs
  </Card>

  <Card icon="webhook" title="Callbacks">
    Receive push notifications when tasks complete
  </Card>

  <Card icon="cloud-arrow-up" title="Cloud Delivery">
    Automatic delivery to your S3 or GCS bucket
  </Card>
</CardGroup>

***

## Option 1: Polling (Pull)

The simplest approach - submit your async request, receive a task ID, and poll for results when ready.

<Steps>
  <Step title="Submit async request" titleSize="h3">
    Send a request to the async endpoint. You'll receive a task or crawl ID to track your request.

    <Tabs>
      <Tab title="Extract">
        <CodeGroup>
          ```python Python theme={"system"}
          from nimble_python import Nimble

          nimble = Nimble(api_key="YOUR-API-KEY")

          response = nimble.extract_async(
              url="https://www.nimbleway.com",
              render=True,
              formats=["html", "markdown"]
          )

          task_id = response.task_id
          print(f"Task submitted: {task_id}")
          ```

          ```javascript Node theme={"system"}
          import Nimble from '@nimble-way/nimble-js';

          const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

          const response = await nimble.extractAsync({
            url: "https://www.nimbleway.com",
            render: true,
            formats: ["html", "markdown"]
          });

          const taskId = response.task_id;
          console.log(`Task submitted: ${taskId}`);
          ```

          ```bash cURL theme={"system"}
          curl -X POST 'https://sdk.nimbleway.com/v1/extract/async' \
          --header 'Authorization: Bearer YOUR-API-KEY' \
          --header 'Content-Type: application/json' \
          --data-raw '{
              "url": "https://www.nimbleway.com",
              "render": true,
              "formats": ["html", "markdown"]
          }'
          ```
        </CodeGroup>
      </Tab>

      <Tab title="Agent">
        <CodeGroup>
          ```python Python theme={"system"}
          from nimble_python import Nimble

          nimble = Nimble(api_key="YOUR-API-KEY")

          response = nimble.agent.run_async(
              agent="amazon_pdp",
              params={"asin": "B0DLKFK6LR"}
          )

          task_id = response.task_id
          print(f"Task submitted: {task_id}")
          ```

          ```javascript Node theme={"system"}
          import Nimble from '@nimble-way/nimble-js';

          const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

          const response = await nimble.agent.runAsync({
            agent: "amazon_pdp",
            params: { asin: "B0DLKFK6LR" }
          });

          const taskId = response.task_id;
          console.log(`Task submitted: ${taskId}`);
          ```

          ```bash cURL theme={"system"}
          curl -X POST 'https://sdk.nimbleway.com/v1/agent/async' \
          --header 'Authorization: Bearer YOUR-API-KEY' \
          --header 'Content-Type: application/json' \
          --data-raw '{
              "agent": "amazon_pdp",
              "params": { "asin": "B0DLKFK6LR" }
          }'
          ```
        </CodeGroup>
      </Tab>

      <Tab title="Crawl">
        <CodeGroup>
          ```python Python theme={"system"}
          from nimble_python import Nimble

          nimble = Nimble(api_key="YOUR-API-KEY")

          result = nimble.crawl.run(
              url="https://www.nimbleway.com",
              limit=50
          )

          crawl_id = result.crawl_id
          print(f"Crawl started: {crawl_id}")
          ```

          ```javascript Node theme={"system"}
          import Nimble from '@nimble-way/nimble-js';

          const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

          const result = await nimble.crawl.run({
            url: "https://www.nimbleway.com",
            limit: 50
          });

          const crawlId = result.crawl_id;
          console.log(`Crawl started: ${crawlId}`);
          ```

          ```bash cURL theme={"system"}
          curl -X POST 'https://sdk.nimbleway.com/v1/crawl' \
          --header 'Authorization: Bearer YOUR-API-KEY' \
          --header 'Content-Type: application/json' \
          --data-raw '{
              "url": "https://www.nimbleway.com",
              "limit": 50
          }'
          ```
        </CodeGroup>
      </Tab>

      <Tab title="Batch">
        Submit up to 1,000 URLs in one request. Each URL becomes its own task, tracked under a shared `batch_id`.

        <CodeGroup>
          ```python Python theme={"system"}
          from nimble_python import Nimble

          nimble = Nimble(api_key="YOUR-API-KEY")

          response = nimble.extract_batch(
              inputs=[
                  {"url": "https://www.example.com/page1"},
                  {"url": "https://www.example.com/page2"},
                  {"url": "https://www.example.com/page3"},
              ],
              shared_inputs={
                  "render": True,
                  "country": "US",
                  "formats": ["markdown"],
              }
          )

          batch_id = response.batch_id
          print(f"Batch submitted: {batch_id} ({response.batch_size} tasks)")
          ```

          ```javascript Node theme={"system"}
          import Nimble from '@nimble-way/nimble-js';

          const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

          const response = await nimble.extractBatch({
            inputs: [
              { url: "https://www.example.com/page1" },
              { url: "https://www.example.com/page2" },
              { url: "https://www.example.com/page3" },
            ],
            shared_inputs: {
              render: true,
              country: "US",
              formats: ["markdown"],
            },
          });

          const batchId = response.batch_id;
          console.log(`Batch submitted: ${batchId} (${response.batch_size} tasks)`);
          ```

          ```bash cURL theme={"system"}
          curl -X POST 'https://sdk.nimbleway.com/v1/extract/batch' \
          --header 'Authorization: Bearer YOUR-API-KEY' \
          --header 'Content-Type: application/json' \
          --data-raw '{
              "inputs": [
                  {"url": "https://www.example.com/page1"},
                  {"url": "https://www.example.com/page2"},
                  {"url": "https://www.example.com/page3"}
              ],
              "shared_inputs": {
                  "render": true,
                  "country": "US",
                  "formats": ["markdown"]
              }
          }'
          ```
        </CodeGroup>
      </Tab>
    </Tabs>
  </Step>

  <Step title="Check status" titleSize="h3">
    Poll the status endpoint to monitor progress.

    <Tabs>
      <Tab title="Extract / Agent">
        <CodeGroup>
          ```python Python theme={"system"}
          import time

          while True:
              my_task = nimble.tasks.get(task_id)
              print(f"Status: {my_task.task.state}")

              if my_task.task.state == "success":
                  break
              elif my_task.task.state == "error":
                  print(f"Task failed: {my_task.task.error}")
                  break

              time.sleep(15)
          ```

          ```javascript Node theme={"system"}
          while (true) {
            const myTask = await nimble.tasks.get(taskId);
            console.log(`Status: ${myTask.task.state}`);

            if (myTask.task.state === "success") break;
            if (myTask.task.state === "error") {
              console.log(`Task failed: ${myTask.task.error}`);
              break;
            }

            await new Promise(resolve => setTimeout(resolve, 15000));
          }
          ```

          ```bash cURL theme={"system"}
          curl 'https://sdk.nimbleway.com/v1/tasks/{task_id}' \
          --header 'Authorization: Bearer YOUR-API-KEY'

          # Response: { "task": { "id": "...", "state": "success", ... } }
          ```
        </CodeGroup>
      </Tab>

      <Tab title="Batch">
        Use the lightweight progress endpoint for polling. Once `completed` is `true`, fetch task details.

        <CodeGroup>
          ```python Python theme={"system"}
          import time

          while True:
              progress = nimble.batches.progress(batch_id)
              print(f"Progress: {progress.completed_count} / {progress.total} ({progress.progress:.0%})")

              if progress.completed:
                  break

              time.sleep(15)

          # Get all task IDs and states
          batch = nimble.batches.get(batch_id)
          for task in batch.tasks:
              print(f"Task {task.id}: {task.state}")
          ```

          ```javascript Node theme={"system"}
          while (true) {
            const progress = await nimble.batches.progress(batchId);
            console.log(`Progress: ${progress.completed_count} / ${progress.total} (${Math.round(progress.progress * 100)}%)`);

            if (progress.completed) break;

            await new Promise(resolve => setTimeout(resolve, 15000));
          }

          // Get all task IDs and states
          const batch = await nimble.batches.get(batchId);
          batch.tasks.forEach(task => {
            console.log(`Task ${task.id}: ${task.state}`);
          });
          ```

          ```bash cURL theme={"system"}
          # Lightweight progress check
          curl 'https://sdk.nimbleway.com/v1/batches/{batch_id}/progress' \
          --header 'Authorization: Bearer YOUR-API-KEY'

          # Full batch details (when complete)
          curl 'https://sdk.nimbleway.com/v1/batches/{batch_id}' \
          --header 'Authorization: Bearer YOUR-API-KEY'
          ```
        </CodeGroup>
      </Tab>

      <Tab title="Crawl">
        Crawl has its own status endpoint that shows overall progress and individual page tasks.

        <CodeGroup>
          ```python Python theme={"system"}
          import time

          while True:
              my_crawl = nimble.crawl.status(crawl_id)
              print(f"Status: {my_crawl.status}")

              if status.state == "succeeded":
                  break
              elif status.state == "failed":
                  print(f"Task failed: {status.error}")
                  break

              time.sleep(2)
          ```

          ```javascript Node theme={"system"}
          while (true) {
            const myCrawl = await nimble.crawl.status(crawlId);
            console.log(`Status: ${myCrawl.status}`);

            if (status.state === "succeeded") break;
            if (status.state === "failed") {
              console.log(`Task failed: ${status.error}`);
              break;
            }

            await new Promise(resolve => setTimeout(resolve, 2000));
          }
          ```

          ```bash cURL theme={"system"}
          curl 'https://sdk.nimbleway.com/v1/crawl/{crawl_id}' \
          --header 'Authorization: Bearer YOUR-API-KEY'

          # Response: { "crawl": { "status": "running", "completed": 10, "total": 50, "tasks": [...] } }
          ```
        </CodeGroup>
      </Tab>
    </Tabs>
  </Step>

  <Step title="Retrieve results" titleSize="h3">
    Once complete, fetch the full results.

    <Tabs>
      <Tab title="Extract">
        <CodeGroup>
          ```python Python theme={"system"}
          results = nimble.tasks.results(task_id)

          print(f"HTML length: {len(results.data.html)}")
          print(f"Markdown length: {len(results.data.markdown)}")
          ```

          ```javascript Node theme={"system"}
          const results = await nimble.tasks.results(taskId);

          console.log(`HTML length: ${results.data.html.length}`);
          console.log(`Markdown length: ${results.data.markdown.length}`);
          ```

          ```bash cURL theme={"system"}
          curl 'https://sdk.nimbleway.com/v1/tasks/{task_id}/results' \
          --header 'Authorization: Bearer YOUR-API-KEY'
          ```
        </CodeGroup>
      </Tab>

      <Tab title="Agent">
        <CodeGroup>
          ```python Python theme={"system"}
          results = nimble.tasks.results(task_id)

          parsed = results.data.parsing["parsed"]
          print(f"Product: {parsed['product_title']}")
          print(f"Price: ${parsed['web_price']}")
          ```

          ```javascript Node theme={"system"}
          const results = await nimble.tasks.results(taskId);

          const parsed = results.data.parsing.parsed;
          console.log(`Product: ${parsed.product_title}`);
          console.log(`Price: $${parsed.web_price}`);
          ```

          ```bash cURL theme={"system"}
          curl 'https://sdk.nimbleway.com/v1/tasks/{task_id}/results' \
          --header 'Authorization: Bearer YOUR-API-KEY'
          ```
        </CodeGroup>
      </Tab>

      <Tab title="Crawl">
        Fetch results for each completed task in the crawl.

        <CodeGroup>
          ```python Python theme={"system"}
          # my_crawl["tasks"] from step #2 contains list of task IDs from status response
          for task in my_crawl["tasks"]:
              if task.state == "success":
                  task_result = nimble.tasks.results(task.id)

                  print(f"URL: {task_result.url}")
                  print(f"HTML length: {len(task_result.data.get('html', ''))}")
          ```

          ```javascript Node theme={"system"}
          // batch.tasks from step #2 contains task objects with id and state
          for (const task of myCrawl.tasks) {
            if (task.state === "success") {
              const results = await nimble.tasks.results(task.id);

              console.log(`URL: ${results.url}`);
              console.log(`HTML length: ${results.data?.html?.length || 0}`);
            }
          }
          ```

          ```bash cURL theme={"system"}
          # Get results for each task_id from the crawl status response
          curl 'https://sdk.nimbleway.com/v1/tasks/{task_id}/results' \
          --header 'Authorization: Bearer YOUR-API-KEY'
          ```
        </CodeGroup>
      </Tab>

      <Tab title="Batch">
        Once the batch is complete, retrieve results for each successful task using the task IDs from `GET /v1/batches/{batch_id}`.

        <CodeGroup>
          ```python Python theme={"system"}
          # batch.tasks from step #2 — iterate and fetch each result
          for task in batch.tasks:
              if task.state == "success":
                  result = nimble.tasks.results(task.id)
                  print(f"Markdown: {result.data.markdown[:200]}")
              elif task.state == "error":
                  print(f"Task {task.id} failed: {task.error}")
          ```

          ```javascript Node theme={"system"}
          // batch.tasks from step #2 — iterate and fetch each result
          for (const task of batch.tasks) {
            if (task.state === "success") {
              const result = await nimble.tasks.results(task.id);
              console.log(`Markdown: ${result.data.markdown.substring(0, 200)}`);
            } else if (task.state === "error") {
              console.log(`Task ${task.id} failed: ${task.error}`);
            }
          }
          ```

          ```bash cURL theme={"system"}
          # Fetch results for each task_id from the batch details response
          curl 'https://sdk.nimbleway.com/v1/tasks/{task_id}/results' \
          --header 'Authorization: Bearer YOUR-API-KEY'
          ```
        </CodeGroup>
      </Tab>
    </Tabs>

    <Accordion title="Example Results">
      ```json theme={"system"}
      {
          "url": "https://www.nimbleway.com/blog/post",
          "task_id": "ec89b1f7-1cf2-40eb-91b4-78716093f9ed",
          "status": "success",
          "task": {
              "id": "ec89b1f7-1cf2-40eb-91b4-78716093f9ed",
              "state": "success",
              "created_at": "2026-02-09T23:15:43.549Z",
              "modified_at": "2026-02-09T23:16:39.094Z",
              "account_name": "your-account"
          },
          "data": {
              "html": "<!DOCTYPE html>...",
              "markdown": "# Page Title\n\nContent...",
              "headers": { ... }
          },
          "metadata": {
              "query_time": "2026-02-09T23:15:43.549Z",
              "query_duration": 1877,
              "response_parameters": {
                  "input_url": "https://www.nimbleway.com/blog/post"
              },
      		"driver": "vx6"
          },
          "status_code": 200
      }
      ```
    </Accordion>
  </Step>
</Steps>

### Polling endpoints reference

| API     | Submit                   | Check Status                          | Get Results                                  |
| ------- | ------------------------ | ------------------------------------- | -------------------------------------------- |
| Extract | `POST /v1/extract/async` | `GET /v1/tasks/{task_id}`             | `GET /v1/tasks/{task_id}/results`            |
| Agent   | `POST /v1/agent/async`   | `GET /v1/tasks/{task_id}`             | `GET /v1/tasks/{task_id}/results`            |
| Batch   | `POST /v1/extract/batch` | `GET /v1/batches/{batch_id}/progress` | `GET /v1/tasks/{task_id}/results` (per task) |
| Crawl   | `POST /v1/crawl`         | `GET /v1/crawl/{crawl_id}`            | `GET /v1/tasks/{task_id}/results` (per page) |

To list all tasks across your account, use `GET /v1/tasks` (supports `cursor` and `limit` for pagination). To list all batches, use `GET /v1/batches`.

***

## Option 2: Webhooks (Push)

Get notified automatically when your tasks complete. Perfect for event-driven architectures.

<Steps>
  <Step title="Submit request with callback URL" titleSize="h3">
    Include `callback_url` (or `callback` object for crawl) in your async request.

    <Tabs>
      <Tab title="Extract">
        <CodeGroup>
          ```python Python theme={"system"}
          from nimble_python import Nimble

          nimble = Nimble(api_key="YOUR-API-KEY")

          response = nimble.extract_async(
              url="https://www.nimbleway.com",
              render=True,
              formats=["html", "markdown"],
              callback_url="https://your-server.com/webhooks/nimble"
          )

          task_id = response.task_id
          print(f"Task submitted: {task_id}")
          print("Results will be POSTed to your callback URL when ready")
          ```

          ```javascript Node theme={"system"}
          import Nimble from '@nimble-way/nimble-js';

          const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

          const response = await nimble.extractAsync({
            url: "https://www.nimbleway.com",
            render: true,
            formats: ["html", "markdown"],
            callback_url: "https://your-server.com/webhooks/nimble"
          });

          const taskId = response.task_id;
          console.log(`Task submitted: ${taskId}`);
          ```

          ```bash cURL theme={"system"}
          curl -X POST 'https://sdk.nimbleway.com/v1/extract/async' \
          --header 'Authorization: Bearer YOUR-API-KEY' \
          --header 'Content-Type: application/json' \
          --data-raw '{
              "url": "https://www.nimbleway.com",
              "render": true,
              "formats": ["html", "markdown"],
              "callback_url": "https://your-server.com/webhooks/nimble"
          }'
          ```
        </CodeGroup>
      </Tab>

      <Tab title="Agent">
        <CodeGroup>
          ```python Python theme={"system"}
          from nimble_python import Nimble

          nimble = Nimble(api_key="YOUR-API-KEY")

          response = nimble.extract_async(
              url="https://www.nimbleway.com",
              render=True,
              formats=["html", "markdown"],
              callback_url="https://your-server.com/webhooks/nimble"
          )

          task_id = response.task_id
          print(f"Task submitted: {task_id}")
          print("Results will be POSTed to your callback URL when ready")

          ```

          ```javascript Node theme={"system"}
          import Nimble from '@nimble-way/nimble-js';

          const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

          const response = await nimble.agent.runAsync({
            agent: "amazon_pdp",
            params: {
          		asin: "B0DLKFK6LR",
          		callback_url: "https://your-server.com/webhooks/nimble"
            },
          });

          const taskId = response.task_id;
          console.log(`Task submitted: ${taskId}`);
          ```

          ```bash cURL theme={"system"}
            curl -X POST 'https://sdk.nimbleway.com/v1/extract/async' \
          --header 'Authorization: Bearer YOUR-API-KEY' \
          --header 'Content-Type: application/json' \
          --data-raw '{
              "url": "https://www.nimbleway.com",
              "render": true,
              "formats": ["html", "markdown"],
              "callback_url": "https://your-server.com/webhooks/nimble"
          }'

          ```
        </CodeGroup>
      </Tab>

      <Tab title="Crawl">
        Crawl uses a `callback` object for advanced webhook options.

        <CodeGroup>
          ```python Python theme={"system"}
          from nimble_python import Nimble

          nimble = Nimble(api_key="YOUR-API-KEY")

          result = nimble.crawl.run(
              url="https://www.nimbleway.com",
              limit=100,
              callback={
                  "url": "https://your-server.com/webhooks/nimble",
                  "headers": {
                      "X-Custom-Auth": "your-secret-token"
                  },
                  "events": ["completed", "failed"]
              }
          )

          print(f"Crawl started: {result.crawl_id}")
          ```

          ```javascript Node theme={"system"}
          import Nimble from '@nimble-way/nimble-js';

          const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

          const result = await nimble.crawl.run({
            url: "https://www.nimbleway.com",
            limit: 100,
            callback: {
              url: "https://your-server.com/webhooks/nimble",
              headers: {
                "X-Custom-Auth": "your-secret-token"
              },
              events: ["completed", "failed"]
            }
          });

          console.log(`Crawl started: ${result.crawl_id}`);
          ```

          ```bash cURL theme={"system"}
          curl -X POST 'https://sdk.nimbleway.com/v1/crawl' \
          --header 'Authorization: Bearer YOUR-API-KEY' \
          --header 'Content-Type: application/json' \
          --data-raw '{
              "url": "https://www.nimbleway.com",
              "limit": 100,
              "callback": {
                  "url": "https://your-server.com/webhooks/nimble",
                  "headers": { "X-Custom-Auth": "your-secret-token" },
                  "events": ["completed", "failed"]
              }
          }'
          ```
        </CodeGroup>
      </Tab>
    </Tabs>
  </Step>

  <Step title="Receive webhook notification" titleSize="h3">
    Nimble sends a POST to your callback URL when complete:

    ```json theme={"system"}
    {
      "task": {
        "id": "8e8cfde8-345b-42b8-b3e2-0c61eb11e00f",
        "state": "success",
        "status_code": 200,
        "created_at": "2026-01-24T12:36:24.685Z",
        "modified_at": "2026-01-24T12:36:24.685Z",
        "input": {},
        "api_type": "extract"
      }
    }
    ```
  </Step>
</Steps>

### Webhook configuration options

| API     | Parameter             | Type   | Description                                             |
| ------- | --------------------- | ------ | ------------------------------------------------------- |
| Extract | `callback_url`        | string | Your callback URL                                       |
| Agent   | `params.callback_url` | string | Your callback URL                                       |
| Crawl   | `callback.url`        | string | Your callback URL                                       |
|         | `callback.headers`    | object | Custom headers for authentication                       |
|         | `callback.metadata`   | object | Custom data included in payload                         |
|         | `callback.events`     | array  | Filter events: `started`, `page`, `completed`, `failed` |

***

## Option 3: Cloud Delivery (Async API)

<Note>
  Applies to async API requests - `/extract/async`, `/extract/batch`, `/agent/async`, `/crawl`. For Nimble **Jobs**, see [Option 4: Jobs cloud delivery](#option-4-jobs-cloud-delivery) below.
</Note>

Automatically deliver results directly to your cloud storage bucket.

<CardGroup cols={2}>
  <Card icon="aws" title="Amazon S3">
    Deliver to any S3 bucket in your AWS account
  </Card>

  <Card icon="google" title="Google Cloud Storage">
    Deliver to any GCS bucket in your GCP project
  </Card>
</CardGroup>

<Steps>
  <Step title="Configure bucket permissions (one-time)" titleSize="h3">
    Grant Nimble's service account write access to your bucket.

    <Tabs>
      <Tab title="Amazon S3">
        **Nimble Service User ARN:**

        ```
        arn:aws:iam::744254827463:user/webit-uploader
        ```

        Add this bucket policy:

        ```json theme={"system"}
        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Sid": "NimbleCloudDelivery",
              "Effect": "Allow",
              "Principal": {
                "AWS": "arn:aws:iam::744254827463:user/webit-uploader"
              },
              "Action": [
                "s3:PutObject",
                "s3:PutObjectACL",
                "s3:GetBucketLocation"
              ],
              "Resource": [
                "arn:aws:s3:::YOUR_BUCKET_NAME",
                "arn:aws:s3:::YOUR_BUCKET_NAME/*"
              ]
            }
          ]
        }
        ```

        <Warning>
          Replace `YOUR_BUCKET_NAME` with your actual bucket name.
        </Warning>

        <Accordion icon="key" title="KMS-Encrypted Buckets">
          For KMS-encrypted buckets, add this to your KMS key policy:

          ```json theme={"system"}
          {
            "Sid": "NimbleKMSAccess",
            "Effect": "Allow",
            "Principal": {
              "AWS": "arn:aws:iam::744254827463:user/webit-uploader"
            },
            "Action": [
              "kms:Encrypt",
              "kms:Decrypt",
              "kms:ReEncrypt*",
              "kms:GenerateDataKey*",
              "kms:DescribeKey"
            ],
            "Resource": "*"
          }
          ```
        </Accordion>
      </Tab>

      <Tab title="Google Cloud Storage">
        **Nimble Service Account:**

        ```
        nimbleway-gcp-storage@nimbleway-gcp.iam.gserviceaccount.com
        ```

        1. Navigate to your bucket in the [Google Cloud Console](https://console.cloud.google.com/storage/browser)
        2. Click on the **Permissions** tab
        3. Click **Grant Access**
        4. Add principal: `nimbleway-gcp-storage@nimbleway-gcp.iam.gserviceaccount.com`
        5. Assign role: **Storage Object Creator**
        6. Click **Save**
      </Tab>
    </Tabs>
  </Step>

  <Step title="Submit request with storage config" titleSize="h3">
    Include `storage_type` and `storage_url` in your request.

    #### Cloud delivery parameters

    | Parameter             | Type         | Description                                           |
    | --------------------- | ------------ | ----------------------------------------------------- |
    | `storage_type`        | `s3` \| `gs` | Cloud provider                                        |
    | `storage_url`         | string       | Bucket path with prefix (e.g., `s3://bucket/prefix/`) |
    | `storage_compress`    | boolean      | Enable GZIP compression                               |
    | `storage_object_name` | string       | Custom filename (default: task ID)                    |

    <Tabs>
      <Tab title="Extract">
        <Tabs>
          <Tab title="S3">
            <CodeGroup>
              ```python Python theme={"system"}
              from nimble_python import Nimble

              nimble = Nimble(api_key="YOUR-API-KEY")

              response = nimble.extract_async(
                  url="https://www.nimbleway.com",
                  render=True,
                  formats=["html", "markdown"],
                  storage_type="s3",
                  storage_url="s3://your-bucket/nimble-results/",
                  storage_compress=True,
                  storage_object_name="my-result"
              )

              task_id = response.task_id
              print(f"Results will be saved to: s3://your-bucket/nimble-results/my-result.json.gz")
              ```

              ```javascript Node theme={"system"}
              import Nimble from '@nimble-way/nimble-js';

              const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

              const response = await nimble.extractAsync({
                url: "https://www.nimbleway.com",
                render: true,
                formats: ["html", "markdown"],
                storage_type: "s3",
                storage_url: "s3://your-bucket/nimble-results/",
                storage_compress: true,
                storage_object_name: "my-result"
              });

              const taskId = response.task_id;
              console.log(`Results will be saved to: s3://your-bucket/nimble-results/my-result.json.gz`);
              ```

              ```bash cURL theme={"system"}
              curl -X POST 'https://sdk.nimbleway.com/v1/extract/async' \
              --header 'Authorization: Bearer YOUR-API-KEY' \
              --header 'Content-Type: application/json' \
              --data-raw '{
                  "url": "https://www.nimbleway.com",
                  "render": true,
                  "formats": ["html", "markdown"],
                  "storage_type": "s3",
                  "storage_url": "s3://your-bucket/nimble-results/",
                  "storage_compress": true,
                  "storage_object_name": "my-result"
              }'
              ```
            </CodeGroup>
          </Tab>

          <Tab title="GCS">
            <CodeGroup>
              ```python Python theme={"system"}
              from nimble_python import Nimble

              nimble = Nimble(api_key="YOUR-API-KEY")

              response = nimble.extract_async(
                  url="https://www.nimbleway.com",
                  render=True,
                  formats=["html", "markdown"],
                  storage_type="gs",
                  storage_url="gs://your-bucket/nimble-results/",
                  storage_object_name="my-result"
              )

              task_id = response.task_id
              print(f"Results will be saved to: gs://your-bucket/nimble-results/my-result.json")
              ```

              ```javascript Node theme={"system"}
              import Nimble from '@nimble-way/nimble-js';

              const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

              const response = await nimble.extractAsync({
                url: "https://www.nimbleway.com",
                render: true,
                formats: ["html", "markdown"],
                storage_type: "gs",
                storage_url: "gs://your-bucket/nimble-results/",
                storage_object_name: "my-result"
              });

              const taskId = response.task_id;
              console.log(`Results will be saved to: gs://your-bucket/nimble-results/my-result.json`);
              ```

              ```bash cURL theme={"system"}
              curl -X POST 'https://sdk.nimbleway.com/v1/extract/async' \
              --header 'Authorization: Bearer YOUR-API-KEY' \
              --header 'Content-Type: application/json' \
              --data-raw '{
                  "url": "https://www.nimbleway.com",
                  "render": true,
                  "formats": ["html", "markdown"],
                  "storage_type": "gs",
                  "storage_url": "gs://your-bucket/nimble-results/",
                  "storage_object_name": "my-result"
              }'
              ```
            </CodeGroup>
          </Tab>
        </Tabs>
      </Tab>

      <Tab title="Agent">
        <Tabs>
          <Tab title="S3">
            <CodeGroup>
              ```python Python theme={"system"}
              from nimble_python import Nimble

              nimble = Nimble(api_key="YOUR-API-KEY")

              response = nimble.agent.run_async(
                  agent="amazon_pdp",
                  params={
                      "asin": "B0DLKFK6LR",
                      "storage_type": "s3",
                      "storage_url": "s3://your-bucket/nimble-results/",
                      "storage_compress": True,
                      "storage_object_name": "my-result"
                  }
              )

              task_id = response.task_id
              print(f"Results will be saved to: s3://your-bucket/nimble-results/my-result.json.gz")
              ```

              ```javascript Node theme={"system"}
              import Nimble from '@nimble-way/nimble-js';

              const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

              const response = await nimble.agent.runAsync({
                agent: "amazon_pdp",
                params: {
                  asin: "B0DLKFK6LR",
                  storage_type: "s3",
                  storage_url: "s3://your-bucket/nimble-results/",
                  storage_compress: true,
                  storage_object_name: "my-result"
                }
              });

              const taskId = response.task_id;
              console.log(`Results will be saved to: s3://your-bucket/nimble-results/my-result.json.gz`);
              ```

              ```bash cURL theme={"system"}
              curl -X POST 'https://sdk.nimbleway.com/v1/agent/async' \
              --header 'Authorization: Bearer YOUR-API-KEY' \
              --header 'Content-Type: application/json' \
              --data-raw '{
                  "agent": "amazon_pdp",
                  "params": {
                      "asin": "B0DLKFK6LR",
                      "storage_type": "s3",
                      "storage_url": "s3://your-bucket/nimble-results/",
                      "storage_compress": true,
                      "storage_object_name": "my-result"
                  }
              }'
              ```
            </CodeGroup>
          </Tab>

          <Tab title="GCS">
            <CodeGroup>
              ```python Python theme={"system"}
              from nimble_python import Nimble

              nimble = Nimble(api_key="YOUR-API-KEY")

              response = nimble.agent.run_async(
                  agent="amazon_pdp",
                  params={
                      "asin": "B0DLKFK6LR",
                      "storage_type": "gs",
                      "storage_url": "gs://your-bucket/nimble-results/",
                      "storage_object_name": "my-result"
                  }
              )

              task_id = response.task_id
              print(f"Results will be saved to: gs://your-bucket/nimble-results/my-result.json")
              ```

              ```javascript Node theme={"system"}
              import Nimble from '@nimble-way/nimble-js';

              const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

              const response = await nimble.agent.runAsync({
                agent: "amazon_pdp",
                params: {
                  asin: "B0DLKFK6LR",
                  storage_type: "gs",
                  storage_url: "gs://your-bucket/nimble-results/",
                  storage_object_name: "my-result"
                }
              });

              const taskId = response.task_id;
              console.log(`Results will be saved to: gs://your-bucket/nimble-results/my-result.json`);
              ```

              ```bash cURL theme={"system"}
              curl -X POST 'https://sdk.nimbleway.com/v1/agent/async' \
              --header 'Authorization: Bearer YOUR-API-KEY' \
              --header 'Content-Type: application/json' \
              --data-raw '{
                  "agent": "amazon_pdp",
                  "params": {
                      "asin": "B0DLKFK6LR",
                      "storage_type": "gs",
                      "storage_url": "gs://your-bucket/nimble-results/",
                      "storage_object_name": "my-result"
                  }
              }'
              ```
            </CodeGroup>
          </Tab>
        </Tabs>
      </Tab>
    </Tabs>
  </Step>

  <Step title="Results delivered automatically" titleSize="h3">
    When complete, results are written to your bucket as `{task_id}.json` (or `.json.gz` if compressed).
  </Step>
</Steps>

***

## Option 4: Jobs cloud delivery

<Note>
  Applies to Nimble **Jobs** only - used as the **input source** and/or **destination** for a Job. For async API requests, see [Option 3](#option-3-cloud-delivery-async-api) above.
</Note>

A Job can read its input set from an S3 bucket and write its assembled results back to one. Both directions are wired through a single bucket policy that grants Nimble's IAM principal access to specific prefixes. Nimble does not assume a role in the customer account.

### Nimble's IAM principal

Every Job runs under a single IAM user:

```text theme={"system"}
arn:aws:iam::744254827463:user/crawlit-scrapy
```

Use this ARN as the `Principal` in the bucket policy.

### Required permissions

| Prefix                            | Permission                                                                               |
| --------------------------------- | ---------------------------------------------------------------------------------------- |
| `s3://YOUR_BUCKET` (whole bucket) | `s3:ListBucket`                                                                          |
| `s3://YOUR_BUCKET/input/*`        | `s3:GetObject`                                                                           |
| `s3://YOUR_BUCKET/output/*`       | `s3:GetObject`, `s3:PutObject`, `s3:AbortMultipartUpload`, `s3:ListMultipartUploadParts` |

`s3:AbortMultipartUpload` and `s3:ListMultipartUploadParts` are required because large output files are written in parts. If an upload fails mid-way, Nimble aborts the incomplete multipart upload so partial bytes do not accumulate in the bucket.

<Note>
  `s3:DeleteObject` is not requested. Nimble never deletes files in the bucket - including the connection-test probe described below.
</Note>

### Bucket policy template

Replace `YOUR_BUCKET` with the bucket name. Adjust the `input/` and `output/` prefixes to match the paths used in the Job form.

```json theme={"system"}
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "NimbleListBucket",
      "Effect": "Allow",
      "Principal": { "AWS": "arn:aws:iam::744254827463:user/crawlit-scrapy" },
      "Action": "s3:ListBucket",
      "Resource": "arn:aws:s3:::YOUR_BUCKET"
    },
    {
      "Sid": "NimbleReadInputPrefix",
      "Effect": "Allow",
      "Principal": { "AWS": "arn:aws:iam::744254827463:user/crawlit-scrapy" },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR_BUCKET/input/*"
    },
    {
      "Sid": "NimbleReadWriteOutputPrefix",
      "Effect": "Allow",
      "Principal": { "AWS": "arn:aws:iam::744254827463:user/crawlit-scrapy" },
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:AbortMultipartUpload",
        "s3:ListMultipartUploadParts"
      ],
      "Resource": "arn:aws:s3:::YOUR_BUCKET/output/*"
    }
  ]
}
```

### Applying the policy

<Steps>
  <Step title="Open the bucket">
    In the AWS Console, open **S3** and click the bucket Nimble should access.
  </Step>

  <Step title="Edit the bucket policy">
    Open the **Permissions** tab. Click **Edit** under **Bucket policy**.
  </Step>

  <Step title="Paste the template">
    Paste the JSON above. Replace `YOUR_BUCKET` and the prefixes. Save changes.
  </Step>

  <Step title="Verify in Nimble">
    Open the Job form. Paste the `s3://...` path and click **Test Connection**. A green chip confirms the policy is correct.
  </Step>
</Steps>

<Tip>
  Keep **Block Public Access** enabled. The policy grants access only to Nimble's IAM user, not to the public.
</Tip>

### Test Connection - what it does

| Mode                | Operation                                                                             | Verifies                         |
| ------------------- | ------------------------------------------------------------------------------------- | -------------------------------- |
| Read (input path)   | `head_bucket` + list one object under the prefix                                      | `s3:ListBucket` + `s3:GetObject` |
| Write (output path) | `head_bucket` + `put_object` of an empty `.nimble-connection-test` file at the prefix | `s3:ListBucket` + `s3:PutObject` |

<Note>
  The write test leaves an empty `.nimble-connection-test` file under the output prefix. The file is **not deleted** - the policy does not grant `s3:DeleteObject`, so cleanup is not possible. The key is deterministic, so repeated tests overwrite the same object. At most one residue file per output prefix. Remove it manually at any time.
</Note>

### Interpreting the result

| Chip                              | Meaning                                             | Fix                                    |
| --------------------------------- | --------------------------------------------------- | -------------------------------------- |
| ✓ Connection OK                   | Permissions correct. The prefix has files.          | Ready to use.                          |
| ✓ Connection OK - prefix is empty | Permissions correct. The prefix has no files yet.   | Upload the first input file.           |
| ✗ Access denied                   | The bucket policy is missing a required permission. | Re-apply the template above.           |
| ✗ Bucket does not exist           | The bucket name in the path is wrong.               | Verify the bucket name.                |
| ✗ Connection failed               | Network, throttling, or unexpected S3 error.        | Retry. Contact support if it persists. |

***

## Option 5: Jobs Databricks Delta Sharing

<Note>
  Applies to Nimble **Jobs** only - select **Databricks** in the Inputs and/or Destination strip of the Job form. Both directions use Databricks-to-Databricks (D2D) Delta Sharing and require your workspace to be on **Databricks Unity Catalog**.
</Note>

Databricks Delta Sharing lets a Job read its input set directly from your Unity Catalog and/or deliver its assembled output back into your Unity Catalog. Each direction is configured independently and uses opposite Delta Sharing roles:

| Direction                                | Your role | Nimble's role |
| ---------------------------------------- | --------- | ------------- |
| **Input** - share your table with Nimble | Provider  | Recipient     |
| **Destination** - mount Nimble's output  | Recipient | Provider      |

### Nimble's global metastore ID

Both directions reference Nimble's Unity Catalog metastore. Wherever the property tables below mention it, use:

```text theme={"system"}
aws:us-east-1:2f3ba1b1-429c-491f-b37d-ebb46f22f3e9
```

This is a **global** metastore ID in the `<cloud>:<region>:<uuid>` form required by Databricks D2D sharing. The bare UUID is not enough.

### Prerequisites

* Databricks CLI **v0.205+** authenticated against the workspace you want to share from / into. See the [Databricks CLI install guide](https://docs.databricks.com/aws/en/dev-tools/cli/install) and `databricks configure`.
* A metastore admin or a user with the `CREATE RECIPIENT`, `CREATE SHARE`, and `CREATE CATALOG` privileges on your UC metastore.

***

### Input: share your table with Nimble

In this direction, **you are the provider**: you publish a Delta Sharing share whose recipient is Nimble's metastore. On each Job run, the Job reads the current contents of the shared table.

#### Job form fields

Set these in the Job form under **Inputs → Databricks**:

| Field      | Description                                                                                                                                                                                                                           |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Provider` | Delta Sharing provider name **as it appears in Nimble's metastore** - Databricks D2D derives this on Nimble's receiving side from your metastore identity. Your Nimble account contact can confirm the exact string if you're unsure. |
| `Share`    | Share name on your side (the value you pass to `databricks shares create --name <...>`).                                                                                                                                              |
| `Schema`   | Schema (database) inside the share that holds the table you want Nimble to read.                                                                                                                                                      |
| `Table`    | Table name inside that schema.                                                                                                                                                                                                        |

#### One-time setup

<Steps>
  <Step title="Create a recipient that points to Nimble's metastore">
    The recipient is the Databricks-side object that grants Nimble permission to receive your shares.

    ```bash theme={"system"}
    databricks recipients create --json '{
      "name": "nimble",
      "authentication_type": "DATABRICKS",
      "data_recipient_global_metastore_id": "aws:us-east-1:2f3ba1b1-429c-491f-b37d-ebb46f22f3e9",
      "comment": "Nimble Delta Sharing recipient"
    }'
    ```

    You only do this once - re-use the same recipient for every additional table you share with Nimble.
  </Step>

  <Step title="Create a share">
    Pick any name you like (e.g., `nimble_inbox`). The Job form's `Share` field will use this value.

    ```bash theme={"system"}
    databricks shares create \
      --name nimble_inbox \
      --comment "Tables shared with Nimble"
    ```
  </Step>

  <Step title="Add the table to the share">
    Replace `main.inbox.products` with the fully-qualified UC name of the source table (`<catalog>.<schema>.<table>`). The `shared_as` value sets how the table appears on Nimble's side - it **must match** the `Schema` and `Table` values in the Job form.

    ```bash theme={"system"}
    databricks shares update nimble_inbox --json '{
      "updates": [{
        "action": "ADD",
        "data_object": {
          "name": "main.inbox.products",
          "data_object_type": "TABLE",
          "shared_as": "inbox.products"
        }
      }]
    }'
    ```

    For partitioned tables or history sharing options, see the full [`SharedDataObject` reference](https://docs.databricks.com/api/workspace/shares/update).
  </Step>

  <Step title="Grant the recipient SELECT on the share">
    ```bash theme={"system"}
    databricks grants update share nimble_inbox --json '{
      "changes": [{
        "principal": "nimble",
        "add": ["SELECT"]
      }]
    }'
    ```

    Once this grant lands, the share becomes visible on Nimble's metastore. No support ticket, no manual coordination - the next Job run picks up the share **automatically**.
  </Step>
</Steps>

<Tip>
  Every Job run reads the **latest** contents of the shared table; you do not need to re-publish the share unless you change the table name or schema.
</Tip>

#### Adding more tables later

Only **steps 3 and 4** need to repeat for each additional table. The recipient (step 1) and the share (step 2) are reused across tables - just `ADD` a new `data_object` and re-grant `SELECT` if you create a new share instead of extending the existing one.

***

### Destination: deliver Job output to your Unity Catalog

In this direction, **Nimble is the provider** and **you are the recipient**. On the first Job run, Nimble makes the share available to your metastore (creating both the share and the recipient on demand, bound to your `Metastore ID`). You mount the share locally as a Unity Catalog catalog and query it like any other UC table.

<Warning>
  **Data retention: 14 days.** Nimble guarantees the shared table stays queryable for **at least two weeks** after each successful Job run, but **not longer**. Beyond that window, the shared table is not guaranteed to remain available. If you need the data to persist - or want a frozen snapshot of every run - materialize it into a UC table you own. See [Persisting the data](#persisting-the-data).
</Warning>

#### Job form fields

Set these in the Job form under **Destination → Databricks**:

| Field            | Description                                                                                                                                                                       |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Share name`     | Share name **on Nimble's side** that the output table will be published to. Created on demand if it doesn't already exist. Pick any value - it's only visible to your account.    |
| `Recipient name` | Recipient name **on Nimble's side** that represents your workspace. Created on demand and bound to `Metastore ID`. Use one recipient per consuming metastore.                     |
| `Metastore ID`   | **Your** UC global metastore ID, in the form `<cloud>:<region>:<uuid>` (e.g. `aws:us-east-1:a9e65c72-c515-45bc-a600-3048a46bd6a8`). See "Finding your metastore ID" below.        |
| `Shared as`      | `<schema>.<table>` alias for the shared table - the **only** name visible on your side. Pick a clean, stable value; renaming it later invalidates the catalog mount on your side. |

#### Finding your metastore ID

Run **one** of the following inside the Databricks workspace that will consume the share:

<CodeGroup>
  ```sql SQL (any UC-enabled cluster or SQL warehouse) theme={"system"}
  SELECT current_metastore();
  ```

  ```bash CLI theme={"system"}
  databricks metastores summary | jq -r .global_metastore_id
  ```
</CodeGroup>

The output is the value to enter in the `Metastore ID` field. The format is always `<cloud>:<region>:<uuid>` - the bare UUID returned by older Databricks endpoints is **not** accepted.

#### One-time setup (after the first Job run)

The share becomes available to your metastore after the Job's first successful run. After that first run completes, run the following on your Databricks workspace:

<Steps>
  <Step title="Confirm Nimble shows up as a provider">
    Once Nimble has bound the recipient to your metastore, the share becomes visible in your UC metastore as a **provider**. List providers to find the exact name Databricks assigned it on your side:

    ```bash theme={"system"}
    databricks providers list --output json \
      | jq '.providers[] | select(.authentication_type=="DATABRICKS") | {name, recipient_profile_str}'
    ```

    You can also do this in the UI: **Catalog → Delta Sharing → Shared with me → Providers**.
  </Step>

  <Step title="Inspect the share contents">
    Replace `<provider_name>` with the name from the previous step. Confirm the share you configured in the Job form is listed and contains a table named after your `Shared as` value.

    ```bash theme={"system"}
    databricks providers list-shares <provider_name>
    ```
  </Step>

  <Step title="Mount the share as a UC catalog">
    Pick any local catalog name (e.g., `nimble`). Once mounted, the Job's output table is queryable as `<catalog>.<shared_as>`.

    <CodeGroup>
      ```sql SQL theme={"system"}
      CREATE CATALOG IF NOT EXISTS nimble
      USING SHARE `<provider_name>`.`<share_name>`;
      ```

      ```bash CLI theme={"system"}
      databricks catalogs create --json '{
        "name": "nimble",
        "provider_name": "<provider_name>",
        "share_name": "<share_name>"
      }'
      ```
    </CodeGroup>

    `<share_name>` is the value entered in the Job form's `Share name` field. `<provider_name>` is the value from step 1.
  </Step>

  <Step title="Grant usage to your team">
    The mount itself only grants access to the metastore admin who created it. Open it up to consumers with UC grants:

    ```bash theme={"system"}
    databricks grants update catalog nimble --json '{
      "changes": [{
        "principal": "account users",
        "add": ["USE_CATALOG", "USE_SCHEMA", "SELECT"]
      }]
    }'
    ```

    Replace `account users` with whichever UC group / service principal should have read access.
  </Step>

  <Step title="Query the table">
    The fully-qualified path is `<catalog>.<shared_as>`. For `Shared as = data.products` and a catalog mounted as `nimble`:

    ```sql theme={"system"}
    SELECT * FROM nimble.data.products LIMIT 100;
    ```
  </Step>
</Steps>

#### Subsequent runs

Once mounted, every subsequent Job run refreshes the shared table - the catalog mount itself is permanent. Each successful run also **resets the 14-day retention clock** on the shared table; if a Job stops running (or runs less frequently than every two weeks), the table will eventually age out of the share. Re-run the `CREATE CATALOG` step only if you delete the catalog, rename `Shared as` on the Job, or Nimble changes the share name (which won't happen except on your explicit request).

<Warning>
  Changing `Shared as` after the first run changes the **path** consumers query against (e.g., from `nimble.data.products` to `nimble.curated.products`). Plan downstream queries and views accordingly - and prefer keeping `Shared as` stable.
</Warning>

#### Persisting the data

The shared table is only guaranteed to be queryable for **14 days** after each Job run. To hold the data longer - or to keep a frozen per-run snapshot for audit / historical analysis - materialize it into a UC table you own. Two common patterns:

<CodeGroup>
  ```sql Overwrite (latest snapshot) theme={"system"}
  CREATE OR REPLACE TABLE my_catalog.my_schema.products
  AS SELECT * FROM nimble.data.products;
  ```

  ```sql Append (run history) theme={"system"}
  INSERT INTO my_catalog.my_schema.products_history
  SELECT *, current_timestamp() AS snapshot_at
  FROM nimble.data.products;
  ```
</CodeGroup>

Wire this as a Databricks Job, a [Lakeflow Declarative Pipeline](https://docs.databricks.com/aws/en/delta-live-tables), or any other UC-aware orchestrator, scheduled to run shortly after Nimble's Job cadence. Once materialized, the data is fully under your control and survives Nimble's retention window.

<Tip>
  Schedule the materialization a few minutes **after** Nimble's Job is expected to finish, not at the same time. If you run too early you'll snapshot the previous run; if you run too late you stay within the 14-day window with plenty of buffer either way.
</Tip>

#### Reference summary

| What                                                                                   | Value                                                                                                         |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Nimble's global metastore ID (used when **you** create a recipient pointing to Nimble) | `aws:us-east-1:2f3ba1b1-429c-491f-b37d-ebb46f22f3e9`                                                          |
| Input direction - your role                                                            | Provider (you run `databricks recipients create` + `shares create` + `shares update` + `grants update share`) |
| Destination direction - your role                                                      | Recipient (you run `databricks providers list` + `catalogs create` + `grants update catalog`)                 |
| Where to find your global metastore ID                                                 | `SELECT current_metastore()` or `databricks metastores summary`                                               |
| Destination data retention                                                             | **14 days** from each successful Job run. Materialize into a UC table you own to retain longer.               |

***

## Comparison

| Feature                     | Polling                      | Webhooks          | Cloud Delivery        |
| --------------------------- | ---------------------------- | ----------------- | --------------------- |
| **Setup complexity**        | None                         | Requires endpoint | Requires bucket setup |
| **Real-time notifications** | No (you poll)                | Yes               | No                    |
| **Automatic storage**       | No                           | No                | Yes                   |
| **Best for**                | Simple integrations, testing | Event-driven apps | Data pipelines ETLs   |
| **Infrastructure needed**   | None                         | Web server        | Cloud storage bucket  |

### Combining methods

You can combine delivery methods for redundancy:

<CodeGroup>
  ```python Python theme={"system"}
  from nimble_python import Nimble

  nimble = Nimble(api_key="YOUR-API-KEY")

  # Receive webhook AND store in S3
  response = nimble.extract_async(
      url="https://www.nimbleway.com",
      formats=["html", "markdown"],
      callback_url="https://your-server.com/webhooks/nimble",
      storage_type="s3",
      storage_url="s3://your-bucket/results/"
  )
  ```

  ```javascript Node theme={"system"}
  import Nimble from "@nimble-way/nimble-js";

  const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

  // Receive webhook AND store in S3
  const response = await nimble.extractAsync({
    url: "https://www.nimbleway.com",
    formats: ["html", "markdown"],
    callback_url: "https://your-server.com/webhooks/nimble",
    storage_type: "s3",
    storage_url: "s3://your-bucket/results/",
  });
  ```

  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/extract/async' \
  --header 'Authorization: Bearer YOUR-API-KEY' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "url": "https://www.nimbleway.com",
      "formats": ["html", "markdown"],
      "callback_url": "https://your-server.com/webhooks/nimble",
      "storage_type": "s3",
      "storage_url": "s3://your-bucket/results/"
  }'
  ```
</CodeGroup>

***

## Best Practices

<AccordionGroup>
  <Accordion icon="rotate" title="Polling">
    * **Check status first** - Use `/tasks/{id}` before fetching full results -
      **Use reasonable intervals** - Poll every 2-5 seconds, not continuously -
      **Handle rate limits** - Implement retry logic for 429 responses - **Set
      timeouts** - Most tasks complete within seconds to minutes
  </Accordion>

  <Accordion icon="webhook" title="Webhooks">
    * **Use HTTPS** - Always use secure endpoints - **Verify authenticity** -
      Use custom headers for authentication - **Respond quickly** - Return 200 OK
      immediately, process async - **Handle retries** - Nimble retries failed
      deliveries
  </Accordion>

  <Accordion icon="cloud-arrow-up" title="Cloud Delivery">
    * **Use prefixes** - Organize by date, project, or type - **Enable
      compression** - Use `storage_compress: true` for large files - **Set
      lifecycle policies** - Auto-delete old files to manage costs - **Use custom
      names** - `storage_object_name` for meaningful filenames
  </Accordion>
</AccordionGroup>

## Next Steps

<CardGroup cols={2}>
  <Card icon="arrows-to-circle" href="/nimble-sdk/web-tools/extract/features/async" title="Async Extract">
    Learn about async extraction options
  </Card>

  <Card icon="spider" href="/nimble-sdk/web-tools/crawl" title="Crawl API">
    Deep website crawling with async delivery
  </Card>

  <Card icon="robot" href="/nimble-sdk/agentic/agent-gallery" title="Agent Gallery">
    Browse available search agents
  </Card>

  <Card icon="gauge-high" href="/nimble-sdk/admin/rate-limits" title="Rate Limits">
    Understand API rate limit
  </Card>
</CardGroup>
