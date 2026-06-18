# Sync data with webhooks

## What you'll build

In this guide, we will walk you through what you will need to set up webhooks:

- Create your endpoint to receive webhook events
- Register your endpoint with WorkOS
- Process the events received from WorkOS
- Test your endpoint

***

## (1) Set up your webhook endpoint

Create a public endpoint that WorkOS can send events to. This endpoint should use HTTPS and should accept POST requests with the `workos-signature` header.

> WorkOS sends the header as `WorkOS-Signature`, but many web servers normalize HTTP request headers to their lowercase variants.

***

## (2) Register your endpoint

Set and save the webhook URL in the [WorkOS Dashboard](https://dashboard.workos.com/), so WorkOS knows where to deliver the events. Your webhook endpoints should only be configured to receive the ones required by your integration. Receiving all event types can put undue strain on your servers and is not recommended.

![WorkOS Dashboard Webhooks UI](https://images.workoscdn.com/images/a6bebfe6-d5db-475c-bf34-a5bdf35433e0.png?auto=format\&fit=clip\&q=90)

***

## (3) Process the events

In order to avoid unnecessary retry requests hitting your webhook handler, we recommend using two concurrent processes for handling events: one for receiving the event, and the other for processing it.

### Respond with HTTP 200 OK

On receiving an event, you should respond with an `HTTP 200 OK` to signal to WorkOS that the event was successfully delivered. Otherwise, WorkOS will consider the event delivery a failure and retry up to 6 times, with exponential backoff over 3 days. You do not need to signal to WorkOS whether or not the event was processed successfully.

### (A) Validate the requests using the SDK

Before processing the request payload, verify the request was sent by WorkOS and not an unknown party.

WorkOS includes a unique signature in each webhook request that it sends, allowing you to verify the authenticity of the request. In order to verify this signature, you must obtain the secret that is generated for you when you set up your webhook endpoint in the WorkOS dashboard. Ensure that this secret is stored securely on your webhook endpoint server as an environment variable.

The SDKs provide a method to validate the timestamp and signature of a webhook. Examples using these methods are included below. The parameters are the payload (raw request body), the request header, and the webhook secret.

#### Webhook validation

There is an optional parameter, tolerance, that sets the time validation for the webhook in seconds. The SDK methods have default values for tolerance, usually 3–5 minutes.

### (B) Validate the requests manually

If implementing webhook validation yourself, you'll need to use the following steps:

First, extract the timestamp and signature from the header. There are two values to parse from the `WorkOS-Signature` header, delimited by a `,` character.

| Key                | Value                                                                                           |
| ------------------ | ----------------------------------------------------------------------------------------------- |
| `issued_timestamp` | The number of milliseconds since the epoch time at which the event was issued, prefixed by `t=` |
| `signature_hash`   | The HMAC SHA256 hashed signature for the request, prefixed by `v1=`                             |

To avoid replay attacks, we suggest validating that the `issued_timestamp` does not differ too much from the current time.

Next, construct the expected signature. The expected signature is computed from the concatenation of:

1. `issued_timestamp`
2. The `.` character
3. The request's body as a utf-8 decoded string

Hash the string using HMAC SHA256, using the webhook secret as the key. The expected signature will be the hex digest of the hash. Finally, compare signatures to make sure the webhook request is valid.

Once you've determined the event request is validly signed, it's safe to use the event payload in your application's business logic.

### Create an IP allowlist

WorkOS sends webhooks from a fixed set of IP addresses. It's recommended to restrict access to your webhook endpoint to only these IP addresses:

```plain title="WorkOS IP addresses"
3.217.146.166
23.21.184.92
34.204.154.149
44.213.245.178
44.215.236.82
50.16.203.9
52.1.251.34
52.21.49.187
174.129.36.47
```

***

## (4) Test your endpoint

From the dashboard, you can send test webhook events after configuring an endpoint. Go to the webhook endpoint detail page and click the **Send test event** button. The types of events that you have configured for your endpoint are available for you to send sample payloads.

![A screenshot showing how to send a test webhook in the WorkOS dashboard.](https://images.workoscdn.com/images/bda8fdc7-becb-494e-a9b6-f8295e5998a4.png?auto=format\&fit=clip\&q=90)

If you would like to test against your local development environment, we recommend using a tool like [ngrok](https://ngrok.com) to create a secure tunnel to your local machine, and sending test webhooks to the public endpoint generated with ngrok. See our [blog post](https://workos.com/blog/test-workos-webhooks-locally-ngrok) to get more details on how you may want to test webhooks locally with ngrok.

***

## Best practices

### Respond to events immediately

To avoid webhook requests potentially stressing your system, WorkOS strongly recommends that you respond to a webhook request with a 200 OK response as quickly as possible once received.

If you process the event before responding, your system may not be able to handle a spike of requests. This may cause requests to timeout and result in missing important updates.

A common pattern is to store the request payload on a message queue, respond with a 200 OK response, and use a background worker to process the messages in the queue.

### Recover from failed events

If your endpoint fails to respond to a webhook request with a `2xx` response, WorkOS will automatically retry the event with exponential back-off for up to 3 days in production environments. If for some reason your endpoint is still unable to respond successfully to events during that period, the event will be considered failed, and we will no longer retry sending it. You can reconcile your data using our [Directory Sync endpoints](https://workos.com/docs/reference/directory-sync) to update your data.

> In staging environments, WorkOS only retries failed webhooks for several minutes before giving up. You can, however, manually retry webhooks using the WorkOS Dashboard for these environments.

### Handle out-of-sequence events

WorkOS does not guarantee that events are delivered in the same sequence that they are generated. For example, when syncing a directory you may receive:

- `dsync.group.created`
- `dsync.user.created`
- `dsync.group.user_added`

Your endpoint should handle cases when these events are delivered out of order. Each event includes the full payload of the objects involved, so you can perform an upsert using the payload data.

It is also possible that event data can be stale due to a retry of an older event being delivered after a newer event for the same object. Therefore, we recommend checking the timestamp of the incoming webhook data against the timestamp of the data in your system to ensure you do not overwrite your data with stale data. Each object in the payload includes a `created_at` field and an `updated_at` field.

### Ignore duplicate events

It is possible to receive the same event more than once. WorkOS recommends that you handle webhook events using idempotent operations. One way of doing this is logging the ID of webhook events that you have processed and ignoring subsequent requests with the same ID.

### Obfuscate your endpoint URL

A small security measure you can incorporate is to make your webhook endpoint difficult to guess. Including a token comprised of series of random numbers and letters to your endpoint URL can prevent malicious actors from easily guessing your endpoint. For example: `https://api.example.com/webhooks/n0dbga5x…` is much more difficult to guess than `https://api.example.com/webhooks`
