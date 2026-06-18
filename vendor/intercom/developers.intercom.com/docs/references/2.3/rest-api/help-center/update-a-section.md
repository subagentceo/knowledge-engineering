# Update a section

## Example Request & Response (Multilingual Help Center)

```curl
$ curl https://api.intercom.io/help_center/sections/<id> \\-X PUT \\-H 'Authorization:Bearer <Your access token>' \\-H 'Accept:application/json'-H 'Content-Type: application/json' -d{  \"name\": \"New title\",  \"translated_content\": {    \"type\": \"group_translated_content\",    \"es\": {      \"type\": \"group_content\",      \"name\": \"Nuevo título\"    }  }}
```

```http
HTTP/1.1 200 OK{  \"id\": 1,  \"type\": \"section\",  \"workspace_id\": \"abcdef\",  \"name\": \"New title\",  \"created_at\": 123456,  \"updated_at\": 123456,  \"url\": \"http://intercom.test/help/sections/section-1\",  \"icon\": \"http://intercom/help_center/icon-1\",  \"parent_id\": \"1\",  \"order\": 0,  \"default_locale\": \"en\",  \"translated_content\": {    \"es\": {      \"name\": \"Nuevo título\"    }  }}
```

You can update the details of a single section by making a PUT request to `https://api.intercom.io/help_center/sections/<id>`.

### Request Path Parameters

| Parameter | Type | Required? | Description |
|  --- | --- | --- | --- |
| id | String | Yes | The unique identifier for the section which is given by Intercom. |


### Request Body Parameters

| Attribute | Type | Required? | Description |
|  --- | --- | --- | --- |
| name | String | No | The name of the section. For multilingual collections, this will be the name of the default language's content. |
| parent_id | String | No | The id for the collection this section will be within. |
| translated_content | Object | No | A [Group Translated Content Object](#group-translated-content-object) whereby you can specify multiple multilingual collections to be created. |


### Response

This will return a [Section object](/docs/references/2.3/rest-api/help-center/the-collection-section-models) of the section you just updated.