---
title: Alarms
description: Schedule future wake-ups for Durable Objects using the Alarms API with guaranteed at-least-once execution.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/durable-objects/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Alarms

## Background

Durable Objects alarms allow you to schedule the Durable Object to be woken up at a time in the future. When the alarm's scheduled time comes, the `alarm()` handler method will be called. Alarms are modified using the Storage API, and alarm operations follow the same rules as other storage operations.

Notably:

* Each Durable Object is able to schedule a single alarm at a time by calling `setAlarm()`.
* Alarms have guaranteed at-least-once execution and are retried automatically when the `alarm()` handler throws.
* Retries are performed using exponential backoff starting at a 2 second delay from the first failure with up to 6 retries allowed.

How are alarms different from Cron Triggers?

Alarms are more fine grained than [Cron Triggers](https://developers.cloudflare.com/workers/configuration/cron-triggers/). A Worker can have up to three Cron Triggers configured at once, but it can have an unlimited amount of Durable Objects, each of which can have an alarm set.

Alarms are directly scheduled from within your Durable Object. Cron Triggers, on the other hand, are not programmatic. [Cron Triggers](https://developers.cloudflare.com/workers/configuration/cron-triggers/) execute based on their schedules, which have to be configured through the Cloudflare dashboard or API.

Alarms can be used to build distributed primitives, like queues or batching of work atop Durable Objects. Alarms also provide a mechanism to guarantee that operations within a Durable Object will complete without relying on incoming requests to keep the Durable Object alive. For a complete example, refer to [Use the Alarms API](https://developers.cloudflare.com/durable-objects/examples/alarms-api/).

## Scheduling multiple events with a single alarm

Although each Durable Object can only have one alarm set at a time, you can manage many scheduled and recurring events by storing your event schedule in storage and having the `alarm()` handler process due events, then reschedule itself for the next one.

JavaScript

```

import { DurableObject } from "cloudflare:workers";


export class AgentServer extends DurableObject {

  // Schedule a one-time or recurring event

  async scheduleEvent(id, runAt, repeatMs = null) {

    await this.ctx.storage.put(`event:${id}`, { id, runAt, repeatMs });

    const currentAlarm = await this.ctx.storage.getAlarm();

    if (!currentAlarm || runAt < currentAlarm) {

      await this.ctx.storage.setAlarm(runAt);

    }

  }


  async alarm() {

    const now = Date.now();

    const events = await this.ctx.storage.list({ prefix: "event:" });

    let nextAlarm = null;


    for (const [key, event] of events) {

      if (event.runAt <= now) {

        await this.processEvent(event);

        if (event.repeatMs) {

          event.runAt = now + event.repeatMs;

          await this.ctx.storage.put(key, event);

        } else {

          await this.ctx.storage.delete(key);

        }

      }

      // Track the next event time

      if (event.runAt > now && (!nextAlarm || event.runAt < nextAlarm)) {

        nextAlarm = event.runAt;

      }

    }


    if (nextAlarm) await this.ctx.storage.setAlarm(nextAlarm);

  }


  async processEvent(event) {

    // Your event handling logic here

  }

}


```

## Storage methods

### `getAlarm`

* `getAlarm()`: ` number | null `  
   * If there is an alarm set, then return the currently set alarm time as the number of milliseconds elapsed since the UNIX epoch. Otherwise, return `null`.  
   * If `getAlarm` is called while an [alarm](https://developers.cloudflare.com/durable-objects/api/alarms/#alarm) is already running, it returns `null` unless `setAlarm` has also been called since the alarm handler started running.

### `setAlarm`

* ``  setAlarm(scheduledTimeMs ` number `)  ``: ` void `  
   * Set the time for the alarm to run. Specify the time as the number of milliseconds elapsed since the UNIX epoch.  
   * If you call `setAlarm` when there is already one scheduled, it will override the existing alarm.

Calling `setAlarm` inside the constructor

If you wish to call `setAlarm` inside the constructor of a Durable Object, ensure that you are first checking whether an alarm has already been set.

This is due to the fact that, if the Durable Object wakes up after being inactive, the constructor is invoked before the [alarm handler](https://developers.cloudflare.com/durable-objects/api/alarms/#alarm). Therefore, if the constructor calls `setAlarm`, it could interfere with the next alarm which has already been set.

### `deleteAlarm`

* `deleteAlarm()`: ` void `  
   * Unset the alarm if there is a currently set alarm.  
   * Calling `deleteAlarm()` inside the `alarm()` handler may prevent retries on a best-effort basis, but is not guaranteed.

## Handler methods

### `alarm`

* `` alarm(alarmInfo ` Object `) ``: ` void `  
   * Called by the system when a scheduled alarm time is reached.  
   * The optional parameter `alarmInfo` object has two properties:  
         * `retryCount` ` number `: The number of times this alarm event has been retried.  
         * `isRetry` ` boolean `: A boolean value to indicate if the alarm has been retried. This value is `true` if this alarm event is a retry.  
   * Only one instance of `alarm()` will ever run at a given time per Durable Object instance.  
   * The `alarm()` handler has guaranteed at-least-once execution and will be retried upon failure using exponential backoff, starting at 2 second delays for up to 6 retries. This only applies to the most recent `setAlarm()` call. Retries will be performed if the method fails with an uncaught exception.  
   * This method can be `async`.

Catching exceptions in alarm handlers

Because alarms are only retried up to 6 times on error, it's recommended to catch any exceptions inside your `alarm()` handler and schedule a new alarm before returning if you want to make sure your alarm handler will be retried indefinitely. Otherwise, a sufficiently long outage in a downstream service that you depend on or a bug in your code that goes unfixed for hours can exhaust the limited number of retries, causing the alarm to not be re-run in the future until the next time you call `setAlarm`.

## Example

This example shows how to both set alarms with the `setAlarm(timestamp)` method and handle alarms with the `alarm()` handler within your Durable Object.

* The `alarm()` handler will be called once every time an alarm fires.
* If an unexpected error terminates the Durable Object, the `alarm()` handler may be re-instantiated on another machine.
* Following a short delay, the `alarm()` handler will run from the beginning on the other machine.

* [  JavaScript ](#tab-panel-8167)
* [  Python ](#tab-panel-8168)

JavaScript

```

import { DurableObject } from "cloudflare:workers";


export default {

  async fetch(request, env) {

    return await env.ALARM_EXAMPLE.getByName("foo").fetch(request);

  },

};


const SECONDS = 1000;


export class AlarmExample extends DurableObject {

  constructor(ctx, env) {

    super(ctx, env);

    this.storage = ctx.storage;

  }

  async fetch(request) {

    // If there is no alarm currently set, set one for 10 seconds from now

    let currentAlarm = await this.storage.getAlarm();

    if (currentAlarm == null) {

      this.storage.setAlarm(Date.now() + 10 * SECONDS);

    }

  }

  async alarm() {

    // The alarm handler will be invoked whenever an alarm fires.

    // You can use this to do work, read from the Storage API, make HTTP calls

    // and set future alarms to run using this.storage.setAlarm() from within this handler.

  }

}


```

Python

```

import time


from workers import DurableObject, WorkerEntrypoint


class Default(WorkerEntrypoint):

    async def fetch(self, request):

        return await self.env.ALARM_EXAMPLE.getByName("foo").fetch(request)


SECONDS = 1000


class AlarmExample(DurableObject):

    def __init__(self, ctx, env):

        super().__init__(ctx, env)

        self.storage = ctx.storage


    async def fetch(self, request):

        # If there is no alarm currently set, set one for 10 seconds from now

        current_alarm = await self.storage.getAlarm()

        if current_alarm is None:

            self.storage.setAlarm(int(time.time() * 1000) + 10 * SECONDS)


    async def alarm(self):

        # The alarm handler will be invoked whenever an alarm fires.

        # You can use this to do work, read from the Storage API, make HTTP calls

        # and set future alarms to run using self.storage.setAlarm() from within this handler.

        pass


```

The following example shows how to use the `alarmInfo` property to identify if the alarm event has been attempted before.

* [  JavaScript ](#tab-panel-8169)
* [  Python ](#tab-panel-8170)

JavaScript

```

class MyDurableObject extends DurableObject {

  async alarm(alarmInfo) {

    if (alarmInfo?.retryCount != 0) {

      console.log(

        "This alarm event has been attempted ${alarmInfo?.retryCount} times before.",

      );

    }

  }

}


```

Python

```

class MyDurableObject(DurableObject):

    async def alarm(self, alarm_info):

        if alarm_info and alarm_info.get('retryCount', 0) != 0:

            print(f"This alarm event has been attempted {alarm_info.get('retryCount')} times before.")


```

## Related resources

* Understand how to [use the Alarms API](https://developers.cloudflare.com/durable-objects/examples/alarms-api/) in an end-to-end example.
* Read the [Durable Objects alarms announcement blog post ↗](https://blog.cloudflare.com/durable-objects-alarms/).
* Review the [Storage API](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/) documentation for Durable Objects.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/durable-objects/api/alarms/#page","headline":"Alarms · Cloudflare Durable Objects docs","description":"Schedule future wake-ups for Durable Objects using the Alarms API with guaranteed at-least-once execution.","url":"https://developers.cloudflare.com/durable-objects/api/alarms/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/durable-objects/","name":"Durable Objects"}},{"@type":"ListItem","position":3,"item":{"@id":"/durable-objects/api/","name":"Workers Binding API"}},{"@type":"ListItem","position":4,"item":{"@id":"/durable-objects/api/alarms/","name":"Alarms"}}]}
```
