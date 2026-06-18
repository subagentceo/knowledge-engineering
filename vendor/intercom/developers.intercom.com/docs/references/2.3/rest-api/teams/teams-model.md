# The team model

## Example Team Object

```json
{\n    \"type\": \"team\",\n    \"id\": \"814865\",\n    \"name\": \"Example Team\",\n    \"admin_ids\": [\n        493881\n    ]\n}
```

Teams are groups of admins in Intercom.

### Team Object

| Key | Type | Description |
|  --- | --- | --- |
| type | string | Value is `team`. |
| id | string | The id of the team |
| name | string | The name of the team |
| admin_ids | list | The list of admin id's that are a part of the team |