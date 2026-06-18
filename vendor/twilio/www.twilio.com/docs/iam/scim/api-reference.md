# SCIM API reference

The SCIM API provides endpoints to manage organization users. All endpoints are compliant with SCIM 2.0 standards and are for organization-managed users only.

**Base URL**: `https://iam.twilio.com/scim/v2`

> \[!NOTE]
>
> Verify users' email domains in your organization before managing them through the [SCIM API](/docs/iam/organizations/domains).

## Create a user

Create a user using the SCIM core user schema.

`POST /scim/v2/Users`

### Requirements

This endpoint has the following requirements:

* The `userName` must match the primary email address (`emails[primary=true].value`).
* The user's email domain must be verified by the organization.
* Required fields: `userName`, `emails`.

After successful creation, the user receives a welcome email to reset their password. If SSO is enforced, the user can sign in with their password and is then asked to verify their email.

### Request body

```json
{
    "externalId": "36d02f84-1c1a-4409",
    "userName": "alex.a@example.com",
    "displayName": "Alex A.",
    "name": {
        "givenName": "Alex",
        "familyName": "A."
    },
    "emails": [
        {
            "primary": true,
            "value": "alex.a@example.com",
            "type": "work"
        }
    ],
    "active": true,
    "locale": "fr-FR",
    "timezone": "UTC",
    "schemas": [
        "urn:ietf:params:scim:schemas:core:2.0:User"
    ]
}
```

### Response

```json
{
    "id": "US00000000000000000000000000000123",
    "externalId": "36d02f84-1c1a-4409",
    "userName": "alex.a@example.com",
    "displayName": "Alex A.",
    "name": {
        "givenName": "Alex",
        "familyName": "A."
    },
    "emails": [
        {
            "primary": true,
            "value": "alex.a@example.com",
            "type": "work"
        }
    ],
    "active": true,
    "locale": "fr-FR",
    "timezone": "UTC",
    "schemas": [
        "urn:ietf:params:scim:schemas:core:2.0:User"
    ],
    "meta": {
        "resourceType": "user",
        "created": "2023-11-30T14:18:57.031225338Z",
        "lastModified": "2023-11-30T14:18:57.031225338Z",
        "version": "W/1"
    }
}
```

### Error responses

**409 Conflict** - External ID already exists:

```json
{
  "schemas": ["urn:ietf:params:scim:api:messages:2.0:Error"],
  "detail": "ExternalId already exists",
  "status": "409",
  "code": 25022
}
```

**400 Bad Request** - Primary email doesn't match username:

```json
{
  "schemas": ["urn:ietf:params:scim:api:messages:2.0:Error"],
  "detail": "Primary email must match username",
  "scimType": "invalidValue",
  "status": "400",
  "code": 25014
}
```

***

## Retrieve a user

Retrieve detailed information about a user by providing their user SID.

`GET /scim/v2/Users/{id}`

### Path parameters

| Name            | Description          |
| :-------------- | :------------------- |
| `id` (required) | The Twilio User SID. |

### Response

```json
{
    "id": "US00000000000000000000000000000123",
    "externalId": "36d02f84-1c1a-4409",
    "userName": "alex.a@example.com",
    "displayName": "Alex A.",
    "name": {
        "givenName": "Alex",
        "familyName": "A."
    },
    "emails": [
        {
            "primary": true,
            "value": "alex.a@example.com",
            "type": "work"
        }
    ],
    "active": true,
    "locale": "fr-FR",
    "timezone": "UTC",
    "schemas": [
        "urn:ietf:params:scim:schemas:core:2.0:User"
    ],
    "meta": {
        "resourceType": "user",
        "created": "2023-11-30T14:18:57.031225338Z",
        "lastModified": "2023-11-30T14:18:57.031225338Z",
        "version": "W/1"
    }
}
```

### Error response

**`404 Not Found`** - User not found:

