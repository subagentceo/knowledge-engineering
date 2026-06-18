# Set admin away mode

**Set away mode**
If you want to set an admin in away mode you can do this via a PUT request. You can also choose whether you want conversation replies to be automatically reassigned to your default inbox if you like. For more about away mode please see [**here**](https://docs.intercom.com/support-and-retain-customers/set-expectations/automatically-reassign-conversations-when-youre-away).

| Attribute | Type | Description |
|  --- | --- | --- |
| id | string | The id of the admin you want to set away mode or re-assign conversations. |
| away_mode_enabled | boolean | Set to 'true' to change the status of the admin to away. |
| away_mode_reassign | boolean | Set to 'true' to assign any new conversation replies to your default inbox. |


```curl
$ curl https://api.intercom.io/admins/814860/away \
-X PUT \
-H 'Authorization: Bearer <Your access token>' \
-H 'Accept: application/json'  \
-H 'Content-Type: application/json' \
-d 	'
{
  "id": 814860,
  "away_mode_enabled": true,
  "away_mode_reassign": false

}'
```

```text
HTTP/1.1 200 Ok

{
    "type": "admin",
    "id": "814860",
    "name": "Joe Example",
    "email": "email@example.com",
    "away_mode_enabled": true,
    "away_mode_reassign": false,
    "team_ids": [
        814865
    ]
}
```