# Profile

A Profile is an object that represents an authenticated user. The Profile object contains information relevant to a user in the form of normalized attributes.

After receiving the Profile for an authenticated user, use the Profile object attributes to persist relevant data to your application's user model for the specific, authenticated user.

To surface additional attributes on the Profile, refer to the [SSO custom attributes](https://workos.com/docs/sso/attributes/custom-attributes) guide.

## Get a Profile and Token

Get an access token along with the user [Profile](https://workos.com/docs/reference/sso/profile) using the code passed to your [Redirect URI](https://workos.com/docs/reference/sso/get-authorization-url/redirect-uri).

#### Request

#### Response

## Get a User Profile

Exchange an access token for a user's [Profile](https://workos.com/docs/reference/sso/profile). Because this profile is returned in the [Get a Profile and Token endpoint](https://workos.com/docs/reference/sso/profile/get-profile-and-token) your application usually does not need to call this endpoint. It is available for any authentication flows that require an additional endpoint to retrieve a user's profile.

#### Request

#### Response

### profile

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `object` | "profile" | Yes | Distinguishes the Profile object. |
| `id` | string | Yes | Unique identifier for the user, assigned by WorkOS. This value can be persisted to the Developer's user model and used as a unique key for identifying a specific user. |
| `connection_id` | string | Yes | Unique identifier for the Connection to which the Profile belongs. |
| `connection_type` | enum | Yes | connection.connection_type |
| `organization_id` | string | No | Unique identifier for the Organization in which the Connection resides. |
| `email` | string | Yes | The user's email address. |
| `first_name` | string | No | The user's first name. |
| `last_name` | string | No | The user's last name. |
| `name` | string | No | The user's full name. |
| `idp_id` | string | Yes | Unique identifier for the user, assigned by the Identity Provider. Different Identity Providers use different ID formats. One possible use case for idp_id is associating a user's SSO Profile with any relevant Directory Sync actions related to that user. |
| `role` | object | Yes | profile.role |
| `custom_attributes` | object | Yes | Object containing custom attributes that have been mapped from the Identity Provider. These attributes are configured in the [WorkOS Dashboard](https://dashboard.workos.com/) and can include both predefined and custom attributes. For more information about configuring custom attributes, see the [IdP Attributes](/sso/attributes) guide. |

### POST /sso/token

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `client_id` | string | Yes | The client ID of the WorkOS environment. |
| `client_secret` | string | Yes | The client secret of the WorkOS environment. |
| `code` | string | Yes | The authorization value which was passed back as a query parameter in the callback to the [Redirect URI](/reference/sso/get-authorization-url/redirect-uri). |
| `grant_type` | "authorization_code" | Yes | The method by which your application will receive an access token. This value should be `authorization_code`. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `token_type` | "Bearer" | The type of token issued. |
| `access_token` | string | An access token that can be exchanged for a user profile. Access tokens expire 5 minutes after they're created. |
| `expires_in` | integer | The lifetime of the access token in seconds. |
| `profile` | object | The user profile returned by the identity provider. |
| `oauth_tokens` | object | OAuth tokens from the identity provider when using OAuth connections. Contains the provider name, access token, refresh token, expiration time, and scopes. |