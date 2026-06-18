# Retrieve a collection

## Example Request & Response (Multilingual Help Center)

```curl
$ curl https://api.intercom.io/help_center/collections/<id> \\\n-X GET \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept:application/json'\n-H 'Content-Type: application/json' -d
```

```http
HTTP/1.1 200 OK\n{\n  \"id\": 1,\n  \"type\": \"collection\",\n  \"workspace_id\": \"abcdef\",\n  \"name\": \"Collection 1\",\n  \"description\": \"English description\", \n  \"created_at\": 123456,\n  \"updated_at\": 123456,\n  \"url\": \"http://intercom.test/help/collection/collection-1\",\n  \"icon\": \"http://intercom/help_center/icon-1\",\n  \"order\": 0,\n  \"default_locale\": \"en\",\n  \"translated_content\": {\n    \"type\": \"group_translated_content\",\n    \"es\": {\n      \"type\": \"group_content\",\n      \"name\": \"Colección 1\",\n      \"description\": \"Spanish description\"\n    }\n  }\n}
```

You can fetch the details of a single collection by making a GET request to `https://api.intercom.io/help_center/collections/<id>`.

### Request Path Parameters

| Parameter | Type | Required? | Description |
|  --- | --- | --- | --- |
| id | String | Yes | The unique identifier for the collection which is given by Intercom. |


### Response

This will return a [Collection Model](/docs/references/2.4/rest-api/help-center/the-collection-section-models).