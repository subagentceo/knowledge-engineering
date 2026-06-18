# Set an admin to away

You can set an Admin as away for the Inbox.

### Request Body Parameters

| Attribute | Type | Description |
|  --- | --- | --- |
| id | string | The id of the admin you want to set away mode or re-assign conversations. |
| away_mode_enabled | boolean | Set to 'true' to change the status of the admin to away. |
| away_mode_reassign | boolean | Set to 'true' to assign any new conversation replies to your default inbox. |


## Example Request & Response

```curl
$ curl https://api.intercom.io/admins/814860/away \\\n-X PUT \\\n-H 'Authorization: Bearer <Your access token>' \\\n-H 'Accept: application/json'  \\\n-H 'Content-Type: application/json' -d\n\n{\n  \"away_mode_enabled\": true,\n  \"away_mode_reassign\": false\n\n}
```

```text
HTTP/1.1 200 Ok\n\n{\n    \"type\": \"admin\",\n    \"id\": \"814860\",\n    \"name\": \"Joe Example\",\n    \"email\": \"email@example.com\",\n    \"away_mode_enabled\": true,\n    \"away_mode_reassign\": false,\n    \"team_ids\": [\n        814865\n    ]\n}
```

## Example Errors

### Admin without seat

```http
{\n    \"type\": \"error.list\",\n    \"request_id\": \"0002miv9og586ig3aln0\",\n    \"errors\": [\n        {\n            \"code\": \"action_forbidden\",\n            \"message\": \"This admin does not have Inbox access permissions\"\n        }\n    ]\n}
```

### Response

This will return an [Admin model](/docs/references/2.4/rest-api/admins/admin-model) of the admin set away.