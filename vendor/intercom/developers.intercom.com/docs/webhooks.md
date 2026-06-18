# Webhooks

Webhooks are a way that you can access real-time notifications about events that happen in your Intercom workspace. These can be used to take actions within your own infrastructure, send data to a third-party — for instance, to send a Slack message or create a GitHub issue — or to trigger an action within an Intercom app that you are building.

You can start utilizing webhooks from your Intercom paid workspace or development workspace by setting a URL in your [Developer Hub](https://app.intercom.com/a/apps/_/developer-hub) where you want the notification to be sent.

If you haven't worked with Webhooks before, check out this blog post [from Pipedream](https://requestbin.com/blog/working-with-webhooks/) to get an overview. If more of a visual person, here's a diagram of the Webhook system:

![Intercom Webhook Diagram](/assets/webhook-diagram.d1014dabe8c9011452e70008cc1178db1e48fd23659e9383701fce00f8fb66a0.71a4f21c.png)

## Subscriptions

You can create a webhook **subscription** within your Intercom app by choosing the **topics** that you want to be notified about and providing an endpoint URL where you want the **notifications** to be sent.

Webhooks are associated with an app, but you will receive notification on the topics of the workspace where the app is installed. This means if you have multiple apps associated with one workspace, you will receive notifications from that workspace in each of the apps installed on that workspace.

## Topics

A [topic](/docs/references/2.11/webhooks/webhook-models) is the event that happens within Intercom that triggers the webhook. In your subscription you can choose and enable any of the available topics for the version that you are on. When your endpoint is hit you will receive a notification to that endpoint.

## Notifications

A [notification](/docs/webhooks/webhook-notifications) is the event object delivered when an event is triggered. The notifications contain data payloads that contain references to the Intercom objects associated with the event. Notifications for all topics will be sent to the URL you provided for your subscription.

If you look at the webhook payload on the `ticket.created` topic for example, it will look like this:

```json
{
  type: 'notification_event',
  app_id: 'your-app-id',
  data: {
    type: 'notification_event_data',
    item: {
      type: 'ticket',
      id: '5',
      ticket_id: '1',
      ticket_attributes: [Object],
      ticket_state: 'submitted',
      ticket_state_internal_label: null,
      ticket_state_external_label: null,
      ticket_type: [Object],
      contacts: [Object],
      admin_assignee_id: '0',
      team_assignee_id: '0',
      created_at: 1715937888,
      updated_at: 1715937889,
      ticket_parts: [Object],
      open: true,
      snoozed_until: null,
      linked_objects: [Object],
      category: 'Tracker',
      is_shared: false
    }
  },
  links: {},
  id: 'notif_c2441832-5d5b-48d9-8f83-f8c37d8e03e6',
  topic: 'ticket.created',
  delivery_status: 'pending',
  delivery_attempts: 1,
  delivered_at: 0,
  first_sent_at: 1715937891,
  created_at: 1715937890,
  self: null
}
```

## FAQs

### If I am developing apps for other people how do I subscribe to a webhook?

You will need to select the permissions on the **Authorization** page of your app and then subscribe to the relevant topics on the **Webhooks** page.

### Can I subscribe to webhook topics with an API?

No, you can only subscribe to webhooks now via your Developer Hub. If you previously configured webhooks with the API, your webhooks should continue to work in the same way.

### Which IP addresses should I add to my allowlist for Intercom webhooks?

Intercom IP addresses are available in JSON format for each region. These files are refreshed daily at 9:00 AM Dublin time, though IP ranges change infrequently.

To get the current webhook IP addresses for your region:

USA: https://static.intercomcdn.com/intercom-ips/us/intercom-ip-ranges.json

Europe: https://static.intercomcdn.com/intercom-ips/eu/intercom-ip-ranges.json

Australia: https://static.intercomcdn.com/intercom-ips/au/intercom-ip-ranges.json

The JSON files contain IP ranges categorized by service type. For webhook allowlisting, you need to use the IP addresses with the service type **"INTERCOM-OUTBOUND"**.

When you view the files above, the JSON structure should look like this:

```json
{
  "ip_ranges": [
    {
      "range": "34.197.76.213/32",
      "region": "US",
      "service": "INTERCOM-OUTBOUND"
    },
    // ... more entries
  ],
  "date": "2025-07-25"
}
```

**Important notes**:

- Webhooks are only sent from IP addresses with `"service": "INTERCOM-OUTBOUND"`
- IP addresses are in CIDR notation (e.g., `34.197.76.213/32`)
- We recommend implementing automated fetching of these files to keep your allowlist current with new ranges as they are added.
- This approach ensures you always have the most up-to-date IP addresses for Intercom webhooks without manual maintenance.


## What's next?

Now that you've learned the basics of webhooks, you could:

- [Setup your first webhook](/docs/webhooks/setting-up-webhooks)
- [Learn about the topics you can subscribe to](https://developers.intercom.com/intercom-api-reference/reference/webhook-models)
- [Learn more about how we deliver notifications](/docs/webhooks/webhook-notifications)