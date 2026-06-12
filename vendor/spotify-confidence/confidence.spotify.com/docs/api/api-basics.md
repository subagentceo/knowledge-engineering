> ## Documentation Index
> Fetch the complete documentation index at: https://confidence-auth-testing.mintlify.io/llms.txt
> Use this file to discover all available pages before exploring further.

# API Fundamentals

> Learn the fundamentals of working with Confidence APIs including authentication, pagination, and resource names.

The Confidence API uses the REST structure. Confidence supports authentication via
access tokens and OAuth 2.0.
You make requests via HTTP endpoints with clear functions and appropriate response codes.

The API follows the [Google API guidelines](https://google.aip.dev/general) as much as possible.

## Authentication

Before you can access an endpoint within Confidence, you need to have
valid authentication. Two kinds of APIs exist in Confidence: the management API that you use to configure
the different entities in the platform (flags, experiments, fact tables etc), and the resolve/events API that you
use in the Client SDKs to resolve flag values and emit events.

Because these two kinds have different characteristics, they use different methods for authentication. For the resolve
API, you create a "Client" which has an `API_TOKEN` that you use to authenticate. This API token is long-lived so you
can, for example, bundle it inside your mobile app to resolve flags. A client can have multiple API tokens attached to it, to allow
for rotating tokens as needed. You create clients in the **Admin** panel in [Confidence](https://app.confidence.spotify.com).

The management API uses a [Client Credentials OAuth flow](https://auth0.com/docs/get-started/authentication-and-authorization-flow/client-credentials-flow),
where you supply a client ID and a client secret and in exchange get an access token that is valid for 24 hours. The token is then included in
all requests to the API in an HTTP header. You create API clients in the **Admin** panel in [Confidence](https://app.confidence.spotify.com).

### Request a Token for an API Client

To request an access token, make a POST request to the `/v1/oauth/token` endpoint with your client credentials.

<Card title="Request Access Token" icon="key" href="/api-reference/request-accesstoken">
  Try the interactive API playground to request an access token.
</Card>

## Pagination

List resources allow for [pagination](https://google.aip.dev/158) by allowing a `page_token` and a `page_size` in the requests.
If there are more results, a list response has a `next_page_token` field.
Use this token in the next request to ask for the next page of results.

## Resource Names

The API uses [resource names](https://google.aip.dev/122) to uniquely identify each entity that you can use to reference that resource. A resource
name consists of a type and an identifier, for example `flags/my-flag`. A resource name can be hierarchical if the parent owns a child resource.
The resource name can then have multiple levels, for example `flags/my-flag/variants/control`.

## Response Status Codes

The Confidence API uses standard HTTP status codes to signal the status of a request to a consumer, for example `200 (OK)`, `401 (Unauthorized)`, `404 (Not found)`.

## Errors

The Confidence API uses standard HTTP status codes to signal error conditions. Is some cases the response also includes a JSON payload with a more detailed
error message:

```json theme={null}
{
 "code": 7,
 "message": "Permission denied, missing permission list:metrics",
 "details": []
}
```

## Update Masks

When updating a resource, the update request can take an optional field mask, which specifies which fields on the resource the request should update.
If the field mask is not included, the request updates the whole resource.

More details about field masks and how to specify them are available in the [Google API guidelines](https://google.aip.dev/161).
