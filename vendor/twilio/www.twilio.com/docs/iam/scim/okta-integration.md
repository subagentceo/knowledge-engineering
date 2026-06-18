# Okta SCIM integration

This guide explains how to configure user synchronization from Okta to Twilio using SCIM provisioning. You can use this integration to provision, update, and deactivate Twilio users based on changes in Okta.

This guide doesn't cover SSO configuration. If you already have an SSO application for Twilio in Okta, skip to [Configure SCIM provisioning](#configure-scim-provisioning) to add SCIM provisioning to your existing application.

## Prerequisites

Before you begin, make sure that you have the following:

* An Okta administrator account
* A Twilio user account with the Organization Owner or Organization Admin role
* A [verified domain name](/docs/iam/organizations/domains) that matches the hostname of your users' email addresses

> \[!WARNING]
>
> If your organization uses SSO, create an Organization Admin user with SSO deactivated before you begin. You need this user to authenticate the SCIM connection because the OAuth authorization page doesn't support SSO login.

## Create an Okta application

Make an Okta application that will supply user information to Twilio.

1. In the Okta Admin panel, go to **Applications** > **Applications**, then click **Create App Integration**.
2. For **Sign-in method**, select **SWA - Secure Web Authentication**.
3. Click **Next**.
4. Configure the application:
   1. For **App name**, enter **Twilio**.
   2. For **App's login page URL**, enter `https://www.twilio.com/login`.
   3. Select **Do not display application icon to users**. This hides the application tile from assigned users since it's only used for SCIM provisioning.
5. Click **Save** to create the application.

## Configure SCIM provisioning

Update your new Okta application to reflect Twilio-specific SCIM settings.

1. From the application's **General** tab, select **SCIM** for the **Provisioning** option.
2. Click **Save**.
3. Go to the **Provisioning** tab that appears.
4. Configure the SCIM connection parameters:
   1. For **SCIM connector base URL**, enter `https://iam.twilio.com/scim/v2`.
   2. For **Unique identifier field for users**, enter `userName`.
   3. Under **Supported provisioning actions**, select the following options:
      * Import New Users and Profile Updates
      * Push New Users
      * Push Profile Updates
5. Click **Save**.

## Create a Twilio OAuth application

Create an OAuth application in Twilio to authenticate the SCIM connection from Okta.

1. Sign in to the [Twilio Console](https://www.twilio.com/console).
2. Click **Admin** in the top-right corner to open the [Admin Center](https://admin.twilio.com).
3. Go to **Applications** > **OAuth apps**.
4. Click **Create OAuth application**.
5. For **Grant Type**, select **Authorization code**.
6. Fill out the application details:
   * For **Application name**, enter **Okta SCIM**.
   * For **Company Name**, enter your company name.
   * For **Redirect URL** enter your Okta redirect URI, a URI that will look like `https://system-admin.okta.com/admin/app/cpc/YOUR_OKTA_APP/oauth/callback`. See [Build your SCIM API](https://developer.okta.com/docs/guides/scim-provisioning-integration-prepare/main/#authentication) service to determine your Okta redirect URI.
   * For **Scopes and Permissions**, select all `managed-users` scopes.
7. Click **Save**.
8. Copy the **Client ID**, **Client Secret**, and **Authorization URL**. Store the Client Secret securely because it's only shown once.

## Connect Okta to Twilio

Supply information about your Twilio OAuth application to Okta.

1. Return to your Okta application's **Provisioning** tab.
2. For **Authentication Mode**, select **OAuth 2**.
3. Configure the OAuth settings:
   1. Set **Access token endpoint URI** to `https://oauth.twilio.com/v2/token`.
   2. Enter the **Authorization endpoint URI**, **Client ID**, and **Client Secret** from your Twilio OAuth application.
4. Click **Save**.
5. Click **Authenticate with YOUR\_OKTA\_APP**. The Twilio login screen appears.
6. Enter your email address and password. Use the organization admin user with SSO deactivated if you created one earlier.
7. Review the requested permissions and click **Approve access**.

After successful authentication, you're redirected to Okta. A green checkmark indicates the connection is valid. You might need to refresh the page to see the checkmark.

## Configure provisioning actions

Configure your Okta application to push user updates to Twilio.

1. Return to your Okta application's **Provisioning** tab.
2. The **To App** and **To Okta** subtabs appear.
3. In the **To App** tab, turn on the following options:
   * Create Users
   * Update User Attributes
   * Deactivate Users
4. Click **Save**.

## Assign users

The integration is now active. You can assign users or groups to the application, and their corresponding Twilio users are created, managed, and deactivated by Okta.

To monitor synchronization, open the Application Assignments tab in your Okta app or check the Tasks page in Okta (Admin Panel > Dashboard > Tasks).

## Troubleshooting

If you encounter synchronization errors, try the following steps:

1. Check that the OAuth application has the required `managed-users` scopes.
2. Make sure the Organization Admin user used for authentication hasn't been deactivated.
3. In the Okta Admin, check the Tasks page for error messages.
