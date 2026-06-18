# List Data Attributes

## List all data attributes

```curl
$ curl https://api.intercom.io/data_attributes
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept:application/json'
```

```curl
{
  "type": "data_attribute.list",
  "data_attributes": [
    {
      "type": "data_attribute",
      "model": "customer",
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
      "model": "customer",
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
      "model": "company",
      "name": "plan",
      "full_name": "plan",
      "label": "Plan",
      "description": "",
      "data_type": "string",
      "api_writable": true,
      "messenger_writable": false,
      "ui_writable": true,
      "custom": false,
      "archived": false
    }
  ]
}
```

## List company data attributes

```curl
$ curl https://api.intercom.io/data_attributes?model=company \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept: application/json'
```

```curl
{
  "type": "data_attribute.list",
  "data_attributes": [
    {
      "type": "data_attribute",
      "model": "company",
      "name": "plan",
      "full_name": "plan",
      "label": "Plan",
      "description": "",
      "data_type": "string",
      "api_writable": true,
      "messenger_writable": false,
      "ui_writable": true,
      "custom": false,
      "archived": false
    }
  ]
}
```

## List all data attributes including archived

```curl
$ curl https://api.intercom.io/data_attributes?include_archived=true \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept: application/json'
```

```curl
{
  "type": "data_attribute.list",
  "data_attributes": [
    {
      "type": "data_attribute",
      "model": "customer",
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
      "model": "customer",
      "name": "cda2",
      "full_name": "custom_attributes.cda2",
      "label": "cda2",
      "description": "",
      "data_type": "integer",
      "api_writable": true,
      "messenger_writable": false,
      "ui_writable": true,
      "custom": true,
      "archived": true,
      "admin_id": "1",
      "created_at": 1392734388,
      "updated_at": 1392734388
    },
    {
      "type": "data_attribute",
      "model": "customer",
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
      "model": "company",
      "name": "plan",
      "full_name": "plan",
      "label": "Plan",
      "description": "",
      "data_type": "string",
      "api_writable": true,
      "messenger_writable": false,
      "ui_writable": true,
      "custom": false,
      "archived": false
    }
  ]
}
```

You can fetch a list of all data attributes belonging to a workspace by sending a GET request to `https://api.intercom.io/data_attributes`.

By default a list of all unarchived data attributes are returned. You can include the following parameters to retrieve only company or customer data attributes, and specify whether to return archived data attributes to:

| Parameter | Type | Description |
|  --- | --- | --- |
| model | string | Specify the data attribute model to return. Possible values are `customer` and `company`. |
| include_archived | boolean | Include archived attributes in the list.  By default we return only non archived data attributes. |


### Returns

List of [Data Attribute Models](/docs/references/1.4/rest-api/data-attributes/data-attribute-model)