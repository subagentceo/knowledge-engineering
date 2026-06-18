# Applications

## Introduction

### Single Application

A default application is automatically generated for each environment. If your product only has one client, no action is needed. You can see and set your application's API keys, Redirects and Sessions configuration in the Applications section of the [WorkOS Dashboard](https://dashboard.workos.com/get-started).

### Multiple Applications

Multiple Applications lets developers define each client as its own application object within an environment in the [WorkOS Dashboard](https://dashboard.workos.com/get-started). Each application gets its own client ID, session configuration, redirect URIs, and credentials, while sharing the same underlying user pool. Users and organizations are shared across applications with a unified login experience, without duplicate accounts or fragmented identity data.

## Use cases

**One product spanning multiple client surfaces**
: Web app + mobile app + desktop client: model all three surfaces explicitly, each with platform-appropriate behavior.

**Multiple products with a shared user pool**
: App A + App B + App C: define each as its own application with appropriate session lifetimes and redirect URIs.

## Caveats

Multiple Applications is not the right fit for every scenario. Two common cases where a different approach is better:

### Separate user pools

If you need entirely separate user pools, use separate environments instead. Each environment maintains its own isolated set of users and organizations.

### Separate branding

If your goal is to present a different look and feel on the AuthKit login screen, that's a branding concern rather than an application modeling one. [Branding](https://workos.com/docs/authkit/branding) for the hosted AuthKit UI is configured in the Branding section of the WorkOS Dashboard and is globally applied to all applications in all environments.

If you need more branding control and customization, WorkOS supports the option to [self-host your UI](https://workos.com/docs/authkit/hosted-ui/integrating) and manage authentication with the AuthKit API.

## Getting started

Applications are created and managed in the Applications section of the [WorkOS Dashboard](https://dashboard.workos.com/get-started).

Once created, each application exposes its own configuration surface:

- **Client ID** — a unique identifier for this application, used when initiating authentication flows.
- **Redirect URIs** — the endpoints AuthKit will return users to after authentication. Password resets, sign-in flows, and invitation links automatically route to the correct destination for the application.
- **Session policy** — configure session lifetimes appropriate for the platform. A mobile app can stay signed in longer; a web app can follow a shorter expiration window. Each application behaves according to platform expectations without affecting the others.
- **Credentials and API keys** — each application manages its own credentials, making it easier to isolate client configuration while keeping all applications connected to the same identity layer.

### Default application

The first application listed in the Applications section of the [WorkOS Dashboard](https://dashboard.workos.com/get-started) is the application that was automatically generated for the environment. You can think of this first application as the default application.

> The default application is used for IdP-initiated SSO.

## Invitations

Invitations sent via the WorkOS Dashboard are always associated with the environment's default application.

Invitations sent via the API or User Management widget will preserve the application context of the API key/widget so that the invited user lands in the right place.

## Access token claims

`iss`
: The `iss` claim is the same for all applications in the environment. It will reference the default application's client id.

`client_id`
: The `client_id` claim will reflect the `client_id` for the current application context.

Claims from the application context can be surfaced in the [JWT Template](https://workos.com/docs/authkit/jwt-templates).
