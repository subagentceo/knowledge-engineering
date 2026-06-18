# Targeting

Targeting allows you to enable Feature Flags for specific users or organizations. When a flag is enabled for a target, that target will receive the flag's enabled value instead of the default value.

## Add a feature flag target

Enables a feature flag for a specific target in the current environment. Currently, supported targets include users and organizations.

#### Request

## List enabled feature flags for an organization

Get a list of all enabled feature flags for an organization.

#### Request

#### Response

## List enabled feature flags for a user

Get a list of all enabled feature flags for the provided user. This includes feature flags enabled specifically for the user as well as any organizations that the user is a member of.

#### Request

#### Response

## Remove a feature flag target

Removes a target from the feature flag's target list in the current environment. Currently, supported targets include users and organizations.

#### Request

### flag_target

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `target_id` | string | Yes | The ID of the target (user or organization) that a Feature Flag is enabled for. |

### POST /feature-flags/{slug}/targets/{resourceId}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `resourceId` | string | Yes | The resource ID in format "user_&lt;id&gt;" or "org_&lt;id&gt;". |
| `slug` | string | Yes | The unique slug identifier of the feature flag. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `empty` | empty | Returns an empty response on success. |

### GET /organizations/{organizationId}/feature-flags

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `organizationId` | string | Yes | Unique identifier of the Organization. |
| `before` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. |
| `after` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. |
| `limit` | integer | No | Upper limit on the number of objects to return, between `1` and `100`. Defaults to `10`. |
| `order` | "normal" \| "desc" \| "asc" | No | Order the results by the creation time. Defaults to `desc`. |

### GET /user_management/users/{userId}/feature-flags

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `userId` | string | Yes | The ID of the user. |
| `before` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. |
| `after` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. |
| `limit` | integer | No | Upper limit on the number of objects to return, between `1` and `100`. Defaults to `10`. |
| `order` | "normal" \| "desc" \| "asc" | No | Order the results by the creation time. Defaults to `desc`. |

### DELETE /feature-flags/{slug}/targets/{resourceId}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `resourceId` | string | Yes | The resource ID in format "user_&lt;id&gt;" or "org_&lt;id&gt;". |
| `slug` | string | Yes | The unique slug identifier of the feature flag. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `empty` | empty | Returns an empty response on success. |