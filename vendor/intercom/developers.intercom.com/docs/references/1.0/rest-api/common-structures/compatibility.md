# Compatibility

## Unknown Field

```json
{
  "type": "user",
  "user_id" : "456456",
  "email" : "j@example.org",
  "such_key": "so_value"
}
```

## Must Ignore Interpretation

```json
{
  "type": "user",
  "user_id" : "456456",
  "email" : "j@example.org"
}
```

JSON objects in the API follow a **must ignore** processing model, where clients are expected to ignore data fields they don't understand.

For example if the client saw the JSON as shown in the example on the right ('Unknown Field')
and did not understand the `such_key` field (and who can blame it?), it must pretend the field wasn't there and will process the object as if it looked liked the object shown in 'Must Ignore'.

When fetching content, fields that are optional for API objects are indicated in the documentation - clients must not assume they will always be present. When submitting content, fields that are required to be sent by client are also indicated in the documentation - if these are not sent the API may reject the request.

In general the API may reject JSON where data is not valid or incomplete with a `422 Unprocessable Entity` response and an error message explaining the issue. For example, an email message type may be rejected if it is not sent with a `subject` field.