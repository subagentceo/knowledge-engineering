# Feature Flag

A Feature Flag controls feature availability for organizations and users in your application.

## Disable a feature flag

Disables a feature flag in the current environment.

#### Request

#### Response

## Enable a feature flag

Enables a feature flag in the current environment.

#### Request

#### Response

## Get a feature flag

Get the details of an existing feature flag by its slug.

#### Request

#### Response

## List feature flags

Get a list of all of your existing feature flags matching the criteria specified.

#### Request

#### Response

### feature_flag

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `object` | "feature_flag" | Yes | Distinguishes the Feature Flag object |
| `id` | string | Yes | Unique identifier of the Feature Flag. |
| `name` | string | Yes | A descriptive name for the Feature Flag. This field does not need to be unique. |
| `slug` | string | Yes | A unique key to reference the Feature Flag. |
| `description` | string \| null | Yes | A description for the Feature Flag. |
| `tags` | array | Yes | Labels assigned to the Feature Flag for categorizing and filtering. |
| `enabled` | boolean | Yes | Specifies whether the Feature Flag is active for the current environment. |
| `default_value` | boolean | Yes | The value returned for users and organizations who don't match any configured targeting rules. |
| `created_at` | string | Yes | The timestamp when the Feature Flag was last created. |
| `updated_at` | string | Yes | The timestamp when the Feature Flag was last updated. |

### PUT /feature-flags/{slug}/disable

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `slug` | string | Yes | A unique key to reference the Feature Flag. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `feature_flag` | object | Distinguishes the Feature Flag object. |

### PUT /feature-flags/{slug}/enable

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `slug` | string | Yes | A unique key to reference the Feature Flag. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `feature_flag` | object | Distinguishes the Feature Flag object. |

### GET /feature-flags/{slug}

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `slug` | string | Yes | A unique key to reference the Feature Flag. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `feature_flag` | object | Distinguishes the Feature Flag object. |

### GET /feature-flags

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `before` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. |
| `after` | string | No | An object ID that defines your place in the list. When the ID is not present, you are at the end of the list. |
| `limit` | integer | No | Upper limit on the number of objects to return, between `1` and `100`. Defaults to `10`. |
| `order` | "normal" \| "desc" \| "asc" | No | Order the results by the creation time. Defaults to `desc`. |