# Configure Salesforce SSO with Flex

Follow these steps to set up Salesforce single sign-on (SSO) in Twilio Flex. You'll need access to your Salesforce instance and permissions to configure it, as well as access to Twilio Console.

> \[!NOTE]
>
> After configuring SSO in Flex, you can find your login link on the [**Single sign-on (SSO)** page](https://console.twilio.com/us1/develop/flex/users-and-access/single-sign-on) in Flex Console.

## Create a self-signed certificate in Salesforce

1. Follow [Salesforce's documentation to generate a self-signed certificate](https://help.salesforce.com/s/articleView?id=xcloud.security_keys_creating.htm\&type=5).
2. When creating your certificate, leave the **Key Size** field set to **2048** and the **Exportable Private Key** option selected. These are the defaults.
3. Once you've downloaded your certificate, keep it available for later. You'll enter the contents of this file when you set up SSO in Flex.

## Enable Salesforce identity provider in Salesforce

Follow [Salesforce's documentation to enable Salesforce as an IdP](https://help.salesforce.com/s/articleView?id=xcloud.identity_provider_enable.htm\&type=5) using the self-signed certificate you created in the previous section.

## Add Flex as a connected app in Salesforce

Follow [Salesforce's documentation to create a connected app](https://help.salesforce.com/s/articleView?id=xcloud.connected_app_create_basics.htm\&type=5) for Twilio Flex, and then use the steps in the following sections to configure the app.

### Enter basic information

Under **Basic Information**, enter the following information:

1. Set **Connected App Name** to **Twilio Flex**.
2. Set **API Name** to **Twilio\_Flex**.
3. In **Contact Email**, enter an email address.

### Configure SAML settings

Under **Web App Settings**, enter the following information:

1. In the **Web App Settings** section, set the **Start URL** to [`https://flex.twilio.com/agent-desktop`](https://flex.twilio.com/agent-desktop).
2. Confirm that the **Enable SAML** checkbox is selected.
3. Set **Entity Id** to the appropriate value for your [SSO configuration type](/docs/flex/admin-guide/setup/sso-configuration#enhanced-and-legacy-sso-configuration):

* **Enhanced SSO configuration**:\
  Copy this value from the **Set up your identity provider** page, which provides the specific value for your account. For example, `urn:flex:JQxxxx`
* **Legacy SSO configuration**:\
  Remember to replace `ACxxx` with your [Twilio Account SID](https://help.twilio.com/articles/14726256820123-What-is-a-Twilio-Account-SID-and-where-can-I-find-it-). Your value will look similar to this: `https://iam.twilio.com/v1/Accounts/ACxxxx/saml2/metadata`

4. Set **ACS URL** to the appropriate value for your [SSO configuration type](/docs/flex/admin-guide/setup/sso-configuration#enhanced-and-legacy-sso-configuration):
   * **Enhanced SSO configuration**:\
     Copy the ACS URL value from the **Set up your identity provider** page, which provides the specific value for your account. Your value will look similar to this: `https://login.flex.us1.twilio.com/login/callback?connection=JQxxxx`
   * **Legacy SSO configuration**:\
     Remember to replace `ACxxx` with your [Twilio Account SID](https://help.twilio.com/articles/14726256820123-What-is-a-Twilio-Account-SID-and-where-can-I-find-it-). Your value will look similar to this: `https://iam.twilio.com/v1/Accounts/ACxxxx/saml2`
5. Leave **Subject Type** as **Username**. This is the default.
6. Leave **Name ID Format** as `urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified`. This is the default.
7. Make sure **Issuer** is set to `https\://YOUR_DOMAIN.my.salesforce.com/`, where YOUR\_DOMAIN is your Salesforce domain. This is the default.
8. Set **IdP Certificate** to the certificate you created in [Create a self-signed certificate in Salesforce](/docs/flex/admin-guide/setup/sso-configuration/salesforce#create-a-self-signed-certificate-in-salesforce).
9. Make sure **Verify request signatures** isn't selected.
10. Make sure **Encrypt SAML Response** isn't selected.
11. Click **Save**.
    The **Manage Custom Apps** page opens.

### Add custom attributes

1. In the **Custom Attributes** section, click **New** to create each of the following attributes:

   | Key        | Value                                  |
   | ---------- | -------------------------------------- |
   | full\_name | $User.FirstName + " " + $User.LastName |
   | roles      | "agent" (must be in quotes)            |

> \[!NOTE]
>
> These attributes grant all users agent permissions in Flex. If you need to add `supervisor` or `admin` permissions, edit the "roles" custom attribute and include the roles as a comma-separated list. For example, "agent, supervisor, admin" grants users the `agent`, `supervisor`, and `admin` roles in Flex.

### Create a Salesforce user

Follow [Salesforce's documentation to add a Salesforce user](https://help.salesforce.com/s/articleView?id=platform.adding_new_users.htm\&type=5) you can use to log in to Flex using SSO.

Make sure to specify the following setting values:

1. In **User License**, select **Salesforce**.
2. In **Profile**, select **Standard User**. This ensures the user can access Flex.
3. Under **Approver Settings**, make sure **Generate new password and notify user immediately** is selected.

### Assign profile access to Flex

To log in to Flex, Salesforce users must be assigned a profile that has access to the Twilio Flex app. In the previous section, you assigned the user the Standard User profile. Follow these steps to give the Standard User profile access to the Twilio Flex app.

1. In Salesforce, from **Setup**, in the **Quick Find** box, enter **Profiles**, and then select **Profiles**.
2. Edit the Standard User profile.
3. Under **Connected App Access**, select the Twilio Flex app.

> \[!WARNING]
>
> If you have Salesforce users with a different user profile who need to log in to Flex, you must assign Flex access to those profiles separately. Users assigned profiles without Flex access can't log in to Flex using SSO.

## Set up SSO in Flex

After completing Salesforce setup, configure your Flex SSO connection to use Salesforce as the IdP.

1. In Twilio Console, navigate to **Flex** > **Users and access** > [**Single sign-on (SSO)**](https://console.twilio.com/us1/develop/flex/users-and-access/single-sign-on).
2. Set the **Friendly Name** to a recognizable name, like `SalesforceSSO`.
3. Copy the contents of the certificate you downloaded in [Create a self-signed certificate in Salesforce](/docs/flex/admin-guide/setup/sso-configuration/salesforce#create-a-self-signed-certificate-in-salesforce).
4. In **X.509 Certificate** field, paste the certificate contents.
5. Set **Identity Provider Issuer** to `https://<your-salesforce-subdomain>.salesforce.com/`.
6. Set **SSO URL** to `https://<your-salesforce-subdomain>.salesforce.com/idp/endpoint/HttpRedirect`.
7. Set **Default Redirect URL** to `https://<your-salesforce-subdomain>.salesforce.com/idp/endpoint/HttpRedirect`.
8. Click **Save**.

## Testing SSO in Flex

To test your Salesforce integration with Flex:

1. On the **Single Sign-On (SSO)** page, find the auto-generated login link.
2. Copy the link and paste it in your address bar.\
   The browser redirects you to Salesforce.
3. Log in using your Salesforce credentials.\
   After your credentials are authenticated, the browser redirects you back to Flex. This redirect indicates your SSO configuration is working.
