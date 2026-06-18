# Flex SSO URL Migration Guide

## Overview

If your Flex instance is running Flex UI 2.7.x or later, migrate your single sign-on (SSO) connection to a new solution that offers enhanced security using OAuth 2.0.

Completing the migration requires participation from both your Flex administrator and your identity provider (IdP) administrator. The migration process may take anywhere from one day to two weeks, depending on the complexity of your organization and its business practices.

> \[!NOTE]
>
> All Flex customers using the legacy SSO configuration need to migrate to the enhanced SSO configuration prior to March 31, 2026.

## Choose a setup type

Migrating to enhanced SSO configuration requires changes in two places: Flex Console and your IdP. When choosing a setup type, consider whether the Flex administrator has access to make changes in the IdP. If you need to collaborate with an IdP administrator on the migration, this may influence which setup method works best for your organization.

### Modify existing SSO connection

With this option, the IdP administrator will update the **Entity ID** and **ACS URL** for the existing IdP application used for Flex.

| Benefits                                                                                                                              | Considerations                                                                                                                                                                                                                               | Use this option if                                                                                                                                                                                     |
| ------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <ul><li>Doesn't require any new IdP setup.</li><br /><li>Doesn't require updates for users who already have access to Flex.</li></ul> | <ul><li>If a configuration error occurs during migration, you'll have to revert to the legacy SSO connection while you troubleshoot. This could cause new agent logins to be denied until you successfully revert your connection.</li></ul> | <ul><li>You can collaborate with your IdP administrator in real-time to complete the migration.</li><br /><li>Your business can tolerate the risk of time where new agent logins are denied.</li></ul> |

### Create new existing SSO connection

With this option, the IdP administrator will set up a new IdP application to use for Flex.

| Benefits                                                                                                                                                                                                                                                                                                                                               | Considerations                                                                                                                                                                                                                                                            | Use this option if                                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <ul><li>The legacy SSO connection remains unchanged, and you can switch back to it in case of a configuration error during migration. This reduces the chance that new agent logins will be denied if issues occur.</li><br /><li>The Flex administrator and the IdP administrator can collaborate asynchronously to complete the migration.</li></ul> | <ul><li>Requires additional effort to set up a new IdP application and SSO connection.</li><br /><li>The IdP administrator has to configure all current Flex users to access the new IdP application for Flex before you can start sending login traffic to it.</li></ul> | <ul><li>You can't collaborate with your IdP administrator in real-time to complete the migration.</li><br /><li>Your business can't risk having any time where new agent logins are denied.</li></ul> |

## Migration steps

Migrating has three or four steps, depending on your setup type:

1. Select setup type.
2. Update your identity provider.
3. Enter identity provider data.

   **Note** This page only appears if you create a new SSO connection. If you modify your existing connection, Flex uses the IdP data from your legacy connection, so you don't need to enter this information again.
4. Validate successful connection in Flex.

> \[!WARNING]
>
> If you're a self-hosted Flex customer, you have to do an additional step before validating your new SSO connection. See [Self-hosted Flex: additional SSO configuration](/docs/flex/admin-guide/setup/sso-configuration/self-hosted-sso) for instructions.

To start your migration:

1. In Console, navigate to **Flex** > **Users and access** > **Single sign-on (SSO)**. If you're running Flex UI 2.7.x or later, you'll see a **New SSO Solution Available** section.
2. Click **Start setup**.

   The single sign-on set up workflow appears.

### Step 1: Select setup type

1. Select a setup type:
   * Modify existing SSO connection
   * Create new SSO connection
2. Click **Continue**.

### Step 2: Update your identity provider

In this step, the IdP administrator sets the **Entity ID** and **ACS URL** values for the new connection in the IdP. However, the IdP may not use the same labels to identify these values.

Check the following table to see what field labels your IdP uses. If you need help locating the fields, click the IdP name in the table to go to the full setup instructions. There, you can find the steps to navigate to the appropriate page in your IdP.

| IdP                                                                             | IdP page                     | Entity ID label             | ACS URL label                              |
| ------------------------------------------------------------------------------- | ---------------------------- | --------------------------- | ------------------------------------------ |
| [**Google SSO**](/docs/flex/admin-guide/setup/sso-configuration/google)         | Service provider details     | Entity ID                   | ACS URL                                    |
| [**Okta IdP**](/docs/flex/admin-guide/setup/sso-configuration/okta)             | Create SAML integration      | Audience URI (SP Entity ID) | Single sign on URL                         |
| [**Salesforce SSO**](/docs/flex/admin-guide/setup/sso-configuration/salesforce) | Web App settings             | Entity ID                   | ACS URL                                    |
| [**Azure AD**](/docs/flex/admin-guide/setup/sso-configuration/azure-ad)         | SAML > General SAML settings | Identifier (Entity ID)      | Reply URL (Assertion Consumer Service URL) |
| [**Auth0 IDP**](/docs/flex/admin-guide/setup/sso-configuration/auth0)           | SAML2 Web App > Settings     | `audience` setting          | Application Callback URL                   |

