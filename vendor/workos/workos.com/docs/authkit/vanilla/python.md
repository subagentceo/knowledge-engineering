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

First, install the Python SDK.

```bash title="Install Python SDK"
pip install workos
```

For CSRF protection on state-changing routes like logout, also install `Flask-WTF`:

```bash title="Install CSRF protection"
pip install Flask-WTF
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
```

> The code examples use your staging API keys when [signed in](https://dashboard.workos.com)

***

## (2) Add AuthKit to your app

Let's integrate the hosted authentication flow into your app.

### Set up the frontend

To demonstrate AuthKit, we only need a simple page with links to logging in and out.

#### index.html

Clicking the "Sign in" and "Sign out" links should invoke actions on our server, which we'll set up next.

### Add a sign-in endpoint

We'll need a sign-in endpoint to direct users to sign in (or sign up) using AuthKit before redirecting them back to your application. This endpoint should generate an AuthKit authorization URL server side and redirect the user to it.

You can use the optional state parameter to encode arbitrary information to help restore application `state` between redirects.

For this guide we'll be using the `flask` web server for Python. This guide won't cover how to set up a Flask app, but you can find more information in the [Flask documentation](https://flask.palletsprojects.com/en/stable/).

#### server.py

> WorkOS will redirect to your [Redirect URI](https://workos.com/docs/glossary/redirect-uri) if there is an issue generating an authorization URL. Read our [API Reference](https://workos.com/docs/reference) for more details.

### Add a callback endpoint

Next, let's add the callback endpoint (referenced in [Configure a redirect URI](https://workos.com/docs/authkit/1-configure-your-project/configure-a-redirect-uri)) which will exchange the authorization code (valid for 10 minutes) for an authenticated User object.

#### server.py

## (3) Handle the user session

Session management helper methods are included in our SDKs to make integration easy. For security reasons, sessions are automatically "sealed", meaning they are encrypted with a strong password.

### Create a session password

The SDK requires you to set a strong password to encrypt cookies. This password must be 32 characters long. You can generate a secure password by using the [1Password generator](https://1password.com/password-generator/) or the `openssl` library via the command line:

```bash title="Generate a strong password"
openssl rand -base64 32
```

Then add it to the environment variables file.

```plain title=".env"
WORKOS_API_KEY='sk_example_123456789'
WORKOS_CLIENT_ID='client_123456789'

# +diff-start
WORKOS_COOKIE_PASSWORD='<your password>'
# +diff-end
```

### Save the encrypted session

Next, use the SDK to authenticate the user and return a password protected session. The refresh token is considered sensitive as it can be used to re-authenticate, hence why the session is encrypted before storing it in a session cookie.

#### server.py

We should also present some of the user information on our frontend. Let's update the default route to read the session cookie and display user information:

#### server.py

And, we should make sure to update the index page to present this info.

#### index.html

### Protected routes

Then, use a decorator to specify which routes should be protected. If the session has expired, use the SDK to attempt to generate a new one.

#### server.py

Use the decorator in the route that should only be accessible to logged in users.

#### server.py

### Ending the session

Finally, ensure the user can end their session by redirecting them to the logout URL. After successfully signing out, the user will be redirected to your app's Sign-out redirect location, which is configured in the WorkOS dashboard.

#### server.py

> **Note:** <strong>CSRF Protection:</strong> The logout endpoint uses POST to prevent
> unintended logouts from browser prefetching. CSRF protection with
> <code>Flask-WTF</code> prevents cross-site request forgery attacks.
> Flask-WTF automatically validates CSRF tokens on POST requests when
> configured with <code>CSRFProtect</code>.

> If you haven't configured a [Sign-out redirect](https://workos.com/docs/authkit/sessions/configuring-sessions/sign-out-redirect) in the WorkOS dashboard, users will see an error when logging out.

## Validate the authentication flow

To test all of this out, start your server with `python server.py`, navigate to `localhost:3000`, and sign up for an account.

You can then sign in with the newly created credentials and see the user listed in the **Users** section of the [WorkOS Dashboard](https://dashboard.workos.com).

![Dashboard showing newly created user](https://images.workoscdn.com/images/54fa6e6c-4c6f-4959-9301-344aeb4eeac8.png?auto=format\&fit=clip\&q=80)
