# LinkedIn OAuth

## Introduction

The LinkedIn OAuth integration allows your users to authenticate using their LinkedIn credentials.

The configuration process involves creating an OAuth application in LinkedIn and configuring the client credentials in your WorkOS Dashboard.

***

## What WorkOS provides

When setting up LinkedIn OAuth, WorkOS provides one key piece of information that needs to be configured in your LinkedIn OAuth application:

- [Redirect URI](https://workos.com/docs/glossary/redirect-uri): The endpoint where LinkedIn will send authentication responses after successful login

The Redirect URI is available in the [WorkOS Dashboard](https://dashboard.workos.com/). In the left navigation menu, select the **Authentication** tab and the **OAuth providers** sub-tab. Locate the **LinkedIn** section.

![The LinkedIn OAuth section in the WorkOS Dashboard.](https://images.workoscdn.com/images/d9cc3fce-75fc-410e-91d4-5706c88c609f.png?auto=format\&fit=clip\&q=50)

Click **Enable**. The **LinkedIn OAuth** configuration dialog will open. Locate the **Redirect URI**.

![The LinkedIn OAuth configuration modal in the WorkOS Dashboard.](https://images.workoscdn.com/images/3b7a3d3e-391d-401f-92a4-74bfd57b0dc5.png?auto=format\&fit=clip\&q=50)

The **Redirect URI** serves as the destination for authentication responses and must be configured in your LinkedIn OAuth application as an authorized redirect URL.

***

## What you'll need

You will need to obtain two pieces of information from a LinkedIn Developer application:

- **LinkedIn Client ID**: Application identifier from LinkedIn
- **LinkedIn Client Secret**: Authentication secret for the application (called Primary Client Secret in LinkedIn)

The following sections will guide you through creating an OAuth application in your LinkedIn Developer account and generating these credentials.

***

## (1) Create the LinkedIn OAuth application

Log in to your LinkedIn account and navigate to the [LinkedIn Developer Portal](https://developer.linkedin.com). Click **Create app**.

![The LinkedIn page to register a new OAuth application.](https://images.workoscdn.com/images/75a8bb4c-8df2-4c9d-b205-5e9e07d31501.png?auto=format\&fit=clip\&q=80)

Fill out the form with the required details about your application, including the application name, LinkedIn page, and app logo.

![The LinkedIn form to create a new OAuth application.](https://images.workoscdn.com/images/7da6ffdf-adda-4218-ac93-c2b211bfb12e.png?auto=format\&fit=clip\&q=80)

Click **Create app** to create the application.

***

## (2) Configure OAuth settings and obtain client credentials

On the application page, click the **Auth** tab. Copy the **Client ID** and **Primary Client Secret** as you'll need them for the WorkOS configuration.

![OAuth client credentials in the LinkedIn developer settings.](https://images.workoscdn.com/images/da63c1b4-44d3-43ca-a962-a1f7e641dc0e.png?auto=format\&fit=clip\&q=80)

Click the pencil button next to **OAuth 2.0 settings** > **Authorized redirect URLs for your app**. Click **Add redirect URL** and paste the **Redirect URI** from the WorkOS Dashboard. Click **Update**.

![OAuth redirect URL in the LinkedIn developer settings.](https://images.workoscdn.com/images/9e838b55-e2c7-4b30-bf68-8531e7bf376a.png?auto=format\&fit=clip\&q=80)

***

## (3) Add OIDC support

Click the **Products** tab and add the **Sign In with LinkedIn using OpenID Connect** product to enable OIDC authentication capabilities.

![The LinkedIn OIDC configuration dashboard.](https://images.workoscdn.com/images/f629579e-0ff1-42da-b1fc-40f577ae6723.png?auto=format\&fit=clip\&q=80)

***

## (4) Configure LinkedIn credentials in WorkOS

Now that you have the **LinkedIn Client ID** and **LinkedIn Client Secret** (Primary Client Secret) from the previous steps, return to the [WorkOS Dashboard](https://dashboard.workos.com).

In the **LinkedIn OAuth** configuration dialog, enable the integration. Paste the credentials from LinkedIn into their respective fields in the WorkOS Dashboard.

![The LinkedIn OAuth configuration modal in the WorkOS Dashboard.](https://images.workoscdn.com/images/053443da-9ab9-45a3-b345-4bc1cf0c6fd6.png?auto=format\&fit=clip\&q=50)

Click **Save** to complete the configuration.

You are now ready to start authenticating with LinkedIn OAuth. You will use the `provider` query parameter in the Get Authorization URL API endpoint to support global LinkedIn OAuth for any domain. The `provider` query parameter should be set to `LinkedInOAuth`.

***

## Frequently asked questions

### How is the WorkOS LinkedIn OAuth integration different from implementing regular LinkedIn OAuth flow?

It's the same LinkedIn OAuth flow as you could build yourself, but it's encapsulated within WorkOS SSO. This means you don't need to build it yourself. In addition to LinkedIn OAuth, you can use WorkOS SSO to support other identity providers, all with a single integration.

### What is the provider query parameter and how is it used in the LinkedIn OAuth integration?

You can use the `provider` query parameter in the [Get Authorization URL API endpoint](https://workos.com/docs/reference/sso/get-authorization-url) to support global LinkedIn OAuth for any domain. The `provider` query parameter should be set to `LinkedInOAuth`.

### Do I need a LinkedIn Company Page to create an OAuth application?

Yes, LinkedIn requires that OAuth applications be associated with a LinkedIn Company Page. This is a requirement from LinkedIn to ensure applications are associated with legitimate businesses or organizations.

### What is the difference between Client ID and Primary Client Secret in LinkedIn?

The **Client ID** is the public identifier for your LinkedIn application, while the **Primary Client Secret** is the private authentication key that must be kept secure. The Primary Client Secret is what WorkOS refers to as the LinkedIn Client Secret.

### Why do I need to add the "Sign In with LinkedIn using OpenID Connect" product?

This product enables OIDC (OpenID Connect) authentication capabilities for your LinkedIn application, which is required for the WorkOS integration to function properly. Without this product, the OAuth flow will not work correctly.
