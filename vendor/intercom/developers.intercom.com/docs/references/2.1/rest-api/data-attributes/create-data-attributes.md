# Create a data attribute

## Example Requests & Response

```curl
$ curl https://api.intercom.io/data_attributes \\-X POST \\-H 'Authorization:Bearer <Your access token>' \\-H 'Accept: application/json' \\-H 'Content-Type: application/json' -d{  \"name\": \"list_cda\",  \"description\": \"You are either alive or dead\",  \"data_type\": \"options\",  \"company\": false,  \"options\": [    {\"value\": \"alive\"},    {\"value\": \"dead\"}  ]}
```

```http
HTTP/1.1 200 OK{    \"id\": 3649503,    \"type\": \"data_attribute\",    \"name\": \"text_cda\",    \"full_name\": \"custom_attributes.text_cda\",    \"label\": \"Text CDA\",    \"description\": \"This is a test\",    \"data_type\": \"string\",    \"api_writable\": true,\n    \"messenger_writable\": false,    \"ui_writable\": false,    \"custom\": true,    \"archived\": false,    \"admin_id\": \"1627328\",    \"created_at\": 1567607118,    \"updated_at\": 1567607118}
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

This will return a [Data Attribute Model](/docs/references/2.1/rest-api/data-attributes/data-attribute-model) showing the details of your created attribute.