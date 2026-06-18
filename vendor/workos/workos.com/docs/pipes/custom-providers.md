# Custom providers

## Introduction

Custom providers let you connect an OAuth provider that isn't in the WorkOS
catalog. Instead of choosing a pre-built provider, you supply the provider's
OAuth endpoints and settings yourself. Once configured, a custom provider works
just like a catalog provider: it appears in the [Pipes widget](https://workos.com/docs/widgets/pipes),
your users authorize it, and you [fetch access tokens](https://workos.com/docs/reference/pipes) from
your backend.

A custom provider is different from [custom credentials](https://workos.com/docs/pipes).
Custom credentials let you use your own OAuth application with a provider that
WorkOS already supports. A custom provider lets you define a provider that WorkOS
doesn't yet support at all.

## Create a custom provider

Open the [Pipes](https://dashboard.workos.com/environment/pipes) section of the
WorkOS Dashboard and click *Connect provider*, then choose *Add a custom
provider*. The wizard walks through the configuration in four steps.

1. **Provider details.** Enter a **name** for the provider, an optional
   **description** shown to users in the widget, and an **icon**.
2. **OAuth endpoints.** Enter the provider's **authorization URL** and **token
   URL**. If the provider issues refresh tokens from a different endpoint, set
   the **refresh token URL** as well.
3. **Credentials.** Create an OAuth application in the provider's dashboard and
   register the **redirect URI** shown in the wizard. Then enter the **client
   ID** and, if the provider requires one, the **client secret**.
4. **Scopes.** Add the scopes your application needs. Users grant these scopes
   when they authorize the connection.

## OAuth configuration reference

Most providers work with the default settings, but you can adjust how WorkOS
builds the authorization request and exchanges tokens to match your provider's
requirements.

| Field                                   | Description                                                                                                                                |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **Name**                                | The display name shown in the dashboard and the Pipes widget.                                                                              |
| **Slug**                                | A unique identifier for the provider within your environment.                                                                              |
| **Description**                         | Optional text shown to users in the widget describing how their data is used.                                                              |
| **Icon**                                | The icon shown next to the provider in the widget.                                                                                         |
| **Authorization URL**                   | The endpoint users are redirected to in order to authorize the connection.                                                                 |
| **Token URL**                           | The endpoint WorkOS calls to exchange an authorization code for tokens.                                                                    |
| **Refresh token URL**                   | Optional. The endpoint WorkOS calls to refresh tokens, if different from the token URL.                                                    |
| **Scopes**                              | The scopes requested during authorization.                                                                                                 |
| **Scopes required**                     | Whether at least one scope must be requested when authorizing.                                                                             |
| **Scope separator**                     | The character used to join multiple scopes in the request. Most providers use a space; some use a comma.                                   |
| **Client secret required**              | Whether the provider requires a client secret. Disable for providers that authorize with PKCE only.                                        |
| **PKCE enabled**                        | Whether to use PKCE (with the `S256` challenge method) during the authorization flow.                                                      |
| **Authenticate via**                    | How WorkOS sends client credentials when exchanging and refreshing tokens: in the **request body** or as a **basic authorization header**. |
| **Token body content type**             | The content type WorkOS uses for the token request body, such as `application/x-www-form-urlencoded` or `application/json`.                |
| **Additional authorization parameters** | Extra key-value pairs appended to the authorization URL, for providers that require provider-specific parameters.                          |

## Connect and fetch access tokens

A custom provider appears in the [Pipes widget](https://workos.com/docs/widgets/pipes) alongside your
other providers. Users connect their account through the widget, which manages
the authorization flow and stores the connection.

Once a user has connected the provider, [fetch access tokens](https://workos.com/docs/reference/pipes)
from your backend to call the provider's API on their behalf. Pipes refreshes
the token when needed, so you always have a fresh token.

## Edit or delete a custom provider

Edit a custom provider's configuration at any time from its settings in the
[Pipes](https://dashboard.workos.com/environment/pipes) section of the
dashboard.

Deleting a custom provider also removes its connected accounts. Existing access
tokens stop working, and users will no longer see the provider in the widget.
