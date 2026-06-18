# List attached companies

## Example Request & Response

```curl
$ curl https://api.intercom.io/contacts/<id>/companies \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept:application/json'
```

```http
HTTP/1.1 200 OK\n{\n  \"type\": \"company.list\",\n  \"pages\": {\n    \"type\": \"pages\",\n    \"next\": \"https://api.intercom.io/contacts/5d010558220cf7d48317dbb9/companies?per_page=1&page=2\",\n    \"page\": 1,\n    \"per_page\": 1,\n    \"total_pages\": 2\n  },\n  \"companies\": [\n    {\n      \"type\": \"company\",\n      \"company_id\": \"5d2333ea82166f5838642267-qualification-company\",\n      \"id\": \"5d2333ea82166f5838642266\",\n      \"app_id\": \"ecahpwf5\",\n      \"name\": \"Test\",\n      \"created_at\": 1562588138,\n      \"updated_at\": 1565257230,\n      \"last_request_at\": 1562588115,\n      \"monthly_spend\": 0,\n      \"session_count\": 0,\n      \"user_count\": 1,\n      \"industry\": \"Test\",\n      \"tags\": {\n        \"type\": \"tag.list\",\n        \"tags\": []\n      },\n      \"segments\": {\n        \"type\": \"segment.list\",\n        \"segments\": []\n      },\n      \"plan\": {},\n      \"custom_attributes\": {}\n    }\n  ],\n  \"total_count\": 2\n}\n
```

## Example Errors

### Contact not found

```http
HTTP/1.1 404 NOT FOUND\n{\n  \"type\": \"error.list\",\n  \"request_id\": \"9a3d0816-9707-4598-977e-c009ba630148\",\n  \"errors\": [\n    {\n      \"code\": \"not_found\",\n      \"message\": \"Contact Not Found\"\n    }\n  ]\n}
```

You can fetch a list of companies that are associated to a contact.

### Request Path Parameter

| Parameter | Type | Required | Description |
|  --- | --- | --- | --- |
| id | String | Yes | The unique identifier for the contact which is given by Intercom |


### Response

This will return a [paginated](/docs/build-an-integration/learn-more/rest-apis/pagination) list of [Company objects](/docs/references/2.4/rest-api/companies/company-model).

| Attribute | Type | Description |
|  --- | --- | --- |
| type | String | The type of object - `company.list` |
| companies | Array | An array containing Company Objects |
| total_count | Integer | The total number of companies associated to this contact |
| pages | [Pagination Object](/docs/build-an-integration/learn-more/rest-apis/pagination) | The information needed to paginate through companies |