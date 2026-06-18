# List all subscription types

## Example List Subscription Types Request

```curl
$ curl https://api.intercom.io/subscription_types \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept: application/json'
```

```http
HTTP/1.1 200 OK\n{\n  \"type\": \"list\",\n  \"data\": [\n    {\n      \"type\": \"subscription\",\n      \"id\": \"1\",\n      \"state\": \"live\",\n      \"consent_type\": \"opt_out\",\n      \"default_translation\": {\n        \"name\": \"Announcements\",\n        \"description\": \"Offers, product and feature announcements\",\n        \"locale\": \"en\"\n      },\n      \"translations\": [\n        {\n          \"name\": \"Ankündigungen\",\n          \"description\": \"Angebote, Produkt- und Funktionsankündigungen\",\n          \"locale\": \"de\"\n        },\n        {\n          \"name\": \"Announcements\",\n          \"description\": \"Offers, product and feature announcements\",\n          \"locale\": \"en\"\n        }\n      ]\n    },\n    {\n      \"type\": \"subscription\",\n      \"id\": \"2\",\n      \"state\": \"live\",\n      \"consent_type\": \"opt_out\",\n      \"default_translation\": {\n        \"name\": \"Newsletter\",\n        \"description\": \"The latest news and updates, on a regular basis\",\n        \"locale\": \"en\"\n      },\n      \"translations\": [\n        {\n          \"name\": \"Newsletter\",\n          \"description\": \"Regelmäßig die neuesten Nachrichten und Updates\",\n          \"locale\": \"de\"\n        },\n        {\n          \"name\": \"Newsletter\",\n          \"description\": \"The latest news and updates, on a regular basis\",\n          \"locale\": \"en\"\n        }\n      ]\n    },\n    {\n      \"type\": \"subscription\",\n      \"id\": \"3\",\n      \"state\": \"live\",\n      \"consent_type\": \"opt_out\",\n      \"default_translation\": {\n        \"name\": \"Best practices\",\n        \"description\": \"Tips, tricks and recommendations\",\n        \"locale\": \"en\"\n      },\n      \"translations\": [\n        {\n          \"name\": \"Best Practices\",\n          \"description\": \"Tipps, Tricks und Empfehlungen\",\n          \"locale\": \"de\"\n        },\n        {\n          \"name\": \"Best practices\",\n          \"description\": \"Tips, tricks and recommendations\",\n          \"locale\": \"en\"\n        }\n      ]\n    }\n  ]\n}
```

You can list all subscription types.

### Response

A list of subscription type objects.

| Key | Type | Description |
|  --- | --- | --- |
| type | String | *value is 'list'* |
| data | Array | A list of subscription type objects |