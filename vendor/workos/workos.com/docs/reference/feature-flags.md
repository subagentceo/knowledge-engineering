# Feature Flags

# Feature Flags

Feature flags allow you to control feature availability for organizations in your application. Flags can either be enabled for individual organizations or all organizations in an environment. Read more about [how feature flags integrate with AuthKit here.](https://workos.com/docs/feature-flags)

### Feature Flag

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