```json
{
  "schemas": ["urn:ietf:params:scim:api:messages:2.0:Error"],
  "detail": "User not found",
  "status": "404",
  "code": 25008
}
```

***

## List users

Retrieve a list of users based on filter queries.

`GET /scim/v2/Users`

> \[!NOTE]
>
> SCIM pagination parameters (`startIndex`, `itemsPerPage`) are not supported.

### Query parameters

| Name     | Description                                                                                                                                                                               |
| :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `filter` | Filter by `userName` or `externalId`. Only the `eq` operator is supported.<br />Example: `?filter=userName eq "user@example.com"`<br />Example: `?filter=externalId eq "yFXk0vS3hrgu0q1"` |

### Response

```json
{
    "Resources": [
        {
            "id": "US00000000000000000000000000000123",
            "externalId": "36d02f84-1c1a-4409",
            "userName": "alex.a@example.com",
            "displayName": "Alex A.",
            "name": {
                "givenName": "Alex",
                "familyName": "A."
            },
            "emails": [
                {
                    "primary": true,
                    "value": "alex.a@example.com",
                    "type": "work"
                }
            ],
            "active": true,
            "locale": "fr-FR",
            "timezone": "UTC",
            "schemas": [
                "urn:ietf:params:scim:schemas:core:2.0:User"
            ],
            "meta": {
                "resourceType": "user",
                "created": "2023-11-30T14:18:57.031225338Z",
                "lastModified": "2023-11-30T14:18:57.031225338Z",
                "version": "W/1"
            }
        }
    ],
    "totalResults": 1,
    "schemas": [
        "urn:ietf:params:scim:api:messages:2.0:ListResponse"
    ]
}
```

***

## Update a user (PUT)

Update an existing user's SCIM user information. This operation replaces all user attributes.

`PUT /scim/v2/Users/{id}`

### Requirements

This endpoint has the following requirements:

* Only active and inactive users can be updated. Suspended users can't be updated.
* You can't update the Organization Owner through this endpoint.
* Requests that update email and username are allowed, but only when the two values match. Mismatched updates are rejected.

### Updatable fields

You can update the following fields:

* `active`
* `name.givenName`
* `name.familyName`
* `displayName`
* `timezone`
* `locale`
* `emails`
* `userName`

### Optimistic locking

Optimistic locking is performed in the following order of precedence:

1. The `If-Match` header, if present.
2. The `meta.version` field in the request body, if the header is not present.
3. No locking if neither is provided.

### Path parameters

| Name            | Description          |
| :-------------- | :------------------- |
| `id` (required) | The Twilio User SID. |

### Request body

```json
{
   "externalId": "36d02f84-1c1a-4410",
   "userName": "dana.b@example.com",
   "displayName": "Dana B.",
   "name": {
       "givenName": "Dana",
       "familyName": "B."
   },
   "emails": [
       {
           "primary": true,
           "value": "dana.b@example.com",
           "type": "work"
       }
   ],
   "active": true,
   "locale": "fr-FR",
   "timezone": "UTC",
   "schemas": [
       "urn:ietf:params:scim:schemas:core:2.0:User"
   ]
}
```

### Response

```json
{
    "id": "US00000000000000000000000000000124",
    "externalId": "36d02f84-1c1a-4410",
    "userName": "dana.b@example.com",
    "displayName": "Dana B.",
    "name": {
        "givenName": "Dana",
        "familyName": "B."
     },
     "emails": [
         {
            "primary": true,
            "value": "dana.b@example.com",
            "type": "work"
         }
    ],
    "active": true,
    "locale": "fr-FR",
    "timezone": "UTC",
    "schemas": [
        "urn:ietf:params:scim:schemas:core:2.0:User"
    ],
    "meta": {
        "resourceType": "user",
        "created": "2023-11-21T13:57:43.185004629Z",
        "lastModified": "2023-11-30T14:58:44.700924318Z",
        "version": "W/13"
    }
}
```

### Error response

**400 Bad Request** - Username must be present:

