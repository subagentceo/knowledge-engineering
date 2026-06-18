# Configure Auth0 IdP with Twilio Flex

Auth0 is a platform that provides authentication as a service. Instead of managing your own user's credentials, Auth0 can take care of that for you. In this guide, you will learn how you can configure Auth0 as a SAML Identity Provider with Flex. To learn more about how Auth0 works, visit the official [Auth0 overview page](https://auth0.com/docs/get-started/auth0-overview).

## Create an Application on Auth0

1. Navigate to **Applications** > **Applications**, and click **Create Application**.
2. Enter a name for your application, select **Regular Web Applications** as the application type, and then click **Create**.
3. Select the Addons tab and click **SAML2 Web App**.
4. Click the Settings tab and set the Application Callback URL to the appropriate value for your [SSO configuration type](/docs/flex/admin-guide/setup/sso-configuration#enhanced-and-legacy-sso-configuration):

   * **Enhanced SSO configuration:**\
     Copy the ACS URL value from the **Set up your identity provider** page, which provides the specific value for your account. Your value will look similar to this: `https://login.flex.us1.twilio.com/login/callback?connection=JQxxxx`
   * **Legacy SSO configuration:**\
     Replace `ACxxxx` with your Account SID, which you can find on the [Twilio Console](https://console.twilio.com/us1/?frameUrl=/console). `https://iam.twilio.com/v1/Accounts/ACxxxx/saml2`
5. Copy and paste the appropriate SAML Protocol Settings for your [SSO configuration type](/docs/flex/admin-guide/setup/sso-configuration#enhanced-and-legacy-sso-configuration) in the Addons Settings:

   * **Enhanced SSO configuration**

     ```json
     {
       "binding": "urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST",
       "signResponse": true,
       "audience": "urn:flex:JQxxxx"
     }
     ```
   * **Legacy SSO configuration:**

     ```json
     {
       "binding": "urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST",
       "signResponse": true
     }
     ```
6. Click **Usage** and download a copy of your Auth0 certificate.
7. To save your settings, scroll down and click the **Enable** button, and then click **Save**.
8. Select **Settings**.
9. Scroll down to Application URIs, and confirm or add the appropriate value for your [SSO configuration type](/docs/flex/admin-guide/setup/sso-configuration#enhanced-and-legacy-sso-configuration) to the Allowed Callback URLs:

   * **Enhanced SSO configuration:**\
     Ensure that this field contains the ACS URL value from the **Set up your identity provider** page, which provides the specific value for your account. Your value will look similar to this: `https://login.flex.us1.twilio.com/login/callback?connection=JQxxxx`
   * **Legacy SSO configuration:**\
     Ensure that this field contains the ACS URL and entity ID values for your account. Remember to replace `ACxxxx` with your own Account SID. `hhttps://iam.twilio.com/v1/Accounts/ACxxxx/saml2, https://iam.twilio.com/v1/Accounts/ACxxxx/saml2/metadata`
10. Scroll down to Advanced Settings and select the **Endpoints** tab. Copy the SAML Protocol URL and Save the settings.

    ![Auth0 endpoints with highlighted SAML Protocol URL.](https://docs-resources.prod.twilio.com/acacdedd837101bdecac3a7968b67eb7ad13c03cf84a038e18308717ea43b806.png)

## Create a Post Login action

Actions are Node.js functions that execute at certain points in Auth0. You can use custom actions to customize or extend Auth0's default capabilities. To learn more about actions and how they work, visit the official Auth0 docs on [Auth0 Actions](https://auth0.com/docs/customize/actions).

1. Navigate to **Actions** > **Flows**, and click **Login**.
2. Click **+ Actions** and select **Build from scratch**.
3. Enter a name, and then click **Create**. The Trigger and recommended Runtime values are set for you.
4. In the Actions code editor, add the following code. If you want to send additional attributes to use for routing during login, you can also add them to this definition:

   ```javascript
   exports.onExecutePostLogin = async (event, api) => {

   api.samlResponse.setAttribute("email", event.user.email || null);
   api.samlResponse.setAttribute("full_name", event.user.name || null);
   api.samlResponse.setAttribute("image_url", event.user.picture || null);
   api.samlResponse.setAttribute("roles", event.user.app_metadata.flex.roles);
   }

   ```

   **Note** You will configure the roles property when you add a user in the next section.
5. Click **Deploy**, and then return to the flow.
6. In the Add Action section, select the **Custom** tab.
7. Drag and drop your custom action into the flow, and then click **Apply**.

## Add a User

1. Navigate to **User Management** > **Users**, and click **+ Create User**.
2. Enter the **Email**, **Password**, and any required user details, and then click **Create**.
3. Scroll down to **app\_metadata** and assign the required [roles](/docs/flex/admin-guide/setup/sso-configuration#identity-attributes-and-flex-roles) (agent, admin or supervisor).\
   Example:

   ```json
   {
     "flex" : {
       "roles" : ["admin"]
     }
   }
   ```

   **Note** If you don't configure the roles for the user, the Post Login action you created in the previous section will fail.
4. Click **Save**.

## Configure Flex with your SAML credentials

1. Navigate to **Twilio Console** > **Flex** > **Users and access** > **Single sign-on (SSO)**.
2. Under X.509 Certificate, copy and paste the contents of the Auth0 certificate you downloaded earlier. You can read the .pem file by using the cat command in your command prompt or terminal. For example:

   `cat ./name/of/certificate-file.pem`
3. For Identity Provider Issuer, go to Applications > Your App > Addons > SAML2 Web App. Click Usage, and copy the value of "Issuer".
4. For Single Sign-On URL, paste the url for the SAML Protocol URL that you copied from step 10 of [Create an Application on Auth0](/docs/flex/admin-guide/setup/sso-configuration/auth0#create-an-application-on-auth0). Be sure to also append the query string at the end:

   `?connection=Username-Password-Authentication`
5. Add your trusted domain which you can find under your application's settings, and copy the value under "Domain".
6. Turn on **Login Using Popup**.
7. Click **Save** to save your settings.
