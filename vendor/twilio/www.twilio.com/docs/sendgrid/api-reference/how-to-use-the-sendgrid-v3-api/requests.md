# Requests

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

## Making a Request

### Host

The host for Web API v3 requests is always `https://api.sendgrid.com/v3/`

**All requests must be made over HTTPS. The API does not support HTTP.**

### Authorization Header

You must provide an authorization header as described in [Authentication](/docs/sendgrid/api-reference/how-to-use-the-sendgrid-v3-api/authentication).

### HTTP Verbs

| **Verb**  | **Description**                                |
| --------- | ---------------------------------------------- |
| `GET`     | Retrieve a resource or group of resources      |
| `POST`    | Create a new resource                          |
| `PUT`     | Update an existing resource                    |
| `DELETE`  | Delete an existing resource                    |
| `OPTIONS` | View allowed verbs against a specific resource |

### Accept Header

The API provides JSON responses. It doesn't currently require the [accept header](https://www.soapui.org/docs/rest-testing/understanding-rest-parameters), but might in the future. If not set, the API will use `application/json`.

```text
GET https://api.sendgrid.com/v3/endpoint HTTP/1.1
Accept: application/json
```

### Arrays of Data

When you send an array of data in a `GET` request, you will include the parameter multiple times on the URL. The parameter name does not require brackets.

#### Example Array in a GET request

```text
GET https://api.sendgrid.com/v3/endpoint?parameter=data1&parameter=data2 HTTP/1.1
```

## Formatting Your Request

### Request Body

When submitting data to a resource via `POST` or `PUT`, you must submit your payload in JSON.

```text
POST https://api.sendgrid.com/v3/templates/ HTTP/1.1
Content-Type: application/json
```

```json
{
  "name": "new template name"
}
```

### Pagination

Some `GET` resources allow for retrieval of information in batches. We will provide the query args in the resource documentation when available to consume.

When requesting multiple items, we will default the request limit to 500 items. You can specify a different limit but cannot exceed the default limit.

Resources documented will display a bolded list of available paginated parameters if available.

Below is a basic pagination example. In the resource documentation, we will only provide the bolded list of available parameters.

**A [Link Header](https://datatracker.ietf.org/doc/html/rfc5988) is provided in the response for batched information.**

```text
GET https://api.sendgrid.com/v3/resource?limit=300&offset=10 HTTP/1.1
```

| **Parameter** | **Description**                 |
| ------------- | ------------------------------- |
| limit         | The number of records to return |
| offset        | The number of records to skip   |

### Search & Parameters

Some resources allow for you to search by a specific field. Other resources require you to append a parameter to the URI.

In this example, we will display a paginated URI example, searching for resources where the email contains `foo`.

```text
GET https://api.sendgrid.com/v3/resource?email=foo&bar=baz HTTP/1.1
```

## Successful Requests

Below is a general overview of what resource objects return with successful Web API requests.

| **Verb** | **Resource object returned**                                  |
| -------- | ------------------------------------------------------------- |
| `GET`    | Returns a single resource object or array of resource objects |
| `PATCH`  | Returns the updated resource object                           |
| `PUT`    | Returns the updated resource object                           |
| `DELETE` | No content is returned                                        |
| `POST`   | Returns the newly created resource object                     |
