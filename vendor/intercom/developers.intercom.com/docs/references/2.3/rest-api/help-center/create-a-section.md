# Create a section

## Example Request & Response (Multilingual Help Center)

```curl
$ curl https://api.intercom.io/help_center/sections \\-X POST \\-H 'Authorization:Bearer <Your access token>' \\-H 'Accept:application/json'-H 'Content-Type: application/json' -d{  \"name\": \"Section 1\",  \"parent_id\": \"1\",  \"translated_content\": {    \"es\": {      \"name\": \"Sección 1\",      \"description\": \"Spanish description\"    }  }}
```

```http
HTTP/1.1 200 OK{  \"id\": 1,  \"type\": \"section\",  \"workspace_id\": \"abcdef\",  \"name\": \"Section 1\",  \"created_at\": 123456,  \"updated_at\": 123456,  \"url\": \"http://intercom.test/help/section/section-1\",  \"icon\": \"http://intercom/help_center/icon-1\",  \"parent_id\": \"1\",  \"order\": 0,  \"default_locale\": \"en\",  \"translated_content\": {    \"type\": \"group_translated_content\",    \"es\": {      \"type\": \"group_content\",      \"name\": \"Sección\"    }  }}
```

You can create a new section by making a POST request to `https://api.intercom.io/help_center/sections`.

### Request Body Parameters

| Key | Type | Required? | Description |
|  --- | --- | --- | --- |
| name | String | Yes | The name of the collection. For multilingual collections, this will be the name of the default language's content. |
| parent_id | String | Yes | The id for the collection this section will be within. |
| translated_content | String | No | A [Group Translated Content Object](#group-translated-content-object) whereby you can specify multiple multilingual collections to be created. |


### Response

This will return a [Section Model](/docs/references/2.3/rest-api/help-center/the-collection-section-models) of the section you just created.