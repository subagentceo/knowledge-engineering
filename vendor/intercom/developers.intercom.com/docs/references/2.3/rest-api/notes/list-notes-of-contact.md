# List all notes

## Example Request & Response

```curl
$ curl https://api.intercom.io/contacts/<id>/notes \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept:application/json'
```

```http
HTTP/1.1 200 OK\n{\n  \"type\": \"note.list\",\n  \"data\": [\n    {\n      \"type\": \"note\",\n      \"id\": \"12345\",\n      \"created_at\": 1569943728,\n      \"user\": {\n        \"type\": \"user\",\n        \"id\": \"5ba682d23d7cf92bef87bfd4\"\n      },\n      \"author\": {\n        \"type\": \"admin\",\n        \"id\": \"12345\",\n        \"name\": \"Test\",\n        \"email\": \"test@test.io\",\n        \"away_mode_enabled\": false,\n        \"away_mode_reassign\": false,\n        \"avatar\": {\n          \"image_url\": \"https://test.test\"\n        }\n      },\n      \"body\": \"<p>test note</p>\"\n    }\n  ],\n  \"pages\": {\n      \"type\": \"pages\",\n       \"next\": null,\n       \"page\": 1,\n       \"per_page\": 20,\n       \"total_pages\": 1\n   },\n   \"total_count\": 1\n}\n
```

## Example Errors

### Contact not found

```http
HTTP/1.1 404 NOT FOUND\n{\n  \"type\": \"error.list\",\n  \"request_id\": \"9a3d0816-9707-4598-977e-c009ba630148\",\n  \"errors\": [\n    {\n      \"code\": \"not_found\",\n      \"message\": \"Contact Not Found\"\n    }\n  ]\n}
```

You can fetch a list of notes that are associated to a contact.

### Request Path Parameter

| Parameter | Type | Required | Description |
|  --- | --- | --- | --- |
| id | String | Yes | The unique identifier for the contact which is given by Intercom |


### Response

This will return a [paginated](/docs/build-an-integration/learn-more/rest-apis/pagination) list of [Note objects](/docs/references/2.3/rest-api/notes/note-model).

| Attribute | Type | Description |
|  --- | --- | --- |
| type | String | The type of object - `note.list` |
| data | Array | An array containing Note Objects |
| total_count | Integer | The total number of companies associated to this contact |
| pages | [Pagination Object](/docs/build-an-integration/learn-more/rest-apis/pagination-cursor) | The information needed to paginate through companies |