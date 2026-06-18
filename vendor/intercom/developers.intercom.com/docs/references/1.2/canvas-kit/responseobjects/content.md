# Content

The `content` object specifies which components you want to render within the `canvas` of your apps `card` or `frame`. There's a small difference to note between a static and a live canvas:

- **Static**: you can provide the `content` object within the `canvas`.
- **Live**: you will need to provide a `content_url` for us to POST a request to within the `canvas`, and subsequently respond with the `content` object there.


```json
{
  content: {
    components: [
      {
        type: "text",
        text: "This is your updated canvas",
        align: "center",
        style: "header"
      }
    ]
  }
}
```

| Key | Type | Description |
|  --- | --- | --- |
| components | array[object] | The list of components to be rendered within a card or a frame. See our components further in this reference. |