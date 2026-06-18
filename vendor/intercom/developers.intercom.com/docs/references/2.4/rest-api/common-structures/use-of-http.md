# Use of HTTP

Request methods are used in accordance with HTTP.

* GET is used to access resources and perform queries. The API does not allow modifications (creates, updates, deletes) to occur via GET.
* POST is used to create or update resources. The preferred model for creation is to post JSON to a 'collections' resource - for example the collections resource for users is `https://api.intercom.io/users`.
* DELETE is used to delete resources.


Responses use standard HTTP codes. Where there are client or server errors, a list of of one or more errors in JSON format is returned in the body - see [Error Objects](/docs/references/2.4/rest-api/errors/error-objects) for more details.

The API may send cache directives where suitable, notably the `ETag`, `Last-Modified` and `If-Modified-Since` headers.

The `Accept` header must be used by a client used to indicate a preferred response for `GET/HEAD` requests. Requests without an `Accept` header of `application/json` may be rejected with a client error of 404 or 406.

The `Content-Type` header should be used by clients to indicate the submitted format for `POST/PUT` requests.