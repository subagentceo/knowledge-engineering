# Single Logout

> Currently, Single Logout is only supported for [OpenID Connect connections](https://workos.com/docs/integrations/oidc) and limited scenarios.
> If you are looking to implement this feature, please reach out to [WorkOS support](mailto:support@workos.com).

## RP-initiated Logout

With an Relying-Party-initiated (RP-initiated) logout, a user is logged out of your application and all other applications they are
logged into via the identity provider. This is achieved by redirecting the user to the [Logout Redirect](https://workos.com/docs/reference/sso/logout/redirect) endpoint.

Before redirecting the user, you need to generate a logout token by calling the
[Logout Authorize](https://workos.com/docs/reference/sso/logout/authorize) endpoint with the user’s profile ID which can be obtained
from the [User Profile](https://workos.com/docs/reference/sso/profile/get-profile-and-token) endpoint.

Next, pass the logout token as a query parameter to the [Logout Redirect](https://workos.com/docs/reference/sso/logout/redirect) endpoint.

![RP-initiated logout](https://images.workoscdn.com/images/63a9710b-ff61-456b-aea7-d572b3621271.png?auto=format\&fit=clip\&q=50)

By following these steps, the user will be securely logged out of your application and all other associated
applications through the identity provider.

Note that, this feature is only supported for OpenID Connect providers that brings the
`revocation_endpoint` and `end_session_endpoint` in the OIDC discovery document.

***

## IdP-initiated Logout

For the Identity-Provider-initiated (IdP-initiated) logout, WorkOS provides the `https://auth.workos.com/sso/oidc/idp-logout/:external_key` endpoint
which needs to be registered in the customer's Identity Provider as the logout endpoint for your application.

When a user logs out of your application via the IdP, the IdP should call this endpoint which will redirect
to a logout endpoint in your application. This logout endpoint should clear all the cookies in your application.

You should contact [WorkOS support](mailto:support@workos.com) for both:

- obtaining the `https://auth.workos.com/sso/oidc/idp-logout/:external_key` for registering in your customer's IdP
- informing the logout endpoint in your application.

![IdP-initiated logout](https://images.workoscdn.com/images/aeda8074-7e61-4a3c-850e-278acd510bd8.png?auto=format\&fit=clip\&q=50)
