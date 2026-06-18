# List all sections

## Example Request & Response (Single Language Help Center)

```curl
$ curl https://api.intercom.io/help_center/sections \\\n-X GET \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept:application/json'\n-H 'Content-Type: application/json' -d
```

```http
HTTP/1.1 200 OK\n{\n  \"type\": \"list\",\n  \"pages\": {\n    \"type\": \"pages\",\n    \"page\": 1,\n    \"per_page\": 20,\n    \"total_pages\": 1\n  },\n  \"total_count\": 2,\n  \"data\": [\n    {\n      \"id\": 1,\n      \"type\": \"section\",\n      \"workspace_id\": \"abcdef\",\n      \"name\": \"Section 1\",\n      \"created_at\": 123456,\n      \"updated_at\": 123456,\n      \"parent_id\": \"1\",\n      \"url\": \"http://intercom.test/help/section/section-1\",\n      \"icon\": \"http://intercom/help_center/icon-1\",\n      \"parent_id\": \"1\",\n      \"order\": 0,\n      \"default_locale\": \"en\",\n      \"translated_content\": {\n      \t\"type\": \"group_translated_content\",\n        \"es\": {\n        \t\"type\": \"group_content\",\n          \"name\": \"Sección 1\"\n        }\n      }\n    },\n    {\n      \"id\": 2,\n      \"type\": \"section\",\n      \"workspace_id\": \"abcdef\",\n      \"name\": \"Section 2\",\n      \"created_at\": 123456,\n      \"updated_at\": 123456,\n\t\t\t\"parent_id\": \"1\",\n      \"url\": \"http://intercom.test/help/section/section-1\",\n      \"icon\": \"http://intercom/help_center/icon-1\",\n      \"parent_id\": \"1\",\n      \"order\": 0,\n      \"default_locale\": \"en\",\n      \"translated_content\": {\n      \t\"type\": \"group_translated_content\",\n        \"es\": {\n        \t\"type\": \"group_content\",\n          \"name\": \"Sección 2\"\n        }\n      }\n    }\n  ]\n}
```

You can fetch a list of all sections by making a GET request to `https://api.intercom.io/help_center/sections`.

### Response

| Key | Type | Description |
|  --- | --- | --- |
| type | String | The type of object - `list`. |
| pages | Object | A [Pages object](/docs/build-an-integration/learn-more/rest-apis/pagination) with the information needed to paginate through sections. |
| total_count | Integer | A count of the total number of sections. |
| data | Array | An array of [Section objects](/docs/references/2.5/rest-api/help-center/the-collection-section-models) |


How are the sections sorted and ordered?
Sections will be returned in descending order on the `updated_at` attribute. This means if you need to iterate through results then we'll show the most recently updated sections first.