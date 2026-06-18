# Object Model

## Common Fields and Metadata

```json
{\n  \"type\": \"contacts\",\n  \"id\": \"456456456456\",\n  \"created_at\": 1392241887,\n  \"custom_attributes\": {\n    \"note\": \"some extra information\"\n  }\n}
```

### Common Fields

API objects have a `type` field indicating their *object type*. Each object in the API may be given an identifier, indicated via its `id` field, and will typically be addressable via a URI. Many objects will also have a `created_at` field indicating the object's creation date as a UTC Unix timestamp.

### Dates and Timestamps

All temporal fields in the API are encoded as Unix timestamps and are by definition always treated as UTC. The most common time fields in the API are `created_at` and `updated_at`.

| Parameter | Description |
|  --- | --- |
| created_at | The time the object was created. In most, but not all cases, this is the time the object was created according to the API server. |
| updated_at | The time the object was last updated according to the API server. |


### Optional Fields

Unpopulated optional data is returned as follows -

- Number, String and Boolean types may be returned as having `null` values.
- Arrays and Objects may be returned as empty (`[]` `{}`)


In general clients should be able to handle null and empty fields.

### Metadata and Custom Attributes

Some object types, such as Events, Users and Companies, have a `metadata` or `custom_attributes` field that allows clients to set custom-defined data about an object.