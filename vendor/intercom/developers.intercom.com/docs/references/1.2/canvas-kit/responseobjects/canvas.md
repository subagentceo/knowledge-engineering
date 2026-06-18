# Canvas

Canvases are one of the most common objects in most app cycles. They enable Intercom to determine what your app will render, alongside how this content will be rendered. These can either be:

- **Static**: the given `content` in the canvas will remain until an action is taken to change this.
- **Live**: the given `content` in the canvas can change dynamically whenever anybody views the card. [More about the Live Canvas can be found here](https://developers.intercom.com/build-an-integration/docs/canvas-kit#section-live-canvas-optional).


### Static Canvas

```json
{
  canvas: {
    content: {
      components: [
        {
          type: "text",
          text: "Hello World!"
        }
      ]
    },
    stored_data: {} //optional
  }
}
```

| Key | Type | Description |
|  --- | --- | --- |
| content | object | More on the content object can be found [here](/docs/references/1.2/canvas-kit/responseobjects/content). Max Size is 64KB. |
| stored_data | object | More on the stored_data object can be found [here](/docs/references/1.2/canvas-kit/responseobjects/stored-data). Max Size is 64KB. |


### Live Canvas

```json
{
  canvas: {
    content_url: "https://messengerapp.com/get-content-here",
    stored_data: {} //optional
  }
}
```

| Key | Type | Description |
|  --- | --- | --- |
| content_url | string | The URL which we make [Live Canvas requests](https://developers.intercom.com/build-an-integration/docs/canvas-kit#section-live-canvas-optional) to. You must respond to these with a [Content Object](/docs/references/1.2/canvas-kit/responseobjects/content). Max size is 64KB. |
| stored_data | object | Optional [Stored Data](/docs/references/1.2/canvas-kit/responseobjects/stored-data) that you want to be returned in the next sent request. Max Size is 64KB. |