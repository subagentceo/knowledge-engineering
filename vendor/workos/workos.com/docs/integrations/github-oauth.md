# GitHub OAuth

## Introduction

The GitHub OAuth integration allows your users to authenticate using their GitHub credentials. WorkOS supports both **GitHub OAuth Apps** and **GitHub Apps** for authentication.

The configuration process involves creating an OAuth application or GitHub App in GitHub and configuring the client credentials in the WorkOS Dashboard.

***

## Testing with default credentials in the staging environment

WorkOS provides a default GitHub Client ID and Client Secret combination, which allows you to quickly enable and test GitHub OAuth. Use the [WorkOS API to initiate SSO](https://workos.com/docs/sso/1-add-sso-to-your-app/add-an-endpoint-to-initiate-sso), setting the `provider` parameter to `GitHubOAuth`, and WorkOS will automatically use the default credentials until you add your own GitHub Client ID and Client Secret to the configuration in the WorkOS Dashboard.

> The default credentials are only intended for testing and therefore only available in the Staging environment. For your production environment, please follow the steps below to create and specify your own GitHub Client ID and Client Secret.

Please note that when you are using WorkOS default credentials, GitHub's authentication flow will display WorkOS' name, logo, and other information to users. Once you register your own application and use its GitHub Client ID and Client Secret for the OAuth flow, you will have the opportunity to customize the app, including its name, logo, contact email, etc.

***

## What WorkOS provides

When setting up GitHub OAuth, WorkOS provides one key piece of information that needs to be configured in your GitHub OAuth application:

- [Redirect URI](https://workos.com/docs/glossary/redirect-uri): The endpoint where GitHub will send authentication responses after successful login

The Redirect URI is available in the [WorkOS Dashboard](https://dashboard.workos.com/). In the left navigation menu, select the **Authentication** tab and the **OAuth providers** sub-tab. Locate the **GitHub** section.

![Open the GitHub configuration dialog](https://images.workoscdn.com/images/b4ddb4d0-39f2-4e58-bc15-f3857f63415b.png?auto=format\&fit=clip\&q=50)

Click **Manage**. The **GitHub OAuth** configuration dialog will open. Locate the **Redirect URI**.

![GitHub OAuth Redirect URI in the WorkOS Dashboard](https://images.workoscdn.com/images/18629339-63d6-4b60-b5d5-7e75f7745de5.png?auto=format\&fit=clip\&q=50)

The **Redirect URI** serves as the destination for authentication responses and must be configured in your GitHub OAuth application as the authorization callback URL.

***

## What you'll need

You will need to obtain two pieces of information from a GitHub OAuth application:

- **GitHub Client ID**: Application identifier from GitHub
- **GitHub Client Secret**: Authentication secret for the application

The following sections will guide you through creating an OAuth application in your GitHub account and generating these credentials.

***

## (1) Create the GitHub OAuth Application or GitHub App

Sign in to GitHub and navigate to [**Developer settings**](https://github.com/settings/developers). You can create either an **OAuth App** or a **GitHub App**.

### Option A: OAuth App

Select **OAuth Apps** and create a new OAuth app. Be sure to at least enable the `user:email` scope, as this is required to retrieve the user's email address from GitHub, which is necessary for authentication. You can optionally configure additional scopes as needed.

![The New OAuth App button in GitHub](https://images.workoscdn.com/images/d8991483-a60e-4bc6-985f-2053d8b3c2c9.png?auto=format\&fit=clip\&q=80)

> You can also register a new application under a GitHub Organization, which may be more appropriate if it is maintained by a team of developers. You can also [transfer ownership](https://docs.github.com/en/apps/oauth-apps/maintaining-oauth-apps/transferring-ownership-of-an-oauth-app) of your GitHub OAuth application to a GitHub organization later.

### Option B: GitHub App

Select **GitHub Apps** and create a new GitHub App. GitHub Apps offer more granular permissions and can provide refresh tokens with expiration for improved security. For more information, see GitHub's documentation on [differences between GitHub Apps and OAuth Apps](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/differences-between-github-apps-and-oauth-apps).

> When using a GitHub App, OAuth scopes are not applicable. Instead, permissions are configured directly on the GitHub App. Be sure to set the **Email addresses** account permission to **Read-only**, as this is required to retrieve the user's email address from GitHub. The access token is limited to the permissions that both your app and the user have.

***

## (2) Configure the application

Fill out the application form. For the **Authorization callback URL** (OAuth App) or **Callback URL** (GitHub App), enter the **Redirect URI** from the WorkOS Dashboard.

Click **Register application** (OAuth App) or **Create GitHub App** (GitHub App).

![The GitHub form to create a new OAuth application.](https://images.workoscdn.com/images/6282967b-eee8-4937-8ec8-a1f25d7ec873.png?auto=format\&fit=clip\&q=80)

You'll be given a Client ID. Note this value as you'll need it for the WorkOS configuration.

Click **Generate a new client secret** to generate a new client secret. Note that this value is only temporarily available, so make sure to save it before proceeding.

![The Client ID and Client Secret in GitHub](https://images.workoscdn.com/images/ba3c133b-3492-4b5b-b10c-69717ca3e50c.png?auto=format\&fit=clip\&q=80)

***

## (3) Configure GitHub credentials in WorkOS

Now that you have the **GitHub Client ID** and **GitHub Client Secret** from the previous step return to the [WorkOS Dashboard](https://dashboard.workos.com/).

In the **GitHub OAuth** configuration dialog, select **Your app's credentials**. Paste the credentials from GitHub into their respective fields in the WorkOS Dashboard.

![Where to enter the GitHub Client ID and GitHub Client Secret in the WorkOS Dashboard](https://images.workoscdn.com/images/01d06b09-d622-4815-8757-c3b6825b790b.png?auto=format\&fit=clip\&q=50)

Click **Save** to complete the configuration.

You're now able to authenticate users with GitHub OAuth. You will use the `provider` query parameter in the Get Authorization URL API endpoint to support global GitHub OAuth for any domain. The `provider` query parameter should be set to `GitHubOAuth`.

***

## Configure Additional OAuth Scopes (Optional)

> This section only applies to GitHub OAuth Apps. GitHub Apps do not use OAuth scopes — permissions are configured directly on the GitHub App in GitHub's settings.

WorkOS will request the OAuth scopes that are required for authentication by default. You can optionally configure your integration to request additional OAuth scopes as needed.

When the **Return GitHub OAuth tokens** option is selected, the access token from GitHub will be included in the response from the [Authenticate with code API](https://workos.com/docs/reference/authkit/authentication/code). For GitHub Apps, the response will also include a refresh token and expiration when available.

![A screenshot showing GitHub OAuth scopes configuration in the WorkOS Dashboard](https://images.workoscdn.com/images/9cfbd37c-f1cc-436d-8e61-0ccce2612bc6.png?auto=format\&fit=clip\&q=50)

Any scopes configured here will be included on every GitHub OAuth request. To specify additional scopes dynamically, use the `provider_scopes` query parameter on the [Get Authorization URL API endpoint](https://workos.com/docs/reference/authkit/authentication/get-authorization-url).

For more information, see GitHub's OAuth scopes [documentation](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/scopes-for-oauth-apps).

***

## Frequently asked questions

### How is the WorkOS GitHub OAuth integration different from implementing regular GitHub OAuth flow?

It's the same GitHub OAuth flow as you could build yourself, but it's encapsulated within WorkOS SSO. This means you don't need to build it yourself. In addition to GitHub OAuth, you can use WorkOS SSO to support other identity providers, all with a single integration.

### What is the provider query parameter and how is it used in the GitHub OAuth integration?

You can use the `provider` query parameter in the [Get Authorization URL API endpoint](https://workos.com/docs/reference/sso/get-authorization-url) to support global GitHub OAuth for any domain. The `provider` query parameter should be set to `GitHubOAuth`.
