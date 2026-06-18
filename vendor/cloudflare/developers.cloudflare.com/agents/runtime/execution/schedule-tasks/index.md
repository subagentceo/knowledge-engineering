---
title: Schedule tasks
description: Schedule delayed, date-based, cron, and interval tasks on Agents with persistent SQLite-backed execution.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Schedule tasks

Schedule tasks to run in the future — whether that is seconds from now, at a specific date/time, or on a recurring cron schedule. Scheduled tasks survive agent restarts and are persisted to SQLite.

Scheduled tasks can do anything a request or message from a user can: make requests, query databases, send emails, read and write state. Scheduled tasks can invoke any regular method on your Agent.

## Overview

The scheduling system supports four modes:

| Mode          | Syntax                             | Use case                  |
| ------------- | ---------------------------------- | ------------------------- |
| **Delayed**   | this.schedule(60, ...)             | Run in 60 seconds         |
| **Scheduled** | this.schedule(new Date(...), ...)  | Run at specific time      |
| **Cron**      | this.schedule("0 8 \* \* \*", ...) | Run on recurring schedule |
| **Interval**  | this.scheduleEvery(30, ...)        | Run every 30 seconds      |

Under the hood, scheduling uses [Durable Object alarms](https://developers.cloudflare.com/durable-objects/api/alarms/) to wake the agent at the right time. Tasks are stored in a SQLite table and executed in order.

## Quick start

* [  JavaScript ](#tab-panel-6161)
* [  TypeScript ](#tab-panel-6162)

JavaScript

```

import { Agent } from "agents";


export class ReminderAgent extends Agent {

  async onRequest(request) {

    const url = new URL(request.url);


    // Schedule in 30 seconds

    await this.schedule(30, "sendReminder", {

      message: "Check your email",

    });


    // Schedule at specific time

    await this.schedule(new Date("2025-02-01T09:00:00Z"), "sendReminder", {

      message: "Monthly report due",

    });


    // Schedule recurring (every day at 8am)

    await this.schedule("0 8 * * *", "dailyDigest", {

      userId: url.searchParams.get("userId"),

    });


    return new Response("Scheduled!");

  }


  async sendReminder(payload) {

    console.log(`Reminder: ${payload.message}`);

    // Send notification, email, etc.

  }


  async dailyDigest(payload) {

    console.log(`Sending daily digest to ${payload.userId}`);

    // Generate and send digest

  }

}


```

TypeScript

```

import { Agent } from "agents";


export class ReminderAgent extends Agent {

  async onRequest(request: Request) {

    const url = new URL(request.url);


    // Schedule in 30 seconds

    await this.schedule(30, "sendReminder", {

      message: "Check your email",

    });


    // Schedule at specific time

    await this.schedule(new Date("2025-02-01T09:00:00Z"), "sendReminder", {

      message: "Monthly report due",

    });


    // Schedule recurring (every day at 8am)

    await this.schedule("0 8 * * *", "dailyDigest", {

      userId: url.searchParams.get("userId"),

    });


    return new Response("Scheduled!");

  }


  async sendReminder(payload: { message: string }) {

    console.log(`Reminder: ${payload.message}`);

    // Send notification, email, etc.

  }


  async dailyDigest(payload: { userId: string }) {

    console.log(`Sending daily digest to ${payload.userId}`);

    // Generate and send digest

  }

}


```

## Scheduling modes

### Delayed execution

Pass a number to schedule a task to run after a delay in **seconds**:

* [  JavaScript ](#tab-panel-6141)
* [  TypeScript ](#tab-panel-6142)

JavaScript

```

// Run in 10 seconds

await this.schedule(10, "processTask", { taskId: "123" });


// Run in 5 minutes (300 seconds)

await this.schedule(300, "sendFollowUp", { email: "user@example.com" });


// Run in 1 hour

await this.schedule(3600, "checkStatus", { orderId: "abc" });


```

TypeScript

```

// Run in 10 seconds

await this.schedule(10, "processTask", { taskId: "123" });


// Run in 5 minutes (300 seconds)

await this.schedule(300, "sendFollowUp", { email: "user@example.com" });


// Run in 1 hour

await this.schedule(3600, "checkStatus", { orderId: "abc" });


```

**Use cases:**

* Debouncing rapid events
* Delayed notifications ("You left items in your cart")
* Retry with backoff
* Rate limiting

### Scheduled execution

Pass a `Date` object to schedule a task at a specific time:

* [  JavaScript ](#tab-panel-6145)
* [  TypeScript ](#tab-panel-6146)

JavaScript

```

// Run tomorrow at noon

const tomorrow = new Date();

tomorrow.setDate(tomorrow.getDate() + 1);

tomorrow.setHours(12, 0, 0, 0);

await this.schedule(tomorrow, "sendReminder", { message: "Meeting time!" });


// Run at a specific timestamp

await this.schedule(new Date("2025-06-15T14:30:00Z"), "triggerEvent", {

  eventId: "conference-2025",

});


// Run in 2 hours using Date math

const twoHoursFromNow = new Date(Date.now() + 2 * 60 * 60 * 1000);

await this.schedule(twoHoursFromNow, "checkIn", {});


```

TypeScript

```

// Run tomorrow at noon

const tomorrow = new Date();

tomorrow.setDate(tomorrow.getDate() + 1);

tomorrow.setHours(12, 0, 0, 0);

await this.schedule(tomorrow, "sendReminder", { message: "Meeting time!" });


// Run at a specific timestamp

await this.schedule(new Date("2025-06-15T14:30:00Z"), "triggerEvent", {

  eventId: "conference-2025",

});


// Run in 2 hours using Date math

const twoHoursFromNow = new Date(Date.now() + 2 * 60 * 60 * 1000);

await this.schedule(twoHoursFromNow, "checkIn", {});


```

**Use cases:**

* Appointment reminders
* Deadline notifications
* Scheduled content publishing
* Time-based triggers

### Recurring (cron)

Pass a cron expression string for recurring schedules:

* [  JavaScript ](#tab-panel-6151)
* [  TypeScript ](#tab-panel-6152)

JavaScript

```

// Every day at 8:00 AM

await this.schedule("0 8 * * *", "dailyReport", {});


// Every hour

await this.schedule("0 * * * *", "hourlyCheck", {});


// Every Monday at 9:00 AM

await this.schedule("0 9 * * 1", "weeklySync", {});


// Every 15 minutes

await this.schedule("*/15 * * * *", "pollForUpdates", {});


// First day of every month at midnight

await this.schedule("0 0 1 * *", "monthlyCleanup", {});


```

TypeScript

```

// Every day at 8:00 AM

await this.schedule("0 8 * * *", "dailyReport", {});


// Every hour

await this.schedule("0 * * * *", "hourlyCheck", {});


// Every Monday at 9:00 AM

await this.schedule("0 9 * * 1", "weeklySync", {});


// Every 15 minutes

await this.schedule("*/15 * * * *", "pollForUpdates", {});


// First day of every month at midnight

await this.schedule("0 0 1 * *", "monthlyCleanup", {});


```

**Cron syntax:** `minute hour day month weekday`

| Field        | Values         | Special characters |
| ------------ | -------------- | ------------------ |
| Minute       | 0-59           | \* , \- /          |
| Hour         | 0-23           | \* , \- /          |
| Day of Month | 1-31           | \* , \- /          |
| Month        | 1-12           | \* , \- /          |
| Day of Week  | 0-6 (0=Sunday) | \* , \- /          |

**Common patterns:**

* [  JavaScript ](#tab-panel-6143)
* [  TypeScript ](#tab-panel-6144)

JavaScript

```

"* * * * *"; // Every minute

"*/5 * * * *"; // Every 5 minutes

"0 * * * *"; // Every hour (on the hour)

"0 0 * * *"; // Every day at midnight

"0 8 * * 1-5"; // Weekdays at 8am

"0 0 * * 0"; // Every Sunday at midnight

"0 0 1 * *"; // First of every month


```

TypeScript

```

"* * * * *"; // Every minute

"*/5 * * * *"; // Every 5 minutes

"0 * * * *"; // Every hour (on the hour)

"0 0 * * *"; // Every day at midnight

"0 8 * * 1-5"; // Weekdays at 8am

"0 0 * * 0"; // Every Sunday at midnight

"0 0 1 * *"; // First of every month


```

**Use cases:**

* Daily/weekly reports
* Periodic cleanup jobs
* Polling external services
* Health checks
* Subscription renewals

Cron schedules are idempotent by default — calling `schedule()` with the same cron expression, callback, and payload multiple times returns the existing schedule instead of creating a duplicate. This makes cron schedules safe to set up in `onStart()`.

### Interval

Use `scheduleEvery()` to run a task at fixed intervals (in seconds). Unlike cron, intervals support sub-minute precision and arbitrary durations:

* [  JavaScript ](#tab-panel-6147)
* [  TypeScript ](#tab-panel-6148)

JavaScript

```

// Poll every 30 seconds

await this.scheduleEvery(30, "poll", { source: "api" });


// Health check every 45 seconds

await this.scheduleEvery(45, "healthCheck", {});


// Sync every 90 seconds (1.5 minutes - cannot be expressed in cron)

await this.scheduleEvery(90, "syncData", { destination: "warehouse" });


```

TypeScript

```

// Poll every 30 seconds

await this.scheduleEvery(30, "poll", { source: "api" });


// Health check every 45 seconds

await this.scheduleEvery(45, "healthCheck", {});


// Sync every 90 seconds (1.5 minutes - cannot be expressed in cron)

await this.scheduleEvery(90, "syncData", { destination: "warehouse" });


```

**Key differences from cron:**

| Feature             | Cron                                  | Interval               |
| ------------------- | ------------------------------------- | ---------------------- |
| Minimum granularity | 1 minute                              | 1 second               |
| Arbitrary intervals | No (must fit cron pattern)            | Yes                    |
| Fixed schedule      | Yes (for example, "every day at 8am") | No (relative to start) |
| Overlap prevention  | No                                    | Yes (built-in)         |

**Idempotency:**

`scheduleEvery()` is idempotent on the combination of callback name, interval, and payload — calling it multiple times with the same arguments does not create duplicate schedules. This makes it safe to call in `onStart()`, which runs on every Durable Object wake:

* [  JavaScript ](#tab-panel-6149)
* [  TypeScript ](#tab-panel-6150)

JavaScript

```

class MyAgent extends Agent {

  async onStart() {

    // Safe to call on every wake — only one schedule is created

    await this.scheduleEvery(30, "poll", { source: "api" });

  }

}


```

TypeScript

```

class MyAgent extends Agent {

  async onStart() {

    // Safe to call on every wake — only one schedule is created

    await this.scheduleEvery(30, "poll", { source: "api" });

  }

}


```

A different interval or payload creates a new, independent schedule.

**Overlap prevention:**

If a callback takes longer than the interval, the next execution is skipped (not queued). This prevents runaway resource usage:

* [  JavaScript ](#tab-panel-6155)
* [  TypeScript ](#tab-panel-6156)

JavaScript

```

class PollingAgent extends Agent {

  async poll() {

    // If this takes 45 seconds and interval is 30 seconds,

    // the next poll is skipped (with a warning logged)

    const data = await slowExternalApi();

    await this.processData(data);

  }

}


// Set up 30-second interval

await this.scheduleEvery(30, "poll", {});


```

TypeScript

```

class PollingAgent extends Agent {

  async poll() {

    // If this takes 45 seconds and interval is 30 seconds,

    // the next poll is skipped (with a warning logged)

    const data = await slowExternalApi();

    await this.processData(data);

  }

}


// Set up 30-second interval

await this.scheduleEvery(30, "poll", {});


```

When a skip occurs, you will see a warning in logs:

```

Skipping interval schedule abc123: previous execution still running


```

**Error resilience:**

If the callback throws an error, the interval continues — only that execution fails:

* [  JavaScript ](#tab-panel-6153)
* [  TypeScript ](#tab-panel-6154)

JavaScript

```

class SyncAgent extends Agent {

  async syncData() {

    // Even if this throws, the interval keeps running

    const response = await fetch("https://api.example.com/data");

    if (!response.ok) throw new Error("Sync failed");

    // ...

  }

}


```

TypeScript

```

class SyncAgent extends Agent {

  async syncData() {

    // Even if this throws, the interval keeps running

    const response = await fetch("https://api.example.com/data");

    if (!response.ok) throw new Error("Sync failed");

    // ...

  }

}


```

**Use cases:**

* Sub-minute polling (every 10, 30, 45 seconds)
* Intervals that do not map to cron (every 90 seconds, every 7 minutes)
* Rate-limited API polling with precise control
* Real-time data synchronization

## Managing scheduled tasks

### Get a schedule

Retrieve a scheduled task by its ID:

* [  JavaScript ](#tab-panel-6157)
* [  TypeScript ](#tab-panel-6158)

JavaScript

```

const schedule = await this.getScheduleById(scheduleId);


if (schedule) {

  console.log(

    `Task ${schedule.id} will run at ${new Date(schedule.time * 1000)}`,

  );

  console.log(`Callback: ${schedule.callback}`);

  console.log(`Type: ${schedule.type}`); // "scheduled" | "delayed" | "cron" | "interval"

} else {

  console.log("Schedule not found");

}


```

TypeScript

```

const schedule = await this.getScheduleById(scheduleId);


if (schedule) {

  console.log(

    `Task ${schedule.id} will run at ${new Date(schedule.time * 1000)}`,

  );

  console.log(`Callback: ${schedule.callback}`);

  console.log(`Type: ${schedule.type}`); // "scheduled" | "delayed" | "cron" | "interval"

} else {

  console.log("Schedule not found");

}


```

### List schedules

Query scheduled tasks with optional filters:

* [  JavaScript ](#tab-panel-6167)
* [  TypeScript ](#tab-panel-6168)

JavaScript

```

// Get all scheduled tasks

const allSchedules = await this.listSchedules();


// Get only cron jobs

const cronJobs = await this.listSchedules({ type: "cron" });


// Get tasks in the next hour

const upcoming = await this.listSchedules({

  timeRange: {

    start: new Date(),

    end: new Date(Date.now() + 60 * 60 * 1000),

  },

});


// Get a specific task by ID

const specific = await this.listSchedules({ id: "abc123" });


// Combine filters

const upcomingCronJobs = await this.listSchedules({

  type: "cron",

  timeRange: {

    start: new Date(),

    end: new Date(Date.now() + 24 * 60 * 60 * 1000),

  },

});


```

TypeScript

```

// Get all scheduled tasks

const allSchedules = await this.listSchedules();


// Get only cron jobs

const cronJobs = await this.listSchedules({ type: "cron" });


// Get tasks in the next hour

const upcoming = await this.listSchedules({

  timeRange: {

    start: new Date(),

    end: new Date(Date.now() + 60 * 60 * 1000),

  },

});


// Get a specific task by ID

const specific = await this.listSchedules({ id: "abc123" });


// Combine filters

const upcomingCronJobs = await this.listSchedules({

  type: "cron",

  timeRange: {

    start: new Date(),

    end: new Date(Date.now() + 24 * 60 * 60 * 1000),

  },

});


```

### Cancel a schedule

Remove a scheduled task before it executes:

* [  JavaScript ](#tab-panel-6159)
* [  TypeScript ](#tab-panel-6160)

JavaScript

```

const cancelled = await this.cancelSchedule(scheduleId);


if (cancelled) {

  console.log("Schedule cancelled successfully");

} else {

  console.log("Schedule not found (may have already executed)");

}


```

TypeScript

```

const cancelled = await this.cancelSchedule(scheduleId);


if (cancelled) {

  console.log("Schedule cancelled successfully");

} else {

  console.log("Schedule not found (may have already executed)");

}


```

**Example: Cancellable reminders**

* [  JavaScript ](#tab-panel-6181)
* [  TypeScript ](#tab-panel-6182)

JavaScript

```

class ReminderAgent extends Agent {

  async setReminder(userId, message, delaySeconds) {

    const schedule = await this.schedule(delaySeconds, "sendReminder", {

      userId,

      message,

    });


    // Store the schedule ID so user can cancel later

    this.sql`

      INSERT INTO user_reminders (user_id, schedule_id, message)

      VALUES (${userId}, ${schedule.id}, ${message})

    `;


    return schedule.id;

  }


  async cancelReminder(scheduleId) {

    const cancelled = await this.cancelSchedule(scheduleId);


    if (cancelled) {

      this.sql`DELETE FROM user_reminders WHERE schedule_id = ${scheduleId}`;

    }


    return cancelled;

  }


  async sendReminder(payload) {

    // Send the reminder...


    // Clean up the record

    this.sql`DELETE FROM user_reminders WHERE user_id = ${payload.userId}`;

  }

}


```

TypeScript

```

class ReminderAgent extends Agent {

  async setReminder(userId: string, message: string, delaySeconds: number) {

    const schedule = await this.schedule(delaySeconds, "sendReminder", {

      userId,

      message,

    });


    // Store the schedule ID so user can cancel later

    this.sql`

      INSERT INTO user_reminders (user_id, schedule_id, message)

      VALUES (${userId}, ${schedule.id}, ${message})

    `;


    return schedule.id;

  }


  async cancelReminder(scheduleId: string) {

    const cancelled = await this.cancelSchedule(scheduleId);


    if (cancelled) {

      this.sql`DELETE FROM user_reminders WHERE schedule_id = ${scheduleId}`;

    }


    return cancelled;

  }


  async sendReminder(payload: { userId: string; message: string }) {

    // Send the reminder...


    // Clean up the record

    this.sql`DELETE FROM user_reminders WHERE user_id = ${payload.userId}`;

  }

}


```

## The Schedule object

When you create or retrieve a schedule, you get a `Schedule` object:

TypeScript

```

type Schedule<T> = {

  id: string; // Unique identifier

  callback: string; // Method name to call

  payload: T; // Data passed to the callback

  time: number; // Unix timestamp (seconds) of next execution

} & (

  | { type: "scheduled" } // One-time at specific date

  | { type: "delayed"; delayInSeconds: number } // One-time after delay

  | { type: "cron"; cron: string } // Recurring (cron expression)

  | { type: "interval"; intervalSeconds: number } // Recurring (fixed interval)

);


```

**Example:**

* [  JavaScript ](#tab-panel-6163)
* [  TypeScript ](#tab-panel-6164)

JavaScript

```

const schedule = await this.schedule(60, "myTask", { foo: "bar" });


console.log(schedule);

// {

//   id: "abc123xyz",

//   callback: "myTask",

//   payload: { foo: "bar" },

//   time: 1706745600,

//   type: "delayed",

//   delayInSeconds: 60

// }


```

TypeScript

```

const schedule = await this.schedule(60, "myTask", { foo: "bar" });


console.log(schedule);

// {

//   id: "abc123xyz",

//   callback: "myTask",

//   payload: { foo: "bar" },

//   time: 1706745600,

//   type: "delayed",

//   delayInSeconds: 60

// }


```

## Patterns

### Rescheduling from callbacks

For dynamic recurring schedules, schedule the next run from within the callback:

* [  JavaScript ](#tab-panel-6179)
* [  TypeScript ](#tab-panel-6180)

JavaScript

```

class PollingAgent extends Agent {

  async startPolling(intervalSeconds) {

    await this.schedule(intervalSeconds, "poll", { interval: intervalSeconds });

  }


  async poll(payload) {

    try {

      const data = await fetch("https://api.example.com/updates");

      await this.processUpdates(await data.json());

    } catch (error) {

      console.error("Polling failed:", error);

    }


    // Schedule the next poll (regardless of success/failure)

    await this.schedule(payload.interval, "poll", payload);

  }


  async stopPolling() {

    // Cancel all polling schedules

    const schedules = await this.listSchedules({ type: "delayed" });

    for (const schedule of schedules) {

      if (schedule.callback === "poll") {

        await this.cancelSchedule(schedule.id);

      }

    }

  }

}


```

TypeScript

```

class PollingAgent extends Agent {

  async startPolling(intervalSeconds: number) {

    await this.schedule(intervalSeconds, "poll", { interval: intervalSeconds });

  }


  async poll(payload: { interval: number }) {

    try {

      const data = await fetch("https://api.example.com/updates");

      await this.processUpdates(await data.json());

    } catch (error) {

      console.error("Polling failed:", error);

    }


    // Schedule the next poll (regardless of success/failure)

    await this.schedule(payload.interval, "poll", payload);

  }


  async stopPolling() {

    // Cancel all polling schedules

    const schedules = await this.listSchedules({ type: "delayed" });

    for (const schedule of schedules) {

      if (schedule.callback === "poll") {

        await this.cancelSchedule(schedule.id);

      }

    }

  }

}


```

### Exponential backoff retry

* [  JavaScript ](#tab-panel-6183)
* [  TypeScript ](#tab-panel-6184)

JavaScript

```

class RetryAgent extends Agent {

  async attemptTask(payload) {

    try {

      await this.doWork(payload.taskId);

      console.log(

        `Task ${payload.taskId} succeeded on attempt ${payload.attempt}`,

      );

    } catch (error) {

      if (payload.attempt >= payload.maxAttempts) {

        console.error(

          `Task ${payload.taskId} failed after ${payload.maxAttempts} attempts`,

        );

        return;

      }


      // Exponential backoff: 2^attempt seconds (2s, 4s, 8s, 16s...)

      const delaySeconds = Math.pow(2, payload.attempt);


      await this.schedule(delaySeconds, "attemptTask", {

        ...payload,

        attempt: payload.attempt + 1,

      });


      console.log(`Retrying task ${payload.taskId} in ${delaySeconds}s`);

    }

  }


  async doWork(taskId) {

    // Your actual work here

  }

}


```

TypeScript

```

class RetryAgent extends Agent {

  async attemptTask(payload: {

    taskId: string;

    attempt: number;

    maxAttempts: number;

  }) {

    try {

      await this.doWork(payload.taskId);

      console.log(

        `Task ${payload.taskId} succeeded on attempt ${payload.attempt}`,

      );

    } catch (error) {

      if (payload.attempt >= payload.maxAttempts) {

        console.error(

          `Task ${payload.taskId} failed after ${payload.maxAttempts} attempts`,

        );

        return;

      }


      // Exponential backoff: 2^attempt seconds (2s, 4s, 8s, 16s...)

      const delaySeconds = Math.pow(2, payload.attempt);


      await this.schedule(delaySeconds, "attemptTask", {

        ...payload,

        attempt: payload.attempt + 1,

      });


      console.log(`Retrying task ${payload.taskId} in ${delaySeconds}s`);

    }

  }


  async doWork(taskId: string) {

    // Your actual work here

  }

}


```

### Self-destructing agents

You can safely call `this.destroy()` from within a scheduled callback:

* [  JavaScript ](#tab-panel-6169)
* [  TypeScript ](#tab-panel-6170)

JavaScript

```

class TemporaryAgent extends Agent {

  async onStart() {

    // Self-destruct in 24 hours

    await this.schedule(24 * 60 * 60, "cleanup", {});

  }


  async cleanup() {

    // Perform final cleanup

    console.log("Agent lifetime expired, cleaning up...");


    // This is safe to call from a scheduled callback

    await this.destroy();

  }

}


```

TypeScript

```

class TemporaryAgent extends Agent {

  async onStart() {

    // Self-destruct in 24 hours

    await this.schedule(24 * 60 * 60, "cleanup", {});

  }


  async cleanup() {

    // Perform final cleanup

    console.log("Agent lifetime expired, cleaning up...");


    // This is safe to call from a scheduled callback

    await this.destroy();

  }

}


```

Note

When `destroy()` is called from within a scheduled task, the Agent SDK defers the destruction to ensure the scheduled callback completes successfully. The Agent instance will be evicted immediately after the callback finishes executing.

## AI-assisted scheduling

The SDK includes utilities for parsing natural language scheduling requests with AI.

### `getSchedulePrompt()`

Returns a system prompt for parsing natural language into scheduling parameters:

* [  JavaScript ](#tab-panel-6185)
* [  TypeScript ](#tab-panel-6186)

JavaScript

```

import { getSchedulePrompt, scheduleSchema } from "agents";

import { generateObject } from "ai";

import { openai } from "@ai-sdk/openai";


class SmartScheduler extends Agent {

  async parseScheduleRequest(userInput) {

    const result = await generateObject({

      model: openai("gpt-4o"),

      system: getSchedulePrompt({ date: new Date() }),

      prompt: userInput,

      schema: scheduleSchema,

    });


    return result.object;

  }


  async handleUserRequest(input) {

    // Parse: "remind me to call mom tomorrow at 3pm"

    const parsed = await this.parseScheduleRequest(input);


    // parsed = {

    //   description: "call mom",

    //   when: {

    //     type: "scheduled",

    //     date: "2025-01-30T15:00:00Z"

    //   }

    // }


    if (parsed.when.type === "scheduled" && parsed.when.date) {

      await this.schedule(new Date(parsed.when.date), "sendReminder", {

        message: parsed.description,

      });

    } else if (parsed.when.type === "delayed" && parsed.when.delayInSeconds) {

      await this.schedule(parsed.when.delayInSeconds, "sendReminder", {

        message: parsed.description,

      });

    } else if (parsed.when.type === "cron" && parsed.when.cron) {

      await this.schedule(parsed.when.cron, "sendReminder", {

        message: parsed.description,

      });

    }

  }


  async sendReminder(payload) {

    console.log(`Reminder: ${payload.message}`);

  }

}


```

TypeScript

```

import { getSchedulePrompt, scheduleSchema } from "agents";

import { generateObject } from "ai";

import { openai } from "@ai-sdk/openai";


class SmartScheduler extends Agent {

  async parseScheduleRequest(userInput: string) {

    const result = await generateObject({

      model: openai("gpt-4o"),

      system: getSchedulePrompt({ date: new Date() }),

      prompt: userInput,

      schema: scheduleSchema,

    });


    return result.object;

  }


  async handleUserRequest(input: string) {

    // Parse: "remind me to call mom tomorrow at 3pm"

    const parsed = await this.parseScheduleRequest(input);


    // parsed = {

    //   description: "call mom",

    //   when: {

    //     type: "scheduled",

    //     date: "2025-01-30T15:00:00Z"

    //   }

    // }


    if (parsed.when.type === "scheduled" && parsed.when.date) {

      await this.schedule(new Date(parsed.when.date), "sendReminder", {

        message: parsed.description,

      });

    } else if (parsed.when.type === "delayed" && parsed.when.delayInSeconds) {

      await this.schedule(parsed.when.delayInSeconds, "sendReminder", {

        message: parsed.description,

      });

    } else if (parsed.when.type === "cron" && parsed.when.cron) {

      await this.schedule(parsed.when.cron, "sendReminder", {

        message: parsed.description,

      });

    }

  }


  async sendReminder(payload: { message: string }) {

    console.log(`Reminder: ${payload.message}`);

  }

}


```

### `scheduleSchema`

A Zod schema for validating parsed scheduling data. Uses a discriminated union on `when.type` so each variant only contains the fields it needs:

* [  JavaScript ](#tab-panel-6173)
* [  TypeScript ](#tab-panel-6174)

JavaScript

```

import { scheduleSchema } from "agents";


// The schema is a discriminated union:

// {

//   description: string,

//   when:

//     | { type: "scheduled", date: string }       // ISO 8601 date string

//     | { type: "delayed", delayInSeconds: number }

//     | { type: "cron", cron: string }

//     | { type: "no-schedule" }

// }


```

TypeScript

```

import { scheduleSchema } from "agents";


// The schema is a discriminated union:

// {

//   description: string,

//   when:

//     | { type: "scheduled", date: string }       // ISO 8601 date string

//     | { type: "delayed", delayInSeconds: number }

//     | { type: "cron", cron: string }

//     | { type: "no-schedule" }

// }


```

Note

Dates are returned as ISO 8601 strings (not `Date` objects) for compatibility with both Zod v3 and v4 JSON schema generation.

## Scheduling vs Queue vs Workflows

| Feature            | Queue              | Scheduling        | Workflows           |
| ------------------ | ------------------ | ----------------- | ------------------- |
| **When**           | Immediately (FIFO) | Future time       | Future time         |
| **Execution**      | Sequential         | At scheduled time | Multi-step          |
| **Retries**        | Built-in           | Built-in          | Automatic           |
| **Persistence**    | SQLite             | SQLite            | Workflow engine     |
| **Recurring**      | No                 | Yes (cron)        | No (use scheduling) |
| **Complex logic**  | No                 | No                | Yes                 |
| **Human approval** | No                 | No                | Yes                 |

Use Queue when:

* You need background processing without blocking the response
* Tasks should run ASAP but do not need to block
* Order matters (FIFO)

Use Scheduling when:

* Tasks need to run at a specific time
* You need recurring jobs (cron)
* Delayed execution (debouncing, retries)

Use Workflows when:

* Multi-step processes with dependencies
* Automatic retries with backoff
* Human-in-the-loop approvals
* Long-running tasks (minutes to hours)

## API reference

### `schedule()`

TypeScript

```

async schedule<T>(

  when: Date | string | number,

  callback: keyof this,

  payload?: T,

  options?: { retry?: RetryOptions; idempotent?: boolean }

): Promise<Schedule<T>>


```

Schedule a task for future execution.

**Parameters:**

* `when` \- When to execute: `number` (seconds delay), `Date` (specific time), or `string` (cron expression)
* `callback` \- Name of the method to call
* `payload` \- Data to pass to the callback (must be JSON-serializable)
* `options.retry` \- Optional retry configuration. Refer to [Retries](https://developers.cloudflare.com/agents/runtime/execution/retries/) for details
* `options.idempotent` \- Deduplicate by callback + payload. Defaults to `true` for cron schedules, `false` for delayed and Date-based schedules

**Returns:** A `Schedule` object with the task details

**Idempotency:**

Cron schedules are idempotent by default — calling `schedule("0 * * * *", "tick")` multiple times with the same callback, cron expression, and payload returns the existing schedule instead of creating a duplicate. Set `idempotent: false` to override this.

For delayed and Date-based schedules, set `idempotent: true` to opt in to the same dedup behavior (matched on callback + payload). This is especially useful when calling `schedule()` in `onStart()` to avoid accumulating duplicate rows across Durable Object restarts:

* [  JavaScript ](#tab-panel-6165)
* [  TypeScript ](#tab-panel-6166)

JavaScript

```

class MyAgent extends Agent {

  async onStart() {

    // Without idempotent: true, this creates a new row on every DO restart

    await this.schedule(3600, "hourlyCleanup", {}, { idempotent: true });

  }

}


```

TypeScript

```

class MyAgent extends Agent {

  async onStart() {

    // Without idempotent: true, this creates a new row on every DO restart

    await this.schedule(3600, "hourlyCleanup", {}, { idempotent: true });

  }

}


```

Warning

Tasks that set a callback for a method that does not exist will throw an exception. Ensure that the method named in the `callback` argument exists on your `Agent` class.

### `scheduleEvery()`

TypeScript

```

async scheduleEvery<T>(

  intervalSeconds: number,

  callback: keyof this,

  payload?: T,

  options?: { retry?: RetryOptions }

): Promise<Schedule<T>>


```

Schedule a task to run repeatedly at a fixed interval.

**Parameters:**

* `intervalSeconds` \- Number of seconds between executions (must be greater than 0)
* `callback` \- Name of the method to call
* `payload` \- Data to pass to the callback (must be JSON-serializable)
* `options.retry` \- Optional retry configuration. Refer to [Retries](https://developers.cloudflare.com/agents/runtime/execution/retries/) for details.

**Returns:** A `Schedule` object with `type: "interval"`

**Behavior:**

* First execution occurs after `intervalSeconds` (not immediately)
* If callback is still running when next execution is due, it is skipped (overlap prevention)
* If callback throws an error, the interval continues
* Cancel with `cancelSchedule(id)` to stop the entire interval

### `getScheduleById()`

TypeScript

```

async getScheduleById(id: string): Promise<Schedule<unknown> | undefined>


```

Get a scheduled task by ID. Returns `undefined` if not found. This method works in both top-level agents and sub-agents.

### `listSchedules()`

TypeScript

```

async listSchedules(criteria?: {

  id?: string;

  type?: "scheduled" | "delayed" | "cron" | "interval";

  timeRange?: { start?: Date; end?: Date };

}): Promise<Schedule<unknown>[]>


```

Get scheduled tasks matching the criteria. This method works in both top-level agents and sub-agents.

### `getSchedule()`

TypeScript

```

getSchedule<T>(id: string): Schedule<T> | undefined


```

Deprecated. Get a scheduled task by ID synchronously. This method only works in top-level agents. Use `await this.getScheduleById(id)` instead.

### `getSchedules()`

TypeScript

```

getSchedules<T>(criteria?: {

  id?: string;

  type?: "scheduled" | "delayed" | "cron" | "interval";

  timeRange?: { start?: Date; end?: Date };

}): Schedule<T>[]


```

Deprecated. Get scheduled tasks matching the criteria synchronously. This method only works in top-level agents. Use `await this.listSchedules(criteria)` instead.

### `cancelSchedule()`

TypeScript

```

async cancelSchedule(id: string): Promise<boolean>


```

Cancel a scheduled task. Returns `true` if cancelled, `false` if not found.

### `keepAlive()`

TypeScript

```

async keepAlive(): Promise<() => void>


```

Prevent the Durable Object from being evicted due to inactivity by holding a 30-second alarm-backed heartbeat reference. Returns a disposer function that releases the heartbeat when called. The disposer is idempotent — calling it multiple times is safe.

Always call the disposer when the work is done — otherwise the heartbeat continues indefinitely.

* [  JavaScript ](#tab-panel-6175)
* [  TypeScript ](#tab-panel-6176)

JavaScript

```

const dispose = await this.keepAlive();

try {

  // Long-running work that must not be interrupted

  const result = await longRunningComputation();

  await sendResults(result);

} finally {

  dispose();

}


```

TypeScript

```

const dispose = await this.keepAlive();

try {

  // Long-running work that must not be interrupted

  const result = await longRunningComputation();

  await sendResults(result);

} finally {

  dispose();

}


```

### `keepAliveWhile()`

TypeScript

```

async keepAliveWhile<T>(fn: () => Promise<T>): Promise<T>


```

Run an async function while keeping the Durable Object alive. The heartbeat is automatically started before the function runs and stopped when it completes (whether it succeeds or throws). Returns the value returned by the function.

This is the recommended way to use `keepAlive` — it guarantees cleanup.

* [  JavaScript ](#tab-panel-6171)
* [  TypeScript ](#tab-panel-6172)

JavaScript

```

const result = await this.keepAliveWhile(async () => {

  const data = await longRunningComputation();

  return data;

});


```

TypeScript

```

const result = await this.keepAliveWhile(async () => {

  const data = await longRunningComputation();

  return data;

});


```

## Keeping the agent alive

Durable Objects are evicted after a period of inactivity (typically 70-140 seconds with no incoming requests, WebSocket messages, or alarms). During long-running operations — streaming LLM responses, waiting on external APIs, running multi-step computations — the agent can be evicted mid-flight.

`keepAlive()` prevents this by holding an in-memory heartbeat reference and using the Durable Object alarm system directly. The alarm firing itself resets the inactivity timer.

* The heartbeat does not conflict with your own schedules because the alarm system multiplexes through a single alarm slot.
* No schedule rows are created, and the heartbeat is invisible to `listSchedules()`.
* Multiple concurrent `keepAlive()` calls use a reference count, so one disposer does not release another caller's heartbeat.
* Inside sub-agents, `keepAlive()` delegates that heartbeat reference to the top-level parent because facets do not have independent alarm slots.

### Multiple concurrent callers

Each `keepAlive()` call returns an independent disposer:

* [  JavaScript ](#tab-panel-6177)
* [  TypeScript ](#tab-panel-6178)

JavaScript

```

const dispose1 = await this.keepAlive();

const dispose2 = await this.keepAlive();


// Both heartbeats are active

dispose1(); // Only cancels the first heartbeat

// Agent is still alive via dispose2's heartbeat


dispose2(); // Now the agent can go idle


```

TypeScript

```

const dispose1 = await this.keepAlive();

const dispose2 = await this.keepAlive();


// Both heartbeats are active

dispose1(); // Only cancels the first heartbeat

// Agent is still alive via dispose2's heartbeat


dispose2(); // Now the agent can go idle


```

### AIChatAgent

`AIChatAgent` automatically calls `keepAlive()` during streaming responses. You do not need to add it yourself when using `AIChatAgent` — every LLM stream is protected from idle eviction by default.

### When to use keepAlive

| Scenario                                    | Use keepAlive?                         |
| ------------------------------------------- | -------------------------------------- |
| Streaming LLM responses via AIChatAgent     | No — already built in                  |
| Long-running computation in a custom Agent  | Yes                                    |
| Waiting on a slow external API call         | Yes                                    |
| Multi-step tool execution                   | Yes                                    |
| Short request-response handlers             | No — not needed                        |
| Background work via scheduling or workflows | No — alarms already keep the DO active |

## Limits

* **Maximum tasks:** Limited by SQLite storage (each task is a row). Practical limit is tens of thousands per agent.
* **Task size:** Each task (including payload) can be up to 2MB.
* **Minimum delay:** 0 seconds (runs on next alarm tick)
* **Cron precision:** Minute-level (not seconds)
* **Interval precision:** Second-level
* **Cron jobs:** After execution, automatically rescheduled for the next occurrence
* **Interval jobs:** After execution, rescheduled for `now + intervalSeconds`; skipped if still running

## Next steps

[ Push notifications ](https://developers.cloudflare.com/agents/communication-channels/webhooks/push-notifications/) Send browser push notifications using scheduling and web-push. 

[ Queue tasks ](https://developers.cloudflare.com/agents/runtime/execution/queue-tasks/) Immediate background task processing. 

[ Run Workflows ](https://developers.cloudflare.com/agents/runtime/execution/run-workflows/) Durable multi-step background processing. 

[ Agents API ](https://developers.cloudflare.com/agents/runtime/agents-api/) Complete API reference for the Agents SDK. 

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/runtime/execution/schedule-tasks/#page","headline":"Schedule tasks · Cloudflare Agents docs","description":"Schedule delayed, date-based, cron, and interval tasks on Agents with persistent SQLite-backed execution.","url":"https://developers.cloudflare.com/agents/runtime/execution/schedule-tasks/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/runtime/","name":"Runtime"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/runtime/execution/","name":"Execution"}},{"@type":"ListItem","position":5,"item":{"@id":"/agents/runtime/execution/schedule-tasks/","name":"Schedule tasks"}}]}
```
