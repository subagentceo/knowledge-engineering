---
title: "Requests"
url: https://docs.sentry.io/api/requests/
---

# Requests

All API requests should be made to the `/api/0/` prefix, and will return JSON as the response:

```bash
curl -i https://sentry.io/api/0/
```

*Other available variations of the above snippet: http*

## [HTTP Verbs](https://docs.sentry.io/api/requests.md#http-verbs)

Sentry makes an attempt to stick to appropriate HTTP verbs, but we always prioritize usability over correctness.

| Method    | Description                                                           |
| --------- | --------------------------------------------------------------------- |
| `DELETE`  | Used for deleting resources.                                          |
| `GET`     | Used for retrieving resources.                                        |
| `OPTIONS` | Describes the given endpoint.                                         |
| `POST`    | Used for creating resources.                                          |
| `PUT`     | Used for updating resources. Partial data is accepted where possible. |

## [Parameters and Data](https://docs.sentry.io/api/requests.md#parameters-and-data)

Any parameters not included in the URL should be encoded as JSON with a Content-Type of `'application/json'`:

```bash
curl -i https://sentry.io/api/0/organizations/acme/projects/1/groups/ \
    -d '{"status": "resolved"}' \
    -H 'Content-Type: application/json'
```

Additional parameters are sometimes specified via the querystring, even for `POST`, `PUT`, and `DELETE` requests:

```bash
curl -i https://sentry.io/api/0/organizations/acme/projects/1/groups/?status=unresolved \
    -d '{"status": "resolved"}' \
    -H 'Content-Type: application/json'
```
