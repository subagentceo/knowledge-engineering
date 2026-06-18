# Vercel OAuth

## Introduction

The Vercel OAuth integration allows your users to authenticate using their Vercel credentials.

The configuration process involves creating an OAuth application in Vercel and configuring the client credentials in your WorkOS Dashboard.

***

## What WorkOS provides

When setting up Vercel OAuth, WorkOS provides one key piece of information that needs to be configured in your Vercel OAuth application:

- [Redirect URI](https://workos.com/docs/glossary/redirect-uri): The endpoint where Vercel will send authentication responses after successful login

The Redirect URI is available in the [WorkOS Dashboard](https://dashboard.workos.com/). In the left navigation menu, select the **Authentication** tab and the **Providers** sub-tab. Locate the **Vercel** section.

![The Vercel OAuth section in the WorkOS Dashboard](https://images.workoscdn.com/images/fbd35719-bb0d-4ccc-a613-a63dc3ba97b5.png?auto=format\&fit=clip\&q=50)

Click **Enable**. The **Vercel OAuth** configuration dialog will open. Locate the **Redirect URI**.

![The Vercel OAuth configuration modal in the WorkOS Dashboard](https://images.workoscdn.com/images/648eb886-837f-4eb2-a366-6d6094187a5d.png?auto=format\&fit=clip\&q=50)

The **Redirect URI** serves as the destination for authentication responses and must be configured in your Vercel OAuth application as the Authorization Callback URL.

***

## What you'll need

You will need to obtain two pieces of information from a Vercel OAuth application:

- **Vercel Client ID**: Application identifier from Vercel
- **Vercel Client Secret**: Authentication secret for the application

The following sections will guide you through creating an OAuth application in your Vercel account and generating these credentials.

***

## (1) Create the Vercel OAuth application

Log in to your [Vercel account](https://vercel.com/login) and navigate to your team Settings tab.

In the left navigation menu, scroll down to select **Apps**. Click **Create** to create a new application.

![Vercel Apps page with Create button](https://images.workoscdn.com/images/1c5a34a7-64c1-42d1-b2e8-363b3e14a1be.png?auto=format\&fit=clip\&q=50)

Choose a name for your app, optionally add a logo, and click Save.

***

## (2) Configure the Vercel OAuth application

In the left navigation menu, ensure that the **General** tab is selected. Scroll down to the **Authorization Callback URLs** section, and enter the **Redirect URI** from the Vercel OAuth configuration in the WorkOS Dashboard. Click **Save**.

![Configuring Redirect URI in Vercel](https://images.workoscdn.com/images/b9e526f1-099b-472b-9a46-e9504ae2c106.png?auto=format\&fit=clip\&q=50)

In the left navigation menu, select the **Authentication** tab. In the **Client Authentication Methods** section, make sure that **client\_secret\_post** is selected.

![Configuring Client Authentication Methods in Vercel](https://images.workoscdn.com/images/65baf589-746b-4b33-b648-36f1d8b57c5d.png?auto=format\&fit=clip\&q=50)

In the left navigation menu, select the **Permissions** tab. In the **Scopes** section, enable the **openid**, **email**, and **profile** scopes to allow the application to read basic user profile information. Click **Save**.

![Configuring Scopes in Vercel](https://images.workoscdn.com/images/7240cd69-de9b-4a20-9f1a-13ed6beaf825.png?auto=format\&fit=clip\&q=50)

***

## (3) Generate client credentials

In the left navigation menu, select the **General** tab and view your Client ID in the **Details** section.

![View Client ID in Vercel](https://images.workoscdn.com/images/fef2735e-9a66-47f0-a0d5-e6d402a3ae7d.png?auto=format\&fit=clip\&q=50)

In the left navigation menu, select the **Authentication** tab. Scroll down to the **Client Secrets** section and click **Generate** to generate a new Client Secret.

![Generate Client Secret in Vercel](https://images.workoscdn.com/images/72e4b918-80ec-4aa8-b54a-349ca6d3bff2.png?auto=format\&fit=clip\&q=50)

Note the **Client ID** and **Client Secret** values as you'll need them for the WorkOS configuration.

> **Important**: The Client Secret is only shown once. Make sure to copy and store it securely.

***

## (4) Configure Vercel credentials in WorkOS

Now that you have the **Vercel Client ID** and **Vercel Client Secret** from the previous step, return to the [WorkOS Dashboard](https://dashboard.workos.com).

In the **Vercel OAuth** configuration dialog, enable the integration. Paste the credentials from Vercel into their respective fields in the WorkOS Dashboard.

![Entering Vercel Credentials in WorkOS Dashboard](https://images.workoscdn.com/images/ff653223-0ace-4f91-85f5-48e238e48666.png?auto=format\&fit=clip\&q=50)

Click **Save changes** to complete the configuration.

You are now ready to start authenticating with Vercel OAuth. If you are using AuthKit's [Hosted UI](https://workos.com/docs/authkit/hosted-ui), a Continue with Vercel button will be added to your login page.

If you are building your own authentication flows outside of AuthKit's hosted UI, you will use the `provider` query parameter in the [Get Authorization URL API endpoint](https://workos.com/docs/reference/authkit/authentication/get-authorization-url) to support global Vercel OAuth for any domain. The `provider` query parameter should be set to `VercelOAuth`.

***

## Frequently asked questions

### How is the WorkOS Vercel OAuth integration different from implementing regular Vercel OAuth flow?

It's the same Vercel OAuth flow as you could build yourself, but it's encapsulated within WorkOS SSO. This means you don't need to build it yourself. In addition to Vercel OAuth, you can use WorkOS SSO to support other identity providers, all with a single integration.

### What is the provider query parameter and how is it used in the Vercel OAuth integration?

If you are building your own authentication flows outside of AuthKit's hosted UI, you can use the `provider` query parameter in the [Get Authorization URL API endpoint](https://workos.com/docs/reference/authkit/authentication/get-authorization-url) to support global Vercel OAuth for any domain. The `provider` query parameter should be set to `VercelOAuth`.

### What scopes are required for Vercel OAuth?

The **openid**, **profile**, and **email** scopes are required to allow the application to read user profile information necessary for authentication. These scopes provide access to the user's basic profile data and email address.
