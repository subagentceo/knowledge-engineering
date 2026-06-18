# Content

## Description

The content object is where you specify the UI of your app. You provide us with a set of components in a `components` array that we then render.

The content object should usually be returned within the [canvas object](/docs/references/2.2/canvas-kit/responseobjects/canvas). If you're responding to a Live Canvas request however, then you should only respond with the content object.

## Attributes

| Key | Type | Description |
|  --- | --- | --- |
| components | array | The list of components to be rendered. See the components further in this reference. |


## Example Object

```json
{
  content: {
    components: [
      {
        "type": "text",
        "id": "component-1",
        "text": "This is the first component",
        "align": "center",
        "style": "header"
      },
      {
        "type": "button",
        "id": "component-2",
        "label": "This is the second component",
        "action": {
          "type": "submit"
        }
      }
    ]
  }
}
```