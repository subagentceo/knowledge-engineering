# Detach a contact from a company

## Example Request & Response

```curl
$ curl https://api.intercom.io/contacts/<contact_id>/companies/<id> \\\n-X DELETE \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept:application/json'
```

```http
HTTP/1.1 200 OK\n{\n  \"type\": \"company\",\n  \"company_id\": \"12234934893\",\n  \"id\": \"5db0c9b03d7cf9a50452754e\",\n  \"app_id\": \"tx2p130c\",\n  \"created_at\": 1571867056,\n  \"updated_at\": 1571867056,\n  \"monthly_spend\": 0,\n  \"session_count\": 0,\n  \"user_count\": 0,\n  \"tags\": {\n    \"type\": \"tag.list\",\n    \"tags\": []\n  },\n  \"segments\": {\n    \"type\": \"segment.list\",\n    \"segments\": []\n  },\n  \"plan\": {},\n  \"custom_attributes\": {\n    \"new_cda_439084398494\": true\n  }\n}\n
```

## Example Errors

```http
HTTP/1.1 404 NOT FOUND\n{\n  \"type\": \"error.list\",\n  \"request_id\": \"9a3d0816-9707-4598-977e-c009ba630148\",\n  \"errors\": [\n    {\n      \"code\": \"not_found\",\n      \"message\": \"Contact Not Found\"\n    }\n  ]\n}
```

```html
HTTP/1.1 404 NOT FOUND\n{\n  \"type\": \"error.list\",\n  \"request_id\": \"5f6b2623-f844-4914-8b8d-ac01acc62a76\",\n  \"errors\": [\n    {\n      \"code\": \"company_not_found\",\n      \"message\": \"Company Not Found\"\n    }\n  ]\n}
```

You can detach a company from a single contact.

### Request Path Parameter

| Parameter | Type | Required | Description |
|  --- | --- | --- | --- |
| contact_id | String | Yes | The unique identifier for the contact which is given by Intercom |
| id | String | Yes | The unique identifier for the company which is given by Intercom |


### Response

This will return a [Company model](/docs/references/2.2/rest-api/companies/company-model) for the company that was just detached from the contact.