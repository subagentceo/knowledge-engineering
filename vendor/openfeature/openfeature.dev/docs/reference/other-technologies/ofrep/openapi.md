-   OFREP Core
    -   postEvaluate A Single Feature Flag
    -   postBulk Evaluate All Feature Flags

[API docs by Redocly](https://redocly.com/redoc/)

# OpenFeature Remote Evaluation Protocol (OFREP) (0.3.0)

Download OpenAPI specification:[Download](https://raw.githubusercontent.com/open-feature/protocol/main/service/openapi.yaml)

URL: [https://github.com/open-feature/protocol](https://github.com/open-feature/protocol) License: Apache-2.0

* * *

The **OpenFeature Remote Evaluation Protocol (OFREP)** is an API specification for feature flagging that enables vendor-agnostic communication between applications and flag management systems.

OFREP defines a standard API layer between OpenFeature providers and flag management systems, allowing any flag management system to implement the protocol and be compatible with community-maintained providers.

For more information, see the [OFREP documentation](https://openfeature.dev/docs/reference/other-technologies/ofrep/).

## [](#tag/OFREP-Core)OFREP Core

**Required**: Core APIs to implement to support OFREP.  
_This is the minimum set of APIs required for a flag management system to be OFREP compatible._

## [](#tag/OFREP-Core/operation/evaluateFlag)Evaluate A Single Feature Flag

Evaluates a single feature flag by its key. This endpoint is used by **server-side providers** for dynamic context evaluation, where each evaluation request includes the evaluation context.

The endpoint returns the evaluated flag value along with metadata including the evaluation reason, variant, and any flag-specific metadata. The flag value can be one of several types: boolean, string, integer, float, object, or a code default (indicating the provider should use the code default value).

**Use Case**: Server-side applications where evaluation context may change between requests and real-time targeting decisions are required.

##### Authorizations:

_ApiKeyAuth__BearerAuth_

##### path Parameters

key

required

string

Example: discount-banner

The unique identifier (key) of the feature flag

##### Request Body schema: application/json

required

Evaluation request containing the context for flag evaluation

context

required

object (context)

Evaluation context containing information used to evaluate feature flags. The context includes a `targetingKey` (required) along with additional properties such as user attributes, session data, or request metadata that can be used for targeting rules.

targetingKey

required

string

property name\*

additional property

any

### Responses

**200**

Successful flag evaluation. Returns the evaluated flag value with metadata.

**400**

Bad evaluation request. The request is malformed or contains invalid context.

**401**

Unauthorized. Authentication credentials are missing, invalid, or expired.

**403**

Forbidden. The client does not have permission to access the requested resource.

**404**

Flag not found. The specified flag key does not exist in the flag management system.

**429**

Too Many Requests. Rate limit has been exceeded.

**500**

Internal Server Error. An unexpected error occurred on the server that prevented flag evaluation.

post/ofrep/v1/evaluate/flags/{key}

https://raw.githubusercontent.com/ofrep/v1/evaluate/flags/{key}

### Request samples

-   Payload

Content type

application/json

Copy

Expand all Collapse all

`{  -   "context": {          -   "targetingKey": "user-123",              -   "email": "user@example.com",              -   "custom-plan": "premium",              -   "country": "CA"                   }       }`

### Response samples

-   200
-   400
-   404
-   500

Content type

application/json

Copy

`{  -   "key": "discount-banner",      -   "value": true,      -   "reason": "TARGETING_MATCH",      -   "variant": "enabled"       }`

## [](#tag/OFREP-Core/operation/evaluateFlagsBulk)Bulk Evaluate All Feature Flags

Evaluates all feature flags in a single request using a static context. This endpoint is used by **client-side providers** for static context evaluation, where all flags are evaluated once and then cached locally for subsequent use.

The endpoint returns an array of all flag evaluations, where each flag can be either a successful evaluation or an evaluation failure. The response includes an ETag header for cache validation, allowing clients to use the `If-None-Match` header to avoid unnecessary re-evaluation when flags haven't changed.

##### Authorizations:

_ApiKeyAuth__BearerAuth_

##### query Parameters

flagConfigEtag

string

Example: flagConfigEtag=550e8400-e29b-41d4-a716-446655440000

Optional ETag metadata provided by an event stream for change-triggered re-fetches (see ADR-0008). This is not a standard HTTP conditional request header; it is metadata for server-side cache validation and freshness checks. It should only be included when the request is directly triggered by a received change notification event.

flagConfigLastModified

integer or string

Examples:

-   flagConfigLastModified=1771622898 -
-   flagConfigLastModified=2026-02-20T21:28:18Z -

Optional last-modified metadata provided by an event stream for change-triggered re-fetches (see ADR-0008). Supports Unix timestamp in seconds (recommended) or an ISO 8601 date-time string, and is transported as query metadata rather than `If-Modified-Since`. It should only be included when the request is directly triggered by a received change notification event.

##### header Parameters

If-None-Match

string

Example: abc123xyz

Optional ETag value from a previous bulk evaluation response. If provided and the ETag matches the current flag set, the server will return a 304 Not Modified response, indicating that flags haven't changed since the last evaluation.

##### Request Body schema: application/json

required

context

required

object (context)

Evaluation context containing information used to evaluate feature flags. The context includes a `targetingKey` (required) along with additional properties such as user attributes, session data, or request metadata that can be used for targeting rules.

targetingKey

required

string

property name\*

additional property

any

### Responses

**200**

Successful bulk evaluation.

**304**

Not Modified. The flags haven't changed since the last evaluation (ETag matches). No response body is returned.

**400**

Bad evaluation request. The request is malformed or contains invalid context.

**401**

Unauthorized. Authentication credentials are missing, invalid, or expired.

**403**

Forbidden. The client does not have permission to access the requested resource.

**429**

Too Many Requests. Rate limit has been exceeded.

**500**

Internal server error. An unexpected error occurred on the server that prevented flag evaluation.

post/ofrep/v1/evaluate/flags

https://raw.githubusercontent.com/ofrep/v1/evaluate/flags

### Request samples

-   Payload

Content type

application/json

Copy

Expand all Collapse all

`{  -   "context": {          -   "targetingKey": "user-456",              -   "email": "user@example.com",              -   "plan": "free",              -   "country": "CA"                   }       }`

### Response samples

-   200
-   400
-   500

Content type

application/json

Copy

Expand all Collapse all

`{  -   "flags": [          -   {                  -   "key": "discount-banner",                      -   "value": true,                      -   "reason": "TARGETING_MATCH",                      -   "variant": "enabled"                               },              -   {                  -   "key": "theme-color",                      -   "value": "blue",                      -   "reason": "STATIC",                      -   "variant": "default"                               },              -   {                  -   "key": "non-existent-flag",                      -   "errorCode": "FLAG_NOT_FOUND",                      -   "errorDetails": "Flag 'non-existent-flag' was not found"                               }                   ],      -   "eventStreams": [          -   {                  -   "type": "sse",                      -   "url": "[https://sse.example.com/event-stream?channels=env_abc123_v1](https://sse.example.com/event-stream?channels=env_abc123_v1)",                      -   "inactivityDelaySec": 120                               }                   ],      -   "metadata": {          -   "version": "v12"                   }       }`