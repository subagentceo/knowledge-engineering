# Intuit OAuth

## Introduction

The Intuit OAuth integration allows your users to authenticate using their Intuit credentials.

The configuration process involves creating an OAuth application in the Intuit Developer Portal and configuring the client credentials in your WorkOS Dashboard.

***

## What WorkOS provides

When setting up Intuit OAuth, WorkOS provides one key piece of information that needs to be configured in your Intuit OAuth application:

- [Redirect URI](https://workos.com/docs/glossary/redirect-uri): The endpoint where Intuit will send authentication responses after successful login

The Redirect URI is available in the [WorkOS Dashboard](https://dashboard.workos.com/). In the left navigation menu, select the **Authentication** tab and the **Providers** sub-tab. Locate the **Intuit** section.

![The Intuit OAuth section in the WorkOS Dashboard](https://images.workoscdn.com/images/7a608532-0df6-4817-9db3-d50d8481412a.png?auto=format\&fit=clip\&q=50)

Click **Enable**. The **Intuit OAuth** configuration dialog will open. Locate the **Redirect URI**.

![The Intuit OAuth configuration modal in the WorkOS Dashboard](https://images.workoscdn.com/images/0e15b7ba-91dd-4128-a42d-6b986c43fbd5.png?auto=format\&fit=clip\&q=50)

The **Redirect URI** serves as the destination for authentication responses and must be configured in your Intuit OAuth application.

***

## What you'll need

You will need to obtain two pieces of information from an Intuit OAuth application:

- **Intuit Client ID**: Application identifier from Intuit
- **Intuit Client Secret**: Authentication secret for the application

The following sections will guide you through creating an OAuth application in the Intuit Developer Portal and generating these credentials.

***

## (1) Create the Intuit OAuth application

Log in to your [Intuit Developer account](https://developer.intuit.com/app/developer/homepage) and navigate to the Apps tab in your Workspace.

Click on the plus sign tile to create a new application.

![Intuit Apps page with Create tile](https://images.workoscdn.com/images/c8c80cee-afaf-4261-a9b1-f9a35a24f85b.png?auto=format\&fit=clip\&q=50)

***

## (2) Configure the Intuit OAuth application

You will be prompted to select an app type. Select **Quickbooks Online and Payments** and click **Next** to continue.

![Selecting Intuit App Type](https://images.workoscdn.com/images/00ae363c-f1d5-4d9c-aa7f-30e8fce87d9f.png?auto=format\&fit=clip\&q=50)

Choose a name for your application and click **Next** to continue.

![Naming the Intuit App](https://images.workoscdn.com/images/1c5f528e-c4dd-4712-9b29-25c1538bdb35.png?auto=format\&fit=clip\&q=50)

You will be prompted to add permissions. Intuit will require you to add at least one of the listed **Authorization scopes**. This determines the full set of scopes your application is allowed to request. The WorkOS integration will only request the `openid`, `email`, and `profile` scopes as part of the authentication flow and will not actually request any of the API authorization scopes specified on this screen. Click **Done** after adding permissions to complete the initial app setup.

![Adding Intuit App Permissions](https://images.workoscdn.com/images/979d4135-0ad0-4566-a12c-5ab6cf8f59ed.png?auto=format\&fit=clip\&q=50)

***

## (3) Get production keys for your Intuit OAuth application

Your app will be created as a sandbox application with development keys only. You will need production keys for your application to configure the WorkOS integration.

In the left navigation menu, select the **App Overview** tab and click on the **Get production keys** tile.

![Get Production Keys for Intuit App](https://images.workoscdn.com/images/20cca6ff-9b02-4bc5-82cc-04489cb50e5c.png?auto=format\&fit=clip\&q=50)

Complete the **App details** and **Compliance** questionnaires.

![Intuit App Details and Compliance](https://images.workoscdn.com/images/e810c6f9-9f42-406a-bac3-ee1ca7f1056d.png?auto=format\&fit=clip\&q=50)

After answering all required questions, you should be able to view your production **Client ID** and **Client Secret**.

![View Production Credentials for Intuit App](https://images.workoscdn.com/images/554ba353-3057-47c3-b737-1cf575a9d8af.png?auto=format\&fit=clip\&q=50)

## (4) Configure the Redirect URI for your Intuit OAuth application

In the left navigation menu, select the **Settings** tab. On the Settings page, click on the **Redirect URIs** tab. Make sure you're editing your **Production** application, and click **Add URI**.

![Configure Redirect URI for Intuit App - 1](https://images.workoscdn.com/images/89737850-57ab-4ae6-9cb5-faebcb150087.png?auto=format\&fit=clip\&q=50)

Enter the **Redirect URI** from the Intuit OAuth configuration in the WorkOS Dashboard. Click **Save**.

![Configure Redirect URI for Intuit App - 2](https://images.workoscdn.com/images/aaebcd22-7461-4849-9783-9cbf32064dcb.png?auto=format\&fit=clip\&q=50)

## (5) Configure Intuit credentials in WorkOS

Now that you have the **Intuit Client ID** and **Intuit Client Secret** from a previous step, return to the [WorkOS Dashboard](https://dashboard.workos.com).

In the **Intuit OAuth** configuration dialog, enable the integration. Paste the credentials from Intuit into their respective fields in the WorkOS Dashboard.

![Entering Intuit Credentials in WorkOS Dashboard](https://images.workoscdn.com/images/ed72d331-478a-477c-ab2b-9da4cf31800d.png?auto=format\&fit=clip\&q=50)

Click **Save changes** to complete the configuration.

You are now ready to start authenticating with Intuit OAuth. If you are using AuthKit's [Hosted UI](https://workos.com/docs/authkit/hosted-ui), a Continue with Intuit button will be added to your login page.

If you are building your own authentication flows outside of AuthKit's hosted UI, you can use the `provider` query parameter in the [Get Authorization URL API endpoint](https://workos.com/docs/reference/authkit/authentication/get-authorization-url) to support global Intuit OAuth for any domain. The `provider` query parameter should be set to `IntuitOAuth`.

***

## Frequently asked questions

### How is the WorkOS Intuit OAuth integration different from implementing regular Intuit OAuth flow?

It's the same Intuit OAuth flow as you could build yourself, but it's encapsulated within WorkOS SSO. This means you don't need to build it yourself. In addition to Intuit OAuth, you can use WorkOS SSO to support other identity providers, all with a single integration.

### What is the provider query parameter and how is it used in the Intuit OAuth integration?

If you are building your own authentication flows outside of AuthKit's hosted UI, you can use the `provider` query parameter in the [Get Authorization URL API endpoint](https://workos.com/docs/reference/authkit/authentication/get-authorization-url) to support global Intuit OAuth for any domain. The `provider` query parameter should be set to `IntuitOAuth`.

### What scopes are required for Intuit OAuth?

The **openid**, **profile**, and **email** scopes are required to allow the application to read user profile information necessary for authentication. These scopes provide access to the user's basic profile data and email address.
