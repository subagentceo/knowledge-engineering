# JWT template

#### Example JWT template

## Get JWT template

Get the JWT template for the current environment.

#### Request

#### Response

## Update JWT template

Update the JWT template for the current environment.

#### Request

#### Response

### jwt_template

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `object` | "jwt_template" | Yes | The object type. |
| `content` | string | Yes | The JWT template content as a Liquid template string. |
| `created_at` | string | Yes | The timestamp when the JWT template was created. |
| `updated_at` | string | Yes | The timestamp when the JWT template was last updated. |

### /user_management/jwt_template

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `content` | string | Yes | The JWT template content as a Liquid template string. |