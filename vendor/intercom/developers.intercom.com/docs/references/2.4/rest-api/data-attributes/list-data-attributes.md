# List all data attributes

## Example Request & Response

```curl
$ curl https://api.intercom.io/data_attributes?model=contact-H 'Authorization:Bearer <Your access token>' \\-H 'Accept:application/json'
```

```curl
{  \"type\": \"list\",  \"data\": [    {      \"type\": \"data_attribute\",      \"model\": \"customer\",      \"name\": \"paid_subscriber\",      \"full_name\": \"custom_attributes.paid_subscriber\",      \"label\": \"paid_subscriber\",      \"description\": \"\",      \"data_type\": \"string\",      \"options\": [        \"pick_value_1\",        \"pick_value_2\"      ],      \"api_writable\": true,      \"messenger_writable\": false,      \"ui_writable\": true,      \"custom\": true,      \"archived\": false,      \"admin_id\": \"1\",      \"created_at\": 1392734388,      \"updated_at\": 1392734388    },    {      \"type\": \"data_attribute\",      \"model\": \"customer\",      \"name\": \"region_name\",      \"full_name\": \"location_data.region_name\",      \"label\": \"Region\",      \"description\": \"\",      \"data_type\": \"string\",      \"api_writable\": false,      \"messenger_writable\": false,      \"ui_writable\": true,      \"custom\": false,      \"archived\": false    },    {      \"type\": \"data_attribute\",      \"model\": \"company\",      \"name\": \"plan\",      \"full_name\": \"plan\",      \"label\": \"Plan\",      \"description\": \"\",      \"data_type\": \"string\",      \"api_writable\": true,      \"messenger_writable\": false,      \"ui_writable\": true,      \"custom\": false,      \"archived\": false    },    {      \"type\": \"data_attribute\",      \"model\": \"conversation\",      \"name\": \"priority\",      \"full_name\": \"priority\",      \"label\": \"Priority\",      \"description\": \"\",      \"data_type\": \"string\",      \"api_writable\": true,      \"messenger_writable\": false,      \"ui_writable\": true,      \"custom\": true,      \"archived\": false    }  ]}
```

You can fetch a list of all data attributes belonging to a workspace for contacts, companies or conversations.

### Request Query Parameters

| Parameter | Type | Required? | Description |
|  --- | --- | --- | --- |
| model | String | No | Specify the data attribute model to return. Possible values are `contact`, `company` and `conversation`. |
| include_archived | Boolean | No | Include archived attributes in the list.By default we return only non archived data attributes. |


### Response

This will return a List of [Data Attribute Models](/docs/references/2.4/rest-api/data-attributes/data-attribute-model).