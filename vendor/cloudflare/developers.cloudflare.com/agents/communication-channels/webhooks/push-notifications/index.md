---
title: Push notifications
description: Send browser push notifications from a Cloudflare Agent, even when the user has closed the tab.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Push notifications

Send browser push notifications from your agent — even when the user has closed the tab. By combining the agent's persistent state (for storing push subscriptions), scheduling (for timed delivery), and the [Web Push API ↗](https://developer.mozilla.org/en-US/docs/Web/API/Push%5FAPI), you can reach users who are completely offline.

## How it works

```

Browser                              Agent (Durable Object)

───────                              ──────────────────────

1. Register service worker

2. Subscribe to push (VAPID key)

3. Send subscription to agent ──────► Store in this.state

4. Create reminder ─────────────────► this.schedule(delay, "sendReminder", payload)


   ... user closes tab ...


5.                                    Alarm fires → sendReminder()

                                      web-push sends encrypted payload

                                              │

6. Service worker receives push ◄─────────────┘

7. showNotification()


```

The agent stores push subscriptions durably in its state and uses `this.schedule()` to fire notifications at the right time. When the alarm triggers, the agent calls the push service endpoint using the [web-push ↗](https://www.npmjs.com/package/web-push) library. The browser's service worker receives the push event and displays a native notification.

## Prerequisites

### Generate VAPID keys

Web Push requires a VAPID (Voluntary Application Server Identification) key pair. Generate one:

Terminal window

```

npx web-push generate-vapid-keys


```

Store the keys in a `.env` file for local development:

```

VAPID_PUBLIC_KEY=BGxK...

VAPID_PRIVATE_KEY=abc1...

VAPID_SUBJECT=mailto:you@example.com


```

For production, use `wrangler secret put`:

Terminal window

```

wrangler secret put VAPID_PUBLIC_KEY

wrangler secret put VAPID_PRIVATE_KEY

wrangler secret put VAPID_SUBJECT


```

## Create the agent

The agent has three responsibilities: store push subscriptions, schedule reminders, and send notifications when alarms fire.

* [  JavaScript ](#tab-panel-5359)
* [  TypeScript ](#tab-panel-5360)

JavaScript

```

import { Agent, callable, routeAgentRequest } from "agents";

import webpush from "web-push";


export class ReminderAgent extends Agent {

  initialState = {

    subscriptions: [],

    reminders: [],

  };


  @callable()

  getVapidPublicKey() {

    return this.env.VAPID_PUBLIC_KEY;

  }


  @callable()

  async subscribe(subscription) {

    const exists = this.state.subscriptions.some(

      (s) => s.endpoint === subscription.endpoint,

    );

    if (!exists) {

      this.setState({

        ...this.state,

        subscriptions: [...this.state.subscriptions, subscription],

      });

    }

    return { ok: true };

  }


  @callable()

  async unsubscribe(endpoint) {

    this.setState({

      ...this.state,

      subscriptions: this.state.subscriptions.filter(

        (s) => s.endpoint !== endpoint,

      ),

    });

    return { ok: true };

  }


  @callable()

  async createReminder(message, delaySeconds) {

    const id = crypto.randomUUID();

    const scheduledAt = Date.now() + delaySeconds * 1000;

    const reminder = { id, message, scheduledAt, sent: false };


    this.setState({

      ...this.state,

      reminders: [...this.state.reminders, reminder],

    });


    await this.schedule(delaySeconds, "sendReminder", { id, message });

    return reminder;

  }


  async sendReminder(payload) {

    webpush.setVapidDetails(

      this.env.VAPID_SUBJECT,

      this.env.VAPID_PUBLIC_KEY,

      this.env.VAPID_PRIVATE_KEY,

    );


    const deadEndpoints = [];


    await Promise.all(

      this.state.subscriptions.map(async (sub) => {

        try {

          await webpush.sendNotification(

            sub,

            JSON.stringify({

              title: "Reminder",

              body: payload.message,

              tag: `reminder-${payload.id}`,

            }),

          );

        } catch (err) {

          const statusCode =

            err instanceof webpush.WebPushError ? err.statusCode : 0;

          if (statusCode === 404 || statusCode === 410) {

            deadEndpoints.push(sub.endpoint);

          }

        }

      }),

    );


    if (deadEndpoints.length > 0) {

      this.setState({

        ...this.state,

        subscriptions: this.state.subscriptions.filter(

          (s) => !deadEndpoints.includes(s.endpoint),

        ),

      });

    }


    this.setState({

      ...this.state,

      reminders: this.state.reminders.map((r) =>

        r.id === payload.id ? { ...r, sent: true } : r,

      ),

    });


    this.broadcast(

      JSON.stringify({

        type: "reminder_sent",

        id: payload.id,

        timestamp: Date.now(),

      }),

    );

  }

}


export default {

  async fetch(request, env) {

    return (

      (await routeAgentRequest(request, env)) ??

      new Response("Not found", { status: 404 })

    );

  },

};


```

TypeScript

```

import { Agent, callable, routeAgentRequest } from "agents";

import webpush from "web-push";


type Subscription = {

  endpoint: string;

  expirationTime: number | null;

  keys: {

    p256dh: string;

    auth: string;

  };

};


type Reminder = {

  id: string;

  message: string;

  scheduledAt: number;

  sent: boolean;

};


type ReminderAgentState = {

  subscriptions: Subscription[];

  reminders: Reminder[];

};


export class ReminderAgent extends Agent<Env, ReminderAgentState> {

  initialState: ReminderAgentState = {

    subscriptions: [],

    reminders: [],

  };


  @callable()

  getVapidPublicKey(): string {

    return this.env.VAPID_PUBLIC_KEY;

  }


  @callable()

  async subscribe(subscription: Subscription): Promise<{ ok: boolean }> {

    const exists = this.state.subscriptions.some(

      (s) => s.endpoint === subscription.endpoint,

    );

    if (!exists) {

      this.setState({

        ...this.state,

        subscriptions: [...this.state.subscriptions, subscription],

      });

    }

    return { ok: true };

  }


  @callable()

  async unsubscribe(endpoint: string): Promise<{ ok: boolean }> {

    this.setState({

      ...this.state,

      subscriptions: this.state.subscriptions.filter(

        (s) => s.endpoint !== endpoint,

      ),

    });

    return { ok: true };

  }


  @callable()

  async createReminder(

    message: string,

    delaySeconds: number,

  ): Promise<Reminder> {

    const id = crypto.randomUUID();

    const scheduledAt = Date.now() + delaySeconds * 1000;

    const reminder: Reminder = { id, message, scheduledAt, sent: false };


    this.setState({

      ...this.state,

      reminders: [...this.state.reminders, reminder],

    });


    await this.schedule(delaySeconds, "sendReminder", { id, message });

    return reminder;

  }


  async sendReminder(payload: { id: string; message: string }) {

    webpush.setVapidDetails(

      this.env.VAPID_SUBJECT,

      this.env.VAPID_PUBLIC_KEY,

      this.env.VAPID_PRIVATE_KEY,

    );


    const deadEndpoints: string[] = [];


    await Promise.all(

      this.state.subscriptions.map(async (sub) => {

        try {

          await webpush.sendNotification(

            sub,

            JSON.stringify({

              title: "Reminder",

              body: payload.message,

              tag: `reminder-${payload.id}`,

            }),

          );

        } catch (err: unknown) {

          const statusCode =

            err instanceof webpush.WebPushError ? err.statusCode : 0;

          if (statusCode === 404 || statusCode === 410) {

            deadEndpoints.push(sub.endpoint);

          }

        }

      }),

    );


    if (deadEndpoints.length > 0) {

      this.setState({

        ...this.state,

        subscriptions: this.state.subscriptions.filter(

          (s) => !deadEndpoints.includes(s.endpoint),

        ),

      });

    }


    this.setState({

      ...this.state,

      reminders: this.state.reminders.map((r) =>

        r.id === payload.id ? { ...r, sent: true } : r,

      ),

    });


    this.broadcast(

      JSON.stringify({

        type: "reminder_sent",

        id: payload.id,

        timestamp: Date.now(),

      }),

    );

  }

}


export default {

  async fetch(request: Request, env: Env) {

    return (

      (await routeAgentRequest(request, env)) ??

      new Response("Not found", { status: 404 })

    );

  },

} satisfies ExportedHandler<Env>;


```

The `sendReminder` callback handles three things: delivering the push notification via the `web-push` library, cleaning up dead subscriptions (the push service returns 404 or 410 when a subscription is no longer valid), and broadcasting to any connected clients so the UI updates in real time.

## Set up the service worker

The service worker runs in the browser and receives push events even when no tabs are open. Place this file at `public/sw.js` so it is served from the root of your domain:

JavaScript

```

self.addEventListener("push", (event) => {

  if (!event.data) return;


  const data = event.data.json();


  event.waitUntil(

    self.registration.showNotification(data.title || "Notification", {

      body: data.body || "",

      icon: data.icon || "/favicon.ico",

      tag: data.tag,

      data: data.data,

    }),

  );

});


self.addEventListener("notificationclick", (event) => {

  event.notification.close();


  event.waitUntil(

    self.clients.matchAll({ type: "window" }).then((windowClients) => {

      for (const client of windowClients) {

        if (

          client.url.includes(self.location.origin) &&

          "focus" in client

        ) {

          return client.focus();

        }

      }

      return self.clients.openWindow("/");

    }),

  );

});


```

The `push` event handler parses the JSON payload and displays a native notification. The `notificationclick` handler focuses an existing tab or opens a new one when the user taps the notification.

## Build the client

The client needs to: register the service worker, request notification permission, subscribe to push using the VAPID public key, and send the subscription to the agent.

### Register the service worker

* [  JavaScript ](#tab-panel-5353)
* [  TypeScript ](#tab-panel-5354)

JavaScript

```

useEffect(() => {

  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {

    return;

  }

  navigator.serviceWorker.register("/sw.js");

}, []);


```

TypeScript

```

useEffect(() => {

  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {

    return;

  }

  navigator.serviceWorker.register("/sw.js");

}, []);


```

### Subscribe to push

Fetch the VAPID public key from the agent, then subscribe through the Push API:

* [  JavaScript ](#tab-panel-5357)
* [  TypeScript ](#tab-panel-5358)

JavaScript

```

function base64urlToUint8Array(base64url) {

  const padded = base64url + "=".repeat((4 - (base64url.length % 4)) % 4);

  const binary = atob(padded.replace(/-/g, "+").replace(/_/g, "/"));

  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);

  return bytes;

}


async function subscribeToPush(agent) {

  const permission = await Notification.requestPermission();

  if (permission !== "granted") return;


  const vapidPublicKey = await agent.call("getVapidPublicKey");

  const reg = await navigator.serviceWorker.ready;

  const subscription = await reg.pushManager.subscribe({

    userVisibleOnly: true,

    applicationServerKey: base64urlToUint8Array(vapidPublicKey).buffer,

  });


  const subJson = subscription.toJSON();

  await agent.call("subscribe", [

    {

      endpoint: subJson.endpoint,

      expirationTime: subJson.expirationTime ?? null,

      keys: subJson.keys,

    },

  ]);

}


```

TypeScript

```

function base64urlToUint8Array(base64url: string): Uint8Array {

  const padded = base64url + "=".repeat((4 - (base64url.length % 4)) % 4);

  const binary = atob(padded.replace(/-/g, "+").replace(/_/g, "/"));

  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);

  return bytes;

}


async function subscribeToPush(

  agent: ReturnType<typeof useAgent>,

) {

  const permission = await Notification.requestPermission();

  if (permission !== "granted") return;


  const vapidPublicKey = await agent.call("getVapidPublicKey");

  const reg = await navigator.serviceWorker.ready;

  const subscription = await reg.pushManager.subscribe({

    userVisibleOnly: true,

    applicationServerKey: base64urlToUint8Array(vapidPublicKey).buffer,

  });


  const subJson = subscription.toJSON();

  await agent.call("subscribe", [

    {

      endpoint: subJson.endpoint,

      expirationTime: subJson.expirationTime ?? null,

      keys: subJson.keys,

    },

  ]);

}


```

### Create reminders

With the subscription stored, creating a reminder is a single RPC call. The agent handles scheduling and delivery:

* [  JavaScript ](#tab-panel-5351)
* [  TypeScript ](#tab-panel-5352)

JavaScript

```

await agent.call("createReminder", ["Check the oven", 300]);


```

TypeScript

```

await agent.call("createReminder", ["Check the oven", 300]);


```

The agent schedules an alarm for 300 seconds (5 minutes). When it fires, the push notification arrives — even if the user closed the tab minutes ago.

## Configuration

### wrangler.jsonc

JSONC

```

{

  "name": "push-notifications",

  "compatibility_date": "2026-01-28",

  "compatibility_flags": ["nodejs_compat"],

  "main": "src/server.ts",

  "durable_objects": {

    "bindings": [

      { "name": "ReminderAgent", "class_name": "ReminderAgent" },

    ],

  },

  "migrations": [{ "tag": "v1", "new_sqlite_classes": ["ReminderAgent"] }],

  "assets": {

    "not_found_handling": "single-page-application",

  },

}


```

The `nodejs_compat` compatibility flag is required for the `web-push` library.

### Dependencies

Terminal window

```

npm install agents web-push


```

## Production considerations

### Subscription expiry

Push subscriptions can expire or be revoked by the user. Always handle 404 and 410 responses from the push service by removing the dead subscription from state, as shown in the `sendReminder` example above.

### Per-user vs shared agents

For most applications, use one agent per user (using the user ID as the agent name). This isolates each user's subscriptions and reminders. For broadcast-style notifications (same message to many users), a shared agent can store all subscriptions, but be aware of the state size as the subscription list grows.

### Combining push with WebSocket broadcast

Use `this.broadcast()` for clients that are currently connected (instant, no push service roundtrip) and Web Push for clients that are offline. The `sendReminder` example above does both — connected clients get a real-time WebSocket message, and offline clients get a push notification.

### Multiple devices

A single user may subscribe from multiple browsers or devices. The agent stores each subscription separately, and `sendReminder` iterates over all of them. Each device receives its own push notification.

### Retry on failure

If the push service returns a 5xx error (temporary failure), you can retry using `this.schedule()` with a short delay:

* [  JavaScript ](#tab-panel-5355)
* [  TypeScript ](#tab-panel-5356)

JavaScript

```

try {

  await webpush.sendNotification(sub, payload);

} catch (err) {

  const statusCode = err instanceof webpush.WebPushError ? err.statusCode : 0;

  if (statusCode >= 500) {

    await this.schedule(60, "retrySendNotification", {

      endpoint: sub.endpoint,

      payload,

    });

  }

}


```

TypeScript

```

try {

  await webpush.sendNotification(sub, payload);

} catch (err: unknown) {

  const statusCode =

    err instanceof webpush.WebPushError ? err.statusCode : 0;

  if (statusCode >= 500) {

    await this.schedule(60, "retrySendNotification", {

      endpoint: sub.endpoint,

      payload,

    });

  }

}


```

## Next steps

[ Schedule tasks ](https://developers.cloudflare.com/agents/runtime/execution/schedule-tasks/) Learn about scheduling and keepAlive for long-running operations. 

[ Store and sync state ](https://developers.cloudflare.com/agents/runtime/lifecycle/state/) Manage agent state for storing subscriptions. 

[ Callable methods ](https://developers.cloudflare.com/agents/runtime/lifecycle/callable-methods/) Expose agent methods as RPC endpoints. 

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/communication-channels/webhooks/push-notifications/#page","headline":"Push notifications · Cloudflare Agents docs","description":"Send browser push notifications from a Cloudflare Agent, even when the user has closed the tab.","url":"https://developers.cloudflare.com/agents/communication-channels/webhooks/push-notifications/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/communication-channels/","name":"Communication channels"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/communication-channels/webhooks/","name":"Webhooks"}},{"@type":"ListItem","position":5,"item":{"@id":"/agents/communication-channels/webhooks/push-notifications/","name":"Push notifications"}}]}
```
