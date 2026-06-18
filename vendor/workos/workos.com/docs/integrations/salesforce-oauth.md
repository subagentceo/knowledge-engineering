# Salesforce OAuth

## Introduction

The Salesforce OAuth integration allows your users to authenticate using their Salesforce credentials.

The configuration process involves creating an External Client App in Salesforce and configuring the client credentials in the WorkOS Dashboard.

***

## What WorkOS provides

When setting up Salesforce OAuth, WorkOS provides one key piece of information that needs to be configured in your Salesforce External Client App:

- [Redirect URI](https://workos.com/docs/glossary/redirect-uri): The endpoint where Salesforce will send authentication responses after successful login

The Redirect URI is available in the [WorkOS Dashboard](https://dashboard.workos.com/). In the left navigation menu, select the **Authentication** tab and the **OAuth providers** sub-tab. Locate the **Salesforce** section.

![Open the Salesforce configuration dialog](https://images.workoscdn.com/images/27840df3-434d-4fc0-bae3-aa3dee021f2a.png?auto=format\&fit=clip\&q=50)

Click **Manage**. The **Salesforce OAuth** configuration dialog will open. Locate the **Redirect URI**.

![Salesforce OAuth Redirect URI in the WorkOS Dashboard](https://images.workoscdn.com/images/387b564f-7c4c-4b94-aece-7dc3eb862058.png?auto=format\&fit=clip\&q=50)

The **Redirect URI** serves as the destination for authentication responses and must be configured in your Salesforce External Client App as the authorization callback URL.

***

## What you'll need

You will need to obtain two pieces of information from a Salesforce External Client App:

- **Salesforce Consumer Key**: Application identifier from Salesforce
- **Salesforce Consumer Secret**: Authentication secret for the application

The following sections will guide you through creating an External Client App in your Salesforce instance and generating these credentials.

***

## (1) Create the Salesforce External Client App

Sign in to Salesforce and navigate to Setup. On the sidebar, select **Apps**, then **External Client Apps**, then **External Client App Manager**. Create a new External Client App.

![The New External Client App button in Salesforce](https://images.workoscdn.com/images/e17fec69-13b5-4281-8311-5854ac1007af.png?auto=format\&fit=clip\&q=50)

***

## (2) Configure External Client App

Fill out the External Client App form. Expand the **API (Enable OAuth Settings)** section, and check the **Enable OAuth** checkbox. For the **Callback URL** input, enter the **Redirect URI** from the WorkOS Dashboard.

It is also required to add the "Access the identity URL service" and "Access unique user identifiers" scopes to your app.

![The Salesforce form to create a new External Client App](https://images.workoscdn.com/images/f1ce3367-fc4f-4be6-9529-49835431c38e.png?auto=format\&fit=clip\&q=50)

Under **Security** deselect the **Require Proof Key for Code Exchange (PKCE) extension for Supported Authorization Flows** option, as WorkOS does not currently support PKCE for Salesforce OAuth.

Click **Create**.

![The option to disable the PKCE requirement for a Salesforce External Client App](https://images.workoscdn.com/images/7e9a2bda-0ba4-4d33-a5f4-3ae07909a67e.png?auto=format\&fit=clip\&q=50)

After creating your External Client App, click the **Settings** tab, and then expand **OAuth Settings**. Click on **Consumer Key and Secret**.

You'll be given the Consumer Key and Secret for your External Client App. Note these values as you'll need them for the WorkOS configuration.

***

## (3) Configure Salesforce credentials in WorkOS

Now that you have the **Salesforce Consumer Key** and **Salesforce Consumer Secret** from the previous step return to the [WorkOS Dashboard](https://dashboard.workos.com/).

In the **Salesforce OAuth** configuration dialog, paste the credentials from Salesforce into the Client ID and Client Secret fields.

![Where to enter the Salesforce Consumer Key and Salesforce Consumer Secret in the WorkOS Dashboard](https://images.workoscdn.com/images/f65f7819-f9c9-4321-9ba5-9365fa51f4e8.png?auto=format\&fit=clip\&q=50)

Click **Save changes** to complete the configuration.

You're now able to authenticate users with Salesforce OAuth. If you are using AuthKit's [Hosted UI](https://workos.com/docs/authkit/hosted-ui), the Login with Salesforce button will be added to your login page.

If you are building your own authentication flows outside of AuthKit's hosted UI, you will use the `provider` query parameter in the [Get Authorization URL API endpoint](https://workos.com/docs/reference/authkit/authentication/get-authorization-url) to support global Salesforce OAuth for any domain. The `provider` query parameter should be set to `SalesforceOAuth`.

***

## Configure Additional OAuth Scopes (Optional)

WorkOS will request the OAuth scopes that are required for authentication by default. You can optionally configure your integration to request additional OAuth scopes as needed.

When the **Return Salesforce OAuth tokens** option is selected, the access token from Salesforce will be included in the response from the [Authenticate with code API](https://workos.com/docs/reference/authkit/authentication/code).

![A screenshot showing Salesforce OAuth scopes configuration in the WorkOS Dashboard](https://images.workoscdn.com/images/f1a87bc5-71b3-48fb-b2cf-3052ee39d4b4.png?auto=format\&fit=clip\&q=50)

Any scopes configured here will be included on every Salesforce OAuth request. To specify additional scopes dynamically, use the `provider_scopes` query parameter on the [Get Authorization URL API endpoint](https://workos.com/docs/reference/authkit/authentication/get-authorization-url). You will also have to update your External Client App's configured scopes to include these additional scopes.

For more information, see Salesforce's OAuth scopes [documentation](https://help.salesforce.com/s/articleView?id=xcloud.remoteaccess_oauth_tokens_scopes.htm).

## Frequently asked questions

### How is the WorkOS Salesforce OAuth integration different from implementing regular Salesforce OAuth flow?

It's the same Salesforce OAuth flow as you could build yourself, but it's encapsulated within WorkOS SSO. This means you don't need to build it yourself. In addition to Salesforce OAuth, you can use WorkOS SSO to support other identity providers, all with a single integration.

### What is the provider query parameter and how is it used in the Salesforce OAuth integration?

You can use the `provider` query parameter in the [Get Authorization URL API endpoint](https://workos.com/docs/reference/authkit/authentication/get-authorization-url) to support global Salesforce OAuth for any domain. The `provider` query parameter should be set to `SalesforceOAuth`.

### What scopes are required for Salesforce OAuth?

The **openid**, **profile**, and **email** scopes are required to allow the application to read user profile information necessary for authentication. These scopes provide access to the user's basic profile data.