```json
{
  "schemas": ["urn:ietf:params:scim:api:messages:2.0:Error"],
  "detail": "UserName must be present",
  "scimType": "invalidValue",
  "status": "400",
  "code": 25005
}
```

***

## Update a user (PATCH)

Partially update an existing user's SCIM user information. This operation modifies only the specified attributes.

`PATCH /scim/v2/Users/{id}`

### Requirements

This endpoint has the following requirements:

* Only active and inactive users can be patched. Suspended users can't be patched.
* You can't update the Organization Owner through this endpoint.
* Requests that patch email and username are allowed, but they must match. Mismatched updates are rejected.
* If any operation violates business rules, the entire request is rejected.
* Operations with unrecognized paths are ignored to ensure maximum compatibility.

### Patchable fields

You can patch the following fields:

* `active`
* `name.givenName`
* `name.familyName`
* `displayName`
* `timezone`
* `locale`
* `emails`
* `userName`

### Optimistic locking

Optimistic locking is performed based on the `If-Match` header. If the header isn't present, optimistic locking isn't performed.

### Path parameters

| Name            | Description          |
| :-------------- | :------------------- |
| `id` (required) | The Twilio User SID. |

### Request body

```json
{
  "schemas": [
    "urn:ietf:params:scim:api:messages:2.0:PatchOp"
  ],
  "Operations": [
    {
      "op": "replace",
      "path": "name.givenName",
      "value": "Jordan"
    },
    {
      "op": "replace",
      "path": "name.familyName",
      "value": "C."
    },
    {
      "op": "replace",
      "path": "displayName",
      "value": "Jordan C."
    },
    {
      "op": "replace",
      "path": "active",
      "value": false
    },
    {
      "op": "replace",
      "path": "emails[primary eq true].value",
      "value": "jordan.c@example.com"
    }
  ]
}
```

### Response

```json
{
    "id": "US00000000000000000000000000000124",
    "externalId": "36d02f84-1c1a-4410",
    "userName": "jordan.c@example.com",
    "displayName": "Jordan C.",
    "name": {
        "givenName": "Jordan",
        "familyName": "C."
    },
    "emails": [
        {
            "primary": true,
            "value": "jordan.c@example.com",
            "type": "work"
        }
    ],
    "active": false,
    "locale": "fr-FR",
    "timezone": "UTC",
    "schemas": [
        "urn:ietf:params:scim:schemas:core:2.0:User"
    ],
    "meta": {
        "resourceType": "user",
        "created": "2023-11-21T13:57:43.185004629Z",
        "lastModified": "2023-11-30T14:58:44.700924318Z",
        "version": "W/13"
    }
}
```

### Error response

**400 Bad Request** - The primary email must match the username:

```json
{
  "schemas": ["urn:ietf:params:scim:api:messages:2.0:Error"],
  "detail": "Primary email must match username",
  "scimType": "invalidValue",
  "status": "400",
  "code": 25014
}
```

***

## Delete a user

Deactivate a user. Users aren't deleted; they're deactivated in response to delete requests.

`DELETE /scim/v2/Users/{id}`

> \[!NOTE]
>
> You can't deactivate the Organization Owner through this endpoint.

### Path parameters

| Name            | Description          |
| :-------------- | :------------------- |
| `id` (required) | The Twilio User SID. |

### Response

**204 No Content** - User successfully deactivated.

### Error response

**`404 Not Found`** - User not found:

```json
{
  "schemas": ["urn:ietf:params:scim:api:messages:2.0:Error"],
  "detail": "User not found",
  "status": "404",
  "code": 25008
}
```

***

## Error codes

For information about error codes returned by the SCIM API, see the [Twilio error codes reference](/docs/api/errors). The error code is in the `code` field of the response.

Example error response:

```json
{
  "schemas": ["urn:ietf:params:scim:api:messages:2.0:Error"],
  "detail": "User not found",
  "status": "404",
  "code": 25008
}
```
