# Create a note for contact

## Example Request & Response

```curl
$ curl \"https://api.intercom.io/contacts/<id>/notes\" \\\n-X POST \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept:application/json' -d {\"body\": \"Shiny\", \"admin_id\": \"12345\"}\n
```

```http
HTTP/1.1 200 OK\n{\n  \"type\": \"note\",\n  \"id\": \"12345\",\n  \"created_at\": 1569943728,\n  \"user\": {\n    \"type\": \"user\",\n    \"id\": \"5ba682d23d7cf92bef87bfd4\"\n  },\n  \"author\": {\n    \"type\": \"admin\",\n    \"id\": \"12345\",\n    \"name\": \"Test\",\n    \"email\": \"test@test.io\",\n    \"away_mode_enabled\": false,\n    \"away_mode_reassign\": false,\n    \"avatar\": {\n      \"image_url\": \"https://test.test\"\n    }\n  },\n  \"body\": \"<p>Shiny</p>\"\n}
```

## Example Errors

```http
HTTP/1.1 404 NOT FOUND\n{\n  \"type\": \"error.list\",\n  \"request_id\": \"9a3d0816-9707-4598-977e-c009ba630148\",\n  \"errors\": [\n    {\n      \"code\": \"not_found\",\n      \"message\": \"Contact Not Found\"\n    }\n  ]\n}
```

```http
HTTP/1.1 404 NOT FOUND\n{\n  \"type\": \"error.list\",\n  \"request_id\": \"9a3d0816-9707-4598-977e-c009ba630148\",\n  \"errors\": [\n    {\n      \"code\": \"not_found\",\n      \"message\": \"Resource Not Found\"\n    }\n  ]\n}
```

You can create a note to a single contact.

### Request Path Parameter

| Parameter | Type | Required? | Description |
|  --- | --- | --- | --- |
| id | String | Yes | The unique identifier for the contact which is given by Intercom. |


### Request Body Parameter

| Parameter | Type | Required? | Description |
|  --- | --- | --- | --- |
| body | String | Yes | The text of the note. |
| admin_id | String | Yes | The unique identifier for the admin which is given by Intercom. |


### Response

This will return a [Note model](/docs/references/2.0/rest-api/notes/note-model) for the note that was added to the contact.