# Create a data attribute

## Example Requests & Response

```curl
$ curl https://api.intercom.io/data_attributes \\\n-X POST \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept: application/json' \\\n-H 'Content-Type: application/json' -d\n\n{\n  \"name\": \"list_cda\",\n  \"description\": \"You are either alive or dead\",\n  \"data_type\": \"options\",\n  \"model\": \"contact\",\n  \"options\": [\n    {\"value\": \"alive\"},\n    {\"value\": \"dead\"}\n  ]\n}
```

```http
HTTP/1.1 200 OK\n{\n    \"id\": 3649503,\n    \"type\": \"data_attribute\",\n    \"name\": \"text_cda\",\n    \"full_name\": \"custom_attributes.text_cda\",\n    \"label\": \"Text CDA\",\n    \"description\": \"This is a test\",\n    \"data_type\": \"string\",\n    \"api_writable\": true,\n    \"messenger_writable\": false,\n    \"ui_writable\": false,\n    \"custom\": true,\n    \"archived\": false,\n    \"admin_id\": \"1627328\",\n    \"created_at\": 1567607118,\n    \"updated_at\": 1567607118\n}
```

## Example Errors

```http
HTTP/1.1 400 BAD REQUEST
{
  "type": "error.list",
  "request_id": "0006klvnje6ffng7ot80",
  "errors": [
    {
      "code": "parameter_invalid",
      "message": "You already have 'text_cda' in your people data. To save this as new company data, use a different name."
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
      "message": "Your name for this attribute must only contain alphanumeric characters, currency symbols, and hyphens"
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
      "message": "'Name' is one of our standard attributes for your people data. To save this as new people data, use a different name."
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
      "message": "Data Type isn't an option"
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

You can create a data attributes for a `contact` or a `company`.

### Request Body Parameters

| Attribute | Type | Description |
|  --- | --- | --- |
| name | string | The name of the attribute. |
| model | string | The model where the attribute applies to.  Accepts `contact` or `company` . |
| data_type | string | The type of data stored for this attribute.  Accepted values are `string`, `integer`, `float`, `boolean`, `date`, `options`. |
| description | string | (Optional) The readable description you see in the UI for the attribute. |
| options | array | (Optional) Array of objects representing the options of the list, with `value` as the key and the option as the value. At least two options are required. `data_type` must be `options`. |
| messenger_writable | boolean | (Optional). When set to `false`, the attribute will not be writable by the Messenger. Default value is `true`. |


### Response

This will return a [Data Attribute Model](/docs/references/2.4/rest-api/data-attributes/data-attribute-model) showing the details of your created attribute.