# View a User

## Example ID Request

```curl
$ curl \
-s https://api.intercom.io/users/5714dd359a3fd47136000001 \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept:application/json'
```

```curl
{
    "type": "user",
    "id": "5714dd359a3fd47136000001",
    "user_id": "25",
    "anonymous": false,
    "email": "email@example.com",
    "phone": "555671243",
    "name": "Joe Example",
    "pseudonym": null,
  ...
}
# NB: Full User objects are returned
```

```ruby
intercom.users.find(:id => "5714dd359a3fd47136000001")
```

```php
<?php

$user = $intercom->users->getUser("596f35f744c4c5f0cd30c8ef");
print_r($user->id);
?>
```

## Example User ID Request

```curl
$ curl \
-s https://api.intercom.io/users?user_id=25 \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept:application/json'
```

```ruby
intercom.users.find(:user_id => "128")
```

```php
<?php

$user = $intercom->users->getUser("", ["user_id" => "111"]);
print_r($user->id);
?>
```

```java
Map<String, String> params = Maps.newHashMap();
params.put("user_id", "1");
User user = User.find(params);
```

## Example Email Request

```curl
$ curl \\\n-s https://api.intercom.io/users?email=wash%40example.com \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept:application/json'
```

```curl
HTTP/1.1 200 OK\n{\n  \"pages\": {\n    \"type\": \"pages\",\n    \"next\": null,\n    \"page\": 1,\n    \"per_page\": 50,\n    \"total_pages\": 1\n  },\n  \"total_count\": 1,\n  \"limited\": false,\n  \"type\": \"user.list\",\n  \"users\": [\n    {\n      \"type\": \"user\",\n      \"id\": \"5714dd359a3fd47136000001\",\n      \"user_id\": \"25\",\n      \"anonymous\": false,\n      \"email\": \"email@example.com\",\n      \"phone\": \"555671243\",\n      \"name\": \"Joe Example\",\n      \"pseudonym\": null\n    }\n  ]\n}\n# NB: Full User objects are returned
```

```ruby
intercom.users.find(:email => \"bob@example.com\")
```

```php
<?php\n\n$user = $intercom->users->getUser(\"\", [\"email\" => \"plato@phil.com\"]);\nprint_r($user->id);\n?>
```

```java
Map<String, String> params = Maps.newHashMap();\nparams.put(\"email\", \"malcolm@example.com\");\nUser user = User.find(params);
```

Each user object has its own URL

- `https://api.intercom.io/users/{id}`


Where `{id}` is the value of the user's `id` field. This URL is the user's canonical address in the API.

## Request Parameters

| Parameter | Required | Description |
|  --- | --- | --- |
| user_id | no | The user id you have defined for the user |
| email | no | The email you have defined for the user |


A user can also be fetched using a `user_id` or `email` parameter in the url, whose values are the company's `user_id` or `email` fields -

- `https://api.intercom.io/users?user_id={user_id}`
- `https://api.intercom.io/users?email={email}`


The `email` parameter value should be [url encoded](http://en.wikipedia.org/wiki/Percent-encoding) when sending.

## Returns

A user object.

Note: When fetching users using an email or user_id parameter only the ones of type 'user' will be returned. However, it is possible to view a person of type 'contact' (lead) when viewing using their canonical address in the API, namely their id field.