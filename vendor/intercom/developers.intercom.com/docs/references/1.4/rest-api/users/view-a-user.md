# View a User

## Example ID Request

```curl
$ curl \
-s https://api.intercom.io/users/5714dd359a3fd47136000001 \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept:application/json'
```

```curl
HTTP/1.1 200 OK

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
$ curl \
-s https://api.intercom.io/users?email=wash%40example.com \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept:application/json'
```

```ruby
intercom.users.find(:email => "bob@example.com")
```

```php
<?php

$user = $intercom->users->getUser("", ["email" => "plato@phil.com"]);
print_r($user->id);
?>
```

```java
Map<String, String> params = Maps.newHashMap();
params.put("email", "malcolm@example.com");
User user = User.find(params);
```

Each user object has its own URL

- `https://api.intercom.io/users/{id}`


Where `{id}` is the value of the user's `id` field. This URL is the user's canonical address in the API.

## Request Parameters

| Parameter | Required | Description |
|  --- | --- | --- |
| user_id | no | The user id you have defined for the user |
| email | no | The email you have defined for the user |


A user can also be fetched using a `user_id` in the url.

- `https://api.intercom.io/users?user_id={user_id}`


## Returns

A user object.

Note: When fetching users using an email or user_id parameter only the ones of type 'user' will be returned. However, it is possible to view a person of type 'contact' (lead) when viewing using their canonical address in the API, namely their id field.