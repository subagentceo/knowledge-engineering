# Okta OIDC

## Introduction

Each SSO identity provider requires specific information to create and configure a new [SSO connection](https://workos.com/docs/glossary/connection). Often, the information required to create an SSO connection will differ by identity provider.

To create an Okta OIDC SSO connection, you'll need four pieces of information: a [redirect URI](https://workos.com/docs/glossary/redirect-uri), [client ID](https://workos.com/docs/glossary/client-id), [client secret](https://workos.com/docs/glossary/client-secret), and [discovery endpoint](https://workos.com/docs/glossary/discovery-endpoint).

Start by logging in to your WorkOS dashboard and navigate to the **Organizations** page from the left-hand navigation bar.

Select the organization you'd like to configure an Okta OIDC SSO connection for, and select **Configure manually** under **Single Sign-On**.

![WorkOS Dashboard Organizations tab with "Configure manually" button highlighted](https://images.workoscdn.com/images/d577cfbe-028b-48cf-8cc0-4cd5d3adf853.png?auto=format\&fit=clip\&q=50)

Select **Okta OIDC** from the identity provider dropdown, enter a descriptive name for the connection, click **Create Connection**.

![Create Connection form with Okta OIDC selected as Identity Provider](https://images.workoscdn.com/images/6e60c859-936e-4894-ac88-0524565ef8c8.png?auto=format\&fit=clip\&q=50)

***

## What WorkOS provides

WorkOS provides the Redirect URI, which can be found in the **Service Provider Details** section on the SSO connection page in the [WorkOS Dashboard](https://dashboard.workos.com/).

- [Redirect URI](https://workos.com/docs/glossary/redirect-uri): The endpoint where identity providers send authentication responses after successful login

![The Redirect URI of a OIDC connection in the WorkOS Dashboard.](https://images.workoscdn.com/images/99a7c7d5-50a9-4bff-a3f3-22dc1cfeca58.png?auto=format\&fit=clip\&q=50)

The Redirect URI is the location an identity provider redirects its authentication response to. In Okta's case, it needs to be set as the **Sign-in redirect URI** when configuring your OIDC application in their Okta instance.

Specifically, the Redirect URI will need to be added to the **Sign-in redirect URIs** section in the **Create OpenID Connect Integration** wizard, which is outlined in [step 2](https://workos.com/docs/integrations/okta-oidc/2-configure-the-integration).

***

## What you'll need

You will need to obtain three pieces of information from the organization:

- [Client ID](https://workos.com/docs/glossary/client-id): Application identifier from the OIDC provider
- [Client secret](https://workos.com/docs/glossary/client-secret): Authentication secret for the application
- [Discovery endpoint](https://workos.com/docs/glossary/discovery-endpoint): Configuration URL containing OIDC metadata

Normally, this information will come from the organization's IT Management team when they set up your application's OIDC configuration in their Okta admin dashboard. But, should that not be the case during your setup, the next steps will show you how to obtain it.

***

## (1) Create OIDC integration

Log in to the Okta admin console, and select **Applications** in the left-hand sidebar.

![Okta admin console navigation menu with Applications tab highlighted](https://images.workoscdn.com/images/d3e05208-2c35-4cba-a592-62aadf2752a1.png?auto=format\&fit=clip\&q=50)

Click **Create App Integration**.

![Okta Applications page with "Create App Integration" button](https://images.workoscdn.com/images/8059f5a3-0c46-45fb-a4db-30c13c0fc0de.png?auto=format\&fit=clip\&q=50)

In the **Create a new app integration** dialog, select **OIDC - OpenID Connect** and **Web Application**.

![Create app integration dialog with OIDC - OpenID Connect and Web Application selected](https://images.workoscdn.com/images/d6b2f9e8-42f4-4279-9adf-6954644a9758.png?auto=format\&fit=clip\&q=50)

Click **Next**.

***

## (2) Configure the integration

Enter a descriptive App name, then configure the Sign-in redirect URI.

![OIDC app configuration form with app name field and sign-in redirect URI section](https://images.workoscdn.com/images/7ed6bf17-6839-48f2-b796-883b181c1e79.png?auto=format\&fit=clip\&q=50)

Locate the **Sign-in redirect URIs** section and click **Add URI**. Copy the [Redirect URI](https://workos.com/docs/integrations/okta-oidc/what-workos-provides) from the SSO connection page in your WorkOS Dashboard and paste it into this field.

![Sign-in redirect URIs configuration with WorkOS redirect URI entered](https://images.workoscdn.com/images/fa2cc4f3-a11a-4612-8b58-4739385babac.png?auto=format\&fit=clip\&q=50)

Scroll down to the **Assignments** section. Select **Limit access to selected groups** and assign the appropriate groups to the application. This can be edited later.

![Assignments section with "Limit access to selected groups" option selected](https://images.workoscdn.com/images/743f90a9-aa9d-48a1-94e4-05b1743f9e81.png?auto=format\&fit=clip\&q=50)

Click **Save**.

***

## (3) Obtain configuration details

On the **General** tab, locate the **Client ID** and **Client secret**.

Under **Proof Key for Code Exchange (PKCE)**, ensure **Require PKCE as additional verification** is checked.

![Okta app General tab showing Client Credentials with PKCE enabled](https://images.workoscdn.com/images/d2d977fc-08cd-4f8d-8983-bd3e96b9cda9.png?auto=format\&fit=clip\&q=50)

![Okta app General tab showing Client ID and Client secret fields](https://images.workoscdn.com/images/20ac0b30-2575-401c-973d-016c8a18efe9.png?auto=format\&fit=clip\&q=50)

Back in the WorkOS Dashboard, enter the client ID, and client secret into the respective fields in the **Identity Provider Configuration** section of the SSO connection.

In the top right-hand navigation, click your user email and locate the **Okta tenant domain** which usually ends with `.okta.com`.

Copy this value and define the discovery endpoint in the format: `https://{tenant-domain}/.well-known/openid-configuration`. Enter this URL in the **Discovery Endpoint** field in the WorkOS dashboard.

![WorkOS Dashboard Identity Provider Configuration with client ID, client secret, and discovery endpoint fields](https://images.workoscdn.com/images/24179b09-b86d-46f8-9375-95b9ff9abd36.png?auto=format\&fit=clip\&q=50)

Click **Save Configuration**.

***

## (4) Role assignment (optional)

With [identity provider role assignment](https://workos.com/docs/sso/identity-provider-role-assignment), users can receive roles within your application based on their group memberships. Users will automatically be granted the assigned roles within your application when they authenticate. To enable this functionality:

### Set groups claim in Okta

Navigate to the **Sign On** tab of your OIDC application, locate the **Token Claims** section, click **Show legacy configuration** and click **Edit**.

![Okta app Sign On tab with Claims section and Edit button](https://images.workoscdn.com/images/d699c5cb-c4f1-4299-acbe-7ed4cc1dfee9.png?auto=format\&fit=clip\&q=50)

![Okta app Token Claims section and Show legacy configuration section](https://images.workoscdn.com/images/b3b44868-5761-4b74-bd5a-e653b017eba7.png?auto=format\&fit=clip\&q=50)

Set the **Groups claim type** to **Filter**. Define the **Groups claim filter** as `groups` and set a filter to match the appropriate Okta groups. To match all groups, use the regex `.*` as shown below.

![Okta app Legacy group claims configuration](https://images.workoscdn.com/images/3dc662e0-e62d-478b-9de0-4f5666ccea56.png?auto=format\&fit=clip\&q=50)

### Configure role assignment in WorkOS

In Okta, navigate to the **Assignments** tab in the application. Locate the **Filters** sidebar, click on **Groups** to filter and display all the assigned groups available to map.

![Okta dashboard showing assigned groups](https://images.workoscdn.com/images/17d32c5b-fc4b-458b-98f6-99c774af1522.png?auto=format\&fit=clip\&q=50)

From the SSO connection page in the [WorkOS Dashboard](https://dashboard.workos.com/), scroll to the **Groups and role assignments** section.

![WorkOS dashboard highlighting create group button](https://images.workoscdn.com/images/c29ef1a7-d873-49f6-ad43-8c945245a033.png?auto=format\&fit=clip\&q=50)

For each group you want to assign a role, click the **Create group** button and enter the following:

1. Copy the group name from Okta into the **IdP Group ID** field.
2. Optionally, enter a group name into the **Name** field.
3. Assign the appropriate role to the group.

![WorkOS dashboard with open create group dialog and idp\_id, name, and role assignment inputs](https://images.workoscdn.com/images/d542c8c3-e032-41a6-ae72-c8dc586ec88d.png?auto=format\&fit=clip\&q=50)

> Group members without an explicit role will receive the default role.

***

## PKCE (Proof Key for Code Exchange)

WorkOS supports [PKCE](https://datatracker.ietf.org/doc/html/rfc7636) for OIDC connections, including Okta. PKCE adds an additional layer of security to the authorization code flow by preventing authorization code interception attacks.

In the **Advanced settings** section of your Okta OIDC connection configuration in the WorkOS Dashboard, you can view and manage the PKCE setting.

> Only disable PKCE if you encounter issues with your identity provider. Okta supports PKCE, and keeping it enabled is strongly recommended for security.

***

## Next steps

Your Okta OIDC connection is now configured and ready to use. Users assigned to the application in Okta will be able to authenticate through WorkOS using their Okta credentials.

To start using this connection in your application, refer to the [SSO guide](https://workos.com/docs/sso) for implementation details.
