# Identifiers and URLs

All objects in the API have an `id` field indicating their logical identifier.

| Parameter | Description |
|  --- | --- |
| id | A string that identifies the object within the API. The `id` field will not be larger than 128 characters (in SQL it corresponds to a `varchar(128)`). |


These fields must always be treated as opaque strings - no guarantees are made about the internal structure of the `id` fields for an object.

The `id` field is always defined by the API server and is guaranteed to be unique relative to the `type` field - this means no two user objects will have the same `id` field, but a user and a company may have the same value for their `id` fields. . Some object types (such as Contact), also support client defined identifiers.

The company and user objects deserve special mention when it comes to identity for two reasons -

* They allow you send your own *external identifiers*
* The contact `id` field is in some cases, aliased to `intercom_user_id`. This is done to distinguish it from other identifiers in the API and to avoid confusion as to which object type an `id` denotes.