# Slack OAuth

## Introduction

The Slack OAuth integration allows your users to authenticate using their Slack credentials through the "Sign in with Slack" flow.

The configuration process involves creating or configuring a Slack App and setting up OAuth permissions with the client credentials in your WorkOS Dashboard.

***

## What WorkOS provides

When setting up Slack OAuth, WorkOS provides one key piece of information that needs to be configured in your Slack App:

- [Redirect URI](https://workos.com/docs/glossary/redirect-uri): The endpoint where Slack will send authentication responses after successful login

The Redirect URI is available in the [WorkOS Dashboard](https://dashboard.workos.com/). In the left navigation menu, select the **Authentication** tab and the **OAuth providers** sub-tab. Locate the **Slack** section.

![The Slack OAuth section in the WorkOS Dashboard.](https://images.workoscdn.com/images/9c70cdb3-0b02-4529-919a-3d91235e78cf.png?auto=format\&fit=clip\&q=50)

Click **Enable**. The **Slack OAuth** configuration dialog will open. Locate the **Redirect URI**.

![Slack OAuth Redirect URI in the WorkOS Dashboard.](https://images.workoscdn.com/images/c7800ed9-c9b9-4893-8821-e3af465362c5.png?auto=format\&fit=clip\&q=50)

The **Redirect URI** serves as the destination for authentication responses and must be configured in your Slack App's OAuth & Permissions settings.

***

## What you'll need

You will need to obtain two pieces of information from a Slack App:

- **Slack Client ID**: Application identifier from Slack
- **Slack Client Secret**: Authentication secret for the application

The following sections will guide you through creating or configuring a Slack App and generating these credentials.

***

## (1) Create or open your Slack App

Navigate to the [Slack App management page](https://api.slack.com/apps).

If you don't already have a Slack App, click **Create an App**, provide a name, and choose the development workspace where you'll test.

![The Slack API portal showing the create new app button.](https://images.workoscdn.com/images/127f704d-ce13-49e0-9d82-2ba123547e3e.png?auto=format\&fit=clip\&q=80)

Once created, open your new Slack App to configure it.

***

## (2) Configure OAuth & Permissions

In your Slack App's settings, go to **OAuth & Permissions** in the left-hand navigation menu.

Under **Redirect URLs**, add the **Redirect URI** from the WorkOS Dashboard.

![The Slack API portal showing where to configure your redirect URI.](https://images.workoscdn.com/images/f0e7d586-a8e1-4a67-8c06-085dc4009b32.png?auto=format\&fit=clip\&q=80)

Click **Save URLs** to confirm.

Under **Scopes**, ensure you request the standard OpenID scopes (e.g., `openid`, `profile`, `email`), which Slack requires for Sign in with Slack using OIDC.

***

## (3) Retrieve Slack credentials

Still in your Slack App's settings, find your **Client ID** and **Client Secret**.

Copy both values as you'll need them for the WorkOS configuration.

***

## (4) Configure Slack credentials in WorkOS

Now that you have the **Slack Client ID** and **Slack Client Secret** from the previous steps, return to the [WorkOS Dashboard](https://dashboard.workos.com).

In the **Slack OAuth** configuration dialog, enable the integration. Paste the credentials from Slack into their respective fields in the WorkOS Dashboard.

![The WorkOS dashboard with the Slack OAuth connection enabled.](https://images.workoscdn.com/images/c9c7c0de-c1f1-4d73-8f68-1b415d3dc5cb.png?auto=format\&fit=clip\&q=50)

Click **Save** to complete the configuration.

***

## Frequently asked questions

### How is the WorkOS Slack OAuth integration different from implementing regular Slack OAuth flow?

It's the same Slack OAuth flow as you could build yourself, but it's encapsulated within WorkOS SSO. This means you don't need to build it yourself. In addition to Slack OAuth, you can use WorkOS SSO to support other identity providers, all with a single integration.

### What is the provider query parameter and how is it used in the Slack OAuth integration?

You can use the `provider` query parameter in the [Get Authorization URL API endpoint](https://workos.com/docs/reference/sso/get-authorization-url) to support Slack OAuth for any domain. The `provider` query parameter should be set to `SlackOAuth`.

### What scopes are required for Slack OAuth?

The standard OpenID scopes (`openid`, `profile`, `email`) are required for Sign in with Slack using OIDC. These scopes provide access to the user's basic profile information necessary for authentication.
