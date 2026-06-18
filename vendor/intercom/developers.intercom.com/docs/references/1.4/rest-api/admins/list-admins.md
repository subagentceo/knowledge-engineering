# List Admins

## List Admins

```curl
$ curl https://api.intercom.io/admins \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept: application/json'
```

```curl
HTTP/1.1 200 Ok\n{\n    \"type\": \"admin.list\",\n    \"admins\": [\n        {\n        \t\t\"type\": \"admin\",\n            \"id\": \"493881\",\n      \t\t\t\"name\": \"Joe Example\",\n      \t\t\t\"email\": \"email@example.com\"\n            \"away_mode_enabled\": false,\n            \"away_mode_reassign\": false,\n            \"team_ids\": [\n                814865\n            ]\n        },\n        {\n            \"type\": \"admin\",\n            \"email\": \"mal@example.com\",\n            \"id\": \"646303\",\n            \"name\": \"Malcolm Reynolds \",\n            \"away_mode_enabled\": true,\n            \"away_mode_reassign\": false,\n            \"team_ids\": [\n                814865\n            ]\n        },\n        {\n            \"type\": \"admin\",\n            \"email\": \"jayne@example.com\",\n            \"id\": \"1195856\",\n            \"name\": \"Jayne Cobb \",\n            \"away_mode_enabled\": false,\n            \"away_mode_reassign\": false,\n            \"team_ids\": [\n                814865\n            ]\n        },\n        {\n            \"type\": \"team\",\n            \"email\": null,\n            \"id\": \"814865\",\n            \"name\": \"SerenityTeam\",\n            \"away_mode_enabled\": false,\n            \"away_mode_reassign\": false,\n            \"admin_ids\": [\n                493881,\n                646303,\n                1195856\n            ]\n        }\n    ]\n}
```

```ruby
intercom.admins.all.each { ... }
```

```php
<?php\n$admins= $intercom->admins->getAdmins();\nforeach ($admins->admins as $admin) {\n    print_r($admin->id);\n}?>
```

```java
AdminCollection admins = Admin.list();\n// get first page...\nList<Admin> pageItems = admins.getPageItems();\n// ...or iterate over pages\nwhile (admins.hasNext()) {\n    System.out.println(admins.next().getName());\n}
```

An App's admins can be fetched by sending a `GET` request to `https://api.intercom.io/admins/`.

### Admin List

| Attribute | Type | Description |
|  --- | --- | --- |
| type | string | *value is 'admin.list'* |
| admins | array | A list of admin objects |
| pages | object | Optional. A pagination object, which may be empty, indicating no further pages to fetch. |


### Request Parameters

| Parameter | Required | Description |
|  --- | --- | --- |
| display_avatar | no | If set to `true`, the response will include the admin's avatar object containing the image URL. Defaults to false. |


### Returns

A list of admin objects for the App. The result may also have a `pages` object if the response is paginated.