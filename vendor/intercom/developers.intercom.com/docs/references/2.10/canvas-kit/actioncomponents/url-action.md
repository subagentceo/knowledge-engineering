# URL Action

A URL action opens a given link in a new browser tab.

## Parameters

| Parameters | Possible Values | Required | Description |
|  --- | --- | --- | --- |
| type | `url` | Yes | The type of action you are attaching to a component. |
| url | A valid HTTPS URL | Yes | The link which will open in a new tab. |


## Example Object

```json
action: {
  "type": "url",
  "url":  "https://www.example.com"
}
```