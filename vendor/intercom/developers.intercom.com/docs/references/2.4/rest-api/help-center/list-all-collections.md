# List all collections

## Example Request & Response (Single Language Help Center)

```curl
$ curl https://api.intercom.io/help_center/collections \\\n-X GET \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept:application/json'\n-H 'Content-Type: application/json' -d
```

```http
HTTP/1.1 200 OK\n{\n  \"type\": \"list\",\n  \"pages\": {\n    \"type\": \"pages\",\n    \"page\": 1,\n    \"per_page\": 20,\n    \"total_pages\": 1\n  },\n  \"total_count\": 2,\n  \"data\": [\n    {\n      \"id\": 1,\n      \"type\": \"collection\",\n      \"workspace_id\": \"abcdef\",\n      \"name\": \"Collection 1\",\n      \"description\": \"English description 1\", \n      \"created_at\": 123456,\n      \"updated_at\": 123456,\n      \"url\": \"http://intercom.test/help/collection/collection-1\",\n      \"icon\": \"http://intercom/help_center/icon-1\",\n      \"order\": 0\n    },\n    {\n      \"id\": 2,\n      \"type\": \"collection\",\n      \"workspace_id\": \"abcdef\",\n      \"name\": \"Collection 2\",\n      \"description\": \"English description 2\", \n      \"created_at\": 123456,\n      \"updated_at\": 123456,\n      \"url\": \"http://intercom.test/help/collection/collection-2\",\n      \"icon\": \"http://intercom/help_center/icon-1\",\n      \"order\": 1\n    }\n  ]\n}
```

You can fetch a list of all collections by making a GET request to `https://api.intercom.io/help_center/collections`.

### Response

| Key | Type | Description |
|  --- | --- | --- |
| type | String | The type of object - `list`. |
| pages | Object | A [Pages object](/docs/build-an-integration/learn-more/rest-apis/pagination) with the information needed to paginate through collections. |
| total_count | Integer | A count of the total number of collections. |
| data | Array | An array of [Collection objects](/docs/references/2.4/rest-api/help-center/the-collection-section-models). |


How are the collections sorted and ordered?
Collections will be returned in descending order on the `updated_at` attribute. This means if you need to iterate through results then we'll show the most recently updated collections first.