# The data attribute model

## Example Data Attribute Object

```json
{\n  \"type\": \"data_attribute\",\n  \"model\": \"contact\",\n  \"name\": \"paid_subscriber\",\n  \"full_name\": \"custom_attributes.paid_subscriber\", \n  \"label\": \"paid_subscriber\", \n  \"description\": \"\",\n  \"data_type\": \"string\", \n  \"options\": [\n    \"pick_value_1\",\n    \"pick_value_2\"\n  ],\n  \"api_writable\": true, \n  \"ui_writable\": true, \n  \"custom\": true, \n  \"archived\": false, \n  \"admin_id\": \"1\",\n  \"created_at\": 1392734388,\n  \"updated_at\": 1392734388\n}
```

Data Attributes are metadata used to describe your contact, company and conversation models. These include standard and custom attributes. By using the data attributes endpoint, you can get the global list of attributes for your workspace, as well as create and archive custom attributes.

### Data Attribute Object

| Key | Type | Description |
|  --- | --- | --- |
| type | string | Value is `data_attribute` |
| id | integer | The unique identifier for the data attribute which is given by Intercom. Only available for custom attributes. |
| model | string | Value is `contact` for user/lead attributes, `company` for company attributes and `conversation` for conversation attributes. |
| name | string | Name of the attributeExamples:`email``region_name` for region_name stored in location_data object`image_url` for image_url stored in avatar object`paid_subscriber` for CDA named paid_subscriber |
| full_name | string | Full name of the attribute. Should match the name unless it's a nested attribute.Examples:`email``location_data.region_name``avatar.image_url``custom_attributes.paid_subscriber`We can split full_name on `.` to access nested user object values. |
| label | string | Readable name of the attribute (i.e. name you see in the UI) |
| description | string | Readable description of the attribute |
| data_type | string | Type of data stored in the attribute.Possible values: `string``integer``float``boolean``date` |
| options | list | List of predefined options for attribute value |
| api_writable | boolean | Can this attribute be updated through API |
| messenger_writable | boolean | Can this attribute be updated by the Messenger |
| ui_writable | boolean | Can this attribute be updated in the UI |
| custom | boolean | Set to true if this is a CDA |
| archived | boolean | Only applicable to CDAs |
| created_at | timestamp | The time the CDA was created.Only applicable to CDAs. |
| updated_at | timestamp | The last time the CDA was updated.Only applicable to CDAs |
| admin_id | string | Teammate who created the attribute.Only applicable to CDAs |