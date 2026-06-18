# Retrieve a team

## Example Request & Response

```curl
$ curl https://api.intercom.io/teams/2744328 \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept: application/json'
```

```curl
HTTP/1.1 200 Ok

{
    "admin_ids": [
        646303,
        814860
    ],
    "id": "2744328",
    "name": "the_a_team",
    "type": "team"
}
```

You can fetch the details of a single team, containing an array of admins that belong to this team.

### Request Path Parameters

| Parameter | Type | Required? | Description |
|  --- | --- | --- | --- |
| id | String | Yes | The unique identifier of a given team. |


### Response

This will return a [Team Object](/docs/references/2.4/rest-api/teams/teams-model).