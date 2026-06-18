# View an Admin

## Retrieve a single admin

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

Each admin object has its own URL, where the {id} is the value of the admins `id` field:

`https://api.intercom.io/admins/{id}`