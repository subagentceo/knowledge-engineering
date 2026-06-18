# Role Assignment API reference

The Role Assignment API lets you manage which roles are assigned to users within your organization. A role assignment connects a user to a role within a specific scope, such as your organization or an individual account.

**Base URL**: `https://iam.twilio.com/v2/Organizations`

## Authentication and authorization

The Role Assignment API is an organization-level API. You can only access it using OAuth credentials. Account Auth Tokens and API Keys aren't supported.

To create an OAuth app and generate an access token, follow the steps in [Set up OAuth](/docs/iam/scim/oauth-setup).

In subsequent requests, use the returned `access_token` as a `Bearer` token:

```http
Authorization: Bearer {access_token}
```

### Required OAuth app permissions

To call these endpoints, grant your OAuth app the following permissions. Configure these permissions on your OAuth app in the Twilio Console.

| Endpoint                 | Required permission                  |
| ------------------------ | ------------------------------------ |
| List role assignments    | `twilio/iam/role-assignments/list`   |
| Create a role assignment | `twilio/iam/role-assignments/create` |
| Delete a role assignment | `twilio/iam/role-assignments/delete` |

> \[!NOTE]
>
> The Role Assignment API doesn't support updating an existing role assignment. To change a user's role, delete the existing role assignment and create a new one.
>
> Bulk role assignment isn't supported. You can only create or delete one role assignment per request.

## Resource properties

| Property        | Type           | Description                                                                                                                   |
| --------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `sid`           | string         | The unique identifier for the role assignment. Starts with `IY`.                                                              |
| `role_sid`      | string         | The SID of the assigned role. Starts with `IX`.                                                                               |
| `scope`         | string         | The SID that defines where the role applies. Can be an Organization SID (`OR`), Account SID (`AC`), or Subaccount SID (`AC`). |
| `identity`      | string         | The SID of the user the role is assigned to. Starts with `US`.                                                                |
| `resource_type` | string or null | The resource type for resource-level role assignments.                                                                        |
| `resource_id`   | string or null | The resource ID for resource-level role assignments.                                                                          |

## List role assignments

Retrieve a paginated list of role assignments. You can filter by user identity, scope, resource type, and resource ID.

```http
GET /v2/Organizations/RoleAssignments
```

### Query parameters

| Parameter      | Type    | Necessity | Description                                                  |
| -------------- | ------- | --------- | ------------------------------------------------------------ |
| `Identity`     | string  | Optional  | Filter by user SID.                                          |
| `Scope`        | string  | Optional  | Filter by scope SID.                                         |
| `ResourceType` | string  | Optional  | Filter by resource type for resource-level role assignments. |
| `ResourceId`   | string  | Optional  | Filter by resource ID for resource-level role assignments.   |
| `PageSize`     | integer | Optional  | Number of results per page. Default: `50`, maximum: `100`.   |
| `PageToken`    | string  | Optional  | Token for fetching the next page of results.                 |

```bash {title="List role assignments example"}
curl -X GET 'https://iam.twilio.com/v2/Organizations/RoleAssignments?Identity=USaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' \
     -H 'Authorization: Bearer {access_token}' \
     -H 'Accept: application/json'
```

### Response

**`200 OK`**

```json
{
  "content": [
    {
      "sid": "IYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "role_sid": "IXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "scope": "ORaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "identity": "USaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "resource_type": null,
      "resource_id": null
    },
    {
      "sid": "IYbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
      "role_sid": "IXbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
      "scope": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "identity": "USaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "resource_type": null,
      "resource_id": null
    },
    {
      "sid": "IYcccccccccccccccccccccccccccccccc",
      "role_sid": "IXcccccccccccccccccccccccccccccccc",
      "scope": "ORaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "identity": "USaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "resource_type": "billing_group",
      "resource_id": "billing_group_1a2b3c4d5e6f7g8h9i0j1k2l3m"
    }
  ],
  "meta": {
    "page_size": 50,
    "page": 0,
    "key": "content",
    "first_page_url": "https://iam.twilio.com/v2/Organizations/RoleAssignments?PageSize=50&Page=0&Identity=USaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "previous_page_url": null,
    "next_page_url": null,
    "url": "https://iam.twilio.com/v2/Organizations/RoleAssignments?PageSize=50&Page=0&Identity=USaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  }
}
```

