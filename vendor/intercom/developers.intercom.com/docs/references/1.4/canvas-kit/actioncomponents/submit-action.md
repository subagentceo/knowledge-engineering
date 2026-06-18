# Submit action

A submit action triggers a [Submit Request](https://developers.intercom.com/build-an-integration/docs/canvas-kit#section-submit) to be sent. This request will include all values which have been entered into all the interactive components on the current canvas.

## Parameters

## Parameters

| Parameters | Possible Values | Required | Description |
|  --- | --- | --- | --- |
| type | `submit` | Yes | The type of action you are attaching to a component. |


## Example Object

```json
action: {
  "type": "submit"
}
```