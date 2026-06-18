# Entra ID OIDC (formerly Azure AD)

## Introduction

Each SSO identity provider requires specific information to create and configure a new [SSO connection](https://workos.com/docs/glossary/connection). Often, the information required to create an SSO connection will differ by identity provider.

To create an Entra ID OIDC SSO connection, you'll need four pieces of information: a [redirect URI](https://workos.com/docs/glossary/redirect-uri), [application (client) ID](https://workos.com/docs/glossary/client-id), [client secret](https://workos.com/docs/glossary/client-secret) and [discovery endpoint](https://workos.com/docs/glossary/discovery-endpoint).

Start by logging in to your WorkOS dashboard and navigate to the **Organizations** page from the left-hand navigation bar.

Select the organization you'd like to configure an Entra ID OIDC SSO connection for, and select **Configure manually** under **Single Sign-On**.

![WorkOS Dashboard Organizations tab with "Configure manually" button highlighted](https://images.workoscdn.com/images/d577cfbe-028b-48cf-8cc0-4cd5d3adf853.png?auto=format\&fit=clip\&q=50)

Select **Entra ID (Azure AD) OIDC** from the identity provider dropdown, enter a descriptive name for the connection, click **Create Connection**.

![Create Connection form with Entra ID (Azure AD) OIDC selected as Identity Provider](https://images.workoscdn.com/images/90fe747d-88e3-40da-a028-161132401a5c.png?auto=format\&fit=clip\&q=50)

***

## What WorkOS provides

WorkOS provides the Redirect URI, which can be found in the **Service Provider Details** section on the SSO connection page in the [WorkOS Dashboard](https://dashboard.workos.com/).

- [Redirect URI](https://workos.com/docs/glossary/redirect-uri): The endpoint where identity providers send authentication responses after successful login

![The Redirect URI of a OIDC connection in the WorkOS Dashboard.](https://images.workoscdn.com/images/99a7c7d5-50a9-4bff-a3f3-22dc1cfeca58.png?auto=format\&fit=clip\&q=50)

The Redirect URI is the location an identity provider redirects its authentication response to. In Entra ID's case, it needs to be set during application registration when configuring your OIDC application, which is outlined in [step 1](https://workos.com/docs/integrations/entra-id-oidc/1-register-an-application) below.

***

## What you'll need

You will need to obtain three pieces of information from the organization:

- [Application (Client) ID](https://workos.com/docs/glossary/client-id): Application identifier from the OIDC provider
- [Client Secret](https://workos.com/docs/glossary/client-secret): Authentication secret for the application
- [Discovery endpoint](https://workos.com/docs/glossary/discovery-endpoint): Configuration URL containing OIDC metadata

Normally, this information will come from the organization's IT Management team when they set up your application's OIDC configuration in their Entra ID admin center. But, should that not be the case during your setup, the next steps will show you how to obtain it.

***

## (1) Register an application

Sign in to the [Microsoft Entra admin center](https://entra.microsoft.com/).

In the left navigation menu, expand the **Identity** section. Expand the **Applications** sub-section. Select the **App registrations** tab. Click **New registration**.

![Microsoft Entra admin center navigation showing Identity > Applications > App registrations](https://images.workoscdn.com/images/67c07f6f-f60d-48da-b950-eac73d094dfb.png?auto=format\&fit=clip\&q=50)

Enter an appropriate app name, such as your organization or application name.

Select one of these **Supported account types**:

- Accounts in this organizational directory only (Default Directory only - Single tenant) (Default)
- Accounts in any organizational directory (Any Microsoft Entra ID tenant - Multitenant)

In the **Redirect URI** field, select the **Web** option from the dropdown menu. Copy the [Redirect URI](https://workos.com/docs/integrations/entra-id-oidc/what-workos-provides) from the SSO connection page in the WorkOS Dashboard and paste it into the input field.

![App registration form with name, supported account types, and redirect URI fields](https://images.workoscdn.com/images/d09699ac-00d4-4a8f-9ff7-9090c79d805b.png?auto=format\&fit=clip\&q=50)

Click **Register**.

***

## (2) Obtain required configuration details

Now you'll need to gather three pieces of information from your Entra ID application that will be configured in your WorkOS dashboard: the client ID, client secret, and discovery endpoint. Keep these values handy to input into the WorkOS Dashboard.

### Get the client ID

From the application **Overview** page, copy the **Application (client) ID**.

![Entra ID application Overview page showing Application (client) ID field](https://images.workoscdn.com/images/70506649-66e4-490a-82b0-69175d0f3381.png?auto=format\&fit=clip\&q=50)

### Create and retrieve the client secret

Navigate to the **Certificates & secrets** page. Click **New client secret**.

![Certificates & secrets page with "New client secret" button](https://images.workoscdn.com/images/28afb31c-3e94-4263-aedb-9924e0a4678d.png?auto=format\&fit=clip\&q=50)

Enter an appropriate secret description and select an expiration period. Click **Add**.

![Add a client secret panel with the description, expires at fields highlighted](https://images.workoscdn.com/images/6d72665b-7ad0-4837-ac58-b9acbe2d7fee.png?auto=format\&fit=clip\&q=50)

Copy the newly created client secret **Value** immediately as it will not be shown again after you navigate away from this page.

![Client secret creation form with description field and generated secret value](https://images.workoscdn.com/images/7e1604a5-1bdb-4a0c-80d5-8b4401c4269e.png?auto=format\&fit=clip\&q=50)

### Get the discovery endpoint

From the application **Overview** page, click the **Endpoints** tab.

![Entra ID application Overview page with Endpoints tab highlighted](https://images.workoscdn.com/images/70fee14e-bb7d-43ab-8bb8-70150af299b6.png?auto=format\&fit=clip\&q=50)

Scroll down to find and copy the **OpenID Connect metadata document** URL. This is your Discovery Endpoint.

![Endpoints list showing OpenID Connect metadata document URL](https://images.workoscdn.com/images/aca9c724-2a6f-4449-b435-f63bd538d60f.png?auto=format\&fit=clip\&q=50)

### Update the SSO connection settings

Back in the WorkOS Dashboard on the SSO connection page, enter the client ID, client secret, and discovery endpoint you obtained from Entra ID into the respective fields in the **\{SSO connection name} Settings** section.

![WorkOS Dashboard Identity Provider Configuration with Client ID, Client Secret, and Discovery Endpoint fields](https://images.workoscdn.com/images/714cb015-94db-4080-ad53-942da1804c01.png?auto=format\&fit=clip\&q=50)

Click **Update connection** to save.

***

## (3) Configure token claims

Navigate to the **Token configuration** page. Click **Add optional claim**.

![Token configuration page with "Add optional claim" button](https://images.workoscdn.com/images/c71dc730-995d-48d3-a5eb-3b28166fa6c0.png?auto=format\&fit=clip\&q=50)

Select **ID** token type, and then select the following claims:

- `email`
- `family_name`
- `given_name`

![Optional claims dialog with ID token type selected and email, family\_name, given\_name claims](https://images.workoscdn.com/images/0cfa531a-de60-4ead-9655-0a473dbd5658.png?auto=format\&fit=clip\&q=50)

Click **Add**. In the pop-up, select **Turn on the Microsoft Graph email, profile permission**, then click **Add**.

![Add optional claim panel with turn on Microsoft Graph checkbox highlighted](https://images.workoscdn.com/images/644ac9db-6bb6-4ca5-bd65-af23ceec5b6a.png?auto=format\&fit=clip\&q=50)

***

## (4) Assign users and groups

In the left navigation menu, expand the **Identity** section. Expand the **Applications** sub-section. Select the **Enterprise applications** tab.

Search for your application by name and select it.

![Enterprise applications search interface with application list](https://images.workoscdn.com/images/7ca10480-3bc6-4d1e-99cd-7de8543e374d.png?auto=format\&fit=clip\&q=50)

From the Enterprise application page, select the **Users and groups** tab. Click **Add user/group**.

![Enterprise application Users and groups tab with "Add user/group" button](https://images.workoscdn.com/images/15448828-6288-4350-9ac3-27c9997f04e4.png?auto=format\&fit=clip\&q=50)

Select appropriate users and groups to add to the OIDC application.

![User and group assignment interface with selection options and Assign button](https://images.workoscdn.com/images/e3964bfc-92b2-497d-b291-098cbe1ee94f.png?auto=format\&fit=clip\&q=50)

When finished, click **Assign** to add the selected users to your OIDC application.

![Add assignment page with Assign button highlighted](https://images.workoscdn.com/images/80e136c6-6e9f-41f4-aed9-85421746906b.png?auto=format\&fit=clip\&q=50)

***

## (5) Role assignment (optional)

With [identity provider role assignment](https://workos.com/docs/sso/identity-provider-role-assignment), users can receive roles within your application based on their group memberships. Users will automatically be granted the assigned roles within your application when they authenticate. To enable this functionality:

### Configure groups claim in Entra ID

From the app registration, navigate to the **Token configuration** page. Click **Add groups claim**.

![Token configuration page with "Add groups claim" button](https://images.workoscdn.com/images/d6342c8f-1f32-43c3-a91e-16cacdd62b31.png?auto=format\&fit=clip\&q=50)

In the **Group Claims** panel, select appropriate groups. For example, you could select **Groups assigned to the application** to only send groups assigned to the OIDC app in Entra ID. Click **Add**.

![Group Claims configuration panel with group selection options](https://images.workoscdn.com/images/5cf70ad4-6eb3-4f6e-87c6-16b15c1c781f.png?auto=format\&fit=clip\&q=50)

### Configure role assignment in WorkOS

From the SSO connection page in the [WorkOS Dashboard](https://dashboard.workos.com/), scroll to the **Groups and role assignments** section.

![WorkOS dashboard highlighting create group button](https://images.workoscdn.com/images/c29ef1a7-d873-49f6-ad43-8c945245a033.png?auto=format\&fit=clip\&q=50)

For each group you want to assign a role, click the **Create group** button and enter the following:

1. Copy the group id from Entra ID into the **IdP Group ID** field.
2. Optionally, enter a group name into the **Name** field.
3. Assign the appropriate role to the group.

![WorkOS dashboard with open create group dialog and idp\_id, name, and role assignment inputs](https://images.workoscdn.com/images/d542c8c3-e032-41a6-ae72-c8dc586ec88d.png?auto=format\&fit=clip\&q=50)

> Group members without an explicit role will receive the default role.

***

## PKCE (Proof Key for Code Exchange)

WorkOS supports [PKCE](https://datatracker.ietf.org/doc/html/rfc7636) for OIDC connections, including Entra ID. PKCE adds an additional layer of security to the authorization code flow by preventing authorization code interception attacks.

In the **Advanced settings** section of your Entra ID OIDC connection configuration in the WorkOS Dashboard, you can view and manage the PKCE setting.

> Only disable PKCE if you encounter issues with your identity provider. Entra ID supports PKCE, and keeping it enabled is strongly recommended for security.

***

## Next steps

Your Entra ID OIDC connection is now configured and ready to use. Users assigned to the application in Entra ID will be able to authenticate through WorkOS using their Microsoft credentials.

To start using this connection in your application, refer to the [SSO guide](https://workos.com/docs/sso) for implementation details.
