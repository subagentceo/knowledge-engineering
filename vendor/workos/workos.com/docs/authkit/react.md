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

For a client-only approach, use the `authkit-react` library to integrate AuthKit directly into your React application. Start by installing the library to your project via `npm`.

```bash title="Install React SDK"
npm install @workos-inc/authkit-react
```

### Configure a redirect URI

A redirect URI is a callback endpoint that WorkOS will redirect to after a user has authenticated. This endpoint will exchange the authorization code returned by WorkOS for an authenticated [User object](https://workos.com/docs/reference/authkit/user). We'll create this endpoint in the next step.

You can set a redirect URI in the **Redirects** section of the [WorkOS Dashboard](https://dashboard.workos.com). We recommend using `http://localhost:3000/callback` as the default here.

WorkOS supports using wildcard characters in Redirect URIs, but not for the default Redirect URI. More information about wildcard characters support can be found in the [Redirect URIs](https://workos.com/docs/sso/redirect-uris/wildcard-characters) guide.

![Dashboard Redirect URIs](https://images.workoscdn.com/images/a7525cf3-ae4e-4dcd-91dd-27965b005472.png?auto=format\&fit=clip\&q=80)

> For the client-only integration, make sure to set the callback URI as the same route where you require auth.

When users sign out of their application, they will be redirected to your app's [Sign-out redirect](https://workos.com/docs/authkit/sessions/configuring-sessions/sign-out-redirect) location which is configured in the same dashboard area.

### Configure sign-in endpoint

All sign-in requests must originate at your application for the [PKCE](https://workos.com/docs/reference/authkit/authentication/get-authorization-url/pkce) code exchange to work properly. In some instances, requests may not begin at your app. For example, some users might bookmark the hosted sign-in page or they might be led directly to the hosted sign-in page when clicking on a password reset link in an email.

In these cases, AuthKit will detect when a sign-in request did not originate at your application and redirect to your application's sign-in endpoint. This is an endpoint that you define at your application that redirects users to sign in using AuthKit. We'll create this endpoint in the next step.

You can configure the sign-in endpoint from the **Redirects** section of the WorkOS dashboard.

![Sign-in endpoint](https://images.workoscdn.com/images/25b53ea7-95ba-48cc-b6e7-ccd1b1bc35eb.png?auto=format\&fit=clip\&q=80)

### Configure CORS

Since your user's browser will be making calls to the WorkOS API directly, it is necessary to add your domain to the allow list in your WorkOS Settings. This can be configured in the **Configure CORS** dialog on the **Authentication** page of the WorkOS dashboard.

![Screenshot of the WorkOS dashboard showing the "Configure CORS" option in the "Authentication" section.](https://images.workoscdn.com/images/3b7863df-8c59-4d48-ab91-f537fd5c9f66.png?auto=format\&fit=clip\&q=50)

While building your integration in the Staging environment you should add your local development URL here. In the example below we're adding `http://localhost:5173` to the list of allowed web origins.

![Screenshot of the WorkOS dashboard showing the CORS configuration panel.](https://images.workoscdn.com/images/e20fdbfb-965f-47b5-9c64-b83f6e6b8a39.png?auto=format\&fit=clip\&q=50)

> The code examples use your staging API keys when [signed in](https://dashboard.workos.com)

***

## (2) Add AuthKit to your app

Let's integrate the hosted authentication flow into your app.

### Wrap your app with the AuthKit provider

The `AuthKitProvider` component will handle the redirect from Hosted AuthKit, refresh the session when needed and provide context for hooks used in the components of your app. Initialize it with your client ID, which you can find in the WorkOS dashboard. You should also specify your custom authentication API domain.

> If you have not set up a custom authentication domain in WorkOS, set `devMode={true}` on `<AuthKitProvider />`. This will keep the refresh token in local storage instead of a secure, HTTP-only cookie.

#### /app/root.tsx

> For security reasons, the client-only integration cannot be nested inside an `iframe`.

### Use the auth hook in your components

The `useAuth` hook will return user information and loading status. It also provides functions to retrieve the access token and sign in and sign out the user.

#### /app.jsx

### Protect routes with custom hooks

If you have routes that you wish to only be accessible to logged in users, you can use a custom React hook.

#### /hooks/use-user.ts

Then use that hook to protect your mandatory sign in routes.

#### /app/protected.jsx

> If you haven't configured a [Sign-out redirect](https://workos.com/docs/authkit/sessions/configuring-sessions/sign-out-redirect) in the WorkOS dashboard, users will see an error when logging out.

## Validate the authentication flow

You can then sign in with the newly created credentials and see the user listed in the **Users** section of the [WorkOS Dashboard](https://dashboard.workos.com).

![Dashboard showing newly created user](https://images.workoscdn.com/images/54fa6e6c-4c6f-4959-9301-344aeb4eeac8.png?auto=format\&fit=clip\&q=80)
