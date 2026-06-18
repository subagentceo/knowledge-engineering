# List all articles

## Example Request & Response (Single Language Help Center)

```curl
$ curl https://api.intercom.io/articles \\\n-X GET \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept:application/json'\n-H 'Content-Type: application/json' -d
```

```http
HTTP/1.1 200 OK\n{\n  \"type\": \"list\",\n  \"pages\": {\n    \"type\": \"pages\",\n    \"page\": 1,\n    \"per_page\": 20,\n    \"total_pages\": 1\n  },\n  \"total_count\": 2,\n  \"data\": [\n    {\n      \"id\": 1,\n      \"type\": \"article\",\n      \"workspace_id\": \"abcdef\",\n      \"title\": \"Default language title\",\n      \"description\": \"Default language description\",\n      \"body\": \"Default language body in html\",\n      \"author_id\": 1,\n      \"state\": \"published\",\n      \"created_at\": 123456,\n      \"updated_at\": 123456,\n      \"url\": \"http://intercom.help/en/articles/1-art\",\n      \"parent_id\": 1,\n      \"parent_type\": \"collection\"\n    },\n    {\n      \"id\": 2,\n      \"type\": \"article\",\n      \"workspace_id\": \"abcdef\",\n      \"title\": \"Default language title 2\",\n      \"description\": \"Default language description 2\",\n      \"body\": \"Default language body in html 2\",\n      \"author_id\": 1,\n      \"state\": \"draft\",\n      \"created_at\": 789456,\n      \"updated_at\": 789456,\n      \"url\": \"http://intercom.help/en/articles/2-art\",\n      \"parent_id\": 1,\n      \"parent_type\": \"collection\"\n    }\n  ]\n}
```

You can fetch a list of all articles by making a GET request to `https://api.intercom.io/articles`.

### Response

| Key | Type | Description |
|  --- | --- | --- |
| type | String | The type of object - `list`. |
| pages | Object | A [Pages object](/docs/build-an-integration/learn-more/rest-apis/pagination) with the information needed to paginate through Articles. |
| total_count | Integer | A count of the total number of articles. |
| data | Array | An array of [Article Objects](/docs/references/2.1/rest-api/articles/the-article-model). |


How are the articles sorted and ordered?
Articles will be returned in descending order on the `updated_at` attribute. This means if you need to iterate through results then we'll show the most recently updated articles first.