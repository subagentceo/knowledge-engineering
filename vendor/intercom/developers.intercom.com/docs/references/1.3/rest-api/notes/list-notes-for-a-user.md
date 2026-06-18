# List Notes for a User

## Example User ID Request

```curl
$ curl https://api.intercom.io/notes?user_id=25 \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept: application/json'
```

```ruby
intercom.notes.find_all(:user_id => '123').each {|note| puts note.body}
```

```php
<?php
$notes = $intercom->notes->getNotes(["user_id" => "20413"]);
foreach ($notes->notes as $note) {
    print "id:".$note->id." body:".$note->body."\n";
}
?>
```

```java
Map<String, String> params = Maps.newHashMap();
params.put("user_id", "123");
NoteCollection notes = Note.list(params);
while (notes.hasNext()) {
    out.println(notes.next().getBody());
}
```

## Example Email Request

```curl
$ curl https://api.intercom.io/notes?email=jayne%40example.com \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept: application/json'
```

```curl
HTTP/1.1 200 OK\n\n{\n  \"type\": \"note.list\",\n  \"notes\": [\n    {\n      \"type\": \"note\",\n      \"id\": \"1\",\n      \"created_at\": 1389913941,\n      \"body\": \"<p>Text for my note</p>\",\n      \"author\": {\n        \"type\": \"admin\",\n        \"id\": \"21\",\n        \"name\": \"Jayne Cobb\",\n        \"email\": \"jayne@example.com\",\n        \"companies\": []\n      },\n      \"user\": {\n        \"type\": \"user\",\n        \"id\": \"5310d8e8598c9a0b24000005\"\n      }\n    },\n    {\n      \"type\": \"note\",\n      \"id\": \"2\",\n      \"created_at\": 1389913951,\n      \"body\": \"<p>Text for my note</p>\",\n      \"user\": {\n          \"id\": \"5310d8e8598c9a0b24000005\",\n          \"type\": \"user\"\n        }\n    }\n  ],\n  \"pages\": {}\n}
```

```ruby
intercom.notes.find_all(:email => 'foo@bar.com').each {|note| puts note.body}
```

```php
<?php\n$notes = $intercom->notes->getNotes([\"email\" => \"plato@phil.com\"]);\n\nforeach ($notes->notes as $note) {\n    print \"id:\".$note->id.\" body:\".$note->body.\"\\n\";\n}\n?>
```

```java
Map<String, String> params = Maps.newHashMap();\nparams.put(\"email\", \"malcolm@example.com\");\nnotes = Note.list(params);\nwhile (notes.hasNext()) {\n    out.println(notes.next().getBody());\n}
```

## Example ID Request

```curl
$ curl \
https://api.intercom.io/notes?id=5310d8e8598c9a0b24000005 \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept: application/json'
```

```ruby
# Not exposed in Ruby client
```

```php
<?php
$notes = $intercom->notes->getNotes(["id" => "5965efd9aad5c02fc4750ee6"]);
foreach ($notes->notes as $note) {
    print "id:".$note->id." body:".$note->body."\n";
}
?>
```

```java
Map<String, String> params = Maps.newHashMap();
params.put("id", "5310d8e8598c9a0b24000005");
notes = Note.list(params);
while (notes.hasNext()) {
    out.println(notes.next().getBody());
}
```

A user's notes can be fetched by using a `GET` request to `https://api.intercom.io/notes` with an Intercom user `id` or `user_id` or `email` query parameter.

The value of the `email` parameter should be [url encoded](http://en.wikipedia.org/wiki/Percent-encoding) before sending.

### Parameters

| Parameter | Required | Description |
|  --- | --- | --- |
| user_id | one of | The user id you have defined for the user |
| email | one of | The email you have defined for the user |
| id | one of | The Intercom defined id representing the user |


### Returns

A list of note objects for that User.

### Note List Object

| Attribute | Type | Description |
|  --- | --- | --- |
| type | string | *value is 'note.list'* |
| notes | array | A list of note objects |