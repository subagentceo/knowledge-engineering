# List all teams

## Example Request & Response

```curl
$ curl https://api.intercom.io/teams \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept: application/json'
```

```curl
HTTP/1.1 200 Ok
{
    "teams": [
        {
            "admin_ids": [
                492881,
                1195856
            ],
            "id": "814865",
            "name": "BA_App",
            "type": "team"
        },
        {
            "admin_ids": [
                646303,
                814860
            ],
            "id": "2744328",
            "name": "the_a_team",
            "type": "team"
        }
    ],
    "type": "team.list"
}
```

You can fetch a list of all teams for a given workspace.

### Response

This will return a list of team objects for the App.

### Team List

| Attribute | Type | Description |
|  --- | --- | --- |
| type | string | Value is 'team.list' |
| teams | array | A list of team objects |