# Delete an article

## Example Request & Response (Multilingual Help Center)

```curl
$ curl https://api.intercom.io/articles/<id> \\\n-X DELETE \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept:application/json'\n-H 'Content-Type: application/json' -d
```

```http
HTTP/1.1 200 OK\n{\n  \"id\": 1,\n  \"object\": \"article\",\n  \"deleted\": true\n}
```

You can delete a single article by making a DELETE request to `https://api.intercom.io/articles/<id>`.

### Request Path Parameters

| Parameter | Type | Required? | Description |
|  --- | --- | --- | --- |
| id | String | Yes | The unique identifier for the article which is given by Intercom. |


### Response

| Key | Type | Description |
|  --- | --- | --- |
| id | String | The unique identifier for the article which you provided in the URL. |
| object | String | The type of object which was deleted - `article`. |
| deleted | Boolean | Whether the article was deleted successfully or not. |