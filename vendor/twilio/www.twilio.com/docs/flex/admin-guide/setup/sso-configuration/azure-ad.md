# Configure Microsoft Entra ID with Flex

## Create an application in the Entra admin center

1. Open the [Microsoft Entra admin center](https://entra.microsoft.com).
2. In the left navigation, click **Applications**, and then click **Enterprise applications**.
3. Click **New Application**, and then click **Create your own application**.
4. On the **Create your own application page**:
   1. Give your application a name.
   2. For the app's purpose, leave the **Integrate any other application you don't find in the gallery (Non-gallery)** option selected.
   3. Click **Create**.

![Create application form with Twilio Flex name and integration options.](https://docs-resources.prod.twilio.com/d6eeb42cc668ca04c5953e022da58a02acefa88eb3342ab0efcae92b75d16d65.png)

## Configure your application

1. From your application's overview page, in the left navigation, click **Single sign-on**.
2. For the single sign-on method, click **SAML**.
3. In each section, click **Edit**, and then enter the following settings.

| **SAML Section**         | **Field**                                  | **Values**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------------------------ | ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Basic SAML Configuration | Reply URL (Assertion Consumer Service URL) | **[Enhanced SSO configuration](/docs/flex/admin-guide/setup/sso-configuration#enhanced-and-legacy-sso-configuration)**: Copy this value from the **Set up your identity provider** page, which provides the specific value for your account. Your value will look similar to this: `https://login.flex.us1.twilio.com/login/callback?connection=JQxxxx`<br /><br />**[Legacy SSO configuration](/docs/flex/admin-guide/setup/sso-configuration#enhanced-and-legacy-sso-configuration)**: Replace `ACxxxx` with your real Twilio Account SID. `https://iam.twilio.com/v1/Accounts/ACxxxx/saml2`                             |
| Basic SAML Configuration | Identifier (Entity ID)                     | **[Enhanced SSO configuration](/docs/flex/admin-guide/setup/sso-configuration#enhanced-and-legacy-sso-configuration)**: Copy this value from the **Set up your identity provider** page, which provides the specific value for your account. Your value will look similar to this: `urn:flex:JQxxxx`<br /><br />**[Legacy SSO configuration](/docs/flex/admin-guide/setup/sso-configuration#enhanced-and-legacy-sso-configuration)**: Replace `ACxxxx` with your real Twilio Account SID. After adding your unique entity ID, remove Microsoft's default entry. `https://iam.twilio.com/v1/Accounts/ACxxxx/saml2/metadata` |
| Attributes & Claims      | Twilio Flex required claims                | See [Configure claims](#configure-claims) section.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| SAML Signing Certificate | Signing Option                             | Select "Sign SAML response and assertion".                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| SAML Signing Certificate | Signing Algorithm                          | Leave "SHA-256" selected.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| SAML Signing Certificate | Notification Email Addresses               | Enter email address(es) for receiving Entra ID notifications.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

## Configure claims

Claims are key-value pairs that the identity provider asserts are true to the application. Flex uses these to determine the critical information about each Flex User.

> \[!WARNING]
>
> All the information the identity provider supplies to Twilio is stored inside Twilio TaskRouter Worker Attributes. Consider local regulations for storing data and only provide data relevant for Flex usage. Learn more about [Twilio's Privacy policy](https://www.twilio.com/en-us/legal/privacy).

1. From the **SAML-based Sign-on** page, in the **Attributes & Claims** section, click **Edit**.
2. Under **Required claims**, update the required claim to use `user.mail` as its value.
3. Add the following claims using a user attribute in the **Source attribute** field. Don't set a namespace for any of the claims.
   | Required claim | Value                |
   | -------------- | -------------------- |
   | email          | `user.mail`          |
   | full\_name     | `user.displayname`   |
   | roles          | `user.assignedroles` |
4. Under **Additional claims**, remove the default additional claims.

Your **Attributes & Claims** settings should look similar to this:

![Mapping of attributes to claims: full\_name to user.displayname, email to user.mail, roles to user.assignedroles, Unique User Identifier to user.userprincipalname.](https://docs-resources.prod.twilio.com/9821e68736269510d0c48e06b30a002e0b9df92b80c69ba2115722a03ecd15a1.png)

## Configure roles

Make sure that the Flex SAML roles have a globally unique identifier (GUID). GUIDs are a long string of letters and numbers that Entra ID can use to identify each Flex roles.

1. From the admin center left navigation, click **Applications**, and then click **App registrations**.
2. Under **All registrations**, click on your app (for example, Twilio Flex).
3. From the app registrations page for your application, in the left navigation, click **App roles**. <br />
   Twilio Flex requires the following roles:
   * admin
   * supervisor
   * agent

To create an app role:

1. Click **Create app role**.
2. Enter the required fields:
   1. Under **Allowed member types**, select **Users/Groups**.
   2. Leave the **Do you want to enable this app role?** box selected.
3. Click **Apply**. Your **App roles** page should look similar to this:
   ![Table showing app roles with columns: display name, description, allowed member types, value, ID, and state.](https://docs-resources.prod.twilio.com/b543f1bcf8b92d171fdd5f72cbeac486710ea3ecefeeb0ae31d43b842081e155.png)

**Note**: If you use Flex Insights, you must create separate entries for each Insights role you expect to assign to your agents:
![Azure roles table with Insights Team Leader and WFO Full Access, both enabled.](https://docs-resources.prod.twilio.com/9b203baec9c0a4e274db4e3625f20caf7d67b1511e39e67bcbf1abfb58f84742.png)

> \[!CAUTION]
>
> All the information the identity provider supplies to Twilio is stored inside Twilio [TaskRouter Worker attributes](/docs/taskrouter/api/worker). Consider local regulations for storing data, and only provide data relevant for Flex usage ([see the Twilio Privacy policy for more information](/en-us/legal/privacy)).

> \[!NOTE]
>
> Please see [the Identity Attributes section of the SSO Configuration docs](/docs/flex/admin-guide/setup/sso-configuration) for more information about naming attributes and other possible Worker attributes.

## Configure Flex with your new SAML credentials

1. From Flex Console, configure SSO on the [**Single sign-on (SSO)** page](https://console.twilio.com/us1/develop/flex/users-and-access/single-sign-on). You will need the following fields from the Entra **SAML-based Sign-on** page:

| **Twilio SSO field**     | **Entra ID field**         |
| ------------------------ | -------------------------- |
| X.509 Certificate        | Certificate (Base64)       |
| Identity Provider Issuer | Microsoft Entra Identifier |
| Single Sign-on URL       | Login URL                  |

## Ensure users in the directory are assigned to the application

1. Return to the admin center home page, and then go to your application's overview page.
2. From the left navigation, click **Users and Groups**.
   ![Azure AD user list showing display names, object types, and roles assigned.](https://docs-resources.prod.twilio.com/5fa7252a99d9ed6e7c5f32b7c9f90cb2f1371c8fb6ef22df9a6a8da45f964da6.png)
3. Click **Add user/group**. You can assign one role to each user. Make sure that all users are assigned to your application.

**Note**: If you use Flex Insights, you must add each role you created previously as individual assignments for your agents.
![Azure Flex Insights app roles showing Admin and WFO Full Access for users.](https://docs-resources.prod.twilio.com/b07d1f9dc10f0079baa236275a18f7ab0bfd5e930b55be94e5a9bd4e066db882.png)

## Additional Configuration

See [Configuring SSO](/docs/flex/admin-guide/setup/sso-configuration) for more details about the following topics:

* Initiating login from your identity provider
* Logging in to a self-hosted domain
* Attributes you can define for each identity

## Test your SSO

To test your SSO setup:

1. Navigate to the Flex Console [**Single sign-on (SSO)** page](https://console.twilio.com/us1/develop/flex/users-and-access/single-sign-on).
2. Do one of the following:
   * Click **Login with SSO**.
   * Copy the login link and paste it into your browser address bar. This redirects you to the IdP login page.
3. Log in using the credentials of the test user. Depending on the user settings, the IdP may ask you to set your password. <br /><br />
   Once authentication completes, the IdP redirects you to the Flex UI. What you can see in the UI depends on the Flex roles set in the IdP user profile.
4. Validate the worker full name display in the Flex UI, or navigate to the Worker page in the [TaskRouter Dashboard](https://console.twilio.com/us1/develop/taskrouter/overview?frameUrl=%2Fconsole%2Ftaskrouter%2Fdashboard%3Fx-target-region%3Dus1) to review other attributes, like email and assigned roles.

## Next steps

If you need to pass custom attributes to your Flex users, refer to [Pass Custom Azure AD Attributes as Twilio Flex SAML Claims](/docs/flex/admin-guide/setup/sso-configuration/azure-ad/custom-azure-ad-attributes-as-saml-claims).
