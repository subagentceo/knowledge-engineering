# Clever OIDC

## Introduction

Each SSO identity provider requires specific information to create and configure a new [SSO connection](https://workos.com/docs/glossary/connection). Often, the information required to create an SSO connection will differ by identity provider.

To create a Clever OIDC SSO connection, you'll need three pieces of information: a [redirect URI](https://workos.com/docs/glossary/redirect-uri), [client ID](https://workos.com/docs/glossary/client-id), and [client secret](https://workos.com/docs/glossary/client-secret).

Start by logging into your WorkOS dashboard and navigate to the **Organizations** page from the left-hand navigation bar.

Select the organization you'd like to configure a Clever OIDC SSO connection for, and select **Configure manually** under **Single Sign-On**.

![WorkOS Dashboard Organizations tab with "Configure manually" button highlighted](https://images.workoscdn.com/images/d577cfbe-028b-48cf-8cc0-4cd5d3adf853.png?auto=format\&fit=clip\&q=50)

Select **Clever OIDC** from the identity provider dropdown. Click **Create Connection**.

![Create Connection form with Clever OIDC selected as Identity Provider](https://images.workoscdn.com/images/2a5545f1-70ea-4347-8d99-a39c5850085c.png?auto=format\&fit=clip\&q=50)

***

## What WorkOS provides

WorkOS provides the Redirect URI, which can be found in the **Service Provider Details** section on the SSO connection page in the [WorkOS Dashboard](https://dashboard.workos.com/).

- [Redirect URI](https://workos.com/docs/glossary/redirect-uri): The endpoint where identity providers send authentication responses after successful login

![The Redirect URI of a OIDC connection in the WorkOS Dashboard.](https://images.workoscdn.com/images/062a78e9-1d87-4643-890f-ebd1221e645b.png?auto=format\&fit=clip\&q=50)

The Redirect URI is the location an identity provider redirects its authentication response to. In Clever's case, it needs to be added to the OAuth settings in the Clever admin as outlined in [step 1](https://workos.com/docs/integrations/clever-oidc/1-configure-the-redirect-uri).

***

## What you'll need

You will need to obtain two pieces of information from the organization:

- [Client ID](https://workos.com/docs/glossary/client-id): Application identifier from the OIDC provider
- [Client secret](https://workos.com/docs/glossary/client-secret): Authentication secret for the application

Typically, this information comes from the organization's IT team when they set up your application's OIDC configuration in their Clever admin dashboard. However, if that's not the case during your setup, the next steps will show you how to obtain it.

***

## (1) Configure the Redirect URI

Sign in to [Clever](https://apps.clever.com/).

In the left navigation bar, select the **Settings** tab. In the horizontal menu, select the **Integration** tab.

Locate the **OAuth Settings** section and click **Edit**.

![Setting the redirect URI in the Clever admin dashboard](https://images.workoscdn.com/images/0f7a4169-8cf1-4239-9d03-9f2022fb6a88.png?auto=format\&fit=clip\&q=50)

The **Update OAuth Settings** dialog will open. Copy the [Redirect URI](https://workos.com/docs/integrations/clever-oidc/what-workos-provides) from the SSO connection page in the WorkOS Dashboard into the **REDIRECT URIS** field. Click **Save**.

***

## (2) Obtain configuration details

While on the **Settings** tab in Clever, select the **General** tab in the horizontal menu.

After creating an application, a client ID and client secret are provisioned. Locate the **CLIENT ID** and **CLIENT SECRET** fields and copy the values.

![Copying the client id and secret from the Clever admin dashboard](https://images.workoscdn.com/images/b4c527e1-0335-428e-a658-ef3ecfd820a3.png?auto=format\&fit=clip\&q=50)

Back in the [WorkOS Dashboard](https://dashboard.workos.com/) on the SSO connection page, enter the client ID and client secret you obtained from Clever into the respective fields in the **Settings** section.

![WorkOS Dashboard Settings with Client ID and Client Secret fields](https://images.workoscdn.com/images/d7ebf399-4cc9-4588-9961-6160d6bbd9bf.png?auto=format\&fit=clip\&q=50)

Click **Update connection** to save.

***

## (3) Test Single Sign-On

Test signing in to verify that the single sign-on connection was configured correctly.

From the SSO connection page in the WorkOS Dashboard, click **Test SSO** to initiate a test authentication flow.

***

## Next steps

Your Clever OIDC connection is now configured and ready to use. Users assigned to the application in Clever will be able to authenticate through WorkOS using their Clever credentials.

To start using this connection in your application, refer to the [SSO guide](https://workos.com/docs/sso) for implementation details.
