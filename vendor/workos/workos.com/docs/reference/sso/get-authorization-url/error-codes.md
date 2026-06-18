# Get an authorization URL

Generates an OAuth 2.0 authorization URL to authenticate a user with SSO.

#### Request

#### Response

You'll have to specify the user's connection, organization, or OAuth provider as a parameter. These connection selectors are mutually exclusive, and exactly one must be provided. The generated URL automatically directs the user to their identity provider. Once the user authenticates with their identity provider, WorkOS then issues a redirect to your redirect URI to complete the sign-in flow.

### Error codes

If there is an issue generating an authorization URL, the API will return the original redirect URI with `error` and `error_description` query parameters. If provided, the `state` value will also be included.

```url title="Redirect URI with an error code"
https://your-app.com/callback?error=organization_invalid&error_description=No%20connection%20associated%20with%20organization&state=123456789
```

Possible error codes and the corresponding descriptions are listed below.

| Error code                                 | Description                                                                                                                                                                                                                                                                                                                        |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `access_denied`                            | The identity provider denied the user's access to the client application, or the user declined the OAuth authorization request at the identity provider.                                                                                                                                                                           |
| `ambiguous_connection_selector`            | A connection could not be uniquely identified using the provided connection selector (e.g., organization). This can occur when there are multiple SSO connections under the same organization. If you need multiple SSO connections for an organization, use the connection parameter to identify which connection to use for SSO. |
| `connection_domain_invalid`                | There is no connection for the provided domain.                                                                                                                                                                                                                                                                                    |
| `connection_invalid`                       | There is no connection for the provided ID.                                                                                                                                                                                                                                                                                        |
| `connection_strategy_invalid`              | The provider has multiple strategies associated per environment.                                                                                                                                                                                                                                                                   |
| `connection_unlinked`                      | The connection associated with the request is unlinked.                                                                                                                                                                                                                                                                            |
| `domain_connection_selector_not_allowed`   | This is a legacy error code that only applies if using the deprecated "domain" query parameter which is no longer valid for this endpoint. Use the "organization" or "connection" query parameters to target a connection instead.                                                                                                 |
| `idp_initiated_sso_disabled`               | IdP-initiated SSO is disabled for the connection (see [Disable IdP-initiated SSO](https://workos.com/docs/sso/login-flows/idp-initiated-sso/disable-idp-initiated-sso-beta)).                                                                                                                                                                             |
| `invalid_connection_selector`              | A valid connection selector query parameter must be provided in order to correctly determine the proper connection to return an authorization URL for. Valid connection selectors are either `connection`, `organization`, or `provider`.                                                                                          |
| `organization_invalid`                     | There is no organization matching the provided ID.                                                                                                                                                                                                                                                                                 |
| `oauth_failed`                             | An OAuth authorization request failed for a user.                                                                                                                                                                                                                                                                                  |
| `profile_not_allowed_outside_organization` | A profile was received that has an `email` that is outside the [organization's domain](https://workos.com/docs/reference/domain-verification) and the organization does not allow this. To resolve this, add the missing domain to the organization's Domains. You can read about other options in the [SSO Domains guide](https://workos.com/docs/sso/domains).                 |
| `server_error`                             | The SSO authentication failed for the user. More detailed errors and steps to resolve are available in the Sessions tab on the connection page in the WorkOS Dashboard.                                                                                                                                                            |
| `signin_consent_denied`                    | The user rejected the sign-in consent screen. This screen prompts the user to verify the email provided by the identity provider to confirm the legitimacy of the sign-in attempt.                                                                                                                                                 |

### Redirect URI

In the [OAuth 2.0](https://workos.com/docs/glossary/oauth-2-0) protocol, a redirect URI is the location that the user is redirected to once they have successfully authenticated with their identity provider.

When redirecting the user, WorkOS will generate an authorization code and pass it to your redirect URI as a `code` query parameter, your app will use this code to [get the user's profile](https://workos.com/docs/reference/sso/profile/get-profile-and-token). Additionally, WorkOS can pass a `state` parameter back to your application that you may use to encode arbitrary information to restore your application state between the redirects.

```url title="Redirect URI with query parameters"
https://your-app.com/callback?code=01E2RJ4C05B52KKZ8FSRDAP23J&state=dj1kUXc0dzlXZ1hjUQ==
```

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

### GET /sso/authorize

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `provider_scopes` | string[] | No | Additional scopes to request from the identity provider. Applicable when using OAuth or OpenID Connect connections. |
| `provider_query_params` | object | No | Key/value pairs of query parameters to pass to the OAuth provider. Only applicable when using OAuth connections. |
| `client_id` | string | Yes | The unique identifier of the WorkOS environment client. |
| `domain` | string | No | Deprecated. Use `connection` or `organization` instead. Used to initiate SSO for a connection by domain. The domain must be associated with a connection in your WorkOS environment. |
| `provider` | "AppleOAuth" \| "BitbucketOAuth" \| "GitHubOAuth" \| ... | No | Used to initiate OAuth authentication with Google, Microsoft, GitHub, or Apple. |
| `redirect_uri` | string | Yes | Where to redirect the user after they complete the authentication process. You must use one of the redirect URIs configured in the [Applications](https://dashboard.workos.com/environment/applications) section of the dashboard (open your application and go to the Redirects tab). |
| `response_type` | "code" | Yes | The only valid option for the response type parameter is `"code"`. The `"code"` parameter value initiates an [authorization code grant type](https://tools.ietf.org/html/rfc6749#section-4.1). This grant type allows you to exchange an authorization code for an access token during the redirect that takes place after a user has authenticated with an identity provider. |
| `state` | string | No | An optional parameter that can be used to encode arbitrary information to help restore application state between redirects. If included, the redirect URI received from WorkOS will contain the exact `state` that was passed. |
| `connection` | string | No | Used to initiate SSO for a connection. The value should be a WorkOS connection ID. You can persist the WorkOS connection ID with application user or team identifiers. WorkOS will use the connection indicated by the connection parameter to direct the user to the corresponding IdP for authentication. |
| `organization` | string | No | Used to initiate SSO for an organization. The value should be a WorkOS organization ID. You can persist the WorkOS organization ID with application user or team identifiers. WorkOS will use the organization ID to determine the appropriate connection and the IdP to direct the user to for authentication. |
| `domain_hint` | string | No | Can be used to pre-fill the domain field when initiating authentication with Microsoft OAuth or with a Google SAML connection type. |
| `login_hint` | string | No | Can be used to pre-fill the username/email address field of the IdP sign-in page for the user, if you know their username ahead of time. Currently, this parameter is supported for OAuth, OpenID Connect, Okta, Entra ID, Google SAML, and custom SAML connections. |
| `nonce` | string | No | A random string generated by the client that is used to mitigate replay attacks. |

#### Returns

| Field | Type | Description |
| --- | --- | --- |
| `url` | string | An OAuth 2.0 authorization URL. |