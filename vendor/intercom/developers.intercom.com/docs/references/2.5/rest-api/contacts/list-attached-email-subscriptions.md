# List attached email subscriptions

## Example Request & Response

```curl
$ curl https://api.intercom.io/contacts/<id>/subscriptions \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept:application/json'
```

```http
HTTP/1.1 200 OK\n{\n  \"type\": \"list\",\n  \"data\": [\n    {\n      \"type\": \"subscription\",\n      \"id\": \"1\",\n      \"state\": \"live\",\n      \"default_translation\": {\n        \"name\": \"Announcements\",\n        \"description\": \"Offers, product and feature announcements\",\n        \"locale\": \"en\"\n      },\n      \"translations\": [\n        {\n          \"name\": \"Ankündigungen\",\n          \"description\": \"Angebote, Produkt- und Funktionsankündigungen\",\n          \"locale\": \"de\"\n        },\n        {\n          \"name\": \"Announcements\",\n          \"description\": \"Offers, product and feature announcements\",\n          \"locale\": \"en\"\n        }\n      ]\n      \"consent_type\": \"opt_out\"\n    }\n  ]\n}
```

## Example Errors

### Contact not found

```http
HTTP/1.1 404 NOT FOUND\n{\n    \"type\": \"error.list\",\n    \"request_id\": \"cc1a749e-6cc4-4b7c-944c-e26bb6d61662\",\n    \"errors\": [\n        {\n            \"code\": \"not_found\",\n            \"message\": \"User Not Found\"\n        }\n    ]\n}
```

You can fetch a list of tags that are associated to a contact.

### Request Path Parameter

| Parameter | Type | Required | Description |
|  --- | --- | --- | --- |
| id | String | Yes | The unique identifier for the contact which is given by Intercom |


### Response

This will return a list of [Subscription Type objects](/docs/references/2.5/rest-api/subscription-types/the-subscription-type-model) that the contact is associated with.

| Attribute | Type | Description |
|  --- | --- | --- |
| type | String | The type of object - `list` |
| data | Array | A list of subscriptions tied to the contact |