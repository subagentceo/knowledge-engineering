# Update a data attribute

## Example Request & Response

```curl
$ curl https://api.intercom.io/data_attributes/163728 \\\n-X PUT \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept: application/json' \\\n-H 'Content-Type: application/json' -d\n\n{\n  \"description\": \"You are either great or bad\",\n  \"options\": [\n    {\"value\": \"great\"},\n    {\"value\": \"bad\"}\n  ]\n}
```

```http
HTTP/1.1 200 OK\n{\n    \"id\": 3649503,\n    \"type\": \"data_attribute\",\n    \"name\": \"list_cda\",\n    \"full_name\": \"custom_attributes.text_cda\",\n    \"label\": \"List CDA\",\n    \"description\": \"You are either great or bad\",\n    \"data_type\": \"string\",\n    \"options\": [\n      \"great\",\n      \"bad\"\n    ],\n    \"api_writable\": true,\n    \"messenger_writable\": false,\n    \"ui_writable\": false,\n    \"custom\": true,\n    \"archived\": true,\n    \"admin_id\": \"1627328\",\n    \"created_at\": 1567607118,\n    \"updated_at\": 1567607118\n}
```

## Example Errors

```http
HTTP/1.1 404 NOT FOUND
{
  "type": "error.list",
  "request_id": "0006klvnje6ffng7ot80",
  "errors": [
    {
      "code": "field_not_found",
      "message": "We couldn't find that data attribute to update"
    }
  ]
}
```

```http
HTTP/1.1 422 UNPROCESSIBLE ENTITY
{
  "type": "error.list",
  "request_id": "0006klvnje6ffng7ot80",
  "errors": [
    {
      "code": "data_invalid",
      "message": "The Data Attribute you are trying to archive has a dependant object"
    }
  ]
}
```

```http
HTTP/1.1 400 BAD REQUEST
{
  "type": "error.list",
  "request_id": "0000rnvpf3m1f3nf4k40",
  "errors": [
    {
      "code": "parameter_invalid",
      "message": "You must have at least two options on a list type data attribute"
    }
  ]
}
```

You can update data attribute.

### Request Body Parameters

| Argument | Type | Description |
|  --- | --- | --- |
| description | String | (Optional) The readable description you see in the UI for the attribute. |
| options | array | (Optional) Array of objects representing the options of the list, with `value` as the key and the option as the value. At least two options are required. `data_type` must be `options`. |
| archived | Boolean | (Optional) Whether the attribute is to be archived or not. |
| messenger_writable | Boolean | (Optional). When set to `false`, the attribute will not be writable by the Messenger. Default value is `true`. |


> 🚧 Updating the data type is not possible
It is currently a dangerous action to execute changing a data attribute's type via the API. You will need to update the type via the UI instead.


### Response

This will return a [Data Attribute Model](/docs/references/2.6/rest-api/data-attributes/data-attribute-model) showing the details of your updated attribute.