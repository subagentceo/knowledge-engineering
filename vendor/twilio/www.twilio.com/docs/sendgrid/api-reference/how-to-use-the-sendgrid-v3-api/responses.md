# Responses

## API libraries on GitHub

## Twilio supported SDKs

The Twilio SendGrid Web REST API v3 provides SDKs for seven different languages.

* [C#](https://github.com/sendgrid/sendgrid-csharp)
* [Go](https://github.com/sendgrid/sendgrid-go)
* [Java](https://github.com/sendgrid/sendgrid-java)
* [Node.js](https://github.com/sendgrid/sendgrid-nodejs)
* [PHP](https://github.com/sendgrid/sendgrid-php)
* [Python](https://github.com/sendgrid/sendgrid-python)
* [Ruby](https://github.com/sendgrid/sendgrid-ruby)

## Content-Type header

Any API response with a content body expresses it in JSON format. The `Content-Type` header indicates this.

```http
GET https://api.sendgrid.com/v3/resource HTTP/1.1
```

```http
# !focus(2)
HTTP/1.1 200 OK
Content-Type: application/json

{
  "foo": "bar"
}
```

## HTTP status codes

The following table describes the various status codes returned for the API.

| Status code  | Description                                                                   | Response body |
| ------------ | ----------------------------------------------------------------------------- | ------------- |
| [`200`][200] | OK                                                                            | No            |
| [`201`][201] | Creation succeeded                                                            | No            |
| [`202`][202] | Request accepted                                                              | Varies        |
| [`204`][204] | Deletion succeeded                                                            | No            |
| [`400`][400] | Bad request                                                                   | Yes           |
| [`401`][401] | Requires authentication                                                       | Yes           |
| [`403`][403] | `From` address doesn't match [Verified Sender Identity][sir]                  | Yes           |
| [`403`][403] | You are temporarily blocked from sending emails due to repeated bad requests. | Yes           |
| [`406`][406] | Missing the `Accept` header. For example: `Accept: application/json`          | Yes           |
| [`429`][429] | Too many requests or rate limit exceeded                                      | Yes           |
| [`500`][500] | Internal server error                                                         | Yes           |

## Pagination

When a request includes a pagination query parameter, the response returns the following properties in the header. These allow the user to go to the previous, next, first, and last page of the data set.

```http
GET https://api.sendgrid.com/v3/resource?limit=5&offset=0 HTTP/1.1
```

```http
# !focus(4:7)
HTTP/1.1 200 OK
Content-Type: application/json

Link: <http://api.sendgrid.com/v3/resource?limit=5&offset=5>; rel="next"; title="2",
      <http://api.sendgrid.com/v3/resource?limit=5&offset=0>; rel="prev"; title="1",
      <http://api.sendgrid.com/v3/resource?limit=5&offset=10>; rel="last"; title="3",
      <http://api.sendgrid.com/v3/resource?limit=5&offset=0>; rel="first"; title="1"
```

[200]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/200

[201]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/201

[202]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/202

[204]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/204

[400]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/400

[401]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/401

[403]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/403

[406]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/406

[429]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/429

[500]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/500

[sir]: /docs/sendgrid/for-developers/sending-email/sender-identity
