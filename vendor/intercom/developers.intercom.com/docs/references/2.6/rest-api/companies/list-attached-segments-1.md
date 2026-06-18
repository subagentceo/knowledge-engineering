# List attached segments for companies

## Example Request & Response

```curl
$ curl https://api.intercom.io/companies/<id>/segments \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept:application/json'
```

```http
HTTP/1.1 200 OK\n{\n  \"type\": \"list\",\n  \"data\": [\n    {\n      \"type\": \"segment\",\n  \t\t\"id\": \"53203e244cba153d39000062\",\n  \t\t\"name\": \"New\",\n  \t\t\"created_at\": 1394621988,\n  \t\t\"updated_at\": 1394622004\n    }\n  ]\n}
```

## Example Errors

### company_not_found

```http
HTTP/1.1 404 NOT FOUND\n{\n  \"type\": \"error.list\",\n  \"request_id\": \"9a3d0816-9707-4598-977e-c009ba630148\",\n  \"errors\": [\n    {\n      \"code\": \"not_found\",\n      \"message\": \"Company Not Found\"\n    }\n  ]\n}\n}\n
```

You can fetch a list of all segments that belong to a company.

### Response

This will return a list of [Segment objects](/docs/references/2.6/rest-api/segments/segment-model).

| Attribute | Type | Description |
|  --- | --- | --- |
| type | String | The type of object - `list` |
| data | Array | An array containing Segment Objects |