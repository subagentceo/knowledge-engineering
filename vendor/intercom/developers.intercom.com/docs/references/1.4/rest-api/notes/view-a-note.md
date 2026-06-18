# View a Note

## Example Request

```curl
$ curl https://api.intercom.io/notes/2 \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept: application/json'
```

```curl
HTTP/1.1 200 OK\n\n{\n  \"type\": \"note\",\n  \"id\": \"2\",\n  \"created_at\": 1389913951,\n  \"body\": \"<p>Text for my note</p>\",\n  \"user\": {\n      \"id\": \"5310d8e8598c9a0b24000005\",\n      \"type\": \"user\"\n    },\n  \"author\": {\n    \"type\": \"admin\",\n    \"id\": \"21\",\n    \"name\": \"Jayne Cobb\",\n    \"email\": \"jayne@example.com\",\n    \"avatar\" : {\n       \"type\":\"avatar\",\n      \"image_url\": \"http://example.org/128Jayne.jpg\"\n    },\n    \"companies\": []\n  }\n}
```

```ruby
intercom.notes.find(:id => note)
```

```php
<?php\n$note = $intercom->notes->getNote(\"9259097\");\n?>
```

```java
Note note = Note.find(\"2\");
```

Each note has its own URL -

* `https://api.intercom.io/notes/{id}`


Where `{id}` is the value of the note's `id` field. A `GET` request to a note's URL will return the note object.

### Returns

A note object.