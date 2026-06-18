# AuthKit

## Introduction

Integrating AuthKit into your app can be done in less than ten minutes. In this guide, we'll walk you through adding a hosted authentication flow to your application using AuthKit.

In addition to this guide, there are a variety of [example apps](https://workos.com/docs/authkit/example-apps) available to help with your integration.

## Before getting started

To get the most out of this guide, you'll need:

- A [WorkOS account](https://dashboard.workos.com/)
- Your WorkOS [API Key](https://workos.com/docs/glossary/api-key) and [Client ID](https://workos.com/docs/glossary/client-id)

***

## (1) Configure your project

Let's add the necessary dependencies and configuration in your WorkOS Dashboard.

### Install dependencies

To use AuthKit with a Remix application, use the `authkit-remix` library. Start by installing it in your Remix project via `npm`.

```bash title="Install Remix SDK"
npm install @workos-inc/authkit-remix
```

### Configure a redirect URI

A redirect URI is a callback endpoint that WorkOS will redirect to after a user has authenticated. This endpoint will exchange the authorization code returned by WorkOS for an authenticated [User object](https://workos.com/docs/reference/authkit/user). We'll create this endpoint in the next step.

You can set a redirect URI in the **Redirects** section of the [WorkOS Dashboard](https://dashboard.workos.com). We recommend using `http://localhost:3000/callback` as the default here.

WorkOS supports using wildcard characters in Redirect URIs, but not for the default Redirect URI. More information about wildcard characters support can be found in the [Redirect URIs](https://workos.com/docs/sso/redirect-uris/wildcard-characters) guide.

![Dashboard redirect URI](https://images.workoscdn.com/images/a7525cf3-ae4e-4dcd-91dd-27965b005472.png?auto=format\&fit=clip\&q=80)

When users sign out of their application, they will be redirected to your app's [Sign-out redirect](https://workos.com/docs/authkit/sessions/configuring-sessions/sign-out-redirect) location which is configured in the same dashboard area.

### Configure sign-in endpoint

Sign-in requests should originate from your application. In some instances, requests may not begin at your app. For example, some users might bookmark the hosted sign-in page or they might be led directly to the hosted sign-in page when clicking on a password reset link in an email.

In these cases, AuthKit will detect when a sign-in request did not originate at your application and redirect to your application's sign-in endpoint. This is an endpoint that you define at your application that redirects users to sign in using AuthKit. We'll create this endpoint in the next step.

You can configure the sign-in endpoint from the **Redirects** section of the WorkOS dashboard.

![Sign-in endpoint](https://images.workoscdn.com/images/25b53ea7-95ba-48cc-b6e7-ccd1b1bc35eb.png?auto=format\&fit=clip\&q=80)

### Set secrets

To make calls to WorkOS, provide the API key and the client ID. Store these values as managed secrets and pass them to the SDKs either as environment variables or directly in your app's configuration depending on your preferences.

```plain title="Environment variables"
WORKOS_API_KEY='sk_example_123456789'
WORKOS_CLIENT_ID='client_123456789'

WORKOS_REDIRECT_URI="http://localhost:3000/callback" # configured in the WorkOS dashboard
WORKOS_COOKIE_PASSWORD="<your password>" # generate a secure password here
```

The SDK requires you to set a strong password to encrypt cookies. This password must be at least 32 characters long. You can generate a secure password by using the [1Password generator](https://1password.com/password-generator/) or the `openssl` library via the command line:

```bash title="Generate a strong password"
openssl rand -base64 32
```

> The code examples use your staging API keys when [signed in](https://dashboard.workos.com)

***

## (2) Add AuthKit to your app

Let's integrate the hosted authentication flow into your app.

### Callback route

When a user has authenticated via AuthKit, they will be redirected to your app's callback route. In your Remix app, [create a new route](https://remix.run/docs/en/main/discussion/routes) and add the following:

#### /routes/callback.ts

### Sign-in endpoint

We'll need a sign-in endpoint to direct users to sign in using AuthKit before redirecting them back to your application. We'll do this by generating an AuthKit authorization URL server side and redirecting the user to it.

#### /routes/login.ts

### Access authentication data in your Remix application

We'll need to direct users to sign in (or sign up) using AuthKit before redirecting them back to your application. We'll do this by generating an AuthKit authorization URL server side and redirecting the user to it.

Use `authkitLoader` to configure AuthKit for your Remix application routes. You can choose to return custom data from your loader, like for instance the sign in and sign out URLs.

#### /app/routes/\_index.jsx

### Protected routes

For routes where a signed in user is mandatory, you can use the `ensureSignedIn` option in your loader.

#### /app/protected/route.tsx

### Ending the session

Finally, ensure the user can end their session by redirecting them to the logout URL. After successfully signing out, the user will be redirected to your app's [Sign-out redirect](https://workos.com/docs/authkit/sessions/configuring-sessions/sign-out-redirect) location, which is configured in the WorkOS dashboard.

#### /app/routes/\_index.jsx

> If you haven't configured a [Sign-out redirect](https://workos.com/docs/authkit/sessions/configuring-sessions/sign-out-redirect) in the WorkOS dashboard, users will see an error when logging out.

## Validate the authentication flow

To test all of this out, call `npm run dev`, navigate to `localhost:3000`, and sign up for an account.

You can then sign in with the newly created credentials and see the user listed in the **Users** section of the [WorkOS Dashboard](https://dashboard.workos.com).

![Dashboard showing newly created user](https://images.workoscdn.com/images/54fa6e6c-4c6f-4959-9301-344aeb4eeac8.png?auto=format\&fit=clip\&q=80)
