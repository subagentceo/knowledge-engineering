# Update a collection

## Example Request & Response (Multilingual Help Center)

```curl
$ curl https://api.intercom.io/help_center/collection/<id> \\-X PUT \\-H 'Authorization:Bearer <Your access token>' \\-H 'Accept:application/json'-H 'Content-Type: application/json' -d{  \"name\": \"New title\",  \"translated_content\": {    \"es\": {      \"name\": \"Nuevo título\"    }  }}
```

```http
HTTP/1.1 200 OK{  \"id\": 1,  \"type\": \"collection\",  \"workspace_id\": \"abcdef\",  \"name\": \"New title\",  \"description\": \"English description\",   \"created_at\": 123456,  \"updated_at\": 123456,  \"url\": \"http://intercom.test/help/collection/collection-1\",  \"icon\": \"http://intercom/help_center/icon-1\",  \"order\": 0,  \"default_locale\": \"en\",  \"translated_content\": {    \"type\": \"group_translated_content\",    \"es\": {      \"type\": \"group_content\",      \"name\": \"Nuevo título\",      \"description\": \"Spanish description\"    }  }}
```

You can update the details of a single collection by making a PUT request to `https://api.intercom.io/help_center/collection/<id>`.

### Request Path Parameters

| Parameter | Type | Required? | Description |
|  --- | --- | --- | --- |
| id | String | Yes | The unique identifier for the collection which is given by Intercom. |


### Request Body Parameters

| Attribute | Type | Required? | Description |
|  --- | --- | --- | --- |
| name | String | No | The name of the collection. For multilingual collections, this will be the name of the default language's content. |
| description | String | No | The description of the collection. For multilingual articles, this will be the description of the default language's content. |
| translated_content | Object | No | A [Group Translated Content Object](#group-translated-content-object) whereby you can specify multiple multilingual collections to be created. |


### Response

This will return a [Collection Model](/docs/references/2.5/rest-api/help-center/the-collection-section-models) of the collection you just updated.