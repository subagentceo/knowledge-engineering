---
title: Error responses
description: Understand GraphQL Analytics API error formats.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Error responses

The GraphQL Analytics API is a RESTful API based on HTTPS requests and JSON responses, and will return familiar HTTP status codes (for example, `404`, `500`, `504`). However, in contrast to the common REST approach, a `200` response can contain an error, conforming to the [GraphQL specification ↗](https://graphql.github.io/graphql-spec/June2018/#sec-Errors).

All responses contain an `errors` array, which will be `null` if there are no errors, and include at least one error object if there was an error. Non-null error objects will contain the following fields:

* `message`: a string describing the error.
* `path`: the nodes associated with the error, starting from the root. Note that the number included in the path array, for example, `0` or `1`, specifies to which zone the error applies; `0` indicates the first zone in the list (or only zone, if only one is being queried).
* `timestamp`: UTC datetime when the error occurred.

## Example

```

{

  "data": null,

  "errors": [

    {

      "message": "cannot request data older than 2678400s",

      "path": ["viewer", "zones", "0", "firewallEventsAdaptiveGroups"],

      "extensions": {

        "timestamp": "2019-12-09T21:27:19.195060142Z"

      }

    }

  ]

}


```

## Common error types

### Service unavailability

Sample error messages:

* `unable to execute query, please try again later` (HTTP `503`)
* `too many queries in progress, please try again later` (HTTP `503`)

These messages indicate a temporary server-side issue. The first message typically means the upstream database is unreachable or returned an error. The second message means the server has reached its maximum number of concurrent queries.

Retry the request after a short delay. If the error persists, check the [Cloudflare status page ↗](https://www.cloudflarestatus.com/) for ongoing incidents.

### Dataset accessibility limits exceeded

Sample error messages:

* `cannot request data older than...` (HTTP `400`)
* `number of fields can't be more than...` (HTTP `400`)
* `limit must be positive number and not greater than...` (HTTP `400`)
* `query time range is too large...` (HTTP `400`)

These messages indicate that the query exceeds what is allowed for the particular dataset under the current [plan ↗](https://www.cloudflare.com/plans/), and an upgrade should be considered. Refer to [Node limits](https://developers.cloudflare.com/analytics/graphql-api/limits/#node-limits-and-availability) for details.

### Parsing issues

Sample error messages:

* `error parsing args...` (HTTP `400`)
* `scalar fields must have no selections` (HTTP `400`)
* `object field must have selections` (HTTP `400`)
* `unknown field...` (HTTP `400`)
* `query contains error, please review it and retry` (HTTP `400`)

These messages indicate that the query cannot be processed because it is malformed. Check the query syntax against the [GraphQL schema](https://developers.cloudflare.com/analytics/graphql-api/getting-started/explore-graphql-schema/) and correct the invalid fields or structure.

### Rate limits exceeded

Sample error messages:

* `rate limiter budget depleted, try again after 5 minutes` (HTTP `429`)
* `in combination, your request queries too many nodes, zones and accounts` (HTTP `429`)
* `query consumed excessive resources, please try running smaller queries which consume fewer resources` (HTTP `429`)

These messages indicate the query exceeded rate or resource limits. Reduce the query complexity, the number of zones or accounts per request, or wait before retrying. Refer to the [Limits](https://developers.cloudflare.com/analytics/graphql-api/limits/) section for more details about rate limits.

### Authentication and authorization errors

Sample error messages:

* `Unauthorized` (HTTP `401`)
* `not authorized for that account` (HTTP `403`)
* `zones [...] are not authorized` (HTTP `403`)
* `does not have access to the path...` (HTTP `403`)

An `Unauthorized` response means the API token or bearer token is missing, expired, or invalid. Verify that you are passing a valid token in the `Authorization` header.

A `403` response means the token does not have the required permissions for the requested account or zone. Verify the token has the **Analytics: Read** permission for the relevant resources. Refer to the [Tokens](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) section for more details.

### Internal server errors

Sample error message:

* `Internal server error` (HTTP `500`)

This is a generic error indicating an unexpected failure. If it persists, contact [Cloudflare Support ↗](https://support.cloudflare.com/) with the full request and response, including the `Ray-ID` header from the HTTP response.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/graphql-api/errors/#page","headline":"Error responses · Cloudflare Analytics docs","description":"Understand GraphQL Analytics API error formats.","url":"https://developers.cloudflare.com/analytics/graphql-api/errors/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/analytics/","name":"Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/analytics/graphql-api/","name":"GraphQL Analytics API"}},{"@type":"ListItem","position":4,"item":{"@id":"/analytics/graphql-api/errors/","name":"Error responses"}}]}
```
