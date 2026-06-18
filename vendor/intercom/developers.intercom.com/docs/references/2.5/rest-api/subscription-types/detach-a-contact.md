# Detach a contact from a subscription

## Example Request & Response

```curl
$ curl https://api.intercom.io/contacts/<contact_id>/subscriptions/<id> \\\n-X DELETE \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept:application/json'\n
```

```http
HTTP/1.1 200 OK\n{\n  \"type\": \"subscription\",\n  \"id\": \"1\",\n  \"state\": \"live\",\n  \"default_translation\": {\n    \"name\": \"Announcements\",\n    \"description\": \"Offers, product and feature announcements\",\n    \"locale\": \"en\"\n  },\n  \"translations\": [\n    {\n      \"name\": \"Ankündigungen\",\n      \"description\": \"Angebote, Produkt- und Funktionsankündigungen\",\n      \"locale\": \"de\"\n    },\n    {\n      \"name\": \"Announcements\",\n      \"description\": \"Offers, product and feature announcements\",\n      \"locale\": \"en\"\n    }\n  ]\n  \"consent_type\": \"opt_out\"\n}
```

## Example Errors

```http
HTTP/1.1 404 NOT FOUND\n{\n  \"type\": \"error.list\",\n  \"request_id\": \"9a3d0816-9707-4598-977e-c009ba630148\",\n  \"errors\": [\n    {\n      \"code\": \"not_found\",\n      \"message\": \"User Not Found\"\n    }\n  ]\n}
```

```http
HTTP/1.1 404 NOT FOUND\n{\n  \"type\": \"error.list\",\n  \"request_id\": \"060932ab-ab9d-4f89-88f3-d0152d005873\",\n  \"errors\": [\n    {\n      \"code\": \"not_found\",\n      \"message\": \"Resource Not Found\"\n    }\n  ]\n}
```

You can detach an opt out subscription for a single contact.

### Request Path Parameter

| Attribute | Type | Description |
|  --- | --- | --- |
| contact_id | String | The unique identifier for the contact which is given by Intercom |
| id | String | The unique identifier for the subscription type which is given by Intercom |


### Response

This will return a [Subscription Type model](/docs/references/2.5/rest-api/subscription-types/the-subscription-type-model) for the opt out subscription type that was removed from the contact.