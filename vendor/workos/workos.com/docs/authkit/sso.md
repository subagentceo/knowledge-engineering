# Single Sign-On

## Introduction

Single Sign-On is the most frequently asked for requirement by organizations looking to adopt new SaaS applications. SSO enables authentication via an organization's [identity provider (IdP)](https://workos.com/docs/glossary/idp).

This service is compatible with any IdP and supports both the [SAML](https://workos.com/docs/glossary/saml) and [OIDC](https://workos.com/docs/glossary/oidc) protocols. It's modeled to meet the [OAuth 2.0](https://workos.com/docs/glossary/oauth-2-0) framework specification, abstracting away the underlying authentication handshakes between different IdPs.

## Getting started

AuthKit greatly simplifies the process of integrating SSO into your application. AuthKit will make the necessary API calls automatically and handle the routing of SSO users when their account is associated with an existing SSO connection.

## (1) Enable SSO

Navigate to the *Authentication* settings section in the [WorkOS Dashboard](https://dashboard.workos.com/) and enable Single Sign-On.

![Dashboard demonstrating how to enable Single Sign-On](https://images.workoscdn.com/images/09c9b3c5-833e-4fe0-985b-f5b1934e4284.png?auto=format\&fit=clip\&q=80)

AuthKit will now automatically detect when a user is attempting to sign in via SSO and redirect them to the appropriate IdP.

## (2) Test with the Test Identity Provider

To confirm your Single Sign-On integration works correctly you can use the Test Identity Provider to simulate login flows end-to-end. Your staging environment includes a default Test Organization and active SSO connection configured with the Test Identity Provider.

![WorkOS Test Identity Provider](https://images.workoscdn.com/images/7b7407d7-dcc7-4fd4-859f-4ee4214d69c2.png?auto=format\&fit=clip\&q=80)

### Getting started

Log into the [WorkOS Dashboard](https://dashboard.workos.com/) and navigate to the *Test SSO* page to get started with the Test IdP. This page outlines a number of different SSO scenarios you can follow and provides all the necessary information to complete the tests.

![Test SSO WorkOS Dashboard](https://images.workoscdn.com/images/7b7407d7-dcc7-4fd4-859f-4ee4214d69c2.png?auto=format\&fit=clip\&q=80)

### Service provider-initiated SSO

This case is likely the first [login flow](https://workos.com/docs/sso/login-flows/sp-initiated-sso) you would test when implementing SSO in your app. The test simulates users initiating authentication from your sign-in page. In this scenario, the user enters their email in your app, gets redirected to the identity provider, and then is redirected back to your application.

### Identity provider-initiated SSO

This test simulates users initiating authentication from their identity provider. It is a common [login flow](https://workos.com/docs/sso/login-flows/idp-initiated-sso) that developers forget to consider. In the scenario, users log in to the identity provider directly, select your application from their list of SSO-enabled apps, and are redirected to your application upon successful authentication.

### Guest email domain

This test simulates users authenticating with an email domain different from the verified domain of the test organization, `example.com`. A relevant scenario is authenticating freelance users, whose email domain is not owned by the company.

### Error response

This test simulates a generic [error response](https://workos.com/docs/reference/sso/get-authorization-url/error-codes) from the user's identity provider. In this scenario, SSO authentication has failed for the user. Below is an example of the error-related parameters passed to the [redirect URI](https://workos.com/docs/sso/redirect-uris) in your application.

***

## (3) Test with other identity providers

Test Identity Provider saves time by providing an out of the box experience compared to the configuration process that someone using a real identity provider would have to go through to enable Single Sign-On for your app.

If your integration works with the Test Identity Provider, you can be sure it will work with other identity providers. However, it may be helpful to also learn about the setup process that your customers will go through on their side, which varies depending on a specific identity provider.

### Create an organization

To get started, you will need to [create an organization](https://dashboard.workos.com/organizations) in the WorkOS Dashboard. Organizations in WorkOS represent your customer, so by creating an organization, you can test your SSO connection the way your customers will experience it.

![Create an organization dialog](https://images.workoscdn.com/images/2ef3565c-526a-42e6-9830-622e83b67ee5.png?auto=format\&fit=clip\&q=80)

### Create a connection

Go to the organization you created and click *Invite admin*. Select *Single Sign-On* from the list of features. In the next step, enter an email address to send the setup link to, or click *Copy setup link*.

The setup link goes to Admin Portal, where your customers get the exact instructions for every step they need to take to enable Single Sign-On with your app.

> You can also integrate [Admin Portal](https://workos.com/docs/admin-portal) directly into your app to enable self-serve setup of Single Sign-On and other enterprise features for your users.

![Invite an admin dialog](https://images.workoscdn.com/images/b9ab80fc-606a-417c-bade-3483ef48c2ae.png?auto=format\&fit=clip\&q=80)

### Follow the Admin Portal instructions

To complete the integration, you'll have to also create an account with the identity provider you want to test with. After you have signed up with an identity provider of your choice, follow the corresponding Admin Portal instructions from the setup link. Once done, you can start testing your SSO integration with that identity provider.

![Admin Portal setup instructions](https://images.workoscdn.com/images/0ee15c3d-5356-4f41-a26a-440f95355b28.png?auto=format\&fit=clip\&q=80)

The setup instructions you've seen in the Admin Portal are also available directly in the docs if you want to create a connection manually:

***

## Integrating via the API

If you'd prefer to build and manage your own authentication UI, you can do so via the AuthKit [Authentication API](https://workos.com/docs/reference/authkit/authentication).

Examples of building custom UI are also [available on GitHub](https://github.com/workos/authkit).
