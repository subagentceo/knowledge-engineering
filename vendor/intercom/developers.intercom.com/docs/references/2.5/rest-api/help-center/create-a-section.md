# Create a section

## Example Request & Response (Multilingual Help Center)

```curl
$ curl https://api.intercom.io/help_center/sections \\\n-X POST \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept:application/json'\n-H 'Content-Type: application/json' -d\n\n{\n  \"name\": \"Section 1\",\n  \"parent_id\": \"1\",\n  \"translated_content\": {\n  \t\"type\": \"group_translated_content\",\n    \"es\": {\n      \"type\": \"group_content\",\n      \"name\": \"Sección 1\",\n      \"description\": \"Spanish description\"\n    }\n  }\n}
```

```http
HTTP/1.1 200 OK\n{\n  \"id\": 1,\n  \"type\": \"section\",\n  \"workspace_id\": \"abcdef\",\n  \"name\": \"Section 1\",\n  \"created_at\": 123456,\n  \"updated_at\": 123456,\n  \"url\": \"http://intercom.test/help/section/section-1\",\n  \"icon\": \"http://intercom/help_center/icon-1\",\n  \"parent_id\": \"1\",\n  \"order\": 0,\n  \"default_locale\": \"en\",\n  \"translated_content\": {\n    \"type\": \"group_translated_content\",\n  \t\"type\": \"group_translated_content\",\n    \"es\": {\n    \t\"type\": \"group_content\",\n      \"type\": \"group_content\",\n      \"name\": \"Sección\"\n    }\n  }\n}
```

You can create a new section by making a POST request to `https://api.intercom.io/help_center/sections`.

### Request Body Parameters

| Key | Type | Required? | Description |
|  --- | --- | --- | --- |
| name | String | Yes | The name of the collection. For multilingual collections, this will be the name of the default language's content. |
| parent_id | String | Yes | The id for the collection this section will be within. |
| translated_content | String | No | A [Group Translated Content Object](#group-translated-content-object) whereby you can specify multiple multilingual collections to be created. |


### Response

This will return a [Section Model](/docs/references/2.5/rest-api/help-center/the-collection-section-models) of the section you just created.