## Create a role assignment

Assign a role to a user within a specific scope.

```http
POST /v2/Organizations/RoleAssignments
```

### Request body

| Parameter       | Type   | Necessity | Description                                                                                           |
| --------------- | ------ | --------- | ----------------------------------------------------------------------------------------------------- |
| `role_sid`      | string | Required  | The SID of the role to assign. Starts with `IX`.                                                      |
| `scope`         | string | Required  | The SID that defines where the role applies. Can be an Organization SID (`OR`) or Account SID (`AC`). |
| `identity`      | string | Required  | The SID of the user to assign the role to. Starts with `US`.                                          |
| `resource_type` | string | Optional  | The resource type for resource-level role assignments.                                                |
| `resource_id`   | string | Optional  | The resource ID for resource-level role assignments.                                                  |

```bash {title="Organization scope request example"}
curl -X POST 'https://iam.twilio.com/v2/Organizations/RoleAssignments' \
     -H 'Authorization: Bearer {access_token}' \
     -H 'Content-Type: application/json' \
     -d '{
         "role_sid": "IXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
         "scope": "ORaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
         "identity": "USaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
     }'
```

```bash {title="Account scope request example"}
curl -X POST 'https://iam.twilio.com/v2/Organizations/RoleAssignments' \
     -H 'Authorization: Bearer {access_token}' \
     -H 'Content-Type: application/json' \
     -d '{
         "role_sid": "IXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
         "scope": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
         "identity": "USaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
     }'
```

```bash {title="Resource-level request example"}
curl -X POST 'https://iam.twilio.com/v2/Organizations/RoleAssignments' \
     -H 'Authorization: Bearer {access_token}' \
     -H 'Content-Type: application/json' \
     -d '{
         "role_sid": "IXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
         "scope": "ORaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
         "identity": "USaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
         "resource_type": "billing_group",
         "resource_id": "billing_group_1a2b3c4d5e6f7g8h9i0j1k2l3m"
     }'
```

### Response

**`201 Created`**

```json
{
  "sid": "IYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "role_sid": "IXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "scope": "ORaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "identity": "USaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "resource_type": "billing_group",
  "resource_id": "billing_group_1a2b3c4d5e6f7g8h9i0j1k2l3m"
}
```

### Error responses

**`400 Bad Request`** - Invalid parameters:

```json
{
  "code": 20001,
  "message": "Invalid request",
  "more_info": "https://www.twilio.com/docs/errors/20001",
  "status": 400
}
```

**`403 Forbidden`** - Insufficient permissions:

```json
{
  "code": 20003,
  "message": "Authorization denied",
  "more_info": "https://www.twilio.com/docs/errors/20003",
  "status": 403
}
```

## Delete a role assignment

Remove a role assignment from a user.

```http
DELETE /v2/Organizations/RoleAssignments/{RoleAssignmentSid}
```

### Path parameters

| Parameter           | Type   | Necessity | Description                                                 |
| ------------------- | ------ | --------- | ----------------------------------------------------------- |
| `RoleAssignmentSid` | string | Required  | The SID of the role assignment to delete. Starts with `IY`. |

```bash {title="Delete a role assignment example"}
curl -X DELETE 'https://iam.twilio.com/v2/Organizations/RoleAssignments/IYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' \
     -H 'Authorization: Bearer {access_token}'
```

### Response

**`204 No Content`** - Role assignment successfully deleted.

### Error responses

**`403 Forbidden`** - Insufficient permissions:

```json
{
  "code": 20003,
  "message": "Authorization denied",
  "more_info": "https://www.twilio.com/docs/errors/20003",
  "status": 403
}
```
