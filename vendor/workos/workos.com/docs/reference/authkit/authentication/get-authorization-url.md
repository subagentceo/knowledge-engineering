# Get an authorization URL

Generates an OAuth 2.0 authorization URL to authenticate a user with AuthKit or SSO.

#### Request

#### Response

If you are using AuthKit, set the provider parameter to `"authkit"`, which will generate an authorization URL for your AuthKit domain. AuthKit will take care of detecting the user's authentication method, such as identifying whether they use Email + Password or Single Sign-On,and direct them to the corresponding login flow.

Otherwise, to generate an authorization URL for a WorkOS SSO connection, you'll have to specify the user's connection, organization, or OAuth provider as a parameter. These connection selectors are mutually exclusive, and exactly one must be provided. The generated URL automatically directs the user to their identity provider. Once the user authenticates with their identity provider, WorkOS then issues a redirect to your redirect URI to complete the sign-in flow.

### Error codes

If there is an issue generating an authorization URL, the API will return the original redirect URI with `error` and `error_description` query parameters. If provided, the `state` value will also be included.

```url title="Redirect URI with an error code"
https://your-app.com/callback?error=organization_invalid&error_description=No%20connection%20associated%20with%20organization&state=123456789
```

Possible error codes and the corresponding descriptions are listed below.

| Error code                      | Description                                                                                                                                                                                                                                                                                                                        |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `access_denied`                 | The identity provider denied user access to the client application or the user denied an OAuth authorization request at the identity provider.                                                                                                                                                                                     |
| `ambiguous_connection_selector` | A connection could not be uniquely identified using the provided connection selector (e.g., organization). This can occur when there are multiple SSO connections under the same organization. If you need multiple SSO connections for an organization, use the connection parameter to identify which connection to use for SSO. |
| `connection_invalid`            | There is no connection for the provided ID.                                                                                                                                                                                                                                                                                        |
| `connection_strategy_invalid`   | The provider has multiple strategies associated per environment.                                                                                                                                                                                                                                                                   |
| `connection_unlinked`           | The connection associated with the request is unlinked.                                                                                                                                                                                                                                                                            |
| `invalid_connection_selector`   | A valid connection selector query parameter must be provided in order to correctly determine the proper connection to return an authorization URL for. Valid connection selectors are either `connection`, `organization`, or `provider`.                                                                                          |
| `organization_invalid`          | There is no organization matching the provided ID.                                                                                                                                                                                                                                                                                 |
| `oauth_failed`                  | An OAuth authorization request failed for a user.                                                                                                                                                                                                                                                                                  |
| `server_error`                  | The SSO authentication failed for the user. More detailed errors and steps to resolve are available in the Sessions tab on the connection page in the WorkOS Dashboard.                                                                                                                                                            |

### PKCE

