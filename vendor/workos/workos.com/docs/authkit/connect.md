# Connect

## Introduction

Connect is a set of controls and APIs that developers can use to allow different types of applications to access their users' identity and resources. Connect is built on top of industry-standard specifications like OAuth 2.0 and OpenID Connect in order to support many common use-cases out of the box.

Unlike AuthKit's other features that help users sign into **your application**, Connect enables **other applications** to authenticate and access your users' data through secure, managed APIs.

## Common use-cases

**Customer applications**
: Enable your customers to build custom integrations with your platform. This can include allowing them to add a "Sign in with \[your app]" button on their login page.

**Auxiliary applications**
: Allow secondary applications that support your primary application, such as support tools or discussion forums, to authenticate using the same user identities in AuthKit.

**Partner integrations**
: Issue credentials for trusted partners to authenticate with when calling your application's API.

## Getting started

Each Connect integration is defined as an Application, which can be created inside of the WorkOS Dashboard.

When creating an application, you first choose the type of integration: **OAuth** or Machine-to-Machine (**M2M**).

### OAuth applications

Select OAuth when building web or mobile applications where the actor being authenticated is a [User](https://workos.com/docs/reference/authkit/user). Integrating with an OAuth application uses the underlying `authorization_code` OAuth flow which is supported by many libraries and frameworks out of the box.

Upon successful authorization, the issued tokens will contain information about the user who signed in.

[Learn more about OAuth applications →](https://workos.com/docs/authkit/connect/oauth)

### M2M applications

Select M2M when the application will be a third-party service, such as one of your customer's applications. Integrating with an M2M application uses the underlying `client_credentials` flow.

Unlike OAuth applications, the actor being authenticated is not an individual user. Instead issued access tokens will contain an `org_id` claim which represents the customer you are granting access to via the M2M application.

The M2M application will use its `client_id` and `client_secret` to authenticate requests to your application's API or services.

[Learn more about M2M applications →](https://workos.com/docs/authkit/connect/m2m)

## Concepts

All Connect applications share the following concepts:

### Participants

When using Connect, there are several actors involved with the integration of each Application:

- **Relying Party**: The application that receives Connect-issued tokens and identity information. It may also use the access token to make requests to your API.
- **Resource server**: The service (generally your app) that allows other clients to authenticate using the Connect-issued tokens.
- **Authorization server**: This is Connect, the issuer of identity and access tokens to requesting clients after authenticating the user.

### Credentials

Applications can have up to 5 credentials. These are only shown once upon creation and do not expire. The application `client_id` and `client_secret` from a credential can be used to authenticate to the [Connect APIs](https://workos.com/docs/reference/workos-connect).

When sharing app credentials with an external party, use a secure method — like encrypted email or file sharing — and make sure the recipient is properly authenticated.
