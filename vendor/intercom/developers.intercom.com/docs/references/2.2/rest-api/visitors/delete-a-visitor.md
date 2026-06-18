# Delete a visitor

## Example Request & Response

```curl
$ curl \\\nhttps://api.intercom.io/visitors/<id> \\\n-X DELETE \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept:application/json'
```

```curl
HTTP/1.1 200 Ok\n\n{\n  \"type\": \"visitor\",\n  \"id\": \"530370b477ad7120001d\",\n  \"user_id\": \"8a88a590-e1c3-41e2-a502-e0649dbf721c\"\n  ...\n}\n
```

You can delete a single visitor.

### Request Path Parameters

| Parameter | Type | Required | Description |
|  --- | --- | --- | --- |
| id | String | Yes | The unique identifier for the visitor which is given by Intercom. |


### Response

This will return a [Visitor Model](/docs/references/2.2/rest-api/visitors/visitor-object) of the visitor you just deleted.