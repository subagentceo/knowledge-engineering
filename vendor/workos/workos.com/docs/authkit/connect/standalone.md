# Standalone Connect

## Overview

Standalone Connect allows applications with existing authentication systems to use AuthKit as their OAuth authorization server. You maintain your existing authentication stack while leveraging AuthKit's OAuth infrastructure for token issuance and management.

Unlike standard AuthKit integration, Standalone Connect delegates authentication to your application, then handles the OAuth flow and token issuance for OAuth clients. This feature works with [OAuth applications](https://workos.com/docs/authkit/connect/oauth) only—[M2M applications](https://workos.com/docs/authkit/connect/m2m) use the `client_credentials` flow which doesn't involve user authentication.

## When to use Standalone Connect

Use Standalone Connect when you:

- Have an existing authentication stack in your application.
- Need to enable OAuth-based integrations, like a [CLI](https://workos.com/docs/authkit/cli-auth) app or [MCP](https://workos.com/docs/authkit/mcp) server.
- Want to support third-party applications accessing your users' resources.

## Getting started

### Create an OAuth application

Before testing your Standalone Connect integration, you'll need to [create an OAuth application](https://workos.com/docs/authkit/connect/oauth) in the WorkOS Dashboard. If you need to support MCP auth, you'll need to enable Client ID Metadata Document (CIMD), which you can read more about in the [MCP guide](https://workos.com/docs/authkit/mcp).

### Configure your Login URI

Navigate to *Connect* → *Configuration* in the [WorkOS Dashboard](https://dashboard.workos.com) and provide your **Login URI**.

The **Login URI** is where AuthKit will redirect users to authenticate with your existing system. You can only configure one Login URI per environment.

Your Login URI must:

- Use HTTPS in production.
- Accept an `external_auth_id` query parameter.
- Authenticate users with your existing system.
- Call the AuthKit completion API after successful authentication. More on that below.

Example: `https://your-app.example.com/auth/login`

## Authentication flow

### (1) OAuth client initiates flow

OAuth clients start the authorization flow by redirecting users to the [`/oauth2/authorize`](https://workos.com/docs/reference/workos-connect/authorize) endpoint on your AuthKit domain following standard OAuth 2.0. This could be a third-party application, partner integration, or any OAuth-enabled client.

### (2) AuthKit redirects to your application

AuthKit redirects users to your Login URI with an `external_auth_id` parameter:

```txt
https://your-app.example.com/auth/login?external_auth_id=01J3X4Y5Z6A7B8C9D0E1F2G3H4
```

The `external_auth_id` is a temporary identifier used to complete the flow with AuthKit.

### (3) Authenticate the user

Your application authenticates users with your existing system. If users have an active session, skip to the next step.

AuthKit handles OAuth consent separately, so your application doesn't need to display any consent screens.

### (4) Complete authentication with AuthKit

Call the [AuthKit completion API](https://workos.com/docs/reference/workos-connect/standalone/complete) after authenticating the user, passing the `external_auth_id` that your Login URI originally received:

```js
const response = await fetch('https://api.workos.com/authkit/oauth2/complete', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.WORKOS_API_KEY}`,
  },
  body: JSON.stringify({
    external_auth_id: externalAuthId,
    user: {
      id: user.id,
      email: user.email,
      first_name: user.firstName,
      last_name: user.lastName,
      metadata: { department: user.department },
    },
  }),
});

const { redirect_uri } = await response.json();
```

### (5) Return control to AuthKit

Redirect users to the `redirect_uri` from the API response. AuthKit displays a consent screen if needed, then redirects back to the OAuth client's `redirect_uri` with an authorization code. The OAuth client exchanges this code for tokens via the [`/oauth2/token`](https://workos.com/docs/reference/workos-connect/token/authorization-code-grant) endpoint on your AuthKit domain.

## Integrating via the API

### Dynamic consent options

You can provide `user_consent_options` to display options during the OAuth consent screen. This is useful when users need to choose specific resources or contexts (like a parent resource in your application) to grant access to.

Each consent option must include:

- `claim`: The name of the access token claim that will hold the user's selected value.
- `type`: The format of the option. Only `enum` is supported currently.
- `label`: Display text for the option.
- `choices`: Array of choices (can be flat or grouped).

```js
const response = await fetch('https://api.workos.com/authkit/oauth2/complete', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.WORKOS_API_KEY}`,
  },
  body: JSON.stringify({
    external_auth_id,
    user: { id: user.id, email: user.email },
    user_consent_options: [
      {
        claim: 'urn:example:tenant',
        type: 'enum',
        label: 'Environment',
        choices: [
          {
            group: 'Production',
            choices: [
              { value: 'prod_us', label: 'US-East' },
              { value: 'prod_eu', label: 'EU-West' },
            ],
          },
          {
            group: 'Development',
            choices: [
              { value: 'dev_main', label: 'Development' },
              { value: 'staging', label: 'Staging' },
            ],
          },
        ],
      },
    ],
  }),
});
```

The selected values appear as custom claims in the issued tokens. For example, if the user selects one of the above options, the token will include:

```json
{
  "sub": "user_123",
  "email": "user@example.com",
  "urn:example:tenant": "prod_us"
  // ...
}
```

### Error handling

If the `external_auth_id` is invalid, the call to the AuthKit completion API will fail. Your application is free to choose how to handle this case, but redirecting to your application's homepage is recommended.

### Token verification

Resource servers verify tokens issued by AuthKit using standard Connect token verification:

```js
import { jwtVerify, createRemoteJWKSet } from 'jose';

const JWKS = createRemoteJWKSet(new URL('https://authkit_domain/oauth2/jwks'));

async function verifyToken(token) {
  const { payload } = await jwtVerify(token, JWKS, {
    audience: 'client_123456789',
    issuer: 'https://authkit_domain',
  });

  return payload;
}
```

See the [Connect documentation](https://workos.com/docs/authkit/connect/oauth/verifying-tokens) for details on token expiration, refresh tokens, and revocation.
