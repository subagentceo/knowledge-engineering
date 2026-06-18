# Retrieve an admin

## Example Request & Response

```curl
$ curl https://api.intercom.io/admins/493881 \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept: application/json'
```

```curl
HTTP/1.1 200 Ok

{
    "type": "admin",
    "id": "493881",
    "name": "Joe Example",
    "email": "email@example.com",
    "away_mode_enabled": false,
    "away_mode_reassign": false,
    "team_ids": [
        814865
    ]
}
```

```php
<?php
$admin = $intercom->admins->getAdmin("493881");
?>
```

## Errors for admins without inbox seats

```http
{
    "type": "error.list",
    "request_id": "0002miv9og586ig3aln0",
    "errors": [
        {
            "code": "action_forbidden",
            "message": "This admin does not have Inbox access permissions"
        }
    ]
}
```

You can fetch the details of a single admin.

### Request Path Parameters

| Parameter | Type | Required? | Description |
|  --- | --- | --- | --- |
| id | String | Yes | The unique identifier of a given admin |


### Response

This will return an [Admin object](/docs/references/2.0/rest-api/admins/admin-model).