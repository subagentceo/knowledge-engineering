# List attached tags

## Example Request & Response

```curl
$ curl https://api.intercom.io/contacts/<id>/tags \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept:application/json'
```

```http
HTTP/1.1 200 OK\n{\n  \"type\": \"tag.list\",\n  \"tags\": [\n    {\n      \"type\": \"tag\",\n      \"id\": \"2084335\",\n      \"name\": \"Independent\"\n    }\n  ]\n}
```

## Example Errors

### Contact not found

```http
HTTP/1.1 404 NOT FOUND\n{\n  \"type\": \"error.list\",\n  \"request_id\": \"9a3d0816-9707-4598-977e-c009ba630148\",\n  \"errors\": [\n    {\n      \"code\": \"not_found\",\n      \"message\": \"Contact Not Found\"\n    }\n  ]\n}
```

You can fetch a list of tags that are associated to a contact.

### Request Path Parameter

| Parameter | Type | Required | Description |
|  --- | --- | --- | --- |
| id | String | Yes | The unique identifier for the contact which is given by Intercom |


### Response

This will return a list of [Tag objects](/docs/references/2.6/rest-api/tags/tag-model).

| Attribute | Type | Description |
|  --- | --- | --- |
| type | String | The type of object - `tag.list` |
| tags | Array | An array containing Tag Objects |