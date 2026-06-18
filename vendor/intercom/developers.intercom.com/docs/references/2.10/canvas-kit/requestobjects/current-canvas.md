# Current Canvas

## Description

The current_canvas object mirrors the same format as the [Canvas Object](/docs/references/2.10/canvas-kit/responseobjects/canvas). This will be the canvas that was most recently showing before the request was sent.

## Example Object

```json
{
  current_canvas: {
    content: { 
      components : [
        {
          "type": "button",
          "id": "button-1",
          "label": "This canvas showed before I was clicked",
          "action": {
            "type": "submit"
          }
        }
      ]
    }
  }
}
```