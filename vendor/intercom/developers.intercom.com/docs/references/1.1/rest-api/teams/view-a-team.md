# View a Team

## Retrieve a single team

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

Each admin object has its own URL, where the {id} is the value of the teams `id` field:

`https://api.intercom.io/teams/{id}`