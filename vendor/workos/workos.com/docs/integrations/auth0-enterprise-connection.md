# Auth0 Enterprise Connection

> Looking to migrate from Auth0 to WorkOS? Check out the [full migration guide](https://workos.com/docs/migrate/auth0).

## Introduction

This guide outlines the steps to make WorkOS SSO connections available to Auth0 applications without requiring changes to your existing Auth0 application code.

> The Auth0 Enterprise Connection integration is in feature preview. Reach out to [WorkOS support](mailto:support@workos.com?subject=WorkOS%20Support) if you want early access.

***

## (1) Configure Auth0 API Access

WorkOS uses Auth0 credentials you provide to manage the Auth0 Enterprise Connection automatically. The first step is authorizing an application in Auth0 to access the Management API.

In the Auth0 dashboard, navigate to **Applications** → **APIs** → **Auth0 Management API**:

![A screenshot showing the "Auth0 Management API" entry on the Auth0 APIs page.](https://images.workoscdn.com/images/e2baba2e-a442-4449-90db-d1be8db41ef2.png?auto=format\&fit=clip\&q=50)

Click on the **Machine To Machine Applications** tab and expand the section for your Auth0 application. Then, toggle the **Authorized** switch to enable the API.

Under **Permissions**, ensure the following scopes are granted to the application:

- `create:connections`
- `read:connections`
- `update:connections`

Your permissions configuration should match the following screenshot:

![A screenshot a correctly configured API application in the Auth0 dashboard.](https://images.workoscdn.com/images/13b5acb2-b5c6-4cd5-a032-0dd7afedc81a.png?auto=format\&fit=clip\&q=50)

Next, navigate to **Applications** → ***Your App*** → **Settings**. You should see three fields under **Basic Information**: "Domain", "Client ID", and "Client Secret".

![A screenshot showing application credentials in the Auth0 dashboard.](https://images.workoscdn.com/images/c8303868-de12-40e5-a0cc-27bec508131c.png?auto=format\&fit=clip\&q=50)

Record this information in a safe place, as you will provide it to the WorkOS dashboard in the next step.

***

## (2) Connect WorkOS to Auth0

In the WorkOS dashboard, navigate to **Configuration** → **Settings** and scroll to the **Auth0 Credentials** section. Click **Set Auth0 Credentials**:

![A screenshot showing the "Auth0 Credentials" section in the WorkOS dashboard.](https://images.workoscdn.com/images/16b3ea51-8564-4ced-86fb-f3ab9fad8d28.png?auto=format\&fit=clip\&q=50)

In the modal, enter the credentials you obtained in the previous step: "API Domain", "Client ID", and "Client Secret".

![A screenshot showing the "Auth0 Credentials" form in the WorkOS dashboard.](https://images.workoscdn.com/images/3e915c68-97c0-4d1e-88e9-cda8bff7fd31.png?auto=format\&fit=clip\&q=50)

Click **Save**. In the final step, you will head back to the Auth0 dashboard one last time to complete the configuration.

***

## (3) Enable the Enterprise Connection

After saving your credentials, WorkOS will create an Enterprise Connection in your Auth0 environment. This connection is the entry point into WorkOS SSO from Auth0. The next step is to enable the connection for your Auth0 application.

In the Auth0 dashboard, navigate to **Applications** → ***Your App*** → **Connections**. You should see a connection with a `workos-sso-` prefix in its name. Enable it for your application.

![A screenshot showing enabled connections for an application in the Auth0 dashboard.](https://images.workoscdn.com/images/4cd3dbec-7ccc-462a-a101-5f8fc29aa332.png?auto=format\&fit=clip\&q=50)

***

## (4) Enable "Identifier First" Login Flow

In the Auth0 dashboard, navigate to **Authentication** → **Authentication Profile**. You should see three options for configuring login flow. Select **Identifier First**.

![A screenshot showing "Identifier First" selected in the Auth0 dashboard.](https://images.workoscdn.com/images/b30e3808-b978-4f86-9443-8e2e7d588a90.png?auto=format\&fit=clip\&q=80)

This configures the Auth0 Universal Login page to begin by prompting the user for their email address. This is necessary as it allows Auth0 to select the WorkOS SSO Enterprise Connection if the user's email domain matches one of your WorkOS organizations. Non-enterprise users will still be prompted for their password.

> [IdP-initiated SSO](https://workos.com/docs/sso/login-flows/idp-initiated-sso) is currently not supported when using the Auth0 Enterprise Connection integration.

***

## Summary

Your WorkOS SSO connections are now available to your Auth0 application! You are ready to use WorkOS features like [Admin Portal](admin-portal), allowing IT contacts to configure their SSO setup for your application directly.

As you create [organizations](https://workos.com/docs/reference/organization), WorkOS will keep the Auth0 Enterprise Connection's [Home Realm Discovery](https://auth0.com/docs/authenticate/login/auth0-universal-login/identifier-first#define-home-realm-discovery-identity-providers) list updated with the organization's domains – ensuring correct routing of enterprise users to WorkOS for authentication.

When users enter their email address into the Auth0 Universal Login, which matches a domain associated with a WorkOS organization, Auth0 redirects users to their WorkOS-enabled IdP sign-in page for their organization. Once the authentication process is complete with the IdP, WorkOS redirects to your Auth0 app callback URL.

> Since email domains are used to route users to the correct IdP when using Auth0, WorkOS will enforce that [organization domains](https://workos.com/docs/reference/domain-verification) are unique, and therefore a domain cannot be assigned to more than one organization.
