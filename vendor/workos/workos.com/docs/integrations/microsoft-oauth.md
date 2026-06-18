# Microsoft OAuth

## Introduction

The Microsoft OAuth integration allows your users to authenticate using their Microsoft credentials through the "Sign in with Microsoft" flow.

The configuration process involves creating or configuring an application in Microsoft Azure and setting up OAuth permissions with the client credentials in the WorkOS Dashboard.

***

## Testing with default credentials in the staging environment

WorkOS provides a default Microsoft Client ID and Client Secret combination, which allows you to quickly enable and test Microsoft OAuth. Use the [WorkOS API to initiate SSO](https://workos.com/docs/sso/1-add-sso-to-your-app/add-an-endpoint-to-initiate-sso), setting the `provider` parameter to `MicrosoftOAuth`, and WorkOS will automatically use the default credentials until you add your own Microsoft Client ID and Client Secret to the configuration in the WorkOS Dashboard.

> The default credentials are only intended for testing and therefore only available in the Staging environment. For your production environment, please follow the steps below to create and specify your own Microsoft Client ID and Client Secret.

Please note that when you are using WorkOS default credentials, Microsoft's authentication flow will display WorkOS' name, logo, and other information to users. Once you register your own application and use its Microsoft Client ID and Client Secret for the OAuth flow, you will have the opportunity to customize the app, including its name, logo, contact email, etc.

***

## What WorkOS provides

When setting up Microsoft OAuth, WorkOS provides one key piece of information that needs to be configured in your Microsoft Azure application:

- [Redirect URI](https://workos.com/docs/glossary/redirect-uri): The endpoint where Microsoft will send authentication responses after successful login

The Redirect URI is available in the [WorkOS Dashboard](https://dashboard.workos.com/). In the left navigation menu, select **Authentication** tab and the **OAuth providers** sub-tab. Locate the **Microsoft** section.

![Open the Microsoft configuration dialog](https://images.workoscdn.com/images/c1518c6e-a765-4101-90eb-0795763aff92.png?auto=format\&fit=clip\&q=50)

Click **Manage**. The **Microsoft OAuth** configuration dialog will open. Locate the **Redirect URI**.

![Microsoft OAuth Redirect URI in the WorkOS Dashboard.](https://images.workoscdn.com/images/ba067eab-be24-404e-9d15-d1cc87720a57.png?auto=format\&fit=clip\&q=50)

The **Redirect URI** serves as the destination for authentication responses and must be configured in your Microsoft Azure application's authentication settings.

***

## What you'll need

You will need to obtain two pieces of information from a Microsoft Azure application:

- **Microsoft Client ID**: Application identifier from Microsoft Azure
- **Microsoft Client Secret**: Authentication secret for the application

The following sections will guide you through creating an application in your Microsoft Azure Portal and generating these credentials.

> IMPORTANT: When registering your app, select **Personal Microsoft accounts only** for **Supported Account Types**.

![The "Supported Account Types" setting in the Microsoft Azure Dashboard.](https://images.workoscdn.com/images/67aea66f-d0f3-45f1-a314-06b3ae570e24.png?auto=format\&fit=clip\&q=50)

***

## (1) Create or access Microsoft Azure application

Sign in to the [Microsoft Azure Portal](https://portal.azure.com/) and navigate to **Microsoft Entra ID** from the left hand navigation.

If you don't already have an application, click **App registrations** and then **New registration** to create one. When registering, you must select **Personal Microsoft accounts only** for **Supported Account Types**.

If you already have an application, select **App registrations** and then select your relevant application.

![Where to select an application in the Azure Portal.](https://images.workoscdn.com/images/334e0a97-80d5-4458-a3d7-6b4ec3f8f584.png?auto=format\&fit=clip\&q=50)

***

## (2) Configure authentication settings

Select the **Authentication** option for the application. In the **Redirect URIs** section, add the **Redirect URI** from the WorkOS Dashboard. When selecting a platform, choose **Web**.

![Where to enter the Redirect URI in the Azure App Settings.](https://images.workoscdn.com/images/b320ec4d-7dbb-4026-8bdb-7c6235dddb77.png?auto=format\&fit=clip\&q=50)

***

## (3) Configure token claims

Under **Token configuration**, select **Add optional claim**. Select **email**, **family\_name** and **given\_name**. If shown, select the **Turn on the Microsoft Graph email, profile permission** checkbox.

In order for the email claim to come through, the **Email** field for the user in Azure needs to be populated.

![Where to add claims in the Azure App Settings.](https://images.workoscdn.com/images/afe439ec-5d81-474f-9877-3657c3d50d1a.png?auto=format\&fit=clip\&q=50)

***

## (4) Generate client credentials

To get the Microsoft Client Secret, navigate to **Certificates & secrets** and click on **New client secret**. Give the client secret a description and select **Add**.

Microsoft's client secrets have an expiration date, with the highest value being 24 months. You will need to track these and rotate them before the expiration time.

![Where to create a client secret in the Entra ID App Settings.](https://images.workoscdn.com/images/1f7eca0b-700d-42f8-911a-238a3dee3df8.png?auto=format\&fit=clip\&q=50)

Copy the **value** of the new client secret as you'll need it for the WorkOS configuration.

![Where to copy the Entra ID Client Secret.](https://images.workoscdn.com/images/98510fb9-db6c-43c6-9a79-85284916b169.png?auto=format\&fit=clip\&q=50)

To obtain the Microsoft Client ID, navigate to the **Overview** tab of your application and copy the **Application (client) ID**.

![Where to copy the Entra ID Client ID.](https://images.workoscdn.com/images/6c79e0bc-9560-4a27-96f3-64569da1aa0e.png?auto=format\&fit=clip\&q=50)

***

## (5) Configure Microsoft credentials in WorkOS

Now that you have the **Microsoft Client ID** and **Microsoft Client Secret** from the previous steps, return to the [WorkOS Dashboard](https://dashboard.workos.com).

In the **Microsoft OAuth** configuration dialog, select **Your app's credentials**. Paste the credentials from Microsoft into their respective fields in the WorkOS Dashboard.

![Where to enter Microsoft OAuth client credentials into the WorkOS Dashboard.](https://images.workoscdn.com/images/2d7e1ea9-ea44-439c-bbaf-f4c19569b7aa.png?auto=format\&fit=clip\&q=50)

Click **Save** to complete the configuration.

After that, you're now able to authenticate users with Microsoft OAuth. You will use the `provider` query parameter in the Get Authorization URL API endpoint to support global Microsoft OAuth for any domain. The `provider` query parameter should be set to `MicrosoftOAuth`.

***

## Configure Additional OAuth Scopes (Optional)

WorkOS will request the OAuth scopes that are required for authentication by default. You can optionally configure your integration to request additional OAuth scopes as needed.

When the **Return Microsoft OAuth tokens** option is selected, the access token and refresh token from Microsoft will be included in the response from the [Authenticate with code API](https://workos.com/docs/reference/authkit/authentication/code).

![A screenshot showing Microsoft OAuth scopes configuration in the WorkOS Dashboard](https://images.workoscdn.com/images/af28d982-0bc2-4240-be1a-9f97068d036f.png?auto=format\&fit=clip\&q=50)

Any scopes configured here will be included on every Microsoft OAuth request. To specify additional scopes dynamically, use the `provider_scopes` query parameter on the [Get Authorization URL API endpoint](https://workos.com/docs/reference/authkit/authentication/get-authorization-url).

Any additional scopes that you plan to request should also be configured as API permissions on your Microsoft Azure application. For more information, see Microsoft's OAuth scopes [documentation](https://learn.microsoft.com/en-us/entra/identity-platform/scopes-oidc).

![A screenshot showing Microsoft OAuth scopes configuration in Azure App Registration](https://images.workoscdn.com/images/537b2f36-cfb0-4c35-83a6-7fee760418d5.png?auto=format\&fit=clip\&q=50)

> IMPORTANT: Your users may see errors during sign-in if the scopes included on an authorization request are not included in the API permissions configured on your Microsoft Azure application. Changes to scopes should be tested in a staging environment before applying them to production.

***

## Frequently asked questions

### How is the WorkOS Microsoft OAuth integration different from implementing regular Microsoft OAuth flow?

It's the same Microsoft OAuth flow as you could build yourself, but it's encapsulated within WorkOS SSO. This means you don't need to build it yourself. In addition to Microsoft OAuth, you can use WorkOS SSO to support other identity providers, all with a single integration.

### What is the provider query parameter and how is it used in the Microsoft OAuth integration?

You can use the `provider` query parameter in the [Get Authorization URL API endpoint](https://workos.com/docs/reference/sso/get-authorization-url) to support global Microsoft OAuth for any domain. The `provider` query parameter should be set to `MicrosoftOAuth`. This is necessary because Microsoft OAuth does not take a user's domain into account when logging in with a "Sign in with Microsoft" button.

### Why do I need to select "Personal Microsoft accounts only" for account types?

This setting is required for the WorkOS integration to function properly. It ensures that the OAuth flow works with personal Microsoft accounts rather than organizational accounts, which have different authentication requirements.

### How long do Microsoft client secrets last?

Microsoft's client secrets have an expiration date, with the maximum value being 24 months. You will need to track these and rotate them before the expiration time to maintain continuous authentication functionality.
