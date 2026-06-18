# Sessions

## Introduction

When a user signs in to your app, a user session is created. Along with the [User object](https://workos.com/docs/reference/authkit/user), a successful authentication response will include an access token and refresh token. Your application can use these tokens to ensure that the user's session is still active.

Each user session can be viewed from within the WorkOS dashboard:

![Sessions Detail UI](https://images.workoscdn.com/images/295ded3e-7e8f-4322-bcc0-95db1cfc255b.png?auto=format\&fit=clip\&q=80)

Navigate to *Users* and select a user. Then, switch to *Sessions* tab and click on a user session to get more information.

## Integrating Sessions

Successful authentication responses will include both an access token and a refresh token. The access token should be stored as a secure cookie in the user's browser and should be validated by the backend on each request. The refresh token should either be stored in a secure cookie or persisted on your backend. Once the access token has expired, a new one can be obtained using the refresh token.

![Sessions Diagram](https://images.workoscdn.com/images/aa420ffa-3b8c-462c-992b-b53e458dd916.png?auto=format\&fit=clip\&q=80)\[border=false]

### Access Token

If you're using our [Next SDK](https://www.npmjs.com/package/@workos-inc/authkit-nextjs) or [Remix SDK](https://github.com/workos/authkit-remix), all the work of validating access tokens and refreshing expired tokens is handled for you (more framework support coming soon). Read on for details about how token handling works.

The access token is a JSON Web Token (JWT), which should be validated on each request using a library like jose. The [signing JWKS](https://workos.com/docs/reference/authkit/session-tokens/jwks) can be found at `http://api.workos.com/sso/jwks/<clientId>`. The JWT includes the following claims:

- `sub`: the WorkOS user id
- `sid`: the session ID (used for signing out)
- `iss`: `https://api.workos.com/` (will be your custom auth domain if configured)
- `org_id`: the organization that was selected at sign-in time (if applicable)
- `role`: the role of the selected organization membership (only applicable if an organization is selected)
- `permissions`: the permissions assigned to the role (if applicable)
- `exp`: the standard `expires_at` claim (the token should not be trusted after this time)
- `iat`: the standard `issued_at` claim

### Refresh Token

Refresh tokens should be persisted on the backend in, for instance, a database, cache, or secure http-only cookie. A new access token can be obtained by using the [authenticate with refresh token](https://workos.com/docs/reference/authkit/authentication/refresh-token) endpoint. If the session is still active, a new access token and refresh token will be returned. Refresh tokens may be rotated after use, so be sure to replace the old refresh token with the newly returned one.

### Switching Organizations

Refresh tokens can be used to obtain a new access token for a different organization by passing the `organization_id` parameter to the [authenticate with refresh token](https://workos.com/docs/reference/authkit/authentication/refresh-token) endpoint. If the session for the refresh token is authorized to access the organization, then the `org_id` will be set to the given organization, along with the `role` and `permissions` claims matching the user's membership in that organization.

If the user is not authorized for the organization, then an appropriate [authentication error](https://workos.com/docs/reference/authkit/authentication-errors) will be returned and the user will need to authenticate. Applications can use the [Get Authorization URL](https://workos.com/docs/reference/authkit/authentication/get-authorization-url) and the `organization_id` parameter to initiate the authentication flow specifically for the organization.

### Signing Out

When a user signs out of your app, the following steps should occur:

- Get the session id (`sid` claim) out of the access token.
- Delete the user's app session.
- Redirect the user's browser to [logout endpoint](https://workos.com/docs/reference/authkit/logout) endpoint (this will ensure the user's session ends at WorkOS).
- The user will be redirected back to the URL configured as your *App homepage URL*

#### Example

```javascript
// extract sessionId from access token
const sessionId = jose.decodeJwt(session.accessToken).sid;

// delete app session cookie
cookies().delete('my-app-session');

// redirect to logout endpoint
// (the user will be redirected to your app homepage url
//  after the logout completes)
redirect(workos.userManagement.getLogoutUrl({ sessionId }));
```

## Configuring Sessions

Using the WorkOS dashboard you can configure how Sessions work in your integration. In the Applications page of the [WorkOS Dashboard](https://dashboard.workos.com/environment/applications), open your application. Session length, access token duration, and inactivity timeout can all be configured within the Sessions tab.

![Screenshot of the WorkOS dashboard Applications Sessions tab showing Session lifetime and Cross-Origin Resource Sharing cards.](https://images.workoscdn.com/images/dd7763cd-8359-46f6-b9db-98c43ac4f4e4.png?auto=format\&fit=clip\&q=80)

- Maximum session length: The session will expire after this length of time. Once expired the user will need to sign in again.
- Access token duration: Your backend can verify the access token on each request (see the [Integrating Sessions](#integrating-sessions) section above). It's recommended to keep the access token duration short so that changes in the session are quickly reflected in your app.
- Inactivity timeout: The session ends if a refresh has not occurred in this length of time. The user will need to sign in again.

Additionally, make sure to review your settings in the *Redirect* section:

### Sign-out redirect

Make sure to set a default Sign-out redirect, which will be the location users will be redirected to after their session has been ended. Non-default Sign-out redirects can be used as values to the `return_to` parameter of the [Logout API](https://workos.com/docs/reference/authkit/logout/get-logout-url) in order to dynamically choose the final logout redirect location.

#### Wildcards

WorkOS supports using wildcard characters (`*`) in sign-out redirects to handle dynamic subdomains or variable ports during development.

##### Subdomains

The `*` symbol can be used as a wildcard for subdomains; however, it must be used in accordance with the following rules:

- The protocol of the URL **must not** be `http:` in production environments.
- The wildcard **must** be located in the subdomain furthest from the root domain (e.g., `https://*.sub.example.com` will work, but `https://sub.*.example.com` will not).
- The URL **must not** contain more than one wildcard.
- A wildcard character **may** be prefixed and/or suffixed (e.g., `https://prefix-*-suffix.example.com`).
- A wildcard **will not** match across multiple subdomain levels (e.g., `https://*.example.com` will not match `https://sub1.sub2.example.com`).
- Wildcards cannot be used with [public suffix domains](https://publicsuffix.org) (e.g., `https://*.ngrok-free.app` will not work).
- The wildcard will match letters, digits, hyphens, and underscores.
- A URL with a wildcard cannot be set as the default sign-out redirect.

##### Ports

To support [RFC 8252](https://datatracker.ietf.org/doc/html/rfc8252#section-7.3) ("OAuth 2.0 for Native Apps") and local development, a wildcard may be used in place of the port number.

- This is strictly limited to `localhost` and loopback IP addresses (e.g., `127.0.0.1`).
- Example: `http://localhost:*/signed-out` is valid.
