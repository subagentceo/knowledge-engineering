# Sheets Action

A sheet action opens the link you give within the Messenger as an embedded iframe.

[More on how Sheets work is in our Canvas Kit documentation](/docs/canvas-kit#sheets-optional).

## Parameters

| Parameters | Possible Values | Required | Description |
|  --- | --- | --- | --- |
| type | `sheet` | Yes | The type of action you are attaching to a component. |
| url | A valid HTTPS URL | Yes | The link which hosts your sheet. |


## Example Object

```json
action: {
  type: "sheet",
  url:  "http://example.com"
}
```