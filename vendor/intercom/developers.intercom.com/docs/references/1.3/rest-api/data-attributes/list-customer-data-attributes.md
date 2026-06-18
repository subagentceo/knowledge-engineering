# List Customer Data Attributes

## List of your customer data attributes

```curl
$ curl https://api.intercom.io/data_attributes/customer \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept: application/json'
```

```text
{
  "type": "data_attribute.list",
  "data_attributes": [
    {
      "type": "data_attribute",
      "name": "paid_subscriber",
      "full_name": "custom_attributes.paid_subscriber",
      "label": "paid_subscriber",
      "description": "",
      "data_type": "string",
      "options": [
        "pick_value_1",
        "pick_value_2"
      ],
      "api_writable": true,
      "messenger_writable": false,
      "ui_writable": true,
      "custom": true,
      "archived": false,
      "admin_id": "1",
      "created_at": 1392734388,
      "updated_at": 1392734388
    },
    {
      "type": "data_attribute",
      "name": "cda2",
      "full_name": "custom_attributes.cda2",
      "label": "cda2",
      "description": "",
      "data_type": "integer",
      "api_writable": true,
      "messenger_writable": false,
      "ui_writable": true,
      "custom": true,
      "archived": false,
      "admin_id": "1",
      "created_at": 1392734388,
      "updated_at": 1392734388
    },
    {
      "type": "data_attribute",
      "name": "email",
      "full_name": "email",
      "label": "Email",
      "description": "",
      "data_type": "string",
      "api_writable": true,
      "messenger_writable": false,
      "ui_writable": true,
      "custom": false,
      "archived": false
    },
    {
      "type": "data_attribute",
      "name": "region_name",
      "full_name": "location_data.region_name",
      "label": "Region",
      "description": "",
      "data_type": "string",
      "api_writable": false,
      "messenger_writable": false,
      "ui_writable": true,
      "custom": false,
      "archived": false
    }
  ]
}
```

### List customer attributes

You can fetch a list of data attributes belonging to customers by using `https://api.intercom.io/data_attributes/customer`. Customer attributes describe attributes belonging to users, leads and visitors. All 3 models have the same data attributes.

### Returns

List of data attributes

You can also include the archived attributes by adding this parameter:

| Parameter | Type | Description |
|  --- | --- | --- |
| include_archived | boolean | Include archived attributes in the list.  By default we return only non archived data attributes |


## List of your customer data attributes including archived

```curl
$ curl https://api.intercom.io/data_attributes/customer?include_archived=true \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept: application/json'
```

```curl
{
  "type": "data_attribute.list",
  "data_attributes": [
    {
      "type": "data_attribute",
      "name": "paid_subscriber",
      "full_name": "custom_attributes.paid_subscriber",
      "label": "paid_subscriber",
      "description": "",
      "data_type": "string",
      "options": [
        "pick_value_1",
        "pick_value_2"
      ],
      "api_writable": true,
      "messenger_writable": false,
      "ui_writable": true,
      "custom": true,
      "archived": false,
      "admin_id": "1",
      "created_at": 1392734388,
      "updated_at": 1392734388
    },
    {
      "type": "data_attribute",
      "name": "cda2",
      "full_name": "custom_attributes.cda2",
      "label": "cda2",
      "description": "",
      "data_type": "integer",
      "api_writable": true,
      "messenger_writable": false,
      "ui_writable": true,
      "custom": true,
      "archived": false,
      "admin_id": "1",
      "created_at": 1392734388,
      "updated_at": 1392734388
    },
    {
      "type": "data_attribute",
      "name": "email",
      "full_name": "email",
      "label": "Email",
      "description": "",
      "data_type": "string",
      "api_writable": true,
      "messenger_writable": false,
      "ui_writable": true,
      "custom": false,
      "archived": false
    },
    {
      "type": "data_attribute",
      "name": "region_name",
      "full_name": "location_data.region_name",
      "label": "Region",
      "description": "",
      "data_type": "string",
      "api_writable": false,
      "messenger_writable": false,
      "ui_writable": true,
      "custom": false,
      "archived": false
    },
    {
      "type": "data_attribute",
      "name": "Department",
      "full_name": "custom_attributes.foo",
      "label": "Department",
      "data_type": "string",
      "api_writable": true,
      "messenger_writable": false,
      "ui_writable": false,
      "custom": true,
      "archived": true,
      "created_at": 1500460535,
      "updated_at": 1511274873
    }
  ]
}
```