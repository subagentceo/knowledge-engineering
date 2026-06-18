# Auth0 Directory Sync

> Looking to migrate from Auth0 to WorkOS? Check out the [full migration guide](https://workos.com/docs/migrate/auth0).

## Introduction

This guide will walk you through the steps to enable WorkOS Directory Sync for your Auth0 applications. If you are new to automated user provisioning and deprovisioning, the [Directory Sync](https://workos.com/docs/directory-sync) introduction is a good place to learn the basics.

> The Auth0 Directory Sync integration is in feature preview. Reach out to [WorkOS support](mailto:support@workos.com?subject=Auth0%20Directory%20Sync%20Integration) if you want early access.

## (1) Configure Auth0 API access

WorkOS uses Auth0 credentials you provide to automatically create and manage an Auth0 database connection. The first step is to authorize an application in Auth0 to access the Management API.

In the Auth0 dashboard, navigate to **Applications** → **APIs** → **Auth0 Management API**:

![A screenshot showing the "Auth0 Management API" entry on the Auth0 APIs page.](https://images.workoscdn.com/images/e2baba2e-a442-4449-90db-d1be8db41ef2.png?auto=format\&fit=clip\&q=50)

Click on the **Machine To Machine Applications** tab and expand the section for your Auth0 application. Then, toggle the **Authorized** switch to enable the API.

Under **Permissions**, ensure the following scopes are granted to the application:

- `create:connections`
- `create:users`
- `read:connections`
- `read:users`
- `update:connections`
- `update:users`

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

## (3) Enable the database connection

After saving your credentials, WorkOS will create a database connection in your Auth0 environment. This connection will contain the users from directories in your WorkOS organizations. The next step is to enable the connection for your Auth0 application.

In the Auth0 dashboard, navigate to **Applications** → ***Your App*** → **Connections**. You should see a connection with a `workos-dsync-` prefix in its name. Enable it for your application.

![A screenshot showing enabled connections for an application in the Auth0 dashboard.](https://images.workoscdn.com/images/73b12882-d286-49cd-ba58-a0527eab7f4f.png?auto=format\&fit=clip\&q=50)

***

## Summary

Your WorkOS directories will now be synchronized with your new Auth0 database connection! You are ready to use WorkOS features like [Admin Portal](https://workos.com/docs/admin-portal), allowing IT contacts to configure their directory provider for your application directly.

New users provisioned into Auth0 are given a randomly generated password. They will need to reset their password before they can sign in. You can also use [WorkOS directory sync webhooks](https://workos.com/docs/events/data-syncing/webhooks) to be notified when new users are provisioned, allowing you to tailor the onboarding experience for these new users, like sending a welcome email.

Deprovisioned users will be deleted from the Auth0 database connection. If you need to perform additional cleanup in your application, you can receive WorkOS directory sync webhooks for delete events as well.
