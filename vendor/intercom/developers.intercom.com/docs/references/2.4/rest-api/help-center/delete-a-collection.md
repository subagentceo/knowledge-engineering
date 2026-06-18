# Delete a collection

## Example Request & Response (Multilingual Help Center)

```curl
$ curl https://api.intercom.io/help_center/collections/<id> \\\n-X DELETE \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept:application/json'\n-H 'Content-Type: application/json' -d
```

```http
HTTP/1.1 200 OK\n{\n  \"id\": 1,\n  \"object\": \"collection\",\n  \"deleted\": true\n}
```

You can delete a single collection by making a DELETE request to `https://api.intercom.io/help_center/collections/<id>`.

### Request Path Parameters

| Parameter | Type | Required? | Description |
|  --- | --- | --- | --- |
| id | String | Yes | The unique identifier for the collection which is given by Intercom. |


### Response

| Key | Type | Description |
|  --- | --- | --- |
| id | String | The unique identifier for the collection which you provided in the URL. |
| object | String | The type of object which was deleted - `collection`. |
| deleted | Boolean | Whether the collections was deleted successfully or not. |