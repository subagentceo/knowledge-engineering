# Retrieve a note

## Example Request

```curl
$ curl https://api.intercom.io/notes/<id> \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept: application/json'
```

```curl
HTTP/1.1 200 OK

{
  "type": "note",
  "id": "2",
  "created_at": 1389913951,
  "body": "<p>Text for my note</p>",
  "user": {
      "id": "5310d8e8598c9a0b24000005",
      "type": "user"
    },
  "author": {
    "type": "admin",
    "id": "21",
    "name": "Jayne Cobb",
    "email": "jayne@example.com",
    "avatar" : {
       "type":"avatar",
      "image_url": "http://example.org/128Jayne.jpg"
    },
    "companies": []
  }
}
```

```ruby
intercom.notes.find(:id => note)
```

```php
<?php
$note = $intercom->notes->getNote("9259097");
?>
```

```java
Note note = Note.find("2");
```

You can fetch the details of a single note.

### Request Path Parameters

| Parameter | Type | Required? | Description |
|  --- | --- | --- | --- |
| id | String | Yes | The unique identifier of a given note. |


### Response

This will return a [Note model](/docs/references/2.6/rest-api/notes/note-model).