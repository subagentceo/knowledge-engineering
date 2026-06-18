---
title: Manage event subscriptions
description: Learn how to create, view, and delete event subscriptions for your queues.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/queues/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Manage event subscriptions

Learn how to:

* Create event subscriptions to receive messages from Cloudflare services.
* View existing subscriptions on your queues.
* Delete subscriptions you no longer need.

## Create subscription

Creating a subscription allows your queue to receive messages when events occur in Cloudflare services. You can specify which source and events you want to subscribe to.

### Dashboard

1. In the Cloudflare dashboard, go to the **Queues** page.  
[ Go to **Queues** ](https://dash.cloudflare.com/?to=/:account/workers/queues)
2. Select the queue you want to add a subscription to.
3. Switch to the **Subscriptions** tab.
4. Select **Subscribe to events**.
5. Name your subscription, and select the desired source and events.
6. Select **Subscribe**.

### Wrangler CLI

To create a subscription using Wrangler, run the [queues subscription create command](https://developers.cloudflare.com/queues/reference/wrangler-commands/#queues-subscription-create):

Terminal window

```

npx wrangler queues subscription create <queue-name> --source <source-type> --events <event1,event2> --<source-specific-option> <value>


```

To learn more about which sources and events you can subscribe to, refer to [Events & schemas](https://developers.cloudflare.com/queues/event-subscriptions/events-schemas/).

## View existing subscriptions

You can view all subscriptions configured for a queue to see what events it is currently receiving.

### Dashboard

1. In the Cloudflare dashboard, go to the **Queues** page.  
[ Go to **Queues** ](https://dash.cloudflare.com/?to=/:account/workers/queues)
2. Select the queue you want to view subscriptions for.
3. Switch to the **Subscriptions** tab.

### Wrangler CLI

To list subscriptions for a queue, run the [queues subscription list command](https://developers.cloudflare.com/queues/reference/wrangler-commands/#queues-subscription-list):

Terminal window

```

npx wrangler queues subscription list <queue-name>


```

## Delete subscription

When you delete a subscription, your queue will stop receiving messages for those events immediately.

### Dashboard

1. In the Cloudflare dashboard, go to the **Queues** page.  
[ Go to **Queues** ](https://dash.cloudflare.com/?to=/:account/workers/queues)
2. Select the queue containing the subscription you want to delete.
3. Switch to the **Subscriptions** tab.
4. Select **...** for the subscription you want to delete.
5. Select **Delete subscription**.

### Wrangler CLI

To delete a subscription, run the [queues subscription delete command](https://developers.cloudflare.com/queues/reference/wrangler-commands/#queues-subscription-delete):

Terminal window

```

npx wrangler queues subscription delete <queue-name> --id <subscription-id>


```

## Learn more

[ Events & schemas ](https://developers.cloudflare.com/queues/event-subscriptions/events-schemas/) Explore available event sources and types that you can subscribe to. 

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/queues/event-subscriptions/manage-event-subscriptions/#page","headline":"Manage event subscriptions · Cloudflare Queues docs","description":"Learn how to create, view, and delete event subscriptions for your queues.","url":"https://developers.cloudflare.com/queues/event-subscriptions/manage-event-subscriptions/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/queues/","name":"Queues"}},{"@type":"ListItem","position":3,"item":{"@id":"/queues/event-subscriptions/","name":"Event subscriptions"}},{"@type":"ListItem","position":4,"item":{"@id":"/queues/event-subscriptions/manage-event-subscriptions/","name":"Manage event subscriptions"}}]}
```
