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

For a Next.js integration, use the `authkit-nextjs` library. Start by installing it in your Next.js project via `npm`.

```bash title="Install Next.js SDK"
npm install @workos-inc/authkit-nextjs
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
WORKOS_COOKIE_PASSWORD="<your password>" # generate a secure password here

# configured in the WorkOS dashboard
NEXT_PUBLIC_WORKOS_REDIRECT_URI="http://localhost:3000/callback"
```

The `NEXT_PUBLIC_WORKOS_REDIRECT_URI` uses the `NEXT_PUBLIC` prefix so the variable is accessible in edge functions and proxy configurations. This is useful for configuring operations like Vercel preview deployments.

The SDK requires you to set a strong password to encrypt cookies. This password must be at least 32 characters long. You can generate a secure password by using the [1Password generator](https://1password.com/password-generator/) or the `openssl` library via the command line:

```bash title="Generate a strong password"
openssl rand -base64 32
```

> The code examples use your staging API keys when [signed in](https://dashboard.workos.com)

***

## (2) Add AuthKit to your app

Let's integrate the hosted authentication flow into your app.

### Provider

The `AuthKitProvider` component adds protections for auth edge cases and is required to wrap your app layout.

#### /app/layout.tsx

### Proxy

[Next.js proxy](https://nextjs.org/docs/app/api-reference/file-conventions/proxy) is required to determine which routes require authentication.

#### Implementing the proxy

When implementing the proxy, which [was called middleware before Next 16](https://nextjs.org/docs/messages/middleware-to-proxy), you can opt to use either the complete `authkitMiddleware` solution or the composable `authkit` method. You'd use the former in cases where your proxy is only used for authentication. The latter is used for more complex apps where you want to have your proxy perform tasks in addition to auth.

- | Complete

  The proxy can be implemented in the `proxy.ts` file. This is a full proxy solution that handles all the auth logic including session management and redirects for you.

  With the complete proxy solution, you can choose between page based auth and middleware auth.

  #### Page based auth

  Protected routes are determined via the use of the `withAuth` method, specifically whether the `ensureSignedIn` option is used. Usage of `withAuth` is covered further down in the *Access authentication data* section.

  #### proxy.ts

  #### Middleware auth

  In this mode the proxy is used to protect all routes by default, redirecting users to AuthKit if no session is available. Exceptions can be configured via an allow list.

  #### proxy.ts

  In the above example, the home page `/` can be viewed by unauthenticated users. The `/account` page and its children can only be viewed by authenticated users.

- | Composable

  The proxy can be implemented in the `proxy.ts` file. This is a composable proxy solution that handles the session management part for you but leaves the redirect and route protection logic to you.

  #### proxy.ts

### Callback route

When a user has authenticated via AuthKit, they will be redirected to your app's callback route. Make sure this route matches the `WORKOS_REDIRECT_URI` environment variable and the configured redirect URI in your WorkOS dashboard.

#### /app/callback/route.ts

### Sign-in endpoint

We'll need a sign-in endpoint to direct users to sign in using AuthKit before redirecting them back to your application. We'll do this by generating an AuthKit authorization URL server side and redirecting the user to it.

#### /app/login/route.ts

### Access authentication data

AuthKit can be used in both server and client components.

- | Server component

  The `withAuth` method is used to retrieve the current logged in user and their details.

  #### /app/home-page/page.jsx

- | Client component

  The `useAuth` hook is used to retrieve the current logged in user and their details.

  #### /app/home-page/page.jsx

### Protected routes

For routes where a signed in user is mandatory, you can use the `ensureSignedIn` option.

- | Server component

  #### /app/protected/page.tsx

- | Client component

  #### /app/protected/page.jsx

### Ending the session

Finally, ensure the user can end their session by redirecting them to the logout URL. After successfully signing out, the user will be redirected to your app's [Sign-out redirect](https://workos.com/docs/authkit/sessions/configuring-sessions/sign-out-redirect) location, which is configured in the WorkOS dashboard.

#### /app/home-page/page.jsx

> If you haven't configured a [Sign-out redirect](https://workos.com/docs/authkit/sessions/configuring-sessions/sign-out-redirect) in the WorkOS dashboard, users will see an error when logging out.

## Validate the authentication flow

To test all of this out, call `npm run dev`, navigate to `localhost:3000`, and sign up for an account.

You can then sign in with the newly created credentials and see the user listed in the **Users** section of the [WorkOS Dashboard](https://dashboard.workos.com).

![Dashboard showing newly created user](https://images.workoscdn.com/images/54fa6e6c-4c6f-4959-9301-344aeb4eeac8.png?auto=format\&fit=clip\&q=80)
