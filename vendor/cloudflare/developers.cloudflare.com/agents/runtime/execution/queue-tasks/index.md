---
title: Queue tasks
description: Add background tasks to a built-in FIFO queue for asynchronous processing within Cloudflare Agents.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Queue tasks

The Agents SDK provides a built-in queue system that allows you to schedule tasks for asynchronous execution. This is useful for background processing, delayed operations, and managing workloads that do not need immediate execution.

## Overview

The queue system is built into the base `Agent` class. Tasks are stored in a SQLite table and processed automatically in FIFO (First In, First Out) order.

## `QueueItem` type

TypeScript

```

type QueueItem<T> = {

  id: string; // Unique identifier for the queued task

  payload: T; // Data to pass to the callback function

  callback: keyof Agent; // Name of the method to call

  created_at: number; // Timestamp when the task was created

  retry?: RetryOptions; // Retry options for this task

};


```

## Core methods

### `queue()`

Adds a task to the queue for future execution.

TypeScript

```

async queue<T>(

  callback: keyof this,

  payload: T,

  options?: { retry?: RetryOptions }

): Promise<string>


```

**Parameters:**

* `callback` \- The name of the method to call when processing the task
* `payload` \- Data to pass to the callback method
* `options` \- Optional configuration:  
   * `retry` \- Retry options for the callback execution. If the callback throws, it is retried with exponential backoff. Refer to [Retries](https://developers.cloudflare.com/agents/runtime/execution/retries/) for details on `RetryOptions`

**Returns:** The unique ID of the queued task

**Example:**

* [  JavaScript ](#tab-panel-6045)
* [  TypeScript ](#tab-panel-6046)

JavaScript

```

class MyAgent extends Agent {

  async processEmail(data) {

    // Process the email

    console.log(`Processing email: ${data.subject}`);

  }


  async onMessage(message) {

    // Queue an email processing task

    const taskId = await this.queue("processEmail", {

      email: "user@example.com",

      subject: "Welcome!",

    });


    console.log(`Queued task with ID: ${taskId}`);

  }

}


```

TypeScript

```

class MyAgent extends Agent {

  async processEmail(data: { email: string; subject: string }) {

    // Process the email

    console.log(`Processing email: ${data.subject}`);

  }


  async onMessage(message: string) {

    // Queue an email processing task

    const taskId = await this.queue("processEmail", {

      email: "user@example.com",

      subject: "Welcome!",

    });


    console.log(`Queued task with ID: ${taskId}`);

  }

}


```

### `dequeue()`

Removes a specific task from the queue by ID. This method is synchronous.

TypeScript

```

dequeue(id: string): void


```

**Parameters:**

* `id` \- The ID of the task to remove

**Example:**

* [  JavaScript ](#tab-panel-6035)
* [  TypeScript ](#tab-panel-6036)

JavaScript

```

// Remove a specific task

agent.dequeue("abc123def");


```

TypeScript

```

// Remove a specific task

agent.dequeue("abc123def");


```

### `dequeueAll()`

Removes all tasks from the queue. This method is synchronous.

TypeScript

```

dequeueAll(): void


```

**Example:**

* [  JavaScript ](#tab-panel-6037)
* [  TypeScript ](#tab-panel-6038)

JavaScript

```

// Clear the entire queue

agent.dequeueAll();


```

TypeScript

```

// Clear the entire queue

agent.dequeueAll();


```

### `dequeueAllByCallback()`

Removes all tasks that match a specific callback method. This method is synchronous.

TypeScript

```

dequeueAllByCallback(callback: string): void


```

**Parameters:**

* `callback` \- Name of the callback method

**Example:**

* [  JavaScript ](#tab-panel-6039)
* [  TypeScript ](#tab-panel-6040)

JavaScript

```

// Remove all email processing tasks

agent.dequeueAllByCallback("processEmail");


```

TypeScript

```

// Remove all email processing tasks

agent.dequeueAllByCallback("processEmail");


```

### `getQueue()`

Retrieves a specific queued task by ID. This method is synchronous.

TypeScript

```

getQueue<T>(id: string): QueueItem<T> | undefined


```

**Parameters:**

* `id` \- The ID of the task to retrieve

**Returns:** The `QueueItem` with parsed payload or `undefined` if not found

The payload is automatically parsed from JSON before being returned.

**Example:**

* [  JavaScript ](#tab-panel-6043)
* [  TypeScript ](#tab-panel-6044)

JavaScript

```

const task = agent.getQueue("abc123def");

if (task) {

  console.log(`Task callback: ${task.callback}`);

  console.log(`Task payload:`, task.payload);

}


```

TypeScript

```

const task = agent.getQueue("abc123def");

if (task) {

  console.log(`Task callback: ${task.callback}`);

  console.log(`Task payload:`, task.payload);

}


```

### `getQueues()`

Retrieves all queued tasks that match a specific key-value pair in their payload. This method is synchronous.

TypeScript

```

getQueues<T>(key: string, value: string): QueueItem<T>[]


```

**Parameters:**

* `key` \- The key to filter by in the payload
* `value` \- The value to match

**Returns:** Array of matching `QueueItem` objects

This method fetches all queue items and filters them in memory by parsing each payload and checking if the specified key matches the value.

**Example:**

* [  JavaScript ](#tab-panel-6041)
* [  TypeScript ](#tab-panel-6042)

JavaScript

```

// Find all tasks for a specific user

const userTasks = agent.getQueues("userId", "12345");


```

TypeScript

```

// Find all tasks for a specific user

const userTasks = agent.getQueues("userId", "12345");


```

## How queue processing works

1. **Validation**: When calling `queue()`, the method validates that the callback exists as a function on the agent.
2. **Automatic processing**: After queuing, the system automatically attempts to flush the queue.
3. **FIFO order**: Tasks are processed in the order they were created (`created_at` timestamp).
4. **Context preservation**: Each queued task runs with the same agent context (connection, request, email).
5. **Automatic dequeue**: Successfully executed tasks are automatically removed from the queue.
6. **Error handling**: If a callback method does not exist at execution time, an error is logged and the task is skipped.
7. **Persistence**: Tasks are stored in the `cf_agents_queues` SQL table and survive agent restarts.

## Queue callback methods

When defining callback methods for queued tasks, they must follow this signature:

TypeScript

```

async callbackMethod(payload: unknown, queueItem: QueueItem): Promise<void>


```

**Example:**

* [  JavaScript ](#tab-panel-6049)
* [  TypeScript ](#tab-panel-6050)

JavaScript

```

class MyAgent extends Agent {

  async sendNotification(payload, queueItem) {

    console.log(`Processing task ${queueItem.id}`);

    console.log(

      `Sending notification to user ${payload.userId}: ${payload.message}`,

    );


    // Your notification logic here

    await this.notificationService.send(payload.userId, payload.message);

  }


  async onUserSignup(userData) {

    // Queue a welcome notification

    await this.queue("sendNotification", {

      userId: userData.id,

      message: "Welcome to our platform!",

    });

  }

}


```

TypeScript

```

class MyAgent extends Agent {

  async sendNotification(

    payload: { userId: string; message: string },

    queueItem: QueueItem<{ userId: string; message: string }>,

  ) {

    console.log(`Processing task ${queueItem.id}`);

    console.log(

      `Sending notification to user ${payload.userId}: ${payload.message}`,

    );


    // Your notification logic here

    await this.notificationService.send(payload.userId, payload.message);

  }


  async onUserSignup(userData: any) {

    // Queue a welcome notification

    await this.queue("sendNotification", {

      userId: userData.id,

      message: "Welcome to our platform!",

    });

  }

}


```

## Use cases

### Background processing

* [  JavaScript ](#tab-panel-6047)
* [  TypeScript ](#tab-panel-6048)

JavaScript

```

class DataProcessor extends Agent {

  async processLargeDataset(data) {

    const results = await this.heavyComputation(data.datasetId);

    await this.notifyUser(data.userId, results);

  }


  async onDataUpload(uploadData) {

    // Queue the processing instead of doing it synchronously

    await this.queue("processLargeDataset", {

      datasetId: uploadData.id,

      userId: uploadData.userId,

    });


    return { message: "Data upload received, processing started" };

  }

}


```

TypeScript

```

class DataProcessor extends Agent {

  async processLargeDataset(data: { datasetId: string; userId: string }) {

    const results = await this.heavyComputation(data.datasetId);

    await this.notifyUser(data.userId, results);

  }


  async onDataUpload(uploadData: any) {

    // Queue the processing instead of doing it synchronously

    await this.queue("processLargeDataset", {

      datasetId: uploadData.id,

      userId: uploadData.userId,

    });


    return { message: "Data upload received, processing started" };

  }

}


```

### Batch operations

* [  JavaScript ](#tab-panel-6051)
* [  TypeScript ](#tab-panel-6052)

JavaScript

```

class BatchProcessor extends Agent {

  async processBatch(data) {

    for (const item of data.items) {

      await this.processItem(item);

    }

    console.log(`Completed batch ${data.batchId}`);

  }


  async onLargeRequest(items) {

    // Split large requests into smaller batches

    const batchSize = 10;

    for (let i = 0; i < items.length; i += batchSize) {

      const batch = items.slice(i, i + batchSize);

      await this.queue("processBatch", {

        items: batch,

        batchId: `batch-${i / batchSize + 1}`,

      });

    }

  }

}


```

TypeScript

```

class BatchProcessor extends Agent {

  async processBatch(data: { items: any[]; batchId: string }) {

    for (const item of data.items) {

      await this.processItem(item);

    }

    console.log(`Completed batch ${data.batchId}`);

  }


  async onLargeRequest(items: any[]) {

    // Split large requests into smaller batches

    const batchSize = 10;

    for (let i = 0; i < items.length; i += batchSize) {

      const batch = items.slice(i, i + batchSize);

      await this.queue("processBatch", {

        items: batch,

        batchId: `batch-${i / batchSize + 1}`,

      });

    }

  }

}


```

## Error handling

Use the built-in `retry` option instead of manual re-queue logic. When a callback throws, the task is automatically retried with exponential backoff:

* [  JavaScript ](#tab-panel-6053)
* [  TypeScript ](#tab-panel-6054)

JavaScript

```

class RobustAgent extends Agent {

  async reliableTask(payload, queueItem) {

    console.log(`Processing task ${queueItem.id}`);

    const response = await fetch(payload.url);

    if (!response.ok) {

      throw new Error(`Request failed: ${response.status}`);

    }

  }


  async onMessage(connection, message) {

    await this.queue(

      "reliableTask",

      { url: "https://api.example.com/data" },

      {

        retry: {

          maxAttempts: 5,

          baseDelayMs: 500,

          maxDelayMs: 10_000,

        },

      },

    );

  }

}


```

TypeScript

```

class RobustAgent extends Agent {

  async reliableTask(payload: { url: string }, queueItem: QueueItem) {

    console.log(`Processing task ${queueItem.id}`);

    const response = await fetch(payload.url);

    if (!response.ok) {

      throw new Error(`Request failed: ${response.status}`);

    }

  }


  async onMessage(connection: Connection, message: WSMessage) {

    await this.queue(

      "reliableTask",

      { url: "https://api.example.com/data" },

      {

        retry: {

          maxAttempts: 5,

          baseDelayMs: 500,

          maxDelayMs: 10_000,

        },

      },

    );

  }

}


```

If no `retry` option is provided, the class-level defaults from `static options.retry` are used (3 attempts, 100ms base delay, 3s max delay). Refer to [Retries](https://developers.cloudflare.com/agents/runtime/execution/retries/) for full details.

## Best practices

1. **Keep payloads small**: Payloads are JSON-serialized and stored in the database.
2. **Idempotent operations**: Design callback methods to be safe to retry.
3. **Error handling**: Include proper error handling in callback methods.
4. **Monitoring**: Use logging to track queue processing.
5. **Cleanup**: Regularly clean up completed or failed tasks if needed.

## Integration with other features

The queue system works with other Agent SDK features:

* **State management**: Access agent state within queued callbacks.
* **Scheduling**: Combine with [schedule()](https://developers.cloudflare.com/agents/runtime/execution/schedule-tasks/) for time-based queue processing.
* **Context**: Queued tasks maintain the original request context.
* **Database**: Uses the same database as other agent data.

## Limitations

* Tasks are processed sequentially, not in parallel.
* No priority system (FIFO only).
* Queue processing happens during agent execution, not as separate background jobs.

## Queue vs Schedule

Use **queue** when you want tasks to execute as soon as possible in order. Use [**schedule**](https://developers.cloudflare.com/agents/runtime/execution/schedule-tasks/) when you need tasks to run at specific times or on a recurring basis.

| Feature          | Queue                    | Schedule                    |
| ---------------- | ------------------------ | --------------------------- |
| Execution timing | Immediate (FIFO)         | Specific time or cron       |
| Use case         | Background processing    | Delayed or recurring tasks  |
| Storage          | cf\_agents\_queues table | cf\_agents\_schedules table |

## Next steps

[ Agents API ](https://developers.cloudflare.com/agents/runtime/agents-api/) Complete API reference for the Agents SDK. 

[ Schedule tasks ](https://developers.cloudflare.com/agents/runtime/execution/schedule-tasks/) Time-based execution with cron and delays. 

[ Run Workflows ](https://developers.cloudflare.com/agents/runtime/execution/run-workflows/) Durable multi-step background processing. 

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/runtime/execution/queue-tasks/#page","headline":"Queue tasks · Cloudflare Agents docs","description":"Add background tasks to a built-in FIFO queue for asynchronous processing within Cloudflare Agents.","url":"https://developers.cloudflare.com/agents/runtime/execution/queue-tasks/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/runtime/","name":"Runtime"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/runtime/execution/","name":"Execution"}},{"@type":"ListItem","position":5,"item":{"@id":"/agents/runtime/execution/queue-tasks/","name":"Queue tasks"}}]}
```
