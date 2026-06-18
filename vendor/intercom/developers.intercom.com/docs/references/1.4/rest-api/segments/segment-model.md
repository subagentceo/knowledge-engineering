# Segment Model

## Example Object

```json
{\n  \"type\": \"segment\",\n  \"id\": \"53203e244cba153d39000062\",\n  \"name\": \"New\",\n  \"created_at\": 1394621988,\n  \"updated_at\": 1394622004\n}
```

### Segment Object

A segment has a `name` and an `id` field along with `created_at` and `updated_at` timestamps. It can optionally include a count of the items in the segment when view or listing user segments.

| Attribute | Type | Description |
|  --- | --- | --- |
| type | string | *value is segment'* |
| id | string | The id representing the segment |
| name | string | The name of the segment |
| created_at | timestamp | The time the segment was created |
| updated_at | timestamp | The time the segment was updated |
| person_type | string | Type of the record: user or lead. |
| count | integer | The number of items in the user segment. It's returned when `include_count=true` is included in the request. |