# Tag Model

## Example Object

```json
{\n  \"id\": \"17513\",\n  \"name\": \"independent\",\n  \"type\": \"tag\"\n}
```

### Tag Object

A tag has a `name` and an `id` field. Once created the id field cannot be changed, but the name field can be updated later to allow tag renaming.

| Attribute | Type | Description |
|  --- | --- | --- |
| type | string | *value is 'tag'* |
| id | string | The id of the tag |
| name | string | The name of the tag |