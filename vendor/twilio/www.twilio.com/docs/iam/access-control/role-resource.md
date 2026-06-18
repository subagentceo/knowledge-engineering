# Role API reference

The Role API lets you retrieve the list of roles available within your organization. Roles define a set of permissions that determine what actions a user can perform. To learn more about roles, see [types of roles](/docs/iam/access-control/types-of-roles).

**Base URL**: `https://iam.twilio.com/v2/Organizations`

## Authentication and authorization

The Role API is an Organization-level API. You can only access it using OAuth credentials. Account Auth Tokens and API Keys aren't supported.

To create an OAuth app and generate an access token, follow the steps in [Set up OAuth](/docs/iam/scim/oauth-setup).

In subsequent requests, use the returned `access_token` as a `Bearer` token:

```http
Authorization: Bearer {access_token}
```

### Required OAuth app permissions

To call this endpoint, grant your OAuth app the following permission. In the Twilio Console, configure this permission on your OAuth app.

| Endpoint   | Required permission                |
| ---------- | ---------------------------------- |
| List roles | `twilio/iam/role-assignments/list` |

## Resource properties

| Property               | Type          | Description                                                                                                                                 |
| ---------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `sid`                  | string        | The unique identifier for the role. Starts with `IX`.                                                                                       |
| `friendly_name`        | string        | A human-readable name for the role.                                                                                                         |
| `external_description` | string        | A description of what the role provides access to.                                                                                          |
| `product_group`        | string        | The product group this role belongs to (for example, `iam`, `billing`, `messaging`).                                                        |
| `lowest_level`         | string        | The lowest scope level at which this role can be assigned. One of `ORGANIZATION`, `ACCOUNT`, or `SUB_ACCOUNT`.                              |
| `role_product_group`   | object        | The product group details including `product_group` and `friendly_name`.                                                                    |
| `policy`               | object        | The permissions policy for this role, containing `allow` (array of permission strings), `deny` (array or null), and `format` (integer).     |
| `resource_types`       | array or null | The resource types this role can be scoped to for resource-level role assignments. Null if the role doesn't support resource-level scoping. |
| `date_created`         | string        | The date and time the role was created, in ISO 8601 format.                                                                                 |
| `date_updated`         | string        | The date and time the role was last updated, in ISO 8601 format.                                                                            |

## List roles

Retrieve a paginated list of roles available in your organization.

```http
GET /v2/Organizations/Roles
```

### Query parameters

| Parameter          | Type    | Necessity | Description                                                 |
| ------------------ | ------- | --------- | ----------------------------------------------------------- |
| `Search`           | string  | Optional  | Search by role name or SID.                                 |
| `RoleProductGroup` | string  | Optional  | Filter by product group.                                    |
| `Expand`           | boolean | Optional  | Expand policy details and permissions.                      |
| `ResourceTypes`    | string  | Optional  | Filter by comma-separated resource types.                   |
| `PageSize`         | integer | Optional  | Number of results per page. Default: `50`, maximum: `1000`. |
| `PageToken`        | string  | Optional  | Token for fetching the next page of results.                |

```bash {title="Example request"}
curl -X GET 'https://iam.twilio.com/v2/Organizations/Roles' \
     -H 'Authorization: Bearer {access_token}' \
     -H 'Accept: application/json'
```

### Response

**`200 OK`**

```json
{
  "roles": [
    {
      "sid": "IXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "friendly_name": "Example Viewer",
      "external_description": "View-only access to example resources within the organization",
      "product_group": "billing",
      "lowest_level": "ORGANIZATION",
      "role_product_group": {
        "product_group": "billing",
        "friendly_name": "Billing"
      },
      "policy": {
        "allow": [
          "/twilio/billing/billing-profile/read",
          "/twilio/billing/payment-methods/list",
          "/twilio/billing/receipts/list",
          "/twilio/billing/invoice.statements/list"
        ],
        "deny": null,
        "format": 1
      },
      "resource_types": null,
      "date_created": "2025-01-15T10:30:00Z",
      "date_updated": "2025-02-20T14:45:00Z"
    }
  ],
  "meta": {
    "page_size": 50,
    "page": 0,
    "key": "roles",
    "first_page_url": "https://iam.twilio.com/v2/Organizations/Roles?PageSize=50&Page=0",
    "previous_page_url": null,
    "next_page_url": null,
    "url": "https://iam.twilio.com/v2/Organizations/Roles?PageSize=50&Page=0"
  }
}
```

```bash {title="Filter by product group example"}
curl -X GET 'https://iam.twilio.com/v2/Organizations/Roles?RoleProductGroup=billing' \
     -H 'Authorization: Bearer {access_token}' \
     -H 'Accept: application/json'
```

```bash {title="Search for roles example"}
curl -X GET 'https://iam.twilio.com/v2/Organizations/Roles?Search=billing' \
     -H 'Authorization: Bearer {access_token}' \
     -H 'Accept: application/json'
```