To update your IdP:

1. Copy the **Entity ID** and **ACS URL** values from the single sign-on setup workflow.
2. In your IdP, paste the values into the appropriate fields.
   * If you're modifying your existing connection, update these values in your existing application.
   * If you're creating a new SSO connection, make sure you add the values to the new application, not to the application used for your legacy connection.
3. In the single sign-on setup workflow, confirm that the values have been updated.
4. Click **Save and Continue**.

### Step 3: Enter identity provider data

This page only appears in the workflow for creating a new SSO connection.

> \[!WARNING]
>
> If you're a self-hosted Flex customer, you must do the following when creating your SSO connection in Flex:
>
> * In the **Default redirect URL** field, add the default redirect location for IdP-initiated logins.
> * In the **Trusted URLs** field, add any redirect destinations you intend to use.

1. Enter the SAML setting values from your new application. If you need more information about the settings, see the setup instructions for your IdP:
   * [**Google SSO: Configure Google Single Sign-On (SSO) with Twilio Flex**](/docs/flex/admin-guide/setup/sso-configuration/google#configure-flex-with-your-google-sso-settings)
   * [**Okta IdP: Configure Flex with your new SAML credentials**](/docs/flex/admin-guide/setup/sso-configuration/okta#configure-flex-with-your-new-saml-credentials)
   * [**Salesforce SSO: Set up SSO in Twilio Flex**](/docs/flex/admin-guide/setup/sso-configuration/salesforce#set-up-sso-in-twilio-flex)
   * [**Entra ID: Configure Flex with your new SAML credentials**](/docs/flex/admin-guide/setup/sso-configuration/azure-ad#configure-flex-with-your-new-saml-credentials)
   * [**Auth0 IDP: Configure Flex with your SAML credentials**](/docs/flex/admin-guide/setup/sso-configuration/auth0#configure-flex-with-your-saml-credentials)
2. Click **Save**.

### Step 4: Validate successful connection in Flex

For hosted Flex customers:

1. In Console, on the [**Flex overview** page](https://console.twilio.com/us1/develop/flex/overview), click **Log in with SSO**.
2. When prompted, enter the credentials of a user who has access to the application in your IdP used for Flex.
   Flex loads when your login is successful.
3. Click **Finish** to complete the migration.

This returns you to the **Single sign-on (SSO)** page:

* If you modified your existing connection, you'll see your new OAuth 2.0 connection.
* If you created a new SSO connection, you'll see both your new OAuth 2.0 connection and your inactive legacy connection.

> \[!NOTE]
>
> If you were previously logged in to Flex, you'll need a new login to validate your new SSO connection. You can either log out of Flex and log back in, or you can log in using a private or incognito browser.

For self-hosted Flex customers:

1. Copy the **redirect URL** from your Flex SSO configuration.
2. In your web browser, open a private or incognito window. This ensures that your previous login session doesn't interfere with the validation.
3. Paste the redirect URL into the browser address bar and press **Enter**.\
   The browser redirects to your IdP login page.
4. Enter the credentials of a user who's been assigned an appropriate Flex role (for example, agent or supervisor).\
   When the IdP successfully authenticates your login, the browser redirects to your self-hosted Flex UI instance.

## Switch back your SSO connection

Flex saves your legacy connection details for 30 days after completing the migration. If you experience login issues during this time, you can switch back while you troubleshoot your SSO connection.

### Revert modified connection

If you modified your existing connection, you have only one SSO connection defined. To switch to your legacy connection, have the IdP administrator revert the **Entity ID** and **ACS URL** values in your IdP to those of your previous connection.

1. On the **Single sign-on (SSO)** page, under **New connection saved**, click **switch back to legacy connection**.

   The Revert SSO connection page appears.
2. From the **Legacy Flex SSO** section, provide the **Entity ID** and **ACS URL** values to your IdP administrator to add to the IdP.
3. When the IdP updates are complete, click **I confirm that my Flex application reflects the Legacy Flex SSO connection**.
4. Click **Switch connection**.

When you want to return to using your new connection, complete the migration steps again.

### Switch from new connection to legacy connection

If you created a new SSO connection, both your OAuth 2.0 connection and your legacy connection are saved. Switch back to your previous connection using the link on the **Single sign-on (SSO)** page.

1. On the single sign-on page, under **New connection saved**, click **switch back to legacy connection**.
2. In the **Switch to OAuth 2.0 SSO Connection** dialog, click **Confirm**.

The link on the single sign-on page now reads switch back to OAuth 2.0 connection. Use this link you want to return to using your new connection.
