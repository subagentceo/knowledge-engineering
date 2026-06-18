# Google OAuth

## Introduction

The Google OAuth integration allows your users to authenticate using their Google Workspace credentials.

The configuration process involves obtaining client credentials from your Google Cloud Platform Console and configuring them in the WorkOS Dashboard.

***

## Testing with default credentials in the staging environment

WorkOS provides a default Google Client ID and Client Secret combination, which allows you to quickly enable and test Google OAuth. Use the [WorkOS API to initiate SSO](https://workos.com/docs/sso/1-add-sso-to-your-app/add-an-endpoint-to-initiate-sso), setting the `provider` parameter to `GoogleOAuth`, and WorkOS will automatically use the default credentials until you add your own Google Client ID and Client Secret to the configuration in the WorkOS Dashboard.

> The default credentials are only intended for testing and therefore only available in the Staging environment. For your production environment, please follow the steps below to create and specify your own Google Client ID and Client Secret.

Please note that when you are using WorkOS default credentials, Google's authentication flow will display WorkOS' name, logo, and other information to users. Once you register your own application and use its Google Client ID and Client Secret for the OAuth flow, you will have the opportunity to customize the app, including its name, logo, contact email, etc.

***

## What WorkOS provides

When setting up Google OAuth, WorkOS provides one key piece of information that needs to be configured in your Google Cloud Platform project:

- [Redirect URI](https://workos.com/docs/glossary/redirect-uri): The endpoint where Google will send authentication responses after successful login

The Redirect URI is available in the [WorkOS Dashboard](https://dashboard.workos.com/). In the left navigation menu, select the **Authentication** tab and the **OAuth providers** sub-tab. Locate the **Google** section.

![Open the Google configuration dialog](https://images.workoscdn.com/images/1e400f3e-1885-481f-8840-4a3a9f8c7f97.png?auto=format\&fit=clip\&q=50)

Click **Manage**. The **Google OAuth** configuration dialog will open. Locate the **Redirect URI**.

![Google OAuth Redirect URI in the WorkOS Dashboard.](https://images.workoscdn.com/images/020273f1-d216-4aca-8ddd-8963accd7517.png?auto=format\&fit=clip\&q=50)

The **Redirect URI** serves as the destination for authentication responses and must be configured in your Google Cloud Platform project as an authorized redirect URI.

***

## What you'll need

You will need to obtain two pieces of information from a Google Cloud Platform project:

- **Google Client ID**: Application identifier from Google Cloud Platform
- **Google Client Secret**: Authentication secret for the application

The following sections will guide you through generating these credentials in your Google Cloud Platform Console.

***

## (1) Access Google Cloud Platform Console

Sign in to the [Google Cloud Platform Console Dashboard](https://console.cloud.google.com/) and select your application's project from the project selection dropdown menu in the navigation bar.

![How to select your application in the Google Cloud Platform Console Dashboard.](https://images.workoscdn.com/images/45adf7cf-78e0-4c5a-a6c1-7b3eee62c723.png?auto=format\&fit=clip\&q=50)

***

## (2) Configure OAuth consent screen

In the left navigation menu, select **APIs & Services** and then **OAuth Consent Screen**.

![Where to find the OAuth Consent Screen option in the Google Cloud Platform Console Dashboard.](https://images.workoscdn.com/images/c37375e2-6ef2-41ba-9b65-a125501bfd5a.png?auto=format\&fit=clip\&q=50)

Now within the **Google Auth Platform**, in the left navigation menu, select **Clients**. Click **Create client**.

![How to create a new client in the Google Cloud Platform Console Dashboard.](https://images.workoscdn.com/images/c5ffe36c-e471-4b27-a6b9-936d26837e93.png?auto=format\&fit=clip\&q=50)

In the **Application type** dropdown, select **Web application**. Provide an appropriate name for your OAuth client ID.

> As a best practice, your OAuth client ID's name should be different from your application's name. It will not be shown to end users.

Under the **Authorized redirect URIs** section, click **Add URI**. Add the **Redirect URI** from the WorkOS Dashboard.

![Where to enter your WorkOS Redirect URI in the Google Cloud Platform Console Dashboard.](https://images.workoscdn.com/images/e18673f7-e490-46a7-ad0c-f71d5ddcb08a.png?auto=format\&fit=clip\&q=50)

Scroll down and click **Create**. It may take up to 5 minutes, but once your OAuth client is created, you'll be presented with your application's client ID and client secret. Be sure to copy these values as they may not be available after closing the dialog.

![The client ID and client secret in the Google Cloud Platform Console Dashboard.](https://images.workoscdn.com/images/13a05048-c45c-43c5-9d56-39faf53ab479.png?auto=format\&fit=clip\&q=50)

***

## (3) Configure Google credentials in WorkOS

Now that you have the **Google Client ID** and **Google Client Secret** from the previous step return to the [WorkOS Dashboard](https://dashboard.workos.com).

In the **Google OAuth** configuration dialog, select **Your app's credentials**. Paste the credentials from Google into their respective fields in the WorkOS Dashboard.

![Where to enter the Google Client ID and Google Client Secret in the WorkOS Dashboard.](https://images.workoscdn.com/images/6c209570-926d-49bf-9189-0e2f705e70ee.png?auto=format\&fit=clip\&q=50)

Click **Save** to complete the configuration.

***

## (4) Publish the Google OAuth application

In the left navigation menu of the Google Cloud Platform Console, select the **Audience** tab. If your application is not **In production**, click **Publish app**. In the **Push to Production?** dialog that opens, click **Confirm**. If your application is still in testing mode, users will likely get an "Access Blocked" error when attempting to log into your app.

![The publishing status of your Google OAuth application](https://images.workoscdn.com/images/564bc12f-0abb-4866-8a48-eb9451b851fb.png?auto=format\&fit=clip\&q=50)

After that, you're now able to authenticate users with Google OAuth. You will use the `provider` query parameter in the Get Authorization URL API endpoint to support global Google OAuth for any domain. The `provider` query parameter should be set to `GoogleOAuth`.

***

## Customize Google OAuth Domain (Optional)

This optional process requires access to your Google Cloud Console and your domain's DNS settings.

After implementing the steps above, you'll notice that the Google OAuth sign in form displays "Choose an account to continue to workos.com". This is based on the Authorized Redirect URI in Google. To set this to a domain other than workos.com, Google will ask for proof of ownership of your domain. To help guide you through this process we have a self-service flow.

### (1) Add your custom Google OAuth domain

In the **Authentication** tab of the WorkOS Dashboard, find the **Google OAuth** section. Depending on which WorkOS products have been enabled, the **Google OAuth** section may be under the **Methods** or **OAuth providers** sub-tabs in the left navigation menu.

Click **Setup Custom Domain**.

> Note: This button will only appear if your environment has a valid Google OAuth configuration and a custom domain has not already been configured.

![Where to find the Set Up Custom Domain button in the WorkOS Dashboard.](https://images.workoscdn.com/images/9ba10d03-c0af-41e6-b090-884ba1cddca4.png?auto=format\&fit=clip\&q=50)

Under **Add Custom Domain**, input the domain that you wish to use in place of `auth.workos.com`. This is often a subdomain such as `auth.example.com`. Click on **Set Domain**.

![Where to add a custom domain in the WorkOS Dashboard.](https://images.workoscdn.com/images/d233701c-74c5-4a42-a063-9eaa680dc7c9.png?auto=format\&fit=clip\&q=50)

### (2) Add CNAME target

Add a new CNAME target inside your domain's DNS settings. Set the host to match the domain you set in the previous step and set the value to `cname.workosdns.com`.

Once the above is complete, click **Verify DNS**. This verification often takes less than a minute, but is dependent on how long your DNS record takes to propagate. The page will continue polling to check the status of your verification until it is successful.

![The CNAME target of cname.workosdns.com in the WorkOS Dashboard.](https://images.workoscdn.com/images/feebf1a1-1f42-4c0b-b1fc-67d37745b948.png?auto=format\&fit=clip\&q=50)

### (3) Add new redirect URI to Google

Once the DNS has been successfully verified, WorkOS will provide a URI starting with your subdomain in the **Add redirect URI to Google** section. Click on the clipboard icon to copy the URL.

![The clipboard icon in the WorkOS Dashboard.](https://images.workoscdn.com/images/95060659-da91-40d8-849b-9718ef7b00fc.png?auto=format\&fit=clip\&q=50)

In the Google Cloud Platform Console, under your project's **APIs & Services** → **Clients** section, add the URL copied above in the **Authorized redirect URIs** section. To ensure your Google OAuth integration continues to work without any gaps in service, leave your existing redirect URI in place for now.

![Where to enter the redirect URI in the Google Cloud Platform Console.](https://images.workoscdn.com/images/548b4e3e-164e-4358-ab1d-58c5d3071731.png?auto=format\&fit=clip\&q=50)

### (4) Test Google redirect URI

Once the URL has been added and saved on the Google side, navigate back to the WorkOS Dashboard and click on **Test Google Redirect URI**.

![The Test Google Redirect URI button in the WorkOS Dashboard.](https://images.workoscdn.com/images/1e191eb9-a316-407e-ae63-69be88ac3665.png?auto=format\&fit=clip\&q=50)

If the test is successful, you will see a **Successfully tested** message displayed. Click **Save custom Google OAuth settings**.

Once these updates have been saved, test out your Google OAuth sign in flow to ensure everything is working properly and your domain is displayed on the form. If everything is looking good, it is safe to remove the old `auth.workos.com` URL from your Google Authorized redirect URIs, and `workos.com` from your Google Authorized domains.

***

## Configure Additional OAuth Scopes (Optional)

WorkOS will request the OAuth scopes that are required for authentication by default. You can optionally configure your integration to request additional OAuth scopes as needed.

When the **Return Google OAuth tokens** option is selected, the access token and refresh token from Google will be included in the response from the [Authenticate with code API](https://workos.com/docs/reference/authkit/authentication/code).

![A screenshot showing Google OAuth scopes configuration in the WorkOS Dashboard](https://images.workoscdn.com/images/53f64aa3-fbd1-4371-9fba-2e2ff9eb0823.png?auto=format\&fit=clip\&q=50)

Any scopes configured here will be included on every Google OAuth request. To specify additional scopes dynamically, use the `provider_scopes` query parameter on the [Get Authorization URL API endpoint](https://workos.com/docs/reference/authkit/authentication/get-authorization-url).

Any additional scopes that you plan to request must also be configured on your OAuth consent screen in the Google Cloud Platform Console.

Google considers some scopes to be sensitive or restricted. If requesting any of these sensitive or restricted scopes, your application will need to be verified by Google. For more information, see Google's OAuth scopes [documentation](https://developers.google.com/identity/protocols/oauth2/scopes).

![A screenshot showing Google OAuth scopes configuration in the Google Cloud Console](https://images.workoscdn.com/images/c9f2cc5d-ca3c-466f-9db8-9138ad60cc43.png?auto=format\&fit=clip\&q=50)

> IMPORTANT: Your users will see an "unverified app" screen from Google and may see errors during sign-in if the scopes included on an authorization request differ from the scopes configured on your OAuth consent screen, or if you request sensitive or restricted scopes without going through Google's app verification process. Changes to scopes should be tested in a staging environment before applying them to production.

***

## Frequently asked questions

### How is the WorkOS Google OAuth integration different from implementing regular Google OAuth flow?

It's the same Google OAuth flow as you could build yourself, but it's encapsulated within WorkOS SSO. This means you don't need to build it yourself. In addition to Google OAuth, you can use WorkOS SSO to support other identity providers, all with a single integration.

### What is the provider query parameter and how is it used in the Google OAuth integration?

You can use the `provider` query parameter in the [Get Authorization URL API endpoint](https://workos.com/docs/reference/sso/get-authorization-url) to support global Google OAuth for any domain. The `provider` query parameter should be set to `GoogleOAuth`.
