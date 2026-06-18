# URL Action

A URL action opens a given link in a new browser tab. You must encode all the non-ASCII characters in the URL. For JS, use `encodeURIComponent`. For Ruby, use `URI.escape`.

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