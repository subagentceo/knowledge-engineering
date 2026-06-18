# List all data attributes

## Example Request & Response

```curl
$ curl https://api.intercom.io/data_attributes?model=contact\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept:application/json'
```

```curl
{\n  \"type\": \"list\",\n  \"data\": [\n    {\n      \"type\": \"data_attribute\",\n      \"model\": \"customer\",\n      \"name\": \"paid_subscriber\",\n      \"full_name\": \"custom_attributes.paid_subscriber\",\n      \"label\": \"paid_subscriber\",\n      \"description\": \"\",\n      \"data_type\": \"string\",\n      \"options\": [\n        \"pick_value_1\",\n        \"pick_value_2\"\n      ],\n      \"api_writable\": true,      \"messenger_writable\": false,\n      \"ui_writable\": true,\n      \"custom\": true,\n      \"archived\": false,\n      \"admin_id\": \"1\",\n      \"created_at\": 1392734388,\n      \"updated_at\": 1392734388\n    },\n    {\n      \"type\": \"data_attribute\",\n      \"model\": \"customer\",\n      \"name\": \"region_name\",\n      \"full_name\": \"location_data.region_name\",\n      \"label\": \"Region\",\n      \"description\": \"\",\n      \"data_type\": \"string\",\n      \"api_writable\": false,      \"messenger_writable\": false,\n      \"ui_writable\": true,\n      \"custom\": false,\n      \"archived\": false\n    },\n    {\n      \"type\": \"data_attribute\",\n      \"model\": \"company\",\n      \"name\": \"plan\",\n      \"full_name\": \"plan\",\n      \"label\": \"Plan\",\n      \"description\": \"\",\n      \"data_type\": \"string\",\n      \"api_writable\": true,      \"messenger_writable\": false,\n      \"ui_writable\": true,\n      \"custom\": false,\n      \"archived\": false\n    },\n    {\n      \"type\": \"data_attribute\",\n      \"model\": \"conversation\",\n      \"name\": \"priority\",\n      \"full_name\": \"priority\",\n      \"label\": \"Priority\",\n      \"description\": \"\",\n      \"data_type\": \"string\",\n      \"api_writable\": true,      \"messenger_writable\": false,\n      \"ui_writable\": true,\n      \"custom\": true,\n      \"archived\": false\n    }\n  ]\n}\n
```

You can fetch a list of all data attributes belonging to a workspace for contacts, companies or conversations.

### Request Query Parameters

| Parameter | Type | Required? | Description |
|  --- | --- | --- | --- |
| model | String | No | Specify the data attribute model to return. Possible values are `contact`, `company` and `conversation`. |
| include_archived | Boolean | No | Include archived attributes in the list.By default we return only non archived data attributes. |


### Response

This will return a List of [Data Attribute Models](/docs/references/2.6/rest-api/data-attributes/data-attribute-model).