The [Proof Key for Code Exchange](https://datatracker.ietf.org/doc/html/rfc7636) (PKCE) flow is an extension to the OAuth 2.0 Authorization Code flow. It enables public clients, like native apps or single-page apps, to perform the authorization code flow securely. If you are developing a client that makes API calls in public, you'll need to use this flow.

In this flow, your client generates a code verifier which is a high-entropy cryptographic random string. A code challenge is derived by hashing the code verifier. Instead of using a client secret, provide the code challenge when [getting the authorization URL](https://workos.com/docs/reference/authkit/authentication/get-authorization-url) and the code verifier when [authenticating a User](https://workos.com/docs/reference/authkit/authentication/code).

### Redirect URI

In the [OAuth 2.0](https://workos.com/docs/glossary/oauth-2-0) protocol, a redirect URI is the location that the user is redirected to once they have successfully authenticated with their identity provider.

When redirecting the user, WorkOS will generate an authorization code and pass it to your redirect URI as a `code` query parameter, your app will use this code to [authenticate the user](https://workos.com/docs/reference/authkit/authentication/code). Additionally, WorkOS can pass a `state` parameter back to your application that you may use to encode arbitrary information to restore your application state between the redirects.

```url title="Redirect URI with query parameters"
https://your-app.com/callback?code=01E2RJ4C05B52KKZ8FSRDAP23J&state=dj1kUXc0dzlXZ1hjUQ==
```

You can use `state` to encode parameters like originating URL and query parameters. This is useful in a flow where unauthenticated users are automatically redirected to a login page. After successful sign in, users will be routed to your redirect URI callback route. From there you can extract the originating URL from `state` and redirect the user to their intended destination.

You'll need to configure the allowed redirect URIs for your application in the [Applications](https://dashboard.workos.com/environment/applications) section of the WorkOS Dashboard. Open your application and go to the **Redirects** tab. Without a valid redirect URI, your users will be unable to sign in. Make sure that the redirect URI you use as a parameter to get the authorization URL matches one of the redirect URIs configured for the application.

Redirect URIs follow stricter requirements in production environments:

- `HTTPS` protocol is required in production environments
- `HTTP` and `localhost` are allowed in staging environments
- The sole exception is the use of `http://127.0.0.1` in production environments to support native clients.

#### Wildcards

WorkOS supports using wildcard characters (`*`) in Redirect URIs to handle dynamic subdomains or variable ports during development.

##### Subdomains

The `*` symbol can be used as a wildcard for subdomains; however, it must be used in accordance with the following rules:

- The protocol of the URL **must not** be `http:` in production environments.
- The wildcard **must** be located in the subdomain furthest from the root domain (e.g., `https://*.sub.example.com` will work, but `https://sub.*.example.com` will not).
- The URL **must not** contain more than one wildcard.
- A wildcard character **may** be prefixed and/or suffixed (e.g., `https://prefix-*-suffix.example.com`).
- A wildcard **will not** match across multiple subdomain levels (e.g., `https://*.example.com` will not match `https://sub1.sub2.example.com`).
- Wildcards cannot be used with [public suffix domains](https://publicsuffix.org) (e.g., `https://*.ngrok-free.app` will not work).
- The wildcard will match letters, digits, hyphens, and underscores.
- A URL with a wildcard cannot be set as the default redirect URI.

##### Ports

To support [RFC 8252](https://datatracker.ietf.org/doc/html/rfc8252#section-7.3) ("OAuth 2.0 for Native Apps") and local development, a wildcard may be used in place of the port number.

- This is strictly limited to `localhost` and loopback IP addresses (e.g., `127.0.0.1`).
- Example: `http://localhost:*/auth/callback` is valid.

### GET /user_management/authorize

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `code_challenge_method` | "S256" | No | The only valid PKCE code challenge method is `"S256"`. This parameter is required when specifying a `code_challenge` for the PKCE flow. |
| `code_challenge` | string | No | Code challenge is derived from the code verifier used for the PKCE flow. |
| `domain_hint` | string | No | Can be used to pre-fill the domain field when initiating authentication with Microsoft OAuth or with a Google SAML connection type. |
| `connection_id` | string | No | Used to initiate SSO for a connection. The value should be a WorkOS connection ID. You can persist the WorkOS connection ID with application user or team identifiers. WorkOS will use the connection indicated by the connection parameter to direct the user to the corresponding IdP for authentication. |
| `provider_query_params` | object | No | Key/value pairs of query parameters to pass to the OAuth provider. |
| `provider_scopes` | string[] | No | A list of additional OAuth scopes to request from the OAuth provider. This parameter can be used with Google OAuth, Microsoft OAuth, GitHub OAuth, GitLab OAuth, and Xero OAuth. Tokens from the OAuth provider will be included in the authentication response if your OAuth connection for the provider is configured in the WorkOS Dashboard to return OAuth tokens. |
| `invitation_token` | string | No | A token representing a user invitation to redeem during authentication. |
| `screen_hint` | "sign-up" \| "sign-in" | No | Specify which AuthKit screen users should land on upon redirection (Only applicable when provider is 'authkit'). |
| `login_hint` | string | No | Can be used to pre-fill the username/email address field of the IdP sign-in page for the user, if you know their username ahead of time. Currently, this parameter is supported for OAuth, AuthKit, OpenID Connect, Okta, Entra ID, and custom SAML connections. |
| `provider` | "authkit" \| "AppleOAuth" \| "BitbucketOAuth" \| ... | No | Used to initiate authentication with AuthKit, Google OAuth, Microsoft OAuth, GitHub OAuth, or Sign in with Apple. |
| `prompt` | string | No | Controls the authentication flow behavior for the user. |
| `state` | string | No | An optional parameter that can be used to encode arbitrary information to help restore application state between redirects. If included, the redirect URI received from WorkOS will contain the exact state value that was passed. |
| `organization_id` | string | No | Used to initiate SSO for an organization. The value should be a WorkOS organization ID. You can persist the WorkOS organization ID with application user or team identifiers. WorkOS will use the organization ID to determine the appropriate connection and the IdP to direct the user to for authentication. If this parameter is passed when `provider` is also set to `authkit`, then the organization will be automatically selected during the authentication flow. |
| `response_type` | "code" | Yes | The only valid option for the response type parameter is `"code"`. The `"code"` parameter value initiates an [authorization code grant type](https://tools.ietf.org/html/rfc6749#section-4.1). This grant type allows you to exchange an authorization code for an access token during the redirect that takes place after a user has authenticated with an identity provider. |
| `redirect_uri` | string | Yes | Where to redirect the user after they complete the authentication process. You must use one of the redirect URIs configured in the [Applications](https://dashboard.workos.com/environment/applications) section of the dashboard (open your application and go to the Redirects tab). |
| `client_id` | string | Yes | The unique identifier of the WorkOS environment client. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `url` | string | An OAuth 2.0 authorization URL. |