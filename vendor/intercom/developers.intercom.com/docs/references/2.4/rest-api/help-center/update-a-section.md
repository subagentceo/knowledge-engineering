# Update a section

## Example Request & Response (Multilingual Help Center)

```curl
$ curl https://api.intercom.io/help_center/sections/<id> \\\n-X PUT \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept:application/json'\n-H 'Content-Type: application/json' -d\n\n{\n  \"name\": \"New title\",\n  \"translated_content\": {\n    \"type\": \"group_translated_content\",\n    \"es\": {\n      \"type\": \"group_content\",\n      \"name\": \"Nuevo título\"\n    }\n  }\n}
```

```http
HTTP/1.1 200 OK\n{\n  \"id\": 1,\n  \"type\": \"section\",\n  \"workspace_id\": \"abcdef\",\n  \"name\": \"New title\",\n  \"created_at\": 123456,\n  \"updated_at\": 123456,\n  \"url\": \"http://intercom.test/help/sections/section-1\",\n  \"icon\": \"http://intercom/help_center/icon-1\",\n  \"parent_id\": \"1\",\n  \"order\": 0,\n  \"default_locale\": \"en\",\n  \"translated_content\": {\n  \t\"type\": \"group_translated_content\",\n    \"es\": {\n    \t\"type\": \"group_content\",\n      \"name\": \"Nuevo título\"\n    }\n  }\n}
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

This will return a [Section object](/docs/references/2.4/rest-api/help-center/the-collection-section-models) of the section you just updated.