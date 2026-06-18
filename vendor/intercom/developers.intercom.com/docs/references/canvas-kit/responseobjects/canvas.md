# Canvas

## Description

You have to respond to the majority of request with a canvas object. This will tell us what UI to show for your app.

A canvas can either be static (meaning we send you the next request only when an action takes place) or live (meaning we send you the next request when someone views the app).

- A static canvas needs a [Content Object](/docs/references/canvas-kit/responseobjects/content) which will contain the components to show.
- A live canvas needs a `content_url` which we we will make the [Live Canvas requests](https://developers.intercom.com/build-an-integration/docs/canvas-kit#section-live-canvas-optional) to when the app is viewed. This is only possible for apps viewed or used in the Messenger.


## Attributes

| Key | Type | Canvas Type | Description |
|  --- | --- | --- | --- |
| content | object | Static | The [Content](/docs/references/canvas-kit/responseobjects/content) that will be shown as the UI of the app. Max Size is 64KB. |
| content_url | string | Live | The URL which we make [Live Canvas requests](https://developers.intercom.com/build-an-integration/docs/canvas-kit#section-live-canvas-optional) to. You must respond to these with a [Content Object](/docs/references/canvas-kit/responseobjects/content). Max size is 64KB. |
| stored_data | object | Static, Live | Optional [Stored Data](/docs/references/canvas-kit/responseobjects/stored-data) that you want to be returned in the next sent request. Max Size is 64KB. |


## Example Objects

```json
{
  canvas: {
    content: {
      components: [
        {
          "type": "text",
          "text": "This is a text component."
        }
      ]
    },
    stored_data: { "key": "value" } //Can be more than one pair 
  }
}
```

```json
{
  canvas: {
    content_url: "https://messengerapp.com/get-content-here",
    stored_data: { "key": "value" } //Can be more than one pair 
  }
}
```