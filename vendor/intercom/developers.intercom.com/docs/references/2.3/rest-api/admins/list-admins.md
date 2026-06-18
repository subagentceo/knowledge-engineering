# List all admins

## Example Request & Response

```curl
$ curl https://api.intercom.io/admins \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept: application/json'
```

```curl
HTTP/1.1 200 Ok
{
    "type": "admin.list",
    "admins": [
        {
            "type": "admin",
            "id": "493881",
            "name": "Joe Example",
            "email": "email@example.com"
            "away_mode_enabled": false,
            "away_mode_reassign": false,
            "has_inbox_seat": true,
            "team_ids": [
                814865
            ]
        },
        {
            "type": "admin",
            "email": "mal@example.com",
            "id": "646303",
            "name": "Malcolm Reynolds ",
            "away_mode_enabled": true,
            "away_mode_reassign": false,
            "has_inbox_seat": true,
            "team_ids": [
                814865
            ]
        },
        {
            "type": "admin",
            "email": "jayne@example.com",
            "id": "1195856",
            "name": "Jayne Cobb ",
            "away_mode_enabled": false,
            "away_mode_reassign": false,
            "has_inbox_seat": true,
            "team_ids": [
                814865
            ]
        },
        {
            "type": "team",
            "email": null,
            "id": "814865",
            "name": "SerenityTeam",
            "away_mode_enabled": false,
            "away_mode_reassign": false,
            "has_inbox_seat": true,
            "admin_ids": [
                493881,
                646303,
                1195856
            ]
        }
    ]
}
```

```ruby
intercom.admins.all.each { ... }
```

```php
<?php
$admins= $intercom->admins->getAdmins();
foreach ($admins->admins as $admin) {
    print_r($admin->id);
}?>
```

```java
AdminCollection admins = Admin.list();
// get first page...
List<Admin> pageItems = admins.getPageItems();
// ...or iterate over pages
while (admins.hasNext()) {
    System.out.println(admins.next().getName());
}
```

You can fetch a list of admins for a given workspace.

### Request Query Parameters

| Parameter | Required | Description |
|  --- | --- | --- |
| display_avatar | no | If set to `true`, the response will include the admin's avatar object containing the image URL. Defaults to false. |


### Response

This will return a list of [Admin Objects](/docs/references/2.3/rest-api/admins/admin-model) for a given workspace. The result may also have a `pages` object if the response is paginated.

### Admin List

| Attribute | Type | Description |
|  --- | --- | --- |
| type | string | *value is 'admin.list'* |
| admins | array | A list of admin objects |
| pages | object | Optional. A pagination object, which may be empty, indicating no further pages to fetch. |