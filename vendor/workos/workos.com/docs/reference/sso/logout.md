# Logout

The Logout endpoints enable the RP-initiated logout functionality for users in your application.
Refer to [Single Logout](https://workos.com/docs/sso/single-logout/idp-initiated-logout) section for more details on how to handle
RP-initiated or IdP-initiated logout.

> Please note that the Logout feature is only available for Custom Open ID connections that provide
> specific logout features. These features include the presence of the `revocation_endpoint` and `end_session_endpoint`
> in the discovery document.

## Logout Authorize

You should call this endpoint from your server to generate a logout token which is required for the [Logout Redirect](https://workos.com/docs/reference/sso/logout) endpoint.

#### Request

#### Response

## Logout Redirect

Logout allows to sign out a user from your application by triggering the identity provider sign out flow.
This `GET` endpoint should be a redirection, since the identity provider user will be identified in the browser session.

Before redirecting to this endpoint, you need to generate a short-lived logout token using the
[Logout Authorize](https://workos.com/docs/reference/sso/logout/authorize) endpoint.

#### Request

### /sso/logout/authorize

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `profile_id` | string | Yes | The unique ID of the profile to log out. |

### GET /sso/logout

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `token` | string | Yes | The logout token returned from the [Logout Authorize](/reference/sso/logout/authorize) endpoint. |