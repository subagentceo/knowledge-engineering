# Identities

Represents [User](https://workos.com/docs/reference/authkit/user) identities obtained from external identity providers.

When a user authenticates using an external provider like [Google OAuth](https://workos.com/docs/integrations/google-oauth), information from that provider will be made available as one of the user's Identities. You can read more about the process in our [identity linking guide](https://workos.com/docs/authkit/identity-linking).

> Applications should check the `type` before making assumptions about the shape of the identity. Currently only `OAuth` identities are supported, but more types may be added in the future.

## Get user identities

Get a list of identities associated with the user. A user can have multiple associated identities after going through [identity linking](https://workos.com/docs/authkit/identity-linking). Currently only OAuth identities are supported. More provider types may be added in the future.

#### Request

#### Response

### GET /user_management/users/{id}/identities

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | The unique ID of the user. |