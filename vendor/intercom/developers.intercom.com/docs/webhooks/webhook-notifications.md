# Webhook Notifications

A Webhook notification is the object delivered when an event is triggered, and notifications have data payloads that contain references to the Intercom objects associated with the event.

Every webhook payload is slightly different, but they do share a number of common fields which will help you identify the type of notification you have received, when the event took place and more. You can find a more detailed description [here](https://developers.intercom.com/intercom-api-reference/reference/webhook-models#webhook-notification-object)

There may be instances when we pause, suspend or delay delivery of notifications, so let's take a look at how we handle these scenarios.

## Paused subscription notifications

If your endpoint URL responds with more than 1000 consecutive [HTTP error codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#client_error_responses) in a 15-minute window, we pause your Webhook topic notifications for 15 minutes after which we start sending as normal again.

## Suspended subscriptions

If your endpoint URL responds with [HTTP error codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#client_error_responses) for more than seven days, we suspend your Webhook subscription, and you will stop receiving any further notifications.

If we suspend your subscription, we display an error banner on the Webhooks page under the Configure menu of the relevant App in your [Developer Hub](https://app.intercom.com/a/apps/_/developer-hub).

![Webhooks suspended banner](/assets/webhooks-suspended-banner.289af6f01722dc9eefb9f264667fe11e09fd123ede4d7bd7e2522ed0fd589e0e.71a4f21c.png)

After resolving any issues with your server, you can resume suspended subscriptions by pressing **Set live** from the top right of the page.

We only suspend Webhook subscriptions for Private apps. Webhook subscriptions used in Public apps are never suspended.

## Rate limiting

We will prioritise webhook topic notifications up to the following limits per minute and then rate limit all further notifications with a lower priority.

| Region | Rate limit |
|  --- | --- |
| US | 150,000 events per minute |
| EU | 20,000 events per minute |
| AU | 20,000 events per minute |


## Slow topic notifications

We prioritise Webhook topic notifications for endpoint URLs that successfully respond within 500ms. If response times exceed 500ms, we deliver topic notifications with a lower priority.

## Throttling

If we receive an [HTTP 429 (Too Many Requests)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429) response from your endpoint URL, we throttle further notifications with a delay that starts at 1 minute and extends to 2 hours. We drop any throttled notifications if we do not receive a successful response within 2 hours.

## Delivery order

When you receive a notification, you should check the timestamp in the `created_at` field to confirm when the action took place. This will allow you to determine the right action to take in your App, as we do not offer any guarantee on the order of Webhook topic notifications.

## Duplicate notifications

Because we want to be sure your app has received a notification, we will resend it if we do not receive a [HTTP 200 (OK)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200) response from your endpoint URL within **5000ms**. This means you may receive duplicate notifications if your response takes longer than 5000ms to reach our servers.

To avoid this, we recommend responding with [HTTP 200 (OK)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200) immediately upon receipt and before you trigger any long-running tasks.

## Queued notifications

If [Intercom's System Status](https://www.intercomstatus.com/) interrupts notification delivery, we will store them and resume sending once we restore the service. We will always prioritise the most recent notifications and process older delayed notifications with a lower priority.

## Handling high volumes

Events in Intercom with the potential for generating a high volume of webhook topic notifications are related to the `content_stat` and `contact` objects.

For example, the volume of `content_stat` notifications is typically five times the size of the audience receiving the outbound message content if this is being sent via multiple channels, like chat, email, and mobile push.

To handle this, you will want to configure your endpoint URL server to handle spikes in velocity and volume to minimize paused and suspended webhook subscriptions or rate-limited and throttled webhook topic notifications.

# Ensuring delivery behind a firewall

If the endpoint you configure is behind a firewall, you must add the IP addresses Intercom sends Webhook Notifications from to your allow list. If you do not, you will not receive any notifications.

The IP addresses Intercom sends Webhook Notifications from are:

**USA**
`34.231.68.152`
`34.197.76.213`
`35.171.78.91`
`35.169.138.21`
`52.70.27.159`
`52.44.63.161`

**Europe**
`54.217.125.63`
`54.246.173.113`
`54.216.9.3`

**Australia**
`52.63.36.185`
`3.104.68.152`
`52.64.2.165`