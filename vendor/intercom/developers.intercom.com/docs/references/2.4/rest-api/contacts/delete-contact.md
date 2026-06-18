# Delete a contact

## Example Request & Response

```curl
$ curl https://api.intercom.io/contacts/<id> \\\n-X DELETE \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept:application/json'
```

```http
HTTP/1.1 200 OK\n{\n  \"id\": \"5ba682d23d7cf92bef87bfd4\",\n  \"object\": \"contact\",\n  \"deleted\": true\n}
```

## Example Errors

### Contact not found

```http
HTTP/1.1 404 FOUND\n{\n  \"type\": \"error.list\",\n  \"request_id\": \"9a3d0816-9707-4598-977e-c009ba630148\",\n  \"errors\": [\n    {\n      \"code\": \"not_found\",\n      \"message\": \"Contact Not Found\"\n    }\n  ]\n}\n
```

You can delete a single contact.

### Request Path Parameters

| Parameter | Type | Required | Description |
|  --- | --- | --- | --- |
| id | String | Yes | The unique identifier for the contact which is given by Intercom |


### Response

This will return an object with details on the deleted contact.

| Attribute | Type | Description |
|  --- | --- | --- |
| id | String | The unique identifier for the contact which is given by Intercom |
| object | String | The type of object - `contact` |
| deleted | Boolean | Whether the contact has been deleted - `true` |