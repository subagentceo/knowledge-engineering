# Create a collection

## Example Request & Response (Multilingual Help Center)

```curl
$ curl https://api.intercom.io/help_center/collections \\-X POST \\-H 'Authorization:Bearer <Your access token>' \\-H 'Accept:application/json'-H 'Content-Type: application/json' -d{  \"name\": \"Collection 1\",  \"description\": \"English description\",  \"translated_content\": {    \"es\": {      \"name\": \"Colección 1\",      \"description\": \"Spanish description\"    }  }}
```

```http
HTTP/1.1 200 OK{  \"id\": 1,  \"type\": \"collection\",  \"workspace_id\": \"abcdef\",  \"name\": \"Collection 1\",  \"description\": \"English description\",   \"created_at\": 123456,  \"updated_at\": 123456,  \"url\": \"http://intercom.test/help/collection/collection-1\",  \"icon\": \"http://intercom/help_center/icon-1\",  \"order\": 0,  \"default_locale\": \"en\",  \"translated_content\": {    \"type\": \"group_translated_content\",    \"es\": {      \"type\": \"group_content\",      \"name\": \"Colección 1\",      \"description\": \"Spanish description\"    }  }}
```

You can create a new collection by making a POST request to `https://api.intercom.io/help_center/collections`.

### Request Body Parameters

| Key | Type | Required? | Description |
|  --- | --- | --- | --- |
| name | String | Yes | The name of the collection. For multilingual collections, this will be the name of the default language's content. |
| description | String | No | The description of the collection. For multilingual collections, this will be the description of the default language's content. |
| translated_content | String | No | A [Group Translated Content Object](#group-translated-content-object) whereby you can specify multiple multilingual collections to be created. |


### Response

This will return a [Collection Model](/docs/references/2.1/rest-api/help-center/the-collection-section-models) of the collection you just created.