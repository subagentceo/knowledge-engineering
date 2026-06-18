# Google OIDC

## Introduction

Each SSO identity provider requires specific information to create and configure a new [SSO connection](https://workos.com/docs/glossary/connection). Often, the information required to create an SSO connection will differ by identity provider.

To create a Google OIDC SSO connection, you'll need three pieces of information: a [redirect URI](https://workos.com/docs/glossary/redirect-uri), [client ID](https://workos.com/docs/glossary/client-id), and [client secret](https://workos.com/docs/glossary/client-secret).

Start by logging in to your WorkOS dashboard and navigate to the **Organizations** page from the left-hand navigation bar.

Select the organization you'd like to configure a Google OIDC SSO connection for, and select **Configure manually** under **Single Sign-On**.

![WorkOS Dashboard Organizations tab with "Configure manually" button highlighted](https://images.workoscdn.com/images/d577cfbe-028b-48cf-8cc0-4cd5d3adf853.png?auto=format\&fit=clip\&q=50)

Select **Google OIDC** from the identity provider dropdown, click **Create Connection**.

![Create Connection form with Google OIDC selected as Identity Provider](https://images.workoscdn.com/images/35cfe8ab-1825-4f0d-ab93-7c0eb6e0d742.png?auto=format\&fit=clip\&q=50)

> Google OIDC is not available when [SSO group role assignment](https://workos.com/docs/sso/identity-provider-role-assignment) is enabled due to [a limitation](https://issuetracker.google.com/issues/133774835?pli=1) with the groups claim.

***

## What WorkOS provides

WorkOS provides the Redirect URI, which can be found in the **Service Provider Details** section on the SSO connection page in the [WorkOS Dashboard](https://dashboard.workos.com/).

- [Redirect URI](https://workos.com/docs/glossary/redirect-uri): The endpoint where identity providers send authentication responses after successful login

![The Redirect URI of a OIDC connection in the WorkOS Dashboard.](https://images.workoscdn.com/images/99a7c7d5-50a9-4bff-a3f3-22dc1cfeca58.png?auto=format\&fit=clip\&q=50)

The Redirect URI is the location an identity provider redirects its authentication response to. In Google's case, it needs to be set as an **Authorized redirect URI** when configuring your OAuth client in the Google Cloud Console.

Specifically, the Redirect URI will need to be added to the **Authorized redirect URIs** section when creating your OAuth client, which is outlined in [step 3](https://workos.com/docs/integrations/google-oidc/3-create-oauth-client) below.

***

## What you'll need

You will need to obtain two pieces of information from the organization:

- [Client ID](https://workos.com/docs/glossary/client-id): Application identifier from the OIDC provider
- [Client secret](https://workos.com/docs/glossary/client-secret): Authentication secret for the application

Normally, this information will come from the organization's IT management team when they set up your application's OAuth configuration in their Google Cloud Console. But, should that not be the case during your setup, the next steps will show you how to obtain it.

***

## (1) Create a Google Cloud project (optional)

> If you already have a Google Cloud project, skip this step.

Sign in to the [Google Cloud Console](https://console.cloud.google.com).

From the top left navigation, click **Select a project**. Select an organization and then click **Create project**.

![Google Cloud Console project selector with "Create project" option](https://images.workoscdn.com/images/941eaf2f-b6a3-4c86-83aa-4cb005dbc1e4.png?auto=format\&fit=clip\&q=50)

Enter a project name. Update the project organization and location if needed. Click **Create**.

![Google Cloud project creation form with project name, organization, and location fields](https://images.workoscdn.com/images/b7cd689d-0e89-4eee-8f32-f6b93522fed1.png?auto=format\&fit=clip\&q=50)

***

## (2) Configure OAuth app

From the top left navigation, click **Select a project**. Select the project you created in the previous step or one that is already set up.

![Google Cloud Console project selector dropdown with available projects](https://images.workoscdn.com/images/675794e5-9a6d-42cc-8d68-46e58a29caab.png?auto=format\&fit=clip\&q=50)

Search for **Google Auth Platform** and select it from the results list.

![Google Cloud Console search results showing Google Auth Platform service](https://images.workoscdn.com/images/ef574ce6-3402-4dbe-9e3e-4d3d00d82212.png?auto=format\&fit=clip\&q=50)

Click **Get started**.

![Google Cloud OAuth App dashboard with highlighted get started button](https://images.workoscdn.com/images/2e35fd83-74db-45b4-ad13-510fb52b57b0.png?auto=format\&fit=clip\&q=50)

On the **App Information** step, enter an app name, such as your organization name. Select a user support email from the dropdown. Click **Next**.

![OAuth consent screen App Information step with app name and user support email fields](https://images.workoscdn.com/images/2365ee0a-497b-4235-9d08-e9e740a140f0.png?auto=format\&fit=clip\&q=50)

On the **Audience** step, select **Internal** and click **Next**.

![OAuth consent screen Audience step with Internal option selected](https://images.workoscdn.com/images/e3689b48-4ada-43a6-818f-244cfebf0393.png?auto=format\&fit=clip\&q=50)

On the **Contact Information** step, enter a contact email and click **Next**.

![OAuth app information screen with contact information field highlighted and demo@foo-corp.com email filled in, next button is highlighted](https://images.workoscdn.com/images/7ef6519e-dc76-473b-901f-388e69762433.png?auto=format\&fit=clip\&q=50)

Agree to the terms of service, click **Continue** and then **Create**.

![OAuth consent screen terms of service acceptance and Create button](https://images.workoscdn.com/images/e211e959-1325-4dfc-8a8c-96d4ee0030cf.png?auto=format\&fit=clip\&q=50)

***

## (3) Create OAuth client

From the left-hand sidebar navigation, click **Clients** and then click **Create client**.

![Google Auth Platform Clients page with "Create client" button](https://images.workoscdn.com/images/24e008c1-4a8e-4bfe-8603-1074453a815b.png?auto=format\&fit=clip\&q=50)

From the **Application type** dropdown, select **Web application**.

![OAuth client creation form with Web application selected as application type](https://images.workoscdn.com/images/17bc8607-23be-457f-9cf1-995730748d55.png?auto=format\&fit=clip\&q=50)

Under the **Authorized redirect URIs** section, click **Add URI**. Copy the Redirect URI from your WorkOS Dashboard and paste it into the new redirect URI field.

![Authorized redirect URIs section with Add URI button and WorkOS redirect URI field](https://images.workoscdn.com/images/b98e091f-9005-4a1f-bfb9-56eb26a88844.png?auto=format\&fit=clip\&q=50)

Click **Create**.

***

## (4) Add organization settings

From the **OAuth client created** modal, copy the **Client ID** and **Client Secret** values.

![OAuth client created modal displaying Client ID and client secret](https://images.workoscdn.com/images/51a44c08-a559-456b-926f-33334d7cb755.png?auto=format\&fit=clip\&q=50)

Back in the WorkOS Dashboard, enter the client ID, and client secret you obtained from Google into the respective fields in the **Identity Provider Configuration** section of the SSO connection.

Enter `https://accounts.google.com/.well-known/openid-configuration` in the **Discovery Endpoint** field, this is the same value for all Google Cloud Console projects.

![WorkOS Dashboard Identity Provider Configuration with Client ID, Client Secret, and Discovery Endpoint fields](https://images.workoscdn.com/images/d3305808-a772-4f2a-a7e1-c862b9274975.png?auto=format\&fit=clip\&q=50)

Click **Save Configuration**.

***

## Next steps

Your Google OIDC connection is now configured and ready to use. Users within your organization will be able to authenticate through WorkOS using their Google credentials.

To start using this connection in your application, refer to the [SSO guide](https://workos.com/docs/sso) for implementation details.
