# Update a collection

## Example Request & Response (Multilingual Help Center)

```curl
$ curl https://api.intercom.io/help_center/collection/<id> \\\n-X PUT \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept:application/json'\n-H 'Content-Type: application/json' -d\n\n{\n  \"name\": \"New title\",\n  \"translated_content\": {\n    \"es\": {\n      \"name\": \"Nuevo título\"\n    }\n  }\n}
```

```http
HTTP/1.1 200 OK\n{\n  \"id\": 1,\n  \"type\": \"collection\",\n  \"workspace_id\": \"abcdef\",\n  \"name\": \"New title\",\n  \"description\": \"English description\", \n  \"created_at\": 123456,\n  \"updated_at\": 123456,\n  \"url\": \"http://intercom.test/help/collection/collection-1\",\n  \"icon\": \"http://intercom/help_center/icon-1\",\n  \"order\": 0,\n  \"default_locale\": \"en\",\n  \"translated_content\": {\n    \"type\": \"group_translated_content\",\n    \"es\": {\n      \"type\": \"group_content\",\n      \"name\": \"Nuevo título\",\n      \"description\": \"Spanish description\"\n    }\n  }\n}
```

You can update the details of a single collection by making a PUT request to `https://api.intercom.io/help_center/collection/<id>`.

### Request Path Parameters

| Parameter | Type | Required? | Description |
|  --- | --- | --- | --- |
| id | String | Yes | The unique identifier for the collection which is given by Intercom. |


### Request Body Parameters

| Attribute | Type | Required? | Description |
|  --- | --- | --- | --- |
| name | String | No | The name of the collection.For multilingual collections, this will be the name of the default language's content. |
| description | String | No | The description of the collection.For multilingual articles, this will be the description of the default language's content. |
| translated_content | Object | No | A [Group Translated Content Object](/docs/references/2.6/rest-api/help-center/the-collection-section-models#group-translated-content-object) whereby you can specify multiple multilingual collections to be created. |


### Response

This will return a [Collection Model](/docs/references/2.6/rest-api/help-center/the-collection-section-models) of the collection you just updated.