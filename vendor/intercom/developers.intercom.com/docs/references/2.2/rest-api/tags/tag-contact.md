# Attach a contact

## Example Request & Response

```curl
$ curl https://api.intercom.io/contacts/<id>/tags \\\n-X POST \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept:application/json' -d\n\n{\n\t\"id\": \"2084335\"\n}
```

```http
HTTP/1.1 200 OK\n{\n  \"type\": \"tag\",\n  \"id\": \"2084335\",\n  \"name\": \"Independent\"\n}\n
```

## Example Errors

```http
HTTP/1.1 404 NOT FOUND\n{\n  \"type\": \"error.list\",\n  \"request_id\": \"9a3d0816-9707-4598-977e-c009ba630148\",\n  \"errors\": [\n    {\n      \"code\": \"not_found\",\n      \"message\": \"Contact Not Found\"\n    }\n  ]\n}
```

```html
HTTP/1.1 404 NOT FOUND\n{\n  \"type\": \"error.list\",\n  \"request_id\": \"5f6b2623-f844-4914-8b8d-ac01acc62a76\",\n  \"errors\": [\n    {\n      \"code\": \"not_found\",\n      \"message\": \"Resource Not Found\"\n    }\n  ]\n}
```

You can tag a single contact.

### Request Path Parameter

| Parameter | Type | Required | Description |
|  --- | --- | --- | --- |
| id | String | Yes | The unique identifier for the contact which is given by Intercom |


### Request Body Parameter

| Parameter | Type | Required | Description |
|  --- | --- | --- | --- |
| id | String | Yes | The unique identifier for the tag which is given by Intercom |


### Response

This will return a [Tag model](/docs/references/2.2/rest-api/tags/tag-model) for the tag that was added to the contact.