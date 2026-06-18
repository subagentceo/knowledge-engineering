---
title: Send messages from the dashboard
description: Use the dashboard to send messages to a queue.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/queues/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Send messages from the dashboard

**Last reviewed:**  almost 3 years ago 

Use the dashboard to send messages to a queue.

Sending messages from the dashboard allows you to debug Queues or queue consumers without a producer Worker.

To send messages from the dashboard:

1. In the Cloudflare dashboard, go to the **Queues** page.  
[ Go to **Queues** ](https://dash.cloudflare.com/?to=/:account/workers/queues)
2. Select the queue to send a message to.
3. Select the **Messages** tab.
4. Select **Send**.
5. Choose your message **Content Type**: _Text_ or _JSON_.
6. Enter your message. Alternatively, drag a file over the textbox to upload a file as a message.
7. Select **Send**.

Your message will be sent to the queue.

Refer to the [Get Started guide](https://developers.cloudflare.com/queues/get-started/) to learn how to send messages to a queue from a Worker.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/queues/examples/send-messages-from-dash/#page","headline":"Cloudflare Queues - Sending messages from the dashboard · Cloudflare Queues docs","description":"Use the dashboard to send messages to a queue.","url":"https://developers.cloudflare.com/queues/examples/send-messages-from-dash/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/queues/","name":"Queues"}},{"@type":"ListItem","position":3,"item":{"@id":"/queues/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/queues/examples/send-messages-from-dash/","name":"Send messages from the dashboard"}}]}
```
