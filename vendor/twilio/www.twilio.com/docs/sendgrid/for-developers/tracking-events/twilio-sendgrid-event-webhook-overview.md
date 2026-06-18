# Twilio SendGrid Event Webhook Overview

Sending email is just the first part of building a complete email program. You'll also want to monitor your mail to ensure that you're reaching and engaging your audience. Are your messages landing in customers' inboxes? Are they [bouncing](/docs/sendgrid/ui/sending-email/bounces)? Are customers opening your emails and clicking the links inside them?

Email is a data-rich channel, and implementing the Event Webhook will allow you to consume those data in nearly real time. This means you can actively monitor and participate in the health of your email program throughout the send cycle.

## What are webhooks

This section provides a brief summary of webhooks with links to additional resources for those new to the concept. This page otherwise assumes you are familiar with HTTP, web servers, and the webhook design pattern. If you want to begin setting up the Event Webhook now, see [**Getting Started with the Event Webhook**](/docs/sendgrid/for-developers/tracking-events/getting-started-event-webhook).

SendGrid can provide you with a lot of data about the events that occur related to your mail sends such as when messages are delivered, opened, or clicked. To understand the webhook design pattern, you can think about how you might get to that event data.

You could request updates on a schedule. For example, SendGrid could provide a `GET` endpoint where you would regularly ask for new event data. However, this would be burdensome, and you would only receive data when you requested it. Additionally, you would have to make requests to check for new data even when no new data were available. This idea—a design in which you regularly check for new data—is called polling.

It's much more convenient to instead receive event data whenever SendGrid has new data to send. Rather than asking for event data, you provide SendGrid with a destination where SendGrid can deliver data as it's generated. This idea—a design in which you receive requests as events occur rather than making regular requests to check for new events—is the concept behind webhooks.

With the SendGrid Event Webhook, you provide a URL that accepts SendGrid's `POST` requests. When event data about your mail sends is generated, for example, when someone opens one of your messages, SendGrid will make a `POST` request to your URL with data about that event.

If you still find the webhook pattern confusing, the following resources may be helpful.

* freeCodeCamp: "[Webhooks for Beginners](https://www.youtube.com/watch?v=41NOoEz3Tzc)"
* SendGrid Blog: "[What's a Webhook?](https://sendgrid.com/blog/whats-webhook/)"
* SendGrid Blog: "[Webhook vs API: What's the Difference](https://sendgrid.com/blog/webhook-vs-api-whats-difference/)"

### Terminology

When the terms "Webhook" and "Event Webhook" are used on this page, they refer to the SendGrid Event Webhook, which is the SendGrid operation that makes `POST` requests to your URL. The term "webhook" is used to refer to the general design pattern discussed above.

