# Object Model

![Intercom's Object Model](/assets/intercom-object-model.2fbc95f9d68d76f97879307036d83c012d00c99d9b53f5fd7fa0c13ce8dfa079.71a4f21c.png)

### Common Fields

API objects have a `type` field indicating their *object type*. Each object in the API may be given an identifier, indicated via its `id` field, and will typically be addressable via a URI. Many objects will also have a `created_at` field indicating the object's creation date as a UTC Unix timestamp.

```json
{
  "type": "contacts",
  "id": "456456456456",
  "created_at": 1392241887,
  "custom_attributes": {
    "note": "some extra information"
  }
}
```

### Dates and Timestamps

All temporal fields in the API are encoded as Unix timestamps in seconds and are by definition always treated as UTC. The most common time fields in the API are `created_at` and `updated_at`.

| Parameter | Description |
|  --- | --- |
| created_at | The time the object was created. In most, but not all cases, this is the time the object was created according to the API server. |
| updated_at | The time the object was last updated according to the API server. |


### Optional Fields

Unpopulated optional data is returned as follows:

- Number, String and Boolean types may be returned as having `null` values.
- Arrays and Objects may be returned as empty (`[]` `{}`)


In general clients should be able to handle null and empty fields.

### Metadata and Custom Attributes

Some object types, such as Events, Users and Companies, have a `metadata` or `custom_attributes` field that allows clients to set custom-defined data about an object.