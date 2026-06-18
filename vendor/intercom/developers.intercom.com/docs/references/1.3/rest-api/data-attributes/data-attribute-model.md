# Data Attribute Model

## Example Data Attribute Object

```json
{\n  \"type\": \"data_attribute\",\n  \"name\": \"paid_subscriber\",\n  \"full_name\": \"custom_attributes.paid_subscriber\", \n  \"label\": \"paid_subscriber\", \n  \"description\": \"\",\n  \"data_type\": \"string\", \n  \"options\": [\n    \"pick_value_1\",\n    \"pick_value_2\"\n  ],\n  \"api_writable\": true, \n  \"ui_writable\": true, \n  \"custom\": true, \n  \"archived\": false, \n  \"admin_id\": \"1\",\n  \"created_at\": 1392734388,\n  \"updated_at\": 1392734388\n}\n
```

### Data Attribute Object

A data attribute object contains the following fields -

| Attribute | Type | Description |
|  --- | --- | --- |
| type | string | Value is 'data_attribute' |
| id | integer | The unique identifier for the data attribute which is given by Intercom. Only available for custom attributes. |
| name | string | name of the attributeExamples:emailregion_name for region_name for stored in location_data objectimage_url for image_url for stored in avatar objectpaid_subscriber for CDA named paid_subscriber |
| full_name | string | Full name of the attribute. Should match the name unless it's a nested attribute.Examples:emaillocation_data.region_nameavatar.image_urlcustom_attributes.paid_subscriberWe can split full_name on . to access nested user object values.Examples:user['location_data']['region_name']user['custom_attributes']['paid_subscriber'] |
| label | string | Readable name of the attribute (i.e. name you see in the UI) |
| description | string | Readable description of the attribute |
| data_type | string | Type of data stored in the attribute.Possible values:stringintegerfloatbooleandate |
| options | list | List of predefined options for attribute value.Example:["option_1", "option_2"] |
| api_writable | boolean | Can this attribute be updated through API |
| messenger_writable | boolean | Can this attribute be updated by the Messenger |
| ui_writable | boolean | Can this attribute be updated in the UI |
| custom | boolean | Set to true if this is a CDA |
| archived | boolean | Only applicable to CDAs |
| created_at | timestamp | The time the CDA was created.Only applicable to CDAs. |
| updated_at | timestamp | The last time the CDA was updated.Only applicable to CDAs. |
| admin_id | string | Teammate who created the attribute.Only applicable for CDAs |