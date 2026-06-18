# Authentication

## Twilio supported SDKs

The Twilio SendGrid Web REST API v3 provides SDKs for seven different languages.

* [C#](https://github.com/sendgrid/sendgrid-csharp)
* [Go](https://github.com/sendgrid/sendgrid-go)
* [Java](https://github.com/sendgrid/sendgrid-java)
* [Node.js](https://github.com/sendgrid/sendgrid-nodejs)
* [PHP](https://github.com/sendgrid/sendgrid-php)
* [Python](https://github.com/sendgrid/sendgrid-python)
* [Ruby](https://github.com/sendgrid/sendgrid-ruby)

## Authorization header

To authenticate, add an HTTP `Authorization` header to your API request that contains an [API Key](/docs/sendgrid/api-reference/api-keys/create-api-keys).

## API keys

The Twilio SendGrid Web API v3 supports API keys, which add an additional layer of security to your account. Using API keys, you can:

* Use another method of authentication separate from your account username and password.
* Assign [specific permissions][] to API keys that limit which areas of your account the key can access.

You can create [API keys in your account][]. To use an API key, include an `Authorization` header with the value `Bearer <YOUR_API_KEY_HERE>` in your request. Replace `<YOUR_API_KEY_HERE>` with your API secret key.

```text {title="Example API request header"}
GET https://api.sendgrid.com/v3/resource HTTP/1.1
Authorization: Bearer <YOUR_API_KEY_HERE>
```

```bash {title="Example API request using bash"}
curl -X "GET" "https://api.sendgrid.com/v3/templates" \
     -H "Authorization: Bearer <YOUR_API_KEY_HERE>" \
     -H "Content-Type: application/json"
```

[specific permissions]: /docs/sendgrid/api-reference/api-key-permissions

[API Keys in your account]: https://app.sendgrid.com/settings/api_keys
