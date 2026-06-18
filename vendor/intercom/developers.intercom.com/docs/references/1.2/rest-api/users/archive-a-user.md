# Archive a user

Permanently delete a user
The archive action will not perform a 'hard' delete. If you want to permanently delete your user then you will need to use the [**Permanently delete a user endpoint**](/docs/references/1.2/rest-api/users/delete-users).

## Example ID Archive Request

```curl
$ curl \\\n-s https://api.intercom.io/users/5321a20f72cdbb4192000013 \\\n-X DELETE \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept:application/json'
```

```curl
HTTP/1.1 200 Ok\n\n{\n    \"type\": \"user\",\n    \"id\": \"5714dd359a3fd47136000001\",\n    \"user_id\": \"25\",\n    \"anonymous\": false,\n    \"email\": \"email@example.com\",\n    \"phone\": \"555671243\",\n    \"name\": \"Joe Example\",\n    \"pseudonym\": null,\n  ...\n}\n# NB: Full User objects are returned
```

```ruby
user = intercom.users.find(:id => \"56e1e5d4a40df1cc57000101\")\nintercom.users.delete(user)
```

```php
<?php\n$intercom->users->deleteUser(\"596d3bfdd45d2162b28560ea\");\n?>\n
```

```java
User user = new User().setId(\"5310d8e8598c9a0b24000005\");\nUser.delete(user.getId());
```

## Example User ID Archive Request

```curl
$ curl \
-s https://api.intercom.io/users?user_id=25 \
-X DELETE \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept:application/json'
```

```curl
HTTP/1.1 200 Ok

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
user = intercom.users.find(:user_id => "1")
intercom.users.delete(user)
```

```java
Map<String, String> params = Maps.newHashMap();
params.put("user_id", "1");
user = User.find(params);
User.delete(user.getId());
```

```php
<?php
$intercom->users->deleteUser("", ["user_id" => "5087"]);
?>
```

## Example User Email Archive Request

```curl
$ curl \
-s https://api.intercom.io/users?email=wash%40example.com \
-X DELETE \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept:application/json'
```

```json
HTTP/1.1 200 Ok

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
user = intercom.users.find(:email => "foo@bar.com")
intercom.users.delete(user)
```

```java
Map<String, String> params = Maps.newHashMap();
params.put("email", "malcolm@example.com");
user = User.find(params);
User.delete(user.getId());
```

```php
<?php
$intercom->users->deleteUser("", ["email" => "test@example.com"]);
?>
```

A user can be archived by sending a DELETE request to its URL using the user's `id` field as part of the path -

- `https://api.intercom.io/users/{id}`


Alternatively, you can archive a user by sending a DELETE request using the `email` or `user_id` as query parameters -

- `https://api.intercom.io/users?email={email}`
- `https://api.intercom.io/users?user_id={user_id}`


### Request Parameters

| Parameter | Required | Description |
|  --- | --- | --- |
| email | no | The email you have defined for the user |
| user_id | no | The user id you have defined for the user |


Please note that when a user is archived, all of their conversations and message history will also be archived.

### Returns

A User object.