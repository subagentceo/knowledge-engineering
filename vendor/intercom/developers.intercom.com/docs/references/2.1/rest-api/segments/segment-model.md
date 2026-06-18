# The segment model

## Example Segment Object

```json
{\n  \"type\": \"segment\",\n  \"id\": \"53203e244cba153d39000062\",\n  \"name\": \"New\",\n  \"created_at\": 1394621988,\n  \"updated_at\": 1394622004\n}
```

A segment is a group of your contacts defined by rules that you set. Contacts are automatically added to the segment every time the contact updates to match those rules. You can use [Search for contacts](/docs/references/2.1/rest-api/contacts/search-for-contacts) to find contacts that match the same rules.

### Segment Object

| Key | Type | Description |
|  --- | --- | --- |
| type | string | *value is segment'*. |
| id | string | The unique identifier representing the segment. |
| name | string | The name of the segment. |
| created_at | timestamp | The time the segment was created. |
| updated_at | timestamp | The time the segment was updated. |
| person_type | string | Type of the record: user or lead. |
| count | integer | The number of items in the user segment. It's returned when `include_count=true` is included in the request. |