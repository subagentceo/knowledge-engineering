# Bubble Plugin

## Introduction

The [Bubble plugin for WorkOS](https://bubble.io/plugin/workos-sso-1666727595127x530956156372516860) allows you to easily integrate [WorkOS API](https://workos.com/docs/reference) endpoints in your application's workflows. This plugin includes actions for SSO, Directory Sync, Admin Portal, and webhook validation.

***

## Install the WorkOS SSO and API Plugins

In the **Plugins** tab of your app editor in Bubble, click **Add Plugins**, then search for WorkOS. Install the plugins for both WorkOS SSO and WorkOS API and then click **Done**.

![A screenshot showing how to install the WorkOS SSO plugin in Bubble.](https://images.workoscdn.com/images/03cf97a8-e0e9-49bc-be67-e21501ff5ab4.png?auto=format\&fit=clip\&q=50)

![A screenshot showing how to install the WorkOS API plugin in Bubble.](https://images.workoscdn.com/images/165832c3-88d2-49e5-9153-8fd1009367aa.png?auto=format\&fit=clip\&q=50)

The next step is to enter your secret keys/parameters on the **Plugins** settings page as seen below. The API key can be found in your WorkOS dashboard under **API Keys**.

> In the WorkOS SSO plugin the API Key value can be entered directly.

![A screenshot showing where to enter environment variables in Bubble for the WorkOS SSO plugin.](https://images.workoscdn.com/images/40fd465f-b73c-4dd2-8478-375eb68757ae.png?auto=format\&fit=clip\&q=50)

> In the WorkOS API plugin the API Key value needs to be preceded by **Bearer**.

![A screenshot showing where to enter environment variables in Bubble for the WorkOS API plugin.](https://images.workoscdn.com/images/4bd64da1-4212-4ef9-a1bc-8064d60eac64.png?auto=format\&fit=clip\&q=50)

Now you're set up to use the plugin directly in your workflows.

***

## Single Sign-On

Whether you are implementing a Single Sign-On authorization flow for your application using a no-code platform or building your app from the ground up, the steps that you need to take on a high level are the same. You can find more information in our [SSO Quickstart Guide](https://workos.com/docs/sso).

### Use SSO in a Workflow

To configure SSO, you will need:

- An active SSO connection, which can be configured manually or by using the [Admin Portal](https://workos.com/docs/admin-portal).
- A [connection](https://workos.com/docs/reference/sso/connection) ID or [organization](https://workos.com/docs/reference/organization) ID associated with the user logging in. If WorkOS does not handle user management on your application's behalf, it is necessary to keep track of the association between your users and their WorkOS connection or organization IDs in your database.
- [Redirect URI](https://workos.com/docs/glossary/redirect-uri), which is the URL to redirect the user to when they are authorized. This is provided by Bubble in the **Plugins** tab.

Navigate to the **Workflow** page in your application and add a new event. Select the action that will trigger the workflow to start. In this case, the workflow is triggered when the submit button is clicked.

Under the **Account** menu option, select **Signup/login with a social network**, then select **WorkOS SSO** from the **OAuth provider** dropdown menu. Enter either the connection ID, organization ID, or provider.

> Select whether you will use connection, organization, or provider (OAuth connections only), and delete the other defaults. The value should be entered in the `organization=<organization_id>` format.

![A screenshot showing how to enter the parameter values in a Bubble workflow.](https://images.workoscdn.com/images/c39e8579-e064-4f79-b6ad-a3ec8d5c1118.png?auto=format\&fit=clip\&q=50)

When a user launches this workflow, they will be prompted to log in through the associated WorkOS SSO connection.

Upon a successful login, if the user does not exist in the application database, a new user will be created and logged in as the current user. If the user already exists, that user will be logged in as the current user.

***

## Directory Sync

To start using [Directory Sync](https://workos.com/docs/directory-sync), you will need to configure a new directory connection between your customer's directory provider and WorkOS. This can be completed manually or by using the [Admin Portal](https://workos.com/docs/admin-portal).

Once a directory connection is activated in WorkOS, you can configure webhooks to send events to your Bubble application using the WorkOS plugin through a backend workflow.

### Enable backend workflows

To enable backend workflows, navigate to the **Settings** page of your Bubble app under the **API** tab, and select **Enable Workflow API and backend workflows**. You are now able to configure backend workflows in the **Workflow** section.

![A screenshot showing how enable backend workflows in Bubble.](https://images.workoscdn.com/images/e3443ee9-38fb-4d1a-98d3-40d0af2bfa3d.png?auto=format\&fit=clip\&q=50)

### Create a new workflow to receive webhooks

To create a new workflow that subscribes to WorkOS webhooks, navigate to the **Workflows** section of your app in Bubble and select **backend workflows** from the page selection dropdown.

![A screenshot showing how to navigate to and create a new backend workflow in Bubble.](https://images.workoscdn.com/images/ec2377c0-1d06-40a0-9608-710690f539b3.png?auto=format\&fit=clip\&q=50)

Create a new API Workflow. In the **detected data option** ensure that **include headers** is selected before clicking **Detect data**.

![A screenshot showing how to configure a backend workflow to detect data in Bubble.](https://images.workoscdn.com/images/67a1be1b-7ec7-4f6a-8c30-d3804eca2aa7.png?auto=format\&fit=clip\&q=50)

A pop-up window will show a test URL to validate the webhook body.

![A screenshot showing when a backend workflow is ready to detect data in Bubble.](https://images.workoscdn.com/images/070d64e5-899f-499c-9fca-74eb5cbc267a.png?auto=format\&fit=clip\&q=50)

Navigate to the **Webhooks** tab in your WorkOS dashboard and enter this test URL as your webhook endpoint.

![A screenshot showing how to configure a webhook endpoint in the WorkOS dashboard.](https://images.workoscdn.com/images/85e7b624-c107-49d2-82af-9c7a026caeb9.png?auto=format\&fit=clip\&q=50)

Then, click the **Send Test Event** button to send a test event.

![A screenshot showing where to send a test webhook event in the WorkOS dashboard.](https://images.workoscdn.com/images/87937fdf-a9e7-4804-a780-5e5d96b40a18.png?auto=format\&fit=clip\&q=50)

Bubble will recognize the event and validate the endpoint. Click save to complete the subscription to WorkOS webhook events for this workflow.

![A screenshot showing a successfully detected webhook event in Bubble.](https://images.workoscdn.com/images/aa9531f1-7df5-4053-9021-e9cca649dbcc.png?auto=format\&fit=clip\&q=50)

### Implement the webhook validation action

After the new workflow is set up to listen for new events, it is recommended that you use the webhook validation action to verify that the webhooks being received are from WorkOS.

This action verifies the request is valid by using the webhook body, signature, and secret that you provide from your WorkOS dashboard. To properly define the webhook parameter, you should use the raw body text of the request data. Similarly, the `webhook_signature` should be defined using the `workos-signature` in the request data headers.

![A screenshot showing how to select the webhook validation action in Bubble.](https://images.workoscdn.com/images/e43720ac-5669-4a8d-8ac3-5a220ed2c730.png?auto=format\&fit=clip\&q=50)

After the event is validated, you can use the data from the body to log the webhook and make changes to users.

### Reconcile the users

The plugin also includes endpoints, documented under the directory sync section of the [API Reference](https://workos.com/docs/reference), that can be used to reconcile users.

Periodically calling the [List Directory Users](https://workos.com/docs/reference/directory-sync/directory-user/list) endpoint and verifying that the returned date matches what you have stored in your user table helps ensure your application has up-to-date information about your users, so you can use it with confidence.

***

## Admin Portal

The [Admin Portal](https://workos.com/docs/admin-portal) provides an out-of-the-box UI for IT contacts to configure SSO and Directory Sync connections.

The WorkOS API plugin provides an API call that launches the Admin Portal if you would like to display it on the settings page of your application. You can also copy and paste these links directly from the WorkOS dashboard in the connection settings.

Upon completing the setup flow with the Admin Portal, IT contacts will be able to test the new connection and validate that it has been configured correctly.

![A screenshot showing how to select the admin portal action in Bubble.](https://images.workoscdn.com/images/14cafa76-cb94-4880-800c-5b8b2aa93777.png?auto=format\&fit=clip\&q=50)
