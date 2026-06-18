# Identifiers and URLs

All objects in the API have an `id` field indicating their logical identifier. Some objects may optionally also have a `self` field that indicates a URL or canonical address for the object.

| Parameter | Description |
|  --- | --- |
| id | A string that identifies the object within the API. The `id` field will not be larger than 128 characters (in SQL it corresponds to a `varchar(128)`). |
| self | A URL that addresses the object within the API. The `self` field will not be larger than 255 characters (in SQL it corresponds to a `varchar(255)`). |


These fields must always be treated as opaque strings - no guarantees are made about the internal structure of the `id` or `self` fields for an object.

The `id` field is always defined by the API server and is guaranteed to be unique relative to the `type` field - this means no two user objects will have the same `id` field, but a user and a company may have the same value for their `id` fields. . Some object types (such as User), also support client defined identifiers.

The company and user objects deserve special mention when it comes to identity for two reasons -

- They allow you send your own *external identifiers* - `email` and `user_id` for users and `company_id` for companies.
- The user `id` field is in some cases, aliased to `intercom_user_id`. This is done to distinguish it from other identifiers in the API and to avoid confusion as to which object type an `id` denotes.