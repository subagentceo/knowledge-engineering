# The subscription type model

## Example Subscription type Object

```json
{\n  \"type\": \"subscription\",\n  \"id\": \"1\",\n  \"state\": \"live\",\n  \"consent_type\": \"opt_out\",\n  \"default_translation\": {\n    \"name\": \"Announcements\",\n    \"description\": \"Offers, product and feature announcements\",\n    \"locale\": \"en\"\n  },\n  \"translations\": [\n    {\n      \"name\": \"Ankündigungen\",\n      \"description\": \"Angebote, Produkt- und Funktionsankündigungen\",\n      \"locale\": \"de\"\n    },\n    {\n      \"name\": \"Announcements\",\n      \"description\": \"Offers, product and feature announcements\",\n      \"locale\": \"en\"\n    }\n  ]\n}
```

A subscription type lets customers easily opt out of non-essential communications without missing what's important to them.

### Subscription type Object

| Key | Type | Description |
|  --- | --- | --- |
| type | String | The type of the object - `subscription` |
| id | String | The unique identifier representing the subscription type. |
| state | String | The state of the subscription type: `live`, `draft`, `archived`. |
| default_translation | Object | A translation object with the localised version of the subscription type in the default language for the workspace. |
| translations | Array | An array of translations objects with the localised version of the subscription type in each available locale within your translation settings. |
| consent_type | String | Describes the type of consent, this is always `opt_out`. |