The URL you use to configure your SendGrid Event Webhook is referred to as the "Post URL," "endpoint," or "destination." The Event Webhook sends data to your Post URL. You may have multiple endpoints depending on your [SendGrid plan](https://sendgrid.com/pricing). Having multiple endpoints means you can deliver different types of event data to different destinations or send the same types of event data to multiple locations without forwarding it.

## The SendGrid Event Webhook

The SendGrid Event Webhook sends email event data as SendGrid processes it. This means you can receive data in nearly real-time. SendGrid offers other ways to monitor the health of your email program, including the [Email Activity Feed](/docs/sendgrid/ui/analytics-and-reporting/email-activity-feed) and [Deliverability Insights](/docs/sendgrid/ui/analytics-and-reporting/deliverability-insights). However, the nearly real-time nature of the Event Webhook makes it ideal for integrating with any logging or monitoring systems.

Because the Event Webhook delivers data to your systems, it is also well-suited to backing up and storing event data within your infrastructure to meet your own data access and retention needs.

> \[!NOTE]
>
> The [Email Activity Feed](/docs/sendgrid/ui/analytics-and-reporting/email-activity-feed/) can hold up to 30 days worth of events. After that time passes, the email event data is gone. You should set up the Event Webhook if you want to keep track of more event data than SendGrid stores for you with the Email Activity Feed.

### Event types

You can think about the types of events provided by the Event Webhook in two categories: deliverability events and engagement events.

* Deliverability events such as "delivered," "bounced," and "processed" help you understand if your email is being delivered to your customers.
* Engagement events such as "open," and "click" help you understand if customers are reading and interacting with your emails after they arrive.

Both types of events are important and should be monitored to understand the overall health of your email program. For more information about each event type, see the [**Event Webhook Reference**](/docs/sendgrid/for-developers/tracking-events/event).

## Add an Event Webhook

To create a webhook, see [**Getting Started with the Event Webhook**](/docs/sendgrid/for-developers/tracking-events/getting-started-event-webhook). The Getting Started page will guide you through creating and configuring an Event Webhook. When adding or modifying an Event Webhook, you will work with the following settings.

* **Enabled**: A toggle to determine if the Webhook is active.
* **Friendly Name**: An optional name to help you differentiate among your Webhooks.
* **Post URL**: The URL where SendGrid should send data. This URL may be your server's endpoint, an endpoint provided by a third-party data tool you are using, or a testing URL from a tool like ngrok. This URL should handle incoming `POST` requests from Twilio SendGrid. See the "[What are webhooks](#what-are-webhooks)" section of this page if you are unfamiliar with webhooks or the purpose of this URL.
* **Actions to be posted**: The event types you would like to receive data about in each Webhook request payload. See the [**Event Webhook Reference**](/docs/sendgrid/for-developers/tracking-events/event) for more information about each event type.
* **Security features**: See [**Getting Started with the Event Webhook Security Features**](/docs/sendgrid/for-developers/tracking-events/getting-started-event-webhook-security-features) for details. The Event Webhook allows you to verify that the `POST` requests are coming from SendGrid with either or both **Signature Verification** and **OAuth Verification**.
* **Test Your Integration**: A feature that will send an HTTP `POST` request to your specified **Post URL** containing a JSON array of example events. The test request will be made up of example events and will not include real data from your mail send.

The remaining sections of this page will help you work with your Webhooks.

## Edit an Event Webhook

To edit an Event Webhook using the SendGrid application UI, follow the steps below. You can also manage your Webhooks with the [SendGrid Webhooks API](/docs/sendgrid/api-reference/webhooks).

1. In the Twilio SendGrid application UI, navigate to **Settings** > **Mail Settings**.
2. Under **Webhook Settings**, click **Event Webhooks**.
3. A page will load with each of your Webhooks listed.
4. Click the cog icon beside the **Endpoint URL** for the Webhook you want to edit.
5. A dialog will appear with the option to **Edit** or **Delete** the Webhook.
6. Click **Edit**.

![Table showing two webhooks with options to edit or delete, highlighting the edit option for the first webhook.](https://docs-resources.prod.twilio.com/bed41bf7fd90d79a9c05f79e4a75c0a26398298a1be9977a4cc9bb0287da8f40.jpg)

7. An edit dialog will appear with your Webhook's current settings. Here, you may update any of the fields you wish, including the **Post URL**. These fields are described in the "[Add an Event Webhook](#add-an-event-webhook)" section of this page.
8. You may also enable or disable the Webhook. Disabling a Webhook will not delete it—it will only prevent the Webhook from sending data to the Post URL. Disabled Webhooks count toward the maximum number of Webhooks you may have under your [SendGrid plan](https://sendgrid.com/pricing). For more information about how enabled and disabled Webhooks relate to your SendGrid plan, see the "[Account downgrades and disabled webhooks](#account-downgrades-and-disabled-webhooks)" section of this page.

## Delete an Event Webhook

To delete an Event Webhook from your account using the SendGrid application UI, follow the steps below. You can also manage your webhooks with the [SendGrid Webhooks API.](/docs/sendgrid/api-reference/webhooks)

Deleting a webhook is a permanent action that cannot be reversed. If you only want to stop receiving data from the webhook, you can disable it by following the instructions in the "[Edit an Event Webhook](#edit-an-event-webhook)" section of this page.

1. In the Twilio SendGrid application UI, navigate to **Settings** > **Mail Settings**.
2. Under **Webhook Settings**, click **Event Webhooks**.
3. A page will load with each of your Webhooks listed.
4. Click the cog icon beside the **Endpoint URL** for the Webhook you want to delete.
5. A dialog will appear with the option to **Edit** or **Delete** the Webhook.
6. Click **Delete**.

![Options to edit or delete an event webhook, showing two webhooks with details like state and endpoint URL.](https://docs-resources.prod.twilio.com/2b9b10c3d2e82a22492f2b82d7c9f88c014acc6698416d13058acd3d6439f721.jpg)

7. A confirmation dialog will appear. Click **Delete** to delete the Webhook. Click **Cancel** to retain the Webhook.

## Account downgrades and disabled webhooks

The number of Webhooks available for your account depends on your [SendGrid plan](https://sendgrid.com/pricing). If you downgrade to a plan that does not support the number of Webhooks you currently have, your newest Event Webhooks will be disabled automatically. For example, if you have five Webhooks and downgrade to a plan that allows for two Webhooks, your three most recent Webhooks will be disabled automatically. The newest Webhook is determined by the **Created Date**.

We advise you to review your Webhooks before modifying your SendGrid plan. If you want to avoid the automatic disabling of your newest Webhooks, you can manually disable specific Event Webhooks before making account changes by following the instructions in the "[Edit an Event Webhook](#edit-an-event-webhook)" section of this page. Be sure that you do not have more Webhooks enabled than is supported by the plan you are downgrading to; otherwise, the newest Webhooks will be disabled automatically.

Though SendGrid will automatically disable Webhooks during an account downgrade, we will not delete them. This means you can select which Webhooks are enabled from among any Webhooks available under your previous plan. However, it is not possible to enable more Event Webhooks than your current plan supports, even if you see additional Webhooks from a previous plan.

Disabled Webhooks continue to count toward the maximum number of Webhooks allowed under your SendGrid plan. You must delete Webhooks in excess of the maximum under your current plan or upgrade your plan before creating new Webhooks.

If you choose to later upgrade your account again, you must manually re-enable any Webhooks that were disabled. SendGrid will not automatically re-enable a Webhook for you.

You can find each Webhook's created date with the following steps in the SendGrid UI. You may also retrieve all of your Webhooks and their created dates using the [SendGrid Webhooks API](/docs/sendgrid/api-reference/webhooks).

> \[!NOTE]
>
> If your created date is a dash, "-", the Webhook was created before SendGrid supported multiple Event Webhook configurations. A dash in the created date indicates that the Webhook is the oldest or first created among your Webhooks.

1. In the Twilio SendGrid application UI, navigate to **Settings** > **Mail Settings**.
2. Under **Webhook Settings**, click **Event Webhooks**.
3. A page will load with each of your Webhooks listed.
4. Each Webhook will have a **Created Date** and **Last Updated** date. Automatic disabling during a downgrade is determined by the **Created Date**. If a Webhook's **Created Date** is a dash, "-", the Webhook was created before SendGrid introduced support for multiple Webhook endpoint configurations, and the dash indicates that the Webhook is your oldest.

![Table showing webhook details with created dates of 2023-03-17.](https://docs-resources.prod.twilio.com/e4f3dac8df0bdb8574a18fb2f76f51d9c5197bd463685a6e545714498d9035aa.jpg)

## Store and process event data

Now that you understand the basics of the Event Webhook, you should determine which type of data consumption and storage options are best for your needs.

### Data storage

> \[!WARNING]
>
> Categories and Unique Arguments will be stored as a "Not PII" field and may be used for counting or other operations as SendGrid runs its systems. These fields generally cannot be redacted or removed. You should take care not to place PII in this field. SendGrid does not treat this data as PII, and its value may be visible to SendGrid employees, stored long-term, and may continue to be stored after you have left SendGrid's platform.

Events post within approximately 30 seconds or when the batch size reaches 768 kilobytes. This is per server, so if you send a high volume of emails, the webhook URL may post tens or even hundreds of posts per second. Because of this, storage should be a significant consideration when choosing the type of integration you set up.

> \[!NOTE]
>
> If your email traffic generates a lot of events, the incoming data can quickly overload a web server if it's not configured correctly. We recommend load testing any server that will receive Event Webhook data if you will be generating many events.

Storage integrations are infinitely flexible. We have provided some suggested options below, but you will ultimately know your own systems and needs best. These options are meant to point you in the right direction if you do not yet have your own servers or storage solutions in place.

* SendGrid's partner [Keen](https://keen.io/) provides a platform to analyze, visualize, and store SendGrid Event data. For more information about getting started with Keen, see [**Email Event Data with Keen**](/docs/sendgrid/for-developers/tracking-events/tracking-data-with-keen-io).
* [Snowplow](https://docs.snowplow.io/docs/collecting-data/collecting-data-from-third-parties/sendgrid/) is an open source platform that supports SendGrid and stores the data on Amazon Redshift.
* Several open source web libraries support SendGrid's Event Webhook. For a full list of these libraries, see the [Webhook libraries section](/docs/sendgrid/for-developers/sending-email/libraries) of our API Libraries list.

> \[!WARNING]
>
> SendGrid's SDKs do not have universal support for more than one Event Webhook at this time. Currently, the [Java](https://github.com/sendgrid/sendgrid-java) and [Python](https://github.com/sendgrid/sendgrid-python) offer support for more than one Webhook.

### Integration

Once you have determined which systems will receive and store your event data, you will need to update your Event Webhook configuration with the **Post URL** belonging to your production system. Follow the instructions in the "[Edit an Event Webhook](#edit-an-event-webhook)" section of this page to update a Webhook's URL.

> \[!WARNING]
>
> The Event Webhook does not follow redirects.

> \[!NOTE]
>
> If you want to receive encrypted posts, your callback URL must support TLS 1.2.

Once updated, the system at your new URL will begin receiving event data.

## Troubleshoot the Event Webhook

If you are not receiving data from one of your Webhooks as expected, try the following troubleshooting steps to resolve the issue.

### General troubleshooting

* Make sure your web server is returning a 2xx response to SendGrid's servers. Any other response type will result in our servers retrying a `POST` until we receive a 2xx response or the maximum time has expired. All events are re-tried at increasing intervals for up to 24 hours after the event occurs.
* Make sure you are not blocking the SendGrid IP addresses that are trying to `POST` to your server. Our IPs often change because we constantly add more machines.
* You can use the **Test Your Integration** feature explained in the "[Add an Event Webhook](#add-an-event-webhook)" section of this page to send a test request to your URL. The test request will be made up of example events and will not include real data from your mail send.
* You can also send a `POST` request from a shell using curl, which will give you the full response your server is returning including the HTTP headers:

```shell
curl -X POST "https://example.com" \
--header "Content-Type: application/json" \
--data '[{"email":"alex@example.com","timestamp":1337197600,"smtp-id":"<4FB4041F.6080505@example.com>","event":"processed"},{"email":"alex@example.com","timestamp":1337966815,"category":"newuser","event":"click","url":"https://example.com"},{"email":"alex@example.com","timestamp":1337969592,"smtp-id":"<20120525181309.C1A9B40405B3@Example-Mac.local>","event":"processed"}]'
```

* If you're not getting a response from your server, you may want to test your configuration with a tool like ngrok or [Webhook.site](https://webhook.site/) as mentioned in [**Getting Started with the Event Webhook**](/docs/sendgrid/for-developers/tracking-events/getting-started-event-webhook).

### Duplicate events

It's possible to see duplicate events in the data posted by the Event Webhook. We recommend using some form of deduplication when processing or storing your Event Webhook data using the `sg_event_id` as a differentiator. The `sg_event_id` is a string up to 100 characters that is Base64url encoded and unique for every event where it is included.

## Additional Resources

* [Getting Started with the Event Webhook](/docs/sendgrid/for-developers/tracking-events/getting-started-event-webhook)
* [Getting Started with the Event Webhook Security Features](/docs/sendgrid/for-developers/tracking-events/getting-started-event-webhook-security-features)
* [Event Webhook reference](/docs/sendgrid/for-developers/tracking-events/event)
* [Event Webhook API](/docs/sendgrid/api-reference/webhooks)
* [Email Event Data with Keen](/docs/sendgrid/for-developers/tracking-events/tracking-data-with-keen-io)
* [An Event Webhook case study](https://sendgrid.com/blog/leveraging-sendgrids-event-api/)
