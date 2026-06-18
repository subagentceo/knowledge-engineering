---
title: Simulcast (restream) videos
description: Forward Cloudflare Stream live broadcasts to third-party platforms like YouTube, Twitch, and Facebook.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/stream/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Simulcast (restream) videos

Simulcasting lets you forward your live stream to third-party platforms such as Twitch, YouTube, Facebook, Twitter, and more. You can simulcast to up to 50 concurrent destinations from each live input. To begin simulcasting, select an input and add one or more Outputs.

## Add an Output using the API

Add an Output to start retransmitting live video. You can add or remove Outputs at any time during a broadcast to start and stop retransmitting.

Request

```

curl -X POST \

--data '{"url": "rtmp://a.rtmp.youtube.com/live2","streamKey": "<redacted>"}' \

-H "Authorization: Bearer <API_TOKEN>" \

https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream/live_inputs/<INPUT_UID>/outputs


```

Response

```

{

  "result": {

    "uid": "6f8339ed45fe87daa8e7f0fe4e4ef776",

    "url": "rtmp://a.rtmp.youtube.com/live2",

    "streamKey": "<redacted>"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

## Control when you start and stop simulcasting

You can enable and disable individual live outputs with either:

* The **Live inputs** page of the Cloudflare dashboard.  
[ Go to **Live inputs** ](https://dash.cloudflare.com/?to=/:account/stream/inputs)
* [The API](https://developers.cloudflare.com/api/resources/stream/subresources/live%5Finputs/subresources/outputs/methods/update/)

This allows you to:

* Start a live stream, but wait to start simulcasting to YouTube and Twitch until right before the content begins.
* Stop simulcasting before the live stream ends, to encourage viewers to transition from a third-party service like YouTube or Twitch to a direct live stream.
* Give your own users manual control over when they go live to specific simulcasting destinations.

When a live output is disabled, video is not simulcast to the live output, even when actively streaming to the corresponding live input.

By default, all live outputs are enabled.

### Enable outputs from the dashboard:

1. In the Cloudflare dashboard, go to the **Live inputs** page.  
[ Go to **Live inputs** ](https://dash.cloudflare.com/?to=/:account/stream/inputs)
2. Select an input from the list.
3. Under **Outputs** \> **Enabled**, set the toggle to enabled or disabled.

## Manage outputs

| Command                                                                                                                                                                         | Method | Endpoint                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | -------------------------------------------------------------------------------------------------- |
| [List outputs](https://developers.cloudflare.com/api/resources/stream/subresources/live%5Finputs/methods/list/)                                                                 | GET    | accounts/:account\_identifier/stream/live\_inputs                                                  |
| [Delete outputs](https://developers.cloudflare.com/api/resources/stream/subresources/live%5Finputs/methods/delete/)                                                             | DELETE | accounts/:account\_identifier/stream/live\_inputs/:live\_input\_identifier                         |
| [List All Outputs Associated With A Specified Live Input](https://developers.cloudflare.com/api/resources/stream/subresources/live%5Finputs/subresources/outputs/methods/list/) | GET    | /accounts/{account\_id}/stream/live\_inputs/{live\_input\_identifier}/outputs                      |
| [Delete An Output](https://developers.cloudflare.com/api/resources/stream/subresources/live%5Finputs/subresources/outputs/methods/delete/)                                      | DELETE | /accounts/{account\_id}/stream/live\_inputs/{live\_input\_identifier}/outputs/{output\_identifier} |

If the associated live input is already retransmitting to this output when you make the `DELETE` request, that output will be disconnected within 30 seconds.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/stream/stream-live/simulcasting/#page","headline":"Simulcast (restream) videos · Cloudflare Stream docs","description":"Forward Cloudflare Stream live broadcasts to third-party platforms like YouTube, Twitch, and Facebook.","url":"https://developers.cloudflare.com/stream/stream-live/simulcasting/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/stream/","name":"Stream"}},{"@type":"ListItem","position":3,"item":{"@id":"/stream/stream-live/","name":"Stream live video"}},{"@type":"ListItem","position":4,"item":{"@id":"/stream/stream-live/simulcasting/","name":"Simulcast (restream) videos"}}]}
```
