# OpenID Connect

## Introduction

To set up an OpenID Connect (OIDC) connection on behalf of an organization, you'll need the client credentials and the discovery endpoint of their OIDC provider from the organization's IT team.

***

## What WorkOS provides

When setting up an OIDC connection, WorkOS provides one key piece of information in the **Service Provider Details** section for an SSO connection within the [WorkOS Dashboard](https://dashboard.workos.com/):

- [Redirect URI](https://workos.com/docs/glossary/redirect-uri): The endpoint where identity providers send authentication responses after successful login

![The Redirect URI of a OIDC connection in the WorkOS Dashboard.](https://images.workoscdn.com/images/99a7c7d5-50a9-4bff-a3f3-22dc1cfeca58.png?auto=format\&fit=clip\&q=50)

The **Redirect URI** serves as the destination for authentication responses and must be configured in the organization's identity provider admin dashboard.

***

## What you will need

You will need to obtain three pieces of information from the organization:

- [Client ID](https://workos.com/docs/glossary/client-id): Application identifier from the OIDC provider
- [Client Secret](https://workos.com/docs/glossary/client-secret): Authentication secret for the application
- [Discovery Endpoint](https://workos.com/docs/glossary/discovery-endpoint): Configuration URL containing OIDC metadata

Typically, the organization's IT team will provide these values when they configure your application in their identity provider admin dashboard. However, if you need to guide them through the process, the following sections will help.

***

## (1) Create an application with the identity provider

For SSO to properly function, the organization needs to create and configure an OpenID Connect application in their identity provider that supports the authorization code grant type.

Copy the **Redirect URI** from the WorkOS Dashboard connection settings.

Instruct IT contacts to paste this value as the login redirect URI in their OIDC application configuration. This ensures authentication responses are sent to the correct WorkOS endpoint.

***

## (2) Configure ID token claims

The organization's OIDC provider needs to include specific claims in the user ID token. Instruct them to add the following claims to their OIDC provider settings:

- `sub` (required): Maps to the `idp_id` attribute in WorkOS user profiles
- `email` (required): Maps to the `email` attribute in WorkOS user profiles
- `given_name`: Maps to the `first_name` attribute in WorkOS user profiles
- `family_name`: Maps to the `last_name` attribute in WorkOS user profiles
- `name`: Maps to the `name` attribute in WorkOS user profiles

The `sub` and `email` claims are always required. The `given_name`, `family_name`, and `name` claims follow your environment's [IdP attributes settings](https://workos.com/docs/sso/attributes). By default, `given_name` and `family_name` are enabled and required, while `name` is disabled and optional. For many providers, these claims are included by default, but some providers require manual configuration.

### Role Assignment (optional)

With [identity provider role assignment](https://workos.com/docs/sso/identity-provider-role-assignment), users can receive roles within your application based on their group memberships. To enable this functionality, instruct the organization to add the `groups` claim to the user ID token in their OIDC provider settings. This claim should map to a list of the user's group memberships.

> Finish role assignment set-up by navigating to the SSO connection page in the **Organizations** section of the [WorkOS Dashboard](https://dashboard.workos.com/). Create SSO groups by referencing the IdP Group ID. Then, assign roles to these SSO groups so group members are automatically granted roles within your application.

***

## (3) Obtain client credentials and discovery endpoint

After the organization creates an OpenID Connect application, their identity provider will provision client credentials and a discovery endpoint.

The discovery endpoint will always end with `/.well-known/openid-configuration` as described in the [OpenID Provider Configuration Request documentation](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderConfigurationRequest). You can confirm that the discovery endpoint is correct by entering it in a browser window. If there is a JSON object with metadata about the connection returned, the endpoint is correct.

In the WorkOS Dashboard, navigate to your connection settings. Paste the **Client ID**, **Client Secret**, and **Discovery Endpoint** values from the organization's IT team into their respective input fields. Click **Update connection**.

![Input the Client ID, Client Secret, and Discovery Endpoint in the WorkOS Dashboard](https://images.workoscdn.com/images/ed603b39-a06e-4c2f-b96f-7cadaa793be4.png?auto=format\&fit=clip\&q=50)

***

## PKCE (Proof Key for Code Exchange)

WorkOS supports [PKCE](https://datatracker.ietf.org/doc/html/rfc7636) for OIDC connections. PKCE adds an additional layer of security to the authorization code flow by preventing authorization code interception attacks.

In the **Advanced settings** section of your OIDC connection configuration, you can view and manage the PKCE setting.

> Only disable PKCE if you encounter issues with your identity provider. Most modern identity providers support PKCE, and keeping it enabled is strongly recommended for security.
