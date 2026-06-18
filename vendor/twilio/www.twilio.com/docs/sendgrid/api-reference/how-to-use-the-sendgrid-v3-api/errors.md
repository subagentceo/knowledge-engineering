# Errors

## API Overview

## Twilio supported SDKs

The Twilio SendGrid Web REST API v3 provides SDKs for seven different languages.

* [C#](https://github.com/sendgrid/sendgrid-csharp)
* [Go](https://github.com/sendgrid/sendgrid-go)
* [Java](https://github.com/sendgrid/sendgrid-java)
* [Node.js](https://github.com/sendgrid/sendgrid-nodejs)
* [PHP](https://github.com/sendgrid/sendgrid-php)
* [Python](https://github.com/sendgrid/sendgrid-python)
* [Ruby](https://github.com/sendgrid/sendgrid-ruby)

Sometimes your API call will generate an error. Here you will find additional information about what to expect if you don't format your request properly, or we fail to properly process your request.

## Response Codes

| **Status Code** | **Description**                                                |
| --------------- | -------------------------------------------------------------- |
| 400             | Bad request                                                    |
| 401             | Requires authentication                                        |
| 403             | Too many bad requests. Temporary block                         |
| 406             | Missing Accept header. For example: `Accept: application/json` |
| 429             | Too many requests/Rate limit exceeded                          |
| 500             | Internal server error                                          |

## Failed Requests

The general format guidelines are displayed when the accompanying status code is returned.

```text
GET https://api.sendgrid.com/v3/resource HTTP/1.1
```

```text
HTTP/1.1 400 BAD REQUEST
Content-Type: application/json

{
    "errors": [
      {"field": "identifier1", "message": "error message explained"},
      {"field": "identifier2", "message": "error message explained"},
      {"field": "identifier3", "message": "error message explained"},
    ]
}
```
