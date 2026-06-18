# List attached segments for contact

## Example Request & Response

```curl
$ curl https://api.intercom.io/contacts/<id>/segments \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept:application/json'
```

```http
HTTP/1.1 200 OK\n{\n  \"type\": \"list\",\n  \"data\": [\n    {\n      \"type\": \"segment\",\n  \t\t\"id\": \"53203e244cba153d39000062\",\n  \t\t\"name\": \"New\",\n  \t\t\"created_at\": 1394621988,\n  \t\t\"updated_at\": 1394622004\n    }\n  ]\n}
```

## Example Errors

### Contact not found

```http
HTTP/1.1 404 NOT FOUND\n{\n  \"type\": \"error.list\",\n  \"request_id\": \"9a3d0816-9707-4598-977e-c009ba630148\",\n  \"errors\": [\n    {\n      \"code\": \"not_found\",\n      \"message\": \"Contact Not Found\"\n    }\n  ]\n}
```

You can fetch a list of segments that are associated to a contact.

### Request Path Parameter

| Parameter | Type | Required | Description |
|  --- | --- | --- | --- |
| id | String | Yes | The unique identifier for the contact which is given by Intercom |


### Response

This will return a list of [Segment objects](/docs/references/2.5/rest-api/segments/segment-model).

| Attribute | Type | Description |
|  --- | --- | --- |
| type | String | The type of object - `list` |
| data | Array | An array containing Segment Objects |