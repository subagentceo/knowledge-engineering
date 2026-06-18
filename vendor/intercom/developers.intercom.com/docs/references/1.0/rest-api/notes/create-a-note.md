# Create a Note

## Example Request

```curl
$ curl https://api.intercom.io/notes \\\n-X POST \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept: application/json'  \\\n-H 'Content-Type: application/json' -d '\n{\n  \"admin_id\" : \"21\",\n  \"body\": \"Text for my note\",\n  \"user\": {\n    \"id\" : \"5310d8e8598c9a0b24000005\"\n  }\n}'
```

```curl
HTTP/1.1 200 OK\n\n{\n  \"type\": \"note\",\n  \"id\": \"16\",\n  \"created_at\": 1389913941,\n  \"body\": \"<p>Text for my note</p>\",\n  \"author\": {\n    \"type\": \"admin\",\n    \"id\": \"21\",\n    \"name\": \"Jayne Cobb\",\n    \"email\": \"jayne@example.com\",\n    \"companies\": []\n  },\n  \"user\": {\n    \"type\": \"user\",\n    \"id\": \"5310d8e8598c9a0b24000005\"\n  }\n}
```

```ruby
intercom.notes.create(:body => \"Text for the note\", :email => 'joe@example.com')
```

```php
<?php\n$intercom->notes->create([\n        \"body\" => \"Text for the note\",\n        \"user\" => ([\"id\" => \"4956efd9aad5c02fc4750ee9\"])]\n);\n?>
```

```java
User user = new User().setEmail(\"jayne@example.com\");\nAuthor author = new Author().setId(\"1\");\nNote note = new Note()\n  .setUser(user)\n  .setAuthor(author)\n  .setBody(\"Text for the note\");\nNote.create(note);
```

Notes can be created via a `POST` method to `https://api.intercom.io/notes`, which accepts a JSON object describing the note.

### Attributes

The table below shows the fields you can use to create a note -

| Argument | Required | Description |
|  --- | --- | --- |
| user | Yes | Representation of the user the note is to be created about. |
| user.user_id | one of | Your user_id for the user |
| user.email | one of | Your email address for the user |
| user.id | one of | The user id for the user |
| admin_id | No | The id of the admin creating the note. |
| body | Yes | The text of the note. |


### Returns

A note object. The submitted body may be enclosed with html `p` elements in the response.