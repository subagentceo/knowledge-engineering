# Xero OAuth

## Introduction

The Xero OAuth integration allows your users to authenticate using their Xero credentials through the "Sign in with Xero" flow.

The configuration process involves creating an OAuth application in Xero and configuring the client credentials in your WorkOS Dashboard.

***

## What WorkOS provides

When setting up Xero OAuth, WorkOS provides one key piece of information that needs to be configured in your Xero OAuth application:

- [Redirect URI](https://workos.com/docs/glossary/redirect-uri): The endpoint where Xero will send authentication responses after successful login

The Redirect URI is available in the [WorkOS Dashboard](https://dashboard.workos.com/). In the left navigation menu, select the **Authentication** tab and the **OAuth providers** sub-tab. Locate the **Xero** section.

![The Xero OAuth section in the WorkOS Dashboard.](https://images.workoscdn.com/images/ea385495-75f6-4357-b16a-97c1383bbc9b.png?auto=format\&fit=clip\&q=50)

Click **Enable**. The **Xero OAuth** configuration dialog will open. Locate the **Redirect URI**.

![Xero OAuth Redirect URI in the WorkOS Dashboard.](https://images.workoscdn.com/images/75e4e68e-cf07-4277-8979-7cd81f82f68f.png?auto=format\&fit=clip\&q=50)

The **Redirect URI** serves as the destination for authentication responses and must be configured in your Xero application's OAuth settings.

***

## What you'll need

You will need to obtain two pieces of information from a Xero Developer application:

- **Xero Client ID**: Application identifier from Xero
- **Xero Client Secret**: Authentication secret for the application

The following sections will guide you through creating an OAuth application in your Xero Developer account and generating these credentials.

***

## (1) Create the Xero OAuth application

Log in to your [Xero developer account](https://developer.xero.com) and create a new application.

![The Xero developer homepage.](https://images.workoscdn.com/images/58e9b3af-7442-45e7-8be2-cb1fa9ab39a2.png?auto=format\&fit=clip\&q=80)

In the top right corner, select **New app**. Fill out the form starting with the application name.

![The Xero form to create a new OAuth application.](https://images.workoscdn.com/images/f78a99b4-f004-4437-9612-6d97ef49bf3d.png?auto=format\&fit=clip\&q=50)

For the **Integration type**, select **Web app**.

For **Company or application URI**, use your application's homepage URI.

For **Redirect URI**, use the **Redirect URI** from the Xero OAuth configuration in the WorkOS Dashboard.

![OAuth client credentials in the Xero application settings.](https://images.workoscdn.com/images/9a0c3175-3af3-4613-a9f9-c9e6851507fe.png?auto=format\&fit=clip\&q=50)

Agree to Xero's Developer Platform Terms & Conditions and click **Create app**.

***

## (2) Generate client credentials

On the next page, you will see the Xero **App details** for your new OAuth application. From the left navigation menu, navigate to the **Configuration** page.

![OAuth client credentials in the Xero application settings before creating a client secret.](https://images.workoscdn.com/images/5ec780c3-c325-4455-992e-20727c39f8f9.png?auto=format\&fit=clip\&q=50)

Select **Generate a secret** to create a client secret.

![OAuth client credentials in the Xero application settings after creating a client secret.](https://images.workoscdn.com/images/58158b26-0854-496f-9ccc-660955735463.png?auto=format\&fit=clip\&q=50)

Copy the **Client ID** and **Client secret 1** as you'll need them for the WorkOS configuration.

***

## (3) Configure Xero credentials in WorkOS

Now that you have the **Xero Client ID** and **Xero Client Secret** from the previous steps, return to the [WorkOS Dashboard](https://dashboard.workos.com).

In the **Xero OAuth** configuration dialog, enable the integration. Paste the credentials from Xero into their respective fields in the WorkOS Dashboard.

![OAuth client credentials in the WorkOS Xero setup modal filled with client id and client secret.](https://images.workoscdn.com/images/9bb1cd53-a5cc-4a04-b7d4-2fd9791ad499.png?auto=format\&fit=clip\&q=50)

Click **Save** to complete the configuration.

You are now ready to start authenticating with Xero OAuth. You will use the `provider` query parameter in the Get Authorization URL API endpoint to support global Xero OAuth for any domain. The `provider` query parameter should be set to `XeroOAuth`.

***

## Configure Additional OAuth Scopes (Optional)

WorkOS will request the OAuth scopes that are required for authentication by default. You can optionally configure your integration to request additional OAuth scopes as needed.

When the **Return Xero OAuth tokens** option is selected, the access token and refresh token from Xero will be included in the response from the [Authenticate with code API](https://workos.com/docs/reference/authkit/authentication/code).

![A screenshot showing Xero OAuth scopes configuration in the WorkOS Dashboard](https://images.workoscdn.com/images/a39beaaf-faf4-4fcf-98b7-eeb54f0135fb.png?auto=format\&fit=clip\&q=50)

Any scopes configured here will be included on every Xero OAuth request. To specify additional scopes dynamically, use the `provider_scopes` query parameter on the [Get Authorization URL API endpoint](https://workos.com/docs/reference/authkit/authentication/get-authorization-url).

For more information, see Xero's OAuth scopes [documentation](https://developer.xero.com/documentation/oauth2/scopes).

***

## Frequently asked questions

### How is the WorkOS Xero OAuth integration different from implementing regular Xero OAuth flow?

It's the same Xero OAuth flow as you could build yourself, but it's encapsulated within WorkOS SSO. This means you don't need to build it yourself. In addition to Xero OAuth, you can use WorkOS SSO to support other identity providers, all with a single integration.

### What is the provider query parameter and how is it used in the Xero OAuth integration?

You can use the `provider` query parameter in the [Get Authorization URL API endpoint](https://workos.com/docs/reference/sso/get-authorization-url) to support global Xero OAuth for any domain. The `provider` query parameter should be set to `XeroOAuth`.

### What type of Xero integration should I select?

You should select **Web app** as the integration type when creating your Xero OAuth application. This is the correct type for OAuth integrations that will work with WorkOS.

### Where can I find my Xero application after creation?

After creating your Xero application, you can find it in your [Xero Developer Portal](https://developer.xero.com) under your apps list. From there, you can access the **Configuration** page to manage your OAuth settings and regenerate credentials if needed.
