# Rate Limits

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

## Rate Limit Response Header

All calls within the Web API are allotted a specific number of requests per refresh period.

Each Web API request returns the following header information regarding rate limits and number of requests left.

Depending on the endpoint you are trying to reach, it will have a specific number of allowed requests per refresh period. Once this threshold has been reached, we will return a status code `429` response.

### Example

```text
GET https://api.sendgrid.com/v3/resource HTTP/1.1
```

```text
HTTP/1.1 200 OK
Content-Type: application/json
X-RateLimit-Limit: 500
X-RateLimit-Remaining: 499
X-RateLimit-Reset: 1392815263

{
  "foo": "bar"
}
```

## When You Reach a Rate Limit

You will no longer be able to make request against that endpoint for the duration of that refresh period.

### Example \[#example-2]

```text
GET https://api.sendgrid.com/v3/resource/ HTTP/1.1
```

```text
HTTP/1.1 429 TOO MANY REQUESTS
Content-Type: application/json
X-RateLimit-Limit: 150
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1392815263

{
  "errors": [
    {
      "field": null,
       "message": "too many requests"
    },
  ]
}
```
